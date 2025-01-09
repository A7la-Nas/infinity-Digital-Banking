function AS_TextField_g643432d89eb4ebb89eac19d93014aa2(eventobject) {
    var self = this;
    this.checkifUserNameContainsMaskCharacter();
    this.capsLockIndicatorForUserName();
    /*var orientationHandler = new OrientationHandler();
if (kony.application.getCurrentBreakpoint() > 1024 && orientationHandler.isDesktop) {
  if (event.getModifierState("CapsLock")) {
    this.view.main.lblUsernameCapsLocIndicator.setVisibility(true);
  } else {
    this.view.main.lblUsernameCapsLocIndicator.setVisibility(false);
  }
  this.view.forceLayout();
}*/
}