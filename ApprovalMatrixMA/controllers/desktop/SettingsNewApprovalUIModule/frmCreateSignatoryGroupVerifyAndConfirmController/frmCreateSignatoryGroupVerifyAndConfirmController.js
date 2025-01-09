define(['CommonUtilities', 'FormControllerUtility', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, FormControllerUtility, ViewConstants, OLBConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();

  //Type your controller code here 
  return{
    
    preShow : function(){
      var scope = this;
      this.view.btnConfirmAndCreate.onClick = function() {
        scope.createSignatory();
      }.bind(this);
      this.view.btnModify.onClick = function() {
        scope.navigateToCreateSignatory();
      }.bind(this);
      this.view.btnCancelVerify.onClick = function() {
        scope.navigateToViewApprovalMatrix();
      }.bind(this);
      this.view.Search.txtSearch.onKeyUp = function(){
         scope.searchUsers();
      }.bind(this);
      this.view.btnApplyDropDown.onClick = function() {
        scope.applyFilter();
      }.bind(this);
      this.view.btnCancelDropDown.onClick = function() {
        scope.cancelFilter();
      }.bind(this);
      this.view.flxShowAllUsers.onClick = function() {
        scope.showDropdown();
      }.bind(this);
      this.populateSelectedSignatory();
      this.view.btnApplyDropDown.toolTip = kony.i18n.getLocalizedString("kony.mb.common.continue");
      this.view.btnCancelDropDown.toolTip = kony.i18n.getLocalizedString("kony.tab.common.cancel");
      this.view.btnConfirmAndCreate.toolTip = kony.i18n.getLocalizedString("kony.mb.common.continue");
      this.view.btnModify.toolTip = kony.i18n.getLocalizedString("kony.tab.common.cancel");
      this.view.btnCancelVerify.toolTip = kony.i18n.getLocalizedString("kony.tab.common.cancel");
    },
    onBreakpointChange: function(width) {
        this.view.customheadernew.onBreakpointChangeComponent(width);
      },
    
     updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if(viewModel.createSignatoryGroup) {
          this.navigateToAck(viewModel.createSignatoryGroup);
        }
      }
    },
    
    showDropdown : function(){
      if(this.view.flxAllUsersList.isVisible === false){
        this.view.flxAllUsersList.setVisibility(true);
        this.view.imgAllUsersDropdown.text = 'P';
      }
      else{
        this.view.flxAllUsersList.setVisibility(false);
        this.view.imgAllUsersDropdown.text = 'O';
      }
    },
    
    cancelFilter : function(){
      this.view.flxAllUsersList.setVisibility(false);
      this.view.imgAllUsersDropdown.text = 'O';
      var segData = applicationManager.getConfigurationManager().selectedSegmentData;
      this.view.segmentFileTransactions.setData(segData);
      this.view.flxNoRecords.setVisibility(segData.length <= 0);
    },
    
    applyFilter : function(){
      let segDropwDownData = this.view.segAllUsersLIst.data;
      var selectedRoles = [];
      var selectedData = [];
      segDropwDownData.forEach(function(item){
        if(item.lblDefaultAccountIcon.text === "C"){
          selectedRoles.push(item.lblDefaultAccountName.text);
        }
      });
      this.segData.forEach(function(data){
        if(selectedRoles.includes(data.lblUserRoleValue.text)){
          selectedData.push(data);
        }
      });

      this.view.segmentFileTransactions.setData(selectedData);
      this.view.flxNoRecords.setVisibility(selectedData.length <= 0);
      this.view.flxAllUsersList.setVisibility(false);
      this.view.imgAllUsersDropdown.text = 'O';
    },
    
    searchUsers : function(){
      var scope = this;
      var searchText = this.view.Search.txtSearch.text.toLowerCase();
      //var segData = this.view.segmentFileTransactions.data;
      var searchSegData = [];
      this.segData.forEach(function(item) {
        if (item.lblUserNameValue.text.toLowerCase().includes(searchText) || item.lblUserRoleValue.text.toLowerCase().includes(searchText) || item.lblOpStatus.text.toLowerCase().includes(searchText)) {
          if(!searchSegData.includes(item))
            searchSegData.push(item);
        }
      });
      this.view.segmentFileTransactions.setData(searchSegData);
      this.view.flxNoRecords.setVisibility(searchSegData.length <= 0);
    },
    getNoResultsFoundRowTemplate : function(segData){
      var isEmpty = segData && segData.length > 0 ? false : true;
        var data= [{
                "flxNoRecords": {
                    "isVisible": true
                },
                "lblNoRecords": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.NoRecordsareavailable")
                },
                "flxTemplateDetails": {
                    "isVisible": false
                },      
               "flxHeader": {
                    "isVisible": false
                },      
                "flxCreateSignatoryVerifyRowTemplate": {
          "height": isEmpty ? "300dp" : "45dp"
                }
            }];
      return data;
    },
    sortRole: function() {
      var rowData = this.view.segmentFileTransactions.data;
      var sortIcon = this.view.imgUserRole.src;
      var sortOrder = "desc";
      var sortKey = "lblUserRoleValue";
      if (sortIcon === "sorting_previous.png") {
        sortOrder = "asc";
        this.view.imgUserRole.src = "sorting_next.png";
      } else if (sortIcon === "sorting_next.png" || sortIcon === "sorting.png") {
        this.view.imgUserRole.src = "sorting_previous.png";
      }
      this.view.imgUserName.src = "sorting.png";
      rowData.sort(function(obj1, obj2) {
        var order = (sortOrder === "desc") ? -1 : 1;
        if (obj1["lblUserRoleValue"].text > obj2["lblUserRoleValue"].text) {
          return order;
        } else if (obj1["lblUserRoleValue"].text < obj2["lblUserRoleValue"].text) {
          return -1 * order;
        } else {
          return 0;
        }
      });
      this.view.segmentFileTransactions.setData(rowData);
      this.view.forceLayout();
    },
    sortName: function() {
      var rowData = this.view.segmentFileTransactions.data;
      var sortIcon = this.view.imgUserName.src;
      var sortOrder = "desc";
      var sortKey = "lblUserNameValue";
      if (sortIcon === "sorting_previous.png") {
        sortOrder = "asc";
        this.view.imgUserName.src = "sorting_next.png";
      } else if (sortIcon === "sorting_next.png" || sortIcon === "sorting.png") {
        this.view.imgUserName.src = "sorting_previous.png";
      }
      this.view.imgUserRole.src = "sorting.png";
      rowData.sort(function(obj1, obj2) {
        var order = (sortOrder === "desc") ? -1 : 1;
        if (obj1["lblUserNameValue"].text > obj2["lblUserNameValue"].text) {
          return order;
        } else if (obj1["lblUserNameValue"].text < obj2["lblUserNameValue"].text) {
          return -1 * order;
        } else {
          return 0;
        }
      });
      this.view.segmentFileTransactions.setData(rowData);
      this.view.forceLayout();
    },
    populateSelectedSignatory : function(){
      this.view.lblGroupNameValue.text = applicationManager.getConfigurationManager().groupName;
      this.view.lblTotalSeelectedUsersVerifyKey.text = applicationManager.getConfigurationManager().totalSelectedUsers;
      this.view.lblCustomerNameVerifyValue.text = applicationManager.getConfigurationManager().coreCustomerName;
      this.view.lblCustomerIdVerifyValue.text = applicationManager.getConfigurationManager().coreCustomerID;
      this.view.lblContractVerifyValue.text = applicationManager.getConfigurationManager().contractName;
      var selectedData = applicationManager.getConfigurationManager().selectedSegmentData || [];
      this.sortName();
      this.view.flxUserName.onClick = this.sortName.bind(this);
      this.view.flxUserRole.onClick = this.sortRole.bind(this);
      this.view.segmentFileTransactions.setData(selectedData);
      this.view.flxNoRecords.setVisibility(selectedData.length <= 0);
      var dropDownDatMap = {
        "flxRowDefaultAccounts" : "flxRowDefaultAccounts",
        "lblDefaultAccountIcon" : "lblDefaultAccountIcon",
        "lblDefaultAccountName" : "lblDefaultAccountName"
      };
      var dropDownRowData = [];
      var roles = [];
      let dropDownIndex = -1;
      var scopeObj = this;
      for (var i = 0; i < selectedData.length; i++) {
        if(!roles.includes(selectedData[i].lblUserRoleValue.text)){
          roles.push(selectedData[i].lblUserRoleValue.text);
        }
      }
      for (var j = 0; j < roles.length; j++) {
        dropDownIndex += 1;
        var dropdownRowVal = {
          lblDefaultAccountIcon : {
            "text" : "D",
            "onTouchEnd" : scopeObj.selectUnselectRoles.bind(this,dropDownIndex)
          },
          lblDefaultAccountName : {
            "text": roles[j]
          }
        };
        dropDownRowData.push(dropdownRowVal);
      }
      this.view.segAllUsersLIst.widgetDataMap = dropDownDatMap;
      this.view.segAllUsersLIst.setData(dropDownRowData);
      this.segData = this.view.segmentFileTransactions.data;
    },
    
    selectUnselectRoles : function(index,context){
      let segData = this.view.segAllUsersLIst.data;
      if (segData[index].lblDefaultAccountIcon.text === 'D') {
        segData[index].lblDefaultAccountIcon.text = 'C';
        segData[index].lblDefaultAccountIcon.skin = "sknlblDelete20px";
      }
      else{
        segData[index].lblDefaultAccountIcon.text = 'D';
        segData[index].lblDefaultAccountIcon.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
      }
      this.view.segAllUsersLIst.setData(segData);
    },
    
    navigateToAck : function(response){
      applicationManager.getConfigurationManager().createdBy = response.createdBy;
      applicationManager.getConfigurationManager().createdOn = CommonUtilities.getFrontendDateStringInUTC(response.createdOn, "mm/dd/yyyy");
      applicationManager.getNavigationManager().navigateTo("frmCreateSignatoryGroupAcknowledgement");
    },
    
    createSignatory : function(){
      var filterKey = {
        "signatoryGroupName": applicationManager.getConfigurationManager().groupName,
        "signatoryGroupDescription": applicationManager.getConfigurationManager().groupDesc,
        "contractId": applicationManager.getConfigurationManager().contractId,
        "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId,
        "signatories" : applicationManager.getConfigurationManager().signatories
      };
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.createSignatoryGroup(filterKey);
      //applicationManager.getNavigationManager().navigateTo("frmCreateSignatoryGroupAcknowledgement");
    },
    navigateToCreateSignatory : function(){
      applicationManager.getNavigationManager().navigateTo("frmCreateSignatoryGroup","","fromverify");
    },
    navigateToViewApprovalMatrix : function(){
      var input = {
		"contractId": applicationManager.getConfigurationManager().contractId,
        "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId
       };
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.getAllSignatoryGroups(input);
    },
    widgetDatamap : function()
    {
        var widgetdatamap= {
        "CopyimgFlxTopSeparator0d4f93c4ad23743": "CopyimgFlxTopSeparator0d4f93c4ad23743",
        "CopyimgSample0h544e7378d6e46": "CopyimgSample0h544e7378d6e46",
        "blNoofCreditsVal": "blNoofCreditsVal",
        "btnTrActions": "btnTrActions",
        "flxACHFile": "flxACHFile",
        "flxACHFileContent": "flxACHFileContent",
        "flxACHFileIcon": "flxACHFileIcon",
        "flxACHPaymentsMain": "flxACHPaymentsMain",
        "flxAChPayments": "flxAChPayments",
        "flxAchIcon": "flxAchIcon",
        "flxBPOngoingPaymentsDetails": "flxBPOngoingPaymentsDetails",
        "flxBottomSeperator": "flxBottomSeperator",
        "flxBulkPaymentsDetails": "flxBulkPaymentsDetails",
        "flxCheck": "flxCheck",
        "flxCheckBookRequest": "flxCheckBookRequest",
        "flxCheckRequestIcon": "flxCheckRequestIcon",
        "flxCreateSignatoryRowValues": "flxCreateSignatoryRowValues",
        "flxCreateSignatoryVerifyRowTemplate": "flxCreateSignatoryVerifyRowTemplate",
        "flxDetilsHighlighterMain": "flxDetilsHighlighterMain",
        "flxDropDown": "flxDropDown",
        "flxHeader": "flxHeader",
        "flxIcon": "flxIcon",
        "flxMain": "flxMain",
        "flxNoRecords": "flxNoRecords",
        "flxSelectAllValues": "flxSelectAllValues",
        "flxTemplateDetails": "flxTemplateDetails",
        "flxTopSeparatorHeader": "flxTopSeparatorHeader",
        "flxTopSeperator": "flxTopSeperator",
        "flxTransactionIcon": "flxTransactionIcon",
        "flxTransactionTypeValue": "flxTransactionTypeValue",
        "flxTransactionTypes": "flxTransactionTypes",
        "flxTransactionTypesMain": "flxTransactionTypesMain",
        "imgDropDown": "imgDropDown",
        "imgFlxBottomSeparator": "imgFlxBottomSeparator",
        "imgFlxTopSeparator": "imgFlxTopSeparator",
        "imgInfoIcon": "imgInfoIcon",
        "lblACFFileRequestType": "lblACFFileRequestType",
        "lblACFFileRequestTypeVal": "lblACFFileRequestTypeVal",
        "lblACHDebitCredit": "lblACHDebitCredit",
        "lblACHDebitCreditVal": "lblACHDebitCreditVal",
        "lblACHFileAmount": "lblACHFileAmount",
        "lblACHFileAmountVal": "lblACHFileAmountVal",
        "lblACHFileApprovals": "lblACHFileApprovals",
        "lblACHFileApprovalsVal": "lblACHFileApprovalsVal",
        "lblACHFileCreditAmount": "lblACHFileCreditAmount",
        "lblACHFileCreditAmountVal": "lblACHFileCreditAmountVal",
        "lblACHFileFileName": "lblACHFileFileName",
        "lblACHFileFileNameVal": "lblACHFileFileNameVal",
        "lblACHFileNumberofDebits": "lblACHFileNumberofDebits",
        "lblACHRequestType": "lblACHRequestType",
        "lblACHRequestTypeVal": "lblACHRequestTypeVal",
        "lblACHTemplateName": "lblACHTemplateName",
        "lblACHTemplateNameVal": "lblACHTemplateNameVal",
        "lblACHapprovals": "lblACHapprovals",
        "lblACHapprovalsVal": "lblACHapprovalsVal",
        "lblAchAmount": "lblAchAmount",
        "lblAchAmountVal": "lblAchAmountVal",
        "lblAchCustomerName": "lblAchCustomerName",
        "lblAchCustomerNameVal": "lblAchCustomerNameVal",
        "lblApproveDate": "lblApproveDate",
        "lblBulkReference": "lblBulkReference",
        "lblBulkReferenceVal": "lblBulkReferenceVal",
        "lblBulkStatus": "lblBulkStatus",
        "lblBulkStatusVal": "lblBulkStatusVal",
        "lblCheckCreatedBY": "lblCheckCreatedBY",
        "lblCheckCreatedBYVal": "lblCheckCreatedBYVal",
        "lblCustomerName": "lblCustomerName",
        "lblCustomerNameCheckBook": "lblCustomerNameCheckBook",
        "lblCustomerNameVal": "lblCustomerNameVal",
        "lblCustomerNameValCheck": "lblCustomerNameValCheck",
        "lblDropdownValue": "lblDropdownValue",
        "lblExecutionDate": "lblExecutionDate",
        "lblExecutionDateVal": "lblExecutionDateVal",
        "lblFeesService": "lblFeesService",
        "lblFeesServiceVal": "lblFeesServiceVal",
        "lblFileName": "lblFileName",
        "lblFileNameVal": "lblFileNameVal",
        "lblFontIconAChFile": "lblFontIconAChFile",
        "lblFontIconAch": "lblFontIconAch",
        "lblFontIconCheckRequest": "lblFontIconCheckRequest",
        "lblFromIcon": "lblFromIcon",
        "lblNACHumberOfDebits": "lblNACHumberOfDebits",
        "lblNoRecords": "lblNoRecords",
        "lblNoofBooks": "lblNoofBooks",
        "lblNoofBooksVal": "lblNoofBooksVal",
        "lblNoofCredits": "lblNoofCredits",
        "lblOPDecription": "lblOPDecription",
        "lblOPDecriptionVal": "lblOPDecriptionVal",
        "lblOPFromAccount": "lblOPFromAccount",
        "lblOPFromAccountValue": "lblOPFromAccountValue",
        "lblOPPaymentID": "lblOPPaymentID",
        "lblOPPaymentIDValue": "lblOPPaymentIDValue",
        "lblOPTotalAmount": "lblOPTotalAmount",
        "lblOPTotalAmountValue": "lblOPTotalAmountValue",
        "lblOPTotalTransactions": "lblOPTotalTransactions",
        "lblOPTotalTransactionsValue": "lblOPTotalTransactionsValue",
        "lblOpStatus": "lblOpStatus",
        "lblProcessingMode": "lblProcessingMode",
        "lblProcessingModeVal": "lblProcessingModeVal",
        "lblRequestAccount": "lblRequestAccount",
        "lblRequestAccountval": "lblRequestAccountval",
        "lblRequestId": "lblRequestId",
        "lblRequestIdVal": "lblRequestIdVal",
        "lblRequestType": "lblRequestType",
        "lblRequestTypeVal": "lblRequestTypeVal",
        "lblStatus": "lblStatus",
        "lblTotalDebitAmount": "lblTotalDebitAmount",
        "lblTotalDebitAmountVal": "lblTotalDebitAmountVal",
        "lblTrStatus": "lblTrStatus",
        "lblTransactionAmount": "lblTransactionAmount",
        "lblTransactionAmountVal": "lblTransactionAmountVal",
        "lblTransactionApprovals": "lblTransactionApprovals",
        "lblTransactionApprovalsVal": "lblTransactionApprovalsVal",
        "lblTransactionCustomerName": "lblTransactionCustomerName",
        "lblTransactionCustomerNameVal": "lblTransactionCustomerNameVal",
        "lblTransactionFrequency": "lblTransactionFrequency",
        "lblTransactionFrequencyVal": "lblTransactionFrequencyVal",
        "lblTransactionIcon": "lblTransactionIcon",
        "lblTransactionPayee": "lblTransactionPayee",
        "lblTransactionPayeeVal": "lblTransactionPayeeVal",
        "lblTransactionRecurrence": "lblTransactionRecurrence",
        "lblTransactionRecurrenceVal": "lblTransactionRecurrenceVal",
        "lblTransactionReference": "lblTransactionReference",
        "lblTransactionReferenceVal": "lblTransactionReferenceVal",
        "lblTransactionTransactionID": "lblTransactionTransactionID",
        "lblTransactionTransactionIDVal": "lblTransactionTransactionIDVal",
        "lblTransactionTypeDebit": "lblTransactionTypeDebit",
        "lblTransactionTypeDebitVal": "lblTransactionTypeDebitVal",
        "lblUploadDateTime": "lblUploadDateTime",
        "lblUploadDateTimeVal": "lblUploadDateTimeVal",
        "lblUserNameValue": "lblUserNameValue",
        "lblUserRoleValue": "lblUserRoleValue"
    };
      return widgetdatamap;
            }
  };
});
