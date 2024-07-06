export default class LoggedUserView {
    constructor(){
        this.circleNotification = document.getElementById('myCircle');
        this.notificationDetails = document.getElementById('notificationDetails'); // Assicurati che questo elemento esista nell'HTML
        this.favoritePatternsContainer = document.getElementById('favorite-patterns');
        this.logoutButton = document.getElementById('logout-button');

    }

    updateNotificationCircle(hasNotification){
        //console.log(hasNotification + " circle : " + this.circleNotification);
        if(hasNotification){
            this.circleNotification.style.fill= 'red';//red
        }
        else{
            this.circleNotification.style.fill= 'grey';//grey
        }
    }

    showNotificationDetails(details){
        //console.log("Showing notification details:", details);
        this.notificationDetails.textContent = details;
        this.notificationDetails.style.display = details ? 'block' : 'none'; // Mostra o nasconde i dettagli della notifica
    }
    
    showFavoritePatterns(patterns, deleteFunc) {
        // Pulisci il contenitore dei pattern preferiti
        this.favoritePatternsContainer.innerHTML = '';

        if (patterns.length === 0) {
            this.favoritePatternsContainer.innerHTML = '<p>No favorite patterns found.</p>';
            return;
        }

        // Crea un elenco di pattern preferiti
        const ul = document.createElement('ul');
        patterns.forEach(pattern => {
            /*const li = document.createElement('li');
            li.textContent = `Pattern ID: ${patternId}`; // Puoi personalizzare questo per mostrare più dettagli
            ul.appendChild(li);*/
            this.createFavoriteElement(pattern.id, pattern.attributes.nome, deleteFunc)
            
        });

        this.favoritePatternsContainer.appendChild(ul);
    }

    // Metodo per mostrare messaggi di errore
    displayError(message) {
        this.favoritePatternsContainer.innerHTML = `<p>${message}</p>`;
    }

    //crea una singolo commento
    createFavoriteElement(patternId, nomePattern, deleteFunc){
        const contenitor = document.createElement('a');
        //contenitor.classList.add('comment')
        contenitor.setAttribute('href', `/pattern?patternId=${patternId}`);
        this.createElement('h3', contenitor, nomePattern);
        
        const button = this.createElement('button', contenitor, 'DELETE');
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevents the default behavior of the anchor tag
            deleteFunc(patternId);
        });

        this.favoritePatternsContainer.append(contenitor);
    }

    //crea gli elementi dinamicamente
    createElement(typeOfElement, contenitor, text){
        const newElement = document.createElement(typeOfElement);
        newElement.textContent = text;
        contenitor.appendChild(newElement);
        return newElement;
    }
}
