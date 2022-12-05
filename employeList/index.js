(function () {

    const FormConstants = Object.freeze({
        personalDetails: [],
        hobbiesItret: {},
        genderItret: {},
        userdata: function () {
            localStorage.setItem("userdata", JSON.stringify(FormConstants.personalDetails));
        },
        LocalstorageToArray: function () {
            const storuserdata = JSON.parse(localStorage.getItem('userdata')) || [];
            for (let i = 0; i < storuserdata.length; i++) {
                FormConstants.personalDetails.push(storuserdata[i]);
            };
        },
        Actions: {
            DeleteData: 'Delete',
            MoveUP: 'Move-UP',
            MoveDown: 'Move-Down',
            Adit: 'Adit',

        },
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
        salutation: [
            /*Add objects here with keys id & displayValue */
        ],
        makeId: function () {
            const tokenLen = 16;
            let text = "";
            const possible =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < tokenLen; ++i)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },
        createButton: function (name, id, action) {
            const button = document.createElement('button');
            button.setAttribute('data-id', id);
            button.setAttribute("data-action", action);
            const text = document.createTextNode(name);
            button.appendChild(text);
            return button;
        },
        getIndex: function (id) {
            let index = -1;
            for (let i = 0; i < FormConstants.personalDetails.length && index === -1; i++) {
                index = FormConstants.personalDetails[i].personId === id ? i : index;
            };
            return index;
        },
        actionsHandle: function actionsHandle(event) {
            const DetailsID = event.target.dataset.id;
            const DetailsAction = event.target.dataset.action;
            console.log(DetailsAction);
            switch (DetailsAction) {
                case FormConstants.Actions.DeleteData:
                    FormConstants.delete(DetailsID);
                    break;
                case FormConstants.Actions.MoveUP:
                    FormConstants.moveUp(DetailsID);
                    break;
                case FormConstants.Actions.MoveDown:
                    FormConstants.moveDown(DetailsID);
                    break;
                case FormConstants.Actions.Adit:
                    FormConstants.Adit(DetailsID);
                    break;
                case FormConstants.hobbiesItret.DetailsAction:
                    // console.log(DetailsAction);
                    FormConstants.hobbieActions(DetailsID, DetailsAction);
                    // alert('thes is hobbies alert');
                    break;
                default:
                    break;
            }
        },
        delete: function (id) {
            const detailsID = FormConstants.getIndex(id);
            FormConstants.personalDetails.splice(detailsID, 1);
            createTable(FormConstants.personalDetails);
            FormConstants.userdata();
        },
        moveUp: function (id) {
            if (FormConstants.personalDetails.length <= 1) {
                return;
            }
            const detailsID = FormConstants.getIndex(id);
            if (detailsID >= 1) {
                const upDetails = FormConstants.personalDetails[detailsID - 1];
                const details = FormConstants.personalDetails[detailsID];
                FormConstants.personalDetails[detailsID - 1] = details;
                FormConstants.personalDetails[detailsID] = upDetails;
                createTable(FormConstants.personalDetails);
                FormConstants.userdata();
            }
        },
        moveDown: function (id) {
            if (FormConstants.personalDetails.length <= 1) {
                return;
            }
            const parsanIndex = FormConstants.getIndex(id);
            if (parsanIndex <= FormConstants.personalDetails.length - 2) {
                const lowerDetails = FormConstants.personalDetails[parsanIndex + 1];
                const details = FormConstants.personalDetails[parsanIndex];
                FormConstants.personalDetails[parsanIndex + 1] = details;
                FormConstants.personalDetails[parsanIndex] = lowerDetails;
                createTable(FormConstants.personalDetails);
                FormConstants.userdata();
            }
        },
        Adit: function (id) {
            const parsanIndex = FormConstants.getIndex(id);
            const name = personalDetailsForm.getElementsByTagName('input');
            const details = FormConstants.personalDetails[parsanIndex];
            // let a = FormData.set(firstName, details[firstName]);
            console.log(details[firstName]);

        },
        hobbieActions: function (id, action) {

        },
    });

    for (let i = 0; i < FormConstants.hobbies.length; i++) {
        if (FormConstants.hobbiesItret.keys !== FormConstants.hobbies[i].id) {
            FormConstants.hobbiesItret[FormConstants.hobbies[i].id] = FormConstants.hobbies[i].displayValue;
        }
    };
    for (let i = 0; i < FormConstants.gender.length; i++) {
        if (FormConstants.genderItret.keys !== FormConstants.gender[i].id) {
            FormConstants.genderItret[FormConstants.gender[i].id] = FormConstants.gender[i].displayValue;
        }
    };



    function hobbiesBox(value, hobbieName) {
        const tage = document.createElement('input');
        tage.setAttribute('type', "checkbox");
        tage.setAttribute('name', "hobbies");
        tage.setAttribute('value', value);
        const createTxt = document.createTextNode(hobbieName);
        return {
            tage,
            createTxt
        };
    };
    const labelID = document.getElementById('checkbox');

    for (const key in FormConstants.hobbiesItret) {
        const onecheckbox = hobbiesBox(`${key}`, `${FormConstants.hobbiesItret[key]}`);
        labelID.appendChild(onecheckbox.tage);
        labelID.appendChild(onecheckbox.createTxt);
    }

    const personalDetailsForm = document.getElementById('personalDetailsForm');
    personalDetailsForm.addEventListener('click', FormConstants.actionsHandle);

    const formFieldNames = {
        personId: 'personId',
        salutation: 'salutation',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender',
        email: 'email',
        birthDate: 'birthDate',
        address: 'address',
        hobbies: 'hobbies',
    }
    personalDetailsForm.onsubmit = function (event) {
        event.preventDefault();
        const details = new FormData(personalDetailsForm);
        const obj = {
            personId: FormConstants.makeId(),
            salutation: details.get(formFieldNames.salutation),
            firstName: details.get(formFieldNames.firstName),
            lastName: details.get(formFieldNames.lastName),
            gender: details.get(formFieldNames.gender),
            email: details.get(formFieldNames.email),
            birthDate: details.get(formFieldNames.birthDate),
            address: details.get(formFieldNames.address),
            hobbies: details.getAll(formFieldNames.hobbies),
        };
        FormConstants.personalDetails.push(obj);
        createTable(FormConstants.personalDetails);
        personalDetailsForm.reset();
        FormConstants.userdata();
    }


    function createTableElement(tegName, text, aName, value) {
        const tage = document.createElement(tegName);
        tage.setAttribute(aName, value);
        const createTxt = document.createTextNode(text);
        tage.appendChild(createTxt);
        return tage;
    };

    function createTable(arr) {
        personalDetailsForm.removeChild(personalDetailsForm.lastChild);

        const table = document.createElement("table");
        const tHead = document.createElement("thead");
        const tHeadTR = document.createElement("tr");

        const numberTH = createTableElement('th', 'Number');
        tHeadTR.appendChild(numberTH);
        const firstNameTH = createTableElement('th', 'First Name');
        tHeadTR.appendChild(firstNameTH);
        const lastNameTH = createTableElement('th', 'Last Name');
        tHeadTR.appendChild(lastNameTH);
        const emailTH = createTableElement('th', 'Email');
        tHeadTR.appendChild(emailTH);
        const dobTH = createTableElement('th', 'Date of Birth');
        tHeadTR.appendChild(dobTH);
        const genderTH = createTableElement('th', 'Gender');
        tHeadTR.appendChild(genderTH);
        const addressTH = createTableElement('th', 'Address');
        tHeadTR.appendChild(addressTH);
        const hobbiesTH = createTableElement('th', 'Hobbies');
        tHeadTR.appendChild(hobbiesTH);
        const actionsTH = createTableElement('th', 'Actions');
        tHeadTR.appendChild(actionsTH);

        tHead.appendChild(tHeadTR);

        const tBody = document.createElement("tbody");
        arr.forEach(element => {
            const tBodyTR = document.createElement("tr");
            const numberTD = createTableElement('td', `${arr.indexOf(element) + 1}`);
            tBodyTR.appendChild(numberTD);
            const firstTD = createTableElement('td', element.firstName);
            tBodyTR.appendChild(firstTD);
            const lastTD = createTableElement('td', element.lastName);
            tBodyTR.appendChild(lastTD);
            const emailTD = createTableElement('td', element.email);
            tBodyTR.appendChild(emailTD);
            const dobTD = createTableElement('td', element.birthDate);
            tBodyTR.appendChild(dobTD);

            const hobbie = FormConstants.genderItret[element.gender];
            const genderTD = createTableElement('td', hobbie);
            tBodyTR.appendChild(genderTD);
            const addressTD = createTableElement('td', element.address);
            tBodyTR.appendChild(addressTD);

            const hobbiesTD = document.createElement("td");
            for (let i = 0; i < element.hobbies.length; i++) {
                const idof = element.hobbies[i];
                const hobbie = FormConstants.hobbiesItret[idof];
                const liItem = createTableElement('li', hobbie, 'data-id', element.personId);
                liItem.setAttribute('data-action', idof);
                hobbiesTD.appendChild(liItem);
            }
            tBodyTR.appendChild(hobbiesTD);




            const buttonTD = document.createElement("td");
            const deleteBtn = FormConstants.createButton('Delete', element.personId, FormConstants.Actions.DeleteData);
            const moveUPBtn = FormConstants.createButton('Move-UP', element.personId, FormConstants.Actions.MoveUP);
            const moveDownBtn = FormConstants.createButton('Move-Down', element.personId, FormConstants.Actions.MoveDown);
            const aditBtn = FormConstants.createButton('Adit', element.personId, FormConstants.Actions.Adit);
            buttonTD.appendChild(deleteBtn);
            buttonTD.appendChild(moveUPBtn);
            buttonTD.appendChild(moveDownBtn);
            buttonTD.appendChild(aditBtn);
            tBodyTR.appendChild(buttonTD);

            tBody.appendChild(tBodyTR);
        });
        table.appendChild(tHead);
        table.appendChild(tBody);
        personalDetailsForm.appendChild(table);
    };
    FormConstants.LocalstorageToArray();
    createTable(FormConstants.personalDetails);
}());