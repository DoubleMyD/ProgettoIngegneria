export default class FeedbackModel {
    static feedbackApiUrl = 'http://localhost:1337/api/feedbacks';

    static async getComments(jwt, collectionName, nameOfObject) {
        const queryParams = new URLSearchParams({
            'filters[collection][$eq]': collectionName,
            'filters[nameOfObject][$eq]': nameOfObject,
            'populate': '*'
        });

        const url = `${this.feedbackApiUrl}?${queryParams.toString()}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    //'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // If the response is not OK, handle the error
                const errorData = await response.json();
                throw new Error(errorData.message || 'Not allowed, failed');
            }

            const data = await response.json();
            return data.data;

        } catch (error) {
            console.error('Error during authentication:', error);
            return null;  // Return null if authentication fails
        }
    }



    static async addComment(jwt, userId, collection, nameOfObject, comment) {
        try {
            const userResponse = await fetch(`http://localhost:1337/api/users/${userId}`, {
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

            console.log(userId);
            const response = await fetch(this.feedbackApiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        commento: comment,
                        collection: collection,
                        nameOfObject: nameOfObject,
                        users_permissions_user: userData
                    }
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
}
