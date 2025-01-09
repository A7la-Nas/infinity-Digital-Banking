define({
  date:null,
  downloadFileId:"",
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmAccountStatementsPreshow:function()
  {
    //this.view.flxFooter.isVisible = false;
    this.view.lblDownloadTitle.onTouchStart = this.downloadCombinedStatement;
    this.view.imgDownloadSymbol.onTouchStart = this.downloadCombinedStatement;
    this.view.btnGenerate.onClick = this.navigateToCombinedStatements;
    var navMan = applicationManager.getNavigationManager();
    var isGenerateNewStatementInvoked = navMan.getCustomInfo("isGenerateNewStatementInvoked");
    if(isGenerateNewStatementInvoked) {
      this.checkDownloadStatusOfCombinedStatement();
      navMan.setCustomInfo("isGenerateNewStatementInvoked" , false);
    }
    navMan.setCustomInfo("frmCombinedStatementsSelectedAccounts", []);
    this.view.flxHamburger.setVisibility(false);
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxFooter.isVisible = false;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
    var scope=this;
    this.date=new Date();
    var accMod=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accMod.presentationController.checkAccountStamentPermission();      
    this.view.flxSegStatements.isVisible=true;
    this.view.flxNoStatements.isVisible=false;
    //this.setSegStatementsData();
    this.view.flxMonthlyStatements.isVisible = false;
    this.initStatements();
    this.view.lblMonthStatement1.text = "";
    this.view.lblMonthStatement2.text = "";
    this.view.lblMonthStatement3.text = "";
    this.view.lblMonthStatement4.text = "";
    this.view.lblMonthStatement5.text = "";
    this.view.lblMonthStatement6.text = "";
    this.view.lblMonthStatement7.text = "";
    this.view.lblMonthStatement8.text = "";
    this.view.lblMonthStatement9.text = "";
    this.view.lblMonthStatement10.text = "";
    this.view.lblMonthStatement11.text = "";
    this.view.lblMonthStatement12.text = "";
	 
    this.view.customFooter.lblAccounts.skin="sknLbl424242SSP20px";
    this.view.customFooter.flxAccSelect.setVisibility(true);
    this.view.customFooter.lblTransfer.skin="sknlbl727272SSP20px";
    this.view.customFooter.flxTransferSel.setVisibility(false);
    this.view.customFooter.lblBillPay.skin="sknlbl727272SSP20px";
    this.view.customFooter.flxBillSelected.setVisibility(false);
    this.view.customFooter.lblMore.skin="sknlbl727272SSP20px";
    this.view.customFooter.flxMoreSelect.setVisibility(false);
    
    this.view.btnEStatements.onClick = this.tabSwitchEStatements;
    this.view.btnCombinedStatements.onClick = this.checkDownloadStatusOfCombinedStatement;
    this.view.btnAdhoc.onClick=this.tabSwitchAdhocStatements;
    //this.view.lblYear1.skin="sknLbl0095e422px";
    //this.view.lblYear2.skin="sknLbla0a0a0SSPReg22px";
    //this.view.lblYear1.text=this.date.getFullYear()+" "+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.statements");
    //this.view.lblYear2.text=this.date.getFullYear()-1+" "+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.statements");
    //this.view.segStatements.onRowClick=this.onClicksegStatements;
    //this.view.flxStatementYr1.onClick=this.flxStatementYr1OnClick;
    //this.view.flxStatementYr2.onClick=this.flxStatementYr2OnClick;
    //this.view.flxYearNext.onClick = this.selectYear;
    //this.view.flxAccountNext.onClick = this.selectAccount;
    this.view.flxYearSelection.onClick = this.selectYear;
	this.view.flxAccountSelection.onClick = this.selectAccount;
    this.view.forceLayout(); 
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler =  applicationManager.getMenuHandler();
    MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUACCOUNTS);
    this.view.customHeader.imgBack.src = "backbutton.png";
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.customHeader.flxBack.onClick=this.flxBackOnClick;
    this.view.onDeviceBack=this.flxBackOnClick;
  },

  //   setSegStatementsData:function()
  //   {
  //     var navMan=applicationManager.getNavigationManager();
  //     var statements=navMan.getCustomInfo("frmAccStatements");
  //     this.view.lblAccValue.text=statements.accountdata["nickName"];
  //     this.view.lblShowValue.text=this.date.getFullYear()+" "+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.statements");
  //     var statementdata=[];
  //     var formatUtil=applicationManager.getFormatUtilManager();
  //     var months=  formatUtil.getYearAppendedPreviousMonths();
  //     if(months.length>0)
  //     {
  //       this.view.flxSegStatements.isVisible=true;
  //       this.view.flxNoStatements.isVisible=false;
  //       for(var i=months.length-1;i>=0;i--)
  //       {
  //         var statedata={   "lblStatementMonth":months[i]};
  //         statementdata.push(statedata);
  //       }
  //       this.view.segStatements.setData(statementdata);
  //     }
  //     else
  //     {
  //       this.view.flxSegStatements.isVisible=false;
  //       this.view.flxNoStatements.isVisible=true;
  //     }
  //   },
  showAccoutStatements: function(permission){  
    var scope =this;
      if(permission.combinedStatement === true && permission.eStatement === false){
        scope.view.btnEStatements.setVisibility(false);
        scope.view.flxSeparator01.setVisibility(false);
        scope.view.btnCombinedStatements.skin = "ICSknBtnbgFFFFFFfont003E7536px";        
        scope.checkDownloadStatusOfCombinedStatement();
      }
      else if(permission.combinedStatement === false && permission.eStatement === true){
        scope.view.btnCombinedStatements.setVisibility(false);
        scope.view.flxSeparator01.setVisibility(false);
      }    
  },
  tabSwitchEStatements : function(){
    this.view.btnEStatements.skin = "ICBtn003E7534px";
    this.view.btnCombinedStatements.skin = "ICSknBtnbgFFFFFFfont003E7536px";
    this.view.btnAdhoc.skin = "ICSknBtnbgFFFFFFfont003E7536px";
    this.view.flxSegStatements.setVisibility(true);
    this.view.flxCombinedStatementsWrapper.setVisibility(false);
    this.view.flxAdhocWrapper.setVisibility(false);
  },
  tabSwitchAdhocStatements: function()
  {
    var self=this;
    this.view.btnEStatements.skin="ICSknBtnbgFFFFFFfont003E7536px";
    this.view.btnCombinedStatements.skin="ICSknBtnbgFFFFFFfont003E7536px";
    this.view.btnAdhoc.skin="ICBtn003E7534px";
    this.view.flxSegStatements.setVisibility(false);
    this.view.flxCombinedStatementsWrapper.setVisibility(false);
    this.view.flxAdhocWrapper.setVisibility(true);
    this.view.flxMainAdhoc.setVisibility(false);
    this.view.flxAdhocWarn.setVisibility(false);
     applicationManager.getPresentationUtility().showLoadingScreen();
    var accMod=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accMod.presentationController.getAdhocStatements(function sucess(data){
      self.getAdhocStatementSucCallback(data);
    }, function failure(data){
      self.getAdhocStatementsFailureCallback(data);
    })
  },
  getAdhocStatementSucCallback:function(res)
  {
        var scope =this;
        if (res.length < 1) 
        {
          this.view.flxMainAdhoc.setVisibility(false);
          this.view.flxAdhocWarn.setVisibility(true);
        } else 
        {
          this.view.flxAdhocWarn.setVisibility(false);
         
          var dataWidgetMap = {
            "imgPDFIcon": "imgIcon",
            "lblDate": "date",
            "lblPdfName":"fileName",
            "imgDownloadSymbol":"statusSymbol",
            "lblDownloadTitle":"lblStatus"
          };
          for(var i=0;i<res.length;i++)
          {
            var date = new Date(res[i].generatedDate);
            res[i]["date"] = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
            res[i]["imgIcon"]=this.getImageByType(res[i].fileType);
            res[i]["lblStatus"]={
              "text":scope.getDownloadStatusMessage(res[i].status),
              "onTouchStart":res[i].status=="Success"?scope.downloadCombinedStatement.bind(this,res[i].fileId):"",
               "skin":"sknLbl0095e4SSPReg32px"
            }
           res[i]["statusSymbol"]=
            {
              "src":scope.getDownloadStatusImage(res[i].status),
              "onTouchStart":res[i].status=="Success"?scope.downloadCombinedStatement.bind(this,res[i].fileId):""
              
            }


          }
           this.view.flxMainAdhoc.setVisibility(true);
          this.view.segAdhocStatement.widgetDataMap=dataWidgetMap
          this.view.segAdhocStatement.setData(res);


        }
      kony.application.dismissLoadingScreen();
  },
  getAdhocStatementsFailureCallback:function(data)
  {
 kony.application.dismissLoadingScreen();
  },
  checkDownloadStatusOfCombinedStatement:function(){
    var self=this;
    this.downloadFileId="";
    applicationManager.getPresentationUtility().showLoadingScreen();
    var payload={};
    payload.userId = applicationManager.getUserPreferencesManager().getUserObj().userId;
    var accMod=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accMod.presentationController.checkDownloadStatusOfCombinedStatement(payload, function sucess(data){
      self.checkDownloadStatusOfCombinedStatementSucCallback(data);
    }, function failure(data){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      self.checkDownloadStatusOfCombinedStatementFailureCallback(data);
    })
  },
  checkDownloadStatusOfCombinedStatementSucCallback: function(res){
    
    this.tabSwitchCombinedStatements();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(res.status && res.fileId && res.fileName){
      this.view.flxMain.isVisible = true;
      var date = new Date(res.generatedDate);
      var outputDate = date.getDate()+"/"+(date.getMonth() + 1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
      this.view.lblPdfName.text=res.fileName;
      this.view.imgDownloadSymbol.fileId =res.fileId;
      this.downloadFileId=res.fileId;
      this.view.lblDate.text=outputDate;
      this.view.lblDownloadTitle.text=this.getDownloadStatusMessage(res.status);
      this.view.imgPDFIcon.src =this.getImageByType(res.fileType);
      this.view.imgDownloadSymbol.src =this.getDownloadStatusImage(res.status);
      if(res.status==="InProgress"){
        this.view.lblCombinedStatementInfo.text = kony.i18n.getLocalizedString("i18n.combinedStatements.statementDownloadProgress");
      }
      if(res.status==="Failed"){
        this.view.lblCombinedStatementInfo.text = kony.i18n.getLocalizedString("i18n.combinedStatements.statementFailed");
      }
      else{
        this.view.lblCombinedStatementInfo.text = kony.i18n.getLocalizedString("i18n.olb.ViewStatementInfoWithHyphen");
      }
    }else{
      this.view.lblCombinedStatementInfo.text = kony.i18n.getLocalizedString("i18n.combinedStatements.noStatementAvailable");
      this.view.flxSegStatements.isVisible = false;
      this.view.flxMain.isVisible = false;
    }
  },
  checkDownloadStatusOfCombinedStatementFailureCallback: function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  getImageByType: function (type) {
    var image;
    switch (type) {
      case "pdf":
        image = "pdf.png";
        break;
      case "csv":
        image = "csv_image.png";
        break;
      case "xlsx":
        image = "xls_image.png";
        break;
      case "xls":
        image = "xls_image.png";
        break;
      case "qfx":
        image = "csv_image.png";
      case "qbo":
        image = "csv_image.png";

    }
    return image;
  },
  getDownloadStatusMessage: function (status) {
    var downloadstatus;
    switch (status) {
      case "Success":
        downloadstatus = kony.i18n.getLocalizedString("i18n.common.Download");
        break;
      case "InProgress":
        downloadstatus = kony.i18n.getLocalizedString("i18n.Search.InProgress");
        break;
      case "Failed":
        downloadstatus = kony.i18n.getLocalizedString("i18n.Search.Failed");
        break;

    }
    return downloadstatus;
  },
  getDownloadStatusImage: function (status) {
    var image;
    switch (status) {
      case "Success":
        image = "inprogressiconnew.png";
        break;
      case "InProgress":
        image = "inprogress.png";
        break;
      case "Failed":
        image = "aa_password_error.png";
        break;       
    }
    return image;
  },
  downloadCombinedStatement:function(fileId){
      var self=this;
      var payload={};
      payload.fileId=this.downloadFileId;
      //payload.fileId=this.view.imgDownloadSymbol.fileId;

	if(payload.fileId){
      var accMod=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
      accMod.presentationController.DownloadCombinedStatement(payload)
      }else{
        kony.print("fileID is empty");
      }
    },
  tabSwitchCombinedStatements : function(){
    this.view.btnEStatements.skin = "ICSknBtnbgFFFFFFfont003E7536px";
    this.view.btnCombinedStatements.skin = "ICBtn003E7534px";
     this.view.btnAdhoc.skin="ICSknBtnbgFFFFFFfont003E7536px";
    this.view.flxCombinedStatementsWrapper.setVisibility(true);
    this.view.flxSegStatements.setVisibility(false);
    this.view.flxAdhocWrapper.setVisibility(false);
  },  
  setMonthsData: function() {
    var self = this;
    var userselectedYear;
    var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";   
    var year = parseInt(this.view.lblYear.text);
    var accountNumber = this.view.lblAccount.text;
    accountNumber = accountNumber.substring(accountNumber.length-4);
    var navManager = applicationManager.getNavigationManager();
    var customInfo = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboard")));
    var accountList = customInfo.accountData;
    for (var i=0; i<accountList.length; i++) {
      if ((accountList[i].accountID).includes(accountNumber)) {
        accountNumber=accountList[i].accountID;
        break;
      }
    }
    if(year){
      userselectedYear=year;
    }
    // To DO need to move this account number to server and configuration drivern
    //accountNumber = "110008";
    var inputParams={
      "page": "1",
      "accountNumber": accountNumber,
	  "customerNumber": applicationManager.getUserPreferencesManager().getUserId(),// To DO need to move this customer number to server and configuration drivern
      "year": userselectedYear,
      "subType": "Statement",
      "Auth_Token":KNYMobileFabric.currentClaimToken
    };
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accMod.presentationController.getMonthlyStatements(inputParams, function sucess(data){
     
      self.setMonthsDataNewSuccessCallback(data);
    }, function failure(data){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      self.view.flxShadow.isVisible=false;
      self.view.flxMonthlyStatements.isVisible=false;
      self.view.flxNoStatements.isVisible=true;
      kony.print("FailureCallback"+data);
    });
    if(isCombinedUser){
      var accountID = this.currentAccountId;
    }
    else{
      var accountID = this.view.lblAccount.text;
    }
  },

  setMonthsDataNewSuccessCallback: function(response){
    var self=this;
    self.view.flxShadow.isVisible=true;
    self.view.flxMonthlyStatements.isVisible=true;
    var monthsOrder = ["December","November","October","September","August","July","June","May","April","March","February","January"];
    var statementsWidgetDataMap = {
      "btnMonth": "btnMonth",
    };
    for(var i = 0; i < monthsOrder.length; i++) {
      var data = [];
      var individualMonthStatements;
      var individualMonthStatementsCount;
      monthName=monthsOrder[i];
      if(response[monthName] && response[monthName][0]){
        individualMonthStatements = response[monthName][0];
        individualMonthStatementsCount=Object.keys(individualMonthStatements).length;
      }else{
        individualMonthStatementsCount = 0;
      }
      switch (i) {
        case 0:
          self.view.segMonthlyStatements1.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements1.setVisibility(true);
            self.view.flxMonthStatements1.lblMonthStatement1.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements1.setData(data);
          } else {
            self.view.flxMonthStatements1.setVisibility(false);
            self.view.flxShadow1.setVisibility(false);
          }
          break;
        case 1:
          self.view.segMonthlyStatements2.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements2.setVisibility(true);
            self.view.flxMonthStatements2.lblMonthStatement2.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements2.setData(data);
          } else {
            self.view.flxMonthStatements2.setVisibility(false);
            self.view.flxShadow2.setVisibility(false);
          }
          break;
        case 2:
          self.view.segMonthlyStatements3.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements3.setVisibility(true);
            self.view.flxMonthStatements3.lblMonthStatement3.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements3.setData(data);
          } else {
            self.view.flxMonthStatements3.setVisibility(false);
            self.view.flxShadow3.setVisibility(false);
          }
          break;
        case 3:
          self.view.segMonthlyStatements4.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements4.setVisibility(true);
            self.view.flxMonthStatements4.lblMonthStatement4.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements4.setData(data);
          } else {
            self.view.flxMonthStatements4.setVisibility(false);
            self.view.flxShadow4.setVisibility(false);
          }
          break;
        case 4:
          self.view.segMonthlyStatements5.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements5.setVisibility(true);
            self.view.flxMonthStatements5.lblMonthStatement5.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements5.setData(data);
          } else {
            self.view.flxMonthStatements5.setVisibility(false);
            self.view.flxShadow5.setVisibility(false);
          }
          break;
        case 5:
          self.view.segMonthlyStatements6.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements6.setVisibility(true);
            self.view.flxMonthStatements6.lblMonthStatement6.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements6.setData(data);
          } else {
            self.view.flxMonthStatements6.setVisibility(false);
            self.view.flxShadow6.setVisibility(false);
          }
          break;
        case 6:
          self.view.segMonthlyStatements7.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements7.setVisibility(true);
            self.view.flxMonthStatements7.lblMonthStatement7.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements7.setData(data);
          } else {
            self.view.flxMonthStatements7.setVisibility(false);
            self.view.flxShadow7.setVisibility(false);
          }
          break;
        case 7:
          self.view.segMonthlyStatements8.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements8.setVisibility(true);
            self.view.flxMonthStatements8.lblMonthStatement8.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements8.setData(data);
          } else {
            self.view.flxMonthStatements8.setVisibility(false);
            self.view.flxShadow8.setVisibility(false);
          }
          break;
        case 8:
          self.view.segMonthlyStatements9.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements9.setVisibility(true);
            self.view.flxMonthStatements9.lblMonthStatement9.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements9.setData(data);
          } else {
            self.view.flxMonthStatements9.setVisibility(false);
            self.view.flxShadow9.setVisibility(false);
          }
          break;
        case 9:
          self.view.segMonthlyStatements10.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements10.setVisibility(true);
            self.view.flxMonthStatements10.lblMonthStatement10.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements10.setData(data);
          } else {
            self.view.flxMonthStatements10.setVisibility(false);
            self.view.flxShadow10.setVisibility(false);
          }
          break;
        case 10:
          self.view.segMonthlyStatements11.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount>0) {
            self.view.flxMonthStatements11.setVisibility(true);
            self.view.flxMonthStatements11.lblMonthStatement11.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements11.setData(data);
          } else {
            self.view.flxMonthStatements11.setVisibility(false);
            self.view.flxShadow11.setVisibility(false);
          }
          break;
        case 11:
          self.view.segMonthlyStatements12.widgetDataMap = statementsWidgetDataMap;
          if (individualMonthStatementsCount > 0) {
            self.view.flxMonthStatements12.setVisibility(true);
            self.view.flxMonthStatements12.lblMonthStatement12.text=monthName;
            data=this.getMonthlyStatementData(individualMonthStatements);
            self.view.segMonthlyStatements12.setData(data);
          } else {
            self.view.flxMonthStatements12.setVisibility(false);
            self.view.flxShadow12.setVisibility(false);
          }
          break;
      }
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    self.view.flxSegStatements.forceLayout();
   // this.AdjustScreen();
  },

  getMonthlyStatementData:function(individualMonthStatements){
    var statementId;
    var statementDetails;
    var fileNameToDisplay;
    var data=[];
    for (var key in individualMonthStatements) {
      statementDetails=individualMonthStatements[key].split('/');
      fileNameToDisplay=statementDetails[0];
      statementId=statementDetails[1];
      var rowData = {
        "btnMonth": {
          "text": fileNameToDisplay,
          "accessibilityconfig": {
            "a11yLabel": fileNameToDisplay
          },
          "onClick":this.dowloandEFSFile.bind(this,statementId,fileNameToDisplay)
        }
      }
      data.push(rowData);
    }
    return data;
  },

  dowloandEFSFile : function(documentid, fileNameToDisplay){
    var data={};
    var id;
    var fileName;
    var scope =this;
    if(documentid !== null && documentid !== undefined,fileNameToDisplay !== null && fileNameToDisplay !== undefined){
      id=documentid;
      fileName=fileNameToDisplay.replace(/\s/g, '%20');
    }
     var requestParam ={"id":id,"revision":"1"};
    var accMod=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accMod.presentationController.downloadEstatements(requestParam , function success(response){
		var url = scope.formURL(response.fileId, fileName);
		kony.application.openURL(url);             
    },
    function failure(error){
      kony.print("FailureCallback"+error);
    }
    );    
  },

  formURL : function(documentid, fileNameToDisplay){
    var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
    var serviceURL = mfURL + "/objects/EStatements?";
    var paramURL = "mediaType=" + "pdf";
    paramURL= paramURL+"&fileName=" + fileNameToDisplay;
    paramURL= paramURL+"&fileId=" + documentid;   
    return serviceURL + paramURL;
  },

  initStatements: function() {
    var navMan = applicationManager.getNavigationManager();
    var statements = navMan.getCustomInfo("frmAccStatements");
    var selectedAccount=navMan.getCustomInfo("selectedAccount");
    if(selectedAccount && selectedAccount!==""){
      try{
        this.view.lblAccount.text = selectedAccount["accountType"] +"..."+(selectedAccount["accountID"]).slice(-4);
      }catch(e){
        this.view.lblAccount.text = selectedAccount;
      }
    }else{
      this.view.lblAccount.text = statements.accountdata["accountType"] +"..."+(statements.accountdata["accountID"]).slice(-4);
    }
    var selectedYear=navMan.getCustomInfo("selectedYear");
    var date = new Date();
    var year = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
    if(selectedYear && selectedYear !== ""){
      if(selectedYear!==this.view.lblYear.text){
        this.view.lblYear.text = selectedYear+" "+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.statements");
        selectedYear="";
      }
    }else{
      this.view.lblYear.text = year +" "+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.statements");
    }
    var formatUtil = applicationManager.getFormatUtilManager();
    var months = formatUtil.getYearAppendedPreviousMonths(year);
    if(months.length>0){
      this.view.flxSegStatements.isVisible=true;
      this.view.flxNoStatements.isVisible=false;
      this.setMonthsData();
    }
    else {
//       this.view.flxSegStatements.isVisible=false;
      this.view.flxMonthlyStatements.isVisible=false;
      this.view.flxNoStatements.isVisible=true;
    }
  },

  selectAccount: function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmSelectAccount", "hey");
    navMan.navigateTo("frmSelectAccount");
  },
 navigateToCombinedStatements: function() {
    var accMod=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accMod.presentationController.navigateToCombinedStatements();
  },

  selectYear: function(){
    var navMan=applicationManager.getNavigationManager();
    var todayDate = new Date();
    var yyyy = todayDate.getFullYear();
    navMan.setCustomInfo("frmSelectYear",yyyy);
    navMan.navigateTo("frmSelectYear");
  },

  //   flxStatementYr1OnClick:function()
  //   {
  //     this.flxArrowOnclick();
  //     this.view.lblYear1.skin="sknLbl0095e422px";
  //     this.view.lblYear2.skin="sknLbla0a0a0SSPReg22px";
  //     this.setSegStatementsData();
  //   },
  //   flxStatementYr2OnClick:function()
  //   {
  //     this.flxArrowOnclick();
  //     this.view.flxSegStatements.isVisible=true;
  //     this.view.flxNoStatements.isVisible=false;
  //     this.view.lblShowValue.text=this.date.getFullYear()-1+"  "+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.statements");
  //     this.view.lblYear1.skin="sknLbla0a0a0SSPReg22px";
  //     this.view.lblYear2.skin="sknLbl0095e422px";
  //     var statementdata=[];
  //     var formatUtil=applicationManager.getFormatUtilManager();
  //     var months=  formatUtil.getYearAppendedPreviousMonths(this.date.getFullYear()-1);
  //     for(var i=months.length-1;i>=0;i--)
  //     {
  //       var statedata={   "lblStatementMonth":months[i]};
  //       statementdata.push(statedata);
  //     }
  //     this.view.segStatements.setData(statementdata);
  //   },

  //   flxArrowOnclick:function(){
  //     if(this.view.imgArrow.src==="arrowdown.png")
  //     {
  //       this.view.flxSelectYear.setVisibility(true);
  //       this.view.imgArrow.src="arrowup.png";
  //       this.animateFlxSelectYear();
  //     }
  //     else
  //     {
  //       this.view.imgArrow.src="arrowdown.png";
  //       this.animateFlxSelectYearBack();
  //     }
  //   },
  //   animateFlxSelectYear:function()
  //   {
  //     var flxheight,segHeight;
  //     if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
  //       flxheight = "115dp";
  //       segHeight = "200dp";
  //     }
  //     else{
  //       flxheight = "65dp";
  //       segHeight = "150dp";
  //     }
  //     this.view.flxSelectYear.animate(
  //       kony.ui.createAnimation({
  //         "100": {
  //           "stepConfig": {
  //             "timingFunction": kony.anim.EASE
  //           },
  //           "rectified": true,
  //           "top": flxheight,
  //           "opacity":1
  //         }
  //       }), {
  //         "delay": 0,
  //         "iterationCount": 1,
  //         "fillMode": kony.anim.FILL_MODE_FORWARDS,
  //         "duration": 0.35
  //       }, {
  //         "animationEnd": function() {
  //         }
  //       });
  //     this.view.flxSegStatements.animate(
  //       kony.ui.createAnimation({
  //         "100": {
  //           "stepConfig": {
  //             "timingFunction": kony.anim.EASE
  //           },
  //           "rectified": true,
  //           "top": segHeight,
  //           "bottom":"60dp"
  //         }
  //       }), {
  //         "delay": 0,
  //         "iterationCount": 1,
  //         "fillMode": kony.anim.FILL_MODE_FORWARDS,
  //         "duration": 0.35
  //       }, {
  //         "animationEnd": function() {
  //         }
  //       });
  //   },
    animateFlxSelectYearBack:function()
    {
  //     var flxheight,segHeight;
  //     if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
  //       flxheight = "55dp";
  //       segHeight = "120dp";
  //     }
  //     else{
  //       flxheight = "16dp";
  //       segHeight = "70dp";
  //     }
  //     var scopeObj=this;
  //     this.view.flxSelectYear.animate(
  //       kony.ui.createAnimation({
  //         "100": {
  //           "stepConfig": {
  //             "timingFunction": kony.anim.EASE
  //           },
  //           "rectified": true,
  //           "top": flxheight,
  //           "opacity":0
  //         }
  //       }), {
  //         "delay": 0,
  //         "iterationCount": 1,
  //         "fillMode": kony.anim.FILL_MODE_FORWARDS,
  //         "duration": 0.35
  //       }, {
  //         "animationEnd": function() {
  //           scopeObj.view.flxSelectYear.setVisibility(false);
  //           scopeObj.view.imgArrow.src="arrowdown.png";
  //           scopeObj.view.flxArrow.forceLayout();
  //         }
  //       });
  //     this.view.flxSegStatements.animate(
  //       kony.ui.createAnimation({
  //         "100": {
  //           "stepConfig": {
  //             "timingFunction": kony.anim.EASE
  //           },
  //           "rectified": true,
  //           "top": segHeight,
  //           "bottom":"60dp"
  //         }
  //       }), {
  //         "delay": 0,
  //         "iterationCount": 1,
  //         "fillMode": kony.anim.FILL_MODE_FORWARDS,
  //         "duration": 0.35
  //       }, {
  //         "animationEnd": function() {
  //         }
  //       });
     },

  flxBackOnClick:function(){
     if(kony.application.getPreviousForm().id=="frmAccountDetails")
      {
        var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
      }
      else
      {
    var custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
    if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
     var ntf = new kony.mvc.Navigation({
            "appName": "HomepageMA",
            "friendlyName": "AccountsUIModule/frmUnifiedCustomerDashboard",
          });
          ntf.navigate();
    }else{
    var ntf = new kony.mvc.Navigation({
            "appName": "HomepageMA",
            "friendlyName": "AccountsUIModule/frmUnifiedDashboard",
          });
          ntf.navigate();
    }
  }
  },
  //   onClicksegStatements:function()
  //   {
  //     var scopeObj=this;
  //     applicationManager.getPresentationUtility().showLoadingScreen();
  //     var navMan=applicationManager.getNavigationManager();
  //     var statements=navMan.getCustomInfo("frmAccStatements");
  //     var accountID=statements.accountdata["accountID"];
  //     var index=scopeObj.view.segStatements.selectedRowIndex[1];
  //     var month=scopeObj.view.segStatements.data[index]["lblStatementMonth"].split(' ')[0];
  //     var year=scopeObj.view.segStatements.data[index]["lblStatementMonth"].split(' ')[1];
  //     var paramns={
  //       "accountID": accountID,
  //       "format": "",
  //       "year": year,
  //       "StatementMonth": month
  //     };
  //     var accMod=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
  //     accMod.presentationController.fetchAccountStatamentsLink(paramns);
  //   }
});