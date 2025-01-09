define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    var prevApprovalMatrixData = {};
    return {
        contractsApprovalMatrix: null,
        updateFormUI: function(viewModel) {
            if (viewModel !== undefined) {
                if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
                if (viewModel.signatoryGroups) {
                    this.setSignatory(viewModel.signatoryGroups);
                }
            }
        },
        preShow: function() {
            var self = this;
            this.view.flxRight.setVisibility(true);
            this.view.postShow = this.postShowProfile;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
            this.view.customheadernew.activateMenu("Settings", "Approval Matrix");
            this.view.profileMenu.checkLanguage();
            this.view.profileMenu.collapseAll();
            this.setFlowActions();
            this.view.lblHeading.toolTip=kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader");
            this.view.lblDropDown.toolTip=kony.i18n.getLocalizedString("i18n.Profile.profilesettings");
         //   this.view.flxIcon.onClick = this.filterShow;
            this.view.forceLayout();
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
        postShowProfile: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.lblHeading.text=kony.i18n.getLocalizedString("kony.mb.Hamburger.Settings");
            this.view.forceLayout();
        },
        /**
         *  Method to set the Form Flow Actions such as button onclick events
         */
        setFlowActions: function() {
            var scopeObj = this;
        },
        showApprovalMatrixContractDetails: function(data) {
            var contracts = data.contractDetails;
            var contractFilter = data.contractFilter;
            this.view.segContractDetails.widgetDataMap = this.getContractsWidgetDataMap();
            this.contractsApprovalMatrix = [this.getSegmentDataForContracts(contracts)];
            this.view.segContractDetails.setData(this.contractsApprovalMatrix);
            
            this.view.profileMenu.activateMenu("APPROVALMATRIX", "Manage Approvals");
            this.setContractFilterData(contractFilter);
            this.view.tbxSearch.text = "";
            this.view.lblSelectedFilter.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL");
            this.view.tbxSearch.onKeyUp = this.searchContractDetails;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        getSegmentDataForContracts: function(contracts) {
            var sectionData = this.getSectionDataForContracts();
            var rowData = this.getRowDataForContracts(contracts);
            return ([sectionData, rowData]);
        },
        getSectionDataForContracts: function() {
            return ({
                "lblCustomerNameHeader": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.customerName")
                },
                "lblCustomerIDHeader": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.contract")
                },
                "lblContractHeader": {
                    "text": kony.i18n.getLocalizedString("konybb.settings.signatoryGroups")
                },
                "lblActionHeader": {
                    "text": kony.i18n.getLocalizedString("konybb.Approvals.Action")
                },
                "lblTopSeparator": {
                    "text": "-"
                },
                "lblBottomSeparator": {
                    "text": "-"
                },
                "imgCustomerNameSort": {
                    "src": "sorting.png"
                },
                "imgContractSort": {
                    "src": "sorting.png"
                },
                "imgCustIDSort": {
                    "src": "sorting.png"
                },
                "flxCustomerName": {
                    "onClick": this.sortContractsData.bind(this, "imgCustomerNameSort", this.getContractsWidgetDataMap()["lblCustomerName"])
                },
                "flxContract": {
                    "onClick": this.sortContractsData.bind(this, "imgContractSort", this.getContractsWidgetDataMap()["lblContract"])
                },
                "flxCustID": {
                    "onClick": this.sortContractsData.bind(this, "imgCustIDSort", this.getContractsWidgetDataMap()["lblCustomerID"])
                }
            });
        },
      getRowDataForContracts: function(contracts) {
            var scopeObj = this;
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            if (contracts.length === 0) {
                return ([this.adjustRowContainers(contracts)]);
            }
            contracts.forEach(contract => {
                var viewgroups= kony.i18n.getLocalizedString("i18n.approvals.ViewGroups");
                contract.btnAction = {
                    "text": viewgroups,
                    "onClick": function(eventobject, content) {
						var sectionIndex = content.sectionIndex ;
						var  rowIndex = content.rowIndex ;
						var data = scopeObj.view.segContractDetails.data[0][1][rowIndex] ;
                      var input = {
                        "contractId" : data.contractId,
                        "coreCutomerId":data.coreCustomerId
                      };
                      let coreCustomerName , coreCustomerNameTruncated ,contractName ,contractNameTruncated;
                      if (!kony.sdk.isNullOrUndefined(data.coreCustomerName)) {
                        coreCustomerName = data.coreCustomerName.slice();
                        coreCustomerNameTruncated = coreCustomerName;
                        if (data.coreCustomerName.length > 25) {
                          coreCustomerNameTruncated = data.coreCustomerName.substring(0, 22) + "...";
                        }
                      }
                      if (!kony.sdk.isNullOrUndefined(data.contractName)) {
                        contractName = data.contractName.slice();
                        contractNameTruncated = contractName;
                        if (data.contractName.length > 25) {
                          contractNameTruncated = data.contractName.substring(0, 22) + "...";
                        }
                      }
                      applicationManager.getConfigurationManager().coreCustomerNameTruncated = coreCustomerNameTruncated;
                      applicationManager.getConfigurationManager().coreCustomerName = coreCustomerName;
                      applicationManager.getConfigurationManager().coreCustomerID = data.coreCustomerId;
                      applicationManager.getConfigurationManager().contractNameTruncated = contractNameTruncated;
                      applicationManager.getConfigurationManager().contractName = contractName;
                      applicationManager.getConfigurationManager().contractId = data.contractId ;
                      applicationManager.getConfigurationManager().coreCustomerId = data.coreCustomerId ;
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.getAllSignatoryGroups(input);
                    },
                };
			//	contract.signatoryLenght = contract.signatoryGroups.length ;
                contract = Object.assign(contract, this.adjustRowContainers(contracts));
            });
            return contracts;
        },
        adjustRowContainers: function(rowData) {
            var isEmpty = (rowData.length === 0);
            return ({
                "flxNoRecords": {
                    "isVisible": isEmpty
                },
                "lblNoRecords": {
                    "text": "No records are available"
                },
                "flxHeadersContainer": {
                    "isVisible": !isEmpty
                },
                "lblRowSeparator": {
                    "isVisible": !isEmpty,
                    "text": "-"
                },
                "flxApprovalMatrixContractRow": {
                    "height": isEmpty ? "300dp" : "45dp"
                }
            });
        },
        getContractsWidgetDataMap: function() {
            return ({
                "lblCustomerNameHeader": "lblCustomerNameHeader",
                "lblCustomerIDHeader": "lblCustomerIDHeader",
                "lblContractHeader": "lblContractHeader",
                "lblActionHeader": "lblActionHeader",
                "imgCustomerNameSort": "imgCustomerNameSort",
                "imgContractSort": "imgContractSort",
                "lblTopSeparator": "lblTopSeparator",
                "lblBottomSeparator": "lblBottomSeparator",
                "flxCustomerName": "flxCustomerName",
                "flxContract": "flxContract",
                "lblRowSeparator": "lblRowSeparator",
                "lblCustomerName": "coreCustomerName",
                "lblCustomerID": "contractName",
                "lblContract": "signatoryLenght",
                "btnAction": "btnAction",
                "flxNoRecords": "flxNoRecords",
                "lblNoRecords": "lblNoRecords",
                "flxHeadersContainer": "flxHeadersContainer",
                "flxApprovalMatrixContractRow": "flxApprovalMatrixContractRow",
                "flxCustID":"flxCustID",
				"imgCustIDSort":"imgCustIDSort"
            });
        },
        sortContractsData: function(imgWidget, sortKey) {
            FormControllerUtility.showProgressBar(this.view);
            var segmentData = this.view.segContractDetails.data;
            if(imgWidget!== "imgCustomerNameSort")segmentData[0][0]["imgCustomerNameSort"].src = "sorting.png";
			if(imgWidget!== "imgContractSort")segmentData[0][0]["imgContractSort"].src = "sorting.png";
			if(imgWidget!== "imgCustIDSort")segmentData[0][0]["imgCustIDSort"].src = "sorting.png";
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            settingsnew.sortSegmentData(segmentData, 0, imgWidget, sortKey);
            this.view.segContractDetails.setData(segmentData);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        setContractFilterData: function(filter) {
          filter.forEach(function(filterData){
				filterData.lblCheckFeature = {
					"skin":(filterData.contract === "All")?"sknlblDelete20px":"sknLblOlbFontIconsA0A0A020Px",
					"text" : (filterData.contract === "All")?"M":"L",
				    "left" :"20dp",
				};
            filterData.lblFeatureName = {
					"text" : filterData.contract ,
					"left" : "20dp",
				};
			});
           
            this.view.segFilter.setData(filter);
            this.view.segFilter.onRowClick = function(segWidget, sectionIndex, rowIndex) {
                var filterValue = filter[rowIndex].contract;
                this.view.lblSelectedFilter.text = filterValue;
              var data = this.view.segFilter.data ;
              for(let i=0;i<data.length;i++){
                if(rowIndex === i){
                  data[i].lblCheckFeature.skin = "sknlblDelete20px";
                  data[i].lblCheckFeature.text = "M" ;
                }else{
                  data[i].lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A020Px";
                  data[i].lblCheckFeature.text = "L" ;
                }
              }
              this.view.segFilter.setData(data);
                this.filterContractDetails(filterValue);
                this.view.flxFilter.isVisible = false;
                this.view.lblDropDown.text = "O";
                this.view.forceLayout();
            }.bind(this);
            this.view.flxIcon.onClick = function() {
                var icon = this.view.lblDropDown.text;
                if (icon === "O") {
                    this.view.lblDropDown.text = "P";
                    this.view.flxFilter.isVisible = true;
                } else {
                    this.view.lblDropDown.text = "O";
                    this.view.flxFilter.isVisible = false;
                }
                this.view.forceLayout();
            }.bind(this);
        },
        filterContractDetails: function(filterKey) {
            FormControllerUtility.showProgressBar(this.view);
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            var filteredData = settingsnew.filterSegmentData(this.contractsApprovalMatrix, 0, filterKey);
            if (filteredData[0][1].length === 0) filteredData[0][1] = [this.adjustRowContainers([])];
            this.view.segContractDetails.setData(filteredData);
            this.filteredContractsData = filteredData;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        searchContractDetails: function() {
            FormControllerUtility.showProgressBar(this.view);
            var seachKey = this.view.tbxSearch.text;
            var segmentData = this.contractsApprovalMatrix;
            if (this.view.lblSelectedFilter.text !== kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL")) {
                segmentData = this.filteredContractsData;
            }
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            var filteredData = settingsnew.searchSegmentData(segmentData, 0, seachKey);
            if (filteredData[0][1].length === 0) filteredData[0][1] = [this.adjustRowContainers([])];
            this.view.segContractDetails.setData(filteredData);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        showErrorMessageForApprovalMatrix: function(error) {
            // 		  this.view.flxDowntimeWarning.isVisible = true;
            // 		  this.view.rtxDowntimeWarning.text = error.errorMessage;
            // 		  if(error.isContractsEmpty){
            // 			this.view.settings.flxApprovalMatrixDetailsWrapper.isVisible = false;
            // 		  }
            // 		  else{
            // 			this.view.settings.flxApprovalMatrixDetailsWrapper.isVisible = true;
            // 		  }
            this.view.forceLayout();
        },
        filterShow: function() {
          
            if (this.view.flxFilter.isVisible) {
                this.view.flxFilter.isVisible = false;
            } else {
                this.view.flxFilter.isVisible = true;
            }
        },
        /**
          Entry method of edit approval matrix flow ( after fetching aproval limit )
        **/
        navigateToEditApprovalMatrix: function(EditModel) {
            var scopeObj = this;
            //             this.editApprovalMatrixLimits(EditModel.editData);
            //             this.createApprovalMatrixPopupUI(EditModel.editData);
            FormControllerUtility.hideProgressBar(scopeObj.view);
        },
        setSignatory: function(response) {
            //+alert("data");
            this.view.profileMenu.activateMenu("APPROVALMATRIX", "Signatory Groups");
            var data = response.data.coreCustomers;
			
            
            this.view.segContractDetails.widgetDataMap = this.getContractsWidgetDataMap();
			this.contractsApprovalMatrix = [this.getSegmentDataForContracts(data)];
			this.view.segContractDetails.setData(this.contractsApprovalMatrix);
            this.sortContractsData("imgCustomerNameSort", this.getContractsWidgetDataMap()["lblCustomerName"]);
			 this.view.tbxSearch.text = "";
            this.view.lblSelectedFilter.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL");
            this.view.tbxSearch.onKeyUp = this.searchContractDetails;
           this.view.segFilter.rowTemplate = "flxTimePeriodMain";
			  this.view.segFilter.widgetDataMap = {
                "lblCheckFeature": "lblCheckFeature",
                "lblFeatureName": "lblFeatureName"
            };
			this.setContractFilterData(response.data.filter);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
          //  var sectionData = this.getSectionDataForContracts();
            // this.setSelectedSkin("flxSignatoryGroups");
          /*   this.view.segContractDetails.setData([
                [sectionData, data]
            ]); */
        },
    };
});