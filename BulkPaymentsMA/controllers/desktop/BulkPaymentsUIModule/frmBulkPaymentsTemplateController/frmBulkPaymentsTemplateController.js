define(['CommonUtilities', 'ViewConstants', 'OLBConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, OLBConstants, FormControllerUtility, CampaignUtility) {
  
 var orientationHandler = new OrientationHandler();
  
  return {

        beneficiaryData: "",
        bankDate: null,
        templateDetails: "",
        removedBeneficiaryData: [],
        searchResult: [],
    fetchParams: {},
        isackFlow: "",
        ackMsg: "",
    isBackFlow: false,
    isBackFromVerify: false,
    dashboardSortParams: {},
        existingBenData: [],
    templateFlow: "",
    selectedBeneficiaries: [],
    newlyAddedBeneficiaries: [],
    newBenficiary : {},
        masterDataCurrency: [
      ["-", "-"],
      ["EUR", "€"],
      ["GBP", "£"],
      ["USD", "$"],
      ["INR", "₹"],
    ],
        isEditFlow: false,
    isEdit: false,
    existingBenificiaryResponse:[],
	oldPayOrderData :"",
	noEditDone : false,
    processingModeSelected: "",
    switch_ActionOff: "n",
    switch_ActionOn: "m",
      
    /**
     * Method to update form using given context
     * @param {object} context depending on the context the appropriate function is executed to update view
     */
    
    updateFormUI: function(context) {
      if (context.progressBar === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (context.progressBar === false) {
        FormControllerUtility.hideProgressBar(this.view);
      } else if (context.key === BBConstants.BULKPAYMENTS_CREATE_TEMPLATE) {
        this.selectedBeneficiaries = [];
        this.newlyAddedBeneficiaries = [];
        this.templateFlow = "createTemplate";
        this.createTemplate(false);
      } else if (context.key === BBConstants.BULKPAYMENTS_CREATE_BULK_REQUEST) {
        this.templateDetails = context.responseData;
        this.setCreateBulkRequestView();
      } else if (context.getPaymentOrdersSuccess) {
        this.beneficiaryData = context.getPaymentOrdersSuccess;
        if (this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES || this.isEditFlow) {
          FormControllerUtility.hideProgressBar(this.view);
          this.setVerifyBulkRequestView();
        } else {
          this.invokeCreateBulkRequestView();
        }
      } else if (context.getExistingBeneficiariesSuccess) {
        this.mapBeneficiaryListingData(context.getExistingBeneficiariesSuccess, "");
      } else if (context.key === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
        this.setViewOrEditBulkPaymentTemplateView(context.responseData, BBConstants.BULKPAYMENT_VIEW_TEMPLATES);
      } else if (context.createRequestSuccess) {
        this.navigateToAck(context.createRequestSuccess);
      } else if (context.templateCreationSuccess) {
        this.templateCreationSuccess(context.templateCreationSuccess);
      } else if (context.templateCreationError) {
        this.templateCreationFailure(context.templateCreationError);
      } else if (context.serverError === true) {
        this.showServerErrorMessage(context.errorMessage);
      } else if (context.editTemplateSuccess) {
        if (this.isEditFlow) {
          this.isackFlow = true;
          this.fetchPaymentOrders({
            "templateId": this.templateDetails.templateId
          });
        } else {
          this.editTemplateSuccess();
        }
      } else if (context.getBeneficiaryNameSuccess) {
        if(context.getBeneficiaryNameSuccess.beneficiaryName === ""){
          this.showBeneficiaryAccountErrorMessage(kony.i18n.getLocalizedString("i18n.TransferEur.inValidAccountNumber"));
        }else{
          this.mapBeneficiaryName(context.getBeneficiaryNameSuccess);
        }
      } else if (context.getBeneficiaryNameFailure) {
        this.showBeneficiaryAccountErrorMessage(context.getBeneficiaryNameFailure.errorMessage);
      }
      else if(context.addBeneficiarySuccess){ 
        this.view.tbxSearchBox1.text = "";
        this.newlyAddedBeneficiaries.push(this.newBenficiary);
        this.addBeneficiariesToTemplate();   
        this.view.flxAcknowledgementContainer.isVisible = true;  
        this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
        this.view.flxAcknowledgementNew.rTextSuccess.text =  kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.newBenficiariesAdded");
        this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
          var scopeObj = this;
          scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
          this.view.forceLayout();
        }.bind(this);
        FormControllerUtility.hideProgressBar(this.view);     
      }
      else if (context.validateIBANandGetBankDetailsSuccess) {
          this.OnValidatingIBAN(context.validateIBANandGetBankDetailsSuccess);
      } else if (context.validateIBANandGetBankDetailsFailure) {
          this.showInvalidIBANErrorMessage(context.validateIBANandGetBankDetailsFailure.errorMessage || context.validateIBANandGetBankDetailsFailure.dbpErrMsg);
      }
      else if(context.addBeneficiaryFailure){
        if (!kony.sdk.isNullOrUndefined(context.addBeneficiaryFailure.serverErrorRes))
          this.showServerErrorMessage(context.addBeneficiaryFailure.serverErrorRes.dbpErrMsg);
        else
          this.showServerErrorMessage(context.addBeneficiaryFailure.errorMessage);
      } else if (context.getBankDetailsFromBICTemplatesSuccess) {
                this.OnValidatingSwiftCode(context.getBankDetailsFromBICTemplatesSuccess);
      } else if (context.getBankDetailsFromBICTemplatesFailure) {
                this.showInvalidSwiftCodeErrorMessage(context.getBankDetailsFromBICTemplatesFailure.errorMessage);
      } else if (context.getBankDateSuccess) {                
                this.setBankDate(context.getBankDateSuccess);
      }
      var breakpoint = kony.application.getCurrentBreakpoint();

      if(this.view.lblContentHeader.text === kony.i18n.getLocalizedString("kony.i18n.common.createTemplate"))
      {
        this.adjustScreen(-120);
      }
      else
      {
        this.adjustScreen(100);
        if(breakpoint>1024){
					this.adjustScreen(-150);
		}
      }
      
      
      if(this.view.lblContentHeader.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequestPaymentDetails")){
        if (kony.os.deviceInfo().screenWidth == 1024 && (breakpoint <= 1024 || orientationHandler.isTablet)) {
          this.view.lblViewRemovedBeneficiaries.centerX = "46%";
          this.adjustScreen(-320);
        }
      }
      
      if(this.view.lblContentHeader.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkAckHeader")){
        if (kony.os.deviceInfo().screenWidth == 1024 && (breakpoint <= 1024 || orientationHandler.isTablet)) {
          this.adjustScreen(-270);
        }
      }
      
      if (this.view.lblContentHeader.text ===  kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkReqView")) {
        if (kony.os.deviceInfo().screenWidth == 1024 && (breakpoint <= 1024 || orientationHandler.isTablet)) {
          this.adjustScreen(-320);
        }
      }
      this.view.forceLayout();
    },
    
    /**
     * onPreShow :  onPreshow event Function for the form
     * @member of {frmBulkPaymentsDashboardController}
     * @param {}
     * @return {}
     * @throws {}
     */
    
    onPreShow: function() {
      var scopeObj = this;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxMain', 'flxHeader', 'flxFooter', 'flxContentContainer', 'flxHeaderMain','flxFormContent']);
      this.view.customheader.forceCloseHamburger();
      this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"),kony.i18n.getLocalizedString("kony.i18n.common.createTemplateMenu"));
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.onBreakpointChange = function() {
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
      this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
      this.view.TabBodyNewAddedBen.setSegmentReloadAction(this.reloadTabBodyNew);
      this.initializeFetchParams();
      this.initializeDashboardSortParams();
      FormControllerUtility.wrapAmountField(this.view.tbxChangeAmount).onKeyUp(this.validateAmountFormat);
      this.validateAmountFormat();
	    this.view.forceLayout();  
      this.adjustScreen(30); 
      this.localeSpecificUpdate();  
      this.view.imgCloseDowntimeWarning.onTouchEnd = function(){
        scopeObj.view.flxDowntimeWarning.setVisibility(false);
        scopeObj.view.flxMainWrapper.setVisibility(false);
      };
      this.view.imgSortViewRecipientName.onTouchEnd = this.sortTemplateBeneficiariesByName;
      this.view.imgSortViewBankName.onTouchEnd = this.sortTemplateBeneficiariesByAmount;
      this.view.imgSortViewAmount.onTouchEnd = this.sortTemplateBeneficiariesByFees;
    },
    sortTemplateBeneficiariesByName: function () {
      if (this.tempSortedBy === "nameAsc") {
        this.view.TabBodyNewAddedBen.sortData(0, "", "", "lblViewRecipientName", "String", "Desc");
        this.view.TabBodyNewAddedBen.sortData(1, "", "", "lblViewRecipientName", "String", "Desc");
        this.view.imgSortViewRecipientName.src = "bbsortingdesc.png";
        this.tempSortedBy = "nameDesc";
      } else {
        this.view.TabBodyNewAddedBen.sortData(0, "", "", "lblViewRecipientName", "String", "Asc");
        this.view.TabBodyNewAddedBen.sortData(1, "", "", "lblViewRecipientName", "String", "Asc");
        this.view.imgSortViewRecipientName.src = "bbsortingasc.png";
        this.tempSortedBy = "nameAsc";
      }
      this.view.imgSortViewBankName.src = "bbsortingdefault.png";
      this.view.imgSortViewAmount.src = "bbsortingdefault.png";
    },
    sortTemplateBeneficiariesByAmount: function () {
      if (this.tempSortedBy === "amountAsc") {
        this.view.TabBodyNewAddedBen.sortData(0, "", "", "amount", "Number", "Desc");
        this.view.TabBodyNewAddedBen.sortData(1, "", "", "amount", "Number", "Desc");
        this.view.imgSortViewBankName.src = "bbsortingdesc.png";
        this.tempSortedBy = "amountDesc";
      } else {
        this.view.TabBodyNewAddedBen.sortData(0, "", "", "amount", "Number", "Asc");
        this.view.TabBodyNewAddedBen.sortData(1, "", "", "amount", "Number", "Asc");
        this.view.imgSortViewBankName.src = "bbsortingasc.png";
        this.tempSortedBy = "amountAsc";
      }
      this.view.imgSortViewRecipientName.src = "bbsortingdefault.png";
      this.view.imgSortViewAmount.src = "bbsortingdefault.png";
    },
    sortTemplateBeneficiariesByFees: function () {
      if (this.tempSortedBy === "feesAsc") {
        this.view.TabBodyNewAddedBen.sortData(0, "", "", "lblViewAmount", "String", "Desc");
        this.view.TabBodyNewAddedBen.sortData(1, "", "", "lblViewAmount", "String", "Desc");
        this.view.imgSortViewAmount.src = "bbsortingdesc.png";
        this.tempSortedBy = "feesDesc";
      } else {
        this.view.TabBodyNewAddedBen.sortData(0, "", "", "lblViewAmount", "String", "Asc");
        this.view.TabBodyNewAddedBen.sortData(1, "", "", "lblViewAmount", "String", "Asc");
        this.view.imgSortViewAmount.src = "bbsortingasc.png";
        this.tempSortedBy = "feesAsc";
      }
      this.view.imgSortViewRecipientName.src = "bbsortingdefault.png";
      this.view.imgSortViewBankName.src = "bbsortingdefault.png";
    },
    localeSpecificUpdate: function(){
        if(CommonUtilities.isMirrorLayoutEnabled()) {
          this.view.imgMethod.src = "arrow_left.png";
          this.view.imgMethod2.src = "arrow_left.png";
        }
        else {
          this.view.imgMethod.src = "arrow_right.png";
          this.view.imgMethod2.src = "arrow_right.png";
        }
    },
    setFooterforExp: function(data) {
      if (kony.os.deviceInfo().screenWidth == 1024 && (kony.application.getCurrentBreakpoint() <= 1024 || orientationHandler.isTablet)) {
        if ((this.view.lblContentHeader.text ===  kony.i18n.getLocalizedString("i18n.wireTemplate.createTemplateVC")) || 
            (this.view.lblContentHeader.text === kony.i18n.getLocalizedString("kony.i18n.common.addNewBeneficiaryHeader"))) {
          if (data.text === "O") this.adjustScreen(-250);
          else this.adjustScreen(-150);
        }
        if (this.view.lblContentHeader.text === "i18n.kony.BulkPayments.createBulkReqView") {
          if (data.text === "O") this.adjustScreen(-250);
          else this.adjustScreen(-150);
        }
      }
    },
    
    /**
     * onPostShow :  postShow event Function for the form
     * @member of {frmBulkPaymentsDashboardController}
     * @param {}
     * @return {}
     * @throws {}
     */
    
        onPostShow: function() {
          this.view.forceLayout();
          this.view.flxExecutionDateCreateBulkReq.width = "20%";
          this.view.tbxSearchBox.placeholderSkin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
          this.view.tbxSearchBox.skin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
          this.view.tbxSearchBox1.placeholderSkin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
          this.view.tbxSearchBox1.skin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
          this.view.lblMethod.skin = "sknSSP4176a415px";
          this.view.lblMethod2.skin = "sknSSP4176a415px";
		  this.view.lblEdit.skin = "sknSSP4176a415px";
          this.view.lblEditSummary0.skin = "sknSSP4176a415px";
          this.view.lblEditBeneficiary.skin = "sknSSP4176a415px";
          this.view.flxAcknowledgementNew.imgDownload.src='blue_close_icon.png'
          this.view.flxSummaryHeaderSeparatorVerifyPage.top="15px";
          var breakpoint = kony.application.getCurrentBreakpoint();
          if (kony.os.deviceInfo().screenWidth == 1024 && ((breakpoint <= 1024 || orientationHandler.isTablet))) {
            this.view.flxSummaryHeaderSeparatorVerifyPage.top = "5px";
            this.view.flxSummaryHeaderVerifyPage.top = "-7px";
            this.view.flxEditSummary0.left = "94%";
            this.view.flxEditBeneficiary.left = "76%";
          }
          this.view.flxSeparator2.top="1px";
          this.view.flxFullSeparator.top="15px";
		  this.view.tbxTemplateName.restrictCharactersSet = "~#^|$%&*!@-=}{][|,><`':;\"\\";
          this.adjustScreen(10);       
    },

    reloadTabBodyNew : function(){
      this.adjustScreen(-50);
    },
    /**
     * onInit : onInit event Function for the form
     * @member of {frmBulkPaymentsDashboardController}
     * @param {}
     * @return {}
     * @throws {}
     */
    
        onInit: function() {
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxMain', 'flxHeader', 'flxFooter', 'flxContentContainer','flxFormContent']);
          this.bulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
    },  
   
    
    /**
     * onBreakpointChange : Handles ui changes on .
     * @member of {frmACHDashboardController}
     * @param {integer} width - current browser width
     * @return {}
     * @throws {}
     */
    
    onBreakpointChange: function(width) {
      orientationHandler.onOrientationChange(this.onBreakpointChange); 
      var break_point = kony.application.getCurrentBreakpoint();
      var scope = this;
      var responsiveFonts = new ResponsiveFonts();
      this.view.customheader.onBreakpointChangeComponent(width);  
      if(kony.os.deviceInfo().screenWidth < 1024 && ((break_point <= 1024 || orientationHandler.isTablet))){
        this.view.lblViewRemovedBeneficiaries.centerX = "30%";
      }
      this.adjustScreen(10);
      if(break_point > 1024){
			this.adjustScreen(-150);
      }
    },
    
    /**
     * adjustScreen : Handles ui changes based on the screen size
     * @member of {frmBulkPaymentsDashboardController}
     * @param {integer} data - difference to be added to the screen
     * @return {}
     * @throws {}
     */
    
        adjustScreen: function(data) {
      this.view.flxFooter.isVisible = true;
      this.view.forceLayout();
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.customheader.info.frame.height + this.view.flxContentContainer.info.frame.height;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0)
          this.view.flxFooter.top = mainheight + diff + data + "dp";
        else
          this.view.flxFooter.top = mainheight + data + "dp";
        this.view.forceLayout();
      } else {
        this.view.flxFooter.top = mainheight + data + "dp";
        this.view.forceLayout();
      }
          this.view.flxFooter.top = "30dp";
          this.view.forceLayout();
    },
    
    initializeFetchParams: function() {
      this.fetchParams = {
        "limit": 10,
        "offset": 0,
        "order": "desc",
        "resetSorting": true,
        "sortBy": "createdOn"
      };
    },
    
    initializeDashboardSortParams: function() {
      this.dashboardSortParams = {
        "beneficiaryListing": {
          "Name": "sortingfinal.png",
          "Currency": "sortingfinal.png",
          "Amount": "sortingfinal.png",
          "FeesPaidBy": "sortingfinal.png",
          "Bank": "sortingfinal.png",
          "Type": "sortingfinal.png"
        }        
      };
    },

        updateFetchParams: function(sortParam, sortOrder) {
            if (!kony.sdk.isNullOrUndefined(sortParam))
        this.fetchParams.sortByParam = sortParam;

            if (!kony.sdk.isNullOrUndefined(sortOrder))
        this.fetchParams.sortOrder = sortOrder;

            if (!kony.sdk.isNullOrUndefined(sortParam))
        this.fetchParams.sortBy = sortParam;

            if (!kony.sdk.isNullOrUndefined(sortOrder))
        this.fetchParams.order = sortOrder;

      this.fetchParams.pageSize = this.view.PaginationContainer.getPageSize() + 1;
      this.fetchParams.pageOffset = this.view.PaginationContainer.getPageOffset();
      this.fetchParams.offset = this.view.PaginationContainer.getPageOffset();

      this.fetchParams.filterByParam = "";
      this.fetchParams.filterByValue = "";
    },

    /**
     * resetUI : function that hides all the UI flexes in frmBulkPaymentReview    
     */


    resetUI: function() {
      this.view.flxCreateUI.isVisible = false;
      this.view.flxExecutionDateCreateBulkReq.isVisible=false;
      this.view.flxAcknowledgementContainer.isVisible = false;
      this.view.flxErrorMessage.isVisible = false;
      this.view.flxTemplateDetails.isVisible = false;
      this.view.flxAckMessage.isVisible = false;
      this.view.flxDescriptionSummary.bottom = "0dp";
      this.view.flxTabletAccountsSeparator.height="1px";  
      
      var breakpoint = kony.application.getCurrentBreakpoint();
            if (breakpoint <= 1024 || orientationHandler.isTablet) {
        this.view.flxTabletAccountsSeparator.isVisible=true;         
        this.view.formActionsNew.top="-18dp";
      }
      this.view.flxDisplayErrorMessage.isVisible = false;
      this.view.flxSummary.isVisible = false;
      this.view.createFlowFormActionsNew.isVisible = false;
            this.view.addNewBeneficiaryFormActions.isVisible = false;
            this.view.flxAddNewBeneficiaries.isVisible = false;
      this.view.flxBankAccountType.isVisible = false;
      this.view.formActionsNew.isVisible = false;      
      this.view.CommonFormActionsExt.isVisible = false;
      this.view.PaginationContainer.isVisible = false;
      this.view.flxMainWrapper.setVisibility(false);
      this.view.flxTemplateDetails.isVisible = false;  
      this.view.flxCreateBulkRequest.isVisible = false;  
      this.view.flxViewAllRecipients.isVisible = false;  
      this.view.flxSearch.isVisible = false;
      this.view.flxApplyChanges.isVisible = false;
      this.view.flxViewOnlySeletced.isVisible = false;
      this.view.flxNoRecipients.isVisible = false;
      this.view.flxEditDetails.isVisible = false;
      this.view.flxDropdown.isVisible = false;
      this.view.flxCancelPopup.isVisible = false;
      this.view.flxSort.isVisible = false;
      this.view.flxSelectAll.isVisible = false;
      this.view.flxExistingBeneficiaries.setVisibility(false);
      this.view.flxBeneficiaryUI.setVisibility(false); 
      this.view.flxError.isVisible = false;
      this.view.tbxAmount.text = "";
      this.view.tbxPaymentReference.text = "";
      this.view.tbxSearchBox.text = "";
      this.view.lstbDefaultCurrency.setEnabled(false);
      this.view.flxDefaultCurrency.opacity = 0.5;

      this.adjustScreen(10);
      var break_point = kony.application.getCurrentBreakpoint();
      if (break_point > 1024) {
        this.adjustScreen(-150);
      }
      this.view.forceLayout();
    },      

    setBankDate: function(bankDateObj) {        
        var scopeObj = this;
        scopeObj.bankDate = bankDateObj;
        var bankDate = bankDateObj.currentWorkingDate || CommonUtilities.getServerDate();
        scopeObj.disableOldDaySelection(scopeObj.view.calExecutionDate, bankDate);       
    },

    disableOldDaySelection: function(widgetId, bankDate) {
        var numberOfYearsAllowed = OLBConstants.CALENDAR_ALLOWED_FUTURE_YEARS;
        var today = new Date(bankDate);
        var futureDate = new Date(today.getTime() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365 /*days*/ * numberOfYearsAllowed));
        widgetId.enableRangeOfDates([today.getDate(), today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
        widgetId.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
    },

    createTemplate: function(isback) {
      var scopeObj = this;
      this.resetUI();
      if(!kony.sdk.isNullOrUndefined(this.view.lstbProcessingMode.selectedKeyValue))
			this.processingModeSelected = this.view.lstbProcessingMode.selectedKeyValue[0];
      this.view.flxCreateUI.isVisible = true;
	  this.view.lstbProcessingMode.onSelection = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
	  this.view.calExecutionDate.onSelection = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.flxHeader.setVisibility(true);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.createTemplate");
      this.view.lblTitle.text = kony.i18n.getLocalizedString("i18n.wireTemplate.providePrimaryDetails"); 
      this.view.flxTopSeparator.setVisibility(true);
      this.view.flxApplyChangesTemplate.setVisibility(false);
      this.view.flxBeneficiaryUI.setVisibility(false);
      this.view.flxCreateDetails.setVisibility(true);
      this.view.flxProcessingMode.setVisibility(true);
      this.view.flxProcessinModeInfo.setVisibility(true);
      this.view.lblExecutionDate.setVisibility(true);
      this.view.flxDate.setVisibility(true);
      this.view.lblDescription.text = kony.i18n.getLocalizedString("kony.mb.TransfersEurope.PaymentReference");
      this.view.lblDescription.setVisibility(true);
      this.view.flxTemplateDescription.setVisibility(true);
      this.view.flxBottomSeperator.setVisibility(true);
      this.view.createFlowFormActionsNew.isVisible = true;
      this.view.CommonFormActionsExt.setVisibility(false);
      FormControllerUtility.disableButton(this.view.createFlowFormActionsNew.btnNext);
      this.view.createFlowFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.common.proceed");
      var formatManager = applicationManager.getFormatUtilManager();
      var currencyList = FormControllerUtility.getListBoxDataFromObjects(applicationManager.getConfigurationManager().OLBConstants.BULKWIRETRANSFERCONSTANT.CURRENCIES, "name", "symbol");
      var i;
      if (isback !== "backFlow"){
        if(!kony.sdk.isNullOrUndefined(this.view.TabBodyNewAddedBen.getData()))
        this.view.TabBodyNewAddedBen.setData([]);
      }
      for (var i = 0; i < currencyList.length; i++) {
        switch (currencyList[i][0]) {
          case "$":
            currencyList[i][1] = "$ - USD";
            break;
          case "€":
            currencyList[i][1] = "€ - EUR";
            break;
          case "₹":
            currencyList[i][1] = "₹ - INR";
            break;
          case "£":
            currencyList[i][1] = "£ - GBP";
            break;
        }
      }
      currencyList.push(["-","-"]);
      var fromAccounts = this.fetchBulkPaymentEditAccounts();
      if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_MULTIPLE_CREATE") === false)) {
                this.view.lstbProcessingMode.masterData = [
                    ["lblSingle", "Single"]
                ];
        this.view.flxProcessingMode.setVisibility(false);
        this.view.flxTextProcessingMode.setVisibility(true);
        this.view.txtProcessingMode.text=kony.i18n.getLocalizedString("i18n.kony.BulkPayments.batchModeSingle");
        this.view.txtProcessingMode.setEnabled(false);
        this.view.txtProcessingMode.skin="CopyslTextBox0b8f036a4265846";
      } else if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_SINGLE_CREATE") === false)) {
        this.view.lstbProcessingMode.masterData = [
          ["lblMulti", "Multiple"]
        ];
        this.view.flxProcessingMode.setVisibility(false);
        this.view.flxTextProcessingMode.setVisibility(true);
        this.view.txtProcessingMode.text=kony.i18n.getLocalizedString("i18n.kony.BulkPayments.batchModeMulti");
        this.view.txtProcessingMode.setEnabled(false);
        this.view.txtProcessingMode.skin="CopyslTextBox0b8f036a4265846";
      } else {
        this.view.lstbProcessingMode.masterData = [
          ["lblSingle", "Single"],
          ["lblMulti", "Multiple"]
        ];
        this.view.flxProcessingMode.setVisibility(true);
        this.view.flxTextProcessingMode.setVisibility(false);
        this.view.lstbProcessingMode.setEnabled(true);
            }
            if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_MULTIPLE_CREATE") === true)) {
                this.view.lstbProcessingMode.selectedKey = "lblMulti";
            }
            if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_SINGLE_CREATE") === true)) {
                this.view.lstbProcessingMode.selectedKey = "lblSingle";
            }
      this.isEdit = false;
      this.view.lblFromAccount.text = kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.selectFromAccount");
      if (isback === false) {
        this.view.flxCreateDetails.flxNameDetails.flxTemplateName.tbxTemplateName.onKeyUp = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
        this.view.flxTemplateDescription.tbxTemplateDescription.onKeyUp = this.validatePaymentReference.bind(this, this.view.tbxTemplateDescription, this.view.lblValidDescription, this.view.lblInvalidDescription);
        this.view.flxTemplateDescription.tbxTemplateDescription.text = "";
        this.view.flxCreateDetails.flxNameDetails.flxTemplateName.tbxTemplateName.text = "";
        this.view.lstbDefaultCurrency.masterData = currencyList;
        this.view.lstbDefaultCurrency.selectedKey = currencyList[i][0];
        this.view.lstbDefaultCurrency.setEnabled(false);
        //this.view.lstbFromAccount.masterData = this.objectToListBoxArrayFromService(fromAccounts);
        //this.view.lstbFromAccount.selectedKey = fromAccounts[0].Id;
        this.initializeFromSegment(fromAccounts);        
        this.bulkPaymentsModule.presentationController.getBankDate();
        FormControllerUtility.disableButton(this.view.createFlowFormActionsNew.btnNext);
        this.view.createFlowFormActionsNew.btnNext.onClick = this.backtoAddBenScreen.bind(this);
                this.view.createFlowFormActionsNew.btnCancel.onClick = this.showCancelPopUp.bind(this);
      } 
      else if (isback === "backFlow") {
        this.view.flxCreateDetails.flxNameDetails.flxTemplateName.tbxTemplateName.onKeyUp = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
        this.view.flxTemplateDescription.tbxTemplateDescription.onKeyUp = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
        FormControllerUtility.disableButton(this.view.createFlowFormActionsNew.btnNext);
        this.view.createFlowFormActionsNew.btnNext.onClick = this.backtoAddBenScreen.bind(this);
        this.view.createFlowFormActionsNew.btnCancel.onClick = this.showCancelPopUp.bind(this);
        FormControllerUtility.enableButton(this.view.createFlowFormActionsNew.btnNext);
      } else {
        var templateName = this.view.tbxTemplateName.text;
        var fromAccount = this.view.lblSelectAccount.accountID;
        var executionDate = this.view.calExecutionDate.dateComponents;
        var processingMode = "";
        if(!kony.sdk.isNullOrUndefined(this.processingModeSelected) && this.processingModeSelected==="lblMulti"){
          processingMode = this.processingModeSelected;
          this.view.lstbProcessingMode.selectedKey = "lblMulti";
        }
        else{
          processingMode = this.view.lstbProcessingMode.selectedKeyValue[0];
          this.view.lstbProcessingMode.selectedKey = "lblSingle";
        }
        var defaultCurrency = this.view.lstbDefaultCurrency.selectedKeyValue[0];
        var desc = this.view.tbxTemplateDescription.text;
        var cancelEdit= function(){
          scopeObj.view.tbxTemplateName.text = templateName;
          scopeObj.view.lblSelectAccount.accountID = fromAccount;
          scopeObj.view.calExecutionDate.dateComponents = executionDate;
          scopeObj.view.lstbProcessingMode.selectedKey = processingMode;
          scopeObj.view.lstbDefaultCurrency.selectedKey = defaultCurrency;
          scopeObj.view.tbxTemplateDescription.text = desc;
          //scopeObj.setVerifyBulkRequestView();
        };
        this.view.createFlowFormActionsNew.btnCancel.onClick =this.showCancelPopUp.bind(this,  kony.i18n.getLocalizedString("i18n.kony.BulkPayments.CancelMsg"), cancelEdit); 
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.ACH.EditTemplate") + " - " + kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");
        this.view.lblTitle.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent") + " " + kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");
        scopeObj.view.createFlowFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
        scopeObj.view.createFlowFormActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
        var previousAccount = this.view.lblSelectAccount.accountID;
       if (scopeObj.selectedBeneficiaries.length != 0 || scopeObj.isBackFromVerify === true) {
          scopeObj.view.createFlowFormActionsNew.btnNext.onClick = function() {
            var currentAccount = scopeObj.view.lblSelectAccount.accountID;
            if (scopeObj.getMembershipId(currentAccount) === scopeObj.getMembershipId(previousAccount)) scopeObj.setVerifyBulkRequestView();
            else {
              scopeObj.view.lblFromAccount.text = kony.i18n.getLocalizedString("i18n.payments.accountBelongsToDifferentCustomer");
              //              FormControllerUtility.disableButton(scopeObj.view.createFlowFormActionsNew.btnNext);
            }
            scopeObj.isBackFromVerify = false;
          }
        } else {
          scopeObj.view.createFlowFormActionsNew.btnNext.onClick =  function(){
            if(scopeObj.newlyAddedBeneficiaries.length >0){
              scopeObj.newlyAddedBeneficiaries.forEach(function(item) {
                if (item.flxActions.isVisible === true || item.btnEdit.isVisible === true) {
                  item.flxActions.isVisible = true;
                }
              });
            }
            scopeObj.isEdit = true;
            scopeObj.getBeneficiaries();
            scopeObj.view.tbxSearchBox1.text = "";
            scopeObj.addBeneficiariesToTemplate();
          }
        }
      }
      if(!isback){
        this.view.createFlowFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.common.proceed");
      }
      this.view.flxInfo.onClick = this.OnFlxInfoClick.bind(this);
      this.view.createFlowFormActionsNew.isVisible = true;
      this.adjustScreen(-120);
      this.view.forceLayout();
    },

    initializeFromSegment: function(accounts) {
      var scopeObj = this;
      scopeObj.view.flxFrom.setVisibility(true);
      scopeObj.view.flxCancelFilterFrom.setVisibility(true);
      scopeObj.view.imgCancelFilterFrom.src = "dropdown_expand.png";
      scopeObj.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
      scopeObj.view.txtTransferFrom.setVisibility(true);
      scopeObj.view.txtTransferFrom.text = "";
      scopeObj.view.lblSelectAccount.text = "";
      scopeObj.view.lblFromAmount.text = "";
      scopeObj.view.flxTypeIcon.setVisibility(false);

      this.view.segFromAccount.rowtemplate = "flxFromAccountsList";
      this.view.segFromAccount.sectionHeaderTemplate = "flxTransfersFromListHeader";
      this.view.segFromAccount.widgetDataMap = {
        "flxFromAccountsList": "flxFromAccountsList",
        "flxAccountListItem": "flxAccountListItem",
        "lblAccountName": "lblAccountName",
        "flxAmount": "flxAmount",
        "flxSeparator": "flxSeparator",
        "lblSeparator": "lblSeparator",
        "lblAmount": "lblAmount",
        "lblCurrencySymbol": "lblCurrencySymbol",
        "flxTransfersFromListHeader": "flxTransfersFromListHeader",
        "lblTransactionHeader": "lblTransactionHeader",
        "imgDropDown": "imgDropDown",
        "flxDropDown": "flxDropDown",
        "flxIcons": "flxIcons",
        "imgIcon": "imgIcon",
        "flxBankIcon": "flxBankIcon",
        "imgBankIcon": "imgBankIcon",
        "lblAccType": "lblAccType"
      };
      var widgetFromData = this.getDataWithSections(accounts);
      if (widgetFromData) {
        this.view.segFromAccount.setData(widgetFromData);
        this.view.flxLoadingContainerFrom.setVisibility(false);
        //this.view.flxNoResultsFrom.setVisibility(false);
      }
      this.view.txtTransferFrom.onTouchStart = function() {
        scopeObj.view.flxTypeIcon.setVisibility(false);
        scopeObj.view.lblSelectAccount.setVisibility(false);
        scopeObj.view.flxFromSegment.setVisibility(!scopeObj.view.flxFromSegment.isVisible);
        if (scopeObj.view.flxFromSegment.isVisible === true) scopeObj.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
        else scopeObj.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
        scopeObj.view.segFromAccount.setVisibility(true);
        scopeObj.view.lblFromAmount.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.segFromAccount.onRowClick = function() {
        var segData = scopeObj.view.segFromAccount.selectedRowItems[0];
        scopeObj.view.txtTransferFrom.text = segData.lblAccountName;
        scopeObj.view.txtTransferFrom.setVisibility(false);

        scopeObj.view.lblSelectAccount.text = segData.lblAccountName;
        scopeObj.view.lblSelectAccount.accountName = segData.accountName;
        scopeObj.view.lblSelectAccount.accountID = segData.accountID;
        var formatManager = applicationManager.getFormatUtilManager();
        scopeObj.view.lstbDefaultCurrency.selectedKey = formatManager.getCurrencySymbol(segData.currencyCode);
        scopeObj.view.lstbDefaultCurrency.setEnabled(false);
        scopeObj.view.lblSelectAccount.setVisibility(true);
        scopeObj.view.flxTypeIcon.setVisibility(true);
        scopeObj.view.lblTypeIcon.setVisibility(true);

        applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false ? scopeObj.view.flxTypeIcon.setVisibility(true) : scopeObj.view.flxTypeIcon.setVisibility(false);
        scopeObj.view.lblTypeIcon.text = segData.imgIcon.text;
        scopeObj.view.flxFromSegment.setVisibility(false);
        scopeObj.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
		   if(scopeObj.isEditFlow || scopeObj.isBackFromVerify){
        FormControllerUtility.enableButton(scopeObj.view.createFlowFormActionsNew.btnNext);
        }
      };
      this.view.flxCancelFilterFrom.onClick = function() {
        scopeObj.view.txtTransferFrom.text = "";
        scopeObj.view.lblSelectAccount.text = "";     
        scopeObj.view.flxFromSegment.setVisibility(!scopeObj.view.flxFromSegment.isVisible);
        if (scopeObj.view.flxFromSegment.isVisible === true) scopeObj.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            else scopeObj.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
      };
      this.view.flxFrom.onClick = function() {
        if (scopeObj.view.txtTransferFrom.isVisible === false) {
          scopeObj.view.txtTransferFrom.setVisibility(true);
          scopeObj.view.txtTransferFrom.setFocus();
          scopeObj.view.lblSelectAccount.setVisibility(false);
          scopeObj.view.flxTypeIcon.setVisibility(false);
          scopeObj.view.lblFromAmount.setVisibility(false);
          scopeObj.view.flxCancelFilterFrom.setVisibility(true);
          scopeObj.view.flxFromSegment.setVisibility(true);
          scopeObj.adjustScreen(20);
          scopeObj.view.forceLayout();
        }
      };
    },

    getDataWithSections: function(accounts) {
      var scopeObj = this;
      var finalData = {};
      var prioritizeAccountTypes = [];
      var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        appName: "HomepageMA",
        moduleName: "AccountsUIModule"
      });
      var responseAccounts = accountsModule.presentationController.accounts;
      accounts.forEach(function(account) {
        var accountType = "Personal Accounts";
        for (var i = 0; i < responseAccounts.length; i++) {
          if (responseAccounts[i].accountID === account.Id) {
            account = responseAccounts[i];
            break;
          }
        }
        if (account.isBusinessAccount === "true") {
          if (kony.sdk.isNullOrUndefined(account.MembershipName)) accountType = "Business Accounts";
          else accountType = account.MembershipName;
        }
        if (finalData.hasOwnProperty(accountType)) {
          if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
            finalData[accountType][1].pop();
          }
          finalData[accountType][1].push(scopeObj.createSegmentData(account));
        } else {
          prioritizeAccountTypes.push(accountType);
          finalData[accountType] = [{
            lblTransactionHeader: accountType,
            lblSeparator: {
              "isVisible": "true"
            },
            imgDropDown: {
              "text": "P",
              "skin":ViewConstants.SKINS.BULKPAYMENTS_DROP_DOWN_SKIN,
              "width":"25dp",
              "height":"25dp"
            },
            flxDropDown: {
              "onClick": function(eventobject, context) {
                scopeObj.showOrHideAccountRows(eventobject, context);
              }.bind(this),
              "isVisible": true
            },
            template: kony.mvc.resolveNameFromContext({ 
              "appName": "ResourcesMA",
              "friendlyName": "flxTransfersFromListHeader"
            })                      
          },
          [scopeObj.createSegmentData(account)]
         ];
        }
      });
      var data = [];
      for (var key in prioritizeAccountTypes) {
        var accountType = prioritizeAccountTypes[key];
        if (finalData.hasOwnProperty(accountType)) {
          data.push(finalData[accountType]);
        }
      }
      return data;
    },

    createSegmentData: function(account) {
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var accountId = account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId;
      var dataObject = {
        "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + CommonUtilities.getLastFourDigit(account.accountID) : CommonUtilities.getAccountDisplayName(account),
        "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode)),
        "accountID": accountId,
        "accountName": CommonUtilities.getMaskedAccName(accountId)[1],
        "currencyCode": account.currencyCode,
        "imgIcon": {
          "text": account.isBusinessAccount === "true" ? "r" : "s",
          "isVisible": isSingleCustomerProfile === false ? true : false,
        },
        "lblSeparator": {
          "isVisible": "true",
          "bottom": "1dp"
        },
        "lblAccType": account.accountType,
        "flxIcons": {
          "left": (isSingleCustomerProfile === false) ? "0px" : "15px",
          "bottom": "2dp"
        },
        "flxBankIcon": {
          "isVisible": account.externalIndicator === "true" ? true : false,
        },
        "imgBankIcon": {
          "src": "bank_icon_hdfc.png"
        },
        "flxAccountListItem": {
          "isVisible": true,
          "height": "100dp"
        }
      };
      //} 
      return dataObject;
    },
  
    showOrHideAccountRows: function(eventobject, context) {
      var section = context.sectionIndex;
      var segData = this.view.segFromAccount.data;
      var isRowVisible = true;
      if (segData[section][0].imgDropDown.text === "O") {
        segData[section][0]["imgDropDown"] = {
          "text": "P",
          "skin":ViewConstants.SKINS.BULKPAYMENTS_DROP_DOWN_SKIN,
          "width":"25dp",
          "height":"25dp"
        };
        isRowVisible = true;
      } else {
        segData[section][0]["imgDropDown"] = {
          "text": "O",
          "skin":ViewConstants.SKINS.BULKPAYMENTS_DROP_DOWN_SKIN,
          "width":"25dp",
          "height":"25dp"
        };
        isRowVisible = false;
      }
      for (var i = 0; i < segData[section][1].length; i++) {
        var flxAccountListItem = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountListItem));
        flxAccountListItem["isVisible"] = isRowVisible;
        this.updateKeyAt("flxFromAccountsList", flxAccountListItem, i, section);
      }
      segData = this.view.segFromAccount.data;
      this.view.segFromAccount.setSectionAt(segData[section], section);
    },
    updateKeyAt: function(widgetName, value, row, section) {
      var data = this.view.segFromAccount.data;
      var rowDataTobeUpdated = data[section][1][row];
      rowDataTobeUpdated[widgetName] = value;
      this.view.segFromAccount.setDataAt(rowDataTobeUpdated, row, section);
    },

        getMembershipId: function(account) {
      var membership = null;
      applicationManager.getConfigurationManager().userAccounts.forEach(function(obj) {
                if (obj.Account_id === account)
          membership = obj.Membership_id;
      });
      return membership;
    },  
    
    enableDisabledProceedOnValidPersonalDetails: function() {      
            if ((CommonUtilities.isEmptyString(this.view.flxCreateDetails.flxNameDetails.flxTemplateName.tbxTemplateName.text)) ||
                (CommonUtilities.isEmptyString(this.view.flxTemplateDescription.tbxTemplateDescription.text))) {
        FormControllerUtility.disableButton(this.view.createFlowFormActionsNew.btnNext);
            } else {
        FormControllerUtility.enableButton(this.view.createFlowFormActionsNew.btnNext); 
      }  
    },

    showCancelPopUp: function(cancelMsg, cancelEdit) {
      this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        if(this.view.lblContentHeader.text==="Edit Template - Primary Details")
          this.showPopUp(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.CancelMsg"), this.setVerifyBulkRequestView.bind(this), cancelEdit);
        else  
          this.showPopUp(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.CancelMsg"), this.returnToDashBoard.bind(this), cancelEdit);
    },

        showPopUp: function(message, onYes, cancelEdit) {
      var scope = this;
      scope.view.PopupHeaderUM.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
      scope.view.PopupHeaderUM.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");

      scope.view.PopupHeaderUM.lblPopupMessage.text = message;
      scope.view.PopupHeaderUM.flxCross.onClick = this.closePopUp.bind(this);
      scope.view.PopupHeaderUM.btnNo.onClick = this.closePopUp.bind(this);
            scope.view.PopupHeaderUM.btnYes.onClick = function(){
                if(cancelEdit) cancelEdit();
                onYes();
            };
      scope.view.flxCancelPopup.setVisibility(true);
      scope.adjustScreen(30);
    },

        closePopUp: function() {
      this.view.flxCancelPopup.setVisibility(false);
      this.adjustScreen(30);
    },

        returnToDashBoard: function() {
      var scope = this;
      
      scope.view.flxCancelPopup.setVisibility(false);
            //       scope.view.tbxTemplateName.text = "";
            //       scope.view.tbxTemplateDescription.text = "";
      
      scope.adjustScreen(30);
      scope.bulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsDashboard", BBConstants.BULKPAYMENT_VIEW_TEMPLATES)
    },

        fetchBulkPaymentEditAccounts: function() {
      var editAccounts = [];
      var editAccountsunique = [];
      var accounts = applicationManager.getConfigurationManager().userAccounts;
      
            if (!kony.sdk.isNullOrUndefined(accounts)) {
                accounts.forEach(function(obj) {
          var account = {
            "Id": obj.accountID,
            "Name": CommonUtilities.getAccountDisplayNameNew(obj)
          };
                   if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID, "BULK_PAYMENT_TEMPLATE_EDIT") && (obj.accountType == "Checking" || obj.accountType == "Savings")) 
					editAccounts.push(account);
					if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID,  "BULK_PAYMENT_TEMPLATE_MULTIPLE_CREATE") && (obj.accountType == "Checking" || obj.accountType == "Savings")) editAccounts.push(account);
					if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID, "BULK_PAYMENT_TEMPLATE_SINGLE_CREATE") && (obj.accountType == "Checking" || obj.accountType == "Savings")) editAccounts.push(account);
					
					jsonObject = editAccounts.map(JSON.stringify);
      
					uniqueAccountsSet = new Set(jsonObject);
					editAccountsunique = Array.from(uniqueAccountsSet).map(JSON.parse);
        });          
            } else {
        this.showServerErrorMessage(kony.i18n.getLocalizedString("i18n.FastTransfers.NoAccountsToTransferFrom"));
      }
      return editAccountsunique;
    },

    OnFlxInfoClick: function() {
      if (this.view.flxInformationText.isVisible === true) {
        this.view.flxInformationText.isVisible = false;
      } else {
        this.view.flxInformationText.isVisible = true;
        this.view.flxCross.onTouchEnd = function() {
          var scopeObj = this;
          scopeObj.view.flxInformationText.isVisible = false;
        }.bind(this);
      }
      this.view.forceLayout();
      this.adjustScreen(10);
    },
    
        objectToListBoxArrayFromService: function(objArray) {
      var list = [];
            for (var i = 0; i < objArray.length; i++) {
        list.push([objArray[i].Id, objArray[i].Name]);
      }
      return list;
    },

    returnKeyForListboxFromValue: function(listbox, value) {
      var data = listbox.masterData;
            data = data.filter(function(item) {
        return item[1] === value
      });
      return data[0] ? data[0][0] : listbox.masterData[0][0];
    },

    getBeneficiaries: function() {
      var scopeObj = this;
      this.resetUI();
      // this.view.flxHeader.setVisibility(true);

      this.view.TabBodyNewAddedBen.setVisibility(false);
      this.view.flxSearchBox.setVisibility(false);
      this.view.flxViewRecipients.setVisibility(false);
      this.view.flxEmptyBen.setVisibility(true);
      this.view.flxTabletAccountsSeparator.setVisibility(false);

      if (this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
        this.isBackFlow = true;
      }
      
      this.view.flxHeader.setVisibility(false);
      this.view.flxSummary1.setVisibility(false);
      this.view.flxAddBeneficiaryOptions.setVisibility(true);
      this.view.flxTopSeparator.setVisibility(false);
      
      this.view.flxBeneficiaryUI.setVisibility(true);
      this.view.flxCreateDetails.setVisibility(false);
      this.view.flxProcessinModeInfo.setVisibility(false);
      this.view.flxProcessingMode.setVisibility(false);
      this.view.lblExecutionDate.setVisibility(false);
      this.view.flxDate.setVisibility(false);
      this.view.flxExistingBeneficiaries.setVisibility(false);
      this.view.lblDescription.setVisibility(false);
      this.view.flxTemplateDescription.setVisibility(false);
      this.view.flxBottomSeperator.setVisibility(false);
      this.view.createFlowFormActionsNew.isVisible = false;
      this.view.flxBeneficiaryUI.isVisible = true;
      this.view.createFlowFormActionsNew.isVisible = false;
      this.view.CommonFormActionsExt.setVisibility(true);
      
      this.view.flxCreateBulkRequest.isVisible = false;
      this.view.flxSearch.isVisible = false;
      this.view.formActionsNew.isVisible = false;
      this.view.flxEditDetails.isVisible = false;
      this.view.flxSummary.isVisible = false;

      this.view.CommonFormActionsExt.btnNext.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back"); 
      this.view.CommonFormActionsExt.btnNext.skin = "sknBtnffffffBorder0273e31pxRadius2px"; 
      this.view.CommonFormActionsExt.btnCancel.text = kony.i18n.getLocalizedString("i18n.common.proceed"); 
      this.view.CommonFormActionsExt.btnCancel.skin = "sknBtnNormalSSPFFFFFF15Px";
      this.view.CommonFormActionsExt.btnBack.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel"); 
      this.view.CommonFormActionsExt.btnCancel.isVisible = true;
      this.view.CommonFormActionsExt.btnBack.isVisible = true;
      this.view.CommonFormActionsExt.btnNext.right="400px"
      var numOfTransactions =  this.selectedBeneficiaries.length + this.newlyAddedBeneficiaries.length; 
      this.view.lblTitle1.text = kony.i18n.getLocalizedString("kony.i18n.common.addedBeneficiaries") + " (" + numOfTransactions + ") ";
          //>>
          var breakpoint = kony.application.getCurrentBreakpoint();
          if (breakpoint <= 1024 || orientationHandler.isTablet)  {
            this.view.CommonFormActionsExt.isVisible = false;
            this.view.formActionsNew.isVisible = false;
            this.view.addBenFormActions.isVisible = true;
            this.view.addBenFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
            this.view.addBenFormActions.btnCancel.skin = "sknBtnffffffBorder0273e31pxRadius2px";
            this.view.addBenFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.view.addBenFormActions.btnNext.skin = "sknBtnNormalSSPFFFFFF15Px";
            this.view.addBenFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
            this.view.addBenFormActions.btnBack.isVisible = true;
            //this.view.addBenFormActions.btnCancel.isVisible = true;
            this.view.addBenFormActions.btnCancel.onClick = this.createTemplate.bind(this, "backFlow");
            this.view.addBenFormActions.btnBack.onClick = this.showCancelPopUp.bind(this);
            FormControllerUtility.disableButton(this.view.addBenFormActions.btnNext);

          }

      this.view.CommonFormActionsExt.btnNext.onClick = this.createTemplate.bind(this, "backFlow");
      this.view.CommonFormActionsExt.btnBack.onClick = this.showCancelPopUp.bind(this);
      this.view.CommonFormActionsExt.btnCancel.onClick = this.setVerifyBulkRequestView.bind(this);
      
      this.view.flxMethod.onClick = this.fetchExistingBeneficiaries.bind(this);
      this.view.flxMethod2.onClick = this.showAddNewBeneficiary.bind(this);
      if (this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateSelectBeneficiaries");
        this.view.CommonFormActionsExt.btnNext.onClick = this.setVerifyBulkRequestView.bind(this);
      } else {
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.addNewBeneficiaryHeader");
      }

      if(this.newlyAddedBeneficiaries.length + this.selectedBeneficiaries.length === 0){
        FormControllerUtility.disableButton(this.view.CommonFormActionsExt.btnCancel);
      }
      else{
        FormControllerUtility.enableButton(this.view.CommonFormActionsExt.btnCancel);
      }

      this.view.flxEditBeneficiary.isVisible = this.selectedBeneficiaries.length === 0 && this.newlyAddedBeneficiaries.length === 0 ? false : true;
      this.view.flxEditBeneficiary.onClick =  this.addBeneficiaries.bind(this);
      if ((this.view.lblContentHeader.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateSelectBeneficiaries")) ||
      (this.view.lblContentHeader.text === kony.i18n.getLocalizedString("kony.i18n.common.addNewBeneficiaryHeader")))
      this.view.flxEditBeneficiary.isVisible=false;

      this.adjustScreen(10);
      var break_point = kony.application.getCurrentBreakpoint();
      if (break_point > 1024) {
        this.adjustScreen(-150);
      }
      this.view.forceLayout();
    },
    
    showAddNewBeneficiary: function(data) {
      FormControllerUtility.hideProgressBar(this.view);
      this.resetUI();
      var formatManager = applicationManager.getFormatUtilManager();
      this.view.flxAddNewBeneficiaries.isVisible = true;
      this.clearBeneficiaryFields();
      this.view.tbxSearchBox1.text = "";      
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createTemplateAddBeneficiary");
      this.view.lbxCurrency.selectedKey = !kony.sdk.isNullOrUndefined(formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey)) ? formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey) : this.templateDetails.currency.length >1 ? this.templateDetails.currency : formatManager.getCurrencySymbolCode(this.templateDetails.currency);
      this.view.flxAddTypeRadio1.onClick = this.RadioBtnAction.bind(this, this.view.imgAdd1, this.view.imgAdd2, 1);
      this.view.flxAddTypeRadio2.onClick = this.RadioBtnAction.bind(this, this.view.imgAdd1, this.view.imgAdd2, 1);
      this.view.flxFeesTypeRadio1.onClick = this.OnRadioBtnClickFeesPaidBy.bind(this, 1);
      this.view.flxFeesTypeRadio2.onClick = this.OnRadioBtnClickFeesPaidBy.bind(this, 2);
      this.view.flxFeesTypeRadio3.onClick = this.OnRadioBtnClickFeesPaidBy.bind(this, 3);
      this.view.flxTypeRadio1.onClick = this.RadioBtnAction.bind(this, this.view.imgRadioBtnRecipientType1, this.view.imgRadioBtnRecipientType2, 0);
      this.view.flxTypeRadio2.onClick = this.RadioBtnAction.bind(this, this.view.imgRadioBtnRecipientType1, this.view.imgRadioBtnRecipientType2, 0);
      this.view.lblSelect.onTouchEnd = this.onCheckBoxClick.bind(this);
      this.view.addNewBeneficiaryFormActions.isVisible = true;
      this.view.addNewBeneficiaryFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD");
      this.view.addNewBeneficiaryFormActions.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD");
      this.view.addNewBeneficiaryFormActions.btnNext.onClick = this.addNewBeneficiaryData.bind(this);
      this.view.addNewBeneficiaryFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
      this.view.addNewBeneficiaryFormActions.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
      this.view.addNewBeneficiaryFormActions.btnCancel.onClick = this.backtoAddBenScreen.bind(this);
	  this.view.tbxRecipAccNumber.restrictCharactersSet = "~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.tbxRecipAccNumber.onEndEditing = this.fetchBeneficiaryName.bind(this);
      this.view.tbxRecipAccNumber.onBeginEditing = function() {
          var scopeObj = this;
          scopeObj.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
          scopeObj.view.lblInvalidIBANInfinity.setVisibility(false);
          scopeObj.view.forceLayout();
      }.bind(this);
      FormControllerUtility.disableButton(this.view.addNewBeneficiaryFormActions.btnNext);
      this.view.tbxPaymentRefValue.onKeyUp = this.validatePaymentReference.bind(this, this.view.tbxPaymentRefValue, this.view.lblPaymentRefValidDesc, this.view.lblPaymentRefInvalidDesc);
      this.view.tbxAmountValue.onKeyUp = this.enableOrDisableAddBeneficiaries.bind(this);
      this.view.tbxRecipAccNumber.onKeyUp = this.enableOrDisableAddBeneficiaries.bind(this);

      this.view.flxInfoicon.onClick = this.feesPaidByInfo.bind(this);
      FormControllerUtility.disableButton(this.view.addNewBeneficiaryFormActions.btnNext);
      this.view.tbxPaymentRefValue.onKeyUp = this.validatePaymentReference.bind(this, this.view.tbxPaymentRefValue, this.view.lblPaymentRefValidDesc, this.view.lblPaymentRefInvalidDesc);
      this.view.tbxAmountValue.onKeyUp = this.enableOrDisableAddBeneficiaries.bind(this);
      this.view.tbxSwiftCode.onKeyUp = this.enableOrDisableAddBeneficiaries.bind(this);
      this.view.tbxRecipientName.onKeyUp = this.enableOrDisableAddBeneficiaries.bind(this);
      this.view.tbxRecipientBankName.onKeyUp = this.enableOrDisableAddBeneficiaries.bind(this);
      this.view.flxCurrencyAmount.onTouchEnd = this.enableOrDisableAddBeneficiaries.bind(this);
      this.view.flxFeesPaidRadioButtons.onTouchEnd = this.enableOrDisableAddBeneficiaries.bind(this);
      this.view.flxAddToList.isVisible = true;


      if ((kony.sdk.isNullOrUndefined(this.templateDetails.processingMode) ? this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() : this.templateDetails.processingMode.toUpperCase()) === 'SINGLE') {
        this.view.lbxCurrency.setEnabled(false);
      }
      else
      {
        this.view.lbxCurrency.setEnabled(true);
      }
      if(this.templateFlow == "createTemplate"){
        if ((kony.sdk.isNullOrUndefined(this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase()) ? this.templateDetails.processingMode : this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase()) === 'SINGLE') {
          this.view.lbxCurrency.setEnabled(false);
        } else {
          this.view.lbxCurrency.setEnabled(true);
        }
      }
      if (!kony.sdk.isNullOrUndefined(data.accountNumber)) {
        if(this.templateFlow !== "createTemplate"){
          this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateAddBeneficiary");  
        }
        else 
          this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createTemplateAddBeneficiary");  
        //FormControllerUtility.enableButton(this.view.addNewBeneficiaryFormActions.btnNext);
        this.view.addNewBeneficiaryFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.bulkwires.saveupdate");
        this.view.addNewBeneficiaryFormActions.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.bulkwires.saveupdate");
        this.view.flxAddToList.isVisible=true;
		if (!kony.sdk.isNullOrUndefined(data.beneficiaryType)) {
        if (data.beneficiaryType === "MANUALLYADDED") {
        this.view.addNewBeneficiaryFormActions.btnNext.onClick = this.updateBeneficiaryDetails.bind(this, data.accountNumber);
        // if (this.templateFlow !== "createTemplate") this.view.flxAddToList.isVisible = false;
        } else {
        this.view.addNewBeneficiaryFormActions.btnNext.onClick = this.updateExistingBeneficiaryDetails.bind(this, data.accountNumber);
        }
        this.view.flxAddToList.isVisible = false;
        this.view.flxAddType.isVisible = false;
        this.view.flxBankAccountType.isVisible = false;
        this.view.tbxRecipientBankName.setEnabled(false);
        this.view.tbxRecipAccNumber.setEnabled(false);
        this.view.tbxSwiftCode.setEnabled(false);
        this.view.tbxRecipientName.setEnabled(false);
        }

        this.view.addNewBeneficiaryFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
        this.view.addNewBeneficiaryFormActions.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
        this.view.addNewBeneficiaryFormActions.btnCancel.onClick = this.addBeneficiariesToTemplate.bind(this);
        if (!kony.sdk.isNullOrUndefined(data.currency) && data.currency.length > 0 && data.currency !== "-") {
          this.view.lbxCurrency.selectedKey = data.currency;
        } else {
          this.view.lbxCurrency.selectedKey = this.templateDetails.currency;
        }
        this.view.tbxPaymentRefValue.text = kony.sdk.isNullOrUndefined(data.paymentReference) ? "" : data.paymentReference;
        this.view.tbxAmountValue.text = kony.sdk.isNullOrUndefined(data.amount) ? "" : data.amount;
        this.view.tbxRecipAccNumber.text = kony.sdk.isNullOrUndefined(data.accountNumber) ? "" : data.accountNumber;
        this.view.tbxRecipientBankName.text = kony.sdk.isNullOrUndefined(data.bankName) ? "" : data.bankName;
        this.view.tbxRecipientName.text = kony.sdk.isNullOrUndefined(data.beneficiaryName) ? "" : data.beneficiaryName;
        this.view.tbxSwiftCode.text = kony.sdk.isNullOrUndefined(data.swift) ? (kony.sdk.isNullOrUndefined(data.swiftCode) ? "" : data.swiftCode) : data.swift;
               if (data.accountType === BBConstants.INTERNAL || data.accType === BBConstants.INTERNAL) {
                    this.view.imgAdd1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
          this.view.imgAdd2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
          this.view.imgAdd1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
          this.view.imgAdd2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
        } else {
          this.view.flxBankAccountType.isVisible = true;
          this.view.flxSwftCode.isVisible = true;
          this.view.flxSwiftCode.isVisible = true;
          this.view.flxFeesPaidByOptions.isVisible = true;
          this.view.flxRecipientBankName.isVisible = true;
          this.view.imgAdd1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
          this.view.imgAdd2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
          this.view.imgAdd1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
          this.view.imgAdd2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                    if (data.accountType === BBConstants.DOMESTIC || data.accType === BBConstants.DOMESTIC) {
            this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
          } else {
            this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
          }
          if (data.feesPaidBy === "Me") {
            this.OnRadioBtnClickFeesPaidBy(1);
          } else if (data.feesPaidBy === "Beneficiary") {
            this.OnRadioBtnClickFeesPaidBy(2);
          } else {
            this.OnRadioBtnClickFeesPaidBy(3);
          }
        }
      }
	if (kony.sdk.isNullOrUndefined(data.accountNumber))  this.setPermissionBasedUIonAddPOClick();
      
      FormControllerUtility.wrapAmountField(this.view.tbxAmountValue).onKeyUp(this.enableOrDisableAddBeneficiaries);
      var breakpoint = kony.application.getCurrentBreakpoint();
      if (kony.os.deviceInfo().screenWidth < 1024 && ((breakpoint <= 1024 || orientationHandler.isTablet))) {
        this.adjustScreen(-110);
      }
      else if(breakpoint <= 1024 || orientationHandler.isTablet){
        this.adjustScreen(-406);
      }
      else{
        this.adjustScreen(10);
      }
           if (!kony.sdk.isNullOrUndefined(data.beneficiaryType)) {
     this.view.flxBankAccountType.isVisible = false;
    }
      
      this.view.forceLayout();
    },

        feesPaidByInfo: function() {
   	if (this.view.flxFeesPaidByInfo.isVisible === true) {
        this.view.flxFeesPaidByInfo.isVisible = false;
      } else {
        this.view.flxFeesPaidByInfo.isVisible = true;
        this.view.RichTextShared2.text = "\t\t  " + kony.i18n.getLocalizedString("i18n.kony.BulkPayments.FeesPaidByShared2");
        this.view.flxCross0.onTouchEnd = function() {
          var scopeObj = this;
          scopeObj.view.flxFeesPaidByInfo.isVisible = false;
        }.bind(this);
      }
      this.view.forceLayout();
      this.adjustScreen(10);
          var break_point = kony.application.getCurrentBreakpoint();
          if (break_point > 1024) {
            this.adjustScreen(-150);
          }
    },   

    enableOrDisableAddBeneficiaries: function() {
      var scopeObj = this;
   
      if (scopeObj.view.imgAdd1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
        if ((CommonUtilities.isEmptyString(scopeObj.view.tbxAmountValue.text)) || (CommonUtilities.isEmptyString(scopeObj.view.tbxPaymentRefValue.text)) || (CommonUtilities.isEmptyString(scopeObj.view.tbxRecipAccNumber.text)))
          FormControllerUtility.disableButton(scopeObj.view.addNewBeneficiaryFormActions.btnNext);
        else
          FormControllerUtility.enableButton(scopeObj.view.addNewBeneficiaryFormActions.btnNext);                 
      }
      else {
        if((CommonUtilities.isEmptyString(scopeObj.view.tbxSwiftCode.text)) || (CommonUtilities.isEmptyString(scopeObj.view.tbxRecipientName.text)) || (CommonUtilities.isEmptyString(scopeObj.view.tbxRecipientBankName.text)) || (CommonUtilities.isEmptyString(scopeObj.view.tbxAmountValue.text)) || (CommonUtilities.isEmptyString(scopeObj.view.tbxPaymentRefValue.text)) || (CommonUtilities.isEmptyString(scopeObj.view.tbxRecipAccNumber.text))) 
          FormControllerUtility.disableButton(scopeObj.view.addNewBeneficiaryFormActions.btnNext);
        else
          FormControllerUtility.enableButton(scopeObj.view.addNewBeneficiaryFormActions.btnNext);                 
      }
     
      this.validateAmountFormat();
    },

    backtoAddBenScreen: function() {
    this.getBeneficiaries();
    if (!kony.sdk.isNullOrUndefined(this.view.TabBodyNewAddedBen.getData()) && this.view.TabBodyNewAddedBen.getData().length > 0) {

    if(!kony.sdk.isNullOrUndefined(this.view.TabBodyNewAddedBen.getData()[0][1]) && this.view.TabBodyNewAddedBen.getData()[0][1].length > 0 || !kony.sdk.isNullOrUndefined(this.view.TabBodyNewAddedBen.getData()[1][1]) && this.view.TabBodyNewAddedBen.getData()[1][1].length > 0) {
    this.view.TabBodyNewAddedBen.setVisibility(true);
    this.view.tbxSearchBox1.text = "";
    this.view.flxSearchBox.setVisibility(true);
    this.view.flxViewRecipients.setVisibility(true);
    this.view.flxEmptyBen.setVisibility(false);
    this.view.flxTabletAccountsSeparator.setVisibility(true);
    this.view.tbxSearchBox1.onKeyUp = this.onSearchKeyUp.bind(this);
    this.view.tbxSearchBox1.onDone = this.onSearchDone.bind(this);
    }
    }
    this.adjustScreen(10);
    this.view.forceLayout();
   },

    clearBeneficiaryFields: function() {
      this.view.tbxRecipAccNumber.text = "";
      this.view.tbxSwiftCode.text = "";
      this.view.tbxRecipientBankName.text = "";
      this.view.tbxAmountValue.text = "";
      this.view.tbxAmountValue.placeholder=CommonUtilities.formatCurrencyWithCommas("0", true);
      this.setCurrencyData();
      this.view.lbxCurrency.setEnabled(false);
      this.view.tbxRecipientName.text = "";
      this.view.tbxPaymentRefValue.text = "";
      this.OnRadioBtnClickFeesPaidBy(1);
      this.view.lblInvalidIBANInfinity.setVisibility(false);
      this.view.flxInformationText.isVisible = false;
      this.view.lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.imgAdd1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgAdd2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgAdd1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.imgAdd2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.flxSwftCode.isVisible = false;
            this.view.flxFeesPaidByOptions.isVisible = false;
            this.view.flxRecipientBankName.isVisible = false;
      this.view.flxAddType.isVisible = true;          
this.view.tbxRecipientBankName.setEnabled(true);
this.view.tbxRecipAccNumber.setEnabled(true);
this.view.tbxSwiftCode.setEnabled(true);
this.view.tbxRecipientName.setEnabled(true);

      this.adjustScreen(10);
      this.view.forceLayout();
    },

    validateIBAN: function() {
        var scopeObj = this;
        var validationUtilityManager = applicationManager.getValidationUtilManager();
        var IBAN = scopeObj.view.tbxRecipAccNumber.text;
        if (IBAN !== "") {
            var regex = /^[0-9]+$/;
            if (IBAN.match(regex)) {
                if (!validationUtilityManager.isValidAccountNumber(IBAN)) {
                    scopeObj.showInvalidIBANErrorMessage(kony.i18n.getLocalizedString("i18n.TransfersEur.InvalidAccountNumberMessage"));
                } else {
                    this.view.tbxSwiftCode.text = "";
                    this.view.tbxRecipientBankName.text = "";
                    this.view.tbxSwiftCode.setEnabled(true);
                    //this.view.btnLookUp.isVisible = true;
                    this.view.tbxRecipientBankName.setEnabled(true);
                }
            } else {
                    scopeObj.bulkPaymentsModule.presentationController.validateIBANforTemplates(IBAN);
            }
        }
        scopeObj.view.forceLayout();
    },

    showInvalidIBANErrorMessage: function(errmsg) {
        this.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.BORDER;
        this.view.lblInvalidIBANInfinity.text = errmsg;
        this.view.lblInvalidIBANInfinity.setVisibility(true);
        this.view.tbxSwiftCode.text = "";
        this.view.tbxSwiftCode.setEnabled(true);
        this.view.tbxRecipientBankName.text = "";
        this.view.tbxRecipientBankName.setEnabled(true);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
    },

    OnValidatingIBAN: function(data) {
        this.view.tbxRecipientBankName.text = data.bankName;
        this.view.tbxRecipientBankName.setEnabled(false);
        this.view.tbxSwiftCode.text = data.bic;
        this.view.tbxSwiftCode.setEnabled(false);
        //this.view.btnLookUp.isVisible = false;
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
    },
    
    setCurrencyData: function() {
      var formatManager = applicationManager.getFormatUtilManager();
      var defaultCurrency = !kony.sdk.isNullOrUndefined(formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey)) ? formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey) : this.view.lstbDefaultCurrency.selectedKey;
      var currencyList = this.masterDataCurrency;

      for (var i = 0; i < currencyList.length; i++) {
        switch (currencyList[i][0]) {
                    case "USD":
                        currencyList[i][1] = "$ - USD";
                        break;
                    case "EUR":
                        currencyList[i][1] = "€ - EUR";
                        break;
                    case "INR":
                        currencyList[i][1] = "₹ - INR";
                        break;
                    case "GBP":
                        currencyList[i][1] = "£ - GBP";
                        break;
        }
      }
      this.view.lbxCurrency.masterData = currencyList;
      this.view.lbxCurrency.selectedKey = defaultCurrency !== "" ? defaultCurrency : currencyList[0][0];
    },

    OnRadioBtnClickFeesPaidBy: function(btnId) {
      var RadioBtn1 = this.view.imgFees1Type2;
      var RadioBtn2 = this.view.imgFees2Type2;
      var RadioBtn3 = this.view.imgFees3Type2;

            if (btnId === 1) {
        RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
        RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;   
        RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        RadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;         
        this.adjustScreen(10);
            } else if (btnId === 2) {
        RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
        RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;   
        RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        RadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;         
        this.adjustScreen(10);
            } else {
        RadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
        RadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;   
        RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;                
        this.adjustScreen(10);
      }    
      var breakpoint = kony.application.getCurrentBreakpoint();
      if (kony.os.deviceInfo().screenWidth < 1024 && ((breakpoint <= 1024 || orientationHandler.isTablet))) {
        this.adjustScreen(-110);
      }
      else if(breakpoint <= 1024 || orientationHandler.isTablet){
        this.adjustScreen(-110);
      }
      else{
        this.adjustScreen(10);
      }

      this.view.forceLayout();
    },

    clearFeildsOnSelectionChange: function() {
        this.view.tbxRecipAccNumber.text = "";
        this.view.tbxSwiftCode.text = "";
        this.view.tbxRecipientBankName.text = "";
        this.view.tbxAmountValue.text = "";
        this.setCurrencyData();               
        this.view.tbxRecipientName.text = "";
        this.view.tbxPaymentRefValue.text = "";
        this.OnRadioBtnClickFeesPaidBy(1);
        this.view.lblInvalidIBANInfinity.setVisibility(false);
        this.view.flxInformationText.isVisible = false;
        this.view.lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;                       
        this.adjustScreen(10);
        this.view.forceLayout();
    },

        RadioBtnAction: function(radioBtn1, radioBtn2, isInternal) {
            var RadioBtn1 = radioBtn1;
      var RadioBtn2 = radioBtn2;
      this.clearFeildsOnSelectionChange();
      if (RadioBtn1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
        RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
        RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
        RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                if (isInternal) {
            this.view.flxBankAccountType.isVisible = true; 
            this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                  //commented as part of DBB-8977
//          if ((kony.sdk.isNullOrUndefined(this.templateDetails.processingMode) ? this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() : this.templateDetails.processingMode.toUpperCase()) === 'SINGLE') {
//                       this.view.flxTypeRadio2.setEnabled(false);
//                       this.view.lblRadioOpt2.setEnabled(false);
//                       this.view.lblRadioOpt2.skin = ViewConstants.SKINS.RADIOBTN_LBL_DISABLED_FONT;
//                       this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_DISABLED_FONT;
//           }
//           else  if ((kony.sdk.isNullOrUndefined(this.templateDetails.processingMode) ? this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() : this.templateDetails.processingMode.toUpperCase()) === 'MULTI'||'MULTIPLE') {
//             this.view.flxTypeRadio2.setEnabled(true);lblRadioOpt2
//             this.view.lblRadioOpt2.setEnabled(true);
//             this.view.lblRadioOpt2.skin = ViewConstants.SKINS.BULKPAYMENTS_NOHYPERLINK_SKIN;
//             this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
//           }
          if (this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
       			 this.OnRadioBtnClickFeesPaidBy(3);
  		  }
          this.view.tbxRecipAccNumber.onEndEditing = this.validateIBAN.bind(this);
          this.view.flxSwiftCode.isVisible = true;
          this.view.flxSwftCode.isVisible = true;
          this.view.tbxSwiftCode.onEndEditing = this.validateSwiftCode.bind(this);
          this.view.flxRecipientBankName.isVisible = true;
          this.view.flxFeesPaidByOptions.isVisible = true;          
          this.view.tbxRecipAccNumber.onBeginEditing = function() {
              var scopeObj = this;
              scopeObj.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
              scopeObj.view.lblInvalidIBANInfinity.setVisibility(false);
              scopeObj.view.forceLayout();
          }.bind(this);    
        }        
      } else {
        RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
        RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
        RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                if (isInternal) {
          this.view.flxBankAccountType.isVisible = false; 
          this.view.flxSwiftCode.isVisible = false;                      
          this.view.flxSwftCode.isVisible = false;
          this.view.flxRecipientBankName.isVisible = false;
          this.view.flxFeesPaidByOptions.isVisible = false;  
          this.view.tbxRecipAccNumber.onEndEditing = this.fetchBeneficiaryName.bind(this);
          this.view.tbxRecipAccNumber.onBeginEditing = function() {
              var scopeObj = this;
              scopeObj.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
              scopeObj.view.lblInvalidIBANInfinity.setVisibility(false);
              scopeObj.view.forceLayout();
          }.bind(this);              
        }
      }
		//commented as part of DBB-8975
 //    if(this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() === "MULTIPLE"){
//       this.view.lbxCurrency.setEnabled(true);
//         if (this.view.imgAdd1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
//           this.view.lbxCurrency.setEnabled(false);
//         } else {
//           if (this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
//               this.view.lbxCurrency.setEnabled(false);
//           } else {
//               this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
//               this.view.lbxCurrency.setEnabled(true);
//           }
//        }
//    }
      if (this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
        this.OnRadioBtnClickFeesPaidBy(3);
      }          
      var formatManager = applicationManager.getFormatUtilManager();
      this.view.lbxCurrency.selectedKey = !kony.sdk.isNullOrUndefined(formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey)) ? formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey) : this.templateDetails.currency.length > 1 ? this.templateDetails.currency : formatManager.getCurrencySymbolCode(this.templateDetails.currency);    
      if ((this.view.imgRadioBtnRecipientType2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) && (this.view.imgRadioBtnRecipientType2.skin === ViewConstants.SKINS.RADIOBTN_SELECTED)){}
	  else{
		this.setPermissionBasedUIonExternalClick();
	  }
      this.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;

          var breakpoint = kony.application.getCurrentBreakpoint();
          if (kony.os.deviceInfo().screenWidth < 1024 && ((breakpoint <= 1024 || orientationHandler.isTablet))) {
            this.adjustScreen(-110);
          }
          else if(breakpoint <= 1024 || orientationHandler.isTablet){
            if(this.view.imgAdd1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) this.adjustScreen(-406);
            else  this.adjustScreen(-110);
          }
          else{
            this.adjustScreen(10);
          }
          
      this.view.forceLayout();      
    },

    fetchBeneficiaryName: function() {     
      var accNumber = this.view.tbxRecipAccNumber.text;
      if(/^\d+$/.test(accNumber)){
        this.bulkPaymentsModule.presentationController.getBeneficiaryNameForCreateTemplate(accNumber);
      }
      else{
        this.showBeneficiaryAccountErrorMessage(kony.i18n.getLocalizedString("i18n.common.InvalidRecipientNumber"));
      }
    },

        mapBeneficiaryName: function(data) {
            this.view.tbxRecipientName.text = data.beneficiaryName;      
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },

    validateSwiftCode: function() {
            var scopeObj = this;
            var swiftCode = scopeObj.view.tbxSwiftCode.text;
            var validationUtilityManager = applicationManager.getValidationUtilManager();
            if (swiftCode !== "") {
                if (!(validationUtilityManager.isValidSwiftCode(swiftCode))) {
                    scopeObj.showInvalidSwiftCodeErrorMessage(kony.i18n.getLocalizedString("i18n.TransfersEur.InvalidSwiftCodeMessage"));
                } else {
                    scopeObj.bulkPaymentsModule.presentationController.getBankDetailsFromBICTemplates(swiftCode);
                }
            }
            scopeObj.view.forceLayout();
    },
    
    validatePaymentReference: function(textWidget, validWidget, invalidWidget) {
		 var scopeObj = this;
		 var text = textWidget;
		 var expression =  /^[ A-Za-z0-9-.,'?+:/()]*$/;
		 if (expression.test(textWidget.text)) {
             invalidWidget.setVisibility(false);
             validWidget.setVisibility(true);
		     textWidget.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
             if(this.view.flxAddNewBeneficiaries.isVisible === false && this.view.flxExistingBeneficiaries.isVisible === false && this.view.flxApplyChangesTemplate.isVisible === false) {
			    this.enableDisabledProceedOnValidPersonalDetails(this);
              } else if(this.view.flxAddNewBeneficiaries.isVisible === true) {
                this.enableOrDisableAddBeneficiaries(this);
              } else {
                this.enableDisableApplyForTemplate(this);
              }
			 }  else {
             if(this.view.flxAddNewBeneficiaries.isVisible === false && this.view.flxExistingBeneficiaries.isVisible === false && this.view.flxApplyChangesTemplate.isVisible === false) {
			    FormControllerUtility.disableButton(this.view.createFlowFormActionsNew.btnNext);
              } else if(this.view.flxAddNewBeneficiaries.isVisible === true) {
                FormControllerUtility.disableButton(this.view.addNewBeneficiaryFormActions.btnNext);
              } else {
                this.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.bulkPayments.invalidDescription");
                CommonUtilities.disableButton(this.view.btnApplyBeneficiaryChange);
              }
             invalidWidget.setVisibility(true);
			 validWidget.setVisibility(false);
             textWidget.skin = ViewConstants.SKINS.BORDER;
             FormControllerUtility.hideProgressBar(this.view);
             this.view.forceLayout();
			 }
		},

    showInvalidSwiftCodeErrorMessage: function(errmsg) {
            this.view.lblInvalidSwift.setVisibility(true);
            this.view.lblInvalidSwift.text = errmsg;
            this.view.tbxRecipientBankName.text = "";
            this.view.tbxRecipientBankName.setEnabled(true);
            this.view.tbxSwiftCode.skin = ViewConstants.SKINS.BORDER;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

      OnValidatingSwiftCode: function(data) {
          this.view.tbxSwiftCode.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
          this.view.lblInvalidSwift.setVisibility(false);
          this.view.tbxRecipientBankName.text = data.bankName;
          this.view.tbxRecipientBankName.setEnabled(false);
          FormControllerUtility.hideProgressBar(this.view);
          this.view.forceLayout();
      },

    showBeneficiaryAccountErrorMessage: function(errmsg) {
      this.view.lblInvalidIBANInfinity.setVisibility(true);
            this.view.lblInvalidIBANInfinity.text = errmsg;
            this.view.tbxRecipientName.text = "";
      this.view.tbxRecipientName.setEnabled(true);
      this.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.BORDER;
      FormControllerUtility.hideProgressBar(this.view);
      FormControllerUtility.disableButton(this.view.addNewBeneficiaryFormActions.btnNext);
      this.view.forceLayout();
    },

    onCheckBoxClick: function() {

            if (this.view.lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.view.lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
            } else {
                this.view.lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
      }
    },

        addNewBeneficiaryData: function() {

          var feesPaid = "";
          var accNum = this.view.tbxRecipAccNumber.text;
          var bankName = "";
          var paymentMethod = "";
          var addToExisting = "";
      
          if (this.view.imgAdd1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
            paymentMethod = BBConstants.INTERNAL;
          } else {
            if (this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
              paymentMethod = BBConstants.DOMESTIC;
            } else {
              paymentMethod = BBConstants.INTERNATIONAL;
            }
          }

          if (this.view.lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
            addToExisting = true;
          } else {
            addToExisting = false;
          }

          var formatManager = applicationManager.getFormatUtilManager();
          var currency = this.view.lbxCurrency.selectedKey; 

          if (this.view.imgFees1Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
            feesPaid = "Me";
          } else if (this.view.imgFees2Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
            feesPaid = "Beneficiary";
          } else {
            feesPaid = "Shared";
          }
          
          if (this.view.tbxRecipientBankName.text === "" &&  paymentMethod === BBConstants.INTERNAL) {
            bankName = "Infinity";
            feesPaid = "-";
          }  else {
            bankName = this.view.tbxRecipientBankName.text;
          }
          var currencySymbol = formatManager.getCurrencySymbol(currency);
          var newBeneficiaryDetails = {
            "accountType": paymentMethod,
            "recipientName": kony.sdk.isNullOrUndefined(this.view.tbxRecipientName.text) ? kony.i18n.getLocalizedString("i18n.common.NA"): this.view.tbxRecipientName.text,
            "accountNumber": accNum,
            "bankName": bankName,
            "swift": kony.sdk.isNullOrUndefined(this.view.tbxSwiftCode.text) ?kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxSwiftCode.text,
            "currency": currency,
            "amount": this.view.tbxAmountValue.text,
            "feesPaidBy": feesPaid,
            "paymentReference": kony.sdk.isNullOrUndefined(this.view.tbxPaymentRefValue.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxPaymentRefValue.text,
            "beneficiaryName": kony.sdk.isNullOrUndefined(this.view.tbxRecipientName.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxRecipientName.text,
            "lblAccountNoValue": accNum,                    
            "lblPayRefValue": kony.sdk.isNullOrUndefined(this.view.tbxPaymentRefValue.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxPaymentRefValue.text,
            "lblViewAmount": feesPaid,
            "lblAccTypeValue": kony.sdk.isNullOrUndefined(this.view.tbxSwiftCode.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxSwiftCode.text,
            "lblFeesValue": feesPaid,
            "fromAccount" : !kony.sdk.isNullOrUndefined(this.view.lblSelectAccount.accountID) ? this.view.lblSelectAccount.accountID : this.templateDetails.fromAccount,
            "lblSwiftCodeValue": bankName,
            "btnEdit": {
              "isVisible": true,
            },
            "flxActions": {
              "isVisible": true,
            },
            "amountWithCurrency" : currencySymbol + this.view.tbxAmountValue.text,
          }          
          this.view.flxAcknowledgementNew.rTextSuccess.skin = "";

          if(!addToExisting){        
            this.bulkPaymentsModule.presentationController.addBeneficiary(newBeneficiaryDetails);
            this.newBenficiary = newBeneficiaryDetails;
          }
          else{
            this.view.tbxSearchBox1.text = "";
            this.newlyAddedBeneficiaries.push(newBeneficiaryDetails);
            this.addBeneficiariesToTemplate();
            this.view.flxAcknowledgementContainer.isVisible = true;  
            this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
            this.view.flxAcknowledgementNew.rTextSuccess.text =  kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.newBenficiariesAdded");
            this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
              var scopeObj = this;
              scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
              this.view.forceLayout();
            }.bind(this);
          }
      
    },

    backUI: function() {
       this.view.flxHeader.setVisibility(true);
       this.view.flxTopSeparator.setVisibility(true);
       this.view.flxCreateDetails.setVisibility(true);
       this.view.flxProcessinModeInfo.setVisibility(true);
       this.view.flxProcessingMode.setVisibility(true);
       this.view.lblExecutionDate.setVisibility(true);
       this.view.flxDate.setVisibility(true);
       this.view.lblDescription.setVisibility(true);
       this.view.flxTemplateDescription.setVisibility(true);
       this.view.flxBottomSeperator.setVisibility(true);
       this.view.createFlowFormActionsNew.isVisible = true;
       this.view.CommonFormActionsExt.setVisibility(false);
       this.view.flxBeneficiaryUI.setVisibility(false);

       this.view.createFlowFormActionsNew.isVisible = true;
       this.view.createFlowFormActionsNew.btnNext.onClick = this.backtoAddBenScreen.bind(this);
     },
    
    setAcknowledgementMessage: function() {
            if (this.isackFlow === true) {
        this.view.flxAcknowledgementContainer.isVisible = true;  
        this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
        this.view.flxAcknowledgementNew.rTextSuccess.text = this.ackMsg;
                this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
          var scopeObj = this;
          scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
          this.view.forceLayout();
        }.bind(this);

                this.isackFlow = false;
        this.adjustScreen(10);
        this.view.forceLayout();
      }
    },   
    
    fetchPaymentOrders: function(reqData) {
      this.updateFetchParams();
      this.bulkPaymentsModule.presentationController.getPOsforTemplate(reqData);
    },
    
    fetchExistingBeneficiaries: function() {      
     var reqParams = {
                "limit": "",
                "offset": 0,
                "order": "desc",
                "resetSorting": true,
                "sortBy": "createdOn"
            };  
      FormControllerUtility.showProgressBar(this.view);
      var accountNum = "";
      if(this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES){
        accountNum = this.templateDetails.fromAccount;
        this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(reqParams, "", accountNum);
      }
      else{
        if (!kony.sdk.isNullOrUndefined(this.view.segFromAccount.selectedRowItems[0])) accountNum = this.view.segFromAccount.selectedRowItems[0].accountID;
        this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(reqParams, "", accountNum);
      }
    },
    
    setCreateBulkRequestView: function() {
      this.templateFlow = "";
      this.resetUI();
      this.isEditFlow = false;
      this.isEdit = false;
      this.view.flxCreateBulkRequest.isVisible = true;
      this.view.flxTemplateDetails.isVisible = true;
      this.view.formActionsNew.isVisible = true;
      this.view.flxSearch.isVisible = true;
      this.view.flxApplyChanges.isVisible = true;
      this.view.flxViewOnlySeletced.isVisible = true;
      this.view.flxEditBeneficiariesHeader.isVisible = true;
      this.view.lblViewRemovedBeneficiaries.isVisible = true;
      this.view.flxViewAllRecipients.isVisible = true;
      this.removedBeneficiaryData = [];
      this.fetchPaymentOrders({
        "templateId": this.templateDetails.templateId
      });
    },
    
    invokeCreateBulkRequestView: function() {
      FormControllerUtility.showProgressBar(this.view);
      var self = this;
      self.resetUI();

      //this.templateFlow = "";
      
      this.view.flxCreateBulkRequest.isVisible = true;
      this.view.flxTemplateDetails.isVisible = true;
      this.view.formActionsNew.isVisible = true;
      this.view.flxViewAllRecipients.isVisible = true;
      this.view.flxSearch.isVisible = true;
      
            if (this.templateFlow === "") {
        this.view.flxApplyChanges.isVisible = true;
        this.view.flxApplyChangesTemplate.isVisible = false;
            } else {
        this.view.flxApplyChanges.isVisible = false;
        this.view.flxApplyChangesTemplate.isVisible = true;
      }
      
      this.view.flxViewOnlySeletced.isVisible = true;
      this.view.flxEditBeneficiariesHeader.isVisible = true;
      this.view.lblViewRemovedBeneficiaries.isVisible = true;
      this.view.formActionsNew.btnOption.isVisible = false;
      this.setAcknowledgementMessage();
      CommonUtilities.disableButton(this.view.btnApplyChanges);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkReqView");//kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequestPaymentDetails");
      this.view.lblTemplateNameTitle.text = kony.i18n.getLocalizedString("i18n.bulkWire.templateName");
      this.view.lblSelectEdit.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.select&editBeneficiaries");
      this.view.lblAddBeneficiariesText.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.AddedBeneficiareisforTemplate");
      this.view.lblViewRemovedBeneficiaries.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewAllRemovedBeneficiaries");
      this.view.lblRemoveBeneficiaries.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.removeFromBulkReq");
      this.view.lblTemplateName.text = this.templateDetails.templateName;
            this.view.tbxSearchBox.onKeyUp = this.onBeneficiaryKeyUp.bind(this, this.beneficiaryData, true, false);
            this.view.tbxSearchBox.onDone = this.onBeneficiarySearchDone.bind(this, this.beneficiaryData, true, false);
      this.view.tbxAmount.onKeyUp = function() {
        self.enableDisableApply();
      };
      this.view.tbxPaymentReference.onKeyUp = function() {
        self.enableDisableApply();
      };
      this.view.btnApplyChanges.onClick = function() {
        FormControllerUtility.showProgressBar(self.view);
        var changedAmount = self.view.tbxAmount.text ? self.view.tbxAmount.text.trim() : null;
        var changedPaymentRef = self.view.tbxPaymentReference.text ? self.view.tbxPaymentReference.text.trim() : null;
        var data;
        self.view.flxError.setVisibility(false);
        if (self.view.lblStatus.text === this.switch_ActionOn) {
          data = self.beneficiaryData.filter(self.selectedRecords);
          self.updateRecordValues(data, changedAmount, changedPaymentRef);
        } else {
          data = self.beneficiaryData;
          self.updateRecordValues(data, changedAmount, changedPaymentRef);
        }
        self.setTemplatebeneficiaryData(data, changedAmount, changedPaymentRef, true, false);
        self.view.tbxAmount.text = "";
        self.view.tbxPaymentReference.text = "";
      };
      this.view.btnRemove.onClick = function() {
        if (self.isRecordSelected()) {
          self.showPopUp(kony.i18n.getLocalizedString("i18n.kony.bulkPayments.cancelBeneficiary"));
          
          self.view.PopupHeaderUM.btnYes.onClick = function() {
          FormControllerUtility.showProgressBar(self.view);
          self.removeSelectedBeneficiary();
          self.setTemplatebeneficiaryData(self.beneficiaryData, null, null, true, false);
          CommonUtilities.disableButton(self.view.btnApplyChanges);
          }
          
        } else {
          self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.noRecSelected");
          self.view.flxError.setVisibility(true);
        }
      };
      this.view.lblViewRemovedBeneficiaries.onTouchEnd = function() {
        if (self.removedBeneficiaryData.length > 0) {
          FormControllerUtility.showProgressBar(self.view);
          self.updateBeneficiaryRecords();
          self.view.tbxSearchBox.text = "";
          self.setRemovedBeneficiariesView();
        } else {
          self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.noRecRemoved");
          self.view.flxError.setVisibility(true);
        }
      };
      this.view.lblStatus.text = this.switch_ActionOff;
      this.view.lblStatus.skin = ViewConstants.SKINS.SWITCH_OFF;
      this.view.lblStatus.onTouchEnd = function() {
        self.toggleEditBeneficiarytTemplateView();
      };
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.formActionsNew.btnNext.onClick = function() {
        if (self.checkpaymentRefValue() && self.checkCurrencyValue() && self.checkAmountValue() && self.checkFeesPaidByValue()) self.setVerifyBulkRequestView();
        else {
          if (!self.checkpaymentRefValue())
            self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentRefNotEntered");
          else if (!self.checkCurrencyValue())
            self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.currencyNotEntered");
          else if (!self.checkAmountValue())
            self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.amountNotEntered");
          else if (!self.checkFeesPaidByValue())
            self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.feesPaidByNotEntered");
          self.view.flxError.setVisibility(true);
        }
      };
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.formActionsNew.btnCancel.onClick = this.navigateToViewTemplates.bind(this);
      if (!kony.sdk.isNullOrUndefined(this.beneficiaryData) && this.beneficiaryData !== "") {
        if (this.templateFlow === "") {
          this.setTemplatebeneficiaryData(this.beneficiaryData, null, null, true, false);
        } else {
          this.view.formActionsNew.btnCancel.onClick = this.backtoAddBenScreen.bind(this);
          this.setTemplatebeneficiaryData(this.selectedBeneficiaries, null, null, true, false);
        }
      } else {
        this.showNoRecordsView();
      }
      var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data
	  
      var benTabData = this.view.TabBodyNewBeneficiaries.getData();
      var benData ;
	    var processingMode = this.templateDetails.processingMode || this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase();
      for(var j=0;j<3;j++){
        if(!kony.sdk.isNullOrUndefined(this.view.TabBodyNewBeneficiaries.getData()[j])){
          benData = this.view.TabBodyNewBeneficiaries.getData()[j][1];
          benData.forEach(function (item) {
            if (processingMode === "MULTIPLE" || processingMode === "MULTI") {
              item.listCurrency.isVisible = true;
              item.lblCurrency.isVisible = false;
            } else {
              item.listCurrency.isVisible = false;
              item.lblCurrency.isVisible = true;
            }
            item.lblPaymentRefValue.isVisible=false;
            item.tbxPaymentReference.isVisible=true;
            item.tbxPaymentReference.text=item.lblPaymentRefValue.text;
          });
        }
      }
      this.view.TabBodyNewBeneficiaries.setData(benTabData);
      
      if (data.length > 0) FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      else FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      this.view.lblEditSummary.isVisible=false;
      this.view.lblEdit.isVisible=false;
      this.adjustScreen(0);
      this.view.forceLayout();
if ((this.templateFlow !== "createTemplate") && (this.templateFlow !== BBConstants.BULKPAYMENT_VIEW_TEMPLATES)) this.setVerifyBulkRequestView();
      FormControllerUtility.hideProgressBar(this.view);
    },
    
    enableDisableApply: function() {
      var self = this;
      var changedAmount = self.view.tbxAmount.text ? self.view.tbxAmount.text.trim() : null;
      var changedPaymentRef = self.view.tbxPaymentReference.text ? self.view.tbxPaymentReference.text.trim() : null;
      if ((changedAmount !== null || changedPaymentRef !== null) && self.isRecordSelected()) {
        CommonUtilities.enableButton(this.view.btnApplyChanges);
      } else {
        CommonUtilities.disableButton(this.view.btnApplyChanges);
      }
    },
    
    isRecordSelected: function() {
      var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
      var selectedStatus = false;
      var domesticData = [];
      if (data[0]) {
        domesticData = data[0][1];
      }
      domesticData.forEach(function(item) {
        if (item.lblCheckStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
          selectedStatus = true;
        }
      });
      var internationalData = [];
      if (data[1]) {
        internationalData = data[1][1];
      }
      internationalData.forEach(function(item) {
        if (item.lblCheckStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
          selectedStatus = true;
        }
      });
      var sameBankData = [];
      if (data[2]) {
        sameBankData = data[2][1];
      }
      sameBankData.forEach(function(item) {
        if (item.lblCheckStatus.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
          selectedStatus = true;
        }
      });
      return selectedStatus;
    },

    onBeneficiarySearchDone: function(data, editFlow, deleteFlow) {
      var self = this;
      var searchString = self.view.tbxSearchBox.text.toLocaleLowerCase();
      var records = Object.values(data).filter(records => (!kony.sdk.isNullOrUndefined(records.beneficiaryName) && records.beneficiaryName.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(records.bankName) && records.bankName.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(records.paymentMethod) && records.paymentMethod.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(records.fromAccount) && records.fromAccount.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(records.accountNumber) && records.accountNumber.toLocaleLowerCase().includes(searchString)) ||  
                                               (!kony.sdk.isNullOrUndefined(records.swiftCode) && records.swiftCode.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(records.swift) && records.swift.toLocaleLowerCase().includes(searchString)));
      this.setTemplatebeneficiaryData(records, null, null, editFlow, deleteFlow);
    },
    
    onBeneficiaryKeyUp: function(data, editFlow, deleteFlow) {
      this.updateFetchParams();
      this.view.imgClearIcon.isVisible = true;
      this.view.imgClearIcon.onTouchStart = function() {
        this.view.tbxSearchBox.text = "";
        this.view.imgClearIcon.isVisible = false;
        this.setTemplatebeneficiaryData(data, null, null, editFlow, deleteFlow);
      }.bind(this);
    },

    updateRecordValues: function(data, changedAmount, changedPaymentRef) {
      data.forEach(function(item) {
        if (item.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
          if (changedAmount !== null) {
            item.amount = changedAmount;
          }
          if (changedPaymentRef !== null) {
            item.paymentReference = changedPaymentRef;
          }
        }
      });
    },
    
    isDomestic: function(beneficiary) {
      if (((!kony.sdk.isNullOrUndefined(beneficiary.isInternationalAccount) && beneficiary.isInternationalAccount === "false") && 
           (!kony.sdk.isNullOrUndefined(beneficiary.isSameBankAccount) && beneficiary.isSameBankAccount === "false")) ||
          (!kony.sdk.isNullOrUndefined(beneficiary.accType) && beneficiary.accType.toLowerCase() === BBConstants.DOMESTIC.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    },
    
    isInternational: function(beneficiary) {
      if ((!kony.sdk.isNullOrUndefined(beneficiary.isInternationalAccount) && beneficiary.isInternationalAccount === "true") ||
          (!kony.sdk.isNullOrUndefined(beneficiary.accType) && beneficiary.accType.toLowerCase() === BBConstants.INTERNATIONAL.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    },
    
    isSameBank: function(beneficiary) {
      if ((!kony.sdk.isNullOrUndefined(beneficiary.isSameBankAccount) && beneficiary.isSameBankAccount === "true") || 
          (!kony.sdk.isNullOrUndefined(beneficiary.accType) && beneficiary.accType.toLowerCase() === BBConstants.INTERNAL.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    },
    
    checkStatus: function(data) {
      var status = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
      for (var index = 0; index < data.length; index++) {
                if (kony.sdk.isNullOrUndefined(data[index].selectAll) || data[index].selectAll === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
          status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          break;
        }	
      }
      return status;
    },
    
    setTemplatebeneficiaryData: function(data, changedAmount, changedPaymentRef, isEditFlow, isDelete) {
      var scopeObj = this;
      this.view.TabBodyNewBeneficiaries.segTemplates.rowTemplate = "flxEditBeneficiaryHeader";
      this.view.TabBodyNewBeneficiaries.segTemplates.sectionHeaderTemplate = "flxEditBeneficiariesHeader";
      var break_point = kony.application.getCurrentBreakpoint();
      var flxCurrencyLeft;
      var flxCurrencyWidth;
      if (kony.os.deviceInfo().screenWidth < 1024 && ((break_point <= 1024 || orientationHandler.isTablet))) {
        flxCurrencyLeft = "5.5%";
        flxCurrencyWidth= "15%";
      }
      else if(break_point <= 1024 || orientationHandler.isTablet){
        flxCurrencyLeft = "0%";
        flxCurrencyWidth= "20%";
      }
      else{
        flxCurrencyLeft = "0%";
        flxCurrencyWidth= "20%";
      }
      var createSegmentSection = function(beneficiary, sectionHeaderText) {
        if (beneficiary.length > 0) {
          return [{
            "lblBeneficiaryType": "" + sectionHeaderText.text + "(" + beneficiary.length + ")",
            "lblSeparator": ".",
            "flxSelectAllAction": {
              "onClick": scopeObj.OnClickSelectAll.bind(scopeObj),
              "isVisible": true
            },
            "lblSelectAll": {
              "text": scopeObj.checkStatus(beneficiary),
            },
            "flxEditBeneficiaries": {
              "isVisible": sectionHeaderText.status, 
            },
            "flxHeaderBottomSeperator": {
              "isVisible": sectionHeaderText.status,
            },
            "imgSortCurrency": {
              "src": ViewConstants.IMAGES.SORT_FINAL_IMAGE,
            },
            "imgSortBeneficiaryName": {
              "src": ViewConstants.IMAGES.SORT_FINAL_IMAGE,
            },
            "imgSortAmount": {
              "src": ViewConstants.IMAGES.SORT_FINAL_IMAGE,
            },
            "imgSortFees": {
              "src": ViewConstants.IMAGES.SORT_FINAL_IMAGE,
            },
            "flxBeneficiaryName": {
              "onClick": scopeObj.sortByExistingBenName,
              "isVisible": true
            },
            "flxCurrency": {
              "onClick": scopeObj.sortByExistingCurrency,
              "left": flxCurrencyLeft ,
              "width":  flxCurrencyWidth,
              "isVisible": true
            },
            "flxAmount": {
              "onClick": scopeObj.sortByExistingAmount,
              "isVisible": true
            },
            "flxFeesPaid": {
              "onClick": scopeObj.sortByExistingFeesPaidBy,
              "isVisible": true
            },
          },
          beneficiary.map(scopeObj.createRecipientTemplateSegmentModel.bind(this, changedAmount, changedPaymentRef, isEditFlow, isDelete))
          ];
        }
      };
      var domesticSection = createSegmentSection(data.filter(this.isDomestic), {
        "text": kony.i18n.getLocalizedString("i18n.payments.domesticBeneficiaries"),
        "skin": ViewConstants.SKINS.BULKPAYMENTS_SECTION_SKIN,
                "status": isEditFlow,
      });
      var internationalSection = createSegmentSection(data.filter(this.isInternational), {
        "text": kony.i18n.getLocalizedString("i18n.payments.internationalBeneficiaries"),
        "skin": ViewConstants.SKINS.BULKPAYMENTS_SECTION_SKIN,
                "status": isEditFlow,
      });
      var sameBankSection = createSegmentSection(data.filter(this.isSameBank), {
        "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank"),
        "skin": ViewConstants.SKINS.BULKPAYMENTS_SECTION_SKIN,
                "status": isEditFlow,
      });
      var transactionsExistInSection = function(section) {
        if (section) {
          return section[1] && section[1].length && section[1].length > 0;
        }
      };
      var seperatorStatus = function (section){
        if (section && section[1] && section[1].length && section[1].length > 0) {
          var length = section[1].length;
          for(var index =0; index <length; index++){
            if(index === length-1 ){
              section[1][index]["flxBottomSeperator"].isVisible = false;
            }
            else
              section[1][index]["flxBottomSeperator"].isVisible = true; 
          }
        }
      };

      seperatorStatus(domesticSection);
      seperatorStatus(internationalSection);
      seperatorStatus(sameBankSection);
      this.view.TabBodyNewBeneficiaries.segTemplates.widgetDataMap = {
        "flxDropDownImg": "flxDropDownImg",
        "lblDropdown": "lblDropdown",
        "imgFlxSeperator": "imgFlxSeperator",
        "lblBeneficiaryType": "lblBeneficiaryType",
        "flxBeneficiaryType": "flxBeneficiaryType",
        "lblBeneficiary": "lblBeneficiary",
        "listCurrency": "listCurrency",
        "tbxAmount": "tbxAmount",
        "listFeesPaidBy": "listFeesPaidBy",
        "flxStatus": "flxStatus",
        "lblCheckStatus": "lblCheckStatus",
        "flxCurrency": "flxCurrency",
        "lblSeparator": "lblSeparator",
        "lblAccountNumber": "lblAccountNumber",
        "lblAccountNumberValue": "lblAccountNumberValue",
        "lblSwift": "lblSwift",
        "lblSwiftValue": "lblSwiftValue",
        "lblPaymentRef": "lblPaymentRef",
        "lblPaymentRefValue": "lblPaymentRefValue",
        "tbxPaymentReference": "tbxPaymentReference",
        "lblPaymentRefValidDescription": "lblPaymentRefValidDescription",
        "lblNickName": "lblNickName",
        "lblNickNameValue": "lblNickNameValue",
        "lblSelectAll": "lblSelectAll",
        "flxSelectAllAction": "flxSelectAllAction",
        "lblSelectAllAction": "lblSelectAllAction",
        "lblCurrency": "lblCurrency",
        "lblAmount": "lblAmount",
        "lblFeesPaidBy": "lblFeesPaidBy",
        "flxBeneficiaryDetails": "flxBeneficiaryDetails",
        "flxEditBeneficiariesRowHeader":"flxEditBeneficiariesRowHeader",
        "flxBeneficiaryInfo": "flxBeneficiaryInfo",
        "flxEditBeneficiaryHeader": "flxEditBeneficiaryHeader",
        "lblBeneficiaryIcon": "lblBeneficiaryIcon",
        "flxEditBeneficiaries": "flxEditBeneficiaries",
        "flxBeneficiaryName": "flxBeneficiaryName",
        "flxAmount": "flxAmount",
        "flxFeesPaid": "flxFeesPaid",
        "imgSortBeneficiaryName": "imgSortBeneficiaryName",
        "imgSortCurrency": "imgSortCurrency",
        "imgSortAmount": "imgSortAmount",
        "imgSortFees": "imgSortFees",
        "flxDetailsHighlighter": "flxDetailsHighlighter",
        "flxBottomSeperator": "flxBottomSeperator",
        "flxHeaderBottomSeperator": "flxHeaderBottomSeperator",
        "flxTopSeperator": "flxTopSeperator",
      };
      var domesticCount = (domesticSection && domesticSection[1]) ? domesticSection[1].length : 0;
      var internationalCount = (internationalSection && internationalSection[1]) ? internationalSection[1].length : 0;
      var sameBankCount = (sameBankSection && sameBankSection[1]) ? sameBankSection[1].length : 0;
      var totalBeneficiaries = domesticCount + internationalCount + sameBankCount;
      this.view.lblCount.text = "(" + (domesticCount + internationalCount + sameBankCount + "") + ")";
            this.view.lblTotalBeneficiaries.text = totalBeneficiaries + "";
            this.view.lblDomestic.text = domesticCount + "";
            this.view.lblInternational.text = internationalCount + "";
			this.view.lblInternal.text = sameBankCount + "";
      if (totalBeneficiaries === 0) {
        this.showNoRecordsView();
      } else {
        this.view.flxNoRecipients.isVisible = false;
        this.view.flxSegment.setVisibility(true);
        this.view.TabBodyNewBeneficiaries.setVisibility(true);
        this.view.TabBodyNewBeneficiaries.segTemplates.setData([domesticSection, internationalSection, sameBankSection].filter(transactionsExistInSection));
      }
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    sortSegData : function(segWidget, headerSortImage, allHeaderSortImages, widgetName, dataType, sortOrder,segDetails){
      let sectionIndex = segDetails.sectionIndex;
      var sectionData = segWidget.data[sectionIndex]
      const mainSortImg = sortOrder === "Asc" ? "bbsortingasc.png" : "bbsortingdesc.png";
      const otherSortImg = "bbsortingdefault.png";
      const SortingFunction = {
        sortbyNumberDesc: function(x, y) {
            return y[widgetName] - x[widgetName];
        },
        sortbyNumberAsc: function(x, y) {
            return x[widgetName] - y[widgetName];
        },
        sortbyAmountDesc: function(x, y) {
            var a = CommonUtilities.getFloatValueOfCurrency(x[widgetName]);
            var b = CommonUtilities.getFloatValueOfCurrency(y[widgetName]);
            return b - a;
        },
        sortbyAmountAsc: function(x, y) {
            var a = CommonUtilities.getFloatValueOfCurrency(x[widgetName]);
            var b = CommonUtilities.getFloatValueOfCurrency(y[widgetName]);
            return a - b;
        },
        sortbyStringAsc: function(x, y) {
            return x[widgetName] == y[widgetName] ? 0 : x[widgetName] > y[widgetName] ? 1 : -1;
        },
        sortbyStringDesc: function(x, y) {
            return x[widgetName] == y[widgetName] ? 0 : y[widgetName] > x[widgetName] ? 1 : -1;
        },
        sortbyDateAsc: function(x, y) {
            return new Date(x[widgetName]).getTime() - new Date(y[widgetName]).getTime();
        },
        sortbyDateDesc: function(x, y) {
            return new Date(y[widgetName]).getTime() - new Date(x[widgetName]).getTime();
        },
        sortbyObjectTextAsc: function(x, y) {
            return x[widgetName].text.toLowerCase() == y[widgetName].text.toLowerCase() ? 0 : x[widgetName].text.toLowerCase() > y[widgetName].text.toLowerCase() ? 1 : -1;
        },
        sortbyObjectTextDesc: function(x, y) {
            return x[widgetName].text.toLowerCase() == y[widgetName].text.toLowerCase() ? 0 : y[widgetName].text.toLowerCase() > x[widgetName].text.toLowerCase() ? 1 : -1;
        },
        sortbyObjectSelectedKeyAsc: function(x, y) {
            return x[widgetName].selectedKey.toLowerCase() == y[widgetName].selectedKey.toLowerCase() ? 0 : x[widgetName].selectedKey.toLowerCase() > y[widgetName].selectedKey.toLowerCase() ? 1 : -1;
        },
        sortbyObjectSelectedKeyDesc: function(x, y) {
            return x[widgetName].selectedKey.toLowerCase() == y[widgetName].selectedKey.toLowerCase() ? 0 : y[widgetName].selectedKey.toLowerCase() > x[widgetName].selectedKey.toLowerCase() ? 1 : -1;
        },
        sortbyObjectNumberAsc: function(x, y) {
            return x[widgetName].text - y[widgetName].text;
        },
        sortbyObjectNumberDesc: function(x, y) {
            return y[widgetName].text - x[widgetName].text;
        },
        sortbyObjectTooltipAsc: function(x, y) {
            if (!kony.sdk.isNullOrUndefined(x[widgetName].toolTip) && !kony.sdk.isNullOrUndefined(y[widgetName].toolTip)) {
                return x[widgetName].toolTip.toLowerCase() === y[widgetName].toolTip.toLowerCase() ? 0 : x[widgetName].toolTip.toLowerCase() > y[widgetName].toolTip.toLowerCase() ? 1 : -1;
            }
            return x[widgetName] == y[widgetName] ? 0 : x[widgetName] > y[widgetName] ? 1 : -1;
        },
        sortbyObjectTooltipDesc: function(x, y) {
            if (!kony.sdk.isNullOrUndefined(x[widgetName].toolTip) && !kony.sdk.isNullOrUndefined(y[widgetName].toolTip)) {
                return x[widgetName].toolTip.toLowerCase() === y[widgetName].toolTip.toLowerCase() ? 0 : y[widgetName].toolTip.toLowerCase() > x[widgetName].toolTip.toLowerCase() ? 1 : -1;
            }
            return x[widgetName] == y[widgetName] ? 0 : y[widgetName] > x[widgetName] ? 1 : -1;
        },
      };
      const funcName = "sortby" + dataType + sortOrder;
      for (let imageNo = 0; imageNo < allHeaderSortImages.length; imageNo++) {
          sectionData[0][allHeaderSortImages[imageNo]].src = otherSortImg;
      }
      sectionData[0][headerSortImage].src = mainSortImg;
      sectionData[1].sort(SortingFunction[funcName]);
      segWidget.setSectionAt(sectionData,sectionIndex);
    },
    sortByExistingBenName : function(clickedWidget,segDetails){
      if (this.sortedByExisting === "nameAsc"+segDetails.sectionIndex) {
        this.sortSegData(this.view.TabBodyNewBeneficiaries.segTemplates ,"imgSortBeneficiaryName", ["imgSortCurrency","imgSortBeneficiaryName","imgSortAmount","imgSortFees"], "lblBeneficiary", "ObjectText", "Desc",segDetails);
        this.sortedByExisting = "nameDesc"+segDetails.sectionIndex;
      }else{
        this.sortSegData(this.view.TabBodyNewBeneficiaries.segTemplates ,"imgSortBeneficiaryName", ["imgSortCurrency","imgSortBeneficiaryName","imgSortAmount","imgSortFees"], "lblBeneficiary", "ObjectText", "Asc",segDetails);
        this.sortedByExisting = "nameAsc"+segDetails.sectionIndex;
      }
    },
    sortByExistingCurrency : function(clickedWidget,segDetails){
      if (this.sortedByExisting === "currencyAsc"+segDetails.sectionIndex) {
        this.sortSegData(this.view.TabBodyNewBeneficiaries.segTemplates ,"imgSortCurrency", ["imgSortCurrency","imgSortBeneficiaryName","imgSortAmount","imgSortFees"], "listCurrency", "ObjectSelectedKey", "Desc",segDetails);
        this.sortedByExisting = "currencyDesc"+segDetails.sectionIndex;
      }else{
        this.sortSegData(this.view.TabBodyNewBeneficiaries.segTemplates ,"imgSortCurrency", ["imgSortCurrency","imgSortBeneficiaryName","imgSortAmount","imgSortFees"], "listCurrency", "ObjectSelectedKey", "Asc",segDetails);
        this.sortedByExisting = "currencyAsc"+segDetails.sectionIndex;
      }
    },
    sortByExistingAmount : function(clickedWidget,segDetails){
      if (this.sortedByExisting === "amountAsc"+segDetails.sectionIndex) {
        this.sortSegData(this.view.TabBodyNewBeneficiaries.segTemplates ,"imgSortAmount", ["imgSortCurrency","imgSortBeneficiaryName","imgSortAmount","imgSortFees"], "tbxAmount", "ObjectText", "Desc",segDetails);
        this.sortedByExisting = "amountDesc"+segDetails.sectionIndex;
      }else{
        this.sortSegData(this.view.TabBodyNewBeneficiaries.segTemplates ,"imgSortAmount", ["imgSortCurrency","imgSortBeneficiaryName","imgSortAmount","imgSortFees"], "tbxAmount", "ObjectText", "Asc",segDetails);
        this.sortedByExisting = "amountAsc"+segDetails.sectionIndex;
      }
    },
    sortByExistingFeesPaidBy : function(clickedWidget,segDetails){
      if (this.sortedByExisting === "feesPaidByAsc"+segDetails.sectionIndex) {
        this.sortSegData(this.view.TabBodyNewBeneficiaries.segTemplates ,"imgSortFees", ["imgSortCurrency","imgSortBeneficiaryName","imgSortAmount","imgSortFees"], "listFeesPaidBy", "ObjectSelectedKey", "Desc",segDetails);
        this.sortedByExisting = "feesPaidByDesc"+segDetails.sectionIndex;
      }else{
        this.sortSegData(this.view.TabBodyNewBeneficiaries.segTemplates ,"imgSortFees", ["imgSortCurrency","imgSortBeneficiaryName","imgSortAmount","imgSortFees"], "listFeesPaidBy", "ObjectSelectedKey", "Asc",segDetails);
        this.sortedByExisting = "feesPaidByAsc"+segDetails.sectionIndex;
      }
    },
    removeSelectedBeneficiary: function() {
      this.view.flxCancelPopup.setVisibility(false);
      if (this.templateFlow === "createTemplate" || this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
        for (var index = 0; index < this.selectedBeneficiaries.length; index++) {
          if (this.selectedBeneficiaries[index].status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
            this.selectedBeneficiaries[index].status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.selectedBeneficiaries.splice(index, 1);
            index--;
          }
        }
      } else {
        for (var index = 0; index < this.beneficiaryData.length; index++) {
          if (this.beneficiaryData[index].status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
            this.beneficiaryData[index].status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.removedBeneficiaryData.push(this.beneficiaryData[index]);
            this.beneficiaryData.splice(index, 1);
            index--;
          }
        }
      }	 
    },
    
    updateBeneficiaryRecords: function() {
      var self = this;
      var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
      var domesticData = [];
      if (data && data[0]) {
        domesticData = data[0][1];
      }
      var internationalData = [];
      if (data && data[1]) {
        internationalData = data[1][1];
      }
      var sameBankData = [];
      if (data && data[2]) {
        sameBankData = data[2][1];
      }
      domesticData.forEach(function(obj) {
        self.beneficiaryData.forEach(function(record) {
          if (obj.beneficiaryId === record.beneficiaryId) {
            record.currency = obj.listCurrency.selectedKey;
            record.amount = obj.tbxAmount.text;
            record.feesPaidBy = obj.listFeesPaidBy;
            record.paymentReference = kony.sdk.isNullOrUndefined(obj.lblPaymentRefValue.text) ? obj.tbxPaymentReference : obj.lblPaymentRefValue.text;
            record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          }
        });
      });
      internationalData.forEach(function(obj) {
        self.beneficiaryData.forEach(function(record) {
          if (obj.beneficiaryId === record.beneficiaryId) {
            record.currency = obj.listCurrency.selectedKey;
            record.amount = obj.tbxAmount.text;
            record.feesPaidBy = obj.listFeesPaidBy;
            record.paymentReference = kony.sdk.isNullOrUndefined(obj.lblPaymentRefValue.text) ? obj.tbxPaymentReference : obj.lblPaymentRefValue.text;
            record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          }
        });
      });
      sameBankData.forEach(function(obj) {
        self.beneficiaryData.forEach(function(record) {
          if (obj.beneficiaryId === record.beneficiaryId) {
            record.currency = obj.listCurrency.selectedKey;
            record.amount = obj.tbxAmount.text;
            record.feesPaidBy = obj.listFeesPaidBy;
            record.paymentReference = kony.sdk.isNullOrUndefined(obj.lblPaymentRefValue.text) ? obj.tbxPaymentReference : obj.lblPaymentRefValue.text;
            record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          }
        });
      });
      return self.beneficiaryData;
    },
    
    toggleEditBeneficiarytTemplateView: function() {
      this.view.flxNoRecipients.isVisible = false;
      var isSelected = this.view.lblStatus.text;
      if (!this.isRecordSelected() && isSelected === this.switch_ActionOff) {
        this.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.noRecSelected");
        this.view.flxError.setVisibility(true);
      } else {
        this.view.flxError.setVisibility(false);
        if (isSelected === this.switch_ActionOff) {
          var currentSelectedRecords = [];
          var data;
          if (this.templateFlow === "createTemplate" || this.templateFlow === "View Templates") data = this.selectedBeneficiaries;
          else data = this.beneficiaryData;
          if (this.searchResult.length > 0) {
            data = this.searchResult;
          }
          currentSelectedRecords = data.filter(this.selectedRecords);
          this.view.lblStatus.text = this.switch_ActionOn;
          this.view.lblStatus.skin = ViewConstants.SKINS.SWITCH_ON;
          FormControllerUtility.showProgressBar(this.view);
          this.setTemplatebeneficiaryData(currentSelectedRecords, null, null, true, false);
        } else {
          this.view.lblStatus.text = this.switch_ActionOff;
          this.view.lblStatus.skin = ViewConstants.SKINS.SWITCH_OFF;
          var data;
          if (this.templateFlow === "createTemplate" || this.templateFlow === "View Templates") data = this.selectedBeneficiaries;
          else data = this.beneficiaryData;
          if (this.view.tbxSearchBox.text && this.view.tbxSearchBox.text.length() > 0) {
            data = this.searchResult;
          }
          FormControllerUtility.showProgressBar(this.view);
          this.setTemplatebeneficiaryData(data, null, null, true, false);
        }
      }
    },

    createRecipientTemplateSegmentModel: function(changedAmount, changedRef, editFlow, deleteFlow, beneficiaryData) {
      var self = this;
      var sameBank = this.isSameBank(beneficiaryData);
      var masterDataFeespaidBy = [
        ["-", "-"],
        ["Me", "Me"],
        ["Beneficiary", "Beneficiary"],
        ["Shared", "Shared"],
      ];
      var formatManager = applicationManager.getFormatUtilManager();
      var currencySymbol = formatManager.getCurrencySymbol(kony.sdk.isNullOrUndefined(beneficiaryData.currency) ? this.templateDetails.currency : beneficiaryData.currency);
      var fees = kony.sdk.isNullOrUndefined(beneficiaryData.feesPaidBy.selectedKey) ? beneficiaryData.feesPaidBy : beneficiaryData.feesPaidBy.selectedKey;
      var paymentRef = false;
            if (this.templateFlow === "createTemplate" || this.isEdit === true) paymentRef = true;
      var currencyList = this.masterDataCurrency;
      var paymentRefVal = kony.sdk.isNullOrUndefined(beneficiaryData.paymentReference) ? "" : beneficiaryData.paymentReference;
      var defaultCurrency;
      if(this.templateFlow === "View Templates" && kony.sdk.isNullOrUndefined(this.view.lstbDefaultCurrency.selectedKey)){
          this.view.lstbDefaultCurrency.selectedKey = formatManager.getCurrencySymbol(this.templateDetails.currency);
      }
      defaultCurrency = kony.sdk.isNullOrUndefined(this.view.lstbDefaultCurrency.selectedKey) ? currencySymbol : this.view.lstbDefaultCurrency.selectedKey;
      var currencyValue = formatManager.getCurrencySymbolCode(kony.sdk.isNullOrUndefined(this.view.lstbDefaultCurrency.selectedKey) ? currencySymbol: this.view.lstbDefaultCurrency.selectedKey);
      if(!currencyValue) currencyValue = "-";
      var break_point = kony.application.getCurrentBreakpoint();
      var centerXVal;
      var lblCurrencyLeft;
      var SwiftLeft;
      var lblAmountCenterx;
      var flxCurrencyRowLeft;
      var lblfeesLeft;
      var lblBeneficiaryleft;
	  var lblBeneficiarywidth;
      var  batchType =true;
      if ((kony.sdk.isNullOrUndefined(this.templateDetails.processingMode) ? this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() : this.templateDetails.processingMode.toUpperCase()) === 'SINGLE') {
        batchType =false;
      }
      if (this.templateFlow == "createTemplate") {
        if ((kony.sdk.isNullOrUndefined(this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase()) ? this.templateDetails.processingMode : this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase()) === 'SINGLE') {
          batchType = false;
        } 
      }
      if (kony.os.deviceInfo().screenWidth < 1024 && ((break_point <= 1024 || orientationHandler.isTablet))) {
        centerXVal = "75%";
        lblCurrencyLeft = "23%";
        SwiftLeft = "31.9%";
        flxCurrencyRowLeft = "1%";
        lblBeneficiaryleft = "1%";
	    lblBeneficiarywidth = "20%";
        lblAmountCenterx = "-7%";
	 	lblfeesLeft = "18%";
      }
      else if(break_point <= 1024 || orientationHandler.isTablet){
        centerXVal = "56%";
        lblCurrencyLeft = "0%";
        SwiftLeft = "25.9%";
        lblBeneficiaryleft = "0.5%";
	    lblBeneficiarywidth = "14.6%";
        lblAmountCenterx = "-3%";
		lblfeesLeft = "8%";
      }
      else if(break_point>1024){
        centerXVal = "48%";
        lblCurrencyLeft = "0%";
        SwiftLeft = "25.9%";
        flxCurrencyRowLeft = "70px";
	    lblBeneficiaryleft = "0.5%";
	    lblBeneficiarywidth = "14.6%";
        lblAmountCenterx = "-9%";
		lblfeesLeft = "7%";
	  }
      else{
        centerXVal ="50%";
        lblCurrencyLeft = "10%";
        SwiftLeft = "25.9%";
        lblBeneficiaryleft = "1%";
	    lblBeneficiarywidth = "20%";
        lblAmountCenterx = "-9%";
		lblfeesLeft = "18%";
      }
      return {
        "lblBeneficiary": {
          "text": beneficiaryData.beneficiaryName,
          "left":lblBeneficiaryleft,
		  "width":lblBeneficiarywidth,
        },
        "listFeesPaidBy": {
          "isVisible": !sameBank && editFlow,
          "masterData": masterDataFeespaidBy,
          "selectedKey": fees,
          "onSelection": self.onFeesPaidBySelection.bind(this, beneficiaryData)
        },
        "listCurrency": {
          "isVisible": batchType && editFlow,
          "masterData": currencyList,
          "selectedKey": kony.sdk.isNullOrUndefined(beneficiaryData.currency) || beneficiaryData.currency === "-" ? currencyValue : beneficiaryData.currency,
          "onSelection": self.onCurrencySelection.bind(this, beneficiaryData)
        },
        "tbxAmount": {
          "isVisible": editFlow,
          "text": (changedAmount && beneficiaryData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? CommonUtilities.formatCurrencyWithCommas(changedAmount, true) : (beneficiaryData.amount !== "") ? CommonUtilities.formatCurrencyWithCommas(beneficiaryData.amount, true) : "",
          "onKeyUp": self.onAmountFilling.bind(this, beneficiaryData)
        },
        "lblCheckStatus": {
          "isVisible": editFlow || deleteFlow,
          "centerX" : centerXVal,
          "text": kony.sdk.isNullOrUndefined(beneficiaryData.status) ? OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED : beneficiaryData.status,
        },
        "selectAll": {
          "text": kony.sdk.isNullOrUndefined(beneficiaryData.status) ? OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED : beneficiaryData.status,
        },
        "lblAccountNumber": {
          "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
        },
        "lblAccountNumberValue": {
          "text": !kony.sdk.isNullOrUndefined(beneficiaryData.fromAccount) ? beneficiaryData.fromAccount : !kony.sdk.isNullOrUndefined(beneficiaryData.accountNumber) ? beneficiaryData.accountNumber : "undefined",
        },
        "lblSwift": {
          "text": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
           "left": SwiftLeft,
        },
        "lblSwiftValue": {
          "text": !kony.sdk.isNullOrUndefined(beneficiaryData.swift) ? beneficiaryData.swift : !kony.sdk.isNullOrUndefined(beneficiaryData.swiftCode) ? beneficiaryData.swiftCode : "-",
           "left": SwiftLeft,
        },
        "flxCurrency": {
          "left": flxCurrencyRowLeft,
        },
        "lblPaymentRef": {
          "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference"),
        },
        "lblPaymentRefValue": {
          "isVisible": !paymentRef,
          "text": (changedRef && beneficiaryData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? changedRef : paymentRefVal,
        },
        "tbxPaymentReference": {
          "isVisible": paymentRef,
          "text": paymentRef === true ? (changedRef && beneficiaryData.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) ? changedRef : paymentRefVal :"",
          "onEndEditing": self.onPaymentRefFilling.bind(this, beneficiaryData),
          "onDone": self.onPaymentRefFilling.bind(this, beneficiaryData)
        },
        "lblPaymentRefValidDescription": {
          "isVisible": paymentRef,
          "text":  kony.i18n.getLocalizedString("i18n.kony.bulkPayments.validDescription"),
        },
        "lblNickName": {
          "text": kony.i18n.getLocalizedString("i18n.PayPerson.nickName"),
        },
        "lblNickNameValue": {
          "text": !kony.sdk.isNullOrUndefined(beneficiaryData.nickName) ? beneficiaryData.nickName : "undefined",
        },
        "beneficiaryId": beneficiaryData.beneficiaryId,
        "flxStatus": {
          "onClick": this.toggleTemplateCheckBox.bind(this)
        },
        "lblFeesPaidBy": {
          "isVisible": sameBank || (!editFlow),
          "text": editFlow === false ? fees : "-",
          "left": lblfeesLeft,
        },
        "lblCurrency": {
          "isVisible": !batchType || !editFlow,
          "text": !kony.sdk.isNullOrUndefined(formatManager.getCurrencySymbol(beneficiaryData.currency)) &&  formatManager.getCurrencySymbol(beneficiaryData.currency)!== "-" ? formatManager.getCurrencySymbol(beneficiaryData.currency) : (kony.sdk.isNullOrUndefined(defaultCurrency) ? "-" : defaultCurrency),
           "left": lblCurrencyLeft,
        },
        "lblAmount": {
          "isVisible": !editFlow,
          "centerX" :lblAmountCenterx,
          "text": CommonUtilities.formatCurrencyWithCommas(beneficiaryData.amount, true),
        },
        "imgDropDown": {
          "skin": ViewConstants.SKINS.DRP_DWN_OTHER,
          "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN
        },
        "flxDropDownImg": {
          "onClick": this.onClickToggle,
        },
        "lblDropdown": {
          "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
          "isVisible": true
        },
        "flxBeneficiaryDetails": {
          "isVisible": false,
        },
        "flxEditBeneficiariesRowHeader": {
          "isVisible": true
        },
        "flxEditBeneficiaryHeader": {
          "isVisible": true
        },
        "flxBeneficiaryInfo": {
          "isVisible": true
        },
        "flxDetailsHighlighter": {
          "isVisible": false,
        },
        "flxBottomSeperator": {
          "isVisible": true,
        },
        "flxTopSeperator" : {
          "isVisible": false
        },
      };
    },
    
    navigateToViewTemplates: function() {
      this.bulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsDashboard", BBConstants.BULKPAYMENT_VIEW_TEMPLATES);
    },
     
    OnClickSelectAll: function() {
      var index = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.selectedRowIndex;
      var sectionIndex = index[0];
      var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
      if (data[sectionIndex][1]) {
        if (data[sectionIndex][0].lblSelectAll.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
          this.changeAllStatus(OLBConstants.FONT_ICONS.CHECBOX_SELECTED, data[sectionIndex][1]);
        } else {
          this.view.lblStatus.text = this.switch_ActionOff;
          this.changeAllStatus(OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED, data[sectionIndex][1]);
        }
        var data;
        if (this.view.lblStatus.text === this.switch_ActionOn) {
                    if (this.templateFlow === "createTemplate") data = this.selectedBeneficiaries.filter(this.selectedRecords);
          else data = this.beneficiaryData.filter(this.selectedRecords);
        } else {
                    if (this.templateFlow === "createTemplate" || this.view.lblContentHeader.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateAddPaymentInformation")) data = this.selectedBeneficiaries;
          else data = this.beneficiaryData;
        }
        FormControllerUtility.showProgressBar(this.view);
        this.setTemplatebeneficiaryData(data, null, null, true, false);
        this.enableDisableApply();
        this.enableDisableApplyForTemplate();
      }
    },
    
    changeAllStatus: function(currentStatus, data) {
      var self = this;
      if (this.templateFlow === "createTemplate" || this.view.lblContentHeader.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateAddPaymentInformation")) {
        data.forEach(function(item) {
          for (var index = 0; index < self.beneficiaryData.length; index++) {
            if (item.beneficiaryId === self.selectedBeneficiaries[index].beneficiaryId && item.lblBeneficiary.text === self.selectedBeneficiaries[index].beneficiaryName){
              self.selectedBeneficiaries[index].status = currentStatus;
              self.selectedBeneficiaries[index].selectAll = currentStatus;
              break;
            }
          }
        });
      } else {
        data.forEach(function(item) {
          for (var index = 0; index < self.beneficiaryData.length; index++) {
            if (item.beneficiaryId === self.beneficiaryData[index].beneficiaryId && item.lblBeneficiary.text === self.beneficiaryData[index].beneficiaryName ){
              self.beneficiaryData[index].status = currentStatus;
              self.beneficiaryData[index].selectAll = currentStatus;
              break;
            }
          }
        });
      }
    },
    
    toggleTemplateCheckBox: function() {
      var index = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.selectedRowIndex;
      var sectionIndex = index[0];
      var rowIndex = index[1];
      var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
      if (data[sectionIndex][1][rowIndex].lblCheckStatus.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
        this.updateRecordStatus(data[sectionIndex][1][rowIndex].beneficiaryId, OLBConstants.FONT_ICONS.CHECBOX_SELECTED);
        data[sectionIndex][1][rowIndex].lblCheckStatus.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
      } else {
        this.updateRecordStatus(data[sectionIndex][1][rowIndex].beneficiaryId, OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
        data[sectionIndex][1][rowIndex].lblCheckStatus.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        data[sectionIndex][1][rowIndex].selectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        data[sectionIndex][0].lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.setData(data);
      }
      kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
      var buttonStatus = this.isRecordSelected();
      if (buttonStatus) {
        CommonUtilities.enableButton(this.view.btnApplyChanges);
        CommonUtilities.enableButton(this.view.btnApplyBeneficiaryChange);
      } else {
        CommonUtilities.disableButton(this.view.btnApplyChanges);
        CommonUtilities.disableButton(this.view.btnApplyBeneficiaryChange);
      }
      if (this.view.lblStatus.text === this.switch_ActionOn) {
                if (this.templateFlow === "createTemplate")
                    data = this.selectedBeneficiaries.filter(this.selectedRecords);
        else  data = this.beneficiaryData.filter(this.selectedRecords);
        FormControllerUtility.showProgressBar(this.view);
                this.setTemplatebeneficiaryData(data, null, null, true, false);
      }
      this.enableDisableApply();
    },
          
    showNoRecordsView: function() {
      this.view.flxNoRecipients.isVisible = true;
      this.view.flxSegment.isVisible = false;
            kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data = [];
      this.view.forceLayout();
    },
    
    onAmountFilling: function(beneficiary, widget) {
      for (var index = 0; index < this.beneficiaryData.length; index++) {
        if (this.beneficiaryData[index].beneficiaryId === beneficiary.beneficiaryId && beneficiary.beneficiaryName === this.beneficiaryData[index].beneficiaryName ){
          this.beneficiaryData[index].amount = widget.text;
          FormControllerUtility.wrapAmountField( widget).onKeyUp(this.validateAmountFormat);
		  widget.onKeyUp = this.onAmountFilling.bind(this, beneficiary);
          break;
        }
      }
      if (this.templateFlow === "createTemplate") {
        for (var index = 0; index < this.selectedBeneficiaries.length; index++) {
          if (beneficiary.beneficiaryId === this.selectedBeneficiaries[index].beneficiaryId && beneficiary.beneficiaryName === this.selectedBeneficiaries[index].beneficiaryName ) {
            this.selectedBeneficiaries[index].amount = widget.text;
            break;
          }
        }
      }
    },
    
    onPaymentRefFilling: function(beneficiary, widget) {
      var text = widget;
      var expression =  /^[ A-Za-z0-9-.,'?+:/()]*$/;
      if (expression.test(widget.text)) {
        this.view.flxError.setVisibility(false);
        widget.skin = ViewConstants.SKINS.BULKPAYMENTS_TEXTBOX_GREYED;
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      } else {
        this.view.flxError.setVisibility(true);
        this.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.bulkPayments.invalidDescription");
        widget.skin = ViewConstants.SKINS.BORDER;
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      }
      for (var index = 0; index < this.beneficiaryData.length; index++) {
        if (this.beneficiaryData[index].beneficiaryId === beneficiary.beneficiaryId && beneficiary.beneficiaryName === this.beneficiaryData[index].beneficiaryName ){
          this.beneficiaryData[index].paymentReference = widget.text;
          break;
        }
      }
      if (this.templateFlow === "createTemplate") {
        for (var index = 0; index < this.selectedBeneficiaries.length; index++) {
          if (beneficiary.beneficiaryId === this.selectedBeneficiaries[index].beneficiaryId && beneficiary.beneficiaryName === this.selectedBeneficiaries[index].beneficiaryName){
            var sectionRefIndex = 0;
            var rowRefIndex = 1;
            var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
            if(this.view.flxError.isVisible === true) {
            data[sectionRefIndex][rowRefIndex][index].lblPaymentRefValidDescription.isVisible = false;
            kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.setDataAt(data[sectionRefIndex][rowRefIndex][index], index, sectionRefIndex);
            } else {
            data[sectionRefIndex][rowRefIndex][index].lblPaymentRefValidDescription.isVisible = true;
            kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.setDataAt(data[sectionRefIndex][rowRefIndex][index], index, sectionRefIndex); 
            }
            this.selectedBeneficiaries[index].paymentReference = widget.text;
            break;
          }
        }
      }
    },
    
    onCurrencySelection: function(beneficiary, widget) {
      for (var index = 0; index < this.beneficiaryData.length; index++) {
        if (this.beneficiaryData[index].beneficiaryId === beneficiary.beneficiaryId && beneficiary.beneficiaryName === this.beneficiaryData[index].beneficiaryName ){
          this.beneficiaryData[index].currency = widget.selectedKeyValue[0];
          break;
        }
      }
      if (this.templateFlow === "createTemplate") {
        for (var index = 0; index < this.selectedBeneficiaries.length; index++) {
          if (beneficiary.beneficiaryId === this.selectedBeneficiaries[index].beneficiaryId && beneficiary.beneficiaryName === this.selectedBeneficiaries[index].beneficiaryName ){
            this.selectedBeneficiaries[index].currency = widget.selectedKeyValue[0];
            break;
          }
        }
      }
    },
    
    onFeesPaidBySelection: function(beneficiary, widget) {
      for (var index = 0; index < this.beneficiaryData.length; index++) {
        if (this.beneficiaryData[index].beneficiaryId === beneficiary.beneficiaryId &&  beneficiary.beneficiaryName === this.beneficiaryData[index].beneficiaryName){
          this.beneficiaryData[index].feesPaidBy = widget.selectedKeyValue[0];
          break;
        }
      }
     if ((this.templateFlow === "createTemplate") || (this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES)) {
        for (var index = 0; index < this.selectedBeneficiaries.length; index++) {
          if (beneficiary.beneficiaryId === this.selectedBeneficiaries[index].beneficiaryId && beneficiary.beneficiaryName === this.selectedBeneficiaries[index].beneficiaryName){
            this.selectedBeneficiaries[index].feesPaidBy = widget.selectedKeyValue[0];
            break;
          }
        }
      }
    },
    
    getCurrencyforCreateRequest: function() {
      return applicationManager.getConfigurationManager().OLBConstants.BULKWIRETRANSFERCONSTANT.CURRENCIES;
    },
    
        getCurrencyList: function() {
      var currencyList = this.masterDataCurrency;
      for (var i = 0; i < currencyList.length; i++) {
        switch (currencyList[i][0]) {
                    case "USD":
                        currencyList[i][1] = "$ - USD";
                        break;
                    case "EUR":
                        currencyList[i][1] = "€ - EUR";
                        break;
                    case "INR":
                        currencyList[i][1] = "₹ - INR";
                        break;
                    case "GBP":
                        currencyList[i][1] = "£ - GBP";
                        break;
        }
      }
      return currencyList;
    },
    
    updateRecordStatus: function(beneficiaryId, currentStatus) {
      var self = this;
            if (this.templateFlow === "createTemplate") {
        for (var index = 0; index < self.beneficiaryData.length; index++) {
          if (beneficiaryId === self.selectedBeneficiaries[index].beneficiaryId) {
            self.selectedBeneficiaries[index].status = currentStatus;
            break;
          }
        }
        }
      	else if(this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES){
          for (var index = 0; index < self.beneficiaryData.length; index++) {
            if (beneficiaryId === self.selectedBeneficiaries[index].beneficiaryId) {
              self.selectedBeneficiaries[index].status = currentStatus;
              break;
			 }
           }
        } else {
        for (var index = 0; index < self.beneficiaryData.length; index++) {
          if (beneficiaryId === self.beneficiaryData[index].beneficiaryId) {
            self.beneficiaryData[index].status = currentStatus;
            break;
          }
        }
        for (var index = 0; index < self.removedBeneficiaryData.length; index++) {
          if (beneficiaryId === self.removedBeneficiaryData[index].beneficiaryId) {
            self.removedBeneficiaryData[index].status = currentStatus;
            break;
          }
        }
      }
    },
    
    selectedRecords: function(beneficiary) {
      return beneficiary.status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
    },
    
    setRemovedBeneficiariesView: function() {
      FormControllerUtility.showProgressBar(this.view);
      var scopeObj = this;
      scopeObj.resetUI();
      this.view.flxCreateBulkRequest.isVisible = true;
      this.view.flxViewAllRecipients.isVisible = true;
      this.view.flxSearch.isVisible = true;
      this.view.formActionsNew.isVisible = true;
      this.view.lblCount.isVisible = false;
      this.view.lblViewRemovedBeneficiaries.isVisible = false;
      this.view.flxSort.isVisible = true;
      this.view.flxSelectAll.isVisible = true;
      this.view.imgSortCurrency.isVisible = false;
      this.view.imgSortAmount.isVisible = false;
      this.view.imgSortFees.isVisible = false;
      this.view.imgSortName.isVisible = false;
      this.view.tbxSearchBox.onKeyUp = this.onBeneficiaryKeyUp.bind(this, this.removedBeneficiaryData, false, true);
      this.view.tbxSearchBox.onDone = this.onBeneficiarySearchDone.bind(this, this.removedBeneficiaryData, false, true);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkReqRemoved");
      this.view.lblSelectEdit.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.removedBeneficiaries");
      this.view.lblAddBeneficiariesText.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.selectandAddBeneficiaries");
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.readdBeneficiaries");
      this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.readdBeneficiaries");
      this.view.formActionsNew.btnNext.onClick = this.reAddSelectedBeneficiary.bind(this);
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.formActionsNew.btnCancel.onClick = this.invokeCreateBulkRequestView.bind(this);
      this.view.flxSelectAll.onClick = this.selectAllRemovedBeneficiaries.bind(this);
      this.setTemplatebeneficiaryData(this.removedBeneficiaryData, null, null, false, true);
      this.adjustScreen(0);
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },

        formatPaymentOrderRecords: function(paymentOrderData) {
            paymentOrderData.forEach(function(transaction) {
        transaction.amount = transaction.amount;
        transaction.feesPaidBy = transaction.feesPaidBy;
        transaction.lblAccountNoValue = transaction.accountNumber;
        transaction.lblPayRef = kony.i18n.getLocalizedString("i18n.TransfersEur.Nickname");
        transaction.lblSwiftCode =  kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryAddressMandatory");
        transaction.lblFees = kony.i18n.getLocalizedString("i18n.CheckImages.Bank");
        transaction.lblPaymentMethod = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMethod");
        transaction.lblAccTypeValue = transaction.swift;
        transaction.lblSwiftCodeValue = transaction.beneficiaryAddress;
        transaction.lblPayRefValue = transaction.beneficiaryNickName;
        transaction.lblFeesValue = transaction.bankName;
        transaction.lblPaymentMethodValue = {
          "isVisible": true,
          "text": transaction.accType
        };
        transaction.beneficiaryType = transaction.beneficiaryType;
      });
      return paymentOrderData;
    },
    
    setVerifyBulkRequestView: function() {
      FormControllerUtility.showProgressBar(this.view);
      this.resetUI();
      var self = this;
            
      this.view.flxCreateBulkRequest.isVisible = true;
      this.view.flxSummaryHeader.clipBounds = false;
	  this.view.flxSummaryHeaderSeparator.top = "30px";
      if (kony.os.deviceInfo().screenWidth <= 1024 && ((kony.application.getCurrentBreakpoint() <= 1024 || orientationHandler.isTablet))) this.view.flxSummaryHeaderSeparator.top = "15px";
      this.view.flxSummarySeparatorVerifyPage.isVisible = false;
      this.view.flxTabletAccountsSeparator.height = "1px";
      //this.view.tbxSearchBox1.placeholderSkin = "";
      this.view.tbxSearchBox1.text = "";
      this.view.flxSearch.isVisible = true;
      this.view.formActionsNew.isVisible = true;
      this.view.formActionsNew.btnOption.isVisible = true;
      this.view.flxSummary.isVisible = true;
      this.view.lblViewRemovedBeneficiaries.isVisible = false;
      this.view.flxDropdown.isVisible = false;
      this.view.flxEditSummary.isVisible = true;
      this.view.flxSort.isVisible = true;
      this.view.flxSelectAll.isVisible = false;
      this.view.imgSortCurrency.isVisible = true;
      this.view.imgSortAmount.isVisible = true;
      this.view.imgSortFees.isVisible = true;
      this.view.imgSortName.isVisible = false;
      this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkReqVerify");
      this.view.lblSelectEdit.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails") + " (" + this.templateDetails.totalBeneficiaries + ")";
      this.view.flxEditDetails.isVisible = true;
      this.view.flxEditDetails.onClick = this.onflxEditDetailsClick.bind(this);
      this.view.flxEditSummary.onClick = this.navigateToCreateTemplatePrimaryDetails.bind(this, this.templateDetails);
      this.view.flxEditSummary0.onClick = this.navigateToCreateTemplatePrimaryDetails.bind(this, this.templateDetails);
      this.view.flxCancelPopup.isVisible = false;
      var formatManager = applicationManager.getFormatUtilManager();
      var data;
      if (this.templateFlow === "createTemplate") {

        var flxActions = {
          "isVisible": false
        };
        this.newlyAddedBeneficiaries.forEach(function(item) {
          item.flxActions = flxActions;
        });
        this.selectedBeneficiaries.forEach(function(item) {
        item.flxActions = flxActions;
        });
        this.view.flxEditBeneficiary.isVisible = true;
        this.view.flxEditBeneficiary.onClick = this.editAddedBeneficiaries.bind(this);
        this.view.flxCreateBulkRequest.isVisible = false;
        this.view.flxBeneficiaryUI.isVisible = true;
        this.view.flxSummary1.isVisible = true;
        this.view.flxAddBeneficiaryOptions.isVisible = false;
        this.view.flxViewRecipients.isVisible = true;
        this.view.flxViewAction.isVisible = false;
        this.view.TabBodyNewAddedBen.setSectionData(this.getSectionHeadersData(this.selectedBeneficiaries, this.newlyAddedBeneficiaries));
        this.view.TabBodyNewAddedBen.setDefaultValues([this.getDefaultValuesForLisitingBeneficiaries(false), this.getDefaultValuesForLisitingBeneficiaries(false)]);
        this.view.TabBodyNewAddedBen.addDataForSections([this.selectedBeneficiaries, this.newlyAddedBeneficiaries]);
        this.view.tbxSearchBox1.onKeyUp = function(){
          self.view.imgClearIcon1.isVisible = true;
          self.view.imgClearIcon1.onTouchStart = function() {
            self.view.tbxSearchBox1.text = "";
            self.view.imgClearIcon1.isVisible = false;
            self.view.TabBodyNewAddedBen.setSectionData(self.getSectionHeadersData(self.selectedBeneficiaries ,self.newlyAddedBeneficiaries));
            self.view.TabBodyNewAddedBen.setDefaultValues([self.getDefaultValuesForLisitingBeneficiaries(false), self.getDefaultValuesForLisitingBeneficiaries(false)]);
            self.view.TabBodyNewAddedBen.addDataForSections([self.selectedBeneficiaries, self.newlyAddedBeneficiaries]);
          }.bind(this); 
        };
        this.view.tbxSearchBox1.onDone = function (){
          var searchString = self.view.tbxSearchBox1.text.toLocaleLowerCase();
          var selectedRecords = Object.values(self.selectedBeneficiaries).filter(selectedRecords => selectedRecords.beneficiaryName.toLocaleLowerCase().includes(searchString) || 
                                                                                 selectedRecords.bankName.toLocaleLowerCase().includes(searchString) || 
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.paymentMethod) && selectedRecords.paymentMethod.toLocaleLowerCase().includes(searchString)) || 
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.fromAccount) && selectedRecords.fromAccount.toLocaleLowerCase().includes(searchString)) || 
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.accountNumber) && selectedRecords.accountNumber.toLocaleLowerCase().includes(searchString)) ||  
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.swiftCode) && selectedRecords.swiftCode.toLocaleLowerCase().includes(searchString)) || 
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.swift) && selectedRecords.swift.toLocaleLowerCase().includes(searchString)));
          var addedRecords = Object.values(self.newlyAddedBeneficiaries).filter(addedRecords => addedRecords.beneficiaryName.toLocaleLowerCase().includes(searchString) || 
                                                                                addedRecords.bankName.toLocaleLowerCase().includes(searchString) || 
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.paymentMethod) && addedRecords.paymentMethod.toLocaleLowerCase().includes(searchString)) || 
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.fromAccount) && addedRecords.fromAccount.toLocaleLowerCase().includes(searchString)) || 
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.accountNumber) && addedRecords.accountNumber.toLocaleLowerCase().includes(searchString)) ||  
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.swiftCode) && addedRecords.swiftCode.toLocaleLowerCase().includes(searchString)) || 
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.swift) && addedRecords.swift.toLocaleLowerCase().includes(searchString))); 
          self.view.TabBodyNewAddedBen.setSectionData(self.getSectionHeadersData(selectedRecords, addedRecords));
          self.view.TabBodyNewAddedBen.setDefaultValues([self.getDefaultValuesForLisitingBeneficiaries(false), self.getDefaultValuesForLisitingBeneficiaries(false)]);
          self.view.TabBodyNewAddedBen.addDataForSections([selectedRecords,addedRecords]);
        };
        this.templateFlow = "createTemplate";
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.wireTemplate.createTemplateVC");
        this.view.formActionsNew.btnNext.onClick = this.createBulkPaymentTemplate.bind(this);
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("kony.i18n.common.createTemplateMenu");
        this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("kony.i18n.common.createTemplateMenu");
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
        this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
        this.view.formActionsNew.btnCancel.onClick = this.addBeneficiariesToTemplate.bind(this);
        this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
        this.view.formActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
        this.view.formActionsNew.btnOption.onClick = this.showCancelPopUp.bind(this);
        var numOfTransactions = this.selectedBeneficiaries.length + this.newlyAddedBeneficiaries.length;
        var amount = 0;
        for (var i = 0; i < this.selectedBeneficiaries.length; i++) amount += parseFloat(this.deFormatAmount(this.selectedBeneficiaries[i].amount));
        for (var i = 0; i < this.newlyAddedBeneficiaries.length; i++) amount += parseFloat(this.deFormatAmount(this.newlyAddedBeneficiaries[i].amount));
        amount = parseFloat(amount).toFixed(2);
        this.view.lblSummaryHeader0.text = kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");
        this.view.lblTemplateNameValueVerifyPage.text = this.view.tbxTemplateName.text;
        this.view.lblFromAccountValueVerifyPage.text = CommonUtilities.getMaskedAccName(this.view.lblSelectAccount.accountID)[0];
        this.view.lblExecutionDateValueVerifyPage.text = this.view.calExecutionDate.dateComponents[1] + "/" + this.view.calExecutionDate.dateComponents[0] + "/" + this.view.calExecutionDate.dateComponents[2];
        this.view.lblProcessingModeKey.text = kony.i18n.getLocalizedString("kony.i18n.common.processingMode");
        this.view.lblProcessingModeValue0.text = this.view.lstbProcessingMode.selectedKeyValue[1];
        var defaultCurrency = this.view.lstbDefaultCurrency.selectedKeyValue[1].split("-")[0];
        this.view.lblTotalAmountValue0.text =  "" +  CommonUtilities.formatCurrencyWithCommas(amount, true);  
        this.view.lblCurrencyCodeValue.text = defaultCurrency;
        this.view.lblTotalTransactionsVal.text = "" + numOfTransactions;
        this.view.lblDescriptionValue0.text = this.view.tbxTemplateDescription.text;
       
        var tempDetails = {
          "templateName": this.view.tbxTemplateName.text,
          "fromAccount": this.view.lblSelectAccount.accountID,
          "currency": !kony.sdk.isNullOrUndefined(formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey)) ? formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey) : this.view.lstbDefaultCurrency.selectedKey,
          "paymentDate": this.view.calExecutionDate.dateComponents[1] + "/" + this.view.calExecutionDate.dateComponents[0] + "/" + this.view.calExecutionDate.dateComponents[2],
          "processingMode": this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() === "MULTIPLE" ? "MULTI" : this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase(),
          "description": this.view.tbxTemplateDescription.text,
        };
        this.view.flxEditSummary0.onClick =  function() {
          this.isBackFromVerify =true;
          this.createTemplate(true);
        }.bind(this);

      } else if (this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
        if (!this.isBackFlow) {
          data = this.formatPaymentOrderRecords(this.beneficiaryData);
          this.selectedBeneficiaries = data.filter(function(item) {
            return item.beneficiaryType == "EXISTINGRECIPIENT";
          });
          this.newlyAddedBeneficiaries = data.filter(function(item) {
            return item.beneficiaryType == "MANUALLYADDED";
          });
          this.selectedBeneficiaries.forEach(function(item) {
            item.amountWithCurrency = formatManager.getCurrencySymbol(item.currency) + item.amount ;
          });
          this.newlyAddedBeneficiaries.forEach(function(item) {
            item.amountWithCurrency = formatManager.getCurrencySymbol(item.currency) + item.amount ;
          });
        }
        this.isEdit = false;
        this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
        this.view.flxEditBeneficiary.isVisible = true;
        this.view.flxCreateBulkRequest.isVisible = false;
        this.view.flxBeneficiaryUI.isVisible = true;
        this.view.flxSummary1.isVisible = true;
        this.view.flxViewRecipients.isVisible = true;
        this.view.flxAddBeneficiaryOptions.isVisible = false;
        this.view.flxEditBeneficiary.onClick = function(){
          this.isEditFlow = true;
		  this.oldPayOrderData = this.getOldPOData();
          this.addBeneficiariesToTemplate();
        }.bind(this);
        this.view.tbxSearchBox1.onKeyUp = function(){
          self.view.imgClearIcon1.isVisible = true;
          self.view.imgClearIcon1.onTouchStart = function() {
            self.view.tbxSearchBox1.text = "";
            self.view.imgClearIcon1.isVisible = false;
            self.addBeneficiariesToViewTemplate(false);
          }.bind(this);
        };
        this.view.tbxSearchBox1.onDone = function(){
          var searchString = self.view.tbxSearchBox1.text.toLocaleLowerCase();
          var selectedRecords = Object.values(self.selectedBeneficiaries).filter(selectedRecords => selectedRecords.beneficiaryName.toLocaleLowerCase().includes(searchString) || 
                                                                                 selectedRecords.bankName.toLocaleLowerCase().includes(searchString) || 
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.paymentMethod) && selectedRecords.paymentMethod.toLocaleLowerCase().includes(searchString)) || 
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.fromAccount) && selectedRecords.fromAccount.toLocaleLowerCase().includes(searchString)) || 
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.accountNumber) && selectedRecords.accountNumber.toLocaleLowerCase().includes(searchString)) ||  
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.swiftCode) && selectedRecords.swiftCode.toLocaleLowerCase().includes(searchString)) || 
                                                                                 (!kony.sdk.isNullOrUndefined(selectedRecords.swift) && selectedRecords.swift.toLocaleLowerCase().includes(searchString)));
          var addedRecords = Object.values(self.newlyAddedBeneficiaries).filter(addedRecords => addedRecords.beneficiaryName.toLocaleLowerCase().includes(searchString) || 
                                                                                addedRecords.bankName.toLocaleLowerCase().includes(searchString) || 
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.paymentMethod) && addedRecords.paymentMethod.toLocaleLowerCase().includes(searchString)) || 
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.fromAccount) && addedRecords.fromAccount.toLocaleLowerCase().includes(searchString)) || 
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.accountNumber) && addedRecords.accountNumber.toLocaleLowerCase().includes(searchString)) ||  
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.swiftCode) && addedRecords.swiftCode.toLocaleLowerCase().includes(searchString)) || 
                                                                                (!kony.sdk.isNullOrUndefined(addedRecords.swift) && addedRecords.swift.toLocaleLowerCase().includes(searchString)));
          self.addBeneficiariesToViewTemplate(false,selectedRecords, addedRecords);
        };
        this.templateFlow = BBConstants.BULKPAYMENT_VIEW_TEMPLATES;
        if (this.isBackFlow) {
          this.view.formActionsNew.btnNext.onClick = this.setCreateBulkRequestView.bind(this);
          this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest");
          this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest");
          this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.payments.editTemplate&Verify");
        } else {
          this.view.formActionsNew.btnNext.onClick = this.editBulkPaymentTemplate.bind(this);
          this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.payments.saveAndUpdate");
          this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.payments.saveAndUpdate");
          this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkReqView");
        }
        if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_DELETE") === false)) {
          this.view.formActionsNew.btnOption.isVisible=false;
          this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnCancel.onClick = this.navigateToViewTemplates.bind(this);
          this.view.formActionsNew.btnCancel.isVisible = true;
        }
        else{
          this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate");
          this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate");
          this.view.formActionsNew.btnCancel.onClick = this.showDeleteTemplatePopUp.bind(this);
          this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnOption.onClick = this.navigateToViewTemplates.bind(this);
          this.view.formActionsNew.btnCancel.isVisible = true;
          this.view.formActionsNew.btnOption.isVisible = true;
        }
        var numOfTransactions = this.selectedBeneficiaries.length + this.newlyAddedBeneficiaries.length;
        this.view.lblSummaryHeader0.text = kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");
        this.view.lblTemplateNameValueVerifyPage.text = this.templateDetails.templateName;
        this.view.lblFromAccountValueVerifyPage.text = this.templateDetails.fromAccountMasked;
        this.view.lblTitle1.text = kony.i18n.getLocalizedString("kony.i18n.common.addedBeneficiaries") + " (" + numOfTransactions + ") ";
        var paymentDateObj = this.formatDateStringToCalendarObject(this.templateDetails.paymentDate);
        this.view.lblExecutionDateValueVerifyPage.text = paymentDateObj[1] + "/" + paymentDateObj[0] + "/" + paymentDateObj[2];
        this.view.lblProcessingModeKey.text = kony.i18n.getLocalizedString("kony.i18n.common.processingMode");
        this.view.lblProcessingModeKey0.text = kony.i18n.getLocalizedString("kony.i18n.common.processingMode");
        this.view.lblProcessingModeValue0.text = this.templateDetails.processingMode === "MULTI" ? "Multiple" : "Single";
        var amount = 0;
        for (var i = 0; i < this.selectedBeneficiaries.length; i++) amount += parseFloat(this.deFormatAmount(this.selectedBeneficiaries[i].amount));
        for (var i = 0; i < this.newlyAddedBeneficiaries.length; i++) amount += parseFloat(this.deFormatAmount(this.newlyAddedBeneficiaries[i].amount));
        amount = parseFloat(amount).toFixed(2);
        this.view.lblTotalAmountValue0.text = "" + CommonUtilities.formatCurrencyWithCommas(amount, true);  
        this.view.lblCurrencyCodeValue.text = this.templateDetails.lblDefaultCurrencyValue.text;
        this.view.lblTotalTransactionsVal.text = "" + numOfTransactions;
        this.view.lblDescriptionValue0.text = this.templateDetails.description;
        this.addBeneficiariesToViewTemplate(false);
        var break_point = kony.application.getCurrentBreakpoint();
        if (break_point <= 1024 || orientationHandler.isTablet) {
          this.view.addBenFormActions.isVisible=false;
        }
        
        if (this.isackFlow) {
		  this.ackMsg = this.templateDetails.templateName + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.HasBeenSuccessfullyUpdated");
          this.view.formActionsNew.btnOption.setVisibility(false);
		  if(this.noEditDone)
		  {
			this.ackMsg = kony.i18n.getLocalizedString("i18n.TransfersEur.Nochangesmadetothetemplate") + " " +this.templateDetails.templateName;
			this.view.formActionsNew.btnOption.setVisibility(true);
			this.noEditDone = false;
		  }
		  if (this.isEditFlow) {
			this.view.formActionsNew.btnOption.setVisibility(true);
		  }
		  this.setAcknowledgementMessage();
          this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkReqView");
          this.view.formActionsNew.btnNext.onClick = this.setCreateBulkRequestView.bind(this);
          this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest");
          this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest");
          if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_DELETE") === false)) {
          this.view.formActionsNew.btnOption.isVisible=false;
          this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnCancel.onClick = this.navigateToViewTemplates.bind(this);
          this.view.formActionsNew.btnCancel.isVisible = true;
        }
        else{
          this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate");
          this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate");
          this.view.formActionsNew.btnCancel.onClick = this.showDeleteTemplatePopUp.bind(this);
          this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnOption.onClick = this.navigateToViewTemplates.bind(this);
          this.view.formActionsNew.btnCancel.isVisible = true;
          this.view.formActionsNew.btnOption.isVisible = true;
        }
        }
      } else {

        if (this.isackFlow) {
          this.ackMsg = this.templateDetails.templateName + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.HasBeenSuccessfullyUpdated");
          this.setAcknowledgementMessage();
        }

        data = this.beneficiaryData;
        this.view.flxApplyChangesTemplate.isVisible = false;
        this.view.tbxSearchBox.onKeyUp = this.onBeneficiaryKeyUp.bind(this, this.beneficiaryData, false, false);
        this.view.tbxSearchBox.onDone = this.onBeneficiarySearchDone.bind(this, this.beneficiaryData, false, false);
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createUploadReq");
        this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createUploadReq");
        var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data
        if (data.length > 0) FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
        else FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.formActionsNew.btnNext.onClick = this.onClickCreateRequest.bind(this, this.beneficiaryData, this.templateDetails.templateId);
        this.setTemplatebeneficiaryData(this.beneficiaryData, null, null, false, false);
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
        this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
        this.view.formActionsNew.btnCancel.onClick = this.invokeCreateBulkRequestView.bind(this);
        this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
        this.view.formActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
        this.view.formActionsNew.btnOption.onClick = this.showPopUp.bind(this, kony.i18n.getLocalizedString("i18n.kony.BulkPayments.cancelRequest"), this.navigateToViewTemplates);
        this.view.lblTemplateNameValue.text = this.templateDetails.templateName;
        this.view.lblFromAccountValue.text = this.templateDetails.lblDefaultFromAccountValue.text;
        this.view.lblExecutionDateValue.text = this.templateDetails.paymentDate;
        this.view.lblProcessingModeValue.text = this.templateDetails.processingMode;
        var benDataVerify;
        var amountValue=0;
        var transCount=0;
        for (var j = 0; j < 3; j++) {
          if (!kony.sdk.isNullOrUndefined(this.view.TabBodyNewBeneficiaries.getData()[j])) {
            benDataVerify = this.view.TabBodyNewBeneficiaries.getData()[j][1];
            benDataVerify.forEach(function(item) {
              transCount=transCount+1;
              kony.print(applicationManager.getFormatUtilManager().deFormatAmount(item.lblAmount.text));
              amountValue=amountValue+parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(item.lblAmount.text));
            });
          }
        }
		var amount = 0;
        for (var i = 0; i < this.selectedBeneficiaries.length; i++) amount += parseFloat(this.deFormatAmount(this.selectedBeneficiaries[i].amount));
        for (var i = 0; i < this.newlyAddedBeneficiaries.length; i++) amount += parseFloat(this.deFormatAmount(this.newlyAddedBeneficiaries[i].amount));
        amountValue = parseFloat(amountValue).toFixed(2);
        this.view.lblTotalAmountValue.text = CommonUtilities.formatCurrencyWithCommas(amountValue, true) + "";      
        if(this.templateDetails.lblDefaultCurrencyValue === undefined){
          this.templateDetails.lblDefaultCurrencyValue = {
            text : this.templateDetails.lblVTTotalAmountValue.text[0]
          };
        };
        this.view.lblDefaultDebitCurrencyValue.text = this.templateDetails.lblDefaultCurrencyValue.text;
        this.templateDetails.lblVTTotalAmountValue.text = this.view.lblDefaultDebitCurrencyValue.text+CommonUtilities.formatCurrencyWithCommas(amountValue, true);
        this.view.lblTotalAmountKey.text =  kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmountWithColon");
        this.view.lblTotalTransactionsValue.text = transCount+"";
        this.view.lblDescriptionValue.text = this.templateDetails.description;
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
        this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
        this.view.formActionsNew.btnCancel.onClick = this.navigateToViewTemplates.bind(this);
        this.view.formActionsNew.btnCancel.isVisible = true;
        this.view.formActionsNew.btnOption.isVisible = false;
        var break_point = kony.application.getCurrentBreakpoint();
      }
      this.adjustScreen(50);
       if ((this.templateFlow != "createTemplate") && (this.templateFlow != BBConstants.BULKPAYMENT_VIEW_TEMPLATES)) {
        this.view.lblExecutionDateValue.isVisible = false;
        this.renderCalenderCreateBulkreq();
        this.view.flxExecutionDateCreateBulkReq.isVisible=true;  
        this.view.calExecutionDateCreateBulkReq.validStartDate = null;
		this.view.calExecutionDateCreateBulkReq.dateComponents= null ;
        if (!kony.sdk.isNullOrUndefined(this.templateDetails.paymentDate)){
			var result = this.formatDateStringToCalendarObject(this.templateDetails.paymentDate);
			if(result[0]<=12){
        this.view.calExecutionDateCreateBulkReq.validStartDate = [result[1], result[0], result[2]];
        this.view.calExecutionDateCreateBulkReq.dateComponents = [result[1], result[0], result[2]];
        
      }else{
        this.view.calExecutionDateCreateBulkReq.validStartDate = [result[0], result[1], result[2]];
        this.view.calExecutionDateCreateBulkReq.dateComponents = [result[0], result[1], result[2]];
        
      }
         // this.view.calExecutionDateCreateBulkReq.validStartDate = this.formatDateStringToCalendarObject(this.templateDetails.paymentDate);
          //this.view.calExecutionDateCreateBulkReq.dateComponents = this.formatDateStringToCalendarObject(this.templateDetails.paymentDate);
        }
      }
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    
    navigateToAck: function(response) {
      var scope = this;
      var break_point = kony.application.getCurrentBreakpoint();
      FormControllerUtility.hideProgressBar(this.view);
      this.resetUI();
      this.setTemplatebeneficiaryData(this.beneficiaryData, null, null, false, false);
      this.view.flxEditBeneficiariesHeader.setVisibility(true);
      this.view.flxCreateBulkRequest.isVisible = true;
      this.view.flxSearch.isVisible = true;
      this.view.formActionsNew.isVisible = true;
      this.view.formActionsNew.btnOption.isVisible = true;
      this.view.flxEditDetails.isVisible = true;
      this.view.flxSummary.isVisible = true;
      this.view.flxSegment.sisVisible = false;
      this.view.flxEditDetails.isVisible = false;
      this.view.flxDropdown.isVisible = true;
      this.view.flxEditSummary.isVisible = false;
      this.view.flxSort.isVisible = true;
      this.view.flxSelectAll.isVisible = false;
      this.view.flxAckMessage.isVisible = true;
      this.view.imgSortCurrency.isVisible = true;
      this.view.imgSortAmount.isVisible = true;
      this.view.imgSortFees.isVisible = true;
      this.view.imgSortName.isVisible = false;
      this.view.flxAckMessage.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadedreqAck");
      this.view.flxAckMessage.flxRightContainerInfo.lblReferenceHeader.text = kony.i18n.getLocalizedString("i18n.CardManagement.requestId");
      this.view.flxAckMessage.flxRightContainerInfo.lblReferenceNumber.text = response.confirmationNumber;
      this.view.flxDropdown.onClick = this.showHidePaymentsSeg.bind(this);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkAckHeader");
      this.view.lblSelectEdit.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails") + " (" + this.templateDetails.totalBeneficiaries + ")";
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createanotherReq");
      this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createanotherReq");
      this.view.formActionsNew.btnNext.onClick = this.setCreateBulkRequestView.bind(this);
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("konybb.i18n.navToUploadStatus");
      this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("konybb.i18n.navToUploadStatus");
      this.view.formActionsNew.btnCancel.onClick = this.navigatetoUploadedFiles.bind(this);
      this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
      this.view.formActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
      this.view.formActionsNew.btnOption.onClick = this.navigateToViewTemplates.bind(this);
      this.view.tbxSearchBox.onKeyUp = this.onBeneficiaryKeyUp.bind(this, this.beneficiaryData, false, false);
      this.view.tbxSearchBox.onDone = this.onBeneficiarySearchDone.bind(this, this.beneficiaryData, false, false);
      this.view.lblEditSummary.isVisible = false;
      this.view.lblTemplateNameValue.text = this.templateDetails.templateName;
      this.view.lblFromAccountValue.text = this.templateDetails.lblDefaultFromAccountValue.text;
      this.view.lblExecutionDateValue.isVisible = true;	
      this.view.lblExecutionDateValue.text = this.templateDetails.paymentDate;
      this.view.lblProcessingModeValue.text = this.templateDetails.processingMode;      
	  if(break_point > 1024){
				this.view.lblSelectEdit.top = "15px";
				this.view.flxSummaryHeader.height ="20px";
				this.view.flxSearchBeneficiaries.height = "97%";
	  }
      var benDataAckScreen;
      var amountValue=0;
      var transCount=0;
      for (var j = 0; j < 3; j++) {
        if (!kony.sdk.isNullOrUndefined(this.view.TabBodyNewBeneficiaries.getData()[j])) {
          benDataAckScreen = this.view.TabBodyNewBeneficiaries.getData()[j][1];
          benDataAckScreen.forEach(function(item) {

            transCount=transCount+1;
            amountValue=amountValue+parseFloat(scope.deFormatAmount(item.lblAmount.text));
          });
        }
      }
      amountValue = parseFloat(amountValue).toFixed(2);
      this.view.lblTotalAmountValue.text = CommonUtilities.formatCurrencyWithCommas(amountValue, true) + "";
      this.view.lblDefaultDebitCurrencyValue.text = this.templateDetails.lblDefaultCurrencyValue.text;
      this.view.lblTotalAmountKey.text =  kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmountWithColon");
      this.view.lblTotalTransactionsValue.text = transCount+"";
      this.view.lblDescriptionValue.text = this.templateDetails.description;
      this.view.flxCurrency.onClick = this.sortByCurrency.bind(this, this.beneficiaryData, false, false);
      this.view.flxFeesPaidBy.onClick = this.sortByFeesPaidBy.bind(this, this.beneficiaryData, false, false);
      this.view.flxAmount.onClick = this.sortByAmount.bind(this, this.beneficiaryData, false, false);
      var break_point = kony.application.getCurrentBreakpoint();
      this.adjustScreen(0);
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    
        selectAllRemovedBeneficiaries: function() {
      FormControllerUtility.showProgressBar(this.view);
            if (this.view.lblSelectAll.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
        this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
        this.changeAllRemovedBeneficiariesStatus(OLBConstants.FONT_ICONS.CHECBOX_SELECTED);

            } else {
        this.view.lblSelectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        this.view.lblStatus.text = this.switch_ActionOff;
        this.changeAllRemovedBeneficiariesStatus(OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED);
      }

      FormControllerUtility.showProgressBar(this.view);
            this.setTemplatebeneficiaryData(this.removedBeneficiaryData, null, null, false, true);
      this.enableDisableApply();
    },
    
        changeAllRemovedBeneficiariesStatus: function(status) {
            this.removedBeneficiaryData.forEach(function(item) {
        item.status = status;
      });
    },
    
    validateAmountFormat: function() {
      this.view.forceLayout();
    },
    
    reAddSelectedBeneficiary: function() {
            if (this.isRecordSelected()) {
        for (var index = 0; index < this.removedBeneficiaryData.length; index++) {
          if (this.removedBeneficiaryData[index].status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
            this.removedBeneficiaryData[index].status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.removedBeneficiaryData[index].selectAll = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.beneficiaryData.push(this.removedBeneficiaryData[index]);
            this.removedBeneficiaryData.splice(index, 1);
            index--;
          }
        }
        this.isackFlow = true;
        this.ackMsg = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.readdBenAckMsg");
        this.invokeCreateBulkRequestView();
            } else {
        this.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.noRecSelected");
        this.view.flxError.setVisibility(true);
      }
    },
    
    showHidePaymentsSeg: function() {
      if (this.view.flxSegment.isVisible === true) this.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
      else this.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
      this.view.flxSegment.isVisible = !this.view.flxSegment.isVisible;
      this.view.flxSearch.isVisible = !this.view.flxSearch.isVisible;
      this.view.flxSort.isVisible = !this.view.flxSort.isVisible; 
    },
    
    navigatetoUploadedFiles: function() {
            this.bulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsDashboard",kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles"));
    },
    
    onClickToggle: function() {
      var index = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.selectedRowIndex;
      var sectionIndex = index[0];
      var rowIndex = index[1];
      var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
      var section = data.length;
      var footWidth= 10;
      var collapseAll = function(segments, section) {
        segments.forEach(function(segment, i) {
          if (segment.flxBeneficiaryDetails.isVisible === true) {
            segment.flxBeneficiaryDetails.isVisible = false;
            segment.flxDetailsHighlighter.isVisible = false; 
            segment.flxBottomSeperator.isVisible = true; 
            segment.flxTopSeperator.isVisible = false;
            segment.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.setDataAt(segment, i, section);
          }
        });
      };
      if (data[sectionIndex][1]) {
        if (data[sectionIndex][1][rowIndex].flxBeneficiaryDetails.isVisible === false) {
          while (section--) {
            collapseAll(data[section][1], section);
          }
          data[sectionIndex][1][rowIndex].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
          data[sectionIndex][1][rowIndex].flxBeneficiaryDetails.isVisible = true;
          data[sectionIndex][1][rowIndex].flxDetailsHighlighter.isVisible = true;
          data[sectionIndex][1][rowIndex].flxBottomSeperator.isVisible = true;
          data[sectionIndex][1][rowIndex].flxTopSeperator.isVisible = true;
          data[sectionIndex][1][rowIndex].flxEditBeneficiariesRowHeader["skin"]= "slFboxBGf8f7f8B0";
          data[sectionIndex][1][rowIndex].flxBeneficiaryInfo["skin"] ="slFboxBGf8f7f8B0";
          data[sectionIndex][1][rowIndex].flxEditBeneficiaryHeader["skin"] = "slFboxBGf8f7f8B0";
          data[sectionIndex][1][rowIndex].tbxAmount["skin"] = ViewConstants.SKINS.BULKPAYMENTS_TEXTBOX_GREYED;
          data[sectionIndex][1][rowIndex].tbxPaymentReference["skin"] = ViewConstants.SKINS.BULKPAYMENTS_TEXTBOX_GREYED;
          data[sectionIndex][1][rowIndex].listFeesPaidBy["skin"] = ViewConstants.SKINS.BULKPAYMENTS_LISTBOX_GREYED;
          footWidth =  -150;
        } else {
          data[sectionIndex][1][rowIndex].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
          data[sectionIndex][1][rowIndex].flxBeneficiaryDetails.isVisible = false;
          data[sectionIndex][1][rowIndex].flxDetailsHighlighter.isVisible = false;
          data[sectionIndex][1][rowIndex].flxBottomSeperator.isVisible = true;
          data[sectionIndex][1][rowIndex].flxTopSeperator.isVisible = false;
          data[sectionIndex][1][rowIndex].flxEditBeneficiariesRowHeader["skin"]=ViewConstants.SKINS.BULKPAYMENTS_HEADER_SKIN;
          data[sectionIndex][1][rowIndex].flxBeneficiaryInfo["skin"] = ViewConstants.SKINS.BULKPAYMENTS_HEADER_SKIN;
          data[sectionIndex][1][rowIndex].flxEditBeneficiaryHeader["skin"] = ViewConstants.SKINS.BULKPAYMENTS_HEADER_SKIN;
          data[sectionIndex][1][rowIndex].tbxAmount["skin"] = "sknTextBoxSSP42424215Px";
          data[sectionIndex][1][rowIndex].tbxPaymentReference["skin"] = ViewConstants.SKINS.BULKPAYMENTS_TEXTBOX_DEFAULT;
          data[sectionIndex][1][rowIndex].listFeesPaidBy["skin"] = ViewConstants.SKINS.BULKPAYMENTS_LISTBOX_DEFAULT;
          footWidth =  -360;
          if(this.view.lblContentHeader.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkAckHeader"))   footWidth = -250;
        }
        
        if(sectionIndex === data.length-1 && rowIndex=== data[sectionIndex][1].length-1  ){
          data[sectionIndex][1][rowIndex].flxBottomSeperator.isVisible = false;
        }
        kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);

      }
      var breakpoint = kony.application.getCurrentBreakpoint();
      this.adjustScreen(10);
      if(breakpoint >1024){
        this.adjustScreen(-150);
      }
      if (kony.os.deviceInfo().screenWidth == 1024 && (breakpoint <= 1024 || orientationHandler.isTablet)) {
        this.adjustScreen(footWidth);
      }
      this.view.forceLayout();
    },
    
    onClickCreateRequest: function(data, templateId) {
      var pos = [];
      data.forEach(function(record) {
        var fees =  kony.sdk.isNullOrUndefined(record.feesPaidBy.selectedKey) ? record.feesPaidBy : record.feesPaidBy.selectedKey;
        pos.push({
          "paymentOrderId": record.beneficiaryId,
          "currency": record.currency,
          "feesPaidBy": fees,
          "paymentReference": record.paymentReference
        });
      });
      var requestParams = {
        "templateId": templateId,
        "POs": JSON.stringify(pos)
      };
       if ((this.templateFlow != "createTemplate") && (this.templateFlow != BBConstants.BULKPAYMENT_VIEW_TEMPLATES)){
        requestParams["executionDate"] = !kony.sdk.isNullOrUndefined(CommonUtilities.getDateFromCalendarInBackendSupportedFormat(this.view.calExecutionDateCreateBulkReq)) ? CommonUtilities.getDateFromCalendarInBackendSupportedFormat(this.view.calExecutionDateCreateBulkReq) : "";
        this.templateDetails.paymentDate = !kony.sdk.isNullOrUndefined(CommonUtilities.getDateFromCalendarInBackendSupportedFormat(this.view.calExecutionDateCreateBulkReq)) ? this.view.calExecutionDateCreateBulkReq.dateComponents[0] + "/" + this.view.calExecutionDateCreateBulkReq.dateComponents[1] + "/" + this.view.calExecutionDateCreateBulkReq.dateComponents[2] : this.templateDetails.paymentDate;
      }
      this.bulkPaymentsModule.presentationController.createBulkRequest(requestParams);
    },
    
        showServerErrorMessage: function(message) {
      FormControllerUtility.hideProgressBar(this.view); 
      this.view.lblDisplayError.text = message;
      this.view.flxDisplayErrorMessage.isVisible = true;
          if(message==="The execution date defined in the file is in Past, please correct the date in the file and re-upload")
          {
            this.view.flxExecutionDateCreateBulkReq.isVisible=true;
            this.view.lblExecutionDateValue.isVisible=false;
            kony.application.getCurrentForm().flxFormContent.setContentOffset({'x' : 0 ,'y' : 0}, true);
            this.view.calExecutionDateCreateBulkReq.open();	
            this.view.forceLayout();
          }
    },
    renderCalenderCreateBulkreq: function() {
      var context1 = {
        "widget": this.view.lblTemplateNameValue,
        "anchor": "right"
      };
      this.view.calExecutionDateCreateBulkReq.setContext(context1);	
      this.view.flxExecutionDateSummary.clipBounds = false;
      this.view.flxSummary.clipBounds = false;
      this.view.lblTemplateNameValue.width = "20%";
      this.view.flxTemplateNameSummary.clipBounds = false;
    },
    
    dynamicSort: function(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function(a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      };
    },
    
        sortBeneficiaries: function(property, data, editFlow, deleteFlow) {
      data.sort(this.dynamicSort(property));
      this.setTemplatebeneficiaryData(data, null, null, editFlow, deleteFlow);
    },
    
        sortByCurrency: function(data, editFlow, deleteFlow) {
      var img =  this.view.imgSortCurrency;
      var order = "currency";
            if (img === ViewConstants.IMAGES.SORT_FINAL_IMAGE) {
        img = ViewConstants.IMAGES.SORT_NEXT_IMAGE;
        order = "currency";
            } else {
        img = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? ViewConstants.IMAGES.SORT_PREV_IMAGE : ViewConstants.IMAGES.SORT_NEXT_IMAGE;
        order = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? "currency" : "-currnecy";
      }
      this.view.imgSortCurrency = img;
            this.sortBeneficiaries(order, data, editFlow, deleteFlow);
    },
    
        sortByFeesPaidBy: function(data, editFlow, deleteFlow) {
      var img =  this.view.imgSortFees;
      var order = "feespaidBy";
            if (img === ViewConstants.IMAGES.SORT_FINAL_IMAGE) {
        img = ViewConstants.IMAGES.SORT_NEXT_IMAGE;
        order = "feespaidBy";
            } else {
        img = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? ViewConstants.IMAGES.SORT_PREV_IMAGE : ViewConstants.IMAGES.SORT_NEXT_IMAGE;
        order = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? "feespaidBy" : "-feespaidBy";
      }
      this.view.imgSortFees = img;
            this.sortBeneficiaries(order, data, editFlow, deleteFlow);
    },
    
        sortByAmount: function(data, editFlow, deleteFlow) {
      var img =  this.view.imgSortAmount;
      var order = "amount";
            if (img === ViewConstants.IMAGES.SORT_FINAL_IMAGE) {
        img = ViewConstants.IMAGES.SORT_NEXT_IMAGE;
        order = "amount";
            } else {
        img = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? ViewConstants.IMAGES.SORT_PREV_IMAGE : ViewConstants.IMAGES.SORT_NEXT_IMAGE;
        order = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? "amount" : "-amount";
      }
      this.view.imgSortAmount = img;
            this.sortBeneficiaries(order, data, editFlow, deleteFlow);
    },
    
        sortByBeneficiaryName: function(data, editFlow, deleteFlow) {
      var img =  this.view.imgSortBeneficiaryName;
      var order = "beneficiaryName";
            if (img === ViewConstants.IMAGES.SORT_FINAL_IMAGE) {
        img = ViewConstants.IMAGES.SORT_NEXT_IMAGE;
        order = "beneficiaryName";
            } else {
        img = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? ViewConstants.IMAGES.SORT_PREV_IMAGE : ViewConstants.IMAGES.SORT_NEXT_IMAGE;
        order = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? "beneficiaryName" : "-beneficiaryName";
      }
      this.view.imgSortBeneficiaryName = img;
            this.sortBeneficiaries(order, data, editFlow, deleteFlow);
    },
    
    mapBeneficiaryListingData: function(response, searchRes) {
      FormControllerUtility.hideProgressBar(this.view);
      this.existingBenificiaryResponse=response;
      this.resetUI();
            if (response.length === 0) {
        this.showServerErrorMessage(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.noExistingBeneficiaries"));
      }
            if (this.isEdit === true) this.templateFlow = BBConstants.BULKPAYMENT_VIEW_TEMPLATES;
      else this.templateFlow = "createTemplate";
            if (this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateAddBeneficiary");
            } else {
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.addExistingBenHeader");
      }
      this.view.flxStatus1.onClick = this.showSelectedBeneficiaries.bind(this);
      this.beneficiaryData = response;
      this.view.flxExistingBeneficiaries.setVisibility(true);
      this.view.TabBodyNewBen.segTemplates.rowTemplate = "flxBulkPayementRowTemplate";
      this.view.TabBodyNewBen.segTemplates.sectionHeaderTemplate = "flxBulkPayementHeader";
      this.view.TabBodyNewBen.segTemplates.bottom = "-1dp";
      this.view.flxBeneficiaryUI.setVisibility(false);
      this.view.TabBodyNewBen.setVisibility(true);

      var filteredResponse = [];
      var processingmode = this.view.flxCreateUI.flxProcessingMode.lstbProcessingMode.selectedKeyValues[0][1];
//             if (processingmode === "Single") {
//                 for (var i = 0; i < response.length; i++) {
//                     if (response[i].isInternationalAccount === 'false')
//             filteredResponse.push(response[i]);
//         }
//         response = filteredResponse;
//       }
      
      this.existingBenData = response;
      this.addBeneficiaryID(this.existingBenData);
      var sectionData = this.getBeneficiaryListingSectionData();
      
            if (searchRes != "")
        response = searchRes;

            if (response[0] === "empty")
        response = [];

      var defaultValues = {
        flxMain: {
          "height": "51dp"
        },
        flxBulkPayementRowHeader: {
          "skin": "bbSKnFlxffffff"
        },
        flxRecipientsType: {
          "isVisible": false
        },
        flxSeperator: {
          "isVisible": false
        },
        flxAddRecipientsRowHeader: {
          "isVisible": true
        },
        flxEditRecipientsRowHeader: {
          "isVisible": false
        },
        flxViewRecipientsRowHeader: {
          "isVisible": false
        },
        flxNoRecords: {
          "isVisible": false
        },
        flxBulkPayementRowDetails: {
          "isVisible": true
        },
        imgDropDown: {
          "skin": ViewConstants.SKINS.DRP_DWN_OTHER,
          "text": ViewConstants.FONT_ICONS.THREE_DOTS_ACCOUNTS,
          "isVisible": true
        },
        flxDropDown: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var secIndex = context["sectionIndex"];
            var rowIndex = context["rowIndex"];
            var conObj = {
              "section": secIndex,
              "row": rowIndex,
              "direction": 1
            };
            this.view.TabBodyNewBen.showOrHideDetails(conObj);
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point > 1024) {
              this.adjustScreen(-150);
            }
          }.bind(this)
        },
        lblSelect: {
          "isVisible": true,
          "text": "D"
        },
        flxActions: {
          "isVisible": false
        },
        flxSelect: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            this.onSelectExistingRecipient(eventobject, context);
          }.bind(this)
        },
        lblAccountNo: {
          "text": kony.i18n.getLocalizedString("kony.i18n.common.accountNumber"),
          "isVisible": true,
        },
        lblSwiftCode: {
          "text": kony.i18n.getLocalizedString("kony.mb.Manage.NickName"),
          "isVisible": true,
        },
        lblPayRef: {
          "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference"),
          "isVisible": false,
        },
        lblPaymentRefValidDescription: {
          "isVisible": true,
        },
        lblFees: {
          "text": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
          "isVisible": false,
        },
        lblPayRefValue: {
          "isVisible": false
        },
        lblFeesValue: {
          "isVisible": false
        }
      };
      var rowDataMap = {
        lblRecipientName: "beneficiaryName",
        lblBankName: "bankName",
        lblAccountType: "lblAccountType",
        lblAccountNo: "lblAccountNo",
        lblAccountNoValue: "lblAccountNoValue",
        lblAccType: "lblSwiftName",
        lblAccTypeValue: "lblAccTypeValue",
        lblSwiftCode: "lblSwiftCode",
        lblSwiftCodeValue: "lblNickName"
      };
      var internationalBeneficiaries = [];
      var domesticBeneficiaries = [];
      var internalBeneficiaries = [];
      response.forEach(function(transaction) {
        if (transaction.lblAccountType.text == "International") {
          internationalBeneficiaries.push(transaction);
        }
        if (transaction.lblAccountType.text == "Domestic") {
          domesticBeneficiaries.push(transaction);
        }
        if (transaction.lblAccountType.text == "Internal") {
          internalBeneficiaries.push(transaction);
        }				


      });
      var finaldata=[];
      if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_SAMEBANK") === true)) {
        finaldata=internalBeneficiaries;
      }
      if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_INATIONAL") === true)) {
        finaldata=finaldata.concat(internationalBeneficiaries);
      }
      if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_DOMESTIC") === true)) {
        finaldata=finaldata.concat(domesticBeneficiaries);
      }
      if (kony.sdk.isNullOrUndefined(finaldata)) finaldata = [this.view.TabBodyNewBen.getData()[0][1]];
      this.view.TabBodyNewBen.setSectionData([sectionData]);
      this.view.TabBodyNewBen.setRowDataMap([rowDataMap]);
      this.view.TabBodyNewBen.setDefaultValues([defaultValues]);
      this.view.TabBodyNewBen.addDataForSections([finaldata]);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.CommonFormActionsExt.setVisibility(true);
      this.view.CommonFormActionsExt.btnNext.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.CommonFormActionsExt.btnNext.skin = "sknBtnffffffBorder0273e31pxRadius2px";
      this.view.CommonFormActionsExt.btnCancel.text = kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.CommonFormActionsExt.btnCancel.skin = "sknBtnNormalSSPFFFFFF15Px";
      this.view.CommonFormActionsExt.btnBack.isVisible = false;
      this.view.CommonFormActionsExt.btnCancel.isVisible = true;
      this.view.CommonFormActionsExt.btnNext.right="200px"
      if (!kony.sdk.isNullOrUndefined(finaldata) && this.isExistingBeneficiarySelected()) FormControllerUtility.enableButton(this.view.CommonFormActionsExt.btnCancel);
      else FormControllerUtility.disableButton(this.view.CommonFormActionsExt.btnCancel);
      this.view.CommonFormActionsExt.btnCancel.onClick = this.getSelectedExistingBeneficiaries.bind(this);
      this.view.CommonFormActionsExt.btnNext.onClick = this.backtoAddBenScreen.bind(this);
      this.view.imgClear.isVisible = false;
      this.view.tbxSearch.onKeyUp = this.onPOKeyUp.bind(this, this.existingBenData);
      this.view.tbxSearch.onDone = this.onPOSearchDone.bind(this, this.existingBenData);
      this.adjustScreen(-50);
	  var break_point = kony.application.getCurrentBreakpoint();
        if (break_point > 1024) {
          this.adjustScreen(-150);
        }
      this.view.forceLayout();
    },
    
        isExistingBeneficiarySelected: function() {
      var selectedStatus = false;
      var data = this.view.TabBodyNewBen.getData()[0][1];
      data.forEach(function(item) {
        if (item.lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
          selectedStatus = true;
        }
      });
      return selectedStatus;
    },	

    onPOSearchDone: function(data) {
      var self = this;
      var searchString = self.view.tbxSearch.text.toLowerCase();
      var records = [];
      
      var records = Object.values(data).filter(records => records.beneficiaryName.toLocaleLowerCase().includes(searchString) ||                                               
                    (!kony.sdk.isNullOrUndefined(records.lblAccountType.text) && records.lblAccountType.text.toLocaleLowerCase().includes(searchString)) || 
                    (!kony.sdk.isNullOrUndefined(records.bankName) && records.bankName.toLocaleLowerCase().includes(searchString)));
      if (records.length == 0)
      records.push("empty");
      this.mapBeneficiaryListingData(data, records);
    },
    
    onPOKeyUp: function(data) {
      this.updateFetchParams();
      this.view.imgClear.isVisible = true;
      this.view.imgClear.onTouchStart = function() {
        this.view.tbxSearch.text = "";
        this.view.imgClear.isVisible = false;
                this.mapBeneficiaryListingData(data, "");
      }.bind(this);
    },
    
    addBeneficiaryID: function(data) {
      var btnEdit = {
                "isVisible": false,
      };
      var flxActions = {
                "isVisible": false,
      };
      for (var i = 0; i < data.length; i++) {
        data[i]["beneficiaryId"] = data[i].accountNumber;
        data[i]["btnEdit"] = btnEdit;
        data[i]["flxActions"] = flxActions;
        data[i]["status"] = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        data[i]["selectAll"] = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
      }
    },
    
    deFormatAmount: function(amount) {
      if (amount === undefined || amount === null) {
        return;
      }
      return applicationManager.getFormatUtilManager().deFormatAmount(amount);
    },

    addBeneficiaries: function(selectedExistingBeneficiaries) {
      this.resetUI();
      var self = this;
      this.view.tbxSearchBox1.text = "";
      this.invokeCreateBulkRequestView();
      this.view.flxApplyChangesTemplate.isVisible = true;
      this.view.flxApplyChanges.isVisible = false;
      this.view.flxTemplateDetails.isVisible = false;
      this.view.lblViewRemovedBeneficiaries.isVisible = false;
      this.view.flxError.isVisible = false;
      if (this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateAddPaymentInformation");
      } else {
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createTemplateAddPaymentInfo");
      }
      CommonUtilities.disableButton(this.view.btnApplyBeneficiaryChange);
      var masterDataFeespaidBy = [
                ["-", "-"],
                ["Me", "Me"],
                ["Beneficiary", "Beneficiary"],
                ["Shared", "Shared"],
            ];
      this.view.lstbFeesPaid.masterData = masterDataFeespaidBy;
      this.view.lstbFeesPaid.selectedKey = masterDataFeespaidBy[0][0];

      var formatManager = applicationManager.getFormatUtilManager();
      var defaultCurrency = formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey);
      if (kony.sdk.isNullOrUndefined(defaultCurrency))
        defaultCurrency = this.templateDetails.currency;
      
      var currencyList = this.masterDataCurrency;
      this.view.lstbChangeCurrency.masterData = currencyList;
            for (i = 0; i < currencyList.length; i++) {
                if (currencyList[i][0] === defaultCurrency) {
          this.view.lstbChangeCurrency.selectedKey = currencyList[i][0];
        }
      }
      
      if ((kony.sdk.isNullOrUndefined(this.templateDetails.processingMode) ? this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() : this.templateDetails.processingMode.toUpperCase()) === 'SINGLE') {
        this.view.lstbChangeCurrency.setEnabled(false);
      }
      else{
        this.view.lstbChangeCurrency.setEnabled(true);
      }
      if(this.templateFlow == "createTemplate"){
        if ((kony.sdk.isNullOrUndefined(this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase()) ? this.templateDetails.processingMode : this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase()) === 'SINGLE') {
          this.view.lstbChangeCurrency.setEnabled(false);
        } else {
          this.view.lstbChangeCurrency.setEnabled(true);
        }
      }
      this.view.tbxChangeAmount.onKeyUp = function() {
        self.enableDisableApplyForTemplate();
        FormControllerUtility.wrapAmountField(self.view.tbxChangeAmount).onKeyUp(self.validateAmountFormat);
        self.validateAmountFormat();
      };
      
      this.view.tbxPaymentRef.onKeyUp = this.validatePaymentReference.bind(this, this.view.tbxPaymentRef, this.view.lblPaymentReferenceValidDesc, this.view.flxError);
      
      this.view.lstbChangeCurrency.onSelection = function() {
        self.enableDisableApplyForTemplate();
      };
      this.view.lstbFeesPaid.onSelection = function() {
        self.enableDisableApplyForTemplate();
      };

      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD");
       var data = this.view.TabBodyNewBen.getData();
      
      if (!kony.sdk.isNullOrUndefined(data) && data[0][1].length > 0) FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      else {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      }
      var dataValues = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data

      if (dataValues.length > 0) FormControllerUtility.enableButton(self.view.formActionsNew.btnNext);
      else FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      this.view.flxAcknowledgementNew.rTextSuccess.skin = "";
      this.view.formActionsNew.btnNext.onClick = function() {
        if (self.checkpaymentRefValue() && self.checkCurrencyValue() && self.checkAmountValue() && self.checkFeesPaidByValue())
          self.addBeneficiariesToTemplate();
        else {
          if (!self.checkpaymentRefValue())
            self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentRefNotEntered");
          else if (!self.checkCurrencyValue())
            self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.currencyNotEntered");
          else if (!self.checkAmountValue())
            self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.amountNotEntered");
          else if (!self.checkFeesPaidByValue())
            self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.feesPaidByNotEntered");
          self.view.flxError.setVisibility(true);
        }
      }
      this.view.formActionsNew.btnCancel.onClick = function(){
        if(!kony.sdk.isNullOrUndefined(selectedExistingBeneficiaries) && selectedExistingBeneficiaries instanceof Array){
          for(var index=0; index < selectedExistingBeneficiaries.length; index++){
            for (var i = 0; i < self.selectedBeneficiaries.length; i++) {
              if (self.selectedBeneficiaries[i]["accountNumber"] === selectedExistingBeneficiaries[index]["accountNumber"] ) {
                self.selectedBeneficiaries.splice(i, 1);
                i--;
              }
            }
          }
        }
        self.backtoAddBenScreen();
      }
      this.view.flxCancelPopup.isVisible = false;
      this.view.btnApplyBeneficiaryChange.onClick = function() {
        FormControllerUtility.showProgressBar(self.view);
        var changedAmount = self.view.tbxChangeAmount.text && self.view.tbxChangeAmount.text !== "" && self.view.tbxChangeAmount.text !== "0" ? self.view.tbxChangeAmount.text.trim() : null;
        var changedPaymentRef = self.view.tbxPaymentRef.text && self.view.tbxPaymentRef.text !=="" ? self.view.tbxPaymentRef.text.trim() : null;
        var changedCurrency = self.view.lstbChangeCurrency.selectedKey;
        var changedFeesPaidBy = self.view.lstbFeesPaid.selectedKey && self.view.lstbFeesPaid.selectedKey !== "-" ? self.view.lstbFeesPaid.selectedKey : null ;
        var data = [];
        self.view.flxError.setVisibility(false);
        if(self.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES){
          for (var j = 0; j < self.selectedBeneficiaries.length; j++) {
            if (self.selectedBeneficiaries[j].status === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
              data.push(self.selectedBeneficiaries[j]);
            }
          }
        }
        else{
          for (var j = 0; j < self.selectedBeneficiaries.length; j++) {
            if (self.selectedBeneficiaries[j].lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
              data.push(self.selectedBeneficiaries[j]);
            }
          }
        }

        if (self.view.lblStatus.text === this.switch_ActionOn) {
          data = self.selectedBeneficiaries.filter(self.selectedRecords);
        } else {
          data = self.selectedBeneficiaries;
        }
        self.updateTemplateValues(self.selectedBeneficiaries.filter(self.selectedRecords), changedAmount, changedPaymentRef, changedCurrency, changedFeesPaidBy);
        self.setTemplatebeneficiaryData(data, changedAmount, changedPaymentRef, true, false);
        self.view.tbxChangeAmount.text = "";
        self.view.tbxPaymentRef.text = "";
        self.view.lstbChangeCurrency.selectedKey = defaultCurrency;
        self.view.lstbFeesPaid.selectedKey = masterDataFeespaidBy[0][0];
        
        var dataValues = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data

        if (dataValues.length > 0) FormControllerUtility.enableButton(self.view.formActionsNew.btnNext);
        else FormControllerUtility.disableButton(self.view.formActionsNew.btnNext);
     };
      
      this.view.btnTemplateRemove.onClick = function() {
        if (self.isRecordSelected()) {
          self.showPopUp(kony.i18n.getLocalizedString("i18n.kony.bulkPayments.cancelBeneficiary"));
          self.view.PopupHeaderUM.btnYes.onClick = function() {
            FormControllerUtility.showProgressBar(self.view);
            self.removeSelectedBeneficiary();
            var data = [];
            self.view.flxError.setVisibility(false);
            if(self.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES){
              for (var j = 0; j < self.selectedBeneficiaries.length; j++) {
                  data.push(self.selectedBeneficiaries[j]);
              }
			}
            else{
              for (var j = 0; j < self.selectedBeneficiaries.length; j++) {
                if(self.selectedBeneficiaries[j].lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED){
                  data.push(self.selectedBeneficiaries[j]);
                }
              }
            }
            self.setTemplatebeneficiaryData(data, null, null, true, false);
            CommonUtilities.disableButton(self.view.btnApplyBeneficiaryChange);
            var dataValues = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data

            if (dataValues.length > 0) FormControllerUtility.enableButton(self.view.formActionsNew.btnNext);
            else {
              FormControllerUtility.disableButton(self.view.formActionsNew.btnNext);
              self.adjustScreen(10);
            }
          }
        } else {
          self.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.noRecSelected");
          self.view.flxError.setVisibility(true);
        }
      };
      		//this.view.btnApplyBeneficiaryChange.onClick();
            this.view.tbxSearchBox.onKeyUp = this.onBeneficiaryKeyUp.bind(this, this.selectedBeneficiaries, true, false);
            this.view.tbxSearchBox.onDone = this.onBeneficiarySearchDone.bind(this, this.selectedBeneficiaries, true, false);
    },
    
    enableDisableApplyForTemplate: function() {
      var self = this;
      var changedAmount = self.view.tbxChangeAmount.text ? self.view.tbxChangeAmount.text.trim() : null;
      var changedPaymentRef = self.view.tbxPaymentRef.text ? self.view.tbxPaymentRef.text.trim() : null;
      var changedCurrency = self.view.lstbChangeCurrency.selectedKey;
      var changedFeesPaidBy = self.view.lstbFeesPaid.selectedKey;
      if ((changedAmount !== null || changedPaymentRef !== null || changedCurrency !== "-" || changedFeesPaidBy !== "-") && self.isRecordSelected()) {
        CommonUtilities.enableButton(this.view.btnApplyBeneficiaryChange);
      } else {
        CommonUtilities.disableButton(this.view.btnApplyBeneficiaryChange);
      }
    },
    
    checkpaymentRefValue: function() {
      var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
      var status = true;
            if (!kony.sdk.isNullOrUndefined(data)) {
        var domesticData = [];
        if (data[0]) {
          domesticData = data[0][1];
        }
        domesticData.forEach(function(item) {
                    if ((kony.sdk.isNullOrUndefined(item.tbxPaymentReference.text) || item.tbxPaymentReference.text === "") &&
                        (kony.sdk.isNullOrUndefined(item.lblPaymentRefValue.text) || item.lblPaymentRefValue.text === "")) {
            status = false;
          }
        });
        var internationalData = [];
        if (data[1]) {
          internationalData = data[1][1];
        }
        internationalData.forEach(function(item) {
                    if ((kony.sdk.isNullOrUndefined(item.tbxPaymentReference.text) || item.tbxPaymentReference.text === "") &&
                        (kony.sdk.isNullOrUndefined(item.lblPaymentRefValue.text) || item.lblPaymentRefValue.text === "")) {
            status = false;
          }
        });
        var sameBankData = [];
        if (data[2]) {
          sameBankData = data[2][1];
        }
        sameBankData.forEach(function(item) {
                    if ((kony.sdk.isNullOrUndefined(item.tbxPaymentReference.text) || item.tbxPaymentReference.text === "") &&
                        (kony.sdk.isNullOrUndefined(item.lblPaymentRefValue.text) || item.lblPaymentRefValue.text === "")) {
            status = false;
          }
        });
      }
      return status;
    },
    
    checkCurrencyValue: function() {
      var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
      var status = true;
            if (!kony.sdk.isNullOrUndefined(data)) {
        var domesticData = [];
        if (data[0]) {
          domesticData = data[0][1];
        }
        domesticData.forEach(function(item) {
                    if ((kony.sdk.isNullOrUndefined(item.listCurrency.selectedKey) || item.listCurrency.selectedKey === "-") &&
                        (kony.sdk.isNullOrUndefined(item.lblCurrency.text) || item.lblCurrency.text === "-")) {
            status = false;
          }
        });
        var internationalData = [];
        if (data[1]) {
          internationalData = data[1][1];
        }
        internationalData.forEach(function(item) {
                    if ((kony.sdk.isNullOrUndefined(item.listCurrency.selectedKey) || item.listCurrency.selectedKey === "-") &&
                        (kony.sdk.isNullOrUndefined(item.lblCurrency.text) || item.lblCurrency.text === "-")) {
            status = false;
          }
        });
        var sameBankData = [];
        if (data[2]) {
          sameBankData = data[2][1];
        }
        sameBankData.forEach(function(item) {
                    if ((kony.sdk.isNullOrUndefined(item.listCurrency.selectedKey) || item.listCurrency.selectedKey === "-") &&
                        (kony.sdk.isNullOrUndefined(item.lblCurrency.text) || item.lblCurrency.text === "-")) {
            status = false;
          }
        });
      }
      return status;
    },
    
    checkAmountValue: function() {
      var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
      var status = true;
            if (!kony.sdk.isNullOrUndefined(data)) {
        var domesticData = [];
        if (data[0]) {
          domesticData = data[0][1];
        }
        domesticData.forEach(function(item) {
                    if ((kony.sdk.isNullOrUndefined(item.tbxAmount.text) || item.tbxAmount.text === "" || parseFloat(item.tbxAmount.text) <= 0)) {
              status = false;
            }
        });
        var internationalData = [];
        if (data[1]) {
          internationalData = data[1][1];
        }
        internationalData.forEach(function(item) {
                    if ((kony.sdk.isNullOrUndefined(item.tbxAmount.text) || item.tbxAmount.text === "" || parseFloat(item.tbxAmount.text) <= 0)) {
              status = false;
            }
        });
        var sameBankData = [];
        if (data[2]) {
          sameBankData = data[2][1];
        }
        sameBankData.forEach(function(item) {
                    if ((kony.sdk.isNullOrUndefined(item.tbxAmount.text) || item.tbxAmount.text === "" || parseFloat(item.tbxAmount.text) <= 0)) {
              status = false;
            }
        });
        
      }
      return status;
            this.view.formActionsNew.btnCancel.onClick = function(){
                self.selectedBeneficiaries = [];
                self.newlyAddedBeneficiaries = [];
                self.templateFlow = "createTemplate";
                self.createTemplate(false);
            }
    },

        checkFeesPaidByValue: function() {
            var data = kony.application.getCurrentForm().TabBodyNewBeneficiaries.segTemplates.data;
            var status = true;
            if (!kony.sdk.isNullOrUndefined(data)) {
                var domesticData = [];
                if (data[0]) {
                    domesticData = data[0][1];
                }
                domesticData.forEach(function(item) {
                    if (!data[0][0].lblBeneficiaryType.includes(kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank"))) {
                        if ((kony.sdk.isNullOrUndefined(item.listFeesPaidBy.selectedKey) || item.listFeesPaidBy.selectedKey === "-") &&
                            (kony.sdk.isNullOrUndefined(item.lblFeesPaidBy.text) || item.lblFeesPaidBy.text === "-")) {
                            status = false;
                        }
                    }
                });
                var internationalData = [];
                if (data[1]) {
                    internationalData = data[1][1];
                }
                internationalData.forEach(function(item) {
                    if (!data[1][0].lblBeneficiaryType.includes(kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank"))) {
                        if ((kony.sdk.isNullOrUndefined(item.listFeesPaidBy.selectedKey) || item.listFeesPaidBy.selectedKey === "-") &&
                            (kony.sdk.isNullOrUndefined(item.lblFeesPaidBy.text) || item.lblFeesPaidBy.text === "-")) {
                            status = false;
                        }
                    }
                });
                var sameBankData = [];
                if (data[2]) {
                    sameBankData = data[2][1];
                }
                sameBankData.forEach(function(item) {
                    if (!data[2][0].lblBeneficiaryType.includes(kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank"))) {
                        if ((kony.sdk.isNullOrUndefined(item.listFeesPaidBy.selectedKey) || item.listFeesPaidBy.selectedKey === "-") &&
                            (kony.sdk.isNullOrUndefined(item.lblFeesPaidBy.text) || item.lblFeesPaidBy.text === "-")) {
                            status = false;
                        }
                    }
                });

            }
            return status;
            this.view.formActionsNew.btnCancel.onClick = function(){
                self.selectedBeneficiaries = [];
                self.newlyAddedBeneficiaries = [];
                self.templateFlow = "createTemplate";
                self.createTemplate(false);
            }
        },

    updateTemplateValues: function(data, changedAmount, changedPaymentRef, changedCurrency, changedFeesPaidBy) {
      var scope =this;
      data.forEach(function(item) {
        if (changedAmount !== null && parseFloat(changedAmount) > 0) {
          item.amount = changedAmount;
        }
        if (changedPaymentRef !== null && changedPaymentRef !== "") {
          item.paymentReference = changedPaymentRef;
        }
        if (changedCurrency !== null && changedCurrency !== "-") {
          item.currency = changedCurrency;
          for (var index = 0; index < scope.beneficiaryData.length; index++) {
            if (scope.beneficiaryData[index].beneficiaryId === item.beneficiaryId && item.beneficiaryName === scope.beneficiaryData[index].beneficiaryName){ 
              scope.beneficiaryData[index].currency = changedCurrency;
              break;
            }
          }
        }
        if (changedFeesPaidBy !== null && changedFeesPaidBy !== "-") {
          item.feesPaidBy = changedFeesPaidBy;
          for (var index = 0; index < scope.beneficiaryData.length; index++) {
             if (scope.beneficiaryData[index].beneficiaryId === item.beneficiaryId && item.beneficiaryName === scope.beneficiaryData[index].beneficiaryName){
              if(!scope.isSameBank(scope.beneficiaryData[index]))
                scope.beneficiaryData[index].feesPaidBy = changedFeesPaidBy;
              else
                scope.beneficiaryData[index].feesPaidBy = "-";
              break;
            }
          }
        }
      });
    },

    createBulkPaymentTemplate: function() {
      var inputs = {};
      var formatManager = applicationManager.getFormatUtilManager();
      inputs["templateName"] = this.view.tbxTemplateName.text;
      inputs["description"] = this.view.tbxTemplateDescription.text;
      inputs["fromAccount"] = this.view.lblSelectAccount.accountID;
      inputs["currency"] = kony.sdk.isNullOrUndefined(formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey)) ? this.view.lstbDefaultCurrency.selectedKey : formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey);
      inputs["paymentDate"] = CommonUtilities.getDateFromCalendarInBackendSupportedFormat(this.view.calExecutionDate);
      inputs["processingMode"] = this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() === "MULTIPLE" ? "MULTI" : this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase();
      var POData = [];
      var i = 0;
      for (i = 0; i < this.selectedBeneficiaries.length; i++) {
        POData[i] = {};
        POData[i]["beneficiaryName"] = this.selectedBeneficiaries[i].beneficiaryName;
        POData[i]["recipientName"] = this.selectedBeneficiaries[i].beneficiaryName;
        POData[i]["paymentMethod"] = this.selectedBeneficiaries[i].beneficiaryName;
        POData[i]["currency"] = this.selectedBeneficiaries[i].currency !=="-" ? this.selectedBeneficiaries[i].currency : inputs["currency"] ;
        POData[i]["amount"] = this.deFormatAmount(this.selectedBeneficiaries[i].amount);
        POData[i]["feesPaidBy"] = this.selectedBeneficiaries[i].feesPaidBy;
        POData[i]["paymentReference"] = this.selectedBeneficiaries[i].paymentReference;
        POData[i]["accountNumber"] = this.selectedBeneficiaries[i].accountNumber;
        POData[i]["accType"] = this.selectedBeneficiaries[i].lblAccountType.text;
        POData[i]["swift"] = this.selectedBeneficiaries[i].swiftCode;
        POData[i]["beneficiaryNickName"] = this.selectedBeneficiaries[i].nickName;
        POData[i]["beneficiaryAddress"] = this.selectedBeneficiaries[i].address;
        POData[i]["beneficiaryType"] = "EXISTINGRECIPIENT";
        POData[i]["addToExistingFlag"] = "0";
        POData[i]["bankName"] = !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i].bankName) ? this.selectedBeneficiaries[i].bankName : "-";
      }
      for (var j = 0; j < this.newlyAddedBeneficiaries.length; j++) {
        POData[i] = {};
        var regExp = /[a-zA-Z]/g;
        var account = this.newlyAddedBeneficiaries[j].accountNumber;
		var accountField;
                if (regExp.test(account)) {
          accountField = "beneficiaryIBAN"
        } else {
         accountField = "accountNumber"
        }
        POData[i]["beneficiaryName"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
        POData[i]["recipientName"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
        POData[i]["paymentMethod"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
                POData[i]["currency"] = this.newlyAddedBeneficiaries[j].currency;
        POData[i]["amount"] = this.deFormatAmount(this.newlyAddedBeneficiaries[j].amount);
        POData[i]["feesPaidBy"] = this.newlyAddedBeneficiaries[j].feesPaidBy;
                POData[i]["paymentReference"] = this.newlyAddedBeneficiaries[j].paymentReference;
        POData[i][accountField] = account;
        POData[i]["beneficiaryType"] = "MANUALLYADDED";
        POData[i]["accType"] = this.newlyAddedBeneficiaries[j].accountType;
                POData[i]["addToExistingFlag"] = this.newlyAddedBeneficiaries[j].btnEdit.isVisible === true ? "1" : "0";
                POData[i]["swift"] = !kony.sdk.isNullOrUndefined(this.newlyAddedBeneficiaries[j].swift) ? this.newlyAddedBeneficiaries[j].swift : "_";
                POData[i]["beneficiaryNickName"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
                POData[i]["beneficiaryAddress"] = "-";
                POData[i]["bankName"] = !kony.sdk.isNullOrUndefined(this.newlyAddedBeneficiaries[j].bankName) ? this.newlyAddedBeneficiaries[j].bankName : "-";
        i = i + 1;
      }
      inputs["POs"] = JSON.stringify(POData)
      var requestInput = JSON.stringify(inputs);
      this.bulkPaymentsModule.presentationController.createTemplate(inputs);
    },
    
    getBeneficiaryListingSectionData: function() {
      var accountNum="";
      var breakpoint = kony.application.getCurrentBreakpoint();
      var flxselectallleft;
      var flxselectallwidth;
      if(breakpoint<1025){
        flxselectallleft = "-2.5%";
        flxselectallwidth = "15%";
      }
      else{
        flxselectallleft = "-0.5%";
        flxselectallwidth = "10%";
      }
      if(!kony.sdk.isNullOrUndefined(this.view.segFromAccount.selectedRowItems[0]))
        accountNum=this.view.segFromAccount.selectedRowItems[0].accountID;
      var sectionData = {
        flxAddRecipients: {
          "isVisible": true
        },
        flxEditRecipients: {
          "isVisible": false
        },
        flxViewRecipients: {
          "isVisible": false
        },
        btnRecipientName: {
          "text":  kony.i18n.getLocalizedString("kony.mb.BenName.Title")
        },
        imgSortRecpName: this.dashboardSortParams.beneficiaryListing.Name,
        btnBankName: {
          "text":  kony.i18n.getLocalizedString("i18n.verifyDetails.bankName")
        },
        imgSortBankName: this.dashboardSortParams.beneficiaryListing.Bank,
        btnAccountType: {
          "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMethod")
        },
        imgSortAccountType: this.dashboardSortParams.beneficiaryListing.Type,
        btnSelectAll: {
          "text": kony.i18n.getLocalizedString("i18n.TradeFinance.SelectAll")
        },
        flxSelectAll: {
          "left": flxselectallleft,
          "width":flxselectallwidth,
          "onClick": function(eventobject, context) {
            this.selectAllBeneficiaries(eventobject, context);
          }.bind(this)
        },
        lblSelectAll: {
          "text": "D",
          "isVisible": true,		                  
        },
        flxRecipientName: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.beneficiaryListing.Name;
            if (img === "sortingfinal.png") {
              img = "sorting_next.png";
              var order = "desc";
            } else {
              img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
              var order = (img === "sorting_next.png") ? "desc" : "asc";
            }
            this.dashboardSortParams.beneficiaryListing.Name = img;
            this.updateFetchParams("beneficiaryName", order);
            this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(this.fetchParams,"",accountNum);
          }.bind(this)
        },
        flxBankName: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.beneficiaryListing.Bank;
            if (img === "sortingfinal.png") {
              img = "sorting_next.png";
              var order = "desc";
            } else {
              img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
              var order = (img === "sorting_next.png") ? "desc" : "asc";
            }
            this.dashboardSortParams.beneficiaryListing.Bank = img;
            this.updateFetchParams("bankName", order);
            this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(this.fetchParams,"",accountNum);
          }.bind(this)
        },
        flxAccountType: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.beneficiaryListing.Type;
            if (img === "sortingfinal.png") {
              img = "sorting_next.png";
              var order = "asc";
              var param = "isInternationalAccount";
              this.dashboardSortParams.beneficiaryListing.Type = img;
              this.updateFetchParams(param, order);
              this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(this.fetchParams,"",accountNum);
            } else {
              this.view.TabBodyNewBen.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Desc");
              this.dashboardSortParams.beneficiaryListing.Type = "sortingfinal.png";
            }
          }.bind(this)
        }
      };
      return sectionData;
    },
    
        showSelectedBeneficiaries: function() {
            if (this.view.lblStatus1.text === this.switch_ActionOff) {
                this.view.lblStatus1.text = this.switch_ActionOn;
                this.view.lblStatus1.skin = ViewConstants.SKINS.SWITCH_OFF;
            } else {
                this.view.lblStatus1.text = this.switch_ActionOff;
                this.view.lblStatus1.skin = ViewConstants.SKINS.SWITCH_ON;
               
            }

      var data = this.view.TabBodyNewBen.getData()[0][1];
      var dataForSections = this.view.TabBodyNewBen.getDataForSections();
      var lblSelect = "";
      var selectAll = this.view.TabBodyNewBen.getSectionData()[0].lblSelectAll;
      var j = 0;
      var selectedData = [];
      if (this.view.lblStatus1.text === this.switch_ActionOn) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
            selectedData.push(data[i]);
          }
          this.view.TabBodyNewBen.addDataForSections([selectedData]);
        }
        this.view.TabBodyNewBen.addDataForSections([selectedData]);
        var selData = this.view.TabBodyNewBen.getData()[0][1];
		if(this.view.TabBodyNewBen.getData()[0][1].length >0){
		var status1 = this.view.TabBodyNewBen.getData()[0][1][0].lblSelect;
        for(var i=0;i<selData.length;i++){
          status1.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
          status1.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
          this.view.TabBodyNewBen.updateKeyAt("lblSelect", status1, i, 0);
        }	
		}
      } else {
        var selData = this.view.TabBodyNewBen.getData()[0][1];
        this.view.TabBodyNewBen.addDataForSections([this.existingBenData]);
		if(this.view.TabBodyNewBen.getData()[0][1].length>0){
		var selectedStatus=this.view.TabBodyNewBen.getData()[0][1][0].lblSelect;
        for(var i=0;i<this.existingBenData.length;i++){
          for(var j=0;j<selData.length;j++){
            if(this.existingBenData[i].accountNumber===selData[j].accountNumber){
              selectedStatus.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
              selectedStatus.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
              this.view.TabBodyNewBen.updateKeyAt("lblSelect", selectedStatus, i, 0);
            }
          }
        }	
		}
      } 
    },    
      
    selectAllBeneficiaries: function(eventobject, context) {
      var row = context.rowIndex;
      var section = context.sectionIndex;
      var data = this.view.TabBodyNewBen.getData()[section][1];
            var lblSelect = "";
            var selectAll = this.view.TabBodyNewBen.getSectionData()[0].lblSelectAll;
            if (selectAll.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
        for (var i = 0; i < data.length; i++) {   
          lblSelect = data[i].lblSelect;
          lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
          lblSelect.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN; 
          this.view.TabBodyNewBen.updateKeyAt("lblSelect", lblSelect, i, section);
        }
                selectAll.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
        this.view.TabBodyNewBen.updateSectionAt("lblSelectAll", selectAll,  section); 
            } else {
        for (var i = 0; i < data.length; i++) {       
          lblSelect = data[i].lblSelect;			
          lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          lblSelect.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        }
        selectAll.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        this.view.TabBodyNewBen.updateSectionAt("lblSelectAll", selectAll,  section);
      }
      
            if (this.isExistingBeneficiarySelected())
        FormControllerUtility.enableButton(this.view.CommonFormActionsExt.btnCancel);
      else
        FormControllerUtility.disableButton(this.view.CommonFormActionsExt.btnCancel);
    },
    
    onSelectExistingRecipient: function(eventobject, context) {
      var row = context.rowIndex;
      var section = context.sectionIndex;
      var data = this.view.TabBodyNewBen.getData()[section][1];
	  var lblSelectNew = data[context.rowIndex].lblSelect;
      var lblSelect = JSON.parse(JSON.stringify(lblSelectNew));
            if (lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
        lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
        lblSelect.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            } else {
        lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        lblSelect.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      }
      this.view.TabBodyNewBen.updateKeyAt("lblSelect", lblSelect, row, section);  
      
            if (this.isExistingBeneficiarySelected())
        FormControllerUtility.enableButton(this.view.CommonFormActionsExt.btnCancel);
      else
        FormControllerUtility.disableButton(this.view.CommonFormActionsExt.btnCancel);
    },

        setViewOrEditBulkPaymentTemplateView: function(responseData, key) {
      this.resetUI();
      this.templateDetails = responseData;

            if (!kony.sdk.isNullOrUndefined(key) && key === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
		  this.isBackFlow = false;
          this.templateFlow = BBConstants.BULKPAYMENT_VIEW_TEMPLATES;
      }
    
      this.fetchPaymentOrders({
        "templateId": this.templateDetails.templateId
      });
    },
    
    getSelectedExistingBeneficiaries: function() {
      var benId = this.selectedBeneficiaries.map(function(item){ return item.accountNumber });
      var selectedExistingBeneficiaries = this.view.TabBodyNewBen.getData()[0][1].filter(function(itm) {
        return itm.lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED && (!benId.includes(itm.accountNumber));
      });
      this.selectedBeneficiaries = this.selectedBeneficiaries.concat(selectedExistingBeneficiaries);
      this.addBeneficiaryID(this.selectedBeneficiaries);
      this.addBeneficiaries(selectedExistingBeneficiaries);
    },   
    
    addBeneficiariesToTemplate: function(selected, newlyadded) {
      this.resetUI();
      var self = this;
      if (this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) this.isEdit = true;
      this.getBeneficiaries();
      var selectedBeneficiaries = !kony.sdk.isNullOrUndefined(selected) && selected instanceof Array  ? selected : this.selectedBeneficiaries;
      var newlyAddedBeneficiaries = !kony.sdk.isNullOrUndefined(newlyadded) && newlyadded instanceof Array ? newlyadded : this.newlyAddedBeneficiaries;
      this.view.addBenFormActions.isVisible = false;
      this.view.TabBodyNewAddedBen.segTemplates.rowTemplate = "flxBulkPayementRowTemplate";
      this.view.TabBodyNewAddedBen.segTemplates.sectionHeaderTemplate = "flxEditBeneficiariesHeader";
      //this.view.TabBodyNewAddedBen.segTemplates.bottom = "10dp";
      this.view.flxEmptyBen.setVisibility(false);
      this.view.flxTabletAccountsSeparator.setVisibility(true);
      this.view.TabBodyNewAddedBen.setVisibility(true);
      this.view.flxSearchBox.isVisible = true;
      this.view.tbxSearchBox1.onKeyUp = this.onSearchKeyUp.bind(this);
      this.view.tbxSearchBox1.onDone = this.onSearchDone.bind(this);
      this.view.flxSummary1.isVisible = false;
      this.view.flxAddBeneficiaryOptions.isVisible = true;
      this.view.flxViewRecipients.isVisible = true;
      this.view.flxViewAction.isVisible = true;
      if (this.isBackFlow) {
        this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES;
      }
      var rowDataMap = {
        "lblViewRecipientName": "beneficiaryName",
        "lblViewBankName": "amountWithCurrency",
        "lblViewAmount": "feesPaidBy",
        "lblRecipientsType": "lblRecipientsType",
        "imgRecipTypeDrpdown": "imgRecipTypeDrpdown",
        "imgFlxSeperator": "imgFlxSeperator",
        "imgFlxBottomSeparator": "imgFlxBottomSeparator",
        "btnViewActions": "btnViewActions",
        "imgDropDown": "imgDropDown",
        "imgFlxTopSeparator": "imgFlxTopSeparator",
        "imgSample": "imgSample",
        "lblAccountNo": "lblAccountNo",
        "lblAccountNoValue": "lblAccountNoValue",
        "lblAccType": "lblAccType",
        "lblAccTypeValue": "lblAccTypeValue",
        "lblSwiftCode": "lblSwiftCode",
        "lblSwiftCodeValue": "bankName",
        "lblPayRef": "lblPayRef",
        "lblPayRefValue": "paymentReference",
        "lblFees": "lblFees",
        "lblFeesValue": "feesPaidBy",
        "btnEdit": "btnEdit",
        "flxActions": "flxActions",
        "btnViewRecipientName": "btnViewRecipientName",
        "imgSortViewRecipientName": "imgSortViewRecipientName",
        "btnViewBankName": "btnViewBankName",
        "imgSortViewBankName": "imgSortViewBankName",
        "btnViewAmount": "btnViewAmount",
        "imgSortViewAmount": "imgSortViewAmount",
        "btnViewAction": "btnViewAction",
        "flxAddRecipients": "flxAddRecipients",
        "flxViewRecipients": "flxViewRecipients",
        "flxRecipientsType": "flxRecipientsType",
        "flxMain": "flxMain",
        "flxTopSeperator": "flxTopSeperator",
        "flxSeperator": "flxSeperator",
        "flxHeaderTopSeperator" : "flxHeaderTopSeperator",
        "flxHeaderBottomSeperator" : "flxHeaderBottomSeperator"
      };
      this.addPODetails();
      var formatManager = applicationManager.getFormatUtilManager();
      var i;
      if(selectedBeneficiaries.length>0)
        for(i=0;i<selectedBeneficiaries.length;i++){
          selectedBeneficiaries[i].amountWithCurrency=selectedBeneficiaries[i].amountWithCurrency[0]+ CommonUtilities.formatCurrencyWithCommas(selectedBeneficiaries[i].amount, true);  
          selectedBeneficiaries[i].beneficiaryType = "EXISTINGRECIPIENT";
        }
      if(newlyAddedBeneficiaries.length>0)
        for(i=0;i<newlyAddedBeneficiaries.length;i++){
          newlyAddedBeneficiaries[i].amountWithCurrency=newlyAddedBeneficiaries[i].amountWithCurrency[0]+ CommonUtilities.formatCurrencyWithCommas(newlyAddedBeneficiaries[i].amount, true);  
          newlyAddedBeneficiaries[i].beneficiaryType = "MANUALLYADDED";
        }
      
      selectedBeneficiaries.forEach(function(item) {
      item.flxActions.isVisible = true;
      item.btnEdit.isVisible = true;
      })
      
      this.view.TabBodyNewAddedBen.setSectionData(this.getSectionHeadersData(selectedBeneficiaries, newlyAddedBeneficiaries));
      this.view.TabBodyNewAddedBen.setRowDataMap([rowDataMap, rowDataMap]);
      this.view.TabBodyNewAddedBen.setDefaultValues([this.getDefaultValuesForLisitingBeneficiaries(true), this.getDefaultValuesForLisitingBeneficiaries(true)]);
      this.view.TabBodyNewAddedBen.addDataForSections([selectedBeneficiaries, newlyAddedBeneficiaries]);
      this.view.formActionsNew.isVisible = true;
      this.view.CommonFormActionsExt.isVisible = false;
      this.view.formActionsNew.btnBack.isVisible = false;
      this.view.formActionsNew.btnNext.onClick = this.setVerifyBulkRequestView.bind(this);
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.formActionsNew.btnNext.onClick = this.setVerifyBulkRequestView.bind(this);
      this.view.formActionsNew.btnCancel.isVisible = true;
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.formActionsNew.btnCancel.onClick = function(){
        self.addBeneficiaries();
      },
      this.view.formActionsNew.btnOption.isVisible = true;
      this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
      this.view.formActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
      this.view.formActionsNew.btnOption.onClick = this.showCancelPopUp.bind(this, kony.i18n.getLocalizedString("i18n.kony.BulkPayments.CancelPopUP"), this.navigateToViewTemplates);
      if (this.isEditFlow) {
        if (this.templateFlow == "createTemplate") {
          this.view.formActionsNew.btnNext.onClick = this.setVerifyBulkRequestView.bind(this);
        } else {
          this.view.formActionsNew.btnNext.onClick = this.editBulkPaymentTemplate.bind(this);
        }
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateSelectBeneficiaries");
        this.view.formActionsNew.btnCancel.onClick = this.setVerifyBulkRequestView.bind(this);
        this.view.formActionsNew.btnOption.onClick = this.showPopUp.bind(this, kony.i18n.getLocalizedString("i18n.kony.BulkPayments.CancelPopUP"), this.setVerifyBulkRequestView, cancelEdit= "");
      }
      if (this.isEdit) {
        if (this.templateFlow == "createTemplate") {
          this.view.formActionsNew.btnCancel.onClick = this.createTemplate.bind(this, true);
        }
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateSelectBeneficiaries");
        this.view.formActionsNew.btnOption.onClick = this.showPopUp.bind(this, kony.i18n.getLocalizedString("i18n.kony.BulkPayments.CancelPopUP"), this.setVerifyBulkRequestView, cancelEdit= "");
      }
      if (this.view.flxAcknowledgementNew.rTextSuccess.skin === ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN) this.view.flxAcknowledgementContainer.isVisible = false;
      else {
        this.view.flxAcknowledgementContainer.isVisible = true;
        this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
        this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.existingBenficiariesAdded");
      }
      this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
        var scopeObj = this;
        scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
        this.view.forceLayout();
      }.bind(this);
      if (this.selectedBeneficiaries.length === 0 && this.newlyAddedBeneficiaries.length === 0) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      } else FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      this.adjustScreen(100);
    },

    getSectionHeadersData: function(selectedBeneficiaries, newlyAddedBeneficiaries) {
      var sectionData = [];

      sectionData.push({
        "flxEditBeneficiaries": {
          "isVisible": false,                 
        },
        "flxBeneficiaryType": {
          "isVisible": true,          
        },
        "lblBeneficiaryType": {
          "text": kony.i18n.getLocalizedString("i18n.payments.existingBeneficiaries") + " (" + selectedBeneficiaries.length + ")",
          "skin": "sknlbl424242SSP15pxSemibold",
        },
        "flxSeperator": {
          "isVisible": true
        },
      });

      sectionData.push({
        "flxEditBeneficiaries": {
          "isVisible": false,                 
        },
        "flxBeneficiaryType": {
          "isVisible": true,          
        },
        "lblBeneficiaryType": {
          "text": kony.i18n.getLocalizedString("i18n.payments.newBeneficiaries") + " (" + newlyAddedBeneficiaries.length + ")",
          "skin": "sknlbl424242SSP15pxSemibold",
        },        
        "flxSeperator": {
          "isVisible": true
        },
      }); 

      return sectionData;
    },

    getDefaultValuesForLisitingBeneficiaries: function(isBeneficiaryAddUI) {

      return {
        "flxMain": {
          "height": "51dp"
        },
        "btnViewActions": {
          "text": kony.i18n.getLocalizedString("i18n.bulkwires.Remove"),
          "isVisible": isBeneficiaryAddUI,
          "onClick": function(eventobject, context) {
            var accNo = context.widgetInfo.data[context.sectionIndex][1][context.rowIndex]["accountNumber"];
            var beneficiaryName = context.widgetInfo.data[context.sectionIndex][1][context.rowIndex]["beneficiaryName"];
            var amount = context.widgetInfo.data[context.sectionIndex][1][context.rowIndex]["amount"];
            this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.deleteBeneficiary(context.sectionIndex, context.rowIndex, accNo, beneficiaryName, amount);
          }.bind(this),          
        },
        "imgFlxSeperator": {
          "text": "-"
        },
        "flxBulkPayementRowHeader": {
          "skin": "bbSKnFlxffffff"
        },
        "flxBottomSeparator": {
          "isVisible": false
        },
        "imgFlxBottomSeparator": {
          "text": "-"
        }, 
        "flxHeaderBottomSeperator": {
          "isVisible": false
        },
        "flxHeaderTopSeperator": {
          "isVisible": true
        },
        "imgDropDown": {
          "skin": "sknLblFontTypeIcon1a98ff12pxOther",
          "text": "O",
          "isVisible": true
        },
        "flxDropDown": {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var secIndex = context["sectionIndex"];
            var rowIndex = context["rowIndex"];
            var conObj = {
              "section": secIndex,
              "row": rowIndex,
              "direction": 1
            };
            this.view.TabBodyNewAddedBen.showOrHideDetails(conObj);
            var sknObjectLine = JSON.parse(JSON.stringify(this.view.TabBodyNewAddedBen.getData()[secIndex][1][rowIndex].imgDropDown));
            this.setFooterforExp(sknObjectLine);
          }.bind(this)
        },
        "flxTopSeperator": {
          "isVisible": true
        },
        "flxDetailsHighlighter": {
          "isVisible": true
        },
        "lblAccountNo": {
          "text": kony.i18n.getLocalizedString("kony.i18n.common.accountNumber"),
          "isVisible": true,
        },
        "lblAccType": {
          "text": kony.i18n.getLocalizedString("kony.i18n.common.swiftcode"),
          "isVisible": true,
        },
        "lblSwiftCode": {
          "text": kony.i18n.getLocalizedString("i18n.CheckImages.Bank"),
          "isVisible": true,
        },
        "lblPayRef": {
          "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference"),
          "isVisible": true,
        },
        "lblFees": {
          "text": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
          "isVisible": true,
        },      
        "btnEdit": {
          "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
          "right": "40%",
          "onClick": function(eventobject, context) {
            this.editBeneficiaryDetails(eventobject, context); 
          }.bind(this)
        },
        "btnDelete": {
          "isVisible": false
        },
        "btnViewDetails": {
          "isVisible": false
        }
      } 
    },

        deleteBeneficiary: function(sectionIndex, rowIndex, accNo, beneficiaryName, amount) {
      var scope = this;
      this.view.flxAcknowledgementContainer.setVisibility(false);
      this.showPopUp(kony.i18n.getLocalizedString("i18n.kony.bulkPayments.cancelBeneficiary"));
      this.view.PopupHeaderUM.btnYes.onClick = function() {
        if (sectionIndex === 0) {
          for (var i = 0; i < scope.selectedBeneficiaries.length; i++) {
            if (scope.selectedBeneficiaries[i]["accountNumber"] === accNo) {
              scope.selectedBeneficiaries.splice(i, 1);
              i--;
            }
          }
        } else {
          for (var i = 0; i < scope.newlyAddedBeneficiaries.length; i++) {
                        if (scope.newlyAddedBeneficiaries[i]["accountNumber"] === accNo && scope.newlyAddedBeneficiaries[i]["beneficiaryName"] === beneficiaryName
                          && scope.newlyAddedBeneficiaries[i]["amount"] === amount ) {
              scope.newlyAddedBeneficiaries.splice(i, 1);
              i--;
                            break;
            }
          }
        }
        scope.view.TabBodyNewAddedBen.setSectionData(scope.getSectionHeadersData(scope.selectedBeneficiaries, scope.newlyAddedBeneficiaries));
        scope.view.TabBodyNewAddedBen.addDataForSections([scope.selectedBeneficiaries, scope.newlyAddedBeneficiaries]);
        scope.view.flxCancelPopup.setVisibility(false);
        if (scope.selectedBeneficiaries.length === 0 && scope.newlyAddedBeneficiaries.length === 0) {
          FormControllerUtility.disableButton(scope.view.formActionsNew.btnNext);
        } else FormControllerUtility.enableButton(scope.view.formActionsNew.btnNext);
        scope.view.lblTitle1.text = kony.i18n.getLocalizedString("kony.i18n.common.addedBeneficiaries") + " (" + (scope.selectedBeneficiaries.length + scope.newlyAddedBeneficiaries.length) + ") ";
      }
    },

    addPODetails: function() {
      var formatManager = applicationManager.getFormatUtilManager();
      for (var i = 0; i < this.selectedBeneficiaries.length; i++) {
        for (var j = 0; j < this.beneficiaryData.length; j++) {

          if (this.selectedBeneficiaries[i]["accountNumber"] === this.beneficiaryData[j]["accountNumber"] && 
             this.selectedBeneficiaries[i]["swiftCode"] === this.beneficiaryData[j]["swiftCode"] &&
             this.selectedBeneficiaries[i]["beneficiaryName"] === this.beneficiaryData[j]["beneficiaryName"] ) {
            var fees;
            if(!kony.sdk.isNullOrUndefined(this.beneficiaryData[j]["feesPaidBy"]) ){
              if(!this.isSameBank(this.beneficiaryData[j])){
                if(this.beneficiaryData[j]["feesPaidBy"] !== "-"){
                  fees = this.beneficiaryData[j]["feesPaidBy"];
                }
                else{
                  fees = this.selectedBeneficiaries[i]["feesPaidBy"] ;
                }
              }	
              else{
                fees = "-";
              } 
            }
            else{
              fees = this.selectedBeneficiaries[i]["feesPaidBy"];
            }
            //this.selectedBeneficiaries[i]["amount"] = !kony.sdk.isNullOrUndefined(this.beneficiaryData[j]["amount"]) ? this.beneficiaryData[j]["amount"] : this.selectedBeneficiaries[i]["amount"];
            this.selectedBeneficiaries[i]["amount"] = !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i]["amount"]) ? this.selectedBeneficiaries[i]["amount"] : this.beneficiaryData[j]["amount"];
            this.selectedBeneficiaries[i]["currency"] = !kony.sdk.isNullOrUndefined(this.beneficiaryData[j]["currency"]) && this.beneficiaryData[j]["currency"] !== "-" ? this.beneficiaryData[j]["currency"] : !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i]["currency"]) && this.selectedBeneficiaries[i]["currency"] !== "-" ? this.selectedBeneficiaries[i]["currency"] :formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey);
            this.selectedBeneficiaries[i]["paymentReference"] = !kony.sdk.isNullOrUndefined(this.beneficiaryData[j]["paymentReference"]) ? this.beneficiaryData[j]["paymentReference"] : this.selectedBeneficiaries[i]["paymentReference"];
            //this.selectedBeneficiaries[i]["feesPaidBy"] = fees;
            this.selectedBeneficiaries[i]["amountWithCurrency"] = formatManager.getCurrencySymbol(this.selectedBeneficiaries[i]["currency"]) + this.selectedBeneficiaries[i]["amount"];
          }
        }
        if (this.selectedBeneficiaries[i].accountType === BBConstants.INTERNAL || this.selectedBeneficiaries[i].accType === BBConstants.INTERNAL) this.selectedBeneficiaries[i]["feesPaidBy"] = "-";
      }
    },
  
    templateCreationSuccess: function(data) {
      FormControllerUtility.hideProgressBar(this.view);
      var self = this;
      this.resetUI();
      var formatManager = applicationManager.getFormatUtilManager();
      this.view.flxSummary.setVisibility(true);
      this.view.flxEditSummary.isVisible = false;
      this.view.flxCreateBulkRequest.isVisible = true;
      this.view.flxSearchSortSeparator.isVisible = false;
      this.view.flxSummarySeparator.isVisible = false;
      this.view.flxDescriptionSummary.bottom = "100dp";
      this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.konybb.ACH.createTemplateComplete");
      this.view.flxAcknowledgementContainer.isVisible = true;
      this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
      this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
        var scopeObj = this;
        scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
        this.view.forceLayout();
      }.bind(this);
      this.view.flxEditBeneficiariesHeader.setVisibility(false);
      this.view.flxSort.setVisibility(false);
      this.view.flxSegment.setVisibility(false);
      this.view.flxApplyChangesTemplate.setVisibility(false);
      this.view.lblTemplateNameValue.text = data.templateName;
      this.view.lblFromAccountValue.text = CommonUtilities.getMaskedAccName(data.fromAccount)[1];
      this.view.lblExecutionDateValue.isVisible = true;
      this.view.lblExecutionDateValue.text = CommonUtilities.getFrontendDateStringInUTC(data.paymentDate, "mm/dd/yyyy");
      this.view.lblProcessingModeValue.text = data.processingMode;
      var currency = formatManager.getCurrencySymbol(data.currency);
      data.totalAmount = parseFloat(data.totalAmount).toFixed(2);
      this.view.lblTotalAmountValue.text = CommonUtilities.formatCurrencyWithCommas(data.totalAmount, true);
      this.view.lblDefaultDebitCurrencyValue.text = currency +"";
      this.view.lblTotalAmountKey.text =  kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmountWithColon");
      this.view.lblTotalTransactionsValue.text = data.totalBeneficiaries;
      this.view.lblDescriptionValue.text = kony.sdk.isNullOrUndefined(data.description) ? "-" : data.description;
      this.view.formActionsNew.isVisible = true;
      this.view.formActionsNew.btnOption.isVisible = true;
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest");
      this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest");
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.wireTemplates.createAnotherTemplate");
      this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplates.createAnotherTemplate");
      this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
      this.view.formActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
      this.view.formActionsNew.btnOption.onClick = this.navigateToViewTemplates.bind(this);       

            this.view.formActionsNew.btnNext.onClick = function() {

                var tempDetails = {
                    "templateName": data.templateName,
                    "lblDefaultFromAccountValue": {
                        "text": CommonUtilities.getMaskedAccName(data.fromAccount)[0],
                    },
                    "paymentDate": CommonUtilities.getFrontendDateStringInUTC(data.paymentDate, "mm/dd/yyyy"),
                    "lblVTTotalAmountValue": {
                        "text": currency + data.totalAmount,
                    },
                    "processingMode": data.processingMode,
                    "totalBeneficiaries": data.totalBeneficiaries,
                    "description": data.description,
                    "templateId": data.templateId,
        };

                self.beneficiaryData = [].concat(self.selectedBeneficiaries, self.newlyAddedBeneficiaries);
        self.templateDetails = tempDetails;
        self.templateFlow = "";
        self.setCreateBulkRequestView();
      };

        this.view.formActionsNew.btnCancel.onClick = function(){
            self.selectedBeneficiaries = [];
            self.newlyAddedBeneficiaries = [];
            self.templateFlow = "createTemplate";
            self.createTemplate(false);
        };

      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createTemplateAck");
      this.view.lblSummaryHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.templateDetails");
    },
    
    templateCreationFailure: function(data) {
      this.view.flxSummary.setVisibility(false);
      if (kony.sdk.isNullOrUndefined(data.errorMessage)) this.view.lblDowntimeWarning.text = kony.i18n.getLocalizedString("com.kony.common.templateError");
      else this.view.lblDowntimeWarning.text = data.errorMessage;
      this.view.flxMainWrapper.setVisibility(true);
      this.view.flxDowntimeWarning.setVisibility(true);
      FormControllerUtility.hideProgressBar(this.view);
    },

    addBeneficiariesToViewTemplate: function(flag, selected, newlyadded) {
      this.view.flxSearchBox.isVisible = true;
      this.view.TabBodyNewAddedBen.segTemplates.rowTemplate = "flxBulkPayementRowTemplate";
      this.view.TabBodyNewAddedBen.segTemplates.sectionHeaderTemplate = "flxEditBeneficiariesHeader";
     // this.view.TabBodyNewAddedBen.segTemplates.bottom = "10dp";
      this.view.flxEmptyBen.setVisibility(false);
      this.view.flxTabletAccountsSeparator.setVisibility(true);
      this.view.TabBodyNewAddedBen.setVisibility(true);
      var selectedBeneficiaries = !kony.sdk.isNullOrUndefined(selected) && selected instanceof Array ? selected : this.selectedBeneficiaries;
      var newlyAddedBeneficiaries = !kony.sdk.isNullOrUndefined(newlyadded) && newlyadded instanceof Array ? newlyadded : this.newlyAddedBeneficiaries;
      var sectionData = [];
      sectionData.push({
        "flxEditBeneficiaries": {
          "isVisible": false,
        },
        "flxBeneficiaryType": {
          "isVisible": true,
        },
        "lblBeneficiaryType": {
          "text": kony.i18n.getLocalizedString("i18n.payments.existingBeneficiaries") + " (" + selectedBeneficiaries.length + ")",
        },
        "flxSeperator": {
          "isVisible": true
        },
      });
      sectionData.push({
        "flxEditBeneficiaries": {
          "isVisible": false,
        },
        "flxBeneficiaryType": {
          "isVisible": true,
        },
        "lblBeneficiaryType": {
          "text": kony.i18n.getLocalizedString("i18n.payments.newBeneficiaries") + " (" + newlyAddedBeneficiaries.length + ")",
        },
        "flxSeperator": {
          "isVisible": true
        },
      });
      var rowDataMap = {
        "lblViewRecipientName": "beneficiaryName",
        "lblViewBankName": "amountWithCurrency",
        "lblViewAmount": "feesPaidBy",
        "lblRecipientsType": "lblRecipientsType",
        "imgRecipTypeDrpdown": "imgRecipTypeDrpdown",
        "imgFlxSeperator": "imgFlxSeperator",
        "imgFlxBottomSeparator": "imgFlxBottomSeparator",
        "btnViewActions": "btnViewActions",
        "imgDropDown": "imgDropDown",
        "imgFlxTopSeparator": "imgFlxTopSeparator",
        "imgSample": "imgSample",
        "lblAccountNo": "lblAccountNo",
        "lblAccountNoValue": "fromAccount",
        "lblAccType": "lblAccType",
        "lblAccTypeValue": "lblAccTypeValue",
        "lblSwiftCode": "lblSwiftCode",
        "lblSwiftCodeValue": "beneficiaryAddress",
        "lblPayRef": "lblPayRef",
        "lblPayRefValue": "nickName",
        "lblFees": "lblFees",
        "lblFeesValue": "bankName",
        "btnEdit": "btnEdit",
        "flxActions": "flxActions",
        "btnViewRecipientName": "btnViewRecipientName",
        "imgSortViewRecipientName": "imgSortViewRecipientName",
        "btnViewBankName": "btnViewBankName",
        "imgSortViewBankName": "imgSortViewBankName",
        "btnViewAmount": "btnViewAmount",
        "imgSortViewAmount": "imgSortViewAmount",
        "btnViewAction": "btnViewAction",
        "flxAddRecipients": "flxAddRecipients",
        "flxViewRecipients": "flxViewRecipients",
        "flxRecipientsType": "flxRecipientsType",
        "flxMain": "flxMain",
        "flxTopSeperator": "flxTopSeperator",
        "lblPaymentMethodValue": "lblPaymentMethodValue",
        "flxSeperator": "flxSeperator"
      };
      var defaultValues = {
        "flxMain": {
          "height": "51dp"
        },
        "btnViewActions": {
          "text": kony.i18n.getLocalizedString("i18n.bulkwires.Remove"),
          "isVisible": flag,
          "onClick": function(eventobject, context) {
            var accNo = context.widgetInfo.data[context.sectionIndex][1][context.rowIndex]["accountNumber"];
            this.deleteBeneficiary(context.sectionIndex, context.rowIndex, accNo);
          }.bind(this),
        },
        "imgFlxSeperator": {
          "text": "-"
        },
        "flxBulkPayementRowHeader": {
          "skin": "bbSKnFlxffffff"
        },
        "flxBottomSeparator": {
          "isVisible": false
        },
        "imgFlxBottomSeparator": {
          "text": "-"
        },
        "imgDropDown": {
          "skin": "sknLblFontTypeIcon1a98ff12pxOther",
          "text": "O",
          "isVisible": true
        },
        "flxDropDown": {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var secIndex = context["sectionIndex"];
            var rowIndex = context["rowIndex"];
            var conObj = {
              "section": secIndex,
              "row": rowIndex,
              "direction": 1
            };
            this.view.TabBodyNewAddedBen.showOrHideDetails(conObj);
            var sknObjectLine = JSON.parse(JSON.stringify(this.view.TabBodyNewAddedBen.getData()[secIndex][1][rowIndex].imgDropDown));
            this.setFooterforExp(sknObjectLine);
          }.bind(this)
        },
        "flxTopSeperator": {
          "isVisible": true
        },
        "flxDetailsHighlighter": {
          "isVisible": true
        },
        "lblAccountNo": {
          "text": kony.i18n.getLocalizedString("kony.i18n.common.accountNumber"),
          "isVisible": true,
        },
        "lblAccType": {
          "text": kony.i18n.getLocalizedString("kony.i18n.common.swiftcode"),
          "isVisible": true,
        },
        "lblSwiftCode": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryAddressMandatory"),
            "isVisible": true,
        },
        "lblPayRef": {
            "text": kony.i18n.getLocalizedString("i18n.TransfersEur.Nickname"),
            "isVisible": true,
        },
        "lblFees": {
            "text": kony.i18n.getLocalizedString("i18n.CheckImages.Bank"),
            "isVisible": true,
        },
        "btnEdit": {
          "isVisible": flag,
          "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                    "right": "40%",
          "onClick": function(eventobject, context) {
            this.editBeneficiaryDetails(eventobject, context);
          }.bind(this)
        },
        "btnDelete": {
          "isVisible": false
        },
        "btnViewDetails": {
          "isVisible": false
        },
        "lblPaymentMethod": {
          "isVisible": true,
          "text": kony.i18n.getLocalizedString("i18n.payments.method")
        }
      };
      var i;
      if(selectedBeneficiaries.length>0)
        for(i=0;i<selectedBeneficiaries.length;i++){
          selectedBeneficiaries[i].amountWithCurrency=selectedBeneficiaries[i].amountWithCurrency[0]+ CommonUtilities.formatCurrencyWithCommas(selectedBeneficiaries[i].amount, true);  
        }
      if(newlyAddedBeneficiaries.length>0)
        for(i=0;i<newlyAddedBeneficiaries.length;i++){
          newlyAddedBeneficiaries[i].amountWithCurrency=newlyAddedBeneficiaries[i].amountWithCurrency[0]+ CommonUtilities.formatCurrencyWithCommas(newlyAddedBeneficiaries[i].amount, true);  
        }
      this.view.TabBodyNewAddedBen.setSectionData(sectionData);
      this.view.TabBodyNewAddedBen.setRowDataMap([rowDataMap, rowDataMap]);
      this.view.TabBodyNewAddedBen.setDefaultValues([defaultValues, defaultValues]);
      this.view.TabBodyNewAddedBen.addDataForSections([selectedBeneficiaries, newlyAddedBeneficiaries]);
      this.view.formActionsNew.isVisible = true;
      this.view.CommonFormActionsExt.isVisible = false;
      this.view.formActionsNew.btnBack.isVisible = false;
      if (this.templateFlow === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
        if (this.isBackFlow) {
          this.view.formActionsNew.btnNext.onClick = this.editBulkPaymentTemplate.bind(this, this.templateDetails.templateId);
          this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.payments.saveAndUpdate");
          this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.payments.saveAndUpdate");
        } else {
                    this.view.formActionsNew.btnNext.onClick = this.setCreateBulkRequestView.bind(this);
          this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest");
          this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest");
        }
        if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_DELETE") === false)) {
          this.view.formActionsNew.btnOption.isVisible=false;
          this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnCancel.onClick = this.navigateToViewTemplates.bind(this);
          this.view.formActionsNew.btnCancel.isVisible = true;
        }
        else{
          this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate");
          this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate");
          this.view.formActionsNew.btnCancel.onClick = this.showDeleteTemplatePopUp.bind(this);
          this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
          this.view.formActionsNew.btnOption.onClick = this.navigateToViewTemplates.bind(this);
          this.view.formActionsNew.btnCancel.isVisible = true;
          this.view.formActionsNew.btnOption.isVisible = true;
        }
      } else {
                if (this.isEditFlow && this.templateFlow !== "createTemplate") {
          this.view.formActionsNew.btnNext.onClick = this.editBulkPaymentTemplate.bind(this);
          this.view.formActionsNew.btnCancel.onClick = this.setVerifyBulkRequestView.bind(this);
          this.view.formActionsNew.btnOption.onClick = this.showPopUp.bind(this, kony.i18n.getLocalizedString("i18n.kony.BulkPayments.CancelPopUP"), this.navigateToViewTemplates);
                } else {
          this.view.formActionsNew.btnNext.onClick = this.setVerifyBulkRequestView.bind(this);
          this.view.formActionsNew.btnCancel.onClick = this.invokeCreateBulkRequestView.bind(this);
        }
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.common.proceed");
        this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
        this.view.formActionsNew.btnCancel.isVisible = true;
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
        this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");

        this.view.formActionsNew.btnOption.isVisible = true;
        this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
        this.view.formActionsNew.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");

      }

      if (this.selectedBeneficiaries.length === 0 && this.newlyAddedBeneficiaries.length === 0) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
            } else FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);

      this.adjustScreen(100);
    },
        
        navigateToCreateTemplatePrimaryDetails: function(templateDetails) {
      this.isEditFlow = true;
      this.editTemplatePrimaryDetails(templateDetails);
    },

        formatDateStringToCalendarObject: function(dateString) {
      var dateComponents = dateString.split("/");
            var result = [Number(dateComponents[1]), Number(dateComponents[0]), Number(dateComponents[2]), 0, 0, 0];
      return result;
    },

    editTemplatePrimaryDetails: function(data) {
      var scopeObj = this;
      this.resetUI();
      this.isBackFlow = true;
      this.view.flxCreateUI.isVisible = true;
      this.view.flxHeader.setVisibility(true);
      this.view.flxTopSeparator.setVisibility(true);
      this.view.flxBeneficiaryUI.setVisibility(false);
      this.view.flxCreateDetails.setVisibility(true);
      this.view.flxProcessinModeInfo.setVisibility(true);
      var fromAccounts = this.fetchBulkPaymentEditAccounts();
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.ACH.EditTemplate") + " - " + kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");
            this.view.lblTitle.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent") + " " + kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");

      this.initializeFromSegment(fromAccounts);
      this.view.txtTransferFrom.setVisibility(false);
      this.view.lblSelectAccount.text = CommonUtilities.getMaskedAccName(data.fromAccount)[0];
      this.view.lblSelectAccount.accountID = data.fromAccount;
      this.view.lblSelectAccount.setVisibility(true);
      this.view.flxTypeIcon.setVisibility(true);
      this.view.lblTypeIcon.setVisibility(true);
      this.view.lblTypeIcon.text = this.view.lblFromAccountIconVerifyPage.text;
      this.view.flxCreateDetails.flxNameDetails.flxTemplateName.tbxTemplateName.text = data.templateName;

      this.view.lblSelectAccount.accountID = data.fromAccount;
      var currencyList = FormControllerUtility.getListBoxDataFromObjects(this.getCurrencyforCreateRequest(), "name", "symbol");
      for (var i = 0; i < currencyList.length; i++) {
          switch (currencyList[i][0]) {
              case "$":
                  currencyList[i][1] = "$ - USD";
                  break;
              case "€":
                  currencyList[i][1] = "€ - EUR";
                  break;
              case "₹":
                  currencyList[i][1] = "₹ - INR";
                  break;
              case "£":
                  currencyList[i][1] = "£ - GBP";
                  break;
          }
      }
      this.view.lstbDefaultCurrency.masterData = currencyList;
      var selectedCurrency = currencyList[0][0];
            for (var j = 0; j < currencyList.length; j++) {
            if (currencyList[j][0] === data.lblDefaultCurrencyValue.text) {
            selectedCurrency = currencyList[j][0];
            break;
          }
      }
      this.view.lstbDefaultCurrency.selectedKey = selectedCurrency;

      //this.view.lstbProcessingMode.selectedKey = data.processingMode === "MULTI" ? "MULTI" : "SINGLE";
      if(data.processingMode.toUpperCase()==="SINGLE")
        this.view.lstbProcessingMode.selectedKey="lblSingle";
      else
        this.view.lstbProcessingMode.selectedKey="lblMulti";
      this.view.flxTemplateDescription.tbxTemplateDescription.text = data.description;
      this.view.flxCreateDetails.flxNameDetails.flxTemplateName.tbxTemplateName.onKeyUp = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.flxProcessingMode.setVisibility(true);
      this.view.lblExecutionDate.setVisibility(true);
      this.view.flxDate.setVisibility(true);
      this.view.lblDescription.setVisibility(true);
      this.view.txtTransferFrom.onTextChange=this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.calExecutionDate.onSelection =this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.flxTemplateDescription.tbxTemplateDescription.onKeyUp = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.lstbFromAccount.onSelection = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.lstbDefaultCurrency.onSelection = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.lstbProcessingMode.onSelection = this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.flxTemplateDescription.setVisibility(true);
      this.view.flxBottomSeperator.setVisibility(true);
      this.view.createFlowFormActionsNew.isVisible = true;
      this.view.CommonFormActionsExt.setVisibility(false);
      FormControllerUtility.disableButton(this.view.createFlowFormActionsNew.btnNext);
      this.view.createFlowFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.calExecutionDate.validStartDate = null;
      this.view.calExecutionDate.dateComponents = null;
      this.view.calExecutionDate.validStartDate = this.formatDateStringToCalendarObject(data.paymentDate);
      this.view.calExecutionDate.dateComponents = this.formatDateStringToCalendarObject(data.paymentDate);
      this.view.createFlowFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.view.createFlowFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
      var previousAccount = this.templateDetails != "" ? this.templateDetails.fromAccount : this.view.lblSelectAccount.accountID;
      this.view.createFlowFormActionsNew.btnNext.onClick = function() {
        this.templateDetails.templateName = this.view.tbxTemplateName.text;
        this.templateDetails.description = this.view.tbxTemplateDescription.text;
        var currentAccount = this.view.lblSelectAccount.accountID;
        var error = false;

                if (this.getMembershipId(previousAccount) != this.getMembershipId(currentAccount)) {
          scopeObj.view.flxErrorMessage.isVisible = true;
          scopeObj.view.lblError.text = kony.i18n.getLocalizedString("i18n.payments.accountBelongsToDifferentCustomer");
          error = true;
                } else
        	this.templateDetails.fromAccount = scopeObj.view.lblSelectAccount.accountID;

        this.templateDetails.fromAccountMasked = CommonUtilities.getMaskedAccName(this.view.lblSelectAccount.accountID)[0];
        var formatManager = applicationManager.getFormatUtilManager();
        this.templateDetails.currency = formatManager.getCurrencySymbolCode(this.view.lstbDefaultCurrency.selectedKey);
        this.templateDetails.paymentDate = CommonUtilities.getDateFromCalendarInBackendSupportedFormat(this.view.calExecutionDate);
        this.templateDetails.processingMode = this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() === "MULTIPLE" ? "MULTI" : this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase();
        this.templateDetails.paymentDate = this.view.calExecutionDate.dateComponents[1] + "/" + this.view.calExecutionDate.dateComponents[0] + "/" + this.view.calExecutionDate.dateComponents[2];
        FormControllerUtility.showProgressBar(this.view);
                if (error != true) {
          if (this.templateFlow !== "createTemplate") {
            this.templateDetails.lblVTTotalAmountValue.text = CommonUtilities.formatCurrencyWithCommas(this.templateDetails.lblVTTotalAmountValue.text.substring(1), false, this.view.lstbDefaultCurrency.selectedKeyValue[0]);
            this.setViewOrEditBulkPaymentTemplateView(this.templateDetails);
          } else {    
            this.setVerifyBulkRequestView();
          }
        }
              
                if(this.templateFlow === ""){
                  var data = this.beneficiaryData;
                  this.selectedBeneficiaries = data.filter(function(item) {
                     return item.beneficiaryType == "EXISTINGRECIPIENT";
                  });
                  
                  this.newlyAddedBeneficiaries = data.filter(function(item) {
                    return item.beneficiaryType == "MANUALLYADDED";
                  });
                  
                  this.editBulkPaymentTemplate();
                }
        FormControllerUtility.hideProgressBar(this.view);
      }.bind(this);
      this.view.flxInfo.onClick = this.OnFlxInfoClick.bind(this);
      this.view.createFlowFormActionsNew.btnCancel.onClick = this.setVerifyBulkRequestView.bind(this);
      this.view.createFlowFormActionsNew.isVisible = true;
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    
        initiateDeleteBulkPaymentTemplate: function() {
      this.bulkPaymentsModule.presentationController.deleteBulkPaymentTemplate(this.templateDetails.templateId);
      this.returnToDashBoard();
    },

        showDeleteTemplatePopUp: function() {
            this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate");
            this.showPopUp(kony.i18n.getLocalizedString("i18n.ACH.DeleteTemplateAlertMessage"),
                  this.initiateDeleteBulkPaymentTemplate.bind(this));
      },

    editBulkPaymentTemplate: function() {
      var inputs = {};
      if (!this.isEditFlow) {
        inputs["templateName"] = !kony.sdk.isNullOrUndefined(this.view.tbxTemplateName.text) && this.view.tbxTemplateName.text !== "" ?this.view.tbxTemplateName.text : this.templateDetails.templateName ;
        inputs["templateId"] = this.templateDetails.templateId;
        inputs["description"] = !kony.sdk.isNullOrUndefined(this.view.tbxTemplateDescription.text) && this.view.tbxTemplateDescription.text!== "" ? this.view.tbxTemplateDescription.text:this.templateDetails.description;
        inputs["fromAccount"] = !kony.sdk.isNullOrUndefined(this.view.lblSelectAccount.accountID) ? this.view.lblSelectAccount.accountID : this.templateDetails.fromAccount  ;
        inputs["currency"] = !kony.sdk.isNullOrUndefined(this.view.lstbDefaultCurrency.selectedKeyValue) ? this.view.lstbDefaultCurrency.selectedKeyValue[0] : this.templateDetails.currency;
        inputs["paymentDate"] = !kony.sdk.isNullOrUndefined(this.view.calExecutionDate) && this.view.calExecutionDate.lenght<=10 ? CommonUtilities.getDateFromCalendarInBackendSupportedFormat(this.view.calExecutionDate):this.templateDetails.paymentDate;
        inputs["processingMode"] = this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() === "MULTIPLE" ? "MULTI" : this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase();
      } else {
        inputs["templateName"] = this.templateDetails.templateName;
        inputs["templateId"] = this.templateDetails.templateId;
        inputs["description"] = this.templateDetails.description;
        inputs["fromAccount"] = this.templateDetails.fromAccount;
        inputs["currency"] =  this.templateDetails.currency;
        inputs["paymentDate"] = this.templateDetails.paymentDate;
        inputs["processingMode"] = this.templateDetails.processingMode;
      }
      var POData = [];
      for (var i = 0; i < this.selectedBeneficiaries.length; i++) {
        POData[i] = {};
        POData[i]["beneficiaryName"] = this.selectedBeneficiaries[i].beneficiaryName;
        POData[i]["recipientName"] = this.selectedBeneficiaries[i].beneficiaryName;
        POData[i]["paymentMethod"] = this.selectedBeneficiaries[i].beneficiaryName;
        POData[i]["currency"] = !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i].currency) ? this.selectedBeneficiaries[i].currency : inputs["currency"];
        POData[i]["amount"] = this.deFormatAmount(this.selectedBeneficiaries[i].amount);
        POData[i]["feesPaidBy"] = this.selectedBeneficiaries[i].feesPaidBy;
        POData[i]["paymentReference"] = this.selectedBeneficiaries[i].paymentReference;
        POData[i]["accountNumber"] = this.selectedBeneficiaries[i].accountNumber;
        POData[i]["accType"] = !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i].accType) ? this.selectedBeneficiaries[i].accType : this.isDomestic(this.selectedBeneficiaries[i]) ? BBConstants.DOMESTIC : this.isSameBank(this.selectedBeneficiaries[i]) ? BBConstants.INTERNAL : this.isInternational(this.selectedBeneficiaries[i]) ? BBConstants.INTERNATIONAL : "-";
        POData[i]["swift"] = !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i].swiftCode) ? this.selectedBeneficiaries[i].swiftCode : this.selectedBeneficiaries[i].swift ;
        POData[i]["beneficiaryType"] = "EXISTINGRECIPIENT";
        POData[i]["beneficiaryNickName"] = this.selectedBeneficiaries[i].nickName;
        POData[i]["beneficiaryAddress"] = this.selectedBeneficiaries[i].address;
        POData[i]["addToExistingFlag"] = "0";
        POData[i]["bankName"] = !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i].bankName) ? this.selectedBeneficiaries[i].bankName : "-";
      }
      for (var j = 0; j < this.newlyAddedBeneficiaries.length; j++) {
        POData[i] = {};
        POData[i]["beneficiaryName"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
        POData[i]["recipientName"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
        POData[i]["paymentMethod"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
        POData[i]["currency"] = this.newlyAddedBeneficiaries[j].currency;
        POData[i]["amount"] = this.deFormatAmount(this.newlyAddedBeneficiaries[j].amount);
        POData[i]["feesPaidBy"] = this.newlyAddedBeneficiaries[j].feesPaidBy;
        POData[i]["paymentReference"] = this.newlyAddedBeneficiaries[j].paymentReference;
        POData[i]["accountNumber"] = this.newlyAddedBeneficiaries[j].accountNumber;
        POData[i]["accType"] = !kony.sdk.isNullOrUndefined(this.newlyAddedBeneficiaries[j].accType) ? this.newlyAddedBeneficiaries[j].accType : this.newlyAddedBeneficiaries[j].accountType ;
        POData[i]["swift"] = this.newlyAddedBeneficiaries[j].swift;
        POData[i]["beneficiaryType"] = "MANUALLYADDED";
        POData[i]["beneficiaryNickName"] = this.newlyAddedBeneficiaries[j].nickName;
        POData[i]["beneficiaryAddress"] = "-";
        POData[i]["addToExistingFlag"] = this.newlyAddedBeneficiaries[j].btnEdit.isVisible === true ? "1" : "0";
        POData[i]["bankName"] = !kony.sdk.isNullOrUndefined(this.newlyAddedBeneficiaries[j].bankName) ? this.newlyAddedBeneficiaries[j].bankName : "-";
        i = i + 1;
      }
      inputs["POs"] = JSON.stringify(POData);
      var requestInput = JSON.stringify(inputs);
	  if(requestInput === this.oldPayOrderData)
		{
			this.noEditDone = true;
		}
	  this.bulkPaymentsModule.presentationController.editBulkPaymentTemplate(inputs);
    },

        editTemplateSuccess: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.view.flxAcknowledgementContainer.isVisible = true;
      this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
            this.view.flxAcknowledgementNew.rTextSuccess.text = this.templateDetails.templateName + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.HasBeenSuccessfullyUpdated");
      this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
          var scopeObj = this;
          scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
          this.view.forceLayout();
      }.bind(this);
    },
    
    editBeneficiaryDetails: function(eventobject, context) {
      var row = context.rowIndex;
      var section = context.sectionIndex;
      var selectedRowData = this.view.TabBodyNewAddedBen.getData()[section][1][row];
      this.showAddNewBeneficiary(selectedRowData)
    },

    updateBeneficiaryDetails: function(accNo) {
      var index;
      for (var i = 0; i < this.newlyAddedBeneficiaries.length; i++) {
        if (this.newlyAddedBeneficiaries[i]["accountNumber"] === accNo) {
          index = i;
          break;
        }
      }
      var feesPaid = "";
      var accNum = this.view.tbxRecipAccNumber.text;
      var bankName = "";
      var paymentMethod = "";
      var addToExisting = "";
      if (this.view.imgAdd1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
        paymentMethod = BBConstants.INTERNAL;
      } else {
        if (this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
          paymentMethod = BBConstants.DOMESTIC;
        } else {
          paymentMethod = BBConstants.INTERNATIONAL;
        }
      }
      if (this.view.lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
        addToExisting = true;
      } else {
        addToExisting = false;
      }
      var formatManager = applicationManager.getFormatUtilManager();
            var currency = this.view.lbxCurrency.selectedKey;
            if ((this.view.tbxRecipientBankName.text === "" || this.view.tbxRecipientBankName.text === "-")&&  paymentMethod === BBConstants.INTERNAL) {
        bankName = kony.i18n.getLocalizedString("i18n.common.KonyRetailBanking");
      } else {
        bankName = this.view.tbxRecipientBankName.text;
      }
      if (this.view.imgFees1Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
        feesPaid = "Me"
      } else if (this.view.imgFees2Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
        feesPaid = "Beneficiary"
      } else {
        feesPaid = "Shared";
      }
      if (paymentMethod === BBConstants.INTERNAL) {feesPaid = "-";}

      this.newlyAddedBeneficiaries[index]["accountType"] = paymentMethod;
      this.newlyAddedBeneficiaries[index]["recipientName"] = kony.sdk.isNullOrUndefined(this.view.tbxRecipientName.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxRecipientName.text;
      this.newlyAddedBeneficiaries[index]["accountNumber"] = accNum;
      this.newlyAddedBeneficiaries[index]["bankName"] = bankName;
      this.newlyAddedBeneficiaries[index]["swift"] = kony.sdk.isNullOrUndefined(this.view.tbxSwiftCode.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxSwiftCode.text;
      this.newlyAddedBeneficiaries[index]["currency"] = currency;
      this.newlyAddedBeneficiaries[index]["amount"] = this.view.tbxAmountValue.text;
      this.newlyAddedBeneficiaries[index]["feesPaidBy"] = feesPaid;
      this.newlyAddedBeneficiaries[index]["paymentReference"] = kony.sdk.isNullOrUndefined(this.view.tbxPaymentRefValue.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxPaymentRefValue.text;
      this.newlyAddedBeneficiaries[index]["beneficiaryName"] = kony.sdk.isNullOrUndefined(this.view.tbxRecipientName.text) ? kony.i18n.getLocalizedString("i18n.common.NA"): this.view.tbxRecipientName.text;
      this.newlyAddedBeneficiaries[index]["lblAccountNoValue"] = accNum;
      this.newlyAddedBeneficiaries[index]["lblPayRefValue"] = kony.sdk.isNullOrUndefined(this.view.tbxPaymentRefValue.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxPaymentRefValue.text;
      this.newlyAddedBeneficiaries[index]["lblViewAmount"] = this.view.tbxAmountValue.text;
      this.newlyAddedBeneficiaries[index]["lblAccTypeValue"] = kony.sdk.isNullOrUndefined(this.view.tbxSwiftCode.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxSwiftCode.text;
      this.newlyAddedBeneficiaries[index]["lblFeesValue"] = feesPaid;
      this.newlyAddedBeneficiaries[index]["lblSwiftCodeValue"] = kony.sdk.isNullOrUndefined(this.view.tbxSwiftCode.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxSwiftCode.text;
      this.newlyAddedBeneficiaries[index]["btnEdit"].isVisible = addToExisting;
      this.newlyAddedBeneficiaries[index]["flxActions"].isVisible = addToExisting;
      this.newlyAddedBeneficiaries[index]["accType"] = paymentMethod;
      this.view.flxAcknowledgementNew.rTextSuccess.skin = "";
      this.view.tbxSearchBox1.text = "";
      this.addBeneficiariesToTemplate();
      this.view.flxAcknowledgementContainer.isVisible = true;
      this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
      //this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.newBenficiariesAdded");
      this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.payments.paymentDetailsUpdatedSuccessfully");
      this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
        var scopeObj = this;
        scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
        this.view.forceLayout();
      }.bind(this);
    },
    
    onflxEditDetailsClick: function() {
      this.editAddedBeneficiaries();
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
    },
    
    editAddedBeneficiaries: function() {
      var scopeObj = this;
      this.resetUI();
      this.isEditFlow = true;
      this.view.TabBodyNewAddedBen.setVisibility(false);
      this.view.flxSearchBox.setVisibility(false);
      this.view.flxViewRecipients.setVisibility(false);
      this.view.flxEmptyBen.setVisibility(true);
      this.view.flxTabletAccountsSeparator.setVisibility(false);
      this.view.flxHeader.setVisibility(false);
      this.view.flxSummary1.setVisibility(false);
      this.view.flxAddBeneficiaryOptions.setVisibility(true);
      this.view.flxTopSeparator.setVisibility(false);
      this.view.flxBeneficiaryUI.setVisibility(true);
      this.view.flxCreateDetails.setVisibility(false);
      this.view.flxProcessinModeInfo.setVisibility(false);
      this.view.flxProcessingMode.setVisibility(false);
      this.view.lblExecutionDate.setVisibility(false);
      this.view.flxDate.setVisibility(false);
      this.view.flxExistingBeneficiaries.setVisibility(false);
      this.view.lblDescription.setVisibility(false);
      this.view.flxTemplateDescription.setVisibility(false);
      this.view.flxBottomSeperator.setVisibility(false);
      this.view.createFlowFormActionsNew.isVisible = false;
      this.view.flxBeneficiaryUI.isVisible = true;
      this.view.createFlowFormActionsNew.isVisible = false;
      this.view.CommonFormActionsExt.setVisibility(true);
      this.view.flxCreateBulkRequest.isVisible = false;
      this.view.flxSearch.isVisible = false;
      this.view.formActionsNew.isVisible = false;
      this.view.flxEditDetails.isVisible = false;
      this.view.flxSummary.isVisible = false;
      var data;
      var formatManager = applicationManager.getFormatUtilManager();
      var numOfTransactions =  this.selectedBeneficiaries.length + this.newlyAddedBeneficiaries.length; 
	  this.view.lblTitle1.text = kony.i18n.getLocalizedString("kony.i18n.common.addedBeneficiaries") + " (" + numOfTransactions + ") ";
      if (this.selectedBeneficiaries.length === 0 && this.newlyAddedBeneficiaries.length === 0) {
        data = this.beneficiaryData;
        this.selectedBeneficiaries = data.filter(function(item) {
          return item.beneficiaryType == "EXISTINGRECIPIENT";
        });
        this.newlyAddedBeneficiaries = data.filter(function(item) {
          return item.beneficiaryType == "MANUALLYADDED";
        });

        this.newlyAddedBeneficiaries.forEach(function(item) {
          if (item.flxActions.isVisible === true || item.btnEdit.isVisible ===true) {
            item.flxActions.isVisible = true;
            item.amountWithCurrency = formatManager.getCurrencySymbol(item.currency) + item.amount ;
          }
        });
        this.selectedBeneficiaries.forEach(function(item) {
          item.amountWithCurrency = formatManager.getCurrencySymbol(item.currency) + item.amount ;
        });
      } else {
        var existing = "EXISTINGRECIPIENT";
        var added = "MANUALLYADDED";
        this.selectedBeneficiaries.forEach(function(item) {
          item["beneficiaryType"] = existing;
        });
        this.newlyAddedBeneficiaries.forEach(function(item) {
          item["beneficiaryType"] = added;
          item.flxActions.isVisible=true;
          item.btnEdit.isVisible=true;

          if (item.flxActions.isVisible === true || item.btnEdit.isVisible ===true) {
            item.flxActions.isVisible = true;
            item.amountWithCurrency = formatManager.getCurrencySymbol(item.currency) + item.amount ;
          }
        });
        this.selectedBeneficiaries.forEach(function(item) {
          item.amountWithCurrency = formatManager.getCurrencySymbol(item.currency) + item.amount ;
        });
        data = [].concat(this.selectedBeneficiaries, this.newlyAddedBeneficiaries);
      }
      this.view.flxMethod.onClick = this.fetchExistingBeneficiaries.bind(this);
      this.view.flxMethod2.onClick = this.showAddNewBeneficiary.bind(this);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editTemplateAddPaymentInformation");
      this.view.flxEditBeneficiary.isVisible = this.selectedBeneficiaries.length === 0 && this.newlyAddedBeneficiaries.length === 0 ? false : true;
      this.view.flxEditBeneficiary.onClick = this.addBeneficiaries.bind(this);
      this.view.flxViewRecipients.isVisible = true;
      this.view.tbxSearchBox1.text = "";
      this.addBeneficiariesToTemplate();
      this.adjustScreen(70);
      this.view.forceLayout();
    },
	
	updateExistingBeneficiaryDetails: function(accNo) {
            var index;
            for (var i = 0; i < this.selectedBeneficiaries.length; i++) {
                if (this.selectedBeneficiaries[i]["accountNumber"] === accNo) {
                    index = i;
                    break;
                }
            }
            var feesPaid = "";
            var accNum = this.view.tbxRecipAccNumber.text;
            var bankName = "";
            var paymentMethod = "";
            var addToExisting = "";
            if (this.view.imgAdd1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                paymentMethod = BBConstants.INTERNAL;
            } else {
                if (this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                    paymentMethod = BBConstants.DOMESTIC;
                } else {
                    paymentMethod = BBConstants.INTERNATIONAL;
                }
            }
            if (this.view.lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                addToExisting = true;
            } else {
                addToExisting = false;
            }
            var formatManager = applicationManager.getFormatUtilManager();
            var currency = this.view.lbxCurrency.selectedKey;
            if ((this.view.tbxRecipientBankName.text === "" || this.view.tbxRecipientBankName.text === "-") && paymentMethod === BBConstants.INTERNAL) {
                bankName = kony.i18n.getLocalizedString("i18n.common.KonyRetailBanking");
              //bankName = kony.i18n.getLocalizedString("i18n.common.EuroBank");
            } else {
                bankName = this.view.tbxRecipientBankName.text;
            }
            if (this.view.imgFees1Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                feesPaid = "Me";
            } else if (this.view.imgFees2Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                feesPaid = "Beneficiary";
            } else {
                feesPaid = "Shared";
            }
           if (paymentMethod === BBConstants.INTERNAL) {feesPaid = "-";}

            this.selectedBeneficiaries[index]["accountType"] = paymentMethod;
            this.selectedBeneficiaries[index]["recipientName"] = kony.sdk.isNullOrUndefined(this.view.tbxRecipientName.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxRecipientName.text;
            this.selectedBeneficiaries[index]["accountNumber"] = accNum;
            this.selectedBeneficiaries[index]["bankName"] = bankName;
            this.selectedBeneficiaries[index]["swift"] = kony.sdk.isNullOrUndefined(this.view.tbxSwiftCode.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxSwiftCode.text;
            this.selectedBeneficiaries[index]["currency"] = currency;
      		this.selectedBeneficiaries[index]["swiftCode"] = kony.sdk.isNullOrUndefined(this.view.tbxSwiftCode.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxSwiftCode.text;
            this.selectedBeneficiaries[index]["amount"] = this.view.tbxAmountValue.text;
            this.selectedBeneficiaries[index]["feesPaidBy"] = feesPaid;
            this.selectedBeneficiaries[index]["paymentReference"] = kony.sdk.isNullOrUndefined(this.view.tbxPaymentRefValue.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxPaymentRefValue.text;
            this.selectedBeneficiaries[index]["beneficiaryName"] = kony.sdk.isNullOrUndefined(this.view.tbxRecipientName.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxRecipientName.text;
            this.selectedBeneficiaries[index]["lblAccountNoValue"] = accNum;
            this.selectedBeneficiaries[index]["lblPayRefValue"] = kony.sdk.isNullOrUndefined(this.view.tbxPaymentRefValue.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxPaymentRefValue.text;
            this.selectedBeneficiaries[index]["lblViewAmount"] = this.view.tbxAmountValue.text;
            this.selectedBeneficiaries[index]["lblAccTypeValue"] = kony.sdk.isNullOrUndefined(this.view.tbxSwiftCode.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxSwiftCode.text;
            this.selectedBeneficiaries[index]["lblFeesValue"] = feesPaid;
            this.selectedBeneficiaries[index]["lblSwiftCodeValue"] = kony.sdk.isNullOrUndefined(this.view.tbxRecipientBankName.text) ? kony.i18n.getLocalizedString("i18n.common.NA") : this.view.tbxRecipientBankName.text;
            this.selectedBeneficiaries[index]["btnEdit"].isVisible = addToExisting;
            this.selectedBeneficiaries[index]["flxActions"].isVisible = addToExisting;
            this.selectedBeneficiaries[index]["accType"] = paymentMethod;
            this.selectedBeneficiaries[index]["amountWithCurrency"] = formatManager.getCurrencySymbol(currency) + CommonUtilities.formatCurrencyWithCommas(this.selectedBeneficiaries[index]["amount"], true);

            for (var j = 0; j < this.beneficiaryData.length; j++) {
            if (this.selectedBeneficiaries[index]["accountNumber"] === this.beneficiaryData[j]["accountNumber"] && this.selectedBeneficiaries[index]["swiftCode"] === this.beneficiaryData[j]["swiftCode"] && this.selectedBeneficiaries[index]["beneficiaryName"] === this.beneficiaryData[j]["beneficiaryName"]) {

            this.beneficiaryData[j]["currency"] = currency;
            this.beneficiaryData[j]["amountWithCurrency"] = formatManager.getCurrencySymbol(currency) + CommonUtilities.formatCurrencyWithCommas(this.selectedBeneficiaries[index]["amount"], true);
            }
            }
            this.view.flxAcknowledgementNew.rTextSuccess.skin = "";
            this.view.tbxSearchBox1.text = "";
            this.addBeneficiariesToTemplate();
            this.view.flxAcknowledgementContainer.isVisible = true;
            this.view.flxAcknowledgementNew.rTextSuccess.skin = ViewConstants.SKINS.ACKNOWLEDGEMENT_SKIN;
             this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.payments.paymentDetailsUpdatedSuccessfully");
            this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
                var scopeObj = this;
                scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
                this.view.forceLayout();
            }.bind(this);
        },


    onSearchDone: function() {
      var self = this;
      var searchString = self.view.tbxSearchBox1.text.toLocaleLowerCase();
      var selectedRecords = Object.values(this.selectedBeneficiaries).filter(selectedRecords => selectedRecords.beneficiaryName.toLocaleLowerCase().includes(searchString) || 
                                               selectedRecords.bankName.toLocaleLowerCase().includes(searchString) || 
                                               (!kony.sdk.isNullOrUndefined(selectedRecords.paymentMethod) && selectedRecords.paymentMethod.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(selectedRecords.fromAccount) && selectedRecords.fromAccount.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(selectedRecords.accountNumber) && selectedRecords.accountNumber.toLocaleLowerCase().includes(searchString)) ||  
                                               (!kony.sdk.isNullOrUndefined(selectedRecords.swiftCode) && selectedRecords.swiftCode.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(selectedRecords.swift) && selectedRecords.swift.toLocaleLowerCase().includes(searchString)));
      var addedRecords = Object.values(this.newlyAddedBeneficiaries).filter(addedRecords => addedRecords.beneficiaryName.toLocaleLowerCase().includes(searchString) || 
                                               addedRecords.bankName.toLocaleLowerCase().includes(searchString) || 
                                               (!kony.sdk.isNullOrUndefined(addedRecords.paymentMethod) && addedRecords.paymentMethod.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(addedRecords.fromAccount) && addedRecords.fromAccount.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(addedRecords.accountNumber) && addedRecords.accountNumber.toLocaleLowerCase().includes(searchString)) ||  
                                               (!kony.sdk.isNullOrUndefined(addedRecords.swiftCode) && addedRecords.swiftCode.toLocaleLowerCase().includes(searchString)) || 
                                               (!kony.sdk.isNullOrUndefined(addedRecords.swift) && addedRecords.swift.toLocaleLowerCase().includes(searchString)));
      this.addBeneficiariesToTemplate(selectedRecords, addedRecords);
    },

    onSearchKeyUp: function() {
      this.updateFetchParams();
      this.view.imgClearIcon1.isVisible = true;
      this.view.imgClearIcon1.onTouchStart = function() {
        this.view.tbxSearchBox1.text = "";
        this.view.imgClearIcon1.isVisible = false;
        this.addBeneficiariesToTemplate();
      }.bind(this);
    },
    
    checkUserPermission: function(permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
    },
    
    setPermissionBasedUIonAddPOClick: function() {
            if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_SAMEBANK") === true) && (this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_INATIONAL") === false) && (this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_DOMESTIC") === false)) {
                this.view.imgAdd1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
				this.view.imgAdd1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
				this.view.imgAdd1.setEnabled(false);
                this.view.imgAdd2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgAdd2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgAdd2.setEnabled(false);
            }
			if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_SAMEBANK") === true) && ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_INATIONAL") === true) || (this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_DOMESTIC") === true))) {
				this.view.imgAdd1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
				this.view.imgAdd1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
				this.view.imgAdd1.setEnabled(true);
                this.view.imgAdd2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgAdd2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgAdd2.setEnabled(true);
            }
			if (this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_SAMEBANK") === false)
			{
				this.view.flxBankAccountType.isVisible = true;
				this.view.flxRecipientBankName.isVisible = true;
                this.view.flxRecipientAccountNumber.isVisible = true;
                this.view.flxFeesPaidByOptions.isVisible = true;
				this.view.flxSwiftCode.isVisible = true;
                this.view.flxSwftCode.isVisible = true;
	            this.view.flxAccountType.isVisible = true;
                this.OnRadioBtnClickFeesPaidBy(3);
                this.view.imgAdd1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgAdd1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgAdd1.setEnabled(false);
                this.view.imgAdd2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.view.imgAdd2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgAdd2.setEnabled(false);
                this.setPermissionBasedUIonExternalClick();
				this.view.tbxRecipAccNumber.onEndEditing = this.validateIBAN.bind(this);
                this.view.tbxSwiftCode.onEndEditing = this.validateSwiftCode.bind(this);
                this.view.tbxRecipAccNumber.onBeginEditing = function() {
                  var scopeObj = this;
                  scopeObj.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
                  scopeObj.view.lblInvalidIBANInfinity.setVisibility(false);
                  scopeObj.view.forceLayout();
                }.bind(this);
			}
	    },
        setPermissionBasedUIonExternalClick: function() {
           if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_DOMESTIC") === true) && (this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_INATIONAL") === true))
				{
					this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
					this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
					this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
					this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
					this.view.imgRadioBtnRecipientType1.setEnabled(true);
					this.view.imgRadioBtnRecipientType2.setEnabled(true);
				}
				if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_DOMESTIC") === true) && (this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_INATIONAL") === false))
				{
					this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
					this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
					this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
					this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
					this.view.imgRadioBtnRecipientType1.setEnabled(false);
					this.view.imgRadioBtnRecipientType2.setEnabled(false);
				}
				if ((this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_DOMESTIC") === false) && (this.checkUserPermission("BULK_PAYMENT_TEMPLATE_ADD_PO_EXTERNAL_INATIONAL") === true))
				{
					this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
					this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
					this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
					this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
					this.view.imgRadioBtnRecipientType1.setEnabled(false);
					this.view.imgRadioBtnRecipientType2.setEnabled(false);
				}
        },
		
		getOldPOData: function() {
            var oldinputs = {};
            if (!this.isEditFlow) {
                oldinputs["templateName"] = !kony.sdk.isNullOrUndefined(this.view.tbxTemplateName.text) && this.view.tbxTemplateName.text !== "" ? this.view.tbxTemplateName.text : this.templateDetails.templateName;
                oldinputs["templateId"] = this.templateDetails.templateId;
                oldinputs["description"] = !kony.sdk.isNullOrUndefined(this.view.tbxTemplateDescription.text) && this.view.tbxTemplateDescription.text !== "" ? this.view.tbxTemplateDescription.text : this.templateDetails.description;
                oldinputs["fromAccount"] = !kony.sdk.isNullOrUndefined(this.view.lblSelectAccount.accountID) ? this.view.lblSelectAccount.accountID : this.templateDetails.fromAccount;
                oldinputs["currency"] = !kony.sdk.isNullOrUndefined(this.view.lstbDefaultCurrency.selectedKeyValue) ? this.view.lstbDefaultCurrency.selectedKeyValue[0] : this.templateDetails.currency;
                oldinputs["paymentDate"] = !kony.sdk.isNullOrUndefined(this.view.calExecutionDate) && this.view.calExecutionDate.lenght <= 10 ? CommonUtilities.getDateFromCalendarInBackendSupportedFormat(this.view.calExecutionDate) : this.templateDetails.paymentDate;
                oldinputs["processingMode"] = this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase() === "MULTIPLE" ? "MULTI" : this.view.lstbProcessingMode.selectedKeyValue[1].toUpperCase();
            } else {
                oldinputs["templateName"] = this.templateDetails.templateName;
                oldinputs["templateId"] = this.templateDetails.templateId;
                oldinputs["description"] = this.templateDetails.description;
                oldinputs["fromAccount"] = this.templateDetails.fromAccount;
                oldinputs["currency"] = this.templateDetails.currency;
                oldinputs["paymentDate"] = this.templateDetails.paymentDate;
                oldinputs["processingMode"] = this.templateDetails.processingMode;
            }
            var oldPOData = [];
            for (var i = 0; i < this.selectedBeneficiaries.length; i++) {
                oldPOData[i] = {};
                oldPOData[i]["beneficiaryName"] = this.selectedBeneficiaries[i].beneficiaryName;
                oldPOData[i]["recipientName"] = this.selectedBeneficiaries[i].beneficiaryName;
                oldPOData[i]["paymentMethod"] = this.selectedBeneficiaries[i].beneficiaryName;
                oldPOData[i]["currency"] = !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i].currency) ? this.selectedBeneficiaries[i].currency : oldinputs["currency"];
                oldPOData[i]["amount"] = this.deFormatAmount(this.selectedBeneficiaries[i].amount);
                oldPOData[i]["feesPaidBy"] = this.selectedBeneficiaries[i].feesPaidBy;
                oldPOData[i]["paymentReference"] = this.selectedBeneficiaries[i].paymentReference;
                oldPOData[i]["accountNumber"] = this.selectedBeneficiaries[i].accountNumber;
                oldPOData[i]["accType"] = !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i].accType) ? this.selectedBeneficiaries[i].accType : this.isDomestic(this.selectedBeneficiaries[i]) ? BBConstants.DOMESTIC : this.isSameBank(this.selectedBeneficiaries[i]) ? BBConstants.INTERNAL : this.isInternational(this.selectedBeneficiaries[i]) ? BBConstants.INTERNATIONAL : "-";
                oldPOData[i]["swift"] = this.selectedBeneficiaries[i].swiftCode;
                oldPOData[i]["beneficiaryType"] = "EXISTINGRECIPIENT";
                oldPOData[i]["beneficiaryNickName"] = this.selectedBeneficiaries[i].nickName;
                oldPOData[i]["beneficiaryAddress"] = this.selectedBeneficiaries[i].address;
                oldPOData[i]["addToExistingFlag"] = "0";
                oldPOData[i]["bankName"] = !kony.sdk.isNullOrUndefined(this.selectedBeneficiaries[i].bankName) ? this.selectedBeneficiaries[i].bankName : "-";
            }
            for (var j = 0; j < this.newlyAddedBeneficiaries.length; j++) {
                oldPOData[i] = {};
                oldPOData[i]["beneficiaryName"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
                oldPOData[i]["recipientName"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
                oldPOData[i]["paymentMethod"] = this.newlyAddedBeneficiaries[j].beneficiaryName;
                oldPOData[i]["currency"] = this.newlyAddedBeneficiaries[j].currency;
                oldPOData[i]["amount"] = this.deFormatAmount(this.newlyAddedBeneficiaries[j].amount);
                oldPOData[i]["feesPaidBy"] = this.newlyAddedBeneficiaries[j].feesPaidBy;
                oldPOData[i]["paymentReference"] = this.newlyAddedBeneficiaries[j].paymentReference;
                oldPOData[i]["accountNumber"] = this.newlyAddedBeneficiaries[j].accountNumber;
                oldPOData[i]["accType"] = !kony.sdk.isNullOrUndefined(this.newlyAddedBeneficiaries[j].accType) ? this.newlyAddedBeneficiaries[j].accType : this.newlyAddedBeneficiaries[j].accountType;
                oldPOData[i]["swift"] = this.newlyAddedBeneficiaries[j].swift;
                oldPOData[i]["beneficiaryType"] = "MANUALLYADDED";
                oldPOData[i]["beneficiaryNickName"] = this.newlyAddedBeneficiaries[j].nickName;
                oldPOData[i]["beneficiaryAddress"] = "-";
                oldPOData[i]["addToExistingFlag"] = this.newlyAddedBeneficiaries[j].btnEdit.isVisible === true ? "1" : "0";
                oldPOData[i]["bankName"] = !kony.sdk.isNullOrUndefined(this.newlyAddedBeneficiaries[j].bankName) ? this.newlyAddedBeneficiaries[j].bankName : "-";
                i = i + 1;
            }
            oldinputs["POs"] = JSON.stringify(oldPOData);
            oldPayOrderData = JSON.stringify(oldinputs);
            return oldPayOrderData;
        },
  
      
    
  }
  
});