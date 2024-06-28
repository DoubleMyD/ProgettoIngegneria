export default class LoggedUserView {
    constructor(){
        this.circleNotification = document.getElementById('myCircle');
        this.notificationDetails = document.getElementById('notificationDetails'); // Assicurati che questo elemento esista nell'HTML
    }

    updateNotificationCircle(hasNotification){
        console.log(hasNotification + " circle : " + this.circleNotification);
        if(hasNotification){
            this.circleNotification.style.fill= 'red';//red
        }
        else{
            this.circleNotification.style.fill= 'grey';//grey
        }
    }

    showNotificationDetails(details){
        console.log("Showing notification details:", details);
        this.notificationDetails.textContent = details;
        this.notificationDetails.style.display = details ? 'block' : 'none'; // Mostra o nasconde i dettagli della notifica
    }
}
