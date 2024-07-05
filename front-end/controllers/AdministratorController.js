import AdministratorModel from '../../back-end/models/AdministratorModel.js';
import LoggedUserModel from '../../back-end/models/LoggedUserModel.js';
import SearchModel from '../../back-end/models/SearchModel.js';
import AdministratorView from '../views/AdministratorPage/AdministratorView.js';


export default class AdministratorController {

    constructor() {
        this.view = new AdministratorView();
        this.SearchModel = SearchModel;
        this.AdministratoModel = AdministratorModel;
        this.LoggedUserModel = LoggedUserModel;
        this.jwt = localStorage.getItem('jwtToken');    //serve per autenticare la richiesta
        this.userId = localStorage.getItem('userId');

        this.parseCellContent = (cellContent) => {
            const ids = cellContent.split(',').map(item => {
                const [id, name] = item.split(':').map(part => part.trim());
                return parseInt(id);
            }).filter(id => !isNaN(id)); // Filter out any non-numeric IDs

            return ids.length > 0 ? ids : [];
        };

        this.initialize();
    }

    async initialize() {
        const patterns = await this.SearchModel.fetchPatterns();
        const articles = await this.SearchModel.fetchArticles();
        const CWE = await this.SearchModel.fetchCWEWeaknesses();
        const ISO = await this.SearchModel.fetchIsoPhases();
        const MVC = await this.SearchModel.fetchMVC();
        const OWASP = await this.SearchModel.fetchOwaspCategories();
        const Privacy = await this.SearchModel.fetchPrivacyByDesign();
        const Strategy = await this.SearchModel.fetchStrategies();

        this.view.initialize(patterns, articles, CWE, ISO, MVC, OWASP, Privacy, Strategy);

        // @ts-ignore
        //this.view.filterPattern.addEventListener('change', async (event) => this.operationToPerform = event.target.value);
        this.view.bPattern.addEventListener('click', () => {
            const form = this.view.showForm(document.getElementById('pattern-form'), ['nome', 'descrizione', 'contesto', 'examples'])
            form.addEventListener('submit', (event) => {this.handlePatternFormSubmit(event); form.remove()});
        });
        this.view.bArticle.addEventListener('click', () => {
            const form = this.view.showForm(document.getElementById('article-form'), ['numero', 'nome'])
            form.addEventListener('submit', (event) => {this.handleArticleFormSubmit(event); form.remove()});
        });
        this.view.bCwe.addEventListener('click', () => {
            const form = this.view.showForm(document.getElementById('cwe-form'), ['identificatore', 'weaknesses'])
            form.addEventListener('submit', (event) => {this.handleCweFormSubmit(event); form.remove()});
        });
        this.view.bIso.addEventListener('click', () => {
            const form = this.view.showForm(document.getElementById('iso-form'), ['numero', 'nome'])
            form.addEventListener('submit', (event) => {this.handleIsoFormSubmit(event); form.remove()});
        });
        this.view.bMvc.addEventListener('click', () => {
            const form = this.view.showForm(document.getElementById('mvc-form'), ['nome'])
            form.addEventListener('submit', (event) => {this.handleMvcFormSubmit(event); form.remove()});
        });
        this.view.bOwasp.addEventListener('click', () => {
            const form = this.view.showForm(document.getElementById('owasp-form'), ['identificatore', 'nome'])
            form.addEventListener('submit', (event) => {this.handleOwaspFormSubmit(event); form.remove()});
        });
        this.view.bPrivacy.addEventListener('click', () => {
            const form = this.view.showForm(document.getElementById('privacy-form'), ['nome'])
            form.addEventListener('submit', (event) => {this.handlePrivacyFormSubmit(event); form.remove()});
        });
        this.view.bStrategy.addEventListener('click', () => {
            const form = this.view.showForm(document.getElementById('strategy-form'), ['nome'])
            form.addEventListener('submit', (event) => {this.handleStrategyFormSubmit(event); form.remove()});
        });


        this.view.togglePatternsButton.addEventListener('click', () => {
            // @ts-ignore
            const rows = this.view.patternTable.rows;
            if (this.view.isCollapsed) {
                // Show all rows
                for (let i = 1; i < rows.length; i++) {
                    rows[i].style.display = '';
                }
            } else {
                // Hide all rows except the first one
                for (let i = 1; i < rows.length; i++) {
                    rows[i].style.display = 'none';
                }
            }
            this.view.isCollapsed = !this.view.isCollapsed;
        });



        this.view.patternTable.addEventListener('click', (event) => {
            /*const cell = event.target;
            // @ts-ignore
            const rowIndex = cell.parentElement.rowIndex;
            // @ts-ignore
            const cellIndex = cell.cellIndex;
            // @ts-ignore
            const cellContent = cell.innerText;
    
            // @ts-ignore
            if (cell.tagName === 'TD') {
                //alert(rowIndex +' '+ cellIndex + cellContent);
            }*/
            
            // @ts-ignore
            if (event.target.classList.contains('save-button')) {
                // @ts-ignore
                const row = event.target.parentElement.parentElement;

                if(localStorage.getItem('role') === 'Administrator')
                    // @ts-ignore
                    this.savePatternRow(row);
                else
                    alert('Make sure you are logged in and authorized')
            }
            // @ts-ignore
            else if (event.target.tagName === 'TD') {
                const cell = event.target;
                // @ts-ignore
                const cellIndex = cell.cellIndex;
                this.handleUpdate(event.target, () => this.updatePatternDropdown(cellIndex));
            }
        });

        this.view.articleTable.addEventListener('click', (event) => {
            // @ts-ignore
            if (event.target.classList.contains('save-button')) {
                // @ts-ignore
                const row = event.target.parentElement.parentElement;
                
                if(localStorage.getItem('role') === 'Administrator')
                    // @ts-ignore
                    this.saveArticleRow(row);
                else
                    alert('Make sure you are logged in and authorized')
            }
            // @ts-ignore
            else if (event.target.tagName === 'TD') {
                const cell = event.target;
                // @ts-ignore
                const cellIndex = cell.cellIndex;
                this.handleUpdate(event.target, () => this.updateArticleDropdown(cellIndex));
            }
        });

        this.view.cweTable.addEventListener('click', (event) => {
            // @ts-ignore
            if (event.target.classList.contains('save-button')) {
                // @ts-ignore
                const row = event.target.parentElement.parentElement;
                if(localStorage.getItem('role') === 'Administrator')
                    // @ts-ignore
                    this.saveCweRow(row);
                else
                    alert('Make sure you are logged in and authorized')
            }
            // @ts-ignore
            else if (event.target.tagName === 'TD') {
                const cell = event.target;
                // @ts-ignore
                const cellIndex = cell.cellIndex;
                console.log(cellIndex);
                this.handleUpdate(event.target, () => this.updateCweDropdown(cellIndex));
            }
        });

        this.view.isoTable.addEventListener('click', (event) => {
            // @ts-ignore
            if (event.target.classList.contains('save-button')) {
                // @ts-ignore
                const row = event.target.parentElement.parentElement;
                if(localStorage.getItem('role') === 'Administrator')
                    // @ts-ignore
                this.saveIsoRow(row);
                else
                    alert('Make sure you are logged in and authorized')
            }
            // @ts-ignore
            else if (event.target.tagName === 'TD') {
                const cell = event.target;
                // @ts-ignore
                const cellIndex = cell.cellIndex;
                console.log(cellIndex);
                this.handleUpdate(event.target, () => this.updateIsoDropdown(cellIndex));
            }
        });

        this.view.mvcTable.addEventListener('click', (event) => {
            // @ts-ignore
            if (event.target.classList.contains('save-button')) {
                // @ts-ignore
                const row = event.target.parentElement.parentElement;
                if(localStorage.getItem('role') === 'Administrator')
                    // @ts-ignore
                this.saveMvcRow(row);
                else
                    alert('Make sure you are logged in and authorized')
            }
            // @ts-ignore
            else if (event.target.tagName === 'TD') {
                const cell = event.target;
                // @ts-ignore
                const cellIndex = cell.cellIndex;
                console.log(cellIndex);
                this.handleUpdate(event.target, () => this.updateMvcDropdown(cellIndex));
            }
        });

        this.view.owaspTable.addEventListener('click', (event) => {
            // @ts-ignore
            if (event.target.classList.contains('save-button')) {
                // @ts-ignore
                const row = event.target.parentElement.parentElement;
                if(localStorage.getItem('role') === 'Administrator')
                    // @ts-ignore
                    this.saveOwaspRow(row);
                else
                    alert('Make sure you are logged in and authorized')
            }
            // @ts-ignore
            else if (event.target.tagName === 'TD') {
                const cell = event.target;
                // @ts-ignore
                const cellIndex = cell.cellIndex;
                console.log(cellIndex);
                this.handleUpdate(event.target, () => this.updateOwaspDropdown(cellIndex));
            }
        });

        this.view.privacyTable.addEventListener('click', (event) => {
            // @ts-ignore
            if (event.target.classList.contains('save-button')) {
                // @ts-ignore
                const row = event.target.parentElement.parentElement;
                if(localStorage.getItem('role') === 'Administrator')
                    // @ts-ignore
                this.savePrivacyRow(row);
                else
                    alert('Make sure you are logged in and authorized')
            }
            // @ts-ignore
            else if (event.target.tagName === 'TD') {
                const cell = event.target;
                // @ts-ignore
                const cellIndex = cell.cellIndex;
                console.log(cellIndex);
                this.handleUpdate(event.target, () => this.updatePrivacyDropdown(cellIndex));
            }
        });

        this.view.strategyTable.addEventListener('click', (event) => {
            // @ts-ignore
            if (event.target.classList.contains('save-button')) {
                // @ts-ignore
                const row = event.target.parentElement.parentElement;
                if(localStorage.getItem('role') === 'Administrator')
                    // @ts-ignore
                    this.saveStrategyRow(row);
                else
                    alert('Make sure you are logged in and authorized')
            }
            // @ts-ignore
            else if (event.target.tagName === 'TD') {
                const cell = event.target;
                // @ts-ignore
                const cellIndex = cell.cellIndex;
                console.log(cellIndex);
                this.handleUpdate(event.target, () => this.updateStrategyDropdown(cellIndex));
            }
        });
        

        /*this.view.patternTable.addEventListener('click', (event) => this.cellClicked(this.view.patternTable, event)/*{
            const cell = event.target;
            // @ts-ignore
            const rowIndex = cell.parentElement.rowIndex;
            // @ts-ignore
            const cellIndex = cell.cellIndex;

            // Call the function with row and column indices
            cellClicked(rowIndex, cellIndex);
        });*/
    }

    async handlePatternFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(event.target);
        const payload = {
            data: {
                nome: formData.get('nome'),
                descrizione: formData.get('descrizione'),
                contesto: formData.get('contesto'),
                //examples: formData.get('examples')
            }
        };

        const response = await this.AdministratoModel.createPattern(this.jwt, payload);

        if (response === true) {
            alert('Saved');
        } else {
            alert(response);
        }
    }
    async handleArticleFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(event.target);
        const payload = {
            data: {
                identificatore: formData.get('numero'),
                nome: formData.get('nome'),
            }
        };

        const response = await this.AdministratoModel.createArticle(this.jwt, payload);
        console.log(response);

        if (response === true) {
            alert('Saved');
        } else {
            alert(response);
        }
    }
    async handleCweFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(event.target);
        const payload = {
            data: {
                identificatore: formData.get('identificatore'),
                nome: formData.get('weaknesses'),
            }
        };

        const response = await this.AdministratoModel.createCwe(this.jwt, payload);
        console.log(response);

        if (response === true) {
            alert('Saved');
        } else {
            alert(response);
        }
    }
    async handleIsoFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(event.target);
        const payload = {
            data: {
                identificatore: formData.get('numero'),
                nome: formData.get('nome'),
            }
        };

        const response = await this.AdministratoModel.createIso(this.jwt, payload);
        console.log(response);

        if (response === true) {
            alert('Saved');
        } else {
            alert(response);
        }
    }
    async handleMvcFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(event.target);
        const payload = {
            data: {
                nome: formData.get('nome'),
            }
        };

        const response = await this.AdministratoModel.createMvc(this.jwt, payload);
        console.log(response);

        if (response === true) {
            alert('Saved');
        } else {
            alert(response);
        }
    }
    async handleOwaspFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(event.target);
        const payload = {
            data: {
                identificatore: formData.get('identificatore'),
                nome: formData.get('nome'),
            }
        };

        const response = await this.AdministratoModel.createOwasp(this.jwt, payload);
        console.log(response);

        if (response === true) {
            alert('Saved');
        } else {
            alert(response);
        }
    }
    async handlePrivacyFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(event.target);
        const payload = {
            data: {
                nome: formData.get('nome'),
            }
        };

        const response = await this.AdministratoModel.createPrivacy(this.jwt, payload);
        console.log(response);

        if (response === true) {
            alert('Saved');
        } else {
            alert(response);
        }
    }
    async handleStrategyFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(event.target);
        const payload = {
            data: {
                nome: formData.get('nome'),
            }
        };

        const response = await this.AdministratoModel.createStrategy(this.jwt, payload);
        console.log(response);

        if (response === true) {
            alert('Saved');
        } else {
            alert(response);
        }
    }



    async handleUpdate(target, func) {
        //const data = await this.updatePatternDropdown(cellIndex);
        const data = await func();

        // @ts-ignore
        const addDropdown = this.view.showAddDropdown(target, data);
        const deleteDropdown= this.view.showDeleteDropdown(this.parseCellContent, target, data);
   
        addDropdown.addEventListener('change', async (event) => this.addElementHandler(addDropdown, target, event));
        deleteDropdown.addEventListener('change', async (event) => this.deleteElementHandler(deleteDropdown, target, event));
    }


    addElementHandler(dropdown, cell, event){
        if (cell.innerText.trim() === "") {
            cell.innerText = event.target.value;
        } else {
            cell.innerText += `, ${event.target.value}`; // Append the selected value to the cell content
        }
        dropdown.remove();
        document.getElementById('delete-dropdown').remove();
    }

    deleteElementHandler(dropdown, cell, event){
        const selectedValue = event.target.value;

        // Remove the selected value from the cell content
        const values = cell.innerText.split(',').map(value => value.trim());
        const newValues = values.filter(value => value !== selectedValue);
        cell.innerText = newValues.join(', ');

        dropdown.remove();
        document.getElementById('add-dropdown').remove();
    }


    async updatePatternDropdown(cellIndex) {
        switch (cellIndex) {
            case 3:
                const data = await this.SearchModel.fetchMVC();
                return data;
            case 4:
                return await this.SearchModel.fetchStrategies();
            case 5:
                return await this.SearchModel.fetchPrivacyByDesign();
            case 6:
                return await this.SearchModel.fetchOwaspCategories();
            case 7:
                return await this.SearchModel.fetchCWEWeaknesses();
            case 8:
                return await this.SearchModel.fetchArticles();
            case 9:
                return await this.SearchModel.fetchIsoPhases();
        }
    }

    async updateArticleDropdown(cellIndex) {
        switch (cellIndex) {
            case 2:
                const data = await this.SearchModel.fetchPatterns();
                return data;
        }
    }

    async updateCweDropdown(cellIndex) {
        switch (cellIndex) {
            case 2:
                const data = await this.SearchModel.fetchPatterns();
                return data;
        }
    }

    async updateIsoDropdown(cellIndex) {
        switch (cellIndex) {
            case 2:
                const data = await this.SearchModel.fetchPatterns();
                return data;
            case 3:
                return await this.SearchModel.fetchPrivacyByDesign();
        }
    }

    async updateMvcDropdown(cellIndex) {
        switch (cellIndex) {
            case 1:
                const data = await this.SearchModel.fetchPatterns();
                return data;
        }
    }

    async updateOwaspDropdown(cellIndex) {
        switch (cellIndex) {
            case 2:
                const data = await this.SearchModel.fetchPatterns();
                return data;
        }
    }

    async updatePrivacyDropdown(cellIndex) {
        switch (cellIndex) {
            case 1:
                const data = await this.SearchModel.fetchPatterns();
                return data;
        }
    }

    async updateStrategyDropdown(cellIndex) {
        switch (cellIndex) {
            case 1:
                const data = await this.SearchModel.fetchPatterns();
                return data;
            case 2:
                return await this.SearchModel.fetchPrivacyByDesign();
            case 3:
                return await this.SearchModel.fetchArticles();
        }
    }



    async savePatternRow(row) {
        const cells = row.getElementsByTagName('td');
        const rowId = row.querySelector('.save-button').getAttribute('data-id');
        // @ts-ignore
        /*
        const parseCellContent = (cellContent) => {
            return cellContent.split(',').map(item => {
                const [id, name] = item.split(':').map(part => part.trim());
                return { id: parseInt(id) };
            });
        };*/

        // Function to parse cell content into an array of IDs
        const parseCellContent = (cellContent) => {
            const ids = cellContent.split(',').map(item => {
                const [id, name] = item.split(':').map(part => part.trim());
                return parseInt(id);
            }).filter(id => !isNaN(id)); // Filter out any non-numeric IDs

            return ids.length > 0 ? ids : [];
        };

        const payload = {
            data: {
                /*nome: //cells[0].innerText,
                //descrizione: cells[1].innerText,
                //contesto: cells[2].innerText,*/
                mvcs: { set: parseCellContent(cells[3].innerText)}, // Corrected structure for many-to-many relation
                strategias: {set: parseCellContent(cells[4].innerText)}, // Using parseCellContent to get IDs
                privacy_by_design_principles: {set: parseCellContent(cells[5].innerText)},
                owasp_top_10_categories: {set: parseCellContent(cells[6].innerText)},
                cwe_top_25_weaknesses: {set: parseCellContent(cells[7].innerText)},
                articoli_gdprs: {set: parseCellContent(cells[8].innerText)},
                iso_9241_210_phases: {set: parseCellContent(cells[9].innerText)},
                //searchCounter: 0
            }
        };

        console.log(payload);

        const response = await this.AdministratoModel.updatePattern(this.jwt, rowId, payload);
        console.log(response);

        if (response === true) {
            alert('Saved');
            this.LoggedUserModel.newNotification(this.jwt);
        } else {
            alert(response);
        }
    }

    async saveArticleRow(row) {
        const cells = row.getElementsByTagName('td');
        const rowId = row.querySelector('.save-button').getAttribute('data-id');

        const payload = {
            data: {
                patterns: { set: this.parseCellContent(cells[2].innerText)}, // Corrected structure for many-to-many relation
            }
        };

        const response = await this.AdministratoModel.updateArticle(this.jwt, rowId, payload);

        if (response === true) {
            alert('Saved');
            this.LoggedUserModel.newNotification(this.jwt);

        } else {
            alert(response);
        }
    }

    async saveCweRow(row) {
        const cells = row.getElementsByTagName('td');
        const rowId = row.querySelector('.save-button').getAttribute('data-id');

        const payload = {
            data: {
                patterns: { set: this.parseCellContent(cells[2].innerText)}, // Corrected structure for many-to-many relation
            }
        };

        const response = await this.AdministratoModel.updateCwe(this.jwt, rowId, payload);

        if (response === true) {
            alert('Saved');
            this.LoggedUserModel.newNotification(this.jwt);

        } else {
            alert(response);
        }
    }

    async saveIsoRow(row) {
        const cells = row.getElementsByTagName('td');
        const rowId = row.querySelector('.save-button').getAttribute('data-id');

        const payload = {
            data: {
                patterns: { set: this.parseCellContent(cells[2].innerText)}, // Corrected structure for many-to-many relation
                privacy_by_design_principles: {set: this.parseCellContent(cells[3].innerText)},
            }
        };

        const response = await this.AdministratoModel.updateIso(this.jwt, rowId, payload);

        if (response === true) {
            alert('Saved');
            this.LoggedUserModel.newNotification(this.jwt);

        } else {
            alert(response);
        }
    }

    async saveMvcRow(row) {
        const cells = row.getElementsByTagName('td');
        const rowId = row.querySelector('.save-button').getAttribute('data-id');

        const payload = {
            data: {
                patterns: { set: this.parseCellContent(cells[1].innerText)}, // Corrected structure for many-to-many relation
            }
        };

        const response = await this.AdministratoModel.updateMvc(this.jwt, rowId, payload);

        if (response === true) {
            alert('Saved');
            this.LoggedUserModel.newNotification(this.jwt);

        } else {
            alert(response);
        }
    }

    async saveOwaspRow(row) {
        const cells = row.getElementsByTagName('td');
        const rowId = row.querySelector('.save-button').getAttribute('data-id');

        const payload = {
            data: {
                patterns: { set: this.parseCellContent(cells[2].innerText)}, // Corrected structure for many-to-many relation
            }
        };

        const response = await this.AdministratoModel.updateOwasp(this.jwt, rowId, payload);

        if (response === true) {
            alert('Saved');
            this.LoggedUserModel.newNotification(this.jwt);

        } else {
            alert(response);
        }
    }

    async savePrivacyRow(row) {
        const cells = row.getElementsByTagName('td');
        const rowId = row.querySelector('.save-button').getAttribute('data-id');

        const payload = {
            data: {
                patterns: { set: this.parseCellContent(cells[1].innerText)}, // Corrected structure for many-to-many relation
            }
        };

        const response = await this.AdministratoModel.updatePrivacy(this.jwt, rowId, payload);

        if (response === true) {
            alert('Saved');
            this.LoggedUserModel.newNotification(this.jwt);

        } else {
            alert(response);
        }
    }

    async saveStrategyRow(row) {
        const cells = row.getElementsByTagName('td');
        const rowId = row.querySelector('.save-button').getAttribute('data-id');

        const payload = {
            data: {
                patterns: { set: this.parseCellContent(cells[1].innerText)}, // Corrected structure for many-to-many relation
                privacy_by_design_principles: {set: this.parseCellContent(cells[2].innerText)},
                articoli_gdprs: {set: this.parseCellContent(cells[3].innerText)},
            }
        };

        const response = await this.AdministratoModel.updateStrategy(this.jwt, rowId, payload);

        if (response === true) {
            alert('Saved');
            this.LoggedUserModel.newNotification(this.jwt);

        } else {
            alert(response);
        }
    }



    /*
        async saveRow(row) {
            const cells = row.getElementsByTagName('td');
            // @ts-ignore
            const rowId = row.querySelector('.save-button').getAttribute('data-id');
            // @ts-ignore
            const parseCellContent = (cellContent) => {
                return cellContent.split(',').map(item => {
                    const [id, name] = item.split(':').map(part => part.trim());
                    return { id: parseInt(id) };
                });
            };
    
            const payload = {
                data: {
                    nome: cells[0].innerText,
                    descrizione: cells[1].innerText,
                    contesto: cells[2].innerText,
                    mvcs: {
                        data : [{id :1 }, {id:2}, {id:3}]
                    },/*
                    strategias: { 
                        data : //parseCellContent(cells[4].innerText)
                    },/*
                    privacy_by_design_principles: {
                        data: parseCellContent(cells[5].innerText)
                    },
                    owasp_top_10_categories: {
                        data: parseCellContent(cells[6].innerText)
                    },
                    cwe_top_25_weaknesses: {
                        data: parseCellContent(cells[7].innerText)
                    },
                    articoli_gdprs: {
                        data: parseCellContent(cells[8].innerText)
                    },
                    iso_9241_210_phases: {
                        data: parseCellContent(cells[9].innerText)
                    },
                    examples: {
                        data: parseCellContent(cells[10].innerText)
                    },
                    searchCounter: 0//parseInt(cells[11].innerText)
                }
    
            };
            console.log(payload);
    
            const response = await this.AdministratoModel.updatePattern(this.jwt, 27, payload);
            console.log(response);
    
            if (response === true) {
                alert('Saved');
            }
            else
                alert(response);
        }
       */

    /*
    cellClicked(table, event) {
        const cell = event.target;
        // @ts-ignore
        const rowIndex = cell.parentElement.rowIndex;
        // @ts-ignore
        const cellIndex = cell.cellIndex;
        switch (table){
            case this.view.patternTable :
                this.updatePattern();
        }
    }*/




}