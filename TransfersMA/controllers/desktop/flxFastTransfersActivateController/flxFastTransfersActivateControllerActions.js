define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for lblActivePayAPerson **/
    AS_Label_f9478be5840043dfb81ab619df6c84fc: function AS_Label_f9478be5840043dfb81ab619df6c84fc(eventobject, x, y, context) {
        var self = this;
        applicationManager.getModulesPresentationController({
            "appName": "TransfersMA",
            "moduleName": "TransferFastUIModule"
        }).showTransferScreen({
            activateRecipient: true
        });
    }
});