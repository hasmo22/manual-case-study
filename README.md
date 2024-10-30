## Manual Case Study
### API for running a questionnaire in the Erectile Dysfunction (ED) category

### Installation
1. Clone the repo
2. CD into the directory and run ```npm install```
3. Copy the .env.example file to .env and replace with your MySQL database credentials
4. In the command line, run the db migration to seed the questionnaire data: ```node src/utils/seed.js```

### Using the APIs

1. An API that returns the questionnaire, which includes all the questions and answers.
   ```
   GET /manual/questionnaire/[id]
   ```
2. An API that accepts the questionnaire answers and returns an array of the recommended products that the customer can purchase.
   ```
   POST /manual/answers
   ```
   The front-end can pass results of the questionnaire answers as a JSON payload like:
   ```
   {
    "answers": 
    [
        {
            "question": "Do you have difficulty getting or maintaining an erection?",
            "answer": "Yes"
        },
        {
            "question": "Have you tried any of the following treatments before?",
            "answer": "Viagra or Sildenafil"
        },
        {
            "question": "Was the Viagra or Sildenafil product you tried before effective?",
            "answer": "Yes"
        },
        {
            "question": "Do you have, or have you ever had, any heart or neurological conditions?",
            "answer": "Yes"
        },
        {
            "question": "Do any of the listed medical conditions apply to you?",
            "answer": "I don't have any of these conditions"
        },
        {
            "question": "Are you taking any of the following drugs?",
            "answer": "I don't take any of these drugs"
        }
    ] 
   }
   ```
   
### Run endpoints with app on AWS EC2
Curl request:
```
curl -XGET 'http://3.9.169.86:3000/manual/questionnaire/1'
```
Response: Will return the questionnaire data, including the questions and answers.

```
{
    "id": 1,
    "title": "Erectile Dysfunction (ED)",
    "description": "A medical questionnaire to help recommend the right products for treatment.",
    "Questions": [
        {
            "id": 1,
            "questionText": "Do you have difficulty getting or maintaining an erection?",
            "questionnaireId": 1,
            "Answers": [
                {
                    "id": 1,
                    "answerText": "Yes",
                    "recommendation": null,
                    "restriction": null,
                    "nextQuestionId": 2,
                    "questionId": 1
                },
                {
                    "id": 2,
                    "answerText": "No",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": 2,
                    "questionId": 1
                }
            ]
        },
        {
            "id": 2,
            "questionText": "Have you tried any of the following treatments before?",
            "questionnaireId": 1,
            "Answers": [
                {
                    "id": 3,
                    "answerText": "Viagra or Sildenafil",
                    "recommendation": null,
                    "restriction": null,
                    "nextQuestionId": 3,
                    "questionId": 2
                },
                {
                    "id": 4,
                    "answerText": "Cialis or Tadalafil",
                    "recommendation": null,
                    "restriction": null,
                    "nextQuestionId": 4,
                    "questionId": 2
                },
                {
                    "id": 5,
                    "answerText": "Both",
                    "recommendation": null,
                    "restriction": null,
                    "nextQuestionId": 5,
                    "questionId": 2
                },
                {
                    "id": 6,
                    "answerText": "None of the above",
                    "recommendation": "Sildenafil 50mg or Tadalafil 10mg",
                    "restriction": null,
                    "nextQuestionId": 6,
                    "questionId": 2
                }
            ]
        },
        {
            "id": 3,
            "questionText": "Was the Viagra or Sildenafil product you tried before effective?",
            "questionnaireId": 1,
            "Answers": [
                {
                    "id": 7,
                    "answerText": "Yes",
                    "recommendation": "Sildenafil 50mg",
                    "restriction": "exclude tadalafil",
                    "nextQuestionId": 6,
                    "questionId": 3
                },
                {
                    "id": 8,
                    "answerText": "No",
                    "recommendation": "Tadalafil 20mg",
                    "restriction": "exclude sildenafil",
                    "nextQuestionId": 6,
                    "questionId": 3
                }
            ]
        },
        {
            "id": 4,
            "questionText": "Was the Cialis or Tadalafil product you tried before effective?",
            "questionnaireId": 1,
            "Answers": [
                {
                    "id": 9,
                    "answerText": "Yes",
                    "recommendation": "Tadalafil 10mg",
                    "restriction": "exclude sildenafil",
                    "nextQuestionId": 6,
                    "questionId": 4
                },
                {
                    "id": 10,
                    "answerText": "No",
                    "recommendation": "Sildenafil 100mg",
                    "restriction": "exclude tadalafil",
                    "nextQuestionId": 6,
                    "questionId": 4
                }
            ]
        },
        {
            "id": 5,
            "questionText": "Which is your preferred treatment?",
            "questionnaireId": 1,
            "Answers": [
                {
                    "id": 11,
                    "answerText": "Viagra or Sildenafil",
                    "recommendation": "Sildenafil 100mg",
                    "restriction": "exclude tadalafil",
                    "nextQuestionId": 6,
                    "questionId": 5
                },
                {
                    "id": 12,
                    "answerText": "Cialis or Tadalafil",
                    "recommendation": "Tadalafil 20mg",
                    "restriction": "exclude sildenafil",
                    "nextQuestionId": 6,
                    "questionId": 5
                },
                {
                    "id": 13,
                    "answerText": "None of the above",
                    "recommendation": "Sildenafil 100mg or Tadalafil 20mg",
                    "restriction": null,
                    "nextQuestionId": 6,
                    "questionId": 5
                }
            ]
        },
        {
            "id": 6,
            "questionText": "Do you have, or have you ever had, any heart or neurological conditions?",
            "questionnaireId": 1,
            "Answers": [
                {
                    "id": 14,
                    "answerText": "Yes",
                    "recommendation": null,
                    "restriction": null,
                    "nextQuestionId": null,
                    "questionId": 6
                },
                {
                    "id": 15,
                    "answerText": "No",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": null,
                    "questionId": 6
                }
            ]
        },
        {
            "id": 7,
            "questionText": "Do any of the listed medical conditions apply to you?",
            "questionnaireId": 1,
            "Answers": [
                {
                    "id": 16,
                    "answerText": "Significant liver problems (such as cirrhosis of the liver) or kidney problems",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": null,
                    "questionId": 7
                },
                {
                    "id": 17,
                    "answerText": "Currently prescribed GTN, Isosorbide mononitrate, Isosorbide dinitrate , Nicorandil (nitrates) or Rectogesic ointment",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": null,
                    "questionId": 7
                },
                {
                    "id": 18,
                    "answerText": "Abnormal blood pressure (lower than 90/50 mmHg or higher than 160/90 mmHg)",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": null,
                    "questionId": 7
                },
                {
                    "id": 19,
                    "answerText": "Condition affecting your penis (such as Peyronie's Disease, previous injuries or an inability to retract your foreskin)",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": null,
                    "questionId": 7
                },
                {
                    "id": 20,
                    "answerText": "I don't have any of these conditions",
                    "recommendation": null,
                    "restriction": null,
                    "nextQuestionId": null,
                    "questionId": 7
                }
            ]
        },
        {
            "id": 8,
            "questionText": "Are you taking any of the following drugs?",
            "questionnaireId": 1,
            "Answers": [
                {
                    "id": 21,
                    "answerText": "Alpha-blocker medication such as Alfuzosin, Doxazosin, Tamsulosin, Prazosin, Terazosin or over-the-counter Flomax",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": null,
                    "questionId": 8
                },
                {
                    "id": 22,
                    "answerText": "Riociguat or other guanylate cyclase stimulators (for lung problems)",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": null,
                    "questionId": 8
                },
                {
                    "id": 23,
                    "answerText": "Saquinavir, Ritonavir or Indinavir (for HIV)",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": null,
                    "questionId": 8
                },
                {
                    "id": 24,
                    "answerText": "Cimetidine (for heartburn)",
                    "recommendation": "No products available",
                    "restriction": "exclude all products",
                    "nextQuestionId": null,
                    "questionId": 8
                },
                {
                    "id": 25,
                    "answerText": "I don't take any of these drugs",
                    "recommendation": null,
                    "restriction": null,
                    "nextQuestionId": null,
                    "questionId": 8
                }
            ]
        }
    ]
}
```
