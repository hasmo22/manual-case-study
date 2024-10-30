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
   
