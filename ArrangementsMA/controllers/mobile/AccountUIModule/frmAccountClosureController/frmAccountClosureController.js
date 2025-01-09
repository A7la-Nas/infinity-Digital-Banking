define(['CampaignUtility', 'CommonUtilities'], function(CampaignUtility, CommonUtilities){
  return{
  base64: null,
  fileNames: [],
	fileIds:[],
  fileContents: [],
  requestPayload: {},
  fileTypes: [],
  segmentData: 0,
  fileNamePrefix:'Attachment',
  importNativeClasses: null,
  vctrl:null,
  selectedFileId: null,
    account: null,
    closingReason: null,
  
  preshow: function() {
      this.initActions();
       if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.isVisible = true;
            this.view.flxInfo.height = "110dp";
      }
      else{
        this.view.flxHeader.isVisible = false;
         this.view.flxInfo.height = "165dp";
      }
      this.view.btnConfirm.onClick = this.showAcknowledge;
      this.view.flxReason.onClick = this.navigateToAccountClosureReason;
      this.view.btntermsandconditions.onClick = this.navigateToTandC;
      this.view.flxInfo.setVisibility(false);
      this.hideFileSelectionOption();
      this.segmentData = 0;
      this.view.flxUploadDocuments.onClick = this.showFileSelectionOption;
      this.view.btnCancel.onClick = this.hideFileSelectionOption;
      var navManager = applicationManager.getNavigationManager();
      account = navManager.getCustomInfo("selectedAccount");
      this.account = navManager.getCustomInfo("selectedAccount");
      this.setFormData(account);
      if(navManager.getEntryPoint("accountClosureMovement")==='frmAccountDetails'){
        this.view.lblReason.text = 'Select';
        var resetFlag = null;
        navManager.setCustomInfo("AccountClosureReason",resetFlag);
        this.view.imgTermsAccepted.src = "tickmarkbox.png";
        this.view.flxAttachments.setVisibility(false);
        this.view.flxAttachmentError.setVisibility(false);
        this.fileContents = [];
        this.fileNames = [];
        this.view.segAttachments.setData([]);
      }
      this.setClosingReason();
  },
  initActions: function() {
      this.view.customHeader.flxBack.onClick = this.goBack;
      this.view.customHeader.btnRight.onClick = this.goBack;
      this.view.flxCheckBox.onClick = this.toggleCheckBox;
      this.view.btnPhoto.onClick = this.fileSelectionFromGallery;
      this.view.btnDocument.onClick = this.selectDocuments;
      this.view.Camera.onCapture = this.openCamera;
      this.view.imgInfo.onTouchEnd= this.showInfoPopUp;
      this.view.imgCross.onTouchEnd= this.closeInfoPopUp;
  },
  goBack: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
  },
   navigateToTandC: function(){
      var navManager = applicationManager.getNavigationManager();
      var frmName = {"appName": "ArrangementsMA","friendlyName": "AccountUIModule/frmTermsAndCondition"}; 
      navManager.navigateTo(frmName);
    },
  setClosingReason: function() {
      var navManager = applicationManager.getNavigationManager();
      var closingReason = navManager.getCustomInfo("AccountClosureReason");
    this.closingReason =  navManager.getCustomInfo("AccountClosureReason");
      if (!kony.sdk.isNullOrUndefined(closingReason)) {
          this.view.lblReason.text = closingReason;
      }
      this.enableConfirmButton();
  },
  enableConfirmButton: function() {
      if (this.view.lblReason.text !== 'Select' && this.view.imgTermsAccepted.src === "a.png") {
          this.view.btnConfirm.setEnabled(true);
          this.view.btnConfirm.skin = "sknBtn0095e426pxEnabled";
      } else {
          this.view.btnConfirm.setEnabled(false);
          this.view.btnConfirm.skin = "sknBtna0a0a0SSPReg26px";
      }
  },
  setFormData: function(account) {
   this.view.lblAccountNameValue.text = account.nickName?account.nickName : account.accountName;
    this.view.lblAccountNoValue.text = account.accountID;
    this.view.lblAccountTypeValue.text = account.accountType;
    configManager = applicationManager.getConfigurationManager();
    this.view.lblCurrentBalanceValue.text = configManager.currencyCode[account.currencyCode] + account.currentBalance;
  },
  toggleCheckBox: function() {
      if (this.view.imgTermsAccepted.src === "tickmarkbox.png") {
          this.view.imgTermsAccepted.src = "a.png";
      } else {
          this.view.imgTermsAccepted.src = "tickmarkbox.png";
      }
      this.enableConfirmButton();
  },
  showInfoPopUp: function(){
      this.view.flxInfo.setVisibility(true);
  },
  closeInfoPopUp: function(){
      this.view.flxInfo.setVisibility(false);
  },
  openCamera: function () {
    var scopeObj=this;
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.hideFileSelectionOption();
    var rawBytes = this.view.Camera.rawBytes;
    var configManager = applicationManager.getConfigurationManager();
    var maxFileSize =  configManager.maxFileSizeAllowed;
    var fileType = "jpeg";
    if (rawBytes) {
      var imgObject = kony.image.createImage(rawBytes);
      var base64 = "";
      var fileName = this.fileNamePrefix+(this.fileNames.length+1)+".jpeg";
      var fileSize = "";
      base64 = kony.convertToBase64(rawBytes);
      fileSize=((base64.length*0.75 )/1024);
      var file={};
      var fileContent={};
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
        applicationManager.getPresentationUtility().showLoadingScreen();
        // var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
        // MessageModule.presentationController.uploadMedia(fileContent,requestId,scopeObj.setAttachmentsDataToSegment.bind(scopeObj),scopeObj.uploadMediaFailureCallback.bind(scopeObj),this.fileContents.length-1);

    }
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
    kony.runOnMainThread(mainthread, []);
    function mainthread () {
      if(scope.importNativeClasses===null){
        scope.importNativeClasses=scope.initializeNativeImport();
      }
      scope.importNativeClasses.UIApplication.sharedApplication().keyWindow.rootViewController.presentViewControllerAnimatedCompletion(scope.importNativeClasses.pv, true, {});
    }
  },

  initializeNativeImport: function(){
    var scope=this;
    var nativeClasses={};
    nativeClasses.UIDocumentPickerViewController = objc.import("UIDocumentPickerViewController");
    nativeClasses.UIViewController = objc.import("UIViewController");
    nativeClasses.UIApplication = objc.import("UIApplication");
    nativeClasses.NSData  = objc.import("NSData"); 
    nativeClasses.ViewController = objc.newClass('ViewController'+Math.random(), 'UIViewController', ['UIDocumentPickerDelegate'], {
      documentPickerDidPickDocumentsAtURLs: function(controller, urls) {
        kony.print("Callback called");
        if (urls.length > 0) {
          var nsurl = urls[0];
          var fileName = nsurl.lastPathComponent;
          var fileType = nsurl.pathExtension;
          var fileData = nativeClasses.NSData.dataWithContentsOfURL(nsurl);
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
      this.vctrl = nativeClasses.ViewController.alloc().jsinit();
    }
    nativeClasses.pv = nativeClasses.UIDocumentPickerViewController.alloc().initWithDocumentTypesInMode(["com.adobe.pdf","com.microsoft.word.doc"], UIDocumentPickerModeImport);
    nativeClasses.pv.delegate = this.vctrl;
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
        scopeObj.view.flxAttachmentError.setVisibility(true);
        scopeObj.view.lblAttachmentError.text = "The file size exceeds the maximum limit. Please make sure that the file you are uploading doesn’t exceed 2MB.";   
        //scopeObj.view.lblAttachmentError.setVisibility(true);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } else {
        scopeObj.fileNames.push(fileName);
        scopeObj.fileTypes.push(fileType);
        fileContent["base64"] = base64;
        file["size"] = fileSize;
        file["name"] = fileName;
        fileContent["file"] = file;
        scopeObj.fileContents.push(fileContent);
        var requestid="";
        applicationManager.getPresentationUtility().showLoadingScreen();
        scopeObj.setAttachmentsDataToSegment();
        // var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
        // MessageModule.presentationController.uploadMedia(
        //   fileContent,
        //   requestid,
        //   scopeObj.setAttachmentsDataToSegment.bind(scopeObj),
        //   scopeObj.uploadMediaFailureCallback.bind(scopeObj),
        //   scopeObj.fileContents.length - 1
        // );
      }
    }
  },

  
  fileSelectionCallback: function (rawBytes, permissionStatus, mimeType) {
    var scopeObj=this
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
    var validFilesTypesToUpload=["image/jpeg","application/pdf"]
    var isThisMimeTypeAllowed=validFilesTypesToUpload.includes(mimeType);
    if(!isThisMimeTypeAllowed)
    {
      this.view.lblAttachmentError.text = "Invalid file type.";
      this.view.flxAttachmentError.setVisibility(true);
      // this.view.lblAttachmentError.setVisibility(true);
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
            this.view.flxAttachmentError.setVisibility(true);
            this.view.lblAttachmentError.text = "The file size exceeds the maximum limit. Please make sure that the file you are uploading doesn’t exceed 2MB."; 
            // this.view.lblAttachmentError.setVisibility(true);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
          }
          else {
            this.fileNames.push(fileName);
            this.fileTypes.push(fileMimeType);
            fileContent["base64"] = base64;
            file["size"] = fileSize;
            file["name"] = fileName;
            fileContent["file"]=file;
            this.fileContents.push(fileContent);
			      //this.disableContinueButton();
            applicationManager.getPresentationUtility().showLoadingScreen();
            // var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
            // MessageModule.presentationController.uploadMedia(fileContent,requestId,scopeObj.setAttachmentsDataToSegment.bind(scopeObj),scopeObj.uploadMediaFailureCallback.bind(scopeObj),this.fileContents.length-1);
              this.segmentData++;
              scopeObj.setAttachmentsDataToSegment();
          }
        } 
      }
   }
  },
  
  uploadMediaFailureCallback:function(index){
    this.checkMessageSubject();
    this.checkMessageDescription();
    this.fileNames.splice(index, 1);
    this.fileIds.splice(index,1);
    this.fileContents.splice(index, 1);
    this.fileTypes.splice(index, 1);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  setAttachmentsDataToSegment: function(){
    let scope = this;
    this.view.flxAttachments.setVisibility(true);
    var configManager = applicationManager.getConfigurationManager();
    var maxAttachmentsAllowed =  configManager.maxAttachmentsAllowed;
    var attachmentsData = [];
    for (var i = 0; i < this.fileNames.length; i++) {
      attachmentsData[i] = {};
      attachmentsData[i].filename = this.fileNames[i];
		  //     if((i==this.fileNames.length-1)){
      //     this.fileIds[i]=id;
      //     attachmentsData[i].lblAttachmentId=id;
      // }else{
      //     attachmentsData[i].lblAttachmentId= this.fileIds[i];
      // }
      attachmentsData[i]["imgRemoveAttachment"] = {
        "src": "cancelicon.png",
        "onTouchEnd": scope.removeAttachment.bind(this,i)
        // "height":"15dp",
        // "width":"15dp",
        //"onTouchEnd" : scope.showRemoveAttachmentPopup.bind(this,attachmentsData[i].lblAttachmentId)
      };
       if(this.fileTypes[i] === "pdf"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "pdf_image.png"
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
      "imgAttachment":"imgAttachment"
      //"lblAttachmentId":"lblAttachmentId"
    };
    this.view.segAttachments.isVisible = true;
    this.view.segAttachments.setData(attachmentsData);
    var configManager = applicationManager.getConfigurationManager();
    var maxAttachmentsAllowed =  configManager.maxAttachmentsAllowed;
    
     
  //   if (this.fileNames.length === 0){
  //     this.view.flxTitleWrapper.isVisible = false;
  //     this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentsOptional")+")";
  //   }
  //  if (this.fileNames.length >= maxAttachmentsAllowed) {
  //    this.view.flxTitleWrapper.isVisible = true;
  //     this.view.flxAttachFile.setVisibility(false);
  //    this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+this.fileNames.length+"/"+maxAttachmentsAllowed+")";
  //    applicationManager.getPresentationUtility().dismissLoadingScreen();
  //   } else{
  //     this.view.flxAttachFile.setVisibility(true);
  //      if (this.fileNames.length === 0){
  //        this.view.flxTitleWrapper.isVisible = false;
  //      }
  //     else{
  //       this.view.flxTitleWrapper.isVisible = true;
  //       this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+this.fileNames.length+"/"+maxAttachmentsAllowed+")";
  //     }
  //   }
    this.hideFileSelectionOption();
    // this.view.lblAttachmentError.text = "";
    // this.view.lblAttachmentError.setVisibility(false);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
    removeAttachment: function (index) {
      var segData = this.view.segAttachments.data;
      if(index ===0 && segData.length ===1){
        this.view.segAttachments.isVisible = false;
      }
      segData.splice(index,1);
      this.view.segAttachments.setData(segData);
      this.fileContents.splice(index,1);
      this.fileNames.splice(index, 1);
      this.fileTypes.splice(index, 1);
      
    },
  
  showFileSelectionOption: function () {
   var data = this.view.segAttachments.data;
   //this.segmentData++;
   this.view.flxAttachmentError.setVisibility(false)
    if(!kony.sdk.isNullOrUndefined(data) && data.length>=5){
      this.view.flxActions.setVisibility(false);
      this.view.flxAttachmentError.setVisibility(true);
      this.view.lblAttachmentError.text = "Exceeded Maximum No. of Files."; 
    }
    else{
      this.view.flxActions.setVisibility(true);
    }
  },

  hideFileSelectionOption: function () {
    this.view.flxActions.setVisibility(false);
  },
  showAcknowledge: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
      var closingReason = navManager.getCustomInfo("AccountClosureReason");
    payload = {};
    payload.accountName = this.account.nickName;;
    payload.accountNumber =this.account.accountID;
    payload.accountType =this.account.accountType;
    payload.currentBalance =this.account.currentBalance;
    payload.currencyCode = this.account.currencyCode;
    payload.IBAN = this.account.IBAN;
    payload.supportingDocumentData = "";
    payload.closingReason = closingReason;
    if(this.fileContents.length==0){
    var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accMod.presentationController.submitClosureRequest(payload);
    }
    else{
      var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
      accMod.presentationController.uploadDocumentsMB(this.fileContents,payload);
      }
  },
  navigateToAccountClosureAck: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({
          "friendlyName": "AccountUIModule/frmAccountClosureAck",
          "appName": "ArrangementsMA"
      });
  },
  navigateToAccountClosureReason: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({
          "friendlyName": "AccountUIModule/frmAccountClosureReason",
          "appName": "ArrangementsMA"
      });
  },
  };
});