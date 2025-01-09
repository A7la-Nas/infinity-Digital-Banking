define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_a865fb9340334442b65f942e7f451141: function AS_AppEvents_a865fb9340334442b65f942e7f451141(eventobject) {
        var self = this;
        try {
            applicationManager.applicationMode = "Mobile";
        } catch (err) {
            alert(err);
        }
    },
    AS_AppEvents_d79686780a3445ed8d80c68f88bc2e74: function AS_AppEvents_d79686780a3445ed8d80c68f88bc2e74(eventobject) {
        var self = this;
        try {
            _kony.mvc.initCompositeApp(true);
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
        } catch (err) {
            alert(err);
        }
    }
});