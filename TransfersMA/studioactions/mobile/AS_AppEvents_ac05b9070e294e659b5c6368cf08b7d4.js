function AS_AppEvents_ac05b9070e294e659b5c6368cf08b7d4(eventobject) {
    var self = this;
    try {
        applicationManager.applicationMode = "Mobile";
    } catch (err) {
        alert(err);
    }
}