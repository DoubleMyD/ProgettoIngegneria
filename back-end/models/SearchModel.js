export default class SearchModel{
    static patternsApiUrl = 'http://localhost:1337/api/patterns';
    static strategiesApiUrl = 'http://localhost:1337/api/strategias';
    static gdprArticlesApiUrl = 'http://localhost:1337/api/articoli-gdprs';
    static owaspCategoriesApiUrl = 'http://localhost:1337/api/owasp-top-10-categories';
    static isoPhasesApiUrl = 'http://localhost:1337/api/iso-9241-210-phases';
    static strapiUrl = 'http://localhost:1337';

    static async fetchPatterns() {
        const response = await fetch(SearchModel.patternsApiUrl + '?populate=*&pagination[page]=1&pagination[pageSize]=50');
        const patterns = await response.json();
        return patterns.data;
    }

    static async fetchMostFiveResearchedPattern(){
        const response = await fetch(SearchModel.patternsApiUrl);
        const patterns = await response.json();
        const fivePatterns = patterns.data.sort((a, b) => b.attributes.searchCounter - a.attributes.searchCounter).slice(0, 5);
        return fivePatterns;
    }

    //restituisce il pattern ricercato e incrementa il counter del numero di ricerche effettuate su quel pattern
    static async fetchPatternDetails(patternId) {
        const response = await fetch(`${SearchModel.patternsApiUrl}/increment-search/${patternId}`);
        //const response = await fetch(`${SearchModel.patternsApiUrl}/${patternId}`);
        const pattern = await response.json();
        return pattern;
    }
    
    static async fetchStrategies() {
        const response = await fetch(SearchModel.strategiesApiUrl + '?populate=*');
        const strategies = await response.json();
        return strategies.data;
    }

    static async fetchStrategyDetails(strategyId) {
        const response = await fetch(`${SearchModel.strategiesApiUrl}/${strategyId}?populate=*`);
        const strategy = await response.json();
        return strategy.data;
    }

    static async fetchArticles(){
        const response = await fetch(SearchModel.gdprArticlesApiUrl + '?populate=*');
        const articles = await response.json();
        return articles.data;
    }

    static async fetchArticleDetails(articleId){
        const response = await fetch(`${SearchModel.gdprArticlesApiUrl}/${articleId}?populate=*`);
        const article = await response.json();
        return article.data;
    }

    static async fetchOwaspCategories(){
        const response = await fetch(SearchModel.owaspCategoriesApiUrl + '?populate=*');
        const owaspCategories = await response.json();
        return owaspCategories.data;
    }

    static async fetchOwaspCategoryDetails(owaspCategoryId){
        const response = await fetch(`${SearchModel.owaspCategoriesApiUrl}/${owaspCategoryId}?populate=*`);
        const owaspCategory = await response.json();
        return owaspCategory.data;
    }

    static async fetchIsoPhases(){
        const response = await fetch(SearchModel.isoPhasesApiUrl + '?populate=*');
        const owaspCategories = await response.json();
        return owaspCategories.data;
    }

    static async fetchIsoPhaseDetails(isoPhaseId){
        const response = await fetch(`${SearchModel.isoPhasesApiUrl}/${isoPhaseId}?populate=*`);
        const owaspCategory = await response.json();
        return owaspCategory.data;
    }

    static async fetchCWEWeaknesses(){
        const response = await fetch(`${this.strapiUrl}/api/cwe-top-25-weaknesses?populate=*`);
        const data = await response.json();
        return data.data;
    }

    static async fetchExamples(){
        const response = await fetch(`${this.strapiUrl}/api/examples?populate=*`);
        const data = await response.json();
        return data.data;
    }

    static async fetchMVC(){
        const response = await fetch(`${this.strapiUrl}/api/mvcs?populate=*`);
        const data = await response.json();
        return data.data;
    }

    static async fetchPrivacyByDesign(){
        const response = await fetch(`${this.strapiUrl}/api/privacy-by-design-principles?populate=*`);
        const data = await response.json();
        return data.data;
    }

/*    static async fetchStrategias(){
        const response = await fetch(`${this.strapiUrl}/api/strategias?populate=*`);
        const data = await response.json();
        return data.data;
    }
*/
}