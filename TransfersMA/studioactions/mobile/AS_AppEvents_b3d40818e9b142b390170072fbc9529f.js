function AS_AppEvents_b3d40818e9b142b390170072fbc9529f(eventobject) {
    var self = this;
    try {
        _kony.mvc.initCompositeApp(true);
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
    } catch (err) {
        alert(err);
    }
}