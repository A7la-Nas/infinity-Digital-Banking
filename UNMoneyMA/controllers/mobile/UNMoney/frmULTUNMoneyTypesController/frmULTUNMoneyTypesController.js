define({ 

 //Type your controller code here 
 frmULTUNMoneyTypesPreShow: function () {
    
    this.view.flxUNSend.onTouchEnd = this.navigateToSendForm;
    this.view.flxUNWithdraw.onTouchEnd = this.navigateToRemittanceForm;
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
 },

    navigateToSendForm: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTUNSendMoney");
        ntf.navigate();
      } catch (er) {}
    },


    navigateToRemittanceForm: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTUNRemittanceMoney");
        ntf.navigate();
      } catch (er) {}
    },

    flxBackOnClick: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTUNMoney");
        ntf.navigate();
      } catch (er) {}
    },

 });