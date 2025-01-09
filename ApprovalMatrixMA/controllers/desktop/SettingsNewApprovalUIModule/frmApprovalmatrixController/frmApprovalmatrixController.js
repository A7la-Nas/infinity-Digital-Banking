define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    var prevApprovalMatrixData = {};
    return {
        contractsApprovalMatrix: null,
        updateFormUI: function(viewModel) {
            if (viewModel !== undefined) {
                if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
                if (viewModel.approvalMatrixContractDetails) {
                    this.showApprovalMatrixContractDetails(viewModel.approvalMatrixContractDetails);
                }
                if (viewModel.approvalMatrixError) {
                    this.showErrorMessageForApprovalMatrix(viewModel.approvalMatrixError);
                }
                if (viewModel.EditModelSuccess) {
                    this.navigateToEditApprovalMatrix(viewModel.EditModelSuccess);
                }
                if (viewModel.signatoryGroups) {
                    this.setSignatory(viewModel.signatoryGroups);
                }
              
            }
        },
      /**
     * Method for update segment data
     * @param {Object} Data - contains the  rowdata
     * @param {Object} context - contains the index of rowdata
     */
        updateSegmentData: function(data, context) {
            this.view.segContractDetails.setDataAt(data,context.row,0);
          this.view.forceLayout();
        },
       /**
     * Method for update tablet segment expand data
     */
      updateTabletExpandTemplate : function(object){
        var data = this.view.segContractDetails.data;
        for(var i=0;i<data[0][1].length;i++){
          if(object.row === i)
            {
              data[object.section][1][i].template = "flxApprovalMatrixContractTabRowSelected";
              this.view.segContractDetails.setDataAt(data[object.section][1][i], i,0);
            }
          else
            {
              data[object.section][1][i].template = "flxApprovalMatrixContractTabRow";
              this.view.segContractDetails.setDataAt(data[object.section][1][i], i,0);
            }
        }
        this.view.forceLayout();
      },
      /**
     * Method for update tablet segment collapse data
     */
      updateTabletCollapseTemplate : function(object){
        var data = this.view.segContractDetails.data;
        data[object.section][1][object.row].template = "flxApprovalMatrixContractTabRow";
        this.view.segContractDetails.setDataAt(data[object.section][1][object.row], object.row,0);
        this.view.forceLayout();
      },
      updateOnOffMatrix : function(context){
        var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
        //var permission = applicationManager.getNavigationManager().getCustomInfo("CURRENT_CUSTOMER_MATRIX_PERMISSION");
        var permission =  settingsnew.getActionNameBasedOnPermissions();
        var rowData = this.view.segContractDetails.data[context.section][1][context.row];
        if(permission === kony.i18n.getLocalizedString("i18n.locateus.view") + "/" + kony.i18n.getLocalizedString("i18n.billPay.Edit"))
        {
          settingsnew.updateApprovalMatrixStatusSGNew(rowData, !rowData.isDisabledMatrix,context);
        }
      },
        preShow: function() {
            var self = this;
			this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            //this.presenter.fetchAllSignatoryGroups();
            this.view.flxRight.setVisibility(true);
            this.view.postShow = this.postShowProfile;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
            this.view.customheadernew.activateMenu("Settings", "Approval Matrix");
            this.view.profileMenu.checkLanguage();
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.profileMenu.collapseAll();
            this.view.lblSelectedFilter.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Selected") + " " +"(0)";
            this.setFlowActions();
          if(kony.os.deviceInfo().deviceWidth === 1024){
            this.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.approvals.approvallistsearch").slice(0,50)+"...";
          }
          else if(kony.os.deviceInfo().deviceWidth === 768){
            this.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.approvals.approvallistsearch").slice(0,35)+"...";
          }
          this.view.lblHeading.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader");
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
            this.view.forceLayout();
            this.view.lblHeading.text=kony.i18n.getLocalizedString("kony.mb.Hamburger.Settings");
          this.view.btnCancelFilter.text= kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
          this.view.btnApplyFilter.text= kony.i18n.getLocalizedString("i18n.LocateUs.APPLY");
          if (kony.os.deviceInfo().deviceWidth <=1024){
            this.view.lblSelectedFilter.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Selected") + " " +"(0)";
          }
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
            this.sortContractsData("imgCustomerNameSort", this.getContractsWidgetDataMap()["lblCustomerName"]);
            this.view.profileMenu.activateMenu("APPROVALMATRIX", "Manage Approvals");
            this.setContractFilterData(contractFilter);
            this.view.tbxSearch.text = "";
           // this.view.lblSelectedFilter.text = "All";
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
                    "text": "Customer ID"
                },
                "lblContractHeader": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.contract")
                },
                "lblActionHeader": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.Action")
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
                "flxCustomerName": {
                    "onClick": this.sortContractsData.bind(this, "imgCustomerNameSort", this.getContractsWidgetDataMap()["lblCustomerName"])
                },
                "flxContract": {
                    "onClick": this.sortContractsData.bind(this, "imgContractSort", this.getContractsWidgetDataMap()["lblContract"])
                },
                "lblApprovalModeHdr": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.ApprovalMode")
                },
				"lblOnOffMatrixHdr": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.onoffMatrix")
                },
				"imgApprovalSort": {
                    "src": "sorting.png"
                },
				"flxApprovalMode": {
					"isVisible":true,
                    "onClick": this.sortContractsData.bind(this, "imgApprovalSort", this.getContractsWidgetDataMap()["lblApprovalMode"])
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
                contract.btnAction = {
                    "text": settingsnew.getActionNameBasedOnPermissions(),
                    onClick: function(eventobject, context) {
                        var rowData = scopeObj.view.segContractDetails.data[context.sectionIndex][1][context.rowIndex];
                        rowData.entryPoint = kony.application.getCurrentForm().id;
                       applicationManager.getNavigationManager().setCustomInfo("IS_SIGNATORY_GROUP", rowData.isSignatoryGroup);
                      applicationManager.getNavigationManager().setCustomInfo("CURRENT_CUSTOMER_MATRIX_STATUS", rowData.isDisabledMatrix);
                      if(rowData.isSignatoryGroup){
                       settingsnew.fetchAllSignatoryGroups(rowData);
                      }else{
                         settingsnew.isApprovalMatrixDisabled(rowData);
                      }
                    }
                };
                contract = Object.assign(contract, this.adjustRowContainers(contracts));
            });
            return contracts;
        },
      navigateToViewApprovalMatrix:function(rowData){
        var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
        settingsnew.isApprovalMatrixDisabled(rowData);
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
                },
               "flxSegApprovalMatrixContractRow": {
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
                "lblCustomerID": "coreCustomerID",
                "lblContract": "contractName",
                "btnAction": "btnAction",
                "flxNoRecords": "flxNoRecords",
                "lblNoRecords": "lblNoRecords",
                "flxHeadersContainer": "flxHeadersContainer",
                "flxApprovalMatrixContractRow": "flxApprovalMatrixContractRow",
                "imgMatrixOnOff": "onOffMatrixEnabled",
                "imgOnOffMatrix" : "onOffMatrixEnabled",
                "imgOffOn":"onOffMatrixEnabled",
                "lblApprovalMode": "AppgroupName",
                "lblApprovalModeHdr": "lblApprovalModeHdr",
				"lblOnOffMatrixHdr": "lblOnOffMatrixHdr",
				"imgApprovalSort": "imgApprovalSort",
				"flxApprovalMode": "flxApprovalMode",
                "flxSegApprovalMatrixContractRow":"flxSegApprovalMatrixContractRow"
            });
        },
      onBreakpointChange: function(form, width) {
        FormControllerUtility.setupFormOnTouchEnd(width);
        responsiveUtils.onOrientationChange(this.onBreakpointChange);
        this.view.customheadernew.onBreakpointChangeComponent(width);
        this.view.customfooternew.onBreakpointChangeComponent(width);
      },
        sortContractsData: function(imgWidget, sortKey) {
            FormControllerUtility.showProgressBar(this.view);
            var segmentData = this.view.segContractDetails.data;
            if(imgWidget!== "imgApprovalSort")segmentData[0][0]["imgApprovalSort"].src = "sorting.png";
			if(imgWidget!== "imgContractSort")segmentData[0][0]["imgContractSort"].src = "sorting.png";
			if(imgWidget!== "imgCustomerNameSort")segmentData[0][0]["imgCustomerNameSort"].src = "sorting.png";
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            settingsnew.sortSegmentData(segmentData, 0, imgWidget, sortKey);
            this.view.segContractDetails.setData(segmentData);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        setContractFilterData: function(filter) {
            this.view.segFilter.widgetDataMap = {
                "lblName": "contract",
                "lblNameHdr": "lblNameHdr",
                "imgFilterCheckbox": "imgFilterCheckbox",
                "lblHeaderSeparator":"lblHeaderSeparator"
            };
            this.view.segFilter.setData(filter);
            this.filterBackUpData = JSON.parse(JSON.stringify(this.view.segFilter.data));
            this.filterArrayValues = [];
            this.view.segFilter.onRowClick = function(segWidget, sectionIndex, rowIndex) {
                var localData = this.view.segFilter.data;
                if (localData[sectionIndex][1][rowIndex].imgFilterCheckbox.src === "inactivecheckbox.png") {
                    localData[sectionIndex][1][rowIndex].imgFilterCheckbox.src = "activecheckbox.png";
                    this.view.segFilter.setDataAt(localData[sectionIndex][1][rowIndex],rowIndex,sectionIndex);
                    if (!this.filterArrayValues.includes(localData[sectionIndex][1][rowIndex].contract)){
                      this.filterArrayValues.push(localData[sectionIndex][1][rowIndex].contract);
                    }
                } else {
                   localData[sectionIndex][1][rowIndex].imgFilterCheckbox.src = "inactivecheckbox.png";
                    this.view.segFilter.setDataAt(localData[sectionIndex][1][rowIndex],rowIndex,sectionIndex);
                  if (this.filterArrayValues.includes(localData[sectionIndex][1][rowIndex].contract)){
                  this.filterArrayValues = this.filterArrayValues.filter(function(item) {
                    return item !== localData[sectionIndex][1][rowIndex].contract
                  });
                  }
                }
                this.view.forceLayout();
            }.bind(this);
            this.view.flxIcon.onClick = function() {
                var icon = this.view.lblDropDown.text;
                if (icon === "O") {
                    this.view.lblDropDown.text = "P";
                    this.view.flxFilter.isVisible = true;
					this.view.segFilter.setData(JSON.parse(JSON.stringify(this.filterBackUpData)));
                } else {
                    this.view.lblDropDown.text = "O";
                    this.view.flxFilter.isVisible = false;
                }
                this.view.forceLayout();
            }.bind(this);
            this.view.btnApplyFilter.onClick = function() {
                this.view.lblDropDown.text = "O";
                this.view.flxFilter.setVisibility(false);
                this.filterBackUpData = JSON.parse(JSON.stringify(this.view.segFilter.data));
                var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
                var filteredData  = (settingsnew.applyFilterSegmentData(this.contractsApprovalMatrix, this.filterArrayValues.toString()));
              
            if (filteredData[0][1].length === 0) filteredData[0][1] = [this.adjustRowContainers([])];
            this.view.segContractDetails.setData(filteredData);
              this.view.lblSelectedFilter.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Selected") + " " +"("+this.filterArrayValues.length+")";
              if(this.filterArrayValues.length === this.view.segFilter.data[0][1].length+2)
                {
                  this.view.lblSelectedFilter.text = 'All';
                }
                this.view.forceLayout();
            }.bind(this);
            this.view.btnCancelFilter.onClick = function() {
                this.view.lblDropDown.text = "O";
                this.view.flxFilter.setVisibility(false);
                this.view.segFilter.widgetDataMap = {
                "lblName": "contract",
                "lblNameHdr": "lblNameHdr",
                "imgFilterCheckbox": "imgFilterCheckbox",
                "lblHeaderSeparator":"lblHeaderSeparator"
            };
                this.view.segFilter.setData(JSON.parse(JSON.stringify(this.filterBackUpData)));
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
            if (this.view.lblSelectedFilter.text !== "All") {
              //  segmentData = this.filteredContractsData;
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
            var data = response.data.coreCustomers;
            data.forEach(function(dataval) {
                dataval.btnAction = {
                    "text": "view Groups",
                    "onClick": function() {
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileUIModule").presentationController.getAllSignatoryGroups();
                    },
                };
                dataval.lblCustomerName = dataval.coreCustomerName;
                dataval.coreCustomerID = dataval.coreCustomerId;
                dataval.contractName = dataval.signatoryGroups.length;
            });
            this.view.segContractDetails.widgetDataMap = this.getContractsWidgetDataMap();
            var sectionData = this.getSectionDataForContracts();
            // this.setSelectedSkin("flxSignatoryGroups");
            this.view.segContractDetails.setData([
                [sectionData, data]
            ]);
        },
    };
});