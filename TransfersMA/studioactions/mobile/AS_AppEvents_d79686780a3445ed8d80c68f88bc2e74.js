function AS_AppEvents_d79686780a3445ed8d80c68f88bc2e74(eventobject) {
    var self = this;
    try {
        _kony.mvc.initCompositeApp(true);
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
    } catch (err) {
        alert(err);
    }
}