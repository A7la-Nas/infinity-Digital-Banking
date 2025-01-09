define("ManageProfileMA/SettingsNewUIModule/userfrmChangeOfAddressAcknowledgementController", ['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        updateFormUI: function(viewModel) {
            if (viewModel !== undefined) {
                if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
                if (viewModel.campaign) {
                    CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxContainer");
                }
                if (viewModel.addNewAddress) this.showAddNewAddressForm(viewModel.addNewAddress);
                if (viewModel.editAddress) this.showEditAddressForm(viewModel.editAddress);
                if (viewModel.addressList === null) {
                    viewModel.addressList = [];
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.updatedAddress) this.updateAddressList(viewModel);
            }
            this.view.forceLayout();
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        preShow: function() {
            var scope = this;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.customheadernew.btnSkipNav.onClick = function() {
                scope.view.lblHeading.setActive(true);
            };
			this.view.title="Edit Address-Acknowledgement";
            this.view.flxRight.setVisibility(true);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
            this.view.lblCollapseMobile.text = "O";
            this.view.profileMenu.checkLanguage();
            this.view.profileMenu.activateMenu("PROFILESETTINGS", "Address");
            this.view.customheadernew.activateMenu("Settings", "Profile Settings");
            this.setSelectedValue("i18n.ProfileManagement.Address");
            this.setAccessibility();
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.forceLayout();
        },
        onKeyPressCallBack: function(eventObject, eventPayload){
            if (eventPayload.keyCode === 27) {
              if (this.view.flxDialogs.isVisible === true) {
                this.view.flxDialogs.isVisible = false;
                this.view.customheadernew.btnLogout.setFocus(true);
              }
              if(kony.application.getCurrentBreakpoint()===640){
                if(this.view.flxLeft.isVisible === true){
                  this.toggleMenuMobile();
                  this.view.flxAccountSettingsCollapseMobile.setActive(true);
                }
              }
              this.view.customheadernew.onKeyPressCallBack(eventObject,eventPayload);
            }
           },
        init: function() {
            var self = this;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
            this.setFlowActions();
        },
        updateAddressList: function(addressListViewModel) {
            // this.showAddresses();
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (addressListViewModel.serverError) {
                this.view.flxProfileError.setVisibility(true);
                CommonUtilities.setText(this.view.rtxError, addressListViewModel.serverError.errorMessage, CommonUtilities.getaccessibilityConfig());
            }
            this.view.lblValue.text = addressListViewModel.updatedAddress.orderId;
            //this.view.lblTransactionMessage.text = addressListViewModel[0].message;
            if (addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].Addr_type === "ADR_TYPE_WORK") {
                this.view.lblHome.text = kony.i18n.getLocalizedString("i18n.common.Work");
            } else {
                this.view.lblHome.text = kony.i18n.getLocalizedString("kony.tab.common.home");
            }
            var state = "";
            if (addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].stateSelected === undefined) {
                state = "";
            } else {
                state = addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].stateSelected + ", ";
            }
            var city = (addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].citySelected) ? addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].citySelected : "";
            //set data to lblreferenceid as well
            this.view.lblAddressLine1.text = addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].addrLine1;
            this.view.lblAddessLine2.text = addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].addrLine2 ? addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].addrLine2 : (city + ', ' + state + ((addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].Country_id) ? addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].Country_id : (addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].Country_id) ? (addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].Country_id) : "") + ', ' + ((addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].zipcode) ? addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].zipcode : ""));
            this.view.lblAddressLine3.text = addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].addrLine2 ? (city + ', ' + state + ((addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].countrySelected) ? addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].countrySelected : (addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].countrySelected) ? (addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].countrySelected) : "") + ', ' + ((addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].zipcode) ? addressListViewModel.updatedAddress[0].UpdatePrimaryAddress[0].zipcode : "")) : "";

            this.view.segChangeOfAddress.widgetDataMap={
              lblProof: "lblProof",
              lblProofName: "fileTypeOfProof",
              lblDocName: "fileName"
          };
          var data = this.formatSegmentData(addressListViewModel.updatedAddress[0].Documents);
          this.view.segChangeOfAddress.setData(data);
          },
        showAddresses: function() {
            //this.hideAll();
            this.view.flxAddressesWrapper.setVisibility(true);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.flxAddressWrapper.height = "550dp";
            }
        },
         formatSegmentData: function(userDocs){
            var data = userDocs;
            for (var proofCount = 0; proofCount < data.length; proofCount++) {
              var count = proofCount + 1;
              data[proofCount].lblProof = "Proof " + count + ":";
              data[proofCount].template = "flxChangeOfAddress";
          }
          return data;
        },
        /**
         * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
         *  Method to set the text in mobile breakpoint
         */
        setSelectedValue: function(text) {
            var self = this;
            CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text), CommonUtilities.getaccessibilityConfig());
        },
        /**
         *  Method to set the Accessibility configurations
         */
        setAccessibility: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            // this.view.btnAcknowledgementDone.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.Done");
            this.view.customheadernew.lblAccounts.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            //CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.SecuritySettings"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblAcknowledgementHeader, kony.i18n.getLocalizedString("i18n.ProfileManagement.AcknowledgementHeader"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblTransactionMessage, kony.i18n.getLocalizedString("i18n.ProfileManagement.YourAddressRequestSubmitted"), accessibilityConfig);
            //CommonUtilities.setText(this.view.btnAcknowledgementDone, kony.i18n.getLocalizedString("i18n.ProfileManagement.Done"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
            //this.view.btnAcknowledgementDone.accessibilityConfig = {
                //"a11yLabel":
            this.view.lblCollapseMobile.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                }
            };
            this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                "a11yLabel": "Dropdown"
            };
            this.view.lblAcknowledgementHeader.accessibilityConfig={
                "a11yLabel": "Edit Address- Acknowledgement",
                 "a11yARIA": {
                    "tabindex": -1
                }
                
            };
            this.view.lblHeading.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
                "a11yLabel": this.view.lblAcknowledgementHeader.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
            };
            
        },
        onBreakpointChange: function(width) {
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.profileMenu.onBreakpointChangeComponent(width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                //CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.SecuritySettings"), accessibilityConfig);
            }
            this.view.forceLayout();
        },
        setFlowActions: function() {
            this.view.btnAcknowledgementDone.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsNewUIModule",
                    "appName": "ManageProfileMA"
                }).presentationController.fetchUser("Addresses");
            }
        },
        /**
         * Method to show error while updating Question and answer at the service side
         */
        showUpdateSecurityQuestionError: function() {
            CommonUtilities.setText(this.view.lblErrorSecuritySettings, kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError"), CommonUtilities.getaccessibilityConfig());
            this.view.flxErrorEditSecuritySettings.setVisibility(true);
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         *  Method to set ui for the component in mobile breakpoint
         */
        toggleMenuMobile: function() {
            if (this.view.lblCollapseMobile.text === "O") {
                this.view.lblCollapseMobile.text = "P";
                this.view.flxLeft.setVisibility(true);
                this.view.flxRight.setVisibility(false);
            } else {
                this.view.lblCollapseMobile.text = "O";
                this.view.flxLeft.setVisibility(false);
                this.view.flxRight.setVisibility(true);
            }
        },
        /**
         * *@param {Boolean} isLoading- True or false to show/hide the progess bar
         *  Method to set show/hide the progess bar
         */
        changeProgressBarState: function(isLoading) {
            if (isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.forceLayout();
			var scope=this;
			setTimeout(function () {scope.view.lblAcknowledgementHeader.setActive(true);}, 300);
        },
    };
});
define("ManageProfileMA/SettingsNewUIModule/frmChangeOfAddressAcknowledgementControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** init defined for frmChangeOfAddressAcknowledgement **/
    AS_Form_bd3befb790f14116810be39b10f29b77: function AS_Form_bd3befb790f14116810be39b10f29b77(eventobject) {
        var self = this;
        this.init();
    }
});
define("ManageProfileMA/SettingsNewUIModule/frmChangeOfAddressAcknowledgementController", ["ManageProfileMA/SettingsNewUIModule/userfrmChangeOfAddressAcknowledgementController", "ManageProfileMA/SettingsNewUIModule/frmChangeOfAddressAcknowledgementControllerActions"], function() {
    var controller = require("ManageProfileMA/SettingsNewUIModule/userfrmChangeOfAddressAcknowledgementController");
    var controllerActions = ["ManageProfileMA/SettingsNewUIModule/frmChangeOfAddressAcknowledgementControllerActions"];
    return kony.visualizer.mixinControllerActions(controller, controllerActions);
});
