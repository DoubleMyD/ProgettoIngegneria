const express = require('express');
const path = require('path');


const app = express();

// Disabilita l'intestazione x-powered-by
app.disable('x-powered-by');


const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use('/front-end', express.static(path.join(__dirname, 'front-end')));

// Serve static files from the back-end directory
app.use('/back-end', express.static(path.join(__dirname, 'back-end')));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/views/LandingPage', 'landing-page.html'));
});

app.get('/landing-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/views/LandingPage', 'landing-page.html'));
});

app.get('/signup-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/views/SignupPage', 'signup-page.html'));
});

app.get('/login-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/views/LoginPage', 'login-page.html'));
});

app.get('/administrator', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/views/AdministratorPage', 'administrator.html'));
});

app.get('/pattern', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/views/PatternPage', 'pattern.html'));
});

app.get('/logged-user', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/views/LoggedUserPage', 'loggedUser.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
