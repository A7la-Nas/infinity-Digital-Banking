 define(['CommonUtilities'],function(CommonUtilities) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.updateDefaultAmountOnClick = function() {};
            this._removeButton = "btnRemove";
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      
       setRemoveButtonName: function(widName) {
      	 this._removeButton = widName;
       },
      
       addNewRow: function() {
         var context = this.view.TabBodyNew.getSegmentContext();
         this.view.TabBodyNew.addEmptyRow();
         var SegData = this.view.TabBodyNew.getData();
         if(context.rowIndex == 0) {
                var widgetData = Object.assign({},SegData[context.sectionIndex][1][0][this._removeButton]);
                widgetData.isVisible = true;
                this.view.TabBodyNew.updateKeyAt(this._removeButton, widgetData, 0, context.sectionIndex);
         }
         var widget = Object.assign({},SegData[context.sectionIndex][1][context.rowIndex + 1][this._removeButton]);
         widget.isVisible = true;
         this.view.TabBodyNew.updateKeyAt(this._removeButton, widget, context.rowIndex + 1, context.sectionIndex);
       },
      
      	onClickUpdateDefaultAmount: function(){
          if(this.updateDefaultAmountOnClick !== undefined && this.updateDefaultAmountOnClick !== null)
          	this.updateDefaultAmountOnClick();
        },
      
      	setOnClickUpdateDefaultAmount: function(fundef){
          this.updateDefaultAmountOnClick = fundef;
        },
      
      	onPreshow: function() {
          	this.view.tbxUpdateDefaultAmount.onDone = this.onClickUpdateDefaultAmount;
          	this.view.btnUpdate.onClick = this.onClickUpdateDefaultAmount;
          	this.view.btnAddAdditionalDetailsRow.onClick = this.addNewRow;
            this.view.TabBodyNew.setUpdateTotalEvent(function(sum){ 
              this.view.lblTotalAmountCreate.text = CommonUtilities.formatCurrencyWithCommas(sum, true);
              this.view.lblTotalAmount.text = CommonUtilities.formatCurrencyWithCommas(sum, true);
              this.view.forceLayout();
            }.bind(this));
        },
      	
      	updateAmount: function(widgetNames) {
          	var amount = CommonUtilities.getFloatValueOfCurrency(this.view.flxTemplateRecordDefaultValue.tbxUpdateDefaultAmount.text);
          	if(isNaN(amount)) {
              	amount = 0;
              	this.view.flxTemplateRecordDefaultValue.tbxUpdateDefaultAmount.text = "";
              	return;
            }
            var data = this.view.TabBodyNew.getData();
          	var sum = 0;
            for(var i=0; i < data.length; i++) {
                for(var j=0; j< data[i][1].length; j++) {
                    for(var k in widgetNames) {
                      if(data[i][1][j].hasOwnProperty(widgetNames[k])) {
                        data[i][1][j][widgetNames[k]] = {"text": amount.toString()};
                        break;
                      }                      	
                    }
                  	sum = sum + amount;
                    this.view.TabBodyNew.segTemplates.setDataAt(data[i][1][j], j, i);
                }
            }
          	this.view.lblTotalAmountCreate.text = CommonUtilities.formatCurrencyWithCommas(sum, true);
          	this.view.lblTotalAmount.text = CommonUtilities.formatCurrencyWithCommas(sum, true);
          	this.view.flxTemplateRecordDefaultValue.tbxUpdateDefaultAmount.text = "";
        },
      
      	removeRowAndUpdateTotal: function(rowIndex, sectionIndex, widgetNames) {
          	var totalAmount = CommonUtilities.getFloatValueOfCurrency(this.view.lblTotalAmountCreate.text);
          	var SegData = this.view.TabBodyNew.getData();
          	if(SegData[sectionIndex][1].length > 1) {
              for(var k in widgetNames) {
                if(SegData[sectionIndex][1][rowIndex].hasOwnProperty(widgetNames[k])) {
                  var rowAmount = CommonUtilities.getFloatValueOfCurrency(SegData[sectionIndex][1][rowIndex][widgetNames[k]].text);
                  if(!isNaN(rowAmount)) {
                    totalAmount = totalAmount - rowAmount;
                    this.view.lblTotalAmountCreate.text = CommonUtilities.formatCurrencyWithCommas(totalAmount,true);
                    this.view.lblTotalAmount.text = CommonUtilities.formatCurrencyWithCommas(totalAmount, true);
                    break;
                  }
                }
              }             
              this.view.TabBodyNew.removeRowAt(rowIndex, sectionIndex);
            }
          
          	if(SegData[sectionIndex][1].length == 1) {
              var widgetData = Object.assign({},SegData[sectionIndex][1][0][this._removeButton]);
              widgetData.isVisible = false ;
              this.view.TabBodyNew.updateKeyAt(this._removeButton, widgetData, 0, sectionIndex);
            }
        }
    };
});