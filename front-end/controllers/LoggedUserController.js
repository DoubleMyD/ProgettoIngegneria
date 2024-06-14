import LoggedUserModel from '../../back-end/models/LoggedUserModel.js';
import LoggedUserView from "../views/LoggedUserPage/LoggedUserView.js";

export default class LoggedUserController{
    constructor(){
        this.view = new LoggedUserView();
        this.LoggedUserModel = LoggedUserModel;
        this.jwt = localStorage.getItem('jwtToken');    //serve per autenticare la richiesta
        this.userId = localStorage.getItem('userId');
        
        this.initialize();
    }

    initialize(){
        this.updateNotification();

        this.view.circleNotification.addEventListener('click', () => this.takingVision());
    }

    async updateNotification(){
        const notify = await this.LoggedUserModel.notify(this.jwt, this.userId);
        console.log(notify);
        this.view.updateNotificationCircle(notify);
    }

    async takingVision(){
        this.LoggedUserModel.modifyNotificationAttribute(this.jwt, this.userId, false);
        this.view.updateNotificationCircle(false);
    }


}