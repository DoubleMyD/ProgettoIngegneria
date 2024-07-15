// /js/controllers/PatternController.js
import SearchModel from '../../back-end/models/SearchModel.js';
import LandingPageView from '../views/LandingPage/LandingPageView.js';

export default class LandingPageController {
    patternId;
    patternFilter = "AllData";

    constructor() {
        this.view = new LandingPageView();
        this.SearchModel = SearchModel;
        this.jwt = localStorage.getItem('jwtToken');    // serve per autenticare la richiesta
        this.initialize();
    }

    async initialize() {
        if (this.jwt != null) {
            this.view.loginButton.setAttribute('href', '/logged-user');
            this.view.loginButton.innerText = 'Account page';
            this.view.loginButton.classList.add('button'); // Aggiunge la classe per lo stile del bottone
        }

        const patterns = await this.SearchModel.fetchPatterns();
        const strategies = await this.SearchModel.fetchStrategies();
        const articles = await this.SearchModel.fetchArticles();
        const owaspCategories = await this.SearchModel.fetchOwaspCategories();
        const isoPhases = await this.SearchModel.fetchIsoPhases();
        const contexts = await this.SearchModel.fetchPatterns();
        this.view.initialize(patterns, strategies, articles, owaspCategories, isoPhases, contexts);
        
        this.view.patternSelect.addEventListener('change', async (event) => {
            const target = event.target;
            if(target instanceof HTMLSelectElement){
                this.patternId = target.value;
                if (this.patternId) {
                  this.updatePatternDetails(this.patternId);
                } 
            }
        });

        this.view.filterPattern.addEventListener('change', async (event) => this.filter(event)/*{  
            const target = event.target;
            if(target instanceof HTMLSelectElement){
                this.patternFilter = target.value;
                this.updatePatternDetails(this.patternId);
            }
        }*/);

        

        this.view.strategySelect.addEventListener('change', async (event) => {
            const target = event.target;
            if(target instanceof HTMLSelectElement){
                this.strategyId = target.value;
                if (this.strategyId) {
                  this.updateStrategyDetails(this.strategyId);
                } 
            }
        });

        this.view.articleSelect.addEventListener('change', async (event) => {
            const target = event.target;
            if(target instanceof HTMLSelectElement){
                this.articleId = target.value;
                if (this.articleId) {
                  this.updateArticleDetails(this.articleId);
                } 
            }
        });

        this.view.owaspSelect.addEventListener('change', async (event) => {
            const target = event.target;
            if(target instanceof HTMLSelectElement){
                this.owaspCategory = target.value;
                if (this.owaspCategory) {
                  this.updateOwaspCategoryDetails(this.owaspCategory);
                } 
            }
        });

        this.view.isoSelect.addEventListener('change', async (event) => {
            const target = event.target;
            if(target instanceof HTMLSelectElement){
                this.isoPhase = target.value;
                if (this.isoPhase) {
                  this.updateIsoPhaseDetails(this.isoPhase);
                } 
            }
        });


        /*this.view.contextSelect.addEventListener('change', async (event) => {
            const target = event.target;
            if(target instanceof HTMLSelectElement){
                this.contextPattern = target.value;
                this.updatePatternDetails(this.patternId);
            }
        });*/

        this.view.contextSelect.addEventListener('change', async (event) => {
            const target = event.target;
            if(target instanceof HTMLSelectElement){
                this.patternId = target.value;
                if (this.patternId) {
                  this.updateContextDetails(this.patternId);
                } 
            }
        });
        
    }

    async filter(event){
        const target = event.target;
        if (target instanceof HTMLSelectElement) {
            this.patternFilter = target.value;
            await this.updatePatternDetails(this.patternId);
        }
    }

    async updatePatternDetails(patternId){
        try{
            const pattern = await this.SearchModel.fetchPatternDetails(patternId);
            this.SearchModel.incrementSearchCounter(patternId, pattern.attributes.searchCounter);
            
            if(this.patternFilter === 'Examples'){
                if(pattern.attributes.examples.data[0] === undefined || pattern.attributes.examples.data[0] === ''){
                    this.view.showInformationNotfound();
                    return;
                }
            }
            
            this.view.updatePatternSection(this.patternFilter, pattern);
            

        }catch(error){
            console.error('Error fetching pattern details:', error);
        }
    }
    
    async updateStrategyDetails(strategyId){
        try{
            const strategy = await this.SearchModel.fetchStrategyDetails(strategyId);
            this.view.updateStrategySection(strategy);
        }catch(error){
            console.error('Error fetching pattern details:', error);
        }
    }

    async updateArticleDetails(articleId){
        try{
            const article = await this.SearchModel.fetchArticleDetails(articleId);
            this.view.updateArticleSection(article);
        }catch(error){
            console.error('Error fetching pattern details:', error);
        }
    }

    async updateOwaspCategoryDetails(owaspId){
        try{
            const owaspCategory = await this.SearchModel.fetchOwaspCategoryDetails(owaspId);
            this.view.updateOwaspSection(owaspCategory);
        }catch(error){
            console.error('Error fetching pattern details:', error);
        }
    }

    async updateIsoPhaseDetails(isoId){
        try{
            const isoPhase = await this.SearchModel.fetchIsoPhaseDetails(isoId);
            this.view.updateIsoSection(isoPhase);
        }catch(error){
            console.error('Error fetching pattern details:', error);
        }
    }

    async updateContextDetails(patternId){
        try{
            const pattern = await this.SearchModel.fetchPatternDetails(patternId);
            this.view.updateContextSection(pattern);


        }catch(error){
            console.error('Error fetching context details:', error);
        }
    }
}
