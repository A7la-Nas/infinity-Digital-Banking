define({
  sec: -1,
  row: -1,
  segmentHeight:0,
  payeesList:0,
  rowTemplateHeight:70,
  sectionTemplateHeight:60,
  rowTemplateP2PHeight:110,
  searchData: [],
  viewConstants:{"Infinity":"temenos.png","Icici":"temenos.png","Boa":"boa.png","Citi":"citi.png","National":"temenos.png"},
  init: function () {
    var scope=this;
    var currentForm="frmMMTransferToAccount";
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    if (kony.os.deviceInfo().name === "iPhone")
    	this.view.customSearchbox.tbxSearch.setFocus(false);
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.commonFunctionForgoBack();
  },
  //Purpose is to scroll to the selected row while moving to and fro between screens.
  postShow: function() {
    var scope = this;
    var configManager = applicationManager.getConfigurationManager();
    var isActivated = true;//(configManager.isP2PActivated === "true");
    this.isUserActivated(isActivated, scope);
    if (this.sec !== "" && this.row !== "" && this.sec !== -1 && this.row !== -1) {
      if (!(this.sec === 0 && this.row === 0)) {
        if ((kony.os.deviceInfo().name !== "iPhone")) {
          //Need to invoke scroll manually (only in android) to get the UX experience of docking whenever segment rendered data is greater than viewable area.
          if(parseInt(this.segmentHeight)>this.view.segTransactions.frame.height || (this.view.segTransactions.frame.height-(this.segmentHeight))<this.rowTemplateHeight)
            this.scrollManually();
        } else {
          scope.view.segTransactions.selectedRowIndex = [this.sec + 1, this.row];
        }
      }
    }
    if(this.segmentHeight>0 || this.view.flxNoAccounts.isVisible){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },

  isUserActivated : function (isActivated, scope) {
    if(isActivated) {
      scope.view.segActivateP2P.isVisible = false;
      return;
    }
    var segData = scope.view.segTransactions.data;
    var widgetDataMap = scope.view.segTransactions.widgetDataMap;
    var datamap = {
      "btnActivateP2P": "btnActivateP2P",
      "flxActivateP2P": "flxActivateP2P",
      "flxActivateP2Pmsg": "flxActivateP2Pmsg",
      "lblActivateP2P1": "lblActivateP2P1",
      "lblActivateP2P2": "lblActivateP2P2"
    };

    var activateData = [{
      "sectionHeaderTemplate" : "flxActivateP2P",
      "rowTemplate" : "flxActivateP2P",
      "btnActivateP2P": {
        "text": kony.i18n.getLocalizedString("i18n.mb.p2p.activateP2P")
      },
      "lblActivateP2P1": {
        "text": kony.i18n.getLocalizedString("i18n.mb.p2p.activate")
      },
      "lblActivateP2P2": {
        "text": kony.i18n.getLocalizedString("i18n.mb.p2p.activateRec")
      }
    }];

    widgetDataMap["btnActivateP2P"] = "btnActivateP2P";
    widgetDataMap["flxActivateP2P"] = "flxActivateP2P";
    widgetDataMap["flxActivateP2Pmsg"] = "flxActivateP2Pmsg";
    widgetDataMap["lblActivateP2P1"] = "lblActivateP2P1";
    widgetDataMap["lblActivateP2P2"] = "lblActivateP2P2";

    segData.push([activateData,[]]);
    //scope.view.segTransactions.data = segData;
    //scope.view.segTransactions.widgetDataMap = widgetDataMap;
    scope.view.segActivateP2P.data = activateData;
    scope.view.segActivateP2P.widgetDataMap = activateData;
    scope.view.segActivateP2P.isVisible = true;

    scope.view.forceLayout();
  },

  preShow: function () {
    var self = this;
    this.segmentHeight=0;
    this.payeesList=0;
    this.view.flxMainContainer.skin = "slfSbox";
    if (this.view.flxHeaderSearchbox.height ==="40dp") {
     // this.view.flxHeaderSearchbox.isVisible = false;
      this.view.flxHeaderSearchbox.height ="0dp";
     // this.view.flxSearch.isVisible = true;
      this.view.flxSearch.height = "55dp";
    }
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxOuterGradient.height = "223dp";
      this.view.flxSearch.top = 0 + "dp";
      this.view.flxDescription.top = 55 + "dp";
      this.view.flxGradient.top = "0dp";
     // this.view.flxGradient.isVisible = true;
      this.view.segTransactions.top = "0dp";
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxSearch.top = 0 + "dp";
      this.view.flxDescription.top = 55 + "dp";
      this.view.flxGradient.top = "0dp";
      this.view.flxMainContainer.top = "56dp";
     // this.view.segTransactions.top = "0dp";
    }
    this.initActions();
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    if(moneyMovementModule.areAllServicesDone()){
     this.setSegmentData();
    }
    this.addDummyRows();
    this.view.flxSearch.height = "55dp";
   // this.view.flxSearch.isVisible = true;
   // this.view.flxDescription.isVisible = true;
     this.view.flxDescription.height = "48dp";
    this.view.flxGradient.isVisible = true;
    this.view.flxNoTransactions.isVisible = false;
    this.view.customSearchbox.tbxSearch.placeholder = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ToAccountPlaceholder");
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    this.view.segTransactions.onScrolling = function () {
      self.transactionsSegmentOnScrolling();
    };
  },
  cancelOnClick:function(){
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.cancelCommon();
  },
  initActions: function () {
    var self = this;
   this.view.tbxSearch.onTouchStart = function() {
      if (kony.os.deviceInfo().name === "iPhone") {
        self.view.flxOuterGradient.height = "0dp";
        kony.timer.schedule("timerId", function() {
          self.showSearch();
        }, 0.1, false);
      }
      else {
        self.showSearch();
      }
    }
    this.view.customSearchbox.btnCancel.onClick = function() {
      if (kony.os.deviceInfo().name === "iPhone") {
        self.view.flxOuterGradient.height = "223dp";
        kony.timer.schedule("timerId", function() {
          self.cancelSearch();
        }, 0.1, false);
      }
      else {
        self.cancelSearch();
      }
    }
    this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.segTransactions.onRowClick = this.onSegRowClick;
    this.view.btnNewAccount.onClick= this.enterManageRecipientsFlow;
    this.view.btnTransferToNewAccount.onClick = this.enterManageRecipientsFlow;
  },
  enterManageRecipientsFlow : function () {
      var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
      if(moneyMovementModule.stateNavigation){
        moneyMovementModule.initializeStateData(false, "");
        moneyMovementModule.haveLimitsBeenFetched = false;
        var navMan=applicationManager.getNavigationManager();
        var formname="frmMMTransferToAccount";
        var index = navMan.getFormIndex(formname);
        var stackLength=navMan.stack.length;
      	if(index === null)
          navMan.setFormIndex(formname,stackLength-1);
        else{
          for(var i=stackLength-1; i>index; i--){
            navMan.removeFormIndex(navMan.stack[i]);
            navMan.stack.pop();
          }
        }
      }
      moneyMovementModule.enterManageRecipientsFlow();
  },
  onSegRowClick : function() {
    var secindex,rowindex,selectedAccount;
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    if (Array.isArray(this.view.segTransactions.data[0])) {
      secindex = Math.floor(this.view.segTransactions.selectedRowIndex[0]);
      rowindex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
      selectedAccount = this.view.segTransactions.data[secindex][1][rowindex];
    } else {
      rowindex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
      selectedAccount = this.view.segTransactions.data[rowindex];
    }
    if(selectedAccount.transactionMode){
      moneyMovementModule.haveLimitsBeenFetched = false;
      moneyMovementModule.setToAccountData(selectedAccount);
    }
  },
  transactionsSegmentOnScrolling: function () {
    var parallaxSpeed = 1;
    var yOffset = this.view.segTransactions.contentOffsetMeasured.y;
    if(this.view.flxHeaderSearchbox.height ==="40dp")
      this.view.flxDescription.top = 40 - (yOffset * parallaxSpeed) + "dp";
    else
      this.view.flxDescription.top = 55 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxSearch.top = 0 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxGradient.top = 0 - (yOffset * parallaxSpeed) + "dp";
  },
  setSegmentData: function() {
    var userPrefManager = applicationManager.getUserPreferencesManager();
    var isSingleCustomerProfile = userPrefManager.isSingleCustomerProfile;
    var segData=[];
    if(isSingleCustomerProfile) {
      segData = this.getListOfToAccountsForSingleCustomerID();
    }
    else{
      segData = this.getListOfToAccountsForMultipleIDs();
    }
        if (segData.length > 0) {
            this.view.segTransactions.widgetDataMap = this.getWidgetDataMap();
            this.view.flxNoAccounts.isVisible = false;
            this.view.segTransactions.isVisible = true;
            this.view.segTransactions.setData(segData);
            this.segmentData = this.view.segTransactions.data;
            //this.setupDataForCombinedUser();
        } else {
            this.segmentData = [];
            this.view.flxNoAccounts.isVisible = true;
            this.view.segTransactions.isVisible = false;
            this.view.lblNoAccounts.isVisible = true;
            this.view.lblNoAccounts2.isVisible = true;
        }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

// This code is not being used and can be removed as per review comments 
//   setupDataForCombinedUser: function() {
//     if(configurationManager.isCombinedUser === "true") {
//           try {
//             var widgetDataMap = this.view.segTransactions.widgetDataMap;
//             var combinedUserData = moneyMovementModule.processAccountsData(accountsList,"from");
//             var accProcessedData = [[{"lblHeader":"B"},[]],[{"lblHeader":"P"},[]]];
//             var b = 0, p = 0, er = 0;
            
//             widgetDataMap["lblBankName"] = "accountType";
//             widgetDataMap["imgBankIcon"] = "accountTypeIcon";
//             widgetDataMap["flximgBankIcon"] = "accountTypeFlx";
            
//             for (var k = 0; k < combinedUserData.length; k++) {
//               if(combinedUserData[k]["isBusiness"] == 1)
//               accProcessedData[1][1][b++] = combinedUserData[k];
//               else if(combinedUserData[k]["isBusiness"] == 0)
//                 accProcessedData[0][1][p++] = combinedUserData[k];
//               else er = 1;
//             }
            
//             if(kony.sdk.isNullOrUndefined(kony.i18n.getLocalizedString("kony.mb.fastTransfers.BusinessAccounts")))
//               accProcessedData[1][0]["lblHeader"] = "Business Accounts" + " (" + b + ")";
//             else
//               accProcessedData[1][0]["lblHeader"] = kony.i18n.getLocalizedString("kony.mb.fastTransfers.BusinessAccounts") + " (" + b + ")";
//             if(kony.sdk.isNullOrUndefined(kony.i18n.getLocalizedString("kony.mb.fastTransfers.personalAccounts")))
//               accProcessedData[0][0]["lblHeader"] = "Personal Accounts" + " (" + p + ")";
//             else
//               accProcessedData[0][0]["lblHeader"] = kony.i18n.getLocalizedString("kony.mb.fastTransfers.personalAccounts") + " (" + p + ")";

//             if(er === 0 && p !== 0 && b !== 0) {
//               this.view.segTransactions.rowTemplate = "flxAccountsTransfers";
//               this.view.segTransactions.widgetDataMap = widgetDataMap;
//               this.view.segTransactions.data = accProcessedData;
//               this.segmentData = this.view.segTransactions.data;
//             }
//           }
//           catch(e) {
//             kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
//           }
//         }
//   },
   
  getListOfToAccountsForSingleCustomerID : function() {
        var isSmeUser = applicationManager.getConfigurationManager().isSMEUser == "true";
        var navMan = applicationManager.getNavigationManager();
        var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
        var accountsList = moneyMovementModule.getFilteredToAccounts();
        var processedData = moneyMovementModule.processAccountsData(accountsList, "to");
        var segData = [];
    	if(processedData.length>0){
        this.searchData = [];
        this.populateSearchData(processedData);
        var viewBindData = moneyMovementModule.processViewFormattedData(processedData);
        viewBindData = moneyMovementModule.orderByPriority(viewBindData);
        if (moneyMovementModule.getEntitlementValue("isKonyBankAccountsTransfer") == "true") {
            for (var key in viewBindData) {
                var sectionHeaderData = {};
                var combinedData = [];
              if(key != "CreditCard"){
                if (viewBindData[key].length > 1) {
                  sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+" " + key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.accounts")+" (" + viewBindData[key].length + ")";
                } else {
                  sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+" " + key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.account")+" (" + viewBindData[key].length + ")";
                }
              }
              else{
                if (viewBindData[key].length > 1) {
                  sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+ " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.creditcards")+" (" + viewBindData[key].length + ")";
                } else {
                  sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+ " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.creditcard")+" (" + viewBindData[key].length + ")";
                }
              }
              
              sectionHeaderData["flxImgUp"] = {
                isVisible : false,
              };
              sectionHeaderData["imgUpArrow"] = {
                isVisible : false,
              };
                var rowDataForSection = moneyMovementModule.sortByPrefrence(viewBindData[key]);
                if (rowDataForSection.length > 0) {
                    combinedData.push(sectionHeaderData);
                    combinedData.push(rowDataForSection);
                    this.calcualteSegmentRenderedDataHeight(1,rowDataForSection.length);
                    segData.push(combinedData);
                }
            }
        }
    }
        if (moneyMovementModule.getEntitlementValue("isInternationalAccountsTransfer") == "true" || moneyMovementModule.getEntitlementValue("isOtherBankAccountsTransfer") == "true" || moneyMovementModule.getEntitlementValue("isOtherKonyAccountsTransfer") == "true") {
            var toAccounts = moneyMovementModule.getToAccounts();
            var internalBenificiaries = toAccounts.internalBenificiaries;
            var externalBenificiaries = toAccounts.externalBenificiaries;
            var internationalBenificiaries = toAccounts.internationalBenificiaries;
            var externalAccountsList = [];
            if (internalBenificiaries && internalBenificiaries !== 0) {
                externalAccountsList = externalAccountsList.concat(moneyMovementModule.addTransactionMode(internalBenificiaries, applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")));
            }
            if (externalBenificiaries && externalBenificiaries !== 0) {
                externalAccountsList = externalAccountsList.concat(moneyMovementModule.addTransactionMode(externalBenificiaries, applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")));
            }
            if (internationalBenificiaries && internationalBenificiaries !== 0) {
                externalAccountsList = externalAccountsList.concat(moneyMovementModule.addTransactionMode(internationalBenificiaries, applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")));
            }

			var fromAccountMembershipId = navMan.getCustomInfo("frmAccdataMembershipID");
			var filteredToAccount = moneyMovementModule.filterToAccountsByMembershipId(fromAccountMembershipId,externalAccountsList);
            var proccessToData = moneyMovementModule.processExternalAccountsData(filteredToAccount);
			
          var configurationManager = applicationManager.getConfigurationManager();
          if(configurationManager.isCombinedUser === "true") {
            for(var k=0;k<proccessToData.length;k++){
              proccessToData[k]["accountTypeFlx"] = {"isVisible":true};
              proccessToData[k].bankName = {"text":proccessToData[k].bankName,
                                            "skin":"sknlbl727272Brf6f6f6Reg98"},
              proccessToData[k]["bankImage"]=this.getBankIcon(proccessToData[k].bankName.text);
              if(!kony.sdk.isNullOrUndefined(proccessToData[k]["bankImage"])){
                proccessToData[k]["flxBankIconType"] = {"isVisible":true};
                proccessToData[k]["imgBankIconType"] = {"src":proccessToData[k]["bankImage"]};
              }
              else{
                proccessToData[k]["flxBankIconType"] = {"isVisible":false};
              }
            }
          }else{
            for(var k=0;k<proccessToData.length;k++){
              proccessToData[k]["accountTypeFlx"] = {"isVisible":false};
              proccessToData[k].bankName = {"text":proccessToData[k].bankName,
                                            "skin":"sknLbl727272SourceSansPro30pxTab"};
               proccessToData[k]["flxBankIconType"] = {"isVisible":false};
            }}
            this.populateSearchData(proccessToData);
            var extAccData = [];
            var length = proccessToData.length;
            var extAccountsSectionHeaderData = {};
            if (length > 1) {
                extAccountsSectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.externalaccounts")+" (" + length + ")";
            }
            if (length == 1) {
                extAccountsSectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.externalaccount")+" (" + length + ")";
            }
           	  extAccountsSectionHeaderData["flxImgUp"] = {
                isVisible : false,
              };
              extAccountsSectionHeaderData["imgUpArrow"] = {
                isVisible : false,
              };
            if (length > 0) {
                extAccData.push(extAccountsSectionHeaderData);
                extAccData.push(proccessToData);
              	this.calcualteSegmentRenderedDataHeight(1,proccessToData.length);
                segData.push(extAccData);
            }
        }
        if (moneyMovementModule.getEntitlementValue("ispayAPersonEnabled") == "true" && !isSmeUser ) {        
           var toAccounts = moneyMovementModule.getToAccounts();
            if (toAccounts) {
             this.payeesList = toAccounts.payeesList.PayPerson;
            }
           if (this.payeesList && this.payeesList.length > 0) {
              var proccessPayeeData = moneyMovementModule.processPayeeData(this.payeesList);
             var configurationManager = applicationManager.getConfigurationManager();
             if(configurationManager.isCombinedUser === "true") {
               for(var x=0;x<proccessPayeeData.length;x++){
                 proccessPayeeData[x]["accountTypeFlx"] = {"isVisible":false};
                 proccessPayeeData[x]["accountTypeIcon"] = {"src":"personalaccount.png"};                              
                 proccessPayeeData[x].bankName = {"text":proccessPayeeData[x].bankName,
                                                  "skin":"sknlbl727272Brf6f6f6Reg98"}
               }
             }else{
               for(var x=0;x<proccessPayeeData.length;x++){
                 proccessPayeeData[x]["accountTypeFlx"] = {"isVisible":false};
                 proccessPayeeData[x].bankName = {"text":proccessPayeeData[x].bankName,
                                                  "skin":"sknLbl727272SourceSansPro30pxTab",};
               }
             }
                var payeeData = [];
                var payeelength = proccessPayeeData.length;
                var payeesSectionHeaderData = {};
                if (payeelength > 1) {
                    payeesSectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.recipients")+" (" + payeelength + ")";
                }
                if (payeelength == 1) {
                    payeesSectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.recipient")+" (" + payeelength + ")";
                }
                payeeData.push(payeesSectionHeaderData);
                payeeData.push(proccessPayeeData);
                this.calcualteSegmentRenderedDataHeight(1,proccessPayeeData.length);
				this.populateSearchData(proccessPayeeData);
                var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
               var fromaccountdata= moneyMovementPresentationController.getTransferObjectById("from");
             var configurationManager = applicationManager.getConfigurationManager();
            if(configurationManager.isCombinedUser === "true") {
             if(fromaccountdata[0]["isBusiness"] === 0) {
                  segData.push(payeeData);
              }else{
                //no need to push data
              } 
            }else{
               segData.push(payeeData);
            }

                //this.view.flxNoP2P.isVisble = false;
            } else if (this.payeesList === 0) {
                var proccessPayeeData = moneyMovementModule.processPayeeData(this.payeesList);
              if(!kony.sdk.isNullOrUndefined(configurationManager)){
                if(configurationManager.isCombinedUser === "true") {
                  for(var x=0;x<proccessPayeeData.length;x++){
                    proccessPayeeData[x]["accountTypeFlx"] = {"isVisible":false};
                    proccessPayeeData[x].bankName = {"text":proccessPayeeData[x].bankName,
                                                     "skin":"sknlbl727272Brf6f6f6Reg98"}
                  }
                }else{
                  for(var x=0;x<proccessPayeeData.length;x++){
                    proccessPayeeData[x]["accountTypeFlx"] = {"isVisible":false};
                    proccessPayeeData[x].bankName = {"text":proccessPayeeData[x].bankName,
                                                     "skin":"sknLbl727272SourceSansPro30pxTab",};             }
                }
              }
                var payeeData = [];
                var payeesSectionHeaderData = {};
                payeesSectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.recipients");
                payeeData.push(payeesSectionHeaderData);
                payeeData.push([]);
               var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
            var fromaccountdata= moneyMovementPresentationController.getTransferObjectById("from");
             var configurationManager = applicationManager.getConfigurationManager();
            if(configurationManager.isCombinedUser === "true") {
             if(fromaccountdata[0]["isBusiness"] === 0) {
                  segData.push(payeeData);
              }else{
                //no need to push data
              } 
            }else{
               segData.push(payeeData);
            }
             //this.view.flxNoP2P.isVisble = true;
            }
        }
        this.sec = -1;
        this.row = -1;
        var transObj = moneyMovementModule.getTransObject();
        for (var i = 0; i < segData.length; i++) {
            for (var j = 0; j < segData[i][1].length; j++) {
                if (transObj && transObj.transactionType) {
                    if ((transObj.transactionType !== "P2P")) {
                        if (transObj && transObj.toAccountNumber && transObj.toAccountNumber == segData[i][1][j].accountID) {
                            segData[i][1][j].flxMain = {
                                "skin": "sknFlxF6F6F6mb"
                            };
                            this.sec = i;
                            this.row = j;
                        } else {
                            segData[i][1][j].flxMain = {
                                "skin": "slFboxmb"
                            };
                        }
                    } else {
                        if (transObj && transObj.personId && transObj.personId == segData[i][1][j].PayPersonId) {
                            segData[i][1][j].flxMain = {
                                "skin": "sknFlxF6F6F6mb"
                            };
                            this.sec = i;
                            this.row = j;
                        } else {
                            segData[i][1][j].flxMain = {
                                "skin": "slFboxmb"
                            };
                        }
                    }
                }
              if(this.payeesList!==0){
                segData[i][1][j].template="flxAccountsNoImageTransfers";
              }
            }
          	if(i==segData.length-1 && this.payeesList===0 && !isSmeUser ){
              var temp={};
              temp.template="flxP2PMain";
              segData[i][1].push(temp);
              this.calcualteSegmentRenderedDataHeight(1);
              }
        }
    
        return segData;
    
  },
  
  getListOfToAccountsForMultipleIDs : function() {
    var data = this.getListOfToAccountsForSingleCustomerID(); 
    var toAccountListforMultipleIDs = [];
    var externalPersonalAccounts = [{"lblHeader":""},[]];
    var externalBusinessAccounts = [{"lblHeader":""},[]];
    var payofperson= [{"lblHeader":""},[]];
    var recipients = [];
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var accountsList = moneyMovementModule.getFilteredToAccounts();
    this.processedData = moneyMovementModule.processAccountsData(accountsList, "to");
	 if(this.processedData) {
       var userPrefManager = applicationManager.getUserPreferencesManager();
   	   var customerIDs=userPrefManager.accessibleCustomerIds;
       var personalID=userPrefManager.primaryCustomerId;
       var mappingData={};
       var iconVisibility=false;
      	customerIDs.forEach((item,index)=>{
        mappingData[item.id]={
          "isPersonal": personalID && personalID.id===item.id && personalID.type==="personal"?true:false,
          "accounts":[]
        }
       if(index!==0){
         if(customerIDs[0].type!==item.type){
           iconVisibility=true;
         }
       }
      });
      for(let key in mappingData){
        this.processedData.forEach(item=>{
          if(key===item.membershipID){
            if(iconVisibility){
            item.imgBankIcon=item.isBusinessAccountforMultipleIds==="true"?"businessaccount.png":"personalaccount.png";
            }
            else{
              item.flximgBankIcon={
                "isVisible":false
              }
            }
            mappingData[key]["accounts"].push(item);
          }
        });
      }
        toAccountListforMultipleIDs=this.categorizeDataforMultipleIDs(mappingData);  
        }
    for( var i = 0; i < data.length; i++ ) {
      var section = data[i][0];
      var rows = data[i][1];
      var sectionHeader = section.lblHeader;
      
      sectionHeader["flxImgUp"] = {
        isVisible : false,
      };
      sectionHeader["imgUpArrow"] = {
        isVisible : false,
      };
       
      if(sectionHeader.includes("External Accounts")) {
        this.preparePersonalOrBusinessExternalAccounts(rows, externalPersonalAccounts, externalBusinessAccounts);  
        if (externalPersonalAccounts[1].length >= 1) {
          externalPersonalAccounts[0]["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.fastTransfers.externalPersonalAccounts")+" (" + externalPersonalAccounts[1].length + ")";
        } else {
          externalPersonalAccounts[0]["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.fastTransfers.externalPersonalAccount")+" (" + externalPersonalAccounts[0].length + ")";
        } 
        if (externalBusinessAccounts[1].length > 1) {
          externalBusinessAccounts[0]["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.fastTransfers.externalBusinessAccounts")+" (" + externalBusinessAccounts[1].length + ")";
        } else {
          externalBusinessAccounts[0]["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.fastTransfers.externalBusinessAccount")+" (" + externalBusinessAccounts[1].length + ")";
        }        
      }
      else if(sectionHeader.includes("Recipients")) {
        recipients = data[i];
      }
    }
    if(!kony.sdk.isNullOrUndefined(recipients[1])){
      for (i in recipients[1]){
        if(!kony.sdk.isNullOrUndefined(recipients[1][i].PayPersonId))
        {
          payofperson[1].push(recipients[1][i]);
        }else{
          if(recipients[1][i].accountTypeIcon.src === "personalaccount.png"){
            recipients[1][i].accountTypeFlx.isVisible = false;
            externalPersonalAccounts[1].push(recipients[1][i]);
          }
          else{
             recipients[1][i].accountTypeFlx.isVisible = false;
            externalBusinessAccounts[1].push(recipients[1][i]);
          }
        }     
      }
    }
	externalPersonalAccounts[0]["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.fastTransfers.externalPersonalAccounts")+" (" + externalPersonalAccounts[1].length + ")";
    externalBusinessAccounts[0]["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.fastTransfers.externalBusinessAccounts")+" (" + externalBusinessAccounts[1].length + ")";
    payofperson[0]["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.payAPerson.recipient")+" (" + payofperson[1].length + ")";  
    payofperson[0]["flxImgUp"] = {
      isVisible : false,
    };
    payofperson[0]["imgUpArrow"] = {
      isVisible : false,
    }; 
    if(externalPersonalAccounts[1].length >0){
      toAccountListforMultipleIDs.push(externalPersonalAccounts);
    }
    if(externalBusinessAccounts[1].length >0){
      toAccountListforMultipleIDs.push(externalBusinessAccounts);
    }
   if(payofperson[1].length >0){
      toAccountListforMultipleIDs.push(payofperson);
    }
    return toAccountListforMultipleIDs;
  },
  
  categorizeDataforMultipleIDs: function(mappingData) { 
    var segmentDataforMultipleIds=[];
    this.view.segTransactions.rowTemplate="flxAccountsTransfers";
          for(let key in mappingData){
            if(mappingData[key].isPersonal===true){
              var sectionHeaderforMultipleIDswithPersonal={};
            var finalDataMultipleIDswithPersonal=[];
              sectionHeaderforMultipleIDswithPersonal["lblHeader"]="Personal Accounts"+"("+mappingData[key].accounts.length+")"
            finalDataMultipleIDswithPersonal.push(sectionHeaderforMultipleIDswithPersonal);
            finalDataMultipleIDswithPersonal.push(mappingData[key].accounts);
            segmentDataforMultipleIds.push(finalDataMultipleIDswithPersonal);
            }
          }
     for(let key in mappingData){
      if(mappingData[key].isPersonal!==true){
         var sectionHeaderforMultipleIDs={};
           var finalDataMultipleIDs=[];
        if(mappingData[key].accounts.length>0)
         sectionHeaderforMultipleIDs["lblHeader"]=mappingData[key].accounts[0].membershipName+"("+mappingData[key].accounts.length+")";
       finalDataMultipleIDs.push(sectionHeaderforMultipleIDs);
            finalDataMultipleIDs.push(mappingData[key].accounts);
            segmentDataforMultipleIds.push(finalDataMultipleIDs);
       }
     }
    return segmentDataforMultipleIds;
  },
 
  preparePersonalOrBusinessExternalAccounts(rows,externalPersonalAccounts,externalBusinessAccounts) {    
    for( var i = 0; i < rows.length; i++ ) {
      rows[i].template="flxAccountsTransfers";
      if(rows[i].accountType!== "Loan"){
      if( rows[i]["isBusinessPayee"] == 1 || rows[i]["isBusiness"] == 1) {
        rows[i].imgBankIcon={src:"businessaccount.png"};
        rows[i].flximgBankIcon={isVisible:false};
        externalBusinessAccounts[1].push(rows[i]);
      }
      else {
        rows[i].imgBankIcon={src:"personalaccount.png"}
        rows[i].flximgBankIcon={isVisible:false};
        externalPersonalAccounts[1].push(rows[i]);
      }
      }
    }
  },
  
    getWidgetDataMap: function() {
        var dataMap = {
            lblAccountName: "processedName",
            lblBankName: "bankName",
            lblAccountBalValue: "availableBalance",
            lblAccountBal: "accountBalanceType",
            lblHeader: "lblHeader",
          	flxTransHeader:"flxTransHeader",
          	imgUpArrow:"imgUpArrow",
          	flxImgUp:"flxImgUp",
            accountTypeFlx:"accountTypeFlx",
            accountTypeIcon:"accountTypeIcon",
            flxMain: "flxMain",
            flxBankIconType:"flxBankIconType",
            imgBankIconType:"imgBankIconType",
            imgBankIcon:"imgBankIcon",
          flximgBankIcon:"flximgBankIcon"
          
        };
//         if( applicationManager.getConfigurationManager().isCombinedUser === "true" ) {
//             dataMap["lblBankName"] = "accountType";
//  			dataMap["imgBankIcon"] = "accountTypeIcon";
//             dataMap["flximgBankIcon"] = "accountTypeFlx"; 
//             dataMap["imgBankIconType"]="imgBankIconType";
//       }
      return dataMap;
    },
  
  addDummyRows: function () {
    var segWidgetDataMap = this.view.segTransactions.widgetDataMap;
    segWidgetDataMap["flxEmptyHeader"] = "flxEmptyHeader";
    segWidgetDataMap["flxEmptyRow"] = "flxEmptyRow";
    this.view.segTransactions.widgetDataMap = segWidgetDataMap;
    var segData = this.view.segTransactions.data;
    if(segData === null || segData === undefined){
      segData = [];
    }
    var segLength = 0;
    for (let i = 0; i < segData.length; i++) {
      segLength = segLength + (segData[i][1].length * 70) + 49; //66 is the row height and 49 is the header height
    }
    segData.unshift([{
      "template": "flxEmptyHeader",
      "flxEmptyHeader": {
        "height": "0dp"
      }
    },
                     [{
                       "template": "flxEmptyRow",
                       "flxEmptyRow": {
                         "height": "104dp"
                       }
                     }]
                    ]);
    segLength = segLength + 104;
    this.view.segTransactions.setData(segData);
    this.segLength = segLength;
  },
  removeDummyRows:function(){
    var data=this.view.segTransactions.data;
    if(data === null || data === undefined){
      kony.print("no data");
    }
    else{
      data.shift();
      this.view.segTransactions.setData(data);
    }
  },
  showSearch: function() {
    var self = this;
    this.view.flxMainContainer.skin = "slFSbox0gff85612494c44Tab";
    if (kony.os.deviceInfo().name === "iPhone") {
      if (this.view.flxHeaderSearchbox.height ==="40dp") {
       this.view.flxHeaderSearchbox.height ="0dp";
        this.view.flxSearch.height = "55dp";
        this.view.flxMainContainer.top = "40dp";
       // this.view.flxSearch.isVisible = true;
      //  this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxDescription.top = "55dp";
     //   this.view.flxDescription.isVisible = true;
        this.view.flxDescription.height = "48dp";
        this.view.flxGradient.isVisible = true;
      } else {
        if (this.view.flxNoAccounts.isVisible) {
          this.view.lblNoAccounts.isVisible = false;
          this.view.lblNoAccounts2.isVisible = false;
        }
        //this.view.flxMainContainer.skin = "slFSbox0gff85612494c44Tab";
        this.view.flxHeaderSearchbox.height ="40dp";
       // this.view.flxHeaderSearchbox.isVisible = true;
       // this.view.flxSearch.isVisible = false;
        this.view.flxSearch.height = "0dp";
        this.view.flxMainContainer.top = "40dp";
       // this.view.flxDescription.isVisible = false;
        this.view.flxDescription.height = "0dp";
        this.view.flxGradient.isVisible = false;
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.customSearchbox.tbxSearch.setFocus(true);
        this.removeDummyRows();
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccountOrRecipient");
        this.view.btnTransferToNewAccount.isVisible = false;
		kony.timer.schedule("timerId", function() {
          self.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    } else {
      if (this.view.flxHeaderSearchbox.height ==="40dp") {
        //this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxHeaderSearchbox.height ="0dp";
       // this.view.flxSearch.isVisible = true;
        this.view.flxSearch.height = "55dp";
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
        this.view.flxGradient.top = "0dp";
        this.view.flxDescription.height = "0dp";
        //this.view.flxDescription.isVisible = false;
      } else {
        if (this.view.flxNoAccounts.isVisible) {
          this.view.lblNoAccounts.isVisible = false;
          this.view.lblNoAccounts2.isVisible = false;
        }
        this.view.flxGradient.isVisible = false;
        this.view.flxDescription.height = "0dp";
        //this.view.flxDescription.isVisible = false;
        this.removeDummyRows();
        this.view.flxSearch.height = "0dp";
        //this.view.flxSearch.isVisible = false;
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "40dp";
        this.view.flxHeaderSearchbox.height ="40dp";
        //this.view.flxHeaderSearchbox.isVisible = true;
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccountOrRecipient");
        this.view.btnTransferToNewAccount.isVisible = false;
        kony.timer.schedule("timerId", function() {
          self.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    }
  },
  tbxSearchOnTextChange: function() {
    var searchtext = this.view.customSearchbox.tbxSearch.text.toLowerCase();
    if (searchtext) {
      var data = [];
      data.push(this.searchData);
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      this.view.segTransactions.removeAll();
      var searchobj = applicationManager.getDataProcessorUtility().multipleCommonSegmentSearch(["accountName","accountID","nickName","PayPersonId","email","phone","name"], searchtext, data[0]);
      if (searchobj.length > 0) {
        this.view.segTransactions.widgetDataMap = this.getWidgetDataMapNoHeader();
        this.view.segTransactions.setData(searchobj);
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
        this.view.btnTransferToNewAccount.isVisible = true;
      }
    } else {
      if (this.segmentData.length > 0) {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccountOrRecipient");
        this.view.btnTransferToNewAccount.isVisible = false;
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
        this.view.btnTransferToNewAccount.isVisible = true;
      }
    }
  },
  cancelSearch: function() {
    this.view.flxMainContainer.skin = "slfSbox";
    this.view.flxHeaderSearchbox.height ="0dp";
   // this.view.flxHeaderSearchbox.isVisible = false;
   // this.view.flxSearch.isVisible = true;
    this.view.flxSearch.height = "55dp";
    this.view.flxGradient.isVisible = true;
    this.view.flxDescription.height = "48dp";
   // this.view.flxDescription.isVisible = true;
  //  this.view.flxSearch.top = 0 + "dp";
    this.view.flxGradient.top = "0dp";
    this.view.flxDescription.top = "55dp";
    this.view.segTransactions.top = "0dp";
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    if (this.segmentData.length > 0) {
      this.view.segTransactions.widgetDataMap = this.getWidgetDataMap();
      this.view.segTransactions.setData(this.segmentData);
      this.addDummyRows();
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
    } else {
      this.addDummyRows();
      this.view.flxNoAccounts.isVisible = true;
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible = false;
      this.view.lblNoAccounts.isVisible = true;
      this.view.lblNoAccounts2.isVisible = true;
    }
  },
  getWidgetDataMapNoHeader:function(){
    var dataMap={
      lblAccountName:"processedName",
      lblBankName:"bankName",
      lblAccountBalValue:"availableBalance",
      lblAccountBal:"accountBalanceType",
      imgBankIcon: "accountTypeIcon",
      flximgBankIcon: "accountTypeFlx"
    };
    return dataMap;
  },
  populateSearchData : function (data) {
    this.searchData = this.searchData.concat(data);
  },
  scrollManually: function() {
    var scope = this;
    scope.view.segTransactions.selectedRowIndex = [this.sec + 1, this.row-2];
    var parallaxSpeed = 1;
    if(Math.abs(this.view.segTransactions.frame.height-(this.segmentHeight))<this.rowTemplateHeight && this.payeesList!==0)
      var yOffset = this.view.segTransactions.contentOffsetMeasured.y+this.sectionTemplateHeight;
    else
      var yOffset = this.view.segTransactions.contentOffsetMeasured.y+(2*this.rowTemplateHeight);
    if (this.view.flxHeaderSearchbox.height ==="40dp") this.view.flxDescription.top = 40 - (yOffset * parallaxSpeed) + "dp";
    else this.view.flxDescription.top = 55 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxSearch.top = 0 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxGradient.top = 0 - (yOffset * parallaxSpeed) + "dp";
  },
  calcualteSegmentRenderedDataHeight:function(numberOfSections,numberOfRows){
    this.segmentHeight=parseInt(this.segmentHeight)+(numberOfSections*this.sectionTemplateHeight);
    if(numberOfRows){
    	this.segmentHeight=this.segmentHeight+(numberOfRows*this.rowTemplateHeight);
    }
    //This executes only when P2P server is down as there won't be any rows.
    else{
       this.segmentHeight=this.segmentHeight+this.rowTemplateP2PHeight;
    }
  },
  //This executes when the form is loaded ahead and services are in transition state and after service execution this is invoked from presentation layer.
  bindDataAfterTransition:function(flag){
    if (flag) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    if(this.segmentHeight===0){
      this.setSegmentData();
    }
  },
    /* mapping of bank images*/
  getBankIcon:function(bankName){
    try{
      var img ;
      if(!kony.sdk.isNullOrUndefined(bankName)){
        if(bankName==="Infinity")
          img=this.viewConstants.Infinity
          else if(bankName==="ICICI bank")
            img=this.viewConstants.Icici
            else if(bankName==="Bank of America" || bankName==="america") 
              img=this.viewConstants.Boa
              else if(bankName==="CitiBank")
                img = this.viewConstants.Citi
                else if(bankName==="National Bank")
                  img=this.viewConstants.National
                  else
                    img=this.viewConstants.Infinity

                    }
      return img;
    }catch(er){
      kony.print(er);
    }
  },
});