const { Questionnaire, Question, Answer } = require('../models/index');

const getQuestionnaireData = async (questionnaireId) => {
    const questionnaire = await Questionnaire.findOne({
        where: { id: questionnaireId },
        // Let's grab this questionnaire's questions and answers.
        include: {
            model: Question,
            as: 'Questions',
            include: { model: Answer, as: 'Answers' }
        }
    });

    return questionnaire;
}

/**
 * 
 * @param {Object[]} userAnswers Questionnaire answers
 * @returns 
 */
const processAnswers = async (userAnswers) => {
    let recommendations = [];

    for (const userAnswer of userAnswers) {
        // Find the question in the database
        const question = await Question.findOne({
            where: { questionText: userAnswer.question },
            include: { model: Answer, as: 'Answers' } // Include associated answers
        });

        if (question) {
            // Find the answer for the current question
            // currently this is done by answer text, but could also be done via id if we want to pass that to the front-end
            const answerData = question.Answers.find(answer => answer.answerText === userAnswer.answer);
            if (answerData) {
                // Process the recommendation(s)
                if (answerData.recommendation) {
                    // Multiple recommendations
                    if (answerData.recommendation.includes(' or ')) {
                        const recommendedProducts = answerData.recommendation.split(' or ');
                        recommendedProducts.filter(product => applyRecommendation(recommendations, product))    
                    } else {
                        applyRecommendation(recommendations, answerData.recommendation)
                    }
                }
                // Consider restriction
                if (answerData.restriction) {
                    recommendations = applyRestrictions(recommendations, answerData.restriction);
                }
            }
        }
    }

    return recommendations;
};

/**
 * 
 * @param {string[]} recommendations An array of all the recommendations
 * @param {string} productToRecommend A product to recommend
 */
function applyRecommendation(recommendations, productToRecommend) {
    let products = {
        'sildenafil_50': 'Sildenafil 50mg',
        'sildenafil_100': 'Sildenafil 100mg',
        'tadalafil_10': 'Tadalafil 10mg',
        'tadalafil_20': 'Tadalafil 20mg'
    };

    // Product doesn't exist, skip recommendation
    if (products.hasOwnProperty(productToRecommend) === false) return;

    if (recommendations.indexOf(productToRecommend) === -1) {
        recommendations.push(products[productToRecommend]);
    }
}

/**
 * 
 * @param {string[]} recommendations An aray of all the recommendations
 * @param {string} restriction A restriction to apply
 * @returns 
 */
function applyRestrictions(recommendations, restriction) {
    if (restriction == "exclude all products") {
        return [];
    }

    if (restriction.includes("exclude")) {
        const productToExclude = restriction.split("exclude ")[1].trim();
        return recommendations.filter(product => product.toLowerCase().includes(productToExclude) === false);
    }
    return recommendations;
}

module.exports = { processAnswers, getQuestionnaireData }