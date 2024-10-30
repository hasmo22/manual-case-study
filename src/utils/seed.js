const { Questionnaire, Question, Answer, sequelize } = require('../models/index');

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

const questionnaireData = {
    title: "Erectile Dysfunction (ED)",
    description: "A medical questionnaire to help recommend the right products for treatment.",
    questions: [
        {
            questionText: "Do you have difficulty getting or maintaining an erection?",
            answers: [
                { text: "Yes", recommendation: null, restriction: null, nextQuestionText: "Have you tried any of the following treatments before?" },
                { text: "No", recommendation: "No products available", restriction: "exclude all products", nextQuestionText: "Have you tried any of the following treatments before?" }
            ]
        },
        {
            questionText: "Have you tried any of the following treatments before?",
            answers: [
                { text: "Viagra or Sildenafil", recommendation: null, restriction: null, nextQuestionText: "Was the Viagra or Sildenafil product you tried before effective?" },
                { text: "Cialis or Tadalafil", recommendation: null, restriction: null, nextQuestionText: "Was the Cialis or Tadalafil product you tried before effective?"},
                { text: "Both", recommendation: null, restriction: null, nextQuestionText: "Which is your preferred treatment?"},
                { text: "None of the above", recommendation: "Sildenafil 50mg or Tadalafil 10mg", restriction: null, nextQuestionText: "Do you have, or have you ever had, any heart or neurological conditions?" }
            ]
        },
        {
            questionText: "Was the Viagra or Sildenafil product you tried before effective?",
            answers: [
                { text: "Yes", recommendation: "Sildenafil 50mg", restriction: "exclude tadalafil", nextQuestionText: "Do you have, or have you ever had, any heart or neurological conditions?" },
                { text: "No", recommendation: "Tadalafil 20mg", restriction: "exclude sildenafil", nextQuestionText: "Do you have, or have you ever had, any heart or neurological conditions?" }
            ]
        },
        {
            questionText: "Was the Cialis or Tadalafil product you tried before effective?",
            answers: [
                { text: "Yes", recommendation: "Tadalafil 10mg", restriction: "exclude sildenafil", nextQuestionText: "Do you have, or have you ever had, any heart or neurological conditions?" },
                { text: "No", recommendation: "Sildenafil 100mg", restriction: "exclude tadalafil", nextQuestionText: "Do you have, or have you ever had, any heart or neurological conditions?"}
            ]
        },
        {
            questionText: "Which is your preferred treatment?",
            answers: [
                { text: "Viagra or Sildenafil", recommendation: "Sildenafil 100mg", restriction: "exclude tadalafil", nextQuestionText: "Do you have, or have you ever had, any heart or neurological conditions?" },
                { text: "Cialis or Tadalafil", recommendation: "Tadalafil 20mg", restriction: "exclude sildenafil", nextQuestionText: "Do you have, or have you ever had, any heart or neurological conditions?" },
                { text: "None of the above", recommendation: "Sildenafil 100mg or Tadalafil 20mg", restriction: null, nextQuestionText: "Do you have, or have you ever had, any heart or neurological conditions?" }
            ]
        },
        {
            questionText: "Do you have, or have you ever had, any heart or neurological conditions?",
            answers: [
                { text: "Yes", recommendation: null, restriction: null, nextQuestionId: "Do any of the listed medical conditions apply to you?" },
                { text: "No", recommendation: "No products available", restriction: "exclude all products", nextQuestionId: "Do any of the listed medical conditions apply to you?" }
            ]
        },
        {
            questionText: "Do any of the listed medical conditions apply to you?",
            answers: [
                { text: "Significant liver problems (such as cirrhosis of the liver) or kidney problems", recommendation: "No products available", restriction: "exclude all products", nextQuestionId: "Are you taking any of the following drugs?"},
                { text: "Currently prescribed GTN, Isosorbide mononitrate, Isosorbide dinitrate , Nicorandil (nitrates) or Rectogesic ointment", recommendation: "No products available", restriction: "exclude all products", nextQuestionId: "Are you taking any of the following drugs?" },
                { text: "Abnormal blood pressure (lower than 90/50 mmHg or higher than 160/90 mmHg)", recommendation: "No products available", restriction: "exclude all products", nextQuestionId: "Are you taking any of the following drugs?" },
                { text: "Condition affecting your penis (such as Peyronie's Disease, previous injuries or an inability to retract your foreskin)", recommendation: "No products available", restriction: "exclude all products", nextQuestionId: "Are you taking any of the following drugs?" },
                { text: "I don't have any of these conditions", recommendation: null, restriction: null },
            ]
        },
        {
            questionText: "Are you taking any of the following drugs?",
            answers: [
                { text: "Alpha-blocker medication such as Alfuzosin, Doxazosin, Tamsulosin, Prazosin, Terazosin or over-the-counter Flomax", recommendation: "No products available", restriction: "exclude all products" },
                { text: "Riociguat or other guanylate cyclase stimulators (for lung problems)", recommendation: "No products available", restriction: "exclude all products" },
                { text: "Saquinavir, Ritonavir or Indinavir (for HIV)", recommendation: "No products available", restriction: "exclude all products" },
                { text: "Cimetidine (for heartburn)", recommendation: "No products available", restriction: "exclude all products" },
                { text: "I don't take any of these drugs", recommendation: null, restriction: null },
            ]
        },
    ]
};

async function populateQuestionnaire() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        const questionnaire = await Questionnaire.create({
            title: questionnaireData.title,
            description: questionnaireData.description
        });
        
        // Keep track of question Ids and their text for when we save answer data
        const questionIdMap = {};

        // Create the questions
        for (const questionData of questionnaireData.questions) {
            const question = await Question.create({ 
                questionText: questionData.questionText,
                questionnaireId: questionnaire.id
            });
            questionIdMap[questionData.questionText] = question.id;
        }

        // Create answers
        for (const questionData of questionnaireData.questions) {
            const questionId = questionIdMap[questionData.questionText];

            for (const answerData of questionData.answers) {
                let nextQuestionId = null;

                // Grab the next question id
                if (answerData.nextQuestionText) {
                    nextQuestionId = questionIdMap[answerData.nextQuestionText] || null;
                }

                // Crete answers
                await Answer.create({
                    answerText: answerData.text,
                    recommendation: answerData.recommendation,
                    restriction: answerData.restriction,
                    questionId: questionId,
                    nextQuestionId: nextQuestionId
                });
            }
        }

        console.log("Seeded questions and answers");
    } catch (error) {
        console.error("Error seeding questions and answers:", error);
    } finally {
        await sequelize.close();
    }
}

populateQuestionnaire();