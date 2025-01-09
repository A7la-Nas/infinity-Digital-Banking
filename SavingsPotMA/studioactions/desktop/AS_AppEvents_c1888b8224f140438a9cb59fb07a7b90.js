function AS_AppEvents_c1888b8224f140438a9cb59fb07a7b90(eventobject) {
    var self = this;
    kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
        deeplinkpath: eventobject.deeplinkpath,
        formID: eventobject.formID,
    };
}