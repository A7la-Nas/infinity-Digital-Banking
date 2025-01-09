define({ 

    //Type your controller code here 
   entityList: null,
    init : function(){
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },

    preshow : function(){
      	var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var navManager = applicationManager.getNavigationManager();
        var isIphone = deviceUtilManager.isIPhone();
      var scopeObj = this;
        if(isIphone){
            this.view.flxHeader.isVisible = false;
        }
        else
            this.view.flxHeader.isVisible = true;
        var entities = navManager.getCustomInfo("frmEBankingAccess");
        this.entityList = undefined;
        this.view.tbxSearchByKeyword.onTextChange = this.searchEntity;
        this.setFlowActions();
        this.hidePopup();
        this.setUI(entities);
        this.disableButton(this.view.btnDisableEBankingAccess);
        this.setSegmentData(entities);
        
    },

    setUI : function(entities){
      	var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var isIphone = deviceUtilManager.isIPhone();
      if(entities.customerlegalentity.length > 5){
        this.view.flxSelectAll.setVisibility(true);
        this.view.flxSearchContainer.setVisibility(true);
        this.view.flxSeparator3.setVisibility(true);
        if(isIphone) this.view.flxMainContainer.top = "56dp";
        else this.view.flxMainContainer.top = "111dp";
      }
    },

    setFlowActions : function(){
        this.view.btnCancel.onClick = this.hidePopup;
        this.view.btnRemove.onClick = this.showAck;
        this.view.btnDisableEBankingAccess.onClick = this.showPopup;
        this.view.flxSelectAllImg.onClick = this.toggleSelectAllCheckBox;
        this.view.onDeviceBack = this.flxBackOnclick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnclick;
    },

    showPopup : function(){
        //this.view.CopylblText0gba1e557bfd643.text = "Disable e-Banking Access";
        this.view.flxPopup1.setVisibility(true);
    },

    hidePopup : function(){
        this.view.flxPopup1.setVisibility(false);
        this.resetSelectedEntities();
    },
    
  resetSelectedEntities: function() {
    var scopeobj = this;
    var data = this.view.segListOfEntities.data;
    var defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
    if(data !== undefined || data!==null){
    for (var index = 0; index < data.length; index++) {
      if (data[index].Status_id !== "SID_CUS_SUSPENDED") {
        data[index]['imgSelect'] = {
          "src": "inactivecheckbox_2.png"
        };
      }
      if (data[index].legalEntityId === defaultEntity && data[index].Status_id === "SID_CUS_SUSPENDED") {
        data[index]['flxDefaultEntity'] = {
          "isVisible": false,
        }
      }
    }
    this.view.segListOfEntities.setData(data);
    }
    this.view.imgSelectAll.src = "inactivecheckbox_2.png";
    scopeobj.disableButton(this.view.btnDisableEBankingAccess);
  },
  
   disableButton: function(button) {
            button.setEnabled(false);
            button.skin = "sknBtnE2E9F0Rounded";
   },
   enableButton: function(button) {
            button.setEnabled(true);
            button.skin = "sknBtn0095e4RoundedffffffSSP26px";
   },

   setSegmentData : function(entities){
     var navManager = applicationManager.getNavigationManager();
     this.view.segListOfEntities.widgetDataMap = this.getWidgetMap();
     var data = this.formatEntities(entities.customerlegalentity);
     this.view.segListOfEntities.setData(data);
     this.entityList = data;
     navManager.setCustomInfo("frmEBankingAccess", {"customerlegalentity": data});
     applicationManager.getPresentationUtility().dismissLoadingScreen();
   },
  
   formatEntities : function(data){
     var activeEntities = [];
     var inactiveEntities = [];
     var scopeObj = this;
     var defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
     for (var arrIndex = 0; arrIndex < data.length; arrIndex++) {
                if (data[arrIndex].legalEntityId === defaultEntity && data[arrIndex].Status_id === "SID_CUS_ACTIVE") {
                    data[arrIndex]['flxDefaultEntity'] = {
                        "isVisible": true
                        //"left" : 50 + data[arrIndex].companyName.length + 5 + "dp"
                    }
                }
                data[arrIndex]["btnTnC"] = {
                    "onClick": this.showTnC
                },
                data[arrIndex]['lblIAccept'] = {
                     "text": "I accept"
                };
                switch (data[arrIndex].Status_id) {
                    case "SID_CUS_ACTIVE":
                        activeEntities.push(data[arrIndex]);
                        data[arrIndex]['flxSelect'] = {
                            //"onClick": this.toggleCheckBox(context)
                          "onClick": function(eventobject, context) {
                            scopeObj.toggleCheckBox(context);
                            }.bind(this)
                        },
                        data[arrIndex]['lblStatus'] = {
                                "text": "Active"
                        },
                        data[arrIndex]['imgSelect'] = {
                            "src": "inactivecheckbox_2.png"
                        };
                        break;
                    case "SID_CUS_SUSPENDED":
                        
                            data[arrIndex]['lblStatus'] = {
                                "text": "Inactive"
                            },
                            data[arrIndex]['flxAcceptTnC'] = {
                                "isVisible": false
                            },
                            data[arrIndex]['imgSelect'] = {
                                "src": "checkboxempty1.png"
                            },
                            data[arrIndex]['flxEntityName'] = {
                                "top": "35dp"
                            },
                            data[arrIndex]['flxStatus'] = {
                                "top": "35dp"
                            },
                            data[arrIndex]['flxSelect'] = {
                                "top": "34dp"
                            }
                        
                        inactiveEntities.push(data[arrIndex]);
                        break;
                }
            }
            var sortedEntities = activeEntities.concat(inactiveEntities);
            return sortedEntities;

   },

  toggleSelectAllCheckBox: function() {
    var navManager = applicationManager.getNavigationManager();
            var data = this.view.segListOfEntities.data;
            if (!kony.sdk.isNullOrUndefined(data)) {
                if (this.view.imgSelectAll.src === "activecheckbox.png") {
                    this.view.imgSelectAll.src = "inactivecheckbox_2.png";
                    for (var index = 0; index < data.length; index++) {
                        if (data[index].Status_id !== "SID_CUS_SUSPENDED") {
                            data[index]['imgSelect'] = {
                                "src": "inactivecheckbox_2.png"
                            };
                        }
                    }
                } else {
                    this.view.imgSelectAll.src = "activecheckbox.png";
                    for (var index = 0; index < data.length; index++) {
                        if (data[index].Status_id !== "SID_CUS_SUSPENDED") {
                            data[index]['imgSelect'] = {
                                "src": "activecheckbox.png"
                            };
                        }
                    }
                }
            }
            this.view.segListOfEntities.setData(data);
    this.entityList = this.view.segListOfEntities.data;
    navManager.setCustomInfo("frmEBankingAccess", {"customerlegalentity": data});
            this.enableEBankingAccess();
   },
   toggleCheckBox: function(data) {
          var navManager = applicationManager.getNavigationManager();
            var index = data.rowIndex;
            //var index = data.selectedRowIndex[0];
            var segData = this.view.segListOfEntities.data;
            var isAllEntitiesSelected = true;
            if (!kony.sdk.isNullOrUndefined(segData[index])) {
                if (segData[index].imgSelect.src === "activecheckbox.png") {
                    segData[index].imgSelect.src = "inactivecheckbox_2.png";
                } else {
                    segData[index].imgSelect.src = "activecheckbox.png";
                }
                //Checking is all the accounts of the section is selected
                for (var selectedEntityIndex = 0; selectedEntityIndex < segData.length; selectedEntityIndex++) {
                    if (segData[selectedEntityIndex].Status_id !== "SID_CUS_SUSPENDED") {
                        if (segData[selectedEntityIndex].imgSelect.src === "inactivecheckbox_2.png") {
                            isAllEntitiesSelected = false;
                        }
                    }
                }
                if (isAllEntitiesSelected) {
                    this.view.imgSelectAll.src = "activecheckbox.png";
                } else {
                    this.view.imgSelectAll.src = "inactivecheckbox_2.png";
                }
                this.view.segListOfEntities.setData(segData);
              this.entityList = this.view.segListOfEntities.data;
              navManager.setCustomInfo("frmEBankingAccess", {"customerlegalentity": segData});
                this.enableEBankingAccess();
            }
   },
   enableEBankingAccess: function() {
            var data = this.view.segListOfEntities.data;
            var isAnyEntitySelected = false;
            var scopeobj = this;
            //Checking if any of the entity is selected
            for (var selectedIndex = 0; selectedIndex < data.length; selectedIndex++) {
                if (data[selectedIndex].imgSelect.src === "activecheckbox.png") {
                    isAnyEntitySelected = true;
                    break;
                }
            }
            if (isAnyEntitySelected) {
                scopeobj.enableButton(this.view.btnDisableEBankingAccess);
            } else {
                scopeobj.disableButton(this.view.btnDisableEBankingAccess);
            }
   },

  searchEntity: function(){
    var navObj = applicationManager.getNavigationManager();
    var searchtext = this.view.tbxSearchByKeyword.text.toLowerCase();
    //this.entityList = this.view.segListOfEntities.data;
    if (searchtext) {
      var data = [];
      // headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingTransactions"));
      data = this.entityList;
      var searchSegmentData = applicationManager.getDataProcessorUtility().commonSegmentSearch("companyName", searchtext, data);
      if (searchSegmentData.length > 0) {
        this.checkForDefaultEntity();
        this.view.segListOfEntities.setData(searchSegmentData);
        //navObj.setCustomInfo("frmEBankingAccess", {"customerlegalentity": searchSegmentData});
      }
    } else {
      if (this.entityList !== undefined && this.entityList.length > 0) {
        this.checkForDefaultEntity();
        this.view.segListOfEntities.setData(this.entityList);
        //navObj.setCustomInfo("frmEBankingAccess", {"customerlegalentity": this.entityList});
      }
    }
  },
  
  checkForDefaultEntity: function() {
    var defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
    for (var index = 0; index < this.entityList.length; index++) {
      if (this.entityList[index].legalEntityId === defaultEntity && this.entityList[index].Status_id === "SID_CUS_SUSPENDED") {
        this.entityList[index]['flxDefaultEntity'] = {
          "isVisible": false,
        }
      }
    }
  },

   showAck : function(){
            var data = this.view.segListOfEntities.data;
            var selectedEntities = [];
            var formattedEntities = [];
            var flowtype = "";
            var defaultEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
            var currentLegalEntity = applicationManager.getUserPreferencesManager().getCurrentLegalEntity();
            for (var selectedEntityIndex = 0; selectedEntityIndex < data.length; selectedEntityIndex++) {
                if (data[selectedEntityIndex].Status_id !== "SID_CUS_SUSPENDED" && data[selectedEntityIndex].imgSelect.src === "activecheckbox.png") {
                    formattedEntities.push(data[selectedEntityIndex]);
                    selectedEntities.push(data[selectedEntityIndex].legalEntityId);
                }
            }
            if (this.view.imgSelectAll.src === "activecheckbox.png") {
                flowtype = "All Entities";
            } else {
                for (var Index = 0; Index < selectedEntities.length; Index++) {
                    if (selectedEntities[Index] === defaultEntity && currentLegalEntity === defaultEntity) {
                        flowtype = "Default Entity Equalto Current Entity";
                    } else if (selectedEntities[Index] === defaultEntity && currentLegalEntity !== defaultEntity) {
                        flowtype = "Default Entity NotEqualto Current Entity";
                    } else if (selectedEntities[Index] === currentLegalEntity) {
                        flowtype = "Current Entity";
                    } else flowtype = "Neither Current Nor Default Entity";
                }
            }
     applicationManager.getPresentationUtility().showLoadingScreen();
     var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
     settingsModule.presentationController.disableEBankingAccess(selectedEntities,{"selectedEntities":formattedEntities, "flowType": flowtype});
   },

    bindViewError : function(msg){
        this.hidePopup();
        applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    },

    flxBackOnclick:function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
   
    showTnC : function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
        settingsModule.presentationController.getTnCForDisablingEBankingAccess();
    },
  
  
  getWidgetMap: function() {
    var map = {
      "imgSelect": "imgSelect",
      "flxSelect": "flxSelect",
      "lblEntityName": "companyName",
      "flxDefaultEntity": "flxDefaultEntity",
      "lblStatus": "lblStatus",
      "btnTnC": "btnTnC",
      "lblIAccept": "lblIAccept",
      "flxAcceptTnC": "flxAcceptTnC",
      "flxEntityName": "flxEntityName",
      "flxStatus": "flxStatus"
    };
    return map;
  },
  
  
  
    });