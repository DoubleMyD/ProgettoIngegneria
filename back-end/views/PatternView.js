// /js/views/PatternView.js
export default class PatternView {
    constructor() {
        this.patternSelect = document.getElementById('pattern-select');
        this.patternInfo = document.getElementById('pattern-info');
        this.patternName = document.getElementById('pattern-name');
        this.patternDescription = document.getElementById('pattern-description');
        this.patternContext = document.getElementById('pattern-context');
        this.patternMvc = document.getElementById('pattern-mvc');
        this.patternStrategies = document.getElementById('pattern-strategies');
        this.patternPrinciples = document.getElementById('pattern-principles');
        this.patternOwaspCategories = document.getElementById('pattern-owasp-categories');
        this.patternCweCategories = document.getElementById('pattern-cwe-categories');
        this.patternGdprArticles = document.getElementById('pattern-gdpr-articles');
        this.patternIsoPhases = document.getElementById('pattern-iso-phases');
    }

    populateDropdown(patterns) {
        //this.patternSelect.innerHTML = '<option value="">Select a pattern</option>';
        patterns.forEach(pattern => {
            const option = document.createElement('option');
            option.value = pattern.id;
            option.textContent = pattern.attributes.Nome;
            this.patternSelect.appendChild(option);
        });
    }

    updatePatternDetails(patternData){
        this.displayPatternDetails(patternData);
        this.displayPatternMvc(patternData);
        this.displayPatternStrategies(patternData);
        this.displayPatternPrinciples(patternData);
        this.displayPatternOwaspCategories(patternData);
        this.displayPatternCweCategories(patternData);
        this.displayPatternGdprArticles(patternData);
        this.displayPatternIsoPhases(patternData);
    }

    displayPatternDetails(pattern) {
        this.patternName.textContent = pattern.attributes.Nome;
        this.patternDescription.textContent = `Descrizione : ${pattern.attributes.descrizione}`;
        this.patternContext.textContent = `Contesto : ${pattern.attributes.contesto}`;
        this.patternInfo.style.display = 'block';
    }

    displayPatternMvc(pattern) {
        let string = "MVC collocation : ";
        pattern.attributes.mvcs.data.forEach(mvc => { string += mvc.attributes.collocazione + ' '; });
        this.patternMvc.textContent = string;
    }

    displayPatternStrategies(pattern) {
        let string = "Strategies : ";
        pattern.attributes.strategias.data.forEach(strategy => { string += strategy.attributes.nome + ' '; });
        this.patternStrategies.textContent = string;
    }

    displayPatternPrinciples(pattern) {
        let string = "Privacy by design principles : ";
        pattern.attributes.privacy_by_design_principles.data.forEach(principle => { string += principle.attributes.nome + ' '; });
        this.patternPrinciples.textContent = string;
    }

    displayPatternOwaspCategories(pattern) {
        let string = "OWASP categories : ";
        pattern.attributes.owasp_top_10_categories.data.forEach(category => { string += category.attributes.identificatore + ":" + category.attributes.nome + ' '; });
        this.patternOwaspCategories.textContent = string;
    }

    displayPatternCweCategories(pattern) {
        let string = "CWE categories : ";
        pattern.attributes.cwe_top_25_weaknesses.data.forEach(category => { string += category.attributes.identificatore + ":" + category.attributes.weakness + ' '; });
        this.patternCweCategories.textContent = string;
    }

    displayPatternGdprArticles(pattern) {
        let string = "GDPR Articles : ";
        pattern.attributes.articoli_gdprs.data.forEach(article => { string += article.attributes.numero + ":" + article.attributes.nome + ' '; });
        this.patternGdprArticles.textContent = string;
    }

    displayPatternIsoPhases(pattern) {
        let string = "ISO 9241 210 Phases : ";
        pattern.attributes.iso_9241_210_phases.data.forEach(phase => { string += phase.attributes.numero + ":" + phase.attributes.nome + ' '; });
        this.patternIsoPhases.textContent = string;
    }
}
