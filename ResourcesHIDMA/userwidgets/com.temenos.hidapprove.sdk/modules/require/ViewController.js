define(['./KonyLogger'],function (konyLoggerModule) {
  var konymp = konymp || {};
  konymp.logger = (new konyLoggerModule("HID Approve SDK View Controller")) || function() {};
  var ViewController = function(componentInstance,controller) {
    this.componentInstance = componentInstance;
    this.controller = controller;
  };
   
  ViewController.prototype.showApprovalScreen = function() {
    this.componentInstance.view.flxApprove.isVisible = true;
    this.componentInstance.view.transactionPinPopup.isVisible=false;
    this.componentInstance.view.flxSignInApprovedPopup.setVisibility(false);
    this.componentInstance.view.flxSignInDeniedPopup.setVisibility(false);
  };
  
  ViewController.prototype.showPinScreen = function() {
    this.componentInstance.view.flxApprove.isVisible = false;
    this.componentInstance.view.transactionPinPopup.setVisibility(true);
  };
  
  ViewController.prototype.hideApprovalScreen = function() {
    this.componentInstance.view.flxApprove.isVisible = false;
    this.componentInstance.view.transactionPinPopup.isVisible = false;
  };
  return ViewController;
});