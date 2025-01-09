define(['CommonUtilities', 'FormControllerUtility', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, FormControllerUtility, ViewConstants, OLBConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();

  //Type your controller code here 
  return{
    modifyFlag : false,
    onNavigate: function(params) {
      if(params !== undefined && params !== "" && params !== null)
        {
      if(params === "fromverify")
            this.modifyFlag = true;
        }
      else
        this.modifyFlag = false;
    },
    onBreakpointChange: function(width) {
        this.view.customheadernew.onBreakpointChangeComponent(width);
      },
    
    preShow : function(){
      var scope = this;
      this.fetchEligibleSignatoryUsers();
      this.view.btnProceedRoles.skin = "sknBtnBlockedSSPFFFFFF15Px";
      this.view.btnProceedRoles.setEnabled(false);
      this.view.lblCustomerHeaderValue.text = applicationManager.getConfigurationManager().coreCustomerNameTruncated;
      this.view.lblCustomerHeaderValue.toolTip = applicationManager.getConfigurationManager().coreCustomerName;
      this.view.lblCustomerIDValue.text = applicationManager.getConfigurationManager().coreCustomerID ;
      this.view.lblContractValue.text = applicationManager.getConfigurationManager().contractNameTruncated ;
      this.view.lblContractValue.toolTip = applicationManager.getConfigurationManager().contractName;
      this.view.btnProceedRoles.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue");
      this.view.btnCancelRoles.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
      this.view.btnUserName.text = kony.i18n.getLocalizedString("i18n.accountDetail.customerName");
      if(!this.modifyFlag)
      {
        this.view.tbxGroupNameValue.text = "";
        this.view.tbxGroupDescValue.text = "";
        this.view.lblUsersValue.text = "0";
        this.view.CopylblDropdown0fe2ee09157f246.text = "D";
      }else{
        this.checkAvailability();
      }      
      this.view.btnCheckAvailability.setVisibility(true);
      this.view.flxAvailabilityStatus.setVisibility(false);
      this.view.flxMainWrapper.setVisibility(false);
      this.view.btnProceedRoles.onClick = function() {
        scope.navigateToVerify();
      }.bind(this);
      this.view.btnCancelRoles.onClick = function() {
        scope.navigateToViewApprovalMatrix();
      }.bind(this);
      this.view.flxShowAllUsers.onClick = function() {
        scope.showDropdown();
      }.bind(this);
      this.view.CopylblDropdown0fe2ee09157f246.onTouchEnd = function() {
        scope.selectAllUser();
      }.bind(this);
      this.view.Search.txtSearch.onKeyUp = function(){
        scope.searchUsers();
      }.bind(this);
      this.view.btnCheckAvailability.onClick = function() {
        scope.checkAvailability();
      }.bind(this);
      this.view.btnApplyDropDown.onClick = function() {
        scope.applyFilter();
      }.bind(this);
      this.view.btnCancelDropDown.onClick = function() {
        scope.cancelFilter();
      }.bind(this);
      this.view.flxPaginationNext.onClick = function() {
        scope.paginationNext();
      }.bind(this);
      this.view.flxPaginationPrevious.onClick = function() {
        scope.paginationPrevious();
      }.bind(this);
      this.view.tbxGroupNameValue.onTextChange = function(txt) {
        var validateGroup = false;
      try{
      if(!kony.sdk.isNullOrUndefined(txt)){
          if(!kony.sdk.isNullOrUndefined(txt.text)){
            if(!(txt.text.length===0)){
              validateGroup=this.validateGroupName(txt.text);
            }
          }
        }
      }catch(err){}
        scope.resetavailabiltyUI();
        if(validateGroup){
            //isValid
            //show normal skin
          this.view.flxGroupNameValue.skin = "skne3e3e3br3pxradius"; 
          this.view.btnCheckAvailability.setVisibility(true);
          this.view.flxAvailabilityStatus.setVisibility(false);
        } else {
            //isInvalid
            //show red skin
          this.view.flxGroupNameValue.skin 
            = "bbSknFlxBdrff0000Radius3Px";
          this.view.flxAvailabilityStatus.setVisibility(false);
          this.view.btnCheckAvailability.setVisibility(false);
        }
    }.bind(this);
	  this.view.imgCloseDowntimeWarning.onTouchEnd = function() {
        scope.view.flxMainWrapper.setVisibility(false);
      }.bind(this);
      this.pageCount = 0;
    },
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if(viewModel.eligibleSignatoryGroups) {
          if(!this.modifyFlag)
          this.populateSignatory(viewModel.eligibleSignatoryGroups);
        }
        if(viewModel.checkSigGrpAvailability) {
          this.availabilityStatus(viewModel.checkSigGrpAvailability);
        }
      }
    },
    
    validateGroupName: function(e) {
      var isValid1 = e.match(/^[a-zA-Z0-9][a-zA-Z0-9 \-_]+$/);
      var isValid2 = e.match(/^[a-zA-Z0-9]+$/);
      var isValid3 = e.match(/^[a-z0-9].*[a-z0-9]$/i);
      return isValid2||(isValid1&&isValid3);
    },
    paginationNext : function(){
      var length = this.userValues.length;
      var floor = Math.floor(length/10);
      if(this.pageCount < floor){
        this.pageCount++;
        var start = this.pageCount*10;
        var end = start + 10;
        var segData = this.userValues.slice(start, end);
        var lblPagination = (start+1).toString() +" - "+ end.toString()+ " "+kony.i18n.getLocalizedString("i18n.ExportLC.Records");
        this.view.lblPagination.text = lblPagination;
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
			userName:segData[i].userName,
            lblUserRoleValue: {
              "text": segData[i].role
            },
            lblDropdownValue : {
              "text" : "D",
              "onTouchEnd" : scopeObj.selectUnselectUser.bind(this,index)
            },
            lblOpStatus : {
              "text": segData[i].userId
            },
			imgUserName: {
              "src": "sorting.png"
            },
            imgUserRole: {
              "src": "sorting.png"
            },
			fullName: this.userValuesSliced[i].fullName,
            role: this.userValuesSliced[i].role
          };
          RowData.push(RowVal);
        }

        this.view.segmentFileTransactions.setData(RowData);
        this.segData = this.view.segmentFileTransactions.data;
        this.view.flxNoRecords.setVisibility(RowData.length <= 0);
        this.setDropDownData(roles);
        this.sortName();
		this.view.flxUserName.onClick = this.sortName.bind(this);
        this.view.flxUserRole.onClick = this.sortRole.bind(this);

      }
    },
    onBreakpointChange: function(width) {
        this.view.customheadernew.onBreakpointChangeComponent(width);
      },
    
    paginationPrevious : function(){
      if(this.pageCount !== 0){
        this.pageCount--;
        var start = this.pageCount*10;
        var end = start + 10;
        var segData = this.userValues.slice(start, end);
        var lblPagination = (start+1).toString() +" - "+ end.toString()+ " "+kony.i18n.getLocalizedString("i18n.ExportLC.Records");
        this.view.lblPagination.text = lblPagination;
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
			userName:segData[i].userName,
            lblUserRoleValue: {
              "text": segData[i].role
            },
            lblDropdownValue : {
              "text" : "D",
              "onTouchEnd" : scopeObj.selectUnselectUser.bind(this,index)
            },
            lblOpStatus : {
              "text": segData[i].userId
            },
			imgUserName :{
              "src": "sorting.png"
            },
			imgUserRole :{
              "src": "sorting.png"
            },
			fullName :this.userValuesSliced[i].fullName,
            role :this.userValuesSliced[i].role
          };
          RowData.push(RowVal);
        }
        this.view.segmentFileTransactions.setData(RowData);
        this.view.flxNoRecords.setVisibility(RowData.length <= 0);
        this.segData = this.view.segmentFileTransactions.data;
        this.setDropDownData(roles);
        this.sortName();
        this.view.flxUserName.onClick =this.sortName.bind(this);
        this.view.flxUserRole.onClick =  this.sortRole.bind(this);
      }
    },
    sortRole: function() {
      var scopeObj = this;
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
      for(let i = 0; i < rowData.length; i++ ) {
        rowData[i]["lblDropdownValue"].onTouchEnd = scopeObj.selectUnselectUser.bind(this, i);
      }
      this.view.segmentFileTransactions.setData(rowData);
      this.view.forceLayout();
    },
    sortName: function() {
      var scopeObj = this;
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
      for(let i = 0; i < rowData.length; i++ ) {
        rowData[i]["lblDropdownValue"].onTouchEnd = scopeObj.selectUnselectUser.bind(this, i);
      }
      this.view.segmentFileTransactions.setData(rowData);
      this.view.forceLayout();
    },
    
    cancelFilter : function(){
      this.view.flxAllUsersList.setVisibility(false);
     // this.view.segmentFileTransactions.setData(this.segData);
    },
    
    availabilityStatus : function(response){
      if(response.status){
        this.view.btnCheckAvailability.setVisibility(false);
        this.view.flxAvailabilityStatus.setVisibility(true);
        this.view.btnProceedRoles.skin = "ICSknbtnEnabed003e7536px";
        this.view.btnProceedRoles.setEnabled(true);
      }
      else{
        this.view.btnCheckAvailability.setVisibility(true);
        this.view.flxAvailabilityStatus.setVisibility(false);
        this.view.lblDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.groupNotAvailable");
        this.view.flxMainWrapper.setVisibility(true);
        this.view.btnProceedRoles.setEnabled(false);
        this.view.imgCloseDowntimeWarning.onTouchEnd = function()
        {
            this.view.flxMainWrapper.setVisibility(false);
        }.bind(this);
      }
      this.view.forceLayout();
    },
    
    checkAvailability : function(){
      if(this.view.tbxGroupNameValue.text !== ""){
        var sigGrpName = this.view.tbxGroupNameValue.text;
        var filterKey = {
          "signatoryGroupName": sigGrpName,
          "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId
        };
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.checkSigGrpAvailability(filterKey);
      }
    },
    
    searchUsers : function(){
      var scope = this;
      var searchText = this.view.Search.txtSearch.text.toLowerCase();
      //var segData = this.view.segmentFileTransactions.data;
      var searchSegData = [];
      this.segData.forEach(function(item) {
        if (item.lblUserNameValue.text.toLowerCase().includes(searchText) || item.lblUserRoleValue.text.toLowerCase().includes(searchText) || item.lblOpStatus.text.toLowerCase().includes(searchText) || (!kony.sdk.isNullOrUndefined(item.userName) && item.userName.toLowerCase().includes(searchText))) {
          if(!searchSegData.includes(item))
            searchSegData.push(item);
        }
      });
      let index = -1;
      var RowData = [];
      var scopeObj = this;
      for (var i = 0; i < searchSegData.length; i++) {
        index += 1;
        var RowVal = {
          lblUserNameValue: {
            "text": searchSegData[i].lblUserNameValue.text
          },
		  userName:searchSegData[i].userName,
          lblUserRoleValue: {
            "text": searchSegData[i].lblUserRoleValue.text
          },
          lblDropdownValue : {
            "text" : searchSegData[i].lblDropdownValue.text,
            "onTouchEnd" : scopeObj.selectUnselectUser.bind(this,index)
          },
          lblOpStatus : {
            "text": searchSegData[i].lblOpStatus.text
          },
		  imgUserName: {
            "src": searchSegData[i].imgUserName.text
          },
          imgUserRole: {
            "src": searchSegData[i].imgUserRole.text
          },
		  fullName: searchSegData[i].fullName,
          role: searchSegData[i].role
        };
        RowData.push(RowVal);
      }
      this.view.segmentFileTransactions.setData(RowData);
      this.view.flxNoRecords.setVisibility(RowData.length <= 0);
	  if(this.view.imgUserName.src !== "sorting.png"){
		  if (this.view.imgUserName.src === "sorting_previous.png") {
			this.view.imgUserName.src = "sorting_next.png";
		  } else if (this.view.imgUserName.src === "sorting_next.png") {
			this.view.imgUserName.src = "sorting_previous.png";
		  }
		  this.sortName();
		}
		else if(this.view.imgUserRole.src !== "sorting.png"){
		
			if (this.view.imgUserRole.src === "sorting_previous.png") {
				this.view.imgUserRole.src = "sorting_next.png";
			  } else if (this.view.imgUserRole.src === "sorting_next.png") {
				this.view.imgUserRole.src = "sorting_previous.png";
			  }
			  this.sortRole();
		}
    },
    
    fetchEligibleSignatoryUsers : function (){
      var filterKey = {
        "contractId": applicationManager.getConfigurationManager().contractId,
        "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId
      };
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.fetchEligibleSignatoryUsers(filterKey);
    },
    
    populateSignatory : function(response){
      var dataMap = {
        "flxCreateSignatoryRowTemplate": "flxCreateSignatoryRowTemplate",
        "flxMain": "flxMain",
        "flxHeader": "flxHeader",
        "flxCreateSignatoryRowValues": "flxCreateSignatoryRowValues",
        "lblUserNameValue": "lblUserNameValue",
        "lblUserRoleValue": "lblUserRoleValue",
        "flxSelectAllValues": "flxSelectAllValues",
        "lblDropdownValue": "lblDropdownValue",
        "flxCreateSignatoryHeader" : "flxCreateSignatoryHeader",
        "flxCreateSignatory" : "flxCreateSignatory",
        "flxCreateSignatoryValues" : "flxCreateSignatoryValues",
        "flxTopSeparatorApprove" : "flxTopSeparatorApprove",
        "flxUserName" : "flxUserName",
        "btnUserName" : "btnUserName",
        "imgUserName" : "imgUserName",
        "flxUserRole" : "flxUserRole",
        "btnUserRole" : "btnUserRole",
        "imgUserRole" : "imgUserRole",
        "flxSelectAll" : "flxSelectAll",
        "lblSelectAll" : "lblSelectAll",
        "lblDropdown" : "lblDropdown",
        "flxBootomSeparatorApprovePending" : "flxBootomSeparatorApprovePending"
        
      };
      
      this.userValues = response.EligibleSignatories;
      var slicedUsers = this.userValues;
      if(this.userValues.length === 0){
        this.view.flxPagination.setVisibility(false);
        this.view.flxSelectAll.setVisibility(false);
      }
      else{
        this.view.flxPagination.setVisibility(true);
        this.view.flxSelectAll.setVisibility(true);
      }
      if(this.userValues.length > 10){
        this.userValuesSliced = this.userValues.slice(0,10);
		this.view.imgPaginationPrevious.src = "pagination_back_blue.png";
        this.view.imgPaginationPrevious.setEnabled(true);
        this.view.imgPaginationNext.src = "pagination_next_active.png";
        this.view.imgPaginationNext.setEnabled(true);
      }
      else{
        this.userValuesSliced = this.userValues; 
        this.view.imgPaginationPrevious.src = "pagination_back_inactive.png";
        this.view.imgPaginationPrevious.setEnabled(false);
        this.view.imgPaginationNext.src = "pagination_next_inactive.png";
        this.view.imgPaginationNext.setEnabled(false);
      }
       
      this.view.lblPagination.text = (1).toString() + " - " + this.userValuesSliced.length.toString() + " "+kony.i18n.getLocalizedString("i18n.ExportLC.Records");
      var RowData = [];
      var roles = [];
      var scopeObj = this;
      let index = -1;
      
      for (var i = 0; i < this.userValuesSliced.length; i++) {
        if(!roles.includes(this.userValuesSliced[i].role)){
          roles.push(this.userValuesSliced[i].role);
        }
        index += 1;
        var RowVal = {
          lblUserNameValue: {
            "text": this.userValuesSliced[i].fullName
          },
		  userName:this.userValuesSliced[i].userName,
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
		  imgUserName: {
            "src": "sorting.png"
          },
          imgUserRole: {
            "src": "sorting.png"
          },
		  fullName: this.userValuesSliced[i].fullName,
          role: this.userValuesSliced[i].role
        };
        RowData.push(RowVal);
      }
      let count = 0;
      RowData.forEach(function(item) {
        if (item.lblDropdownValue.text === 'C') {
          count++;
        }
      });
      this.view.lblUsersValue.text = count.toString();
      this.view.segmentFileTransactions.widgetDataMap = dataMap;
      this.view.segmentFileTransactions.setData(RowData);
      this.view.flxNoRecords.setVisibility(RowData.length <= 0);
      this.segData = this.view.segmentFileTransactions.data;
      this.setDropDownData(roles);
      this.sortName();
	  this.view.flxUserName.onClick = this.sortName.bind(this);
      this.view.flxUserRole.onClick = this.sortRole.bind(this);
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
      this.view.segAllUsersLIst.widgetDataMap = dropDownDatMap;
      this.view.segAllUsersLIst.setData(dropDownRowData);
    },
    
    selectUnselectUser : function(index,context){
      let segData = this.view.segmentFileTransactions.data;
      if (segData[index].lblDropdownValue.text === 'D') {
        segData[index].lblDropdownValue.text = 'C';
        //segData[index].lblDropdownValue.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
        segData[index].lblDropdownValue.skin = "sknlblDelete20px";
      }
      else{
        segData[index].lblDropdownValue.text = 'D';
        //segData[index].lblDropdownValue.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
        segData[index].lblDropdownValue.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
      }
      this.view.segmentFileTransactions.setData(segData);
      var count = 0;
      segData.forEach(function(item){
        if (item.lblDropdownValue.text === 'C') {
          count++;
        }
      });
      this.view.lblUsersValue.text = count.toString();
       if(segData.length === count)
        {
          this.view.CopylblDropdown0fe2ee09157f246.text = "C";
        }
      else 
      {
        if(segData.length !== count && count > 0)
          this.view.CopylblDropdown0fe2ee09157f246.text = "y";
        else
          this.view.CopylblDropdown0fe2ee09157f246.text = "D";
      }
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
			userName:selectedData[i].userName,
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
      this.view.flxAllUsersList.setVisibility(false);
//       else
//         this.view.segmentFileTransactions.setData(this.segData);
    },
    
    selectAllUser : function(){
      var checkBoxText;
      var count;
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
		  userName:segData[i].userName,
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
    },
    
    
    navigateToVerify : function(){
      var segData = this.view.segmentFileTransactions.data;
      var selectedSegData = [];
      var selectedCustomerId = [];
      var CustomerIds = []
      var count = 0;
      segData.forEach(function(item){
        if (item.lblDropdownValue.text === 'C') {
          selectedSegData.push(item);
          selectedCustomerId.push(item.lblOpStatus.text);
          count++;
        }
      });
      
      
      selectedCustomerId.forEach(function(item){
        var obj = {};
        obj["customerId"] = item;
        CustomerIds.push(obj);
      });
      
      applicationManager.getConfigurationManager().groupName = this.view.tbxGroupNameValue.text;
      applicationManager.getConfigurationManager().groupDesc = this.view.tbxGroupDescValue.text;
      applicationManager.getConfigurationManager().totalSelectedUsers = count.toString();
      applicationManager.getConfigurationManager().selectedSegmentData = selectedSegData;
      var signatories = JSON.stringify(CustomerIds);
      applicationManager.getConfigurationManager().signatories = signatories;
      applicationManager.getNavigationManager().navigateTo("frmCreateSignatoryGroupVerifyAndConfirm");
    },
    
    navigateToViewApprovalMatrix : function(){
      var input = {
		"contractId": applicationManager.getConfigurationManager().contractId,
        "coreCustomerId": applicationManager.getConfigurationManager().coreCustomerId
       };
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.getAllSignatoryGroups(input);
    },
    
    showDropdown : function(){
      if(this.view.flxAllUsersList.isVisible === false){
        this.view.flxAllUsersList.setVisibility(true);
        this.view.imgAllUsersDropdown.text = "P";
      }
       else{
        this.view.flxAllUsersList.setVisibility(false); 
        this.view.imgAllUsersDropdown.text = "O";
       }
        
    },
    
    resetavailabiltyUI : function()
    {
      if(this.view.flxAvailabilityStatus.isVisible)
        {
          this.view.flxAvailabilityStatus.setVisibility(false);
          this.view.btnCheckAvailability.setVisibility(true);
       }
       if(this.view.flxMainWrapper.isVisible)
        {
        this.view.flxAvailabilityStatus.setVisibility(false);
        this.view.flxMainWrapper.setVisibility(false);
        this.view.btnCheckAvailability.setVisibility(true);

       }
    }
  };
});
