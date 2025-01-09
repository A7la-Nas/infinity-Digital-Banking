define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnNoThanks **/
    AS_Button_af6bb3f5943848d6ba6a4a79d5464f4b: function AS_Button_af6bb3f5943848d6ba6a4a79d5464f4b(eventobject) {
        var self = this;
        if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") applicationManager.getModulesPresentationController("TransferFastModule").showTransferScreen();
        else applicationManager.getModulesPresentationController("TransferModule").showTransferScreen();
    },
    /** onClick defined for btnRequestMoney **/
    AS_Button_c432fa9dcda14ff3966db57e9f57c758: function AS_Button_c432fa9dcda14ff3966db57e9f57c758(eventobject) {
        var self = this;
        var naoModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NAOModule");
        naoModule.presentationController.showNewAccountOpening();
    },
    /** init defined for frmNotEligibleToTransfer **/
    AS_Form_f48cb8ec48034df5ae68ae5846c049e8: function AS_Form_f48cb8ec48034df5ae68ae5846c049e8(eventobject) {
        var self = this;
        this.init();
    }
});