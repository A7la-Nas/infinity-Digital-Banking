function AS_AppEvents_h2ca58051d5547298a589e1f3daa9ebc(eventobject) {
    var self = this;
    _kony.mvc.initCompositeApp(true);
    try {
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
    } catch (err) {
        alert(err);
    }
}