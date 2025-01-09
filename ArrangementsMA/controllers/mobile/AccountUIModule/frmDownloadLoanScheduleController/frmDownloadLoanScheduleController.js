   var installmentType = "All";
   var fileType = "pdf";
define({
   init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  
  preshow: function () {

    this.view.segFormatDetails.onRowClick = this.onSegRowClickFormat;
    this.view.segTransactionTypeDetails.onRowClick = this.onSegRowClickTransactionType;
    this.view.imgArrow.onTouchEnd = this.onArrowClick;
    this.view.imgArrowFormat.onTouchEnd = this.onArrowFormatClick;
    this.view.btnDownload.onClick = this.onclickdownload;
    this.view.customHeader.flxBack.onClick = this.navigateToBack;  
    this.view.customHeader.btnRight.onClick=this.navigateToBack;
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
               this.view.flxHeader.isVisible = true;
                          
           } else {
               this.view.flxHeader.isVisible = false;
           }
    },
  
  onSegRowClickFormat: function(){
    var fType = this.view.segFormatDetails.selectedItems[0].lblTypeName;
    if (fType === "PDF")
         fileType = "pdf";
    else if (fType === "CSV")
          fileType = "csv";
  },
  
  onSegRowClickTransactionType: function(){
    if (this.view.segTransactionTypeDetails.selectedItems) 
      installmentType = this.view.segTransactionTypeDetails.selectedItems[0].lblTypeName;
  },
  
  onclickdownload: function() {
        var downloadFileParams = {
            "installmentType": installmentType,
            "format": fileType,
            "transactionType": "LoanSchedule"
        };
        var ModulePresentationController = applicationManager.getModulesPresentationController("AccountUIModule");
        ModulePresentationController.downloadLoanScheduleFile(downloadFileParams);
  },
  onArrowClick : function(){
    if(this.view.flxSegTransactionTypeDetails.isVisible === true){
      this.view.flxSegTransactionTypeDetails.isVisible = false;
      this.view.imgArrow.src = "arrowdown.png";
    }
    else{
      this.view.flxSegTransactionTypeDetails.isVisible = true;
      this.view.imgArrow.src = "arrowup.png";
    }
  },
  onArrowFormatClick : function(){
    if(this.view.flxSegSelectFormatDetails.isVisible === true){
      this.view.flxSegSelectFormatDetails.isVisible = false;
      this.view.imgArrowFormat.src =  "arrowdown.png";
    }
    else{
      this.view.flxSegSelectFormatDetails.isVisible = true;
      this.view.imgArrowFormat.src =  "arrowup.png";
    }
  },
  
  navigateToBack: function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  }
  
 
});
