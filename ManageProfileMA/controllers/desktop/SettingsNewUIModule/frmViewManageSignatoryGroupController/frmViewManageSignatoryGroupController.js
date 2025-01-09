define("SettingsNew/userfrmViewManageSignatoryGroupController", ['CommonUtilities','FormControllerUtility'], function(CommonUtilities,FormControllerUtility) {
    //Type your controller code here 
    return {
        initActions: function() {},
		signatoryGroupDeatils : null,
        sigData : "" ,
        signatoryGroupId : null ,
        selectedCustIds : [],
        noOfUsersSelected : "",
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view);
        },
        preShow: function() {
            var scope = this;
            this.view.Search.top = "65dp";
            this.view.flxCancelPopup.isVisible = false;
            this.view.imgCloseError.onTouchEnd = function()
            {
              scope.view.flxError.setVisibility(false);
            };
          this.isEditEnabled = applicationManager.getConfigurationManager().checkUserPermission('SIGNATORY_GROUP_CREATE_EDIT');
          if (this.isEditEnabled === false) {
            this.view.btnViewNEdit.setVisibility(false);
            this.view.flxAddNewUsers.isVisible = false ;
            this.view.flxRemoveUser.isVisible = false ;
           
          }
          else{ 
            this.view.btnViewNEdit.setVisibility(true);
            this.view.flxAddNewUsers.isVisible = true ;
            this.view.flxRemoveUser.isVisible = true ;
           
          }
          if(applicationManager.getConfigurationManager().checkUserPermission('SIGNATORY_GROUP_CREATE_EDIT') && applicationManager.getConfigurationManager().checkUserPermission('SIGNATORY_GROUP_DELETE') ){
             this.view.btnModify.isVisible = true ;
          }else
             this.view.btnModify.isVisible = false ;
          
            this.view.btnAddNewUsers.onClick = function() {
                scope.resetUI();
                scope.fetchEligibleSignatoryUsers();
            }.bind(this);
            this.view.FilterSignatoryGroup.flxAllUsersDropdown.onClick = this.filterShow;
          this.view.btnModify.onClick = this.checkEgilibleDelete ;
          this.view.flxRemoveUser.onClick = this.showRemoveUserPopup;
          this.view.flxRemoveUser.setEnabled(false);
          this.noOfUsersSelected = "";
          this.view.lblDelete.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px" ;
        },
        filterShow: function() {
            if (this.view.FilterSignatoryGroup.flxFilterGroup.isVisible) {
                this.view.FilterSignatoryGroup.flxFilterGroup.isVisible = false;
            } else {
                this.view.FilterSignatoryGroup.flxFilterGroup.isVisible = true;
            }
        },
//         navigateToAddUsers: function() {
//             applicationManager.getNavigationManager().navigateTo("frmAddUsers");
//         },
      
          fetchEligibleSignatoryUsers : function (){
      var filterKey = {
        "contractId": applicationManager.getConfigurationManager().contractId,
        "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId
      };
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController.fetchEligibleSignatoryUsersForAddUSers(filterKey);
    },
        updateFormUI: function(viewModel) {
            if (viewModel) {
                if (!kony.sdk.isNullOrUndefined(viewModel.isLoading)) {
                    if (viewModel.isLoading) {
                        FormControllerUtility.showProgressBar(this.view);
                    } else {
                        FormControllerUtility.hideProgressBar(this.view);
                    }
                }
                if (viewModel.signatoryGroupDetails) {
                    this.setSignatoryGroupDetails(viewModel.signatoryGroupDetails);
                   this.sigData = viewModel.signatoryGroupDetails.data;
                  applicationManager.getConfigurationManager().signatoryGroupId = this.sigData.signatoryGroupId;
                  applicationManager.getConfigurationManager().signatoryGroupName = this.sigData.signatoryGroupName;
                  applicationManager.getConfigurationManager().signatoryGroupDescription = this.sigData.signatoryGroupDescription;
                }
                if (viewModel.updateSignatorySucess) {
                    this.view.flxAckMessage.setVisibility(true);
                    this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("konybb.settings.signatory.groupdetails");
                }
                if (viewModel.updateSignatoryFailure) {
                   this.view.flxError.setVisibility(true);
                    this.view.lblErrorMsg.text ="Group details was not Successfully updated";
                }
              if (viewModel.updateSignatorySucessFromAddUsers) {
                this.view.flxAckMessage.setVisibility(true);
                this.view.lblSuccessMessage.text = "Selected users are added successfully";
              }
              if (viewModel.updateSignatoryFailureFromAddUsers) {
                this.view.flxError.setVisibility(true);
                this.view.lblErrorMsg.text ="Selected Users are not Successfully added";
              }
              if(viewModel.checkSigGrpAvailability) {
                this.checkSigGrpStatus(viewModel.checkSigGrpAvailability);
              }
              if(viewModel.deleteSignatoryGroup){
					this.deleteSignatoryGroup(viewModel.deleteSignatoryGroup) ;
				}
              if(viewModel.removeUsersSuccess)
              {
                this.view.flxAckMessage.setVisibility(true);
                this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("kony.settings.signatory.removeUsersAcknowledgement");
                this.view.flxRemoveUser.setEnabled(false);
                this.noOfUsersSelected = "";
                this.view.lblDelete.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px" ;
              }
              if(viewModel.removeUsersFailure)
              {
                this.view.flxError.setVisibility(true);
                this.view.lblErrorMsg.text ="Remover users operation failed due to some reason .Please try again";
              }
            }
        },
        loadSettingsNewModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew");
        },
      deleteSignatoryGroup : function (res){
        var scope = this; 
        var status = res.data.status ;
        if(status === "true" || status === true) {
          this.view.flxCancelPopup.isVisible = true;
          this.view.CustomPopup1.lblPopupMessage.skin = "slLabel0d8a72616b3cc47" ;
          this.view.PopupHeaderUM.btnYes.onClick = function() {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController.deleteSignatoryGroup(scope.signatoryGroupId);
          };
          this.view.PopupHeaderUM.btnNo.onClick = function() {
            this.view.flxCancelPopup.isVisible = false;
          }.bind(this) ;
          this.view.PopupHeaderUM.flxCross.onClick = function () {
					this.view.flxCancelPopup.isVisible = false;
				}.bind(this) ;
        }else{
          this.view.flxEgilibleForDelete.isVisible = true ;
          this.view.CustomPopup1.btnNo.onClick = function () {
             scope.view.flxEgilibleForDelete.isVisible = false ;
          }.bind(this);
          this.view.CustomPopup1.flxCross.onClick = function () {
					scope.view.flxEgilibleForDelete.isVisible = false;
				}.bind(this) ;
        }
         FormControllerUtility.hideProgressBar(this.view);
      },
      checkEgilibleDelete : function () {
             this.resetUI();
			 kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController.isSignatoryGroupEligibleForDelete(this.signatoryGroupId);
		},
        setSignatoryGroupDetails: function(response) {
            this.view.lblGroupNameValue.text = response.data.signatoryGroupName;
            this.view.lblTotalSeelectedUsersVerifyKey.text = response.data.signatories.length.toString();
            this.view.lblCustomerNameVerifyValue.text = CommonUtilities.getFrontendDateStringInUTC(response.data.createdOn, "mm/dd/yyyy");
            this.view.lblCustomerIdVerifyValue.text = response.data.createdBy;
            this.view.lblLastModifiedOnVAlue.text = CommonUtilities.getFrontendDateStringInUTC(response.data.lastModified, "mm/dd/yyyy");
            this.view.lblContractVerifyValue.text = response.data.signatoryGroupDescription;
            this.view.lblGroupNameKey.text = kony.i18n.getLocalizedString("i18n.approvals.groupName");
            this.view.lblTotalSeelectedUsersKey.text = kony.i18n.getLocalizedString("i18n.approvals.totalUsers");
            this.view.lblCustomerNameVerifyKey.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.CreatedonColon");
            this.view.lblCustomerIdKey.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.CreatedbyColon");
            this.view.lblLastModifiedOnKey.text = kony.i18n.getLocalizedString("i18n.approvals.lastModifiedOn");
            this.view.lblContractKey.text = kony.i18n.getLocalizedString("i18n.approvals.groupDesc");
            this.view.lblGroupNameValueHeader.text = response.data.signatoryGroupName;
            this.view.lblCustomerHeaderValue.text = response.data.coreCustomerName;
            //this.view.lblCustomerIDValue.text = response.data.coreCustomerId;
          	this.view.lblCustomerIDValue.text = response.data.coreCustomerName;
            this.view.lblContractValue.text = applicationManager.getConfigurationManager().contractId;
            this.signatoryGroupId = "";
            this.signatoryGroupId = response.data.signatoryGroupId;
            var data = response.data.signatories;
			var filterData = response.data.filterRole ;
            this.signatoryGroupDeatils = [this.getSegmentDataForSignatoryGroups(data)];
            this.view.segmentFileTransactions.widgetDataMap = this.getSignatoryGroupWidgetDataMap();
            this.view.segmentFileTransactions.setData(this.signatoryGroupDeatils);
            var scope = this;
			this.view.FilterSignatoryGroup.segAllUsersLIst.widgetDataMap = {
				"lblDefaultAccountIcon" : "lblDefaultAccountIcon",
				"lblDefaultAccountName" : "role"
			};
          filterData.forEach(function(item){
            item.lblDefaultAccountIcon = {
              "text" : "D",
              "skin" : "sknlblOLBFontsE3E3E320pxOlbFontIcons",
              "onTouchEnd" : function(eventobject, content, s, index) {
                var sectionIndex = index.sectionIndex ;
                var rowIndex = index.rowIndex ;
                let data = scope.view.FilterSignatoryGroup.segAllUsersLIst.data[rowIndex] ;
                if(data.lblDefaultAccountIcon.text === "C"){
                  data.lblDefaultAccountIcon.text = "D" ;
                }else {
                  data.lblDefaultAccountIcon.text = "C" ;
                }
                scope.view.FilterSignatoryGroup.segAllUsersLIst.setDataAt(data,rowIndex,0) ;
              }.bind(this) ,
            }
          });
			this.view.FilterSignatoryGroup.segAllUsersLIst.setData(filterData);
            //             this.view.btnModify.onClick = function() {
            //                 scope.view.flxCancelPopup.isVisible = true;
            //                 scope.view.PopupHeaderUM.btnYes.onClick = function() {
            //                     kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController.deleteSignatoryGroup();
            //                 };
            //                 scope.view.PopupHeaderUM.btnNo.onClick = function() {
            //                     scope.view.flxCancelPopup.isVisible = false;
            //                 };
            //             };
            this.view.btnCancelVerify.onClick = function() {

                var input = {
                    "contractId": applicationManager.getConfigurationManager().contractId,
                    "coreCutomerId": applicationManager.getConfigurationManager().coreCustomerId
                };
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController.getAllSignatoryGroups(input);

              scope.resetUI();
            
            };
            this.view.btnViewNEdit.onClick = this.btnViewEditOnclick;
            this.view.lblcross.onTouchEnd = function() {
                scope.view.flxAckMessage.setVisibility(false);
            };
            this.view.Search.txtSearch.onKeyUp = this.searchSignatoryDetails;
			this.view.FilterSignatoryGroup.btnApplyFilter.onClick = this.filterData ;
          this.view.FilterSignatoryGroup.btnCancelFilter.onClick = function (){
            scope.view.FilterSignatoryGroup.flxFilterGroup.isVisible = false;
          }.bind(this) ;
        },
      filterData : function(){
        var selectedFilter = [];
        var selectedData = [] ;
        var data = this.view.FilterSignatoryGroup.segAllUsersLIst.data ;
        data.forEach(function(item){
          if(item.lblDefaultAccountIcon.text === "C") {
            selectedFilter.push(item.role) ;
          }
        });
        var segData = this.view.segmentFileTransactions.data ;
        segData[0][1].forEach(function(dataItem){

          if(selectedFilter.includes(dataItem.role)){
            selectedData.push(dataItem); 
          }
        });
        if(selectedData.length > 0){
          segData[0][1] = selectedData ;
          this.view.segmentFileTransactions.setData(segData);
        }else{
          this.view.segmentFileTransactions.setData(segData);
        }
        this.view.FilterSignatoryGroup.flxFilterGroup.isVisible = false;


      },
		searchSignatoryDetails: function() {
            FormControllerUtility.showProgressBar(this.view);
            var seachKey = this.view.Search.txtSearch.text;
            var segmentData = this.signatoryGroupDeatils;
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController;
            var filteredData = settingsnew.searchSegmentData(segmentData, 0, seachKey);
            if (filteredData[0][1].length === 0) filteredData[0][1] = [this.adjustRowContainers([])];
            this.view.segmentFileTransactions.setData(filteredData);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
		getSignatoryGroupWidgetDataMap : function () {
			return ({
				"imgUserName": "imgUserName",
                "imgUserRole": "imgUserRole",
                "imgAddedOn": "imgAddedOn",
                "imgRequestTypeApprovePending": "imgRequestTypeApprovePending",
                "lblDropdown": "lblDropdown",
                "lblSelectAll": "lblSelectAll",
                "btnApprovalPermission": "btnApprovalPermission",
                "btnAddedOn": "btnAddedOn",
                "btnUserRole": "btnUserRole",
                "btnUserName": "btnUserName",
                "flxUserName": "flxUserName",
                "flxUserRole": "flxUserRole",
                "flxAddedOn": "flxAddedOn",
                "flxApprovalPermission": "flxApprovalPermission",
                "flxSelectAll": "flxSelectAll",
                "flxSelectAllValues" : "flxSelectAllValues" ,
                "lblUserNameValue": "customerName",
                "lblUserRoleValue": "role",
                "lblOpStatus": "createdts",
                "lblApproveDate": "approvalPermission",
                "lblDropdownValue": "lblDropdownValue",
				"flxNoRecords" : "flxNoRecords" ,
				"lblNoRecords"  : "lblNoRecords",
				"flxCreateSignatoryRowValues" : "flxCreateSignatoryRowValues" ,
				"lblRowSeparator" : "lblRowSeparator",
				"flxViewManageSignatoryRowTemplate" : "flxViewManageSignatoryRowTemplate",
				"lblViewPermissions" :"lblViewPermissions",
				
			});
		},
		getSegmentDataForSignatoryGroups : function (contracts) {
			 var sectionData = this.getSectionDataForSignatoryGroups();
            var rowData = this.getRowDataForSignatoryGroups(contracts);
            return ([sectionData, rowData]);
		},
		getSectionDataForSignatoryGroups : function () {
          var scope = this;
			return ({
				"btnUserName" : {
					"text" : "User Name"
				},
				"imgUserName" : {
					 "src": "sorting.png"
				},
				"btnUserRole" : {
					"text" : "User Role"
				},
				"imgUserRole" : {
					"src": "sorting.png"
				},
				"btnAddedOn" : {
					"text" : "Added On"
				},
				"imgAddedOn" :{
					"src": "sorting.png"
				},
				"btnApprovalPermission" : {
					"text" :"Approval Permission"
				},
				"imgRequestTypeApprovePending" : {
					"src": "sorting.png"
				},
				"lblSelectAll" : {
					"text" :"Select & Delete" ,
                  "isVisible" : (applicationManager.getConfigurationManager().checkUserPermission('SIGNATORY_GROUP_CREATE_EDIT'))?true :false ,
                  "left" : (kony.application.getCurrentBreakpoint() === 1024) ? "5dp":"20dp",
				},
				"lblDropdown":{
                  "skin" : "sknlblDelete20px",
                  "text" : "D",
                  "onTouchEnd": function(eventobject, content)
                  {
                    scope.selectAllUser();
                  },
                  "isVisible" : (applicationManager.getConfigurationManager().checkUserPermission('SIGNATORY_GROUP_CREATE_EDIT'))?true :false ,
                },
				"flxUserName" : {
					"onClick" : this.sortContractsData.bind(this, "imgUserName", this.getSignatoryGroupWidgetDataMap()["lblUserNameValue"])
				},
				"flxUserRole" : {
					"onClick" : this.sortContractsData.bind(this, "imgUserRole", this.getSignatoryGroupWidgetDataMap()["lblUserRoleValue"])
				},
		     	"flxAddedOn" : {
					"onClick" : this.sortContractsData.bind(this, "imgAddedOn", this.getSignatoryGroupWidgetDataMap()["lblOpStatus"])
				},
				"flxApprovalPermission" : {
					"onClick" : this.sortContractsData.bind(this, "imgRequestTypeApprovePending", this.getSignatoryGroupWidgetDataMap()["lblApproveDate"])
				},
			
				
				
			});
		},
		getRowDataForSignatoryGroups : function (data){
			var scopeObj = this;
			 
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController;
            if (data.length === 0) {
                return ([this.adjustRowContainers(data)]);
            }
            data.forEach(contract => {
                contract.lblDropdownValue = {
					"skin" :"sknlblOLBFontsE3E3E320pxOlbFontIcons",
                    "text": "D",
                    "onTouchEnd": function(eventobject, content,s,index) {
						var section = index.sectionIndex ;
						var rowIndex = index.rowIndex ;
						scopeObj.selectUnselectUser(section,rowIndex);
                    },
                  "isVisible" : (applicationManager.getConfigurationManager().checkUserPermission('SIGNATORY_GROUP_CREATE_EDIT'))?true :false ,
                };
              contract.lblViewPermissions= {
                "text" : "View Permission",
                "onTouchEnd" : function (eventobject,content,x,y){
                  var sectionIndex = y.sectionIndex ;
                  var rowIndex=y.rowIndex ;
                  var segData = scopeObj.view.segmentFileTransactions.data[0][1][rowIndex] ;
                  var input = {
                    "userId" : "",
                    "userName" : segData.userName
                  };
                  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController.getUserApprovalPermissions(input,segData);

                },
              };
            
                contract = Object.assign(contract, this.adjustRowContainers(data));
            });
            return data;
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
                "flxCreateSignatoryRowValues": {
                    "isVisible": !isEmpty
                },
                "lblRowSeparator": {
                    "isVisible": !isEmpty,
                    "text": "-"
                },
                "flxViewManageSignatoryRowTemplate": {
                    "height": isEmpty ? "300dp" : "45dp"
                }
            });
        },
		sortContractsData: function(imgWidget, sortKey) {
            FormControllerUtility.showProgressBar(this.view);
            var segmentData = this.view.segmentFileTransactions.data;
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController;
            settingsnew.sortSegmentData(segmentData, 0, imgWidget, sortKey);
            this.view.segmentFileTransactions.setData(segmentData);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
      checkAvailability : function(){
        var scope = this;
        scope.resetUI();
        if( scope.view.flxEditGroupDetails.txtgroupName.text !== ""){
          var sigGrpName = scope.view.flxEditGroupDetails.txtgroupName.text;
          var filterKey = {
            "signatoryGroupName": sigGrpName,
            "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId
          };
          kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController.checkSigGrpAvailability(filterKey);
        }
      },
      checkSigGrpStatus: function(response)
      {
        var scope = this;
        if(response.status){
          scope.view.flxEditGroupDetails.flximgAvailabilty.isVisible = true;
          if ((scope.view.flxEditGroupDetails.txtGroupDesc.text.length > 0) && (scope.view.flxEditGroupDetails.txtgroupName.text.length > 0)) {
            FormControllerUtility.enableButton(scope.view.flxEditGroupDetails.formActionsNew.btnNext);
          } else FormControllerUtility.disableButton(scope.view.flxEditGroupDetails.formActionsNew.btnNext);

        }
        else{
          scope.view.lblErrorMsg.text = "The entered Group Name is not available.Please try again";
          scope.view.flxError.isVisible = true;
          scope.view.flxPopupConfirmation.isVisible = false;
          scope.view.flxEditGroupDetails.flximgAvailabilty.isVisible = false;
        }

      },
      onBreakpointChange: function(width) {
        this.view.customheadernew.onBreakpointChangeComponent(width);
      },
        btnViewEditOnclick: function() {
          var scope = this;
          FormControllerUtility.disableButton(scope.view.flxEditGroupDetails.formActionsNew.btnNext);
          scope.view.flxPopupConfirmation.isVisible = true;
          scope.view.flxEditGroupDetails.lblHeader.text = kony.i18n.getLocalizedString("konybb.settings.signatory.EditGroupName");
          scope.view.flxEditGroupDetails.btnCheckAvailablity.isVisible = false;
          scope.view.flxEditGroupDetails.flximgAvailabilty.isVisible = false;
          scope.view.flxEditGroupDetails.imgClose.onTouchEnd = function() {
            scope.view.flxPopupConfirmation.setVisibility(false);
          };
          scope.view.flxEditGroupDetails.formActionsNew.btnCancel.onClick = function() {
            scope.view.flxPopupConfirmation.setVisibility(false);
          };
          scope.view.flxEditGroupDetails.txtgroupName.text = scope.view.lblGroupNameValue.text;
          scope.view.flxEditGroupDetails.txtGroupDesc.text = scope.view.lblContractVerifyValue.text;
          scope.view.flxEditGroupDetails.txtgroupName.onTextChange = function() {
            scope.view.flxEditGroupDetails.btnCheckAvailablity.isVisible = false;
            scope.view.flxEditGroupDetails.flximgAvailabilty.isVisible = false;
            FormControllerUtility.disableButton(scope.view.flxEditGroupDetails.formActionsNew.btnNext);
            scope.view.flxEditGroupDetails.lblNewGrouptitle.text = kony.i18n.getLocalizedString("konybb.settings.signatory.NewgroupName");
            if (scope.view.flxEditGroupDetails.txtgroupName.text.length > 0) {
              scope.view.flxEditGroupDetails.btnCheckAvailablity.isVisible = true;
            } else {
              scope.view.flxEditGroupDetails.btnCheckAvailablity.isVisible = false;
              scope.view.flxEditGroupDetails.flximgAvailabilty.isVisible = false;
              FormControllerUtility.disableButton(scope.view.flxEditGroupDetails.formActionsNew.btnNext);
            }
          };
          scope.view.flxEditGroupDetails.btnCheckAvailablity.onClick = function() {
            scope.checkAvailability();
          };
          scope.view.flxEditGroupDetails.txtGroupDesc.onTextChange = function() {
            if ((scope.view.flxEditGroupDetails.txtGroupDesc.text.length > 0) && (scope.view.flxEditGroupDetails.txtgroupName.text.length > 0 && (scope.view.flxEditGroupDetails.btnCheckAvailablity.isVisible !== true))) {
              FormControllerUtility.enableButton(scope.view.flxEditGroupDetails.formActionsNew.btnNext);
            } else FormControllerUtility.disableButton(scope.view.flxEditGroupDetails.formActionsNew.btnNext);
          };
          applicationManager.getConfigurationManager().signatoryGroupName = scope.view.flxEditGroupDetails.txtgroupName.text;
          applicationManager.getConfigurationManager().signatoryGroupDescription = scope.view.flxEditGroupDetails.txtGroupDesc.text;
          scope.view.flxEditGroupDetails.formActionsNew.btnNext.onClick = function() {
            scope.view.flxPopupConfirmation.setVisibility(false);
            scope.sigData.signatories = [];
            var params = {
              "signatoryGroupId": scope.sigData.signatoryGroupId,
              "signatoryGroupName": scope.view.flxEditGroupDetails.txtgroupName.text,
              "signatoryGroupDescription": scope.view.flxEditGroupDetails.txtGroupDesc.text,
              "contractId":applicationManager.getConfigurationManager().contractId,
              "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId,
              "signatories":  JSON.stringify(scope.sigData.signatories)
            };
            scope.resetUI();
            scope.loadSettingsNewModule().presentationController.updateSignatoryGroupdetails(params);
          };
        },

      selectUnselectUser : function(sectionindex,rowindex,context){
        let segData = this.view.segmentFileTransactions.data;
        var scope = this;
        if (segData[sectionindex][1][rowindex].lblDropdownValue.text === 'D') {
          segData[sectionindex][1][rowindex].lblDropdownValue.text = 'C';
          segData[sectionindex][1][rowindex].lblDropdownValue.skin = "sknlblDelete20px";
        }
        else{
          segData[sectionindex][1][rowindex].lblDropdownValue.text = 'D';
          segData[sectionindex][1][rowindex].lblDropdownValue.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
        }
        this.view.segmentFileTransactions.setData(segData);
        var count = 0;
        segData[sectionindex][1].forEach(function(item){
          if (item.lblDropdownValue.text === 'C') {
            count++;
            var val = {"customerId":item.customerId,"isUserRemoved": true};
            scope.selectedCustIds.push(val);
          }
        });
        var length = this.view.segmentFileTransactions.data[0][1].length;
        var segmentData = this.view.segmentFileTransactions.data;
        if (count < length) {
          segmentData[0][0].lblDropdown.text = "D";
          segmentData[0][0].lblDropdown.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
          this.view.segmentFileTransactions.setData(segmentData);
        }
        if (length === count) {
          segmentData[0][0].lblDropdown.text = "C";
          segmentData[0][0].lblDropdown.skin = "sknlblDelete20px";
          this.view.segmentFileTransactions.setData(segmentData);
        }
        if(length !== count && count > 0)
        {
          segmentData[0][0].lblDropdown.text = "z";
          segmentData[0][0].lblDropdown.skin = "sknlblDelete20px";
          this.view.segmentFileTransactions.setData(segmentData);
        }
       this.noOfUsersSelected= count.toString();
       this.enabledelete();
      },
      
      selectAllUser: function() {
           var checkBoxText;
           var count = 0;
           var scope = this;
           scope.selectedCustIds=[];
            let segData = this.view.segmentFileTransactions.data;
            var usersCount = segData[0][1].length;
            if (segData[0][0].lblDropdown.text === "D") {
                segData[0][0].lblDropdown.text = "C";
                checkBoxText = "C";
                count = usersCount;
            } else {
                segData[0][0].lblDropdown.text = "D";
                checkBoxText = "D";
            }
            let index = -1;
            var RowData = [];
            segData[0][1].forEach(function(item) {
                item.lblDropdownValue.text = checkBoxText;
                item.lblDropdownValue.skin = "sknlblDelete20px";
                var val = {"customerId":item.customerId,"isUserRemoved": true};
                if(checkBoxText === 'C')
                {
                  scope.selectedCustIds.push(val);
                }
            });
            this.noOfUsersSelected = count.toString();
            this.view.segmentFileTransactions.setData(segData);
            this.enabledelete();
        },
      
      showRemoveUserPopup: function ()
      {
        var scope = this ;
        this.view.flxRemoveUsers.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("konybb.settings.signatory.RemoveUpdate");
        if(this.noOfUsersSelected >0)
        {
          scope.view.flxRemoveUsers.lblTotalUsersVal.text = scope.noOfUsersSelected;
          scope.view.flxPopupRemoveUsers.setVisibility(true);
          scope.view.flxRemoveUsers.formActionsNew.btnCancel.onClick = function() {
            scope.view.flxPopupRemoveUsers.setVisibility(false);
          };
          scope.view.flxRemoveUsers.formActionsNew.btnNext.onClick = function() {
            scope.view.flxPopupRemoveUsers.setVisibility(false);
            var params = {
              "signatoryGroupId": applicationManager.getConfigurationManager().signatoryGroupId ,
              "signatoryGroupName":  applicationManager.getConfigurationManager().signatoryGroupName ,
              "signatoryGroupDescription":applicationManager.getConfigurationManager().signatoryGroupDescription,
              "contractId":applicationManager.getConfigurationManager().contractId,
              "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId,
              "signatories":  JSON.stringify(scope.selectedCustIds)
            };
            scope.resetUI();
            scope.loadSettingsNewModule().presentationController.removeUsers(params);
          };
        }
        else 
          {
            //alert("Please select one or more users to perform this action")
             scope.view.flxMainWrapper.setVisibility(true);
             scope.view.lblDowntimeWarning.text ="Please select one or more users to perform this action";

          }
      },
      enabledelete : function()
      {
        var scope = this;
        if(scope.noOfUsersSelected > 0)
        {
          scope.view.flxRemoveUser.setEnabled(true);
          scope.view.lblDelete.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px" ;
        }
        else
        {
          scope.view.flxRemoveUser.setEnabled(false);
          scope.view.lblDelete.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px" ;
        }

      },
      
      resetUI : function()
      {
       this.view.flxAckMessage.setVisibility(false); 
       this.view.flxError.setVisibility(false); 
      },

    };
});