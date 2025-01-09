define(['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, CampaignUtility) {

    var orientationHandler = new OrientationHandler();

    return {

        /** Global Variables **/
        bulkPaymentsModule: null,
        fetchParams: {},
        dashboardSortParams: {},
      	dashboardFilterParams: {},
        fetchParams: {},
        filterParams: {},
        isackFlow: "",
        ackMsg: "",
        fromUploadTab:false,

        /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */

        updateFormUI: function(context) {
            if (context.progressBar === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (context.progressBar === false) {
                FormControllerUtility.hideProgressBar(this.view);
            } else if (context.showRecipients === false) {
                this.errorFlow(context);
            } else if (context.key) {
                if (context.key === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ViewRequests") || context.key === BBConstants.VIEW_REQUESTS) {
                    this.showBulkPaymentsDashboardSelectedTab(
                        2,
                        kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"),
                        kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")
                    );
                    this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus");
                    this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                    this.fromUploadTab = false;
                    this.filterParams.OngoingPaymentSearch = "";
                    this.hideOrShowCloseIcon();
                    this.view.TabPaneNew.PaginationContainer.isVisible = true;
                    this.invokeonGoingPayments();
                } else if (context.key === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")) {
                    this.showBulkPaymentsDashboardSelectedTab(
                        1,
                        kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"),
                        kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")
                    );
                    this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles");
					this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                    this.filterParams.UploadingFilesSearch = "";
                    this.hideOrShowCloseIcon();
                    this.view.TabPaneNew.PaginationContainer.isVisible = true;
                    this.invokeUploadFiles();
                } else if (context.key === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory") || context.key === BBConstants.VIEW_HISTORY) {
                    this.showBulkPaymentsDashboardSelectedTab(
                        3,
                        kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"),
                        kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory")
                    );
                    this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory");
                    this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                    this.filterParams.PaymentHistorySearch = "";
                    this.hideOrShowCloseIcon();
                    this.view.TabPaneNew.PaginationContainer.isVisible = true;
                    this.invokePaymentHistory();
                } else if (context.key === BBConstants.BULKPAYMENT_VIEW_TEMPLATES) {
                    this.showBulkPaymentsDashboardSelectedTab(
                        4,
                        kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"),
                        kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewTemplates")
                    );
                    this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewTemplates");
                    this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                    this.filterParams.ViewTemplatesSearch = "";
                    this.hideOrShowCloseIcon();
                    this.view.TabPaneNew.PaginationContainer.isVisible = true;
                    this.setAcknowledgementMessage();
                    this.invokeViewTemplates();
                }
            } else if (context.fetchOnGoingPaymentsSuccess) {
                if(this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")){
                this.setUpOngoingPaymentsview(context.fetchOnGoingPaymentsSuccess);
                } else {
                this.onNavigatetoReviewDetailsFromUpload(context);
                }
            } else if (context.fetchUploadedFilesSuccess) {
                this.setUpUploadingFilesview(context.fetchUploadedFilesSuccess);
            } else if (context.fetchSingleUploadedFileSuccess) {
                this.navToOngoingPayments({}, this.singleFileContext, context.fetchSingleUploadedFileSuccess[0]);
            } else if (context.fetchHistorySuccess ) {
                if(this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory")){
                this.setUpPaymentHistoryview(context.fetchHistorySuccess);
                } else {
                this.onNavigatetoReviewDetailsFromUpload(context);  
                }
            } else if (context.viewTemplatesSuccess) {
                this.setUpViewTemplatesview(context.viewTemplatesSuccess);
            } else if (context.deleteTemplateSuccess) {
                this.isackFlow = true;
                this.ackMsg = context.deleteTemplateSuccess.templateName + " " + kony.i18n.getLocalizedString("i18n.BulkPayments.hasBeenDeletedSuccessfully");
                this.updateFormUI({
                        "key": BBConstants.BULKPAYMENT_VIEW_TEMPLATES
                    }),
                    this.view.forceLayout();
                this.adjustScreen(0);
            }
            if (context.serverError === true) {
                this.showServerErrorMessage({
                    show: true,
                    errorMessage: context.errorMessage
                });
            }
            if (context.campaignRes) {
                this.campaignSuccess(context.campaignRes);
            }
            if (context.campaignError) {
                this.view.flxBannerContainerDesktop.setVisibility(false);
                this.view.flxBannerContainerMobile.setVisibility(false);
            }


            this.view.forceLayout();
            this.adjustScreen(0);
          if (kony.application.getCurrentBreakpoint() > 1024) {
				this.adjustScreen(-150);
			}
                   
			if (kony.os.deviceInfo().screenWidth == 1024 && (kony.application.getCurrentBreakpoint() <= 1024 || orientationHandler.isTablet)) {
                this.adjustScreen(-360);
            }
        },
      
      setFooterforExp: function(data) {
        if (kony.os.deviceInfo().screenWidth == 1024 && (kony.application.getCurrentBreakpoint() <= 1024 || orientationHandler.isTablet)) {
          if (data.isVisible === false) this.adjustScreen(-360);
          else 
          {
            if(this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")) this.adjustScreen(-150);
            else this.adjustScreen(-200);
          }
        }
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
            this.view.customheader.forceCloseHamburger();
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.right = "60dp";
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.width = "27%";
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.left = "";  
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.height = "40dp";
          if(kony.os.deviceInfo().screenWidth <= 1024  || orientationHandler.isTablet){
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.height= "70dp";
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.top= "30dp";
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.btnCancelFilter.width="25%";
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.btnCancelFilter.left="5%";
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.btnCancelFilter.top="5dp";
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.btnApplyFilter.width ="50%";
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.btnApplyFilter.left="40%";
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.btnApplyFilter.top="5dp";
          }
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxImage.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
            var onSegReload = function() {
                scopeObj.view.forceLayout();
                scopeObj.adjustScreen(50);
            };
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.onClick = function() {
                if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
                    this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = true;
                }
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.onClick = function() {
                if (this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")) {
                    this.setDropdownVisiblility();
                } else if (this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")) {
                    this.setDropdownVisiblilityforUploadStatus();
                } else if (this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory")) {
                  //  this.setDropdownVisiblilityforProcessedRequests();
                }
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxButtons.btnApplyFilter.onClick = function() {
              this.applyFilterForHistory();
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxButtons.btnCancelFilter.onClick = function() {
              this.cancelFilterForHistory();
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.onRowClick = function() {
                this.segViewTypesRowClick(this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.selectedRowItems[0].lblViewTypeName.text);
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.skin = "slFBox";
            this.view.TabPaneNew.TabBodyNew.segTemplates.bottom = "-1dp";
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "blue_downarrow.png";
            this.view.TabPaneNew.TabBodyNew.setSegmentReloadAction(onSegReload);
            this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBulkPaymentsViewHeader";
            this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxBulkPaymentsViewRowTemplate";
            this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(202);
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onKeyUp = this.hideOrShowCloseIcon.bind(this);
            this.loadDashboard();
            this.initializeDashboardSortParams();
            this.initializeFetchParams();
            this.initializeDashboardFilterParams();
            this.initializeFilterParams();
            this.setupRightContainerForDashboard();
            this.setupPermissionBasedView();
            this.view.flxAcknowledgementContainer.setVisibility(false);
            this.view.forceLayout();
            this.adjustScreen(0);
        },

        hideOrShowCloseIcon: function() {
            if (this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text.trim() === "") {
                this.view.TabPaneNew.TabSearchBarNew.imgClear.setVisibility(false);
            } else {
                this.view.TabPaneNew.TabSearchBarNew.imgClear.setVisibility(true);
            }
            this.view.TabPaneNew.TabSearchBarNew.forceLayout();
        },

        initializeDashboardSortParams: function() {
            this.dashboardSortParams = {
                "OnGoingPayments": {
                    "Description": "sortingfinal.png",
                    "Date": "sortingfinal.png",
                    "Status": "sortingfinal.png"
                },
                "UploadedFiles": {
                    "Description": "sortingfinal.png",
                    "Date": "sortingfinal.png",
                    "Status": "sortingfinal.png"
                },
                "PaymentHistory": {
                    "Description": "sortingfinal.png",
                    "Date": "sortingfinal.png",
                    "TotalAmount": "sortingfinal.png"
                },
                "ViewTemplates": {
                    "TemplateName": ViewConstants.IMAGES.SORT_FINAL_IMAGE,
                    "CreatedBy": ViewConstants.IMAGES.SORT_FINAL_IMAGE,
                    "CreatedOn": ViewConstants.IMAGES.SORT_FINAL_IMAGE
                }
            };
        },

        initializeDashboardFilterParams: function() {
            this.dashboardFilterParams = {
                "ReviewFilter": {
                    "Status": "",
                    "ProcessingMode": "",
                    "TimePeriod": ""
                },
                "UploadFilter": {
                     "Status": "",
                     "TimePeriod": ""
                },
                "HistoryFilter": {
                    "TimePeriod": ""
                }
            };
        },
      
        initializeFetchParams: function() {
            this.fetchParams = {
                "searchString": "",
                "sortByParam": "",
                "sortOrder": "",
                "pageSize": "",
                "pageOffset": "",
                "filterByParam": "",
                "filterByValue": "",
				"batchMode": "",
				"timeParam": "",
				"timeValue": ""
            };
        },
        initializeFilterParams: function() {
            this.filterParams = {
                "OnGoingPayments": ".",
                "UploadedFiles": ".",
                "PaymentHistory": ".",
            };
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
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholderSkin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
			this.view.TabPaneNew.TabSearchBarNew.tbxSearch.skin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.skin = ViewConstants.SKINS.BULKPAYMENTS_VIEWTYPE_LABEL;
            this.adjustScreen(0);
        },

        errorFlow: function(context) {

        },

        /**
         * onInit : onInit event Function for the form
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */

        onInit: function() {
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxMain', 'flxHeader', 'flxFooter', 'flxContentContainer', 'flxHeaderMain','flxFormContent']);
            this.bulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });       
        },

        /**
         * showOnGoingPayments : method to show ongoing payments
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */
        invokeonGoingPayments: function() {
            this.updateFetchParams();
            this.setPaginationComponentForOngoingPayments(kony.i18n.getLocalizedString("i18n.common.transactions"));
            this.fetchOngoingPayments("", "DESC");
        },

        /**
         * showUploadFiles : method to show uploaded files
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */
        invokeUploadFiles: function() {
            this.updateFetchParams();
            this.setPaginationComponentForUploadedFiles(kony.i18n.getLocalizedString("i18n.BulkWires.Files"));
            this.fetchUploadedFiles("", "DESC");
        },

        /**
         * showPaymentHistory : method to show payment history
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */
        invokePaymentHistory: function() {
            this.updateFetchParams();
            this.setPaginationComponentForPaymentHistory(kony.i18n.getLocalizedString("i18n.common.transactions"));
            this.fetchHistory("", "DESC");
        },

        /**
         * showTempaltes : method to show Templates
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */
        invokeViewTemplates: function() {
            this.updateFetchParams();
            this.setPaginationComponentForViewTemplates(kony.i18n.getLocalizedString("i18n.BulkWires.Templates"));
            this.viewTemplates("", "DESC");
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
            this.bulkPaymentsModule.presentationController.getBulkPayCampaigns();
            this.adjustScreen(0);
        },

        setRightContainerUI: function() {
            this.view.dbRightContainerNew.flxActionHeaderSeperator.setVisibility(false);
            this.view.dbRightContainerNew.lblActionHeader.setVisibility(false);
            if (this.view.dbRightContainerNew.btnAction1.isVisible === true && this.view.dbRightContainerNew.btnAction2.isVisible === true) {
                this.view.dbRightContainerNew.flxActionSeperator.isVisible = true;
            } else {
                this.view.dbRightContainerNew.flxActionSeperator.isVisible = false;
            }
            if (this.view.dbRightContainerNew.btnAction3.isVisible === true && (this.view.dbRightContainerNew.btnAction2.isVisible === true || this.view.dbRightContainerNew.btnAction1.isVisible === true)) {
                this.view.dbRightContainerNew.flxACtionSeperator2.isVisible = true;
            } else {
                this.view.dbRightContainerNew.flxACtionSeperator2.isVisible = false;
            }
        },

        setupRightContainerForDashboard: function() {
            var scopeObj = this;
            this.view.dbRightContainerNew.btnAction1.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentTemplateCreatePermissionsList());
            this.view.dbRightContainerNew.btnAction1.text = kony.i18n.getLocalizedString("i18n.wireTransfers.CreateNewTemplate");
            this.view.dbRightContainerNew.btnAction1.onClick = function() {
              
              var navigationObject = {
                "requestData": null,
                "onSuccess": {
                  "form": "frmBulkPaymentsTemplate",
                  "module": "BulkPaymentsUIModule",
                  "appName": "BulkPaymentsMA",
                  "context": {
                    "key": BBConstants.BULKPAYMENTS_CREATE_TEMPLATE,
                    "responseData": null
                  }
                },
                "onFailure": {
                  "form": "AuthUIModule/frmLogin",
                  "module": "AuthUIModule",
                  "appName": "AuthenticationMA",
                  "context": {
                    "key": BBConstants.LOG_OUT,
                    "responseData": null
                  }
                }
              };
                scopeObj.bulkPaymentsModule.presentationController.noServiceNavigateTemp(navigationObject);
            };

            this.view.dbRightContainerNew.btnAction2.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentFileUploadPermissionsList());
            this.view.dbRightContainerNew.btnAction2.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadFilesAndMakePayment");
            this.view.dbRightContainerNew.btnAction2.onClick = function() {
              var navigationObject = {
                "requestData": null,
                "onSuccess": {
                  "form": "frmBulkPaymentsUploadFile",
                  "module": "BulkPaymentsUIModule",
                  "appName": "BulkPaymentsMA",
                  "context": {
                    "key": BBConstants.BULKPAYMENTS_UPLOAD_FILE,
                    "responseData": null
                  }
                },
                "onFailure": {
                  "form": "AuthUIModule/frmLogin",
                  "module": "AuthUIModule",
                  "appName": "AuthenticationMA",
                  "context": {
                    "key": BBConstants.LOG_OUT,
                    "responseData": null
                  }
                }
              };
                scopeObj.bulkPaymentsModule.presentationController.noServiceNavigateTemp(navigationObject);
            };

            this.view.dbRightContainerNew.flxAction3.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentFilesViewPermissionsList());
            this.view.dbRightContainerNew.btnAction3.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.DownloadCSVTemplate");
            this.view.dbRightContainerNew.btnAction3.onClick = function() {
                scopeObj.bulkPaymentsModule.presentationController.downloadSampleFile();
            };

            this.setRightContainerUI();
            this.view.dbRightContainerNew.setVisibility(true);
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);       
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);         
        },
      
        mappingCampaingsData: function(campaign) {
          let url = campaign.destinationURL;
          return {
            "flxCampaignCarousel": {
              "onClick": () => kony.application.openURL(url)
            },
            "imgCampaign": {
              "src": campaign.imageURL
            }
          };
        },

        campaignSuccess: function(data) {
            //var CampaignManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CampaignManagement');
           // CampaignManagementModule.presentationController.updateCampaignDetails(data);
            var self = this;
            if (data.length === 0) {
                 self.view.carousel.setVisibility(false);
                 self.view.flxCampaigns.setVisibility(false);
            } else {
                let widgetMap = {
                    "flxCampaignCarousel": "flxCampaignCarousel",
                    "imgCampaign": "imgCampaign",
                };
                let campaignsData = data.map(self.mappingCampaingsData);
                self.view.carousel.setVisibility(true);
                self.view.flxCampaigns.setVisibility(true);
                self.view.carousel.segCarousel.widgetDataMap = widgetMap;
                self.view.carousel.segCarousel.setData(campaignsData);
            }
            this.adjustScreen(50);
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

        loadDashboard: function() {
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.onClick = this.onClickAnyTab;
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.onClick = this.onClickAnyTab;
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.onClick = this.onClickAnyTab;
            this.view.TabPaneNew.TabsHeaderNew.btnTab4.onClick = this.onClickAnyTab;
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus");
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.toolTip = kony.i18n.getLocalizedString("kony.i18n.bulkpayments.paymentStatusDesc");
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles");
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.toolTip = kony.i18n.getLocalizedString("kony.i18n.bulkpayments.uploadedFilesDesc");
            this.view.TabPaneNew.TabsHeaderNew.btnTab1.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory");
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.toolTip = kony.i18n.getLocalizedString("kony.i18n.bulkpayments.paymentHistoryDesc");
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.TabPaneNew.TabsHeaderNew.btnTab4.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewTemplates");
            this.view.TabPaneNew.TabsHeaderNew.btnTab4.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewTemplates");
            this.view.TabPaneNew.TabsHeaderNew.btnTab4.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
        },
        onClickAnyTab: function(eventobject) {
            this.view.TabPaneNew.TabsHeaderNew.clickTab(eventobject);
            this.onTabClick(eventobject);
        },
        onTabClick: function(eventobject) {
			this.view.flxAcknowledgementContainer.isVisible = false;
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.setVisibility(false);
            this.initializeDashboardFilterParams();
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL");
            this.view.TabPaneNew.TabSearchBarNew.imgClear.setVisibility(false);
            this.filterParams.OngoingPaymentSearch = "";
			this.filterParams.PaymentHistorySearch = "";
			this.filterParams.ViewTemplatesSearch = "";
			this.fetchParams.timeParam = "";
			this.fetchParams.timeValue = "";
           
            if (eventobject.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")) {
                this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus");
                this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"),
                    kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus"));
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.filterParams.OngoingPaymentSearch = "";
                this.invokeonGoingPayments();
            } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")) {
				this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles");
                this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"), kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles"));
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.filterParams.UploadingFilesSearch = "";
                this.invokeUploadFiles();
            } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory")) {
                this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory");
                this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"), kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory"));
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.filterParams.PaymentHistorySearch = "";
                this.invokePaymentHistory();
            } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewTemplates")) {
                this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewTemplates");
                this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"), kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewTemplates"));
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.filterParams.ViewTemplatesSearch = "";
                this.invokeViewTemplates();
            }
            this.adjustScreen(200);
            this.view.forceLayout();
        },


        setUpOngoingPaymentsview: function(response) {
            FormControllerUtility.showProgressBar(this.view);
            this.view.TabPaneNew.TabSearchBarNew.flxSearch.width = "63%";
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = true;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL");
            this.view.TabPaneNew.setSearchData([
                ["lblOPFromAccountValue", "lblOPnitiatedByValue", "lblOPPaymentIDValue"]
            ]);
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = function() {
                this.fetchParams.pageSize = "";
                this.fetchParams.pageOffset = "";
                this.filterParams.OngoingPaymentSearch = ".";
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.invokeonGoingPayments();
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                this.filterParams.OngoingPaymentSearch = "";
                this.hideOrShowCloseIcon();
                this.invokeonGoingPayments();
            }.bind(this);
            var sectionData = {
                "flxOngoingPayments": {
                    "isVisible": true
                },
                "flxUploadingFiles": {
                    "isVisible": false
                },
                "flxPaymentHistory": {
                    "isVisible": false
                },
                "flxViewTemplates": {
                    "isVisible": false
                },
                "btnDescription": {
                    "text":  kony.i18n.getLocalizedString("kony.pfm.desc")
                },

                "imgSortDesc": this.dashboardSortParams.OnGoingPayments.Description,
                "imgDate": this.dashboardSortParams.OnGoingPayments.Date,
                "imgStatus": this.dashboardSortParams.OnGoingPayments.Status,

                "btnDate": {
                    "text": kony.i18n.getLocalizedString("kony.mb.transfers.Date")
                },

                "btnStatus": {
                    "text": kony.i18n.getLocalizedString("kony.mb.achfiledetail.status")
                },

                "lblActions": {
                    "text": kony.i18n.getLocalizedString("i18n.wireTransfers.Actions")
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgFlxTopSeparator": {
                    "text": "-"
                },
                "flxDescription": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.OnGoingPayments.Description;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "DESC";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.OnGoingPayments.Description = img;
                        this.fetchOngoingPayments("description", order);
                    }.bind(this)
                },
                "flxStatus": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.OnGoingPayments.Status;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "DESC";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.OnGoingPayments.Status = img;
                        this.fetchOngoingPayments("status", order);
                    }.bind(this)
                },
                "flxDate": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.OnGoingPayments.Date;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "DESC";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.OnGoingPayments.Date = img;
                        this.fetchOngoingPayments("paymentDate", order);
                    }.bind(this)
                },
            };
            var defaultValues = {
                flxDetilsHighlighterMain : {
					"isVisible" : false
				},
                flxMain: {
                    "height": "51dp"
                },
                flxBulkPaymentsViewHeader: {
                    "skin": "bbSKnFlxffffff"
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxBPViewHeader: {
                    "isVisible": true,
                    "skin": "bbSKnFlxffffff"
                },
                flxTopSeperator: {
                    "isVisible": true
                },
                flxBottomSeperator: {
                    "isVisible": true
                },
                flxOngoingPaymentsHeader: {
                    "isVisible": true
                },
                flxOngoingPaymentsDetails: {
                    "isVisible": true
                },
                flxUploadingFilesDetails: {
                    "isVisible": false
                },
                flxUploadingFilesHeader: {
                    "isVisible": false
                },
                flxPaymentHistoryHeader: {
                    "isVisible": false
                },
                flxPaymentHistoryDetails: {
                    "isVisible": false
                },
                flxViewTemplatesHeader: {
                    "isVisible": false
                },
                flxViewTempaltesDetails: {
                    "isVisible": false
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                flxDropDown: {
                  "isVisible": true,
                  "onClick": function(eventobject, context) {
                    var secIndex = context["sectionIndex"];
                    var rowIndex = context["rowIndex"];
                    var conObj={"section": secIndex, "row": rowIndex, "direction": 1};
                    this.view.TabPaneNew.TabBodyNew.showOrHideDetails(conObj);
                    var sknObjectLine = JSON.parse(JSON.stringify(this.view.TabPaneNew.TabBodyNew.getData()[secIndex][1][rowIndex].flxDetilsHighlighterMain));
                    this.setFooterforExp(sknObjectLine);
                  }.bind(this)
                },
                flxOpActions: {
                    "onClick": function(eventobject, context) {
                        this.onNavigatetoReviewDetails(eventobject, context);
                    }.bind(this),
					"skin": ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER
                },
            };
            var rowDataMap = {
                lblDate: "paymentDate",
                lblOpDescription: "description",
                lblOpStatus: "status",
                lblReason: "lblReason",
                lblOPFromAccount: "lblOPFromAccount",
                lblOPTotalTransactions: "lblOPTotalTransactions",
                lblOPTotalAmount: "lblOPTotalAmount",
                lblOPInitiatedBy: "lblOPInitiatedBy",
                lblOPPaymentID: "lblOPPaymentID",
                lblValueDate: "lblValueDate",
                lblReasonValue: "cancellationreason",
                lblOPFromAccountValue: "fromAccountMasked",
                lblOPTotalTransactionsValue: "totalTransactions",
                lblOPTotalAmountValue: "totalAmount",
                lblOPnitiatedByValue: "initiatedBy",
                lblOPPaymentIDValue: "recordId",
                lblValueDateValue: "scheduledDate",
                flxTopSeperator: "flxTopSeperator",
                flxBottomSeperator: "flxBottomSeperator",
                lblOpActions: "actionsValue",
              	lblError: "lblError",
				lblErrorValue: "errorDescription",
            };

            this.view.TabPaneNew.TabBodyNew.setSectionData([sectionData]);
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
            if (response.length === 0) {
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.showNoBulkPayments(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.noOngoingPayments"));
            } else {
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(response);
                if (response.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
                    response.pop();
                }
                if (this.filterParams.OngoingPaymentSearch === ".") {
                    this.view.TabPaneNew.PaginationContainer.isVisible = false;
                }
                this.view.TabPaneNew.TabBodyNew.addDataForSections([response]);
				this.setPaginationtext(kony.i18n.getLocalizedString("i18n.common.transactions"),response.length);
            }
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.SearchPlaceholder");
            FormControllerUtility.hideProgressBar(this.view);
            if(this.fromUploadTab===true){
              var conObj={"section": 0, "row": 0, "direction": 1}
              this.view.TabPaneNew.TabBodyNew.showOrHideDetails(conObj);
              var sknObjectLine = JSON.parse(JSON.stringify(this.view.TabPaneNew.TabBodyNew.getData()[secIndex][1][rowIndex].flxDetilsHighlighterMain));
              this.setFooterforExp(sknObjectLine);
            }
            this.fromUploadTab=false;
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        setUpUploadingFilesview: function(response) {
            FormControllerUtility.showProgressBar(this.view);
            this.view.TabPaneNew.TabSearchBarNew.flxSearch.width = "63%";
			this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = true;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllFiles");
            this.view.TabPaneNew.setSearchData([
                ["lblFileNameValue", "lblUploadedByValue", "lblSystemFileNameValue"]
            ]);
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = function() {
                this.fetchParams.pageSize = "";
                this.fetchParams.pageOffset = "";
                this.filterParams.UploadingFilesSearch = ".";
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.invokeUploadFiles();
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.invokeUploadFiles();
            }.bind(this);
            var sectionData = {
                "flxOngoingPayments": {
                    "isVisible": false
                },
                "flxUploadingFiles": {
                    "isVisible": true
                },
                "flxPaymentHistory": {
                    "isVisible": false
                },
                "flxViewTemplates": {
                    "isVisible": false
                },
                "btnFileDescription": {
                    "text": kony.i18n.getLocalizedString("kony.mb.CM.description")
                },

                "imgSortFileDesc": this.dashboardSortParams.UploadedFiles.Description,
                "imgUFDate": this.dashboardSortParams.UploadedFiles.Date,
                "imgUFStatus": this.dashboardSortParams.UploadedFiles.Status,
                "flxFileDescription": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.UploadedFiles.Description;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "DESC";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.UploadedFiles.Description = img;
                        this.fetchUploadedFiles("description", order);
                    }.bind(this)
                },
                "flxUFStatus": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.UploadedFiles.Status;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "DESC";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.UploadedFiles.Status = img;
                        this.fetchUploadedFiles("status", order);
                    }.bind(this)
                },
                "flxUFDate": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.UploadedFiles.Date;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "DESC";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.UploadedFiles.Date = img;
                        this.fetchUploadedFiles("uploadedDate", order);
                    }.bind(this)
                },
                "btnUFDate": {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.Date")
                },
                "btnUFStatus": {
                    "text":  kony.i18n.getLocalizedString("i18n.common.status")
                },
                "btnUFUploadID": {
                    "isVisible": false,
                    "text": kony.i18n.getLocalizedString("kony.i18n.bulkpayments.uploadID")
                },
                "lblUFActions": {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.Actions")
                },
                "imgUFUploadID": {
                    "isVisible": false
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgFlxTopSeparator": {
                    "text": "-"
                },
            };
            var defaultValues = {
                flxDetilsHighlighterMain : {
					"isVisible" : false
				},
                flxMain: {
                    "height": "51dp"
                },
                flxBulkPaymentsViewHeader: {
                    "skin": "bbSKnFlxffffff"
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxBPViewHeader: {
                    "isVisible": true,
                    "skin": "bbSKnFlxffffff"
                },
                flxTopSeperator: {
                    "isVisible": true
                },
                flxBottomSeperator: {
                    "isVisible": true
                },
                flxOngoingPaymentsHeader: {
                    "isVisible": false
                },
                flxOngoingPaymentsDetails: {
                    "isVisible": false
                },
                flxUploadingFilesDetails: {
                    "isVisible": true
                },
                flxUploadingFilesHeader: {
                    "isVisible": true
                },
                flxPaymentHistoryHeader: {
                    "isVisible": false
                },
                flxPaymentHistoryDetails: {
                    "isVisible": false
                },
                flxViewTemplatesHeader: {
                    "isVisible": false
                },
                flxViewTempaltesDetails: {
                    "isVisible": false
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
                flxDropDown: {
                  "isVisible": true,
                  "onClick": function(eventobject, context) {
                    var secIndex = context["sectionIndex"];
                    var rowIndex = context["rowIndex"];
                    var conObj={"section": secIndex, "row": rowIndex, "direction": 1};
                    this.view.TabPaneNew.TabBodyNew.showOrHideDetails(conObj);
                    var sknObjectLine = JSON.parse(JSON.stringify(this.view.TabPaneNew.TabBodyNew.getData()[secIndex][1][rowIndex].flxDetilsHighlighterMain));
                    this.setFooterforExp(sknObjectLine);
                  }.bind(this)
                },
                "flxUploadActions": {
                    "onClick": function(eventobject, context) {
                        let uploadStatus = context.widgetInfo.data[context.sectionIndex][1][context.rowIndex].status.toolTip;
                        if (uploadStatus === kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractingPayments") || uploadStatus === BBConstants.TRANSACTION_STATUS.UPLOADED) {
                            this.singleFileContext = context;
                            this.fetchParams.filterByValue = context.widgetInfo.data[context.sectionIndex][1][context.rowIndex].fileId;
                            this.fetchParams.filterByParam = "fileId";
                            this.fetchParams.pageOffset = 0;
                            this.fetchParams.pageSize = 11;
                            this.bulkPaymentsModule.presentationController.fetchSingleUploadedFile(this.fetchParams);
                        } else {
                            this.navToOngoingPayments(eventobject, context);
                        }
                    }.bind(this),
					"skin": ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER
                }
            };
            var rowDataMap = {
                lblUfDate: "uploadedDate",
                lblFileDescription: "description",
                lblUfStatus: "status",
                lblUploadID: "fileId",
                lblFileName: "lblFileName",
                lblUploadedBy: "lblUploadedBy",
                lblSystemFileName: "lblSystemFileName",
                lblFileNameValue: "fileName",
                lblUploadedByValue: "uploadedBy",
                lblSystemFileNameValue: "fileId",
                flxTopSeperator: "flxTopSeperator",
                flxBottomSeperator: "flxBottomSeperator",
                lblBulkReferenceValue: "confirmationNumber",
                lblUploadActions: "actionValue"
            };

            this.view.TabPaneNew.TabBodyNew.setSectionData([sectionData]);
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
            if (response.length === 0) {
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.showNoBulkPayments(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.noUploadedFiles"));
            } else {
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(response);
                if (response.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
                    response.pop();
                }
                if (this.filterParams.UploadingFilesSearch === ".") {
                    this.view.TabPaneNew.PaginationContainer.isVisible = false;
                }
                this.view.TabPaneNew.TabBodyNew.addDataForSections([response]);
				this.setPaginationtext(kony.i18n.getLocalizedString("i18n.BulkWires.Files"),response.length);
            }
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.SearchPlaceholder");
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(50);
        },
        navToOngoingPayments: function(eventobject, context,file) {
            let confirmationNumber = "";
            let uploadStatus ="";
            var requestStatus = "";
            if (!kony.sdk.isNullOrUndefined(file)) {
                confirmationNumber = file.confirmationNumber;
                uploadStatus = file.status.toolTip;
                if (!kony.sdk.isNullOrUndefined(file.requestStatus)) {
                    requestStatus = file.requestStatus;
                }
            } else{
                confirmationNumber = this.view.TabPaneNew.TabBodyNew.getData()[context.sectionIndex][1][context.rowIndex].confirmationNumber;
                if (!kony.sdk.isNullOrUndefined(this.view.TabPaneNew.TabBodyNew.getData())) {
                    uploadStatus = this.view.TabPaneNew.TabBodyNew.getDataForSections()[0][context.rowIndex].status.toolTip;
                }
                if (!kony.sdk.isNullOrUndefined(this.view.TabPaneNew.TabBodyNew.getData())&& !kony.sdk.isNullOrUndefined(this.view.TabPaneNew.TabBodyNew.getDataForSections()[0][context.rowIndex].requestStatus)) {
                    requestStatus = this.view.TabPaneNew.TabBodyNew.getDataForSections()[0][context.rowIndex].requestStatus;
                }
            }
            FormControllerUtility.hideProgressBar(this.view);
            if (uploadStatus === kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractionFailed")) {
              var BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "BulkPaymentsUIModule",
                "appName": "BulkPaymentsMA"
              });
              BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsUploadFile", BBConstants.BULKPAYMENTS_UPLOAD_FILE);
            } else if (uploadStatus === kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractingPayments") || uploadStatus === BBConstants.TRANSACTION_STATUS.UPLOADED) {
                //showing a popup for PROCESSING and UPLOADED status
                this.showWarningForExtractingPayments(null);
            } else if(requestStatus.toLowerCase() === BBConstants.TRANSACTION_STATUS.COMPLETED.toLowerCase()){
              //this.showBulkPaymentsDashboardSelectedTab(3, kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"), kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory"));
              //this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory");
              this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = confirmationNumber;
              this.hideOrShowCloseIcon();
              this.fetchParams.pageSize = "";
              this.fetchParams.pageOffset = "";
              this.filterParams.PaymentHistorySearch = ".";
              this.view.TabPaneNew.PaginationContainer.isVisible = false;
              this.fromUploadTab=true;
              this.invokePaymentHistory();
            }
            else {
              //this.showBulkPaymentsDashboardSelectedTab(2, kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"), kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus"));
              //this.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus");
              this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = confirmationNumber;
              this.hideOrShowCloseIcon();
              this.fetchParams.pageSize = "";
              this.fetchParams.pageOffset = "";
              this.filterParams.OngoingPaymentSearch = ".";
              this.view.TabPaneNew.PaginationContainer.isVisible = false;
              this.fromUploadTab=true;
              this.invokeonGoingPayments();
            }
        },

        setUpPaymentHistoryview: function(response) {
            FormControllerUtility.showProgressBar(this.view);
            this.view.TabPaneNew.TabSearchBarNew.flxSearch.width = "99%";
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = false;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
            this.view.TabPaneNew.setSearchData([
                ["lblFromAccountValue", "lblInitiatedByValue", "lblPaymentIDValue", "lblPaymentStatusValue"]
            ]);
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = function() {
                this.fetchParams.pageSize = "";
                this.fetchParams.pageOffset = "";
                this.filterParams.PaymentHistorySearch = ".";
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.invokePaymentHistory();
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.invokePaymentHistory();
            }.bind(this);
            var sectionData = {
                "flxOngoingPayments": {
                    "isVisible": false
                },
                "flxUploadingFiles": {
                    "isVisible": false
                },
                "flxPaymentHistory": {
                    "isVisible": true
                },
                "flxViewTemplates": {
                    "isVisible": false
                },
                "btnPHDescription": {
                    "text": kony.i18n.getLocalizedString("kony.mb.CM.description")
                },
                "btnPHDate": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.lblDate")
                },
                "imgSortPHDesc": this.dashboardSortParams.PaymentHistory.Description,
                "imgPHDate": this.dashboardSortParams.PaymentHistory.Date,
                "imgPHStatus": this.dashboardSortParams.PaymentHistory.TotalAmount,
                "btnPHStatus": {
                    "text": kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmount")
                },
                "lblPHActions": {
                    "text": kony.i18n.getLocalizedString("i18n.wireTransfers.Actions")
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgFlxTopSeparator": {
                    "text": "-"
                },
                "flxPHDescription": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.PaymentHistory.Description;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "DESC";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.PaymentHistory.Description = img;
                        this.fetchHistory("description", order);
                    }.bind(this)
                },
                "flxPHStatus": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.PaymentHistory.Status;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "DESC";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.PaymentHistory.Status = img;
                        this.fetchHistory("totalAmount", order);
                    }.bind(this)
                },
                "flxPHDate": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.PaymentHistory.Date;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "DESC";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.PaymentHistory.Date = img;
                        this.fetchHistory("paymentDate", order);
                    }.bind(this)
                },

            };
            var defaultValues = {
                flxDetilsHighlighterMain : {
					"isVisible" : false
				},
                flxMain: {
                    "height": "51dp"
                },
                flxBulkPaymentsViewHeader: {
                    "skin": "bbSKnFlxffffff"
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxBPViewHeader: {
                    "isVisible": true,
                    "skin": "bbSKnFlxffffff"
                },
                flxTopSeperator: {
                    "isVisible": true
                },
                flxBottomSeperator: {
                    "isVisible": true
                },
                flxOngoingPaymentsHeader: {
                    "isVisible": false
                },
                flxOngoingPaymentsDetails: {
                    "isVisible": false
                },
                flxUploadingFilesDetails: {
                    "isVisible": false
                },
                flxUploadingFilesHeader: {
                    "isVisible": false
                },
                flxPaymentHistoryHeader: {
                    "isVisible": true
                },
                flxPaymentHistoryDetails: {
                    "isVisible": true
                },
                flxViewTemplatesHeader: {
                    "isVisible": false
                },
                flxViewTempaltesDetails: {
                    "isVisible": false
                },
                imgDropDown: {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O"
                },
              flxDropDown: {
                "isVisible": true,
                "onClick": function(eventobject, context) {
                  var secIndex = context["sectionIndex"];
                  var rowIndex = context["rowIndex"];
                  var conObj={"section": secIndex, "row": rowIndex, "direction": 1};
                  this.view.TabPaneNew.TabBodyNew.showOrHideDetails(conObj);                  
                  this.adjustScreen(-150);
                  var sknObjectLine = JSON.parse(JSON.stringify(this.view.TabPaneNew.TabBodyNew.getData()[secIndex][1][rowIndex].flxDetilsHighlighterMain));
                  this.setFooterforExp(sknObjectLine);
                }.bind(this)
              },
                flxPhActions: {
                    "onClick": function(eventobject, context) {
                        this.onNavigatetoReviewDetails(eventobject, context);
                    }.bind(this),
					"skin": ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER
                },
                lblPhActions: {
                    "isVisible": true,
                    "text": kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewPayment")
                },
            };
            var rowDataMap = {
                lblPhDate: "paymentDate",
                lblPhDescription: "description",
                lblPhStatus: "totalAmount",
                lblFromAccount: "lblFromAccount",
                lblTotalTransactions: "lblTotalTransactions",
                lblTotalAmount: "lblTotalAmount",
                lblInitiatedBy: "lblInitiatedBy",
                lblPaymentID: "lblPaymentID",
                lblPaymentStatus: "lblPaymentStatus",
                lblFromAccountValue: "fromAccountMasked",
                lblTotalTransactionsValue: "totalTransactions",
                lblTotalAmountValue: "Approver",
                lblInitiatedByValue: "initiatedBy",
                lblPaymentIDValue: "recordId",
                lblPaymentStatusValue: "status",
                flxTopSeperator: "flxTopSeperator",
                flxBottomSeperator: "flxBottomSeperator",
            };

            this.view.TabPaneNew.TabBodyNew.setSectionData([sectionData]);
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
            if (response.length === 0) {
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.showNoBulkPayments(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.noPaymentHistory"));
            } else {
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(response);
                if (response.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
                    response.pop();
                }
                if (this.filterParams.PaymentHistorySearch === ".") {
                    this.view.TabPaneNew.PaginationContainer.isVisible = false;
                }
                this.view.TabPaneNew.TabBodyNew.addDataForSections([response]);
				this.setPaginationtext(kony.i18n.getLocalizedString("i18n.common.transactions"),response.length);
            }
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.SearchPlaceholder");
            FormControllerUtility.hideProgressBar(this.view);
            if(this.fromUploadTab===true){
              var conObj={"section": 0, "row": 0, "direction": 1}
              this.view.TabPaneNew.TabBodyNew.showOrHideDetails(conObj);
              var sknObjectLine = JSON.parse(JSON.stringify(this.view.TabPaneNew.TabBodyNew.getData()[secIndex][1][rowIndex].flxDetilsHighlighterMain));
              this.setFooterforExp(sknObjectLine);
            }
            this.fromUploadTab=false;
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        onNavigatetoReviewDetails: function(eventobject, context) {
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.setVisibility(false);
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            selectedRowData.recordId = kony.sdk.isNullOrUndefined(selectedRowData.recordId.toolTip) ? selectedRowData.recordId : selectedRowData.recordId.toolTip;
            var statusText;
            var btnText;
            if (!(kony.sdk.isNullOrUndefined(selectedRowData.lblPhStatus))) {
                btnText = BBConstants.MAKER_VIEW_PAYMENT_HISTORY;
            } else {
                statusText = selectedRowData.lblOpStatus.toLowerCase();
                if ((statusText === BBConstants.TRANSACTION_STATUS.PENDING_FOR_AUTH.toLowerCase()) 
                    || (statusText === BBConstants.TRANSACTION_STATUS.CANCELLED.toLowerCase()) 
                    || (statusText === BBConstants.TRANSACTION_STATUS.DISCARDED.toLowerCase())
                    || (statusText === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase())
                    || (statusText === BBConstants.TRANSACTION_STATUS.WAITACK.toLowerCase()) 
                    || (statusText === BBConstants.TRANSACTION_STATUS.READY.toLowerCase())
                    || (statusText === BBConstants.TRANSACTION_STATUS.WAITEXEC.toLowerCase())                   
                    || (statusText === BBConstants.TRANSACTION_STATUS.COMPLETED.toLowerCase())
                    || (statusText === BBConstants.TRANSACTION_STATUS.CANCELLEDANDAUTHORIZED.toLowerCase())
                    || (statusText === BBConstants.TRANSACTION_STATUS.PROCESSINGPAYMENTS.toLowerCase()) 
					|| (statusText === BBConstants.TRANSACTION_STATUS.SCHEDULED.toLowerCase())
                    || (statusText === BBConstants.TRANSACTION_STATUS.PENDINGFORAPPROVAL.toLowerCase())) {
                    btnText = BBConstants.MAKER_VIEW_PAYMENT;
                } else {
                    btnText = BBConstants.REVIEW_PAYMENT;
                }
            }
          	
            if(!kony.sdk.isNullOrUndefined(selectedRowData.bulkErrorDetails)&&
               selectedRowData.bulkErrorDetails.length>0)
            {
              btnText = BBConstants.ERROR_PAYMENT;
            }
            var BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
            BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsReview", btnText, selectedRowData);
        },
      
      onNavigatetoReviewDetailsFromUpload: function(context) {
        var selectedData;
        if (!(kony.sdk.isNullOrUndefined(context.fetchHistorySuccess))) {
          selectedData = context.fetchHistorySuccess[0];
        } else if (!(kony.sdk.isNullOrUndefined(context.fetchOnGoingPaymentsSuccess))){
          selectedData = context.fetchOnGoingPaymentsSuccess[0];
        }
        selectedData.activeTab = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles");
        var statusText;
        var btnText;
        if (!(kony.sdk.isNullOrUndefined(context.fetchHistorySuccess))) {
          btnText = BBConstants.MAKER_VIEW_PAYMENT_HISTORY;
          selectedData.recordId = kony.sdk.isNullOrUndefined(selectedData.toolTip) ? selectedData.recordId : selectedData.toolTip;
        } else {
          selectedData.recordId = kony.sdk.isNullOrUndefined(selectedData.recordId.toolTip) ? selectedData.recordId.text : selectedData.recordId.toolTip;
          statusText = selectedData.status.toLowerCase();
          if ((statusText === BBConstants.TRANSACTION_STATUS.PENDING_FOR_AUTH.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.CANCELLED.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.DISCARDED.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.WAITACK.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.READY.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.WAITEXEC.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.COMPLETED.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.CANCELLEDANDAUTHORIZED.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.PROCESSINGPAYMENTS.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.SCHEDULED.toLowerCase()) 
              || (statusText === BBConstants.TRANSACTION_STATUS.PENDINGFORAPPROVAL.toLowerCase())) {
            btnText = BBConstants.MAKER_VIEW_PAYMENT;
          } else {
            btnText = BBConstants.REVIEW_PAYMENT;
          }
        }
        if (!kony.sdk.isNullOrUndefined(selectedData.bulkErrorDetails) && selectedData.bulkErrorDetails.length > 0) {
          btnText = BBConstants.ERROR_PAYMENT;
        }
        var BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "BulkPaymentsUIModule",
          "appName": "BulkPaymentsMA"
        });
        BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsReview", btnText, selectedData);
      },

        showBulkPaymentsDashboardSelectedTab(tabIndex, menuTabName, contentHeaderName) {
            FormControllerUtility.showProgressBar(this.view);
            this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"), contentHeaderName);
            this.view.TabPaneNew.TabsHeaderNew.focusTab(tabIndex);
            this.loadDashboard();
            this.view.forceLayout();
            this.adjustScreen(0);
        },

        setDropdownVisiblilityforUploadStatus: function() {
           var scope=this;
            if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = false;
                return;
            }
			this.view.flxMain.flxContentContainer.clipBounds=false;
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segViewTypes.setVisibility(false);
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllFiles");
			var obj_arr = [];
            obj_arr = [{
               
			"lblCheckFeature" :{
            text :"M",
            skin  :"ICSknLblRadioBtnSelectedFontIcon003e7520px",
            onTouchEnd : scope.checkStatus.bind(this,0),
            },
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL"),
                }
            },
			{
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,1),
			} ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.payments.uploaded"),
                }
            },
		    {
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,2),
			} ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractingPayments"),
                }
            },  {
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,3),
			} ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractionSuccessful"),
                }
            },  {
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,4),
			} ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractionFailed")
                }
            }];
          
           var obj_arr_timeperiod = [];
            obj_arr_timeperiod = [
			{"lblCheckFeature" :{
            text :"M",
            skin  :"ICSknLblRadioBtnSelectedFontIcon003e7520px",
            onTouchEnd : scope.checkTimePeriod.bind(this,0),
			},
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.accounts.lastSixMonths"),
                }
            }, {
                "lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkTimePeriod.bind(this,1),
			},
                "lblFeatureName": {
                    text:  kony.i18n.getLocalizedString("i18n.accounts.lastThreeMonths"),
                }
            }, {
                "lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkTimePeriod.bind(this,2),
			},
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.ImportLC.Today"),
                }
            }];
            if (!this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.clipBounds = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.clipBounds = false;
				this.view.flxFooter.clipBounds = false;
				this.view.flxFooter.customfooter.clipBounds = false;
				this.view.flxFooter.customfooter.flxFooterMenu.clipBounds = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = true;
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(true);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.flxAll.setVisibility(false);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(obj_arr);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(true);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimeperiodBody.segTimePeriod.setData(obj_arr_timeperiod);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyHeader.flxCurrencyTitle.lblCurrencyType.text = kony.i18n.getLocalizedString("i18n.ChequeManagement.Status");
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxProcessingType.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(true);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.setVisibility(true);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "blue_uparrow.png";
				this.setFiltervalues();
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimePeriodHeader.flxTimePeriodHeaderDropdown.flxTimePeriodDropdownImage.imgDropdownTimeperiod.onTouchEnd = function() {
                    this.showOrHideTimePeriod();
                }.bind(this);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyHeader.flxCurrencyExpand.flxDropdownCurrency.lblImageCurrency.onTouchEnd = function() {
                    this.showOrHideStatus();
                }.bind(this);
				this.setFooterTop(515);
		    } else {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxProcessingType.setVisibility(false);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "blue_downarrow.png";
				this.view.forceLayout();
				this.adjustScreen(50);
            }
        },
		
		setDropdownVisiblilityforProcessedRequests: function() {
            var scope = this;
            if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = false;
                return;
            }
            this.view.flxMain.flxContentContainer.clipBounds = false;
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segViewTypes.setVisibility(false);
            var obj_arr_timeperiod = [];
            obj_arr_timeperiod = [{
                "lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkTimePeriod.bind(this,1),
			},
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.konybb.Common.All"),
                }
            },{
                "lblCheckFeature": {
                    text: "M",
                    skin: "ICSknLblRadioBtnSelectedFontIcon003e7520px",
                    onTouchEnd: scope.checkTimePeriod.bind(this, 0),
                },
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.accounts.lastSixMonths"),
                }
            }, {
                "lblCheckFeature": {
                    text: "L",
                    skin: "sknLblOlbFontIconsA0A0A020Px",
                    onTouchEnd: scope.checkTimePeriod.bind(this, 1),
                },
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.accounts.lastThreeMonths"),
                }
            }, {
                "lblCheckFeature": {
                    text: "L",
                    skin: "sknLblOlbFontIconsA0A0A020Px",
                    onTouchEnd: scope.checkTimePeriod.bind(this, 2),
                },
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.ImportLC.Today"),
                }
            }];
            if (!this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.clipBounds = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.clipBounds = false;
                this.view.flxFooter.clipBounds = false;
                this.view.flxFooter.customfooter.clipBounds = false;
                this.view.flxFooter.customfooter.flxFooterMenu.clipBounds = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = true;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.flxAll.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(true);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimeperiodBody.segTimePeriod.setData(obj_arr_timeperiod);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxProcessingType.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(true);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.setVisibility(true);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "blue_uparrow.png";
				this.setFiltervalues();
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimePeriodHeader.flxTimePeriodHeaderDropdown.flxTimePeriodDropdownImage.imgDropdownTimeperiod.onTouchEnd = function() {
                    this.showOrHideTimePeriod();
                }.bind(this);
				//this.setFooterTop(255);
			} else {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxProcessingType.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "blue_downarrow.png";
				this.view.forceLayout();
				this.adjustScreen(50);
            }
        },
        
  	    setDropdownVisiblility: function() {
			var scope=this;
            if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = false;
                return;
            }
			this.view.flxMain.flxContentContainer.clipBounds=false;
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segViewTypes.setVisibility(false);
			
            var obj_arr = [];
            obj_arr = [{
               
			"lblCheckFeature" :{
            text :"M",
            skin  :"ICSknLblRadioBtnSelectedFontIcon003e7520px",
            onTouchEnd : scope.checkStatus.bind(this,0),
          } ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.konybb.Common.All"),
                }
            },
			{
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,1),
			} ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.payments.readyForReview"),
                }
            },
		    {
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,2),
			} ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.Search.Cancelled"),
                }
            },  {
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,3),
			} ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.payments.rejectedByApprover"),
                }
            },  {
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,4),
			} ,
                "lblFeatureName": {
                    text:  kony.i18n.getLocalizedString("i18n.konybb.approver.PendingForApproval"),
                }
            },  {
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,5),
			} ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.payments.processingPayments"),
                }
            },  {
			"lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkStatus.bind(this,5),
			} ,
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("kony.mb.transfers.Scheduled"),
                }
            }];
          
		  var obj_arr_processingtype = [];
            obj_arr_processingtype = [{
                "lblCheckFeature" :{
            text :"M",
            skin  :"ICSknLblRadioBtnSelectedFontIcon003e7520px",
            onTouchEnd : scope.checkProcessingType.bind(this,0),
            },
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL"),
                }
            }, {
                "lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkProcessingType.bind(this,1),
			} ,
                "lblFeatureName": {
                    text:  kony.i18n.getLocalizedString("i18n.kony.BulkPayments.batchModeSingle"),
                }
            }, {
                "lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkProcessingType.bind(this,2),
			},
                "lblFeatureName": {
                    text: kony.i18n.getLocalizedString("i18n.kony.BulkPayments.batchModeMulti"),
                }
            }];
            
			/* var obj_arr_timeperiod = [];
            obj_arr_timeperiod = [
			{
                "lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkTimePeriod.bind(this,1),
			},
                "lblFeatureName": {
                    text: "All",
                }
            },
			{"lblCheckFeature" :{
            text :"M",
            skin  :"ICSknLblRadioBtnSelectedFontIcon003e7520px",
            onTouchEnd : scope.checkTimePeriod.bind(this,0),
			},
                "lblFeatureName": {
                    text: "Last 6 Months",
                }
            }, {
                "lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkTimePeriod.bind(this,1),
			},
                "lblFeatureName": {
                    text: "Last 3 Months",
                }
            }, {
                "lblCheckFeature" :{
				text :"L",
				skin  :"sknLblOlbFontIconsA0A0A020Px",
				onTouchEnd : scope.checkTimePeriod.bind(this,2),
			},
                "lblFeatureName": {
                    text: "Today",
                }
            }]; */
           
		   if (!this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.clipBounds = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.clipBounds = false;
				this.view.flxFooter.clipBounds = false;
				this.view.flxFooter.customfooter.clipBounds = false;
				this.view.flxFooter.customfooter.flxFooterMenu.clipBounds = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = true;
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(true);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.flxAll.setVisibility(false);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(obj_arr);
				/* this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(true);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimeperiodBody.segTimePeriod.setData(obj_arr_timeperiod); */
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxProcessingType.setVisibility(true);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxprocessingTypeBody.segProcessingType.setData(obj_arr_processingtype);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxprocessingTypeHeader.flxProcessingTypeHeaderContent.lblProcessingTypeContent.text = kony.i18n.getLocalizedString("i18n.payments.processingType");
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyHeader.flxCurrencyTitle.lblCurrencyType.text=  kony.i18n.getLocalizedString("kony.mb.achfiledetail.status");
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(true);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.setVisibility(true);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "blue_uparrow.png";
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
                this.setFiltervalues();
				/* this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimePeriodHeader.flxTimePeriodHeaderDropdown.flxTimePeriodDropdownImage.imgDropdownTimeperiod.onTouchEnd = function() {
                   this.showOrHideTimePeriod();
                }.bind(this); */
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyHeader.flxCurrencyExpand.flxDropdownCurrency.lblImageCurrency.onTouchEnd = function() {
                    this.showOrHideStatus();
                }.bind(this);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxprocessingTypeHeader.flxProcessingTypeHeaderDropdown.flxProcessingTypeDropdownImage.imgDropdownprocessingType.onTouchEnd = function() {
                    this.showOrHideProcessingType();
                }.bind(this);
				this.setFooterTop(515);
            } else {
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxProcessingType.setVisibility(false);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
				//this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
				this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "blue_downarrow.png";
				this.view.forceLayout();
				this.adjustScreen(50);
            }
        },
		
        segViewTypesRowClick: function(lblvalue) {
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = lblvalue;
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
            this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "blue_uparrow.png";
            
               if (lblvalue !== kony.i18n.getLocalizedString("i18n.konybb.Common.All")) {
                this.fetchParams.filterByParam = "status";
                if (lblvalue == kony.i18n.getLocalizedString("i18n.payments.readyForReview")) {
                    this.fetchParams.filterByValue = "CREATED";
					this.filterParams.OngoingPayments = ".";
					this.filterParams.UploadedFiles = "";
                }
                if (lblvalue == kony.i18n.getLocalizedString("i18n.Transfers.Cancelled")) {
                    this.fetchParams.filterByValue = "CANCELLED";
					this.filterParams.OngoingPayments = ".";
					this.filterParams.UploadedFiles = "";
                }
                if (lblvalue == kony.i18n.getLocalizedString("i18n.payments.cancelledAndAuthorisation")) {
                    this.fetchParams.filterByValue = "DISCARDED";
					this.filterParams.OngoingPayments = ".";
					this.filterParams.UploadedFiles = "";
                }
                if (lblvalue == kony.i18n.getLocalizedString("i18n.payments.rejectedByApprover")) {
                    this.fetchParams.filterByValue = "REJECTED";
					this.filterParams.OngoingPayments = ".";
					this.filterParams.UploadedFiles = "";
                }
                if (lblvalue == kony.i18n.getLocalizedString("i18n.payments.processingPayments")) {
                    this.fetchParams.filterByValue = "WAITEXECWAITACKPROCESSED";
					this.filterParams.OngoingPayments = ".";
					this.filterParams.UploadedFiles = "";
                }
				if (lblvalue == kony.i18n.getLocalizedString("i18n.konybb.approver.PendingForApproval")) {
                    this.fetchParams.filterByValue = "READY";
					this.filterParams.OngoingPayments = ".";
					this.filterParams.UploadedFiles = "";
                }
                if (lblvalue ==  kony.i18n.getLocalizedString("i18n.common.completed")) {
                    this.fetchParams.filterByValue = "COMPLETED";
                	this.filterParams.OngoingPayments = ".";
					this.filterParams.UploadedFiles = "";
				}
                if (lblvalue == kony.i18n.getLocalizedString("i18n.Search.Cancelled")) {
                    this.fetchParams.filterByValue = "CANCELLED";
                }
                if (lblvalue ==  kony.i18n.getLocalizedString("i18n.payments.cancelledAndAuthorisation")) {
                    this.fetchParams.filterByValue = "DISCARDED";
                }
                if (lblvalue == kony.i18n.getLocalizedString("i18n.payments.rejectedByApprover")) {
                    this.fetchParams.filterByValue = "REJECTED";
                }
                if (lblvalue == kony.i18n.getLocalizedString("i18n.payments.processingPayments")) {
                    this.fetchParams.filterByValue = "WAITEXECWAITACKPROCESSED";
                }
				if (lblvalue == kony.i18n.getLocalizedString("i18n.konybb.approver.PendingForApproval")) {
                    this.fetchParams.filterByValue = "READY";
                }
                if (lblvalue == kony.i18n.getLocalizedString("i18n.common.completed")) {
                    this.fetchParams.filterByValue = "COMPLETED";
                }
                
				if (lblvalue == kony.i18n.getLocalizedString("i18n.payments.uploaded")) {
                    this.fetchParams.filterByValue = "UPLOADED";
					this.filterParams.UploadedFiles = ".";
					this.filterParams.OngoingPayments = "";
                }
                if (lblvalue == "Extracting Details") {
                    this.fetchParams.filterByValue = "PROCESSING";
					this.filterParams.UploadedFiles = ".";
					this.filterParams.OngoingPayments = "";
                }
                if (lblvalue == "Request Created") {
                    this.fetchParams.filterByValue = "PROCESSED";
					this.filterParams.UploadedFiles = ".";
					this.filterParams.OngoingPayments = "";
                }
                if (lblvalue == kony.i18n.getLocalizedString(kony.i18n.bulkpayments.extractionFailed)) {
                    this.fetchParams.filterByValue = "ERROR.IN.PROCESSING";
					this.filterParams.UploadedFiles = ".";
					this.filterParams.OngoingPayments = "";
                }
               
            } else {
                this.fetchParams.filterByParam = "";
                this.fetchParams.filterByValue = "";
            }
			if(this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")){
           		 this.invokeonGoingPayments();
			}
			else if(this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")){
				this.invokeUploadFiles();
			}
        },

        setPaginationComponentForOngoingPayments: function(pageHeader) {
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(pageHeader);
            this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
            this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchOngoingPayments);
            this.view.TabPaneNew.PaginationContainer.setIntervalHeaderForBulkpayments();
        },

        setPaginationComponentForUploadedFiles: function(pageHeader) {
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(pageHeader);
            this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
            this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchUploadedFiles);
            this.view.TabPaneNew.PaginationContainer.setIntervalHeaderForBulkpayments();
        },

        setPaginationComponentForPaymentHistory: function(pageHeader) {
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(pageHeader);
            this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
            this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchHistory);
            this.view.TabPaneNew.PaginationContainer.setIntervalHeaderForBulkpayments();
        },

        setPaginationComponentForViewTemplates: function(pageHeader) {
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(pageHeader);
            this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
            this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.viewTemplates);
            this.view.TabPaneNew.PaginationContainer.setIntervalHeaderForBulkpayments();
        },

        setupPermissionBasedView: function() {
			this.view.TabPaneNew.TabsHeaderNew.btnTab1.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentFilesViewPermissionsList());
            this.view.TabPaneNew.TabsHeaderNew.btnTab2.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentRequestViewPermissionsList());
            this.view.TabPaneNew.TabsHeaderNew.btnTab3.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentRequestViewPermissionsList());
            this.view.TabPaneNew.TabsHeaderNew.btnTab4.isVisible = this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getBulkPaymentTemplateViewPermissionsList());
        },

        fetchOngoingPayments: function(sortParam, sortOrder) {
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = function() {
                this.fetchParams.pageSize = "";
                this.fetchParams.pageOffset = "";
                this.filterParams.OngoingPaymentSearch = ".";
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.invokeonGoingPayments();
            }.bind(this);
            this.updateFetchParams(sortParam, sortOrder);
			if(this.fetchParams.timeParam != "paymentDate")
			{
				this.fetchParams.timeParam = "paymentDate";
				this.fetchParams.timeValue = "";
			}
            this.bulkPaymentsModule.presentationController.fetchOnGoingPayments(this.fetchParams);
        },

        fetchUploadedFiles: function(sortParam, sortOrder) {
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = function() {
                this.fetchParams.pageSize = "";
                this.fetchParams.pageOffset = "";
                this.filterParams.UploadingFilesSearch = ".";
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.invokeUploadFiles();
            }.bind(this);
            this.updateFetchParams(sortParam, sortOrder);
			if(this.fetchParams.timeParam != "uploadedDate")
			{
				this.fetchParams.timeParam = "uploadedDate";
				this.fetchParams.timeValue = "6,MONTH";
			}
            this.bulkPaymentsModule.presentationController.fetchUploadedFiles(this.fetchParams);
        },

        fetchHistory: function(sortParam, sortOrder) {
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = function() {
                this.fetchParams.pageSize = "";
                this.fetchParams.pageOffset = "";
                this.filterParams.PaymentHistorySearch = ".";
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.invokePaymentHistory();
            }.bind(this);
            this.updateFetchParams(sortParam, sortOrder);
			if(this.fetchParams.timeParam != "paymentDate")
			{
				this.fetchParams.timeParam = "paymentDate";
				this.fetchParams.timeValue = "";
			}
            this.bulkPaymentsModule.presentationController.fetchHistory(this.fetchParams);
        },

        viewTemplates: function(sortParam, sortOrder) {
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = function() {
                this.fetchParams.pageSize = "";
                this.fetchParams.pageOffset = "";
                this.filterParams.ViewTemplatesSearch = ".";
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.invokeViewTemplates();
            }.bind(this);
            this.updateFetchParams(sortParam, sortOrder);
			this.fetchParams.timeParam="";
			this.fetchParams.timeValue="";
            this.bulkPaymentsModule.presentationController.viewTemplates(this.fetchParams);
        },

        updateFetchParams: function(sortParam, sortOrder) {
            this.fetchParams.searchString = CommonUtilities.validateSearchString(this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text);
            if (!kony.sdk.isNullOrUndefined(sortParam))
                this.fetchParams.sortByParam = sortParam;
            if (!kony.sdk.isNullOrUndefined(sortOrder))
                this.fetchParams.sortOrder = sortOrder;
            if (!((this.filterParams.OngoingPaymentSearch === ".") || (this.filterParams.UploadingFilesSearch === ".") || (this.filterParams.paymentHistorySearch === ".") || (this.filterParams.ViewTemplatesSearch === "."))) {
                this.fetchParams.pageSize = this.view.TabPaneNew.PaginationContainer.getPageSize() + 1;
                this.fetchParams.pageOffset = this.view.TabPaneNew.PaginationContainer.getPageOffset();
            }
            if (!(this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")) && (this.filterParams.OngoingPayments === ".")) {
                this.fetchParams.filterByParam = "";
                this.fetchParams.filterByValue = "";
            }
            if (!(this.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")) && (this.filterParams.UploadedFiles === ".")) {
                this.fetchParams.filterByParam = "";
                this.fetchParams.filterByValue = "";
            }
        },

        showServerErrorMessage: function(context) {
            if (context.show) {
                this.view.flxMainWrapper.setVisibility(true);
                this.view.lblDowntimeWarning.text = context.errorMessage || kony.i18n.getLocalizedString(context.errMsgi18nKey || "i18n.common.OoopsServerError");
                this.view.flxDowntimeWarning.setFocus();
            } else {
                this.view.flxMainWrapper.setVisibility(false);
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.adjustScreen(30);
        },

        updatePaginationContainerUI: function(responseData) {
            var isMaxLimitReached = responseData.length <= this.view.TabPaneNew.PaginationContainer.getPageSize();
            this.view.TabPaneNew.PaginationContainer.setIsMaxLimitReached(isMaxLimitReached);
            this.view.TabPaneNew.PaginationContainer.updateUI();
        },

        showNoBulkPayments: function(msgText) {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var NODATAFLEXHEIGHT = "450dp";
            var defValues = {
                flxMain: {
                    "height": NODATAFLEXHEIGHT
                },
                flxBPViewHeader: {
                    "isVisible": false
                },
                flxBPTemplateDetails: {
                    "isVisible": false
                },
                flxNoRecords: {
                    "isVisible": true
                }
            };
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabPaneNew.TabBodyNew.addRowsData([
                [{
                    "lblMsg": msgText
                }]
            ]);
        },

        setUpViewTemplatesview: function(response) {
            FormControllerUtility.showProgressBar(this.view);
            this.view.TabPaneNew.TabSearchBarNew.flxSearch.width = "99%";
            this.view.TabPaneNew.TabSearchBarNew.flxDropDown.isVisible = false;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
            this.view.TabPaneNew.setSearchData([
                ["lblDefaultFromAccountValue", "lblProcessingModeValue", "lblVTTemplateName"]
            ]);
            this.view.dbRightContainerNew.flxActions.isVisible = true;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = function() {
                this.fetchParams.pageSize = "";
                this.fetchParams.pageOffset = "";
                this.filterParams.ViewTemplatesSearch = ".";
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.invokeViewTemplates();
            }.bind(this);
            this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
                this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
                this.hideOrShowCloseIcon();
                this.invokeViewTemplates();
            }.bind(this);
            var sectionData = {
                "flxOngoingPayments": {
                    "isVisible": false
                },
                "flxUploadingFiles": {
                    "isVisible": false
                },
                "flxPaymentHistory": {
                    "isVisible": false
                },
                "flxViewTemplates": {
                    "isVisible": true
                },
                "btnTemplateName": {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.ach.TemplateName")
                },

                "imgSortTemplate": this.dashboardSortParams.ViewTemplates.TemplateName,
                "imgCreatedBy": this.dashboardSortParams.ViewTemplates.CreatedBy,

                "btnCreatedBy": {
                    "text": kony.i18n.getLocalizedString("i18n.AccountsDetails.Createdby")
                },

                "btnCreatedOn": {
                    "text": kony.i18n.getLocalizedString("i18n.AccountsDetails.Createdon")
                },

                "lblVTActions": {
                    "text": kony.i18n.getLocalizedString("i18n.wireTransfers.Actions")
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgFlxTopSeparator": {
                    "text": "-"
                },
                "flxTemplateName": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ViewTemplates.TemplateName;
                        if (img === ViewConstants.IMAGES.SORT_FINAL_IMAGE) {
                            img = ViewConstants.IMAGES.SORT_NEXT_IMAGE;
                            var order = "DESC";
                        } else {
                            img = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? ViewConstants.IMAGES.SORT_PREV_IMAGE : ViewConstants.IMAGES.SORT_NEXT_IMAGE;
                            var order = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.ViewTemplates.TemplateName = img;
                        this.viewTemplates("templateName", order);
                    }.bind(this)
                },
                "flxCreatedBy": {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.ViewTemplates.CreatedBy;
                        if (img === ViewConstants.IMAGES.SORT_FINAL_IMAGE) {
                            img = ViewConstants.IMAGES.SORT_NEXT_IMAGE;
                            var order = "DESC";
                        } else {
                            img = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? ViewConstants.IMAGES.SORT_PREV_IMAGE : ViewConstants.IMAGES.SORT_NEXT_IMAGE;
                            var order = (img === ViewConstants.IMAGES.SORT_NEXT_IMAGE) ? "DESC" : "ASC";
                        }
                        this.dashboardSortParams.ViewTemplates.CreatedBy = img;
                        this.viewTemplates("createdby", order);
                    }.bind(this)
                },
            };

            var defaultValues = {
                flxDetilsHighlighterMain : {
					"isVisible" : false
				},
                flxMain: {
                    "height": "51dp"
                },
                flxBulkPaymentsViewHeader: {
                    "skin": ViewConstants.SKINS.BULKPAYMENTS_HEADER_SKIN
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxBPViewHeader: {
                    "isVisible": true,
                    "skin": ViewConstants.SKINS.BULKPAYMENTS_HEADER_SKIN
                },               
                flxBottomSeperator: {
                    "isVisible": true,
                    "bottom":"75dp",
                },
                flxOngoingPaymentsHeader: {
                    "isVisible": false
                },
                flxOngoingPaymentsDetails: {
                    "isVisible": false
                },
                flxUploadingFilesDetails: {
                    "isVisible": false
                },
                flxUploadingFilesHeader: {
                    "isVisible": false
                },
                flxPaymentHistoryHeader: {
                    "isVisible": false
                },
                flxPaymentHistoryDetails: {
                    "isVisible": false
                },
                flxViewTemplatesHeader: {
                    "isVisible": true
                },
                flxViewTempaltesDetails: {
                    "isVisible": true
                },
                imgDropDown: {
                    "skin": ViewConstants.SKINS.DRP_DWN_OTHER,
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN
                },
                flxDropDown: {
                  "isVisible": true,
                  "onClick": function(eventobject, context) {
                    var secIndex = context["sectionIndex"];
                    var rowIndex = context["rowIndex"];
                    var conObj={"section": secIndex, "row": rowIndex, "direction": 1};
                    this.view.TabPaneNew.TabBodyNew.showOrHideDetails(conObj);
                    var sknObjectLine = JSON.parse(JSON.stringify(this.view.TabPaneNew.TabBodyNew.getData()[secIndex][1][rowIndex].flxDetilsHighlighterMain));
                    this.setFooterforExp(sknObjectLine);
                  }.bind(this)
                },
                btnVTActions: {
                    "text": kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest"),
                    "onClick": function(eventobject, context) {
                        this.onNavigatetoCreateBulkRequest(eventobject, context);
                    }.bind(this)
                },
                btnDelete: {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
                    "onClick": function(eventobject, context) {
                        this.onClickDeleteBulkPaymentTemplate(eventobject, context);
                    }.bind(this)
                },
                btnEdit: {
                    "text": kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewOrEditTemplate"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewOrEditTemplate"),
                    "onClick": function(eventobject, context) {
                        this.onClickViewBulkPaymentTemplate(eventobject, context);
                    }.bind(this)
                },
                btnView: {
                    "isVisible": false,
                    "text": kony.i18n.getLocalizedString("i18n.bulkWire.viewactivity"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.bulkWire.viewactivity"),
                    "onClick": function(eventobject, context) {

                    }.bind(this)
                },
            };

            var rowDataMap = {
                lblVTTemplateName: "lblVTTemplateName",
                lblVTCreatedBy: "lblVTCreatedBy",
                lblVTCreatedOn: "lblVTCreatedOn",
                lblDefaultFromAccount: "lblDefaultFromAccount",
                lblProcessingMode: "lblProcessingMode",
                lblTotalBeneficiaries: "lblTotalBeneficiaries",
                lblVTTotalAmount: "lblVTTotalAmount",
                lblDefaultFromAccountValue: "lblDefaultFromAccountValue",
                lblProcessingModeValue: "lblProcessingModeValue",
                lblTotalBeneficiariesValue: "lblTotalBeneficiariesValue",
                lblVTTotalAmountValue: "lblVTTotalAmountValue",
                flxTopSeperator: "flxTopSeperator",
                flxBottomSeperator: "flxBottomSeperator",
                lblVTActions: "lblVTActions",
                btnVTActions: "btnVTActions",
                lblDefaultFromAccountIcon: "lblDefaultFromAccountIcon",
                lblDefaultCurrency: "lblDefaultCurrency",
                lblDefaultCurrencyValue: "lblDefaultCurrencyValue",
                btnDelete: "btnDelete",
                flxDelete: "flxDelete",
                btnEdit: "btnEdit",
                flxEdit: "flxEdit"
            };

            this.view.TabPaneNew.TabBodyNew.setSectionData([sectionData]);
            this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
            this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
            if (response.length === 0) {
                this.view.TabPaneNew.PaginationContainer.isVisible = false;
                this.showNoBulkPayments(kony.i18n.getLocalizedString("i18n.BulkWires.NoTemplates"));
            } else {
                //this.view.TabPaneNew.TabBodyNew.setData(response);
                this.view.TabPaneNew.PaginationContainer.isVisible = true;
                this.updatePaginationContainerUI(response);
                if (response.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
                    response.pop();
                }
                if (this.filterParams.ViewTemplatesSearch === ".") {
                    this.view.TabPaneNew.PaginationContainer.isVisible = false;
                }
                this.view.TabPaneNew.TabBodyNew.addDataForSections([response]);
				this.setPaginationtext(kony.i18n.getLocalizedString("i18n.BulkWires.Templates"),response.length);
            }
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.SearchPlaceholder");
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.adjustScreen(50);
        },

        onNavigatetoCreateBulkRequest: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            var BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
            BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsTemplate", BBConstants.BULKPAYMENTS_CREATE_BULK_REQUEST, selectedRowData);
        },

        onClickDeleteBulkPaymentTemplate: function(eventObject, context) {
            var rowIndex = context.rowIndex;
            var sectionIndex = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[sectionIndex][1][rowIndex];
            this.showDeleteTemplatePopUp(selectedRowData);
        },

        showDeleteTemplatePopUp: function(selectedRowData) {
            this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.bulkWire.deleteTemplate");
            this.showPopUp(kony.i18n.getLocalizedString("i18n.ACH.DeleteTemplateAlertMessage"),
                this.initiateDeleteBulkPaymentTemplate.bind(this, selectedRowData));
        },
      
        showWarningForExtractingPayments: function(selectedRowData) {
          this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("kony.i18n.bulkpayments.paymentUpdate");
          this.showPopUpMessage(kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractingMessage"), this.initiateDeleteBulkPaymentTemplate.bind(this, selectedRowData));
        },
      
        showPopUpMessage: function(popUpMessage, handleOnYesClick) {
          var scope = this;
          scope.view.flxCancelPopup.height = scope.view.flxHeaderMain.info.frame.height + scope.view.flxMain.info.frame.height + scope.view.flxFooter.info.frame.height + 250;
          FormControllerUtility.scrollToCenterY(scope.view.flxCancelPopup.height);
          scope.view.PopupHeaderUM.lblPopupMessage.text = popUpMessage;
          scope.view.PopupHeaderUM.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
          scope.view.PopupHeaderUM.btnNo.text = kony.i18n.getLocalizedString("i18n.savingsPot.ok");
          scope.view.PopupHeaderUM.flxCross.onClick = this.closePopUp.bind(this);
          scope.view.PopupHeaderUM.btnNo.onClick = this.closePopUp.bind(this);
          scope.view.PopupHeaderUM.btnYes.onClick = handleOnYesClick;
          scope.view.PopupHeaderUM.btnYes.skin=ViewConstants.SKINS.CANCEL;
          scope.view.PopupHeaderUM.btnNo.setVisibility(false);
          scope.view.flxCancelPopup.setVisibility(true);
          scope.adjustScreen(30);
        },

        showPopUp: function(popUpMessage, handleOnYesClick) {
            var scope = this;
            scope.view.flxCancelPopup.height = scope.view.flxHeaderMain.info.frame.height + scope.view.flxMain.info.frame.height + scope.view.flxFooter.info.frame.height + 250;
            FormControllerUtility.scrollToCenterY(scope.view.flxCancelPopup.height);
            scope.view.PopupHeaderUM.lblPopupMessage.text = popUpMessage;
            scope.view.PopupHeaderUM.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
            scope.view.PopupHeaderUM.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
            scope.view.PopupHeaderUM.flxCross.onClick = this.closePopUp.bind(this);
            scope.view.PopupHeaderUM.btnNo.onClick = this.closePopUp.bind(this);
            scope.view.PopupHeaderUM.btnYes.onClick = handleOnYesClick;
            scope.view.flxCancelPopup.setVisibility(true);
            scope.adjustScreen(30);
        },

        initiateDeleteBulkPaymentTemplate: function(selectedRowData) {
            var scope = this;
            scope.closePopUp(this);
            scope.bulkPaymentsModule.presentationController.deleteBulkPaymentTemplate(selectedRowData.templateId);
        },

        closePopUp: function() {
            this.view.flxCancelPopup.setVisibility(false);
            this.adjustScreen(30);
        },

        onClickViewBulkPaymentTemplate: function(eventobject, context) {
            var rowIndex = context.rowIndex;
            var sectionIndex = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[sectionIndex][1][rowIndex];
            var BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
            FormControllerUtility.showProgressBar(this.view);
            BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsTemplate", BBConstants.BULKPAYMENT_VIEW_TEMPLATES, selectedRowData);
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
		
		setPaginationtext: function(pageHeader,upperlimit) {
            this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.TabPaneNew.PaginationContainer.setPageHeader(pageHeader);
            this.view.TabPaneNew.PaginationContainer.setPaginationText(upperlimit+this.fetchParams.pageOffset);
        },
		
		applyFilterForHistory: function() {
            var scopeObj = this;
			if (!(scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory"))){
            var segData = scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segCurrency.data;
            segData.forEach(function(data) {
                if (data.lblCheckFeature.text === "M" && data.lblCheckFeature.skin === "ICSknLblRadioBtnSelectedFontIcon003e7520px") {
                    if (data.lblFeatureName !== kony.i18n.getLocalizedString("i18n.konybb.Common.All")) {
                        scopeObj.fetchParams.filterByParam = "status";
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.payments.readyForReview")) {
                            scopeObj.fetchParams.filterByValue = "CREATED";
                            scopeObj.filterParams.OngoingPayments = ".";
                            scopeObj.filterParams.UploadedFiles = "";
                            scopeObj.dashboardFilterParams.ReviewFilter.Status = data.lblFeatureName.text;
                        }
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.Search.Cancelled")) {
                            scopeObj.fetchParams.filterByValue = "DISCARDEDCANCELWAREHOUSE";
                            scopeObj.filterParams.OngoingPayments = ".";
                            scopeObj.filterParams.UploadedFiles = "";
                            scopeObj.dashboardFilterParams.ReviewFilter.Status = data.lblFeatureName.text;
                        }
						if (data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.Search.Scheduled")) {
                            scopeObj.fetchParams.filterByValue = "WAREHOUSED";
                            scopeObj.filterParams.OngoingPayments = ".";
                            scopeObj.filterParams.UploadedFiles = "";
                            scopeObj.dashboardFilterParams.ReviewFilter.Status = data.lblFeatureName.text;
                        }
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.payments.rejectedByApprover")) {
                            scopeObj.fetchParams.filterByValue = "REJECTED";
                            scopeObj.filterParams.OngoingPayments = ".";
                            scopeObj.filterParams.UploadedFiles = "";
                            scopeObj.dashboardFilterParams.ReviewFilter.Status = data.lblFeatureName.text;
                        }
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.payments.processingPayments")) {
                            scopeObj.fetchParams.filterByValue = "WAITEXECWAITACKPROCESSED";
                            scopeObj.filterParams.OngoingPayments = ".";
                            scopeObj.filterParams.UploadedFiles = "";
                            scopeObj.dashboardFilterParams.ReviewFilter.Status = data.lblFeatureName.text;
                        }
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.konybb.approver.PendingForApproval")) {
                            scopeObj.fetchParams.filterByValue = "READYPENDING";
                            scopeObj.filterParams.OngoingPayments = ".";
                            scopeObj.filterParams.UploadedFiles = "";
                            scopeObj.dashboardFilterParams.ReviewFilter.Status = data.lblFeatureName.text;
                        }
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.Search.Completed")) {
                            scopeObj.fetchParams.filterByValue = "COMPLETED";
                            scopeObj.filterParams.OngoingPayments = ".";
                            scopeObj.filterParams.UploadedFiles = "";
                            scopeObj.dashboardFilterParams.ReviewFilter.Status = data.lblFeatureName.text;
                        }
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.payments.uploaded")) {
                            scopeObj.fetchParams.filterByValue = "UPLOADED";
                            scopeObj.filterParams.UploadedFiles = ".";
                            scopeObj.filterParams.OngoingPayments = "";
                            scopeObj.dashboardFilterParams.UploadFilter.Status = data.lblFeatureName.text;
                        }
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractingPayments")) {
                            scopeObj.fetchParams.filterByValue = "PROCESSING";
                            scopeObj.filterParams.UploadedFiles = ".";
                            scopeObj.filterParams.OngoingPayments = "";
                            scopeObj.dashboardFilterParams.UploadFilter.Status = data.lblFeatureName.text;
                        }
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractionSuccessful")) {
                            scopeObj.fetchParams.filterByValue = "PROCESSED";
                            scopeObj.filterParams.UploadedFiles = ".";
                            scopeObj.filterParams.OngoingPayments = "";
                            scopeObj.dashboardFilterParams.UploadFilter.Status = data.lblFeatureName.text;
                        }
                        if (data.lblFeatureName.text == kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractionFailed")) {
                            scopeObj.fetchParams.filterByValue = "ERROR.IN.PROCESSING";
                            scopeObj.filterParams.UploadedFiles = ".";
                            scopeObj.filterParams.OngoingPayments = "";
                            scopeObj.dashboardFilterParams.UploadFilter.Status = data.lblFeatureName.text;
                        }
                    } else {
                        scopeObj.fetchParams.filterByParam = "";
                        scopeObj.fetchParams.filterByValue = "";
                    }
					if((data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.konybb.Common.All")) && (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")))
					{
						scopeObj.fetchParams.filterByValue ="";
						scopeObj.filterParams.UploadedFiles = "";
                        scopeObj.filterParams.OngoingPayments = ".";
						scopeObj.dashboardFilterParams.ReviewFilter.Status = data.lblFeatureName.text;
					}
					if((data.lblFeatureName.text == kony.i18n.getLocalizedString("i18n.konybb.Common.All")) && (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")))
					{
						scopeObj.fetchParams.filterByValue ="";
						scopeObj.filterParams.UploadedFiles = ".";
                        scopeObj.filterParams.OngoingPayments = "";
						scopeObj.dashboardFilterParams.UploadFilter.Status = data.lblFeatureName.text;
					}
                }
            });
			}
			if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")) {
            var segData = this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.data;
            segData.forEach(function(data) {
                if (data.lblCheckFeature.text === "M" && data.lblCheckFeature.skin === "ICSknLblRadioBtnSelectedFontIcon003e7520px") {
                    if (data.lblFeatureName.text === kony.i18n.getLocalizedString("i18n.accounts.lastSixMonths")) {
                        scopeObj.fetchParams.timeValue = "6,MONTH";
                    } else if (data.lblFeatureName.text === kony.i18n.getLocalizedString("i18n.accounts.lastThreeMonths")) {
                        scopeObj.fetchParams.timeValue = "3,MONTH";
                    } else if (data.lblFeatureName.text === kony.i18n.getLocalizedString("i18n.ImportLC.Today")) {
                        scopeObj.fetchParams.timeValue = "0,DAY";
                    } else if (data.lblFeatureName.text === kony.i18n.getLocalizedString("i18n.konybb.Common.All")) {
                        scopeObj.fetchParams.timeValue = "";
                    }
                    if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")) {
                        scopeObj.dashboardFilterParams.ReviewFilter.TimePeriod = data.lblFeatureName.text;
                    } else if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")) {
                        scopeObj.dashboardFilterParams.UploadFilter.TimePeriod = data.lblFeatureName.text;
                    } else if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory")) {
                        scopeObj.dashboardFilterParams.HistoryFilter.TimePeriod = data.lblFeatureName.text;
                    }
                }
            });
			}
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
           // scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "blue_uparrow.png";

            if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")) {
                var segData = this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segProcessingType.data;
                segData.forEach(function(data) {
                    if (data.lblCheckFeature.text === "M" && data.lblCheckFeature.skin === "ICSknLblRadioBtnSelectedFontIcon003e7520px") {
                        if (data.lblFeatureName.text === kony.i18n.getLocalizedString("i18n.konybb.Common.All")) {
                            scopeObj.fetchParams.batchMode = "SINGLE-PO MULTI-PO";
                        } else if (data.lblFeatureName.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.batchModeSingle")) {
                            scopeObj.fetchParams.batchMode = "SINGLE-PO";
                        } else if (data.lblFeatureName.text === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.batchModeMulti")) {
                            scopeObj.fetchParams.batchMode = "MULTI-PO";
                        }
                        scopeObj.dashboardFilterParams.ReviewFilter.ProcessingMode = data.lblFeatureName.text;
                }});
                scopeObj.fetchParams.timeParam = "paymentDate";
                scopeObj.invokeonGoingPayments();
				
            } else if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")) {
                scopeObj.fetchParams.timeParam = "uploadedDate";
                scopeObj.invokeUploadFiles();
			} else if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory")) {
				scopeObj.fetchParams.timeParam = "paymentDate";
                scopeObj.invokePaymentHistory();
            }
			this.setFilterCount();
        },
      
        setFiltervalues: function() {
			var scopeObj = this;
            if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")) {
                if (scopeObj.dashboardFilterParams.ReviewFilter.TimePeriod !== "") {
                    var timePeriodData = scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.data;
                    timePeriodData.forEach(function(item) {
                        if (item.lblFeatureName.text === scopeObj.dashboardFilterParams.ReviewFilter.TimePeriod) {
                            item.lblCheckFeature.text = "M";
                            item.lblCheckFeature.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
						} else {
                            item.lblCheckFeature.text = "L";
                            item.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A020Px";
						}
						item.lblFeatureName.onTouchEnd=scopeObj.checkTimePeriod.bind(this);
                        
                    });
                    scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.setData(timePeriodData);
                }
                if (scopeObj.dashboardFilterParams.ReviewFilter.Status !== "") {
                    var statusData = scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segCurrency.data;
                    statusData.forEach(function(item) {
                        if (item.lblFeatureName.text === scopeObj.dashboardFilterParams.ReviewFilter.Status) {
                            item.lblCheckFeature.text = "M";
                            item.lblCheckFeature.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
					    } else {
                            item.lblCheckFeature.text = "L";
                            item.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A020Px";
					    }
						item.lblFeatureName.onTouchEnd=scopeObj.checkStatus.bind(this);
                    });
                    scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segCurrency.setData(statusData);
                }
                if (scopeObj.dashboardFilterParams.ReviewFilter.ProcessingMode !== "") {
                    var processingModeData = scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segProcessingType.data;
                    processingModeData.forEach(function(item) {
                        if (item.lblFeatureName.text === scopeObj.dashboardFilterParams.ReviewFilter.ProcessingMode) {
                            item.lblCheckFeature.text = "M";
                            item.lblCheckFeature.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
					    } else {
                            item.lblCheckFeature.text = "L";
                            item.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A020Px";
					    }
						item.lblFeatureName.onTouchEnd=scopeObj.checkProcessingType.bind(this);
                    });
                    scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segProcessingType.setData(processingModeData);
                }
            } else if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")) {
                if (scopeObj.dashboardFilterParams.UploadFilter.TimePeriod !== "") {
                    var timePeriodData = scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.data;
                    timePeriodData.forEach(function(item) {
                        if (item.lblFeatureName.text === scopeObj.dashboardFilterParams.UploadFilter.TimePeriod) {
                            item.lblCheckFeature.text = "M";
                            item.lblCheckFeature.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                        } else {
                            item.lblCheckFeature.text = "L";
                            item.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A020Px";
                        }
						item.lblFeatureName.onTouchEnd=scopeObj.checkTimePeriod.bind(this);
                    });
                    scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.setData(timePeriodData);
                }
                if (scopeObj.dashboardFilterParams.UploadFilter.Status !== "") {
                    var statusData = scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segCurrency.data;
                    statusData.forEach(function(item) {
                        if (item.lblFeatureName.text === scopeObj.dashboardFilterParams.UploadFilter.Status) {
                            item.lblCheckFeature.text = "M";
                            item.lblCheckFeature.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
						} else {
                            item.lblCheckFeature.text = "L";
                            item.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A020Px";
						}
						item.lblFeatureName.onTouchEnd=scopeObj.checkStatus.bind(this);

                    });
                    scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segCurrency.setData(statusData);
                }
            } else if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory")) {
                if (scopeObj.dashboardFilterParams.HistoryFilter.TimePeriod !== "") {
                    var timePeriodData = scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.data;
                    timePeriodData.forEach(function(item) {
                        if (item.lblFeatureName.text === scopeObj.dashboardFilterParams.HistoryFilter.TimePeriod) {
                            item.lblCheckFeature.text = "M";
                            item.lblCheckFeature.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                        } else {
                            item.lblCheckFeature.text = "L";
                            item.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A020Px";
                        }
						item.lblFeatureName.onTouchEnd=scopeObj.checkStatus.bind(this);
                    });
                    scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.setData(timePeriodData);
                }
            }
        },
       
	    checkTimePeriod: function(data, scope) {
            var scopeObj = this;
            var rowIndex = data;
            var segData = this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.data;
            for (var i = 0; i < segData.length; i++) {
                if (i === rowIndex) {
                    this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.setDataAt({
                        "lblCheckFeature": {
                            text: "M",
                            skin: "ICSknLblRadioBtnSelectedFontIcon003e7520px",
                            onTouchEnd: scopeObj.checkTimePeriod.bind(this, i),
                        },
                        "lblFeatureName": segData[i].lblFeatureName,
                    }, rowIndex, 0);
                } else {
                    this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segTimePeriod.setDataAt({
                        "lblCheckFeature": {
                            text: "L",
                            skin: "sknLblOlbFontIconsA0A0A020Px",
                            onTouchEnd: scopeObj.checkTimePeriod.bind(this, i),
                        },
                        "lblFeatureName": segData[i].lblFeatureName,
                    }, i, 0);
                }
            }
        },
		
		checkStatus: function(data, scope) {
			var rowIndex = data;
            var segData = this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segCurrency.data;
            for (var i = 0; i < segData.length; i++) {
                if (i === rowIndex) {
                    this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segCurrency.setDataAt({
                        "lblCheckFeature": {
                            text: "M",
                            skin: "ICSknLblRadioBtnSelectedFontIcon003e7520px",
                            onTouchEnd: this.checkStatus.bind(this, i),
                        },
                        "lblFeatureName": segData[i].lblFeatureName,
                    }, rowIndex, 0);
                } else {
                    this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segCurrency.setDataAt({
                        "lblCheckFeature": {
                            text: "L",
                            skin: "sknLblOlbFontIconsA0A0A020Px",
                            onTouchEnd: this.checkStatus.bind(this, i),
                        },
                        "lblFeatureName": segData[i].lblFeatureName,
                    }, i, 0);
                }
            }
        },
		
		checkProcessingType: function(data, scope) {
            var scopeObj = this;
            var rowIndex = data;
            var segData = this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segProcessingType.data;
            for (var i = 0; i < segData.length; i++) {
                if (i === rowIndex) {
                    this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segProcessingType.setDataAt({
                        "lblCheckFeature": {
                            text: "M",
                            skin: "ICSknLblRadioBtnSelectedFontIcon003e7520px",
                            onTouchEnd: scopeObj.checkProcessingType.bind(this, i),
                        },
                        "lblFeatureName": segData[i].lblFeatureName,
                    }, rowIndex, 0);
                } else {
                    this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.segProcessingType.setDataAt({
                        "lblCheckFeature": {
                            text: "L",
                            skin: "sknLblOlbFontIconsA0A0A020Px",
                            onTouchEnd: scopeObj.checkProcessingType.bind(this, i),
                        },
                        "lblFeatureName": segData[i].lblFeatureName,
                    }, i, 0);
                }
            }
        },
		
		cancelFilterForHistory : function(){
			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
			this.adjustScreen(50);
			this.view.forceLayout();
		},
		
        showOrHideTimePeriod: function() {
          var scopeObj = this;
          if(scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimeperiodBody.isVisible === true)
          {
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimeperiodBody.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.CopyflxTimePeriodSeparator0iad4443c80964c.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimePeriodHeader.flxTimePeriodHeaderDropdown.flxTimePeriodDropdownImage.imgDropdownTimeperiod.text = "O";
          }
          else{
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimeperiodBody.setVisibility(true);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.CopyflxTimePeriodSeparator0iad4443c80964c.setVisibility(true);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxTimePeriod.flxTimePeriodHeader.flxTimePeriodHeaderDropdown.flxTimePeriodDropdownImage.imgDropdownTimeperiod.text = "P";
          }
			this.view.forceLayout();
        },

        showOrHideStatus: function() {
          var scopeObj = this;
          if(scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.isVisible === true)
          {
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxApprovalTypeSeparator.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyHeader.flxCurrencyExpand.flxDropdownCurrency.lblImageCurrency.text = "O";
          }
          else{
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.setVisibility(true);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxApprovalTypeSeparator.setVisibility(true);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyHeader.flxCurrencyExpand.flxDropdownCurrency.lblImageCurrency.text = "P";
          }
          this.view.forceLayout();
        },

        showOrHideProcessingType: function() {
          var scopeObj = this;
          if(scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxprocessingTypeBody.isVisible === true)
          {
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxprocessingTypeBody.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxProcessingTypeBottomSeparator.setVisibility(false);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxprocessingTypeHeader.flxProcessingTypeHeaderDropdown.flxProcessingTypeDropdownImage.imgDropdownprocessingType.text = "O";
          }
          else{
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxprocessingTypeBody.setVisibility(true);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxProcessingTypeBottomSeparator.setVisibility(true);
            scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxProcessingType.flxprocessingTypeHeader.flxProcessingTypeHeaderDropdown.flxProcessingTypeDropdownImage.imgDropdownprocessingType.text = "P";
          }
          this.view.forceLayout();
        },
		
		setFooterTop: function(data) {
			var ddheight=data+parseInt(this.view.flxContentHeader.height.replace("dp",""))+parseInt(this.view.TabPaneNew.TabsHeaderNew.height.replace("dp",""))+parseInt(this.view.TabPaneNew.TabSearchBarNew.height.replace("dp",""));
			
			if(ddheight<this.view.flxContentContainer.info.frame.height)
			{
				this.view.flxFooter.top = this.view.customheader.info.frame.height + this.view.flxContentContainer.info.frame.height + "dp";
			}
			else{
				this.view.flxFooter.top = this.view.customheader.info.frame.height + ddheight + "dp";
			}
		},
	
		setFilterCount: function() {
			var scopeObj = this;
			var filtercount=0;
			if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus")) {
                    if((!(scopeObj.dashboardFilterParams.ReviewFilter.Status === kony.i18n.getLocalizedString("i18n.konybb.Common.All"))) && (!(scopeObj.dashboardFilterParams.ReviewFilter.Status === "")))
                   {
						filtercount = filtercount+1;
					}
					if(!(scopeObj.dashboardFilterParams.ReviewFilter.ProcessingMode === kony.i18n.getLocalizedString("i18n.konybb.Common.All")))
					{
						filtercount = filtercount+1;
					}
					/* if(!(scopeObj.dashboardFilterParams.ReviewFilter.TimePeriod === "Last 6 Months"))
					{
						filtercount = filtercount+1;
					} */
					} 
					else if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles")) {
                        if((!(scopeObj.dashboardFilterParams.UploadFilter.Status === kony.i18n.getLocalizedString("i18n.konybb.Common.All"))) && (!(scopeObj.dashboardFilterParams.UploadFilter.Status === "")))
                    {
						filtercount = filtercount+1;
					}
				
					if(!(scopeObj.dashboardFilterParams.UploadFilter.TimePeriod === kony.i18n.getLocalizedString("i18n.accounts.lastSixMonths")))
					{
						filtercount = filtercount+1;
					}
                    } 
					/* else if (scopeObj.activeTab === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory")) {
                        if(!(scopeObj.dashboardFilterParams.HistoryFilter.TimePeriod === "Last 6 Months"))
					{
						filtercount = filtercount+1;
					}
                    } */
			if(filtercount > 0)
			{
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.setVisibility(true);
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.top="30%";
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.width="10%";
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.height="40%";
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.left="75%";
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.skin="sknCircleBlue";
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.lblFilterCount.text=filtercount.toString();
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.lblFilterCount.left="8px";
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.lblFilterCount.top="3px";
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.lblFilterCount.skin="sknLblFFFFFF9PxBg003E75Circle";
			}
			else
			{
				scopeObj.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxFilter.setVisibility(false);
			}
		},
        
    }

});