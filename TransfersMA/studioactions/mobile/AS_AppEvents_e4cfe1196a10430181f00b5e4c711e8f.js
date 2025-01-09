function AS_AppEvents_e4cfe1196a10430181f00b5e4c711e8f(eventobject) {
    var self = this;
    try {
        _kony.mvc.initCompositeApp(true);
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
    } catch (err) {
        alert(err);
    }
}