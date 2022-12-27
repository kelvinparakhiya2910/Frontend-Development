

const personalDetails = []
const hobbiesItret = {}
const genderItret = {}
function userdata() {
    localStorage.setItem("userdata", JSON.stringify(personalDetails));
}
function LocalstorageToArray() {
    const storuserdata = JSON.parse(localStorage.getItem('userdata')) || [];
    for (let i = 0; i < storuserdata.length; i++) {
        personalDetails.push(storuserdata[i]);
    };
}
const Actions = {
    DeleteData: 'Delete',
    MoveUP: 'Move-UP',
    MoveDown: 'Move-Down',
    Adit: 'Adit',

}
const hobbies = [
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
]
const gender = [
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
]
const salutation = [
    /*Add objects here with keys id & displayValue */
]
function makeId() {
    const tokenLen = 16;
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < tokenLen; ++i)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function createButton(name, id, action) {
    const button = document.createElement('button');
    button.setAttribute('data-id', id);
    button.setAttribute("data-action", action);
    const text = document.createTextNode(name);
    button.appendChild(text);
    return button;
}
function getIndex(id) {
    let index = -1;
    for (let i = 0; i < personalDetails.length && index === -1; i++) {
        index = personalDetails[i].personId === id ? i : index;
    };
    return index;
}
function actionsHandle(event) {
    const DetailsID = event.target.dataset.id;
    const DetailsAction = event.target.dataset.action;
    console.log(DetailsAction);
    switch (DetailsAction) {
        case Actions.DeleteData:
            deletes(DetailsID);
            break;
        case Actions.MoveUP:
            moveUp(DetailsID);
            break;
        case Actions.MoveDown:
            moveDown(DetailsID);
            break;
        case Actions.Adit:
            Adit(DetailsID);
            break;
        case hobbiesItret.DetailsAction:
            // console.log(DetailsAction);
            hobbieActions(DetailsID, DetailsAction);
            // alert('thes is hobbies alert');
            break;
        default:
            break;
    }
}
function deletes(id) {
    const detailsID = getIndex(id);
    personalDetails.splice(detailsID, 1);
    createTable(personalDetails);
    userdata();
}
function moveUp(id) {
    if (personalDetails.length <= 1) {
        return;
    }
    const detailsID = getIndex(id);
    if (detailsID >= 1) {
        const upDetails = personalDetails[detailsID - 1];
        const details = personalDetails[detailsID];
        personalDetails[detailsID - 1] = details;
        personalDetails[detailsID] = upDetails;
        createTable(personalDetails);
        userdata();
    }
}
function moveDown(id) {
    if (personalDetails.length <= 1) {
        return;
    }
    const parsanIndex = getIndex(id);
    if (parsanIndex <= personalDetails.length - 2) {
        const lowerDetails = personalDetails[parsanIndex + 1];
        const details = personalDetails[parsanIndex];
        personalDetails[parsanIndex + 1] = details;
        personalDetails[parsanIndex] = lowerDetails;
        createTable(personalDetails);
        userdata();
    }
}
function Adit(id) {
    const parsanIndex = getIndex(id);
    const names = document.getElementById('personalDetailsForm');
    const details = personalDetails[parsanIndex];

    function initForm(oForm, elementName, initTxt) {
        frmElement = oForm.elements[elementName];
        frmElement.value = initTxt;
    };

    initForm(names, 'personId', details.personId);
    initForm(names, 'firstName', details.firstName);

}



function hobbieActions(id, action) {

}

for (let i = 0; i < hobbies.length; i++) {
    if (hobbiesItret.keys !== hobbies[i].id) {
        hobbiesItret[hobbies[i].id] = hobbies[i].displayValue;
    }
};
for (let i = 0; i < gender.length; i++) {
    if (genderItret.keys !== gender[i].id) {
        genderItret[gender[i].id] = gender[i].displayValue;
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

for (const key in hobbiesItret) {
    const onecheckbox = hobbiesBox(`${key}`, `${hobbiesItret[key]}`);
    labelID.appendChild(onecheckbox.tage);
    labelID.appendChild(onecheckbox.createTxt);
}

const personalDetailsForm = document.getElementById('personalDetailsForm');
personalDetailsForm.addEventListener('click', actionsHandle);

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
        personId: makeId(),
        salutation: details.get(formFieldNames.salutation),
        firstName: details.get(formFieldNames.firstName),
        lastName: details.get(formFieldNames.lastName),
        gender: details.get(formFieldNames.gender),
        email: details.get(formFieldNames.email),
        birthDate: details.get(formFieldNames.birthDate),
        address: details.get(formFieldNames.address),
        hobbies: details.getAll(formFieldNames.hobbies),
    };
    personalDetails.push(obj);
    createTable(personalDetails);
    personalDetailsForm.reset();
    userdata();
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

        const hobbie = genderItret[element.gender];
        const genderTD = createTableElement('td', hobbie);
        tBodyTR.appendChild(genderTD);
        const addressTD = createTableElement('td', element.address);
        tBodyTR.appendChild(addressTD);

        const hobbiesTD = document.createElement("td");
        for (let i = 0; i < element.hobbies.length; i++) {
            const idof = element.hobbies[i];
            const hobbie = hobbiesItret[idof];
            const liItem = createTableElement('li', hobbie, 'data-id', element.personId);
            liItem.setAttribute('data-action', idof);
            hobbiesTD.appendChild(liItem);
        }
        tBodyTR.appendChild(hobbiesTD);




        const buttonTD = document.createElement("td");
        const deleteBtn = createButton('Delete', element.personId, Actions.DeleteData);
        const moveUPBtn = createButton('Move-UP', element.personId, Actions.MoveUP);
        const moveDownBtn = createButton('Move-Down', element.personId, Actions.MoveDown);
        const aditBtn = createButton('Adit', element.personId, Actions.Adit);
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
(function () {
    LocalstorageToArray();
    createTable(personalDetails);
}());