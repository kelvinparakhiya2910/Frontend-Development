(function () {
    const body = document.getElementById('body');
    const Actions = {
        theme1: 'theme1',
        theme2: 'theme2',
        theme3: 'theme3'
    };
    function setTheme(actions) {
        body.setAttribute('class', actions);
    };
    function actionsHandle(event) {
        const getThemeName = event.target.dataset.themename;
        switch (getThemeName) {
            case Actions.theme1:
                setTheme(getThemeName);
                break;
            case Actions.theme2:
                setTheme(getThemeName);
                break;
            case Actions.theme3:
                setTheme(getThemeName);
                break;
            default:
                break;
        }
    };
    const header = document.getElementById('header');
    header.addEventListener("click", actionsHandle);
}());





