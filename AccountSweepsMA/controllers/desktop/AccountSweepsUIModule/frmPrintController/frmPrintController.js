define(["OLBConstants","FormControllerUtility"], function (OLBConstants,FormControllerUtility) {
  return {
    init: function() {
        this.view.preShow = this.preShow;
        this.view.postShow = this.postShow;
        this.view.onDeviceBack = function() {};
        this.view.onBreakpointChange = this.onBreakpointChange;
        this.presenter = applicationManager.getModulesPresentationController({
            appName: 'AccountSweepsMA',
            moduleName: 'AccountSweepsUIModule'
        });
    },
    preShow: function() {
        this.constructPrintData()
    },
    postShow: function() {
        var scope =this;
        kony.os.print();
        setTimeout(function () {
            scope.presenter.showView('frmAccountSweepAcknowledgement');
          }, "17ms");
    },
    constructPrintData: function() {
        let data = this.presenter.printData;
        this.view.lblPrimaryAccountValue.text = data.formattedprimaryAccountNumber;
        this.view.lblSecondaryAccountValue.text = data.formattedsecondaryAccountNumber;
        this.view.lblSweepConditionValue.text = data.sweepType;
        this.view.flxBoth.isVisible = data.sweepcondition.visibility;
        this.view.rtxCondition.text = data.sweepcondition.rtxCondition;
        this.view.rtxSweepCond.text = data.sweepcondition.content2;
        this.view.rtxSweepCondAbove.text = data.sweepcondition.content1;
        this.view.lblFrequencyValue.text = data.frequency;
        this.view.lblStartDateValue.text = data.startDate;
        this.view.lblEndDateValue.text = data.endDate;
        this.view.lblReferenceNumberValue.text = data.confirmationNumber;
    },
};

});