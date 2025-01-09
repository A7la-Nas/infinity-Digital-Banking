define("AccountModule/userfrmAccountsTransactionDetailsController", {
    customerId: "",
    accountId: "",
    transactionType: "",
    mediaType: "pdf",
    base64Front: "",
    base64Back: "",
    segmentCheckdata : [{}],
    init: function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },

  onNavigate: function(obj) {
        var scope = this;
    var config = applicationManager.getConfigurationManager();
        kony.application.dismissLoadingScreen();
        kony.store.setItem("CURRENCYCODE", "$");
        var navMan = applicationManager.getNavigationManager();
		var requestParamAccount = navMan.getCustomInfo("frmAccountDetails");
        this.accountId = requestParamAccount.selectedAccountData.accountID;
        var context = navMan.getCustomInfo("frmAccountsTransactionDetails");
        var customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
        context["customerId"] = customerId;
		context["accountId"] = this.accountId;
        this.view.accountsTransactionDetailsNative.setContext(context);
		this.view.accountsTransactionDetailsNative.downloadCheck = this.btnReferenceValueOnClick;
        this.preShow();
        scope.view.accountsTransactionDetailsNative.navigateToViewAttachments = function(attachments)
      {
         navManager = applicationManager.getNavigationManager();
         navManager.setCustomInfo("attachmentsList", attachments);
        var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        accMod.presentationController.commonFunctionForNavigation("AccountModule/frmShowAttachments");
      }
  },
  
    preShow: function(obj) {
        var scope = this;
        var MenuHandler = applicationManager.getMenuHandler();
        var navMan = applicationManager.getNavigationManager();
        var userManager = applicationManager.getUserPreferencesManager();
        this.customerId = userManager.getBackendIdentifier();
        var requestParamAccount = navMan.getCustomInfo("frmAccountDetails");
        this.accountId = requestParamAccount.selectedAccountData.accountID;
        this.view.flxTransfers.setVisibility(false);
        this.view.flxBlockedFundsDetails.setVisibility(false);
        this.registerActions();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
		this.transactionType = transactionData.transactionType;
        var deviceUtilManager = applicationManager.getDeviceUtilManager();
        var isIphone = deviceUtilManager.isIPhone();
        this.view.accountsTransactionDetailsNative.contextualActionButtonOnClick = this.getContextualData;
        this.view.accountsTransactionDetailsNative.getBtnEntitlement = this.getBtnEntitlement;
        this.view.lblAttachmentsValue.text = "";
      if (transactionData.transactionType == "BlockedFund") { 
        this.view.flxTransfers.setVisibility(false);
        this.view.flxBlockedFundsDetails.setVisibility(true);
        this.view.lblBlockedAmountTitle.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.blockedAmount")+":";
        this.view.lblReferenceNumberTitle.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.referenceNo")+":";
        this.view.lblDescriptionTitle.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.BlockedfundDescription")+":";
        this.view.lblFromDateTitle.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.fromDate")+":";
        this.view.lblToDateTitle.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.todate")+":";
        this.view.lblBlockedAmountValue.text = transactionData.lockedAmount;
        this.view.lblReferenceNumberValue.text = transactionData.transactionReference;
        this.view.lblAccountType.text = transactionData.accountType;
        this.view.lblDescriptionValue.text = transactionData.lockReason;
        this.view.lblFromDateValue.text = transactionData.fromDate;
        this.view.lblToDateValue.text = transactionData.toDate;
      } else {
        var attachments = transactionData.fileNames;
        var attachmentFileNames = [];
        if(attachments && attachments.length>0){
        for(var i=0; i<attachments.length;i++){
          this.view.lblAttachmentsValue.text += attachments[i].fileName;
          attachmentFileNames.push(attachments[i].fileName);
          if(i !== attachments.length-1)
            this.view.lblAttachmentsValue.text += ", ";
          }
        this.view.flxViewAttachments.setVisibility(true);
        navMan.setCustomInfo("attachmentsList", attachmentFileNames);
        this.view.flxViewAttachments.onClick = this.navigateToDownloadAttachments;
        }
        else{
          this.view.lblAttachmentsValue.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.common.none");
          this.view.flxViewAttachments.setVisibility(false);
        }
        this.view.flxBlockedFundsDetails.setVisibility(false);
            // this.view.flxTransfers.setVisibility(true);
        this.view.lblReferenceNoValueTrans.setVisibility(true);
        this.view.btnReferenceValue.setVisibility(false);
        this.view.segCheckImages.setVisibility(false);
        this.view.lblTransfer.text = transactionData.transactionType;
        this.view.flxCross.onClick = this.flxCrossOnClick;
        if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null && transactionData.isScheduled === "true") {
            this.view.customHeader.btnRight.setVisibility(true);
            this.view.customHeader.btnRight.onClick = this.btnEditOnClick;
            if (isIphone) {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: this.btnEditOnClick,
                    tintColor: "FFFFFF00",
                    metaData: {
                        title: "Edit"
                    }
                });
                this.view.setRightBarButtonItems({
                    items: [rightBarButtonItem],
                    animated: true
                });
            }
            this.view.btnCancelTransactionTrans.setVisibility(true);
            this.view.btnRepeatTransactionTrans.setVisibility(false);
            this.view.lblSuccess.text = transactionData.statusDescription;
            this.view.lblSuccess.skin = "sknLbl424242SSP26px";
        } else {
            this.view.customHeader.btnRight.setVisibility(false);
            if (isIphone) {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: {},
                    tintColor: "FFFFFF00",
                    metaData: {
                        title: ""
                    }
                });
                this.view.setRightBarButtonItems({
                    items: [rightBarButtonItem],
                    animated: true
                });
            }
			var configManager = applicationManager.getConfigurationManager();
		    var userPermissionList = configManager.getCreateGeneralTransactionPermissionsList();
		    for (i=0;i<userPermissionList.length;i++)
		    {
			  if(applicationManager.getConfigurationManager().checkUserPermission(userPermissionList[i]))
			  {
			    this.view.btnRepeatTransactionTrans.setVisibility(true);
	
			  }else
			  {
			    this.view.btnRepeatTransactionTrans.setVisibility(false);
			  }
		    }
            this.view.btnCancelTransactionTrans.setVisibility(false);
            this.view.lblSuccess.text = transactionData.statusDescription;
            this.view.lblSuccess.skin = "sknLbl43CE6E26px";
        }
        this.view.lblTransferValue.text = transactionData.amount;
        this.view.lblDescValueTrans.text = transactionData.description;
        this.view.lblReferenceNoValueTrans.text = transactionData.transactionId;
        if (transactionData.postedDate !== null && transactionData.postedDate !== undefined) {
            var formatUtil = applicationManager.getFormatUtilManager();
            var trandateobj = formatUtil.getDateObjectfromString(transactionData.postedDate, "YYYY-MM-DD");
            transactionData.postedDate = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
        }
        if (transactionData.transactionType == "InternalTransfer" || transactionData.transactionType == "ExternalTransfer") {
            this.view.lblTransfer.text = "Transfer";
            this.view.flxTransactionDateTrans.setVisibility(true);
            this.view.lblTransDateValueTrans.text = transactionData.scheduledDate;
            this.view.flxPostedDateTrans.setVisibility(true);
            this.view.lblPostedDateValueTrans.text = transactionData.postedDate;
            this.view.flxCheckNumber.setVisibility(false);
            this.view.segCheckImages.setVisibility(false);
        }
        if (transactionData.transactionType == "P2P") {
            this.view.lblTransfer.text = "Person-to-Person";
            this.view.flxTransactionDateTrans.setVisibility(true);
            this.view.lblTransDateValueTrans.text = transactionData.scheduledDate;
            this.view.flxPostedDateTrans.setVisibility(true);
            this.view.lblPostedDateValueTrans.text = transactionData.postedDate;
            this.view.flxCheckNumber.setVisibility(false);
            this.view.segCheckImages.setVisibility(false);
        }
        if (transactionData.transactionType == "Deposit") {
            this.view.lblTransfer.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.Accounts.backendDeposit");
            this.view.flxTransactionDateTrans.setVisibility(false);
            this.view.flxPostedDateTrans.setVisibility(true);
            this.view.lblPostedDateValueTrans.text = transactionData.showDate;
          //  this.view.lblCheckNumberValue.text = transactionData.checkNumber;
          //  this.view.flxCheckNumber.setVisibility(true);
           // this.view.segCheckImages.setVisibility(true);
            this.view.flxCheckNumber.setVisibility(false);
            this.view.segCheckImages.setVisibility(false);
            this.view.btnCancelTransactionTrans.setVisibility(false);
            this.view.btnRepeatTransactionTrans.setVisibility(false);
        /*    var scope = this;
            var data = [{
                lblFront: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.checkDeposit.front"),
                lblBack: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.checkDeposit.back"),
                imgFront: {
                    "src": "checksmall.png",
                    "onTouchEnd": scope.imgFrontOnTouchEnd.bind(scope, {})
                },
                imgBack: {
                    "src": "checksmall.png",
                    "onTouchEnd": scope.imgBackOnTouchEnd.bind(scope, {})
                }
            }];
            this.view.segCheckImages.setData(data);
            if (data.length > 1) {
                this.view.segCheckImages.needPageIndicator = true;
            } else {
                this.view.segCheckImages.needPageIndicator = false;
            }
            this.view.forceLayout();*/
        }
        if (transactionData.transactionType == "Cardless") {
            this.view.lblTransfer.text = "Cash Withdrawal";
            this.view.flxTransactionDateTrans.setVisibility(true);
            this.view.lblTransDateValueTrans.text = transactionData.scheduledDate;
            this.view.flxPostedDateTrans.setVisibility(false);
            this.view.flxCheckNumber.setVisibility(false);
            this.view.segCheckImages.setVisibility(false);
            this.view.btnCancelTransactionTrans.setVisibility(false);
            this.view.btnRepeatTransactionTrans.setVisibility(false);
        }
        if (transactionData.transactionType == "BillPay") {
            this.view.lblTransfer.text = "Bill Pay";
            this.view.flxTransactionDateTrans.setVisibility(true);
            this.view.lblTransDateValueTrans.text = transactionData.scheduledDate;
            this.view.flxPostedDateTrans.setVisibility(true);
            this.view.lblPostedDateValueTrans.text = transactionData.postedDate;
            this.view.flxCheckNumber.setVisibility(false);
            this.view.segCheckImages.setVisibility(false);
        }
        if (transactionData.transactionType == "Wire") {
            this.view.lblTransfer.text = "Wire Transfer";
            this.view.flxTransactionDateTrans.setVisibility(true);
            this.view.lblTransDateValueTrans.text = transactionData.scheduledDate;
            this.view.flxPostedDateTrans.setVisibility(true);
            this.view.lblPostedDateValueTrans.text = transactionData.postedDate;
            this.view.flxCheckNumber.setVisibility(false);
            this.view.segCheckImages.setVisibility(false);
        }
        if (transactionData.transactionType == "Interest" || transactionData.transactionType == "Tax" || transactionData.transactionType == "POS" || transactionData.transactionType == "InternetTransaction" || transactionData.transactionType == "CardPayment" || transactionData.transactionType == "Fee" || transactionData.transactionType == "Credit" || transactionData.transactionType == "Others") {
            this.view.lblTransfer.text = transactionData.transactionType;
            this.view.flxTransactionDateTrans.setVisibility(true);
            this.view.lblTransDateValueTrans.text = transactionData.scheduledDate;
            this.view.flxPostedDateTrans.setVisibility(false);
            this.view.flxCheckNumber.setVisibility(false);
            this.view.segCheckImages.setVisibility(false);
            this.view.btnCancelTransactionTrans.setVisibility(false);
            this.view.btnRepeatTransactionTrans.setVisibility(false);
        }
        if (transactionData.transactionType === "Cheque" || transactionData.transactionType === "Draft" || transactionData.transactionType === "CheckWithdrawal" || transactionData.transactionType === "CheckDeposit") {
            this.view.lblTransfer.text = transactionData.transactionType;
            this.view.flxTransactionDateTrans.setVisibility(false);
            this.view.lblTransDateValueTrans.text = transactionData.scheduledDate;
            this.view.flxPostedDateTrans.setVisibility(true);
            this.view.flxCheckNumber.setVisibility(true);
            this.view.segCheckImages.setVisibility(true);
            this.view.lblCheckNumberValue.text = "N.A";
            this.view.btnRepeatTransactionTrans.setVisibility(false);
            this.view.btnDownloadTransactionTrans.setVisibility(true);
            //this.view.btnDisputetTransactionTrans.setVisibility(false);
            //this.view.btnViewRequest.setVisibility(false);
            this.view.btnCancelTransactionTrans.setVisibility(false);
            this.view.btnCancelThisOccurenceTrans.setVisibility(false);
            this.view.btnCancelSeriesTrans.setVisibility(false);
            this.view.btnReferenceValue.setVisibility(false);

            this.mediaType = "png";
            this.segmentCheckdata=[{}];
            applicationManager.getPresentationUtility().showLoadingScreen();

            var paramsFrontBase64 = {
              "customerId": this.customerId,
              "accountId": this.accountId,
              "transactionRef": transactionData.transactionId,
              "mediaType": this.mediaType,
              "transactionType": this.transactionType,
              "page": "0"
            };
            var ModulePresentationController = applicationManager.getModulesPresentationController("AccountModule");
            ModulePresentationController.viewImage(paramsFrontBase64);

            if (this.transactionType !== "Draft") {
              var paramsBackBase64 = {
                "customerId": this.customerId,
                "accountId": this.accountId,
                "transactionRef": transactionData.transactionId,
                "mediaType": this.mediaType,
                "transactionType": this.transactionType,
                "page": "1"
              };
              ModulePresentationController.viewImage(paramsBackBase64);
            }
            this.view.forceLayout();
        }
        if (transactionData.transactionType === "SwiftPayment") {
            this.view.lblTransfer.text = transactionData.transactionType;
            this.view.flxTransactionDateTrans.setVisibility(true);
            this.view.lblTransDateValueTrans.text = transactionData.scheduledDate;
            this.view.flxPostedDateTrans.setVisibility(false);
            this.view.flxCheckNumber.setVisibility(false);
            this.view.segCheckImages.setVisibility(false);
            //       this.view.lblCheckNumberValue.text = transactionData.checkNumber;
            this.view.btnReferenceValue.text = transactionData.transactionId;
			var userPermissionList = configManager.getCreateGeneralTransactionPermissionsList();
			for (i=0;i<userPermissionList.length;i++)
			{
				if(applicationManager.getConfigurationManager().checkUserPermission(userPermissionList[i]))
				{
					this.view.btnRepeatTransactionTrans.setVisibility(true);
				}
				else
				{
					this.view.btnRepeatTransactionTrans.setVisibility(false);
				}
			}
            this.view.btnDownloadTransactionTrans.setVisibility(true);
            //this.view.btnDisputetTransactionTrans.setVisibility(true);
            //this.view.btnViewRequest.setVisibility(false);
            this.view.btnCancelTransactionTrans.setVisibility(false);
            this.view.btnCancelThisOccurenceTrans.setVisibility(false);
            this.view.btnCancelSeriesTrans.setVisibility(false);
            this.view.forceLayout();
            
            this.mediaType = "pdf";
            this.segmentCheckdata=[{}];
            applicationManager.getPresentationUtility().showLoadingScreen();
            var paramsFrontBase64 = {
              "customerId": this.customerId,
              "accountId": this.accountId,
              "transactionRef": transactionData.transactionId,
              "mediaType": this.mediaType,
              "transactionType": this.transactionType,
              "page": "0"
            };
            var ModulePresentationController = applicationManager.getModulesPresentationController("AccountModule");
            ModulePresentationController.viewImage(paramsFrontBase64);          
        }
        }
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
        var scope = this;
        var configManager = applicationManager.getConfigurationManager();
        if (isIphone) {
            MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUACCOUNTS);
        }
        // if (transactionData && transactionData.statusDescription == "Successful" && transactionData.transactionType !== "Deposit" && transactionData.transactionType !== "Interest") {
        //     if (transactionData.isDisputed && transactionData.isDisputed == "true") {
        //         this.view.btnDisputetTransactionTrans.setVisibility(false);
        //         this.view.btnViewRequest.setVisibility(true);
        //     } else {
        //         this.view.btnDisputetTransactionTrans.setVisibility(true);
        //         this.view.btnViewRequest.setVisibility(false);
        //     }
        // } else {
        //     this.view.btnDisputetTransactionTrans.setVisibility(false);
        //     this.view.btnViewRequest.setVisibility(false);
        // }
        this.view.btnViewRequest.onClick = function() {
            navManager.setEntryPoint("ViewRequest", "TransactionDetails");
            applicationManager.getPresentationUtility().showLoadingScreen();
            applicationManager.getModulesPresentationController("DisputeTransactions").getDisputeTransactionDetails();
        };
        this.view.btnDisputetTransactionTrans.onClick = function() {
            var disputeModule = applicationManager.getModulesPresentationController("DisputeTransactions");
            navManager.setCustomInfo("frmDisputeTransactionDetails", navMan.getCustomInfo("frmAccountsTransactionDetails"));
            navManager.setEntryPoint("DisputeEntry", "frmAccountsTransactionDetails");
            disputeModule.navigateToDisputeReason("frmDisputeReason");
        };
        this.view.btnDownloadTransactionTrans.onClick = this.onclickdownload;
      	if(this.transactionType !== "Cheque" && this.transactionType !== "Draft" && this.transactionType !== "SwiftPayment" && this.transactionType !== "CheckWithdrawal" && this.transactionType !== "CheckDeposit")
        {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
      	this.postShow();
    },
    postShow: function () {
        var navMan = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
        var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(transactionData.transactionDate), new Date());
        if (configManager.getDisputeConfig(transactionData.transactionType)) {
            if (transactionData.isScheduled !== "true" && transactionData.statusDescription !== "Pending" && configManager.getDisputeConfig(transactionData.transactionType) === "true" && dateDiff <= configManager.getDisputeDuration() && (configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === true || configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === "true")) {
                if (configManager.getDisputeCDConfig("both") || (configManager.getDisputeCDConfig("debit") && formatUtil.isDebitTransaction(transactionData.amount)) || (configManager.getDisputeCDConfig("credit") && formatUtil.isCreditTransaction(transactionData.amount))) {
                    if (transactionData.isDisputed && transactionData.isDisputed === "true") {
                        this.view.btnDisputetTransactionTrans.setVisibility(false);
                        this.view.btnViewRequest.setVisibility(true);
                    }
                    else {
                        this.view.btnDisputetTransactionTrans.setVisibility(true);
                        this.view.btnViewRequest.setVisibility(false);
                    }
                }
                else {
                    this.view.btnDisputetTransactionTrans.setVisibility(false);
                    this.view.btnViewRequest.setVisibility(false);
                }
            }
            else {
                this.view.btnDisputetTransactionTrans.setVisibility(false);
                this.view.btnViewRequest.setVisibility(false);
            }
        }
    },
    navigateToDownloadAttachments: function(){
      var ntf = new kony.mvc.Navigation("frmShowAttachments");
      ntf.navigate();
   },
    onclickdownload: function() {
      var searchDownloadFileParams = {
        "format": "pdf",
            "transactionId": this.view.lblReferenceNoValueTrans.text
            //"transactionId": transactionData.transactionId
      };
      var navMan=applicationManager.getNavigationManager();
      var requestParamAccount = navMan.getCustomInfo("frmAccountDetails");
        // searchDownloadFileParams.accountNumber = requestParamAccount.selectedAccountData.accountID;
      var ModulePresentationController = applicationManager.getModulesPresentationController("AccountModule");
      ModulePresentationController.downloadTransactionFile(searchDownloadFileParams, "frmAccountsTransactionDetails");
    },
    dismissCheckZoomView: function() {
        try {
            this.view.flxCheckZoomView.setVisibility(false);
            this.view.flxHeader.setEnabled(true);
            this.view.flxCheckDeposit.setEnabled(true);
            this.view.flxCheckDeposit.enableScrolling = true;
            //this.view.flxFooter.setEnabled(true);
            this.view.forceLayout();
        } catch (e) {
            kony.print("Exception in dismissCheckZoomView" + e);
        }
    },
    registerActions: function() {
        this.view.btnRepeatTransactionTrans.onClick = this.btnRepeatOnClick;
        this.view.btnCancelTransactionTrans.onClick = this.btnCancelOnClick;
        this.view.btnReferenceValue.onClick = this.btnReferenceValueOnClick;
        this.view.flxCheckZoomView.onClick = this.dismissCheckZoomView;
        this.view.segCheckImages["widgetSkin"]  =  "sknSegffffff";
        this.view.segCheckImages.pageSkin  =  "sknManageCardsPage";
        this.view.customHeader.flxBack.onClick = function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.goBack();
        };
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
            this.view.flxFooter.isVisible = false;
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.flxFooter.isVisible = true;
        }
    },
    imgFrontOnTouchEnd: function(data) {
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
        if (transactionData.transactionType === "CheckWithdrawal") {
            this.view.imgCheckZoom.src = transactionData.frontImage1;
        } else {
            this.view.imgCheckZoom.src = transactionData.checkImage;
        }
        this.view.flxCheckZoomView.setVisibility(true);
        this.view.flxHeader.setEnabled(false);
        this.view.flxCheckDeposit.setEnabled(false);
        this.view.flxCheckDeposit.enableScrolling = false;
        this.setGesture();
        //this.view.flxFooter.setEnabled(false);
        this.view.forceLayout();
    },
    imgBackOnTouchEnd: function() {
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
        if (transactionData.transactionType === "CheckWithdrawal") {
            this.view.imgCheckZoom.src = transactionData.backImage1;
        } else {
            this.view.imgCheckZoom.src = transactionData.checkImageBack;
        }
        this.view.flxCheckZoomView.setVisibility(true);
        this.view.flxHeader.setEnabled(false);
        this.view.flxCheckDeposit.setEnabled(false);
        this.view.flxCheckDeposit.enableScrolling = false;
        this.setGesture();
        //this.view.flxFooter.setEnabled(false);
        this.view.forceLayout();
    },
    imgCheckDraftFrontOnTouchEnd: function() {
		this.view.imgCheckZoom.setVisibility(true);
		this.view.imgCheckZoom.base64 = this.base64Front;
        
        this.view.flxCheckZoomView.setVisibility(true);
        this.view.flxHeader.setEnabled(false);
        this.view.flxCheckDeposit.setEnabled(false);
        this.view.flxCheckDeposit.enableScrolling = false;
        this.setGesture();
        //this.view.flxFooter.setEnabled(false);
        this.view.forceLayout();
    },  
    imgCheckDraftBackOnTouchEnd: function() {
		this.view.imgCheckZoom.setVisibility(true);
		this.view.imgCheckZoom.base64 = this.base64Back;
        
        this.view.flxCheckZoomView.setVisibility(true);
        this.view.flxHeader.setEnabled(false);
        this.view.flxCheckDeposit.setEnabled(false);
        this.view.flxCheckDeposit.enableScrolling = false;
        this.setGesture();
        //this.view.flxFooter.setEnabled(false);
        this.view.forceLayout();
    },
    flxCrossOnClick: function() {
        this.view.flxCheckZoomView.setVisibility(false);
        this.view.flxHeader.setEnabled(true);
        this.view.flxCheckDeposit.setEnabled(true);
        this.view.flxCheckDeposit.enableScrolling = true;
        //this.view.flxFooter.setEnabled(true);
        this.view.forceLayout();
    },
    btnEditOnClick: function() {
        var navMan = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
        if (transactionData.transactionType === "P2P") {
            var navMan = applicationManager.getNavigationManager();
            var payeeMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
            payeeMod.presentationController.setTransactionObject(transactionData);
        } else if (transactionData.transactionType === "BillPay") {
            var navMan = applicationManager.getNavigationManager();
            var billpayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
            billpayMod.presentationController.setTransactionObject(transactionData);
        } else {
            var navMan = applicationManager.getNavigationManager();
            var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
            transferModulePresentationController.setTransactionObject(transactionData);
        }
    },
    btnRepeatOnClick: function() {
        var navMan = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
        if (transactionData.transactionType === "P2P") {
            var navMan = applicationManager.getNavigationManager();
            var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
            var payeeMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
            payeeMod.presentationController.setTransactionObject(transactionData);
        } else if (transactionData.transactionType === "BillPay") {
            var navMan = applicationManager.getNavigationManager();
            var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
            var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
            billPayModule.presentationController.repeatTransaction(transactionData);
        } else {
            var navMan = applicationManager.getNavigationManager();
            var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
            var transModPresentationController = applicationManager.getModulesPresentationController("TransferModule");
            transModPresentationController.repeatTransfer(transactionData);
        }
    },
    btnCancelOnClick: function() {
        var navMan = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
        if (transactionData.transactionType === "P2P") {
            var basicConfig = {
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.AreyousuredoyouwanttocancelTransaction?"),
                "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                //  "message": "Do you wish to continue?",
                "alertHandler": this.cancelP2p
            };
            applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
        } else if (transactionData.transactionType === "BillPay") {
            var scope = this;
            var basicConfig = {
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.AreyousuredoyouwanttocancelTransaction?"),
                "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                //  "message": "Do you wish to continue?",
                "alertHandler": scope.billpayCancel
            };
            applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
        } else {
            var basicConfig = {
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.AreyousuredoyouwanttocancelTransaction?"),
                "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                //  "message": "Do you wish to continue?",
                "alertHandler": this.cancelTrans
            };
            applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
        }
    },
    flxFrontDownloadOnClick: function() {
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
        var checkDownloadFileParams = {
            "page": "0",
            "accountId": this.accountId,
            "customerId": this.customerId,
            "transactionId": transactionData.transactionId,
            "mediaType": this.mediaType,
            "transactionType": this.transactionType
        };
        var ModulePresentationController = applicationManager.getModulesPresentationController("AccountModule");
        ModulePresentationController.downloadChequeFile(checkDownloadFileParams, "frmAccountsTransactionDetails");
    },
    flxBackDownloadOnClick: function() {
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
        var chequeDownloadFileParams = {
            "page": "1",
            "accountId": this.accountId,
            "customerId": this.customerId,
            "transactionId": transactionData.transactionId,
            "mediaType": this.mediaType,
            "transactionType": this.transactionType
        };
        var ModulePresentationController = applicationManager.getModulesPresentationController("AccountModule");
        ModulePresentationController.downloadChequeFile(chequeDownloadFileParams, "frmAccountsTransactionDetails");
    },
    btnReferenceValueOnClick: function() {
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
        var chequeDownloadFileParams = {
            "page": "0",
            "accountId": this.accountId,
            "customerId": this.customerId,
            "transactionId": transactionData.transactionId,
            "mediaType": this.mediaType,
            "transactionType": this.transactionType
        };
        var ModulePresentationController = applicationManager.getModulesPresentationController("AccountModule");
        ModulePresentationController.downloadChequeFile(chequeDownloadFileParams, "frmAccountsTransactionDetails");
    },
    cancelP2p: function(response) {
        if (response === true) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navMan = applicationManager.getNavigationManager();
            var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
            var p2pModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
            p2pModule.presentationController.deleteTransaction(transactionData.transactionId);
        }
    },
    billpayCancel: function(response) {
        if (response === true) {
            var navMan = applicationManager.getNavigationManager();
            var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
            var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
            billPayModule.presentationController.deleteTransaction(transactionData.transactionId);
        }
    },
    cancelTrans: function(response) {
        if (response === true) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navMan = applicationManager.getNavigationManager();
            var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
            var transModPresentationController = applicationManager.getModulesPresentationController("TransferModule");
            transModPresentationController.deleteTransaction(transactionData);
        }
    },
    checkDraftFrontImgEnable: function(response) {
        var scope = this;
        this.base64Front = response.base64;
        this.segmentCheckdata[0]["lblFront"] = "Front Image";
        this.segmentCheckdata[0]["imgFront"] = {
            "src": "checksmall.png",
            "onTouchEnd": scope.imgCheckDraftFrontOnTouchEnd.bind(this, {}),
            "isVisible": true
        };
        this.segmentCheckdata[0]["flxFrontDownload"] = {
            "onClick": scope.flxFrontDownloadOnClick.bind(scope, {})
        };
        this.segmentCheckdata[0]["imgFrontDownload"] = {
            "src": "download.png"
        };
        if(this.transactionType === "Draft"){
          this.segmentCheckdata[0]["flxBackImg"] = {
          "isVisible": false
         };
        }
		this.segmentCheckdata[0]["lblFrontCheckNotAvailable"] = {
          "isVisible": false
        };
        this.view.segCheckImages.setData(this.segmentCheckdata);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    checkDraftFrontImgDisable: function() {
        this.segmentCheckdata[0]["lblFront"] = "Front Image";
        
		this.segmentCheckdata[0]["imgFront"] = {
          "isVisible": false
        };
		this.segmentCheckdata[0]["lblFrontCheckNotAvailable"] = {
          "isVisible": true
        };
      	this.segmentCheckdata[0]["lblFrontCheckNotAvailable"] = this.transactionType + " Image not available";
		if (this.transactionType === "Draft") {
            this.segmentCheckdata[0]["flxBackImg"] = {
                "isVisible": false
            };
        }
        this.view.segCheckImages.setData(this.segmentCheckdata);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    checkBackImgEnable: function(response) {
        var scope = this;
        this.base64Back = response.base64;
        this.segmentCheckdata[0]["flxBackImg"] = {
            "isVisible": true
        };
        this.segmentCheckdata[0]["lblBack"] = "Back Image";
        this.segmentCheckdata[0]["imgBack"] = {
            "src": "checksmall.png",
            "onTouchEnd": scope.imgCheckDraftBackOnTouchEnd.bind(this, {}),
            "isVisible": true
        };
        this.segmentCheckdata[0]["flxBackDownload"] = {
            "onClick": scope.flxBackDownloadOnClick.bind(scope, {})
        };
        this.segmentCheckdata[0]["imgBackDownload"] = {
            "src": "download.png"
        };
		this.segmentCheckdata[0]["lblBackCheckNotAvailable"] = {
          "isVisible": false
        };
        this.view.segCheckImages.setData(this.segmentCheckdata);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    checkBackImgDisable: function() {
        this.segmentCheckdata[0]["flxBackImg"] = {
            "isVisible": true
        };
        this.segmentCheckdata[0]["lblBack"] = "Back Image";
        
		this.segmentCheckdata[0]["imgBack"] = {
          "isVisible": false
        };      
		this.segmentCheckdata[0]["lblBackCheckNotAvailable"] = {
          "isVisible": true
        };
      	this.segmentCheckdata[0]["lblBackCheckNotAvailable"] = this.transactionType + " Image not available";

        this.view.segCheckImages.setData(this.segmentCheckdata);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    ExternalTransferRefernceBtnEnable: function(){
      this.view.lblReferenceNoValueTrans.setVisibility(false);
      this.view.btnReferenceValue.setVisibility(true);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    ExternalTransferRefernceBtnDisable: function(){
      this.view.lblReferenceNoValueTrans.setVisibility(true);
      this.view.btnReferenceValue.setVisibility(false);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
	 navigateToPayment: function() {
        var cm = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
        if (cm.isFastTransfersFlowEnabled()) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");
            var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
            navManager.setEntryPoint("centralmoneymovement", "frmAccountDetails");
            moneyMovementModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
            moneyMovementModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
        } else {
            applicationManager.getPresentationUtility().showLoadingScreen();
            if (cm.getDeploymentGeography() === "EUROPE") {
                var transferModule = applicationManager.getModulesPresentationController("TransferModule");
                var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                navManager.setEntryPoint("europeTransferFlow", "frmAccountDetails");
                transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                transferModule.setEuropeFlowType("INTERNAL");
                applicationManager.getPresentationUtility().showLoadingScreen();
                transferModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
            } else {
                var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
                transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                transferModulePresentationController.navigateToTransfers(accountsDetails.selectedAccountData);
            }
        }
    },
    getContextualData: function(data) {
        var scope = this;
        if (data === "CancelPayment") {
            scope.btnCancelOnClick();
        }
        if (data === "DownloadTransaction") {
            scope.onclickdownload();
        }
        if (data === "RepeatTransaction") {
            scope.btnRepeatOnClick();
        }
        if (data === "DisputeTransaction") {
            var disputeModule = applicationManager.getModulesPresentationController("DisputeTransactions");
		    var navManager = applicationManager.getNavigationManager();													 
            navManager.setCustomInfo("frmDisputeTransactionDetails", navMan.getCustomInfo("frmAccountsTransactionDetails"));
            navManager.setEntryPoint("DisputeEntry", "frmAccountsTransactionDetails");
            disputeModule.navigateToDisputeReason("frmDisputeReason");
        }
        if (data === "ViewRequest") {
			var navManager = applicationManager.getNavigationManager();													 
            navManager.setEntryPoint("ViewRequest", "TransactionDetails");
            applicationManager.getPresentationUtility().showLoadingScreen();
            applicationManager.getModulesPresentationController("DisputeTransactions").getDisputeTransactionDetails();
        }
		if (data === "PayOverdue") {
            scope.navigateToPayment();
        }
    },
  getBtnEntitlement: function(btnId, entitlementKeys, callback){ 																   
      if (btnId === "DisputeTransaction"){
        var navMan = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");
        var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(transactionData.transactionDate), new Date());
        if (configManager.getDisputeConfig(transactionData.transactionType)) {
          if (transactionData.isScheduled !== "true" && transactionData.statusDescription !== "Pending" && configManager.getDisputeConfig(transactionData.transactionType) === "true" && dateDiff <= configManager.getDisputeDuration() && (configManager.checkUserFeature(entitlementKeys[0]) === true || configManager.checkUserFeature(entitlementKeys[0]) === "true")) {																													   
            if (configManager.getDisputeCDConfig("both") || (configManager.getDisputeCDConfig("debit") && formatUtil.isDebitTransaction(transactionData.amount)) || (configManager.getDisputeCDConfig("credit") && formatUtil.isCreditTransaction(transactionData.amount))) {
              if (transactionData.isDisputed && transactionData.isDisputed === "true") {					  
                callback(false);
              }
              else {
                callback(true);
              }
            }
            else {
              callback(false);
            }
          }
          else {
            callback(false);
          }
        }
      } 
      if (btnId === "ViewRequest") {
        var configManager = applicationManager.getConfigurationManager();
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");
        if(!(kony.sdk.isNullOrUndefined(transactionData))){
          if ((configManager.checkUserPermission(entitlementKeys[0]) || configManager.checkUserFeature(entitlementKeys[0])) && (transactionData.isDisputed === true || transactionData.isDisputed === "true") && entitlementKeys[0] !== null){
            callback(true);
          } else{ 
            callback(false);
          }
        }else{
          callback(false);
        }
      }
      if (btnId === "CancelPayment") {
        var navMan = applicationManager.getNavigationManager();																	 
        var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");																			  
        if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null && (transactionData.isScheduled === "true" || transactionData.isScheduled === true)&& transactionData.serviceName !== undefined && transactionData.serviceName !== null && transactionData.serviceName !== "") {																						
          callback(true);
        }
        else{
          callback(false);
        }
      }
      if (btnId === "RepeatTransaction") {
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");
        if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null && (transactionData.isScheduled === "false" || transactionData.isScheduled === false) && transactionData.serviceName !== undefined && transactionData.serviceName !== null && transactionData.serviceName !== "") {
          callback(true);
        }		   
        else{
          callback(false);
        }		   
      }	 
    },
  flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
   }
});