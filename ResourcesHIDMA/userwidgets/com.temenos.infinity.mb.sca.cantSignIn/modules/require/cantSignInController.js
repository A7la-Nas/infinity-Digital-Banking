define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._selectedUser = "";
      this._operation1 = "";
      this._dataModel1= "";
      this._objectService1 = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "selectedUser", function(val) {
        if((typeof val==='object') && (val !== "")){
          this._selectedUser=val;          
        }
      });
      defineGetter(this, "selectedUser", function() {
        return this._selectedUser;
      });
      defineSetter(this, "operation1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._operation1=val;          
        }
      });
      defineGetter(this, "operation1", function() {
        return this._operation1;
      });
      defineSetter(this, "dataModel1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dataModel1=val;          
        }
      });
      defineGetter(this, "dataModel1", function() {
        return this._dataModel1;
      });
      defineSetter(this, "objectService1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._objectService1=val;          
        }
      });
      defineGetter(this, "objectService1", function() {
        return this._objectService1;
      });
    },

    preShow: function () {
      this.renderTitleBar(this.getLocalizedString("kony.mb.resetPassword.resetInformation"));
      this.view.flxMainContainer.setVisibility(true);
      this.view.flxUsersContainer.setVisibility(true);
      this.view.flxLostDeviceContainer.setVisibility(false);
      this.view.flxPasswordContainer.setVisibility(false);
      this.view.flxPassword.setVisibility(true);
      this.view.flxSuccess.setVisibility(false);
      this.view.btnCancel.setVisibility(true);
      this.view.imgMaskIcon.src = "viewactive.png";
      this.maskText();
      this.populateUserIdData();
      this.initActions();
      this.view.forceLayout();
      kony.application.dismissLoadingScreen();
    },

    getLocalizedString: function(property){
      let value = kony.i18n.getLocalizedString(property);
      return value ? value : property;
    },

  renderTitleBar: function(value) {
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var isIphone = deviceUtilManager.isIPhone();
      this.view.lblScreenName.text = value;
      this.view.flxHeader.isVisible = !isIphone;
      this.view.flxHeader.setVisibility(true);
      if (isIphone) {
        this.view.flxHeader.setVisibility(true);
          let currForm = kony.application.getCurrentForm();
          currForm.title = value;
      }
  },
  initActions: function() {
      let scopeObj = this;
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var isIphone = deviceUtilManager.isIPhone();
      var currForm = kony.application.getCurrentForm();
      if (isIphone && currForm.id === "frmSCACantSignIn") {
          //this.view.flxHeader.isVisible = !isIphone;
           this.view.flxHeader.setVisibility(true);
          var titleBarAttributes = currForm.titleBarAttributes;
          titleBarAttributes["rightBarButtonItems"][0].action = scopeObj.onCancel;
      }
      scopeObj.view.btnCancel.onClick = scopeObj.onCancel;
      scopeObj.view.segUsersList.onRowClick = scopeObj.onUserSelect;
      scopeObj.view.btnDone.onClick = scopeObj.showLostDeviceOption;
      scopeObj.view.flxLostDeviceOption.onClick = scopeObj.showPassword;
      scopeObj.view.flxMaskIcon.onClick = scopeObj.maskText;
      scopeObj.view.btnContinue.onClick = scopeObj.validatePassword;
      scopeObj.view.btnActivateProfile.onClick = scopeObj.navigateToActivateProfileScreen;
  },

    onCancel: function () {
      let scopeObj = this;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmSCACantSignIn", undefined);
      if(scopeObj.navigateToLogin)
        scopeObj.navigateToLogin();
      //   if(scopeObj.view.flxPasswordContainer.isVisible){
      //     scopeObj.view.flxMainContainer.setVisibility(true);
      //     scopeObj.view.flxUsersContainer.setVisibility(true);
      //     scopeObj.view.flxLostDeviceContainer.setVisibility(false);
      //     scopeObj.view.flxPasswordContainer.setVisibility(false);
      //     scopeObj.view.flxPassword.setVisibility(true);
      //     scopeObj.view.flxSuccess.setVisibility(false);
      //   }else {
      //     var navManager = applicationManager.getNavigationManager();
      //     navManager.setCustomInfo("frmSCACantSignIn", undefined);
      //     navManager.clearStack();
      //     if(scopeObj.navigateToLogin)
      //       scopeObj.navigateToLogin();
      //   }
    },

    populateUserIdData: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      const userListObj = navManager.getCustomInfo("frmSCACantSignIn");
      let name ;
      let users = [];
      userListObj.forEach(function(user){
        let obj = {
          "flxSelectUserId" : "flxSelectUserId",
          "lblUserId" :  {"text" : user.UserName},
          "imgIsUserSelected": {"src" : "radiobuttoninactive.png"},
          "customerId" : user.id
        };
        name = name ? name : user.FirstName + " " + user.LastName;
        users.push(obj);
      });
      this.view.lblUsername.text = name;
      this.view.segUsersList.setData(users);
    },

    onUserSelect: function(){
      let scopeObj = this;
      let rowNumber = this.view.segUsersList.selectedRowIndex[1];
      const segUsersData = scopeObj.view.segUsersList.data;
      let userData = scopeObj.view.segUsersList.data[rowNumber];
      scopeObj.selectedUser = {"userId" : userData.lblUserId.text, "customerId" : userData.customerId};
        var updatedSegData = JSON.parse(JSON.stringify(segUsersData));
        for(let i=0;i<updatedSegData.length;i++){
        updatedSegData[i].imgIsUserSelected.src = rowNumber === i ? "radiobtn.png" : "radiobuttoninactive.png";
        }
//      const updatedSegData = segUsersData.map((user, index)=>{
//        if(rowNumber===index){
//          user.imgIsUserSelected.src = "radiobtn.png";
//        } else {
//          user.imgIsUserSelected.src = "radiobuttoninactive.png";
//        }
//        return {...user};
//      });
      scopeObj.view.segUsersList.setData(updatedSegData);
    },

    showLostDeviceOption : function(){
      let scopeObj = this;
      scopeObj.view.flxUsersContainer.setVisibility(false);
      scopeObj.view.flxLostDeviceContainer.setVisibility(true);
    },

    showPassword: function(){
      let scopeObj = this;
      scopeObj.renderTitleBar(this.getLocalizedString("kony.resetInformation.enterPassword"));
      scopeObj.view.flxMainContainer.setVisibility(false);
      scopeObj.view.flxPasswordContainer.setVisibility(true);
    },

    maskText: function(){
      let scopeObj = this;
      let isMaskText = this.view.imgMaskIcon.src === "viewactive.png";
      scopeObj.view.imgMaskIcon.src = isMaskText ? "viewicon.png" : "viewactive.png";
      scopeObj.view.tbxPassword.secureTextEntry = isMaskText;
      scopeObj.view.flxPasswordContainer.forceLayout();
    },

    validatePassword: function(){
      let scopeObj = this;
      let pwd = scopeObj.view.tbxPassword.text;
      let request = {"userid" : scopeObj.selectedUser.userId, "password" : pwd};
      scopeObj.callServcie(scopeObj.objectService1, scopeObj.dataModel1, scopeObj.operation1, request, scopeObj.showSuccessMsg, scopeObj.showFailureMsg);
    },

    showSuccessMsg: function(){
      var currForm = kony.application.getCurrentForm();
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var isIphone = deviceUtilManager.isIPhone();
      if (isIphone && currForm.id === "frmSCACantSignIn") {
        var titleBarAttributes = currForm.titleBarAttributes;
        titleBarAttributes["rightBarButtonItems"] = [];
        currForm.titleBarAttributes = titleBarAttributes;
      }
      let scopeObj = this;
      scopeObj.view.btnCancel.setVisibility(false);
      //scopeObj.renderTitleBar(this.getLocalizedString("kony.resetInformation.lostDevice"));
      this.view.lblPasswordSuccess.text = "Success";
      scopeObj.view.flxPassword.setVisibility(false);
      scopeObj.view.flxSuccess.setVisibility(true);
      scopeObj.view.flxPasswordContainer.forceLayout();
      kony.application.dismissLoadingScreen();
    },

    showFailureMsg: function(errmsg){
      applicationManager.getDataProcessorUtility().showToastMessageError(this,errmsg);
      kony.application.dismissLoadingScreen();
    },

    navigateToActivateProfileScreen: function(){
      let scopeObj = this;
      if(scopeObj.activateProfile)
        scopeObj.activateProfile();
    },

    callServcie: function(objServiceName, objName, operation, payload, successCallback, errorCallback){ 
        applicationManager.getPresentationUtility().showLoadingScreen();
      try{
        const objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {"access":"online"});
        const dataObject = new kony.sdk.dto.DataObject(objName);
        for(let key in payload){
          dataObject.addField(key,payload[key]);
        }
        const options = {
          "dataObject": dataObject
        };
        const serviceCallback = function(res){
          if(res && res.errmsg){
            kony.print(`Call FAILED ObjectService: ${objServiceName}, ObjectName: ${objName}, operation: ${operation} ` + JSON.stringify(res));
            errorCallback(res.errmsg);
          } else {
            kony.print(`Call SUCCESSFUL ObjectService: ${objServiceName}, ObjectName: ${objName}, operation: ${operation} ` + JSON.stringify(res));
            successCallback(res);
          }        
        };
        const serviceErrorCallback = function(err){
          kony.print(`Call FAILED ObjectService: ${objServiceName}, ObjectName: ${objName}, operation: ${operation} ` + JSON.stringify(err));
          errorCallback(err.errmsg);
        };
        objSvc.customVerb(operation, options, serviceCallback, serviceErrorCallback);
      } catch (err){
        errorCallback(err);
      }
    },
  };
});
