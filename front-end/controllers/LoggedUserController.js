import LoggedUserModel from '../../back-end/models/LoggedUserModel.js';
import LoggedUserView from "../views/LoggedUserPage/LoggedUserView.js";

export default class LoggedUserController{
    constructor(){
        console.log("Initializing controller");
        this.view = new LoggedUserView();
        this.LoggedUserModel = LoggedUserModel;
        this.jwt = localStorage.getItem('jwtToken');    //serve per autenticare la richiesta
        this.userId = localStorage.getItem('userId');
        
        this.initialize();
    }

    initialize(){

        this.updateNotification();

        this.view.circleNotification.addEventListener('click', () => this.takingVision());
        this.updateFavoritePatterns(); // Aggiunto per inizializzare i pattern preferiti
    }

    async updateNotification(){
        try {
            const notify = await this.LoggedUserModel.notify(this.jwt, this.userId);
            console.log(notify);
    
            // Aggiorna il cerchio delle notifiche
            this.view.updateNotificationCircle(notify.hasNotification);
    
            // Mostra i dettagli della notifica se ci sono notifiche
            if (notify.hasNotification) {
                this.view.showNotificationDetails(notify.details);
            } else {
                this.view.showNotificationDetails(""); // Nasconde i dettagli della notifica se non ci sono notifiche
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento delle notifiche:', error);
        }
    }

    async takingVision(){
        try {
            await this.LoggedUserModel.modifyNotificationAttribute(this.jwt, this.userId, false);

            // Aggiorna il cerchio delle notifiche a grigio (nessuna notifica)
            this.view.updateNotificationCircle(false);

            // Nasconde i dettagli della notifica
            this.view.showNotificationDetails("");
        } catch (error) {
            console.error('Errore durante l\'aggiornamento delle notifiche:', error);
        }
    }

    async updateFavoritePatterns() {
        try {
            const favoritePatterns = await this.LoggedUserModel.getFavoritePatterns(this.jwt, this.userId);

            if (favoritePatterns) {
                this.view.showFavoritePatterns(favoritePatterns);
            } else {
                console.error('Failed to retrieve favorite patterns');
                this.view.displayError('Failed to retrieve favorite patterns');
            }
        } catch (error) {
            console.error('Error displaying favorite patterns:', error);
            this.view.displayError('Error displaying favorite patterns');
        }
    }

}