define(['CommonUtilities', 'FormControllerUtility'], function(CommonUtilities, FormControllerUtility) {
    //Type your controller code here 
    return {
        featureDetails: [],
		segData : [],
        postShow: function() {
			 this.view.customheadernew.activateMenu(kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approvalMatrix"));
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxFormContent']);
			this.view.tbxSearch.onKeyUp = this.searchFeature ;
            if (kony.application.getCurrentBreakpoint() <= 1024){
                this.view.customfooternew.flxFooterMenu.width = "800dp";
            }
		},
        preshow: function() {
          this.imgArrowTransform = this.getImgTransformObj();
          this.view.lblContractValue.width="75%";
        },
        featureLevelPermissions: [],
        updateFormUI: function(viewModel) {
            if (viewModel) {
                if (!kony.sdk.isNullOrUndefined(viewModel.isLoading)) {
                    if (viewModel.isLoading) {
                        FormControllerUtility.showProgressBar(this.view);
                    } else {
                        FormControllerUtility.hideProgressBar(this.view);
                    }
                }
                if (viewModel.featureDetails) {
                    //  this.featureDetails = viewModel.featureDetails.data;
                    this.setApprovalPermissions(viewModel.featureDetails.data.accounts);
                   	this.view.lblGroupNameValue.text = viewModel.featureDetails.segData.customerName ;
					this.view.lblTotalSeelectedUsersVerifyKey.text = viewModel.featureDetails.segData.role  ;
					this.view.lblCustomerNameVerifyValue.text = "";
                    //	alert("Data"+JSON.stringify(this.featureDetails));
                }
            }
        },
        setApprovalPermissions: function(accounts) {
            this.view.btnBack.onClick = function() {
                var signatoryId =  applicationManager.getConfigurationManager().signatoryGroupId;
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.getSignatoryGroupDetails(signatoryId);
            };
          this.view.lblAccountNameValue.text = applicationManager.getConfigurationManager().signatoryGroupName ;
          this.view.lblCustomerHeaderValue.text =  applicationManager.getConfigurationManager().coreCustomerName ;
          this.view.lblCustomerIDValue.text  = applicationManager.getConfigurationManager().coreCustomerID ;
          this.view.lblContractValue.text = applicationManager.getConfigurationManager().contractName ;
            var featureLvlPermissions = {};
            var self = this;
            for (var x = 0; x < accounts.length; x++) {
                var accountJSON = {
                    "accountId": accounts[x].accountId,
                    "accountName": accounts[x].accountName,
                    "ownerType": accounts[x].ownerType,
                    "accountType": accounts[x].accountType
                };
                for (var y = 0; y < accounts[x].features.length; y++) {
                    if (!featureLvlPermissions[accounts[x].features[y].featureId]) {
                        featureLvlPermissions[accounts[x].features[y].featureId] = {
                            "featureName": accounts[x].features[y].featureName,
                            "featureStatus": accounts[x].features[y].featureStatus,
                            "featureId": accounts[x].features[y].featureId,
                            "actions": {}
                        }
                    }
                    for (var z = 0; z < accounts[x].features[y].actions.length; z++) {
                        if (!featureLvlPermissions[accounts[x].features[y].featureId].actions[accounts[x].features[y].actions[z].actionId]) {
                            featureLvlPermissions[accounts[x].features[y].featureId].actions[accounts[x].features[y].actions[z].actionId] = {
                                "actionId": accounts[x].features[y].actions[z].actionId,
                                "actionDescription": accounts[x].features[y].actions[z].actionDescription,
                                "actionName": accounts[x].features[y].actions[z].actionName,
                                "actionStatus": accounts[x].features[y].actions[z].actionStatus,
                                "accounts": {}
                            }
                        }
                        featureLvlPermissions[accounts[x].features[y].featureId].actions[accounts[x].features[y].actions[z].actionId].accounts[accounts[x].accountId] = accountJSON;
                    }
                }
            }
            kony.print("account level permissions" + featureLvlPermissions);
            this.featureLevelPermissions = featureLvlPermissions;
            this.view.Features.segTemplates.rowTemplate = "flxFeaturesContainer";
            //  this.view.Features.segTemplates.sectionHeaderTemplate = "flxFeatureSelectionPermissions";
            var data = [];
            for (var key in featureLvlPermissions) {
                // skip loop if the property is from prototype
                if (!featureLvlPermissions.hasOwnProperty(key)) continue;
                var obj = featureLvlPermissions[key];
                data.push(obj);
            }
            this.view.Features.segTemplates.widgetDataMap = {
                "lblRoleName": "featureName",
                "imgArrow": "imgArrow",
                "imgSelectRole": "imgSelectRole",
             //   "imgArrow": "imgArrow",
                "flxSelectRole": "flxSelectRole",
            };
            data.forEach(function(item) {
                item.imgSelectRole = {
                    "isVisible": false
                };
                item.imgArrow = {
                   "transform": self.imgArrowTransform,
                    "isVisible": false
                };
                item.flxSelectRole = {
                      "isVisible": false
                };
            });
			this.segData = data ;
            this.view.Features.segTemplates.setData(data);
            this.view.Features.segTemplates.onRowClick = this.segmentOnClick;
            this.segmentOnClick("", 0, 0);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
       getImgTransformObj: function() {
            var imgTransformObj = kony.ui.makeAffineTransform();
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
              imgTransformObj.rotate(180);
            } else {
              imgTransformObj.rotate(0);
            }
            return imgTransformObj;
       },
        segmentOnClick: function(widget, content, rowIndex) {
            this.view.flxApprovalMatrixAccountWrapper.removeAll();
            var dataitems = [];
            var self=this;
            var dataseg = this.view.Features.segTemplates.data;
            for (var k = 0; k < dataseg.length; k++) {
                if (rowIndex === k) {
                    dataseg[k].imgArrow.isVisible = true;
                    dataseg[k].imgArrow.transform= self.imgArrowTransform;
                } else {
                    dataseg[k].imgArrow.isVisible = false;
                   dataseg[k].imgArrow.transform= self.imgArrowTransform;
                }
            }
            this.view.Features.segTemplates.setData(dataseg);
            var data = this.view.Features.segTemplates.data[rowIndex];
            for (var i in data.actions) {
                if (!data.actions.hasOwnProperty(i)) continue;
                var obj = data.actions[i];
                dataitems.push(obj);
            }
            for (var i = 0; i < dataitems.length; i++) {
                var flexid = "flx" + i;
                var flexContainer1 = new kony.ui.FlexContainer({
                    "id": flexid,
                    "top": "0dp",
                    "left": "0dp",
                    "width": "100%",
                    "height": "42dp",
                    "zIndex": 1,
                    "skin": "sknFlxBgfbfbfbBor1pxTBe3e3e3",
                    // "onClick": this.visibleFeature.bind(this),
                    "isVisible": true,
                    "clipBounds": true,
                    "layoutType": kony.flex.FLOW_HORIZONTAL,
                }, {
                    "padding": [0, 0, 0, 0]
                }, {});
                this.view.flxApprovalMatrixAccountWrapper.add(flexContainer1);
                var lblid = "lbl" + i;
                var lblBasic = {
                    id: lblid,
                    skin: "sknlbldropdown",
                    text: "P",
                    onTouchEnd: this.visibleFeature.bind(this, rowIndex),
                    centerY: "50%",
                    left: "20dp",
                    isVisible: true
                };
                var lblLayout = {
                    containerWeight: 100,
                    padding: [5, 5, 5, 5],
                    margin: [5, 5, 5, 5],
                    hExpand: true,
                    vExpand: false
                };
                var lblLayout = {
                    renderAsAnchor: true,
                    wrapping: constants.WIDGET_TEXT_WORD_WRAP
                };
                //Creating the label.
                var lbl = new kony.ui.Label(lblBasic, lblLayout, lblLayout);
                this.view[flexid].add(lbl);
                var lblCompanyid = "lblCompany" + i;
                var lblBasic = {
                    id: lblCompanyid,
                    skin: "bbSknLbl424242SSP15Px",
                    text: dataitems[i].actionName,
                    centerY: "50%",
                    left: "20dp",
                    isVisible: true
                };
                var lblLayout = {
                    containerWeight: 100,
                    padding: [5, 5, 5, 5],
                    margin: [5, 5, 5, 5],
                    hExpand: true,
                    vExpand: false
                };
                var lblLayout = {
                    renderAsAnchor: true,
                    wrapping: constants.WIDGET_TEXT_WORD_WRAP
                };
                //Creating the label.
                var lblcompany = new kony.ui.Label(lblBasic, lblLayout, lblLayout);
                this.view[flexid].add(lblcompany);
                var id = "segFeatures" + i;
                var basicConf = {
                    id: id,
                    isVisible: true,
                    widgetSkin: "seg2Normal",
                    rowSkin: "seg2Normal",
                    rowFocusSkin: "seg2Focus",
                    alternateRowSkin: "seg2Normal",
                    //sectionHeaderSkin:"seg2Normal", 
                    widgetDataMap: {
                        "flxMain": "flxMain",
                        "lblAccountNameValue": "accountName",
                        "lblAccountNumberValue": "accountId",
                        "lblAccountTypeValue": "accountType",
                        "lblAccountName": "lblAccountName",
                        "lblAccountNumber": "lblAccountNumber",
                        "lblAccountType": "lblAccountType"
                    },
                    rowTemplate: "flxAccountsMain",
                    sectionHeaderTemplate: "flxApprovalsAccounts",
                    "retaincontentalignment": false,
                    "retainflexpositionproperties": false,
                    "retainselection": false,
                    "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                    "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
                    "layoutType": kony.flex.FREE_FORM,
                    //"separatorRequired" : true,
                    //"separatorThickness" : 1 ,
                    //"seperatorColor" : "#E3E3E3"
                };
                var layoutConf = {
                    padding: [0, 0, 0, 0],
                    margin: [0, 0, 0, 0],
                    containerweight: 100,
                    hasSections: true,
                    indicator: "none",
                    left: "0dp",
                    orientation: 2,
                    right: "0dp",
                    top: "20dp",
					bottom: "20dp",
                    centerX: "50%",
                    width: "95%"
                };
                var pspConf = {
                    border: constants.SEGUI_BORDER_BOTH_BOTTOM_TOP,
                    defaultSelection: true
                };
                var segment1 = new kony.ui.SegmentedUI2(basicConf, layoutConf, pspConf);
                this.view.flxApprovalMatrixAccountWrapper.add(segment1);
                var dataobj = [];
                for (var j in dataitems[i].accounts) {
                    if (!dataitems[i].accounts.hasOwnProperty(j)) continue;
                    var object = dataitems[i].accounts[j];
                    dataobj.push(object);
                }
                var sectionObj = {
                    "flxMain": {
                        "isVisible": false
                    },
                    "lblAccountName": {
                        "text": "Account Name"
                    },
                    "lblAccountNumber": {
                        "text": "Account Number"
                    },
                    "lblAccountType": {
                        "text": "Account Type"
                    }
                };
                this.view[id].setData([
                    [sectionObj, dataobj]
                ]);
            }
            // FormControllerUtility.hideProgressBar(this.view);
        },
		 searchFeature: function() {
          //  var segData = this.view.Features.segTemplates.data;
            var searchKey = this.view.tbxSearch.text;
			
			if(searchKey === ""){
				this.view.Features.segTemplates.setData(this.segData) ;
   
    }
    else{
      var searchData=[];
      searchData= this.segData.filter(function(obj){
        return obj.featureName.toLowerCase().includes(searchKey.toLowerCase());
      });
      this.view.Features.segTemplates.setData(searchData);
    }
           
        },
        visibleFeature: function(rowIndex, widget) {
            var id1 = widget.id;
            //    var seglength = this.businessInfo["companyList"];
            var dataitems = [];
            var data = this.view.Features.segTemplates.data[rowIndex];
            for (var i in data.actions) {
                if (!data.actions.hasOwnProperty(i)) continue;
                var obj = data.actions[i];
                dataitems.push(obj);
            }
            var split = id1.split("lbl");
            var num = split[1];
            var numid = Number(num);
            if (this.view["lbl" + num].text === "P") {
                this.view["lbl" + num].text = "O";
            } else this.view["lbl" + num].text = "P";
            for (var i = 0; i < dataitems.length; i++) {
                if (numid === i) {
                    if (this.view["segFeatures" + num].isVisible) {
                        this.view["segFeatures" + num].isVisible = false;
                    } else this.view["segFeatures" + num].isVisible = true;
                } else {
                    this.view["segFeatures" + i].isVisible = false;
                }
            }
            // this.adjustScreen(30);
          this.view.forceLayout();
        },
    };
});