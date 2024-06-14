export default class LoggedUserModel{
    static strapiUserUrl = 'http://localhost:1337/api/users'

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
    try{
        const response = await fetch(this.strapiUserUrl + '/' + userId, {
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
            // If the response is not OK, handle the error
            const errorData = await response.json();
            throw new Error(errorData.message || 'Not allowed, failed');
        }
        return true;

    } catch (error) {
        console.error('Error during posting comment:', error);
        return 'Error, make sure you are logged in to add comments';
    }
    }

    static async notify(jwt, userId){
        try{
            const response = await fetch(this.strapiUserUrl + '/' + userId, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
            });
    
            if (!response.ok) {
                // If the response is not OK, handle the error
                const errorData = await response.json();
                throw new Error(errorData.message || 'Not allowed, failed');
            }
            const user = await response.json();
            console.log(user.notification);
            return user.notification;
    
        } catch (error) {
            console.error('Error during posting comment:', error);
            return 'Error, make sure you are logged in to add comments';
        }

    }
}


