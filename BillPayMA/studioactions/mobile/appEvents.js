define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_b208349c48aa48a2a6aa18270b0d4e65: function AS_AppEvents_b208349c48aa48a2a6aa18270b0d4e65(eventobject) {
        var self = this;
        try {
            _kony.mvc.initCompositeApp(true);
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
        } catch (err) {
            alert(err);
        }
    },
    AS_AppEvents_id3531e9346c4582a755de4af6e2a792: function AS_AppEvents_id3531e9346c4582a755de4af6e2a792(eventobject) {
        var self = this;
        try {
            applicationManager.applicationMode = "Mobile";
        } catch (err) {
            alert(err);
        }
    }
});