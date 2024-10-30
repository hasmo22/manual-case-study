const { getQuestionnaireData, processAnswers } = require('../controllers/recommendations');
const { Questionnaire, Question, Answer } = require('../models');

jest.mock('../models', () => ({
    Questionnaire: {
        findOne: jest.fn()
    },
    Question: {},
    Answer: {}
}));

describe('getQuestionnaireData', () => {
    it('should return questionnaire data with questions and answers', async () => {
        const mockQuestionnaire = {
            id: 1,
            title: 'Test Questionnaire',
            Questions: [
                {
                    id: 1,
                    questionText: 'Sample question?',
                    Answers: [
                        { id: 1, answerText: 'Answer 1' },
                        { id: 2, answerText: 'Answer 2' }
                    ]
                }
            ]
        };

        Questionnaire.findOne.mockResolvedValue(mockQuestionnaire);

        const result = await getQuestionnaireData(1);
        expect(result).toEqual(mockQuestionnaire);
        expect(Questionnaire.findOne).toHaveBeenCalledWith({
            where: { id: 1 },
            include: {
                model: Question,
                as: 'Questions',
                include: { model: Answer, as: 'Answers' }
            }
        });
    });

    it('should return null if questionnaire is not found', async () => {
        Questionnaire.findOne.mockResolvedValue(null);

        const result = await getQuestionnaireData(999);
        expect(result).toBeNull();
        expect(Questionnaire.findOne).toHaveBeenCalledWith({
            where: { id: 999 },
            include: {
                model: Question,
                as: 'Questions',
                include: { model: Answer, as: 'Answers' }
            }
        });
    });
});

describe('processAnswers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return recommendations based on user answers', async () => {
        const mockAnswers = [
            { questionId: 1, answerText: 'Answer 1', recommendation: 'Product A' },
            { questionId: 2, answerText: 'Answer 2', recommendation: 'Product B' }
        ];

        const mockQuestion = {
            id: 1,
            questionText: 'Sample question?',
            Answers: mockAnswers
        };

        Question.findOne = jest.fn().mockResolvedValue(mockQuestion);

        const userAnswers = [
            { question: 'Sample question?', answer: 'Answer 1' }
        ];

        const recommendations = await processAnswers(userAnswers);

        expect(recommendations).toEqual(['Product A']);
        expect(Question.findOne).toHaveBeenCalledWith({
            where: { questionText: 'Sample question?' },
            include: { model: Answer, as: 'Answers' }
        });
    });

    it('should apply restrictions to recommendations', async () => {
        const mockAnswers = [
            { questionId: 1, answerText: 'Answer 1', recommendation: 'Product A', restriction: 'exclude all products' }
        ];

        const mockQuestion = {
            id: 1,
            questionText: 'Sample question?',
            Answers: mockAnswers
        };

        Question.findOne = jest.fn().mockResolvedValue(mockQuestion);

        const userAnswers = [
            { question: 'Sample question?', answer: 'Answer 1' }
        ];

        const recommendations = await processAnswers(userAnswers);

        // Expecting an empty array here due to the exclusion
        expect(recommendations).toEqual([]);
    });
});
