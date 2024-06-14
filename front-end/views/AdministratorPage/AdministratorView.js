export default class AdministratorView {
    constructor() {
        this.togglePatternsButton = document.getElementById('togglePatternTable');
        this.isCollapsed = false;

        this.patternTable = document.getElementById('pattern-table');
        this.articleTable = document.getElementById('article-table');
        this.cweTable = document.getElementById('CWE-table');
        this.isoTable = document.getElementById('ISO-table');
        this.mvcTable = document.getElementById('MVC-table');
        this.owaspTable = document.getElementById('OWASP-table');
        this.privacyTable = document.getElementById('Privacy-table');
        this.strategyTable = document.getElementById('Strategy-table');

        //this.toggleTables = [document.getElementById('togglePatternTable'), document.getElementById('toggleArticleTable'), document.getElementById('toggleCWETable'), document.getElementById('toggleISOTable'), document.getElementById('toggleMVCTable'), document.getElementById('toggleOWASPTable'), document.getElementById('togglePrivacyTable'), document.getElementById('toggleStrategyTable')];
        //this.filterPattern = document.getElementById('operation');

        this.bPattern = document.getElementById('b-pattern');
        this.bArticle = document.getElementById('b-article');
        this.bCwe = document.getElementById('b-cwe');
        this.bIso = document.getElementById('b-iso');
        this.bMvc = document.getElementById('b-mvc');
        this.bOwasp = document.getElementById('b-owasp');
        this.bPrivacy = document.getElementById('b-privacy');
        this.bStrategy = document.getElementById('b-strategy');

        //this.buttons = [this.bPattern, this.bArticle, this.bCwe, this.bStrategy];
    }

    initialize(patterns, articles, CWE, ISO, MVC, OWASP, Privacy, Strategy) {
        patterns.forEach(pattern => { this.populatePatternRow(pattern); });
        articles.forEach(article => { this.populateArticleRow(article); });
        CWE.forEach(data => { this.populateCWERow(data); });
        ISO.forEach(data => { this.populateISORow(data); });
        MVC.forEach(data => { this.populateMVCRow(data); });
        OWASP.forEach(data => { this.populateOwaspRow(data); });
        Privacy.forEach(data => { this.populatePrivacyRow(data); });
        Strategy.forEach(data => { this.populateStrategyRow(data); });

    }

    populatePatternRow(pattern) {
        // @ts-ignore
        const row = this.patternTable.insertRow();
        // Add cells and set their content
        row.insertCell(0).innerHTML = pattern.attributes.nome;;
        row.insertCell(1).innerHTML = pattern.attributes.descrizione;
        row.insertCell(2).innerHTML = pattern.attributes.contesto;;
        row.insertCell(3).innerHTML = pattern.attributes.mvcs.data.map(item => item.id + ': ' + item.attributes.nome).join(',<br> ');
        row.insertCell(4).innerHTML = pattern.attributes.strategias.data.map(item => item.id + ': ' + item.attributes.nome).join(',<br> ');
        row.insertCell(5).innerHTML = pattern.attributes.privacy_by_design_principles.data.map(item => item.id + ': ' + item.attributes.nome).join(',<br> ');
        row.insertCell(6).innerHTML = pattern.attributes.owasp_top_10_categories.data.map(item => item.id + ': ' + `${item.attributes.nome} (${item.attributes.identificatore})`).join(',<br> ');
        row.insertCell(7).innerHTML = pattern.attributes.cwe_top_25_weaknesses.data.map(item => item.id + ': ' + `${item.attributes.nome} (${item.attributes.identificatore})`).join(',<br>');
        row.insertCell(8).innerHTML = pattern.attributes.articoli_gdprs.data.map(item => item.id + ': ' + `${item.attributes.nome} (${item.attributes.identificatore})`).join(',<br> ');
        row.insertCell(9).innerHTML = pattern.attributes.iso_9241_210_phases.data.map(item => item.id + ': ' + `${item.attributes.nome} (${item.attributes.identificatore})`).join(',<br> ');
        row.insertCell(10).innerHTML = pattern.attributes.examples.data.map(item => item.attributes.testo).join(',<br> ');
        row.insertCell(11).innerHTML = pattern.attributes.searchCounter;
        row.insertCell(12).innerHTML = `<button class="save-button" data-id="${pattern.id}">Save</button>`;
    }

    populateArticleRow(article) {
        // @ts-ignore
        const row = this.articleTable.insertRow();
        row.insertCell(0).innerHTML = article.attributes.identificatore;
        row.insertCell(1).innerHTML = article.attributes.nome;
        row.insertCell(2).innerHTML = article.attributes.patterns.data.map(pattern => pattern.id + ': ' + pattern.attributes.nome).join(',<br> ');
        row.insertCell(3).innerHTML = `<button class="save-button" data-id="${article.id}">Save</button>`;
    }

    populateCWERow(cwe) {
        // @ts-ignore
        const row = this.cweTable.insertRow();
        row.insertCell(0).innerHTML = cwe.attributes.identificatore;
        row.insertCell(1).innerHTML = cwe.attributes.nome;
        row.insertCell(2).innerHTML = cwe.attributes.patterns.data.map(pattern => pattern.id + ': ' + pattern.attributes.nome).join(',<br> ');
        row.insertCell(3).innerHTML = `<button class="save-button" data-id="${cwe.id}">Save</button>`;
    }

    populateISORow(iso) {
        // @ts-ignore
        const row = this.isoTable.insertRow();
        row.insertCell(0).innerHTML = iso.attributes.identificatore;
        row.insertCell(1).innerHTML = iso.attributes.nome;
        row.insertCell(2).innerHTML = iso.attributes.patterns.data.map(pattern => pattern.id + ': ' + pattern.attributes.nome).join(',<br> ');
        row.insertCell(3).innerHTML = iso.attributes.privacy_by_design_principles.data.map(privacy => privacy.id + ': ' + privacy.attributes.nome).join(',<br> ');
        row.insertCell(4).innerHTML = `<button class="save-button" data-id="${iso.id}">Save</button>`;
    }

    populateMVCRow(mvc) {
        // @ts-ignore
        const row = this.mvcTable.insertRow();
        row.insertCell(0).innerHTML = mvc.attributes.nome;
        row.insertCell(1).innerHTML = mvc.attributes.patterns.data.map(pattern => pattern.id + ': ' + pattern.attributes.nome).join(',<br> ');
        row.insertCell(2).innerHTML = `<button class="save-button" data-id="${mvc.id}">Save</button>`;
    }

    populateOwaspRow(owasp) {
        // @ts-ignore
        const row = this.owaspTable.insertRow();
        row.insertCell(0).innerHTML = owasp.attributes.identificatore;
        row.insertCell(1).innerHTML = owasp.attributes.nome;
        row.insertCell(2).innerHTML = owasp.attributes.patterns.data.map(pattern => pattern.id + ': ' + pattern.attributes.nome).join(',<br> ');
        row.insertCell(3).innerHTML = `<button class="save-button" data-id="${owasp.id}">Save</button>`;
    }

    populatePrivacyRow(privacy) {
        // @ts-ignore
        const row = this.privacyTable.insertRow();
        row.insertCell(0).innerHTML = privacy.attributes.nome;
        row.insertCell(1).innerHTML = privacy.attributes.patterns.data.map(pattern => pattern.id + ': ' + pattern.attributes.nome).join(',<br> ');
        row.insertCell(2).innerHTML = `<button class="save-button" data-id="${privacy.id}">Save</button>`;
    }

    populateStrategyRow(strategy) {
        // @ts-ignore
        const row = this.strategyTable.insertRow();
        row.insertCell(0).innerHTML = strategy.attributes.nome;
        row.insertCell(1).innerHTML = strategy.attributes.patterns.data.map(pattern => pattern.id + ': ' + pattern.attributes.nome).join(',<br> ');
        row.insertCell(2).innerHTML = strategy.attributes.privacy_by_design_principles.data.map(privacy => privacy.id + ': ' + privacy.attributes.nome).join(',<br> ');
        row.insertCell(3).innerHTML = strategy.attributes.articoli_gdprs.data.map(item => item.id + ': ' + `${item.attributes.nome} (${item.attributes.identificatore})`).join(',<br> ');
        row.insertCell(4).innerHTML = `<button class="save-button" data-id="${strategy.id}">Save</button>`;
    }


    // @ts-ignore
    showAddDropdown(cell, data) {

        // Remove existing dropdown if any
        //const existingDropdown = document.querySelector('.dropdown');
        const existingDropdown = document.getElementById('add-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }

        const currentValues = cell.innerText.split(',').map(value => value.trim());

        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        dropdown.id = 'add-dropdown';
        dropdown.style.position = 'absolute';

        const select = document.createElement('select');
        let options = ['Add'];

        for (let i = 0; i < data.length; i++) {
            let string = data[i].id + ': ' + data[i].attributes.nome;
            if (data[i].attributes.hasOwnProperty('identificatore')) {
                string += ' (' + data[i].attributes.identificatore + ')';
            }
            options.push(string);
        }

        //const options = data.map(item => item.attributes.nome);
        options.forEach(optionText => {
            if (!currentValues.includes(optionText)) {
                const option = document.createElement('option');
                option.value = optionText;
                option.text = optionText;
                select.appendChild(option);
            }
        });

        /*
        select.addEventListener('change', () => {

            if (cell.innerText.trim() === "") {
                cell.innerText = select.value;
            } else {
                cell.innerText += `, ${select.value}`; // Append the selected value to the cell content
            }
            dropdown.remove();
            document.getElementById('delete-dropdown').remove();
        });
        */


        dropdown.appendChild(select);
        document.body.appendChild(dropdown);

        // Position the dropdown
        const rect = cell.getBoundingClientRect();
        dropdown.style.left = `${window.scrollX + rect.left}px`;
        dropdown.style.top = `${window.scrollY + rect.bottom}px`;
        dropdown.style.display = 'block';

        return dropdown;
    }

    // Function to show the dropdown for deletion
    showDeleteDropdown(parseCellContent, cell, data) {
        // Remove existing dropdown if any
        //const existingDropdown = document.querySelector('.dropdown');
        const existingDropdown = document.getElementById('delete-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }

        // Get the current IDs from the cell
        const currentIds = parseCellContent(cell.innerText);

        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        dropdown.id = 'delete-dropdown';
        dropdown.style.position = 'absolute';

        const select = document.createElement('select');

        const option = document.createElement('option');
        //option.value = string;
        option.text = 'Delete';
        select.appendChild(option);
        // Populate dropdown with current values in the cell
        currentIds.forEach(id => {
            const item = data.find(d => d.id === id);
            if (item) {
                let string = item.id + ': ' + item.attributes.nome;
                if (item.attributes.hasOwnProperty('identificatore')) {
                    string += ' (' + item.attributes.identificatore + ')';
                }
                const option = document.createElement('option');
                option.value = string;
                option.text = string;
                select.appendChild(option);
            }
        });

        /*
            select.addEventListener('change', () => {
                const selectedValue = select.value;
        
                // Remove the selected value from the cell content
                const values = cell.innerText.split(',').map(value => value.trim());
                const newValues = values.filter(value => value !== selectedValue);
                cell.innerText = newValues.join(', ');
        
                dropdown.remove();
                document.getElementById('add-dropdown').remove();
            });
        */
        dropdown.appendChild(select);
        document.body.appendChild(dropdown);

        // Position the dropdown
        const rect = cell.getBoundingClientRect();
        dropdown.style.left = `${window.scrollX + rect.left + document.getElementById('add-dropdown').offsetWidth}px`;
        dropdown.style.top = `${window.scrollY + rect.bottom}px`;
        dropdown.style.display = 'block';

        return dropdown;
    }

    showForm(container, fields) {
        // Remove existing form if any
        const existingForm = document.querySelector('.form');
        if (existingForm) {
            existingForm.remove();
        }

        // Create the form
        const form = document.createElement('form');
        form.className = 'form';

        // Create input fields
        //const fields = ['nome', 'descrizione', 'contesto', 'examples'];
        fields.forEach(field => {
            const label = document.createElement('label');
            label.innerText = field.charAt(0).toUpperCase() + field.slice(1);
            const input = document.createElement('input');
            input.type = 'text';
            input.name = field;
            form.appendChild(label);
            form.appendChild(input);
            form.appendChild(document.createElement('br'));

        });

        // Create submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerText = 'Save';
        form.appendChild(submitButton);

        // Add form to the body
        form.style.display = 'block';
        container.appendChild(form);

        return form;
        // Add event listener for form submission
        //form.addEventListener('submit', (event) => {this.handleFormSubmit(event); form.remove()});
    }
/*
    handleFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const formData = new FormData(event.target);
        const payload = {
            data: {
                nome: formData.get('nome'),
                descrizione: formData.get('descrizione'),
                contesto: formData.get('contesto'),
                examples: formData.get('examples')
            }
        };

        console.log('Payload:', payload);

        // Optionally, you can perform further actions such as sending the payload to the server
        // Example: savePattern(payload);
    }*/
}