function AS_Button_g945ad1f9a3c4deaac40fd69a3016b69(eventobject) {
    var self = this;
    var currForm = kony.application.getCurrentForm();
    if (currForm.flxEditRule.isVisible == true) {
        currForm.flxEditRule.isVisible = false;
    } else {
        currForm.flxEditRule.isVisible = true;
    }
}