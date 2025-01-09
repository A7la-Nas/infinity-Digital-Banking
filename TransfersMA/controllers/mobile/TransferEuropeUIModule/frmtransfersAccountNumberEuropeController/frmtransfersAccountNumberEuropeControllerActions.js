define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_d1d79260b2c24b9fa3524502c5fb5eb8: function AS_BarButtonItem_d1d79260b2c24b9fa3524502c5fb5eb8(eventobject) {
        var self = this;
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
    },
    AS_BarButtonItem_hfe677b98fd346b6adafad1533951b4b: function AS_BarButtonItem_hfe677b98fd346b6adafad1533951b4b(eventobject) {
        var self = this;
        this.cancelOnClick();
    },
    /** onClick defined for flxBack **/
    AS_FlexContainer_jcaea33a14c94a6eb312c6d699d6e5df: function AS_FlexContainer_jcaea33a14c94a6eb312c6d699d6e5df(eventobject) {
        var self = this;
        var  transMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferModule");
        transMod.presentationController.commonFunctionForNavigation("frmTransactionMode");
    },
    /** preShow defined for frmtransfersAccountNumberEurope **/
    AS_Form_c8f3e95e441c4eca829ccf415be09355: function AS_Form_c8f3e95e441c4eca829ccf415be09355(eventobject) {
        var self = this;
        this.preShow();
    },
    /** init defined for frmtransfersAccountNumberEurope **/
    AS_Form_f63fec6580274ad1a9635e6768d5809a: function AS_Form_f63fec6580274ad1a9635e6768d5809a(eventobject) {
        var self = this;
        this.init();
    }
});