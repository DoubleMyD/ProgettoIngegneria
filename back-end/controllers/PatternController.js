// /js/controllers/PatternController.js
import PatternModel from '../models/PatternModel.js';
import PatternView from '../views/PatternView.js';

export default class PatternController {
    constructor() {
        this.model = PatternModel;
        this.view = new PatternView();

        this.initialize();
    }

    async initialize() {
        const patterns = await this.model.fetchPatterns();
        this.view.populateDropdown(patterns.data);

        this.view.patternSelect.addEventListener('change', async (event) => {
            const target = event.target;
            if(target instanceof HTMLSelectElement){
                const patternId = target.value;
                if (patternId) {
                  this.updatePatternDetails(patternId);
                } else {
                   this.view.patternInfo.style.display = 'none';
                }
            }
        });
    }

    updatePatternDetails(patternId){
        try{
            const patternData = this.model.fetchPatternDetails(patternId);
            this.view.updatePatternDetails(patternData);
        }catch(error){
            console.error('Error fetching pattern details:', error);
        }
    }
}