export default class AuthenticationModel {
    static registerApiUrl = 'http://localhost:1337/api/auth/local/register';
    static authenticateApiUrl = 'http://localhost:1337/api/auth/local';

    static async registerUser(username, email, password) {
        try {
            const response = await fetch(this.registerApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,  // Strapi expects 'identifier' for email/username
                    password: password
                }),
            });

            if (!response.ok) {
                // If the response is not OK, handle the error
                const errorData = await response.json();
                throw new Error(errorData.message || 'Authentication failed');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error during authentication:', error);
            return null;  // Return null if authentication fails
        }
    }

    static async authenticateUser(email, password) {
        try {
            const response = await fetch(this.authenticateApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: email,  // Strapi expects 'identifier' for email/username
                    password: password
                }),
            });

            if (!response.ok) {
                // If the response is not OK, handle the error
                const errorData = await response.json();
                throw new Error(errorData.message || 'Authentication failed');
            }

            const data = await response.json();
            console.log(data)

            const userId = data.user.id;
            const jwt = data.jwt;

            return { jwt, userId };

        } catch (error) {
            console.error('Error during authentication:', error);
            return null;  // Return null if authentication fails
        }
    }

    static async getRole(jwt){
        try {
            const userResponse = await fetch( 'http://localhost:1337/api/users/me?populate=*', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await userResponse.json();
            return userData.role.name
            
        } catch (error) {
            console.error('Error during posting comment:', error);
            return 'Error, make sure you are logged in to add comments';
        }
    }

    /*
    static async getUserData(email){
        const response = await fetch(AuthenticationModel.userApiUrl);
        const users = await response.json();
        return users.find(user => user.email === email);
    }

    static async authenticateEmail(email) {
            const response = await fetch(AuthenticationModel.userApiUrl);
            const users = await response.json();
        
            for(let user of users){
                if(user.email === email)
                    return user.email;
            }

            return false;
    }

    static async authenticateUsername(userName) {
        const response = await fetch(AuthenticationModel.userApiUrl);
        const users = await response.json();
        
        for(let user of users){
            if(user.username === userName)
                return user.username;
        }

        return false;
    }

    static async authenticatePassword(email, password){
        const response = await fetch(`${AuthenticationModel.userWithPasswordApiUrl}/${email}`);
        const user = await response.json();

        const hashedPassword = await this.bcrypt.hash(password, 10);
        if(hashedPassword === user.password)
            return true;
        else
            return false;
    }*/


    static emailSyntaxCorrect(email) {
        //se va bene
        return true;
        //se non va bene 
        //return false;
    }

    static passwordSyntaxCorrect(password) {
        if (password.length >= 4)
            return true;
        else
            return false;
    }

    static usernameSyntaxCorrect(username) {
        //se va bene
        return true;
        //se non va bene 
        //return false;
    }

}
