define({

  //Type your controller code here
  onViewCreated: function() {
    try {
      this.selectedRow = 0;
      this.view.flxDelete.onClick = this.rowOnClick;
      this.view.flxDropdownLabel.onClick = this.expandcollapse;
      this.view.flxCheckbox.onClick = this.addRemoveCondition;
      this.view.flxAmt1.onClick = this.fromAmtChanges;
      this.view.flxAmt2.onClick = this.toAmtChanges;
      this.view.flxAmt1.txtAmount1.restrictCharactersSet = 
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.flxAmt2.txtAmount2.restrictCharactersSet = 
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.flxAmt1.txtAmount1.onEndEditing = this.amt1Change;
      this.view.flxAmt2.txtAmount2.onEndEditing = this.amt2Change;
      this.view.flxCondition.onClick = this.addViewEditCondition;
    } catch (exc) {
      kony.print("Exception in onViewCreated!!!" + exc);
    }
  },
  amt1Change: function(eventobject, context) {
    var controller = _kony.mvc.GetController("frmAddRulesSignatoryGrp", true);
    controller.fromAmountValue(context.rowIndex);
  },
  amt2Change: function(eventobject, context) {
    var controller = _kony.mvc.GetController("frmAddRulesSignatoryGrp", true);
    controller.toAmountValue(context.rowIndex);
  },
  fromAmtChanges: function(eventobject, context) {
    try {
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.selectedRow = rowIndex;
    } catch (exc) {
      //alert(JSON.stringify(exc));
      console.error(exc);
      kony.print("exception in rowonClick!!!" + exc);
    }
  },
  toAmtChanges: function(eventobject, context) {
    try {
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.selectedRow = rowIndex;
    } catch (exc) {
      //alert(JSON.stringify(exc));
      console.error(exc);
      kony.print("exception in rowonClick!!!" + exc);
    }
  },
  expandcollapse: function(eventobject, context) {
    try {
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      var controller = _kony.mvc.GetController("frmAddRulesSignatoryGrp", true);
      controller.dropdownExpandCollapse({
        section: secIndex,
        row: rowIndex
      });

    } catch (exc) {
      //alert(JSON.stringify(exc));
      console.error(exc);
      kony.print("exception in rowonClick!!!" + exc);
    }
  },
  rowOnClick: function(eventobject, context) {
    try {
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      var controller = _kony.mvc.GetController("frmAddRulesSignatoryGrp", true);
      controller.invokeDeletePopup({
        section: secIndex,
        row: rowIndex
      });

    } catch (exc) {
      //alert(JSON.stringify(exc));
      console.error(exc);
      kony.print("exception in rowonClick!!!" + exc);
    }
  },
  addRemoveCondition : function(eventobject, context) {
    try {
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      var controller = _kony.mvc.GetController("frmAddRulesSignatoryGrp", true);
      controller.addRemoveCondition({
        section: secIndex,
        row: rowIndex
      });

    } catch (exc) {
      //alert(JSON.stringify(exc));
      console.error(exc);
      kony.print("exception in rowonClick!!!" + exc);
    }
  },
  addViewEditCondition : function(eventobject, context) {
    try {
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      var controller = _kony.mvc.GetController("frmAddRulesSignatoryGrp", true);
      controller.addViewEditCondition({
        section: secIndex,
        row: rowIndex
      });

    } catch (exc) {
      //alert(JSON.stringify(exc));
      console.error(exc);
      kony.print("exception in rowonClick!!!" + exc);
    }
  },

});
