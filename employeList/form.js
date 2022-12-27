






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








