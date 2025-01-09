define(['FormControllerUtility'], function (FormControllerUtility) {

  //Type your controller code here 
  return{
    //data will come here and accordingly foreach loop is going to be  applied and data is assigned
    preShow: function () {     
      this.segmentData=[];
      this.headerData=[];
      this.view.TabBodyNew.resetCollapseSection();
      this.view.customheadernew.activateMenu("Settings", "Approval Matrix");
      this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      this.view.Search.txtSearch.skin = "skntbxffffffnoborder727272SSP15px";
      this.view.Search.txtSearch.placeholderSkin = "ICSknTbxPlaceholderSSP72727215px";
      this.view.Search.flxtxtSearchandClearbtn.skin = "skne3e3e3br3pxradius";
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader','flxFooter','flxMain','flxFormContent']);
      this.view.Search.txtSearch.onKeyUp=this.searchSegment.bind(this);
      this.view.flxDowntimeWarning.isVisible = false;
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.customheadernew.activateMenu(kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approvalMatrix"));
      this.view.btnBack.onClick = this.onClickOfBack.bind(this);
      this.setIdleTimeOut();
    },
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.isSegData) this.setSegregatedData(viewModel.data);
        if(viewModel.isContractsPresent) this.setContractsForAccountList(viewModel);
        if(viewModel.approvalMatrixError) this.showErrorMessageForApprovalMatrix(viewModel.approvalMatrixError);
        this.adjustScreen();
        this.view.forceLayout();
      }
    },
    
    postShow: function(){
      applicationManager.getNavigationManager().applyUpdates(this);
    },
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    searchSegment: function(){
      var searchkey=this.view.Search.txtSearch.text;
      var settingsnewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      settingsnewModule.searchSegmentDataforAccountLevel(searchkey);
    },
    setContractsForAccountList: function(viewModel){
      this.contractDetails = viewModel.contractDetails;
      var settingsnewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      settingsnewModule.fetchAccountsList(viewModel.contractDetails.coreCustomerID, viewModel.contractDetails.contractId);
    },
    showErrorMessageForApprovalMatrix : function(error){
      this.view.flxDowntimeWarning.isVisible = true;
      this.view.rtxDowntimeWarning.text = error.errorMessage;
      this.view.forceLayout();
    },
    setSegregatedData : function(data){
    this.segmentData=data;
      var headerData=[];
      var sectionData=[];
      data.forEach(item=>{
        headerData.push(item[0]);
        sectionData.push(item[1]);
      })
      this.setUpDataSectionHeadersForAccountLevel(headerData);
      this.settingUIforSectionHeadersAccountLevel();
      if(this.view.Search.txtSearch.text){
        this.segmentData.forEach((element,index)=>{
          this.addSectionandRows(index);
        });
      }
      },
    adjustScreen: function () {
      this.view.forceLayout();
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0)
          this.view.flxFooter.top = mainheight + diff + "dp";
        else
          this.view.flxFooter.top = mainheight + "dp";
      } else {
        this.view.flxFooter.top = mainheight + "dp";
      }
      this.view.forceLayout();
    },

    addSectionandRows: function(index) {
      var updateParams = {
        "lblDropDown": {
          "text": "P"
        },
      };
      this.view.TabBodyNew.addRowsAndUpdateSection(this.setUpDataSectionRowsForAxxountLevel(index), index, updateParams);
      this.adjustScreen();
    },

    addRowsonClick: function(index){
      var segData = this.view.TabBodyNew.segTemplates.data;
      var sectionData = segData[index];
      var updateParams = {
        "lblDropDown" : {"text" : "P"},
      };
      var updateCollapseParams = {
        "lblDropDown" : {"text" : "O"},
      };
      if(sectionData[0].lblDropDown.text === "O") {
        this.view.TabBodyNew.addRowsAndUpdateSection(this.setUpDataSectionRowsForAxxountLevel(index), index, updateParams, updateCollapseParams);
      }
      else {
        if(this.view.Search.txtSearch.text){
          this.view.TabBodyNew.collapseSection(updateCollapseParams,index);
        }
        else{
          this.view.TabBodyNew.collapseSection(updateCollapseParams);
        }
      }
      this.adjustScreen();
    },

    setUpDataSectionHeadersForAccountLevel: function(data){
      var res=[];
      data.forEach(item=>{
        res.push({"lblAccountType":item.lblHeader,
                  "lblDropDown":{"text":"O"},
                  "flxDropDown" : {
                    "onClick" : function(eventobject, context) {
                      this.addRowsonClick(context.sectionIndex);
                    }.bind(this)
                  },
                  "lblHeaderSeparator": {
                        "isVisible": true
                    }
                 })
      });
        
      this.headerData=res;
      },

    setUpDataSectionRowsForAxxountLevel : function(sectionIndex){
      var segData=this.segmentData
      var sectionData=[];
      segData.forEach(item=>{
        sectionData.push(item[1]);
      })
      var rowData=[];
      var appendData={
        "template":"flxAccountNameHeader",
        "lblName":{"text":"Account Name"},
        "imgName":{"src":"sorting_next.png"},
        "lblView":{"text":"Account Level"},
        "flxAccountName": {
                    "isVisible": true,
					"onClick": function(eventobject, context) {
                            var segDataForSort = this.view.TabBodyNew.segTemplates.data;
							var settingsnewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
							settingsnewModule.sortSegmentDataforAccountLevel(segDataForSort,context.sectionIndex,"imgName","accountName")
							this.view.TabBodyNew.segTemplates.setData(segDataForSort);
							this.adjustScreen();
                        }.bind(this)
                },
        "flxAccountLevel":{"isVisible":true},
        "lblRowSeparator": {
            "isVisible": true
         },
      };
      if(!sectionData[sectionIndex][0].template)
            sectionData[sectionIndex].splice(0, 0, appendData);
            sectionData[sectionIndex].forEach((element,index) => {
				if(index === 0){
					rowData.push(sectionData[sectionIndex][0])
				}
				else{
               var settingsnewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
                var isMatrixDisabled = applicationManager.getNavigationManager().getCustomInfo("frmViewApprovalsMatrix");
                var btnEditText = kony.i18n.getLocalizedString("i18n.locateus.view") + 
                    ((isMatrixDisabled) ? "" : "/" + kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent"));
                rowData.push({
                  "accountName": element.processedName,
                  "accountId" : element.accountID,
                  "lblSeparator": {
                      "isVisible": true
                   },
                  "btnEditViewPermission": {
                    "text": btnEditText,
                    "onClick" : function(eventObject, context){
                      FormControllerUtility.showProgressBar(this.view);
                      let section = context.sectionIndex;
                      let row = context.rowIndex;
                      let data = this.view.TabBodyNew.segTemplates.data[section][1][row];
                      let request = JSON.parse(JSON.stringify(this.contractDetails));
                      request["accountId"] = data.accountId;
                      request["accountName"] = data.accountName;
                      request.entryPoint = kony.application.getCurrentForm().id;
                      settingsnewModule.fetchApprovalMatrix(request);
                     }.bind(this)
                  }
                })
				}
            });
            return rowData; //[{},{},{}]
    },
    segReloadAction: function () {
      this.adjustScreen();
    },

    settingUIforSectionHeadersAccountLevel : function(){
      var headingData=this.headerData
      this.view.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxAccountLevelSelection";
      this.view.TabBodyNew.segTemplates.rowTemplate = "flxAccountEdit";
      this.view.TabBodyNew.segTemplates.widgetDataMap = this.getAccountLevelDataMap();
      this.view.TabBodyNew.setSegmentReloadAction(this.segReloadAction);
      this.view.TabBodyNew.addOnlySectionHeaders(headingData);
    },

    getAccountLevelDataMap : function(){
      var widgetDataMap = {
        "flxDropDown": "flxDropDown",
        "lblAccountType": "lblAccountType", 
        "lblDropDown":"lblDropDown",
        "lblHeadingBottom":"lblHeadingBottom",
        "lbAccountName":"accountName",
        "btnEditViewPermission":"btnEditViewPermission",
        "template":"template",
        "lblName":"lblName",
        "imgName":"imgName",
        "lblView":"lblView",
        "flxAccountName":"flxAccountName",
        "flxAccountLevel":"flxAccountLevel",
        "lblHeaderSeparator": "lblHeaderSeparator",
        "lblRowSeparator":"lblRowSeparator",
        "lblSeparator": "lblSeparator"
      };
      return widgetDataMap;
    },
    onClickOfBack: function(){
      this.presenter.backNavigateToViewMatrix();   
    },
    onClickOfDeviceBack: function(contextAction){
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({appName: "AuthenticationMA",moduleName: "AuthUIModule"});
      var context = {
        action: contextAction
      };
      authModule.presentationController.doLogout(context);
    },
    setIdleTimeOut : function(){
      kony.application.registerForIdleTimeout(
        applicationManager.getConfigurationManager().constants.IDLE_TIMEOUT, this.onClickOfDeviceBack.bind(this, "SessionExpired"));
    },
    showLoadingScreen: function(){
      FormControllerUtility.showProgressBar(this.view);
    },
    hideLoadingScreen:function(){
      FormControllerUtility.hideProgressBar(this.view);
  	}
  };
});