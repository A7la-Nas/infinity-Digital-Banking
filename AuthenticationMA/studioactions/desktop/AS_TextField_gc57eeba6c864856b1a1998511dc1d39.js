function AS_TextField_gc57eeba6c864856b1a1998511dc1d39(eventobject) {
    var self = this;
    this.enableLogin(this.view.main.tbxUserName.text.trim(), this.view.main.tbxPassword.text);
    this.capsLockIndicatorForPassword();
}