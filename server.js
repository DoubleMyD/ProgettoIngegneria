const express = require('express');
const path = require('path');
//const bcrypt = require('bcryptjs');
//const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use('/front-end', express.static(path.join(__dirname, 'front-end')));

// Serve static files from the back-end directory
app.use('/back-end', express.static(path.join(__dirname, 'back-end')));

app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/views/LandingPage', 'landing-page.html'));
});
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/views/PatternPage', 'pattern.html'));
});*/

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
/*
app.post('/hash-password', async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).send('Password is required');
    }
    try {
        axios
      .post('http://localhost:1337/api/auth/local/register', {
        identifier: 'dododag05@gmail.com',
        password: 'Dago05-dic03-',
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
        //res.json({ hashedPassword });
    } catch (error) {
        res.status(500).send('Error hashing password');
    }
});
*/
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
