define({ 
  otherFeaturesGlobalCopy:"",
  onNavigate : function(){
    try{
      kony.print("onNavigate inside");
      this.view.preShow = this.bindevents;
    }catch(e){kony.print("Exception in onNavigate"+e);}
  },

  bindevents: function(){
    try{
      kony.print("Entered bindevents");
      this.resetForm();
      this.getOtherFeaturePermissionsList();
      this.view.customHeader.flxBack.onClick=this.navigateBack;
      this.view.onDeviceBack=this.navigateBack;
    }catch(e){kony.print("Exception in bindevents"+e);}
  },
  /*
    *resetForm - This function is using header and footer set visiable off on in called preshow function 
    */

  resetForm : function(){
    try{
      kony.print("Entered resetForm");
      var scope=this;
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        kony.print("iPhone");
        scope.view.flxHeader.isVisible = false;
      } else {
        kony.print("Android");
        scope.view.flxHeader.isVisible = true;
      }
    }catch(e){kony.print("Exception in resetForm"+e);}
  },

  navigateBack:function(){
    try{
      kony.print("navigatetoPermission--->");
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    }catch(er){
      kony.print("navigatetoPermission--->error"+er);
    }
  },

  /*
    *otherFeaturePermissionsList - This function is to set the final array data and component 
    */

  getOtherFeaturePermissionsList : function(){
    try{
      kony.print("entered setDatainSegment");
      var widgetDataMapping = {
        "lblHeader" : "lblHeader",
        "flxImgUp" : "flxImgUp",
        "imgUpArrow" : "imgUpArrow",
        "lblNameVal" : "lblNameVal",
        "flxSeparate": "flxSeparate",
        "imgDotIcon":"imgDotIcon",
      };
      var dataArr = this.getDataOtherFeatureList();
      this.view.expandCollapseView.setDataInList(widgetDataMapping,dataArr);
    }catch(e){kony.print("Exception in resetForm"+e);}
  },

  /*
    *getDataOtherFeatureList - This function is to form an array for all the seg to set the data inside segment component
    */
  getDataOtherFeatureList : function(){ 
    try{
      kony.print("entered setDataSegTransaction");
      var scope=this;
      var finalArr = []; 
      var navManager = applicationManager.getNavigationManager();
      var dataOtherFeature=navManager.getCustomInfo("frmOtherFeaturePermissions");
      scope.setupManageUserBasedOnMonetaryPermissions(dataOtherFeature);
      var NONM = scope.otherFeaturesGlobalCopy;
      var featureData ="";
      var len = NONM.length;
      var headerTitles=[];
      for (var i = 0; i < len; i++) {
        featureData = NONM[i];
        headerTitles.push(featureData.featureName);
      }  
      var combinedHeadRowArr = [];
      for(var j=0 ; j < headerTitles.length; j++){
        combinedHeadRowArr = [];
        combinedHeadRowArr.push({
          "template" : "flxApprovalReqExpColHeader",
          "lblHeader": {"text": headerTitles[j]},
          "imgUpArrow" : {"src" : "arrowupblue.png"},
        });

        var rowArr = [];
        featureData=NONM[j];
        for(var k=0;k<featureData.Actions.length;k++){  
          var rowObj = {
            "template" : "flxUserAccountNames",
            "lblNameVal" : {"text": ""+featureData.Actions[k].actionName},
            "imgDotIcon":(featureData.Actions[k].isSelected) ? {"src":"activegreendot.png"}:{"src":"inactivegreydot.png"},
            "flxSeparate":{skin:"sknflxe7e7e7", isVisible:true}
          };
          rowArr.push(rowObj);
        }
        rowArr[rowArr.length-1].flxSeparate.isVisible = false;
        combinedHeadRowArr.push(rowArr);
        finalArr.push(combinedHeadRowArr);
      }
      //}
      kony.print("final Arr::::"+JSON.stringify(finalArr));
      return finalArr;
    }catch(e){kony.print("exception setDatainSegment"+e);}
  },
  setupManageUserBasedOnMonetaryPermissions: function(data) {
    var scopeObj = this;
    var dataStore = segregateFeatureDataForManageUser(data);
    //setting feature level isselected for other features when Viewuserdetails is clicked
    if (!(kony.sdk.isNullOrUndefined(dataStore["notAccountLevel"]))) {
      for (var i = 0; i < dataStore["notAccountLevel"].length; i++) { //for every feature				
        var flag = 0;
        for (var k = 0; k < dataStore["notAccountLevel"][i]["Actions"].length; k++) {
          if (dataStore["notAccountLevel"][i]["Actions"][k]["isSelected"]) {
            flag = 1;
            dataStore["notAccountLevel"][i]["isSelected"] = true;
            break;
          }
          if (flag === 0) {
            dataStore["notAccountLevel"][i]["isSelected"] = false;
          }
        }
      }
    }
    if (!(kony.sdk.isNullOrUndefined(dataStore["userDataStore"])) && !(kony.sdk.isNullOrUndefined(dataStore["accountlevelActions"])) && !(kony.sdk.isNullOrUndefined(dataStore))) {
      scopeObj.otherFeaturesGlobalCopy = cloneJSON(dataStore["notAccountLevel"]);

    }

  },
});