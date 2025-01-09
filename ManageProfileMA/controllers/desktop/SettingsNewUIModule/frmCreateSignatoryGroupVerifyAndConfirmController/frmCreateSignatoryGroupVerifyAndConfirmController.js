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
      this.view.btnCancel.onClick = function() {
        scope.navigateToCreateSignatory();
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
      if(this.view.flxAllUsersList.isVisible === false)
        this.view.flxAllUsersList.setVisibility(true);
      else
        this.view.flxAllUsersList.setVisibility(false);
    },
    
    cancelFilter : function(){
      this.view.flxAllUsersList.setVisibility(false);
      this.view.segmentFileTransactions.setData(applicationManager.getConfigurationManager().selectedSegmentData);
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
      if(selectedData.length > 0)
        this.view.segmentFileTransactions.setData(selectedData);
      else
      { 
        var empty=true;
        var data= [{
                "flxNoRecords": {
                    "isVisible": true
                },
                "lblNoRecords": {
                    "text": "No records are available"
                },
                "flxTemplateDetails": {
                    "isVisible": false
                },      
               "flxHeader": {
                    "isVisible": false
                },      
                "flxCreateSignatoryVerifyRowTemplate": {
                    "height": empty ? "300dp" : "45dp"
                }
            }];
        this.view.segmentFileTransactions.widgetDataMap = this.widgetDatamap();
        this.view.segmentFileTransactions.setData(data);
      }
      this.view.flxAllUsersList.setVisibility(false);
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
    },
    
    populateSelectedSignatory : function(){
      this.view.lblGroupNameValue.text = applicationManager.getConfigurationManager().groupName;
      this.view.lblTotalSeelectedUsersVerifyKey.text = applicationManager.getConfigurationManager().totalSelectedUsers;
      this.view.lblCustomerNameVerifyValue.text = applicationManager.getConfigurationManager().coreCustomerName;
      this.view.lblCustomerIdVerifyValue.text = applicationManager.getConfigurationManager().coreCustomerID;
      this.view.lblContractVerifyValue.text = applicationManager.getConfigurationManager().contractName;
      var selectedData = applicationManager.getConfigurationManager().selectedSegmentData;
      this.view.segmentFileTransactions.setData(selectedData);
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
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew").presentationController.createSignatoryGroup(filterKey);
      //applicationManager.getNavigationManager().navigateTo("frmCreateSignatoryGroupAcknowledgement");
    },
    navigateToCreateSignatory : function(){
      applicationManager.getNavigationManager().navigateTo("frmCreateSignatoryGroup","","fromverify");
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