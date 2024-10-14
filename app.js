const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const registeredEmails = new Set();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index'); 
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email } = req.body;
    
    if (registeredEmails.has(email)) {
        res.status(400).json({ error: 'This email has already been registered.' });
    } else {
        registeredEmails.add(email);
        res.render('response', { name, email }); 
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
