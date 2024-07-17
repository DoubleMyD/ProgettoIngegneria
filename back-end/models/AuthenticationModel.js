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
