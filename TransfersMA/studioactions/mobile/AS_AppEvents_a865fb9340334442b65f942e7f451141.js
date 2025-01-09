function AS_AppEvents_a865fb9340334442b65f942e7f451141(eventobject) {
    var self = this;
    try {
        applicationManager.applicationMode = "Mobile";
    } catch (err) {
        alert(err);
    }
}