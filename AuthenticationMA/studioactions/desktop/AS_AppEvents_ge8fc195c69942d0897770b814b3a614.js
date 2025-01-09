function AS_AppEvents_ge8fc195c69942d0897770b814b3a614(eventobject) {
    var self = this;
    kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
        deeplinkpath: eventobject.deeplinkpath,
        formID: eventobject.formID,
    };
}