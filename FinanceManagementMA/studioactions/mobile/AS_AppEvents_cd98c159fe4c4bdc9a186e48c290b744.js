function AS_AppEvents_cd98c159fe4c4bdc9a186e48c290b744(eventobject) {
    var self = this;
    try {
        applicationManager.applicationMode = "Mobile";
    } catch (err) {
        alert(err);
    }
}