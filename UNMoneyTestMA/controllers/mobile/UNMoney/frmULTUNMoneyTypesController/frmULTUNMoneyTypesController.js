define({ 

 //Type your controller code here 
 frmULTUNMoneyTypesPreShow: function () {
    
    this.view.flxUNSend.onTouchEnd = this.navigateToSendForm;
 },

    navigateToSendForm: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTUNSendMoney");
        ntf.navigate();
      } catch (er) {}
    },

 });