define({
  preShow: function() {
    this.initActions();
    if(kony.os.deviceInfo().name !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
    this.view.lblSuccessText.skin = "sknLbl424242SSP140prBold";
    this.view.flxSuccessContainer.centerY= "50%";
  },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
   },
    initActions: function(){
        var scope = this;
        this.view.btnDone.onClick = function(){
           applicationManager.getPresentationUtility().showLoadingScreen();
           var navManager = applicationManager.getNavigationManager();
           var entryPoint =  navManager.getEntryPoint("Feedback");
           navManager.navigateTo({"appName":"HomepageMA","friendlyName" : "AccountsUIModule/frmUnifiedDashboard"}); //entryPoint,for navigation purpose added
           applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    },
  animateFeedback : function(){
   /* this.view.flxSuccessContainer.animate(
    kony.ui.createAnimation({
      "0": {
            "centerY": "60%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        },
      "100": {
            "centerY": "50%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.50
    }, {
        "animationEnd": function(){}
    });*/
  }
 });