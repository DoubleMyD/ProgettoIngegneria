import SearchModel from '../../back-end/models/SearchModel.js';
import FeedbackModel from '../../back-end/models/FeedbackModel.js';
import PatternView from '../views/PatternPage/PatternView.js';

export default class PatternController {
    patternId;
    patternFilter = "AllData";
     
    shownPatternName;

    constructor() {
        this.view = new PatternView();
        this.SearchModel = SearchModel;
        this.FeedbackModel = FeedbackModel;
        this.jwt = localStorage.getItem('jwtToken');    //serve per autenticare la richiesta
        this.userId = localStorage.getItem('userId');   //serve per passare le informazioni dello user nelle relazioni dei commentifeedback
        this.inputFrom = 'Pattern'; //serve per i commenti, per sapere a quale "categoria" appartengono e in base a quello fare effettuare la ricerca ( non è indispensabile ma dà una maggiore comprensibilità)

        //alert(this.userId + " " + this.jwt);
        this.initialize();
    }

    

    async initialize() {
        //inizializza la sezione per i 5 pattern più ricercati
        /*const fivePatterns = await this.SearchModel.fetchMostFiveResearchedPattern();
        this.view.showFivePatterns(fivePatterns);*/
        this.view.fivePatternButton.addEventListener('click', async (event) => this.showFivePattern());


        //inizializza i parametri per la selezione del pattern
        const patterns = await this.SearchModel.fetchPatterns();
        this.view.initialize(patterns);

        //inizializza i listener per la sezione commenti
        this.initAddCommentSectionLogic();

        //quando si seleziona una nuova voce dal menù a tendina, ricerca le informazioni
        this.view.patternSelect.addEventListener('change', async (event) => {
            const target = event.target;
            if (target instanceof HTMLSelectElement) {
                this.patternId = target.value;
                if (this.patternId) {
                    //aggiorna le informazioni del pattern
                    await this.updatePatternDetails(this.patternId);
                    //aggiorna i commenti in base al pattern scelto
                    await this.updateFeedbackSection();
                }
            }
        });

        //quando si selziona un filtro, aggiorna le voci da mostrare
        this.view.filterPattern.addEventListener('change', async (event) => this.filter(event));
    }

    async showFivePattern(){
        const fivePatterns = await this.SearchModel.fetchMostFiveResearchedPattern();
        this.view.showFivePatterns(fivePatterns);
    }

    async filter(event){
        const target = event.target;
            if (target instanceof HTMLSelectElement) {
                this.patternFilter = target.value;
                await this.updatePatternDetails(this.patternId);
                await this.updateFeedbackSection();
            }
    }

    //inizializza i listener(servono a capire quando avviene un evento(mouse, bottone, ecc.))
    initAddCommentSectionLogic() {
        //se clicchi il bottone, si apre la sezione per aggiungere il commento
        this.view.openCommentSection.addEventListener('click', async (event) => this.openCommentSection())

        //chiude la sezione
        this.view.closeBtn.addEventListener('click', async (event) => this.closeCommentSection());

        /*
        // Function to close the modal when clicking outside of it
        window.addEventListener('click', (event) => {
            if (event.target == this.view.addCommentSection) {
                this.view.addCommentSection.style.display = 'none';
            }
        });
        */

        //salva il commento
        this.view.saveCommentBtn.addEventListener('click', async (event) => this.saveComment());
    }

    saveComment(){
        // @ts-ignore
        const userComment = this.view.commentInput.value;
        // @ts-ignore
        this.view.commentInput.value = ''; // Clear the input field
        this.view.showAddCommentSection(false);

        this.addComment(userComment);
    }

    closeCommentSection(){
        this.view.addCommentSection.style.display = 'none';
    }

    openCommentSection(){
        // @ts-ignore
        if (this.view.patternSelect.value === "Select a pattern") {
            alert('Choose a Pattern before adding a comment');
        }
        else {
            this.view.showAddCommentSection(true);
        }
    }

    async updatePatternDetails(patternId) {
        try {
            const pattern = await this.SearchModel.fetchPatternDetails(patternId);
            this.shownPatternName = pattern.nome;

            if (this.patternFilter === 'Examples') {
                if (pattern.examples.data[0] === undefined || pattern.examples.data[0] === '') {
                    this.view.showInformationNotfound();
                    return;
                }
            }
            this.view.updatePatternSection(this.patternFilter, pattern);


        } catch (error) {
            console.error('Error fetching pattern details:', error);
        }
    }

    //mostra i commenti
    async updateFeedbackSection() {
        const comments = await this.FeedbackModel.getComments(this.jwt, 'Pattern', this.shownPatternName);
        this.view.showFeedbackSection(comments);
    }

    //funzione per aggiungere i commenti(inoltra la richiesta e gestisce l'errore)
    async addComment(comment) {
        const response = await this.FeedbackModel.addComment(this.jwt, this.userId, 'Pattern', this.shownPatternName, comment);
        if (response === true){
            alert('Comment posted');
            //this.updateFeedbackSection();
        }
        else
            alert(response);
    }
}