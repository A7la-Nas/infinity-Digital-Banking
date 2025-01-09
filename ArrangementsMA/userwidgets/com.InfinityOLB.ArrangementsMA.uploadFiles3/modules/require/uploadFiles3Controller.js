define(function () {
  return {
    config: {
      selectMultipleFiles: true,
      filter: [
        "image/png",
        "application/msword",
        "image/jpeg",
        "application/pdf",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    },
    parentComp : null,
    browsedFiles: [],
    filesAdded :0,
    fileSelectedCallback : null,
    uploadFilesCallback : null,
    uploadFilesDocCallback : null,
    downloadCallback : null,
    removeFileCallback : null,
    deleteEvidenceCallback: null,
    checkEvidenceCallback: null,
    removeFileUpdateCallback: null,
    submitCallback : null,
    inErrorState : false,
    oldFileInfo : [],
    changedFiles: [],
    unchangedFiles: [],
    removedCount:0,
    nameDrop: "",
    appFulfilmentID : "",
    evidenceID : "",
    appEvidenceID: "",
    commonErrorMsg: "",
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this._maxFilesCount = 5;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function (){
      defineGetter(this, 'maxFilesCount', () => {
        return this._maxFilesCount;
      });
      defineSetter(this, 'maxFilesCount', value => {
        this._maxFilesCount = value;
      });
    },
    compPreShow: function () {
      this.setActions();
      this.view.lblCompError.setVisibility(false);
      ////this.view.flxUploadFiles.setVisibility(true);
      this.view.flx.setVisibility(false);
      if (this.view.flxFiles.widgets().length > 0 && kony.application.getCurrentForm().id === "frmDocument") {
        //this.view.flxUploadBtn.setVisibility(true)
        for (var j=0; j<this.parentComp.view.flxComponents.widgets().length; j++){
          if (this.parentComp.view.flxComponents.widgets()[j].Name.includes("dropdownController")){
            this.parentComp.view.flxComponents.widgets()[j].setEnabled(false);
            break;
          }
        }
        for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
          let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
          this.view["clone" + id + "atxFile"].setReadOnly();
        }
      } else {
        //this.view.flxUploadBtn.setVisibility(false);
      }
    },
    attachmentFocus: function(){
     this.view.flxDocsUF.setActive(true);
    },
    setActions: function () {
      this.view.flxUploadFiles.flxDocsUF.onClick = this.openFileManager;
      this.view.btnUpload.onClick = this.uploadFiles.bind(this);
      this.view.onBreakpointChange = this.onBreakpointChange;
    },
	attachmentsetActive: function() {
            this.view.flxDocsUF.setActive(true);
        },
    setData: function (data) {
      //this.view.flxUploadFiles.setVisibility(true);
      if (data.title) {
        this.view.lblUploadDocumnet.text = data.title;
      }
      if (data.description) {
        this.view.lblUploadDescription.text = data.description;
      }
      if (data.config) {
        this.config = data.config;
      }
      if (data.fileSelectedCallback) {
        this.fileSelectedCallback = data.fileSelectedCallback;
      }
      if (data.uploadFilesCallback) {
        this.uploadFilesCallback = data.uploadFilesCallback;
      }
      if (data.uploadFilesDocCallback) {
        this.uploadFilesDocCallback = data.uploadFilesDocCallback;
      }
      if (data.uploadFilesCallback) {
        this.uploadFilesDocCallback = data.uploadFilesCallback;
      }
      if(data.filesData){
        this.setFilesData(data.filesData);
      }
    if(data.fileData){
        this.setFileData(data.fileData);
      }
      if (data.downloadCallback) {
        this.downloadCallback = data.downloadCallback;
      }
      if (data.removeFileCallback) {
        this.removeFileCallback = data.removeFileCallback;
      } 
      if (data.deleteEvidenceCallback) {
        this.deleteEvidenceCallback = data.deleteEvidenceCallback;
      }
      if (data.checkEvidenceCallback) {
        this.checkEvidenceCallback = data.checkEvidenceCallback;
      }
      if (data.removeFileUpdateCallback) {
        this.removeFileUpdateCallback = data.removeFileUpdateCallback;
      }
      if (data.removeFileDropdownCallback) {
        this.removeFileDropdownCallback = data.removeFileDropdownCallback;
      }
      if(data.submitCallback){
        this.submitCallback = data.submitCallback;
      }
      if(data.maxFilesCount){
        this._maxFilesCount = data.maxFilesCount;
      }
      if(data.parentComp !== null && data.parentComp !== undefined){
        this.parentComp = data.parentComp;
      }
      if(data.fulfilmentId && data.fulfilmentId != ""){
        this.appFulfilmentID = data.fulfilmentId;
      }
    },
    getData: function () {
      var data = [];
      for(var i=0;i<this.view.flxFiles.widgets().length;i++){
        data.push(this.view.flxFiles.widgets()[i].browsedFile);
      }
      return data;
    },
    
    // for resume flow
    //data [{"fileObj":{"documentName":"Sample.jpg"},documentDescription : "file a added",clientDocID : "1234567890"}]
    setFilesData : function(data){
      for( var i=0;i<data.length;i++){
        this.cloneFile();
        var fileInfo = [];
        fileInfo[0] = data[i].fileObj;
        fileInfo[1] = data[i].documentDescription;
        fileInfo[2] = data[i].clientDocID;

        fileInfo[3] = data[i].isEvidenceValid;
        fileInfo[4] = data[i].appFulfilmentId;
        fileInfo[5] = data[i].evidenceId;
        fileInfo[6] = data[i].appEvidenceId;

        if(data[i].documentTitle !== "" && data[i].documentTitle !== undefined){
          this.view.lblDocumentTitle.isVisible = true;
          this.view.lblDocumentTitle.text = data[i].documentTitle;
        }else{
          this.view.lblDocumentTitle.isVisible = false;
          this.view.lblDocumentTitle.text = "";
        }
        this.view["clone"+this.filesAdded+"lblFileName"].text = data[i].fileObj.documentName;
        this.view["clone"+this.filesAdded+"flx"].setVisibility(true);
        var evidenceValid = data[i].isEvidenceValid;
        this.appFulfilmentID = data[i].appFulfilmentId;
        this.evidenceID = data[i].evidenceId;
        this.appEvidenceID = data[i].appEvidenceId;
        if(evidenceValid === "valid"){
          this.view.lblAlert.text = kony.i18n.getLocalizedString("i18n.documents.alert2");
          this.view.lblAlert.skin = "lblTitle13Green";
          this.view.flxAlert.setVisibility(true);
        }else
          if(evidenceValid === "inValid"){
            this.view.lblAlert.text= kony.i18n.getLocalizedString("i18n.documents.alert1");
            this.view.lblAlert.skin = "lblError13";
            this.view.flxAlert.setVisibility(true);
          }else{
            this.view.flxAlert.setVisibility(false);
          }
        this.view["clone"+this.filesAdded+"flx"].browsedFile = fileInfo; // need fileInfo to see in getData
        if(data[i] && data[i].documentDescription){
          this.view["clone" + this.filesAdded + "atxFile"].setText(data[i].documentDescription);
        }
        else{
          this.view["clone" + this.filesAdded + "flxFileInfo"].setVisibility(false);
        }
        this.view["clone"+this.filesAdded+"flxImg"].setVisibility(true);
        this.view["clone"+this.filesAdded+"flxClose"].setVisibility(false);
        this.view["clone"+this.filesAdded+"flxDownload"].setVisibility(false);
        this.view["clone"+this.filesAdded+"flx"].uniqueId = data[i].clientDocID;
        this.view["clone"+this.filesAdded+"flx"].isError = data[i].isError;
        this.view["clone"+this.filesAdded+"flx"].isUpload = true;
        this.view["clone"+this.filesAdded+"flx"].appFulfilmentId = data[i].appFulfilmentId;
        this.view["clone"+this.filesAdded+"flx"].appEvidenceId = data[i].appEvidenceId;
        this.view["clone"+this.filesAdded+"flx"].evidenceId = data[i].evidenceId;
        this.view["clone"+this.filesAdded+"flx"].isEvidenceValid = data[i].isEvidenceValid;
        if(data[0].status === "submitted"){
          this.view["clone"+this.filesAdded+"flxImg"].setVisibility(false);
          this.view["clone"+this.filesAdded+"flxDownload"].setVisibility(true);
          this.view["clone"+this.filesAdded+"flxDownload"].onClick = this.downloadFile.bind(this,this.view["clone"+this.filesAdded+"flx"]);
          //this.view.flxUploadFiles.setVisibility(false);
      //this.view.flxUploadBtn.setVisibility(false);
        }
        else if(data[0].status === "open"){
          this.view["clone"+this.filesAdded+"flxImg"].setVisibility(true);
          this.view["clone"+this.filesAdded+"flxDownload"].setVisibility(false);
          this.view["clone"+this.filesAdded+"img"].src = "greentick.png";
           this.view["clone" + this.filesAdded + "flxClose"].setVisibility(true);
           this.view["clone" + this.filesAdded + "flxClose"].onClick = this.checkEvidence.bind(this, this.view["clone" + this.filesAdded + "flx"]);

           this.view["clone" + this.filesAdded + "flxClose"].accessibilityConfig= {
            "a11yLabel":"Remove Attachment "+ this.view["clone" + this.filesAdded + "lblFileName"].text,
            "a11yARIA":{
              "role":"button",
              "tabindex":0
            }
           }
        }
        this.view["clone"+this.filesAdded+"flxClose"].setVisibility(false);
        if(data[0].status === "removable"){
          this.view["clone"+this.filesAdded+"flxImg"].setVisibility(false);
          this.view["clone"+this.filesAdded+"flxDownload"].setVisibility(true);
          this.view["clone"+this.filesAdded+"flxDownload"].onClick = this.downloadFile.bind(this,this.view["clone"+this.filesAdded+"flx"]);
          this.view["clone"+this.filesAdded+"flxClose"].setVisibility(false);
          this.view["clone"+this.filesAdded+"flxClose"].onClick = this.checkEvidence.bind(this,this.view["clone"+this.filesAdded+"flx"]);
          this.view["clone" + this.filesAdded + "flxClose"].accessibilityConfig= {
            "a11yLabel":"Remove Attachment "+ this.view["clone" + this.filesAdded + "lblFileName"].text,
            "a11yARIA":{
              "role":"button",
              "tabindex":0
            }
           }
          //this.view.flxUploadFiles.setVisibility(false);
          //this.view.flxUploadBtn.setVisibility(false);
        }
        // this.view["clone"+this.filesAdded+"atxFile"].setReadOnly();

      }
      if (kony.application.getCurrentBreakpoint() <= 640)
        for (var n = 0; n < this.view.flxFiles.widgets().length; n++) {
          let e = this.view.flxFiles.widgets()[n].id.replace(/([A-Z]|[a-z])/g, "");
          this.view["clone" + e + "flxFile"].right = "0dp";
          this.view["clone" + e + "flxInfoAtbx"].left = "0dp";
          if(this.view.lblDocumentTitle.text){
            this.view["clone" + e + "flx"].top = "10dp";
          }
          else{
            this.view["clone" + e + "flx"].top = "0dp";
          }
        }
      else
        for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
          let e = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
          this.view["clone" + e + "flxFile"].right = "10dp";
          this.view["clone" + e + "flxInfoAtbx"].left = "15dp";
          if(this.view.lblDocumentTitle.text){
            this.view["clone" + e + "flx"].top = "0dp";
          }
          else{
            this.view["clone" + e + "flx"].top = "-5dp";
          }
        }
      this.setReadWrite();
    },
  //
  setFileData : function(data){
      this.cloneFile();
      var fileInfo = [];
      fileInfo[0] = data[i].fileObj;
      fileInfo[1] = data[i].documentDescription;
      fileInfo[2] = data[i].clientDocID;
      fileInfo[3] = data[i].userActionType;
      if (data[i].documentTitle !== "") {
        this.view.lblDocumentTitle.isVisible = true;
        this.view.lblDocumentTitle.text = data[i].documentTitle;
      } else {
        this.view.lblDocumentTitle.isVisible = false;
        this.view.lblDocumentTitle.text = "";
      }
      this.view["clone" + this.filesAdded + "lblFileName"].text = data[i].fileObj.documentName;
      this.view["clone" + this.filesAdded + "flx"].setVisibility(true);
      this.view["clone" + this.filesAdded + "flx"].browsedFile = fileInfo; // need fileInfo to see in getData
      this.view["clone" + this.filesAdded + "atxFile"].setText(data[i].documentDescription);
      this.view["clone" + this.filesAdded + "flx"].isError = data[i].isError;
      this.view["clone" + this.filesAdded + "flx"].isUpload = true;
      this.view["clone" + this.filesAdded + "flxClose"].setVisibility(false);
      this.view["clone" + this.filesAdded + "atxFile"].setReadOnly();
      this.view["clone" + this.filesAdded + "flxImg"].setVisibility(false);
      this.view["clone" + this.filesAdded + "flxDownload"].setVisibility(true);
      this.view["clone" + this.filesAdded + "flxDownload"].onClick = this.downloadFile.bind(this, this.view["clone" + this.filesAdded + "flx"]);
      //this.view.flxUploadFiles.setVisibility(false);
      //this.view.flxUploadBtn.setVisibility(false);
    },
    
    cloneFile : function(){
      var FileNumber = this.filesAdded+1;
      var fileClone = this.view.flx.clone("clone"+FileNumber);
      this.view.flxFiles.add(fileClone);
      var frm=kony.application.getCurrentForm();
      if (frm.id === "frmConfirmClosure") {
        if (kony.os.deviceInfo().screenHeight < 200) {
          frm.formAccountClosure.flxContentTCCenter.flxSelectRepaymentDay.height = this.view.flxFiles.widgets().length * 80 + 340 + "dp";
        }
      }
      this.view["clone" + FileNumber + "atxFile"].tbxAnimatedKA.maxTextLength = 30;
      this.view.lblCompError.setVisibility(false);
      this.view.flx.setVisibility(false);
      this.filesAdded++;
    },
    openFileManager: function () {
      kony.io.FileSystem.browse(this.config, this.selectedFileCallback);
    },
    selectedFileCallback: function (...args) {
        var isFileValid = true;
        var fileNameLength = 51;
      for(var itr in args[1]){
        if (!this.config["filter"].includes(args[1][itr]["file"]["type"])) {
          isFileValid=false;
          this.commonErrorMsg = "Invalid File Type Selected";
        }else if(args[1][itr]["file"]["size"] > 2000000){
          isFileValid=false;
          this.commonErrorMsg = "The file size exceeds the maximum limit. Please make sure that the file you are uploading doesn’t exceed 2MB.";
        }
        else if(args[1][itr].name.length>fileNameLength){
          isFileValid=false;
          this.commonErrorMsg = "File name should contain less than 50 letters.";
        }else{
          var filename = args[1][itr].name;
          var filenameWOext = filename.substring(0,filename.lastIndexOf("."));
          var myRegEx  = /[^a-zA-Z0-9\d]/i;
          var notValid = (myRegEx.test(filenameWOext));
          if(notValid){
              isFileValid = false;
              this.commonErrorMsg = "File name should contain only alphanumeric characters";
          }
        }
      }
      if((this.view.flxFiles.widgets().length+args[1].length)<= this._maxFilesCount && isFileValid){
        var filesSelected =[];
        for(var i=0;i<args[1].length;i++){
          let newFile =[];
          newFile[0] = args[1][i];
          newFile[1]= "";
          newFile[2] = "";
          let fileProps = this.updateDocFile(newFile);
          filesSelected.push(fileProps);
        }
        if(this.fileSelectedCallback!== null && this.fileSelectedCallback!== undefined){
          this.fileSelectedCallback(filesSelected,this.fileSelectedSuccessView,this.fileSelectedErrorView);
        }
        this.view.lblCompError.setVisibility(false);
          this.view.forceLayout();
      }
      else{
        // added dummy error text 
        if(isFileValid === false){
          this.setCommonError(this.commonErrorMsg);
        }
        else{
          this.setCommonError("You can add only " + this._maxFilesCount+" files.");
        }
      }
    },
    fileSelectedSuccessView : function(){
      this.checkErrorState();
      if(this.inErrorState != true){
        //this.view.flxUploadBtn.setVisibility(true);
        this.view.flxUploadFiles.setEnabled(true);
        this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.1");
        this.view.lblUploadDocumnet.skin = "lblTitle15";
        this.view.forceLayout();
        
     }else{
      //this.view.flxUploadBtn.setVisibility(false);
      this.view.forceLayout();
     }
    },
    fileSelectedErrorView : function(fileID,errorText){
        for(var i = 0;i<this.view.flxFiles.widgets().length; i++){
          if(this.view.flxFiles.widgets()[i].uniqueId === fileID){
            let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
            this.view["clone"+id+"flxClose" ].setVisibility(true);
            this.view["clone"+id+"flxDownload"].setVisibility(false);
            this.view["clone"+id+"flxImg"].setVisibility(false);
            this.view["clone"+id+"flx"].isError = true;
            this.view["clone"+id+"flx"].isVisible = true;
            this.view["clone"+id+"flxError"].isVisible = true;
            this.view["clone"+id+"lblError"].text = errorText;
          }
        }
      this.inErrorState = true;
    },
    updateDocFile: function (nextFile) {
      var data = {
        placeholder : kony.i18n.getLocalizedString("com.dbx.uploadFiles3.atxFile.lblAnimatedKA.text.1"),
        text: nextFile[0].name
      };
      var dt = new Date();
      var uniqueId = dt.getTime();
      nextFile[2] =  uniqueId;
      this.cloneFile();
      this.view["clone"+this.filesAdded+"lblFileName"].text = nextFile[0].name;
      this.view["clone" + this.filesAdded + "imgFile"].src=nextFile[0].file.type==='application/pdf'?"pdf.png" :"jpeg_image.png";
      this.view["clone"+this.filesAdded+"flx"].setVisibility(true);
      this.view["clone"+this.filesAdded+"flx"].browsedFile = nextFile;
      this.view["clone"+this.filesAdded+"flx"].uniqueId = uniqueId;
      this.view["clone"+this.filesAdded+"flx"].isError = false;
      this.view["clone"+this.filesAdded+"flx"].isUpload = false;
      this.view["clone"+this.filesAdded+"atxFile"].setData(data);
      this.view["clone"+this.filesAdded+"atxFile"].eventCallback = this.updateBrowseFileData.bind(this,this.view["clone"+this.filesAdded+"atxFile"],this.view["clone"+this.filesAdded+"flx"]);
      this.view["clone"+this.filesAdded+"atxFile"].onDoneCallback = this.updateBrowseFileData.bind(this,this.view["clone"+this.filesAdded+"atxFile"],this.view["clone"+this.filesAdded+"flx"]);
      this.view["clone"+this.filesAdded+"flxClose"].setVisibility(true);
      this.view["clone"+this.filesAdded+"flxDownload"].setVisibility(false);
      this.view["clone"+this.filesAdded+"flxImg"].setVisibility(false);
      this.view["clone"+this.filesAdded+"flxError"].setVisibility(false);
      this.view["clone"+this.filesAdded+"flxClose"].onClick = this.checkEvidence.bind(this,this.view["clone"+this.filesAdded+"flx"]);
      this.view["clone" + this.filesAdded + "flxClose"].accessibilityConfig= {
        "a11yLabel":"Remove Attachment "+ this.view["clone" + this.filesAdded + "lblFileName"].text,
        "a11yARIA":{
          "role":"button",
          "tabindex":0
        }
       }
      this.view["clone"+this.filesAdded+"flxDownload"].onClick = this.downloadFile.bind(this,this.view["clone"+this.filesAdded+"flx"]);
      this.view["clone" + this.filesAdded + "flx"].browsedFile[1] = this.view["clone" + this.filesAdded + "atxFile"].getData();
      this.view.forceLayout();
      return this.view["clone"+this.filesAdded+"flx"].browsedFile;
    },
    downloadFile : function(widgetRef){
      var formID = kony.application.getCurrentForm().id;
      kony.print("file to download ");
      if(this.downloadCallback!==null && this.downloadCallback!== undefined){
        if(formID==='frmUserActions'){
          for (var jtr = 0; jtr < this.view.flxFiles.widgets().length; jtr++) {
            let id = this.view.flxFiles.widgets()[jtr].id.replace(/([A-Z]|[a-z])/g, "");
            this.view["clone" + id + "img"].src = "loadingfile.gif";
            this.view["clone" + id + "flxClose"].setVisibility(false);
            this.view["clone" + id + "flxDownload"].setVisibility(false);
            this.view["clone" + id + "flxImg"].setVisibility(true);
            this.view["clone" + id + "atxFile"].setReadOnly();
          }
        }
       this.downloadCallback(widgetRef.browsedFile,this.downloadSucessView,this.downloadErrorView);
      }
    },
    downloadErrorView : function(fileID,errorText){
      for(var fileWidgets = 0; fileWidgets< this.view.flxFiles.widgets().length;fileWidgets++){
        if(fileID === this.view.flxFiles.widgets()[fileWidgets].uniqueId){
           let id = this.view.flxFiles.widgets()[fileWidgets].id.replace(/([A-Z]|[a-z])/g, "");
          this.view["clone"+id+"flxClose" ].setVisibility(false);
          this.view["clone"+id+"flxDownload"].setVisibility(false);
          this.view["clone"+id+"flxImg"].setVisibility(true);
          this.view["clone"+id+"img"].src = "file_error.png";
          this.view["clone"+id+"flxError"].setVisibility(true);
          this.view["clone"+id+"flxError"].text = errorText;
        }
      }
    },
    downloadSucessView : function(){
      //  Changes for UserAction form
    var formID = kony.application.getCurrentForm().id;
      if(formID==='frmUserActions'){
        for (var jtr = 0; jtr < this.view.flxFiles.widgets().length; jtr++) {
          let id = this.view.flxFiles.widgets()[jtr].id.replace(/([A-Z]|[a-z])/g, "");
          this.view["clone" + id + "flxImg"].setVisibility(false);
          this.view["clone" + id + "flxClose"].setVisibility(false);
          this.view["clone" + id + "flxDownload"].setVisibility(true);
        }
      }
    },
    updateBrowseFileData : function(atxRef,fileRef){
      var fileInfo = atxRef.getData();
      fileRef.browsedFile[1] = fileInfo;
    },
    removeAllDocs: function(){
        this.view.flxFiles.removeAll();
    },
    removeDoc: function (widgetref) {
       if(this.removeFileCallback!== null && this.removeFileCallback!== undefined){
        this.removeFileCallback(this.getData(),widgetref.uniqueId,this.removeSuccess.bind(this,widgetref),this.removeFailure,this.removeSuccessDocument.bind(this,widgetref),widgetref.isUpload,this.parentComp);
      }
    },
     
    
    checkEvidence: function (widgetref) {
      if(this.appFulfilmentID === undefined || this.appFulfilmentID === null || this.appFulfilmentID == "" ){
        this.removeDoc(widgetref);
      }else{
        if(widgetref.browsedFile[3]=='valid'){
          if(this.checkEvidenceCallback!== null && this.checkEvidenceCallback!== undefined){
            this.checkEvidenceCallback(this.getData(),widgetref.uniqueId,this.removeSuccess.bind(this,widgetref),this.removeFailure,this.removeSuccessDocument.bind(this,widgetref),widgetref.isUpload,this.parentComp);
          }
        }
        else{
          if(this.deleteEvidenceCallback!== null && this.deleteEvidenceCallback!== undefined){
            this.deleteEvidenceCallback(this.getData(),widgetref.uniqueId,this.removeSuccess.bind(this,widgetref),this.removeFailure,this.removeSuccessDocument.bind(this,widgetref),widgetref.isUpload,this.parentComp);
          }
        } 
      }
    },


    removeDropdownDoc: function () {
      for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
      if(this.removeFileCallback!== null && this.removeFileCallback!== undefined){
       this.removeFileDropdownCallback(this.getData(),this.view.flxFiles.widgets()[i].uniqueId,this.removeDropwdownDocumentSuccess.bind(this,this.view.flxFiles.widgets()[i]),this.removeFailure,this.removeDropwdownDocumentSuccess.bind(this,this.view.flxFiles.widgets()[i]),this.view.flxFiles.widgets()[i].isUpload,this.parentComp,this.appFulfilmentID);
     }
    }
   },
    removeEditDoc: function (widgetref) {
      if (this.view.btnUpload!=undefined && this.view.btnUpload.text == kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.3")){
        this.removeFileUpdateCallback(this.getData(),widgetref.uniqueId,this.removeEditSuccess.bind(this,widgetref),this.removeEditFailure,this.removeSuccessEditDocument.bind(this,widgetref),widgetref.isUpload,this.parentComp,this.appFulfilmentID);
      }
    },
    removeDropdownDocSuccess : function(widgetref){
      this.view.flxFiles.remove(widgetref)
     if(this.getRemainingFiles().length >=1){
       //this.view.flxUploadBtn.setVisibility(true);
     }
     else{
       //this.view.flxUploadBtn.setVisibility(true);
     }
     //this.view.flxUploadFiles.setVisibility(true);
   },
    removeEditSuccess : function(widgetref){
      this.view.flxFiles.remove(widgetref)
     if(this.getRemainingFiles().length >=1){
       //this.view.flxUploadBtn.setVisibility(true);
     }
     else{
       //this.view.flxUploadBtn.setVisibility(true);
     }
     //this.view.flxUploadFiles.setVisibility(true);
   },
   removeDropwdownDocumentSuccess : function(widgetref){
    this.view.flxFiles.remove(widgetref);
    if(this.view.flxFiles.widgets().length ==0){
      //this.view.flxUploadFiles.setVisibility(true);
      this.view.flxUploadFiles.setEnabled(true);
      this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.1");
      this.view.lblUploadDocumnet.skin = "lblTitle15";
      //this.view.flxUploadBtn.setVisibility(false);   
    }
  },
   removeSuccessEditDocument : function(widgetref){
     this.removedCount = this.removedCount+1;
      if(this.removedCount== this.view.flxFiles.widgets().length )
           this.uploadFilesDocCallback(this.changedFiles, this.unchangedFiles, this.fileUploadSucessView, this.fileUploadErrorView, this.parentComp, this.onDocSubmit, this.showUploadBtn,this.appFulfilmentID);
     
   },
   removeEditFailure : function(){
     // no change 
   },
    removeSuccess : function(widgetref){
      this.view.flxFiles.remove(widgetref);
      var frm = kony.application.getCurrentForm();
      if (frm.id === "frmConfirmClosure") {
        if (kony.os.deviceInfo().screenHeight < 200) {
          frm.formAccountClosure.flxContentTCCenter.flxSelectRepaymentDay.height = this.view.flxFiles.widgets().length * 80 + 340 + "dp";
        }
      }
      this.view.flxAlert.isVisible=false;
      //this.view.flxUploadFiles.setVisibility(true);
//       if(this.view.flxFiles.widgets().length ==0){
//         //this.view.flxUploadFiles.setVisibility(true);
//         this.view.flxUploadFiles.setEnabled(true);
//         this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.1");
//         this.view.lblUploadDocumnet.skin = "lblTitle15";
//         //this.view.flxUploadBtn.setVisibility(false);   
//       }else{
//         var formID = kony.application.getCurrentForm().id;
//         //this.view.flxUploadFiles.setVisibility(true);
//         this.view.flxUploadFiles.setEnabled(true);
//         this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.2");
//         this.view.lblUploadDocumnet.skin = "lblTitle15";
//         //this.view.flxUploadBtn.setVisibility(true);
//         for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
//           let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
//           this.view["clone" + id + "flxClose"].setVisibility(false);
//           // for now, making it delete, needs to be changed for download
// //           this.view["clone" + id + "flxImg"].setVisibility(false);
// //           this.view["clone" + id + "flxDownload"].setVisibility(true);
//           if(formID==='frmUserActions'){
//               this.view["clone" + id + "flxImg"].setVisibility(true);
//               this.view["clone" + id + "flxDownload"].setVisibility(false);
//               this.view["clone"+id+"img"].src = "greentick.png";
//             }else{
//               this.view["clone" + id + "flxImg"].setVisibility(false);
//               this.view["clone" + id + "flxDownload"].setVisibility(true);
//             }
//           this.view["clone" + id + "flxError"].isVisible = false;
//         }
//         this.setReadWrite();   
//       }
      this.checkErrorState();
      if(this.inErrorState == false){
        //this.view.flxUploadFiles.setVisibility(true);
        this.view.flxUploadFiles.setEnabled(true);
        if(this.view.flxFiles.widgets().length>0){
          this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.2");
          //this.view.flxUploadBtn.setVisibility(true);
        }else{
          this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.1");
          //this.view.flxUploadBtn.setVisibility(false);
        }
        this.view.lblUploadDocumnet.skin = "lblTitle15";
        
      }
    },
    removeSuccessDocument : function(widgetref){
      this.view.flxFiles.remove(widgetref)
      //this.view.flxUploadFiles.setVisibility(true);
      if(this.view.flxFiles.widgets().length ==0){
        //this.view.flxUploadFiles.setVisibility(true);
        this.view.flxUploadFiles.setEnabled(true);
        this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.1");
        this.view.lblUploadDocumnet.skin = "lblTitle15";
        //this.view.flxUploadBtn.setVisibility(false);   
      }else{
        var formID = kony.application.getCurrentForm().id;
        //this.view.flxUploadFiles.setVisibility(true);
        this.view.flxUploadFiles.setEnabled(true);
        this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.2");
        this.view.lblUploadDocumnet.skin = "lblTitle15";
        //this.view.flxUploadBtn.setVisibility(true);
        for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
          let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
          this.view["clone" + id + "flxClose"].setVisibility(false);
          // for now, making it delete, needs to be changed for download
//           this.view["clone" + id + "flxImg"].setVisibility(false);
//           this.view["clone" + id + "flxDownload"].setVisibility(true);
          if(formID==='frmUserActions'){
              this.view["clone" + id + "flxImg"].setVisibility(true);
              this.view["clone" + id + "flxDownload"].setVisibility(false);
              this.view["clone"+id+"img"].src = "greentick.png";
            }else{
              this.view["clone" + id + "flxImg"].setVisibility(false);
              this.view["clone" + id + "flxDownload"].setVisibility(true);
            }
          this.view["clone" + id + "flxError"].isVisible = false;
        }
        this.setReadWrite();   
      }
    
    },
    removeFailure : function(){
      // no change 
    },
    updateDescription : function(descriptiontText){
      this.view.lblUploadDescription.text = descriptiontText;
    },
    uploadFiles : function(){
      if (this.view.btnUpload.text == kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.1")) {
        //this.view.flxUploadBtn.setVisibility(false);
        for (var j=0; j<this.parentComp.view.flxComponents.widgets().length; j++){
          if (this.parentComp.view.flxComponents.widgets()[j].Name.includes("dropdownController")){
            this.parentComp.view.flxComponents.widgets()[j].hideDropdown();
            this.parentComp.view.flxComponents.widgets()[j].setEnabled(false);
            break;
          }
        }
        var filesToUpload = this.getRemainingFiles();
        var filesUploaded = this.getUploadedFiles();
        if (this.uploadFilesDocCallback !== null && this.uploadFilesDocCallback !== undefined) {
            for (var jtr = 0; jtr < this.view.flxFiles.widgets().length; jtr++) {
                let id = this.view.flxFiles.widgets()[jtr].id.replace(/([A-Z]|[a-z])/g, "");
                this.view["clone" + id + "img"].src = "loadingfile.gif";
                this.view["clone" + id + "flxClose"].setVisibility(false);
                this.view["clone" + id + "flxDownload"].setVisibility(false);
                this.view["clone" + id + "flxImg"].setVisibility(true);
                this.view["clone" + id + "atxFile"].setReadOnly();
            }
            this.uploadFilesDocCallback(filesToUpload, filesUploaded, this.fileUploadSucessView, this.fileUploadErrorView, this.parentComp, this.onDocSubmit, this.showUploadBtn,this.appFulfilmentID);
            return;
        }
        for (var i = 0; i < filesToUpload.length; i++) {
            for (var j = 0; j < this.view.flxFiles.widgets().length; j++) {
                if (filesToUpload[i][2] === this.view.flxFiles.widgets()[j].uniqueId) {
                    let id = this.view.flxFiles.widgets()[j].id.replace(/([A-Z]|[a-z])/g, "");
                    this.view["clone" + id + "img"].src = "loadingfile.gif";
                    this.view["clone" + id + "flxClose"].setVisibility(false);
                    this.view["clone" + id + "flxDownload"].setVisibility(false);
                    this.view["clone" + id + "flxImg"].setVisibility(true);
                    this.view["clone" + id + "atxFile"].setReadOnly();
                }
            }
        }
        if (this.uploadFilesCallback !== null && this.uploadFilesCallback !== undefined) {
            this.uploadFilesCallback(filesToUpload, filesUploaded, this.fileUploadSucessView, this.fileUploadErrorView, this.parentComp, this.onDocSubmit, this.showUploadBtn);
        }
    } else if (this.view.btnUpload.text == kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.2")) {
       
        var filesUploaded = this.getUploadedFiles();
        this.oldFileInfo = [];
        for (var j=0; j<this.parentComp.view.flxComponents.widgets().length; j++){
          if (this.parentComp.view.flxComponents.widgets()[j].Name.includes("dropdownController")){
            this.parentComp.view.flxComponents.widgets()[j].setEnabled(true);
            this.nameDrop = this.parentComp.view.flxComponents.widgets()[j].lblSelectedValue.text;
            break;
          }
        }
        for(var i=0;i<filesUploaded.length;i++){
            this.oldFileInfo.push(filesUploaded[i][1]);
        }
        for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
            let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
            this.view["clone" + id + "flxClose"].setVisibility(true);
            if (kony.application.getCurrentForm().id === "frmDocument"){
              this.view["clone" + id + "imgClose"].src = "file_error.png";
              this.view["clone" + id + "imgClose"].src = "closeicon.png";
            }
            // for now, making it delete, needs to be changed for download
            this.view["clone" + id + "flxImg"].setVisibility(false);
            this.view["clone" + id + "flxDownload"].setVisibility(false);
            this.view["clone" + id + "flxError"].isVisible = false;
            this.view["clone" + id + "atxFile"].setReadWrite();
        }
        this.view.flxUploadFiles.setEnabled(false);
        this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.3");
        this.view.lblUploadDocumnet.skin = "lblTitle15Grey";
        this.view.imgUpload.opacity=0.5;
        //this.view.flxUploadBtn.setVisibility(true);
    } else {
        var files = this.getUploadedFiles();
        //test1ng
        this.changedFiles=[];
        this.unchangedFiles=[];
        for (var j=0; j<this.parentComp.view.flxComponents.widgets().length; j++){
          if (this.parentComp.view.flxComponents.widgets()[j].Name.includes("dropdownController")){
            this.parentComp.view.flxComponents.widgets()[j].hideDropdown();
            this.parentComp.view.flxComponents.widgets()[j].setEnabled(false);
            break;
          }
        }
        for(var i=0;i<this.oldFileInfo.length;i++){
            if (this.oldFileInfo[i]!= files[i][1]) {
                    this.changedFiles.push(files[i]);
                    let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
                    this.view["clone" + id + "img"].src = "loadingfile.gif";
                    this.view["clone" + id + "flxClose"].setVisibility(false);
                    this.view["clone" + id + "flxDownload"].setVisibility(false);
                    this.view["clone" + id + "flxImg"].setVisibility(true);
                    this.view["clone" + id + "atxFile"].setReadOnly();
            }
            
        }
        if(this.changedFiles.length>0){
          this.removedCount=0;
          for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
            this.removeEditDoc(this.view.flxFiles.widgets()[i]);

         }
       
        }
        else{
          
          var formID = kony.application.getCurrentForm().id;
          for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
            let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
            this.view["clone" + id + "flxClose"].setVisibility(false);
            // for now, making it delete, needs to be changed for download
            if(formID==='frmUserActions'){
              this.view["clone" + id + "flxImg"].setVisibility(true);
              this.view["clone" + id + "flxDownload"].setVisibility(false);
              this.view["clone"+id+"img"].src = "greentick.png";
            }else{
              this.view["clone" + id + "flxImg"].setVisibility(false);
              this.view["clone" + id + "flxDownload"].setVisibility(true);
            }
            this.view["clone" + id + "flxError"].isVisible = false;
          }
          this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.2");
          this.view.flxUploadFiles.setEnabled(true);
          this.view.lblUploadDocumnet.skin = "lblTitle15";
          this.view.imgUpload.opacity=1;
          //this.view.flxUploadBtn.setVisibility(true);
          this.setReadWrite();
          for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
            let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
            this.view["clone" + id + "atxFile"].setReadOnly();
          }
        }
    }
      
    },
    
    showUploadBtn: function(){
      //this.view.flxUploadBtn.setVisibility(true);
    },
    
    getRemainingFiles : function(){
      var filesToUpload = [];
        for(var i=0;i<this.view.flxFiles.widgets().length;i++){
        if(!this.view.flxFiles.widgets()[i].isUpload && !this.view.flxFiles.widgets()[i].isError){
              filesToUpload.push(this.view.flxFiles.widgets()[i].browsedFile);
            }
          }
      //       else if(this.view.flxFiles.widgets().length === 1){
      return filesToUpload;
    },
    getUploadedFiles : function(){
      var filesUploaded =[];
      for(var i=0;i<this.view.flxFiles.widgets().length;i++){
        if(this.view.flxFiles.widgets()[i].isUpload && !this.view.flxFiles.widgets()[i].isError){
          let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
          this.view.flxFiles.widgets()[i].browsedFile[1] = this.view["clone" + id + "atxFile"].tbxAnimatedKA.text;
          filesUploaded.push(this.view.flxFiles.widgets()[i].browsedFile);
        }
      }
      return filesUploaded;
    },
    fileUploadSucessView : function(fileID,appEvidenceID,docID,appFulfilmentId){
      var formID = kony.application.getCurrentForm().id;
      if(this.view.btnUpload.text == kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.3")){
      for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
        let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
        this.view["clone" + id + "flxClose"].setVisibility(false);
        // for now, making it delete, needs to be changed for download
//         this.view["clone" + id + "flxImg"].setVisibility(false);
//         this.view["clone" + id + "flxDownload"].setVisibility(true);
        if(formID==='frmUserActions'){
              this.view["clone" + id + "flxImg"].setVisibility(true);
              this.view["clone" + id + "flxDownload"].setVisibility(false);
              this.view["clone"+id+"img"].src = "greentick.png";
            }else{
              this.view["clone" + id + "flxImg"].setVisibility(false);
              this.view["clone" + id + "flxDownload"].setVisibility(true);
            }
        this.view["clone" + id + "flxError"].isVisible = false;
      }
      this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.2");
      //this.view.flxUploadBtn.setVisibility(true);
      this.view.flxUploadFiles.setEnabled(true);
      this.view.lblUploadDocumnet.skin = "lblTitle15";
      this.setReadWrite();
    }
    else{
      for(var fileWidgets = 0; fileWidgets< this.view.flxFiles.widgets().length;fileWidgets++){
        if(fileID === this.view.flxFiles.widgets()[fileWidgets].uniqueId){
           let id = this.view.flxFiles.widgets()[fileWidgets].id.replace(/([A-Z]|[a-z])/g, "");
          //this.view.flxUploadFiles.setVisibility(true);
          this.view["clone"+id+"flxClose" ].setVisibility(false);
          this.view["clone"+id+"flxDownload"].setVisibility(false);
          this.view["clone"+id+"flxImg"].setVisibility(true);
          this.view["clone"+id+"img"].src = "greentick.png";
          this.view["clone"+id+"flx"].isError = false;
          this.view["clone"+id+"flx"].isUpload = true;
          // this.view["clone"+id+"flx"].appFulfilmentId = submittedEvidence.appFulfilmentId;
          this.view["clone"+id+"flx"].appEvidenceId = appEvidenceID;
          this.view["clone"+id+"flx"].isEvidenceValid = "InValid";
          this.view["clone" + id + "flx"].browsedFile[3] = "InValid";
          this.view["clone" + id + "flx"].browsedFile[4] = appFulfilmentId;
          this.view["clone" + id + "flx"].browsedFile[6] = appEvidenceID;
          this.view["clone"+id+"flx"].docId = docID;
          this.view["clone"+id+"atxFile"].setReadOnly();
        }
      }
    }
      this.checkErrorState();
    },
    
    fileUploadErrorView : function(fileID,errorText){
        for(var fileWidgets = 0; fileWidgets< this.view.flxFiles.widgets().length;fileWidgets++){
          if(fileID === this.view.flxFiles.widgets()[fileWidgets].uniqueId){
            let id = this.view.flxFiles.widgets()[fileWidgets].id.replace(/([A-Z]|[a-z])/g, "");
            this.view["clone"+id+"flxClose" ].setVisibility(true);
            this.view["clone"+id+"flxDownload"].setVisibility(false);
            this.view["clone"+id+"flxImg"].setVisibility(false);
            this.view["clone"+id+"flx"].isError = true;
            this.view["clone"+id+"flx"].isVisible = true;
            this.view["clone"+id+"flxError"].isVisible = true;
            this.view["clone"+id+"lblError"].text = errorText;
          }
        }
    for (var j=0; j<this.parentComp.view.flxComponents.widgets().length; j++){
          if (this.parentComp.view.flxComponents.widgets()[j].Name.includes("dropdownController")){
            this.parentComp.view.flxComponents.widgets()[j].setEnabled(true);
            break;
          }
        }
      this.inErrorState = true;
    },
    checkErrorState : function(){
      this.inErrorState = false;
      for(var i=0;i<this.view.flxFiles.widgets().length;i++){
         let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
        if(this.view["clone"+id+"flx"].isError === true){
          this.inErrorState = true;
        }
      }
    },
    onSubmit : function(){
     var formID = kony.application.getCurrentForm().id;
     this.view.lblCompError.setVisibility(false);
      for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
         let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
        if(this.view["clone"+id+"flx"].isUpload && !this.view["clone"+id+"flx"].isError){
            this.view["clone"+id+"flxClose"].setVisibility(false);
           if(formID==='frmUserActions'){
              this.view["clone" + id + "flxImg"].setVisibility(true);
              this.view["clone" + id + "flxDownload"].setVisibility(false);
              this.view["clone"+id+"img"].src = "greentick.png";
            }else{
              this.view["clone" + id + "flxImg"].setVisibility(false);
              this.view["clone" + id + "flxDownload"].setVisibility(true);
            }
        }
        else{
          this.view["clone"+id+"flx"].setVisibility(false);
        }
      }
      this.setReadOnly();
      if(this.submitCallback!== null && this.submitCallback!== undefined){
        this.submitCallback();
      }
    },
    onDocSubmit : function(){
      var formID = kony.application.getCurrentForm().id;
      for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
        let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
        this.view["clone" + id + "flxClose"].setVisibility(false);
        // for now, making it delete, needs to be changed for download
//         this.view["clone" + id + "flxImg"].setVisibility(false);
//         this.view["clone" + id + "flxDownload"].setVisibility(true);
        if(formID==='frmUserActions'){
              this.view["clone" + id + "flxImg"].setVisibility(true);
              this.view["clone" + id + "flxDownload"].setVisibility(false);
              this.view["clone"+id+"img"].src = "greentick.png";
            }else{
              this.view["clone" + id + "flxImg"].setVisibility(false);
              this.view["clone" + id + "flxDownload"].setVisibility(true);
            }
        this.view["clone" + id + "flxError"].isVisible = false;
    }
    this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.2");
    //this.view.flxUploadBtn.setVisibility(true);
    this.setReadWrite();
    for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
      let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
      this.view["clone"+id+"atxFile"].setReadOnly();
  }
    },
    setReadOnly : function(){
      //this.view.flxUploadFiles.setVisibility(false);
      //this.view.flxUploadBtn.setVisibility(false);
      for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
         let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
        this.view["clone"+id+"atxFile"].setReadOnly();
      }
    },
    setReadWrite : function(){
      //this.view.flxUploadFiles.setVisibility(true);
      //this.view.flxUploadBtn.setVisibility(true);
      this.view.flxUploadFiles.setEnabled(true);
      this.view.btnUpload.text = kony.i18n.getLocalizedString("com.dbx.uploadFiles3.btnUpload.text.2");
      for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
         let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
        this.view["clone"+id+"atxFile"].setReadWrite();
      }
    },
    setCommonError : function(errorText){
      this.view.lblCompError.isVisible = true;
      this.view.lblCompError.text = errorText;
    },
    
    
    // Viz bug onBreakpointChange hence adding this function
    onBreakpointChange : function(event, width){
      if (width === 640){
        for (var i = 0; i < this.view.flxFiles.widgets().length; i++) {
           let id = this.view.flxFiles.widgets()[i].id.replace(/([A-Z]|[a-z])/g, "");
          this.view["clone"+id+"flxFile"].right = "0dp";
          this.view["clone"+id+"flxInfoAtbx"].left = "0dp";
          if(this.view.lblDocumentTitle.text){
            this.view["clone" + id + "flx"].top = "10dp";
          }
          else{
            this.view["clone" + id + "flx"].top = "0dp";
          }
        }
      }
      else{
        for (var j = 0; j < this.view.flxFiles.widgets().length; j++) {
           let id = this.view.flxFiles.widgets()[j].id.replace(/([A-Z]|[a-z])/g, "");
          this.view["clone"+id+"flxFile"].right = "10dp";
          this.view["clone"+id+"flxInfoAtbx"].left = "15dp";
          if(this.view.lblDocumentTitle.text){
            this.view["clone" + id + "flx"].top = "0dp";
          }
          else{
            this.view["clone" + id + "flx"].top = "-5dp";
          }
        }
      }
    }
  };
});
