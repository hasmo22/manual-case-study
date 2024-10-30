const express = require('express');
const router = express.Router();
const { getQuestionnaireData, processAnswers } = require('../controllers/recommendations');

router.get('/questionnaire/:id', async (req, res) => {
    try {
        const questionnaire = await getQuestionnaireData(req.params.id);

        // Questionnaire not found
        if (!questionnaire) {
            return res.status(404).json({ error: 'Questionnaire not found' });
        }

        res.json(questionnaire);
    } catch (error) {
        console.error("Error fetching questionnaire:", error);
        res.status(500).json({ error: "Error fetching questionnaire" });
    }
});

router.post('/answers', async (req, res) => {
    if (!req.body.hasOwnProperty('answers')) {
        return res.status(400).json({ error: "Error processing questionnaire, missing necessary parameters" });
    }

    try {
        const recommendations = await processAnswers(req.body.answers);
       return res.json({ recommendations });
    } catch (error) {
        console.error("Error processing questionnaire:", error);
        return res.status(500).json({ error: "Error processing questionnaire" });
    }
});

module.exports = router;