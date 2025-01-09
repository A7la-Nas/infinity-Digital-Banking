define("SettingsNew/userfrmAddUsersController", ['CommonUtilities', 'FormControllerUtility', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, FormControllerUtility, ViewConstants, OLBConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var signatories;
  //Type your controller code here 
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.eligibleSignatoryGroups) {
          signatories = viewModel.eligibleSignatoryGroups;
          this.populateSignatoryUsers(viewModel.eligibleSignatoryGroups);
        }
      }
    },

    loadSettingsNewModule: function() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNew");
    },
    onBreakpointChange: function(width) {
        this.view.customheadernew.onBreakpointChangeComponent(width);
      },

    preShow: function() {
      var scope = this;
      this.view.lblAccountNameValue.text = applicationManager.getConfigurationManager().signatoryGroupName;
      this.view.lblAccountNameValue.toolTip = applicationManager.getConfigurationManager().signatoryGroupName;
      this.view.lblCustomerHeaderValue.text = applicationManager.getConfigurationManager().coreCustomerNameTruncated;
      this.view.lblCustomerHeaderValue.toolTip = applicationManager.getConfigurationManager().coreCustomerName;
      this.view.lblCustomerIDValue.text = applicationManager.getConfigurationManager().coreCustomerID ;
      this.view.lblContractValue.text = applicationManager.getConfigurationManager().contractNameTruncated ;
      this.view.lblContractValue.toolTip = applicationManager.getConfigurationManager().contractName;
      this.view.Search.txtSearch.text = "";
      //   this.view.btnProceedRoles.skin = "ICSknbtnEnabed003e7536px";
      this.view.btnProceedRoles.skin = "sknBtnBlockedSSPFFFFFF15Px";
      this.view.btnProceedRoles.setEnabled(false);
      this.view.CopylblDropdown0fe2ee09157f246.text = "D";
      this.view.btnProceedRoles.onClick = function() {
        scope.navigateToAddUsersVerify();
      }.bind(this);
      this.view.btnCancelRoles.onClick = function() {
        scope.navigateBack();
      }.bind(this);
      this.view.CopylblDropdown0fe2ee09157f246.onTouchEnd = function() {
        scope.selectAllUser();
      }.bind(this);
      this.view.Search.txtSearch.onKeyUp = function() {
        scope.searchUsers();
      }.bind(this);
      this.view.flxShowAllUsers.onClick = function() {
        scope.filterShow();
      }.bind(this);
      this.view.FilterSignatoryGroup.flxShowAllUsers.onClick = this.filterShow;
      this.view.FilterSignatoryGroup.btnApplyFilter.onClick = function() {
        scope.applyFilter();
      }.bind(this);
      this.view.FilterSignatoryGroup.btnCancelFilter.onClick = function() {
        scope.cancelFilterDropDown();
      }.bind(this);
      this.view.tablePagination.flxPaginationNext.onClick = function() {
        scope.paginationNext();
      }.bind(this);
      this.view.tablePagination.flxPaginationPrevious.onClick = function() {
        scope.paginationPrevious();
      }.bind(this);
      this.pageCount = 0;

    },

    filterShow: function() {
      if (this.view.FilterSignatoryGroup.flxFilterGroup.isVisible) {
        this.view.FilterSignatoryGroup.flxFilterGroup.isVisible = false;
      } else {
        this.view.FilterSignatoryGroup.flxFilterGroup.isVisible = true;
      }
    },

    cancelFilterDropDown : function(){
      this.view.FilterSignatoryGroup.flxFilterGroup.isVisible = false;
    },

    searchUsers: function() {
      var scope = this;
      var searchText = this.view.Search.txtSearch.text.toLowerCase();
      var searchSegData = [];
      var searchSegDataSliced = [];
      this.segData.forEach(function(item) {
        if (item.lblUserNameValue.text.toLowerCase().includes(searchText) || item.lblUserRoleValue.text.toLowerCase().includes(searchText) || item.lblOpStatus.text.toLowerCase().includes(searchText)) {
          if(!searchSegData.includes(item))
            searchSegData.push(item);

        }
      });
      let index = -1;
      var RowData = [];
      var scopeObj = this;
      if (searchSegData.length === 0) {
        this.view.tablePagination.flxPagination.setVisibility(false);
        this.view.flxSelectAll.setVisibility(false);
        RowData = [this.setNoRecord()];
      }
      else{
        this.view.tablePagination.flxPagination.setVisibility(true);
        this.view.flxSelectAll.setVisibility(true);
        if (searchSegData.length > 10) {
          searchSegDataSliced = searchSegData.slice(0, 10);
          this.view.tablePagination.lblPagination.text = "1 - 10 Records";
          this.view.tablePagination.imgPaginationPrevious.src = "pagination_back_inactive.png";
          this.view.tablePagination.imgPaginationPrevious.setEnabled(false);
        } else {
          searchSegDataSliced = searchSegData;
          this.view.tablePagination.lblPagination.text = "1 - " + searchSegData.length + " Records";
          this.view.tablePagination.imgPaginationPrevious.src = "pagination_back_inactive.png";
          this.view.tablePagination.imgPaginationPrevious.setEnabled(false);
          this.view.tablePagination.imgPaginationNext.src = "pagination_next_inactive.png";
          this.view.tablePagination.imgPaginationNext.setEnabled(false);
        }
      }
      for (var i = 0; i < searchSegData.length; i++) {
        index += 1;
        var RowVal = {
          lblUserNameValue: {
            "text": searchSegData[i].lblUserNameValue.text
          },
          lblUserRoleValue: {
            "text": searchSegData[i].lblUserRoleValue.text
          },
          lblDropdownValue: {
            "text": searchSegData[i].lblDropdownValue.text,
            "onTouchEnd": scopeObj.selectUnselectUser.bind(this, index)
          },
          lblOpStatus: {
            "text": searchSegData[i].lblOpStatus.text
          }
        };
        RowData.push(RowVal);
      }
      this.view.segmentFileTransactions.setData(RowData);

    },

    populateSignatoryUsers: function(response) {
      var count = 0;
      var dataMap = {
        "flxCreateSignatoryRowTemplate": "flxCreateSignatoryRowTemplate",
        "flxMain": "flxMain",
        "flxHeader": "flxHeader",
        "flxCreateSignatoryRowValues": "flxCreateSignatoryRowValues",
        "lblUserNameValue": "lblUserNameValue",
        "lblUserRoleValue": "lblUserRoleValue",
        "flxSelectAllValues": "flxSelectAllValues",
        "lblDropdownValue": "lblDropdownValue",
        "flxCreateSignatoryHeader": "flxCreateSignatoryHeader",
        "flxCreateSignatory": "flxCreateSignatory",
        "flxCreateSignatoryValues": "flxCreateSignatoryValues",
        "flxTopSeparatorApprove": "flxTopSeparatorApprove",
        "flxUserName": "flxUserName",
        "btnUserName": "btnUserName",
        "imgUserName": "imgUserName",
        "flxUserRole": "flxUserRole",
        "btnUserRole": "btnUserRole",
        "imgUserRole": "imgUserRole",
        "flxSelectAll": "flxSelectAll",
        "lblSelectAll": "lblSelectAll",
        "lblDropdown": "lblDropdown",
        "flxNoRecords": "flxNoRecords",
        "lblNoRecords": "lblNoRecords",
        "lblRowSeparator": "lblRowSeparator",
        "flxBootomSeparatorApprovePending": "flxBootomSeparatorApprovePending"
      };

      this.userValues = response.EligibleSignatories;
      var RowData = [];
      var roles = [];
      var scopeObj = this;
      let index = -1;
      if(this.userValues.length > 10){
        this.userValuesSliced = this.userValues.slice(0,10);
        this.view.tablePagination.lblPagination.text = "1 - 10 Records";
        this.view.tablePagination.imgPaginationPrevious.src = "pagination_back_inactive.png";
        this.view.tablePagination.imgPaginationPrevious.setEnabled(false);
      }
      else
      {
        this.userValuesSliced = this.userValues;
        this.view.tablePagination.lblPagination.text = "1 - "+this.userValuesSliced.length + " Records";
        this.view.tablePagination.imgPaginationPrevious.src = "pagination_back_inactive.png";
        this.view.tablePagination.imgPaginationPrevious.setEnabled(false);
        this.view.tablePagination.imgPaginationNext.src = "pagination_next_inactive.png";
        this.view.tablePagination.imgPaginationNext.setEnabled(false);
      }

      if (this.userValues.length === 0) 
      {
        this.view.tablePagination.flxPagination.setVisibility(false);
        this.view.flxSelectAll.setVisibility(false);
        RowData = [this.setNoRecord()];
      } 
      else 
      {
        this.view.tablePagination.flxPagination.setVisibility(true);
        this.view.flxSelectAll.setVisibility(true);
      }
         var currentbreakpoint =kony.application.getCurrentBreakpoint();
        for (var i = 0; i < this.userValuesSliced.length; i++) {
          if(!roles.includes(this.userValuesSliced[i].role)){
            roles.push(this.userValuesSliced[i].role);
          }
          index += 1;
          var RowVal = {
            lblUserNameValue: {
              "text": this.userValuesSliced[i].fullName
            },
            lblUserRoleValue: {
              "text": this.userValuesSliced[i].role
            },
            lblDropdownValue : {
              "text" : "D",
              "onTouchEnd" : scopeObj.selectUnselectUser.bind(this,index)
            },
            lblOpStatus : {
              "text": this.userValuesSliced[i].userId
            },
            flxSelectAllValues :{
              "left":(currentbreakpoint>=1366) ? "89.5%" : "84",
            },
            flxCreateSignatoryRowValues :{
              "left":(currentbreakpoint>=1366) ? "1.8%" : "1.8",
          }
          };
          RowData.push(RowVal);
        }
  
      this.view.lblUsersValue.text = count.toString();
      
      this.view.segmentFileTransactions.widgetDataMap = dataMap;
      this.view.segmentFileTransactions.rowTemplate = "flxCreateSignatoryRowTemplate";
      this.view.segmentFileTransactions.setData(RowData);
      this.segData = this.view.segmentFileTransactions.data;
      this.setDropDownData(roles);
      
      this.view.btnProceedRoles.text = "Continue";
      this.view.btnProceedRoles.setEnabled(false);
      this.view.btnProceedRoles.onClick = function() {
        scopeObj.navigateToAddUsersVerify();
      }.bind(this);
      this.view.btnModifyRoles.isVisible = false;
    },

    setNoRecord: function() {
      return ({
        "flxNoRecords": {
          "isVisible": true
        },
        "lblNoRecords": {
          "text": "No records are available"
        },
        "flxHeader": {
          "isVisible": false
        },
        "lblRowSeparator": {
          "isVisible": true,
          "text": "-"
        },
      });
    },

    
    setDropDownData : function(roles){
      var scopeObj = this;
      var dropDownDatMap = {
        "flxRowDefaultAccounts" : "flxRowDefaultAccounts",
        "lblDefaultAccountIcon" : "lblDefaultAccountIcon",
        "lblDefaultAccountName" : "lblDefaultAccountName"
      };
      var dropDownRowData = [];
      let dropDownIndex  = -1;
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

      this.view.FilterSignatoryGroup.segAllUsersLIst.widgetDataMap = dropDownDatMap;
      this.view.FilterSignatoryGroup.segAllUsersLIst.setData(dropDownRowData);
    },
    
    
    paginationNext : function(){
      var length = this.userValues.length;
      var floor = Math.floor(length/10);
      if(this.pageCount < floor){
        this.pageCount++;
        var start = this.pageCount*10;
        var end = start + 10;
        var segData = this.userValues.slice(start, end);
        var lblPagination = (start+1).toString() +" - "+ end.toString()+" Records";
        this.view.tablePagination.lblPagination.text = lblPagination;
        let index = -1;
        var RowData = [];
        var roles = [];
        var scopeObj = this;
        for (var i = 0; i < segData.length; i++) {
          if(!roles.includes(segData[i].role)){
            roles.push(segData[i].role);
          }
          index += 1;
          var RowVal = {
            lblUserNameValue: {
              "text": segData[i].fullName
            },
            lblUserRoleValue: {
              "text": segData[i].role
            },
            lblDropdownValue : {
              "text" : "D",
              "onTouchEnd" : scopeObj.selectUnselectUser.bind(this,index)
            },
            lblOpStatus : {
              "text": segData[i].userId
            }
          };
          RowData.push(RowVal);
        }

        this.view.segmentFileTransactions.setData(RowData);
        this.segData = this.view.segmentFileTransactions.data;
        this.setDropDownData(roles);

      }
      else
      {
        this.view.tablePagination.imgPaginationNext.src = "pagination_next_inactive.png";
        this.view.tablePagination.imgPaginationNext.setEnabled(false);
      }
    },
    
    
    paginationPrevious : function(){
      if(this.pageCount !== 0){
        this.pageCount--;
        var start = this.pageCount*10;
        var end = start + 10;
        var segData = this.userValues.slice(start, end);
        var lblPagination = (start+1).toString() +" - "+ end.toString()+" Records";
        this.view.tablePagination.lblPagination.text = lblPagination;
        let index = -1;
        var RowData = [];
        var scopeObj = this;
        var roles = [];
        for (var i = 0; i < segData.length; i++) {
          if(!roles.includes(segData[i].role)){
            roles.push(segData[i].role);
          }
          index += 1;
          var RowVal = {
            lblUserNameValue: {
              "text": segData[i].fullName
            },
            lblUserRoleValue: {
              "text": segData[i].role
            },
            lblDropdownValue : {
              "text" : "D",
              "onTouchEnd" : scopeObj.selectUnselectUser.bind(this,index)
            },
            lblOpStatus : {
              "text": segData[i].userId
            }
          };
          RowData.push(RowVal);
        }
        this.view.segmentFileTransactions.setData(RowData);
        this.segData = this.view.segmentFileTransactions.data;
        this.setDropDownData(roles);
      }
      else
      {
        this.view.tablePagination.imgPaginationPrevious.src = "pagination_back_inactive.png";
        this.view.tablePagination.imgPaginationPrevious.setEnabled(false);
      }
    },
 

    navigateToAddUsersVerify: function() {
      var segData = this.view.segmentFileTransactions.data;
      var selectedSegData = [];
      var count = 0;
      segData.forEach(function(item) {
        if (item.lblDropdownValue.text === 'C') {
          selectedSegData.push(item);
          count++;
        }
      });
      var dataMap = {
        "flxCreateSignatoryRowTemplate": "flxCreateSignatoryRowTemplate",
        "flxMain": "flxMain",
        "flxHeader": "flxHeader",
        "flxCreateSignatoryRowValues": "flxCreateSignatoryRowValues",
        "lblUserNameValue": "lblUserNameValue",
        "lblUserRoleValue": "lblUserRoleValue",
        "flxSelectAllValues": "flxSelectAllValues",
        "lblDropdownValue": "lblDropdownValue",
        "flxCreateSignatoryHeader": "flxCreateSignatoryHeader",
        "flxCreateSignatory": "flxCreateSignatory",
        "flxCreateSignatoryValues": "flxCreateSignatoryValues",
        "flxTopSeparatorApprove": "flxTopSeparatorApprove",
        "flxUserName": "flxUserName",
        "btnUserName": "btnUserName",
        "imgUserName": "imgUserName",
        "flxUserRole": "flxUserRole",
        "btnUserRole": "btnUserRole",
        "imgUserRole": "imgUserRole",
        "flxSelectAll": "flxSelectAll",
        "lblSelectAll": "lblSelectAll",
        "lblDropdown": "lblDropdown",
        "flxBootomSeparatorApprovePending": "flxBootomSeparatorApprovePending"
      };
      var RowData = [];
      var scopeObj = this;
      let index = -1;
      var roles = [];
      for (var i = 0; i < selectedSegData.length; i++) {
          if(!roles.includes(selectedSegData[i].lblUserRoleValue.text)){
            roles.push(selectedSegData[i].lblUserRoleValue.text);
          }
        var RowVal = {
          lblUserNameValue: {
            "text": selectedSegData[i].lblUserNameValue.text
          },
          lblUserRoleValue: {
            "text": selectedSegData[i].lblUserRoleValue.text
          },
          lblDropdownValue: {
            "text": selectedSegData[i].lblDropdownValue.text,
            "onTouchEnd": scopeObj.selectUnselectUser.bind(this, index)
          },
          lblOpStatus: {
            "text": selectedSegData[i].lblOpStatus.text
          },
        };
        RowData.push(RowVal);
      }
      this.view.segmentFileTransactions.widgetDataMap = dataMap;
      this.view.segmentFileTransactions.rowTemplate = "flxAddUserRowTemplate";
      this.view.segmentFileTransactions.setData(RowData);
      this.segData = this.view.segmentFileTransactions.data;
      this.setDropDownData(roles);
      
      this.view.lblUsersValue.text = RowData.length.toString();
      this.view.flxSelectAll.isVisible = false;
      this.view.tablePagination.isVisible = false;
      
      this.view.btnProceedRoles.text = "Add Users";
      this.view.btnProceedRoles.onClick = function() {
        scopeObj.navigateToViewManageSignatory();
      }.bind(this);
      this.view.btnModifyRoles.isVisible = true;
      this.view.btnModifyRoles.onClick = function() {
        scopeObj.populateSignatoryUsers(signatories);
      }.bind(this);
    },

    selectAllUser: function() {
      var checkBoxText;
      var count = 0;
      let segData = this.view.segmentFileTransactions.data;
      if(this.view.CopylblDropdown0fe2ee09157f246.text === "D"){
        this.view.CopylblDropdown0fe2ee09157f246.text = "C";
        checkBoxText = "C";
        count = segData.length.toString();
      }
      else{
        this.view.CopylblDropdown0fe2ee09157f246.text = "D";
        checkBoxText = "D";
        count = "0";
      }
      let index = -1;
      var RowData = [];
      for (var i = 0; i < segData.length; i++) {
        index += 1;
        var RowVal = {
          lblUserNameValue: {
            "text": segData[i].lblUserNameValue.text
          },
          lblUserRoleValue: {
            "text": segData[i].lblUserRoleValue.text
          },
          lblDropdownValue : {
            "text" : checkBoxText,
            "onTouchEnd" : this.selectUnselectUser.bind(this,index)
          },
          lblOpStatus : {
            "text": segData[i].lblOpStatus.text
          }
        };
        RowData.push(RowVal);
      }
      this.view.lblUsersValue.text = count;
      this.view.segmentFileTransactions.setData(RowData);
      if (count > 0)
      {
        this.view.btnProceedRoles.setEnabled(true);
        this.view.btnProceedRoles.skin = "ICSknbtnEnabed003e7536px";
      }
      else
      {
        this.view.btnProceedRoles.setEnabled(false);
        this.view.btnProceedRoles.skin = "sknBtnBlockedSSPFFFFFF15Px";
      }
    },

    selectUnselectRoles : function(index,context){
      let segData = this.view.FilterSignatoryGroup.segAllUsersLIst.data;
      if (segData[index].lblDefaultAccountIcon.text === 'D') {
        segData[index].lblDefaultAccountIcon.text = 'C';
        segData[index].lblDefaultAccountIcon.skin = "sknlblDelete20px";
      }
      else{
        segData[index].lblDefaultAccountIcon.text = 'D';
        segData[index].lblDefaultAccountIcon.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
      }
      this.view.FilterSignatoryGroup.segAllUsersLIst.setData(segData);
    },
    
    applyFilter : function(){
      let segDropDownData = this.view.FilterSignatoryGroup.segAllUsersLIst.data;
      var selectedRoles = [];
      var selectedData = [];
      segDropDownData.forEach(function(item){
        if(item.lblDefaultAccountIcon.text === "C"){
          selectedRoles.push(item.lblDefaultAccountName.text);
        }
      });
      this.segData.forEach(function(data){
        if(selectedRoles.includes(data.lblUserRoleValue.text)){
          selectedData.push(data);
        }
      });
      let index = -1;
      var RowData = [];
      var scopeObj = this;
      if(selectedData.length > 0){
        for (var i = 0; i < selectedData.length; i++) {
          index += 1;
          var RowVal = {
            lblUserNameValue: {
              "text": selectedData[i].lblUserNameValue.text
            },
            lblUserRoleValue: {
              "text": selectedData[i].lblUserRoleValue.text
            },
            lblDropdownValue : {
              "text" : selectedData[i].lblDropdownValue.text,
              "onTouchEnd" : scopeObj.selectUnselectUser.bind(this,index)
            },
            lblOpStatus : {
              "text": selectedData[i].lblOpStatus.text
            }
          };
          RowData.push(RowVal);
        }
        this.view.segmentFileTransactions.setData(RowData);
      }
      this.view.FilterSignatoryGroup.flxFilterGroup.isVisible = false;
    },

    selectUnselectUser: function(index, context) {
      let segData = this.view.segmentFileTransactions.data;
      if (segData[index].lblDropdownValue.text === 'D') {
        segData[index].lblDropdownValue.text = 'C';
        segData[index].lblDropdownValue.skin = "sknlblDelete20px";
      } else {
        segData[index].lblDropdownValue.text = 'D';
        segData[index].lblDropdownValue.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
      }
      this.view.segmentFileTransactions.setData(segData);
      var count = 0;
      segData.forEach(function(item) {
        if (item.lblDropdownValue.text === 'C') {
          count++;
        }
      });
      this.view.lblUsersValue.text = count.toString();
      if (count > 0)
      {
        this.view.btnProceedRoles.setEnabled(true);
        this.view.btnProceedRoles.skin = "ICSknbtnEnabed003e7536px";
      }
      else
      {
        this.view.btnProceedRoles.setEnabled(false);
        this.view.btnProceedRoles.skin = "sknBtnBlockedSSPFFFFFF15Px";
      }
      if(segData.length === count)
        {
          this.view.CopylblDropdown0fe2ee09157f246.text = "C";
        }
      else 
      {
        if(segData.length !== count && count > 0)
          this.view.CopylblDropdown0fe2ee09157f246.text = "z";
        else
          this.view.CopylblDropdown0fe2ee09157f246.text = "D";
      }
    },

    navigateToViewManageSignatory: function() {
      var scope = this;
      var signatory = [];
      var selectedSegData = this.view.segmentFileTransactions.data;
      for (var i = 0; i < selectedSegData.length; i++) {
        var RowVal = {
          customerId:  selectedSegData[i].lblOpStatus.text,
          isuserRemoved : "false"
          };
        
        signatory.push(RowVal);
      }
      var params = {
        "signatoryGroupId": applicationManager.getConfigurationManager().signatoryGroupId,
        "signatoryGroupName": applicationManager.getConfigurationManager().signatoryGroupName,
        "signatoryGroupDescription": applicationManager.getConfigurationManager().signatoryGroupDescription,
        "contractId": applicationManager.getConfigurationManager().contractId,
        "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId,
        "signatories": JSON.stringify(signatory)
      };
      scope.loadSettingsNewModule().presentationController.updateSignatoryGroupdetailsFromAddUsers(params);
    },

    navigateBack: function()
    {
      applicationManager.getNavigationManager().navigateTo("frmViewManageSignatoryGroup");
    }
  };
});