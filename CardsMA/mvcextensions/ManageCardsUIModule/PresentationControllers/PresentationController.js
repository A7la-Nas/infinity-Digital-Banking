define(['CommonUtilities', 'OLBConstants','FormControllerUtility'], function(CommonUtilities, OLBConstants,FormControllerUtility) {
    var MDABasePresenter = kony.mvc.Presentation.BasePresenter;

    function ManageCards_PresentationController() {
        MDABasePresenter.call(this);
    }
    this.card = "";
    this.allCardsData = [];
    this.AccountNumberData = [];
    this.CardStatus = "";
    var isNavigatedFromDashBoardQuickActions = false;
    var accountDashboardData = {};
    this.action = "";
    this.cardProductName = "",
    inheritsFrom(ManageCards_PresentationController, MDABasePresenter);
    ManageCards_PresentationController.prototype.initializePresentationController = function() {};
    /**
     * navigateToManageCards - Entry point to Cards Management.
     */
    ManageCards_PresentationController.prototype.navigateToManageCards = function() {
        var viewProperties = {};
        viewProperties.progressBar = true;
        if (kony.application.getCurrentForm().id !== "frmCardManagement")
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
        this.fetchCardsList();
        this.fetchRequiredInfo();
    };
    /**
     * fetchCardsList - Issues a command to fetch all the cards associated with the current user and then presents the user interface.
     */
    ManageCards_PresentationController.prototype.fetchCardsList = function() {
        applicationManager.getCardsManager().fetchCardsList(this.fetchCardsListSuccess.bind(this), this.fetchCardsListFailure.bind(this));
    };
    /**
     * This method is used as the success call back for the fetchCardsList.
     * @param {Object} response - contains the list of cards.
     */
    ManageCards_PresentationController.prototype.fetchCardsListSuccess = function(response) {
        var actresponse = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < response.length; i++) {
            if (response[i]["cardStatus"] === "Issued") {
                for (var j = 0; j < response.length; j++) {
                    if (i !== j && (response[i]["maskedCardNumber"] === response[j]["maskedCardNumber"])) {
                        var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
                        actresponse.splice(id, 1);
                        break;
                    }
                }
            } else if (response[i]["cardStatus"] === "Expired") {
                var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
                actresponse.splice(id, 1);
            }
        }
        var viewProperties = {};
        viewProperties.progressBar = true;
        viewProperties.cards = actresponse;
        actresponse = this.appendNickNameinCardsDataFromAccountsData(actresponse);
        this.allCardsData = actresponse;
        this.filterMultipleCardsWithSameAccountNumber();
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
        this.fetchCardsStatus(actresponse);
    };
    /**
     * Method used as the failure call back for the fetchCardsListFailure.
     * @param {String} errorMessage - contains the error message for the service failure of fetchCardsList.
     */
    ManageCards_PresentationController.prototype.fetchCardsListFailure = function(errorMessage) {
        var viewProperties = {};
        viewProperties.serverDown = true;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * Issues a command to lock the given card and then presents the user interface.
     * @param {Object, String} - Card object.
     * @param {String} action - contains the action to be performed.
     */
    ManageCards_PresentationController.prototype.lockCard = function(card, action) {
        this.card = card;
        this.action = action;
        var params = {
            "cardId": card.cardId,
        }
        let presentationUtility = applicationManager.getPresentationUtility();
        if (CommonUtilities.getSCAType()!=0) {
            params.isMFARequired = card.isMFARequired;
            presentationUtility.SCA.setSCATransactionDetails("LOCK_CARD",card);
        }
        applicationManager.getCardsManager().lockCard(params, this.lockCardSuccess.bind(this), this.lockCardFailure.bind(this));
    };
    /** 
    Lockcard and CancelCard TnC
    */

    ManageCards_PresentationController.prototype.showTermsAndConditionsLockCard = function() {
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"TermsAndConditionsUIModule","appName":"AuthenticationMA"}).presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.LockCard_TnC, this.getTnCOnSuccessLockCard.bind(this), this.getTnCOnFailure.bind(this));
    }

    ManageCards_PresentationController.prototype.getTnCOnSuccessLockCard = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "TndCSuccessLockCard": response
        }, "frmCardManagement");

    };
    ManageCards_PresentationController.prototype.getTnCOnFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "inFormError": response
        }, "frmCardManagement");

    };

    ManageCards_PresentationController.prototype.showTermsAndConditionsCancelCard = function() {
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"TermsAndConditionsUIModule","appName":"AuthenticationMA"}).presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.CancelCard_TnC, this.getTnCOnSuccessCancelcard.bind(this), this.getTnCOnFailure.bind(this));
    }

    ManageCards_PresentationController.prototype.getTnCOnSuccessCancelcard = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "TndCSuccessCancelCard": response
        }, "frmCardManagement");

    };

    /**
     * method used as success call back to lock card.
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the response to lock card.
     */
    ManageCards_PresentationController.prototype.lockCardSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "LOCK_CARD",
                "response": response,
                "objectServiceDetails": {
                    "action": "Lock",
                    "serviceName": "CardManagementServices",
                    "dataModel": "LockCard",
                    "verifyOTPOperationName": "createRequest",
                    "requestOTPOperationName": "createRequest",
                    "resendOTPOperationName": "createRequest",
                },
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            var viewProperties = {};
            viewProperties.card = this.card;
            viewProperties.actionAcknowledgement = this.action;
            viewProperties.progressBar = false;
            viewProperties.card.orderId = response.orderId;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };
    /**
     * method used as failure call back to lock card.
     * @param {String} errorMessage - contains the errormessage to lock card.
     */
    ManageCards_PresentationController.prototype.lockCardFailure = function(errorMessage) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.serverError = errorMessage;
        viewProperties.progressBar = false;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * Issues a command to Un-lock the given card and then presents the user interface.
     * @param {Object, String} - Card object.
     * @param {String} action - contains the action to be performed.
     */
    ManageCards_PresentationController.prototype.unlockCard = function(card, action) {
        this.card = card;
        this.action = action;
        var params = {
            "cardId": card.cardId,
        };
        if (CommonUtilities.getSCAType()!=0) 
            params.isMFARequired = card.isMFARequired;
        applicationManager.getCardsManager().unLockCard(params, this.unlockCardSuccess.bind(this), this.unlockCardFailure.bind(this));
    };
    /**
     * method used as success call back to un-lock card.
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the response to un-lock card.
     */
    ManageCards_PresentationController.prototype.unlockCardSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "UNLOCK_CARD",
                "response": response,
                "objectServiceDetails": {
                    "action": "Activate",
                    "serviceName": "CardManagementServices",
                    "dataModel": "UnlockCard",
                    "verifyOTPOperationName": "createRequest",
                    "requestOTPOperationName": "createRequest",
                    "resendOTPOperationName": "createRequest",
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            var viewProperties = {};
            viewProperties.card = this.card;
            viewProperties.actionAcknowledgement = this.action;
            viewProperties.progressBar = false;
            viewProperties.card.orderId = response.orderId;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };
    /**
     * method used as failure call back to un-lock card.
     * @param {String} errorMessage - contains the errormessage to lock card.
     */
    ManageCards_PresentationController.prototype.unlockCardFailure = function(errorMessage){
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.serverError = errorMessage;
        viewProperties.progressBar = false;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * Method used to change pin for the card.
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - change pin.
     */
    ManageCards_PresentationController.prototype.changePin = function(params, action) {
        this.card = params.card;
        this.action = action;
        if (CommonUtilities.getSCAType()!=0) {
            applicationManager.getCardsManager().changePin({
                cardId: params.card.cardId,
                Reason: params.reason,
                notes: params.notes,
                newPin: params.newPin,
                pinNumber: params.pinNumber,
                isMFARequired : params.isMFARequired,
            }, this.changePinSuccess.bind(this), this.changePinFailure.bind(this));
        }
        else{
            applicationManager.getCardsManager().changePin({
                cardId: params.card.cardId,
                Reason: params.reason,
                notes: params.notes,
                newPin: params.newPin,
                pinNumber: params.pinNumber,
            }, this.changePinSuccess.bind(this), this.changePinFailure.bind(this));
        }
      
    };
    /**
     * method used as success call back to change pin
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - change pin.
     * @param {Object} response - contains the response to change pin.
     */
    ManageCards_PresentationController.prototype.changePinSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "CHANGE_PIN_DEBIT",
                "response": response,
                "objectServiceDetails": {
                    "action": "PinChange",
                    "serviceName": "CardManagementServices",
                    "dataModel": "ChangePIN",
                    "verifyOTPOperationName": "createRequest",
                    "requestOTPOperationName": "createRequest",
                    "resendOTPOperationName": "createRequest",
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            var viewProperties = {};
            viewProperties.card = this.card;
            viewProperties.actionAcknowledgement = this.action;
            viewProperties.progressBar = false;
            viewProperties.card.orderId = response.orderId;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };
    /**
     * method used as failure call back to change pin
     * @param {String} errorMessage - contains the errormessage to change pin.
     */
    ManageCards_PresentationController.prototype.changePinFailure = function(errorMessage) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.serverError = errorMessage;
        viewProperties.progressBar = false;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * Method used to update card withdrawal limit.
     * @param {Object} card - contains card object
     * @param {String} withdrawalLimit - contains the action to be - update withdrawal.
     */
    ManageCards_PresentationController.prototype.updateWithdrawalLimit = function(params) {
        this.card = params.card;
        if(CommonUtilities.getSCAType()!=0){
            applicationManager.getCardsManager().updateWithdrawalLimit({
                "cardId": params.cardId,
                "withdrawalLimit": params.withdrawalLimit,
                "isMFARequired" : params.isMFARequired,
            }, this.updateWithdrawalLimitSuccess.bind(this), this.updateWithdrawalLimitFailure.bind(this));
        }
        else{
        applicationManager.getCardsManager().updateWithdrawalLimit({
            "cardId": params.cardId,
            "withdrawalLimit": params.withdrawalLimit
        }, this.updateWithdrawalLimitSuccess.bind(this), this.updateWithdrawalLimitFailure.bind(this));
    }
    };

    /**
     * method used as success call backupdate card withdrawal limit
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - update card withdrawal limit.
     * @param {Object} response - contains the response update card withdrawal limit
     */
    ManageCards_PresentationController.prototype.updateWithdrawalLimitSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "UPDATE_WITHDRAWAL",
                "response": response,
                "objectServiceDetails": {
                    "action": "updateWithdrawalLimit",
                    "serviceName": "CardManagementServices",
                    "dataModel": "WithdrawalLimit",
                    "verifyOTPOperationName": "updateLimit",
                    "requestOTPOperationName": "updateLimit",
                    "resendOTPOperationName": "updateLimit",
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            var viewProperties = {};
            viewProperties.card = this.card;
            viewProperties.cardLimitAcknowledgement = true;
            viewProperties.progressBar = false;
            viewProperties.orderId = response.orderId;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };
    /**
     * method used as failure call back update card withdrawal limit
     * @param {String} errorMessage - contains the errormessage update card withdrawal limit
     */
    ManageCards_PresentationController.prototype.updateWithdrawalLimitFailure = function(errorMessage) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.serverError = errorMessage;
        viewProperties.progressBar = false;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * Method used to update card Purchase limit.
     * @param {Object} card - contains card object
     * @param {String} withdrawalLimit - contains the action to be - update Purchase.
     */

    ManageCards_PresentationController.prototype.updatePurchaseLimit = function(params) {
        this.card = params.card;
        if(CommonUtilities.getSCAType()!=0){
            applicationManager.getCardsManager().updatePurchaseLimit({
                "cardId": params.cardId,
                "purchaseLimit": params.purchaseLimit,
                "isMFARequired" : params.isMFARequired,
            }, this.updatePurchaseLimitSuccess.bind(this), this.updatePurchaseLimitFailure.bind(this));
        }
        
        else{
        applicationManager.getCardsManager().updatePurchaseLimit({
            "cardId": params.cardId,
            "purchaseLimit": params.purchaseLimit
        }, this.updatePurchaseLimitSuccess.bind(this), this.updatePurchaseLimitFailure.bind(this));
    }
    };

    /**
     * method used as success call backupdate card Purchase limit
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - update card Purchase limit.
     * @param {Object} response - contains the response update card Purchase limit
     */

    ManageCards_PresentationController.prototype.updatePurchaseLimitSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "UPDATE_PURCHASE",
                "response": response,
                "objectServiceDetails": {
                    "action": "updatePurchaseLimit",
                    "serviceName": "CardManagementServices",
                    "dataModel": "PurchaseLimit",
                    "verifyOTPOperationName": "updateLimit",
                    "requestOTPOperationName": "updateLimit",
                    "resendOTPOperationName": "updateLimit",
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            var viewProperties = {};
            viewProperties.card = this.card;
            viewProperties.cardLimitAcknowledgement = true;
            viewProperties.progressBar = false;
            viewProperties.orderId = response.orderId;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };

    /**
     * method used as failure call back update card Purchase limit
     * @param {String} errorMessage - contains the errormessage update card Purchase limit
     */

    ManageCards_PresentationController.prototype.updatePurchaseLimitFailure = function(errorMessage) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.serverError = errorMessage;
        viewProperties.progressBar = false;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * reportLost - Issues a command to report a lost card and then presents the user interface.
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - report lost card.
     */
    ManageCards_PresentationController.prototype.reportLost = function(params, action) {
        this.card = params.card;
        this.action = action;
        if(CommonUtilities.getSCAType()!=0){
            applicationManager.getCardsManager().reportLost({
                cardId: params.card.cardId,
                Reason: params.Reason,
                notes: params.notes,
                isMFARequired : params.isMFARequired,
            }, this.reportLostSuccess.bind(this), this.reportLostFailure.bind(this));
        }
        else{
        applicationManager.getCardsManager().reportLost({
            cardId: params.card.cardId,
            Reason: params.Reason,
            notes: params.notes,
        }, this.reportLostSuccess.bind(this), this.reportLostFailure.bind(this));
    }
    };
    /**
     * method used as success call back to report lost card.
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - report lost card.
     * @param {Object} response - contains the response to report lost card.
     */
    ManageCards_PresentationController.prototype.reportLostSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "REPORT_LOST",
                "response": response,
                "objectServiceDetails": {
                    "action": "Report Lost",
                    "serviceName": "CardManagementServices",
                    "dataModel": "ReportLost",
                    "verifyOTPOperationName": "createRequest",
                    "requestOTPOperationName": "createRequest",
                    "resendOTPOperationName": "createRequest",
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            var viewProperties = {};
            viewProperties.card = this.card;
            viewProperties.actionAcknowledgement = this.action;
            viewProperties.progressBar = false;
            viewProperties.card.orderId = response.orderId;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };
    /**
     * method used as failure call back to report lost card.
     * @param {String} errorMessage - contains the errormessage to report lost card.
     */
    ManageCards_PresentationController.prototype.reportLostFailure = function(errorMessage) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.serverError = errorMessage;
        viewProperties.progressBar = false;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    ManageCards_PresentationController.prototype.cancelCard = function(params, action) {
        this.card = params.card;
        this.action = action;
        if(CommonUtilities.getSCAType()!=0){
            applicationManager.getCardsManager().cancelCard({
                cardId: params.card.cardId,
                Reason: params.Reason,
                Action: 'Cancel',
                isMFARequired : params.isMFARequired,
            }, this.cancelCardSuccess.bind(this), this.cancelCardFailure.bind(this));
        }
        else{
        applicationManager.getCardsManager().cancelCard({
            cardId: params.card.cardId,
            Reason: params.Reason,
            Action: 'Cancel',
        }, this.cancelCardSuccess.bind(this), this.cancelCardFailure.bind(this));
    }
    };
    ManageCards_PresentationController.prototype.cancelCardSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "CANCEL_CARD",
                "response": response,
                "objectServiceDetails": {
                    "action": "CancelCard",
                    "serviceName": "CardManagementServices",
                    "dataModel": "CancelCard",
                    "verifyOTPOperationName": "createRequest",
                    "requestOTPOperationName": "createRequest",
                    "resendOTPOperationName": "createRequest",
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            var viewProperties = {};
            viewProperties.card = this.card;
            viewProperties.actionAcknowledgement = this.action;
            viewProperties.progressBar = false;
            viewProperties.card.orderId = response.orderId;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };
    ManageCards_PresentationController.prototype.cancelCardFailure = function(errorMessage) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.serverError = errorMessage;
        viewProperties.progressBar = false;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * sendSecureAccessCode - Issues a command to send Secure Access Code and then presents the user interface
     * @param {Object} params - Params object.
     * @param {String} action - contains the action name
     */
    ManageCards_PresentationController.prototype.sendSecureAccessCode = function(params, action) {
        applicationManager.getUserPreferencesManager().SendSecureAccessCode(this.sendSecureAccessCodeSuccess.bind(this, params, action), this.sendSecureAccessCodeFailure.bind(this));
    };
    /**
     * method used as the success call back for the send secure access code service.
     * @param {Object} params - contains the parameters for the updation.
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the response to the send secure access service.
     */
    ManageCards_PresentationController.prototype.sendSecureAccessCodeSuccess = function(params, action, response) {
        var viewProperties = {};
        viewProperties.params = params;
        viewProperties.action = action;
        viewProperties.secureAccessCode = true;
        viewProperties.progressBar = false;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * method used as the failure call back for the send secure access code service.
     * @param {String} errormessage - contains the error message.
     */
    ManageCards_PresentationController.prototype.sendSecureAccessCodeFailure = function(errormessage) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.serverError = errormessage;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * method to verify the secure access code.
     * @param {Object} params - contains the pin.
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the response to the verify secure access service.
     */
    ManageCards_PresentationController.prototype.verifySecureAccessCode = function(params, action) {
        applicationManager.getUserPreferencesManager().VerifySecureAccessCode({
            Otp: params.enteredAccessCode
        }, this.verifySecureAccessCodeSuccess.bind(this, params, action), this.verifySecureAccessCodeFailure.bind(this, params, action));
    };
    /**
     * method used as success call back to verify the secure access code.
     * @param {Object} params - contains the pin.
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the response to the verify secure access service.
     */
    ManageCards_PresentationController.prototype.verifySecureAccessCodeSuccess = function(params, action) {
        if (action === kony.i18n.getLocalizedString("i18n.CardManagement.LockCard")) {
            if (CommonUtilities.getSCAType()!=0) 
            params.card.isMFARequired = params.isMFARequired;
            this.lockCard(params.card, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin")) {
            this.changePin(params, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard")) {
            if (CommonUtilities.getSCAType()!=0) 
            params.card.isMFARequired = params.isMFARequired;
            this.unlockCard(params.card, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost")) {
            this.reportLost(params, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard")) {
            this.replaceCard(params, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard")) {
            this.cancelCard(params, action);
        } else if (action === "Offline_Change_Pin") {
            this.createCardRequest(params, action);
        }
    };
    /**
     * method used as failure call back to verify the secure access code.
     * @param {Object} params - contains the pin.
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the errormessage to the verify secure access service.
     */
    ManageCards_PresentationController.prototype.verifySecureAccessCodeFailure = function(params, action, response) {
        if (response.isServerUnreachable) {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true
            });
            CommonUtilities.showServerDownScreen();
        } else {
            var viewProperties = {};
            viewProperties.card = params.card;
            viewProperties.action = action;
            viewProperties.incorrectSecureAccessCode = true;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };
    /**
     * replaceCard - Issues a command to replace card and then presents the user interface.
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - replace card.
     */
    ManageCards_PresentationController.prototype.replaceCard = function(params, action) {
        this.card = params.card;
        this.action = action;
        if(CommonUtilities.getSCAType()!=0){
            applicationManager.getCardsManager().replaceCard({
                cardId: params.card.cardId,
                reason: params.reason,
                isMFARequired : params.isMFARequired,
            }, this.replaceCardSuccess.bind(this), this.replaceCardFailure.bind(this));
        }
        else{
            applicationManager.getCardsManager().replaceCard({
                cardId: params.card.cardId,
                reason: params.reason,
            }, this.replaceCardSuccess.bind(this), this.replaceCardFailure.bind(this));
    }
    };
    /**
     * method used as success call back to replace card
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - replace card
     * @param {Object} response - contains the response to replace card
     */
    ManageCards_PresentationController.prototype.replaceCardSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "REPLACE_CARD",
                "response": response,
                "objectServiceDetails": {
                    "action": "Replace Request",
                    "serviceName": "CardManagementServices",
                    "dataModel": "ReplaceCard",
                    "verifyOTPOperationName": "createRequest",
                    "requestOTPOperationName": "createRequest",
                    "resendOTPOperationName": "createRequest",
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            var viewProperties = {};
            viewProperties.card = this.card;
            viewProperties.actionAcknowledgement = this.action;
            viewProperties.progressBar = false;
            viewProperties.card.orderId = response.orderId;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };
    /**
     * method used as failure call back to replace card
     * @param {String} errorMessage - contains the errormessage to replace card
     */
    ManageCards_PresentationController.prototype.replaceCardFailure = function(errorMessage) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.serverError = errorMessage;
        viewProperties.progressBar = false;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * Fetch already created Travel Notifications for user
     */
    ManageCards_PresentationController.prototype.fetchTravelNotifications = function() {
        var params = {
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "lastNinetyDays ": 1
        };
        applicationManager.getCardsManager().fetchNotificationsList(params, this.fetchTravelNotificationsSuccess.bind(this), this.fetchTravelNotificationsFailure.bind(this));
    };
    /**
     * Method used as the success call back for the success call back for fetchTravelNotificationsSuccess.
     * @param {Object} response - contains the travel notifications object.
     */
    ManageCards_PresentationController.prototype.fetchTravelNotificationsSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "travelNotificationsList": response
        }, "frmCardManagement");
    };
    /**
     * Method used as the failure call back for the fetchTravelNotificationsFailure.
     * @param {String} errorMessage - contains the error message for the failure of fetchTravelNotifications.
     */
    ManageCards_PresentationController.prototype.fetchTravelNotificationsFailure = function(errorMessage) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": errorMessage
        }, "frmCardManagement");
    };
    ManageCards_PresentationController.prototype.activateCard = function(card, action,isMFARequired) {
        this.card = card;
        this.action = action;
        var params = {
            "cvv": card.cvv,
            "cardId": card.cardId
        };
        if (CommonUtilities.getSCAType()!=0) 
            params.isMFARequired = isMFARequired;
        if (!kony.sdk.isNullOrUndefined(card.oldCVV))
            params.oldcvv = card.oldCVV;
        applicationManager.getCardsManager().activateCards(params, this.activateCardSuccess.bind(this), this.activateCardFailure.bind(this));
    };

    ManageCards_PresentationController.prototype.activateCardSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "ACTIVATE_CARD",
                "response": response,
                "objectServiceDetails": {
                    "serviceName": "CardManagementServices",
                    "dataModel": "ActivateCard",
                    "verifyOTPOperationName": "createRequest",
                    "requestOTPOperationName": "createRequest",
                    "resendOTPOperationName": "createRequest",
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            var viewProperties = {};
            viewProperties.card = this.card;
            viewProperties.card.orderId = response.orderId;
            viewProperties.actionAcknowledgement = this.action;
            viewProperties.progressBar = false;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };

    ManageCards_PresentationController.prototype.activateCardFailure = function(error) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        if (error.isServerUnreachable) {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true
            });
            CommonUtilities.showServerDownScreen();
        } else {
            var viewProperties = {};
            viewProperties.progressBar = false;
            if (error.dbpErrCode == "21016" || (error.serverErrorRes && error.serverErrorRes.dbpErrCode == "21016")) {
                viewProperties.card = this.card;
                viewProperties.showIncorrectCVV = true;
                applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
            } else {
                viewProperties.serverError = error;
                applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
            }
        }
    };
    /**
     * Method used for new travel plan in cards.
     * @param {Object} scope - contains isEditFLow flag.
     */
    ManageCards_PresentationController.prototype.AddNewTravelPlan = function(scope) {
        var self = this;
        var data = {};
        if (scope)
            data.isEditFlow = scope.isEditFlow;
        data.AddNewTravelPlan = 'AddNewTravelPlan';
        var asyncManager = applicationManager.getAsyncManager();
        var userPrefManager = applicationManager.getUserPreferencesManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(userPrefManager, 'getCountryList'),
                asyncManager.asyncItem(userPrefManager, 'getStatesList'),
                asyncManager.asyncItem(userPrefManager, 'getCityList'),
            ],
            this.AddNewTravelPlanCompletionCallBack.bind(this, data)
        );
    };
    /**
     * Method used as completion call back for the async call to getCountryList, getStatesList, getCityList.
     * @param {Object} data - contains the addNewTravelPlan property.
     * @param {Object} syncResponseObject - contains the async manager respnose.
     */
    ManageCards_PresentationController.prototype.AddNewTravelPlanCompletionCallBack = function(data, syncResponseObject) {
        if (syncResponseObject.isAllSuccess()) {
            data.country = syncResponseObject.responses[0].data.records;
            data.states = syncResponseObject.responses[1].data.records;
            data.city = syncResponseObject.responses[2].data.records;
            applicationManager.getNavigationManager().updateForm(data, "frmCardManagement")
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true
            });
            CommonUtilities.showServerDownScreen();
        }
    };
    /**
     * Method to create new travel notification.
     * @param {Object} notificationObj - contains the notificaion data.
     */
    ManageCards_PresentationController.prototype.createTravelNotification = function(notificationObj) {
        var formatUtil = applicationManager.getFormatUtilManager();
        var channelId = this.getChannelId();
        var tavelNotification = {
            "Destinations": JSON.stringify(notificationObj.locations),
            "Channel_id": channelId,
            "StartDate": formatUtil.convertToUTC(notificationObj.fromDate),
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "additionNotes": notificationObj.notes,
            "EndDate": formatUtil.convertToUTC(notificationObj.toDate),
            "phonenumber": notificationObj.phone,
            "Cards": JSON.stringify(notificationObj.selectedcards),
        };
        applicationManager.getCardsManager().createTravelNotification(tavelNotification, this.createTravelNotificationSuccess.bind(this), this.createTravelNotificationFailure.bind(this));
    };
    /**
     * Method used as the success call back for the createTravelNotification service call.
     * @param {Object} response - contains the response for the createTravelNotification
     */
    ManageCards_PresentationController.prototype.createTravelNotificationSuccess = function(response) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.notificationAcknowledgement = response;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * Method used as the failure call back for the createTravelNotification service call.
     * @param {Object} notificationObj - contains the errorMessage for the createTravelNotification service call.
     */
    ManageCards_PresentationController.prototype.createTravelNotificationFailure = function(errorMessage) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.serverError = errorMessage.errorMessage; //errorMessage.serverErrorRes && errorMessage.serverErrorRes.dbpErrMsg;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * Issues a command to fetch travel status  associated with the current user's cards and then presents the user interface.
     * @param {cards} - array of card ids
     */
    ManageCards_PresentationController.prototype.fetchCardsStatus = function(cards) {
        var self = this;
        var cardsViewModel = {};
        var cardsViewArray = [];
        cards.forEach(function(card) {
            cardsViewArray.push(card.maskedCardNumber);
        });
        cardsViewArray = JSON.stringify(cardsViewArray);
        cardsViewArray = cardsViewArray.replace(/"/g, "'");
        var context = {
            "CardNumbers": cardsViewArray            
        };
        applicationManager.getCardsManager().fetchCardStatus(context, this.fetchCardsStatusSuccess.bind(this, cards), this.fetchCardsStatusFailure.bind(this));
    };
    /**
     * Method used as the success call back for the createTravelNotification service call.
     * @param {Object} response - contains the response for the createTravelNotification
     */
    ManageCards_PresentationController.prototype.fetchCardsStatusSuccess = function(cards, response) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        this.CardStatus = response.CardStatus;
        viewProperties.travelStatus = {
            "status": response.CardStatus,
            "data": cards
        };
        if (!isNavigatedFromDashBoardQuickActions) {
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        } else {
            var data = this.getAllCardsByAccountNumber(accountDashboardData.accountID);
            var viewModel = {
                searchResults: data,
                searchPerformed: true,
                searchFrom: "AccountsDashboard"
            }
            applicationManager.getNavigationManager().updateForm(viewModel, 'frmCardManagement');
        }
        isNavigatedFromDashBoardQuickActions = false;
    };
    /**
     * Method used as the failure call back for the createTravelNotification service call.
     * @param {Object} notificationObj - contains the errorMessage for the createTravelNotification service call.
     */
    ManageCards_PresentationController.prototype.fetchCardsStatusFailure = function(errorMessage) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.serverDown = true;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    /**
     * Method used to fetch user Addresses from userPreferences Manager.
     * @returns {Object} - returns the list of user addresses.
     */
    ManageCards_PresentationController.prototype.fetchUserAddresses = function() {
        return applicationManager.getUserPreferencesManager().getEntitlementAddresses();
    };
    /**
     * Method used to fetch user Phone Numbers from userPreferences Manager.
     * @returns {Object} - returns the list of user Phone numbers.
     */
    ManageCards_PresentationController.prototype.fetchUserPhoneNumbers = function() {
        return applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers();
    };
    /**
     * Method used to fetch user Email-Ids from userPreferences Manager.
     * @returns {Object} - returns the list of user Email-Ids.
     */
    ManageCards_PresentationController.prototype.fetchUserEmailIds = function() {
        return applicationManager.getUserPreferencesManager().getEntitlementEmailIds();
    };
    /**
     * Method used to fetch user name from userPreferences Manager.
     * @returns {String} - returns user name.
     */
    ManageCards_PresentationController.prototype.getUserName = function() {
        return applicationManager.getUserPreferencesManager().getCurrentUserName();
    };
    /**
     * Method used to fetch the required info like user addresses, phone numbers and email ids.
     */
    ManageCards_PresentationController.prototype.fetchRequiredInfo = function() {
        this.fetchUserPhoneNumbers();
        this.fetchUserEmailIds();
        this.fetchUserAddresses();
    }
    /**
     * Method used to delete Travel Notification.
     * @param {Object} requestID - contains the travel notification Id.
     */
    ManageCards_PresentationController.prototype.deleteNotification = function(requestID) {
        applicationManager.getCardsManager().deleteNotification({
            request_id: requestID
        }, this.deleteNotificationSuccess.bind(this), this.deleteNotificationFailure.bind(this));
    };
    /**
     * Method used as the success call back for the delete travel notification.
     * @param {Object} response - contains the response to delete travel notification.
     */
    ManageCards_PresentationController.prototype.deleteNotificationSuccess = function(response) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.notificationDeleted = true;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * Method used as the failure call back for the delete travel notification.
     * @param {String} errorMessage - contains the error message.
     */
    ManageCards_PresentationController.prototype.deleteNotificationFailure = function(errorMessage) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.serverError = errorMessage;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * Method used to create a card request.
     * @param {Object} params - contains the pin.
     * @param {String} action - contains the action to be performed.
     */
    ManageCards_PresentationController.prototype.createCardRequest = function(params, action) {
        this.card = params;
        this.action = action;
        if(action=="Offline_Change_Pin")
        {
        params.cardId=params.card.cardId;
        delete params["CardAccountNumber"];
        params.Action="PinChangeCredit";
        }
        applicationManager.getCardsManager().createCardRequest(params, this.createCardRequestSuccess.bind(this), this.createCardRequestFailure.bind(this));
    };
    /**
     * Method used as the failure call back for the create card request service.
     * @param {String} errorMessage - contains the error message.
     */
    ManageCards_PresentationController.prototype.createCardRequestFailure = function(errorMessage) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.serverError = errorMessage;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * Method used as the success call back for the create card request.
     * @param {Object} response - contains the response to the create card request.
     */
    ManageCards_PresentationController.prototype.createCardRequestSuccess = function(response) {
        var self = this;
        var mfaManager = applicationManager.getMFAManager();
        var viewProperties = {};
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "CHANGE_PIN_CREDIT",
                "response": response,
                "objectServiceDetails": {
                    "serviceName": "CardManagementServices",
                    "dataModel": "ChangePIN",
                    "verifyOTPOperationName": "updateCreditCardPin",
                    "requestOTPOperationName": "updateCreditCardPin",
                    "resendOTPOperationName": "updateCreditCardPin",
                
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
            if (this.action === "Offline_Change_Pin") {
                viewProperties.card = this.card.card;
                viewProperties.actionAcknowledgement = this.action;
                viewProperties.card.orderId = response.orderId;
                applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
            } else if (this.action === kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard")) {
                self.replaceCard(this.card, this.action);
            }
        }
    };
    /**
     * getEligibleCards - Issues a command to get active cards and then presents the user interface.
     */
    ManageCards_PresentationController.prototype.getEligibleCards = function() {
        applicationManager.getCardsManager().fetchActiveCards(this.getEligibleCardsSuccess.bind(this), this.getEligibleCardsFailure.bind(this));
    };
    /**
     * Method used as the sucess call back for the getEligibleCards service.
     * @param {Object} data - contains the list of eligible cards.
     */
    ManageCards_PresentationController.prototype.getEligibleCardsSuccess = function(data) {
        var viewProperties = {};
        viewProperties.eligibleCards = data;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * Method used as the failure call back for the getEligibleCards service.
     * @param {String} errorMessage - contains the error message.
     */
    ManageCards_PresentationController.prototype.getEligibleCardsFailure = function(errorMessage) {
        var viewProperties = {};
        viewProperties.serverDown = true;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * updateTravelNotification - Issues a command to update travel notification.
     * @param {Object} notificationObj - Params Object
     */
    ManageCards_PresentationController.prototype.updateTravelNotifications = function(notificationObj) {
        var self = this;
        var channelId = this.getChannelId();
        var formatUtil = applicationManager.getFormatUtilManager();
        var notificationData = {
            Channel_id: channelId,
            request_id: notificationObj.requestId,
            Destinations: JSON.stringify(notificationObj.locations),
            userName: applicationManager.getUserPreferencesManager().getCurrentUserName(),
            additionNotes: notificationObj.notes,
            phonenumber: notificationObj.phone,
            Cards: JSON.stringify(notificationObj.selectedcards),
            StartDate: formatUtil.convertToUTC(notificationObj.fromDate),
            EndDate: formatUtil.convertToUTC(notificationObj.toDate),
        };
        applicationManager.getCardsManager().updateTravelNotifications(notificationData, this.updateTravelNotificationSuccess.bind(this), this.updateTravelNotificationFailure.bind(this));
    };
    /**
     * updateTravelNotification - Issues a command to update travel notification.
     * @param {Object} - Params Object
     */
    ManageCards_PresentationController.prototype.updateTravelNotificationSuccess = function(response) {
        var self = this;
        var viewProperties = {};
        viewProperties.notificationAcknowledgement = response;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * updateTravelNotification - Issues a command to update travel notification.
     * @param {Object} reponse - Params Object
     */
    ManageCards_PresentationController.prototype.updateTravelNotificationFailure = function(errorOject) {
        var self = this;
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.serverError = errorOject.serverErrorRes && errorOject.serverErrorRes.dbpErrMsg;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * fetchSecurityQuestions - Issues a command to fetch Security Questions and then presents the user interface
     * @param {Object} - Card object
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the service response for the fetch security questions.
     */
    ManageCards_PresentationController.prototype.fetchSecurityQuestions = function(card, action) {
        applicationManager.getUserPreferencesManager().fetchSecurityQuestions({
            userName: applicationManager.getUserPreferencesManager().getCurrentUserName()
        }, this.fetchSecurityQuestionsSuccess.bind(this, card, action), this.fetchSecurityQuestionsFailure.bind(this, card, action));
    };
    /**
     * Method to be used as success call back for the fetch security questions.
     * @param {Object} - Card object
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the service response for the fetch security questions.
     */
    ManageCards_PresentationController.prototype.fetchSecurityQuestionsSuccess = function(card, action, response) {
        var viewProperties = {};
        viewProperties.card = card;
        viewProperties.action = action;
        viewProperties.securityQuestions = response.records;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * Method to be used as failure call back for the fetch security questions.
     * @param {Object} - Card object
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the service response for the fetch security questions.
     */
    ManageCards_PresentationController.prototype.fetchSecurityQuestionsFailure = function(card, action, response) {
        var viewProperties = {};
        viewProperties.serverDown = true;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    /**
     * verifySecurityQuestionAnswers - Issues a command to verify Security Questions and then presents the user interface
     * @param {Object} params - Card object
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the service response for the fetch security questions.
     */
    ManageCards_PresentationController.prototype.verifySecurityQuestionAnswers = function(params, action) {
        var self = this;
        var questionAnswerParams = {};
        questionAnswerParams.userName = applicationManager.getUserPreferencesManager().getCurrentUserName();
        questionAnswerParams.securityQuestions = JSON.stringify(params.questionAnswers);
        applicationManager.getUserPreferencesManager().verifySecurityQuestions(questionAnswerParams, this.verifySecurityQuestionAnswersSuccess.bind(this, params, action), this.verifySecurityQuestionAnswersFailure.bind(this, params, action));
    };
    /**
     * verifySecurityQuestionAnswers - Issues a command to verify Security Questions and then presents the user interface
     * @param {Object} params - Card object
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the service response for the fetch security questions.
     */
    ManageCards_PresentationController.prototype.verifySecurityQuestionAnswersSuccess = function(params, action, response) {
        var self = this;
        if (response.verifyStatus === "true") {
            if (action === kony.i18n.getLocalizedString("i18n.CardManagement.LockCard")) {
                self.lockCard(params.card, action);
            } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin")) {
                self.changePin(params, action);
            } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard")) {
                self.unlockCard(params.card, action);
            } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost")) {
                self.reportLost(params, action);
            } else if (action === kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard") || action === "Offline_Change_Pin") {
                self.createCardRequest(params, action);
            } else if (action === kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard")) {
                this.cancelCard(params, action);
            }
        } else if (response.verifyStatus === "false") {
            var viewProperties = {};
            viewProperties.card = params.card;
            viewProperties.action = action;
            viewProperties.incorrectSecurityAnswers = true;
            applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
        }
    };
    /**
     * verifySecurityQuestionAnswers - Issues a command to verify Security Questions and then presents the user interface
     * @param {Object} params - Card object
     * @param {String} action - contains the action to be performed.
     * @param {Object} response - contains the service response for the fetch security questions.
     */
    ManageCards_PresentationController.prototype.verifySecurityQuestionAnswersFailure = function(params, action, errorMessage) {
        var viewProperties = {}
        viewProperties.serverError = errorMessage.errorMessage || errorMessage;
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };
    ManageCards_PresentationController.prototype.showPrintPage = function(data) {
        var scopeObj = this;
        data.printKeyValueGroupModel.printCallback = function() {
            scopeObj.showAcknowlegeScreenOnPrintCancel();
        }
        applicationManager.getNavigationManager().navigateTo('frmPrintTransfer');
        applicationManager.getNavigationManager().updateForm(data, 'frmPrintTransfer');
    };
    ManageCards_PresentationController.prototype.showAcknowlegeScreenOnPrintCancel = function() {
        var viewProperties = {};
        viewProperties.isPrintCancelled = true;
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
    };

    /**
     * getChannelId - Returns the channel name in which the application is running 
     */
    ManageCards_PresentationController.prototype.getChannelId = function() {
        var channelId;
        var orientationHandler = new OrientationHandler();
        if (orientationHandler.isDesktop)
            channelId = OLBConstants.CHANNEL_DESKTOP;
        else if (orientationHandler.isMobile)
            channelId = OLBConstants.CHANNEL_MOBILE;
        else
            channelId = OLBConstants.CHANNEL_TABLET;
        return channelId;
    };

    ManageCards_PresentationController.prototype.searchAccounts = function(searchString, searchFrom) {
        if (searchString.length > 0) {
            var data = this.AccountNumberData.filter(function(record) {
                return (record["accountNumber"] && record["accountNumber"].toUpperCase().indexOf(searchString.toUpperCase()) !== -1 ||
                    record["nickName"] && record["nickName"].toUpperCase().indexOf(searchString.toUpperCase()) !== -1)
            });
        } else {
            var data = this.AccountNumberData;
        }
        var viewModel = {
            searchResults: data,
            searchPerformed: true,
            searchFrom: searchFrom
        }
        applicationManager.getNavigationManager().updateForm(viewModel, 'frmCardManagement');
    };
    ManageCards_PresentationController.prototype.navigateToCardsFromAccountDashboard = function(accountData) {
        isNavigatedFromDashBoardQuickActions = true;
        accountDashboardData = accountData;
        this.navigateToManageCards();
    };
    ManageCards_PresentationController.prototype.getAllCardsByAccountNumber = function(accountNumber) {
        var data = this.allCardsData.filter(function(record) {
            return (record["accountNumber"] && record["accountNumber"].toUpperCase() == accountNumber)
        });
        return data;
    };
    ManageCards_PresentationController.prototype.filterMultipleCardsWithSameAccountNumber = function() {
        var cardsData = [];
        var uniqueCards = []
        for (var individualCard of this.allCardsData) {
            if (uniqueCards.indexOf(individualCard.accountNumber) == -1) {
                var data = this.allCardsData.filter(function(record) {
                    return (record["accountNumber"] == individualCard.accountNumber);
                });
                uniqueCards.push(individualCard.accountNumber);
                cardsData.push(data[0]);
            }
        }
        this.AccountNumberData = cardsData;
    };
    ManageCards_PresentationController.prototype.appendNickNameinCardsDataFromAccountsData = function(cards) {
      var cardsWithNickname = [];
      var accounts = applicationManager.getAccountManager().getInternalAccounts();
      // for (var individualAccountData of accounts) {
      /*var cardsData = cards.filter(function(record) {
                      return (record["accountNumber"] && record["accountNumber"] == individualAccountData.accountID)
                  });*/
      if(!accounts){
        accounts=[];
      }
      for (var matchingAccounts of cards) {
        var individualAccountData = accounts.filter(function(account) {
          return (account["accountID"] && account["accountID"] == matchingAccounts.accountNumber)
        });
        matchingAccounts.nickName = (individualAccountData.nickName) ? individualAccountData.nickName : (individualAccountData.accountName) ? individualAccountData.accountName : "";
        matchingAccounts.nickName=(matchingAccounts.nickName)? matchingAccounts.nickName:(individualAccountData[0]&&individualAccountData[0].nickName) ? individualAccountData[0].nickName : (individualAccountData[0] && individualAccountData[0].accountName) ? individualAccountData[0].accountName : "";
        matchingAccounts.maskedNickNameAndNumber = matchingAccounts.nickName&&matchingAccounts.nickName!==""&&(individualAccountData&&individualAccountData.accountID) ? CommonUtilities.mergeAccountNameNumber(matchingAccounts.nickName, individualAccountData.accountID):"";
        matchingAccounts.maskedNickNameAndNumber = (matchingAccounts.maskedNickNameAndNumber)? matchingAccounts.maskedNickNameAndNumber:((matchingAccounts.nickName&&matchingAccounts.nickName!=="")&&(individualAccountData[0]&&individualAccountData[0].accountID)) ? CommonUtilities.mergeAccountNameNumber(matchingAccounts.nickName, individualAccountData[0].accountID):"";
        cardsWithNickname.push(matchingAccounts);
      }
      // }
      return cardsWithNickname;
    };
    ManageCards_PresentationController.prototype.navigateToNewCardFlow = function() {
        var accountManager = applicationManager.getAccountManager();
        accountManager.fetchInternalAccounts(this.fetchAccountsSuccess.bind(this), this.fetchAccountsError.bind(this));
    };

    ManageCards_PresentationController.prototype.fetchAccountsSuccess = function(resInp) {
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});        var cardsMan = applicationManager.getCardsManager();
        var accounts = cardsMan.fetchAccountsForNewcard();
        var filterList = function (input) {
            try {
              let accountData = JSON.parse(JSON.stringify(input));
              let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
              return filteredAccountData;
            } catch(err){
              return input;
            }
          };
        var savingAcc = accountMod.presentationController.processAccountsData(filterList(accounts[1]));
        var checkingAcc = accountMod.presentationController.processAccountsData(filterList(accounts[0]));
        var processedAcc = [];
        if (checkingAcc && checkingAcc.length > 0)
            processedAcc.push(checkingAcc);
        if (savingAcc && savingAcc.length > 0)
            processedAcc.push(savingAcc);
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.setAccountsForCards = processedAcc;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };

    ManageCards_PresentationController.prototype.fetchAccountsError = function(errorMessage) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.serverError = errorMessage.errorMessage;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };

    ManageCards_PresentationController.prototype.getSelectCardProducts = function(accountType, accountData) {
        var cardsManager = applicationManager.getCardsManager();
        cardsManager.fetchCardProducts({
            "accountType": accountType
        }, this.fetchCardProductsSuccess.bind(this, accountData), this.fetchCardProductsError);
    };
    ManageCards_PresentationController.prototype.fetchCardProductsSuccess = function(accountData, response) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.setCardProductDetails = response;
        viewProperties.accountData = accountData;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };
    ManageCards_PresentationController.prototype.fetchCardProductsError = function(errorMessage) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.serverError = errorMessage.errorMessage;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };

    ManageCards_PresentationController.prototype.getBillingAddress = function() {
        var userpref = applicationManager.getUserPreferencesManager();
        var address = [];
        if(kony.sdk.isNullOrUndefined(userpref.getUserObj().Addresses) || (userpref.getUserObj().Addresses.length === 0)){
            return "";
        }
        if(userpref.getUserObj().Addresses[0].AddressLine1)
            address.push(userpref.getUserObj().Addresses[0].AddressLine1);
        if(userpref.getUserObj().Addresses[0].AddressLine2)
            address.push(userpref.getUserObj().Addresses[0].AddressLine2);
        if(userpref.getUserObj().Addresses[0].CityName)
            address.push(userpref.getUserObj().Addresses[0].CityName);
        if(userpref.getUserObj().Addresses[0].RegionName)
            address.push(userpref.getUserObj().Addresses[0].RegionName);
        if(userpref.getUserObj().Addresses[0].CountryName)
            address.push(userpref.getUserObj().Addresses[0].CountryName);
        if(userpref.getUserObj().Addresses[0].ZipCode)
            address.push(userpref.getUserObj().Addresses[0].ZipCode);
        var addrString = "";
        for (var i = 0; i < address.length; i++) {
                addrString += address[i] + ",";
        }
        if (addrString.charAt(addrString.length - 1) == ",") addrString = addrString.slice(0, -1);
        return addrString;
    };

    ManageCards_PresentationController.prototype.applyNewCard = function(cardsObj) {
        var cardsManager = applicationManager.getCardsManager();
        var currencyCode = applicationManager.getFormatUtilManager().getCurrencySymbolCode(applicationManager.getConfigurationManager().getCurrencyCode());
        var params = {
            "pinNumber": cardsObj.pinNumber,
            "accountId": cardsObj.accountId,
            "cardProductName": cardsObj.cardProductName,
            "withdrawlLimit": cardsObj.withdrawlLimit,
            "purchaseLimit": cardsObj.purchaseLimit,
            "cardHolderName": cardsObj.cardHolderName,
            "currentBalance": cardsObj.currentBalance,
            "availableBalance": cardsObj.availableBalance,
            "billingAddress": cardsObj.billingAddress,
            "currencyCode": currencyCode,
            "AccountType": cardsObj.accountType,
            //"bankName": cardsObj.bankName,
            //"accountName": cardsObj.accountName,
            //"accountBalanceType": cardsObj.accountBalanceType,
            "withdrawalMinLimit": cardsObj.withdrawalMinLimit,
            "withdrawalMaxLimit": cardsObj.withdrawalMaxLimit,
            "withdrawalStepLimit": cardsObj.withdrawalStepLimit,
            "purchaseMinLimit": cardsObj.purchaseMinLimit,
            "purchaseMaxLimit": cardsObj.purchaseMaxLimit,
            "cardDisplayName": cardsObj.cardDisplayName
        };
        this.cardProductName = cardsObj.cardProductName;
        cardsManager.applyNewCard(params, this.applyNewCardSuccess.bind(this), this.applyNewCardError.bind(this));
    };
    ManageCards_PresentationController.prototype.applyNewCardSuccess = function(response) {
        //var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                //"serviceName": mfaManager.getServiceId(),
                "flowType": "APPLY_FOR_DEBIT_CARD",
                "response": response,
                "objectServiceDetails": {
                    "action": "ApplyNewCard",
                    "serviceName": "CardManagementServices",
                    "dataModel": "RequestDebitCard",
                    "verifyOTPOperationName": "createRequest",
                    "requestOTPOperationName": "createRequest",
                    "resendOTPOperationName": "createRequest",
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            //applicationManager.getNavigationManager().navigateTo("frmCardManagement");
          new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();  
          var viewProperties = {};
            viewProperties.progressBar = false;
            response.productName = this.cardProductName;
            viewProperties.setDataToAcknowledgement = response;
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
        }
    };
    ManageCards_PresentationController.prototype.applyNewCardError = function(errorMessage) {
        new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.serverError = errorMessage.errorMessage;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
    };


    return ManageCards_PresentationController;
});
