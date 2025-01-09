function AS_AppEvents_b208349c48aa48a2a6aa18270b0d4e65(eventobject) {
    var self = this;
    try {
        _kony.mvc.initCompositeApp(true);
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
    } catch (err) {
        alert(err);
    }
}