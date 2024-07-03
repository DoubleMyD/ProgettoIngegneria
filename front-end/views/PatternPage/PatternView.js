export default class LandingPageView{
    constructor(){
        //sezione 5 pattern più ricercati
        this.fivePatternsSection = document.getElementById('five-patterns-section');
        this.fivePatternButton = document.getElementById('most-researched-button');
        //sezione pattern e filtri
        this.patternSelect = document.getElementById('pattern-select');
        this.filterPattern = document.getElementById('filter-pattern');
        this.filters = ["AllData", "MVC", "CWE", "OWASP", "ISO 9241-210 Phase", "Strategies", "Description", "Context", "Principles", "Examples"];
        
        this.patternInfo = document.getElementById('pattern-info');
    
        //sezione feedback(contiente "addComment" e "feedback-show", dove effettivamente vengono mostrati i commenti)
        this.feedbackSection = document.getElementById('feedback-section');

        this.feedbackShow = document.getElementById('feedback-show');

        //la sezione feedback contiene la sezione "naggiungi commento" con i relativi bottoni
        this.openCommentSection = document.getElementById('addComment-button');
        this.addCommentSection = document.getElementById('addComment-section');
        this.saveCommentBtn = document.getElementById('saveComment-button');
        this.closeBtn = document.getElementById('close-button');
        this.commentInput = document.getElementById('commentInput');

        //la sezione "nuovo commento" e "feedback" non deve essere visualizzata appena creata la pagina
        this.addCommentSection.style.display = 'none';
        this.feedbackSection.style.display = 'none';

        //sezione per i preferiti
        this.addToFavoritesButton = document.getElementById('add-to-favorites-button');
    }

    //popula i menù a tendina
    initialize(patterns){
        this.populateDropdown(patterns, this.patternSelect);
        this.filters.forEach(filter => { this.createElement('option', this.filterPattern, filter)});
    }

    showAddCommentSection(boolean){
        if(boolean === true)
            this.addCommentSection.style.display = 'block';
        else{
            this.addCommentSection.style.display = 'none';
        }
    }
    
    //funzione di utilità per popolare i menù a tendina (volendo si può usare un foreach, ma è copia incollata da landing-page iniziale, quindi l'ho lasciata così come era)
    populateDropdown(data, container) {
        data.forEach(singleData => {
            const option = document.createElement('option');
            option.value = singleData.id;
            option.textContent = singleData.attributes.nome;
            container.appendChild(option);
        });
    }

    showFivePatterns(patterns){
        //patterns.forEach(pattern => alert(pattern.nome));
        patterns.forEach(pattern => this.createElement('h2', this.fivePatternsSection, pattern.attributes.nome));
    }

    //aggiorna i commenti da mostrare
    showFeedbackSection(comments){
        this.feedbackSection.style.display = 'block';
        this.feedbackShow.innerHTML = '';

        //per ogni commento crea un 'div' element apposito con le sue informazioni
        comments.forEach(comment => this.createCommentElement(comment.attributes.users_permissions_user.data.attributes.username, comment.attributes.commento));
    }

    //aggiorna la sezione dei pattern (anche questa copia incollata, volendo si può migliorare, troppe funzioni di utilità (getName, getDescrizione, ecc.) che possono essere eliminate)
    updatePatternSection(filter, pattern){
        this.patternInfo.innerHTML = '';
        this.patternInfo.style.display = 'block';

        this.createElement('h2', this.patternInfo, this.getName(pattern));  
        switch(filter){
            case this.filters[0]:
                this.showPatternData(pattern);
                break;
            case this.filters[1]:
                this.createElement('p', this.patternInfo, this.getRelatedMvc(pattern));  
                break;
            case this.filters[2]:
                this.createElement('p', this.patternInfo, this.getRelatedCwe(pattern));  
                break;
            case this.filters[3]:
                this.createElement('p', this.patternInfo, this.getRelatedOwasp(pattern));  
                break;
            case this.filters[4]:
                this.createElement('p', this.patternInfo, this.getRelatedISOPhase(pattern));  
                break;  
            case this.filters[5]:
                this.createElement('p', this.patternInfo, this.getRelatedStrategies(pattern));  
                break;       
            case this.filters[6]:
                this.createElement('p', this.patternInfo, this.getDescription(pattern));  
                break;
            case this.filters[7]:
                this.createElement('p', this.patternInfo, this.getContext(pattern));  
                break;   
            case this.filters[8]:
                this.createElement('p', this.patternInfo, this.getRelatedPrinciples(pattern));  
                break;  
            case this.filters[9]:
                this.createElement('p', this.patternInfo, this.getRelatedExamples(pattern));  
                break;                  
            default: 
                this.patternInfo.style.display = 'none'; 
        }
    }

    showPatternData(pattern){
        this.createElement('p', this.patternInfo, this.getDescription(pattern));
        this.createElement('p', this.patternInfo, this.getContext(pattern));
        this.createElement('p', this.patternInfo, this.getRelatedMvc(pattern));
        this.createElement('p', this.patternInfo, this.getRelatedStrategies(pattern));
        this.createElement('p', this.patternInfo, this.getRelatedPrinciples(pattern));
        this.createElement('p', this.patternInfo, this.getRelatedOwasp(pattern));
        this.createElement('p', this.patternInfo, this.getRelatedCwe(pattern));
        this.createElement('p', this.patternInfo, this.getRelatedGDPRArticles(pattern));
        this.createElement('p', this.patternInfo, this.getRelatedISOPhase(pattern));
        this.createElement('p', this.patternInfo, this.getRelatedExamples(pattern));
    }

    getName(data){
        return data.attributes.nome;
    }

    getDescription(data){
        let string = "Descrizione : ";
        string += data.attributes.descrizione;
        return string;
    }

    getContext(data){
        let string = "Contesto : ";
        string += data.attributes.contesto;
        return string;
    }

    getRelatedMvc(data) {
        let string = "MVC : ";
        data.attributes.mvcs.data.forEach(element => {string += element.attributes.nome + '    '});
        return string;
    }

    getRelatedStrategies(data){
        let string = "Strategies : ";
        data.attributes.strategias.data.forEach(element => {string += element.attributes.nome + '    '});
        return string;
    }

    getRelatedPrinciples(data){
        let string = "Privacy by Design Principles : ";
        data.attributes.privacy_by_design_principles.data.forEach(element => {string += element.attributes.nome + '    '});
        return string;
    }

    getRelatedOwasp(data){
        let string = "OWASP Categories : ";
        data.attributes.owasp_top_10_categories.data.forEach(element => {string += element.attributes.nome + '    '});
        return string;
    }

    getRelatedCwe(data){
        let string = "CWE Categories : ";
        data.attributes.cwe_top_25_weaknesses.data.forEach(element => {string += element.attributes.nome + '    '});
        return string;
    }

    getRelatedGDPRArticles(data){
        let string = "GDPR Articles : ";
        data.attributes.articoli_gdprs.data.forEach(element => {string += element.attributes.identificatore + " : " + element.attributes.nome + '    '});
        return string;
    }

    getRelatedISOPhase(data){
        let string = "ISO 9241 210 Phases : ";
        data.attributes.iso_9241_210_phases.data.forEach(element => {string += element.attributes.identificatore + " : " + element.attributes.nome + '    '});
        return string;
    }

    getRelatedExamples(data){
        let string = "Examples : ";
        data.attributes.examples.data.forEach(element => {string += element.attributes.testo + "   .   "});
        return string;
    }

    getRelatedPatterns(data){
        let string = "Patterns : ";
        data.attributes.patterns.data.forEach(pattern => string += pattern.attributes.nome + "  ,  ");
        return string;
    }
/*
    getRelatedPatterns(data){
        let string = "Patterns : ";
        data.patterns.forEach(pattern => string += pattern.nome + "  ,  ");
        return string;
    }
*/
    //informa che l'informazione non è stata trovata
    showInformationNotfound(){
        alert("INFORMATION NOT FOUND");
    }

    //crea gli elementi dinamicamente
    createElement(typeOfElement, contenitor, text){
        const newElement = document.createElement(typeOfElement);
        newElement.textContent = text;
        contenitor.appendChild(newElement);
    }

    //crea una singolo commento
    createCommentElement(username, comment ){
        const contenitor = document.createElement('div')

        this.createElement('h3', contenitor, username);
        this.createElement('p', contenitor, comment);

        this.feedbackShow.append(contenitor);
    }

    // mostra la notifica quando un pattern viene aggiunto ai preferiti
    showFavoriteAddedNotification(patternName) {
        alert(`${patternName} has been added to your favorites!`);
    }

    // mostra l'errore se aggiunta ai preferiti fallisce
    showFavoriteErrorNotification(error) {
        alert(`Failed to add to favorites: ${error}`);
    }

}