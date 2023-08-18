(function () {
    const tasksArray = [];
    const recycleArray = [];
    const Actions = Object.freeze({
        DeleteTask: 'Delete',
        MoveUP: 'Move-UP',
        MoveDown: 'Move-Down',
        MoveTop: 'Move-Top',
        MoveBottom: 'Move-Bottom',
        RecycleDelete: 'Recycle-Delete',
        Restor: 'Restor',
        checkbox: 'checked',
    });
    const tasksStorage = Object.freeze({
        userdata: function () {
            localStorage.setItem("userdata", JSON.stringify(tasksArray));
        },
        deleteUserdata: function () {
            localStorage.setItem("deleteUserdata", JSON.stringify(recycleArray));
        },
        LocalstorageToArray: function () {
            const storuserdata = JSON.parse(localStorage.getItem('userdata'));
            for (let i = 0; i < storuserdata.length; i++) {
                tasksArray.push(storuserdata[i]);
            }
            const storDeleteUserdata = JSON.parse(localStorage.getItem('deleteUserdata'));
            for (let i = 0; i < storDeleteUserdata.length; i++) {
                recycleArray.push(storDeleteUserdata[i]);
            }
        }
    });
    const taskManager = Object.freeze({
        createButton: function (name, id, action, boolean) {
            const button = document.createElement('button');
            button.setAttribute('data-id', id);
            button.setAttribute("data-action", action);
            button.disabled = boolean;
            const text = document.createTextNode(name);
            button.appendChild(text);
            return button;
        },
        createcheckbox: function (id, action) {
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', "checkbox");
            checkbox.setAttribute('data-id', id);
            checkbox.setAttribute("data-action", action);
            checkbox.setAttribute('value', "false");
            const label = document.createElement('label');
            label.setAttribute('for', "Complete");
            const text = document.createTextNode('Complete');
            label.appendChild(text);
            return {
                checkbox,
                label
            };
        },
        tasksArrayIndex: function (id) {
            let index = -1;
            for (let i = 0; i < tasksArray.length && index === -1; i++) {
                index = tasksArray[i].id === id ? i : index;
            };
            return index;
        },
        recycleArrayIndex: function (id) {
            let index = -1;
            for (let i = 0; i < recycleArray.length && index === -1; i++) {
                index = recycleArray[i].id === id ? i : index;
            };
            return index;
        },
        actionsHandle: function actionsHandle(event) {
            const id = event.target.dataset.id;
            switch (event.target.dataset.action) {
                case Actions.DeleteTask:
                    taskManager.delete(id);
                    break;
                case Actions.MoveUP:
                    taskManager.moveUp(id);
                    break;
                case Actions.MoveDown:
                    taskManager.moveDown(id);
                    break;
                case Actions.MoveBottom:
                    taskManager.moveBottom(id);
                    break;
                case Actions.MoveTop:
                    taskManager.moveTop(id);
                    break;
                case Actions.checkbox:
                    taskManager.completeTask(id);
                    break;
                case Actions.RecycleDelete:
                    taskManager.recycleTaskDelet(id);
                    break;
                case Actions.Restor:
                    taskManager.RestorTask(id);
                    break;
                default:
                    break;
            }
        },
        makeId: function () {
            const tokenLen = 16;
            let text = "";
            const possible =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < tokenLen; ++i)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },
        delete: function (id) {
            const tasksIndex = taskManager.tasksArrayIndex(id);
            recycleArray.push(tasksArray[tasksIndex]);
            tasksArray.splice(tasksIndex, 1);
            RecycleTable(recycleArray);
            tasksTable(tasksArray);
            tasksStorage.userdata();
            tasksStorage.deleteUserdata();
        },
        moveUp: function (id) {
            if (tasksArray.length <= 1) {
                return;
            }
            const tasksIndex = taskManager.tasksArrayIndex(id);
            if (tasksIndex >= 1) {
                const upTask = tasksArray[tasksIndex - 1];
                const task = tasksArray[tasksIndex];
                tasksArray[tasksIndex - 1] = task;
                tasksArray[tasksIndex] = upTask;
                tasksTable(tasksArray);
                tasksStorage.userdata();
            }
        },
        moveDown: function (id) {
            if (tasksArray.length <= 1) {
                return;
            }
            const tasksIndex = taskManager.tasksArrayIndex(id);
            if (tasksIndex <= tasksArray.length - 2) {
                const lowerTask = tasksArray[tasksIndex + 1];
                const task = tasksArray[tasksIndex];
                tasksArray[tasksIndex + 1] = task;
                tasksArray[tasksIndex] = lowerTask;
                tasksTable(tasksArray);
                tasksStorage.userdata();
            }
        },
        moveTop: function (id) {
            if (tasksArray.length <= 1) {
                return;
            }
            const tasksIndex = taskManager.tasksArrayIndex(id);
            if (tasksIndex >= 1) {
                const topTask = tasksArray[tasksIndex];
                tasksArray.splice(tasksIndex, 1);
                tasksArray.unshift(topTask);
                tasksTable(tasksArray);
                tasksStorage.userdata();
            }
        },
        moveBottom: function (id) {
            if (tasksArray.length <= 1) {
                return;
            }
            const tasksIndex = taskManager.tasksArrayIndex(id);
            if (tasksIndex <= tasksArray.length - 2) {
                const task = tasksArray[tasksIndex];
                tasksArray.splice(tasksIndex, 1);
                tasksArray.push(task);
                tasksTable(tasksArray);
                tasksStorage.userdata();
            }
        },
        completeTask: function (id) {
            const tasksIndex = taskManager.tasksArrayIndex(id);
            if (tasksIndex !== -1) {
                if (tasksArray[tasksIndex].isComplete !== true) {
                    tasksArray[tasksIndex].isComplete = true;
                    const task = tasksArray[tasksIndex];
                    tasksArray.splice(tasksIndex, 1);
                    tasksArray.push(task);
                    tasksTable(tasksArray);
                    tasksStorage.userdata();
                } else {
                    tasksArray[tasksIndex].isComplete = false;
                    tasksTable(tasksArray);
                    tasksStorage.userdata();
                }
            }
        },
        recycleTaskDelet: function (id) {
            const recycletasksIndex = taskManager.recycleArrayIndex(id);
            recycleArray.splice(recycletasksIndex, 1);
            RecycleTable(recycleArray);
            tasksStorage.deleteUserdata();
        },
        RestorTask: function (id) {
            const recycletasksIndex = taskManager.recycleArrayIndex(id);
            tasksArray.push(recycleArray[recycletasksIndex]);
            recycleArray.splice(recycletasksIndex, 1);
            RecycleTable(recycleArray);
            tasksTable(tasksArray);
            tasksStorage.userdata();
            tasksStorage.deleteUserdata();
        }
    });
    document.querySelector('#push').onclick = function () {
        if (document.querySelector("#newtask input").value.length === 0) {
            alert("retry pleas add new Task");
        } else {
            const inputText = document.getElementById('inputText');
            tasksArray.unshift({
                id: `${taskManager.makeId()}`,
                text: `${inputText.value}`,
                isComplete: false,
            });
            tasksTable(tasksArray);
            inputText.value = "";
            tasksStorage.userdata();
        }
    };
    const recycleDiv = document.getElementById('recycleTask');
    recycleDiv.addEventListener('click', taskManager.actionsHandle);
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.addEventListener('click', taskManager.actionsHandle);

    function tasksTable(arr) {
        tasksDiv.innerHTML = "";

        const table = document.createElement("table");
        const tHead = document.createElement("thead");
        const tHeadTR = document.createElement("tr");
        const numberTH = document.createElement("th");
        numberTH.setAttribute("id", 'taskNumber');
        const numberText = document.createTextNode("Number");
        numberTH.appendChild(numberText);
        const tasksTH = document.createElement("th");
        const tasksText = document.createTextNode("Tasks");
        tasksTH.appendChild(tasksText);
        const actionsTH = document.createElement("th");
        actionsTH.setAttribute("id", 'Actions');
        const actionsText = document.createTextNode("Actions");
        actionsTH.appendChild(actionsText);

        tHeadTR.appendChild(numberTH);
        tHeadTR.appendChild(tasksTH);
        tHeadTR.appendChild(actionsTH);
        tHead.appendChild(tHeadTR);

        const tBody = document.createElement("tbody");
        arr.forEach(element => {
            const tBodyTR = document.createElement("tr");
            const numberTD = document.createElement("td");
            const numberText = document.createTextNode(`${arr.indexOf(element) + 1}`);
            numberTD.appendChild(numberText);
            const tasksTD = document.createElement("td");
            if (element.isComplete === true) {
                const sTag = document.createElement('s');
                const tasksText = document.createTextNode(element.text);
                sTag.appendChild(tasksText);
                tasksTD.appendChild(sTag);
            } else {
                const tasksText = document.createTextNode(element.text);
                tasksTD.appendChild(tasksText);
            }
            const buttonTD = document.createElement("td");
            let disabled = false;
            if (element.isComplete === true) {
                disabled = true;
            }
            const deleteBtn = taskManager.createButton('Delete', element["id"], Actions.DeleteTask, false);
            const moveUPBtn = taskManager.createButton('Move-UP', element["id"], Actions.MoveUP, disabled);
            const moveDownBtn = taskManager.createButton('Move-Down', element["id"], Actions.MoveDown, disabled);
            const moveTopBtn = taskManager.createButton('Move-Top', element["id"], Actions.MoveTop, disabled);
            const moveBottomBtn = taskManager.createButton('Move-Bottom', element["id"], Actions.MoveBottom, disabled);
            buttonTD.appendChild(deleteBtn);
            buttonTD.appendChild(moveUPBtn);
            buttonTD.appendChild(moveDownBtn);
            buttonTD.appendChild(moveTopBtn);
            buttonTD.appendChild(moveBottomBtn);

            const tasksCheckbox = taskManager.createcheckbox(element["id"], Actions.checkbox);
            buttonTD.appendChild(tasksCheckbox.checkbox);
            buttonTD.appendChild(tasksCheckbox.label);

            tBodyTR.appendChild(numberTD);
            tBodyTR.appendChild(tasksTD);
            tBodyTR.appendChild(buttonTD);
            tBody.appendChild(tBodyTR);
        });
        table.appendChild(tHead);
        table.appendChild(tBody);
        tasksDiv.appendChild(table);
    };

    function RecycleTable(arr) {
        recycleDiv.innerHTML = "";

        const table = document.createElement("table");
        const tHead = document.createElement("thead");
        const tHeadTR = document.createElement("tr");
        const numberTH = document.createElement("th");
        numberTH.setAttribute("id", 'number');
        const numberText = document.createTextNode("Number");
        numberTH.appendChild(numberText);
        const tasksTH = document.createElement("th");
        const tasksText = document.createTextNode("Tasks");
        tasksTH.appendChild(tasksText);
        const actionsTH = document.createElement("th");
        actionsTH.setAttribute("id", 'deletActions');
        const actionsText = document.createTextNode("Actions");
        actionsTH.appendChild(actionsText);
        tHeadTR.appendChild(numberTH);
        tHeadTR.appendChild(tasksTH);
        tHeadTR.appendChild(actionsTH);
        tHead.appendChild(tHeadTR);

        const tBody = document.createElement("tbody");
        arr.forEach(element => {
            const tBodyTR = document.createElement("tr");
            const numberTD = document.createElement("td");
            const textElement1 = document.createTextNode(`${arr.indexOf(element) + 1}`);
            numberTD.appendChild(textElement1);
            const tasksTD = document.createElement("td");
            if (element.isComplete === true) {
                const sTag = document.createElement('s');
                const tasksText = document.createTextNode(element.text);
                sTag.appendChild(tasksText);
                tasksTD.appendChild(sTag);
            } else {
                const tasksText = document.createTextNode(element.text);
                tasksTD.appendChild(tasksText);
            };
            const buttonTD = document.createElement("td");
            const disabled = element.isComplete;
            const deleteBtn = taskManager.createButton('Delete', element["id"], Actions.RecycleDelete, disabled);
            const restorBtn = taskManager.createButton('Restor', element["id"], Actions.Restor, disabled);
            buttonTD.appendChild(deleteBtn);
            buttonTD.appendChild(restorBtn);

            const tasksCheckbox = taskManager.createcheckbox(element["id"]);
            buttonTD.appendChild(tasksCheckbox.checkbox);
            buttonTD.appendChild(tasksCheckbox.label);

            tBodyTR.appendChild(numberTD);
            tBodyTR.appendChild(tasksTD);
            tBodyTR.appendChild(buttonTD);
            tBody.appendChild(tBodyTR);
        });
        table.appendChild(tHead);
        table.appendChild(tBody);
        recycleDiv.appendChild(table);
    };
    tasksStorage.LocalstorageToArray();
    tasksTable(tasksArray);
    RecycleTable(recycleArray);
}());