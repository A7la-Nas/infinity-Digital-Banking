define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_c5f2fd79d433482fb530200ddb09e3dc: function AS_BarButtonItem_c5f2fd79d433482fb530200ddb09e3dc(eventobject) {
        var self = this;
        this.cancelOnClick();
    },
    /** onClick defined for flxBack **/
    AS_FlexContainer_c4b25eb5d2f9417198a943f3da548521: function AS_FlexContainer_c4b25eb5d2f9417198a943f3da548521(eventobject) {
        var self = this;
        var transModPresentationController = applicationManager.getModulesPresentationController("TransferModule");
        transModPresentationController.commonFunctionForNavigation("frmTransactionMode");
    },
    /** init defined for frmTransfersToAccountEurope **/
    AS_Form_dd71ec169af548c99e8208c990ffe06f: function AS_Form_dd71ec169af548c99e8208c990ffe06f(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmTransfersToAccountEurope **/
    AS_Form_h9341b312f3f4fedbc0857b76b7167cd: function AS_Form_h9341b312f3f4fedbc0857b76b7167cd(eventobject) {
        var self = this;
        this.preShow();
    },
    /** onRowClick defined for segToAccount **/
    AS_Segment_b2ea93c408774da5a0c350b379bb7ef8: function AS_Segment_b2ea93c408774da5a0c350b379bb7ef8(eventobject, sectionNumber, rowNumber) {
        var self = this;
        self.view.segToAccount.isVisible = false;
        self.view.flxNewRecipient.isVisible = true;
        self.view.tbxTo.text = "FR 4567 7456 3425 4532 1423 4356 664 ";
    }
});