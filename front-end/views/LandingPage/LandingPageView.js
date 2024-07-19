export default class LandingPageView{
    constructor(){
        this.loginButton = document.getElementById('login-button-link')

        this.patternSelect = document.getElementById('pattern-select'); 
        this.filterPattern = document.getElementById('filter-pattern');
        this.filters = ["AllData", "MVC", "CWE", "OWASP", "ISO 9241-210 Phase", "Strategies", "Description", "Context", "Principles", "Examples"];
        
        this.strategySelect = document.getElementById('strategy-select');
        this.articleSelect = document.getElementById('article-select');
        this.owaspSelect = document.getElementById('owasp-select');
        this.isoSelect = document.getElementById('iso-select');
        this.contextSelect = document.getElementById('context-select');

        this.patternInfo = document.getElementById('pattern-info');
        this.strategyInfo = document.getElementById('strategy-info');
        this.articleInfo = document.getElementById('article-info');
        this.owaspInfo = document.getElementById('owasp-info');
        this.isoInfo = document.getElementById('iso-info');
        this.contextInfo = document.getElementById('context-info');

        
    }

    initialize(patterns, strategies, articles, owasp, iso, contexts){
        this.populateDropdown(patterns, this.patternSelect);
        this.populateDropdown(strategies, this.strategySelect);
        this.populateDropdown(articles, this.articleSelect);
        this.populateDropdown(owasp, this.owaspSelect);
        this.populateDropdown(iso, this.isoSelect);
        this.populateContextDropdown(contexts, this.contextSelect);
        this.filters.forEach(filter => { this.createElement('option', this.filterPattern, filter)});
    }

    populateDropdown(data, container) {
        data.forEach(singleData => {
            const option = document.createElement('option');
            option.value = singleData.id;
            option.textContent = singleData.attributes.nome;
            container.appendChild(option);
        });
    }

    populateContextDropdown(data, container) {
        data.forEach(singleData => {
            const option = document.createElement('option');
            option.value = singleData.id;
           
            option.textContent = singleData.attributes.contesto;
            container.appendChild(option);
        });
    }

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

    updateStrategySection(strategy){
        this.strategyInfo.innerHTML = '';
        this.strategyInfo.style.display = 'block';

        console.log(strategy);
        this.createElement('h2', this.strategyInfo, this.getName(strategy));  
        this.createElement('p', this.strategyInfo, this.getRelatedPatterns(strategy));  
        this.createElement('p', this.strategyInfo, this.getRelatedGDPRArticles(strategy));  
        this.createElement('p', this.strategyInfo, this.getRelatedPrinciples(strategy));  
        
    }

    updateArticleSection(article){
        this.articleInfo.innerHTML = '';
        this.articleInfo.style.display = 'block';

        this.createElement('h2', this.articleInfo, this.getName(article));  
        this.createElement('p', this.articleInfo, this.getRelatedPatterns(article));  
    }

    updateOwaspSection(owaspCategory){
        this.owaspInfo.innerHTML = '';
        this.owaspInfo.style.display = 'block';

        this.createElement('h2', this.owaspInfo, this.getName(owaspCategory));  
        this.createElement('p', this.owaspInfo, this.getRelatedPatterns(owaspCategory));  
    }

    updateIsoSection(isoPhase){
        this.isoInfo.innerHTML = '';
        this.isoInfo.style.display = 'block';

        this.createElement('h2', this.isoInfo, this.getName(isoPhase));  
        this.createElement('p', this.isoInfo, this.getRelatedPatterns(isoPhase));  
    }

    updateContextSection(contesto){
        this.contextInfo.innerHTML = '';
        this.contextInfo.style.display = 'block';

        //this.createElement('h2', this.contextInfo, this.getNameContext(contesto));  
        this.createElement('p', this.contextInfo, this.getName(contesto));  
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
    
    showInformationNotfound(){
        alert("INFORMATION NOT FOUND");
    }

    createElement(typeOfElement, contenitor, text){
        const newElement = document.createElement(typeOfElement);
        newElement.textContent = text;
        contenitor.appendChild(newElement);
    }

}