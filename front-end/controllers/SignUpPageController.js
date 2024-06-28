import AuthenticationModel from '../../back-end/models/AuthenticationModel.js';
import SignupPageView from '../views/SignupPage/SignupPageView.js';


export default class LoginPageController{
    constructor(){
        this.view = new SignupPageView();
        this.authenticationModel = AuthenticationModel;

        this.view.signupButton.addEventListener('click', async (event) => {
             event.preventDefault();
             await this.register() })
        ;
    }

    async register(){
        const username = this.view.getUsername();
        const email = this.view.getEmail();
        const password = this.view.getPassword();
        this.view.showSyntaxError(email);

        if(!this.authenticationModel.emailSyntaxCorrect(email)){
            this.view.showSyntaxError('Email syntax is not correct');
            return;
        }

        if(!this.authenticationModel.passwordSyntaxCorrect(password)){
            this.view.showSyntaxError('Password syntax is not correct');
            return;
        }

        if(!this.authenticationModel.usernameSyntaxCorrect(username)){
            this.view.showSyntaxError('username syntax is not correct');
            return;
        }

        if(await this.authenticationModel.registerUser(username, email, password)){
            alert('Registretion completed');
            window.location.href = "/login-page";
        }
    }
}