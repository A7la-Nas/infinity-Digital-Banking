define({
  base64: null,
  fileNames: [],
  fileContents: [],
  requestPayload: {},
  fileTypes: [],
  fileIds:[],
  fileNamePrefix:'Attachment',
  setDeleteFlxVisibility: true,
  importNativeClasses:null,
  vctrl:null,
  selectedFileId: null,

  init : function(){
    var FormValidator = require("FormValidatorManager")
	this.fv = new FormValidator(1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmMessagesDetailsPreShow : function(){
    this.base64=null;
    this.fileNames=[];
    this.fileIds=[];
    this.fileContents= [];
    this.requestPayload= {};
    this.fileTypes=[];
    this.setPreshowData();
    this.setFlowActions();
    this.setUIBasedOnSelectedTab();
    this.clearFieldsInForm();
    this.showReply();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  showReply : function(){
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmMessagesDetails");
    if(data.showReply && data.showReply===true)
      {
        this.setReplyBox();
        data.showReply = false;
        this.view.forceLayout();
        navManager.setCustomInfo("frmMessagesDetails",data);
      }
  },
  setPreshowData : function(){
    this.setMessageDetailsData();
    this.view.lblReply.text= kony.i18n.getLocalizedString("kony.mb.MessagesDetails.Reply");
    this.fv.submissionView(this.view.btnSend);
    this.view.customHeader.lblLocateUs.contentAlignment = 5;
    this.view.customHeader.flxSearch.isVisible = true;
    this.view.customHeader.imgSearch.src = "addiconnoborder.png";
    this.view.customHeader.imgSearch.isVisible = false;
    this.view.customHeader.btnRight.isVisible = false;
    this.view.txtAreaReply.isVisible = false;
    this.view.flxReplyandSend.isVisible = false;
    this.view.txtAreaReply.setEnabled(false);
    this.view.flxDelete.isVisible = applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_DELETE");
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMessageDetailsMain.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMessageDetailsMain.top = "0dp";
    }
    
    this.view.flxAttachFiles.setVisibility(true);
    this.view.segAttachments.setVisibility(false);
    
  },
  postshow : function(){
   if(this.view.txtAreaReply.isVisible)
     {
       this.view.txtAreaReply.setEnabled(true);
       this.view.txtAreaReply.setFocus(true);
     }
     this.view.flxDelete.isVisible = this.setDeleteFlxVisibility;
    
    this.view.flxAttachFiles.onClick = this.showFileSelectionOption ;
	  this.hideFileSelectionOption();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
     
    this.view.btnPhoto.onClick = this.fileSelectionFromGallery;
    this.view.btnDocument.onClick = this.selectDocuments;
    this.view.btnClose.onClick = this.hideFileSelectionOption;
    this.view.Camera.onCapture = this.openCamera;
    this.view.lblAttachmentError.text = "";
    this.view.lblTitle1.text = "";

    this.view.flxAttachFiles.setVisibility(true);
    var optional = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentsOptional");
    this.view.flxTitleWrapper.isVisible = false;
    this.view.lblTitle1.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+optional+")";
    this.view.segAttachments.setData([]);
    this.fileNames=[];
    this.fileIds=[];
    this.view.flxConfirmationPopUp.flxYes.onClick = this.deleteAttachment;
    this.view.flxConfirmationPopUp.flxNo.onClick = this.closeAttachmentsPopup;
  },
  enableContinueButton:function(){
    this.view.btnSend.setEnabled(true);
    this.view.btnSend.skin = "sknBtn055BAF26px";
  },
  disableContinueButton: function() {
    this.view.btnSend.setEnabled(false);
    this.view.btnSend.skin = "sknBtnOnBoardingInactive";
  },
  
  fileSelectionFromGallery: function () {
    var queryContext = {
      mimetype:"image/*"
    };
    try {
      kony.phone.openMediaGallery(this.fileSelectionCallback.bind(this),queryContext);
    } catch (error) {
      this.handleError(error);
    }
  },
  
  selectDocuments: function () {
    var scope=this;
    if (kony.os.deviceInfo().name === "iPhone") {
      scope.uploadIphoneDocument();
    } else {
      var queryContext = {
        mimetype: "application/*",
      };
      try {
        kony.phone.openMediaGallery(this.fileSelectionCallback.bind(this), queryContext);
      } catch (error) {
        this.handleError(error);
      }
    }
  },
  
  uploadIphoneDocument: function() {
    var scope=this;
    if(typeof mainthread==="function"){
      kony.runOnMainThread(mainthread, []);
    }
    function mainthread () {
      if(scope.importNativeClasses===null){
        scope.importNativeClasses= scope.initializeNativeImport();
      }
      scope.importNativeClasses.UIApplicationDetails.sharedApplication().keyWindow.rootViewController.presentViewControllerAnimatedCompletion(scope.importNativeClasses.pvDetails, true, {});
    }
  },

  initializeNativeImport: function(){
    var scope=this;
    var nativeClasses={};
    nativeClasses.UIDocumentPickerViewControllerDetails = objc.import("UIDocumentPickerViewController");
    nativeClasses.UIViewControllerDetails = objc.import("UIViewController");
    nativeClasses.UIApplicationDetails = objc.import("UIApplication");
    nativeClasses.NSDataDetails  = objc.import("NSData"); 
    nativeClasses.ViewControllerDetails = objc.newClass('ViewController'+Math.random(), 'UIViewController', ['UIDocumentPickerDelegate'], {
      documentPickerDidPickDocumentsAtURLs: function(controller, urls) {
        kony.print("Callback called");
        if (urls.length > 0) {
          var nsurl = urls[0];
          var fileName = nsurl.lastPathComponent;
          var fileType = nsurl.pathExtension;
          var fileData = nativeClasses.NSDataDetails.dataWithContentsOfURL(nsurl);
          var base64 = fileData.base64Encoding();
          var fileObject = {};
          fileObject.base64 = base64;
          fileObject.fileName = fileName;
          fileObject.fileType = fileType;
          fileObject.fileSize = (base64.length * 0.75) / 1024;
          scope.uploadNativeFile(fileObject);
        }
      },	
    });
    if(this.vctrl === null){
      this.vctrl = nativeClasses.ViewControllerDetails.alloc().jsinit();
    }
    nativeClasses.pvDetails = nativeClasses.UIDocumentPickerViewControllerDetails.alloc().initWithDocumentTypesInMode(["com.adobe.pdf","com.microsoft.word.doc"], UIDocumentPickerModeImport);
    nativeClasses.pvDetails.delegate = this.vctrl;
    kony.print("end");
    return nativeClasses;
  },

  uploadNativeFile: function (documentObject) {
    var scopeObj = this;
    scopeObj.hideFileSelectionOption();
    var file = {};
    var fileContent = {};
    var base64 = documentObject.base64;
    var fileSize = documentObject.fileSize;
    var fileName = documentObject.fileName;
    var fileType = documentObject.fileType;
    var configManager = applicationManager.getConfigurationManager();
    var maxFileSize = configManager.maxFileSizeAllowed;
    if (base64 !== null && base64 !== undefined && base64 !== "") {
      if (fileSize > maxFileSize * 1000) {
        scopeObj.view.lblAttachmentError.text = "error";
        scopeObj.view.flxAttachmentsError.setVisibility(true);
        scopeObj.view.lblAttachmentError.setVisibility(true);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } else {
        scopeObj.fileNames.push(fileName);
        scopeObj.fileTypes.push(fileType);
        fileContent["base64"] = base64;
        file["size"] = fileSize;
        file["name"] = fileName;
        fileContent["file"] = file;
        scopeObj.fileContents.push(fileContent);
        var navManager = applicationManager.getNavigationManager();
        var requestid = navManager.getCustomInfo("frmMessagesDetails");
        applicationManager.getPresentationUtility().showLoadingScreen();
        var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
        MessageModule.presentationController.uploadMedia(
          fileContent,
          requestid.requestid,
          scopeObj.setAttachmentsDataToSegment.bind(scopeObj),
          scopeObj.uploadMediaFailureCallback.bind(scopeObj),
          scopeObj.fileContents.length - 1
        );
      }
    }
  },
  
  fileSelectionCallback: function (rawBytes, permissionStatus, mimeType) {
    //osama
    if(kony.sdk.isNullOrUndefined(mimeType))
    {
        return;
    }
    var scopeObj=this;
    this.hideFileSelectionOption();
    var fileMimeType;
    if(kony.os.deviceInfo().name === "iPhone"){
      mimeType="image/jpeg";
    }
    if(mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      fileMimeType="docx";
    }else if(mimeType === "application/msword"){
      fileMimeType="doc";
    }else{
      fileMimeType = mimeType.substring(mimeType.lastIndexOf("/")+1);
    }
    var fileName = this.fileNamePrefix+(this.fileNames.length+1)+"."+fileMimeType;
    var configManager = applicationManager.getConfigurationManager();
    var maxFileSize =  configManager.maxFileSizeAllowed;
    
    var selectedFile = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentTypeErrorMsg1");
    var typeError = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Attachment.Error");
    var fileSizeMB = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Attachment.mb");
    var sizeError = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentSizeErrorMsg")+" "+maxFileSize+" "+fileSizeMB+".";
    var validFilesTypesToUpload=["application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","text/plain","image/png","image/jpeg","application/pdf"]
    var isThisMimeTypeAllowed=validFilesTypesToUpload.includes(mimeType);
    if(!isThisMimeTypeAllowed)
    {
      this.view.lblAttachmentError.text = selectedFile+" "+fileName+" "+typeError;
      this.view.flxAttachmentsError.setVisibility(true);
      this.view.lblAttachmentError.setVisibility(true);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }else{
      if (rawBytes !== null) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var base64 = kony.convertToBase64(rawBytes);
        var file={};
        var fileContent={};
        if ( base64 !== null && base64 !== undefined && base64 !== "") {
          var fileSize = ((base64.length*0.75 )/1024);
          if(fileSize > (maxFileSize*1000)){
            this.view.lblAttachmentError.text = selectedFile+" "+fileName+" "+sizeError;
            this.view.flxAttachmentsError.setVisibility(true);
            this.view.lblAttachmentError.setVisibility(true);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
          }else {
            this.fileNames.push(fileName);
            this.fileTypes.push(fileMimeType);
            fileContent["base64"] = base64;
            file["size"] = fileSize;
            file["name"] = fileName;
            fileContent["file"]=file;
            this.fileContents.push(fileContent);
            var navManager = applicationManager.getNavigationManager();
            var requestid = navManager.getCustomInfo("frmMessagesDetails");
            this.disableContinueButton();
            applicationManager.getPresentationUtility().showLoadingScreen();
            var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
            MessageModule.presentationController.uploadMedia(fileContent,requestid.requestid,scopeObj.setAttachmentsDataToSegment.bind(scopeObj),scopeObj.uploadMediaFailureCallback.bind(scopeObj),this.fileContents.length-1);
          }
        } 
      }
   }
  },
  
  uploadMediaFailureCallback:function(index){
    this.replyMessage();
    this.fileNames.splice(index, 1);
    this.fileContents.splice(index, 1);
    this.fileTypes.splice(index, 1);
    this.fileIds.splice(index, 1);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  setAttachmentsDataToSegment: function(id){
    let scope = this;
    this.replyMessage();
    this.view.segAttachments.setVisibility(true);
     var configManager = applicationManager.getConfigurationManager();
     var maxAttachmentsAllowed =  configManager.maxAttachmentsAllowed;
     var attachmentsData = [];
    for (var i = 0; i < this.fileNames.length; i++) {
      attachmentsData[i] = {};
      attachmentsData[i].filename = this.fileNames[i];
      if((i==this.fileNames.length-1) && (id != undefined)){
        this.fileIds[i]=id;
        attachmentsData[i].lblAttachmentId=id;
      }else{
        attachmentsData[i].lblAttachmentId= this.fileIds[i];
      }
      attachmentsData[i]["imgRemoveAttachment"] = {
        "src": "closecircle.png",
        "height":"15dp",
        "width":"15dp",
        "onTouchEnd" : scope.showRemoveAttachmentPopup.bind(this,attachmentsData[i].lblAttachmentId)
      };
      if(this.fileTypes[i] === "doc"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "doc_image.png"
     	 }
        } else if(this.fileTypes[i] === "pdf"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "pdf_image.png"
     	 }
        }else if(this.fileTypes[i] === "docx"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "docx_image.png"
     	 }
        }else if(this.fileTypes[i] === "jpeg"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "jpeg_image.png"
     	 }
        }else if(this.fileTypes[i] === "png"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "png_image.png"
     	 }
        }
    }
    this.view.segAttachments.widgetDataMap = {
      "lblAttachment": "filename",
      "imgRemoveAttachment": "imgRemoveAttachment",
      "imgAttachment":"imgAttachment",
      "lblAttachmentId":"lblAttachmentId"
    };
    this.view.segAttachments.setData(attachmentsData);
    var configManager = applicationManager.getConfigurationManager();
    var maxAttachmentsAllowed =  configManager.maxAttachmentsAllowed;
    
     
    if (this.fileNames.length === 0){
      this.view.flxTitleWrapper.isVisible = false;
      this.view.lblTitle1.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentsOptional")+")";
    }
   if (this.fileNames.length >= maxAttachmentsAllowed) {
     this.view.flxTitleWrapper.isVisible = true;
      this.view.flxAttachFiles.setVisibility(false);
     this.view.lblTitle1.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+this.fileNames.length+"/"+maxAttachmentsAllowed+")";
     applicationManager.getPresentationUtility().dismissLoadingScreen();
    } else{
      this.view.flxAttachFiles.setVisibility(true);
      if (this.fileNames.length === 0){      
        this.view.flxTitleWrapper.isVisible = false;
     }else{
       this.view.flxTitleWrapper.isVisible = true;
       this.view.lblTitle1.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+this.fileNames.length+"/"+maxAttachmentsAllowed+")";
     }
    }
    this.hideFileSelectionOption();
    this.view.lblAttachmentError.text = "";
    this.view.lblAttachmentError.setVisibility(false);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
   
 removeAttachments: function(file){
   var scope=this;
    for (var i = 0; i < this.fileNames.length; i++) {
        if (this.fileNames[i] === file.filename) {
          this.fileNames.splice(i, 1);
          this.fileContents.splice(i, 1);
          this.fileTypes.splice(i, 1);
          this.fileIds.splice(i, 1);
          break;
        }
      }
    this.disableContinueButton();
    var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    MessageModule.presentationController.discardMessageAttachment(file.lblAttachmentId,scope.enableContinueButton.bind(scope));
    this.constructFileInput();
    this.setAttachmentsDataToSegment();
  },
  
  constructFileInput: function(){
    var uploadattachments = [];
    for(var i=0;i< this.fileNames.length; i++){
      var fileInputs = "";
      fileInputs = this.fileNames[i]+'-'+this.fileTypes[i]+'-'+this.fileContents[i];
      uploadattachments.push(fileInputs);
    }
    this.requestPayload = uploadattachments.toString();
  },
  
  
   showFileSelectionOption: function () {
    this.view.flxActions.setVisibility(true);
  },

  hideFileSelectionOption: function () {
    this.view.flxActions.setVisibility(false);
  },
  
  handleError: function(error){
    this.view.lblAttachmentError.text = error;
    this.view.flxAttachmentsError.setVisibility(true);
    this.view.lblAttachmentError.setVisibility(true);
  },
  
  setFlowActions : function(){
    var scopeObj = this;
    this.view.postShow = this.postshow;
    this.view.customHeader.flxSearch.onClick = this.navToNewMessage;
    this.view.customHeader.flxBack.onClick = this.goBack;
    this.view.flxReply.onClick = this.setReplyBox;
    this.view.txtAreaReply.onDone = this.setReplyBack;
    this.view.btnTakeAPicture.onClick = this.openCamera;
    this.view.btnChooseFromDevice.onClick = this.openDocs;
    this.view.flxAttachFile.onClick = this.showDocumentpopup;
    this.view.btnSend.onClick = this.onSendingReply;
    this.view.btnRestore.onClick = this.onRestore;
    this.view.flxDelete.onClick = this.onSelectDelete;
    this.view.txtAreaReply.onTextChange = this.replyMessage;
    this.view.flxReply.isVisible = applicationManager.getConfigurationManager().checkUserPermission("MESSAGES_CREATE_OR_REPLY");
  },
  setUIBasedOnSelectedTab : function(){
    var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    if(messagesMod.presentationController.messageTabSelected === "INBOX")
    {
      this.view.lblReply.text = kony.i18n.getLocalizedString("kony.mb.MessagesDetails.Reply");
      this.view.btnRestore.isVisible = false;
      this.view.flxReply.isVisible =  true;
    }
    else if(messagesMod.presentationController.messageTabSelected === "DELETED")
    {
      this.view.btnRestore.isVisible = true;
      this.view.flxReply.isVisible = false;
    }
  },
  clearFieldsInForm : function(){
    this.view.txtAreaReply.text = "";
  },
  replyMessage : function(){
    var text = this.view.txtAreaReply.text;
    text = text ? text : "";
    this.fv.checkAndUpdateStatusForNull(0, text.trim());
  },
  goBack : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  setMessageDetailsData : function(){
    var scopeObj = this;
    var dataMap = this.getDataMap();
    var navManager = applicationManager.getNavigationManager();
    var messageDetails = navManager.getCustomInfo("frmMessagesDetails");
    var subject = messageDetails.subject;
    var requestDetailData = messageDetails.requestDetailData;
    let isPriorityMessage = messageDetails.isPriorityMessage;
    for(var i=0;i<requestDetailData.length;i++){
      if(i===0){
        requestDetailData[i].template="flxMessagesRight";
        requestDetailData[i].lblReqId = kony.i18n.getLocalizedString("kony.mb.alertsAndMessages.requestId");
        requestDetailData[i].lblCategoryId = kony.i18n.getLocalizedString("kony.mb.alertsAndMessages.category");
      }else{
        requestDetailData[i].template="flxMessagesWithoutReqIdCategory";
      }
      requestDetailData[i].lblFrom = kony.i18n.getLocalizedString("kony.mb.alertsAndMessages.from");
      requestDetailData[i].lblMessage = kony.i18n.getLocalizedString("kony.mb.alertsAndMessages.message");
    }
    this.setSubject(subject, isPriorityMessage);
    this.view.segMessageDetails.widgetDataMap = dataMap;
    this.view.segMessageDetails.setData(requestDetailData);
    this.view.forceLayout();
  },
  getDataMap :function(){
    var dataMap = {
      "flxAttachment": "flxAttachment1",
      "flxAttachmentMain": "flxAttachmentMain1",
      "flxDownload": "flxDownload1",
      "flxFrom": "flxFrom",
      "flxMain": "flxMain",
      "flxMessage": "flxMessage",
      "flxMessagesRight": "flxMessagesRight",
      "flxRight": "flxRight",
      "flxShadow": "flxShadow",
      "imgAttachment": "imgAttachment1",
      "imgDownload": "imgDownload1",
      "lblAttachment": "lblAttachment1",
      "lblDate": "lblDate",
      "lblFrom": "lblFrom",
      "lblFromValue": "lblFromValue",
      "lblMessage": "lblMessage",
      "lblMessageDescription": "lblMessageDescription",
      "flxAttachment2": "flxAttachment2",
      "flxAttachmentMain2": "flxAttachmentMain2",
      "imgAttachment2": "imgAttachment2",
      "lblAttachment2": "lblAttachment2",
      "flxDownload2": "flxDownload2",
      "imgDownload2": "imgDownload2",
      "flxAttachment3": "flxAttachment3",
      "flxAttachmentMain3": "flxAttachmentMain3",
      "imgAttachment3": "imgAttachment3",
      "lblAttachment3": "lblAttachment3",
      "flxDownload3": "flxDownload3",
      "imgDownload3": "imgDownload3",
      "flxAttachment4": "flxAttachment4",
      "flxAttachmentMain4": "flxAttachmentMain4",
      "imgAttachment4": "imgAttachment4",
      "lblAttachment4": "lblAttachment4",
      "flxDownload4": "flxDownload4",
      "imgDownload4": "imgDownload4",
      "flxAttachment5": "flxAttachment5",
      "flxAttachmentMain5": "flxAttachmentMain5",
      "imgAttachment5": "imgAttachment5",
      "lblAttachment5": "lblAttachment5",
      "flxDownload5": "flxDownload5",
      "imgDownload5": "imgDownload5",
      "lblReqVal":"lblReqVal",
      "lblCategoryVal":"lblCategoryVal",
      "lblReqId":"lblReqId",
      "lblCategoryId": "lblCategoryId"
    };
    return dataMap;
  },
  setSubject : function(subject, isPriorityMessage)
  {
    this.view.imgMsgIcon.isVisible = isPriorityMessage;
    this.view.flxContent.width = isPriorityMessage ? "88%" : "100%";
    this.view.lblSubjectDescription.text = subject.text;
    this.view.lblSubjectDescription.skin = subject.skin;
    this.view.lblSubjectDescription.left = isPriorityMessage ? "10dp" : "20dp";
    this.view.lblSubject.left = isPriorityMessage ? "10dp" : "20dp";
  },
  onSelectDelete :function(){
    var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    MessageModule.presentationController.onDeleteMessages();
  },
  onSendingReply : function(){
    this.setSegHeight();
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var requestid = navManager.getCustomInfo("frmMessagesDetails");
    var replyMessage = this.view.txtAreaReply.text.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
    var data = {
      "files": this.fileContents,
      "messagedescription" : Base64.encode(replyMessage),
      "requestid" : requestid.requestid,
      "isNativeApplication":true
    };
    
    var description = Base64.encode(replyMessage);
    var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    MessageModule.presentationController.createNewMessage(data);
  },
  onRestore : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var messageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    messageModule.presentationController.restoreMessagesOfARequest();
  },
  navToNewMessage : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    messagesMod.presentationController.getCategories();
  },
  navToMessages : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    if(MessageModule.presentationController.messageTabSelected === "INBOX")
    {
      MessageModule.presentationController.getInboxRequests();
    }
    else if(MessageModule.presentationController.messageTabSelected === "DELETED")
    {
      MessageModule.presentationController.getDeleteRequests();
    }
  },
  alterHeight : function(){
    if(this.view.tbxReply.text !== ""){
      var initialHeight = 40;
      var text1 = this.view.tbxReply.text.length;
      if(text1%39 ===0){
        var setHeight = initialHeight + 20;
        this.view.tbxReply.height = setHeight +"dp";
        initialHeight = setHeight;
      }
    }
  },
  showDocumentpopup : function(){
    this.view.flxPopupDocuments.setVisibility(true);
  },
  
  openCamera: function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.hideFileSelectionOption();
    var scopeObj=this;
    var rawBytes = this.view.Camera.rawBytes;
    var configManager = applicationManager.getConfigurationManager();
    var maxFileSize =  configManager.maxFileSizeAllowed;
    var fileType = "jpeg";
    if (rawBytes) {
      var file={};
      var fileContent={};
      var imgObject = kony.image.createImage(rawBytes);
      var base64 = "";
      var fileName = this.fileNamePrefix+(this.fileNames.length+1)+".jpeg";
      var fileSize = "";
      base64 = kony.convertToBase64(rawBytes);
      fileSize=((base64.length*0.75 )/1024);
      if(fileSize > maxFileSize*1000){
        var scaleLabel= (maxFileSize*1000)/(fileSize+1);
        imgObject.scale(scaleLabel);
        var tempRawBytes= imgObject.getImageAsRawBytes();
        base64 = kony.convertToBase64(tempRawBytes);
      }
        this.fileNames.push(fileName);
        this.fileTypes.push(fileType);
        fileContent["base64"] = base64;
        file["size"] = fileSize;
        file["name"] = fileName;
        fileContent["file"]=file;
       
		this.fileContents.push(fileContent);
        var navManager = applicationManager.getNavigationManager();
        var requestid = navManager.getCustomInfo("frmMessagesDetails");
        this.disableContinueButton(); 
        applicationManager.getPresentationUtility().showLoadingScreen();
        var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
        MessageModule.presentationController.uploadMedia(fileContent,requestid.requestid,scopeObj.setAttachmentsDataToSegment.bind(scopeObj),scopeObj.uploadMediaFailureCallback.bind(scopeObj),this.fileContents.length-1);
    }
  },
  
  openDocs : function(){
    this.view.flxPopupDocuments.setVisibility(false);
  },
  setReplyBox : function(){
    var scope = this;
    this.view.flxReply.setVisibility(false);
    this.view.txtAreaReply.setVisibility(true);
    this.view.txtAreaReply.setEnabled(true);
    this.view.txtAreaReply.setFocus(true);
    this.view.flxReplyandSend.isVisible = true;
    this.view.flxAttachFile.setVisibility(false);
  },
  setReplyBack : function(){
    var scope = this;
    this.view.flxReply.setVisibility(false);
    this.view.txtAreaReply.setVisibility(true);
    this.view.flxReplyandSend.isVisible = true;
    this.view.flxAttachFile.setVisibility(false);
  },
  setSegHeight : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
    this.view.txtAreaReply.setEnabled(false);
    this.view.flxReply.setVisibility(true);
    this.view.flxReplyandSend.isVisible = false;
    }
    else{
      this.view.flxReply.setVisibility(true);
      this.view.flxReplyandSend.isVisible = false;
    }
  },
  setReply : function(){
    this.view.flxReplyandSend.isVisible = true;
    this.view.flxReply.setVisibility(false);
  },

  showRemoveAttachmentPopup : function(attachmentId){
    let scope = this;
    scope.selectedFileId = attachmentId;
    scope.view.setContentOffset({x:"0%",y:"0%"}, true);
    scope.view.flxConfirmationPopUp.setVisibility(true);
  },

  deleteAttachment: function() {
    let scope = this;
    let deletedAttachment, rowIndex ;
    scope.view.segAttachments.data.forEach(function(obj, index){
      if(obj.lblAttachmentId === scope.selectedFileId){
        rowIndex = index;
        deletedAttachment = obj;
        return;
      }
    });
    scope.view.segAttachments.removeAt(rowIndex);
    scope.removeAttachments(deletedAttachment);
    scope.closeAttachmentsPopup();
  },

  closeAttachmentsPopup: function() {
    this.selectedFileId = null;
    this.view.flxConfirmationPopUp.setVisibility(false);
  },

});