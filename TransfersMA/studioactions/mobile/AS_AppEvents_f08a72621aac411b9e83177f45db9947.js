function AS_AppEvents_f08a72621aac411b9e83177f45db9947(eventobject) {
    var self = this;
    try {
        applicationManager.applicationMode = "Mobile";
    } catch (err) {
        alert(err);
    }
}