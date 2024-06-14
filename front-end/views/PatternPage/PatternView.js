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
        return data.nome;
    }

    getDescription(data){
        let string = "Descrizione : ";
        string += data.descrizione;
        return string
    }

    getContext(data){
        let string = "Contesto : ";
        string += data.contesto;
        return string
    }

    getRelatedMvc(data) {
        let string = "MVC : ";
        data.mvcs.forEach(element => {string += element.collocazione + '    '});
        return string;
    }

    getRelatedStrategies(data){
        let string = "Strategies : ";
        data.strategias.forEach(element => {string += element.nome + '    '});
        return string;
    }

    getRelatedPrinciples(data){
        let string = "Privacy by Design Principles : ";
        data.privacy_by_design_principles.forEach(element => {string += element.nome + '    '});
        return string;
    }

    getRelatedOwasp(data){
        let string = "OWASP Categories : ";
        data.owasp_top_10_categories.forEach(element => {string += element.nome + '    '});
        return string;
    }

    getRelatedCwe(data){
        let string = "CWE Categories : ";
        data.cwe_top_25_weaknesses.forEach(element => {string += element.weakness + '    '});
        return string;
    }

    getRelatedGDPRArticles(data){
        let string = "GDPR Arctiles : ";
        data.articoli_gdprs.forEach(element => {string += element.numero + " : " + element.nome + '    '});
        return string;
    }

    getRelatedISOPhase(data){
        let string = "ISO 9241 210 Phases : ";
        data.iso_9241_210_phases.forEach(element => {string += element.numero + " : " + element.nome + '    '});
        return string;
    }

    getRelatedExamples(data){
        let string = "Examples : ";
        data.examples.forEach(element => {string += element.testo + "   .   "});
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

}