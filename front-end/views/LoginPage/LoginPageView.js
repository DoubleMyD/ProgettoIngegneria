export default class LoginPageView{
    constructor(){
        this.email = document.getElementById('input-email');
        this.password = document.getElementById('input-password');

        this.loginButton = document.getElementById('login-button');
        this.logoutButton = document.getElementById('logout-button');
 }

    showSyntaxError(message){
        alert(message);
    }

    getEmail(){
       //this.email.value;
        return this.email.value;
    }

    getPassword(){
        return this.password.value;
    }


}