define({
    init : function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
      },
    preShow: function() {
      try{
        var scopeObj = this;
        this.renderTitleBar();
      	this.view.btnUpdate.setEnabled(false);
      	this.view.btnUpdate.skin = "sknBtne9e9e9a0a0a0SSReg30px";
      	this.view.txtNickname.onTextChange = this.onTextChangeNickName;
        this.view.btnUpdate.onClick = this.btnUpdateOnClick;
        this.view.postShow = function(){
          scopeObj.view.txtNickname.setFocus(true);
        };
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
    },
    onTextChangeNickName: function()
    {
      try{
        if(this.view.txtNickname.text.length > 0)
        {
          this.view.btnUpdate.setEnabled(true);
          this.view.btnUpdate.skin = "sknBtn0095e4RoundedffffffSSP26px";
        }
        else
        {
          this.view.btnUpdate.setEnabled(false);
          this.view.btnUpdate.skin = "sknBtne9e9e9a0a0a0SSReg30px";
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
      }
    },
    btnUpdateOnClick: function() {
      try{
        var obj1 = {
            "nickNameTab": "true"
        };
        var ntf = new kony.mvc.Navigation("frmCardManageDetails");
        ntf.navigate(obj1);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    }
});