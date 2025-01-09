function AS_AppEvents_ed57e4e339b14187bc1493456ecd86ec(eventobject) {
    var self = this;
    kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
        deeplinkpath: eventobject.deeplinkpath,
        formID: eventobject.formID,
    }
}