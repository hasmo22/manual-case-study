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
        ...
    ]
}
```

### Run tests
In order to run the tests, you can run the following command:

```
npm test
```

<img width="552" alt="Screenshot 2024-10-30 at 22 46 27" src="https://github.com/user-attachments/assets/152777c5-18fd-4017-af65-96393bd26dd8">

