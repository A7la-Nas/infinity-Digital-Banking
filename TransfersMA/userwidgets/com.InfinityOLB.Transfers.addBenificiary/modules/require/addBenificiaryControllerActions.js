define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btn3 **/
    AS_Button_a5c48d87b55045f693d06380f287e32b: function AS_Button_a5c48d87b55045f693d06380f287e32b(eventobject) {
        var self = this;
        this.view.flxAcknowledgement.setVisibility(false);
        this.view.flxConfirmation.setVisibility(false);
        this.view.flxAddInternationalAccount.setVisibility(true);
        this.view.forceLayout();
    },
    /** onClick defined for btnAddAnotherRecipient **/
    AS_Button_c99f6fdfeffa466bb9b5df70180385d9: function AS_Button_c99f6fdfeffa466bb9b5df70180385d9(eventobject) {
        var self = this;
        this.view.flxAcknowledgement.setVisibility(false);
        this.view.flxConfirmation.setVisibility(false);
        this.view.flxAddInternationalAccount.setVisibility(true);
        this.view.forceLayout();
    },
    /** postShow defined for addBenificiary **/
    AS_FlexContainer_bbcd8dc8117c45fc944603dd4a761fa6: function AS_FlexContainer_bbcd8dc8117c45fc944603dd4a761fa6(eventobject) {
        var self = this;
        return self.postShow.call(this);
    },
    /** preShow defined for addBenificiary **/
    AS_FlexContainer_e69bf673f66741a6a461dae669a0f2bb: function AS_FlexContainer_e69bf673f66741a6a461dae669a0f2bb(eventobject) {
        var self = this;
        return self.preShow.call(this);
    },
    /** onBreakpointChange defined for addBenificiary **/
    AS_FlexContainer_f4112d56f1a240f48ce5dd785f1d0e75: function AS_FlexContainer_f4112d56f1a240f48ce5dd785f1d0e75(eventobject, breakpoint) {
        var self = this;
        return self.onBreakPointChange.call(this);
    }
});