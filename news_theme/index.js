(function () {
    const body = document.getElementById('body');
    const Actions = {
        theme1: 'theme1',
        theme2: 'theme2',
        theme3: 'theme3'
    };
    function theme1(actions) {
        body.setAttribute('class', actions);
    };
    function actionsHandle(event) {
        const id = event.target.dataset.id;
        const action = event.target.dataset.action;
        switch (action) {
            case Actions.theme1:
                theme1(action);
                break;
            case Actions.theme2:
                theme1(action);
                break;
            case Actions.theme3:
                theme1(action);
                break;
            default:
                break;
        }
    };
    const header = document.getElementById('header');
    header.addEventListener("click", actionsHandle);
}());





