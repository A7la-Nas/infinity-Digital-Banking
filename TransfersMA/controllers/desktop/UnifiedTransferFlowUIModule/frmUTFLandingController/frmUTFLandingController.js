define(['FormControllerUtility', 'CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
  var userObj = {};
  var isP2PTransferTileVisible = true;
  return {
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
    },
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      if (this.view.flxPopup && this.view.flxMainContainer) {
        if (width === 640) {
          this.view.flxMainContainer.width = "97%";
        } else if (width === 1024) {
          this.view.flxMainContainer.width = "75%";
        } else {
          this.view.flxMainContainer.width = "660px";
        }
      }
    },
    preShow: function() {
            var scope = this;
            this.view.flxFormContent.doLayout = function() {
                if (this.view.flxFooter.info.height !== undefined) {
                    this.view.flxMain.minHeight = this.view.flxFormContent.frame.height - this.view.flxFooter.info.height + "dp";
                }
            }.bind(this);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
            this.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
            this.view.GenericMessageNew.closepopup = function() {
                this.view.flxError.setVisibility(false);
            }
            this.view.UnifiedTransferSelection1.setAccessibility({
                "rtLearnMore": "Learn more about within same bank transfer",
                "btnAction1": "Make Transfer to Same Bank",
                "btnAction2": "Add account to same bank"
            });
            this.view.UnifiedTransferSelection2.setAccessibility({
                "rtLearnMore": "Learn more about domestic transfer",
                "btnAction1": "Make transfer to domestic account",
                "btnAction2": "Add Account in Domestic Bank"
            });
            this.view.UnifiedTransferSelection3.setAccessibility({
                "rtLearnMore": "Learn more about international transfer",
                "btnAction1": "Make transfer to international account",
                "btnAction2": "Add Account in International Bank"
            });
            this.view.UnifiedTransferSelection4.setAccessibility({
                "rtLearnMore": "Learn more about pay a person",
                "btnAction1": "Make Transfer to Pay a Person Transfer",
                "btnAction2": "Add Account to Pay a Person Account"
            });
            this.view.UnifiedTransferSelectionP2P.setAccessibility({
              "rtLearnMore": "Learn more about pay a person",
              "btnAction1": " Activate Person to Person transfer",
              "btnAction2": "Add Account to Pay a Person Account"
          });
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.customheadernew.btnSkipNav.onClick = function() {
                scope.view.lblTransfersHead.setActive(true);
            }
        },
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp"; 
      if(applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")){
        if ((!this.isEmptyNullOrUndefined(userObj) && !this.isEmptyNullOrUndefined(userObj["UpdatePreferredP2PAccounts"])) || (!this.isEmptyNullOrUndefined(userObj) && !this.isEmptyNullOrUndefined(userObj["DeactivateP2P"]))) {
          this.view.flxError.setVisibility(true);
          this.view.GenericMessageNew.setContext({errorDetails:["Activation Failed","Transfer failed beacuse of  server error."]});
          if (!this.isEmptyNullOrUndefined(userObj["DeactivateP2P"])) {
            delete userObj["DeactivateP2P"];
          } else {
            delete userObj["UpdatePreferredP2PAccounts"];
          }
        } else if (!this.isEmptyNullOrUndefined(userObj) && userObj["isP2PActivated"] === "true") {
          this.view.flxError.setVisibility(false);
          this.view.UnifiedTransferSelection4.setVisibility(true);
          this.view.UnifiedTransferSelectionP2P.setVisibility(false);
        } else if (!this.isEmptyNullOrUndefined(userObj) && userObj["isP2PActivated"] === "false") {
          this.view.flxError.setVisibility(false);
          this.view.UnifiedTransferSelection4.setVisibility(false);
          this.view.UnifiedTransferSelectionP2P.setVisibility(true);
        } else {
          this.view.flxError.setVisibility(false);
          this.view.UnifiedTransferSelection4.setVisibility(false);
          this.view.UnifiedTransferSelectionP2P.setVisibility(false);
        }
      }else{
        this.view.flxError.setVisibility(false);
        this.view.UnifiedTransferSelection4.setVisibility(false);
        this.view.UnifiedTransferSelectionP2P.setVisibility(false);
      }
      this.view.flxMain.forceLayout();
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
    },
    onNavigate: function(data){ 
      var scope = this;
      isP2PTransferTileVisible = true;
      userObj = this.isEmptyNullOrUndefined(data) ? applicationManager.getUserPreferencesManager().getUserObj() : data;    
      if (!this.isEmptyNullOrUndefined(userObj)) {
        userObj.name = userObj.userfirstname + " " + userObj.userlastname;
        if (this.isEmptyNullOrUndefined(userObj.default_to_account_p2p)) {
          userObj.formattedDepositAccount = "";
          userObj.default_to_account_p2p = "";
        } else {
          userObj.formattedDepositAccount = userObj.name + "...." + (userObj.default_to_account_p2p).slice(-4);
        }
      }
      var params = {};
      var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
      var isCombinedUser = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.user_attributes.isCombinedUser;
      params.entitlement = {};
      params.entitlement.features = JSON.parse(tokenParams.features);
      params.entitlement.permissions = JSON.parse(tokenParams.permissions);
      this.view.UnifiedTransferSelection1.setContext(params);
      this.view.UnifiedTransferSelection2.setContext(params);
      this.view.UnifiedTransferSelection3.setContext(params);
      this.view.UnifiedTransferSelection4.setContext(params);
      this.view.UnifiedTransferSelection1.transferTypeDetails = function(trannsferTypeDetails){
        scope.flowType(trannsferTypeDetails);
      };
      this.view.UnifiedTransferSelection2.transferTypeDetails = function(trannsferTypeDetails){
        scope.flowType(trannsferTypeDetails);
      };
      this.view.UnifiedTransferSelection3.transferTypeDetails = function(trannsferTypeDetails){
        scope.flowType(trannsferTypeDetails);
      };
      this.view.UnifiedTransferSelection4.transferTypeDetails = function(trannsferTypeDetails){
        scope.flowType(trannsferTypeDetails);
      };
      this.view.UnifiedTransferSelection1.hideTile = function() {
        scope.view.UnifiedTransferSelection1.setVisibility(false);
      };
      this.view.UnifiedTransferSelection2.hideTile = function() {
        scope.view.UnifiedTransferSelection2.setVisibility(false);
      };
      this.view.UnifiedTransferSelection3.hideTile = function() {
        scope.view.UnifiedTransferSelection3.setVisibility(false);
      };
      this.view.UnifiedTransferSelection4.hideTile = function() {
        isP2PTransferTileVisible = false;
        scope.view.UnifiedTransferSelection4.setVisibility(false);
      };
      this.view.UnifiedTransferSelectionP2P.setContext(userObj);  
      this.view.UnifiedTransferSelectionP2P.transferTypeDetails = function (trannsferTypeDetails) {
        scope.payaPersonFlow(trannsferTypeDetails, userObj);
      };
      this.view.UnifiedTransferSelectionP2P.hideTile = function () { };
    },

    onKeyPressCallBack: function (eventObject, eventPayload) {
      var self = this;
      if (eventPayload.keyCode === 27) {
        if (self.view.flxDialogs.isVisible === true) {
          self.view.flxDialogs.setVisibility(false);
          self.view.customheadernew.btnLogout.setFocus(true);
        }
      }
      self.view.customheadernew.onKeyPressCallBack(eventObject,eventPayload);
    },

    /**
         * PayaPersonFlow
         * @api : PayaPersonFlow
         * navigates to input component pay a person flow
         * @return : NA
         */
    payaPersonFlow: function(param, response) {
      if (param.clickedButton === kony.i18n.getLocalizedString("i18n.P2P.ActivatePersontoPerson")) {
        response["flowType"] = "Activation";
        } else {
        response["flowType"] = "Deactivation";
      }
      kony.mvc.getNavigationManager().navigate({
                    context: this,
                    params : response,
                    callbackModelConfig: {
                        "frm": "frmActivateP2P",
                        "appName": "TransfersMA"
                    }}); 
      
    },

    flowType: function (transferTypeDetails) {
      if (transferTypeDetails.clickedButton === "MakeTransfer") {
        var frmName = "", transferType = transferTypeDetails.transferType;
        switch (transferType) {
          case "Same Bank":
            frmName = "frmUTFSameBankTransfer";
            break;
          case "Domestic Transfer":
            frmName = "frmUTFDomesticTransfer";
            break;
          case "International Transfer":
            frmName = "frmUTFInternationalTransfer";
            break;
          case "Pay a Person":
            frmName = "frmUTFP2PTransfer";
            break;
        }        
 
        kony.mvc.getNavigationManager().navigate({
                    context: this,
                    params : {
          				"transferType": transferType
        			},
                    callbackModelConfig: {
                        "frm": frmName,
                        "appName": "TransfersMA"
                    }}); 
         
      } 
      else if (transferTypeDetails.clickedButton === "AddNewAccount"){
        var form = "", transfer = transferTypeDetails.transferType;
        switch (transfer) {
          case "Same Bank":
            form = "frmSameBankAddBeneficiary";
            break;
          case "Domestic Transfer":
            form = "frmDomesticAddBeneficiary";
            break;
          case "International Transfer":
            form = "frmInternationalAddBeneficiary";
            break;
          case "Pay a Person":
            form = "frmPayaPersonAddBeneficiary";
            break;
        }
        var params = {
          "transferType": transfer,
          "payeeType":"New Payee"
        };
        kony.mvc.getNavigationManager().navigate({
          context: this,
          params: params,
          callbackModelConfig:{"frm":form,
          "appName": "TransfersMA"  }
        });
      } 
    },
    
    /**
     * updateFormUI - the entry point method for the form controller.
     * @param {Object} viewModel - it contains the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    /**
      * @api : isEmptyNullOrUndefined
      * Verifies if the value is empty, null or undefined
      * data {any} - value to be verified
      * @return : {boolean} - validity of the value passed
      */
    isEmptyNullOrUndefined: function (data) {
      if (data === null || data === undefined || data === "") return true;
      if (typeof data === "object") {
        if (Array.isArray(data)) return data.length === 0;
        return Object.keys(data).length === 0;
      }
      return false;
    },
  };
});