define(['CampaignUtility'], function(CampaignUtility){
  return{
  preShow: function() {
    this.feedbackRating = 0;
    //this.comments = "";
    if(kony.os.deviceInfo().name !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
	  this.view.btnMessages.height = "20dp";
	  this.view.flxMainContainer.top = "0%";   
    }
    this.view.flexStarRating.top = "30%";
    this.view.flxTopContainer.isVisible = false;
    this.view.btnSubmit.isVisible = false;
    this.view.imgStar1.src = "inactivestar.png";
    this.view.imgStar2.src = "inactivestar.png";
    this.view.imgStar3.src = "inactivestar.png";
    this.view.imgStar4.src = "inactivestar.png";
    this.view.imgStar5.src = "inactivestar.png";
    this.view.flxButtonOption1.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption1.skin = "sknFeedbackButtonDisabled";
    this.view.flxButtonOption2.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption2.skin = "sknFeedbackButtonDisabled";
    this.view.flxButtonOption3.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption3.skin = "sknFeedbackButtonDisabled";
    this.view.flxButtonOption4.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption4.skin = "sknFeedbackButtonDisabled";
    this.view.flxButtonOption5.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption5.skin = "sknFeedbackButtonDisabled";
    this.view.textarea.text = "";
    this.view.lblCharCount.text = "0/1000";
    var userObj = applicationManager.getUserPreferencesManager();
      var login = userObj.isUserLoggedin();
    if(login === false) {
        this.view.flxIssues.isVisible = false;
      }else{
        this.view.flxIssues.isVisible = true;
      }
    this.initActions();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let scopeObj = this;
    function campaignPopUpSuccess(response){
      CampaignUtility.showCampaign(response, scopeObj.view);
    }
    function campaignPopUpError(response){
      kony.print(response, "Campaign Not Found!");
    }
    CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
    var configurationManager = applicationManager.getConfigurationManager();
    if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE) === true)
         this.view.flxIssues.isVisible =true;
    else
        this.view.flxIssues.isVisible =false;
    
  },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
   },
    initActions: function(){
      var scope = this;
      this.view.btnSubmit.onClick = this.SubmituserFeedback;
      this.view.customHeader.btnRight.onClick = this.customHeaderBtnRightOnClick;
      this.view.btnMessages.onClick = this.facingIssueOnClick;
      this.view.flxStar1.onClick = this.showRatingAction.bind(this,1);
      this.view.flxStar2.onClick = this.showRatingAction.bind(this,2);
      this.view.flxStar3.onClick = this.showRatingAction.bind(this,3);
      this.view.flxStar4.onClick = this.showRatingAction.bind(this,4);
      this.view.flxStar5.onClick = this.showRatingAction.bind(this,5);
      this.view.btnOption1.onClick= this.feedBack1.bind(this);
      this.view.btnOption2.onClick = this.feedBack2.bind(this);
      this.view.btnOption3.onClick = this.feedBack3.bind(this);
      this.view.btnOption4.onClick = this.feedBack4.bind(this);
      this.view.btnOption5.onClick = this.feedBack5.bind(this);
      this.view.textarea.onTextChange = this.ontextChange.bind(this);
       var deviceUtilManager = applicationManager.getDeviceUtilManager();
       var isIphone = deviceUtilManager.isIPhone();
      if (isIphone) {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: this.customHeaderBtnRightOnClick,
                    tintColor: "FFFFFF00",
                    metaData: {
                        title: "Cancel"
                    }
                });
        this.view.setRightBarButtonItems({items:[rightBarButtonItem],animated:true});
      }
    },
  customHeaderBtnRightOnClick: function(){
           KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Cancel Feedback":"Cancel feedback"});
           applicationManager.getPresentationUtility().showLoadingScreen();
           var navManager = applicationManager.getNavigationManager();
           var entryPoint =  navManager.getEntryPoint("Feedback");
           navManager.navigateTo({"appName":"HomepageMA","friendlyName" : "AccountsUIModule/frmUnifiedDashboard"}); // entryPoint,for navigation purpose
           applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
  facingIssueOnClick: function(){
          applicationManager.getPresentationUtility().showLoadingScreen();
          var navManager = applicationManager.getNavigationManager();
          navManager.setEntryPoint("messageCategory","frmInAppFeedbackRating");
         var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"SecureMessageMA","moduleName":"MessagesUIModule"});
         messagesMod.presentationController.getCategories();
        },
  ontextChange: function(){
     var length = this.view.textarea.text.length;
     this.view.lblCharCount.text = length+"/1000";
  },
   showRatingAction: function(val) {
      var feedbackSubmitPermission = applicationManager.getConfigurationManager().checkUserPermission("FEEDBACK_SUBMIT")?true:false;
      switch(val)
        {
        case 1:
            this.view.imgStar1.src = "activestar.png";
            this.view.imgStar2.src = "inactivestar.png";
            this.view.imgStar3.src = "inactivestar.png";
            this.view.imgStar4.src = "inactivestar.png";
            this.view.imgStar5.src = "inactivestar.png";
            this.view.lblImprove.text = kony.i18n.getLocalizedString("kony.mb.feedback.needimprove");
            this.view.flxTopContainer.setVisibility(true);
            this.view.btnOption1.text = kony.i18n.getLocalizedString("kony.mb.login.userExperience");
            this.view.btnOption2.text = kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.features");
            this.view.btnOption3.text = kony.i18n.getLocalizedString("kony.mb.login.lookAndFeel");
            this.view.btnOption4.text = kony.i18n.getLocalizedString("i18n.wealth.performance");
            this.view.btnOption5.text = kony.i18n.getLocalizedString("i18n.StopPayments.checkRequest.Others");
            if(feedbackSubmitPermission){
              this.view.btnSubmit.isVisible = true;
            }else{
              this.view.btnSubmit.isVisible = false;
            }
            this.view.lblRatings.text = kony.i18n.getLocalizedString("kony.mb.feedback.belowfivestarrating");
			this.animateRatings();
            break;
        case 2:
            this.view.imgStar1.src = "activestar.png";
            this.view.imgStar2.src = "activestar.png";
            this.view.imgStar3.src = "inactivestar.png";
            this.view.imgStar4.src = "inactivestar.png";
            this.view.imgStar5.src = "inactivestar.png";
            this.view.lblImprove.text = kony.i18n.getLocalizedString("kony.mb.feedback.needimprove");
            this.view.flxTopContainer.setVisibility(true);
            this.view.btnOption1.text = kony.i18n.getLocalizedString("kony.mb.login.userExperience");
            this.view.btnOption2.text = kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.features");
            this.view.btnOption3.text = kony.i18n.getLocalizedString("kony.mb.login.lookAndFeel");
            this.view.btnOption4.text = kony.i18n.getLocalizedString("i18n.wealth.performance");
            this.view.btnOption5.text = kony.i18n.getLocalizedString("i18n.StopPayments.checkRequest.Others");
            if(feedbackSubmitPermission){
              this.view.btnSubmit.isVisible = true;
            }else{
              this.view.btnSubmit.isVisible = false;
            }
            this.view.lblRatings.text = kony.i18n.getLocalizedString("kony.mb.feedback.belowfivestarrating");
            this.animateRatings();
        break;
        case 3:
            this.view.imgStar1.src = "activestar.png";
            this.view.imgStar2.src = "activestar.png";
            this.view.imgStar3.src = "activestar.png";
            this.view.imgStar4.src = "inactivestar.png";
            this.view.imgStar5.src = "inactivestar.png";
            this.view.lblImprove.text = kony.i18n.getLocalizedString("kony.mb.feedback.needimprove");
            this.view.flxTopContainer.setVisibility(true);
            this.view.btnOption1.text = kony.i18n.getLocalizedString("kony.mb.login.userExperience");
            this.view.btnOption2.text = kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.features");
            this.view.btnOption3.text = kony.i18n.getLocalizedString("kony.mb.login.lookAndFeel");
            this.view.btnOption4.text = kony.i18n.getLocalizedString("i18n.wealth.performance");
            this.view.btnOption5.text = kony.i18n.getLocalizedString("i18n.StopPayments.checkRequest.Others");
            if(feedbackSubmitPermission){
              this.view.btnSubmit.isVisible = true;
            }else{
              this.view.btnSubmit.isVisible = false;
            }
            this.view.lblRatings.text = kony.i18n.getLocalizedString("kony.mb.feedback.belowfivestarrating");
        	this.animateRatings();
        break;
        case 4:
            this.view.imgStar1.src = "activestar.png";
            this.view.imgStar2.src = "activestar.png";
            this.view.imgStar3.src = "activestar.png";
            this.view.imgStar4.src = "activestar.png";
            this.view.imgStar5.src = "inactivestar.png";
            this.view.lblImprove.text = kony.i18n.getLocalizedString("kony.mb.feedback.needimprove");
            this.view.flxTopContainer.setVisibility(true);
            this.view.btnOption1.text = kony.i18n.getLocalizedString("kony.mb.login.userExperience");
            this.view.btnOption2.text = kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.features");
            this.view.btnOption3.text = kony.i18n.getLocalizedString("kony.mb.login.lookAndFeel");
            this.view.btnOption4.text = kony.i18n.getLocalizedString("i18n.wealth.performance");
            this.view.btnOption5.text = kony.i18n.getLocalizedString("i18n.StopPayments.checkRequest.Others");
            if(feedbackSubmitPermission){
              this.view.btnSubmit.isVisible = true;
            }else{
              this.view.btnSubmit.isVisible = false;
            }
            this.view.lblRatings.text = kony.i18n.getLocalizedString("kony.mb.feedback.belowfivestarrating");
       		this.animateRatings();
        break;
        case 5:
            this.view.imgStar1.src = "activestar.png";
            this.view.imgStar2.src = "activestar.png";
            this.view.imgStar3.src = "activestar.png";
            this.view.imgStar4.src = "activestar.png";
            this.view.imgStar5.src = "activestar.png";
            this.view.lblRatings.text = kony.i18n.getLocalizedString("kony.mb.feedback.fivestarrating");
            this.view.lblImprove.text = kony.i18n.getLocalizedString("kony.mb.feedback.mostliked");
            this.view.flxTopContainer.setVisibility(true);
            this.view.btnOption1.text = kony.i18n.getLocalizedString("kony.mb.login.easeOfUse");
            this.view.btnOption2.text = kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.features");
            this.view.btnOption3.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.SecurityHeader");
            this.view.btnOption4.text = kony.i18n.getLocalizedString("i18n.wealth.performance");
            this.view.btnOption5.text = kony.i18n.getLocalizedString("i18n.StopPayments.checkRequest.Others");
            if(feedbackSubmitPermission){
              this.view.btnSubmit.isVisible = true;
            }else{
              this.view.btnSubmit.isVisible = false;
            }
            this.animateRatings();
        break;
      }
     var rating=val.toString();
     if(rating!=this.feedbackRating)
       this.clearFeedbackSelection();
     this.feedbackRating = rating;
     this.view.forceLayout();
    },
  feedBack1: function(){
 if(this.view.flxButtonOption1.skin === "sknFeedbackFlxdisabled"){
  this.view.flxButtonOption1.skin = "sknFeedbackFlxEnabled";
  this.view.btnOption1.skin = "sknFeedbackButtonEnabled";
 } else
 {
   this.view.flxButtonOption1.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption1.skin = "sknFeedbackButtonDisabled";
 }
},
  feedBack2: function(){
 if(this.view.flxButtonOption2.skin === "sknFeedbackFlxdisabled"){
  this.view.flxButtonOption2.skin = "sknFeedbackFlxEnabled";
  this.view.btnOption2.skin = "sknFeedbackButtonEnabled";
    } else
 {
   this.view.flxButtonOption2.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption2.skin = "sknFeedbackButtonDisabled";
 }
   },
  feedBack3: function(){
  if(this.view.flxButtonOption3.skin === "sknFeedbackFlxdisabled"){
  this.view.flxButtonOption3.skin = "sknFeedbackFlxEnabled";
   this.view.btnOption3.skin = "sknFeedbackButtonEnabled";
  } else {
     this.view.flxButtonOption3.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption3.skin = "sknFeedbackButtonDisabled";
  }
},
  feedBack4: function(){
  if(this.view.flxButtonOption4.skin === "sknFeedbackFlxdisabled"){
  this.view.flxButtonOption4.skin = "sknFeedbackFlxEnabled";
   this.view.btnOption4.skin = "sknFeedbackButtonEnabled";
  } else {
    this.view.flxButtonOption4.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption4.skin = "sknFeedbackButtonDisabled";
  }
  },
  feedBack5: function(){
  if(this.view.flxButtonOption5.skin === "sknFeedbackFlxdisabled"){
  this.view.flxButtonOption5.skin = "sknFeedbackFlxEnabled";
  this.view.btnOption5.skin = "sknFeedbackButtonEnabled";
  }  else {
     this.view.flxButtonOption5.skin = "sknFeedbackFlxdisabled";
    this.view.btnOption5.skin = "sknFeedbackButtonDisabled";
  }
  },
  clearFeedbackSelection: function(){
    for(var i=1;i<=5;i++){
      var btn = this.view["btnOption"+i];
      var flx = this.view["flxButtonOption"+i];
      btn.skin = "sknFeedbackButtonDisabled";
      flx.skin = "sknFeedbackFlxdisabled";
    }
  },
   getSelectedImprovements : function() {
  	var improvements = "";
     for(var i = 1; i <= 5; i++) {
         var btn = this.view["btnOption" + i];
     	if(btn.skin  === "sknFeedbackButtonEnabled") {
        	improvements = improvements ? (improvements + "," + btn.text) : btn.text;
        }
     }
     return improvements;
   },
   SubmituserFeedback: function() {
      KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Submit Feedback":"Users Submited InAppFeedback"});
      applicationManager.getPresentationUtility().showLoadingScreen();
      var feedbackUserID = applicationManager.getUserPreferencesManager().getFeedbackID();
	  var feedbackModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "FeedbackUIModule"});
      var userObj = applicationManager.getUserPreferencesManager();
      var login = userObj.isUserLoggedin();
      var params = {
        'rating': this.feedbackRating,
        'description': this.view.textarea.text,
      };
      if(this.feedbackRating === "5"){
        params.likeMost = this.getSelectedImprovements();
      } else {
        params.improvement = this.getSelectedImprovements();
      }
      if(login === false) {
        params.feedbackID = feedbackUserID;
      }
      feedbackModule.presentationController.setUserFeedback(params);
    },
  animateRatings : function(){
        this.view.flexStarRating.animate(
    kony.ui.createAnimation({
        "100": {
            "top": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": function(){}
    });
    this.view.forceLayout();
    this.view.flxTopContainer.animate(
    kony.ui.createAnimation({
      "100": {
            "top": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": function(){}
    });
  },
  };
 });