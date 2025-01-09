define({
  timerCounter: 0,
  advanceSearchOptions : {},
  res : {},
  initActions: function () {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.flxStatusTypeWrapper.onClick = this.showStatusType;
    this.view.flxChequeDetailsWrapper.onClick = this.showChequeDetails;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    this.view.flxAddRangeAmount.onClick = function(){
    scope.toggleCheckbox(scope.view.imgCheckboxAmount);
    if(scope.view.imgCheckboxAmount.src ==="remeberme.png"){
         scope.view.lblDollarTwo.isVisible = false;
         scope.view.lblToTitleOne.isVisible = false;
         scope.view.txtAmountTo.isVisible = false;
    }else{
         scope.view.lblDollarTwo.isVisible = true;
         scope.view.lblToTitleOne.isVisible = true;
         scope.view.txtAmountTo.isVisible = true;
    }
        scope.view.forceLayout();
        };
    this.view.segStatusType.onRowClick = function(){
        var configManager = applicationManager.getConfigurationManager();
        if(scope.view.segStatusType.data[scope.view.segStatusType.selectedIndex[1]].lblName=== configManager.constants.Issued){
          scope.advanceSearchOptions.searchStatusType="ISSUED";
        }
        if(scope.view.segStatusType.data[scope.view.segStatusType.selectedIndex[1]].lblName=== configManager.constants.Cleared){
          scope.advanceSearchOptions.searchStatusType="CLEARED";
        }
        if(scope.view.segStatusType.data[scope.view.segStatusType.selectedIndex[1]].lblName=== configManager.constants.Returned){
          scope.advanceSearchOptions.searchStatusType="RETURNED";
        }
        if(scope.view.segStatusType.data[scope.view.segStatusType.selectedIndex[1]].lblName=== configManager.constants.Stopped){
          scope.advanceSearchOptions.searchStatusType="STOPPED";
        }
      };
    this.view.flxAddRangeCheckNumbers.onClick = function(){
            scope.toggleCheckbox(scope.view.imgCheckboxCheckNumbers);
            if(scope.view.imgCheckboxCheckNumbers.src ==="remeberme.png"){
                scope.view.lblToTitleTwo.isVisible = false;
                scope.view.txtCheckNumbersTo.isVisible = false;
            }else{
                scope.view.lblToTitleTwo.isVisible = true;
                scope.view.txtCheckNumbersTo.isVisible = true;
            }
            scope.view.forceLayout();
        };
    this.view.btnSearch.onClick = function(){  
        //scope.view.flxSearchResults.isVisible = true;
        applicationManager.getPresentationUtility().showLoadingScreen();
        //scope.selectedTransactionType();
        //custom metric API to generate Reports
       // KNYMetricsService.sendCustomMetrics("frmCMSearch", {"Search Transactions":"Final Search"});
          if(scope.view.imgCheckboxAmount.src ==="remembermetick.png"){
            scope.advanceSearchOptions.searchMinAmount=scope.view.txtAmountFrom.text;
            scope.advanceSearchOptions.searchMaxAmount=scope.view.txtAmountTo.text;
               if(Number(scope.advanceSearchOptions.searchMaxAmount)<Number(scope.advanceSearchOptions.searchMinAmount))
              {
                var msg =  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Accounts.validAmountRange");
                   applicationManager.getDataProcessorUtility().showToastMessageError(scope,msg);
                  applicationManager.getPresentationUtility().dismissLoadingScreen();
              return;
              }
			if(scope.advanceSearchOptions.searchMaxAmount !== "" && scope.advanceSearchOptions.searchMaxAmount !== null && scope.advanceSearchOptions.searchMaxAmount !== undefined){
              scope.advanceSearchOptions.amountrange=scope.advanceSearchOptions.searchMinAmount+"-"+scope.advanceSearchOptions.searchMaxAmount;
            }else{
              scope.advanceSearchOptions.amountrange="";
            }
          }else{
            scope.advanceSearchOptions.amount=scope.view.txtAmountFrom.text;
            //scope.advanceSearchOptions.searchMaxAmount=scope.view.txtAmountFrom.text;
          }
          if(scope.view.imgCheckboxCheckNumbers.src ==="remembermetick.png"){
            scope.advanceSearchOptions.fromCheckNumber=scope.view.txtCheckNumbersFrom.text;
            scope.advanceSearchOptions.toCheckNumber=scope.view.txtCheckNumbersTo.text;
               if(Number(scope.advanceSearchOptions.toCheckNumber)<Number(scope.advanceSearchOptions.fromCheckNumber))
              {
                var msg1 =  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Accounts.validCheckRange");
                   applicationManager.getDataProcessorUtility().showToastMessageError(scope,msg1);
                  applicationManager.getPresentationUtility().dismissLoadingScreen();
              return;
              }
             if(scope.advanceSearchOptions.toCheckNumber !== "" && scope.advanceSearchOptions.toCheckNumber !== null && scope.advanceSearchOptions.toCheckNumber !== undefined){
              scope.advanceSearchOptions.checknumberrange=scope.advanceSearchOptions.fromCheckNumber+"-"+scope.advanceSearchOptions.toCheckNumber;
            }else{
              scope.advanceSearchOptions.checknumberrange="";
            }
          }else{
            scope.advanceSearchOptions.checknumber=scope.view.txtCheckNumbersFrom.text;
            //scope.advanceSearchOptions.toCheckNumber=scope.view.txtCheckNumbersFrom.text;
          }
      if (scope.view.txtPayeeName.text !== null || scope.view.txtPayeeName.text !== undefined || scope.view.txtPayeeName.text !== "") {
                scope.advanceSearchOptions.payeeName =  scope.view.txtPayeeName.text;
            }else{
                scope.advanceSearchOptions.payeeName = "";
            } 
      var TransModPresentationController = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
        TransModPresentationController.getSearchDetails(scope.advanceSearchOptions);
    };
 },
          
  
// preshow: function () {},
 postShow: function(){
    this.advanceSearchOptions = {};
    this.setStatusTypeData();
    var forUtility = applicationManager.getFormatUtilManager();
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
	var dollarOne = forUtility.formatAmountandAppendCurrencySymbol(presentation.amount, presentation.currencyCode);
    var str = dollarOne.toString();
    var dollarOneValue = str.substring(0,1);
    this.view.lblDollarOne.text = dollarOneValue;
    var dollarTwo = forUtility.formatAmountandAppendCurrencySymbol(presentation.amount,presentation.currencyCode);
    var str1 = dollarTwo.toString();
    var dollarTwoValue = str1.substring(0,1);
    this.view.lblDollarTwo.text = dollarTwoValue;
   if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
          this.view.flxHeader.isVisible = true;
        }
        else{
          this.view.flxHeader.isVisible = false;
        }
     this.view.flxMainContainer.flxChequeDetailsValue.flxAmount.txtAmountFrom.text = "";
     this.view.flxMainContainer.flxChequeDetailsValue.flxAmount.txtAmountTo.text  = "";
     this.view.flxMainContainer.flxChequeDetailsValue.flxAmount.imgCheckboxAmount.src = "remeberme.png";
     this.view.flxMainContainer.flxChequeDetailsValue.flxAmount.lblDollarTwo.setVisibility(false);
	this.view.flxMainContainer.flxChequeDetailsValue.flxAmount.lblToTitleOne.setVisibility(false);
	this.view.flxMainContainer.flxChequeDetailsValue.flxAmount.txtAmountTo.setVisibility(false);
     this.view.flxMainContainer.flxChequeDetailsValue.flxCheckNumbers.txtCheckNumbersFrom.text = "";
     this.view.flxMainContainer.flxChequeDetailsValue.flxCheckNumbers.txtCheckNumbersTo.text = "";
     this.view.flxMainContainer.flxChequeDetailsValue.flxCheckNumbers.imgCheckboxCheckNumbers.src = "remeberme.png";
     this.view.flxMainContainer.flxChequeDetailsValue.flxCheckNumbers.lblToTitleTwo.setVisibility(false);
     this.view.flxMainContainer.flxChequeDetailsValue.flxCheckNumbers.txtCheckNumbersTo.setVisibility(false);
     this.view.flxMainContainer.flxChequeDetailsValue.flxPayeeName.txtPayeeName.text = "";
    },
  showStatusType: function () {
        if(this.view.flxStatusTypeValue.isVisible === true){
            this.view.flxStatusTypeValue.isVisible = false;
            this.view.imgArrowStatusType.src = "arrowdown.png";
        }else{
            this.view.flxStatusTypeValue.isVisible = true;
            this.view.imgArrowStatusType.src = "arrowup.png";
        }
    },
    toggleCheckbox : function(obj){
        if(obj.src === "remeberme.png")
          obj.src = "remembermetick.png";
        else
          obj.src = "remeberme.png";
        this.view.forceLayout();
    },
    showChequeDetails: function () {
        if(this.view.flxChequeDetailsValue.isVisible === true){
            this.view.flxChequeDetailsValue.isVisible = false;
            this.view.imgChequeDetails.src = "arrowdown.png";
        }else{
            this.view.flxChequeDetailsValue.isVisible = true;
            this.view.imgChequeDetails.src = "arrowup.png";
        }
      },
    setStatusTypeData: function () {
       var configManager = applicationManager.getConfigurationManager();
        var data = [
            {
                "lblName": configManager.constants.Issued,
                "imgIcon": "remeberme.png"
            },
            {
                "lblName": configManager.constants.Cleared,
                "imgIcon": "remeberme.png"
            },
            {
                "lblName": configManager.constants.Returned,
                "imgIcon": "remeberme.png"
            },
            {
                "lblName": configManager.constants.Stopped,
                "imgIcon": "remeberme.png"
            }
        ];
        this.view.segStatusType.setData(data);
    },
  onCancelClick:function(){
    var varPass;
    varPass = "MyChequesView";
    var navObj = new kony.mvc.Navigation({"appName":"ArrangementsMA", "friendlyName":"frmChequeManagement"});
    navObj.navigate(varPass);
  }
  
});
