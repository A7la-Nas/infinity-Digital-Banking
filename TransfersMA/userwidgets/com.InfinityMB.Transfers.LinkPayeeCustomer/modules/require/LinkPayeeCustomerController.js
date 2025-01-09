define([ './ParserUtilsManager','./UnifiedTransferDAO','FormatUtil','./DataProcessorUtility','JSONValidator'], function (ParserUtilsManager, UnifiedTransferDAO,FormatUtil,DataProcessorUtility,JSONValidator)  {
  var contractList = {};
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._cifObjectService="";
      this._contractSubHeader="";
      this._subHeaderLabel1="";
      this._button1="";
      this._sknContentFlex="";
      this._cifObject="";
      this._contractListTitle="";
      this._subHeaderLabel2="";
      this._selectAllBtn="";
      this._sknHeadingBg="";
      this._cifOperation="";
      this._contractListArrayKey="";
      this._customerListTitle="";
      this._deselectAllBtn="";
      this._sknDatagridHeadingLabel="";
      this._iconCheckboxSelected="";
      this._cifCriteria="";
      this._selectedText="";
      this._selectedTextContract="";
      this._btnDone="";
      this._sknCancelBtn="";
      this._iconCheckboxUnSelected="";
      this._cifIdentifier="";
      this._contractDataGridLabel1="";
      this._selectedCustomerCount="";
      this._sknSubhdrBg="";
      this._iconBusinessPayeeIcon="";
      this._contractDataGridLabel2="";
      this._customerListArrayKey="";
      this._sknSubhdrTxt="";
      this._iconpersonalPayee="";
      this._customerDataGridLabel1="";
      this._sknSelectedSubhdrVal1="";
      this._iconRightArrow="";
      this._customerDataGridLabel2="";
      this._sknSelectedSubhdrVal2="";
      this._iconBack="";
      this._businessIconCondition="";
      this._sknSubhdrSeparator="";
      this._retailIconCondition="";
      this._sknSelectedCountSkn="";
      this._sknSelectDeselectAll="";
      this._sknSelectHeaderRowSeparator="";
      this._sknParentRow="";
      this._sknChildRow="";
      this._sknParentLayerValue1="";
      this._sknParentLayerValue2="";
      this._sknChildLayerValue1="";
      this._sknChildLayerValue2="";
      this._sknActionBtn="";
      this._sknActionBtnDisabled="";
      this._sknActionBtnFocus="";
      // Object.
      this.unifiedTransferDAO = new UnifiedTransferDAO();    
      this.dataProcessorUtility = new DataProcessorUtility();
      this.parserUtilsManager = new ParserUtilsManager();
      this.FormatUtils = new FormatUtil();
      this.jsonValidator = new JSONValidator();
      //global

      this.context ={};  
      this.inputPool={};
      this.selectCustomers={};
      this.ParserUtilsManager = new ParserUtilsManager();
      this.textInputsMapping = {};   
      this.componentContext = {};
      this.unicode="";
      this.response="";
      this.totaCustomerListCount="";
      this.customerSelectedCount="";
      this.totalNumberOfCustomers = "";
      this.customerListSelectedArray="";
      this.contractListArray="";
      this.customerListArray="";
      this.contractList="";
      this.selectedContractId="";
         },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'cifObjectService', () => {
        return this._cifObjectService;
      });
      defineSetter(this, 'cifObjectService', value => {
        this._cifObjectService = value;
      });
      defineGetter(this, 'contractSubHeader', () => {
        return this._contractSubHeader;
      });
      defineSetter(this, 'contractSubHeader', value => {
        this._contractSubHeader = value;
      });
      defineGetter(this, 'subHeaderLabel1', () => {
        return this._subHeaderLabel1;
      });
      defineSetter(this, 'subHeaderLabel1', value => {
        this._subHeaderLabel1 = value;
      });
      defineGetter(this, 'button1', () => {
        return this._button1;
      });
      defineSetter(this, 'button1', value => {
        this._button1 = value;
      });
      defineGetter(this, 'sknContentFlex', () => {
        return this._sknContentFlex;
      });
      defineSetter(this, 'sknContentFlex', value => {
        this._sknContentFlex = value;
      });
      defineGetter(this, 'cifObject', () => {
        return this._cifObject;
      });
      defineSetter(this, 'cifObject', value => {
        this._cifObject = value;
      });
      defineGetter(this, 'contractListTitle', () => {
        return this._contractListTitle;
      });
      defineSetter(this, 'contractListTitle', value => {
        this._contractListTitle = value;
      });
      defineGetter(this, 'subHeaderLabel2', () => {
        return this._subHeaderLabel2;
      });
      defineSetter(this, 'subHeaderLabel2', value => {
        this._subHeaderLabel2 = value;
      });
      defineGetter(this, 'selectAllBtn', () => {
        return this._selectAllBtn;
      });
      defineSetter(this, 'selectAllBtn', value => {
        this._selectAllBtn = value;
      });
      defineGetter(this, 'sknHeadingBg', () => {
        return this._sknHeadingBg;
      });
      defineSetter(this, 'sknHeadingBg', value => {
        this._sknHeadingBg = value;
      });
      defineGetter(this, 'cifOperation', () => {
        return this._cifOperation;
      });
      defineSetter(this, 'cifOperation', value => {
        this._cifOperation = value;
      });
      defineGetter(this, 'contractListArrayKey', () => {
        return this._contractListArrayKey;
      });
      defineSetter(this, 'contractListArrayKey', value => {
        this._contractListArrayKey = value;
      });
      defineGetter(this, 'customerListTitle', () => {
        return this._customerListTitle;
      });
      defineSetter(this, 'customerListTitle', value => {
        this._customerListTitle = value;
      });
      defineGetter(this, 'deselectAllBtn', () => {
        return this._deselectAllBtn;
      });
      defineSetter(this, 'deselectAllBtn', value => {
        this._deselectAllBtn = value;
      });
      defineGetter(this, 'sknDatagridHeadingLabel', () => {
        return this._sknDatagridHeadingLabel;
      });
      defineSetter(this, 'sknDatagridHeadingLabel', value => {
        this._sknDatagridHeadingLabel = value;
      });
      defineGetter(this, 'iconCheckboxSelected', () => {
        return this._iconCheckboxSelected;
      });
      defineSetter(this, 'iconCheckboxSelected', value => {
        this._iconCheckboxSelected = value;
      });
      defineGetter(this, 'cifCriteria', () => {
        return this._cifCriteria;
      });
      defineSetter(this, 'cifCriteria', value => {
        this._cifCriteria = value;
      });
      defineGetter(this, 'selectedTextContract', () => {
        return this._selectedTextContract;
      });
      defineSetter(this, 'selectedTextContract', value => {
        this._selectedTextContract = value;
      });
      defineGetter(this, 'selectedTextCustomer', () => {
        return this._selectedTextCustomer;
      });
      defineSetter(this, 'selectedTextCustomer', value => {
        this._selectedTextCustomer = value;
      });
      defineGetter(this, 'btnDone', () => {
        return this._btnDone;
      });
      defineSetter(this, 'btnDone', value => {
        this._btnDone = value;
      });
      defineGetter(this, 'sknCancelBtn', () => {
        return this._sknCancelBtn;
      });
      defineSetter(this, 'sknCancelBtn', value => {
        this._sknCancelBtn = value;
      });
      defineGetter(this, 'iconCheckboxUnSelected', () => {
        return this._iconCheckboxUnSelected;
      });
      defineSetter(this, 'iconCheckboxUnSelected', value => {
        this._iconCheckboxUnSelected = value;
      });
      defineGetter(this, 'cifIdentifier', () => {
        return this._cifIdentifier;
      });
      defineSetter(this, 'cifIdentifier', value => {
        this._cifIdentifier = value;
      });
      defineGetter(this, 'contractDataGridLabel1', () => {
        return this._contractDataGridLabel1;
      });
      defineSetter(this, 'contractDataGridLabel1', value => {
        this._contractDataGridLabel1 = value;
      });
      defineGetter(this, 'selectedCustomerCount', () => {
        return this._selectedCustomerCount;
      });
      defineSetter(this, 'selectedCustomerCount', value => {
        this._selectedCustomerCount = value;
      });
      defineGetter(this, 'sknSubhdrBg', () => {
        return this._sknSubhdrBg;
      });
      defineSetter(this, 'sknSubhdrBg', value => {
        this._sknSubhdrBg = value;
      });
      defineGetter(this, 'iconBusinessPayeeIcon', () => {
        return this._iconBusinessPayeeIcon;
      });
      defineSetter(this, 'iconBusinessPayeeIcon', value => {
        this._iconBusinessPayeeIcon = value;
      });
      defineGetter(this, 'contractDataGridLabel2', () => {
        return this._contractDataGridLabel2;
      });
      defineSetter(this, 'contractDataGridLabel2', value => {
        this._contractDataGridLabel2 = value;
      });
      defineGetter(this, 'customerListArrayKey', () => {
        return this._customerListArrayKey;
      });
      defineSetter(this, 'customerListArrayKey', value => {
        this._customerListArrayKey = value;
      });
      defineGetter(this, 'sknSubhdrTxt', () => {
        return this._sknSubhdrTxt;
      });
      defineSetter(this, 'sknSubhdrTxt', value => {
        this._sknSubhdrTxt = value;
      });
      defineGetter(this, 'iconpersonalPayee', () => {
        return this._iconpersonalPayee;
      });
      defineSetter(this, 'iconpersonalPayee', value => {
        this._iconpersonalPayee = value;
      });
      defineGetter(this, 'customerDataGridLabel1', () => {
        return this._customerDataGridLabel1;
      });
      defineSetter(this, 'customerDataGridLabel1', value => {
        this._customerDataGridLabel1 = value;
      });
      defineGetter(this, 'sknSelectedSubhdrVal1', () => {
        return this._sknSelectedSubhdrVal1;
      });
      defineSetter(this, 'sknSelectedSubhdrVal1', value => {
        this._sknSelectedSubhdrVal1 = value;
      });
      defineGetter(this, 'iconRightArrow', () => {
        return this._iconRightArrow;
      });
      defineSetter(this, 'iconRightArrow', value => {
        this._iconRightArrow = value;
      });
      defineGetter(this, 'customerDataGridLabel2', () => {
        return this._customerDataGridLabel2;
      });
      defineSetter(this, 'customerDataGridLabel2', value => {
        this._customerDataGridLabel2 = value;
      });
      defineGetter(this, 'sknSelectedSubhdrVal2', () => {
        return this._sknSelectedSubhdrVal2;
      });
      defineSetter(this, 'sknSelectedSubhdrVal2', value => {
        this._sknSelectedSubhdrVal2 = value;
      });
      defineGetter(this, 'iconBack', () => {
        return this._iconBack;
      });
      defineSetter(this, 'iconBack', value => {
        this._iconBack = value;
      });
      defineGetter(this, 'businessIconCondition', () => {
        return this._businessIconCondition;
      });
      defineSetter(this, 'businessIconCondition', value => {
        this._businessIconCondition = value;
      });
      defineGetter(this, 'sknSubhdrSeparator', () => {
        return this._sknSubhdrSeparator;
      });
      defineSetter(this, 'sknSubhdrSeparator', value => {
        this._sknSubhdrSeparator = value;
      });
      defineGetter(this, 'retailIconCondition', () => {
        return this._retailIconCondition;
      });
      defineSetter(this, 'retailIconCondition', value => {
        this._retailIconCondition = value;
      });
      defineGetter(this, 'sknSelectedCountSkn', () => {
        return this._sknSelectedCountSkn;
      });
      defineSetter(this, 'sknSelectedCountSkn', value => {
        this._sknSelectedCountSkn = value;
      });
      defineGetter(this, 'sknSelectDeselectAll', () => {
        return this._sknSelectDeselectAll;
      });
      defineSetter(this, 'sknSelectDeselectAll', value => {
        this._sknSelectDeselectAll = value;
      });
      defineGetter(this, 'sknSelectHeaderRowSeparator', () => {
        return this._sknSelectHeaderRowSeparator;
      });
      defineSetter(this, 'sknSelectHeaderRowSeparator', value => {
        this._sknSelectHeaderRowSeparator = value;
      });
      defineGetter(this, 'sknParentRow', () => {
        return this._sknParentRow;
      });
      defineSetter(this, 'sknParentRow', value => {
        this._sknParentRow = value;
      });
      defineGetter(this, 'sknChildRow', () => {
        return this._sknChildRow;
      });
      defineSetter(this, 'sknChildRow', value => {
        this._sknChildRow = value;
      });
      defineGetter(this, 'sknParentLayerValue1', () => {
        return this._sknParentLayerValue1;
      });
      defineSetter(this, 'sknParentLayerValue1', value => {
        this._sknParentLayerValue1 = value;
      });
      defineGetter(this, 'sknParentLayerValue2', () => {
        return this._sknParentLayerValue2;
      });
      defineSetter(this, 'sknParentLayerValue2', value => {
        this._sknParentLayerValue2 = value;
      });
      defineGetter(this, 'sknChildLayerValue1', () => {
        return this._sknChildLayerValue1;
      });
      defineSetter(this, 'sknChildLayerValue1', value => {
        this._sknChildLayerValue1 = value;
      });
      defineGetter(this, 'sknChildLayerValue2', () => {
        return this._sknChildLayerValue2;
      });
      defineSetter(this, 'sknChildLayerValue2', value => {
        this._sknChildLayerValue2 = value;
      });
      defineGetter(this, 'sknActionBtn', () => {
        return this._sknActionBtn;
      });
      defineSetter(this, 'sknActionBtn', value => {
        this._sknActionBtn = value;
      });
      defineGetter(this, 'sknActionBtnDisabled', () => {
        return this._sknActionBtnDisabled;
      });
      defineSetter(this, 'sknActionBtnDisabled', value => {
        this._sknActionBtnDisabled = value;
      });
      defineGetter(this, 'sknActionBtnFocus', () => {
        return this._sknActionBtnFocus;
      });
      defineSetter(this, 'sknActionBtnFocus', value => {
        this._sknActionBtnFocus = value;
      });
      defineGetter(this, 'subHeaderContractId', () => {
        return this._subHeaderContractId;
      });
      defineSetter(this, 'subHeaderContractId', value => {
        this._subHeaderContractId = value;
      });
    },

    /**
     * Component setContext.
     * To collect the context object required for the component. 
     * @param: context{JSONobject} - account object.
     */
    setContext: function(context) {
      var scope = this;
      try{
        this.screen1VisibilityOn();
        this.screen2VisibilityOff();
		scope.getLinkPayee();
        if(!scope.isEmptyNullUndefined(context))
        {
          this.inputPool["linkPayee"] = context;
        }
        this.setParentScope(scope);
        this.parserUtilsManager.setContext(context);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContext method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**
     * Component preShow
     * Reponsible to retain the data for custom properties for multiple entries into the component
     * Invoke the DAO layer to collect information from the service
     */
    preShow: function() {
      var scope = this;
      try {
        this.selectCustomers={};
        this.screen1VisibilityOn();
        this.screen2VisibilityOff();
        scope.setLinkPayeeDefaultText();
        scope.setLinkPayeeSkins();
        scope.setLinkPayeeActions();
        

      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in preshow method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**
     * Component getFieldValue
     * Parse the exposed contract value based on accountType selected and breakpoint consideration
     * @param: Value{string} - value collected from exposed contract
     * @param: key{string} - lookup key in the JSON string
     * @return : {string} - Processed value
     */
    getFieldValue: function (Value, key) {
      try {
        var value = Value;
        if (value["default"]) {
          value = value["default"];
        }  
        if (!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)) {
          value = value[key];
        }
        if (value.includes("inputPool")){
          value = value.split(".")[2];
          value=value.slice(0,-1);
          return this.inputPool[value];
        }
        if (value !== null && value !== "" && value !== undefined) {
          return this.getProcessedText(value);
        } else
          return "";
      } catch (err) {
        kony.print(err);
      }
      return this.getProcessedText(value);
    },

    /**
     * Component setLinkPayeeDefaultText
     * set default text for set Link payee
     */
    setLinkPayeeDefaultText: function(){
      var scope = this;
      try {         
        scope.view.lblLinkPayeeSubHeader.text = scope.getFieldValue(scope._contractSubHeader);
        scope.view.lblLinkPayeeSubHeader1.text = scope.getFieldValue(scope._subHeaderLabel1);
        scope.view.lblLinkPayeeSubHeader2.text = scope.getFieldValue(scope._subHeaderLabel2);
        scope.view.lblSelectTextContract.text = scope.getFieldValue(scope._contractListTitle);
        scope.view.btnSelectAllContract.text = scope.getFieldValue(scope._selectAllBtn,"text");
        scope.view.btnDeselectAllContract.text = scope.getFieldValue(scope._deselectAllBtn,"text");
        scope.view.lblSelectTextCustomer.text = scope.getFieldValue(scope._customerListTitle);
        scope.view.lblSelectedCountCustomer.text = scope.getFieldValue(scope._selectedTextCustomer);
        scope.view.btnSelectAllCustomer.text = scope.getFieldValue(scope._selectAllBtn,"text");
        scope.view.btnDeselectAllCustomer.text = scope.getFieldValue(scope._deselectAllBtn,"text");          
        scope.view.btn1.text = scope.getFieldValue(scope._button1,"text");
        scope.view.btn2.text = scope.getFieldValue(scope._btnDone,"text");
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinkPayeeDefaultText method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setLinkPayeeSkins
     * set default skins for set Link Payee
     */
    setLinkPayeeSkins: function(){
      var scope = this;
      try {         
        scope.view.flxMain.skin = scope.getFieldValue(scope._contentFlexSkin);
        scope.view.flxMainContainer.skin = scope.getFieldValue(scope._contentFlexSkin);
        scope.view.flxLinkPayeeSubHeader.skin = scope.getFieldValue(scope._contentFlexSkin);
        scope.view.lblLinkPayeeSubHeader.skin = scope.getFieldValue(scope._sknSubhdrTxt);
        scope.view.lblLinkPayeeSubHeader1.skin = scope.getFieldValue(scope._sknSelectedSubhdrVal1);
        scope.view.lblLinkPayeeSubHeader2.skin = scope.getFieldValue(scope._sknSelectedSubhdrVal2);	
        scope.view.flxLinkPayeeSubHeaderSeparator.skin = scope.getFieldValue(scope._sknSubhdrSeparator);		
        scope.view.flxLinkContractSelectHeader.skin = scope.getFieldValue(scope._contentFlexSkin);		 
        scope.view.lblSelectedCountContract.skin = scope.getFieldValue(scope._sknSelectedCountSkn);
        scope.view.lblSelectTextContract.skin = scope.getFieldValue(scope._sknSelectedCountSkn);
        scope.view.btnSelectAllContract.skin = scope.getFieldValue(scope._sknSelectDeselectAll);
        scope.view.btnDeselectAllContract.skin = scope.getFieldValue(scope._sknSelectDeselectAll);
        scope.view.lblSelectedCountCustomer.skin = scope.getFieldValue(scope._sknSelectedCountSkn);
        scope.view.lblSelectTextCustomer.skin = scope.getFieldValue(scope._sknSelectedCountSkn);
        scope.view.btnSelectAllCustomer.skin = scope.getFieldValue(scope._sknSelectDeselectAll);
        scope.view.btnDeselectAllCustomer.skin = scope.getFieldValue(scope._sknSelectDeselectAll);          
        scope.view.flxLinkContractHeaderSeparator.skin = scope.getFieldValue(scope._sknSelectHeaderRowSeparator);
        scope.view.flxLinkContractButton.skin=scope.getFieldValue(scope._contentFlexSkin);
        scope.view.btn1.skin=scope.getFieldValue(scope._sknActionBtnDisabled);
        scope.view.btn2.skin=scope.getFieldValue(scope._sknActionBtn);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinkPayeeSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setLinkPayeeSkins
     * set default skins for Link payee 
     */
    setLinkPayeeActions: function(){
      var scope = this;
      try {
        scope.view.btnSelectAllContract.onClick=scope.onSelectAllContract;
        scope.view.btnDeselectAllContract.onClick=scope.onDeselectAllContract;
        scope.view.btnSelectAllCustomer.onClick=scope.onSelectAllCustomer;
        scope.view.btnDeselectAllCustomer.onClick=scope.onDeselectAllCustomer;
        scope.view.btn1.onClick=scope.onLinkPayeeBtnContinue;
        scope.view.btn2.onClick=scope.onLinkPayeeDone;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinkPayeeActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**
     * Component getLinkPayee
     * Invoke service call for link payee 
     */
    getLinkPayee: function(){
      var scope=this;
      try{
        var self = this;
        var objSvcName = this.getFieldValue(this._cifObjectService);
        var objName = this.getFieldValue(this._cifObject);
        var operationName = this.getFieldValue(this._cifOperation);
        var criteria = this.getCriteria(this._cifCriteria);
        var identifier = this.getFieldValue(this._cifIdentifier);
        this.unifiedTransferDAO.invokeService
        (objSvcName,objName,operationName,criteria,identifier,this.getServiceSuccess,self.getServiceError);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinkPayeeActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**
     * Component getServiceSuccess
     *  service success call for link payee 
     */
    getServiceSuccess: function(data,unicode){
      var scope=this , oneCustomer , oneContract;
      try{
        scope.response=data;
        var dataGridContractLayerResponseRootPath =  scope.getFieldValue(scope._contractListArrayKey);       
        var dataGridCustomerLayerResponseRootPath =  scope.getFieldValue(scope._customerListArrayKey);       
        var customerListCount=0;
        if(data[dataGridContractLayerResponseRootPath].length!==0){
          for(var i=0;i<data[dataGridContractLayerResponseRootPath].length;i++){
            customerListCount=customerListCount+ data[dataGridContractLayerResponseRootPath][i][dataGridCustomerLayerResponseRootPath].length;  
            oneCustomer = data[dataGridContractLayerResponseRootPath][i][dataGridCustomerLayerResponseRootPath][0].coreCustomerId;
            oneContract = data[dataGridContractLayerResponseRootPath][i].contractId;
          }
          this.totaCustomerListCount= customerListCount;      
          if(customerListCount<2)
          {
            this.selectCustomers[oneContract]= oneCustomer;
           scope.onLinkPayeeContinue(this.selectCustomers,"");
            return;
          }
        }
        this.unicode=unicode;         
        this.map = {};
        this.readObject(data);
        this.parserUtilsManager.setResponseData(unicode,this.map);        
        if(!this.isEmptyNullUndefined(dataGridContractLayerResponseRootPath)){ 
          if(data.hasOwnProperty(dataGridContractLayerResponseRootPath)){   
            this.setContractsData(data[dataGridContractLayerResponseRootPath]);
          }
          this.initialiseComponent(data);
        }            
        else{
          this.view.segLinkPayeeContract.isVisible(false);
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in serviceSuccess method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**
        * Component getServiceError.
        failure call for service
        */
    getServiceError: function(){
      var scope=this;
      try{
       kony.print("in error");
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in service failure method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
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

    /**
        * Component initialiseComponent.
     	set context to response
        */
    initialiseComponent: function (data) {
      try{
        var context = this.ParserUtilsManager.context;      
        this.setLinkPayeeDataforContracts(data);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in initialiseComponent method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },	

    /**
        * Component setContractsData.
     	set  response to contractList
        */
    setContractsData: function (data) {
      try{
        this.contractList = data;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in initialiseComponent method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
        * Component setLinkPayeeDataforContracts.
     	set  response to contract segment
        */
    setLinkPayeeDataforContracts: function(data)
    {
      var scope = this;
      try{
        if(typeof data === 'string')
          data = JSON.parse(data);
        var segmentDataMap = {
          "flxLinkPayeeContractRow":"flxLinkPayeeContractRow",
          "flxRowCheckBox": "flxRowCheckBox",
          "imgCheckBox": "imgCheckBox",        
          "flxContractHeader":"flxContractHeader",
          "lblContract": "lblContract",
          "lblCIF": "lblCIF",
          "flxDropdown": "flxDropdown",
          "imgDropdown":"imgDropdown",
          "flxParentSeperator":"flxParentSeperator",
          "customerData":"customerData"
        };
        let segData = [];
        let headerData = [];
        let rowData = [];
        this.contractList.forEach(x => {
          var dataGridCustomerLayerResponseRootPath =  scope.getFieldValue(scope._customerListArrayKey);
          headerData.push({
            "flxDropdown": {
              "onClick": this.toogleExpandRow
            },
            "flxRowCheckBox": {
              "onClick": this.toogleRowContractCheckBox
            },
            "lblContract": {
              "skin": this._sknParentLayerValue1,
              "text": x[this.getFieldValue(this._contractDataGridLabel1)],
              "isVisible":!this.isEmptyNullUndefined(x[this.getFieldValue(this._contractDataGridLabel1)])?true:false,
              "top":!this.isEmptyNullUndefined(x[scope.getFieldValue(this._customerListArrayKey)].length)?"10dp":"15dp"
         
            },
            "lblCIF": {
              "skin": this._sknParentLayerValue2,
              "text": '0' + " of " + x[scope.getFieldValue(this._customerListArrayKey)].length +" Selected CIF",           	
              "isVisible":!this.isEmptyNullUndefined(x[scope.getFieldValue(this._customerListArrayKey)].length)?true:false,
               "top":!this.isEmptyNullUndefined(x[this.getFieldValue(this._contractDataGridLabel1)])?"0dp":"20dp"
         
            },
            "contractId":x[scope.getFieldValue(scope._subHeaderContractId)],
            "template": "flxLinkPayeeContractRow",
            "imgDropdown": {
              "src": this._iconRightArrow
            },
            "imgCheckBox": {
              "src":this._iconCheckboxUnSelected,
            },
            "flxParentSeparator": {
              "isVisible": true
            },
            "customerData":x["contractCustomers"]
          });
        });
        this.view.segLinkPayeeContract.widgetDataMap = segmentDataMap;
        this.view.segLinkPayeeContract.setData(headerData);   
        if(!this.isEmptyNullUndefined(this.inputPool["linkPayee"]))
          {
            this.setContractsFromContext();
          }
        this.contractListArray=headerData;
        this.view.forceLayout();
        kony.application.dismissLoadingScreen();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContracts method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setLinkPayeeDataforCustomers
     * set dat to customer segment
     */
    setLinkPayeeDataforCustomers:function(data,selectedContractId)
    {
      var scope = this;
      try{
        let rowData = [];
        var segDataCustomers={};
        var segmentDataMap = {
          "flxLinkPayeeCustomerRow": "flxLinkPayeeCustomerRow", 
          "flxIcon":"flxIcon",
          "imgIcons":"imgIcons",
          "flxCustomerCheckBox":"flxCustomerCheckBox",
          "imgCustomerCheckBox":"imgCustomerCheckBox",
          "flxCustomerContainer":"flxCustomerContainer",
          "lblCustomerName": "lblCustomerName",
          "flxChildCaptionContainer":"flxChildCaptionContainer",
          "lblCustomerNumberText":"lblCustomerNumberText",
          "lblCustomerNumber": "lblCustomerNumber",
          "flxChildSeperator":"flxChildSeperator",
          "flxCustomerContainerData":"flxCustomerContainerData"
        };
        data.forEach(y => {
          this.totalNumberOfCustomers++;
          var customerDataGridLabel2,customerDataGridLabel,customerDataGridValue;
          if(!this.isEmptyNullUndefined(scope._customerDataGridLabel2)){ 
            if((scope._customerDataGridLabel2).includes(":"))
            {
              customerDataGridLabel2=(scope._customerDataGridLabel2).split(':');
              customerDataGridLabel=customerDataGridLabel2[0];
              customerDataGridValue=customerDataGridLabel2[1];
            }
          }
          if(!this.isEmptyNullUndefined(customerDataGridLabel)){ 
            if(customerDataGridLabel.includes("{i.i18n"))
            {
              customerDataGridLabel=customerDataGridLabel.slice(1);
              customerDataGridLabel=scope.getFieldValue(customerDataGridLabel);
            }
          }
          if(!this.isEmptyNullUndefined(customerDataGridValue))
          {
            customerDataGridValue=customerDataGridValue.slice(0,-1);
            customerDataGridValue=scope.getFieldValue(customerDataGridValue);

          }
          rowData.push({
            "lblCustomerName": {
              "skin": scope._sknChildLayerValue1,
              "text": y[scope.getFieldValue(this._customerDataGridLabel1)],
              "isVisible":!this.isEmptyNullUndefined(y[scope.getFieldValue(this._customerDataGridLabel1)])?true:false,
              "top":!this.isEmptyNullUndefined(y[customerDataGridValue])?"10dp":"15dp"
         
            },
            "lblCustomerNumber": {
              "skin": scope._sknChildLayerValue2,            
              "text":  y[customerDataGridValue],
              "isVisible":!this.isEmptyNullUndefined(y[customerDataGridValue])?true:false,
              "top":!this.isEmptyNullUndefined(y[scope.getFieldValue(this._customerDataGridLabel1)])?"2dp":"20dp"
         
            },
            "imgCustomerCheckBox": {
              "src":scope._iconCheckboxUnSelected,
              "isVisible":true
            },
            "flxCustomerCheckBox": {
              "onClick": this.toogleCustomerCheckBox
            },
            "lblCustomerNumberText":{
              "skin": scope._sknChildLayerValue2,              
              "text":  customerDataGridLabel,
               "isVisible":!this.isEmptyNullUndefined(customerDataGridLabel)?true:false,
               "top":!this.isEmptyNullUndefined(y[scope.getFieldValue(this._customerDataGridLabel1)])?"2dp":"20dp"
         
            },     
            "imgIcons":{
              "src": y[scope.getFieldValue(scope._retailIconCondition)]? this.isNotEmptyImage(this._iconpersonalPayee) : this.isNotEmptyImage(this._iconBusinessPayeeIcon),
              "isVisible": !this.isEmptyNullUndefined(scope.getFieldValue(scope._retailIconCondition)) || !this.isEmptyNullUndefined(scope.getFieldValue(scope._businessIconCondition)) ? true : false
            },
            "template": "flxLinkPayeeCustomerRow"
          });
        });         
        var totalCustomersSelected=data.length;          
        this.view.segLinkPayeeCustomers.widgetDataMap = segmentDataMap;         
        this.view.segLinkPayeeCustomers.setData(rowData);  
        scope.setCustomerCheckbox(selectedContractId);        
        this.customerListArray=rowData;
        this.view.forceLayout();
        kony.application.dismissLoadingScreen();
      }catch(e){
        var errorObj =
            {
              "errorInfo" : "Error in customer segment filter operation",
              "errorLevel" : "Buisness",
              "error": e
            };
        this.onError(errorObj);
      }
    },

    screen1VisibilityOn: function(){
      this.view.flxLinkContractSelectHeader.setVisibility(true);
      this.view.lblLinkPayeeSubHeader.setVisibility(true);
//       if(!this.isEmptyNullUndefined(this.view.lblSelectedCountContract.text))
//       {
//         this.view.lblSelectedCountContract.setVisibility(true);  
//       }
//       else{
        this.view.lblSelectedCountContract.setVisibility(false);     
      //}
      this.view.lblSelectTextContract.setVisibility(true);
      this.view.btnSelectAllContract.setVisibility(true);
      this.view.btnDeselectAllContract.setVisibility(false);
      this.view.segLinkPayeeContract.setVisibility(true);
      this.view.btn1.setVisibility(true);
    },
    screen2VisibilityOn: function()
    {
      this.view.flxLinkCustomerSelectHeader.setVisibility(true);
      this.view.lblLinkPayeeSubHeader1.setVisibility(true);
      this.view.lblLinkPayeeSubHeader2.setVisibility(true)
      this.view.lblSelectedCountCustomer.setVisibility(false);        
      this.view.lblSelectTextCustomer.setVisibility(true);
      this.view.btnSelectAllCustomer.setVisibility(true);
      this.view.btnDeselectAllCustomer.setVisibility(false);
      this.view.segLinkPayeeCustomers.setVisibility(true);
      this.view.btn2.setVisibility(true);
    },

    screen1VisibilityOff: function(){
      this.view.flxLinkContractSelectHeader.setVisibility(false);
      this.view.lblLinkPayeeSubHeader.setVisibility(false);
      this.view.lblSelectedCountContract.setVisibility(false);        
      this.view.lblSelectTextContract.setVisibility(false);
      this.view.btnSelectAllContract.setVisibility(false);
      this.view.btnDeselectAllContract.setVisibility(false);
      this.view.segLinkPayeeContract.setVisibility(false);
      this.view.btn1.setVisibility(false);
    },

    screen2VisibilityOff: function()
    {
      this.view.flxLinkCustomerSelectHeader.setVisibility(false);
      this.view.lblLinkPayeeSubHeader1.setVisibility(false);
      this.view.lblLinkPayeeSubHeader2.setVisibility(false)
      this.view.lblSelectedCountCustomer.setVisibility(false);        
      this.view.lblSelectTextCustomer.setVisibility(false);
      this.view.btnSelectAllCustomer.setVisibility(false);
      this.view.btnDeselectAllCustomer.setVisibility(false);
      this.view.segLinkPayeeCustomers.setVisibility(false);
      this.view.btn2.setVisibility(false);
    },

    onLinkPayeeDone:function()
    {
      var selectedContract=0;
      var customerData=this.view.segLinkPayeeCustomers.data;
      var contractData=this.view.segLinkPayeeContract.data;
      this.screen2VisibilityOff();
      this.screen1VisibilityOn();
      var coreCustomersIdSelected,coreCustomerIdList="",customersSelectedCount=0;
      for(var i=0;i<customerData.length;i++)
      {
        if(customerData[i].imgCustomerCheckBox.src===this._iconCheckboxSelected)
        { customersSelectedCount++;
         coreCustomersIdSelected=customerData[i].lblCustomerNumber.text;
         coreCustomerIdList=coreCustomerIdList+ coreCustomersIdSelected+"&&";
        }
      }
      this.selectCustomers[this.selectedContractId]=  coreCustomerIdList;
      for(var j=0;j<contractData.length;j++){
        if(contractData[j]["contractId"]===this.selectedContractId){
          contractData[j]["lblCIF"].text    = customersSelectedCount + " of " + customerData.length + " Selected CIF";
          if(customersSelectedCount>0){
            contractData[j].imgCheckBox.src=this._iconCheckboxSelected;
          }
          if(customersSelectedCount<=0){
            contractData[j].imgCheckBox.src=this._iconCheckboxUnSelected;
          }
           this.view.segLinkPayeeContract.setData(contractData);
        }
        if(contractData[j].imgCheckBox.src===this._iconCheckboxSelected)
        {
          selectedContract++;
        }
        
      }
      if(selectedContract>0)
      {
        this.view.lblSelectedCountContract.setVisibility(true);
        this.view.lblSelectTextContract.setVisibility(false);
        this.view.lblSelectedCountContract.text=selectedContract+ " " + this.getFieldValue(this._selectedTextContract);     
      }
      else
      {          
        this.view.lblSelectedCountContract.setVisibility(false);
        this.view.lblSelectTextContract.setVisibility(true);
        this.view.lblSelectTextContract.text = this.getFieldValue(this._contractListTitle);       
      }
      this.checkSelectDeselectAllContract(contractData.length, selectedContract);
      if(selectedContract>0){
        this.view.btn1.setEnabled(true);
        this.view.btn1.skin = this._sknActionBtn;
      }
      else
      {
        this.view.btn1.setEnabled(false);
        this.view.btn1.skin =this._sknActionBtnDisabled;
      }
     
      this.view.segLinkPayeeContract.setData(contractData);
    },

    onLinkPayeeBtnContinue:function()
    {
      this.onLinkPayeeContinue(this.selectCustomers,this.totaCustomerListCount);
    },

    onSelectAllContract: function()
    {
      var scope=this;
      let data = this.view.segLinkPayeeContract.data;
      var dataGridContractLayerResponseRootPath =  scope.getFieldValue(scope._contractListArrayKey);       
      var dataGridCustomerLayerResponseRootPath =  scope.getFieldValue(scope._customerListArrayKey); 
      var contractCustomerLength,coreCustomersIdSelected,coreCustomerIdList="";
      for(var k=0;k<data.length;k++)
      {
        coreCustomerIdList=""
        data[k]["imgCheckBox"].src = this._iconCheckboxSelected;
        contractCustomerLength= data[k]["customerData"].length;
        for(var j=0;j<contractCustomerLength;j++){
          coreCustomersIdSelected= data[k]["customerData"][j].coreCustomerId;
          coreCustomerIdList=coreCustomerIdList+ coreCustomersIdSelected+"&&";
        }
        data[k]["lblCIF"].text = contractCustomerLength + " of " + contractCustomerLength+ " Selected CIF";
        this.selectCustomers[data[k]["contractId"]]= coreCustomerIdList;
      }
      var totalCount,totalCountCustomer=0;

      scope.view.lblSelectTextContract.setVisibility(false);
      scope.view.lblSelectedCountContract.setVisibility(true);
      scope.view.lblSelectedCountContract.text =   data.length+ " "+
      scope.getFieldValue(scope._selectedTextContract);
      this.view.segLinkPayeeContract.setData(data);
      this.view.btnSelectAllContract.setVisibility(false);
      this.view.btnDeselectAllContract.setVisibility(true);
      this.view.btnSelectAllCustomer.setVisibility(false);
      this.view.btnDeselectAllCustomer.setVisibility(true);
      this.view.btn1.setEnabled(true);

      scope.view.btn1.skin = this._sknActionBtn;
    },

    onDeselectAllContract: function()
    {
      var scope=this;
      let data = this.view.segLinkPayeeContract.data;      
      var dataGridContractLayerResponseRootPath =  scope.getFieldValue(scope._contractListArrayKey);       
      var dataGridCustomerLayerResponseRootPath =  scope.getFieldValue(scope._customerListArrayKey);  
      for(var k=0;k<data.length;k++)
      {
        data[k]["imgCheckBox"].src = this._iconCheckboxUnSelected;       
        data[k]["lblCIF"].text= "0" + " of " + data[k]["customerData"].length + " Selected CIF";       
        delete this.selectCustomers[this.selectedContractId];
      }

      var totalCount,totalCountCustomer=0; 
       this.view.lblSelectTextContract.text = this.getFieldValue(this._contractListTitle);       
        
      scope.view.lblSelectTextContract.setVisibility(true);
      
      scope.view.lblSelectedCountContract.setVisibility(false);
      this.view.segLinkPayeeContract.setData(data);
      this.view.btnSelectAllContract.setVisibility(true);
      this.view.btnDeselectAllContract.setVisibility(false);
      this.view.btnSelectAllCustomer.setVisibility(true);
      this.view.btnDeselectAllCustomer.setVisibility(false);
       
        this.view.btn1.setEnabled(false);
        this.view.btn1.skin =this._sknActionBtnDisabled;
      

    },


    onSelectAllCustomer: function()
    {
      var scope=this;
      let data = this.view.segLinkPayeeContract.data;
      let dataCustomer = this.view.segLinkPayeeCustomers.data;
      var dataGridContractLayerResponseRootPath =  scope.getFieldValue(scope._contractListArrayKey);       
      var dataGridCustomerLayerResponseRootPath =  scope.getFieldValue(scope._customerListArrayKey);
      var totalCount=0, totalCountCustomer=0;
      for(var i=0;i<dataCustomer.length;i++)
      {
        dataCustomer[i].imgCustomerCheckBox.src = this._iconCheckboxSelected ;
      }
      this.view.segLinkPayeeCustomers.setData(dataCustomer);

      var finalCustomerSelected=0;
      var newCustomerData=this.view.segLinkPayeeCustomers.data;
      for(var l=0;l<newCustomerData.length;l++)
      {
        if(newCustomerData[l].imgCustomerCheckBox.src=== this._iconCheckboxSelected )
        {
          finalCustomerSelected++;
        }
      }
      this.view.lblSelectedCountCustomer.text=dataCustomer.length +" " + scope.getFieldValue(scope._selectedTextCustomer);
      scope.view.lblSelectTextCustomer.setVisibility(false);
      scope.view.lblSelectedCountCustomer.setVisibility(true);
      this.view.btnSelectAllCustomer.setVisibility(false);
      this.view.btnDeselectAllCustomer.setVisibility(true);

    },

    onDeselectAllCustomer: function()
    {
      var scope=this;
      let data = this.view.segLinkPayeeContract.data;
      let dataCustomer = this.view.segLinkPayeeCustomers.data;
      var dataGridContractLayerResponseRootPath =  scope.getFieldValue(scope._contractListArrayKey);       
      var dataGridCustomerLayerResponseRootPath =  scope.getFieldValue(scope._customerListArrayKey);       
      var totalCount=0,totalCountCustomer=0;
      var coreCustomerIdList,count=0;
      for(var i=0;i<dataCustomer.length;i++)
      {
        coreCustomerIdList=dataCustomer[i]["lblCustomerNumber"].text;
        dataCustomer[i].imgCustomerCheckBox.src = this._iconCheckboxUnSelected ;
      }
      var coreCustomerIdLength=coreCustomerIdList.length;
      for(var l=0;l<data.length;l++)
      {
        var customerLength=data[l]["customerData"];
       for(var j=0;j<customerLength.length;j++){
         for(var k=0;k<coreCustomerIdLength;k++){
           if(data[l]["customerData"][j]["coreCustomerId"]===coreCustomerIdList[k])
           {
             count++;
           }
         }
       }
       if(count===customerLength){
       data[l].imgCheckBox.src = this._iconCheckboxUnSelected ;
       }
      }
      this.view.segLinkPayeeCustomers.setData(dataCustomer);
      scope.view.lblSelectTextCustomer.setVisibility(true);
      scope.view.lblSelectedCountCustomer.setVisibility(false);    
      this.view.btnSelectAllCustomer.setVisibility(true);
      this.view.btnDeselectAllCustomer.setVisibility(false);
      this.view.segLinkPayeeContract.setData(data);

    },
    /**
      * setParentScope.
      * This Method is exposed to the form to pass the Form Scope.
      */
    setParentScope: function(scope){
      this._parentScope = scope;
    },

    toogleExpandRow: function(eventObj, context) {
      var scope=this;
      let data = this.view.segLinkPayeeContract.data;
      let selectedRowIndex = context.rowIndex;
      this.inputPool['contractName']=data[selectedRowIndex]["lblContract"].text;     
      this.inputPool['contractId']= data[selectedRowIndex]["contractId"];
      var selectedContractId=   data[selectedRowIndex]["contractId"];
      var dataContractCustomer;
      this.selectedContractId=selectedContractId;
      for(var i=0;i<data.length;i++)
      {
        if(data[i]['contractId']===selectedContractId)
        {
          dataContractCustomer=data[i]["customerData"];
        }
      }
      this.screen1VisibilityOff();
      this.setLinkPayeeDataforCustomers(dataContractCustomer,selectedContractId); 
      var subHeaderLabel2,subHeaderLabel21,subHeaderValue22,contractCheckbox;
      contractCheckbox=data[selectedRowIndex].imgCheckBox.src;
      scope.view.lblLinkPayeeSubHeader1.text = scope.getFieldValue(scope._subHeaderLabel1);
      if(!this.isEmptyNullUndefined(scope._subHeaderLabel2)){ 
        if((scope._subHeaderLabel2).includes(":"))
        {
          subHeaderLabel2=(scope._subHeaderLabel2).split(':');
          subHeaderLabel21=subHeaderLabel2[0];
          subHeaderValue22=subHeaderLabel2[1];
        }
        if(!this.isEmptyNullUndefined(subHeaderLabel21)){ 
          if(subHeaderLabel21.includes("{i.i18n"))
          {
            subHeaderLabel21=subHeaderLabel21.slice(1);
            subHeaderLabel21=scope.getFieldValue(subHeaderLabel21);
          }
        }
        if(!this.isEmptyNullUndefined(subHeaderValue22))
        {
          subHeaderValue22=subHeaderValue22.slice(0,-1);
          subHeaderValue22=scope.getFieldValue(subHeaderValue22);

        }
      }
      scope.view.lblLinkPayeeSubHeader2.text =   subHeaderLabel21+" "+subHeaderValue22;  
      this.screen2VisibilityOn();
      
      var selectedCount=scope.getFieldValue(scope._selectedCustomerCount);
          if(selectedCount >0 && contractCheckbox===scope._iconCheckboxSelected)
      {
        scope.view.lblSelectedCountCustomer.text =   scope.getFieldValue(scope._selectedCustomerCount)+ " "+
          scope.getFieldValue(scope._selectedTextCustomer);
        this.view.lblSelectedCountCustomer.setVisibility(true);
        this.view.lblSelectTextCustomer.setVisibility(false);
        if(selectedCount===dataContractCustomer.length)
          {
            this.view.btnSelectAllCustomer.setVisibility(false);
            this.view.btnDeselectAllCustomer.setVisibility(true);
          }
      }
      else
      {
        this.view.lblSelectedCountCustomer.setVisibility(false);
        scope.view.lblSelectTextCustomer.text = scope.getFieldValue(scope._customerListTitle);

        this.view.lblSelectTextCustomer.setVisibility(true);
      }

    },

    toogleRowContractCheckBox: function (eventObj, context, index) {
      var scope = this;
      let data = this.view.segLinkPayeeContract.data;
      let customerLength=0;
      var selectedRowIndex,contractCustomerLength,coreCustomersIdSelected,coreCustomerIdList="";
      var customerListSelectedArr=[];
      var dataGridContractLayerResponseRootPath =  scope.getFieldValue(scope._contractListArrayKey);       
      var dataGridCustomerLayerResponseRootPath =  scope.getFieldValue(scope._customerListArrayKey);      
      if (index !== undefined && index >= 0) {
        selectedRowIndex = index;
      } else {
        selectedRowIndex = context.rowIndex;
      }
      var selectedContractId=   data[selectedRowIndex]["contractId"];
      this.selectedContractId=selectedContractId;
      var j=0;
      if (data[selectedRowIndex]["imgCheckBox"].src === this._iconCheckboxUnSelected) {
        data[selectedRowIndex]["imgCheckBox"].src = this._iconCheckboxSelected;
        for(var i=0;i<this.response[dataGridContractLayerResponseRootPath].length;i++)
        {
          if(this.response[dataGridContractLayerResponseRootPath][i]['contractId']===selectedContractId)
          {
            contractCustomerLength= this.response[dataGridContractLayerResponseRootPath][i][dataGridCustomerLayerResponseRootPath].length;
            for(j=0;j<contractCustomerLength;j++){
              coreCustomersIdSelected=this.response[dataGridContractLayerResponseRootPath][i][dataGridCustomerLayerResponseRootPath][j].coreCustomerId;
              coreCustomerIdList=coreCustomerIdList+ coreCustomersIdSelected+"&&";
            }
          }
        }
        data[selectedRowIndex]["lblCIF"].text = contractCustomerLength + " of " + contractCustomerLength+ " Selected CIF";
        this.selectCustomers[selectedContractId]= coreCustomerIdList;
      }
      else
      {
        data[selectedRowIndex]["imgCheckBox"].src = this._iconCheckboxUnSelected;        
        data[selectedRowIndex]["lblCIF"].text= "0" + " of " + data[j]["customerData"].length + " Selected CIF";       
        delete this.selectCustomers[selectedContractId];
      }
      this.view.segLinkPayeeContract.setData(data);      
      var dataContractNew= this.view.segLinkPayeeContract.data;
      var dataContractCount=0;
      for(var i=0;i<dataContractNew.length;i++)
      {
        if( dataContractNew[i].imgCheckBox.src === scope._iconCheckboxSelected){
          dataContractCount++;
        } 
      }
      if(dataContractCount>0){
        this.view.lblSelectTextContract.setVisibility(false);
        this.view.lblSelectedCountContract.setVisibility(true);
        this.view.lblSelectedCountContract.text=dataContractCount + " " +scope.getFieldValue(scope._selectedTextContract);
        this.view.btn1.setEnabled(true);

        scope.view.btn1.skin = this._sknActionBtn;
      }

      else
      {
        this.view.lblSelectedCountContract.setVisibility(false);
        this.view.lblSelectTextContract.setVisibility(true);
         this.view.lblSelectTextContract.text = this.getFieldValue(this._contractListTitle);       
        
        scope.view.btn1.setEnabled(false);
        scope.view.btn1.skin = this._sknActionBtnDisabled;


      }
      this.checkSelectDeselectAllContract(dataContractNew.length,dataContractCount)
    },

    toogleCustomerCheckBox: function (eventObj, context) {
      var scope = this;
      let data = this.view.segLinkPayeeCustomers.data;
      let ContractData = this.view.segLinkPayeeContract.data;
      let selectedRowIndex = context.rowIndex;
      let selectedSectionIndex = context.rowIndex;
      let length = 0;
      let customerLength = data.length;
      var customersSelectedCount=0;
      data[selectedRowIndex].imgCustomerCheckBox.src === this._iconCheckboxUnSelected ? data[selectedRowIndex].imgCustomerCheckBox.src = this._iconCheckboxSelected : data[selectedRowIndex].imgCustomerCheckBox.src = this._iconCheckboxUnSelected;       
      this.view.segLinkPayeeCustomers.setData(data);
      var finalCustomerSelected=0;
      var newCustomerData=this.view.segLinkPayeeCustomers.data;
      for(var l=0;l<newCustomerData.length;l++)
      {
        if(newCustomerData[l].imgCustomerCheckBox.src=== this._iconCheckboxSelected )
        {
          finalCustomerSelected++;
        }
      }
     
      if(finalCustomerSelected>0){
        this.view.lblSelectTextCustomer.setVisibility(false);
         this.view.lblSelectedCountCustomer.setVisibility(true);
      this.view.lblSelectedCountCustomer.text=finalCustomerSelected +" " + scope.getFieldValue(this._selectedTextCustomer);
      }
      else
        {
           this.view.lblSelectTextCustomer.setVisibility(true);
      this.view.lblSelectedCountCustomer.setVisibility(false);
        }
      
      this.checkSelectDeselectAllCustomers(newCustomerData.length, finalCustomerSelected)
    },


    setCustomerCheckbox: function(selectedContractId){

      var customerSegData=this.view.segLinkPayeeCustomers.data;
      var coreCustomersSelectedValue = this.selectCustomers[selectedContractId];
      var coreCustomerIdArr,checkCoreCustomerId="";
      var selectedCustomersCount=0;
      if(!this.isEmptyNullUndefined(coreCustomersSelectedValue)){
        if(coreCustomersSelectedValue.includes("&&"))
        {
          coreCustomerIdArr=coreCustomersSelectedValue.split('&&');           
        }
        for(var i=0;i<coreCustomerIdArr.length;i++)
        {
          checkCoreCustomerId=coreCustomerIdArr[i];
          if(checkCoreCustomerId!==""&& !this.isEmptyNullUndefined(checkCoreCustomerId)){
            for(var j=0;j<customerSegData.length;j++){
              if(customerSegData[j].lblCustomerNumber.text===checkCoreCustomerId)
              {
                customerSegData[j].imgCustomerCheckBox.src=this._iconCheckboxSelected;
                selectedCustomersCount++;
              }
            }
          }
        }  

        this.view.lblSelectTextCustomer.setVisibility(false);
        this.view.lblSelectedCountCustomer.setVisibility(true);
        this.view.lblSelectedCountCustomer.text=selectedCustomersCount+ " "+  this.getFieldValue(this._selectedTextCustomer);
      }
      this.inputPool['selectedCustomerCount']=selectedCustomersCount; 
      this.view.segLinkPayeeCustomers.setData(customerSegData);
      //this.onLinPayeeDone(selectedContractId);
    },

    setContractsFromContext:function()
    {
      var contractSegData=this.view.segLinkPayeeContract.data;
      var contractSelectedValue = this.selectCustomers;
      var coreCustomerIdArr,contractId="";
      var selectedContractCount=0,dataLength=0,totalCustomerSelectedCount=0;
      var data;
      if(!this.isEmptyNullUndefined(contractSelectedValue)){

        contractId=Object.keys(contractSelectedValue);
        for(var i=0;i<contractId.length;i++)
        {
          if(contractId!==""&& !this.isEmptyNullUndefined(contractId)){
            for(var j=0;j<contractSegData.length;j++){
              if(contractSegData[j].contractId===contractId[i])
              {
                contractSegData[j].imgCheckBox.src=this._iconCheckboxSelected;
                selectedContractCount++;
                if (contractSelectedValue[contractId[i]].includes("&&")) {
                  data = contractSelectedValue[contractId[i]].split('&&');
                }
                dataLength = (data.length) - 1;
                totalCustomerSelectedCount=totalCustomerSelectedCount+dataLength;
                contractSegData[j]["lblCIF"].text= totalCustomerSelectedCount + " of " + contractSegData[j]["customerData"].length + " Selected CIF";       

              }

            }
          }
        }          
          this.view.lblSelectTextContract.setVisibility(false);
        this.view.lblSelectedCountContract.setVisibility(true);
        this.view.lblSelectedCountContract.text=selectedContractCount+ " "+  this.getFieldValue(this._selectedTextContract);
        
      }
      this.inputPool['selectedContractCount']=selectedContractCount; 
      this.view.segLinkPayeeContract.setData(contractSegData);
   
    },

    checkSelectDeselectAllContract: function(dataContractNewLength,dataContractCount)
    {
      if(dataContractNewLength===dataContractCount)
      {
        this.view.btnSelectAllContract.setVisibility(false);
        this.view.btnDeselectAllContract.setVisibility(true);
      }
      else
      {
        this.view.btnDeselectAllContract.setVisibility(false);
        this.view.btnSelectAllContract.setVisibility(true);
      }
    },

    checkSelectDeselectAllCustomers:function(newCustomerDataLength,finalCustomerSelected)
    {
      var scope=this;
      if(newCustomerDataLength===finalCustomerSelected)
      {
        this.view.btnSelectAllCustomer.setVisibility(false);
        this.view.btnDeselectAllCustomer.setVisibility(true);
      }
      else
      {
        this.view.btnDeselectAllCustomer.setVisibility(false);
        this.view.btnSelectAllCustomer.setVisibility(true);

      }
    },

    checkButtons: function(finalCustomerSelected){
      var scope=this;
      if(finalCustomerSelected>1)
      {
        scope.view.btn1.setEnabled(true);
        scope.view.btn1.skin = this._sknActionBtn;
      }
      else
      {
        scope.view.btn1.setEnabled(false);
        scope.view.btn1.skin = this._sknActionBtnDisabled;
      }
    },

    isNotEmptyImage:function(data){
      if(data !== null || data !== undefined || data !== ""){
        return data;
      }
    },

    /**
     * Component readObject
     * Helper method to parse the backend response
     * obj{JSONArray} - object containing any value
     * jsonPath{String} - jsonPath traversed till the search field is reachable
     */
    readObject: function(obj, jsonPath) {
      var self = this;
      try
      {
        var keysItr = Object.keys(obj);
        var parentPath = jsonPath;
        for (var i = 0; i < keysItr.length; i++) {
          var key = keysItr[i];
          var value = obj[key]
          if(parentPath)
            jsonPath = parentPath + "." + key;
          else
            jsonPath = key;
          if (value instanceof Array) {
            this.map[key] = value;
            this.readArray(value, jsonPath);
          } else if (value instanceof Object) {
            this.map[key] = value;
            this.readObject(value, jsonPath);
          } else { // is a value
            if(isNaN(value) && (value.indexOf("{")>-1 ||value.indexOf("[")>-1))
            {
              try{
                value=JSON.parse(value);
              }catch(e)
              {
                kony.print(e);
              }
            }
            if (value instanceof Array) {
              this.readArray(value, jsonPath);
            } else if (value instanceof Object) {
              this.readObject(value, jsonPath);
            }else{
              this.map[jsonPath] = value;
            }
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in reading the Object.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * Component readArray
     * Parse the array in response and add it to the map
     * @param: array{Array} - array in the response
     * @param: jsonPath{string} - JSON path in the map
     */
    readArray: function(array, jsonPath) {
      var parentPath = jsonPath;
      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        jsonPath = parentPath + "[" + i + "]";
        if (value instanceof Array) {
          this.readArray(value, jsonPath);
        } else if (value instanceof Object) {
          this.readObject(value, jsonPath);
        } else { // is a value
          if(isNaN(value) && (value.indexOf("{")>-1 || value.indexOf("[")>-1)){
            value=JSON.parse(value);
          }
          if (value instanceof Array) {
            this.readArray(value, jsonPath);
          } else if (value instanceof Object) {
            this.readObject(value, jsonPath);
          }else{
            this.map[jsonPath] = value;
          }
        }
      }
    },

    /**
     * @api : getCriteria
     * Parse the criteria based on accountType.
     * @param : criteria {string} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria: function(criteria) {
      var criteriaJSON;
      try{
        criteriaJSON = JSON.parse(criteria);


        for(var key in  criteriaJSON){
          if(typeof(criteriaJSON[key]) === "string" )
            criteriaJSON[key] = this.ParserUtilsManager.getParsedValue(criteriaJSON[key]);
          else
            criteriaJSON[key] = criteriaJSON[key];
        }
        return criteriaJSON;
      } catch(e){
        criteriaJSON = criteria;
        kony.print(e);
      }    
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


    onError: function (response) {
     kony.print(JSON.stringify(response));
    }

  };
});