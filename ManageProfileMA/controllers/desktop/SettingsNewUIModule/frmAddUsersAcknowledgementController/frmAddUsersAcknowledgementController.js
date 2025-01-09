define("SettingsNew/userfrmViewManageSignatoryGroupController", ['FormControllerUtility'], function(FormControllerUtility) {
    //Type your controller code here 
    return {
        initActions: function() {},
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view);
        },
        preShow: function() {
            this.view.Search.top = "65dp";
          this.view.flxCancelPopup.isVisible = false;
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
                }
            }
        },
        setSignatoryGroupDetails: function(response) {
            var sectionData = {
                "btnUserName": {
                    "text": "User Name"
                },
                "btnUserRole": {
                    "text": "User Role"
                },
                "btnAddedOn": {
                    "text": "Added On"
                },
                "btnApprovalPermission": {
                    "text": "Approval Permission"
                }
            };
            var rowData = [{
                "lblUserNameValue": "Benjamin Patterson",
                "lblUserRoleValue": "Admin",
                "lblOpStatus": "03/21/2020",
            }, {
                "lblUserNameValue": "Raja Patterson",
                "lblUserRoleValue": "Admin",
                "lblOpStatus": "03/21/2020",
            }, {
                "lblUserNameValue": "Benjamin Patterson",
                "lblUserRoleValue": "Admin",
                "lblOpStatus": "03/21/2020",
            }, {
                "lblUserNameValue": "Benjamin Patterson",
                "lblUserRoleValue": "Admin",
                "lblOpStatus": "03/21/2020",
            }];
            this.view.segmentFileTransactions.setData([
                [sectionData, rowData]
            ]);
			var scope = this;
			this.view.btnModify.onClick = function () {
				scope.view.flxCancelPopup.isVisible = true;
				scope.view.PopupHeaderUM.btnYes.onClick= function () {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController.deleteSignatoryGroup();
				};
              scope.view.PopupHeaderUM.btnNo.onClick = function (){
                scope.view.flxCancelPopup.isVisible = false;
              };
              
			};
			this.view.btnCancelVerify.onClick = function () {
				
			};
        },
        onBreakpointChange: function() {},
    };
});