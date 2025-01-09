define({
     contactData : {},
     contactArray : [],
     contactsMasterData:null,
     contactsMasterCount:0,
     contactType:'',
    preShow: function() {
       // applicationManager.getPresentationUtility().showLoadingScreen();
        this.view.customSearchbox.tbxSearch.setFocus(false);
       var navManager = applicationManager.getNavigationManager();
        this.showPreshowSearch();
        this.contactsMasterCount=0;
      this.view.flxMainContainer.skin="slFbox";
        this.view.customHeader.btnRight.onClick = this.onClickCancel;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.tbxSearch.onTouchStart = this.showSearch;
        this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
        this.view.customSearchbox.btnCancel.onClick = this.showSearch;
        this.view.segContacts.onRowClick = this.segContactsOnRowClick;
        this.view.flxRadioBtn1.onClick = this.flxRadioBtn1OnClick;
        this.view.flxRadioBtn2.onClick = this.flxRadioBtn2OnClick;
        this.view.flxRadioBtn3.onClick = this.flxRadioBtn3OnClick;
        this.view.flxRadioBtn4.onClick = this.flxRadioBtn4OnClick;
        this.view.flxRadioBtn5.onClick = this.flxRadioBtn5OnClick;
        this.view.btnContinue.onClick = this.btnContinueOnClick;
        this.view.flxCross.onClick = this.hidePopup;
        var array = navManager.getCustomInfo("frmCardLessPickContacts");
        this.populateContacts(array);
        this.hidePopup();
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
            this.view.flxMainContainer.top="0dp";
        }
      else
        {
          this.view.flxHeader.setVisibility(true);
          this.view.flxMainContainer.top="56dp";
        }
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 },
    flxBackOnClick: function() {
      	var navManager = applicationManager.getNavigationManager();
		navManager.goBack();
    },
    segContactsOnRowClick: function() {
        //this.showPopup();
      this.segOnRowClick();
    },
  showPreshowSearch:function(){
  		if (this.view.flxHeaderSearchbox.isVisible === true) {
             this.view.flxHeaderSearchbox.isVisible = false;
             this.view.flxSearch.isVisible = true;
          	 this.view.flxHeader.isVisible = true;
          	 if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
             	this.view.flxMainContainer.top = "0dp";
      		 }
          	 else{
             	this.view.flxMainContainer.top = "56dp";
             }
        }
  },
  	tbxSearchOnTextChange:function(){
      	var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
         applicationManager.getPresentationUtility().showLoadingScreen();
        var searchSegmentData=null;
        var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        searchSegmentData=cLMod.presentationController.searchInputStringForContactsList(searchtext,this.contactArray);
      	this.setSegData(searchSegmentData);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
  	},
    flxRadioBtn1OnClick: function() {
        if (this.view.imgRadioBtn1.src === "radiobtn.png") {
            this.view.imgRadioBtn1.src = "radiobuttoninactive.png";
            this.disableContinue();
        } else {
            this.contactData.contact=this.view.lblPhone1.text;
            this.view.imgRadioBtn1.src = "radiobtn.png";
            this.view.imgRadioBtn2.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn3.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn4.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn5.src = "radiobuttoninactive.png";
            this.enableContinue();
        }
    },
    flxRadioBtn2OnClick: function() {
        if (this.view.imgRadioBtn2.src === "radiobtn.png") {
            this.view.imgRadioBtn2.src = "radiobuttoninactive.png";
            this.disableContinue();
        } else {
            this.contactData.contact=this.view.lblPhone2.text;
            this.view.imgRadioBtn2.src = "radiobtn.png";
            this.view.imgRadioBtn1.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn3.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn4.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn5.src = "radiobuttoninactive.png";
            this.enableContinue();
        }
    },
    flxRadioBtn3OnClick: function() {
        if (this.view.imgRadioBtn3.src === "radiobtn.png") {
            this.view.imgRadioBtn3.src = "radiobuttoninactive.png";
            this.disableContinue();
        } else {
            this.contactData.contact=this.view.lblPhone3.text;
            this.view.imgRadioBtn3.src = "radiobtn.png";
            this.view.imgRadioBtn2.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn1.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn4.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn5.src = "radiobuttoninactive.png";
            this.enableContinue();
        }
    },
    flxRadioBtn4OnClick: function() {
        if (this.view.imgRadioBtn4.src === "radiobtn.png") {
            this.view.imgRadioBtn4.src = "radiobuttoninactive.png";
            this.disableContinue();
        } else {
            this.view.imgRadioBtn4.src = "radiobtn.png";
            this.view.imgRadioBtn2.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn3.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn1.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn5.src = "radiobuttoninactive.png";
            this.enableContinue();
        }
    },
    flxRadioBtn5OnClick: function() {
        if (this.view.imgRadioBtn5.src === "radiobtn.png") {
            this.view.imgRadioBtn5.src = "radiobuttoninactive.png";
            this.disableContinue();
        } else {
            this.view.imgRadioBtn5.src = "radiobtn.png";
            this.view.imgRadioBtn2.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn3.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn4.src = "radiobuttoninactive.png";
            this.view.imgRadioBtn1.src = "radiobuttoninactive.png";
            this.enableContinue();
        }
    },
    btnContinueOnClick: function() {
        if(this.contactType==="phone")
          {
         this.contactData.contact.replace(/\u00A0/g," ");
         var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
         cLMod.presentationController.setCardlessPhoneNumber(this.contactData,"frmCardLessPhoneNo");
          }
        else
          {
            var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
         cLMod.presentationController.setCardlessEmail(this.contactData,"frmCardLessEmail");
          }
    },
    showPopup: function() {
        this.view.flxPickContact.setVisibility(true);
        this.view.flxHeader.setEnabled(false);
        this.view.flxHeaderSearchbox.setEnabled(false);
        this.view.flxMainContainer.setEnabled(false);
        this.disableContinue();
    },
    hidePopup: function() {
        this.view.flxPickContact.setVisibility(false);
        this.view.flxHeader.setEnabled(true);
        this.view.flxHeaderSearchbox.setEnabled(true);
        this.view.flxMainContainer.setEnabled(true);
    },
    showSearch: function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
        if (this.view.flxHeaderSearchbox.isVisible === true) {
                this.view.flxHeaderSearchbox.isVisible = false;
				this.view.flxMainContainer.skin="slFbox";
              	this.view.segContacts.setData(this.contactsMasterData);
        		if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        			this.view.flxHeader.isVisible = false;
                    this.view.flxMainContainer.top="0dp";
                   // this.view.flxScrlSeg.top = "40dp";
      			}
      			else{
        			this.view.flxHeader.isVisible = true;
                    this.view.flxMainContainer.top="56dp";
      			}
        		if(this.contactsMasterData.length===0){
      				this.view.flxNoStatements.isVisible=true;
        			this.view.segContacts.isVisible=false;
      			}
              	else{
         		   	this.view.flxNoStatements.isVisible=false;
        			this.view.segContacts.isVisible=true;
        			this.view.segContacts.setData(this.contactsMasterData);
        		}
                this.view.flxSearch.isVisible = true;
          		this.view.flxScrlSeg.top = "55dp";
                //this.view.flxMainContainer.top = "56dp";
            }
      else {
        this.view.flxMainContainer.skin="sknFlxffffff";
              	this.view.customSearchbox.tbxSearch.text="";
              	this.view.flxSearch.isVisible = false;
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "40dp";
                this.view.flxScrlSeg.top = "0dp";
                this.view.flxHeaderSearchbox.isVisible = true;
                this.view.customSearchbox.tbxSearch.setFocus(true);
            }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    populateContacts : function(array){
    // alert(array);
      this.contactArray=array;
      this.setSegData(array);
    },
    setSegData : function(segmentData){
      var dataMap=this.getDataMap();
      this.view.segContacts.widgetDataMap = dataMap;
      var navMan=applicationManager.getNavigationManager();
      var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      var data=cardlessModule.presentationController.getCashlessContactType();
      this.contactType=data;
      var segPhoneData=[];
      var segEmailData=[];
      if(segmentData && this.contactType==="phone"){
        for(var i=0;i<segmentData.length;i++){
          if(segmentData[i].phone && segmentData[i].phone.length>0){
            var phoneDetails={};
            phoneDetails.phone=segmentData[i].phone[0].number;
            phoneDetails.firstname=segmentData[i].firstname;
            phoneDetails.lastname=segmentData[i].lastname;
            phoneDetails.phoneList=segmentData[i].phone;
            segPhoneData.push(phoneDetails);
          }
        }
        if(this.contactsMasterCount===0){
          this.contactsMasterCount=1;
          this.contactsMasterData=segPhoneData;
        }
        if(segPhoneData.length===0)
          {
            this.view.flxNoStatements.isVisible=true;
            this.view.segContacts.isVisible=false;
          }
        else
          {
            this.view.flxNoStatements.isVisible=false;
            this.view.segContacts.isVisible=true;
        this.view.segContacts.setData(segPhoneData);
          }
      }
   else if(segmentData && this.contactType==="email"){
       for(var i=0;i<segmentData.length;i++){
         if(segmentData[i].email && segmentData[i].email.length>0){
           var emailDetails={};
           emailDetails.phone=segmentData[i].email[0].id;
           emailDetails.firstname=segmentData[i].firstname;
            emailDetails.lastname=segmentData[i].lastname;
           emailDetails.emailList=segmentData[i].email;
           segEmailData.push(emailDetails);
         }
        }
         if(this.contactsMasterCount===0){
          this.contactsMasterCount=1;
         this.contactsMasterData=segEmailData;
         }
          if(segEmailData.length===0)
          {
            this.view.flxNoStatements.isVisible=true;
            this.view.segContacts.isVisible=false;
          }
         else
           {
              this.view.flxNoStatements.isVisible=false;
            this.view.segContacts.isVisible=true;
         this.view.segContacts.setData(segEmailData);
           }
       }
      else
        {
            this.view.flxNoStatements.isVisible=true;
            this.view.segContacts.isVisible=false;
        }
      },
    	getDataMap : function(){
      	var dataMap={};
         dataMap = {
            "lblFirstName":"firstname",
            "lblLastName":"lastname",
            "lblPhoneNo":"phone",
            "template": "flxContacts"
        };
   	  	return dataMap;
  	},
  segOnRowClick : function(){
    var rowid=this.view.segContacts.selectedRowIndex[1];
    var selectedContactDetails = this.view.segContacts.data[rowid];
   // alert(selectedContactDetails);
    this.contactData.firstName = selectedContactDetails.firstname;
    this.contactData.lastName = selectedContactDetails.lastname;
  //  var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
  //  var recipientDetails=p2pMod.presentationController.getRecipientDetails();
    if(this.contactType==="phone"){
      this.setFlexPhoneVisibilitiesOn();
      this.removePreviousSelection();
      if(selectedContactDetails.phoneList.length>=3){
        if(selectedContactDetails.phoneList[0]!==null || selectedContactDetails.phoneList[0]!==undefined ){
          this.view.lblPhone1.text=selectedContactDetails.phoneList[0].number;
        }
        if(selectedContactDetails.phoneList[1]!==null || selectedContactDetails.phoneList[1]!==undefined ){
          this.view.lblPhone2.text=selectedContactDetails.phoneList[1].number;
        }
        if(selectedContactDetails.phoneList[2]!==null || selectedContactDetails.phoneList[2]!==undefined ){
          this.view.lblPhone3.text=selectedContactDetails.phoneList[2].number;
        }
        this.showPopup();
      }
      else if(selectedContactDetails.phoneList.length===2){
        if(selectedContactDetails.phoneList[0]!==null || selectedContactDetails.phoneList[0]!==undefined ){
          this.view.lblPhone1.text=selectedContactDetails.phoneList[0].number;
        }
        if(selectedContactDetails.phoneList[1]!==null || selectedContactDetails.phoneList[1]!==undefined ){
         this.view.lblPhone2.text=selectedContactDetails.phoneList[1].number;
        }
        this.view.flxPhone3.setVisibility(false);
        this.showPopup();
      }
      else if(selectedContactDetails.phoneList.length===1){
      //  this.view.lblPhone1.text=selectedContactDetails.phoneList[0].number;
       // this.view.flxPhone2.setVisibility(false);
      //  this.view.flxPhone3.setVisibility(false);
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.contactData.contact=selectedContactDetails.phoneList[0].number;
        this.btnContinueOnClick();
      }
    }
    if(this.contactType==="email"){
      this.setFlexEmailVisibilitiesOn();
      this.removePreviousSelection();
      if(selectedContactDetails.emailList.length>=2){
        if(selectedContactDetails.emailList[0]!==null || selectedContactDetails.emailList[0]!==undefined ){
          this.view.flxPhone1.setVisibility(true);
          this.view.lblPhone1.text=selectedContactDetails.emailList[0].id;
        }
        if(selectedContactDetails.emailList[1]!==null || selectedContactDetails.emailList[1]!==undefined ){
          this.view.flxPhone2.setVisibility(true);
          this.view.lblPhone2.text=selectedContactDetails.emailList[1].id;
        }
        this.showPopup();
      }
      else if(selectedContactDetails.emailList.length===1){
      //  this.view.lblPhone1.text=selectedContactDetails.emailList[0].id;
      //  this.view.flxPhone2.setVisibility(false);
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.contactData.contact=selectedContactDetails.emailList[0].id;
        this.btnContinueOnClick();
      }
    }
  },
  removePreviousSelection:function(){
    this.view.imgRadioBtn5.src = "radiobuttoninactive.png";
    this.view.imgRadioBtn2.src = "radiobuttoninactive.png";
    this.view.imgRadioBtn3.src = "radiobuttoninactive.png";
    this.view.imgRadioBtn4.src = "radiobuttoninactive.png";
    this.view.imgRadioBtn1.src = "radiobuttoninactive.png";
    this.view.lblPhone1.text="";
    this.view.lblPhone2.text="";
    this.view.lblPhone3.text="";
    this.view.lblEmail1.text="";
    this.view.lblEmail2.text="";
  },
  setFlexPhoneVisibilitiesOn : function(){
        this.view.flxPhone1.setVisibility(true);
        this.view.flxPhone2.setVisibility(true);
        this.view.flxPhone3.setVisibility(true);
        this.view.flxEmail1.setVisibility(false);
        this.view.flxEmail2.setVisibility(false);
  },
    setFlexEmailVisibilitiesOn : function(){
        this.view.flxPhone1.setVisibility(true);
        this.view.flxPhone2.setVisibility(true);
        this.view.flxPhone3.setVisibility(false);
        this.view.flxEmail1.setVisibility(false);
        this.view.flxEmail2.setVisibility(false);
  },
  isSelectedNumberOrEmail : function(){
    if(this.view.imgRadioBtn5.src==="radiobuttoninactive.png" &&
            this.view.imgRadioBtn2.src=== "radiobuttoninactive.png" &&
            this.view.imgRadioBtn3.src==="radiobuttoninactive.png" &&
            this.view.imgRadioBtn4.src==="radiobuttoninactive.png" &&
            this.view.imgRadioBtn1.src=== "radiobuttoninactive.png"){
      return false;
    }
    else{
      return true;
    }
  },
  onClickCancel: function() {
      	var navManager = applicationManager.getNavigationManager();
    	navManager.goBack();
    },
  enableContinue: function()
  {
    this.view.btnContinue.setEnabled(true);
    this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
  },
  disableContinue:function()
  {
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    this.view.btnContinue.setEnabled(false);
  },
  bindGenericError:function(errorMsg)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this, errorMsg);
  }
});