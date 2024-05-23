// /js/models/PatternModel.js
export default class PatternModel {
    static apiUrl = 'http://localhost:1337/api/patterns';

    static async fetchPatterns() {
        const response = await fetch(PatternModel.apiUrl);
        const data = await response.json();
        return data.data;
    }

    static async fetchPatternDetails(patternId) {
        const response = await fetch(`${PatternModel.apiUrl}/${patternId}?populate=*`);
        const data = await response.json();
        return data;
    }
}
