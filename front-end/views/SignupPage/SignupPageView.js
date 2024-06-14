export default class LoginPageView{
    constructor(){
        this.username = document.getElementById('input-username');
        this.email = document.getElementById('input-email');
        this.password = document.getElementById('input-password');

        this.signupButton = document.getElementById('signup-button');
 }

    showSyntaxError(message){
        alert(message);
    }

    getEmail(){
       //this.email.value;
        // @ts-ignore
        return this.email.value;
    }

    getPassword(){
        // @ts-ignore
        return this.password.value;
    }

    getUsername(){
        // @ts-ignore
        return this.username.value;
    }


}