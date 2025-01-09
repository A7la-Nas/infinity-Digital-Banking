function AS_AppEvents_c88cd89f639744e4ad9ac08a2f5ccf28(eventobject) {
    var self = this;
    try {
        applicationManager.applicationMode = "Mobile";
    } catch (err) {
        alert(err);
    }
}