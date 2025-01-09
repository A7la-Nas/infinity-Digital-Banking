define({ 
  
  _prevFormData : {},
  /*This function is first called when a form is initialised */
  init:function(){
    try{
      kony.print("init::");
     // this.bindEvents();
      
    }catch(er){
      kony.print("Excp in init"+er);
    }
  },
  
  /*This function is first called when a form is ready to use */
  onNavigate:function(params){
    try{
      kony.print("formdata::"+JSON.stringify(params));
      this.view.init = this.init;
      this.view.preShow = this.preShowForm;
      
      if(!kony.sdk.isNullOrUndefined(params)){
        this._prevFormData = params;
        var prevFormName = this._prevFormData.formName;
        if(prevFormName === "ACHTransactionDetail" || prevFormName === "ApprovalReqMain"){
          this.view.lblMsg.text = this._prevFormData.formData.message;
        }
      }
      
    }catch(er){
       kony.print("Excp in onNavigate"+er);
    }
  },
  
  
  //preShowForm is called when the form is pre loaded 
  preShowForm : function(){
    try{
      kony.print("Entered preShowForm");

      this.bindEvents();
    }catch(e){
      kony.print("Exception in preShowForm::"+e);}
  },

  //postShowForm is called when the form is post loaded
  postShowForm : function(){
    try{
      kony.print("Entered postShowForm");

    }catch(e){
      kony.print("Exception in postShowForm::"+e);}
  },
  
  /*This function is used for widget actions*/
  bindEvents : function(){
    try{
      this.view.btnDone.onClick = this.backNavigation;
      this.view.onDeviceBack = this.backNavigation;
    }catch(er){
      kony.print("Excp in bindEvents"+er);
    }
  },
  
  /*This function is used to navigate back*/
  backNavigation:function(){
    try{
      var navigateBack = new kony.mvc.Navigation(kony.application.getPreviousForm().id);  //"UserMgmtList"
      navigateBack.navigate();
    }catch(er){
       kony.print("Excp in backNavigation"+er);
    }
  },
});