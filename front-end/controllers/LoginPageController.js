import AuthenticationModel from '../../back-end/models/AuthenticationModel.js';
import LoginPageView from '../views/LoginPage/LoginPageView.js';


export default class LoginPageController{
    constructor(){
        this.view = new LoginPageView();
        this.authenticationModel = AuthenticationModel;

        this.view.loginButton.addEventListener('click', async (event) => {
             event.preventDefault();
             await this.login(); 
        });

        this.view.logoutButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.logout(); 
       });
    }

    async login(){
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
        this.view.showSyntaxError(password);

        const data = await this.authenticationModel.authenticateUser(email, password);
        if(data != null){
            localStorage.setItem('jwtToken', data.jwt);
            localStorage.setItem('userId', data.userId);
            alert(data.userId);
            window.location.href = "/logged-user";
        }
    }

    logout(){
        localStorage.removeItem('jwtToken');
        alert('logout successful');
        window.location.href = "/landing-page";
    }
}