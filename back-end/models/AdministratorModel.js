export default class AdministratorModel{
    static strapiUrl = 'http://localhost:1337/api/';
    
    static async updatePattern(jwt, dataId, dataObject){
        return await this.updateData('patterns/', jwt, dataId, dataObject);
    }

    static async updateArticle(jwt, dataId, dataObject){
        return await this.updateData('articoli-gdprs/', jwt, dataId, dataObject);
    }

    static async updateCwe(jwt, dataId, dataObject){
        return await this.updateData('cwe-top-25-weaknesses/', jwt, dataId, dataObject);
    }

    static async updateIso(jwt, dataId, dataObject){
        return await this.updateData('iso-9241-210-phases/', jwt, dataId, dataObject);
    }

    static async updateMvc(jwt, dataId, dataObject){
        return await this.updateData('mvcs/', jwt, dataId, dataObject);
    }

    static async updateOwasp(jwt, dataId, dataObject){
        return await this.updateData('owasp-top-10-categories/', jwt, dataId, dataObject);
    }

    static async updatePrivacy(jwt, dataId, dataObject){
        return await this.updateData('privacy-by-design-principles/', jwt, dataId, dataObject);
    }

    static async updateStrategy(jwt, dataId, dataObject){
        return await this.updateData('strategias/', jwt, dataId, dataObject);
    }

    static async updateData(apiEndpoint, jwt, dataId, dataObject){
       try{
        const response = await fetch(this.strapiUrl + apiEndpoint + dataId, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        });

        console.log(response);

        if (!response.ok) {
            // If the response is not OK, handle the error
            const errorData = await response.json();
            throw new Error(errorData.message || 'Not allowed, failed');
        }
        return true;

        } catch (error) {
            console.error('Error during saving:', error);
            return 'Error, make sure you are logged in to add comments';
        }
    }



    static async createPattern(jwt,  dataObject){
        return await this.createData('patterns', jwt, dataObject);
    }

    static async createArticle(jwt,  dataObject){
        return await this.createData('articoli-gdprs', jwt,  dataObject);
    }

    static async createCwe(jwt,  dataObject){
        return await this.createData('cwe-top-25-weaknesses', jwt,  dataObject);
    }

    static async createIso(jwt,  dataObject){
        return await this.createData('iso-9241-210-phases', jwt,  dataObject);
    }

    static async createMvc(jwt, dataObject){
        return await this.createData('mvcs', jwt, dataObject);
    }

    static async createOwasp(jwt,  dataObject){
        return await this.createData('owasp-top-10-categories', jwt, dataObject);
    }

    static async createPrivacy(jwt,  dataObject){
        return await this.createData('privacy-by-design-principles', jwt, dataObject);
    }

    static async createStrategy(jwt,  dataObject){
        return await this.createData('strategias', jwt, dataObject);
    }

    static async createData(apiEndpoint, jwt, dataObject){
        try{
         const response = await fetch(this.strapiUrl + apiEndpoint, {
             method: 'POST',
             headers: {
                 'Authorization': `Bearer ${jwt}`,
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(dataObject)
         });
 
         console.log(response);
 
         if (!response.ok) {
             // If the response is not OK, handle the error
             const errorData = await response.json();
             throw new Error(errorData.message || 'Not allowed, failed');
         }
         return true;
 
         } catch (error) {
             console.error('Error during saving:', error);
             return 'Error, make sure you are logged in to add comments';
         }
     }

}