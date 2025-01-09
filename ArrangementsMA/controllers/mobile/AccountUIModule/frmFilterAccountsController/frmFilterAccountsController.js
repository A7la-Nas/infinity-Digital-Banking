define(['CampaignUtility','CommonUtilities'], function(CampaignUtility,CommonUtilities){
  return{ 

  //Type your controller code here 
  _mockdataAccounts : "", 
  _originalSegData : [],
  _tempShowAccArr : [],
  _tempGroupByArr : [],
  _tempSortByArr : [],
  _tempAccountTypeArr : [],
  _tempCurrencyArr : [],
  _isFirstTimeEntry : true,
  _allAccountsPostLogin : [],
  _initialSelectionTypeOrCurrency : "",
  _selectedShowAccountsArr : [],
  combinedFlowName:"",
  filteredAccountsData: null,
  _isSingleCIF : true,
  _isPrimaryCustID : "",
  _availabilityCheck : {
    isGroupByAvailable : true,
    isSortByAvailable : true
  },
  flowConstants : {"combinedBanking"  : "combinedBanking",
                   "businessBanking" : "businessBanking",
                   "personalBanking" : "personalBanking"
                  },
  _CONSTANTS : {
    "companyName" : "Company Name",
    "company" : "Company",
   "Customer":"Customer"
  },
  prevFlow : "",
  isGroupName:[],
  _retainSelection : {
    "showAccounts" : "",
    "groupBy" : "",
    "sortBy" : "",
    "accountType" : "",
    "currency" : ""
  },

  onNavigate : function(){
    try{


    }catch(e){
      kony.print("Exception in onNavigate"+e);
    }
  },

  onpreShow : function(){
    try{
      kony.print("Entered onpreShow");
      this.onBindEvents();
      this.resetForm();
      var navManager = applicationManager.getNavigationManager();
      var custominfoInt = navManager.getCustomInfo("frmDashboard");
      var configManager = applicationManager.getConfigurationManager();
      this._isSingleCIF = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      this._isPrimaryCustID = applicationManager.getUserPreferencesManager().primaryCustomerId;

      if( configManager.isCombinedUser === "true"){
        this.combinedFlowName = this.flowConstants.combinedBanking;
        var dashboardSelctionFlow = navManager.getCustomInfo("frmUnifiedDashSelector");
        if(!kony.sdk.isNullOrUndefined(dashboardSelctionFlow)){
          this.combinedFlowName = dashboardSelctionFlow;
          navManager.setCustomInfo("frmUnifiedDashSelector", undefined);
        }
      }else if(configManager.isSMEUser === "true"){
        this.combinedFlowName = this.flowConstants.businessBanking;
      }
      else{
        this.combinedFlowName = this.flowConstants.personalBanking;
      }
      
      //In order to retain selection, we are checking the previous flows
      this.prevFlow = navManager.getCustomInfo("prevFlowFilterAccounts");
      if(!kony.sdk.isNullOrUndefined(this.prevFlow)){
        if(this.prevFlow ===  this.combinedFlowName){
          this._isFirstTimeEntry = false;
        }else{
          this._isFirstTimeEntry = true;
        }
      }else{
        this._isFirstTimeEntry = true;
      }
      
      this.prevFlow = this.combinedFlowName;
      navManager.setCustomInfo("prevFlowFilterAccounts", this.prevFlow);
      
      
      this._allAccountsPostLogin = this.clone(custominfoInt.accountData);
      if(this._isFirstTimeEntry === true){
        this._isFirstTimeEntry = false;
        this._retainSelection = {
          "showAccounts" : "",
          "groupBy" : "",
          "sortBy" : "",
          "accountType" : "",
          "currency" : ""
        };
        var isManageCustomViewEnable = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_VIEW_MANAGE");
        if(isManageCustomViewEnable){
          this.fetchManageView();
        }else{
          this.setShowAccountsDefaultInSegment([]);
        }
        this.setAccountTypeInSegment([]);
        this.setSortByInSegment();

        if(this._availabilityCheck.isGroupByAvailable){
          this.view.segGroupBy.isVisible = true;
          this.setGroupByInSegment();
        }else{
          this.view.segGroupBy.isVisible = false;
        }

        this.setCurrencyInSegment([]);
      }else{
        var isManageCustomViewEnable = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_VIEW_MANAGE");
        if(isManageCustomViewEnable){
          this.fetchManageView();
        }
      }
    }catch(e){
      kony.print("Exception in onpreShow"+e);
    }
  },


  onBindEvents : function(){
    try{
      kony.print("Entered onBindEvents");
      this.view.segShowAccounts.onRowClick = this.showAccountsOnRowClick;
      this.view.segAccountType.onRowClick =  this.accountTypeOnRowClick;
      this.view.segCurrency.onRowClick =  this.currencyOnRowClick;
      this.view.segGroupBy.onRowClick =  this.groupByOnRowClick;
      this.view.segSortBy.onRowClick =  this.sortByOnRowClick;
      this.view.segCustomViews.onRowClick = this.navigateToManageGroup;
      this.view.customHeader.flxSearch.onClick = this.navBack;
      this.view.btnApplyFilter.onClick = this.btnApplyFilterOnClick;
    }catch(e){
      kony.print("Exception in onBindEvents"+e);
    }
  },

  resetForm : function(){
    try{
      kony.print("Entered resetForm");
      this._allAccountsPostLogin = [];
      this._selectedShowAccountsArr = [];
      this._initialSelectionTypeOrCurrency = "";
      this.view.segShowAccounts.rowFocusSkin = "sknSegf9f9f9Tab";
      this.view.segGroupBy.rowFocusSkin = "sknSegf9f9f9Tab";
      this.view.segSortBy.rowFocusSkin = "sknSegf9f9f9Tab";
      this.view.lblHeaderTitle.text =  kony.i18n.getLocalizedString("kony.mb.FilterAccounts.ApplyfiltersSpec");
      this.view.flxPopup.isVisible = false;
      this.view.scrollToWidget(this.view.flxHeaderTitle);
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
        this.view.title = kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountsFilter"); //"Approvals";//
        this.view.flxBody.top = "0dp";
      }else{
        this.view.flxHeader.isVisible = true;
        this.view.customHeader.flxBack.isVisible = false;
        this.view.customHeader.flxSearch.isVisible = true;
        this.view.customHeader.imgSearch.src = "closewhite.png";
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountsFilter"); //"Approvals";//
        this.view.flxBody.top = "56dp";
      }

      this.view.segShowAccounts.widgetDataMap = {
        "lblHeader" : "lblHeader",
        "flxImgUp" : "flxImgUp",
        "imgUpArrow" : "imgUpArrow",
        "flxSeparatorHeader" : "flxSeparatorHeader",
        "lblName" : "lblName",
        "flxSelection" : "flxSelection",
        "flxSeparator" : "flxSeparator",
        "imgSelection" : "imgSelection",
        "lblNameCV":"lblNameCV",
        "flxManage":"flxManage",
        "flxShadow" : "flxShadow",
      };
    }catch(e){
      kony.print("Exception in resetForm"+e);
    }
  },

  setShowAccountsDefaultInSegment: function(customViewArr) {
    try {
      kony.print("Entered setShowAccountsDefaultInSegment");
      var finalOrgNames = [];
      var accounts = this._allAccountsPostLogin;
      var configurationManager = applicationManager.getConfigurationManager();
      // var processedAccounts = this.getOrganisationAccountsMap(accounts);
      var orgNames = this.getDistinctValuesFromArray(accounts, "MembershipName");
      var self = this;
      var isFavouriteAccountsAvailable = false;
      
      //Checking Favourtie Accounts availability
       var filterFavAcc = [];
      
      /*if( self.combinedFlowName === self.flowConstants.businessBanking){
         filterFavAcc = accounts.filter(function(el) {
          return el.favouriteStatus == "1" && el.isBusinessAccount == "true";
         });

      }else if( self.combinedFlowName === self.flowConstants.combinedBanking){
        filterFavAcc = accounts.filter(function(el) {
          return el.favouriteStatus == "1" ;
        });
      }else if( self.combinedFlowName === self.flowConstants.personalBanking){
        filterFavAcc = accounts.filter(function(el) {
          return el.favouriteStatus == "1" && el.isBusinessAccount == "false";
        });
      }*/
      
      filterFavAcc = accounts.filter(function(el) {
          return el.favouriteStatus == "1" ;
        });

      if(filterFavAcc.length >0){
        isFavouriteAccountsAvailable = true;
      }

      /*if (orgNames.length > 0) {
        var orgNamesArr = [];
        for(var j = 0 ; j < orgNames.length ; j++){
          var obj = {"lblName":orgNames[j],
                     "isCustomView":false};
          orgNamesArr.push(obj);
        }

        if( self.combinedFlowName === self.flowConstants.combinedBanking ){
          finalOrgNames = [{"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews"),"isCustomView":false},
                           {"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"),"isCustomView":false},
                           //{"lblName":"Favourite Accounts","isCustomView":false},
                           {"lblName":"Personal Accounts","isCustomView":false}, 
                          ].concat(orgNamesArr);
          if(isFavouriteAccountsAvailable){
            finalOrgNames.splice(2,0,{"lblName":"Favourite Accounts","isCustomView":false});
          }
        }else if (self.combinedFlowName === self.flowConstants.businessBanking){
          if(orgNamesArr.length>1){
          finalOrgNames = [{"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews"),"isCustomView":false},
                           {"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"),"isCustomView":false},
                           //{"lblName":"Favourite Accounts","isCustomView":false} 
                          ].concat(orgNamesArr);
          }else{
             finalOrgNames = [{"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews"),"isCustomView":false},
                           {"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"),"isCustomView":false},
                          ];
          }
          if(isFavouriteAccountsAvailable){
            finalOrgNames.splice(2,0,{"lblName":"Favourite Accounts","isCustomView":false});
          }
        }else{
          finalOrgNames = [{"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews"),"isCustomView":false},
                           {"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"),"isCustomView":false},
                           //{"lblName":"Favourite Accounts","isCustomView":false} 
                          ]; //.concat(orgNamesArr);
          if(isFavouriteAccountsAvailable){
            finalOrgNames.splice(2,0,{"lblName":"Favourite Accounts","isCustomView":false});
          }
        }

      } else {
        if( this.combinedFlowName === this.flowConstants.combinedBanking ){
          finalOrgNames = [{"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews"),"isCustomView":false},
                           {"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"),"isCustomView":false},
                           {"lblName":"Personal Accounts","isCustomView":false},
                          ];
          if(isFavouriteAccountsAvailable){
            finalOrgNames.splice(2,0,{"lblName":"Favourite Accounts","isCustomView":false});
          }
        }else if(this.combinedFlowName === this.flowConstants.businessBanking){
          finalOrgNames = [{"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews"),"isCustomView":false},
                           {"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"),"isCustomView":false},
                          ];
          if(isFavouriteAccountsAvailable){
            finalOrgNames.splice(2,0,{"lblName":"Favourite Accounts","isCustomView":false});
          }
        }else{
          finalOrgNames = [{"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews"),"isCustomView":false},
                           {"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"),"isCustomView":false},
                           //{"lblName":"Favourite Accounts","isCustomView":false} 
                          ];
          if(isFavouriteAccountsAvailable){
            finalOrgNames.splice(2,0,{"lblName":"Favourite Accounts","isCustomView":false});
          }
        }

      }*/
      
      if (orgNames.length > 0) {
        var orgNamesArr = [];
        for(var j = 0 ; j < orgNames.length ; j++){
          var obj = {"lblName":orgNames[j],
                     "isCustomView":false};
          orgNamesArr.push(obj);
        }
      }
      
      if(this._isSingleCIF){
        finalOrgNames = [{"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews"),"isCustomView":false},
                         {"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"),"isCustomView":false},
                        ]
        if(isFavouriteAccountsAvailable){
          finalOrgNames.splice(2,0,{"lblName":"Favourite Accounts","isCustomView":false});
        }
                  
                  if (orgNamesArr.length >= 1) {
                        finalOrgNames = finalOrgNames.concat(orgNamesArr);
                    }
      }else{
        finalOrgNames = [{"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews"),"isCustomView":false},
                         {"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"),"isCustomView":false},
                        ];
        if(!kony.sdk.isNullOrUndefined(this._isPrimaryCustID)){
          if(this._isPrimaryCustID.type == "personal"){
            finalOrgNames.splice(2,0,{"lblName":"Personal Accounts","isCustomView":false});
          }
        }
        if(isFavouriteAccountsAvailable){
          finalOrgNames.splice(2,0,{"lblName":"Favourite Accounts","isCustomView":false});
        }
        if( orgNamesArr && orgNamesArr.length>=1){
          finalOrgNames = finalOrgNames.concat(orgNamesArr);
        }
      }
      
      //Custom view permission checck
      var isManageCustomViewEnable = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_VIEW_MANAGE");
      if (isManageCustomViewEnable) {
        if (customViewArr.length > 0) {
          /* var customViewArrWithID = [];
          for(var j = 0 ; j < customViewArr.length ; j++){
          var obj = {"lblName":customViewArr[j],
                     "isCustomView":false};
          customViewArrWithID.push(obj);
        }*/
          finalOrgNames = finalOrgNames.concat({"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.CustomView"),"isCustomView":false},
                                               customViewArr);
        } else {
          finalOrgNames = finalOrgNames.concat({"lblName":kony.i18n.getLocalizedString("kony.mb.FilterAccounts.CustomView"),"isCustomView":false},
                                               {"lblName":"No custom view available","isCustomView":false});
        }
      }
      var scopeObj = this;
      var headerObj = {
        "template": "flxFilterAccountsHeaderExpCollapse",
        "flxShadow": {
          "isVisible" : true
        },
			        "flxImgUp":{
			          onClick : function(eventObject,context){
	                  scopeObj.headerSelectionDetected("segShowAccounts", context);
                                  }
                                },
        "lblHeader": {
          text: kony.i18n.getLocalizedString("kony.mb.FilterAccounts.ShowAccounts")
        }, //"Show Accounts"},
        "imgUpArrow": {
          src: "arrowup.png"
        },
      };
      //this.commonDataSetSegment(headerObj, finalOrgNames, "segShowAccounts",kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts"), false);
      var combinedHeadRowArr = [];
      var self = this;
      var tempRowArr = [];
      var finalArr = [];
      combinedHeadRowArr.push(headerObj);
      var selectionImg = "transparent.png";
      for (var i = 0; i < finalOrgNames.length; i++) {
        var rowObj = {};
        
        if(self._retainSelection.showAccounts=== ""){
          if (finalOrgNames[i].lblName === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts")) {
            selectionImg = "tickmark_green.png";
          } else {
            selectionImg = "transparent.png";
          }
        }else{
          if (finalOrgNames[i].lblName === self._retainSelection.showAccounts) {
			selectionImg = "tickmark_green.png";
          }else{
            selectionImg = "transparent.png";
          }
        }
        if (finalOrgNames[i].lblName === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.CustomView") && finalOrgNames[i].isCustomView == false) {
          rowObj = {
            "template": "flxFilterCustomViews",
            "lblNameCV": {
              text: finalOrgNames[i].lblName,
              left: (finalOrgNames[i].lblName === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll") || finalOrgNames[i].lblName === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews")
                     || finalOrgNames[i].lblName === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.CustomView")) ? "20dp" : "40dp"
            },
            "flxManage": {
              onClick: self.navigateToManageGroup
            },
            "imgSelection": {
              src: ""
            },

          };
        } else {
          rowObj = {
            "template": "flxFilterRows",
            "lblName": {
              text: finalOrgNames[i].lblName,
              left: (finalOrgNames[i].lblName === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll") || finalOrgNames[i].lblName === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews")) ? "20dp" : "40dp"
            },
            "flxSelection": {
              isVisible: true
            },
            "imgSelection": {
              src: selectionImg
            },
            "isDisabled": false,
            "isCustomView": finalOrgNames[i].isCustomView,
            "data" :  finalOrgNames[i]
          };
        }
        tempRowArr.push(rowObj);
      }
      combinedHeadRowArr.push(tempRowArr);
      finalArr.push(combinedHeadRowArr);
      
     //finalArr[0][1].filter((v,i,a)=>a.findIndex(t=>(t.lblName.text === v.lblName.text))===i);

      this.view.segShowAccounts.setData(finalArr);
    } catch (e) {
      kony.print("Exception in setShowAccountsDefaultInSegment" + e);
    }
  },

  setCustomViewsInSegment : function(){
    try{
      kony.print("Entered setCustomViewsInSegment");
      var finalOrgNames = [];
      // var accounts = this._allAccountsPostLogin;
      // var processedAccounts = this.getOrganisationAccountsMap(accounts);
      // var orgNames = this.getDistinctValuesFromArray(accounts,"MembershipName");

      this.view.segCustomViews.widgetDataMap = {
        "lblNameCV":"lblNameCV",
        "flxManage":"flxManage",
        "lblName" : "lblName",
        "flxSelection" : "flxSelection",
        "flxSeparator" : "flxSeparator",
        "imgSelection" : "imgSelection"
      };

      var self = this;
      finalOrgNames = ["My custom View 1"];

      var headerObj = {
        "template" : "flxFilterCustomViews",
        "lblNameCV" :{text : kony.i18n.getLocalizedString("kony.mb.FilterAccounts.CustomView")},//"Show Accounts"},
        "flxManage" : {onClick : self.navigateToManageGroup},
      };

      this.commonDataSetSegment(headerObj, finalOrgNames, "segCustomViews","", false);

    }catch(e){
      kony.print("Exception in setShowAccountsDefaultInSegment"+e);
    }
  },

  navigateToManageGroup : function(){
    var navigatetoApprovals = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountModule');
    navigatetoApprovals.presentationController.commonFunctionForNavigation("frmManageCustomGroup");
  },
  getOrganisationAccountsMap: function(accounts) {
    var businessAccounts = this.getDistinctBusinessAccount(accounts);
    var orgAccounts = {};
    if (businessAccounts.length == 0) {
      orgAccounts = {
        "Personal Accounts": [],
        "Business Accounts": []
      };
      accounts.forEach(function(account) {
        if (account.isBusinessAccount === "true") orgAccounts["Business Accounts"].push(account);
        else orgAccounts["Personal Accounts"].push(account);
      });
    } else {
      orgAccounts["Personal Accounts"] = [];
      for (var i = 0; i < businessAccounts.length; i++) {
        orgAccounts[businessAccounts[i]] = [];
      }
      accounts.forEach(function(account) {
        if (account.isBusinessAccount === "true") {
          if (!kony.sdk.isNullOrUndefined(account.MembershipName) && account.MembershipName !== "") {
            orgAccounts[account.MembershipName].push(account);
          }
        } else orgAccounts["Personal Accounts"].push(account);
      });
    }
    return orgAccounts;
  },

  getDistinctBusinessAccount: function(accounts) {
    var businessAccounts = [];
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].isBusinessAccount === "true") {
        if (!kony.sdk.isNullOrUndefined(accounts[i].MembershipName) && accounts[i].MembershipName !== "") {
          if (businessAccounts.indexOf(accounts[i].MembershipName) === -1) {
            businessAccounts.push(accounts[i].MembershipName);
          }
        }
      }
    }
    businessAccounts.sort();
    return businessAccounts;
  },


  setSortByInSegment : function(){
    try{
      kony.print("Entered setSortByInSegment");
      var scopeObj = this;
      var headerObj = {
        "template" : "flxFilterAccountsHeaderExpCollapse",
	         "flxImgUp":{
              onClick 	: function(eventObject,context){
             scopeObj.headerSelectionDetected("segSortBy", context);
           }
          },
        "lblHeader" :{text : kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SortBy")},//"Show Accounts"},
        "imgUpArrow" : {src : "arrowup.png"},
        "flxShadow": {
          "isVisible" : true
        },
      };

      var configurationManager = applicationManager.getConfigurationManager();
      var accountsTypeArr = [];
      if( this.combinedFlowName === this.flowConstants.combinedBanking || this.combinedFlowName === this.flowConstants.businessBanking){
        accountsTypeArr = [kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType"),"Accounts Name","Balance"];
        this.commonDataSetSegment(headerObj, accountsTypeArr, "segSortBy",kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType"), false);

      }else{
        accountsTypeArr = ["Accounts Name","Balance"];
        this.commonDataSetSegment(headerObj, accountsTypeArr, "segSortBy","Accounts Name", false);
      }


    }catch(e){
      kony.print("Exception in setSortByInSegment"+e);
    }
  },

  setGroupByInSegment : function(){
    try{
      var scopeObj = this;
      kony.print("Entered setGroupByInSegment");

      var headerObj = {
        "template" : "flxFilterAccountsHeaderExpCollapse",
         "flxImgUp":{
			          onClick : function(eventObject,context){
	                  scopeObj.headerSelectionDetected("segGroupBy", context);
                                  }
                                },
        "lblHeader" :{text : kony.i18n.getLocalizedString("kony.mb.FilterAccounts.GroupBy")},//"Show Accounts"},
        "imgUpArrow" : {src : "arrowup.png"},
        "flxShadow": {
          "isVisible" : true
        },
      };
      
      var accountsTypeArr = [];
      if(scopeObj._isSingleCIF){
        accountsTypeArr = [kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")];
        scopeObj.commonDataSetSegment(headerObj, accountsTypeArr, "segGroupBy",kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType"), false);
        scopeObj.view.segGroupBy.isVisible = false;
      }else{
        accountsTypeArr = [kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType"),kony.i18n.getLocalizedString("kony.mb.FilterAccounts.Customer")];
        scopeObj.commonDataSetSegment(headerObj, accountsTypeArr, "segGroupBy",kony.i18n.getLocalizedString("kony.mb.FilterAccounts.Customer"), false);
        scopeObj.view.segGroupBy.isVisible = true;
      }

    }catch(e){
      kony.print("Exception in setGroupByInSegment"+e);
    }
  },

  setCurrencyInSegment : function(rawArr){
    try{
      var scopeObj = this;
      kony.print("Entered setCurrencyInSegment");

      var finalCurrencies = [];
      var accounts = [];

      if(!kony.sdk.isNullOrUndefined(rawArr) && Array.isArray(rawArr)){
        if(rawArr.length >0){
          accounts = rawArr;
        }else{
          accounts = this._allAccountsPostLogin;
        }
      }else{
        accounts = this._allAccountsPostLogin;
      }

      var currencyArr = this.getDistinctValuesFromArray(accounts,"currencyCode");
      if(currencyArr.length >0){
        finalCurrencies = [kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")].concat(currencyArr);
      }else{
        finalCurrencies = [kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")];
      }
     
      var headerObj = {
        "template" : "flxFilterAccountsHeaderExpCollapse",
        "flxImgUp":{
			          onClick : function(eventObject,context){
	                  scopeObj.headerSelectionDetected("segCurrency", context);
                                  }
                                },
        "lblHeader" :{text : kony.i18n.getLocalizedString("kony.mb.FilterAccounts.Currency")},//"Show Accounts"},
        "imgUpArrow" : {src : "arrowup.png"},
        "flxShadow": {
          "isVisible" : true
        },
      };

      if(currencyArr.length >1){
        scopeObj.view.segCurrency.isVisible=true;
      }else{
        scopeObj.view.segCurrency.isVisible=false;
      }

      this.commonDataSetSegment(headerObj, finalCurrencies, "segCurrency","", true);

    }catch(e){
      kony.print("Exception in setCurrencyInSegment"+e);
    }
  },

  setAccountTypeInSegment  : function(rawArr){
	    var scopeObj = this;
    try{
      kony.print("Entered setAccountTypeInSegment");
      var finalAccountyTypes = [];
      var accounts = [];
      if(!kony.sdk.isNullOrUndefined(rawArr) && Array.isArray(rawArr)){
        if(rawArr.length >0){
          accounts = rawArr;
        }else{
          accounts = this._allAccountsPostLogin;
        }
      }else{
        accounts = this._allAccountsPostLogin;
      }

      var orgNames = this.getDistinctValuesFromArray(accounts,"accountType");
      if(orgNames.length >0){
        finalAccountyTypes = [kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")].concat(orgNames);
      }else{
        finalAccountyTypes = [kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")];
      }
      var headerObj = {
        "template" : "flxFilterAccountsHeaderExpCollapse",
        "flxImgUp":{
			          onClick : function(eventObject,context){
	                  scopeObj.headerSelectionDetected("segAccountType", context);
                                  }
                                },
        "lblHeader" :{text : kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")},//"Show Accounts"},
        "imgUpArrow" : {src : "arrowup.png"},
        "flxShadow": {
          "isVisible" : true
        },
      };

      this.commonDataSetSegment(headerObj, finalAccountyTypes, "segAccountType","", true);
    }catch(e){
      kony.print("Exception in setAccountTypeInSegment"+e);
    }
  },

  commonDataSetSegment : function(headerObj, rowArr, segWidgetID, defaultSelection, multiSelect){
    try{
      kony.print("Entered commonDataSetSegment");

      var combinedHeadRowArr = [];
      var self = this;
      var tempRowArr = [];
      var finalArr = [];
      combinedHeadRowArr.push(headerObj);

      var selectionImg = (multiSelect === true) ? "checkbox.png" : "transparent.png";

      for(var i =0 ; i < rowArr.length ; i++){
        var rowObj ={};
        var lblLeftVal = "20dp";

        if(defaultSelection !== "" && multiSelect === false){
          if(rowArr[i] === defaultSelection){
            selectionImg = "tickmark_green.png";
          }else{
            selectionImg = "transparent.png"; 
          }
        }

        if(rowArr[i] === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.CustomView")){

          rowObj =  {
            "template" : "flxFilterCustomViews",
            "lblNameCV" : {text : rowArr[i],
                           left : (rowArr[i]==="Select All"|| rowArr[i]==="Default Views" || rowArr[i] ==="Custom View")?"20dp":"40dp"},
            "flxManage" : {onClick : self.navigateToManageGroup},
            "imgSelection" : {src : ""},
          };
        }
        else{
          if(segWidgetID == "segGroupBy" || segWidgetID == "segSortBy"){
            lblLeftVal = "20dp";
          }else{
            if(rowArr[i]==="Select All"|| rowArr[i]==="Default Views" || rowArr[i] ==="Custom View"){
              lblLeftVal = "20dp";
            }else{
              lblLeftVal = "40dp";
            }
          }
          rowObj =  {
            "template" : "flxFilterRows",
            "lblName" : {text : rowArr[i],
                         left : lblLeftVal,
                        },
            "flxSelection" : {isVisible : true},
            "imgSelection" : {src : selectionImg},
            "isDisabled" : false
          };
        }
        tempRowArr.push(rowObj);
      }
      combinedHeadRowArr.push(tempRowArr);
      finalArr.push(combinedHeadRowArr);

      this.view[segWidgetID].setData(finalArr);
    }catch(e){
      kony.print("Exception in commonDataSetSegment"+e);
    }
  },

  showAccountsOnRowClick: function() {
    try {
      kony.print("Entered showAccountsOnRowclick");
      var selectedItem = this.view.segShowAccounts.selectedRowItems;
      var selectedIndex = this.view.segShowAccounts.selectedRowIndex[1];
      var data = this.view.segShowAccounts.data;
      if(selectedItem[0].lblName.text !== kony.i18n.getLocalizedString("kony.mb.FilterAccounts.DefaultViews") && selectedItem[0].lblName.text !== "No custom view available" ){
         if(selectedItem[0].lblName.text === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.CustomView") && selectedItem[0].isCustomView === false){
           return;
         }
        for (var i = 0; i < data[0][1].length; i++) {
          if (i == selectedIndex ) {
            data[0][1][i].imgSelection.src = "tickmark_green.png";
          } else {
            data[0][1][i].imgSelection.src = "transparent.png";
          }
        }
      }
      // this.view.segShowAccounts.setData([]);
      this.view.segShowAccounts.setData(data);


      //Change the account Type & Currency array accodring to account selection
      var rawArr = [];
      if(selectedItem[0].lblName.text === "Favourite Accounts"){
        rawArr = this._allAccountsPostLogin.filter(function(el) {
          return el.favouriteStatus == "1";
        });
        this.setAccountTypeInSegment(rawArr);
        this.setCurrencyInSegment(rawArr);
      }else if(selectedItem[0].lblName.text === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts")){
        rawArr = this._allAccountsPostLogin
      } else if(selectedItem[0].lblName.text === "Personal Accounts"){
        rawArr = this._allAccountsPostLogin.filter(function(el) {
          return el.isBusinessAccount == "false";
        });
      }else{
        rawArr = this._allAccountsPostLogin.filter(function(el) {
          return el.MembershipName == selectedItem[0].lblName.text;
        });
      }

      this._selectedShowAccountsArr = rawArr;
      this.setAccountTypeInSegment(rawArr);
      this.setCurrencyInSegment(rawArr);

    } catch (e) {
      kony.print("Exception in showAccountsOnRowclick" + e);
    }
  },

  groupByOnRowClick: function() {
    try {
      kony.print("Entered groupByOnRowClick");
      var selectedItem = this.view.segGroupBy.selectedRowItems;
      var selectedIndex = this.view.segGroupBy.selectedRowIndex[1];
      var data = this.view.segGroupBy.data;
      for (var i = 0; i < data[0][1].length; i++) {
        if (i == selectedIndex ) {
          if(data[0][1][i].isDisabled === true){
            data[0][1][i].imgSelection.src = "transparent.png";
            return;
          }else{
            data[0][1][i].imgSelection.src = "tickmark_green.png";
          }

        } else {
          data[0][1][i].imgSelection.src = "transparent.png";
        }
      }
      this.updateSortBySegment(selectedItem);
      this.view.segGroupBy.setData(data);
    } catch (e) {
      kony.print("Exception in groupByOnRowClick" + e);
    }
  },


  updateSortBySegment: function(selItems) {
    try {
      kony.print("Entered updateSortBySegment");
      //var selectedItem = this.view.segSortBy.selectedRowItems;
      //var selectedIndex = this.view.segSortBy.selectedRowIndex[1];
      var data = this.view.segSortBy.data;

      for (var i = 0; i < data[0][1].length; i++) {
        if (selItems[0].lblName.text == kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")){
          if(selItems[0].lblName.text == data[0][1][i].lblName.text ) {
            if(data[0][1][0].imgSelection.src === "tickmark_green.png"){
              data[0][1][i + 1].imgSelection.src = "tickmark_green.png";
            }
            data[0][1][i].imgSelection.src = "transparent.png";
            data[0][1][i].isDisabled = true;
            data[0][1][i].lblName.skin =  "sknlbl727272SSP93pr";
          } 
        }else{
          if(data[0][1][i].lblName.text == kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")){
            data[0][1][i].isDisabled = false;
            data[0][1][i].lblName.skin =  "sknLbl424242SSP26px";
          }
        }

        // else {
        //  data[0][1][i].imgSelection.src = "transparent.png";
        // }
      }

      this.view.segSortBy.setData(data);
    } catch (e) {
      kony.print("Exception in updateSortBySegment" + e);
    }
  },

  sortByOnRowClick: function() {
    try {
      kony.print("Entered sortByOnRowClick");
      var selectedItem = this.view.segSortBy.selectedRowItems;
      var selectedIndex = this.view.segSortBy.selectedRowIndex[1];
      var data = this.view.segSortBy.data;
      for (var i = 0; i < data[0][1].length; i++) {
        if (i == selectedIndex ) {
          if(data[0][1][i].isDisabled === true){
            data[0][1][i].imgSelection.src = "transparent.png";
            return;
          }else{
            data[0][1][i].imgSelection.src = "tickmark_green.png";
          }

        } else {
          data[0][1][i].imgSelection.src = "transparent.png";
        }

      }
      if(this._availabilityCheck.isGroupByAvailable){
        // this.updateGroupBySegment(selectedItem);
      }
      this.view.segSortBy.setData(data);
    } catch (e) {
      kony.print("Exception in sortByOnRowClick" + e);
    }
  },

  updateGroupBySegment: function(selItems) {
    try {
      kony.print("Entered updateGroupBySegment");
      //var selectedItem = this.view.segGroupBy.selectedRowItems;
      //var selectedIndex = this.view.segGroupBy.selectedRowIndex[1];
      var data = this.view.segGroupBy.data;

      for (var i = 0; i < data[0][1].length; i++) {
        if (selItems[0].lblName.text == kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")){
          if(selItems[0].lblName.text == data[0][1][i].lblName.text ) {
            data[0][1][i].imgSelection.src = "transparent.png";
            data[0][1][i].isDisabled = true;
            data[0][1][i].lblName.skin =  "sknlbl727272SSP93pr";
          } 
        }else{
          if(data[0][1][i].lblName.text == kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")){
            data[0][1][i].isDisabled = false;
            data[0][1][i].lblName.skin =  "sknLbl424242SSP26px";
          }
        }
      }

      this.view.segGroupBy.setData(data);
    } catch (e) {
      kony.print("Exception in updateGroupBySegment" + e);
    }
  },

  currencyOnRowClick : function() {
    try {
      kony.print("Entered currencyOnRowClick");

      var selectedItem = this.view.segCurrency.selectedRowItems[0];
      var selectedIndex = this.view.segCurrency.selectedRowIndex[1];
      var data = this.view.segCurrency.data;
      var checkedCounts = 0;
      var  uncheckedCounts = 0;
      var checkedItems = [];

      if(this._initialSelectionTypeOrCurrency == ""){
        this._initialSelectionTypeOrCurrency = "Currency";
      }

      //If diabled item is selected - Logic
      if (selectedItem.isDisabled === true) {
        //alert("disabled");
        return;
      }
      //if select all is clicked
      if (selectedItem.lblName.text === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")) {
        for (var m in data[0][1]) {
          data[0][1][m].imgSelection.src = "checkbox.png";
        }
        this.view.segCurrency.setData(data);
        return;
      }

      //If other than select All is clicked
      if (selectedItem.imgSelection.src === "checkbox.png") {
        selectedItem.imgSelection.src = "checkboxempty.png";
        data[0][1][0].imgSelection.src = "checkboxempty.png";
        this.view.segCurrency.setDataAt(data[0][1][0], 0);
      } else if (selectedItem.imgSelection.src === "checkboxempty.png") {
        selectedItem.imgSelection.src = "checkbox.png";
      }

      this.view.segCurrency.setDataAt(selectedItem, selectedIndex);

      //Turning on and off of selectAll according to selection
      data=this.view.segCurrency.data;
      for (var i = 0; i < data[0][1].length; i++) {
        var checked = data[0][1][i].imgSelection.src ;
        if(checked== "checkbox.png" && data[0][1][i].lblName.text !== kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")){
          checkedCounts++;
          checkedItems.push(data[0][1][i].lblName.text);
        }
        if (checked == "checkboxempty.png" && data[0][1][i].lblName.text !== kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")) {
          uncheckedCounts++;
        }
      }

      if(checkedCounts ===  data[0][1].length-1){
        data[0][1][0].imgSelection.src = "checkbox.png";
        this.view.segCurrency.setDataAt(data[0][1][0], 0);
      }else{
        if (data[0][1].length > 2) {
          data[0][1][0].imgSelection.src = "checkboxempty.png";
        }else{
          data[0][1][0].imgSelection.src = "checkbox.png";
        }
        this.view.segCurrency.setDataAt(data[0][1][0], 0);
      }

      //Atleast one item must be selected
      if(uncheckedCounts === data[0][1].length - 1)
      {
        selectedItem.imgSelection.src = "checkbox.png";
        this.view.segCurrency.setDataAt(selectedItem, selectedIndex);
        this.showToastPopup("failure","There should be atleast one selection");
        return;
      }

      /* when the type of account filter is applied first, it then narrows 
      down the choice of currency to only those relevant to the chosen account type. 
      The other currencies remain disabled until and unless more options are chosen from account types */
      if(this._initialSelectionTypeOrCurrency == "Currency"){
        this.interDependencyCheckWithCurrency(checkedItems,"Currency");
      }

    } catch (e) {
      kony.print("Exception in currencyOnRowClick::" + e);
    }
  },

  accountTypeOnRowClick: function() {
    try {
      kony.print("Entered accountTypeOnRowClick");
      if(this._initialSelectionTypeOrCurrency == ""){
        this._initialSelectionTypeOrCurrency = "AccountType";
      }
      var selectedItem = this.view.segAccountType.selectedRowItems[0];
      var selectedIndex = this.view.segAccountType.selectedRowIndex[1];
      var data = this.view.segAccountType.data;
      var checkedCounts = 0;
      var uncheckedCounts = 0;
      var checkedItems = [];

      //If Disabled row is selected - Logic
      if (selectedItem.isDisabled === true) {
        //alert("disabled");
        return;
      }
      //if select all is clicked
      if (selectedItem.lblName.text === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")) {
        for (var i in data[0][1]) {
          data[0][1][i].imgSelection.src = "checkbox.png";
        }
        this.view.segAccountType.setData(data);
        return;
      }
      //If other than select All is clicked
      if (selectedItem.imgSelection.src === "checkbox.png") {
        selectedItem.imgSelection.src = "checkboxempty.png";
        data[0][1][0].imgSelection.src = "checkboxempty.png";
        this.view.segAccountType.setDataAt(data[0][1][0], 0);
      } else if (selectedItem.imgSelection.src === "checkboxempty.png") {
        selectedItem.imgSelection.src = "checkbox.png";
      }
      this.view.segAccountType.setDataAt(selectedItem, selectedIndex);
      //Turning on and off of selectAll according to selection
      data = this.view.segAccountType.data;
      for (var i = 0; i < data[0][1].length; i++) {
        var checked = data[0][1][i].imgSelection.src;
        if (checked == "checkbox.png" && data[0][1][i].lblName.text !== kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")) {
          checkedCounts++;
          checkedItems.push(data[0][1][i].lblName.text);
        }
        if (checked === "checkboxempty.png" && data[0][1][i].lblName.text !== kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")) {
          uncheckedCounts++;
        }
      }
      if (checkedCounts === data[0][1].length - 1) {
        data[0][1][0].imgSelection.src = "checkbox.png";
        this.view.segAccountType.setDataAt(data[0][1][0], 0);
      } else {
        if (data[0][1].length > 2) {
          data[0][1][0].imgSelection.src = "checkboxempty.png";
        }else{
          data[0][1][0].imgSelection.src = "checkbox.png";
        }
        this.view.segAccountType.setDataAt(data[0][1][0], 0);
      }
      //Atleast one item must be selected
      if (uncheckedCounts === data[0][1].length - 1) {
        selectedItem.imgSelection.src = "checkbox.png";
        this.view.segAccountType.setDataAt(selectedItem, selectedIndex);
        this.showToastPopup("failure","There should be atleast one selection");
        return;
      }


      /* when the type of account filter is applied first, it then narrows 
      down the choice of currency to only those relevant to the chosen account type. 
      The other currencies remain disabled until and unless more options are chosen from account types */
      if(this._initialSelectionTypeOrCurrency == "AccountType"){
        this.interDependencyCheckWithCurrency(checkedItems,"AccountType");
      }

    } catch (e) {
      kony.print("Exception in accountTypeOnRowClick" + e);
    }
  },

  interDependencyCheckWithCurrency : function(checkedItems,clickedOn){
    try{
      var a = [];
      var unique =  [];
      var self = this;
      var segData = [];
      var widgetID = "";

      var rawArr = this._selectedShowAccountsArr;

      if(rawArr.length == 0){
        rawArr = this._allAccountsPostLogin;
      }

      if (clickedOn == "AccountType") {
        for (var j in checkedItems) {
          a = rawArr.filter(x => x.accountType === checkedItems[j]).map(x => x.currencyCode);
          unique = unique.concat(a.filter(self.onlyUnique)).filter(self.onlyUnique);
        }
        widgetID = "segCurrency";
        segData = this.view[widgetID].data;
      } else if (clickedOn == "Currency") {
        for (j in checkedItems) {
          a = rawArr.filter(x => x.currencyCode === checkedItems[j]).map(x => x.accountType);
          unique = unique.concat(a.filter(self.onlyUnique)).filter(self.onlyUnique);
        }
        widgetID = "segAccountType";
        segData = this.view[widgetID].data;
      }

      //Disable all
      for(var m in segData[0][1]){
        if( segData[0][1][m].lblName.text !==  kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")){
          segData[0][1][m].isDisabled = true;
          segData[0][1][m].lblName.skin = "sknlbl727272SSP93pr";
          segData[0][1][m].imgSelection.src = "checkboxempty.png";
        }
      }
      //Enableing only particular currency according to account type selection
      for(var i in unique){
        for(var j in segData[0][1]){
          if(unique[i] === segData[0][1][j].lblName.text && segData[0][1][j].lblName.text !==  kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")){
            segData[0][1][j].isDisabled = false;
            segData[0][1][j].lblName.skin = "sknLbl424242SSP26px";
            segData[0][1][j].imgSelection.src = "checkbox.png";
          }
        }
      }
      this.view[widgetID].setData(segData);
    }catch(e){
      kony.print(e);
    }
  },

  onlyUnique : function(value, index, self) { 
    return self.indexOf(value) === index;
  },

  /*
    *headerSelectionDetected - Header is clicked and called from template controller 
   *
    */
  headerSelectionDetected : function (widgetInfoID,data){
    try{
      kony.print("Entered headerSelectionDetected" +data.widgetInfo);
      var sectionIndex = data.sectionIndex;
      var segData = this.view[widgetInfoID].data;
      var isExpand = segData[sectionIndex][1].length > 0 ? true : false;
			      var scopeObj = this;

      if(isExpand) {  // Make it collapse
        kony.print("collapsing");
        switch(widgetInfoID){
          case "segShowAccounts":
            this._tempShowAccArr = segData;
            break;
          case "segGroupBy":
            this._tempGroupByArr = segData;
            break;
          case "segSortBy":
            this._tempSortByArr = segData;
            break;
          case "segAccountType":
            this._tempAccountTypeArr = segData;
            break;
          case "segCurrency":
            this._tempCurrencyArr = segData;
            break;
        }


        var sectionParams = {
          "template" : "flxFilterAccountsHeaderExpCollapse",
          "flxImgUp":{
			          onClick : function(eventObject,context){
	                  scopeObj.headerSelectionDetected(widgetInfoID, context);
                                  }
                                },
          "lblHeader" :{text :  segData[sectionIndex][0].lblHeader.text},
          "imgUpArrow" : {src : "arrowdown.png"},
          "flxShadow": {
            "isVisible" : true
          },
        };
        this.collapseSection(widgetInfoID,sectionIndex,sectionParams);
      }else{
        kony.print("Expanding");
        var sectionParams = {
          "template" : "flxFilterAccountsHeaderExpCollapse",
	           "flxImgUp":{
			          onClick : function(eventObject,context){
	                  scopeObj.headerSelectionDetected(widgetInfoID, context);
                                  }
                                },
          "lblHeader" :{text :  segData[sectionIndex][0].lblHeader.text},
          "imgUpArrow" : {src : "arrowup.png"},
          "flxShadow": {
            "isVisible" : true
          },
        };
        this.expandSection(widgetInfoID,sectionIndex,sectionParams);
      }

    }catch(e){
      kony.print("Exception in headerSelectionDetected expandCollapse"+e);}
  },


  /*
    *collapseSection - is for collapsing the segment rows and changes made in header section 
   *
    */
  collapseSection : function(segmentWidget,sectionIndex,sectionParams){
    try{
      kony.print("Enterted collapseSection");
      var segData = this.view[segmentWidget].data;
      for(var param in sectionParams){
        segData[sectionIndex][0][param] = sectionParams[param];
      }
      segData[sectionIndex].pop();
      segData[sectionIndex].push([]);
      this.view[segmentWidget].setData(segData);
    }catch(e){
      kony.print("Exception in collapseSection expandCollapse"+e);}
  },

  /*
    *expandSection - is for expanding the segment rows and changes made in header section 
   *
    */
  expandSection : function(segmentWidget,sectionIndex,sectionParams){
    try{
      kony.print("Entered expandSection");

      var segData = this.view[segmentWidget].data;
      var expandSegArr = [];
      switch(segmentWidget){
        case "segShowAccounts":
          expandSegArr = this._tempShowAccArr;
          break;
        case "segGroupBy":
          expandSegArr = this._tempGroupByArr;
          break;
        case "segSortBy":
          expandSegArr = this._tempSortByArr;
          break;
        case "segAccountType":
          expandSegArr = this._tempAccountTypeArr;
          break;
        case "segCurrency":
          expandSegArr = this._tempCurrencyArr;
          break;
      }

      for(var param in sectionParams){
        segData[sectionIndex][0][param] = sectionParams[param];
      }
      segData[sectionIndex].pop();
      segData[sectionIndex].push(expandSegArr[sectionIndex][1]);  //Pusing the original rows

      this.view[segmentWidget].setData(segData);
    }catch(e){
      kony.print("Exception in collapseSection expandCollapse"+e);}
  },


  btnApplyFilterOnClick: function() {
            try {
                kony.print("Enterted btnApplyFilterOnClick");
                var groupBySelVal = [];
                var accountsSelVal = this.getSelectedItems("segShowAccounts", "imgSelection", "tickmark_green.png");
                var sortBySelVal = this.getSelectedItems("segSortBy", "imgSelection", "tickmark_green.png");
                var accountTypeSelVal = this.getSelectedItems("segAccountType", "imgSelection", "checkbox.png");
                var currencySelVal = this.getSelectedItems("segCurrency", "imgSelection", "checkbox.png");
                var scopeObj = this;

                if (this._availabilityCheck.isGroupByAvailable) {
                    groupBySelVal = this.getSelectedItems("segGroupBy", "imgSelection", "tickmark_green.png");
                    this.isGroupName = groupBySelVal;
                }


                var rawArr = [];
                //Show Accounts - Accounts Case Logic
                if (accountsSelVal.length == 0) {
                    this.showToastPopup("failure", kony.i18n.getLocalizedString("kony.mb.anyOneAccSel"));
                    return;
                }

                var selectedAccountName = accountsSelVal[0].lblName.text;
                var isCustomViewSel = accountsSelVal[0].isCustomView;
                if (selectedAccountName === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts")) { //All accounts
                    rawArr = this._allAccountsPostLogin;
                    /*if( this.combinedFlowName === this.flowConstants.combinedBanking){
                      rawArr = this._allAccountsPostLogin;
                    }
                    else if(this.combinedFlowName === this.flowConstants.businessBanking){
                      rawArr = this._allAccountsPostLogin.filter(function(el) {
                        return el.isBusinessAccount == "true";
                      });
                    }
                    else{
                      rawArr = this._allAccountsPostLogin.filter(function(el) {
                        return el.isBusinessAccount == "false";
                      });
                    }*/

                } else if (selectedAccountName === "Favourite Accounts") { //Favoutrite Accounts
                    rawArr = this._allAccountsPostLogin.filter(function(el) {
                        return el.favouriteStatus == "1";
                    });

                    /*if( this.combinedFlowName === this.flowConstants.combinedBanking){
                      rawArr = this._allAccountsPostLogin.filter(function(el) {
                        return el.favouriteStatus == "1";
                      });
                    }
                    else if(this.combinedFlowName === this.flowConstants.businessBanking){
                      rawArr = this._allAccountsPostLogin.filter(function(el) {
                        return el.favouriteStatus == "1" && el.isBusinessAccount == "true";
                      });
                    }
                    else{
                      rawArr = this._allAccountsPostLogin.filter(function(el) {
                        return el.favouriteStatus == "1" && el.isBusinessAccount == "false";
                      });
                    }*/
                } else if (selectedAccountName === "Personal Accounts") { //Personal Accounts
                    rawArr = this._allAccountsPostLogin.filter(function(el) {
                        return el.isBusinessAccount == "false";
                    });
                } else if (isCustomViewSel) { //Custom view
                    var accountIds = accountsSelVal[0].data.accountIDs;
                    rawArr = this.fetchCustomViewAccounts(accountIds);
                    /*if( this.combinedFlowName === this.flowConstants.combinedBanking){
                      rawArr = this.fetchCustomViewAccounts(accountIds);
                    }
                    else if(this.combinedFlowName === this.flowConstants.businessBanking){
                      rawArr = rawArr.filter(function(el) {
                        return  el.isBusinessAccount == "true";
                      });
                    }
                    else{
                      rawArr = rawArr.filter(function(el) {
                        return el.isBusinessAccount == "false";
                      });
                    }*/
                } else { // Organization or membershipName
                    rawArr = this._allAccountsPostLogin.filter(function(el) {
                        return el.MembershipName == selectedAccountName;
                    });
                }
              var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;

                rawArr.forEach(function(account) {
                    //if (account.isBusinessAccount === "false") account.MembershipName = "Personal Accounts";
                  if (account.Membership_id === primaryCustomerId.id && primaryCustomerId.type == "personal"){
                    account.MembershipName = "Personal Accounts";
                  }else{
                    if (primaryCustomerId.id !== account.Membership_id) {
                      if (kony.sdk.isNullOrUndefined(account.MembershipName)) {
                        account.MembershipName = "Personal Accounts";
                      } 
                    }
                  }
                  
                     /*if (account.Membership_id === primaryCustomerId.id && account.isBusinessAccount === "false") {
                                      account.MembershipName = "Personal Accounts";
                                  } else {
                                      if (account.isBusinessAccount === "true") {
                                          
                                      } else {
                                          if (primaryCustomerId.id !== account.Membership_id) {
                                              if (kony.sdk.isNullOrUndefined(account.MembershipName)) {
                                                  account.MembershipName = "Personal Accounts";
                                              } 
                                          }
                                      }
                                  }*/
                });
                //Group By logic
                var grouped = [];
                if (this._availabilityCheck.isGroupByAvailable) {
                    grouped = rawArr.reduce(function(h, obj) {
                        if (groupBySelVal[0] == kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")) {
                            h[obj.accountType] = (h[obj.accountType] || []).concat(obj);
                        } else if (groupBySelVal[0] == scopeObj._CONSTANTS.Customer ) {
                            h[obj.MembershipName] = (h[obj.MembershipName] || []).concat(obj);
                        }
                        return h;
                    }, {});
                } else {
                    groupBySelVal.push(kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType"));
                    grouped = rawArr.reduce(function(h, obj) {
                        if (groupBySelVal[0] == kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")) {
                            h[obj.accountType] = (h[obj.accountType] || []).concat(obj);
                        }
                        return h;
                    }, {});
                }
                var accountsSegmentData = this.getSegmentDataForAccounts(grouped, 3);
                //Account Type and currency logic
                var processedArry = accountsSegmentData.map(function(a) {
                    var con = [];
                    con[1] = a[1].filter(function(el) {
                        for (var i = 0; i < accountTypeSelVal.length; i++) {
                            for (var j = 0; j < currencySelVal.length; j++) {
                                if (accountTypeSelVal[i] == el.accountType && currencySelVal[j] == el.currencyCode) {
                                    return true;
                                }
                            }
                        }
                    });
                    if (con[1].length == 0) {
                        return;
                    } else {
                        con[0] = a[0];
                        /* var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
                        var sum = accountMod.presentationController.getTotalAvailableBalance(con[1]);
                        con[0].lblTypeValue.text = sum;
                        con[0].lblTypeName.text = con[0].lblTypeName.text.split("(")[0]+"("+con[1].length+")";*/
                    }
                    //Sorting Logic
                  var configManager = applicationManager.getConfigurationManager();
                  var dualBalanceConfig = CommonUtilities.CLIENT_PROPERTIES.DUAL_BALANCE;
                  if(!kony.sdk.isNullOrUndefined(dualBalanceConfig)){
                    dualBalanceConfig = JSON.parse(CommonUtilities.CLIENT_PROPERTIES.DUAL_BALANCE);
                  }else{
                    dualBalanceConfig = {
                      "isAvailableBalanceToBeDisplayed":true,
                      "isCurrentBalanceToBeDisplayed":false
                    }
                  }
                    if (sortBySelVal == "Balance") {
                        con[1].sort(function(a, b) {
                            var balanceA;
                            var balanceB;
                            if (a.accountType === configManager.constants.CHECKING || a.accountType === configManager.constants.SAVINGS) {
                                if(!dualBalanceConfig.isAvailableBalanceToBeDisplayed && dualBalanceConfig.isCurrentBalanceToBeDisplayed){
                                  balanceA = parseFloat(a.currentBalance)
                                }
                              else {
                                balanceA = parseFloat(a.availableBalance)
                              }
                            } else if (a.accountType === configManager.constants.CREDITCARD || a.accountType === configManager.constants.DEPOSIT || a.accountType === "Credit Card") {
                                balanceA = parseFloat(a.currentBalance)
                            } else if (a.accountType === configManager.constants.MORTGAGE || a.accountType === configManager.constants.LOAN) {
                                balanceA = parseFloat(a.outstandingBalance)
                            }

                            if (b.accountType === configManager.constants.CHECKING || b.accountType === configManager.constants.SAVINGS) {
                              if(!dualBalanceConfig.isAvailableBalanceToBeDisplayed && dualBalanceConfig.isCurrentBalanceToBeDisplayed){
                                  balanceB = parseFloat(b.currentBalance)
                                }
                              else {
                                balanceB = parseFloat(b.availableBalance)
                              }
                 
                            } else if (b.accountType === configManager.constants.CREDITCARD || b.accountType === configManager.constants.DEPOSIT || b.accountType === "Credit Card") {
                                balanceB = parseFloat(b.currentBalance)
                            } else if (b.accountType === configManager.constants.MORTGAGE || b.accountType === configManager.constants.LOAN) {
                                balanceB = parseFloat(b.outstandingBalance)
                            }
                            return balanceA - balanceB;
                        });
                    } else if (sortBySelVal == kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountsName")) {
                        con[1].sort(function(a, b) {
                            return a.nickName.localeCompare(b.nickName);
                        });
                    } else if (sortBySelVal == kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")) {
                        con[1].sort(function(a, b) {
                            return a.accountType.localeCompare(b.accountType);
                        });
                    }
                    return con;
                }).filter(notUndefined => notUndefined !== undefined);


                //Header Totaling and count addtion
                var forUtility = applicationManager.getFormatUtilManager();
                var configManager = applicationManager.getConfigurationManager();
                var totalBalance = 0.0;
                var currencyCode;
                for (d in processedArry) {
                    totalBalance = 0.0;
                    for (var i = 0; i < processedArry[d][1].length; i++) {
                        if (processedArry[d][1][i].accountType === configManager.constants.SAVINGS || processedArry[d][1][i].accountType === configManager.constants.CHECKING) {
                            totalBalance = totalBalance + parseFloat(processedArry[d][1][i]["availableBalance"]);
                        } else if (processedArry[d][1][i].accountType === configManager.constants.CREDITCARD || processedArry[d][1][i].accountType === configManager.constants.DEPOSIT ||
                            processedArry[d][1][i].accountType === "Credit Card") {
                            totalBalance = totalBalance + parseFloat(processedArry[d][1][i]["currentBalance"]);
                        } else if (processedArry[d][1][i].accountType === configManager.constants.MORTGAGE || processedArry[d][1][i].accountType === configManager.constants.LOAN) {
                            totalBalance = totalBalance + parseFloat(processedArry[d][1][i]["outstandingBalance"]);
                        }
                    }
                    if (processedArry[d][1].length > 0) {
                        currencyCode = processedArry[d][1][0]["currencyCode"];
                    }
                  
                  var headTitle =  processedArry[d][0].lblTypeName.text.split("(")[0];
                    processedArry[d][0].lblTypeValue.text = forUtility.formatAmountandAppendCurrencySymbol(totalBalance, currencyCode);;
                    processedArry[d][0].lblTypeName.text = kony.sdk.isNullOrUndefined(headTitle)?" ":(headTitle).substr(0, 14).trim()  + "(" + processedArry[d][1].length + ")";
                    //  processedArry[d][0].lblTypeName.text.split("(")[0] + "(" + processedArry[d][1].length + ")";
                }

                //DBB-6216 total balance login
                var balText = "";
                var totalBalLblVisible = true;

                for (var h in processedArry) {
                    if (groupBySelVal[0] === kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AccountType")) {
                        if (processedArry[h][0].lblTypeName.text.indexOf("Savings") >= 0 || processedArry[h][0].lblTypeName.text.indexOf("Checking") >= 0) {
                            processedArry[h][0].lblAccountBal.text = "Total Available Balance";
                        } else if (processedArry[h][0].lblTypeName.text.indexOf("CreditCard") >= 0 || processedArry[h][0].lblTypeName.text.indexOf("Deposit") >= 0) {
                            processedArry[h][0].lblAccountBal.text = "Total Current Balance";
                        } else if (processedArry[h][0].lblTypeName.text.indexOf("Loan") >= 0) {
                            processedArry[h][0].lblAccountBal.text = "Total Outstanding Balance";
                        }
                        totalBalLblVisible = true;

                    } else {
                        totalBalLblVisible = false;
                    }

                    //If there is only one account under a section, then again total account balances must not be shown
                    if (processedArry[h][1].length <= 1) {
                        totalBalLblVisible = false;
                    }

                    // IF there are multiple currency then we should not show the balance
                    var currencyCode;
                    for (var i = 0; i < processedArry[h][1].length; i++) {
                        if (i === 0) {
                            currencyCode = processedArry[h][1][i].currencyCode;
                        }
                        if (i > 0) {
                            if (currencyCode !== processedArry[h][1][i].currencyCode) {
                                totalBalLblVisible = false;
                            }
                        }
                    }

                    if (totalBalLblVisible) {
                        processedArry[h][0].lblTypeValue.isVisible = true;
                        processedArry[h][0].lblAccountBal.isVisible = true;
                    } else {
                        processedArry[h][0].lblTypeValue.isVisible = false;
                        processedArry[h][0].lblAccountBal.isVisible = false;
                    }
                }


                //Creating a grouped Accounts Array for unified dashboard search functionality
                var accSegData = [];
                for (var i = 0; i < processedArry.length; i++) {
                    var acc = [];
                    var key = processedArry[i][0].lblTypeName.text.split("(")[0];
                    for (var j in processedArry[i][1]) {
                        acc.push(processedArry[i][1][j]);
                    }
                    accSegData[key] = acc;
                }

                this._retainSelection = {
                    "showAccounts": accountsSelVal[0].lblName.text,
                    "groupBy": groupBySelVal[0],
                    "sortBy": sortBySelVal,
                    "accountType": accountTypeSelVal,
                    "currency": currencySelVal
                };

                //Setting data
                var data = {
                    "segData": processedArry,
                    "isFilterApplied": true,
                    "selectedAccountsName": selectedAccountName,
                    "accountData": accSegData
                };
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("frmFilterAccounts", data);
              //  navManager.navigateTo("AccountModule/frmUnifiedDashboard");
              	navManager.navigateTo({"appName":"HomepageMA","friendlyName" : "AccountsUIModule/frmUnifiedDashboard"});
            } catch (e) {
                kony.print("Exception in btnApplyFilterOnClick " + e);
            }
        },

  fetchCustomViewAccounts : function(accountIdsValue){
    try{
      var navManager = applicationManager.getNavigationManager();
      //         var custominfoInt = navManager.getCustomInfo("frmDashboard");
      //         var accounts = custominfoInt.accountData;      
      var custominfoInt = navManager.getCustomInfo("frmDashboard");
      var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
      var internalAccounts;
      var accounts;
      internalAccounts = custominfoInt.accountData;
      var externalAccounts = custominfoExt.accountData;
      if (Array.isArray(externalAccounts)) {
        if (externalAccounts.length === 0) {
          accounts = internalAccounts.concat(externalAccounts);
        } else {
          accounts = custominfoInt.accountData;
        }
      } else {
        accounts = custominfoInt.accountData;
      }
      var accountIds = accountIdsValue;//navManager.getCustomInfo("CustomviewSelectedAccountIds");
      var accountIDs = accountIds.split(",");
      var AccountFilterarray = [];
      ///***this loop is used  for filter the custom view accounts from All acoounts***////
      ///**using accountIDs to filter
      for (var j = 0; j < accountIDs.length; j++) {
        for (var k = 0; k < accounts.length; k++) {
          if (accounts[k].accountID === accountIDs[j]) {
            AccountFilterarray.push(accounts[k]);
          }
        }
      }
      return AccountFilterarray;
    }catch(e){
      kony.print("Exception in fetchCustomViewAccounts "+e);}
  },

  processAccountsDataForSegment : function(accounts){
    var configurationManager = applicationManager.getConfigurationManager();
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
    var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var forUtility = applicationManager.getFormatUtilManager();
    var self =this;
    var balanceType = "";
    var balanceTypeVisiblity = false;
    var dualBalanceConfig = CommonUtilities.CLIENT_PROPERTIES.DUAL_BALANCE;
    
    if(!kony.sdk.isNullOrUndefined(dualBalanceConfig)){
      dualBalanceConfig = JSON.parse(CommonUtilities.CLIENT_PROPERTIES.DUAL_BALANCE);
    }else{
      dualBalanceConfig = {
        "isAvailableBalanceToBeDisplayed":true,
        "isCurrentBalanceToBeDisplayed":false
      }
    }
    var templateName = "";

    if(!isSingleCustomerProfile){
      if(!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
         !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)){
        if(dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
           dualBalanceConfig.isCurrentBalanceToBeDisplayed === true){
          templateName = "flxCombinedAccountsEuro";
        }else{
          templateName = "flxCombinedAccounts";
        }
      }else {
        templateName = "flxCombinedAccounts";
      }
    }else{
      if(!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
         !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)){
        if(dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
           dualBalanceConfig.isCurrentBalanceToBeDisplayed === true){
          templateName = "flxAccountsNoImageEuro";
        }else{
          templateName = "flxAccountsNoImage";
        }
      }else {
        templateName = "flxAccountsNoImage";
      }
    }
    var imgIcon = "";


    for(var key in accounts) {
      accounts[key].forEach(function(account){
        var isBusinesspayee = account.isBusinessAccount;
        if (!isSingleCustomerProfile) {
          imgIcon = isBusinesspayee === "false" ? "personalaccount.png" : "businessaccount.png"
          account.imgAccountType = {
            "src" : imgIcon,
            "isVisible" : true
          };
          account.flxAccountType = {
            "isVisible" : true
          };
        } else {
          imgIcon = "";
          account.imgAccountType = {
            "isVisible" : false
          };
          account.flxAccountType = {
            "isVisible" : false
          };
        }

        /*var imgIcon = "businessaccount.png";
        if( self.combinedFlowName === self.flowConstants.combinedBanking){
          if(account.isBusinessAccount === "false"){
            imgIcon = "personalaccount.png" ;
          }else{
            imgIcon = "businessaccount.png";
          }
        }
        else if(self.combinedFlowName === self.flowConstants.businessBanking){
          imgIcon = "businessaccount.png";
        }
        else{
          imgIcon = "personalaccount.png" ;
        }*/

        account.imgBank = {
          "src" : (account.logoURL) ? account.logoURL : "",
          "isVisible" : (account.logoURL) ? true : false
        };
        account.flximgBank = {
          "isVisible" : (account.logoURL) ? true : false
        };
        account.availableBalanceValue = {
          //"text" : applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(account.availableBalance, account.currencyCode)
          "text" :accountMod.presentationController.getAvailableBalanceCurrencyString(account),

        };
        account.lblAccountBal = {
          //"text" : "Available Balance"
          "text" :accountMod.presentationController.getAvailableBalanceType(account)
        };

        account.currentBalanceForDual = account.currentBalance;
        if(configurationManager.constants.SAVINGS ===  account.accountType){
          balanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
          balanceTypeVisiblity = true;

          account.currentBalanceForDual = {
            "text" : forUtility.formatAmountandAppendCurrencySymbol(account.currentBalanceForDual,account.currencyCode),
            "isVisible" : true
          }
        }else if(configurationManager.constants.CHECKING === account.accountType){
          balanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
          balanceTypeVisiblity = true;
          account.currentBalanceForDual = {
            "text" : forUtility.formatAmountandAppendCurrencySymbol(account.currentBalanceForDual,account.currencyCode),
            "isVisible" : true
          }
        }else{
          balanceType = "";
          balanceTypeVisiblity = false;
          account.currentBalanceForDual = {
            "text" : forUtility.formatAmountandAppendCurrencySymbol(account.currentBalanceForDual,account.currencyCode),
            "isVisible" : false
          }
        }

        account.lblAccountBal2 = {
          "text" : balanceType,
          "isVisible" : balanceTypeVisiblity
        };

        account.flxSeparator = {
          "isVisible" : true
        };

        account.maskedNickName = {
          "text" : !kony.sdk.isNullOrUndefined(account.nickName) ? (account.nickName).substr(0, 25).trim() : "NA"
        }
        account.maskedAccountNumber = {
          "text" : "..." + (account.accountID).substr((account.accountID).length - 4)
        };
        account.template = templateName;
      });
    }
    this.filteredAccountsData = this.clone(accounts);
  },

    getSegmentDataForAccounts : function(accounts, limit){
      var segData = [];
      this.processAccountsDataForSegment(accounts);
      var templateName = "";
      var currencyCode = "";
      var self =this;
      //Sibhi Start
      var configurationManager = applicationManager.getConfigurationManager();
      if( self.combinedFlowName === self.flowConstants.combinedBanking){
        templateName = "flxClearViewAll";
      }
      else if(self.combinedFlowName === self.flowConstants.businessBanking){
        templateName = "flxViewAll";
      }
      else{
        templateName = "flxViewAll";
      }
      //Sibhi End
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      if(isSingleCustomerProfile==true|| isSingleCustomerProfile =="true"){
        var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
        for (var priorityType in prioritizeAccountTypes) {
          var key = prioritizeAccountTypes[priorityType];
          if (accounts.hasOwnProperty(key)) {
            segData.push(this.getSegmentDataForEachAccount(accounts,limit,key,templateName)[0]);
          }
        }
      }
      else{
        for(var key in accounts) {
          segData.push(this.getSegmentDataForEachAccount(accounts,limit,key,templateName)[0]);
        }
      }
      return segData;
    },
    getSegmentDataForEachAccount:function(accounts, limit,key,templateName){
      var segData = [];
      this.processAccountsDataForSegment(accounts);
      var currencyCode = "";
      var self =this;
      var viewAllConfig = {
        "template" : templateName, //"flxClearViewAll"
        "lblViewAll" : {
          //"text" : "View All"   
          "isVisible": false   // Disabling it as the text is not need
        },
        "imgViewAll": {//"left" : "200%" ,
          "src":"blue_downarrow.png",
          "left":"50%"
        },
        "flxViewContainer" : {
          "onClick" : function(eventobject, context){
            var accountsData = {};
            var accountsKeys = Object.keys(this.filteredAccountsData);
            accountsData[accountsKeys[context.sectionIndex]] = this.filteredAccountsData[accountsKeys[context.sectionIndex]];
            //Upon clicking the downarrow, processing the entire set of data to be visible in the list
            if (accountsData[accountsKeys[context.sectionIndex]].length > limit) {
              var pendingRowdata = accountsData[accountsKeys[context.sectionIndex]].slice(limit, accountsData[accountsKeys[context.sectionIndex]].length);
              var acctSegData = this.getSegmentDataForAccounts(this.filteredAccountsData, 3);
              acctSegData.forEach(function(sectionData, index) {
                if (index == context.sectionIndex) {
                  sectionData[1].pop();
                  Array.prototype.push.apply(sectionData[1], pendingRowdata)
                }
              });
              //this.view.segAccounts.setData(acctSegData);
            }
          }.bind(this)
        }
      };

      var balText = "";
      var totalBalLblVisible=true;
      var rowData = accounts[key];

      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      var sum = 0;
      if(totalBalLblVisible){
        sum = accountMod.presentationController.getTotalAvailableBalance(rowData);
      }

      var headingTitle = "";
      if(key == null || key == "null"){
        /*if( self.combinedFlowName === self.flowConstants.combinedBanking){
            templateName = "flxClearViewAll";
          }
          else*/ if(self.combinedFlowName === self.flowConstants.businessBanking){
            headingTitle = "Business Accounts";
          }
        else{
          headingTitle = "Personal Accounts";
        }
      }else{
        headingTitle = key;
      }

      segData.push([
        {
          "template" : "flxAccountsHeaderDashboardwithBorder",
          "flxHeaderShadows" : {
            "isVisible" : true
          },
          "flxSeperator" : {
            "isVisible" : true
          },
          "lblTypeName" : {
            "text" : headingTitle + "("+ accounts[key].length +")"
          },
          "lblTypeValue": {
            "text": sum,
            "isVisible":totalBalLblVisible
          },
          "lblAccountBal": {
            "isVisible" : totalBalLblVisible,
            "text" : balText
          }
        },
        rowData
      ]);
      return segData;
    },
  getSelectedItems  : function(widgetID,imgID,imgName){
    try{
      kony.print("Enterted getSelectedItems");
      var self = this;
      var data = this.view[widgetID].data[0][1];
      var newArray  = [];

      var filterArr = data.filter(function (el) {
        return el[imgID].src == imgName;
      }.bind(this));

      if(widgetID === "segShowAccounts"){
        for(var i =0 ; i < filterArr.length; i++){
          if(filterArr[i].lblName.text !== kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")){
            newArray.push(filterArr[i]);
          }
        }
      }else{
        //if(widgetID === "segShowAccounts" || widgetID === "segGroupBy" || widgetID === "segSortBy" || widgetID === "segAccountType" || widgetID === "segCurrency"){


        for(var i =0 ; i < filterArr.length; i++){
          if(filterArr[i].lblName.text !== kony.i18n.getLocalizedString("kony.mb.FilterAccounts.SelectAll")){
            newArray.push(filterArr[i].lblName.text);
          }
        }
      }
      //}
      return newArray;
    }catch(e){
      kony.print("Exception in getSelectedItems "+e);}
  },

  /**
     * Description
     * @method clone
     * @param {} source
     * @return result
     */
  clone: function (source) {
    var result = source,
        i, len;
    if (!source ||
        source instanceof Number ||
        source instanceof String ||
        source instanceof Boolean) {
      return result;
    } else if (Object.prototype.toString.call(source).slice(8, -1) === 'Array') {
      result = [];
      var resultLen = 0;
      for (i = 0, len = source.length; i < len; i++) {
        result[resultLen++] = this.clone(source[i]);
      }
    } else if (typeof source == 'object') {
      result = {};
      for (i in source) {
        if (source.hasOwnProperty(i)) {
          result[i] = this.clone(source[i]);
        }
      }
    }
    return result;
  },

      getDistinctValuesFromArray : function(array,filterKey){
        try{
          var accounts = array;
          var flags = [], output = [], accountsArrlen = accounts.length, i;
             var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
          for( i=0; i<accountsArrlen; i++) {
            if( flags[accounts[i][filterKey]]) 
              continue;
            flags[accounts[i][filterKey]] = true;
            if(accounts[i][filterKey] !== null &&accounts[i][filterKey] !== undefined){
              var acc = {"isCustomView" : false,
                         "lblName": accounts[i].MembershipName};
              
              if(filterKey === "MembershipName"){
                if (!this._isSingleCIF) {
                 if(accounts[i].Membership_id !== primaryCustomerId.id ){
                   output.push(accounts[i][filterKey]);
                 }
               }else{
                 output.push(accounts[i][filterKey]);
               }
            }else{
               output.push(accounts[i][filterKey]);
            }
            }
          }
          return output;
        }catch(e){
          kony.print("Exception in getDistinctValuesFromArray"+e);
        }
    },
  navBack  : function(){
    try{
      // var navMan=applicationManager.getNavigationManager();
      // navMan.goBack();
      var navigatetoApprovals = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountModule');
      var frmName = {
            "appName": "HomepageMA",
            "friendlyName": "AccountsUIModule/frmUnifiedDashboard"
        };
      navigatetoApprovals.presentationController.commonFunctionForNavigation(frmName);
    }catch(e){
      kony.print("Exception in navBack"+e);
    }
  },

  fetchManageView:function(){
    try{
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navObj = 
          {	
            requestData: {},
            formData : this
          };
      var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountModule');
      accountModule.presentationController.getCustomview(navObj);

    }catch(er){
      kony.print("Exception in fetchManageView"+er);
    }
  },

  ///////********getCustomviewViewSuccessCallBack is used set the manageList*****////////
  getCustomviewViewSuccessCallBack:function(response)
  {
    try {
      var customViewAccoutsArr = [];
      if(response.customview.length===0){

        customViewAccoutsArr = [];

      } else{
        for(var i =0 ; i<response.customview.length ; i++){
          var acc = {"isCustomView" : true,
                     "lblName": response.customview[i].name,
                     "id": response.customview[i].id,
                     "accountIDs" : response.customview[i].accountIds
                    };

          customViewAccoutsArr.push(acc)
        }

      } 
      this.setShowAccountsDefaultInSegment(customViewAccoutsArr);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(error){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in getCustomviewViewSuccessCallBack -->"+error);
    }       
  },
  fetchErrorcallBack:function(response)
  {
    try {    
      if(!kony.sdk.isNullOrUndefined(response)){
        var scopeObj=this;
        var errorResponse = response.errorMessage;
        this.view.flxPopup.customPopup.lblPopup.text = errorResponse;      
        this.timerCounter=parseInt(this.timerCounter)+1;
        var timerId="timerPopupError"+this.timerCounter;
        this.view.flxPopup.skin = "sknflxff5d6e";
        this.view.customPopup.imgPopup.src = "errormessage.png";    
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
          scopeObj.view.flxPopup.setVisibility(false);
        }, 1.5, false);             
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(error){
      kony.print("frmACHTransactions fetchErrorcallBack-->"+error);
    }       
  },

  showToastPopup : function(successOrfailure,message)
  {
    try {   

      var scopeObj=this;
      var statusMessage = message;

      if(successOrfailure === "success"){
        statusMessage = message === "" ? "Successfully executed" : message;
        this.view.flxPopup.skin = "sknFlxBg43ce6eTab";
        this.view.customPopup.imgPopup.src = "confirmation_tick.png";  
      }else if(successOrfailure === "failure"){
        this.view.flxPopup.skin = "sknflxff5d6e";
        this.view.customPopup.imgPopup.src = "errormessage.png";  
      }

      this.view.customPopup.lblPopup.text = statusMessage;    
      if(!kony.sdk.isNullOrUndefined(this._timerCounter)){
        this._timerCounter = parseInt(this._timerCounter)+1;
      }
      else{
        this._timerCounter = 1;
      }
      var timerId="timerPopupErrorACHTransactionDetail"+this._timerCounter;
      this.view.flxPopup.setVisibility(true);
      kony.timer.schedule(timerId, function() {
        scopeObj.view.flxPopup.setVisibility(false);

      }, 2, false);            
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(error){
      kony.print("Exception in showToastMessage-->"+error);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }      
  }
};
});