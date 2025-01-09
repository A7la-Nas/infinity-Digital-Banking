define(['CommonUtilities'], function(CommonUtilities) {
  var originalAmount = 0;
  var filesToBeUploaded = [];
  var uploadedAttachments = [];
  var attachments = [];

	return {
//      createACustomCalendarWidget:function(){
//      //The below function is the callback function for onSelection event
//      function onSelectionCallBck(calendar)
//      {
//       // alert("onSelection event triggered");
//      }



//      var calLayoutConf = {padding:[2,2,2,2], margin:[5,5,5,5],containerWeight:100, hExpand:true, vExpand:true};

//      var calPSPConf = {};

//      //Creating the Calendar.
     
//      var calBasicConf = {id: "calSelectedOn","width":"100%",isVisible:true, skin:"sknCalendarTransparent", dateFormat:"dd/MM/yyyy",
//                          viewType:constants.CALENDAR_VIEW_TYPE_GRID_POPUP, validStartDate:[01,01,2012], validEndDate:[31,12,2012],
//                          placeholder:"dd/MM/yyyy", calendarIcon:"calender.png", onSelection:onSelectionCallBck};
//      var Calendar= new kony.ui.Calendar(calBasicConf, calLayoutConf, calPSPConf);
     
     

//      //Reading the titleOnPopup property of calendar widget
//    //  alert("Calendar titleOnPopup ::"+Calendar.titleOnPopup);
//        if(this.view["calSelectedOn"]==undefined){
//      		this.view.flxCalendar.add(Calendar);
//        }
     
//    }
      getFrequencyAndFormLayout:function(frequencyValue, howLangValue)
      {
        filesToBeUploaded = [];
        uploadedAttachments = [];
        attachments = [];
        this.view.flxAttachmentUploadError.setVisibility(false);
        if(frequencyValue!=="Once" && howLangValue !== 'NO_OF_RECURRENCES')
          {
            this.makeLayoutfrequencyWeeklyDate();
          }
        else if(frequencyValue !== "Once" && howLangValue === 'NO_OF_RECURRENCES') {
          this.makeLayoutfrequencyWeeklyRecurrences();          
        }
        else
          {
            this.makeLayoutfrequencyOnce();
          }
        
      },
      getForHowLongandFormLayout:function(value)
      {
        if(value==="ON_SPECIFIC_DATE")
          {
            this.makeLayoutfrequencyWeeklyDate();
          }
        else if(value==="NO_OF_RECURRENCES")
          {
            this.makeLayoutfrequencyWeeklyRecurrences();
          }
        else if(value==="CONTINUE_UNTIL_CANCEL")
          {
            this.makeLayoutfrequencyWeeklyCancel();
          }
      },
      makeLayoutfrequencyWeeklyDate:function()
    {
      this.view.lblForhowLong.setVisibility(true);
      this.view.lbxForHowLong.setVisibility(true);
      this.view.flxCalEndingOn.setVisibility(true);
      this.view.lblSendOn.text = kony.i18n.getLocalizedString("i18n.transfers.start_date");
      this.view.lblNoOfRecOrEndingOn.text = kony.i18n.getLocalizedString("i18n.transfers.end_date");
      this.view.lblNoOfRecOrEndingOn.setVisibility(true);
      this.view.tbxNoOfRecurrences.setVisibility(false);
      this.view.forceLayout();     
    },
      makeLayoutfrequencyWeeklyRecurrences:function()
    {
      this.view.lblForhowLong.setVisibility(true);
      this.view.lbxForHowLong.setVisibility(true);
      this.view.flxCalEndingOn.setVisibility(false);
      this.view.lblNoOfRecOrEndingOn.setVisibility(true);
      this.view.tbxNoOfRecurrences.setVisibility(true);
      this.view.lblSendOn.text = kony.i18n.getLocalizedString("i18n.transfers.send_on");
      this.view.lblNoOfRecOrEndingOn.text = kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences");
      this.view.forceLayout();
    },
      makeLayoutfrequencyWeeklyCancel:function()
    {
      this.view.lblForhowLong.setVisibility(true);
      this.view.lbxForHowLong.setVisibility(true);
      this.view.flxCalEndingOn.setVisibility(false);
      this.view.lblNoOfRecOrEndingOn.setVisibility(false);
      this.view.tbxNoOfRecurrences.setVisibility(false);
      this.view.forceLayout();
      
    },
    attachDocumentsTransfer:function(){
      this.view.flxAttachmentUploadError.setVisibility(false);
      var config = {
        selectMultipleFiles: false,
        filter: []
      };
      kony.io.FileSystem.browse(config, this.selectedFileCallback);
      count = filesToBeUploaded.length;
    },

    getBase64: function(context, file, successCallback) {
      var reader = new FileReader();
      reader.onloadend = function() {
        successCallback(reader.result);
        context.view.lblUploadedAttachments.text = uploadedAttachments.toString();
        context.view.lblUploadedAttachmentNames.text = filesToBeUploaded;
      };
      reader.readAsDataURL(file);
    },
    
    selectedFileCallback: function(events, files) {
      var configManager = applicationManager.getConfigurationManager();
      var maxAttachmentsAllowed = configManager.maxAttachmentsAllowed;
      this.view.flxAttachmentUploadError.setVisibility(false);
      var fileNameRegex = new RegExp("^[a-zA-Z0-9.]*$");
      if(count===filesToBeUploaded.length){
        if(files.length > 0){
          var fileName = files[0].file.name;
          var extension = files[0].file.name.split('.');
          if (extension.length > 0 && extension[1]!=="jpeg" && extension[1]!=="pdf") {
            this.view.flxAttachmentUploadError.setVisibility(true);
            this.view.lblAttachmentUploadError.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg2");
            this.view.forceLayout();
            return;
          }
          if (files[0].file.size >= 2000000) {
            this.view.flxAttachmentUploadError.setVisibility(true);
            this.view.lblAttachmentUploadError.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentSizeErrorMsg");
            this.view.forceLayout();
            return;
          }
          else if (fileName !== null && !fileNameRegex.test(fileName)) {
            this.view.flxAttachmentUploadError.setVisibility(true);
            this.view.lblAttachmentUploadError.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentFileNameErrorMsg");
            this.view.forceLayout();
            return;
          }
          else if (filesToBeUploaded.length >= maxAttachmentsAllowed) {
            this.view.flxAttachmentUploadError.setVisibility(true);
            this.view.lblAttachmentUploadError.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentLimitExceededErrorMsg");
            this.view.forceLayout();
            return;
          } else {
            var fileData = {};
            filesToBeUploaded.push(files[0].name);
            fileData.fileName = files[0].name;
            fileData.fileType = files[0].file.type;
            this.getBase64(this, files[0].file, function(base64String) {
              uploadedAttachments = [];
              base64String = base64String.replace("data:;base64\,", "");
              base64String = base64String.replace("data:image/jpeg;base64\,","");
              base64String = base64String.replace("data:application\/octet-stream;base64\,", "");
              fileData.fileContents = base64String.replace("data:application/pdf;base64\,","");
              attachments.push(fileData);
              var fileDataItemParsed = attachments.map(function(item) {
                return item['fileName'] + "-" + item['fileType'] + "-" + item['fileContents'];
              });
              uploadedAttachments.push(fileDataItemParsed);
            });
          }
        }
      }
      else
        return;
      if (filesToBeUploaded.length <= maxAttachmentsAllowed) {
        this.setAttachmentsDataToSegment(); 
      }
      this.view.forceLayout();
    },
    setAttachmentsDataToSegment: function() {
      // this.view.lblUploadedAttachments.text = uploadedAttachments.toString();
      this.view.flxAttachmentsList.setVisibility(true);
      var attachmentsData = [];
      for (var i = 0; i < filesToBeUploaded.length; i++) {
        attachmentsData[i] = {};
        attachmentsData[i].filename = filesToBeUploaded[i];
        attachmentsData[i]["imgRemoveAttachment"] = {
          "src": "bbcloseicon.png"
        };
      }
      this.view.segAddedDocuments.widgetDataMap = {
        "lblAttachedDocument": "filename",
        "imgRemoveAttachment": "imgRemoveAttachment",
      };
      this.view.segAddedDocuments.setData(attachmentsData);
      this.view.forceLayout();
    },
    removeAttachments: function(data) {
      for (var i = 0; i < attachments.length; i++) {
        if (attachments[i].fileName === data.filename) {
            attachments.splice(i, 1);
            uploadedAttachments[0].splice(i, 1);
            filesToBeUploaded.splice(i, 1);
            break;
        }
      }
      this.view.lblUploadedAttachments.text = uploadedAttachments.toString();
      this.view.lblUploadedAttachmentNames.text = filesToBeUploaded;
      this.view.flxAttachmentUploadError.setVisibility(false);
      this.setAttachmentsDataToSegment();
    },
    
    closeAttachmentsPopup: function(){
      this.view.flxAttachmentsPopup.setVisibility(false);
    },
      makeLayoutfrequencyOnce:function()
    { this.view.lblSendOn.text = kony.i18n.getLocalizedString("i18n.transfers.send_on");
      this.view.lblForhowLong.setVisibility(false);
      this.view.lbxForHowLong.setVisibility(false);
      this.view.flxCalEndingOn.setVisibility(false);
      this.view.lblNoOfRecOrEndingOn.setVisibility(false);
      this.view.tbxNoOfRecurrences.setVisibility(false);
      this.view.forceLayout();
    },
       renderCalendarMakeTransfer: function()
      {
        var context1={"widget":this.view.flxCalSendOn,"anchor":"bottom"};       
        this.view.calSendOn.setContext(context1);
        var context2={"widget":this.view.flxCalEndingOn,"anchor":"bottom"};       
        this.view.calEndingOn.setContext(context2);
        let widgets = [
          [this.view.tbxAmount, this.view.flxAmount],
          [this.view.tbxAmountEur, this.view.flxAmountEur],
          [this.view.tbxAmountmod, this.view.flxAmountmod],
          [this.view.tbxAmountValue, this.view.lblOtherAmountValue]
        ]
        for(let i=0; i<widgets.length; i++){
          CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
        }
      },
      setAmount: function  (amount) {
        originalAmount = amount.toString();
      },
      getAmount: function () {
        return originalAmount;
      },
      formatAndShow: function (obj) {
        if (/^(?!0\.00)\d{1,3}(,\d{3})*(\.\d*)?$/.test(originalAmount) || /^\d*(\.\d+)?$/.test(originalAmount)) {
          originalAmount = originalAmount.replace(/\,/g,"")
          originalAmount = parseFloat(originalAmount).toFixed(2);
          var formattedText = CommonUtilities.formatCurrencyWithCommas(originalAmount);
          if(obj){
            obj.text = formattedText === undefined ? "" : formattedText.substr(1) ;   
          }else {
            this.view.tbxAmount.text = formattedText === undefined ? "" : formattedText.substr(1) ; 
          }
        }
      }
    };
});