define(["CommonUtilities"], function(CommonUtilities){ 
return{
  //Type your controller code here 
  timerCounter:0,
  totalORflex:0,
  segDataMaster : {
  },
  
  /*
     *init is called when the form is loadedc , initialisation happen here
     *
     */
  init : function(){
    try{
      kony.print("Entered init");
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();

      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);

      this.view.preShow = this.preShowForm;
      this.view.postShow = this.postShowForm;

    }catch(e){
      kony.print("Exception in init::"+e);}
  },

  /*
     *OnNavigate is called when the form is navigated after init , 
     *
     */
  onNavigate: function(params) {
    try {
      kony.print("onNavigate inside" + JSON.stringify(params));

    } catch (e) {
      kony.print("Exception in onNavigate" + e);
    }
  },

  //preShowForm is called when the form is pre loaded 
  preShowForm : function(){
    try{
      kony.print("Entered preShowForm");
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      this.resetForm();
      
      //onclick functions
      this.view.confirmationAlertPopup.onClickflxNo = this.closeConfirmPopup;
      this.view.confirmationAlertPopup.onClickflxYes = this.confirmReNotify;
      this.view.btnDone.onClick = this.renotifyDoneSuccess;
      this.view.btnTryagain.onClick = this.renotifyTryAgain;
      this.view.btncancelnotify.onClick = this.renotifyCancel;
      this.view.flxConfirmationPopUp.onClick = this.emptyFunc;
      this.view.flxSucesspopup.onClick = this.emptyFunc;
      this.view.flxTryagainpopup.onClick = this.emptyFunc;
      this.view.customHeader.flxBack.onClick=this.backFunction;
      
      this.getApprovalandRequestDetail();
     
    }catch(e){
      kony.print("Exception in preShowForm::"+e);}
  },
  
  getApprovalandRequestDetail:function(){
    try{
      var navManager = applicationManager.getNavigationManager();
      //applicationManager.getPresentationUtility().showLoadingScreen();
      var pendingRequestDetails = navManager.getCustomInfo("PendingRequestDetails");
      var selectedLimitTypeID = navManager.getCustomInfo("PendingApproverRequestType");
  
      
      if(!kony.sdk.isNullOrUndefined(selectedLimitTypeID) && !kony.sdk.isNullOrUndefined(pendingRequestDetails.RequestHistory) && pendingRequestDetails.pendingGroupRules.length >0){
         this.createDynamicSegGroup(selectedLimitTypeID, pendingRequestDetails);
      }else{
        this.toastMessage("No data found, Please try again!","failure");
      }

    }catch(er){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print(er);
    }
  },
  
  backFunction:function(){
    try{
      var navManager = applicationManager.getNavigationManager();    
        navManager.goBack();      
    }catch(er){
      kony.print(er);
    }
  },
  //postShowForm is called when the form is post loaded
  postShowForm : function(){
    try{
      kony.print("Entered postShowForm");
       
    }catch(e){
      kony.print("Exception in postShowForm::"+e);}
  },

  resetForm : function(){
    try{
      kony.print("Entered resetForm");
      this.segDataMaster = {};
      this.view.flxPopup.setVisibility(false);
      this.view.flxConfirmationPopUp.isVisible = false;
      this.view.flxSucesspopup.isVisible = false;
      this.view.flxTryagainpopup.isVisible = false;
      this.view.flxNoData.isVisible = false;
      this.view.flxGroupContainer.isVisible = true;
      
      var navManager = applicationManager.getNavigationManager();    
      var formFlow = navManager.getCustomInfo("formFlow");
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
        this.view.flxBody.top = "0dp";
        this.view.flxBody.bottom = "60dp";
        if(formFlow==="TransactionDetailsApprovals"){
          this.view.title="Pending Approvers";
        }else{
          this.view.title="Pending Requesters";
        }
      }else{
        this.view.flxHeader.isVisible = true;
        this.view.flxBody.top = "56dp";
        this.view.flxBody.bottom = "0dp";

        if(formFlow==="TransactionDetailsApprovals"){
          this.view.customHeader.lblLocateUs.text="Pending Approvers";
        }else{
          this.view.customHeader.lblLocateUs.text="Pending Requesters";
        }
      }
    }catch(e){
      kony.print("Exception in resetForm::"+e);}
  },
  
  headerData : function(arrowImg,segData,sectionIndex){
    var self =this;
    var res = {
              "template": "flxPendingApprovalRequestHeader",
              "lblHeader": {"text": segData[sectionIndex][0].lblHeader.text},
              "lblPendingCount": {"text": segData[sectionIndex][0].lblPendingCount.text},
              "imgUpArrow" : {src : "arrowdown.png" },
              "flxSep" : {isVisible : false},
              "flxContent" : { skin : "sknflxf6f6f6Bcg" ,
                              onClick : function(eventObject,context){
                                var secIndex = context["sectionIndex"];
                                var rowIndex = context["rowIndex"];
                                self.headerSelectionDetected(context.widgetInfo , {section:secIndex,row:rowIndex});
                              }}
            };
    return res;
  },

  /*
    *headerSelectionDetected - Header is clicked and called from template controller 
   *
    */
  headerSelectionDetected : function (widgetInfo,data){
    try{
      kony.print("Entered headerSelectionDetected" );
      var sectionIndex = data.section;
      var segData = this.view[widgetInfo.id].data;
      var isExpand = segData[sectionIndex][1].length > 0 ? true : false;
      var index = (widgetInfo.id).slice(-1);
      var self = this;
      if(isExpand) {  // Make it collapse
        kony.print("collapseing");
        var sectionParams = this.headerData("arrowdown.png", segData, sectionIndex);
        this.collapseSection(widgetInfo,sectionIndex,sectionParams);
        this.view["flxSeperator0"+index].isVisible = true;
      }else{
        kony.print("Expanding");
        var sectionParam = this.headerData("arrowup.png", segData, sectionIndex);
        this.expandSection(widgetInfo,sectionIndex,sectionParam);
         this.view["flxSeperator0"+index].isVisible = false;
      }

    }catch(e){
      kony.print("Exception in headerSelectionDetected expandCollapse"+e);}
  },
  
  
  /*
    *collapseAllSection - is for collapsing the enitre segment rows and changes made in header section 
   *
    */
  collapseAllSection : function(widgetInfo){
    try{
      kony.print("Enterted collapseSection");
      var segData = this.view[widgetInfo].data;
     for(var i=0;i<segData.length;i++){
       segData[i].pop(); 
        segData[i].push([]); 
     }
      this.view[widgetInfo].setData(segData);
    }catch(e){
      kony.print("Exception in collapseAllSection "+e);}
  },

  /*
    *collapseSection - is for collapsing the segment rows and changes made in header section 
   *
    */
  collapseSection : function(widgetInfo,sectionIndex,sectionParams){
    try{
      kony.print("Enterted collapseSection");
      var segData = this.view[widgetInfo.id].data;
      for(var param in sectionParams){
        segData[sectionIndex][0][param] = sectionParams[param];
      }
      segData[sectionIndex].pop();
      segData[sectionIndex].push([]);
      this.view[widgetInfo.id].setData(segData);
    }catch(e){
      kony.print("Exception in collapseSection expandCollapse"+e);}
  },

  /*
    *expandSection - is for expanding the segment rows and changes made in header section 
   *
    */
  expandSection : function(widgetInfo,sectionIndex,sectionParams){
    try{
      kony.print("Entered expandSection");

      var segData = this.view[widgetInfo.id].data;
      for(var param in sectionParams){
        segData[sectionIndex][0][param] = sectionParams[param];
      }

      segData[sectionIndex].pop();
      segData[sectionIndex].push(this.segDataMaster[widgetInfo.id][sectionIndex][1]);  //Pusing the original rows

      this.view[widgetInfo.id].setData(segData);
    }catch(e){
      kony.print("Exception in collapseSection expandCollapse"+e);}
  },
  errorCallback:function(response)
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
  setSegData : function(segWidget,data){
    try{
      kony.print("Entered setSegData"+data);
      var includeAddFlex = "";
      var totalAndFlex = 0;
      var segData = data;
      var finalArr = [];
      if(segData.length>0){
        totalAndFlex = segData.length-1;
        for(var i in segData){
          finalArr.push(segData[i]);
          if(totalAndFlex==0){
            
          }else{
              totalAndFlex--;
              var combineHeadRow = [];
              combineHeadRow.push({
                "template": "flxMidAlignTitle",
                "lblTitleText": {
                  "text": "AND"
                },
              });
              combineHeadRow.push([]);
              finalArr.push(combineHeadRow);
          }
        }
      }
      
      this.segDataMaster[segWidget] = CommonUtilities.cloneJSON(finalArr);
      if(finalArr.length >0){
        this.view.flxNoData.isVisible = false;
        this.view.flxGroupContainer.isVisible = true;
        this.view[segWidget].setData(finalArr);
        this.collapseAllSection(segWidget);
      }else{
        this.view.flxNoData.isVisible = true;
        this.view.flxGroupContainer.isVisible = false;
      }
      
      
    }catch(e){
      kony.print("Exception in setSegData "+e);}
  
  },
  
  createDynamicSegGroup : function(selectedTypeID, historyData){
    try{
      kony.print("Entered in createDynamicSegGroup ");
      var groupRuleMaster = historyData.pendingGroupRules;
      var requestHistoryMaster = historyData.RequestHistory;
      var selectedLimitTypeId =  selectedTypeID; //"DAILY_LIMIT";
      var combineHeadRow = [];
      var finalArr = [];
      this.totalORflex = 0;
      var self = this;

      this.view.flxGroupContainer.removeAll();

      var new_arr = groupRuleMaster.map((obj,index) => {
        const limitTypeId = obj.limitTypeId;
        const groupRuleValue = obj.groupRuleValue;
        const groupList = obj.groupList;

        if(limitTypeId === selectedLimitTypeId ){
          var parseGroupRuleValue = JSON.parse("[" + groupRuleValue + "]");
                                
          Array.isArray(parseGroupRuleValue) && parseGroupRuleValue[0].forEach((item,i) => {
           finalArr = [];
			self.totalORflex++;
            self.layoutContainerPendingApprovers(i,parseGroupRuleValue[0].length);
            
            //Loop grouprule individual [1,2]
            item.map((value,num,itemArray) => {
              combineHeadRow = [];
              if(value !== 0){
                var groupListreplace= groupList.replace(/[\[\]]/g,'');
                var parseGroupList = groupListreplace.split(',');

                var currGroupId = parseGroupList[num].trim();
                var obje = requestHistoryMaster.find(o => {
                  if(o.Status === "Approval Pending"){
                    if(o.groupId === currGroupId.toString()){
                      return true;
                    }
                  }
                });
                
                var pendingApprovers = JSON.parse(obje.pendingApprovers);
                if(pendingApprovers.length >0){
                 
                combineHeadRow.push({
                  "template": "flxPendingApprovalRequestHeader",
                  "lblHeader": {"text": obje.groupName},
                  "lblPendingCount": {"text": "(Any "+value+" Pending)"},
                  "imgUpArrow" : {src : "arrowdown.png" },
                  "flxSep" : {isVisible : false},
                  "flxContent":{
                    onClick : function(eventObject,context){
                      var secIndex = context["sectionIndex"];
                      var rowIndex = context["rowIndex"];
                      self.headerSelectionDetected(context.widgetInfo , {section:secIndex,row:rowIndex});
                    }
                  },

                });
                  
                var ob = [];
                 
                for(var u=0;u<pendingApprovers.length;u++){
                   var seperatorwidth = (u===pendingApprovers.length-1) ? "100%" : "90%";
                   ob.push({"lblUsername" : {text : pendingApprovers[u].fullName},
                             "lblPosition" : {text: pendingApprovers[u].role},
                             "lblPending" : {text : "Pending"},
                             "imgUser" : {src : pendingApprovers[u].userImage || "defaultuserimg.png" },
                             "imgRenotify" : {src : "renotifypending.png"},
                             "lblRenotify" : {src : "Re-Notify" },
                             "flxDetail" : {left : "0%"},
                             "flxNotify" :{onClick : self.onClickReNotify},
                            "flxSeparator" : { 
                              width: seperatorwidth
                            }
                            });
                }
                combineHeadRow.push(ob);
                  finalArr.push(combineHeadRow);
                  
                }
              }
               
            });
          
            self.setSegData("segGroupApprover"+i,finalArr);
          });
        } 

      });
     // self.view.flxGrpRule0.forceLayout();
     // self.view.forceLayout();
    }catch(e){
      kony.print("Exception in createDynamicSegGroup "+e);}
  },
  
  layoutContainerPendingApprovers: function(index, ORflex) {
    try {
      kony.print("Entered in layoutContainerPendingApprovers ");
      var self = this;
      var segTopValue = (index===0) ? "0dp" : "5dp";
      if(index !==0){
        var flxSeperator = new kony.ui.FlexContainer({
          "id": "flxSeperator" + index,
          "top": "10dp",
          "left": "0dp",
          "bottom": "1dp",
          "width": "100%",
          "height": "1dp",
          "zIndex": 3,
          "skin": "sknflxseparatorshadow", //"sknFlxe3e3e3Shadow",//"sknflxe7e7e7"
          "clipbounds": true,
        }, {
          "padding": [0, 0, 0, 0]
        }, {});
        flxSeperator.setDefaultUnit(kony.flex.DP);
        flxSeperator.add();
        self.view.flxGroupContainer.add(flxSeperator);
      }
      var segBasicConf = {
        "id": "segGroupApprover" + index,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "isVisible": true,
        "rowTemplate": "flxPendingApprovalRequestuser",
        "sectionheadertemplate": "flxPendingApprovalRequestHeader",
        "top": segTopValue,
        "left": "0dp",
        "width": "100%",
        "zIndex": 10,
        "rowFocusSkin": "seg2Focus",
        "rowSkin": "seg2Normal",
        "widgetDataMap": {
          "flxContent": "flxContent",
          "flxContentrow": "flxContentrow",
          "flxDetail": "flxDetail",
          "flxImgUp": "flxImgUp",
          "flxMain": "flxMain",
          "flxNotify": "flxNotify",
          "flxPending": "flxPending",
          "flxPendingApprovalRequestHeader": "flxPendingApprovalRequestHeader",
          "flxPendingApprovalRequestuser": "flxPendingApprovalRequestuser",
          "flxSeparator": "flxSeparator",
          "flxSep":"flxSep",
          "flxShadowBottom": "flxShadowBottom",
          "flxTypeOneShadowtop": "flxTypeOneShadowtop",
          "flximg": "flximg",
          "imgRenotify": "imgRenotify",
          "imgUpArrow": "imgUpArrow",
          "imgUser": "imgUser",
          "lblHeader": "lblHeader",
          "lblPending": "lblPending",
          "lblPendingCount": "lblPendingCount",
          "lblPosition": "lblPosition",
          "lblRenotify": "lblRenotify",
          "lblUsername": "lblUsername"
        },
      };
      var layoutConf = {
        padding: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        containerWeight: 100
      };
      var pspConf = {
        border: constants.SEGUI_BORDER_TOP_ONLY,
        indicator: constants.SEGUI_NONE,
        defaultSelection: true
      };
      var segment = new kony.ui.SegmentedUI2(segBasicConf, layoutConf, pspConf);
      //self.view["flxGrpRule" + index].add(segment);
      self.view.flxGroupContainer.add(segment);
      var flxSeperator2 = new kony.ui.FlexContainer({
        "id": "flxSeperator0" + index,
        "top": "10dp",
        "left": "0dp",
        "bottom": "1dp",
        "width": "100%",
        "height": "1dp",
        "zIndex": 3,
        "skin": "sknflxseparatorshadow", //"sknFlxe3e3e3Shadow",//"sknflxe7e7e7"
      }, {
        "padding": [0, 0, 0, 0]
      }, {});
      flxSeperator2.setDefaultUnit(kony.flex.DP);
      flxSeperator2.add();
      self.view.flxGroupContainer.add(flxSeperator2);
      if (self.totalORflex < ORflex) {
        //Adding OR label
        var conditionlblBasic = {
          "id": "lblCondtion" + index,
          "skin": "sknLbl4a4a4a22px",
          "text": "OR",
          "isVisible": true,
          "height": "20dp",
          "top": "10dp",
          "width": "100%",
          "left": "48%"
        };
        var conditionlblLayout = {
          containerWeight: 100,
          padding: [0, 0, 0, 0],
          margin: [0, 0, 0, 0],
        };
        var conditionlblLayout2 = {};
        var conditionlbl = new kony.ui.Label(conditionlblBasic, conditionlblLayout, conditionlblLayout2);
        self.view.flxGroupContainer.add(conditionlbl);
      }
    } catch (e) {
      kony.print("Exception in layoutContainerPendingApprovers " + e);
    }
  },
       
   onClickReNotify:function(){
      try {    
        var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
        var self= this;
        if(isiPhone) {
          var msgText = kony.i18n.getLocalizedString("kony.mb.renotifyMsg");
          var basicConfig = {message: msgText,
                             alertTitle:"",
                             alertIcon:null,
                             alertType: constants.ALERT_TYPE_CONFIRMATION,
                             yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Yes"),
                             noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                             alertHandler: self.confirmNotifyIphone
                            };
          var pspConfig = {};
          applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
        }else{
          this.view.flxConfirmationPopUp.isVisible = true; 
          this.view.confirmationAlertPopup.lblMessage.text = kony.i18n.getLocalizedString("kony.mb.renotifyMsg");
        }
      }catch(error){
        kony.print(" onClickReNotify error-->"+error);
      }       
    },
  
   confirmReNotify:function()
    {
      try {    
        var navManager = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        var formFlow = navManager.getCustomInfo("formFlow");
        var ApprovalModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqModule');    
        var detailsData = navManager.getCustomInfo("generalTransactionDetails");         
        var inputparams = {
          "approverUserId":detailsData[0].data.customerName,
          "requestId":detailsData[0].data.requestId,
          "featureActionId":detailsData[0].data.featureActionId,
          "TransactionId":detailsData[0].data.transactionId
        };
        var navObjs = {
          requestData: inputparams,
        };
        ApprovalModule.presentationController.renotifyPendingApprovalrequest(navObjs);
      }catch(error){
        kony.print(" confirmReNotify error-->"+error);
      }       
    },

  closeConfirmPopup:function()
  {
    try {    
      this.view.flxConfirmationPopUp.isVisible = false; 
    }catch(error){
      kony.print(" closeConfirmPopup error-->"+error);
    }       
  },

  renotifyPendingApprovalrequestSuccessMB:function(response)
  {
    try {
      this.view.flxConfirmationPopUp.isVisible = false;
      if(response.Status === "Success" || response.status === "Success"){         
        this.view.lblSuccessMessage.text =kony.i18n.getLocalizedString("kony.mb.pendingRenotifysuccessmsg"); 
        this.view.btnDone.text = "Done";
        this.view.flxSucesspopup.isVisible = true;
        this.view.flxTryagainpopup.isVisible = false;
      }else{
        this.view.lblerrormsg.text =kony.i18n.getLocalizedString("kony.mb.pendingRenotifyerrormsg");          
        this.view.btnTryagain.text = "try again";
        this.view.btncancelnotify.text = "Cancel";         
        this.view.flxTryagainpopup.isVisible = true;
        this.view.flxSucesspopup.isVisible = false;
      }

      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(error){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print(" onClickReNotify error-->"+error);
    }       
  },

  renotifyDoneSuccess:function()
  {
    this.view.flxSucesspopup.isVisible = false;    
    this.getApprovalandRequestDetail();         
  },

  renotifyTryAgain:function()
  {
    this.confirmReNotify();          
  },


  renotifyCancel:function()
  {
    this.view.flxConfirmationPopUp.isVisible = false;
    this.view.flxSucesspopup.isVisible = false;
    this.view.flxTryagainpopup.isVisible = false;
  },
  
  
  toastMessage:function(message,successorfailure){
    try{
    var scopeObj=this;
      var statusMessage = message;
      this.view.flxPopup.setVisibility(true);
     
      if(!kony.sdk.isNullOrUndefined(this._timerCounter)){
            this._timerCounter = parseInt(this._timerCounter)+1;
          }
          else{
            this._timerCounter = 1;
          }
          var timerId="timerPopupPendingApprovers"+this._timerCounter;
          kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
            this.view.customPopup.lblPopup.text = statusMessage;  
          }, 2, false);  
    }catch(e){
      kony.print("Exception in toast"+e);
    }
  },
  
   emptyFunc:function(){
     kony.print("Entered emptyFunc");
   },
  
   confirmNotifyIphone : function(response){
      if(response === true)
      {
        this.confirmReNotify();
      }
    },
  
}
});
