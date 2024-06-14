export default class LoggedUserView {
    constructor(){
        this.circleNotification = document.getElementById('myCircle');
    }

    updateNotificationCircle(boolean){
        console.log(boolean + " circle : " + this.circleNotification);
        if(boolean){
            this.circleNotification.style.fill= 'red';//red
        }
        else{
            this.circleNotification.style.fill= 'grey';//grey
        }
    }
}
