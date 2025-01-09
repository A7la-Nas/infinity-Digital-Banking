/**
 * Notifications And Messages  form controller which will handle all messages and notifications page UI changes
 * @module frmNotificationsAndMessagesController
 */
define(['FormControllerUtility', 'CommonUtilities', 'CSRAssistUI', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, CommonUtilities, CSRAssistUI, ViewConstants, OLBConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    return /** @alias module:frmNotificationsAndMessagesController */ {
        deletedflag: 0,
        isDeletedTab: false,
        loopcount: 0,
        browseFileObject: [],
        isReply:false,
        selectedIndex:0,
        msgSelected:0,
        /**
         * This function used to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */
        updateFormUI: function(context) {
            if (context.showProgressBar) {
                FormControllerUtility.showProgressBar(this.view);
            }
            if (context.hideProgressBar) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.sideMenu) {
                this.updateHamburgerMenu(context.sideMenu);
            }
            if (context.showAlertsViewModel) {
                this.showAlertsViewModel(context.showAlertsViewModel);
            }
            if (context.unreadNotificationCountViewModel) {
                this.showUnreadNotificationCount(context.unreadNotificationCountViewModel.count);
            }
            if (context.unreadMessagesCountView) {
                this.showUnreadMessagesCount(context.unreadMessagesCountView);
            }
            if (context.updateNotificationAsReadViewModel) {
                this.updateNotificationAsReadViewModel(context.updateNotificationAsReadViewModel);
            }
            if (context.dismissAlertsViewModel) {
                this.dismissAlertsViewModel(context.dismissAlertsViewModel);
            }
            if (context.searchAlertsViewModel) {
                this.showSearchAlertsViewModel(context.searchAlertsViewModel);
            }
            if (context.showRequestsView) {
                this.showRequestsView(context.showRequestsView);
            }
            if (context.showMessagesView) {
                this.showMessagesView(context.showMessagesView);
            }
            if (context.showDeletedRequestsView) {
                this.showDeletedRequestsView(context.showDeletedRequestsView);
            }
            if (context.createNewRequestOrMessagesView) {
                this.showNewMessage(context.createNewRequestOrMessagesView);
            }
            if (context.createNewRequestError) {
                this.showNewRequestCreationError(context.createNewRequestError);
            }
            if (context.createNewMessageError) {
                this.showNewMessageCreationError(context.createNewMessageError);
            }
            if (context.updateMessageAsReadSuccessView) {
                this.updateMessageAsReadSuccessView(context.updateMessageAsReadSuccessView.readCount);
            }
            if (context.searchRequestsView) {
                this.showSearchRequestsView(context.searchRequestsView);
            }
            if (context.showSearchDeletedRequests) {
                this.showSearchDeletedRequestsView(context.showSearchDeletedRequests);
            }
            if (context.campaign) {
                CampaignUtility.showCampaign(context.campaign, this.view);
            }
            if (context.tradeView) {
                this.showNewTradeFinanceMssgs(context.tradeView)
            }
            this.AdjustScreen();
        },
        /**
         * Method to load and return Messages and Alerts Module.
         * @returns {object} Messages and Alerts Module object.
         */
        loadAlertsMessagesModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsMsgsUIModule");
        },
        /**
         * enableSendButton :The function is used to enable send button once the fields subject, Description and category are entered while creating a new message
         */
        enableSendButton: function() {
            var category = this.view.NotficationsAndMessages.listbxCategory.selectedKey;
            var subject = this.view.NotficationsAndMessages.tbxSubject.text.trim();
            var description = this.view.NotficationsAndMessages.textareaDescription.text.trim();
            if (category && subject.length > 0 && description.length > 0 && !(CommonUtilities.isCSRMode())) {
                FormControllerUtility.enableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
            } else {
                FormControllerUtility.disableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
            }
        },
        /**
         *
         */
        initFunction: function() {
            var css = document.createElement("loading");
            css.type = "text/css";
            css.innerHTML = "@-webkit-keyframes sk-bouncedelay {0 % , 80 % , 100 % {-webkit - transform: scale(0) } 40 % {-webkit - transform: scale(1.0) } } #frmNotificationsAndMessages_flxLoadingOne{ -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both; }";
            document.body.appendChild(css);
        },
        /**
         * preShowFunction :This function is executed on the preShow of the frmNotificationsAndMessages
         */
        preShowFunction: function() {
            var scopeObj = this;
            selectedIndex =0;
            msgSelected=0;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Secure Messaging");
            this.view.NotficationsAndMessages.lblAccountRenewal.text = "";
            this.view.NotficationsAndMessages.lblRequestIdValue.text = "";
            this.view.NotficationsAndMessages.lblCategoryValue.text = "";
            this.view.NotficationsAndMessages.lblCategoryValue2.text = "";
            this.view.NotficationsAndMessages.txtSearch.text = "";
            this.view.NotficationsAndMessages.lblHeadingNotification.text = "";
            this.view.NotficationsAndMessages.RichText0c22ac14f53af45.text = "";
            this.view.NotficationsAndMessages.lblDateAndTime.text = "";
            this.view.NotficationsAndMessages.tbxSubject.text = "";
            this.view.NotficationsAndMessages.textareaDescription.text = "";
            this.view.NotficationsAndMessages.btnNewMessage.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY"));
            this.view.NotficationsAndMessages.flxDelete.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_DELETE"));
            this.view.NotficationsAndMessages.btnDeletedMessages.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_DELETE"));
            this.view.NotficationsAndMessages.listbxCategory.enable = true;
            this.view.NotficationsAndMessages.tbxSubject.enable = true;
            this.view.NotficationsAndMessages.lblOfferLink.isVisible = false;
            this.view.NotficationsAndMessages.imgBanner.isVisible = false;
            this.view.NotficationsAndMessages.imgCross.setVisibility(true);
            this.view.NotficationsAndMessages.segMessageAndNotification.setData([]);
            this.view.NotficationsAndMessages.segMessages.setData([]);
            FormControllerUtility.disableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
            this.view.NotficationsAndMessages.tbxSubject.onKeyUp = this.enableSendButton.bind(this);
            //this.view.NotficationsAndMessages.textareaDescription.onKeyUp = this.enableSendButton.bind(this);
            this.view.NotficationsAndMessages.textareaDescription.onKeyUp = this.validateNewMsg.bind(this);
            this.view.NotficationsAndMessages.txtAreaReply.onKeyUp = this.validateMsg.bind(this);    
            this.view.flxBottom.tablePagination.flxPagination.skin = ViewConstants.SKINS.SKNFLXE9EBEE;
            this.view.customheadernew.flxUserActions.isVisible = false;
            this.view.CustomPopup.onKeyPress = this.logoutKeyPressCallBack;
            this.view.CustomPopup1.onKeyPress = this.dismissPopup;
            this.view.AllForms.onKeyPress =  this.dismissInfooPopup;
            this.view.AllForms.flxCross.onKeyPress = this.dismissInfoPopup;
            this.view.AllForms.lblInfo.onKeyPress = this.dismisslblPopup;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
            this.view.NotficationsAndMessages.flxNewMessage.left="0%";
            this.view.NotficationsAndMessages.flxVerticalSeparator.left="0%";
//            this.view.NotficationsAndMessages.flxRightNotifications.left="0%";
                this.view.AllForms.flxInformationText.centerX = "30%";
                this.view.AllForms.flxInformationText.top = "55px";
                this.view.AllForms.flxInformationText.width = "370px";
                this.view.CustomPopup1.width = "80%";
             }

            // this.view.customheader.topmenu.flxMenu.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            // this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            // this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
            // this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            this.view.customheadernew.forceCloseHamburger();
            this.view.NotficationsAndMessages.listbxCategory.onSelection = this.enableSendButton;
           // var currBreakpoint = kony.application.getCurrentBreakpoint();
//             if (currBreakpoint === 1024 || orientationHandler.isTablet) {
//                 this.view.NotficationsAndMessages.flxNotificationHeader.setVisibility(false);
//             }
            this.view.NotficationsAndMessages.rtxMessage.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxContainer', 'customheadernew', 'flxFooter', 'flxSearchBox', 'flxHeader','flxFormContent']);
            scopeObj.view.NotficationsAndMessages.flxClearSearch.onClick = function() {
                scopeObj.view.NotficationsAndMessages.txtSearch.text = "";
                scopeObj.view.NotficationsAndMessages.flxClearSearch.setVisibility(false);
                scopeObj.view.forceLayout();
                scopeObj.view.NotficationsAndMessages.txtSearch.setFocus(true);
            };
            
            this.view.AllForms.flxCross.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": 0,
                    "role":"button",
                    "aria-label":"Close this information pop-up."
                }
            }
            this.view.NotficationsAndMessages.btnDismiss.onKeyPress=function(eventObject, eventPayload)
            {
                if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    eventPayload.preventDefault();
                    scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setActive(selectedIndex, -1, "flxNotificationsAndMessages");  
                }
            }
    
            },
            this.view.NotficationsAndMessages.lblHeadingNotification.onKeyPress = function(eventObject, eventPayload) {
                if (eventPayload.keyCode === 9) {
                    if (eventPayload.shiftKey) {
                        {
                            eventPayload.preventDefault();
                            
                            scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setActive(msgSelected, -1, "flxNotificationsAndMessages");
                            
                        }
                    }
                }
            },
            this.view.NotficationsAndMessages.lblAccountRenewal.onKeyPress = function(eventObject, eventPayload) {
                if (eventPayload.keyCode === 9) {
                    if (eventPayload.shiftKey) {
                        {
                            eventPayload.preventDefault();
                            
                            scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setActive(msgSelected, -1, "flxNotificationsAndMessages");
                            
                        }
                    }
                }
            },
            this.view.NotficationsAndMessages.flxDelete.onKeyPress = function(eventObject, eventPayload) {
                if (eventPayload.keyCode === 9) {
                    if (eventPayload.shiftKey) {
                        {
                            eventPayload.preventDefault();
                            
                            scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setActive(msgSelected, -1, "flxNotificationsAndMessages");
                            
                        }
                    }
                }
            },
            this.view.customheadernew.btnSkipNav.onClick = function(){
                scopeObj.view.lblHeader.setActive(true);    
            };
            this.view.NotficationsAndMessages.lblAccountRenewal.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            }
            this.view.NotficationsAndMessages.lblHeadingNotification.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            }
            this.view.AllForms.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                    "role":"dialog"
                }
            }
            this.view.breadcrumb.setBreadcrumbData([{
                text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages")
            }, {
                text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts")
            }]);
            //FOR ALERTS: MANAGE SEARCH
            this.searchAnimate();
            this.view.NotficationsAndMessages.btnSearch.isVisible = true;
            // this.view.breadcrumb.btnBreadcrumb1.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages");
            // this.view.breadcrumb.lblBreadcrumb2.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts");
            this.view.breadcrumb.setFocus(true);
            var css = document.createElement("loading");
            css.type = "text/css";
            css.innerHTML = "@-webkit-keyframes sk-bouncedelay {0 % , 80 % , 100 % {-webkit - transform: scale(0) } 40 % {-webkit - transform: scale(1.0) } } #frmNotificationsAndMessages_flxLoadingOne{ -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both; }";
            document.getElementsByTagName("head")[0].appendChild(css);
            this.view.NotficationsAndMessages.btnSendReply.isVisible = applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY");
            this.view.NotficationsAndMessages.btnSendReply.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.replyButton");
            this.view.NotficationsAndMessages.btnSendReply.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": 0,
                    "aria-label": "Reply to this message"
                }
            }
            //this.view.NotficationsAndMessages.btnSendReply.toolTip = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.replyButton");
            //setting the Actions to the tabs and buttons in the frmNotificationsAndMessaages
            if(kony.i18n.getCurrentLocale() === "ar_AE"){
                scopeObj.view.NotficationsAndMessages.flxRightNotifications.skin = "sknrightbordere3e3e3";
                scopeObj.view.NotficationsAndMessages.flxRightMessages.skin = "sknrightbordere3e3e3";
            } else {
                scopeObj.view.NotficationsAndMessages.flxRightNotifications.skin = "sknleftbordere3e3e3"; 
                scopeObj.view.NotficationsAndMessages.flxRightMessages.skin = "sknleftbordere3e3e3";
            }
            this.view.NotficationsAndMessages.btnNotifications.onClick = function() {
                scopeObj.view.NotficationsAndMessages.btnDeletedMessages.accessibilityConfig = {
                    a11yARIA: {
                        "role": "tab",
                        "tabindex": 0,
                        "aria-selected": false
                    }
                }
                scopeObj.view.NotficationsAndMessages.btnMyMessages.accessibilityConfig = {
                    a11yARIA: {
                        "role": "tab",
                        "tabindex": 0,
                        "aria-selected": false
                    }
                }
                scopeObj.view.NotficationsAndMessages.btnNotifications.accessibilityConfig = {
                    a11yARIA: {
                        "role": "tab",
                        "tabindex": 0,
                        "aria-selected": true
                    }
                }
                scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setFocus(true);
                scopeObj.view.breadcrumb.setBreadcrumbData([{
                    text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages")
                }, {
                    text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts")
                }]);
                // scopeObj.view.breadcrumb.btnBreadcrumb1.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages");
                // scopeObj.view.breadcrumb.lblBreadcrumb2.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts");
                scopeObj.view.NotficationsAndMessages.txtSearch.text = "";
                scopeObj.view.NotficationsAndMessages.flxClearSearch.setVisibility(false);
                scopeObj.view.NotficationsAndMessages.lblSearch.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.btnSearchCancel.setVisibility(false);
                FormControllerUtility.showProgressBar(scopeObj.view);
                scopeObj.loadAlertsMessagesModule().presentationController.showAlertsPage();
                scopeObj.view.NotficationsAndMessages.lblSearch.onTouchEnd = scopeObj.onSearchClick.bind(scopeObj);
                scopeObj.view.NotficationsAndMessages.flxClearSearch.onClick = scopeObj.onSearchClick.bind(scopeObj);
                scopeObj.view.NotficationsAndMessages.txtSearch.onDone = scopeObj.onSearchClick.bind(scopeObj);
                scopeObj.view.NotficationsAndMessages.flxTabs.setVisibility(true);
                var currBreakpoint = kony.application.getCurrentBreakpoint();
                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    scopeObj.view.NotficationsAndMessages.flxRightNotifications.isVisible = false;
                } else {
                    scopeObj.view.NotficationsAndMessages.flxRightNotifications.isVisible = true;
                }
                scopeObj.view.NotficationsAndMessages.flxTabs.isVisible = true;
            };
            this.view.NotficationsAndMessages.btnMyMessages.onClick = function() {
                scopeObj.view.NotficationsAndMessages.btnDeletedMessages.accessibilityConfig = {
                    a11yARIA: {
                        "role": "tab",
                        "tabindex": 0,
                        "aria-selected": false
                    }
                }
                scopeObj.view.NotficationsAndMessages.btnMyMessages.accessibilityConfig = {
                    a11yARIA: {
                        "role": "tab",
                        "tabindex": 0,
                        "aria-selected": true
                    }
                }
                scopeObj.view.NotficationsAndMessages.btnNotifications.accessibilityConfig = {
                    a11yARIA: {
                        "role": "tab",
                        "tabindex": 0,
                        "aria-selected": false
                    }
                }
                scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setFocus(true);
                scopeObj.view.breadcrumb.setBreadcrumbData([{
                    text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages")
                }, {
                    text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Messages")
                }]);
                FormControllerUtility.showProgressBar(scopeObj.view);
                scopeObj.loadAlertsMessagesModule().presentationController.showRequests({});
                scopeObj.view.NotficationsAndMessages.btnSearch.isVisible = true;
                scopeObj.view.NotficationsAndMessages.txtSearch.text = "";
                scopeObj.view.NotficationsAndMessages.flxClearSearch.setVisibility(false);
                scopeObj.view.NotficationsAndMessages.lblSearch.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.btnSearchCancel.setVisibility(false);
                // scopeObj.view.breadcrumb.btnBreadcrumb1.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages");
                // scopeObj.view.breadcrumb.lblBreadcrumb2.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Messages");
                var break_point = kony.application.getCurrentBreakpoint();
                if (break_point == 640 || orientationHandler.isMobile) {
                    scopeObj.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
                } else {
                    scopeObj.view.NotficationsAndMessages.flxRightMessages.setVisibility(true);
                }
                scopeObj.view.NotficationsAndMessages.flxSendMessage.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.flxSendMessage.height = "80dp";
            };
            this.view.NotficationsAndMessages.btnDeletedMessages.onClick = function() {
                deletedflag = 1;
                scopeObj.view.NotficationsAndMessages.btnDeletedMessages.accessibilityConfig = {
                    a11yARIA: {
                        "role": "tab",
                        "tabindex": 0,
                        "aria-selected": true
                    }
                }
                scopeObj.view.NotficationsAndMessages.btnMyMessages.accessibilityConfig = {
                    a11yARIA: {
                        "role": "tab",
                        "tabindex": 0,
                        "aria-selected": false
                    }
                }
                scopeObj.view.NotficationsAndMessages.btnNotifications.accessibilityConfig = {
                    a11yARIA: {
                        "role": "tab",
                        "tabindex": 0,
                        "aria-selected": false
                    }
                }

                scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setFocus(true);
                scopeObj.view.breadcrumb.setBreadcrumbData([{
                    text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages")
                }, {
                    text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.DeletedMessages")
                }]);
                FormControllerUtility.showProgressBar(scopeObj.view);
                scopeObj.loadAlertsMessagesModule().presentationController.showDeletedRequests();
                scopeObj.view.NotficationsAndMessages.lblSearch.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.btnSearchCancel.setVisibility(false);
                scopeObj.view.NotficationsAndMessages.txtSearch.text = "";
                scopeObj.view.NotficationsAndMessages.flxClearSearch.setVisibility(false);
                //         var break_point = kony.application.getCurrentBreakpoint();
                //         if (break_point == 640|| orientationHandler.isMobile) {
                //           scopeObj.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
                //         }
                //         else {
                //           scopeObj.view.NotficationsAndMessages.flxRightMessages.setVisibility(true);
                //         }
                scopeObj.view.NotficationsAndMessages.flxSendMessage.height = "0dp";
            };
            this.view.NotficationsAndMessages.btnNewMessage.onClick = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                scopeObj.view.NotficationsAndMessages.txtSearch.text = "";
                scopeObj.view.NotficationsAndMessages.tbxSubject.text = "";
                scopeObj.view.NotficationsAndMessages.textareaDescription.text = "";
                FormControllerUtility.disableButton(scopeObj.view.NotficationsAndMessages.btnNewMessageSend);
                scopeObj.view.NotficationsAndMessages.textareaDescription.onKeyUp = scopeObj.validateNewMsg.bind(scopeObj);
                scopeObj.loadAlertsMessagesModule().presentationController.clearMessageAndRequestId();
                scopeObj.view.NotficationsAndMessages.lblNewMessage.setActive(true);
                scopeObj.loadAlertsMessagesModule().presentationController.showRequests({
                    createNewMessage: "createNewMessage"
                });
            };
            this.view.NotficationsAndMessages.flxSearchImage.onClick = function() {
                scopeObj.searchAnimate();
            };
            this.view.NotficationsAndMessages.flxDelete.onClick = function() {
                scopeObj.showSoftDeletePopup();
            };
            if (CommonUtilities.isCSRMode()) {
                this.view.NotficationsAndMessages.btnDeleteForever.onClick = FormControllerUtility.disableButtonActionForCSRMode();
                this.view.NotficationsAndMessages.btnDeleteForever.skin = FormControllerUtility.disableButtonSkinForCSRMode();
            } else {
                this.view.NotficationsAndMessages.btnDeleteForever.onClick = function() {
                    scopeObj.showHardDeletePopup();
                };
            }
            this.view.NotficationsAndMessages.flxImageAttachment2.onClick = function() {
                scopeObj.browseFiles();
            };
            
        this.view.CustomPopup1.btnNo.onClick = function() {
            scopeObj.closeDismissPopup();
            scopeObj.view.NotficationsAndMessages.btnDismiss.setActive(true);
        };
        this.view.CustomPopup1.flxCross.onClick = function() {
            scopeObj.closeDismissPopup();
            scopeObj.view.NotficationsAndMessages.btnDismiss.setActive(true);
        };
            if (CommonUtilities.isCSRMode()) {
                this.view.NotficationsAndMessages.btnSendReply.onClick = FormControllerUtility.disableButtonActionForCSRMode();
                this.view.NotficationsAndMessages.btnSendReply.skin = FormControllerUtility.disableButtonSkinForCSRMode();
                this.view.NotficationsAndMessages.btnSendReply.focusSkin = FormControllerUtility.disableButtonSkinForCSRMode();
            } else {
                this.view.NotficationsAndMessages.btnSendReply.onClick = function() {
                    scopeObj.showReplyView();
                };
            }
            this.view.NotficationsAndMessages.btnSendReply.onClick = function() {
                FormControllerUtility.disableButton(scopeObj.view.NotficationsAndMessages.btnSendReply);
                scopeObj.showReplyView();
            };
            if (CommonUtilities.isCSRMode()) {
                this.view.NotficationsAndMessages.btnNewMessageSend.onClick = FormControllerUtility.disableButtonActionForCSRMode();
                this.view.NotficationsAndMessages.btnNewMessageSend.focusSkin = FormControllerUtility.disableButtonSkinForCSRMode();
                this.view.NotficationsAndMessages.btnNewMessageSend.skin = FormControllerUtility.disableButtonSkinForCSRMode();
            } else {
                this.view.NotficationsAndMessages.btnNewMessageSend.onClick = function() {
                    FormControllerUtility.showProgressBar(scopeObj.view);
                    var requestParam = {
                        "files": scopeObj.fileObject,
                        "categoryid": scopeObj.view.NotficationsAndMessages.listbxCategory.selectedKey,
                        "subject": scopeObj.view.NotficationsAndMessages.tbxSubject.text,
                        "description": encodeURI(scopeObj.view.NotficationsAndMessages.textareaDescription.text.replace(/\</g,"&lt;").replace(/\>/g,"&gt;")),
                      	"isTradeModule": scopeObj.view.TradeFinanceData ? scopeObj.view.TradeFinanceData.tradeModule : undefined
                    };
                    scopeObj.loadAlertsMessagesModule().presentationController.createNewRequestOrMessage(requestParam);
                    scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setActive(msgSelected, -1, "flxNotificationsAndMessages");
                };
            }
            if (CommonUtilities.isCSRMode()) {
                this.view.NotficationsAndMessages.btnDismiss.onClick = FormControllerUtility.disableButtonActionForCSRMode();
                this.view.NotficationsAndMessages.btnDismiss.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(15);
            } else {
                this.view.NotficationsAndMessages.btnDismiss.onClick = function() {
                    scopeObj.showDismissPopup();
                };
            }
            this.view.NotficationsAndMessages.btnCancel.onClick = function() {
                scopeObj.hideCreateMessageView();
            };
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point == 640 || orientationHandler.isMobile) {
                scopeObj.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
            } else {
                scopeObj.view.NotficationsAndMessages.flxRightMessages.setVisibility(true);
            }
            this.view.NotficationsAndMessages.btnBack.onClick = function() {
                deletedflag = 0;
                scopeObj.view.NotficationsAndMessages.flxTabs.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.flxSearchAndSort.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
            };
            this.view.NotficationsAndMessages.backToAlerts.onClick = function() {
                deletedflag = 0;
                scopeObj.view.NotficationsAndMessages.flxTabs.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.flxSearchAndSort.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(true);
                scopeObj.view.NotficationsAndMessages.flxRightNotifications.setVisibility(false);
                scopeObj.view.AllForms.setVisibility(false);
                scopeObj.view.forceLayout();
                scopeObj.AdjustScreen();
            };
            if (CommonUtilities.isCSRMode())
                CSRAssistUI.setCSRAssistConfigurations(scopeObj, 'frmNotificationsAndMessages');
            applicationManager.getNavigationManager().applyUpdates(this);
          	if(this.isMicroAppPresent("CampaignMA"))
            	CampaignUtility.fetchPopupCampaigns();
          this.seti18nValues();
        },
        dismissInfoPopup: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    if (self.view.AllForms.flxInformationText.isVisible === true) {
                        eventPayload.preventDefault();
                        self.view.AllForms.lblInfo.setActive(true);
                    }
                }
                else{
                if (self.view.AllForms.flxInformationText.isVisible === true) {
                    self.view.AllForms.flxInformationText.isVisible = false;
                    self.view.AllForms.isVisible = false;
                    eventPayload.preventDefault();
                    this.view.NotficationsAndMessages.flxInfo.setActive(true);
                }
            }
            } 
            if (eventPayload.keyCode === 27) {
                if (self.view.AllForms.flxInformationText.isVisible === true) {
                    self.view.AllForms.flxInformationText.isVisible = false;
                    self.view.AllForms.isVisible = false;
                    eventPayload.preventDefault();
                    self.view.NotficationsAndMessages.flxInfo.setActive(true);
            }
        }
        },
        dismisslblPopup: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.shiftKey) {
                if (eventPayload.keyCode === 9){
                if (self.view.AllForms.flxInformationText.isVisible === true){
                    self.view.AllForms.flxInformationText.isVisible = false;
                    self.view.AllForms.isVisible=false;
                    eventPayload.preventDefault();
                    this.view.NotficationsAndMessages.flxInfo.setActive(true);
                }
           }
        }
        if (eventPayload.keyCode === 27) {
            if (self.view.AllForms.flxInformationText.isVisible === true) {
                self.view.AllForms.flxInformationText.isVisible = false;
                self.view.AllForms.isVisible = false;
                eventPayload.preventDefault();
                self.view.NotficationsAndMessages.flxInfo.setActive(true);
        }
    }
        },
        dismissPopup: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.FlxDismiss.isVisible === true){
                 self.view.FlxDismiss.isVisible = false;
                 eventPayload.preventDefault();
            self.view.NotficationsAndMessages.flxDelete.setActive(true);
            self.view.NotficationsAndMessages.btnDismiss.setActive(true);
            self.view.NotficationsAndMessages.btnDeleteForever.setActive(true);
                }
                else
                {
                    eventPayload.preventDefault();
                    this.view.NotficationsAndMessages.flxInfo.setActive(true); 
                }
            }
        },
        /**
         * showUnreadNotificationCount :This function is used to display the unread Notifications Count in the Tab
         * @param {data}  data consists of the unreadNotificationCount
         */
        showUnreadNotificationCount: function(data) {
            this.unReadNotificationCount = data;
            this.view.NotficationsAndMessages.btnNotifications.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts") + " (" + data + ")";
            this.updateAlertsIcon();
            this.view.forceLayout();
        },
        /**
         * seti18nValues :This function is used to set i18n values
         */
        seti18nValues: function() {
            this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages");
            this.view.NotficationsAndMessages.btnDeletedMessages.text= kony.i18n.getLocalizedString("i18n.AlertsAndMessages.DeletedMessages");
            this.view.NotficationsAndMessages.btnNewMessage.text= kony.i18n.getLocalizedString("i18n.Messages.ComposeNew");
            this.view.NotficationsAndMessages.lblNewMessage.text= kony.i18n.getLocalizedString("i18n.AlertsAndMessages.NewMessagesMod");
            this.view.NotficationsAndMessages.btnNewMessageSend.text=kony.i18n.getLocalizedString("i18n.common.send");
            this.view.NotficationsAndMessages.btnCancel.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.NotficationsAndMessages.lblCategory.text= kony.i18n.getLocalizedString("i18n.billPay.category");
            this.view.NotficationsAndMessages.lblSubject.text=kony.i18n.getLocalizedString("kony.mb.MessagesDetails.Subject");
            this.view.NotficationsAndMessages.lblDescripption.text=kony.i18n.getLocalizedString("kony.pfm.desc");
            this.view.NotficationsAndMessages.tbxSubject.placeholder=kony.i18n.getLocalizedString("i18n.AlertsAndMessages.subjectplaceholder");
            this.view.NotficationsAndMessages.textareaDescription.placeholder=kony.i18n.getLocalizedString("i18n.AlertsAndMessages.descriptionplaceholder");
            this.view.NotficationsAndMessages.btnDismiss.text= kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.Dismiss");
            this.view.NotficationsAndMessages.btnRestore.text= kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.Restore");
            this.view.NotficationsAndMessages.btnDeleteForever.text=kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.DeleteForever");
            this.view.AllForms.RichTextInfo.text=kony.i18n.getLocalizedString("i18n.AlertsMessages.msgInfo");
            this.view.AllForms.lblInfo.text=kony.i18n.getLocalizedString("kony.mb.SupportInfo.Title");
            this.view.NotficationsAndMessages.btnBack.text=kony.i18n.getLocalizedString("i18n.AlertsAndMessages.backtomessages");
            this.view.customheadernew.lblHeaderMobile.text= kony.i18n.getLocalizedString("i18n.AlertsAndMessages.NewMessagesMod");
            this.view.NotficationsAndMessages.txtAreaReply.placeholder= kony.i18n.getLocalizedString("i18n.AlertsAndMessages.writeyourmessage");
            this.view.NotficationsAndMessages.backToAlerts.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.backtoalerts");
            //ToolTips
            // this.view.NotficationsAndMessages.btnDeletedMessages.toolTip= kony.i18n.getLocalizedString("i18n.AlertsAndMessages.DeletedMessages");
            // this.view.NotficationsAndMessages.btnNewMessage.toolTip= kony.i18n.getLocalizedString("i18n.AlertsAndMessages.NewMessagesMod");
            // this.view.NotficationsAndMessages.btnNotifications.toolTip=kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts");
            // this.view.NotficationsAndMessages.btnDismiss.toolTip= kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.Dismiss");
            // this.view.NotficationsAndMessages.btnRestore.toolTip= kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.Restore");
            // this.view.NotficationsAndMessages.btnDeleteForever.toolTip=kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.DeleteForever");
            // this.view.NotficationsAndMessages.btnMyMessages.toolTip= kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Messages");
            // this.view.NotficationsAndMessages.btnCancel.toolTip=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            // this.view.NotficationsAndMessages.btnCancelReply.toolTip=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            // this.view.NotficationsAndMessages.btnSendReply.toolTip=kony.i18n.getLocalizedString("i18n.common.send");
            // this.view.NotficationsAndMessages.btnNewMessageSend.toolTip=kony.i18n.getLocalizedString("i18n.common.send");
            // this.view.NotficationsAndMessages.lblDelete.toolTip=kony.i18n.getLocalizedString("kony.mb.common.Delete");
            // this.view.NotficationsAndMessages.btnBack.toolTip=kony.i18n.getLocalizedString("i18n.AlertsAndMessages.backtomessages");
            // this.view.NotficationsAndMessages.backToAlerts.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.backtoalerts");          
            //CommonUtilities.setFooterButtonToolTips(this.view.CustomFooterMain);
        },
        /**
         * showOrHideSearchCrossImage
         */
        showOrHideSearchCrossImage: function() {
            var searchString = this.view.NotficationsAndMessages.txtSearch.text;
            if (searchString && searchString.trim()) {
                this.view.NotficationsAndMessages.flxClearSearch.setVisibility(true);
            } else {
                this.view.NotficationsAndMessages.flxClearSearch.setVisibility(false);
            }
            this.view.forceLayout();
        },
        /**
         * showAlertsViewModel :This function is used to bind the alerts to the segment
         * @param {viewModel}  viewModel consists list of Alerts Data
         */
        showAlertsViewModel: function(viewModel) {
            var data = viewModel.data;
            var self = this;
            this.view.customheadernew.activateMenu("ALERTS AND MESSAGES", "Alerts");
            self.view.NotficationsAndMessages.lblSearch.onTouchEnd = self.onSearchClick.bind(self);
            self.view.NotficationsAndMessages.flxClearSearch.onClick = self.onSearchClick.bind(self);
            self.view.NotficationsAndMessages.txtSearch.onDone = self.onSearchClick.bind(self);
            self.view.NotficationsAndMessages.txtSearch.onKeyUp = self.showOrHideSearchCrossImage.bind(self);
            this.view.NotficationsAndMessages.flxSearchAndSort.isVisible = true;
            this.view.AllForms.setVisibility(false);
            if (data.length === 0) {
                this.view.NotficationsAndMessages.btnDismiss.isVisible = false;
                this.view.NotficationsAndMessages.flxTabs.isVisible = true;
                this.view.NotficationsAndMessages.flxSearchAndSort.isVisible = true;
                if (viewModel.errorMsg) {
                    this.view.NotficationsAndMessages.rtxNoSearchResults.text = viewModel.errorMsg;
                } else {
                    this.view.NotficationsAndMessages.rtxNoSearchResults.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.noAlertsMsg");
                }
                this.view.NotficationsAndMessages.flxNoSearchResult.isVisible = true;
                this.view.NotficationsAndMessages.flxVerticalSeparator.isVisible = true;
                this.view.NotficationsAndMessages.segMessageAndNotification.isVisible = false;
                this.view.NotficationsAndMessages.btnNewMessage.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY"));
                this.view.NotficationsAndMessages.flxRightNotifications.setVisibility(false);
                this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
                this.view.NotficationsAndMessages.flxNewMessage.setVisibility(false);
                this.setSkinActive(this.view.NotficationsAndMessages.btnNotifications);
                this.setSkinInActive(this.view.NotficationsAndMessages.btnMyMessages);
                this.setSkinInActive(this.view.NotficationsAndMessages.btnDeletedMessages);
            } else {
                this.view.NotficationsAndMessages.btnDismiss.isVisible = true;
                this.view.NotficationsAndMessages.flxNoSearchResult.isVisible = false;
                // this.view.NotficationsAndMessages.flxVerticalSeparator.isVisible = false;
                this.view.NotficationsAndMessages.segMessageAndNotification.isVisible = true;
                this.setNotificationSegmentData(data);
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.NotficationsAndMessages.btnNotifications.setActive(true);
            //this.view.NotficationsAndMessages.segMessageAndNotification.setActive(selectedIndex, -1, "flxNotificationsAndMessages");
        },
        /**
         * used to set active skin
         * @param {object} obj object
         */
        setSkinActive: function(obj) {
            obj.skin = ViewConstants.SKINS.PFM_CATEGORIZEDMONTHLYSPENDING_BTNUNCATEGORIXED;
        },
        /**
         * used to set inactive skin
         * @param {object} obj object
         */
        setSkinInActive: function(obj) {
            obj.skin = ViewConstants.SKINS.ACCOUNT_SUMMARY_UNSELECTED;
        },
        /**
         * postShowNotifications :This function is executed on the post Show of the frmNotificationsAndMessages
         */
        postShowNotifications: function() {
            var self = this;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopup1.doLayout = CommonUtilities.centerPopupFlex;
            if (kony.application.getCurrentBreakpoint() <= 640 || orientationHandler.isMobile) {
                this.view.CustomPopup1.height="265px";
                this.view.NotficationsAndMessages.flxSearch.skin = "bbsknf8f7f8WithoutBorder";
            }
            this.view.NotficationsAndMessages.flxInfo.onClick = function() {
                var break_point = kony.application.getCurrentBreakpoint();
                self.view.AllForms.flxInformationText.isVisible = true;
                //self.view.AllForms.isVisible=true;
                if (break_point == 640 || orientationHandler.isMobile) {
                    self.view.AllForms.top = "45dp";
                    self.view.AllForms.left = "";
                    self.view.AllForms.right = "20dp";
                    self.view.AllForms.imgToolTip.left = "";
                    self.view.AllForms.imgToolTip.right = "10dp";
                } else if (break_point == 1024 || orientationHandler.isTablet) {
                    self.view.AllForms.top = "175dp";
                    self.view.AllForms.left = "";
                    self.view.AllForms.right = "40dp";
                    self.view.AllForms.imgToolTip.left = "";
                    self.view.AllForms.imgToolTip.right = "20dp";
                } else if (break_point > 1024) {
                    self.view.AllForms.top = "163dp";
                    self.view.AllForms.left = "";
                    self.view.AllForms.right = "90dp";
                    self.view.AllForms.imgToolTip.left = "";
                    self.view.AllForms.imgToolTip.right = "14dp";
                } else {
                    self.view.AllForms.top = "180dp";
                    self.view.AllForms.left = "";
                    self.view.AllForms.right = "80dp";
                    self.view.AllForms.imgToolTip.left = "";
                    self.view.AllForms.imgToolTip.right = "20dp";
                }
                if (self.view.AllForms.isVisible === true) {
                    self.view.AllForms.isVisible = false;
                } else {
                    self.view.AllForms.isVisible = true;
                    self.view.AllForms.flxCross.onClick = function() {
                        self.view.AllForms.isVisible = false;
                        self.view.NotficationsAndMessages.flxInfo.setActive(true);
                    }
                }
                self.view.AllForms.lblInfo.setActive(true);
                self.view.FlxDismiss.isModalContainer=true
            };
            if (kony.application.getCurrentBreakpoint() >= 1366 || orientationHandler.isDesktop) {
                this.view.CustomPopup1.width = "45%";
            }
            this.view.NotficationsAndMessages.lblWarningReplyMessage.setVisibility(false);
            this.view.NotficationsAndMessages.lblWarningNewMessage.setVisibility(false);
            this.AdjustScreen();
            this.accessibilityFocusSetup();
            this.view.NotficationsAndMessages.flxReplyTextArea.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                }
            };
            this.view.NotficationsAndMessages.btnNewMessage.skin = "sknBtn358FE9SSP15pxHover";
            this.view.NotficationsAndMessages.btnDismiss.skin = "sknBtn358FE9SSP15pxHover";
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.NotficationsAndMessages.txtSearch, this.view.NotficationsAndMessages.flxtxtSearchandClearbtn]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        /**
         * used to adjust the UI
         */
        AdjustScreen: function() {
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.customheadernew.info.frame.height + this.view.flxContainer.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0) {
                    this.view.flxFooter.top = mainheight + diff + "dp";
                } else {
                    this.view.flxFooter.top = mainheight + "dp";
                }
            } else {
                this.view.flxFooter.top = (mainheight-151) + "dp";
            }
            this.view.forceLayout();
            this.initializeResponsiveViews();
        },
        showNewTradeFinanceMssgs: function(data) {
          	this.view.TradeFinanceData = data;
            this.view.NotficationsAndMessages.listbxCategory.selectedKey = data.Category;
            this.view.NotficationsAndMessages.tbxSubject.text = data.subject;
            this.view.NotficationsAndMessages.tbxSubject.enable = false;
            this.view.NotficationsAndMessages.listbxCategory.enable = false; 
            let description ="\n";
            let entries = Object.entries(data.descriptionObj);
            let len = entries.length;
            for(let i=0;i<len;i++){
               description += entries[i][0] + ":  " + entries[i][1] +'\n'
           }
            this.view.NotficationsAndMessages.textareaDescription.text = description; 
            this.enableSendButton();
        },
        /**
         * used to set the search animation
         */
        searchAnimate: function() {
            //    this.view.NotficationsAndMessages.flxSort.setVisibility(false);
            this.view.NotficationsAndMessages.flxSearch.animate(
                kony.ui.createAnimation({
                    "100": {
                        "left": "0%",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        },
                        "rectified": true
                    }
                }), {
                    "delay": 0,
                    "iterationCount": 1,
                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                    "duration": 0.5
                }, {});
        },
        /**
         * used to
         */
        sortAnimate: function() {
            //    this.view.NotficationsAndMessages.flxSort.setVisibility(true);
            this.view.NotficationsAndMessages.flxSearch.animate(
                kony.ui.createAnimation({
                    "100": {
                        "left": "100%",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        },
                        "rectified": true
                    }
                }), {
                    "delay": 0,
                    "iterationCount": 1,
                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                    "duration": 0.5
                }, {});
        },
        /**
         * enableSendReplyButton :This function is used to enable/Disable the reply button while replying to the existing request
         */
        enableSendReplyButton: function() {
            if (this.view.NotficationsAndMessages.txtAreaReply.text.trim() === "" || CommonUtilities.isCSRMode()) {
                this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnBlockedSSP0273e315px";
                this.view.NotficationsAndMessages.btnSendReply.setEnabled(false);
            } else {
                this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnNormalSSPFFFFFF15Px";
                this.view.NotficationsAndMessages.btnSendReply.setEnabled(true);
            }
        },
        /**
         * showReplyView :This function is used to show the reply view once we click on Reply button
         */
        showReplyView: function() {
            var self = this;
            this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnBlockedSSP0273e315px";
            this.view.NotficationsAndMessages.btnSendReply.setEnabled(false);
            this.view.NotficationsAndMessages.flxReplyMessageButtons.setVisibility(false);
            this.view.NotficationsAndMessages.flxSendMessage.setVisibility(true);
            this.view.NotficationsAndMessages.flxImageAttachment.setVisibility(true);
            this.view.NotficationsAndMessages.lblAttachmentBLue.setVisibility(true);
            this.view.NotficationsAndMessages.lblWarningReplyMessage.setVisibility(false);
            this.view.NotficationsAndMessages.btnCancelReply.setVisibility(true);
            this.view.NotficationsAndMessages.btnSendReply.text = kony.i18n.getLocalizedString("i18n.common.send");
            this.view.NotficationsAndMessages.btnSendReply.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": 0,
                    "aria-label": "Send this message"
                }
            }
            this.view.NotficationsAndMessages.btnCancelReply.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            //this.view.NotficationsAndMessages.txtAreaReply.onKeyUp = this.enableSendReplyButton.bind(this);
            this.view.NotficationsAndMessages.txtAreaReply.onKeyUp = this.validateMsg.bind(this);
            this.view.NotficationsAndMessages.txtAreaReply.onDone = this.validateMsg.bind(this);
            this.view.NotficationsAndMessages.flxReply.isVisible = true;
            this.view.NotficationsAndMessages.flxDocAttachmentRightMessage.isVisible = true;
            this.view.NotficationsAndMessages.flxReplyWrapper.isVisible = true;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                this.view.NotficationsAndMessages.flxSendMessage.height = "150dp";
                this.view.NotficationsAndMessages.flxReplyMessageButtons.isVisible = true;
                this.view.NotficationsAndMessages.flxReplyImageAttachment.onClick = this.replyBrowseFiles.bind(this);
                this.view.NotficationsAndMessages.lblWarningNotMoreThan5files.text = "";
                this.view.NotficationsAndMessages.flxImageAttachment.setVisibility(false);
                this.view.NotficationsAndMessages.lblAttachmentBLue.setVisibility(false);
            }
            this.view.NotficationsAndMessages.txtAreaReply.text = "";
            this.view.NotficationsAndMessages.flxReplySeparator2.isVisible = true;
            this.fileObject = [];
            this.view.NotficationsAndMessages.segAttachmentRightMessage.data = [];
            this.view.NotficationsAndMessages.flxImageAttachment.onClick = this.replyBrowseFiles.bind(this);
            this.view.NotficationsAndMessages.btnCancelReply.onClick = this.hideReplyView.bind(this);
            this.view.NotficationsAndMessages.btnSendReply.onClick = function() {
                //if(!self.view.NotficationsAndMessages.segMessages.data[0])return;
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile)
                    self.view.NotficationsAndMessages.lblWarningNotMoreThan5files.text = "";
                FormControllerUtility.showProgressBar(self.view);
                var requestParam = {
                    "files": self.fileObject,
                    "requestid": self.view.NotficationsAndMessages.segMessages.data[0].requestId,
                    "description": encodeURI(self.view.NotficationsAndMessages.txtAreaReply.text.replace(/\</g,"&lt;").replace(/\>/g,"&gt;"))
                };
                self.loadAlertsMessagesModule().presentationController.createNewRequestOrMessage(requestParam);
            };
            this.view.forceLayout();
            //this.view.NotficationsAndMessages.flxReplyHeader.setFocus(true);
            this.view.NotficationsAndMessages.txtAreaReply.setActive(true);
            this.AdjustScreen();
        },
        validateMsg: function() {
            this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnBlockedSSP0273e315px";
            this.view.NotficationsAndMessages.btnSendReply.setEnabled(false);
            var self = this;
            var re = new RegExp(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g);
            var msgbody = this.view.NotficationsAndMessages.txtAreaReply.text.trim();
            if ((msgbody===undefined || msgbody === null || msgbody === "")&& !(CommonUtilities.isCSRMode())) {
                this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnBlockedSSP0273e315px";
                this.view.NotficationsAndMessages.btnSendReply.setEnabled(false);
            
            } 
            else if ((re.test(msgbody)) && !(CommonUtilities.isCSRMode())) {
                this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnBlockedSSP0273e315px";
                this.view.NotficationsAndMessages.btnSendReply.setEnabled(false);
                
            }
            else {
                this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnNormalSSPFFFFFF15Px";
                this.view.NotficationsAndMessages.btnSendReply.setEnabled(true);
            }
            
        },
        validateNewMsg: function(){
            FormControllerUtility.disableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
            var self = this;
            //var re = new RegExp("[$&+,:;=?@#|'<>.-^*()%!]");
            var re = new RegExp(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g);
            var msgbody = this.view.NotficationsAndMessages.textareaDescription.text;
            var catVal = this.view.NotficationsAndMessages.listbxCategory.selectedKey;
            var subText = this.view.NotficationsAndMessages.tbxSubject.text;
            if((catVal === null || catVal=== undefined) && !(CommonUtilities.isCSRMode())){
                FormControllerUtility.disableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
                this.view.NotficationsAndMessages.btnNewMessageSend.setEnabled(false);
                this.view.NotficationsAndMessages.btnNewMessageSend.skin = "sknBtnBlockedSSPFFFFFF15Px";
            } else if((subText === undefined || subText === null || subText === "") && !(CommonUtilities.isCSRMode())){
                FormControllerUtility.disableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
                this.view.NotficationsAndMessages.btnNewMessageSend.setEnabled(false);
                this.view.NotficationsAndMessages.btnNewMessageSend.skin = "sknBtnBlockedSSPFFFFFF15Px";
            }
            else if((msgbody === undefined || msgbody === null || msgbody === "") && !(CommonUtilities.isCSRMode()))  {
                FormControllerUtility.disableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
                //this.view.NotficationsAndMessages.btnNewMessageSend.setEnabled(false);
                this.view.NotficationsAndMessages.btnNewMessageSend.skin = "sknBtnBlockedSSPFFFFFF15Px";
            }
            else if ((re.test(msgbody))&& !(CommonUtilities.isCSRMode())) {
                FormControllerUtility.disableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
                this.view.NotficationsAndMessages.btnNewMessageSend.setEnabled(false);
                this.view.NotficationsAndMessages.btnNewMessageSend.skin = "sknBtnBlockedSSPFFFFFF15Px";
            }
            else {
                FormControllerUtility.enableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
            }
        },
        /**
         * hideReplyView :This function is used to hide the reply view once we click on ReplyCancel button
         */
        hideReplyView: function() {
            this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnNormalSSPFFFFFF15Px";
            this.view.NotficationsAndMessages.btnSendReply.setEnabled(true);
            this.view.NotficationsAndMessages.flxSendMessage.isVisible = true;
            // this.view.NotficationsAndMessages.flxSendMessage.height = "150dp";
            this.view.NotficationsAndMessages.flxReply.isVisible = false;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                this.view.NotficationsAndMessages.flxReplyMessageButtons.isVisible = false;
            }
            this.view.NotficationsAndMessages.flxReplyWrapper.isVisible = false;
            this.view.NotficationsAndMessages.btnCancelReply.isVisible = false;
            this.view.NotficationsAndMessages.flxImageAttachment.setVisibility(false);
            this.view.NotficationsAndMessages.lblWarningReplyMessage.setVisibility(false);
            this.view.NotficationsAndMessages.btnSendReply.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.replyButton");
            this.view.NotficationsAndMessages.btnSendReply.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": 0,
                    "aria-label": "Reply to this message"
                }
            }
            this.view.NotficationsAndMessages.btnSendReply.onClick = this.showReplyView.bind(this);
            this.view.NotficationsAndMessages.flxReplySeparator2.isVisible = true;
            this.view.NotficationsAndMessages.flxDocAttachmentRightMessage.isVisible = false;
            this.view.forceLayout();
            this.AdjustScreen();
        },
        /**
         * hideCreateMessageView :This function is used to hide the create Message Template once we click on CancelCreatemessage button
         */
        hideCreateMessageView: function() {
            var alertsMsgsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsMsgsUIModule");
            alertsMsgsModule.presentationController.showAlertsPage("hamburgerMenu", {
                show: "Messages"
            });
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages");
            this.view.forceLayout();
            //       this.view.NotficationsAndMessages.btnNewMessage.setVisibility(true);
            //       this.view.NotficationsAndMessages.flxRightNotifications.setVisibility(false);
            //       this.view.NotficationsAndMessages.flxNewMessage.setVisibility(false);
            //       this.setSkinActive(this.view.NotficationsAndMessages.btnMyMessages);
            //       this.setSkinInActive(this.view.NotficationsAndMessages.btnNotifications);
            //       this.setSkinInActive(this.view.NotficationsAndMessages.btnDeletedMessages);
            //       var dataMap = {
            //         "flxNotificationsAndMessages": "flxNotificationsAndMessages",
            //         "imgAttachment": "imgAttachment",
            //         "imgCurrentOne": "imgCurrentOne",
            //         "lblDateAndTime": "lblDateAndTime",
            //         "lblSegDescription": "lblSegDescription",
            //         "lblSegHeading": "lblSegHeading",
            //         "imgBulletIcon": "imgBulletIcon",
            //         "lblRowSeperator": "lblRowSeperator",
            //         "segNotificationsAndMessages": "segNotificationsAndMessages"
            //       };
            //       var data = [];
            //       if (this.view.NotficationsAndMessages.segMessageAndNotification.data && this.view.NotficationsAndMessages.segMessageAndNotification.data.length > 1) {
            //         //some rows are already present.. moving the data one step up.
            //         data = this.view.NotficationsAndMessages.segMessageAndNotification.data;
            //         data.splice(0, 1);
            //         data[0].flxNotificationsAndMessages.skin = ViewConstants.SKINS.SKNFLXF7F7F7;
            //         data[0].flxNotificationsAndMessages.hoverSkin = ViewConstants.SKINS.SKNFLXF7F7F7;
            //         //this.view.NotficationsAndMessages.flxRightMessages.setVisibility(true);
            //       } else {
            //         // there is no data..
            //         this.view.NotficationsAndMessages.flxNoSearchResult.setVisibility(true);
            //         this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(false);
            //         this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
            //         this.view.NotficationsAndMessages.flxVerticalSeparator.setVisibility(true);
            //       }
            //       this.view.NotficationsAndMessages.segMessageAndNotification.widgetDataMap = dataMap;
            //       this.view.NotficationsAndMessages.segMessageAndNotification.setData(data);
            //       if (data.length > 0) {
            //         this.onMessageRowSelection({
            //           isDeleted: false
            //         });
            //       }
            //       this.view.NotficationsAndMessages.flxSeparatorMessages.setVisibility(true);
            //       this.view.NotficationsAndMessages.flxTabs.setVisibility(true);
            //       this.view.NotficationsAndMessages.flxSearchAndSort.setVisibility(true);
            //       this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages");
            //       this.view.forceLayout();
        },
        /**
         * showNewMessage :This function is used to show the create Message Template once we click on newMessage button
         * @param {viewModel}  viewModel consists of the list of categories data
         */
        showNewMessage: function(viewModel) {
            this.view.breadcrumb.setBreadcrumbData([{
                text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages")
            }, {
                text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Messages")
            }]);
            this.view.customheadernew.activateMenu("ALERTS AND MESSAGES", "New Message");
            this.view.NotficationsAndMessages.lblWarningNewMessage.setVisibility(false);
            this.fileObject = [];
            if (viewModel.data) {
                var requestCategories = viewModel.data.map(function(dataItem) {
                    var keyValue = [];
                    keyValue.push(dataItem.id);
                    keyValue.push(dataItem.Name);
                    return keyValue;
                });
                this.view.NotficationsAndMessages.listbxCategory.masterData = requestCategories;
            }
            this.view.NotficationsAndMessages.segAttachment.setData([]);
            this.view.NotficationsAndMessages.tbxSubject.text = "";
            this.view.NotficationsAndMessages.textareaDescription.text = "";
            this.view.NotficationsAndMessages.listbxCategory.enable = true;
            this.view.NotficationsAndMessages.tbxSubject.enable = true;
            this.view.NotficationsAndMessages.btnNewMessage.setVisibility(false);
            this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
            this.view.NotficationsAndMessages.flxRightNotifications.setVisibility(false);
            // this.view.NotficationsAndMessages.flxVerticalSeparator.setVisibility(false);
            this.view.NotficationsAndMessages.flxDeletedMessagesBottom.setVisibility(false);
            this.view.NotficationsAndMessages.flxNewMessage.setVisibility(true);
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.NewMessagesMod");
            this.setSkinActive(this.view.NotficationsAndMessages.btnMyMessages);
            this.setSkinInActive(this.view.NotficationsAndMessages.btnNotifications);
            this.setSkinInActive(this.view.NotficationsAndMessages.btnDeletedMessages);
            this.view.AllForms.setVisibility(false);
            var newMessageData = {
                "imgCurrentOne": {
                    "src": ViewConstants.IMAGES.ACCOUNTS_SIDEBAR_BLUE,
                    "isVisible": true
                },
                "flxNotificationsAndMessages": {
                    "skin": ViewConstants.SKINS.SKNFLXF7F7F7,
                    "hoverSkin": ViewConstants.SKINS.SKNFLXF7F7F7
                },
                "lblSegHeading": {
                    "text": kony.i18n.getLocalizedString("i18n.AlertsAndMessages.NewMessagesMod")+"...",
                    "top":"25px"                    
                },
                "rtxSegDescription": {
              		"isVisible" :false
            	},
				"imgAttachment": {
              		"isVisible" :false
            	},
                "lblDateAndTime": {
                      "isVisible" :false
                },
                "lblCategoryValue":{
                    "isVisible": false
                },
                "imgBulletIcon":{
                    "isVisible":false
                },
                "lblImgMessage":{
                  "isVisible": false
                }
            };
            var dataMap = this.processRequestsDataMap();
            var requests = this.processRequestsData(viewModel.requests);
            requests.unshift(newMessageData);
            this.view.NotficationsAndMessages.segMessageAndNotification.widgetDataMap = dataMap;
            this.view.NotficationsAndMessages.segMessageAndNotification.setData(requests);
            this.view.NotficationsAndMessages.segMessageAndNotification.onRowClick = this.newMessageValidation.bind(this);
            this.view.NotficationsAndMessages.flxNoSearchResult.isVisible = false;
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point == 640 || orientationHandler.isMobile) {
                this.view.NotficationsAndMessages.flxSeparatorMessages.setVisibility(false);
                this.view.NotficationsAndMessages.flxNewMessagesHeader.setVisibility(false);
                this.view.NotficationsAndMessages.flxNewMessage.skin = "sknflxffffffnoborder";
                this.view.NotficationsAndMessages.flxTabs.setVisibility(false);
                this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(false);
                this.view.NotficationsAndMessages.flxSearchAndSort.setVisibility(false);
            } else {
                this.view.NotficationsAndMessages.flxSeparatorMessages.setVisibility(true);
                this.view.NotficationsAndMessages.flxNewMessagesHeader.setVisibility(true);
                this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(true);
                this.view.NotficationsAndMessages.flxTabs.setVisibility(true);
                this.view.NotficationsAndMessages.btnNewMessageSend.left = "";
                if(kony.i18n.getCurrentLocale() === "ar_AE") {
                    this.view.NotficationsAndMessages.flxNewMessage.skin = "sknrightbordere3e3e3";
                } else {
                    this.view.NotficationsAndMessages.flxNewMessage.skin = "sknleftbordere3e3e3";
                }
                this.view.NotficationsAndMessages.flxSearchAndSort.setVisibility(true);
            }
            if (viewModel.cancelCallback) {
                this.view.NotficationsAndMessages.btnCancel.onClick = viewModel.cancelCallback;
            } else {
                this.view.NotficationsAndMessages.btnCancel.onClick = this.hideCreateMessageView.bind(this);
            }
            this.view.NotficationsAndMessages.lblNewMessage.setActive(true);

        },
        /**
         * showNewRequestCreationError :This function is used to show the error when  the create New Request Fails
         * @param {string} errorMsg   error message
         */
        showNewRequestCreationError: function(errorMsg) {
            this.view.NotficationsAndMessages.lblWarningNewMessage.text = errorMsg;
            this.view.NotficationsAndMessages.lblWarningNewMessage.skin = "sknRtxSSPFF000015Px";
            this.view.NotficationsAndMessages.lblWarningNewMessage.setVisibility(true);
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * showNewMessageCreationError :This function is used to show the error when  the create New Message Fails
         * @param {string} errorMsg   error message
         */
        showNewMessageCreationError: function(errorMsg) {
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                this.view.NotficationsAndMessages.lblWarningNotMoreThan5files.text = errorMsg;
                this.view.NotficationsAndMessages.lblWarningNotMoreThan5files.setVisibility(true);
            } else {
                this.view.NotficationsAndMessages.lblWarningReplyMessage.text = errorMsg;
                this.view.NotficationsAndMessages.lblWarningReplyMessage.setVisibility(true);
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.NotficationsAndMessages.flxSendMessage.forceLayout();
        },
        /**
         * showDismissPopup :This function is used to show the dismiss PopUp once the user clicks on dismiss Noification
         */
        showDismissPopup: function() {
            this.view.CustomPopup1.lblHeading.setFocus(true);
            this.view.CustomPopup1.flxCross.accessibilityConfig = {
                a11yLabel: "Close this Popup",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup1.btnYes.accessibilityConfig = {
                a11yLabel: "Yes,dismiss this alert",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup1.btnNo.accessibilityConfig = {
                a11yLabel: "No,don't dismiss this alert",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            var popupTop = this.view.flxHeader.info.frame.height + this.view.flxContainer.frame.y;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) popupTop = popupTop + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT;
            this.view.FlxDismiss.setVisibility(true);
            this.view.AllForms.setVisibility(false);
            this.view.CustomPopup1.lblHeading.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.Dismiss");
            this.view.CustomPopup1.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.whetherToDismissNotification");
            this.view.FlxDismiss.isModalContainer = true;
            this.view.CustomPopup1.lblHeading.setActive(true);
        },
        /**
         * closeDismissPopup :This function is used to close the Dismiss Pop Up when clicked on "No" button in the Dismiss PopUp
         */
        closeDismissPopup: function() {
            this.view.FlxDismiss.setVisibility(false);
            this.view.NotficationsAndMessages.flxRightMessages.flxMessagesHeader.flxDelete.setActive(true);
            this.view.NotficationsAndMessages.btnDismiss.setActive(true);
            this.view.NotficationsAndMessages.btnDeleteForever.setActive(true);
        },
        /**
         * setNotificationSegmentData :This function is used to bind the Alerts to the segment
         * @param {data} data contains the Array of Alerts
         */
        setNotificationSegmentData: function(data) {
            var arrowVisibility = false;
            this.view.NotficationsAndMessages.segMessageAndNotification.onRowClick = this.onRowSelection.bind(this);
            this.view.NotficationsAndMessages.btnNewMessage.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY"));
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.NotficationsAndMessages.flxRightNotifications.setVisibility(false);
                this.view.NotficationsAndMessages.flxTabs.isVisible = true;
                this.view.NotficationsAndMessages.btnNewMessage.isVisible = false;
            } else {
                this.view.NotficationsAndMessages.flxRightNotifications.setVisibility(true);
            }
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
				this.view.NotficationsAndMessages.flxRightNotifications.left="0%";
                arrowVisibility = true;
            }
            this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
            this.view.NotficationsAndMessages.flxNewMessage.setVisibility(false);
            this.setSkinActive(this.view.NotficationsAndMessages.btnNotifications);
            this.setSkinInActive(this.view.NotficationsAndMessages.btnMyMessages);
            this.setSkinInActive(this.view.NotficationsAndMessages.btnDeletedMessages);
            var dataMap = {
                "flxNotificationsAndMessages": "flxNotificationsAndMessages",
                "imgCurrentOne": "imgCurrentOne",
                "lblDateAndTime": "lblDateAndTime",
                "rtxSegDescription": "rtxSegDescription",
                "lblSegHeading": "lblSegHeading",
                "imgBulletIcon": "imgBulletIcon",
                "imgAttachment": "imgAttachment",
                "lblImgMessage" : "lblImgMessage",
                "segNotificationsAndMessages": "segNotificationsAndMessages",
                "lblRowSeperator": "lblRowSeperator",
                "lblArrow": "lblArrow",
                "userNotificationId": "userNotificationId",
                "lblRequestIdValue": "lblRequestIdValue",
                "lblCategoryValue": "lblCategoryValue"
            };
            var self = this;
            data = data.map(function(dataItem) {
                return {
                    "imgCurrentOne": {
                        "src": ViewConstants.IMAGES.ACCOUNTS_SIDEBAR_BLUE,
                        "isVisible": false
                    },
                    "imgBulletIcon": {
                        "isVisible": !self.isRead(dataItem.isRead)
                    },
                    "lblRowSeperator": {
                        "isVisible": true
                    },
                    "lblArrow": {
                        "text": (kony.i18n.getCurrentLocale() === "ar_AE") ? "R" : "Q",
                        "skin": "sknLblrightArrowFontIcon0273E3",
                        "isVisible": arrowVisibility
                    },
                    "imgAttachment": {
                        "src": ViewConstants.IMAGES.ATTACHMENT_GREY,
                        "isVisible": false
                    },
                    "lblDateAndTime": {
                        "text": CommonUtilities.getDateAndTime(dataItem.receivedDate)
                    },
                    "rtxSegDescription": {
                        "text": self.labelData(dataItem.notificationText),
                        "skin": !self.isRead(dataItem.isRead) ? "sknRtxSSP42424215PxBold" : "sknRtxSSPLight42424215Px"
                    },
                    "flxNotificationsAndMessages": {
                        "skin": "sknFlxffffffnoborderThree",
                        "hoverSkin": ViewConstants.SKINS.SKNFLXF7F7F7
                    },
                    "lblSegHeading": {
                        "text": dataItem.notificationSubject,
                        "skin": !self.isRead(dataItem.isRead) ? "sknlLblSSPMedium42424217px" : "sknlbl42424217px"
                    },
                    "lblImgMessage":{
                        "isVisible": false
                     },
                    "userNotificationId": dataItem.userNotificationId
                };
            });
            this.view.NotficationsAndMessages.segMessageAndNotification.widgetDataMap = dataMap;
            this.view.NotficationsAndMessages.segMessageAndNotification.setData(data);
            if (!orientationHandler.isMobile) {
                this.onRowSelection();
            }
            this.view.forceLayout();
        },
        /**
         * updateNotificationAsReadViewModel :This function is executed when the notification is marked as read
         * @param {object}    viewModel consists of status whether it is success or failure and the unreadNotificationCount
         */
        updateNotificationAsReadViewModel: function(viewModel) {
            if (viewModel.status === "success") {
                if (this.unReadNotificationCount > 0) {
                    this.unReadNotificationCount = this.unReadNotificationCount - 1; // Decrement by 1
                }
                this.view.NotficationsAndMessages.btnNotifications.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts") + " (" + this.unReadNotificationCount + ")";
                if (this.unReadNotificationCount === 0 && this.unreadMessagesCount === 0) {
                    this.view.customheadernew.lblNewNotifications.isVisible = false;
                } else {
                    this.view.customheadernew.lblNewNotifications.isVisible = true;
                }
                var data = this.view.NotficationsAndMessages.segMessageAndNotification.data;
                var index = 0;
                if (this.view.NotficationsAndMessages.segMessageAndNotification.selectedRowIndex) {
                    index = this.view.NotficationsAndMessages.segMessageAndNotification.selectedRowIndex[1];
                }
                data[index].imgBulletIcon.isVisible = false;
                this.view.NotficationsAndMessages.segMessageAndNotification.setDataAt(data[index], index);
            }
            this.view.forceLayout();
        },
        /**
         * showSoftDeletePopup :This function is used to show the SoftDeletePopUp when clicked on Delete button for a message
         */
        showSoftDeletePopup: function() {
            var popupTop = this.view.flxHeader.info.frame.height + this.view.flxContainer.frame.y;
            this.view.CustomPopup1.flxCross.accessibilityConfig = {
                a11yLabel: "Close this popup",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup1.btnYes.accessibilityConfig = {
                a11yLabel: "Yes,delete these Messages",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup1.btnNo.accessibilityConfig = {
                a11yLabel: "No, don't delete these Messages",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) popupTop = popupTop + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT;
            this.view.CustomPopup1.top = popupTop + ViewConstants.POSITIONAL_VALUES.DP;
            this.view.FlxDismiss.setVisibility(true);
            this.view.CustomPopup1.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount");
            this.view.CustomPopup1.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.NotificationMessages.DeleteMsg");
            this.view.FlxDismiss.isModalContainer = true;
            this.view.CustomPopup1.lblHeading.setActive(true);
        },
        /**
         * showHardDeletePopup :This function is used to show the HardDelete PopUp when clicked on Delete button for a message in DeletedMessages tab
         */
        showHardDeletePopup: function() {
            this.view.CustomPopup1.lblHeading.setFocus(true);
            this.view.CustomPopup1.flxCross.accessibilityConfig = {
                a11yLabel: "Close this popup",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup1.btnYes.accessibilityConfig = {
                a11yLabel: "Yes, permenantly delete these messages",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup1.btnNo.accessibilityConfig = {
                a11yLabel: "No, don't delete these messages",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            var popupTop = this.view.flxHeader.info.frame.height + this.view.flxContainer.frame.y;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) popupTop = popupTop + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT;
            this.view.CustomPopup1.top = popupTop + ViewConstants.POSITIONAL_VALUES.DP;
            this.view.FlxDismiss.setVisibility(true);
            this.view.CustomPopup1.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount");
            this.view.CustomPopup1.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.NotificationMessages.DeleteMsgPermanently");
            this.view.FlxDismiss.isModalContainer = true;
            this.view.CustomPopup1.lblHeading.setActive(true);
        },
        /**
         * labelData :This function is used to convert the html Data to normal String by removing the tags and assigning the text to a label
         * @param {object} data  html Data
         * @return {text} normal text after converting from html to text
         */
        labelData: function(data) {
            var parser = new DOMParser();
            var res = parser.parseFromString(data, 'text/html');
            var html = res.body.textContent;
            var div = document.createElement("div");
            div.innerHTML = html;
            return div.innerText;
        },
        /**
         * dismissAlertsViewModel :This function is executed when the dismiss of the notification is successful
         * @param {viewModel}   viewModel consists of the Status whether it is success or failure
         */
        dismissAlertsViewModel: function(viewModel) {
            if (viewModel.status === "success") {
                this.onSearchClick();
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        /**
         * isRead :This function is used to check whether the notification is read or not
         * @param {status}   status is either 0 or 1 indicating whether the  notification is read or not
         * @return {String} returns true or false depending on the value of notification is read or not
         */
        isRead: function(status) {
            if (status == 1) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * onRowSelection :This function is used to display the details of the selected Alert on the right Hand Side
         */
        onRowSelection: function() {
            var scopeObj = this;
            var selectedUserNotificationId = this.view.NotficationsAndMessages.segMessageAndNotification.data[0].userNotificationId;
            var index = 0;
            this.view.NotficationsAndMessages.lblHeadingNotification.text = "";
            this.view.NotficationsAndMessages.RichText0c22ac14f53af45.text = "";
            this.view.NotficationsAndMessages.lblDateAndTime.text = "";
            this.view.NotficationsAndMessages.lblOfferLink.text = "";
            this.view.NotficationsAndMessages.imgBanner.src = "";
            this.view.NotficationsAndMessages.btnDismiss.isVisible = true;
            //this.view.NotficationsAndMessages.btnDismiss.setActive(true);
            if (this.view.NotficationsAndMessages.segMessageAndNotification.selectedRowItems.length) {
                selectedUserNotificationId = this.view.NotficationsAndMessages.segMessageAndNotification.selectedRowItems[0].userNotificationId;
                index = this.view.NotficationsAndMessages.segMessageAndNotification.selectedRowIndex[1];
                selectedIndex =index;
            }
            var data = this.view.NotficationsAndMessages.segMessageAndNotification.data;
            var response = this.loadAlertsMessagesModule().presentationController.getAlertsDetails(selectedUserNotificationId);
            this.view.NotficationsAndMessages.lblHeadingNotification.text = response.notificationSubject;
            this.view.NotficationsAndMessages.lblHeadingNotification.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                    "aria-label":"Alerts-subject:"+" "+response.notificationSubject
                }
            }
            this.view.NotficationsAndMessages.RichText0c22ac14f53af45.text = response.notificationText;
            this.view.NotficationsAndMessages.lblDateAndTime.text = CommonUtilities.getDateAndTime(response.receivedDate);
            this.view.NotficationsAndMessages.RichText0c22ac14f53af45.isVisible = true;
            this.view.NotficationsAndMessages.txtareaNotification.isVisible = false;
            /**
             *Code to show interactive notifications based on configurations
             */
            if (applicationManager.getConfigurationManager().isInteractiveNotificationEnabled === "true") {
                if (response.notificationActionLink && response.notificationActionLink !== "") {
                    this.view.NotficationsAndMessages.lblOfferLink.text = response.notificationActionLink;
                    this.view.NotficationsAndMessages.lblOfferLink.isVisible = true;
                    var handCursor = document.querySelectorAll(("." + OLBConstants.SKINS.INTERACTIVE_LINK));
                    for (var i = 0; i < handCursor.length; i++) {
                        handCursor[i].style.cursor = "pointer";
                    }
                    var notificationActionLink = this.view.NotficationsAndMessages.lblOfferLink.text;
                    if (notificationActionLink) {
                        notificationActionLink = notificationActionLink.trim().toUpperCase();
                    }
                    switch (notificationActionLink) {
                        case "BILL_PAY_CREATE":
                            this.view.NotficationsAndMessages.lblOfferLink.onTouchEnd = function() {
                                scopeObj.loadAlertsMessagesModule().presentationController.navigateToBillPay();
                            };
                            break;
                        case "P2P_CREATE":
                            this.view.NotficationsAndMessages.lblOfferLink.onTouchEnd = function() {
                                scopeObj.loadAlertsMessagesModule().presentationController.navigateToSendMoney();
                            };
                            break;
                        case "ACCOUNT_DASHBOARD":
                            this.view.NotficationsAndMessages.lblOfferLink.onTouchEnd = function() {
                                scopeObj.loadAlertsMessagesModule().presentationController.navigateToViewMyAccount();
                            };
                            break;
                        case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
                            this.view.NotficationsAndMessages.lblOfferLink.onTouchEnd = function() {
                                scopeObj.loadAlertsMessagesModule().presentationController.navigateToTransferPage();
                            };
                            break;
                        default:
                            this.view.NotficationsAndMessages.lblOfferLink.onTouchEnd = function() {
                                window.open(response.notificationActionLink);
                            };
                            break;
                    }
                } else {
                    this.view.NotficationsAndMessages.lblOfferLink.isVisible = false;
                }
            } else {
                this.view.NotficationsAndMessages.lblOfferLink.isVisible = false;
            }
            response.imageURL = response.imageURL ? response.imageURL.trim() : "";
            if (response.imageURL !== "") {
                this.view.NotficationsAndMessages.imgBanner.src = response.imageURL;
                this.view.NotficationsAndMessages.imgBanner.isVisible = true;
            } else {
                this.view.NotficationsAndMessages.imgBanner.isVisible = false;
            }
            var prevIndex = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].imgCurrentOne.isVisible) {
                    prevIndex = i;
                }
                data[i].flxNotificationsAndMessages = {
                    "skin": ViewConstants.SKINS.SKNFLXFFFFFF
                };
                data[i].imgCurrentOne.isVisible = false;
            }
            data[index].flxNotificationsAndMessages = {
                "skin": ViewConstants.SKINS.SKNFLXF7F7F7
            };
            data[index].lblArrow = {
                "text": (kony.i18n.getCurrentLocale() === "ar_AE") ? "R" : "Q",
                "skin": "sknLblrightArrowFontIcon0273E3"
            };
            data[index].imgCurrentOne.isVisible = true;
            data[index].imgBulletIcon.isVisible = false;
            data[index].rtxSegDescription.skin = "sknRtxSSPLight42424215Px";
            data[index].lblSegHeading.skin = "sknlbl42424217px";
            //Introduced timout in order to avoid some lazy loading problem of widget... suggested by platform
            setTimeout(function() {
                scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setDataAt(data[index], index);
                scopeObj.view.NotficationsAndMessages.segMessageAndNotification.setDataAt(data[prevIndex], prevIndex);
            }, 500);
            //this.view.NotficationsAndMessages.segMessageAndNotification.setDataAt(data[index], index);
            //this.view.NotficationsAndMessages.segMessageAndNotification.setDataAt(data[prevIndex], prevIndex);
            if (!this.isRead(response.isRead)) {
                this.loadAlertsMessagesModule().presentationController.updateNotificationAsRead(data[index].userNotificationId);
            }
            this.view.CustomPopup1.btnYes.onClick = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                scopeObj.closeDismissPopup();
                scopeObj.view.NotficationsAndMessages.btnNotifications.setActive(true);
                scopeObj.loadAlertsMessagesModule().presentationController.dismissNotification(selectedUserNotificationId);
            };
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point == 640 || orientationHandler.isMobile) {
                this.view.NotficationsAndMessages.flxRightNotifications.isVisible = true;
                this.view.NotficationsAndMessages.flxTabs.isVisible = false;
                this.view.NotficationsAndMessages.flxSeparatorMessages.isVisible = false;
                this.view.NotficationsAndMessages.flxSearchAndSort.isVisible = false;
                this.view.NotficationsAndMessages.segMessageAndNotification.isVisible = false;
            } else {
                this.view.NotficationsAndMessages.flxRightNotifications.isVisible = true;
                this.view.NotficationsAndMessages.flxTabs.isVisible = true;
                this.view.NotficationsAndMessages.flxSeparatorMessages.isVisible = true;
                this.view.NotficationsAndMessages.flxSearchAndSort.isVisible = true;
                this.view.NotficationsAndMessages.segMessageAndNotification.isVisible = true;
            }
            this.view.forceLayout();
            this.view.NotficationsAndMessages.lblHeadingNotification.setActive(true);
        },
        /**
         * onSearchClick :This function is executed on entering any search String in the Alerts Tab and click of "Go" or "Enter" and based on the search String the Alerts are displayed
         */
        onSearchClick: function() {
            var searchString = this.view.NotficationsAndMessages.txtSearch.text;
            FormControllerUtility.showProgressBar(this.view);
            if (this.view.NotficationsAndMessages.lblSearch.isVisible) {
                if (searchString && searchString.trim()) {
                    this.view.NotficationsAndMessages.lblSearch.setVisibility(false);
                    this.view.NotficationsAndMessages.flxClearSearch.setVisibility(true);
                    this.loadAlertsMessagesModule().presentationController.searchAlerts(searchString.trim());
                } else {
                    this.loadAlertsMessagesModule().presentationController.showAlertsPage();
                }
            } else {
                this.view.NotficationsAndMessages.lblSearch.setVisibility(true);
                this.view.NotficationsAndMessages.flxClearSearch.setVisibility(false);
                this.view.NotficationsAndMessages.txtSearch.text = "";
                this.view.NotficationsAndMessages.flxClearSearch.setVisibility(false);
                this.loadAlertsMessagesModule().presentationController.showAlertsPage();
            }
        },
        /**
         * onSearchClick :This function is used to bind the search Result of the Alerts to the Segment
         * @param {JSON} viewModel is a JSON which  contains data of the Alerts according to the Search String
         */
        showSearchAlertsViewModel: function(viewModel) {
            var data = viewModel.data;
            var self = this;
            if (data.length === 0) {
                this.view.NotficationsAndMessages.btnDismiss.isVisible = false;
                this.view.NotficationsAndMessages.flxTabs.isVisible = true;
                this.view.NotficationsAndMessages.flxSearchAndSort.isVisible = true;
                if (viewModel.errorMsg) {
                    this.view.NotficationsAndMessages.rtxNoSearchResults.text = viewModel.errorMsg;
                } else {
                    this.view.NotficationsAndMessages.rtxNoSearchResults.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.emptySearchMsg");
                }
                this.view.NotficationsAndMessages.flxNoSearchResult.isVisible = true;
                this.view.NotficationsAndMessages.flxVerticalSeparator.isVisible = true;
                this.view.NotficationsAndMessages.lblHeadingNotification.text = "";
                this.view.NotficationsAndMessages.RichText0c22ac14f53af45.text = "";
                this.view.NotficationsAndMessages.lblDateAndTime.text = "";
                this.view.NotficationsAndMessages.lblOfferLink.isVisible = false;
                this.view.NotficationsAndMessages.imgBanner.isVisible = false;
                this.view.NotficationsAndMessages.segMessageAndNotification.setData([]);
                this.view.NotficationsAndMessages.segMessageAndNotification.isVisible = false;
            } else {
                this.view.NotficationsAndMessages.flxNoSearchResult.isVisible = false;
                this.view.NotficationsAndMessages.flxVerticalSeparator.isVisible = false;
                this.view.NotficationsAndMessages.segMessageAndNotification.isVisible = true;
                this.view.NotficationsAndMessages.flxTabs.isVisible = true;
                //TODO: count of unread notification which is unread..
                var count = data.map(function(dataItem) {
                    var unread = 1;
                    if (self.isRead(dataItem.isRead)) {
                        unread = 0;
                    }
                    return unread;
                }).reduce(function(a, b) {
                    return a + b;
                }, 0);
                this.showUnreadNotificationCount(count);
                this.setNotificationSegmentData(data);
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
                    this.view.NotficationsAndMessages.height = "651dp";
                }
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.view.NotficationsAndMessages.txtSearch.text="";
            this.onSearchClick();
        },
        /**
         * This function is exeecuted when the retrieval of the requests is Success which inturn calls the setMessagesSegmentData function which is used to bind the Requests to the Segment
         * @param {object} requestsData - is a JSON which  contains data of the Requests/Messages and un read messages count etc.
         * @param {object[]} requestsData.requests - array of requests/messages object.
         * @param {string} requestsData.unReadMessagesCount - un read request/messages count.
         * @param {string} [requestsData.selectedRequestId] - selected request id if any.
         * @param {string} [requestsData.createNewMessage] - create new message is required or not.
         */
        showRequestsView: function(requestsData) {
            this.view.breadcrumb.setBreadcrumbData([{
                text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages")
            }, {
                text: kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Messages")
            }]);
            this.view.NotficationsAndMessages.segMessageAndNotification.setData([]);
            this.view.customheadernew.activateMenu("ALERTS AND MESSAGES", "My Messages");
            this.unreadMessagesCount = parseInt(requestsData.unReadMessagesCount);
            this.view.NotficationsAndMessages.btnDismiss.isVisible = true;
            this.view.NotficationsAndMessages.flxNoSearchResult.isVisible = false;
            // this.view.NotficationsAndMessages.flxVerticalSeparator.isVisible = false;
            this.view.NotficationsAndMessages.flxDeletedMessagesBottom.setVisibility(false);
            this.view.NotficationsAndMessages.btnSendReply.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.replyButton");
            this.view.NotficationsAndMessages.btnSendReply.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": 0,
                    "aria-label": "Reply to this message"
                }
            }
            this.view.NotficationsAndMessages.btnCancelReply.setVisibility(false);
            this.view.NotficationsAndMessages.flxImageAttachment.setVisibility(false);
            this.view.NotficationsAndMessages.lblWarningReplyMessage.setVisibility(false);
            this.view.NotficationsAndMessages.btnSendReply.onClick = this.showReplyView.bind(this);
            this.view.NotficationsAndMessages.btnSendReply.isVisible = applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY");;
            this.view.NotficationsAndMessages.segMessageAndNotification.isVisible = true;
            this.view.NotficationsAndMessages.btnMyMessages.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Messages") + " (" + this.unreadMessagesCount + ")";
            this.view.NotficationsAndMessages.lblSearch.onTouchEnd = this.OnMessageSearchClick.bind(this);
            this.view.NotficationsAndMessages.flxClearSearch.onClick = this.OnMessageSearchClick.bind(this, true);
            this.view.NotficationsAndMessages.txtSearch.onDone = this.OnMessageSearchClick.bind(this);
            this.view.NotficationsAndMessages.txtSearch.onKeyUp = this.showOrHideSearchCrossImage.bind(this);
            this.view.NotficationsAndMessages.flxSendMessage.height = "80dp";
            var searchString = this.view.NotficationsAndMessages.txtSearch.text;
            if (searchString && searchString.trim()) {
                this.OnMessageSearchClick();
            } else {
                this.setMessagesSegmentData(requestsData);
            }
        },
        /**
         * This function is used to bind the Messages/Requests Data to the Segment and update view accordingly.
         * @param {object} requestsData - is a JSON which  contains data of the Requests/Messages and unread messages count.
         */
      	newMessageValidation:function(obj){
          if(obj.selectedRowItems[0].lblSegHeading.text != "New Message"){
            this.onMessageRowSelection();
            FormControllerUtility.hideProgressBar(this.view);
            this.view.NotficationsAndMessages.lblAccountRenewal.setActive(true);
          }
        },
        setMessagesSegmentData: function(requestsData) {
            var requests = requestsData.requests; //Messages/Requests
            this.view.AllForms.setVisibility(false);
            this.view.NotficationsAndMessages.segMessageAndNotification.onRowClick = this.newMessageValidation.bind(this);
            this.view.NotficationsAndMessages.flxRightMessages.setVisibility(true);
            this.view.NotficationsAndMessages.flxNewMessage.setVisibility(false);
            this.view.NotficationsAndMessages.btnNewMessage.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY"));
            this.view.NotficationsAndMessages.flxRightNotifications.setVisibility(false);
            this.view.NotficationsAndMessages.flxMainMessages.height = "461dp";
            this.view.NotficationsAndMessages.flxReply.setVisibility(false);
            this.view.NotficationsAndMessages.flxDeletedMessagesBottom.setVisibility(false);
            this.view.NotficationsAndMessages.btnCancelReply.setVisibility(false);
            this.view.NotficationsAndMessages.lblWarningReplyMessage.setVisibility(false);
            this.view.NotficationsAndMessages.flxImageAttachment.setVisibility(false);
            this.setSkinActive(this.view.NotficationsAndMessages.btnMyMessages);
            this.setSkinInActive(this.view.NotficationsAndMessages.btnNotifications);
            this.setSkinInActive(this.view.NotficationsAndMessages.btnDeletedMessages);
            if (requests && requests.length > 0) {
                this.view.NotficationsAndMessages.flxRightMessages.flxMessagesHeader.flxDelete.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_DELETE"));
                this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(true);
                this.view.NotficationsAndMessages.flxNoSearchResult.setVisibility(false);
                // this.view.NotficationsAndMessages.flxVerticalSeparator.setVisibility(false);
                var dataMap = this.processRequestsDataMap();
                requests = this.processRequestsData(requests);
                this.view.NotficationsAndMessages.segMessageAndNotification.widgetDataMap = dataMap;
                this.view.NotficationsAndMessages.segMessageAndNotification.setData(requests);
                if (requestsData.selectedRequestId) {
                    //set the selected Reqeuest in the segment
                    var index;
                    requests.forEach(function(dataItem, i) {
                        if (dataItem.requestId === requestsData.selectedRequestId) {
                            index = i;
                            return;
                        };
                    });
                    if (index >= 0) {
                        this.view.NotficationsAndMessages.segMessageAndNotification.selectedRowIndex = [0, index];
                    }
                }
                if (!requestsData.createNewMessage) {
                    this.isDeletedTab = false;
                    this.onMessageRowSelection();
                    this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(true);
                    var break_point = kony.application.getCurrentBreakpoint();
                    if (break_point == 640 || orientationHandler.isMobile) {
                        this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
                        this.view.NotficationsAndMessages.flxTabs.setVisibility(true);
                        this.view.NotficationsAndMessages.flxSearchAndSort.setVisibility(true);
                        this.view.NotficationsAndMessages.btnNewMessage.isVisible = false;
                    } else {
                        this.view.NotficationsAndMessages.flxRightMessages.setVisibility(true);
                    }
                }
            } else {
                this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
                this.view.NotficationsAndMessages.flxSendMessage.setVisibility(false);
                this.view.NotficationsAndMessages.flxRightMessages.flxMessagesHeader.flxDelete.setVisibility(false);
                this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(false);
                this.view.NotficationsAndMessages.flxTabs.isVisible = true;
                this.view.NotficationsAndMessages.flxSearchAndSort.isVisible = true;
                if (requestsData.errorMsg) {
                    this.view.NotficationsAndMessages.rtxNoSearchResults.text = requestsData.errorMsg;
                } else {
                    this.view.NotficationsAndMessages.rtxNoSearchResults.text = kony.i18n.getLocalizedString("i18n.AccountsLanding.NoMessagesAtTheMoment");
                }
                this.view.NotficationsAndMessages.flxNoSearchResult.setVisibility(true);
                this.view.NotficationsAndMessages.flxVerticalSeparator.setVisibility(true);
                if (!requestsData.createNewMessage) {
                    FormControllerUtility.hideProgressBar(this.view);
                    if(this.view.NotficationsAndMessages.segMessageAndNotification.data && this.view.NotficationsAndMessages.segMessageAndNotification.data.length > 0){
                        this.view.NotficationsAndMessages.segMessageAndNotification.setActive(msgSelected, -1, "flxNotificationsAndMessages");
                    }

                }
            }
            this.view.NotficationsAndMessages.parent.forceLayout();
        },

        /**
         * This function is executed when message row gets selected
         */
        setMessageHeaderTitles: function() {
            if (kony.i18n.getCurrentLocale() === "ar_AE") { 
                this.view.NotficationsAndMessages.lblRequestId.text = ": " + kony.i18n.getLocalizedString("i18n.AlertsAndMessages.requestid");
                this.view.NotficationsAndMessages.lblCategoryKey.text = ": " + kony.i18n.getLocalizedString("i18n.billPay.category");
                this.view.NotficationsAndMessages.lblCategoryKey2.text = ": " + kony.i18n.getLocalizedString("i18n.billPay.category");
            } else {
                this.view.NotficationsAndMessages.lblRequestId.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.requestid") + " :";
                this.view.NotficationsAndMessages.lblCategoryKey.text = kony.i18n.getLocalizedString("i18n.billPay.category") + " :";
                this.view.NotficationsAndMessages.lblCategoryKey2.text = kony.i18n.getLocalizedString("i18n.billPay.category") + " :";
            }
        },

        /**
         * This function is executed when we want to display the complete details of the Request selected
         */
        onMessageRowSelection: function() {
            var self = this;
            FormControllerUtility.showProgressBar(self.view);
            self.hideReplyView();
            this.view.NotficationsAndMessages.flxSendMessage.height = "100dp";
            this.view.NotficationsAndMessages.flxNewMessage.isVisible = false;
            this.view.NotficationsAndMessages.lblPriority.isVisible = false;
            this.view.NotficationsAndMessages.lblAccountRenewal.text = "";
            this.view.NotficationsAndMessages.lblRequestIdValue.text = "";
            this.view.NotficationsAndMessages.lblCategoryValue.text = "";
            this.view.NotficationsAndMessages.lblCategoryValue2.text = "";
            this.view.NotficationsAndMessages.segMessages.setData([]);
            this.view.NotficationsAndMessages.flxReply.isVisible = false;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                this.view.NotficationsAndMessages.flxReplyMessageButtons.isVisible = false;
                this.view.NotficationsAndMessages.lblWarningNotMoreThan5files.text = "";
            }
            if (this.isDeletedTab) {
                this.view.NotficationsAndMessages.flxSendMessage.isVisible = false;
                this.view.NotficationsAndMessages.flxDelete.setVisibility(false);
            } else {
                this.view.NotficationsAndMessages.flxSendMessage.isVisible = true;
                this.view.NotficationsAndMessages.flxDelete.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_DELETE"));
            }
            this.view.NotficationsAndMessages.flxRightMessages.isVisible = true;
            this.view.NotficationsAndMessages.btnNewMessage.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY"));
            if (!CommonUtilities.isCSRMode()) {
                this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnNormalSSPFFFFFF15Px";
                this.view.NotficationsAndMessages.btnSendReply.setEnabled(true);
            }
            var index = 0;
            var data = this.view.NotficationsAndMessages.segMessageAndNotification.data;
            if (this.view.NotficationsAndMessages.segMessageAndNotification.selectedRowItems.length) {
                index = this.view.NotficationsAndMessages.segMessageAndNotification.selectedRowIndex[1];
                msgSelected=index;
            }
            var selectedRow = data[index];
            if (!data[0].requestId) {
                data.splice(0, 1);
                index = index - 1;
                if (index === -1) {
                    index = 0;
                    selectedRow = data[0];
                    if (!selectedRow) {
                        //If there are no messages
                        this.hideCreateMessageView();
                        FormControllerUtility.hideProgressBar(this.view);
                        return;
                    }
                }
                this.view.NotficationsAndMessages.segMessageAndNotification.setData(data);
            }
            var response = this.loadAlertsMessagesModule().presentationController.getRequestsDetails(selectedRow.requestId, this.isDeletedTab);
            var prevIndex = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].imgCurrentOne.isVisible) {
                    prevIndex = i;
                }
                data[i].flxNotificationsAndMessages = {
                    "skin": ViewConstants.SKINS.SKNFLXFFFFFF
                };
                data[i].imgCurrentOne.isVisible = false;
                data[i].imgBulletIcon.isVisible = false;
            }
            data[index].flxNotificationsAndMessages = {
                "skin": ViewConstants.SKINS.SKNFLXF7F7F7
            };
            data[index].lblArrow.isVisible = true;
            data[index].imgCurrentOne.isVisible = true;
            if (response && this.isReadMessage(response.unreadmsgs)) {
                var subject = data[index].lblSegHeading.text;
                data[index].lblSegHeading.text = subject.lastIndexOf(" \(") >= 0 ? subject.substr(0, subject.indexOf(" \(")) : subject;
                this.loadAlertsMessagesModule().presentationController.updateMessageAsRead(data[index].requestId);
            }
            this.view.NotficationsAndMessages.segMessageAndNotification.setDataAt(data[index], index);
            this.view.NotficationsAndMessages.segMessageAndNotification.setDataAt(data[prevIndex], prevIndex);
            this.view.NotficationsAndMessages.lblAccountRenewal.text = data[index].lblSegHeading.text;
            if (this.isDeletedTab) {
                this.view.NotficationsAndMessages.lblAccountRenewal.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": -1,
                        "aria-label":"deleted Message-subject:"+" "+data[index].lblSegHeading.text
                    }
                }
            } else {
                this.view.NotficationsAndMessages.lblAccountRenewal.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": -1,
                        "aria-label":"Message-subject:"+" "+data[index].lblSegHeading.text
                    }
                }
            }
          	this.view.NotficationsAndMessages.lblAccountRenewal.left = data[index].lblImgMessage.isVisible? "60dp": "20dp";
            this.view.NotficationsAndMessages.lblPriority.isVisible = data[index].lblImgMessage.isVisible;
            this.view.NotficationsAndMessages.lblRequestIdValue.text = data[index].lblRequestIdValue.text;
            this.view.NotficationsAndMessages.lblCategoryValue.text = data[index].lblCategoryValue.text;
            this.view.NotficationsAndMessages.lblCategoryValue2.text = data[index].lblCategoryValue.text;
            this.setMessageHeaderTitles();
            if (selectedRow.softdeleteflag === "true") {
                if (CommonUtilities.isCSRMode()) {
                    this.view.NotficationsAndMessages.btnRestore.onClick = FormControllerUtility.disableButtonActionForCSRMode();
                    this.view.NotficationsAndMessages.btnRestore.skin = FormControllerUtility.disableButtonSkinForCSRMode();
                } else {
                    this.view.NotficationsAndMessages.btnRestore.onClick = function() {
                        FormControllerUtility.showProgressBar(self.view);
                        self.loadAlertsMessagesModule().presentationController.restoreRequest(selectedRow.requestId);
                    };
                }
                if (CommonUtilities.isCSRMode()) {
                    this.view.CustomPopup1.btnYes.onClick = FormControllerUtility.disableButtonActionForCSRMode();
                    this.view.CustomPopup1.btnYes.skin = FormControllerUtility.disableButtonSkinForCSRMode();
                } else {
                    this.view.CustomPopup1.btnYes.onClick = function() {
                        self.closeDismissPopup();
                        FormControllerUtility.showProgressBar(self.view);
                        self.view.NotficationsAndMessages.btnDeletedMessages.setActive(true);
                        self.loadAlertsMessagesModule().presentationController.hardDeleteRequest(selectedRow.requestId);
                    };
                }
                this.view.CustomPopup1.btnNo.onClick = function() {
                    self.closeDismissPopup();
                    self.view.NotficationsAndMessages.btnDeleteForever.setActive(true);
                };
            } else {
                if (CommonUtilities.isCSRMode()) {
                    this.view.CustomPopup1.btnYes.onClick = FormControllerUtility.disableButtonActionForCSRMode();
                    this.view.CustomPopup1.btnYes.skin = FormControllerUtility.disableButtonSkinForCSRMode();
                } else {
                    this.view.CustomPopup1.btnYes.onClick = function() {
                        self.closeDismissPopup();
                        FormControllerUtility.showProgressBar(self.view);
                        self.view.NotficationsAndMessages.btnMyMessages.setActive(true)
                        self.loadAlertsMessagesModule().presentationController.softDeleteRequest(selectedRow.requestId);
                    };
                }
                this.view.CustomPopup1.btnNo.onClick = function() {
                    self.closeDismissPopup();
                    self.view.NotficationsAndMessages.flxDelete.setActive(true)
                };
            }
            this.loadAlertsMessagesModule().presentationController.showMessages(selectedRow.requestId);
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point == 640 || orientationHandler.isMobile) {
                if (this.deletedflag == 1) {
                    this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(true);
                    this.view.NotficationsAndMessages.flxTabs.setVisibility(true);
                    this.view.NotficationsAndMessages.flxSearchAndSort.setVisibility(true);
                    this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
                    this.deletedflag = 0;
                } else {
                    this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(false);
                    this.view.NotficationsAndMessages.flxTabs.setVisibility(true);
                    this.view.NotficationsAndMessages.flxSearchAndSort.setVisibility(false);
                    this.view.NotficationsAndMessages.flxRightMessages.top = "0dp";
                    this.view.NotficationsAndMessages.flxRightMessages.setVisibility(true);
                }
            } else {
                this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(true);
                this.view.NotficationsAndMessages.flxTabs.setVisibility(true);
                this.view.NotficationsAndMessages.flxSearchAndSort.setVisibility(true);
            }
        },
        /**
         * This function is used to display the unread messages Count in the "My Messages" tab
         * @param {object} unReadMsgsCountData -  consists of the unreadMessagesCount which is to be displayed
         */
        showUnreadMessagesCount: function(unReadMsgsCountData) {
            this.unreadMessagesCount = parseInt(unReadMsgsCountData.unReadMessagesCount);
            this.view.NotficationsAndMessages.btnMyMessages.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Messages") + " (" + this.unreadMessagesCount + ")";
            this.updateAlertsIcon();
            this.view.NotficationsAndMessages.parent.forceLayout();
        },
        
        logoutKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                    self.view.flxDialogs.isVisible = false;
                    self.view.customheadernew.btnLogout.setFocus(true);
                }
                self.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);

            }
        },
        /**
         * updateAlertsIcon :This function is used to update the red Dot on the Alerts icon depending on whether there are any unread Messages/Notifications
         */
        updateAlertsIcon: function() {
            if (this.unreadMessagesCount !== undefined && this.unReadNotificationCount !== undefined) {
                applicationManager.getConfigurationManager().setUnreadMessageCount({
                    count: parseInt(this.unreadMessagesCount) + parseInt(this.unReadNotificationCount)
                });
                this.view.customheadernew.updateAlertIcon();
            }
        },
        /**
         * This function is executed when all  the messages for the request are retrieved
         * @param {object}  messagesData - is a JSON which consists of array of all the messsages for the particular request
         */
        showMessagesView: function(messagesData) {
            var widgetDataMap = this.processMessagesDataMap();
            var message = this.processMessagesData(messagesData.messages);
            this.view.NotficationsAndMessages.segMessages.widgetDataMap = widgetDataMap;
            this.view.NotficationsAndMessages.segMessages.setData(message);
            this.view.AllForms.setVisibility(false);
            this.view.NotficationsAndMessages.parent.forceLayout();
           // this.view.NotficationsAndMessages.lblAccountRenewal.setActive(true);
        },
        /**
         * This function is executed when all  the DeletedMessages  are retrieved
         * @param {object}  deletedRequestData - is a JSON which consists of array of all the DeletedMessages
         */
        showDeletedRequestsView: function(deletedRequestData) {
            var scopeObj = this;
            scopeObj.view.NotficationsAndMessages.lblSearch.onTouchEnd = scopeObj.OnMessageDeleteSearchClick.bind(scopeObj);
            scopeObj.view.NotficationsAndMessages.flxClearSearch.onClick = scopeObj.OnMessageDeleteSearchClick.bind(scopeObj, true);
            scopeObj.view.NotficationsAndMessages.txtSearch.onDone = scopeObj.OnMessageDeleteSearchClick.bind(scopeObj);
            scopeObj.view.NotficationsAndMessages.txtSearch.onKeyUp = scopeObj.showOrHideSearchCrossImage.bind(scopeObj);
            var searchString = this.view.NotficationsAndMessages.txtSearch.text.trim();
            if (searchString === "") {
                scopeObj.setDeletedMessagesSegmentData(deletedRequestData);
            } else {
                scopeObj.OnMessageDeleteSearchClick();
            }
        },
        /**  Returns height of the page
         * @returns {String} height height of the page
         */
        getPageHeight: function() {
            var height = this.view.flxHeader.info.frame.height + this.view.flxContainer.info.frame.height + this.view.flxFooter.info.frame.height + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT;
            return height + ViewConstants.POSITIONAL_VALUES.DP;
        },
        /**
         * This function is used to bind the Deleted Messaages to the Segment
         * @param {object}  deletedRequestData -  is a JSON which consists of array of all the DeletedMessages
         */
        setDeletedMessagesSegmentData: function(deletedRequestData) {
            var deletedRequests = deletedRequestData.deletedRequests;
            var self = this;
            this.setSkinActive(this.view.NotficationsAndMessages.btnDeletedMessages);
            this.setSkinInActive(this.view.NotficationsAndMessages.btnNotifications);
            this.setSkinInActive(this.view.NotficationsAndMessages.btnMyMessages);
            this.view.NotficationsAndMessages.flxRightMessages.flxMessagesHeader.flxDelete.setVisibility(false);
            this.view.NotficationsAndMessages.flxNoSearchResult.setVisibility(false);
            // this.view.NotficationsAndMessages.flxVerticalSeparator.setVisibility(false);
            this.view.NotficationsAndMessages.btnNewMessage.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY"));
            this.view.NotficationsAndMessages.flxMainMessages.height = "461dp";
            this.view.NotficationsAndMessages.flxReply.setVisibility(false);
            this.view.NotficationsAndMessages.flxNewMessage.setVisibility(false);
            this.view.NotficationsAndMessages.flxRightNotifications.setVisibility(false);
            this.view.NotficationsAndMessages.flxSendMessage.setVisibility(false);
            if (deletedRequests && deletedRequests.length > 0) {
                this.view.NotficationsAndMessages.segMessageAndNotification.onRowClick = this.newMessageValidation.bind(this);
                this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(true);
                this.view.NotficationsAndMessages.flxDeletedMessagesBottom.setVisibility(true);
                var dataMap = self.processRequestsDataMap();
                deletedRequests = self.processRequestsData(deletedRequests);
                this.view.NotficationsAndMessages.segMessageAndNotification.widgetDataMap = dataMap;
                this.view.NotficationsAndMessages.segMessageAndNotification.setData(deletedRequests);
                this.isDeletedTab = true;
                var break_point = kony.application.getCurrentBreakpoint();
                if (break_point == 640 && orientationHandler.isMobile) {
                    FormControllerUtility.hideProgressBar(this.view);
                    this.view.NotficationsAndMessages.flxSendMessage.isVisible = false;
                    this.view.NotficationsAndMessages.flxDelete.setVisibility(false);
                } else {
                    this.onMessageRowSelection();
                }
            } else {
                this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(false);
                this.view.NotficationsAndMessages.flxDeletedMessagesBottom.setVisibility(false);
                this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
                this.view.NotficationsAndMessages.flxTabs.isVisible = true;
                this.view.NotficationsAndMessages.flxSearchAndSort.isVisible = true;
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
                    this.view.NotficationsAndMessages.btnNewMessage.isVisible = false;
                }
                if (deletedRequestData.errorMsg) {
                    this.view.NotficationsAndMessages.rtxNoSearchResults.text = deletedRequestData.errorMsg;
                } else {
                    this.view.NotficationsAndMessages.rtxNoSearchResults.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.noRecords");
                }
                this.view.NotficationsAndMessages.flxNoSearchResult.setVisibility(true);
                this.view.NotficationsAndMessages.flxVerticalSeparator.setVisibility(true);
                FormControllerUtility.hideProgressBar(this.view);
            }
            this.view.NotficationsAndMessages.parent.forceLayout();
        },
        /**
         * processRequestsData :This function is used for assigning  individual Request Data to the Segment
         * @param {data}  data consists of all the details of the  requests which are to be mapped
         * @return {object} data
         */
        processRequestsData: function(data) {
            var self = this;
            if (!data) {
                return [];
            }
            data = data.map(function(dataItem) {
                return {
                    "imgCurrentOne": {
                        "src": ViewConstants.IMAGES.ACCOUNTS_SIDEBAR_BLUE,
                        "isVisible": false
                    },
                    "imgAttachment": { //if it has attachments depending on the data
                        "src": ViewConstants.IMAGES.ATTACHMENT_GREY,
                        "isVisible": dataItem.totalAttachments > 0 ? true : false
                    },
                  	"lblImgMessage":{
                      //"isVisible":dataItem.isPriorityMessage==="1"?true : false
                      "isVisible":parseInt(dataItem.priorityCount)>=1 ?true : false
                    },
                    "imgBulletIcon": {
                        "isVisible": self.isReadMessage(dataItem.unreadmsgs)
                    },
                    "lblRowSeperator": {
                        "isVisible": true
                    },
                    "lblArrow": {
                        "text": (kony.i18n.getCurrentLocale() === "ar_AE") ? "R" : "Q",
                        "skin": "sknLblrightArrowFontIcon0273E3",
                        "isVisible": true
                    },
                    "lblDateAndTime": {
                        "text": dataItem.recentMsgDate ? CommonUtilities.getDateAndTime(dataItem.recentMsgDate) : ""
                    },
                    "rtxSegDescription": {
                        "text": (dataItem.firstMessage) ? decodeURI(window.atob(dataItem.firstMessage.replace(/\&lt;/g,"<").replace(/\&gt;/g,">"))) : ""
                    },
                    "flxNotificationsAndMessages": {
                        "skin": "sknFlxffffffnoborderThree",
                        "hoverSkin": ViewConstants.SKINS.SKNFLXF7F7F7
                    },
                    "lblSegHeading": {
                        "text": dataItem.unreadmsgs > 0 ? dataItem.requestsubject + " (" + dataItem.unreadmsgs + ")" : dataItem.requestsubject
                    },
                    "lblRequestIdValue": {
                        "text": dataItem.id
                    },
                    "lblCategoryValue": {
                        "text": dataItem.requestcategory_id
                    },
                    "requestId": dataItem.id,
                    "softdeleteflag": dataItem.softdeleteflag
                };
            });
            return data;
        },
        /**
         * processRequestsDataMap :This function is used for binding the each individual Request Data to the Segment fields
         * @returns {object} widget
         */
        processRequestsDataMap: function() {
            return {
                "flxNotificationsAndMessages": "flxNotificationsAndMessages",
                "imgAttachment": "imgAttachment",
                "imgBulletIcon": "imgBulletIcon",
                "imgCurrentOne": "imgCurrentOne",
                "lblImgMessage" : "lblImgMessage",
                "lblDateAndTime": "lblDateAndTime",
                "rtxSegDescription": "rtxSegDescription",
                "lblSegHeading": "lblSegHeading",
                "lblRowSeperator": "lblRowSeperator",
                "flxArrow": "flxArrow",
                "segNotificationsAndMessages": "segNotificationsAndMessages",
                "lblRequestIdValue": "lblRequestIdValue",
                "lblCategoryValue": "lblCategoryValue"
            };
        },
        /**
         * processMessagesDataMap :This function is used for binding the each individual messages Data to the Segment fields
         * @returns {object} data
         */
        processMessagesDataMap: function() {
            return {
                "flxDummy": "flxDummy",
                "flxMessage": "flxMessage",
                "flxNameDate": "flxNameDate",
                "imgToolTip": "imgToolTip",
                "imgUser": "imgUser",
                "lblDate": "lblDate",
                "lblDummy": "lblDummy",
                "rtxMessage": "rtxMessage",
                "flxDocAttachment1": "flxDocAttachment1",
                "flxAttachmentName1": "flxAttachmentName1",
                "imgPDF1": "imgPDF1",
                "lblDocName1": "lblDocName1",
                "lblSize1": "lblSize1",
                "flxVerticalMiniSeparator1": "flxVerticalMiniSeparator1",
                "imgRemoveAttachment1": "imgRemoveAttachment1",
                "flxRemoveAttachment1": "flxRemoveAttachment1",
                "flxDownloadAttachment1": "flxDownloadAttachment1",
                "imgDownloadAttachment1": "imgDownloadAttachment1",
                "flxDocAttachment2": "flxDocAttachment2",
                "imgPDF2": "imgPDF2",
                "lblDocName2": "lblDocName2",
                "lblSize2": "lblSize2",
                "imgRemoveAttachment2": "imgRemoveAttachment2",
                "flxRemoveAttachment2": "flxRemoveAttachment2",
                "flxDownloadAttachment2": "flxDownloadAttachment2",
                "imgDownloadAttachment2": "imgDownloadAttachment2",
                "flxDocAttachment3": "flxDocAttachment3",
                "imgPDF3": "imgPDF3",
                "lblDocName3": "lblDocName3",
                "lblSize3": "lblSize3",
                "flxRemoveAttachment3": "flxRemoveAttachment3",
                "imgRemoveAttachment3": "imgRemoveAttachment3",
                "flxDownloadAttachment3": "flxDownloadAttachment3",
                "imgDownloadAttachment3": "imgDownloadAttachment3",
                "flxDocAttachment4": "flxDocAttachment4",
                "imgPDF4": "imgPDF4",
                "lblDocName4": "lblDocName4",
                "lblSize4": "lblSize4",
                "flxRemoveAttachment4": "flxRemoveAttachment4",
                "imgRemoveAttachment4": "imgRemoveAttachment4",
                "flxDownloadAttachment4": "flxDownloadAttachment4",
                "imgDownloadAttachment4": "imgDownloadAttachment4",
                "flxDocAttachment5": "flxDocAttachment5",
                "imgPDF5": "imgPDF5",
                "lblDocName5": "lblDocName5",
                "lblSize5": "lblSize5",
                "flxRemoveAttachment5": "flxRemoveAttachment5",
                "imgRemoveAttachment5": "imgRemoveAttachment5",
                "flxDownloadAttachment5": "flxDownloadAttachment5",
                "imgDownloadAttachment5": "imgDownloadAttachment5",
                "lblUser": "lblUser",
                "lblRowSeperator": "lblRowSeperator",
            };
        },
        /**
         * processMessagesData :This function is used for setting the messages data to the segment
         * @param {data}  data consists of the array of the messages
         * @returns {object} data data
         */
        processMessagesData: function(data) {
            var self = this;
           
            var username = self.loadAlertsMessagesModule().presentationController.getCurrentUserName();
            var usrImg = applicationManager.getUserPreferencesManager().getUserImage();
            var imgJson = {
                base64: usrImg
            };
            data = data.map(function(dataItem) {
                var totalAttachments = parseInt(dataItem.totalAttachments);
                var hasFirstAttachment = self.hasFirstAttachment(totalAttachments);
                var hasSecondAttachment = self.hasSecondAttachment(totalAttachments);
                var hasThirdAttachment = self.hasThirdAttachment(totalAttachments);
                var hasFourthAttachment = self.hasFourthAttachment(totalAttachments);
                var hasFifthAttachment = self.hasFifthAttachment(totalAttachments);
                 var rtxMailDecodedVal = decodeURI(window.atob(dataItem.MessageDescription));
                 rtxMailDecodedVal = self.setSantizedStringToText(rtxMailDecodedVal);//;.replaceAll("&", "&amp;");
                return {
                    "requestId": dataItem.CustomerRequest_id,
                    "template": "flxMessagesLeft",
                   //"rtxMessage": decodeURI(window.atob(dataItem.MessageDescription)),
                     "rtxMessage":rtxMailDecodedVal,
                    "lblDate": CommonUtilities.getDateAndTime(dataItem.lastmodifiedts),
                    "flxDocAttachment1": {
                        "isVisible": hasFirstAttachment ? true : false
                    },
                    "lblDocName1": hasFirstAttachment ? dataItem.attachments[0].Name.length>20?CommonUtilities.truncateStringWithGivenLength(dataItem.attachments[0].Name+"...", 20):dataItem.attachments[0].Name: "",
                    "lblSize1": hasFirstAttachment ? '(' + dataItem.attachments[0].Size.trim() + " "+ kony.i18n.getLocalizedString("i18n.AlertsAndMessages.DocumentSize.Bytes") + ')' : "",
                    "imgPDF1": hasFirstAttachment ? self.getImageByType(dataItem.attachments[0].type) : "pdf_image.png",
                    "flxRemoveAttachment1": {
                        "isVisible": false
                    },
                    "flxDownloadAttachment1": {
                        "isVisible": true,
                        "onClick": function() {
                            var mediaId = dataItem.attachments[0].media_Id;
                            var fileName = dataItem.attachments[0].Name;
                            self.loadAlertsMessagesModule().presentationController.downloadAttachment(mediaId, fileName);
                        }
                    },
                    "imgDownloadAttachment1": {
                        "src": ViewConstants.IMAGES.DOWNLOAD_BLUE,
                    },
                    "flxDocAttachment2": {
                        "isVisible": hasSecondAttachment ? true : false
                    },
                    "lblDocName2": hasSecondAttachment ? dataItem.attachments[1].Name : "",
                    "lblSize2": hasSecondAttachment ? '(' + dataItem.attachments[1].Size.trim() + " "+ kony.i18n.getLocalizedString("i18n.AlertsAndMessages.DocumentSize.Bytes") + ')' : "",
                    "imgPDF2": hasSecondAttachment ? self.getImageByType(dataItem.attachments[1].type) : "pdf_image.png",
                    "flxRemoveAttachment2": {
                        "isVisible": false
                    },
                    "lblUser": dataItem.createdby,
                    "lblRowSeperator": {
                        "isVisible": true
                    },
                    "flxDownloadAttachment2": {
                        "isVisible": true,
                        "onClick": function() {
                            var mediaId = dataItem.attachments[1].media_Id;
                            var fileName = dataItem.attachments[1].Name;
                            self.loadAlertsMessagesModule().presentationController.downloadAttachment(mediaId, fileName);
                        }
                    },
                    "imgDownloadAttachment2": {
                        "src": ViewConstants.IMAGES.DOWNLOAD_BLUE,
                        "isVisible": true
                    },
                    "flxDocAttachment3": {
                        "isVisible": hasThirdAttachment ? true : false
                    },
                    "lblDocName3": hasThirdAttachment ? dataItem.attachments[2].Name : "",
                    "lblSize3": hasThirdAttachment ? '(' + dataItem.attachments[2].Size.trim() + " Bytes" + ')' : "",
                    "imgPDF3": hasThirdAttachment ? self.getImageByType(dataItem.attachments[2].type) : "pdf_image.png",
                    "flxRemoveAttachment3": {
                        "isVisible": false
                    },
                    "flxDownloadAttachment3": {
                        "isVisible": true,
                        "onClick": function() {
                            var mediaId = dataItem.attachments[2].media_Id;
                            var fileName = dataItem.attachments[2].Name;
                            self.loadAlertsMessagesModule().presentationController.downloadAttachment(mediaId, fileName);
                        }
                    },
                    "imgDownloadAttachment3": {
                        "src": ViewConstants.IMAGES.DOWNLOAD_BLUE,
                        "isVisible": true
                    },
                    "flxDocAttachment4": {
                        "isVisible": hasFourthAttachment ? true : false
                    },
                    "lblDocName4": hasFourthAttachment ? dataItem.attachments[3].Name : "",
                    "lblSize4": hasFourthAttachment ? '(' + dataItem.attachments[3].Size.trim() + " " + kony.i18n.getLocalizedString("i18n.AlertsAndMessages.DocumentSize.Bytes") + ')' : "",
                    "imgPDF4": hasFourthAttachment ? self.getImageByType(dataItem.attachments[3].type) : "pdf_image.png",
                    "flxRemoveAttachment4": {
                        "isVisible": false
                    },
                    "flxDownloadAttachment4": {
                        "isVisible": true,
                        "onClick": function() {
                            var mediaId = dataItem.attachments[3].media_Id;
                            var fileName = dataItem.attachments[3].Name;
                            self.loadAlertsMessagesModule().presentationController.downloadAttachment(mediaId, fileName);
                        }
                    },
                    "imgDownloadAttachment4": {
                        "src": ViewConstants.IMAGES.DOWNLOAD_BLUE,
                        "isVisible": true
                    },
                    "flxDocAttachment5": {
                        "isVisible": hasFifthAttachment ? true : false
                    },
                    "lblDocName5": hasFifthAttachment ? dataItem.attachments[4].Name : "",
                    "lblSize5": hasFifthAttachment ? '(' + dataItem.attachments[4].Size.trim() + " "+ kony.i18n.getLocalizedString("i18n.AlertsAndMessages.DocumentSize.Bytes") + ')' : "",
                    "imgPDF5": hasFifthAttachment ? self.getImageByType(dataItem.attachments[4].type) : "pdf_image.png",
                    "flxRemoveAttachment5": {
                        "isVisible": false
                    },
                    "flxDownloadAttachment5": {
                        "isVisible": true,
                        "onClick": function() {
                            var mediaId = dataItem.attachments[4].media_Id;
                            var fileName = dataItem.attachments[4].Name;
                            self.loadAlertsMessagesModule().presentationController.downloadAttachment(mediaId, fileName);
                        }
                    },
                    "imgDownloadAttachment5": {
                        "src": ViewConstants.IMAGES.DOWNLOAD_BLUE,
                        "isVisible": true
                    },
                    "imgUser": dataItem.createdby != username ? ViewConstants.IMAGES.BANK_CIRCLE_ICON_MOD : imgJson,
                    "imgToolTip": dataItem.createdby != username ? ViewConstants.IMAGES.REPLY_ARROWTIP : ViewConstants.IMAGES.REPLY_ARROWTIP_RIGHT
                };
            });
            return data;
        },

  setSantizedStringToText:function(string)
  {
     if (string !== null && string !== undefined) {
      var stringText ;
      stringText = string.replaceAll("&amp;","&");
       stringText= stringText.replaceAll("&gt;",">").replaceAll("&lt;","<").replaceAll("&quot;","\"").replaceAll("&amp;", "&")
       .replaceAll("&#42;","*").replaceAll("&#x2F;","\/").replaceAll("&#x27;","\'").replaceAll( "&#94;","^").replaceAll("&eq;","=");
        return stringText;
    } else {
      return null;
    }
  },

   
        /**
         * hasFirstAttachment :This function is used to check whether there is first Attachment or not
         * @param {object}  totalAttachments  is the total number of Attachments which are uploaded
         * @return {boolean} retuns true if there is an attachment or false if there is no first Attachment
         */
        hasFirstAttachment: function(totalAttachments) {
            var has = false;
            has = totalAttachments > 0 ? true : false;
            return has;
        },
        /**
         * hasSecondAttachment :This function is used to check whether there is second Attachment or not
         * @param {object}  totalAttachments  is the total number of Attachments which are uploaded
         * @return {boolean} retuns true if there is an attachment or false if there is no second Attachment
         */
        hasSecondAttachment: function(totalAttachments) {
            var has = false;
            has = totalAttachments > 1 ? true : false;
            return has;
        },
        /**
         * hasThirdAttachment :This function is used to check whether there is third Attachment or not
         * @param {object}  totalAttachments  is the total number of Attachments which are uploaded
         * @return {boolean} retuns true if there is an attachment or false if there is no third Attachment
         */
        hasThirdAttachment: function(totalAttachments) {
            var has = false;
            has = totalAttachments > 2 ? true : false;
            return has;
        },
        /**
         * hasFourthAttachment :This function is used to check whether there is fourth Attachment or not
         * @param {totalAttachments}  totalAttachments  is the total number of Attachments which are uploaded
         * @return {boolean} retuns true if there is an attachment or false if there is no fourth Attachment
         */
        hasFourthAttachment: function(totalAttachments) {
            var has = false;
            has = totalAttachments > 3 ? true : false;
            return has;
        },
        /**
         * hasFifthAttachment :This function is used to check whether there is fifth Attachment or not
         * @param {object}  totalAttachments  is the total number of Attachments which are uploaded
         * @return {boolean} retuns true if there is an attachment or false if there is no fifth Attachment
         */
        hasFifthAttachment: function(totalAttachments) {
            var has = false;
            has = totalAttachments > 4 ? true : false;
            return has;
        },
        /**
         * getImageByType :This function is used to get the image depending on the type of the document attached
         * @param {type}  type of the Attachment can be application/pdf, text/plain, image/jpeg, application/msword(DOC) or application/vnd.openxmlformats-officedocument.wordprocessingml.document(DOCX)
         * @return {image} returns the appropriate image based on type of the document
         */
        getImageByType: function(type) {
            var image;
            switch (type) {
                case "application/pdf":
                case "ATTACH_TYPE_PDF":
                    image = ViewConstants.IMAGES.PDF_IMAGE;
                    break;
                case "text/plain":
                case "ATTACH_TYPE_TXT":
                    image = ViewConstants.IMAGES.TXT_IMAGE;
                    break;
                case "image/jpeg":
                case "ATTACH_TYPE_JPEG":
                case "ATTACH_TYPE_JPG":
                    image = ViewConstants.IMAGES.JPEG_IMAGE;
                    break;
                case "application/msword":
                case "ATTACH_TYPE_DOC":
                    image = ViewConstants.IMAGES.DOC_IMAGE;
                    break;
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                case "ATTACH_TYPE_DOCX":
                    image = ViewConstants.IMAGES.DOCX_IMAGE;
                    break;
                case "image/png":
                case "ATTACH_TYPE_PNG":
                    image = ViewConstants.IMAGES.PNG_IMAGE;
                    break;
            }
            return image;
        },
        /**
         * getBrowseFilesConfig :This function is used to get the browser files config like which type of files to be uploaded
         * @return {config} returns the documents attached
         */
        getBrowseFilesConfig: function() {
            var config = {
                selectMultipleFiles: true,
                filter: ["image/png", "application/msword", "image/jpeg", "application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
            };
            return config;
        },
        /**
         * replyBrowseFiles :This function displays the error message when more than five files are attached or invokes the konyAPI to browse the files
         */
        replyBrowseFiles: function() {
            var config = this.getBrowseFilesConfig();
            this.view.NotficationsAndMessages.lblWarningReplyMessage.setVisibility(false);
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                this.view.NotficationsAndMessages.lblWarningNotMoreThan5files.setVisibility(false);
            }
          //  this.loopcount = 0;
            this.isReply=true;
            kony.io.FileSystem.browse(config, this.browseFilesCallback.bind(this, "reply"));
        },
        /**
         * browseFiles :This function is used for opening the browser for uploading the files on click of the Attachment icon
         */
        browseFiles: function() {
            var config = this.getBrowseFilesConfig();
            this.view.NotficationsAndMessages.lblWarningNewMessage.setVisibility(false);
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                this.view.NotficationsAndMessages.lblWarningNotMoreThan5files.setVisibility(false);
            }
          //  this.loopcount = 0;
            this.isReply=false;
            kony.io.FileSystem.browse(config, this.browseFilesCallback.bind(this, "compose"));
        },
        /**
         * browseFilesCallback :This function executes once the files are uploded so that  the uploaded files are binded to the Segment while creating a new Message
         * @param {object}  event event
         * @param {object}   files is the data of the files which are uploaded
         */
        browseFilesCallback: function(type, event, files) {
          //  if (this.browseFileObject.length === this.loopcount) {
                if (!this.isReply) {
                    this.bindFilesToSegment(files, this.view.NotficationsAndMessages.segAttachment, this.view.NotficationsAndMessages.lblWarningNewMessage);
                    //this.browseFileObject.push(files);
                } else {
                    if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                        this.bindFilesToSegment(files, this.view.NotficationsAndMessages.segAttachmentRightMessage, this.view.NotficationsAndMessages.lblWarningNotMoreThan5files);
                    } else {
                        this.view.NotficationsAndMessages.flxReplyTextArea.height = "110dp";
                        this.bindFilesToSegment(files, this.view.NotficationsAndMessages.segAttachmentRightMessage, this.view.NotficationsAndMessages.lblWarningReplyMessage);
                    }
                  //  this.browseFileObject.push(files);
                }
           //}
            //this.loopcount = this.loopcount + 1;
        },
        /**
         * replyBrowseFilesCallback :This function executes once the files are uploded so that  the uploaded files are binded to the Segment while replying to the request
         * @param {object}  event event
         * @param {object} files files is the data of the files which are uploaded
         */
        replyBrowseFilesCallback: function(event, files) {
            if (this.replyBrowseCalled) {
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile)
                    this.bindFilesToSegment(files, this.view.NotficationsAndMessages.segAttachmentRightMessage, this.view.NotficationsAndMessages.lblWarningNotMoreThan5files);
                else {
                    this.view.NotficationsAndMessages.flxReplyTextArea.height = "110dp";
                    this.bindFilesToSegment(files, this.view.NotficationsAndMessages.segAttachmentRightMessage, this.view.NotficationsAndMessages.lblWarningReplyMessage);
                }
                this.replyBrowseCalled = false;
            }
        },
        /**
         * used to check file type supported or not
         * @param {object} files files is the data of the files which are uploaded
         * @param {boolean} status status
         */
        isFileTypeSupported: function(files) {
            filetype = files[0].file.type;
            if (filetype == "image/png" || filetype == "application/msword" || filetype == "image/jpeg" || filetype == "application/pdf" || filetype == "text/plain" || filetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return true;
            return false;
        },
        /**
   }
   * isFileSizeExceeds :This function is used to check if the size of the file exceeds more than 1MB
   * @param {files}   files which consists of the data of the files
   * @return {boolean} true if the size of the file exceeds false if the file size is less than 1MB
   */
        isFileSizeExceeds: function(files) {
            var temp = files.filter(function(file) {
                return file.size > 1048576;
            });
            return temp.length > 0;
        },
        /**
         * isFileAlreadyAdded :This function is used to check if the file is already added or not
         * @param {object}   files JSON which consists of the data of the files
         * @return {boolean} true if the same file is added again or  false if the new file is added
         */
        isFileAlreadyAdded: function(files) {
            var temp = this.fileObject.filter(function(file) {
                return files.filter(function(f) {
                    return f.name == file.name;
                }).length > 0;
            });
            return temp.length > 0;
        },
        /**
         * bindFilesToSegment :This function binds the attachment data to the segment
         * @param {object}  files is a  JSON which consists of the data of the files attached ,segment for which the files data is to be binded and the warning label which shows different kinds o warnings
         * @param {object} segment segment
         * @param {string} warningLabel warningLabel
         */
        bindFilesToSegment: function(files, segment, warningLabel) {
            var self = this;
            this.fileObject = this.fileObject || [];
            warningLabel.skin = "sknRtxSSPFF000015Px";
            if (this.fileObject.length + files.length > 5) {
                warningLabel.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.Maximum5AttachmentsAllowed");
                warningLabel.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    warningLabel.left = "58dp";
                    this.view.NotficationsAndMessages.flxReplyMessageButtons.forceLayout();
                }
                this.view.NotficationsAndMessages.flxSendNewMessage.forceLayout();
                return;
            } else if (this.isFileSizeExceeds(files)) {
                warningLabel.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.SizeExceeds1MB");
                warningLabel.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    warningLabel.left = "58dp";
                    this.view.NotficationsAndMessages.flxReplyMessageButtons.forceLayout();
                }
                this.view.NotficationsAndMessages.flxSendNewMessage.forceLayout();
                return;
            } else if (this.isFileAlreadyAdded(files)) {
                warningLabel.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.AlreadyFileAdded");
                warningLabel.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    warningLabel.left = "58dp";
                    this.view.NotficationsAndMessages.flxReplyMessageButtons.forceLayout();
                }
                this.view.NotficationsAndMessages.flxSendMessage.forceLayout();
                this.view.NotficationsAndMessages.flxSendNewMessage.forceLayout();
                return;
            } else if (!this.isFileTypeSupported(files)) {
                warningLabel.text = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.InvalidFileType");
                warningLabel.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    warningLabel.left = "58dp";
                    this.view.NotficationsAndMessages.flxReplyMessageButtons.forceLayout();
                }
                this.view.NotficationsAndMessages.flxSendNewMessage.forceLayout();
                return;
            } else {
                if (files && files.length > 0) {
                    uploadMediacallback = function(id) {
                        files.forEach(function(item) {
                            self.fileObject.push(item);
                        });
                        var dataToAdd = files.map(function(dataItem) {
                            var break_point = kony.application.getCurrentBreakpoint();
                            if (break_point == 640 && orientationHandler.isMobile) {
                                docSize = "(" + dataItem.file.size + "B)";
                            } else {
                                docSize = "(" + dataItem.file.size + " " + kony.i18n.getLocalizedString("i18n.AlertsAndMessages.DocumentSize.Bytes") + ")";
                            }

                            enableSendButton = function() {
                                self.enableSendReplyButton();
                                self.enableSendButton();
                            }
                            return {
                                "lblDocSize": docSize,
                                "imgPDF": self.getImageByType(dataItem.file.type),
                                "flxRemoveAttachment": {
                                    "onClick": function() {
                                        var index = segment.selectedRowIndex;
                                        var sectionIndex = index[0];
                                        var rowIndex = index[1];
                                        var id = segment.data[0].lblAttachementId
                                        segment.removeAt(rowIndex, sectionIndex);
                                        self.fileObject.splice(rowIndex, 1);
                                        self.view.forceLayout();
                                        self.view.NotficationsAndMessages.flxReplyMessageButtons.setFocus(true);
                                        FormControllerUtility.disableButton(self.view.NotficationsAndMessages.btnSendReply);
                                        FormControllerUtility.disableButton(self.view.NotficationsAndMessages.btnNewMessageSend);
                                        self.loadAlertsMessagesModule().presentationController.discardMessageAttachment(id, self.enableSendButton.bind(self));
                                    },
                                    "accessibilityConfig": {
                                        "a11yARIA": {
                                            "aria-label": "Remove attachment"+" "+(dataItem.file.name.length>20?CommonUtilities.truncateStringWithGivenLength(dataItem.file.name+"...", 20):dataItem.file.name) ,
                                            "role": "button",
                                            "tabindex": "0"
                                        },
                                    },

                                },
                                "imgRemoveAttachment": {
                                    "src": ViewConstants.IMAGES.ICON_CLOSE_BLUE
                                },
                                "rtxDocName": dataItem.file.name.length>20?CommonUtilities.truncateStringWithGivenLength(dataItem.file.name+"...", 20):dataItem.file.name,
                                "lblAttachementId": id
                            };
                        });
                        var data = segment.data;
                        if (data && data.length > 0) {
                            dataToAdd.forEach(function(item) {
                                data.push(item);
                            });
                        } else {
                            data = dataToAdd;
                        }

                        var dataMap = {
                            "lblDocSize": "lblDocSize",
                            "flxAddAttachmentMain": "flxAddAttachmentMain",
                            "flxAttachmentName": "flxAttachmentName",
                            "flxDocAttachment": "flxDocAttachment",
                            "flxRemoveAttachment": "flxRemoveAttachment",
                            "flxVerticalMiniSeparator": "flxVerticalMiniSeparator",
                            "imgPDF": "imgPDF",
                            "imgRemoveAttachment": "imgRemoveAttachment",
                            "rtxDocName": "rtxDocName",
                            "lblAttachementId": "lblAttachementId"
                        };
                        segment.widgetDataMap = dataMap;
                        segment.setData(data);
                        self.view.forceLayout();
                        // this.view.NotficationsAndMessages.flxReplyHeader.setFocus(true);
                        self.enableSendReplyButton();
                        self.enableSendButton();
                        if (self.view.NotficationsAndMessages.flxRightMessages.isVisible === true) {
                            self.view.NotficationsAndMessages.flxReplyMessageButtons.setFocus(true);
                        }
                    };
                    this.view.NotficationsAndMessages.btnSendReply.skin = "sknBtnBlockedSSP0273e315px";
                    this.view.NotficationsAndMessages.btnSendReply.setEnabled(false);
                    FormControllerUtility.disableButton(this.view.NotficationsAndMessages.btnNewMessageSend);
                    this.uploadMediaFile(files[0], uploadMediacallback.bind(this));
                }
            }
        },

        uploadMediaFile: function(files, callback) {
            var self = this;
            var data = this.view.NotficationsAndMessages.segMessageAndNotification.data;
            var requestId = data[0].requestId;
            self.loadAlertsMessagesModule().presentationController.uploadMedia(files, requestId, callback);
        },
        /**
         * isReadMessage :This function checks whether there are any unread Messages
         * @param {boolean} status indicates the number of unread messages
         * @returns {boolean} status
         */
        isReadMessage: function(status) {
            if (status > 0) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * This function is executed when the messages are  marked as read
         * @param {number}  readCount - which represents the number of messages read
         */
        updateMessageAsReadSuccessView: function(readCount) {
            this.unreadMessagesCount = this.unreadMessagesCount - parseInt(readCount);
            this.view.NotficationsAndMessages.btnMyMessages.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Messages") + " (" + this.unreadMessagesCount + ")";
            if (this.unReadNotificationCount === 0 && this.unreadMessagesCount === 0) {
                this.view.customheadernew.lblNewNotifications.isVisible = false;
            } else {
                this.view.customheadernew.lblNewNotifications.isVisible = true;
            }
            this.view.NotficationsAndMessages.parent.forceLayout();
        },
        /**
         * OnMessageSearchClick :This function is executed on entering any search String in the My Messages Tab and click of "Go" or "Enter" and based on the search String the Requests are displayed.The search happens based on the subject field
         * @param {boolean} clearSearch clear Search
         */
        OnMessageSearchClick: function(clearSearch) {
            FormControllerUtility.showProgressBar(this.view);
            var searchString = this.view.NotficationsAndMessages.txtSearch.text;
            if (clearSearch === true) {
                this.view.NotficationsAndMessages.txtSearch.text = "";
                this.view.NotficationsAndMessages.lblSearch.setVisibility(true);
                this.loadAlertsMessagesModule().presentationController.showRequests();
                this.showOrHideSearchCrossImage();
            } else if (searchString && searchString.trim()) {
                this.view.NotficationsAndMessages.lblSearch.setVisibility(true);
                this.view.NotficationsAndMessages.flxClearSearch.setVisibility(false);
                this.loadAlertsMessagesModule().presentationController.searchRequest(searchString);
                this.view.NotficationsAndMessages.txtSearch.text = searchString;
                this.showOrHideSearchCrossImage();
            } else {
                this.loadAlertsMessagesModule().presentationController.showRequests();
            }
        },
        /**
         * This function is used to bind the search Result of the Requests to the Segment
         * @param {object} searchResult -  is a JSON which  contains data of the Requests according to the Search String
         */
        showSearchRequestsView: function(searchResult) {
            var requests = searchResult.requests;
            if (requests.length === 0) {
                this.view.NotficationsAndMessages.flxTabs.isVisible = true;
                this.view.NotficationsAndMessages.flxSearchAndSort.isVisible = true;
                this.view.NotficationsAndMessages.btnDismiss.isVisible = false;
                this.view.NotficationsAndMessages.rtxNoSearchResults.text = kony.i18n.getLocalizedString("i18n.LocateUs.NosearchresultfoundPleasechangethesearchcriteria");
                this.view.NotficationsAndMessages.flxNoSearchResult.isVisible = true;
                this.view.NotficationsAndMessages.flxVerticalSeparator.isVisible = true;
                this.view.NotficationsAndMessages.lblAccountRenewal.text = "";
                this.view.NotficationsAndMessages.lblRequestIdValue.text = "";
                this.view.NotficationsAndMessages.lblCategoryValue.text = "";
                this.view.NotficationsAndMessages.lblCategoryValue2.text = "";
                this.view.NotficationsAndMessages.segMessages.setData([]);
                this.view.NotficationsAndMessages.segMessageAndNotification.setData([]);
                this.view.NotficationsAndMessages.flxDelete.isVisible = false;
                this.view.NotficationsAndMessages.btnSendReply.isVisible = false;
                this.view.NotficationsAndMessages.btnCancelReply.setVisibility(false);
                this.view.NotficationsAndMessages.lblWarningReplyMessage.setVisibility(false);
                this.view.NotficationsAndMessages.flxImageAttachment.setVisibility(false);
                this.view.NotficationsAndMessages.segMessageAndNotification.isVisible = false;
                this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
                FormControllerUtility.hideProgressBar(this.view);
            } else {
                this.view.NotficationsAndMessages.flxRightMessages.setVisibility(true);
                this.unreadMessagesCount = parseInt(searchResult.unreadSearchMessagesCount);
                this.view.NotficationsAndMessages.btnDismiss.isVisible = true;
                this.view.NotficationsAndMessages.flxDelete.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_DELETE"));
                this.view.NotficationsAndMessages.flxNoSearchResult.isVisible = false;
                this.view.NotficationsAndMessages.flxVerticalSeparator.isVisible = false;
                this.view.NotficationsAndMessages.segMessageAndNotification.isVisible = true;
                this.view.NotficationsAndMessages.btnMyMessages.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Messages") + " (" + this.unreadMessagesCount + ")";
                this.setMessagesSegmentData(searchResult);
            }
        },
        /**
         * OnMessageDeleteSearchClick :This function is executed on entering any search String in the DeletedMessages Tab and click of "Go" or "Enter" and based on the search String the Requests are displayed.The search happens based on the subject field
         * @param {boolean} clearSearch clear Search
         */
        OnMessageDeleteSearchClick: function(clearSearch) {
            FormControllerUtility.showProgressBar(this.view);
            var searchString = this.view.NotficationsAndMessages.txtSearch.text;
            if (clearSearch === true) {
                this.view.NotficationsAndMessages.txtSearch.text = "";
                this.view.NotficationsAndMessages.lblSearch.setVisibility(true);
                this.view.NotficationsAndMessages.flxClearSearch.setVisibility(false);
                this.loadAlertsMessagesModule().presentationController.showDeletedRequests();
                this.showOrHideSearchCrossImage();
            } else if (searchString && searchString.trim()) {
                this.view.NotficationsAndMessages.lblSearch.setVisibility(false);
                this.view.NotficationsAndMessages.flxClearSearch.setVisibility(true);
                this.loadAlertsMessagesModule().presentationController.searchDeletedRequests(searchString);
                this.view.NotficationsAndMessages.txtSearch.text = searchString;
                this.showOrHideSearchCrossImage();
            } else {
                this.loadAlertsMessagesModule().presentationController.showDeletedRequests();
            }
        },
        /**
         * This function is used to bind the search Result of the Requests to the Segment
         * @param {object} searchResults - is a JSON which  contains data of the Requests according to the Search String
         */
        showSearchDeletedRequestsView: function(searchResults) {
            var requests = searchResults.deletedRequests;
            if (requests.length === 0) {
                this.view.NotficationsAndMessages.flxTabs.isVisible = true;
                this.view.NotficationsAndMessages.flxSearchAndSort.isVisible = true;
                this.view.NotficationsAndMessages.segMessageAndNotification.setVisibility(false);
                this.view.NotficationsAndMessages.flxDeletedMessagesBottom.setVisibility(false);
                this.view.NotficationsAndMessages.flxRightMessages.setVisibility(false);
                this.view.NotficationsAndMessages.rtxNoSearchResults.text = kony.i18n.getLocalizedString("i18n.LocateUs.NosearchresultfoundPleasechangethesearchcriteria");
                this.view.NotficationsAndMessages.lblAccountRenewal.text = "";
                this.view.NotficationsAndMessages.lblRequestIdValue.text = "";
                this.view.NotficationsAndMessages.lblCategoryValue.text = "";
                this.view.NotficationsAndMessages.lblCategoryValue2.text = "";
                this.view.NotficationsAndMessages.segMessages.setData([]);
                this.view.NotficationsAndMessages.flxNoSearchResult.setVisibility(true);
                this.view.NotficationsAndMessages.flxVerticalSeparator.setVisibility(true);
            } else {
                this.view.NotficationsAndMessages.flxNoSearchResult.setVisibility(false);
                this.view.NotficationsAndMessages.flxVerticalSeparator.setVisibility(false);
                this.setDeletedMessagesSegmentData(searchResults);
            }
            FormControllerUtility.hideProgressBar(this.view);
        },
        responsiveViews: {},
        initializeResponsiveViews: function() {
            this.responsiveViews["flxSearchAndSort"] = this.isViewVisible("flxSearchAndSort");
            this.responsiveViews["segMessageAndNotification"] = this.isViewVisible("segMessageAndNotification");
            this.responsiveViews["flxRightMessages"] = this.isViewVisible("flxRightMessages");
            this.responsiveViews["flxMessagesHeader"] = this.isViewVisible("flxMessagesHeader");
            this.responsiveViews["flxDesktopMessages"] = this.isViewVisible("flxDesktopMessages");
            this.responsiveViews["flxMainMessages"] = this.isViewVisible("flxMainMessages");
            this.responsiveViews["flxReply"] = this.isViewVisible("flxReply");
            this.responsiveViews["flxDeletedMessagesBottom"] = this.isViewVisible("flxDeletedMessagesBottom");
            this.responsiveViews["flxSendMessage"] = this.isViewVisible("flxSendMessage");
            this.responsiveViews["flxNewMessage"] = this.isViewVisible("flxNewMessage");
            this.responsiveViews["flxNewMessagesHeader"] = this.isViewVisible("flxNewMessagesHeader");
            this.responsiveViews["flxMainNewMessage"] = this.isViewVisible("flxMainNewMessage");
            this.responsiveViews["flxSendNewMessage"] = this.isViewVisible("flxSendNewMessage");
            this.responsiveViews["flxRightNotifications"] = this.isViewVisible("flxRightNotifications");
            this.responsiveViews["flxNoSearchResult"] = this.isViewVisible("flxNoSearchResult");
        },
        isViewVisible: function(container) {
            if (this.view[container] == undefined) {
                return this.view.NotficationsAndMessages[container].isVisible;
            } else {
                return this.view[container].isVisible
            }
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmNotificationsAndMessagesController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        orientationHandler: null,
        onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            this.seti18nValues();
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.CustomFooterMain.onBreakpointChangeComponent(width);
            this.setupFormOnTouchEnd(width);
            var self = this;
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopup1.onBreakpointChangeComponent(scope.view.CustomPopup1, width);
            var views;
            this.AdjustScreen();
            this.setMessageHeaderTitles();
            if (width === 640 || orientationHandler.isMobile) {
                views = Object.keys(this.responsiveViews);
                views.forEach(function(e) {
                    if (scope.view[e] == undefined) {
                        scope.view.NotficationsAndMessages[e].isVisible = scope.responsiveViews[e];
                    } else {
                        scope.view[e].isVisible = scope.responsiveViews[e];
                    }
                });
                this.view.NotficationsAndMessages.flxNewMessage.skin = "sknflxffffffnoborder";
                this.view.lblHeader.setVisibility(false);
                this.view.NotficationsAndMessages.btnNewMessage.setVisibility(false);
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.AlertsAndMessages");
                this.view.NotficationsAndMessages.btnBack.setVisibility(true);
                this.view.NotficationsAndMessages.flxMessagesHeader.skin = "slfBoxffffffB1R5";
                this.view.NotficationsAndMessages.flxMobilemessages.setVisibility(false);
                this.view.NotficationsAndMessages.flxDesktopMessages.setVisibility(false);
                this.view.NotficationsAndMessages.lblAccountRenewal1.setVisibility(true);
                this.view.NotficationsAndMessages.flxNameDate.setVisibility(true);
                this.view.NotficationsAndMessages.lblPriority.top = "55dp";
                this.view.NotficationsAndMessages.flxRequestId.top = "80dp";
                this.view.NotficationsAndMessages.flxCategory.top = "100dp";
            } else {
                views = Object.keys(this.responsiveViews);
                views.forEach(function(e) {
                    if (scope.view[e] == undefined) {
                        scope.view.NotficationsAndMessages[e].isVisible = scope.responsiveViews[e];
                    } else {
                        scope.view[e].isVisible = scope.responsiveViews[e];
                    }
                });
                if(kony.i18n.getCurrentLocale() === "ar_AE") {
                    this.view.NotficationsAndMessages.flxNewMessage.skin = "sknrightbordere3e3e3";
                } else {
                    this.view.NotficationsAndMessages.flxNewMessage.skin = "sknleftbordere3e3e3";
                }
                this.view.lblHeader.setVisibility(true);
                this.view.NotficationsAndMessages.btnNewMessage.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY"));
                this.view.customheadernew.lblHeaderMobile.text = "";
                this.view.NotficationsAndMessages.btnBack.setVisibility(false);
                this.view.NotficationsAndMessages.flxMessagesHeader.skin = "slFbox";
                this.view.NotficationsAndMessages.flxMobilemessages.setVisibility(false);
                this.view.NotficationsAndMessages.flxDesktopMessages.setVisibility(false);
                this.view.NotficationsAndMessages.lblAccountRenewal1.setVisibility(false);
                this.view.NotficationsAndMessages.flxNameDate.setVisibility(false);
                this.view.NotficationsAndMessages.lblPriority.top = "15dp";
                this.view.NotficationsAndMessages.flxRequestId.top = "50dp";
                this.view.NotficationsAndMessages.flxCategory.top = "70dp";
            }
            this.AdjustScreen();
        },
        setupFormOnTouchEnd: function(width) {
            if (width == 640) {
                this.view.onTouchEnd = function() {}
                this.nullifyPopupOnTouchStart();
            } else {
                if (width == 1024) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                } else {
                    this.view.onTouchEnd = function() {
                        var currFormObj = kony.application.getCurrentForm();
                        if(currFormObj.customheadernew.flxContextualMenu.isVisible === true){
                          setTimeout(function(){
                            currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
                            currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
                            currFormObj.customheadernew.imgLblTransfers.text = "O";
                          },"17ms")
                    
                        }
                        if(currFormObj.customheadernew.flxUserActions.isVisible === true){
                          setTimeout(function(){
                          currFormObj.customheadernew.flxUserActions.setVisibility(false);
                            },"17ms")
                        }
                             
                    }
                }
                var userAgent = kony.os.deviceInfo().userAgent;
                if (userAgent.indexOf("iPad") != -1) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                }
            }
        },
        nullifyPopupOnTouchStart: function() {},
      
        isMicroAppPresent: function(microApp) {
          let configManager = applicationManager.getConfigurationManager();
          return configManager.isMicroAppPresent(microApp);
        },
    };
});