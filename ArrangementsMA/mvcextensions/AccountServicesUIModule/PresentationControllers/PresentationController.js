define([], function () {
  this.mortgageDetails = {};
  this.mortgagePlans = [];
  this.mortgageAccounts = [];
  this.repaymentAccount = {};  
  this.changeRepaymentDayPayload = "";
  this.changeRepaymentAccountPayload = "";
  this.confirmPartialRepaymentPayload = "";
  this.referenceNumber = "";
  this.requestId = "";
  this.earlyPayOffDetails = {};
  function AccountServices_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }
  inheritsFrom(AccountServices_PresentationController, kony.mvc.Presentation.BasePresenter);
  AccountServices_PresentationController.prototype.initializePresentationController = function () {
  };
  /**
  * presentSurvey : Method to present data to form
  * @member of {Survey_PresentationController}
  * @param {Json object} data- viewmodel to present
  * @return {}
  * @throws {}
  */
  AccountServices_PresentationController.prototype.navigateToConsolidatedStatements = function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo('frmConsolidatedStatements');
    //this.presentUserInterface('frmCustomerFeedbackSurvey', data);
  };
  AccountServices_PresentationController.prototype.showAcknowledgement = function(payload) {
    this.changeRepaymentDayPayload = payload;
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "MortgageServicesUIModule/frmChangeRepaymentDayAcknowledge"
    });
    if(!kony.sdk.isNullOrUndefined(payload["supportingDocuments"]) && payload["supportingDocuments"].length > 0){
        var param = {
            "Documents": payload.supportingDocuments
        }
        applicationManager.getAccountServicesModule().uploadMultipleDouments(param, this.uploadMultipleDocumentsDaySC.bind(this), this.uploadMultipleDocumentsEC.bind(this));
    }else{
        this.submitRepaymentDayRequest(payload);
    }
  };
  AccountServices_PresentationController.prototype.showAccountAcknowledgement = function(payload) {
    this.changeRepaymentAccountPayload = payload;
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "MortgageServicesUIModule/frmChangeRepaymentAccountAcknowledge"
    });
    if(!kony.sdk.isNullOrUndefined(payload["supportingDocumentIds"]) && payload["supportingDocumentIds"].length > 0){
        var param = {
            "Documents": payload.supportingDocumentIds
        }
        applicationManager.getAccountServicesModule().uploadMultipleDouments(param, this.uploadMultipleDocumentsAccountSC.bind(this), this.uploadMultipleDocumentsEC.bind(this));
    }else{
        this.submitRepaymentAccountRequest(payload);
    }
  };
  AccountServices_PresentationController.prototype.uploadMultipleDocumentsAccountSC = function(response) {
    var payload = this.changeRepaymentAccountPayload;
    payload.supportingDocumentIds = JSON.stringify(response['supportingDocumentData']);
    var navMan = applicationManager.getNavigationManager();
    this.submitRepaymentAccountRequest(payload);
  };
  AccountServices_PresentationController.prototype.uploadMultipleDocumentsDaySC = function(response) {
    var payload = this.changeRepaymentDayPayload;
    payload.supportingDocumentIds = JSON.stringify(response['supportingDocumentData']);
    var navMan = applicationManager.getNavigationManager();
    this.submitRepaymentDayRequest(payload);
  };
  AccountServices_PresentationController.prototype.uploadMultipleDocumentsEC = function(response) {
    var navMan = applicationManager.getNavigationManager();
    var dataResponse = {
        showLoadingIndicator: {
            status: false
        }
    }
    navMan.updateForm(dataResponse);
    var data = {
        showError: true,
        error : response
    };
    navMan.updateForm(data);
  };
  AccountServices_PresentationController.prototype.getDate = function (date) {
    var datearray = date.split("/");
    var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
    return newdate;
  };
  AccountServices_PresentationController.prototype.convertDateFormat = function (dateString) {
    return applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(dateString, "dd/mm/yyyy").format("m/d/Y");
  };
    

  AccountServices_PresentationController.prototype.validateTransfer = function (transferData) {
    this.createTransaction(transferData, true)
  };

  AccountServices_PresentationController.prototype.createTransaction = function (transferData, validate) {
    if (bankDateObj) {
      this.bankDate = bankDateObj;
    }
    var currentDate = this.bankDate && this.bankDate.currentWorkingDate ? new Date(this.bankDate.currentWorkingDate) : new Date();
    transferData.sendOnDate = this.getDate(transferData.frequencyStartDate);
    var sendonDateObject = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(transferData.sendOnDate, "dd/mm/yyyy");
    transferData.isRecurring = (transferData.frequency !== "Once" || sendonDateObject.toDateString() !== currentDate.toDateString()) ? true : false;
    this.transferData = transferData;
    var mfaManager = applicationManager.getMFAManager();
    mfaManager.setMFAOperationType("CREATE");
    var mfaParams = {
      serviceName: mfaManager.getServiceId(),
    };
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("deletedDocuments", transferData.deletedDocuments);
    transactionManager.setTransactionAttribute("uploadedattachments", transferData.supportedDocumentObjects);
    transactionManager.setTransactionAttribute("fromAccountNumber", transferData.fromAccountNumber);
    transactionManager.setTransactionAttribute("amount", transferData.amount);
    transactionManager.setTransactionAttribute("transactionsNotes", transferData.transactionsNotes ? transferData.transactionsNotes : "");
    transactionManager.setTransactionAttribute("isScheduled", (transferData.frequency !== "Once" || sendonDateObject.toDateString() !== currentDate.toDateString()) ? "1" : "0");
    transactionManager.setTransactionAttribute("createWithPaymentId", "true");
    if (transferData.isOwnAccount) {
      transactionManager.setTransactionAttribute("toAccountNumber", transferData.toAccountNumber);
      transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
    }
    transactionManager.setTransactionAttribute("transactionCurrency", transferData.transactionCurrency);
    transactionManager.setTransactionAttribute("toAccountCurrency", transferData.toAccountCurrency ? transferData.toAccountCurrency : transferData.fromAccountCurrency);
    transactionManager.setTransactionAttribute("frequencyType", transferData.frequency);
    transactionManager.setTransactionAttribute("paymentType", "");
    transactionManager.setTransactionAttribute("frequencyStartDate", transferData.sendOnDate ? this.convertDateFormat(transferData.sendOnDate) : null);
    transactionManager.setTransactionAttribute("frequencyEndDate", transferData.frequency !== "Once" ? (transferData.endOnDate ? this.convertDateFormat(transferData.endOnDate) : null) : null);
    transactionManager.setTransactionAttribute("numberOfRecurrences", null);
    transactionManager.setTransactionAttribute("scheduledDate", transferData.sendOnDate ? this.convertDateFormat(transferData.sendOnDate) : "");
    transactionManager.setTransactionAttribute("fromAccountCurrency", transferData.fromAccountCurrency);
    transactionManager.setTransactionAttribute("swiftCode", transferData.swiftCode);
    transactionManager.setTransactionAttribute("paidBy", transferData.isPaidBy ? transferData.isPaidBy : "");
    transactionManager.setTransactionAttribute("serviceName", transferData.serviceName);
    transactionManager.setTransactionAttribute("transactionAmount", transferData.transactionAmount);
    transactionManager.setTransactionAttribute("serviceCharge", transferData.serviceCharge);
    //transactionManager.setTransactionAttribute("beneficiaryName", transferData.beneficiaryName);
    transactionManager.setTransactionAttribute("beneficiaryNickname", transferData.beneficiaryNickname);
    transactionManager.setTransactionAttribute("MFAAttributes", mfaParams);
    if (validate) {
      transactionManager.setTransactionAttribute("transactionId", "");
      transactionManager.setTransactionAttribute("chargesList", "");
      transactionManager.setTransactionAttribute("exchangeRate", "");
      transactionManager.setTransactionAttribute("totalAmount", "");
      transactionManager.setTransactionAttribute("charges", "");
      transactionManager.setTransactionAttribute("creditValueDate", "");
    }
    //transactionManager.setTransactionAttribute("serviceName", mfaManager.getServiceId());
    applicationManager.getNavigationManager().updateForm({
      showLoadingIndicator: {
        status: true
      }
    }, kony.application.getCurrentForm().id);
    this.createTransferBasedOnType(transactionManager.getTransactionObject(), transferData, validate);
  };

  AccountServices_PresentationController.prototype.createTransferBasedOnType = function (data, transferData, validate) {
    var mfaManager = applicationManager.getMFAManager();
    var transactionManager = applicationManager.getTransactionManager();
    var successCallBack = validate ? this.validateCallbackSuccess.bind(this, transferData) : this.transferCallbackSuccess.bind(this, transferData);
    var errorCallback = this.validateCallbackError.bind(this, transferData);
    var transformedData = this.transformData(data);
    if (validate) {
      transformedData.validate = "true";
      transformedData.uploadedattachments = "";
    }
    if (transferData.fromAccountNumber) {
      mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
      transactionManager.createTransferToOwnAccounts(transformedData, successCallBack, errorCallback)
    }
  };

  AccountServices_PresentationController.prototype.validateCallbackSuccess = function (transferData, response) {

    applicationManager.getNavigationManager().updateForm({
      showLoadingIndicator: {
        status: false
      }
    }, kony.application.getCurrentForm().id);

    //parse charges from response
    var transactionManager = applicationManager.getTransactionManager();
    var charges = [];
    if (response.charges) {
      try {
        charges = JSON.parse(response.charges);
        for (var i = 0; i < charges.length; i++) {
          charges[i].amountCurrency = CommonUtilities.formatCurrencyWithCommas(charges[i].chargeAmount, false, charges[i].chargeCurrency);
        }
        transactionManager.setTransactionAttribute("chargesList", charges);
      } catch (e) { }
    }
    transactionManager.setTransactionAttribute("exchangeRate", response.exchangeRate);
    transactionManager.setTransactionAttribute("totalAmount", response.totalAmount);
    transactionManager.setTransactionAttribute("transactionId", response.referenceId);
    transactionManager.setTransactionAttribute("createWithPaymentId", "true");
    transactionManager.setTransactionAttribute("charges", response.charges);
    transactionManager.setTransactionAttribute("creditValueDate", response.creditValueDate);
    applicationManager.getNavigationManager().updateForm({
      validationSuccess: true,
      confirmDetails: transferData,
      chargesList: charges,
      exchangeRate: response.exchangeRate,
      totalAmount: response.totalAmount,
      creditValueDate: response.creditValueDate,
      details: response
    }, kony.application.getCurrentForm().id);
    return;
  };

  AccountServices_PresentationController.prototype.transferCallbackSuccess = function (transferData, response) {
    applicationManager.getNavigationManager().navigateTo({
      "appName": "ArrangementsMA",
      "friendlyName": "MortgageServicesUIModule/frmPartialPaymentAcknowledgement"
    });
    applicationManager.getNavigationManager().updateForm({
      showLoadingIndicator: {
        status: false
      }
    }, kony.application.getCurrentForm().id);

    //parse charges from response
    var transactionManager = applicationManager.getTransactionManager();
    var charges = [];
    if (response.charges) {
      try {
        charges = JSON.parse(response.charges);
        for (var i = 0; i < charges.length; i++) {
          charges[i].amountCurrency = CommonUtilities.formatCurrencyWithCommas(charges[i].chargeAmount, false, charges[i].chargeCurrency);
        }
        transactionManager.setTransactionAttribute("chargesList", charges);
      } catch (e) { }
    }
    transactionManager.setTransactionAttribute("exchangeRate", response.exchangeRate);
    transactionManager.setTransactionAttribute("totalAmount", response.totalAmount);
    transactionManager.setTransactionAttribute("transactionId", response.referenceId);
    transactionManager.setTransactionAttribute("createWithPaymentId", "true");
    transactionManager.setTransactionAttribute("charges", response.charges);
    transactionManager.setTransactionAttribute("creditValueDate", response.creditValueDate);
    this.referenceNumber = response.referenceId;
    applicationManager.getNavigationManager().updateForm({
      validationSuccess: true,
      confirmDetails: transferData,
      chargesList: charges,
      exchangeRate: response.exchangeRate,
      totalAmount: response.totalAmount,
      creditValueDate: response.creditValueDate,
      details: response,
      referenceId: response.referenceId
    }, kony.application.getCurrentForm().id);
    return;
  };

  AccountServices_PresentationController.prototype.transformData = function (data) {
    return {
      "amount": (data.amount !== null ? data.amount : ""),
      "createWithPaymentId": data.createWithPaymentId,
      "transactionId": (data.transactionId !== null ? data.transactionId : ""),
      "frequencyType": (data.frequencyType !== null ? data.frequencyType : ""),
      "fromAccountNumber": (data.fromAccountNumber !== null ? data.fromAccountNumber : ""),
      "isScheduled": (data.isScheduled !== null ? data.isScheduled : ""),
      "frequencyStartDate": (data.frequencyStartDate !== null ? data.frequencyStartDate : ""),
      "frequencyEndDate": (data.frequencyEndDate !== null ? data.frequencyEndDate : ""),
      "scheduledDate": (data.scheduledDate !== null ? data.scheduledDate : ""),
      "toAccountNumber": (data.toAccountNumber !== null ? data.toAccountNumber : ""),
      "paymentType": (data.paymentType !== null ? data.paymentType : ""),
      "paidBy": (data.paidBy !== null ? data.paidBy : ""),
      "swiftCode": (data.swiftCode !== null ? data.swiftCode : ""),
      "serviceName": (data.serviceName !== null ? data.serviceName : ""),
      //"beneficiaryName": (data.beneficiaryName !== null ? data.beneficiaryName : ""),
      "beneficiaryNickname": (data.beneficiaryNickname !== null ? data.beneficiaryNickname : ""),
      "transactionsNotes": (data.transactionsNotes !== null ? data.transactionsNotes : ""),
      "transactionType": (data.transactionType !== null ? data.transactionType : ""),
      "transactionCurrency": (data.transactionCurrency !== null ? data.transactionCurrency : ""),
      "fromAccountCurrency": (data.fromAccountCurrency !== null ? data.fromAccountCurrency : ""),
      "toAccountCurrency": (data.toAccountCurrency !== null ? data.toAccountCurrency : ""),
      "numberOfRecurrences": (data.numberOfRecurrences !== null ? data.numberOfRecurrences : ""),
      "ExternalAccountNumber": (data.ExternalAccountNumber !== null ? data.ExternalAccountNumber : ""),
      "transactionFlow": (data.transactionFlow !== null ? data.transactionFlow : ""),
      "uploadedattachments": (data.uploadedattachments !== null ? data.uploadedattachments : ""),
      "deletedDocuments": (data.deletedDocuments !== null ? data.deletedDocuments : ""),
      //"transactionAmount": (data.transactionAmount !== null ? data.transactionAmount : ""),
      //"serviceCharge": (data.serviceCharge !== null ? data.serviceCharge : ""),
      "charges": (data.charges !== null ? data.charges : ""),
      "totalAmount": (data.totalAmount !== null ? data.totalAmount : ""),
      "creditValueDate": (data.creditValueDate !== null ? data.creditValueDate : ""),
      "exchangeRate": (data.exchangeRate !== null ? data.exchangeRate : "")
    }
  }

  AccountServices_PresentationController.prototype.validateCallbackError = function (transferData, response) {
    applicationManager.getNavigationManager().navigateTo({
      "appName": "ArrangementsMA",
      "friendlyName": "MortgageServicesUIModule/frmRepaymentSimulation"
    });
    applicationManager.getNavigationManager().updateForm({
      showLoadingIndicator: {
        status: false
      },
      error: response.serverErrorRes
    }, "frmRepaymentSimulation");
  };
  AccountServices_PresentationController.prototype.uploadDocuments = function() {
    var navMan = applicationManager.getNavigationManager();
    var supportingDocumentIds = navMan.getCustomInfo("frmChangeRepaymentAcountCnFileData");
    applicationManager.getNavigationManager().updateForm({
        showLoadingIndicator: {
            status: true
        }
    });
    if (!kony.sdk.isNullOrUndefined(supportingDocumentIds) && supportingDocumentIds.length > 0) {
        var param = {
            "Documents": supportingDocumentIds
        }
        applicationManager.getAccountServicesModule().uploadMultipleDouments(param, this.uploadMultipleDocumentsPaymentsSC.bind(this), this.uploadMultipleDocumentsPaymentsEC.bind(this));
    } else {
      this.validateTransfer(this.formData);
        navMan.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": "MortgageServicesUIModule/frmConfirmPartialRepayment"
        });
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false
            }
        });
    }
};
AccountServices_PresentationController.prototype.showConfirmPartialPayment = function(payload) {
    var navMan = applicationManager.getNavigationManager();
    applicationManager.getNavigationManager().updateForm({
        showLoadingIndicator: {
            status: true
        }
    });
  if (payload.supportingDocumentIds.length == 0) {
    this.confirmPartialRepaymentPayload = [];
  } else {
    payload.supportingDocumentIds = this.confirmPartialRepaymentPayload;
  }
    this.submitPartialRepaymentRequest(payload);
    navMan.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "MortgageServicesUIModule/frmPartialPaymentAcknowledgement"
    });
};
AccountServices_PresentationController.prototype.uploadMultipleDocumentsPaymentsSC = function(response) {
    var payload = {};
    payload.supportingDocumentIds = JSON.stringify(response['supportingDocumentData']);
    this.confirmPartialRepaymentPayload = payload.supportingDocumentIds;
    this.validateTransfer(this.formData);
    var navMan = applicationManager.getNavigationManager();
    applicationManager.getNavigationManager().updateForm({
        showLoadingIndicator: {
            status: false
        }
    });
    navMan.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "MortgageServicesUIModule/frmConfirmPartialRepayment"
    });
};
  AccountServices_PresentationController.prototype.uploadMultipleDocumentsPaymentsEC = function(response) {
    this.validateTransfer(this.formData);
    var navMan = applicationManager.getNavigationManager();
    var dataResponse = {
        showLoadingIndicator: {
            status: false
        }
    }
    navMan.updateForm(dataResponse);
    var data = {
        showError: true,
        error : response
    };
    navMan.updateForm(data);
  };
  AccountServices_PresentationController.prototype.getMortgageDetails = function(data) {
    var mortgageObj = applicationManager.getAccountServicesModule();
    mortgageObj.getMortgageFacilityDetails(data, this.getMortgageDetailsSC.bind(this), this.showMortgageEC.bind(this));
    mortgageObj.getMortgageDrawings(data, this.updateMortgagePlansSC.bind(this), this.showMortgageEC.bind(this));
  };
  AccountServices_PresentationController.prototype.getSimulatedResults = function(data) {
    var navMan = applicationManager.getNavigationManager();
    applicationManager.getNavigationManager().updateForm({
      showLoadingIndicator: {
        status: true
      }
    });
    var mortgageObj = applicationManager.getAccountServicesModule();
    mortgageObj.getMockSimulatedResults(data, this.simulatedResultsSC.bind(this), this.simulatedResultsEC.bind(this));
  };
  AccountServices_PresentationController.prototype.simulatedResultsSC = function(response) {
    var navMan = applicationManager.getNavigationManager();
    var dataResponse = {
        showLoadingIndicator: {
            status: false
        }
    }
    navMan.updateForm(dataResponse);
    var dataResponse = {
        response: response
    };
    navMan.updateForm(dataResponse);
  };
  AccountServices_PresentationController.prototype.simulatedResultsEC = function(response) {
    var navManager = applicationManager.getNavigationManager();
    var dataResponse = {
        showError: true,
        error : response
    };
    navManager.updateForm(dataResponse);
    var dataResponse = {
        showLoadingIndicator: {
            status: false
        }
    }
    navManager.updateForm(dataResponse);
  };
  AccountServices_PresentationController.prototype.mortgageSimulatedResults = function (data) {
    var navMan = applicationManager.getNavigationManager();
    applicationManager.getNavigationManager().updateForm({
      showLoadingIndicator: {
        status: true
      }
    });
    var mortgageObj = applicationManager.getAccountServicesModule();
    mortgageObj.getMortgageSimulatedResults(data, this.mortgageSimulatedResultsSC.bind(this), this.mortgageSimulatedResultsEC.bind(this));
  };
  AccountServices_PresentationController.prototype.mortgageSimulatedResultsSC = function (response) {
    var navMan = applicationManager.getNavigationManager();
    var dataResponse = {
      showLoadingIndicator: {
        status: false
      }
    }
    navMan.updateForm(dataResponse);
    var dataResponse = {
      response: response
    };
    navMan.updateForm(dataResponse);
  };
  AccountServices_PresentationController.prototype.mortgageSimulatedResultsEC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var dataResponse = {
      showError: true,
      error: response
    };
    navManager.updateForm(dataResponse);
    var dataResponse = {
      showLoadingIndicator: {
        status: false
      }
    }
    navManager.updateForm(dataResponse);
  };
  AccountServices_PresentationController.prototype.ValidateClosure = function(data) {
    var mortgageObj = applicationManager.getAccountServicesModule();
    mortgageObj.validateClosure(data, this.validateClosureSC.bind(this), this.validateClosureEC.bind(this));
  };
  AccountServices_PresentationController.prototype.validateClosureSC = function(data) {
    var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("statusMessage", data.description);
             navMan.navigateTo({
                    "appName": "ArrangementsMA",
                    "friendlyName": "AccountServicesUIModule/frmConfirmClosure"
                });
  };
    AccountServices_PresentationController.prototype.validateClosureEC = function(data) {
      var mortgageObj = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AccountsUIModule",
            "appName": "HomepageMA"
        }).presentationController;
        mortgageObj.showOnServerError();
  };

  AccountServices_PresentationController.prototype.getTandCData = function() {
    data = {"languageCode":"en-US","termsAndConditionsCode":"AccountClosure_TnC"};
    var mortgageObj = applicationManager.getAccountServicesModule();
    mortgageObj.getTandCData(data, this.getTandCDataSC.bind(this), this.getTandCDataSC.bind(this));

};
AccountServices_PresentationController.prototype.getTandCDataSC = function(response) {
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("TandCdata",response);
};
     AccountServices_PresentationController.prototype.submitClosureRequest = function(data) {
      var mortgageObj = applicationManager.getAccountServicesModule();
        mortgageObj.submitClosureRequest(data, this.submitClosureRequestSC.bind(this), this.submitClosureRequestEC.bind(this));
  };
  AccountServices_PresentationController.prototype.submitClosureRequestSC = function(response) {
    var navMan = applicationManager.getNavigationManager();
        var dataResponse = {
            showLoadingIndicator: {
                status: false
            }
        }
        navMan.updateForm(dataResponse);
        var dataResponse = {
            response: response
        };
        navMan.updateForm(dataResponse);
};
    AccountServices_PresentationController.prototype.submitClosureRequestEC = function(response) {
      var navManager = applicationManager.getNavigationManager();
        var dataResponse = {
            showError: true,
            error: response
        };
        navManager.updateForm(dataResponse);
        var dataResponse = {
            showLoadingIndicator: {
                status: false
            }
        }
        navManager.updateForm(dataResponse);
};
  AccountServices_PresentationController.prototype.submitRepaymentDayRequest = function(data) {
    var mortgageObj = applicationManager.getAccountServicesModule();
    mortgageObj.submitChangeRepaymentDayServiceRequest(data, this.submitRepaymentDayRequestSC.bind(this), this.submitRepaymentDayRequestEC.bind(this));
  };
  AccountServices_PresentationController.prototype.submitRepaymentAccountRequest = function(data) {
    var mortgageObj = applicationManager.getAccountServicesModule();
    mortgageObj.submitChangeRepaymentAccountServiceRequest(data, this.submitRepaymentAccountRequestSC.bind(this), this.submitRepaymentAccountRequestEC.bind(this));
  };
  AccountServices_PresentationController.prototype.submitPartialRepaymentRequest = function (data) {
    var mortgageObj = applicationManager.getAccountServicesModule();
    mortgageObj.CreatePartialRepayment(data, this.submitPartialRepaymentRequestSC.bind(this), this.submitPartialRepaymentRequestEC.bind(this));
  };
  AccountServices_PresentationController.prototype.submitPartialRepaymentRequestSC = function (response) {
    var navMan = applicationManager.getNavigationManager();
    this.requestId = response.Id;
    this.createTransaction(this.transferData);
    dataResponse = {
      showLoadingIndicator: {
        status: false
      }
    }
    navMan.updateForm(dataResponse);
    var dataResponse = {
      response: response
    };
    navMan.updateForm(dataResponse);
  };
  AccountServices_PresentationController.prototype.submitPartialRepaymentRequestEC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var dataResponse = {
      showError: true,
      error: response
    };
    navManager.updateForm(dataResponse);
    var dataResponse = {
      showLoadingIndicator: {
        status: false
      }
    }
    navManager.updateForm(dataResponse);
  };
  AccountServices_PresentationController.prototype.submitRepaymentDayRequestSC = function(response) {
    var navMan = applicationManager.getNavigationManager();
    var dataResponse = {
        showLoadingIndicator: {
            status: false
        }
    }
    navMan.updateForm(dataResponse);
    var dataResponse = {
        response: response
    };
    navMan.updateForm(dataResponse);
  };
  AccountServices_PresentationController.prototype.submitRepaymentDayRequestEC = function(response) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "MortgageServicesUIModule/frmChangeRepaymentDayAcknowledge"
    });
    var dataResponse = {
        showError: true,
        error : response
    };
    navManager.updateForm(dataResponse);
    var dataResponse = {
        showLoadingIndicator: {
            status: false
        }
    }
    navManager.updateForm(dataResponse);
  };
  AccountServices_PresentationController.prototype.submitRepaymentAccountRequestSC = function(response) {
    var navMan = applicationManager.getNavigationManager();
    dataResponse = {
        showLoadingIndicator: {
            status: false
        }
    }
    navMan.updateForm(dataResponse);
    var dataResponse = {
        response: response
    };
    navMan.updateForm(dataResponse);
  };
  AccountServices_PresentationController.prototype.submitRepaymentAccountRequestEC = function(response) {
    var navManager = applicationManager.getNavigationManager();
    var dataResponse = {
        showError: true,
        error : response
    };
    navManager.updateForm(dataResponse);
    var dataResponse = {
        showLoadingIndicator: {
            status: false
        }
    }
    navManager.updateForm(dataResponse);
  };

    AccountServices_PresentationController.prototype.showAccountClosureAcknowledgement = function(payload) {
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        var navMan = applicationManager.getNavigationManager();
        var supportingDocuments = navMan.getCustomInfo("frmAcClosureFileData");
        navMan.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": "AccountServicesUIModule/frmAcClosureAcknowledge"
        });
        if (!kony.sdk.isNullOrUndefined(supportingDocuments) && supportingDocuments.length > 0) {
            var param = {
                "Documents": supportingDocuments
            }
            applicationManager.getAccountServicesModule().uploadMultipleDouments(param, this.uploadMultipleDocumentsAcClosureSC.bind(this), this.uploadMultipleDocumentsAcClosureEC.bind(this));
        } else {
            payload.supportingDocumentData = "";
            this.submitClosureRequest(payload);
        }
    };
    AccountServices_PresentationController.prototype.uploadMultipleDocumentsAcClosureSC = function(response) {
        var navMan = applicationManager.getNavigationManager();
        var payload = navMan.getCustomInfo("frmAcClosurePayload");
        payload.supportingDocumentData = JSON.stringify(response['supportingDocumentData']);
        this.submitClosureRequest(payload);
    };
    AccountServices_PresentationController.prototype.uploadMultipleDocumentsAcClosureEC = function(response) {
        var mortgageObj = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AccountsUIModule",
            "appName": "HomepageMA"
        }).presentationController;
        mortgageObj.showOnServerError();
    };

  AccountServices_PresentationController.prototype.getMortgageDetailsSC = function (response) {
    var details = response[0];
    this.mortgageDetails = response[0];
    var navManager = applicationManager.getNavigationManager();
    var dataResponse = {
      details: details
    };
    navManager.updateForm(dataResponse);
    //         applicationManager.getNavigationManager().updateForm({
    //             showLoadingIndicator: {
    //                 status: true
    //             }
    //         }, "frmMortgageAccountsDetails");
    //         this.updateMortgageDetails(details);
  };
 AccountServices_PresentationController.prototype.downloadDayPage = function(payload) {
      param = payload;
      applicationManager.getAccountServicesModule().getDocIdForDayPage(param, this.getDocIdForDayPageSC.bind(this), this.getDocIdForDayPageEC.bind(this));
  };
  AccountServices_PresentationController.prototype.getDocIdForDayPageSC = function(response) {
      var request = response.fileId;
      this.getDocumentForAccount(request);
  };

  AccountServices_PresentationController.prototype.getDocIdForDayPageEC = function () {

  };
 
  AccountServices_PresentationController.prototype.downloadSimulatePage = function (payload) {
    param = payload;
    applicationManager.getAccountServicesModule().getDocIdForSimulatePage(param, this.getDocIdForSimulatePageSC.bind(this), this.getDocIdForSimulatePageEC.bind(this));
  };
  AccountServices_PresentationController.prototype.getDocIdForSimulatePageSC = function (response) {
    var request = response.fileId;
    this.getDocumentForAccount(request);
  };

  AccountServices_PresentationController.prototype.getDocIdForSimulatePageEC = function () {

  };

  AccountServices_PresentationController.prototype.downloadPartialPaymentAckPage = function (payload) {
    param = payload;
    applicationManager.getAccountServicesModule().getDocIdForPaymentAckPage(param, this.getDocIdForPaymentAckPageSC.bind(this), this.getDocIdForPaymentAckPageEC.bind(this));
  };
  AccountServices_PresentationController.prototype.getDocIdForPaymentAckPageSC = function (response) {
    var request = response.fileId;
    this.getDocumentForAccount(request);
  };

  AccountServices_PresentationController.prototype.getDocIdForPaymentAckPageEC = function () {

  };
  // for account
   AccountServices_PresentationController.prototype.downloadAccountPage = function(payload) {
      param = payload;
      applicationManager.getAccountServicesModule().getDocIdForAccountPage(param, this.getDocIdForAccountPageSC.bind(this), this.getDocIdForAccountPageEC.bind(this));
  };
   AccountServices_PresentationController.prototype.downloadClosurePage = function(payload) {
        param = payload;
        applicationManager.getAccountServicesModule().getDocIdForClosure(param, this.getDocIdForAccountPageSC.bind(this), this.getDocIdForAccountPageEC.bind(this));
    };
  
  AccountServices_PresentationController.prototype.getDocIdForAccountPageSC = function(response) {
      var request = response.fileId;
      this.getDocumentForAccount(request);
  };
  AccountServices_PresentationController.prototype.getDocumentForAccount = function(payload) {
    param = payload; 
    var navManager = applicationManager.getNavigationManager();
    var getUrl = {
      pageDownloadFile: applicationManager.getAccountServicesModule().getDocumentForAccount(param)
    };
    navManager.updateForm(getUrl);
};
  AccountServices_PresentationController.prototype.getDocIdForAccountPageEC = function () {

  };
  AccountServices_PresentationController.prototype.getDocumentForAccountSC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var getUrl = {
      pageDownloadFile: applicationManager.getAccountServicesModule().getDownloadDocumentURL(response)
    };
    navManager.updateForm(getUrl);
  };
  AccountServices_PresentationController.prototype.updateMortgageDetails = function (details) {
    applicationManager.getNavigationManager().updateForm({
      mortgageDetails: details

    }, "frmMortgageAccountsDetails");

  };

  AccountServices_PresentationController.prototype.updateMortgagePlansSC = function (response) {
    this.mortgagePlans = response;
    this.mortgageAccounts = response;
    // this.repaymentAccount = response;
    var navManager = applicationManager.getNavigationManager();
    var dataResponse = {
      plans: response
    };
    navManager.updateForm(dataResponse);
    var dataResponse = {
      showLoadingIndicator: {
        status: false
      }
    }

    navManager.updateForm(dataResponse);
    //         applicationManager.getNavigationManager().updateForm({
    //             mortgagePlans: response

    //         }, "frmMortgageAccountsDetails");

  };

  AccountServices_PresentationController.prototype.showMortgageEC = function () {
    var mortgageObj = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AccountsUIModule",
            "appName": "HomepageMA"
        }).presentationController;
        mortgageObj.showOnServerError();
  }

  /**
  * showView : Method to handle present data to the form
  * @member of {Survey_PresentationController}
  * @param {String, Object} frm- form name, data- data to send form
  * @return {}
  * @throws {}
  */
  AccountServices_PresentationController.prototype.showView = function (frm, data) {
    this.presentUserInterface(frm, data);
  };
  /**
  * showProgressBar : Method to handle show progress bar
  * @member of {Survey_PresentationController}
  * @param {}
  * @return {}
  * @throws {}
  */
  AccountServices_PresentationController.prototype.showProgressBar = function () {
    var self = this;
    self.navigateToConsolidatedStatements({ "showProgressBar": "showProgressBar" });
  };
  /**
  * hideProgressBar : Method to handle hide progress bar
  * @member of {Survey_PresentationController}
  * @param {}
  * @return {}
  * @throws {}
  */
  AccountServices_PresentationController.prototype.hideProgressBar = function () {
    var self = this;
    self.navigateToConsolidatedStatements({ "hideProgressBar": "hideProgressBar" });
  };

  AccountServices_PresentationController.prototype.generateCombinedStatement = function (context, SuccessCallback, FailureCallback) {

    applicationManager.getAccountServicesModule().generateCombinedStatement(context, function sucess(response) {
      SuccessCallback(response)
    }, function failure(response) {
      applicationManager.getNavigationManager().updateForm({
        showLoadingIndicator: {
          status: false
        }
      })
      FailureCallback(response)
    });
  };
  
  AccountServices_PresentationController.prototype.setFormData = function(accountDetails){
	if(accountDetails.arrangementId === "" || accountDetails.arrangementId === undefined){
        accountDetails.arrangementId = this.mortgageDetails.arrangementId;
	}
    var navManager = applicationManager.getNavigationManager(); 
    navManager.navigateTo({
      "appName": "ArrangementsMA",
      "friendlyName": "AccountsUIModule/frmViewDocument"
    });
    applicationManager.getNavigationManager().updateForm({
      mortgageAccount: accountDetails
    }, "frmViewDocument");
  };
  
  AccountServices_PresentationController.prototype.fetchDocumentList = function (arrangementID) {
    applicationManager.getAccountServicesModule().fetchDocumentsList(arrangementID, this.fetchDocumentListSC.bind(this), this.fetchDocumentListEC.bind(this));
  };
  AccountServices_PresentationController.prototype.fetchDocumentListSC = function (response) {
    var data = {
      documentList: response
    };
    var navManager = applicationManager.getNavigationManager();
    navManager.updateForm(data);
  };

  AccountServices_PresentationController.prototype.fetchDocumentListEC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var data = {
      showOnServerError: response
    };
    navManager.updateForm(data);
  };

  AccountServices_PresentationController.prototype.downloadDocument = function (documentId) {
    applicationManager.getAccountServicesModule().fetchDocumentDownload(documentId, this.downloadDocumentSC.bind(this), this.downloadDocumentEC.bind(this));
  };

  AccountServices_PresentationController.prototype.downloadDocumentSC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var getUrl = {
      documentDownloadFile: applicationManager.getAccountServicesModule().getDownloadDocumentURL(response)
    };
    navManager.updateForm(getUrl);
    //applicationManager.getAccountServicesModule().autoDownload(response.fileId,this.autoDownloadSC.bind(this),this.autoDownloadEC.bind(this));
  };

  AccountServices_PresentationController.prototype.downloadDocumentEC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var data = {
      showOnServerError: response
    };
    navManager.updateForm(data);
  };

  AccountServices_PresentationController.prototype.downloadSupportingDocument = function (documentId) {
    applicationManager.getAccountServicesModule().fetchDocumentDownload(documentId, this.downloadSupportingDocumentSC.bind(this), this.downloadSupportingDocumentEC.bind(this));
  };

  AccountServices_PresentationController.prototype.downloadSupportingDocumentSC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var getUrl = {
      documentDownloadFile: applicationManager.getAccountServicesModule().getDownloadDocumentURL(response)
    };
    navManager.updateForm(getUrl,'frmViewRequests','ArrangementsMA');
    //applicationManager.getAccountServicesModule().autoDownload(response.fileId,this.autoDownloadSC.bind(this),this.autoDownloadEC.bind(this));
  };

  AccountServices_PresentationController.prototype.downloadSupportingDocumentEC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var data = {
      showOnServerError: response
    };
    navManager.updateForm(data,'frmViewRequests','ArrangementsMA');
  };

  AccountServices_PresentationController.prototype.getEarlyPayOffDetails = function (params) {
    applicationManager.getAccountServicesModule().getEarlyPayOffDetails(params, this.getEarlyPayOffDetailsSC.bind(this), this.getEarlyPayOffDetailsEC.bind(this));
  };

  AccountServices_PresentationController.prototype.getEarlyPayOffDetailsSC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    this.earlyPayOffDetails = response;
    navManager.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": "MortgageServicesUIModule/frmSimulateEarlyPayOff"
        });    
  };

  AccountServices_PresentationController.prototype.getEarlyPayOffDetailsEC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var data = {
      showOnServerError: response
    };
    navManager.updateForm(data,'frmEarlyPayOff','ArrangementsMA');       
  };

  return AccountServices_PresentationController;
});