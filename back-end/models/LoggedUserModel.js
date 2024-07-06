export default class LoggedUserModel{
    static strapiUserUrl = 'http://localhost:1337/api/users'
    static patternsApiUrl = 'http://localhost:1337/api/patterns';

    static async newNotification(jwt) {
        try {
            const userResponse = await fetch(this.strapiUserUrl + '?populate=*', {
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
            //userData.forEach(user => console.log(user.id));
            for(let i=0; i<userData.length; i++)
                await this.modifyNotificationAttribute(jwt, userData[i].id, true);
                //userData.forEach(user => this.modifyNotificationAttribute(jwt, user.id));
            

        } catch (error) {
            console.error('Error during posting comment:', error);
            return 'Error, make sure you are logged in to add comments';
        }
    }

    static async modifyNotificationAttribute(jwt, userId, boolean){
        try {
            const response = await fetch(`${this.strapiUserUrl}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    notification: boolean
                }),
            });
    
            if (!response.ok) {
                throw new Error('Modifica delle notifiche non riuscita');
            }
            return true;
        } catch (error) {
            console.error('Errore durante la modifica delle notifiche:', error);
            return false;
        }
    }

    static async notify(jwt, userId){
        try {
            const response = await fetch(`${this.strapiUserUrl}/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Recupero delle notifiche non riuscito');
            }

            const user = await response.json();
            console.log('Dati ricevuti dal server:', user);
            return {
                hasNotification: user.notification,
                details: user.notificationDetails // Assicurati che il campo sia corretto nel tuo caso
            };
        } catch (error) 
        {
            console.error('Errore durante il recupero delle notifiche:', error);
            return {
                hasNotification: false,
                details: ""
            };
        }
    }

    // Recupera i pattern preferiti di un utente
    static async getFavoritePatterns(jwt, userId) {
        try {
            // Recupera le informazioni dell'utente
            const userResponse = await fetch(`${this.strapiUserUrl}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user information');
            }

            const userData = await userResponse.json();
            const favoritePatternsString = userData.favoritePatterns || '';

            // Converti la stringa di pattern separati da # in un array
            const favoritePatternsArray = favoritePatternsString.split('#').filter(patternId => patternId);

            return favoritePatternsArray;
        } catch (error) {
            console.error('Error fetching favorite patterns:', error);
            return null;
        }
    }

    static async addToFavorites(jwt, userId, patternId) {
        try {
            // Fetch user information to get current favoritePatterns string
            const userResponse = await fetch(`${this.strapiUserUrl}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user information');
            }

            const userData = await userResponse.json();
            let favoritePatternsString = userData.favoritePatterns || '';

            // Check if patternId already exists in favoritePatternsString
            const patternIdString = patternId.toString();
            const patternSeparator = '#';

            if (favoritePatternsString.includes(patternIdString)) {
                throw new Error('Pattern is already in favorites');
            }

            if(favoritePatternsString.split('#').filter(patternId => patternId).length > 4)
                return 'You already have 5 patterns, delete one first'

            // Add patternId to favoritePatternsString
            if (favoritePatternsString) {
                favoritePatternsString += `${patternSeparator}${patternIdString}`;
            } else {
                favoritePatternsString = patternIdString;
            }

            // Update user with new favoritePatternsString
            const updateResponse = await fetch(`${this.strapiUserUrl}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ favoritePatterns: favoritePatternsString })
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update favorite patterns');
            }

            return true; // Success
        } catch (error) {
            console.error('Error adding to favorites:', error);
            return error.message;
        }
    }

    static async deleteFavorite(jwt, userId, patternId) {
        try {
            // Fetch user information to get current favoritePatterns string
            const userResponse = await fetch(`${this.strapiUserUrl}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user information');
            }

            const userData = await userResponse.json();
            let favoritePatternsString = userData.favoritePatterns || '';

            let favorites = favoritePatternsString.split('#').filter(id => id);
            // Remove the patternId from the array
            favorites = favorites.filter(id => id !== patternId.toString());

            // Construct the new favoritePatternsString
            favoritePatternsString = favorites.join('#');

            // Update user with new favoritePatternsString
            const updateResponse = await fetch(`${this.strapiUserUrl}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ favoritePatterns: favoritePatternsString })
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update favorite patterns');
            }

            return true; // Success
        } catch (error) {
            console.error('Error adding to favorites:', error);
            return error.message;
        }
    }

}


