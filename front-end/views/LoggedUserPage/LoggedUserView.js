export default class LoggedUserView {
    constructor(){
        this.circleNotification = document.getElementById('myCircle');
        this.notificationDetails = document.getElementById('notificationDetails'); // Assicurati che questo elemento esista nell'HTML
        this.favoritePatternsContainer = document.getElementById('favorite-patterns');
        this.logoutButton = document.getElementById('logout-button');

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
    
    showFavoritePatterns(patterns) {
        // Pulisci il contenitore dei pattern preferiti
        this.favoritePatternsContainer.innerHTML = '';

        if (patterns.length === 0) {
            this.favoritePatternsContainer.innerHTML = '<p>No favorite patterns found.</p>';
            return;
        }

        // Crea un elenco di pattern preferiti
        const ul = document.createElement('ul');
        patterns.forEach(patternId => {
            const li = document.createElement('li');
            li.textContent = `Pattern ID: ${patternId}`; // Puoi personalizzare questo per mostrare più dettagli
            ul.appendChild(li);
            
        });

        this.favoritePatternsContainer.appendChild(ul);
    }

    // Metodo per mostrare messaggi di errore
    displayError(message) {
        this.favoritePatternsContainer.innerHTML = `<p>${message}</p>`;
    }
}
