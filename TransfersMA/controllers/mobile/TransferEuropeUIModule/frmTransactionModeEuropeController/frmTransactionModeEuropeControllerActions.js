define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_bb2890906d7c4be9ae87fc1a5a9f240a: function AS_BarButtonItem_bb2890906d7c4be9ae87fc1a5a9f240a(eventobject) {
        var self = this;
        var transModPresentationController = applicationManager.getModulesPresentationController("TransactionModule");
        transModPresentationController.commonFunctionForNavigation("frmTransfers");
    },
    /** onClick defined for flxBack **/
    AS_FlexContainer_j05c9146211c45b3bf63d742f121760a: function AS_FlexContainer_j05c9146211c45b3bf63d742f121760a(eventobject) {
        var self = this;
        this.backNavigation();
    },
    /** init defined for frmTransactionModeEurope **/
    AS_Form_b5825380d17e404591b5522101c68006: function AS_Form_b5825380d17e404591b5522101c68006(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmTransactionModeEurope **/
    AS_Form_g62903915d1c4fde9c243f5a7d89ec97: function AS_Form_g62903915d1c4fde9c243f5a7d89ec97(eventobject) {
        var self = this;
        this.preShow();
    }
});