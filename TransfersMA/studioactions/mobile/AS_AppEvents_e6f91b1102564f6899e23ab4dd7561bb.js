function AS_AppEvents_e6f91b1102564f6899e23ab4dd7561bb(eventobject) {
    var self = this;
    try {
        _kony.mvc.initCompositeApp(true);
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
    } catch (err) {
        alert(err);
    }
}