define(['./AddPayeeDAO','ParserUtilsManager'],function(AddPayeeDAO,ParserUtilsManager) {

  var contractList = {};
  
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      
      this._isSearchEnabled = "";
      
      this._searchTextBoxSkin = "";
      
      this._businessPayeeIcon = "";
      
      this._personalPayeeIcon = "";
      
      this._dataGridIcon1 = "";
      
      this._dataGridIcon2 = "";
      
      this._datagridHeadingLabelSkin = "";
      
      this._datagridContractRowSkin = "";
      
      this._datagridCustomerRowSkin = "";
      
      this._datagridContractLayerLabel1skin = "";
      
      this._datagridContractLayerLabel2skin = "";
      
      this._datagridContractLayerLabel3skin = "";
      
      this._sknActionButton = "";
      
      this._sknActionButtonFocus = "";
      
      this._sknActionButtonBlocked = "";
      
      this._objectService = "";
      
      this._objectName = "";
      
      this._getOperation = "";
      
      this._getOperationCriteria = "";
      
      this._getOperationIdentifier = "";
      
      this._editobjectService = "";
      
      this._editobjectName = "";
      
      this._editOperation = "";
      
      this._editOperationCriteria = "";
      
      this._editOperationIdentifier = "";
      
      this._rowExpandIcon = "";
      
      this._rowCollpaseIcon = "";
      
      this._checkboxSelectedIcon = "";
      
      this._checkboxUnSelectedIcon = "";
      
      this._searchPlaceholderText = "";
      
      this._searchTextBoxIcon = "";
      
      this._dataGridContractLayerResponseRootPath = "";
      
      this._dataGridContractLayerLabel1 = "";
      
      this._dataGridContractLayerLabel2 = "";
      
      
      this._dataGridCustomerLayerResponseRootPath = "";
      
      this._dataGridCustomerLayerLabel1 = "";
      
      this._dataGridCustomerLayerLabel2 = "";
      
      this._button1 = "";
      
      this._separatorSuffixLinkedCustomers = "";
      
     //declaration for Heading in the group:General
      this._lblHeading="";
      
      this._button1Edit = "";
      
      this._datagridCustomerLayerLabel1skin = "";
      
      this._datagridCustomerLayerLabel2skin = "";
      
      this.addPayeeDAO = new AddPayeeDAO();
      this._context ="";     
      this.ParserUtilsManager = new ParserUtilsManager();
      this.textInputsMapping = {};   
      this.componentContext = {};
      
      this.totalNumberOfCustomers = "";
    },
    
      //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      //setter method for ErrorPrompt in the group:General
      
      //setter method for Search Enabled in the group:General
      defineSetter(this, "isSearchEnabled", function(val) {
        if((typeof val=='boolean') && (val != "")){
          this._isSearchEnabled=val;
        }
      });

      //getter method for Search Enabled in the group:General
      defineGetter(this, "isSearchEnabled", function() {
        return this._isSearchEnabled;
      });
      
      defineSetter(this, "searchTextBoxSkin", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._searchTextBoxSkin =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "searchTextBoxSkin", function() {
        return this._searchTextBoxSkin;
      });
      
       defineSetter(this, "businessPayeeIcon", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._businessPayeeIcon =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "businessPayeeIcon", function() {
        return this._businessPayeeIcon;
      });
      
      defineSetter(this, "personalPayeeIcon", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._personalPayeeIcon =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "personalPayeeIcon", function() {
        return this._personalPayeeIcon;
      });
      
      //setter method for Data Grid Icon1 in the group:dataGridCustomerLayer
      defineSetter(this, "dataGridIcon1", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._dataGridIcon1 =val;
        }
      });

      //getter method for Data Grid Icon1 in the group:dataGridCustomerLayer
      defineGetter(this, "dataGridIcon1", function() {
        return this._dataGridIcon1;
      });
      
      //setter method for Data Grid Icon2 in the group:dataGridCustomerLayer
      defineSetter(this, "dataGridIcon2", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._dataGridIcon2 =val;
        }
      });

      //getter method for Data Grid Icon2 in the group:dataGridCustomerLayer
      defineGetter(this, "dataGridIcon2", function() {
        return this._dataGridIcon2;
      });
      
      defineSetter(this, "datagridHeadingLabelSkin", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._datagridHeadingLabelSkin =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "datagridHeadingLabelSkin", function() {
        return this._datagridHeadingLabelSkin;
      });
      
       defineSetter(this, "datagridContractRowSkin", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._datagridContractRowSkin =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "datagridContractRowSkin", function() {
        return this._datagridContractRowSkin;
      });
      
       defineSetter(this, "datagridCustomerRowSkin", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._datagridCustomerRowSkin =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "datagridCustomerRowSkin", function() {
        return this._datagridCustomerRowSkin;
      });
      
       defineSetter(this, "datagridContractLayerLabel1skin", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._datagridContractLayerLabel1skin =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "datagridContractLayerLabel1skin", function() {
        return this._datagridContractLayerLabel1skin;
      });
      
          defineSetter(this, "datagridContractLayerLabel2skin", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._datagridContractLayerLabel2skin =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "datagridContractLayerLabel2skin", function() {
        return this._datagridContractLayerLabel2skin;
      });
      
      
       defineSetter(this, "sknActionButton", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._sknActionButton  =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "sknActionButton", function() {
        return this._sknActionButton ;
      });
      
       defineSetter(this, "sknActionButtonFocus", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._sknActionButtonFocus  =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "sknActionButtonFocus", function() {
        return this._sknActionButtonFocus ;
      });
      
         defineSetter(this, "sknActionButtonBlocked", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._sknActionButtonBlocked =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "sknActionButtonBlocked", function() {
        return this._sknActionButtonBlocked;
      });
      
       defineSetter(this, "objectService", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._objectService =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "objectService", function() {
        return this._objectService;
      });
      
      
       defineSetter(this, "objectName", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._objectName =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "objectName", function() {
        return this._objectName;
      });
      
          defineSetter(this, "getOperation", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._getOperation =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "getOperation", function() {
        return this._getOperation;
      });
      
        defineSetter(this, "getOperationCriteria", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._getOperationCriteria =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "getOperationCriteria", function() {
        return this._getOperationCriteria;
      });
      
          defineSetter(this, "getOperationIdentifier", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._getOperationIdentifier =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "getOperationIdentifier", function() {
        return this._getOperationIdentifier;
      });
      
      
         defineSetter(this, "editobjectService", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._editobjectService =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "editobjectService", function() {
        return this._editobjectService;
      });
      
        defineSetter(this, "editobjectName", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._editobjectName =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "editobjectName", function() {
        return this._editobjectName;
      });
      
         defineSetter(this, "editOperation", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._editOperation =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "editOperation", function() {
        return this._editOperation;
      });
      
         defineSetter(this, "editOperationCriteria", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._editOperationCriteria =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "editOperationCriteria", function() {
        return this._editOperationCriteria;
      });
      
          defineSetter(this, "editOperationIdentifier", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._editOperationIdentifier =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "editOperationIdentifier", function() {
        return this._editOperationIdentifier;
      });
      
          defineSetter(this, "rowExpandIcon", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._rowExpandIcon =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "rowExpandIcon", function() {
        return this._rowExpandIcon;
      });
      
      defineSetter(this, "rowCollpaseIcon", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._rowCollpaseIcon  =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "rowCollpaseIcon", function() {
        return this._rowCollpaseIcon;
      });
      
       defineSetter(this, "checkboxSelectedIcon", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._checkboxSelectedIcon  =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "checkboxSelectedIcon", function() {
        return this._checkboxSelectedIcon;
      });
      
          defineSetter(this, "checkboxUnSelectedIcon", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._checkboxUnSelectedIcon = val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "checkboxUnSelectedIcon", function() {
        return this._checkboxUnSelectedIcon;
      });
      
           defineSetter(this, "searchPlaceholderText", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._searchPlaceholderText=val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "searchPlaceholderText", function() {
        return this._searchPlaceholderText;
      });
      
          defineSetter(this, "searchTextBoxIcon", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._searchTextBoxIcon=val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "searchTextBoxIcon", function() {
        return this._searchTextBoxIcon;
      });
      
               defineSetter(this, "dataGridContractLayerResponseRootPath", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._dataGridContractLayerResponseRootPath  =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "dataGridContractLayerResponseRootPath", function() {
        return this._dataGridContractLayerResponseRootPath;
      });
      
      
               defineSetter(this, "dataGridContractLayerLabel1", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._dataGridContractLayerLabel1=val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "dataGridContractLayerLabel1", function() {
        return this._dataGridContractLayerLabel1;
      });
      
           defineSetter(this, "dataGridContractLayerLabel2", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._dataGridContractLayerLabel2  =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "dataGridContractLayerLabel2", function() {
        return this._dataGridContractLayerLabel2;
      });
      
         defineSetter(this, "dataGridCustomerLayerResponseRootPath", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._dataGridCustomerLayerResponseRootPath  =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "dataGridCustomerLayerResponseRootPath", function() {
        return this._dataGridCustomerLayerResponseRootPath;
      });
      
      defineSetter(this, "dataGridCustomerLayerLabel1", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._dataGridCustomerLayerLabel1=val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "dataGridCustomerLayerLabel1", function() {
        return this._dataGridCustomerLayerLabel1;
      });
      
        defineSetter(this, "dataGridCustomerLayerLabel2", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._dataGridCustomerLayerLabel2  =val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "dataGridCustomerLayerLabel2", function() {
        return this._dataGridCustomerLayerLabel2;
      });
      
      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "separatorSuffixLinkedCustomers", function() {
        return this._separatorSuffixLinkedCustomers;
      });
      
       defineSetter(this, "separatorSuffixLinkedCustomers", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._separatorSuffixLinkedCustomers  = val;
        }
      });
      
       defineSetter(this, "button1", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._button1  = val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "button1", function() {
        return this._button1;
      });
      
      //setter method for Heading in the group:General
          defineSetter(this, "lblHeading", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._lblHeading=val;
            }
          });

          //getter method for Heading in the group:General
          defineGetter(this, "lblHeading", function() {
            return this._lblHeading;
          });
      
      //setter method for Heading in the group:General
          defineSetter(this, "button1Edit", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._button1Edit=val;
            }
          });

          //getter method for Heading in the group:General
          defineGetter(this, "button1Edit", function() {
            return this._button1Edit;
          });
      
      //setter method for Heading in the group:General
          defineSetter(this, "datagridCustomerLayerLabel1skin", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._datagridCustomerLayerLabel1skin=val;
            }
          });

          //getter method for Heading in the group:General
          defineGetter(this, "datagridCustomerLayerLabel1skin", function() {
            return this._datagridCustomerLayerLabel1skin;
          });
      
        //setter method for Heading in the group:General
          defineSetter(this, "datagridCustomerLayerLabel2skin", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._datagridCustomerLayerLabel2skin=val;
            }
          });

          //getter method for Heading in the group:General
          defineGetter(this, "datagridCustomerLayerLabel2skin", function() {
            return this._datagridCustomerLayerLabel2skin;
          });
       

    },
    preshow: function () {
      this.totalNumberOfCustomers=0;
      this.invokeGetService();
      this.customerSelectedCount = 0;
      this.initActions();
      this.setHeading();
      this.setSkins();
    },
    
    setHeading: function(){
      if(!this.isEmptyNullUndefined(this._lblHeading)){
        this.view.lblHeading.parent.isVisible = true;
        this.view.lblHeading.text = this.geti18nText(this._lblHeading);
      }
      else{
        this.view.lblHeading.parent.isVisible = false;
      }
    },
    
        /**
        * Component isEmptyNullUndefined.
        * Verifies if the value is empty, null or undefined.
        * data {string} - value to be verified.
        * @return : {boolean} - validity of the value passed.
        */
      isEmptyNullUndefined:function(data){
        if(data === null || data === undefined || data === "")
          return true;
        return false;
      },
    
    isNotEmptyImage:function(data){
      if(data !== null || data !== undefined || data !== ""){
        return data;
      }
    },
    
    setSkins: function(){
      if(!this.isEmptyNullUndefined(this._sknActionButtonBlocked))
      {
        this.view.btn1.skin = this._sknActionButtonBlocked;
        this.view.btn1.focusSkin =  this._sknActionButtonBlocked;
      }
       if(!this.isEmptyNullUndefined(this._searchTextBoxSkin))
        {
          this.view.tbxSearch.skin = this._searchTextBoxSkin;
        }
      if(!this.isEmptyNullUndefined(this._datagridHeadingLabelSkin))
        {
          this.view.lblHeading.skin = this._datagridHeadingLabelSkin;
        }
    },
    initActions: function(){
      var scope = this;
      if(!this.isEmptyNullUndefined(this._isSearchEnabled)){
        this.view.flxSearch.setVisibility(true);
      }
      else{
        this.view.flxSearch.setVisibility(false);
      }
      
      if(!this.isEmptyNullUndefined(this._searchPlaceholderText)){
        this.view.tbxSearch.placeholder = this.geti18nText(this._searchPlaceholderText);
    }

      if(!this.isEmptyNullUndefined(this._searchTextBoxIcon)){
        this.view.imgSearchIcon.src = this._searchTextBoxIcon;
        this.view.imgSearchIcon.setVisibility(true);
      }
      else{
        this.view.imgSearchIcon.setVisibility(false);
      }
      
       if(!this.isEmptyNullUndefined(this._button1)){
          this.view.btn1.isVisible = true;
          var btn1Json = JSON.parse(this._button1);
          this.populateButtonText(btn1Json,"btn1");
        }
        else{
          this.view.btn1.isVisible = false;
        }  
        this.view.tbxSearch.onTextChange = this.onSearchBtnClick.bind(this);
       this.view.btn1.onClick = this.navigateBasedOnFlowType.bind(this);
    },
    
    navigateBasedOnFlowType: function(){  
      var flowType = this.ParserUtilsManager.context['flowType'];
      if(flowType =="EDIT"){
        this.createCIFData();
        this.editInvokeServiceCallOnContinue();
      }
      else{
        this.actionHandler.call(this,this.ParserUtilsManager.context,this._button1)
      }
    },
      editInvokeServiceCallOnContinue: function() {
      var self = this;
      var objSvcName = this.getValue(this._editobjectService);
      var objName = this.getValue(this._editobjectName);
      var operationName = this.getValue(this._editOperation);
      var criteria=this.getCriteria(this._editOperationCriteria);

   //   criteria['cif'] = JSON.stringify(this.ParserUtilsManager.context['cif']);
      var identifier = this.getValue(this._editOperationIdentifier);
      this.addPayeeDAO.updatePayee
      (objSvcName,objName,operationName,criteria,this.onSuccessEditPayee,identifier,self.onError);

    },
    
    onSuccessEditPayee: function(response, unicode) {
       var tempContext = this.ParserUtilsManager.context;
      if(response.hasOwnProperty("dbpErrCode")){ 
        tempContext['serviceSuccess'] = false;
        this.actionHandler(tempContext, this._button1Edit)        
     //   this.actionHandlerVerifyAckScreenNavigate(tempContext,this._btn1);
      }
      else{
         tempContext['serviceSuccess'] = true;
         tempContext['response'] = response;
        this.actionHandler(tempContext, this._button1Edit)
    //  this.actionHandlerVerifyAckScreenNavigate(tempContext,this._btn1);     
      }
      kony.application.dismissLoadingScreen();
    },

    onError: function() {
       var tempContext = this.ParserUtilsManager.context;
        tempContext['serviceSuccess'] = false;
      this.actionHandler(tempContext,this._btn1);
     kony.application.dismissLoadingScreen();
    },
    actionHandler: function(context, property) {
      var self = this;	
      try{
        if(property!==null && property !== undefined){	
          var propertyJSON = JSON.parse(property);	
          var parsedValue=propertyJSON;	        
          if (typeof(parsedValue) !== "string") {	
            parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"] : parsedValue;	
          }	
          var actionJSON = parsedValue;	
          var level = actionJSON.level;  	
          var method = actionJSON.method;	
          context['pManager'] = this.ParserUtilsManager;
          this.invokeInstaceAction(level,method,context);	
        }	
      }	
      catch(err){	
        var errObj = {	
          "errorInfo" : "Error in actionHandler method of the component.",	
          "error": err	
        };	
        self.onError(errObj);		
      }	
    },	

    invokeInstaceAction: function(levelInstance, method, context) {     	
      if(levelInstance.toLowerCase().trim() === "form")	
      {  	
        this._parentScope[method](context);	
      }	
      if(levelInstance.toLowerCase().trim() === "component")	
      {	
        this[method](context);	
      } 	
    },	
    
    populateButtonText(param,widget){
      if(param !== null && param !== undefined && param !== ""){
        var text = this.geti18nText(param.text);
        this.view[widget].text = text;
      }
    },
     getValue: function(value){
      try {
        var valueJson = JSON.parse(value);      
        value = valueJson;     
      }
      catch(e){
        kony.print(e);
      }
      if(typeof(value) === 'string'){
        return this.getProcessedText(value);
      }
      else
        return this.getProcessedText(JSON.stringify(value));
    },
    
     /**
     *  getProcessedText.
     * Pass the text to parser util to obtain the processed value.
     * text {string} - value to be processed.
     * @return : {string} - processed value.
     */
    getProcessedText:function(text, responseArrayIndex){
      return this.ParserUtilsManager.getParsedValue(text, responseArrayIndex);
    },
    
     /**
     * @api : getCriteria
     * Parse the criteria based on accountType.
     * @param : criteria {string} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria: function(criteria) {
      try{
        var criteriaJSON = JSON.parse(criteria);
      }
      catch(e){
        criteriaJSON = criteria;
        kony.print(e);
      }      
      for(var key in  criteriaJSON){
        if(typeof(criteriaJSON[key]) === "string" )
          criteriaJSON[key] = this.ParserUtilsManager.getParsedValue(criteriaJSON[key]);
        else
          criteriaJSON[key] = criteriaJSON[key];
      }
      return criteriaJSON;
    },
    
invokeGetService: function(){
        var self = this;
        var objSvcName = this.getValue(this._objectService);
        var objName = this.getValue(this._objectName);
        var operationName = this.getValue(this._getOperation);
        var criteria = this.getCriteria(this._getOperationCriteria);
        var identifier = this.getValue(this._getOperationIdentifier);
        this.addPayeeDAO.fetchContractCustomers
        (objSvcName,objName,operationName,criteria,this.getServiceSuccess,identifier,self.getServiceError);
},
    
    getServiceSuccess: function(data){
      var scope = this;
      var isSingleCustomerProfile = "";
      var backendData = {};
      backendData = data["contracts"];
      if (backendData[0]["contractCustomers"]) {
        isSingleCustomerProfile = backendData.length > 1 || backendData[0]["contractCustomers"].length  > 1  ? false : true;
      }
      var dataGridContractLayerResponseRootPath =  this._dataGridContractLayerResponseRootPath;
      if(!this.isEmptyNullUndefined(dataGridContractLayerResponseRootPath)){ 
        if(data.hasOwnProperty(dataGridContractLayerResponseRootPath)){   
          this.setContractsData(data[dataGridContractLayerResponseRootPath]);
        }
        this.initialiseComponent();
      }
      else{
        this.view.segLinkContractCustomerID.isVisible(false);
      }
      if(!this.isEmptyNullUndefined(isSingleCustomerProfile) && isSingleCustomerProfile === true) 
        {
          var cif = [];
          if(isSingleCustomerProfile === true) {
          cif.push({
            "contractId": backendData[0]["contractId"],
            "coreCustomerId": backendData[0]["contractCustomers"][0]['coreCustomerId']
          });
          } else if(isSingleCustomerProfile === false) {
            var segData = scope.view.segLinkContractCustomerID.data;
            segData.forEach(x => {
              let coreCustomerIdArray = [];
              x[1].forEach(y => coreCustomerIdArray.push(y.lblContract.text));
              cif.push({
                "contractId": x[0].contractNumber,
                "coreCustomerId": coreCustomerIdArray.join(',')
              });
        }); 
            cif = JSON.stringify(cif);
          }
          this.ParserUtilsManager.setCIFIntoContext(cif,"cif");
          var cifSize = {}
          cifSize['cifLength'] = cif.length;
          this.ParserUtilsManager.setContext(cifSize);
          var contractLength = {}
          contractLength['totalContracts'] = backendData.length > 1 ? backendData.length : backendData[0]["contractCustomers"].length; 
          this.ParserUtilsManager.setContext(contractLength);
          if(!this.isEmptyNullUndefined(this._button1)){
            var button1 = JSON.parse(this._button1);
            if(button1.action.hasOwnProperty('callbackAction')){
              var callBackLevel =    button1.action.callbackAction.level;
              var callBackMethod =   button1.action.callbackAction.method;
              var context = {}
              context['pManager'] = this.ParserUtilsManager;
              this.ParserUtilsManager.setContext(context);
              this.invokeInstaceAction(callBackLevel,callBackMethod,this.ParserUtilsManager.context);	
            }}}
    },
    
    getServiceError: function(){
     kony.print("in error");
    },
    
    initialiseComponent: function (data) {
      var context = this.ParserUtilsManager.context;
      if(context['cif']){
       data = context['cif'];
//        this.setContractsData(data);
      }
      this.setDataForContracts(data);
    },
 
    //sets data from the service call
    setContractsData: function (data) {
      contractList = data;
    },
    //supposed to have the pre-existing data from the pre-show
    setDataForContracts: function (data) {
      var scope = this;
      if(typeof data === 'string')
        data = JSON.parse(data);
      
      var segmentDataMap = {
        "flxContract":"flxContract",
        "flxRowCheckBox": "flxRowCheckBox",
        "imgCheckBox": "imgCheckBox",
        "imgIcon":"imgIcon",
        "flxContractHeader":"flxContractHeader",
        "lblContract": "lblContract",
        "lblCIF": "lblCIF",
        "flxDropdown": "flxDropdown",
        "flxParentSeparator":"flxParentSeparator",
        "imgDropdown":"imgDropdown",
        "flxCustomer": "flxCustomer",
        "flxCustomerDetails": "flxCustomerDetails",
        "flxCustomerCheckbox":"flxCustomerCheckbox",
        "imgCustomerCheckbox":"imgCustomerCheckbox",
        "flxCustomerContainer":"flxCustomerContainer",
        "lblCustomerName": "lblCustomerName",
        "flxChildCaptionContainer":"flxChildCaptionContainer",
        "lblCustomerNumberText":"lblCustomerNumberText",
        "lblCustomerNumber": "lblCustomerNumber",
        "flxChildSeperator":"flxChildSeperator",
        "flxCustomerContainerData":"flxCustomerContainerData"
      };

      let segData = [];
        contractList.forEach(x => {
        let headerData = [];
        let rowData = [];

        x[this._dataGridCustomerLayerResponseRootPath].forEach(y => {
          this.totalNumberOfCustomers++;
          rowData.push({
            "lblCustomerName": {
              "skin": scope._datagridCustomerLayerLabel1skin,
              "text": y[scope._dataGridCustomerLayerLabel1]
            },
            "lblCustomerNumber": {
               "skin": scope._datagridCustomerLayerLabel2skin,
              "text": y[scope._dataGridCustomerLayerLabel2]
            },
            "imgCustomerCheckbox": {
              "src": this.checkCustomerCIFList(data,x[scope._dataGridContractLayerLabel2],y[scope._dataGridCustomerLayerLabel2])? scope._checkboxSelectedIcon: scope._checkboxUnSelectedIcon
            },
            "flxCustomerCheckbox": {
              "onClick": this.toogleCustomerCheckBox
            },
            "flxContract": {
              "isVisible": false
            },
            "flxCustomerDetails": {
              "isVisible": false
            },
            "imgCheckBox":{
              "src": scope._checkboxUnSelectedIcon
            },
            "flxParentSeparator": {
              "isVisible": false
            },
            "lblCustomerNumberText":{
              "skin": scope._datagridCustomerLayerLabel2skin,
              "isVisible":true
            },
            "imgIcon":{
              "src": y[scope._dataGridIcon1] === "true" ? this.isNotEmptyImage(scope.populateImageIntoWidget(this._personalPayeeIcon)) : this.isNotEmptyImage(scope.populateImageIntoWidget(this._businessPayeeIcon)),
              "isVisible": !this.isEmptyNullUndefined(scope._dataGridIcon1) || !this.isEmptyNullUndefined(scope._dataGridIcon2) ? true : false
            },
            "template": "CopyflxContractsCollapsed"
          });
        });
        var totalCustomersSelected = this.getCustomerNumber(data,x[this._dataGridContractLayerLabel2]);
        this.customerSelectedCount += totalCustomersSelected;
        headerData.push({
          "flxDropdown": {
            "onClick": this.toogleExpandRow
          },
          "flxRowCheckBox": {
            "onClick": this.toogleRowCheckBox
          },
          "lblContract": {
            "skin": this._datagridContractLayerLabel1skin,
            "text": x[this._dataGridContractLayerLabel1]
          },
          "contractNumber":x[this._dataGridContractLayerLabel2],
          "lblCIF": {
            "skin": this._datagridContractLayerLabel2skin,
            "text": totalCustomersSelected + " "+ kony.i18n.getLocalizedString('i18n.konybb.Common.of') + " " + x[this._dataGridCustomerLayerResponseRootPath].length
          },
          "template": "flxContractsCollapsed",
          "imgDropdown": {
            "src": this._rowExpandIcon
          },
          
          "imgCheckBox": {
                        "src": (totalCustomersSelected > 0) ? this._checkboxSelectedIcon : this._checkboxUnSelectedIcon
          },
          "flxCustomerDetails": {
            "isVisible": false
          },
          "flxContract": {
            "isVisible": true
          },
          "flxCustomer":{
            "isVisible":true
          },
          "flxParentSeparator": {
            "isVisible": true
          }
        }, rowData);
        segData.push(headerData);
      });
      this.view.segLinkContractCustomerID.widgetDataMap = segmentDataMap;
      this.view.segLinkContractCustomerID.setData(segData);
      if (this.customerSelectedCount > 0) {
        scope.view.btn1.setEnabled(true);
        scope.view.btn1.skin = this._sknActionButton;
        scope.view.btn1.focusSkin = this._sknActionButtonFocus;
      }
      this.view.forceLayout();
      kony.application.dismissLoadingScreen();
    },
    
    
    populateImageIntoWidget: function(contract){
      if(!this.isEmptyNullUndefined(contract)) {
        var contractJSON = JSON.parse(contract);
        if(contractJSON.hasOwnProperty('mapping')){
          var contextValue =  this.ParserUtilsManager.getParsedValue(contractJSON.mapping);
          if(!this.isEmptyNullUndefined(contextValue)){
            return contextValue;
          }
          else{
            return null;
          }
        }
      }
    },
    
    
    toogleExpandRow: function(eventObj, context) {
      let data = this.view.segLinkContractCustomerID.data;
      let selectedRowIndex = context.sectionIndex;

      if (data[selectedRowIndex][0].imgDropdown.src === this._rowExpandIcon) {
        data[selectedRowIndex][0].imgDropdown.src = this._rowCollpaseIcon;
        data[selectedRowIndex][0].flxCustomer.isVisible = true;
        data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = true);
      } else {
        data[selectedRowIndex][0].imgDropdown.src = this._rowExpandIcon ;
        data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = false);
      }
      this.view.segLinkContractCustomerID.setData(data);
    },

    toogleRowCheckBox: function (eventObj, context, index) {
		var scope = this;
      let data = this.view.segLinkContractCustomerID.data;
      let selectedRowIndex;

      if (index !== undefined && index >= 0) {
        selectedRowIndex = index;
      } else {
        selectedRowIndex = context.sectionIndex;
      }
      let customerLength = data[selectedRowIndex][1].length;

      if (data[selectedRowIndex][0].imgCheckBox.src === this._checkboxUnSelectedIcon) {
        data[selectedRowIndex][0].imgCheckBox.src = this._checkboxSelectedIcon;
        data[selectedRowIndex][0].lblCIF.text = customerLength + " " + kony.i18n.getLocalizedString('i18n.konybb.Common.of') + " " + customerLength;
        data[selectedRowIndex][1].forEach(function(x) {
          if(x.imgCustomerCheckbox.src === scope._checkboxUnSelectedIcon){
            x.imgCustomerCheckbox.src = scope._checkboxSelectedIcon;
            scope.selectedCustomerCount(1,true);
          }
        });
        //this.selectedCustomerCount(customerLength,true);
      } else {
        data[selectedRowIndex][0].imgCheckBox.src = this._checkboxUnSelectedIcon;
        data[selectedRowIndex][0].lblCIF.text = 0 + " " + kony.i18n.getLocalizedString('i18n.konybb.Common.of') + " " + customerLength;
        data[selectedRowIndex][1].forEach(function(x) {
          if(x.imgCustomerCheckbox.src === scope._checkboxSelectedIcon){
            x.imgCustomerCheckbox.src = scope._checkboxUnSelectedIcon;
            scope.selectedCustomerCount(1,false);
          }
        });
        //this.selectedCustomerCount(customerLength,false);
      }
      this.view.segLinkContractCustomerID.setData(data);
    },

    toogleCustomerCheckBox: function (eventObj, context) {
      var scope = this;
      let data = this.view.segLinkContractCustomerID.data;
      let selectedRowIndex = context.rowIndex;
      let selectedSectionIndex = context.sectionIndex;
      let length = 0;
      let customerLength = data[selectedSectionIndex][1].length;
      data[selectedSectionIndex][1][selectedRowIndex].imgCustomerCheckbox.src === this._checkboxUnSelectedIcon ? data[selectedSectionIndex][1][selectedRowIndex].imgCustomerCheckbox.src = this._checkboxSelectedIcon : data[selectedSectionIndex][1][selectedRowIndex].imgCustomerCheckbox.src = this._checkboxUnSelectedIcon;
      if(data[selectedSectionIndex][1][selectedRowIndex].imgCustomerCheckbox.src === this._checkboxUnSelectedIcon){
		this.selectedCustomerCount(1,false);
      } else {
        this.selectedCustomerCount(1,true);
      }
      data[selectedSectionIndex][1].forEach(x => {
        if (x.imgCustomerCheckbox.src === scope._checkboxUnSelectedIcon) {
          length++;
        }
      });
            (customerLength - length) === 0 ? data[selectedSectionIndex][0].imgCheckBox.src = scope._checkboxUnSelectedIcon : data[selectedSectionIndex][0].imgCheckBox.src = scope._checkboxSelectedIcon;
      data[selectedSectionIndex][0].lblCIF.text = customerLength - length + " " + kony.i18n.getLocalizedString('i18n.konybb.Common.of') + " " + customerLength;
      //this.selectedCustomerCount(customerLength,false);
      this.view.segLinkContractCustomerID.setData(data);

    },

    createCIFData: function () {
       var scope = this;
      var  segData = this.view.segLinkContractCustomerID.data; 
      var cif = [];
      var customerCount = 0;
      segData.forEach(function(contract) {
        var coreCustomerIdArray = [];
        contract[1].forEach(function(customer){  
          if(customer.imgCustomerCheckbox["src"] ===  scope._checkboxSelectedIcon){
            coreCustomerIdArray.push(customer.lblCustomerNumber.text);
            customerCount++;
          }
        });
        cif.push({
          "contractId": contract[0].contractNumber,
          "coreCustomerId": coreCustomerIdArray.join(',')
        });
      });
     // var navMan = applicationManager.getNavigationManager();
    //  navMan.setCustomInfo("totalContractCustomerSelected",customerCount);
      
      var customersCount = {};
    
      if(this._separatorSuffixLinkedCustomers!== null && this._separatorSuffixLinkedCustomers!== undefined && this._separatorSuffixLinkedCustomers!== ""){
        var separator  = kony.i18n.getLocalizedString(JSON.parse(this._separatorSuffixLinkedCustomers).separator);
        var suffix = kony.i18n.getLocalizedString(JSON.parse(this._separatorSuffixLinkedCustomers).suffix);
        customersCount['selectedCustomersWithSeparatorSuffix'] = customerCount + " "+ separator  + " " + this.totalNumberOfCustomers + " " + suffix;
      }
      else{
        customersCount['selectedCustomersWithSeparatorSuffix'] = customerCount + " "+ this.totalNumberOfCustomers;
      }
     
   	 this.ParserUtilsManager.setContext(customersCount);
       cif = JSON.stringify(cif);
     this.ParserUtilsManager.setCIFIntoContext(cif,"cif");
       
      var cifSize = {}
      cifSize['cifLength'] = cif.length;
      this.ParserUtilsManager.setContext(cifSize);
      var contractLength = {}
      contractLength['totalContracts'] = this.totalNumberOfCustomers;
      this.ParserUtilsManager.setContext(contractLength);
      if(this.ParserUtilsManager.context['flowType'] === "EDIT") {
        if(!this.isEmptyNullUndefined(this._button1Edit)){
          var button1Edit = JSON.parse(this._button1Edit);
          if(button1Edit.action.hasOwnProperty('callbackAction')){
            var callBackLevel =    button1Edit.action.callbackAction.level;
            var callBackMethod =   button1Edit.action.callbackAction.method;
            this.invokeInstaceAction(callBackLevel,callBackMethod,this.ParserUtilsManager.context);
          }
        }
      }
      else {
        if(!this.isEmptyNullUndefined(this._button1)){
          var button1 = JSON.parse(this._button1);
          if(button1.action.hasOwnProperty('callbackAction')){
            var callBackLevel =    button1.action.callbackAction.level;
            var callBackMethod =   button1.action.callbackAction.method;
            this.invokeInstaceAction(callBackLevel,callBackMethod,this.ParserUtilsManager.context);
          }
        }
      }
      return cif;
    },

   
    /**
      * setParentScope.
      * This Method is exposed to the form to pass the Form Scope.
      */
    setParentScope: function(scope){
      this._parentScope = scope;
    },

    setContext: function(context, scope) {     
      this.ParserUtilsManager = new ParserUtilsManager();
        if(context){
          if(context.flowType !== "EDIT"){
          //   	if(!this.ParserUtilsManager){
          this.ParserUtilsManager = context['pManager'];
          //      }
          if(context['pManager']){
            delete context['pManager'];
          } 
        }      
      this.setParentScope(scope);
      this.ParserUtilsManager.setContext(context);
    }
    },
    onSearchBtnClick: function(searchQuery) {
      var scope = this;
      var searchQuery = scope.view.tbxSearch.text
      var scopeObj = this;
      if (kony.sdk.isNullOrUndefined(searchQuery) || searchQuery === "") {
        scopeObj.clearSearch();
      } else {
        scopeObj.setSearchData(searchQuery);
      }
    },

    setSearchData: function(searchQuery) {
      var scopeObj = this;
      var data = scopeObj.view.segLinkContractCustomerID.data;
      var resultsFound = false;
      for (var i = 0; i < data.length; i++) {
        data[i][0].flxContract.height = "0dp";
        for (var j = 0; j < data[i][1].length; j++) {
          if ((data[i][0].lblContract && data[i][0].lblContract.text && data[i][0].lblContract.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) 
              || (data[i][1][j].lblCustomerName && data[i][1][j].lblCustomerName.text && data[i][1][j].lblCustomerName.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) 
              || (data[i][1][j].lblCustomerNumber && data[i][1][j].lblCustomerNumber.text && data[i][1][j].lblCustomerNumber.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)) {
            resultsFound = true;
            data[i][1][j].flxCustomerDetails.height = "65dp";
            data[i][0].flxContract.height = "60dp";
          } else {
            data[i][1][j].flxCustomerDetails.height = "0dp";
          }
        }
      }
      if (resultsFound) {
        scopeObj.view.flxNoContracts.setVisibility(false);
      } else {
        scopeObj.view.segLinkContractCustomerID.setVisibility(false);
        scopeObj.view.flxNoContracts.setVisibility(true);
      }
      scopeObj.view.segLinkContractCustomerID.setData(data);
      scopeObj.view.forceLayout();
    },

    clearSearch: function() {
      var scopeObj = this;
      var data = scopeObj.view.segLinkContractCustomerID.data;
      for (var i = 0; i < data.length; i++) {
        data[i][0].flxContract.height = "60dp";
        for (var j = 0; j < data[i][1].length; j++) {
          data[i][1][j].flxCustomerDetails.height = "65dp";
        }
      }
      scopeObj.view.flxNoContracts.setVisibility(false);
      scopeObj.view.segLinkContractCustomerID.setVisibility(true);
      scopeObj.view.segLinkContractCustomerID.setData(data);
      scopeObj.view.forceLayout();
    },

    checkCustomerCIFList: function(cifList, contractId, customerId){
      var isChecked = false;
      if(cifList !== undefined){
        for(var i = 0; i< cifList.length;i++){
          if(cifList[i].contractId === contractId){
            var customerList = cifList[i].coreCustomerId;
            if(customerList.includes(customerId)){
              isChecked = true;
              break;
            }
          }
        }
      }
      return isChecked;
    },

    getCustomerNumber: function(cifList, contractId){
      var totalCustomersSelected = 0;
      if(cifList !== undefined){
        for(var i = 0; i< cifList.length;i++){
          if(cifList[i].contractId === contractId){
            totalCustomersSelected = (cifList[i].coreCustomerId !== "")? cifList[i].coreCustomerId.split(",").length : 0;
            break;
          }
        }
      }
      return totalCustomersSelected;
    },

    selectedCustomerCount(count,isChecked){
      var scope = this;
      if(isChecked){
        this.customerSelectedCount += count;
      } else{
        this.customerSelectedCount -= count;
      }
      
      if(this.customerSelectedCount === 0){
        scope.view.btn1.setEnabled(false);
        scope.view.btn1.skin = this._sknActionButtonBlocked;
		scope.view.btn1.focusSkin =  this._sknActionButtonBlocked;
      } else{
       scope.view.btn1.setEnabled(true);
       scope.view.btn1.skin = this._sknActionButton;
	   scope.view.btn1.focusSkin = this._sknActionButtonFocus;
      }
      
    },
    
    /**
   * get i18n value for the String.
   *
   * @param {String} text
   * 
   * @return {String} - i18n value for string
   */
  geti18nText(text){
    var i18ntext = "";
    try{
    i18ntext = kony.i18n.getLocalizedString(text);
    if(i18ntext != "" && i18ntext != undefined && i18ntext != null)
      	return i18ntext;
    return text;
    }catch(e){
		kony.print(e);
    }
  }
  };
});