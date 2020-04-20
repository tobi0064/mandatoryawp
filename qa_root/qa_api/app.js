/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

/**** Configuration ****/
const appName = "Express API Template"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

/**** Some test data ****/
const questions = [
    {
        id: 1,
        question: "How to add Bootstrap to React?",
        answers:[
            {id: 4, text: "first answer", votes: 1},
            {id: 5, text: "second answer", votes: 3},
            {id: 6, text: "third answer", votes: 2}

        ]
    },
    {
        id: 2,
        question: "Class vs Functions in React?",
        answers: [
            {id: 1, text: "first answer", votes: 7},
            {id: 2, text: "second answer", votes: 9},
            {id: 3, text: "third answer", votes: 200}
        ]
    },
];

/**** Routes ****/

// Return all recipes in data
app.get('/api/questions', (req, res) => res.json(questions));



//AskQuestion
app.post('/api/questions', (req, res) => {
    let question = {
        id: Math.random(),
        question: req.body.question,
        answers: [{ text: String, votes: Number }],
    };

    questions.push(question)
    res.json({msg: "question added", question: question})
})
// PostAnswer
app.post('/api/questions/:id/answers', (req, res) => {
    let answer = {
        id: Math.random(),
        text: req.body.text,
        votes: 0
    }
    const question = questions.find(q => q.id ===parseFloat(req.params.id));
    question.answers.push(answer);
    console.log(answer);
    res.json({msg: "Answer added", question: question});
});

app.put('/api/questions/:id/answers/:aid/votes', (req, res) => {
    let answer = {
        aid: req.params.aid,
        text: req.params.text,
        votes: req.params.votes
    }
    const question = questions.find(q => q.id ===parseFloat(req.params.id));
    const ans = question.answers.find(a => a.id ===parseFloat(req.params.aid));
    ans.votes++;

    res.json({msg: "Answer upvoted", question: question});

});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));