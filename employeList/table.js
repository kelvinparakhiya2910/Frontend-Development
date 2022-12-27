(function () {
    const FormConstants = Object.freeze({
        hobbies: [
            {
                id: 'hobby_001',
                displayValue: 'Travelling',
            },
            {
                id: 'hobby_002',
                displayValue: 'Swimming',
            },
            {
                id: 'hobby_003',
                displayValue: 'Movies',
            },
            {
                id: 'hobby_004',
                displayValue: 'Gardening',
            },
            {
                id: 'hobby_005',
                displayValue: 'Dancing',
            },
            {
                id: 'hobby_006',
                displayValue: 'Painting',
            },
            {
                id: 'hobby_007',
                displayValue: 'Video games',
            },
            {
                id: 'hobby_008',
                displayValue: 'Photography',
            },
            {
                id: 'hobby_009',
                displayValue: 'Sewing',
            }
        ],
        gender: [
            {
                id: 'gender_001',
                displayValue: 'Male',
            },
            {
                id: 'gender_002',
                displayValue: 'Female',
            },
            {
                id: 'gender_003',
                displayValue: 'Others',
            }
        ],
        createElement: function (tageName, attribute, value) {
            const tage = document.createElement(tageName);
            tage.setAttribute(attribute, value);
            return tage;
        },
        createElementText: function (tageName, textNode, attribute, value) {
            const tage = document.createElement(tageName);
            tage.setAttribute(attribute, value);
            const createTxt = document.createTextNode(textNode);
            tage.appendChild(createTxt);
            return tage;
        },
        multiAttribute: function (tageName, attribute, value, attribute1, value1, attribute2, value2) {
            const tage = document.createElement(tageName);
            tage.setAttribute(attribute, value);
            tage.setAttribute(attribute1, value1);
            tage.setAttribute(attribute2, value2);
            return tage;
        },
        radioFunction: function (value, genderName) {
            const genderLebel = document.createElement('label');
            const tage = document.createElement('input');
            tage.setAttribute('type', "radio");
            tage.setAttribute('name', "gender");
            tage.setAttribute('value', value);
            const createTxt = document.createTextNode(genderName);
            genderLebel.appendChild(tage);
            genderLebel.appendChild(createTxt);
            return genderLebel;
        },
        hobbiesBox: function (value, hobbieName) {
            const tage = document.createElement('input');
            tage.setAttribute('type', "checkbox");
            tage.setAttribute('name', "hobbies");
            tage.setAttribute('value', value);
            const createTxt = document.createTextNode(hobbieName);
            return {
                tage,
                createTxt
            };
        },
    });

    const getBodyDiv = document.getElementById('formDiv');

    // create form tage
    const form = FormConstants.createElement('form', 'id', "personalDetailsForm");

    // create personId input tage 
    const personId = FormConstants.multiAttribute('input', 'type', "hidden", 'name', "personId", 'value', "");

    // create fieldset tage
    const fieldset = document.createElement('fieldset');

    // create legend tage and text Node
    const legend = FormConstants.createElementText('legend', 'Personal Details');

    // create salutation div tage
    const salutationDiv = FormConstants.createElement('div', 'class', "form-control");

    // create salutation label tage
    const SalutationLabel = FormConstants.createElementText('label', 'Salutation');

    // create selecter tage, option and text Node
    const select = FormConstants.createElement('select', 'name', "salutation");
    const optionMT = FormConstants.createElementText('option', '');
    select.appendChild(optionMT);
    const optionMR = FormConstants.createElementText('option', 'Mr.');
    select.appendChild(optionMR);
    const optionMS = FormConstants.createElementText('option', 'Ms.');
    select.appendChild(optionMS);
    const optionMRS = FormConstants.createElementText('option', 'Mrs.');
    select.appendChild(optionMRS);
    const optionDR = FormConstants.createElementText('option', 'Dr.');
    select.appendChild(optionDR);
    const optionPROF = FormConstants.createElementText('option', 'Prof.');
    select.appendChild(optionPROF);

    // appendChild label and select tage
    salutationDiv.appendChild(SalutationLabel);
    SalutationLabel.appendChild(select);

    // create firstName div , firstNameLabel and firstName input tage
    const firstNameDiv = FormConstants.createElement('div', 'class', "form-control");
    const firstNameLabel = FormConstants.createElementText('label', 'First name : ');
    firstNameDiv.appendChild(firstNameLabel);
    const firstName = FormConstants.multiAttribute('input', 'name', "firstName", 'value', "");
    firstNameLabel.appendChild(firstName);

    // create lastName div , lastNameLabel and lastName input tage
    const lastNameDiv = FormConstants.createElement('div', 'class', "form-control");
    const lastNameLabel = FormConstants.createElementText('label', 'Last name : ');
    lastNameDiv.appendChild(lastNameLabel);
    const lastName = FormConstants.multiAttribute('input', 'name', "lastName", 'value', "");
    lastNameLabel.appendChild(lastName);

    // create Gender div and radio btn
    const genderdiv = FormConstants.createElementText('div', "Gender : ", 'class', "form-control");
    for (let i = 0; i < FormConstants.gender.length; i++) {
        const genderRadio = FormConstants.radioFunction(`${FormConstants.gender[i].id}`, `${FormConstants.gender[i].displayValue}`);
        genderdiv.appendChild(genderRadio);
    };

    // create email div , emailLabel and emailID input tage
    const emailDiv = FormConstants.createElement('div', 'class', "form-control");
    const emailLabel = FormConstants.createElementText('label', 'Email : ');
    emailDiv.appendChild(emailLabel);
    const emailID = FormConstants.multiAttribute('input', 'type', "email", 'name', "email", 'value', "");
    emailLabel.appendChild(emailID);

    // create birthDate div , birthDateLabel and birthDate input tage
    const birthDateDiv = FormConstants.createElement('div', 'class', "form-control");
    const birthDateLabel = FormConstants.createElementText('label', 'Date of Birth : ');
    birthDateDiv.appendChild(birthDateLabel);
    const birthDate = FormConstants.multiAttribute('input', 'type', "date", 'name', "birthDate");
    birthDateLabel.appendChild(birthDate);

    // create address div , addressLabel and addressBox input tage
    const addressDiv = FormConstants.createElement('div', 'class', "form-control");
    const addressLabel = FormConstants.createElementText('label', 'Address : ');
    addressDiv.appendChild(addressLabel);
    const addressbr = FormConstants.createElement('br');
    const addressArea = FormConstants.multiAttribute('textarea', 'name', "address", 'cols', "30", 'rows', "3");
    addressLabel.appendChild(addressbr);
    addressLabel.appendChild(addressArea);

    // create hobbies div and checkbox
    const hobbiesdiv = FormConstants.createElementText('div', "Choose your hobbies : ", 'class', "form-control");
    for (let i = 0; i < FormConstants.hobbies.length; i++) {
        const hobbiesBox = FormConstants.hobbiesBox(`${FormConstants.hobbies[i].id}`, `${FormConstants.hobbies[i].displayValue}`);
        hobbiesdiv.appendChild(hobbiesBox.tage);
        hobbiesdiv.appendChild(hobbiesBox.createTxt);
    };

    //create submit and reset button 
    const buttonDiv = FormConstants.createElement('div', 'class', "form-control");
    const submitButton = FormConstants.createElementText('button', 'Submit', 'type', "submit");
    const resetButton = FormConstants.createElementText('button', 'reset', 'type', "reset");
    buttonDiv.appendChild(submitButton);
    buttonDiv.appendChild(resetButton);



    // fieldset in side appendChild legend, salutationDiv, firstNameDiv, lastNameDiv, genderdiv, emaildiv, birthDateDiv, addressDiv, hobbiesdiv, buttonDiv
    fieldset.appendChild(legend);
    fieldset.appendChild(salutationDiv);
    fieldset.appendChild(firstNameDiv);
    fieldset.appendChild(lastNameDiv);
    fieldset.appendChild(genderdiv);
    fieldset.appendChild(emailDiv);
    fieldset.appendChild(birthDateDiv);
    fieldset.appendChild(addressDiv);
    fieldset.appendChild(hobbiesdiv);
    fieldset.appendChild(buttonDiv);

    // form in side appendChild personId and fieldset
    form.appendChild(personId);
    form.appendChild(fieldset);

    // getBodyDiv in side appendChild form
    getBodyDiv.appendChild(form);
})
























