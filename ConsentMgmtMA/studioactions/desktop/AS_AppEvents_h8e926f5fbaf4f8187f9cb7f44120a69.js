function AS_AppEvents_h8e926f5fbaf4f8187f9cb7f44120a69(eventobject) {
    var self = this;
    kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
        deeplinkpath: eventobject.deeplinkpath,
        formID: eventobject.formID,
    }
}