function AS_AppEvents_eb971bc1c81f4fab8d6977c7e4be391a(eventobject) {
    var self = this;
    var self = this;
    kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
        deeplinkpath: eventobject.deeplinkpath,
        formID: eventobject.formID,
    };
}