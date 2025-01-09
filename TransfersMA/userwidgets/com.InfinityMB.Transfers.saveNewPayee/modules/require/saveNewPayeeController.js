define(['JSONValidator', './FormatUtils', './ParserUtilsManager' , './EntitlementUtils' , './saveNewPayeeDAO'], function(JSONValidator, FormatUtils, ParserUtilsManager , EntitlementUtils ,saveNewPayeeDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._objectServiceName="";
      this._sknHeaderLabel="";
      this._successAcknowledgementTitle="";
      this._failureAcknowledgementTitle="";
      this._successImage="";
      this._headerLabel="";
      this._payeeStatus="";
      this._nicknameDescription="";
      this._operationName="";
      this._sknHeaderBackground="";
      this._successAcknowledgementDescription="";
      this._failureAcknowledgementDescription="";
      this._failureImage="";
      this._nicknameTextboxValue="";
      this._objectName="";
      this._sknNicknameDescription="";
      this._backbuttonIcon="";
      this._successButtonAction1="";
      this._failureButtonAction1="";
      this._nicknameButton="";
      this._serviceResponseIdentifier="";
      this._sknNicknameDescriptionBackground="";
      this._successButtonAction2="";
      this._sknRowSeparator="";
      this._criteria="";
      this._successButtonAction3="";
      this._sknNicknameTextbox="";
      this._successButtonAction4="";
      this._sknSuccessAcknowledgementTitle="";
      this._sknFailureAcknowledgementTitle="";
      this._sknSuccessAcknowledgementDescription="";
      this._sknFailureAcknowledgementDescription="";
      this._sknEnabledButton="";
      this._sknDisabledButton="";
      //Parser Util Object
      this.parserUtilsManager = new ParserUtilsManager();
      //Entitlement util object
      this.EntitlementUtils = new EntitlementUtils();
      //Format util object
      this.formatUtils = new FormatUtils;
      //Json validator object
      this.jsonValidator = new JSONValidator();
      //Save Payee Object
      this.savePayeeDAO = new saveNewPayeeDAO();
      //global variables
      this.invalidJSONLoggerArray = [];
      this.isValidJSONString = "";
      this.jsonError = "";
      this.savePayeeStatus = "";
      this.context = "";
      this.payeeCriteria = "";
    },

    initGettersSetters: function() {
      defineSetter(this, "objectServiceName", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._objectServiceName = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "objectServiceName",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "objectServiceName", function () {
        return this._objectServiceName;
      });
      defineSetter(this, "sknHeaderLabel", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknHeaderLabel = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknHeaderLabel",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknHeaderLabel", function () {
        return this._sknHeaderLabel;
      });
      defineSetter(this, "successAcknowledgementTitle", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._successAcknowledgementTitle = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "successAcknowledgementTitle",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "successAcknowledgementTitle", function () {
        return this._successAcknowledgementTitle;
      });
      defineSetter(this, "payeeStatus", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._payeeStatus = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "payeeStatus",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "payeeStatus", function () {
        return this._payeeStatus;
      });
      defineSetter(this, "sknEnabledButton", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknEnabledButton = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknEnabledButton",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknEnabledButton", function () {
        return this._sknEnabledButton;
      });
      defineSetter(this, "sknDisabledButton", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknDisabledButton = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknDisabledButton",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknDisabledButton", function () {
        return this._sknDisabledButton;
      });
      defineSetter(this, "failureAcknowledgementTitle", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._failureAcknowledgementTitle = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "failureAcknowledgementTitle",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "failureAcknowledgementTitle", function () {
        return this._failureAcknowledgementTitle;
      });
      defineSetter(this, "successImage", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._successImage = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "successImage",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "successImage", function () {
        return this._successImage;
      });
      defineSetter(this, "headerLabel", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._headerLabel = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "headerLabel",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "headerLabel", function () {
        return this._headerLabel;
      });
      defineSetter(this, "nicknameDescription", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._nicknameDescription = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "nicknameDescription",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "nicknameDescription", function () {
        return this._nicknameDescription;
      });
      defineSetter(this, "operationName", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._operationName = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "operationName",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "operationName", function () {
        return this._operationName;
      });
      defineSetter(this, "sknHeaderBackground", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknHeaderBackground = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknHeaderBackground",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknHeaderBackground", function () {
        return this._sknHeaderBackground;
      });
      defineSetter(this, "successAcknowledgementDescription", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._successAcknowledgementDescription = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "successAcknowledgementDescription",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "successAcknowledgementDescription", function () {
        return this._successAcknowledgementDescription;
      });
      defineSetter(this, "failureAcknowledgementDescription", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._failureAcknowledgementDescription = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "failureAcknowledgementDescription",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "failureAcknowledgementDescription", function () {
        return this._failureAcknowledgementDescription;
      });
      defineSetter(this, "failureImage", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._failureImage = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "failureImage",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "failureImage", function () {
        return this._failureImage;
      });
      defineSetter(this, "nicknameTextboxValue", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._nicknameTextboxValue = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "nicknameTextboxValue",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "nicknameTextboxValue", function () {
        return this._nicknameTextboxValue;
      });
      defineSetter(this, "objectName", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._objectName = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "objectName",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "objectName", function () {
        return this._objectName;
      });
      defineSetter(this, "sknNicknameDescription", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknNicknameDescription = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknNicknameDescription",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknNicknameDescription", function () {
        return this._sknNicknameDescription;
      });
      defineSetter(this, "backbuttonIcon", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._backbuttonIcon = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "backbuttonIcon",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "backbuttonIcon", function () {
        return this._backbuttonIcon;
      });
      defineSetter(this, "successButtonAction1", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._successButtonAction1 = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "successButtonAction1",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "successButtonAction1", function () {
        return this._successButtonAction1;
      });
      defineSetter(this, "failureButtonAction1", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._failureButtonAction1 = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "failureButtonAction1",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "failureButtonAction1", function () {
        return this._failureButtonAction1;
      });
      defineSetter(this, "nicknameButton", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._nicknameButton = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "nicknameButton",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "nicknameButton", function () {
        return this._nicknameButton;
      });
      defineSetter(this, "serviceResponseIdentifier", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._serviceResponseIdentifier = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "serviceResponseIdentifier",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "serviceResponseIdentifier", function () {
        return this._serviceResponseIdentifier;
      });
      defineSetter(this, "sknNicknameDescriptionBackground", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknNicknameDescriptionBackground = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknNicknameDescriptionBackground",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknNicknameDescriptionBackground", function () {
        return this._sknNicknameDescriptionBackground;
      });
      defineSetter(this, "successButtonAction2", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._successButtonAction2 = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "successButtonAction2",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "successButtonAction2", function () {
        return this._successButtonAction2;
      });
      defineSetter(this, "sknRowSeparator", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknRowSeparator = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknRowSeparator",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknRowSeparator", function () {
        return this._sknRowSeparator;
      });
      defineSetter(this, "criteria", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._criteria = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "criteria",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "criteria", function () {
        return this._criteria;
      });
      defineSetter(this, "successButtonAction3", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._successButtonAction3 = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "successButtonAction3",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "successButtonAction3", function () {
        return this._successButtonAction3;
      });
      defineSetter(this, "sknNicknameTextbox", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknNicknameTextbox = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknNicknameTextbox",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknNicknameTextbox", function () {
        return this._sknNicknameTextbox;
      });
      defineSetter(this, "successButtonAction4", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._successButtonAction4 = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "successButtonAction4",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "successButtonAction4", function () {
        return this._successButtonAction4;
      });
      defineSetter(this, "sknSuccessAcknowledgementTitle", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknSuccessAcknowledgementTitle = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknSuccessAcknowledgementTitle",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknSuccessAcknowledgementTitle", function () {
        return this._sknSuccessAcknowledgementTitle;
      });
      defineSetter(this, "sknFailureAcknowledgementTitle", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknFailureAcknowledgementTitle = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknFailureAcknowledgementTitle",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknFailureAcknowledgementTitle", function () {
        return this._sknFailureAcknowledgementTitle;
      });
      defineSetter(this, "sknSuccessAcknowledgementDescription", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknSuccessAcknowledgementDescription = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknSuccessAcknowledgementDescription",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknSuccessAcknowledgementDescription", function () {
        return this._sknSuccessAcknowledgementDescription;
      });
      defineSetter(this, "sknFailureAcknowledgementDescription", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._sknFailureAcknowledgementDescription = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "sknFailureAcknowledgementDescription",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "sknFailureAcknowledgementDescription", function () {
        return this._sknFailureAcknowledgementDescription;
      });
    },

    /**
         * Component preShow
         * Reponsible to retain the data for custom properties for multiple entries into the component
         */
    preshow : function()
    {
      
      
      try
      {
        var frmName = kony.application.getPreviousForm().id;
        if(!(frmName === "frmTransferActivitiesTransfers" || frmName === "frmTransferActivitiesTransfersEurope"))
        {
        this.icons = {
          SUCCESS_ICON : this._successImage,
          FAILURE_ICON : this._failureImage,
          BACK_BUTTON_ICON : this._backbuttonIcon,
        };
        this.view.imgBack.setVisibility(true);
        var deviceName= kony.os.deviceInfo()["name"];
        if(deviceName === "iPhone")
          {
            this.view.imgBack.setVisibility(false);
            this.view.flxPayeeNickname.top = "70dp";
          }
        this.initActions();
        if (this.invalidJSONLoggerArray.length > 0) {
          this.printJSONValidator();
        }
      }
        this.view.forceLayout();
      }
      catch (err) {
        var errorObj = {
          "errorInfo": "Error in preShow",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    /**
     * Component initActions
     * Reponsible to initialize actions
     */
    initActions : function()
    {
      var scope = this;
      try
      {
        scope.view.txtNickname.text = "";
        scope.view.txtNickname.onTextChange = scope.validateNickname;
        scope.view.txtNickname.skin = scope._sknNicknameTextbox;
//         scope.view.txtNickname.maxTextLength = scope.getFieldValue(scope._nicknameTextboxValue, "max"); 
        scope.view.txtNickname.placeholder = scope.getFieldValue(scope._nicknameTextboxValue, "placeHolder"); 
        scope.view.imgBack.src = scope.icons.BACK_BUTTON_ICON;
        
        scope.view.lblHeaderLabel.text = scope._headerLabel;
        scope.view.btnContinue.text = scope.getFieldValue(scope._nicknameButton,"text");
        scope.view.btnContinue.skin = scope.getFieldValue(scope._nicknameButton,"skin");
        scope.view.btnContinue.onClick = scope.savePayee;
        scope.view.imgBack.onTouchStart = scope.onBack;
        var deviceName= kony.os.deviceInfo()["name"];
        if(!scope.isEmptyNullUndefined(scope.context["Id"]))
        {
          scope.view.flxSuccess.setVisibility(true);
          scope.view.imgBack.setVisibility(false);
          scope.view.flxFail.setVisibility(false);
          scope.view.flxPayeeNickname.setVisibility(false);
          scope.setSuccessAcknowledgementDetails();
          if(deviceName !== "iPhone")
          {
            scope.view.lblHeaderLabel.top = "50dp";
          }
          scope.view.forceLayout();
        }
        else
        {
          scope.view.flxSuccess.setVisibility(false);
          scope.view.imgBack.setVisibility(true);
          scope.view.flxFail.setVisibility(false);
          scope.view.flxPayeeNickname.setVisibility(true);
          scope.view.forceLayout();
        }
        var btnId1 = scope.getFieldValue(scope._successButtonAction1, "id");
        scope.view.btnSuccessAction1.onClick = function() {
          scope.contextualActionButtonOnClick(btnId1);
        };
        var btnId2 = scope.getFieldValue(scope._successButtonAction2, "id");
        scope.view.btnSuccessAction2.onClick = function() {
          scope.contextualActionButtonOnClick(btnId2);
        };
        var btnId3 = scope.getFieldValue(scope._successButtonAction3, "id");
        scope.view.btnSuccessAction3.onClick = function() {
          scope.contextualActionButtonOnClick(btnId3);
        };
        var btnId4 = scope.getFieldValue(scope._successButtonAction4, "id");
        scope.view.btnSuccessAction4.onClick = function() {
          scope.contextualActionButtonOnClick(btnId4);
        };
        var btnId5 = scope.getFieldValue(scope._failureButtonAction1, "id");
        scope.view.btnFailureAction1.onClick = function() {
          scope.contextualActionButtonOnClick(btnId5);
        };}
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the actions to columns.",
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * Component savePayee
     * Reponsible to make a service call to save the payee
     */
    savePayee : function()
    {
      
      try
      {
        this.requestStart();
        this.setCriteria(this._criteria);
        this.savePayeeDAO.saveNewPayee(this._objectServiceName,this._operationName,this._objectName,this.getCriteria(),this._serviceResponseIdentifier,this.processResponse,this.errorResponse);

      }
      catch(err)
      {
        this.requestEnd();
        var errorObj =
            {
              "errorInfo" : "Error in doing service call to save the payee",
              "errorLevel" : "Business",
              "error": err
            };
        this.onError(errorObj);
      }
    },

    /**
     * Component processResponse
     * Reponsible to process the success response
     * @param response{object} - used to set success acknowledgment details
     */
    processResponse:function(response,unicode)
    {
      
      try
      {
       
        var deviceName= kony.os.deviceInfo()["name"];
        if(deviceName === "iPhone")
        {
          this.iphonePayeeAcknowledgmentHeaderHandler();
        }
        if(!this.isEmptyNullUndefined(response["Id"]))
        {
          this.view.flxSuccess.setVisibility(true);
          this.view.imgBack.setVisibility(false);
          this.view.flxFail.setVisibility(false);
          this.view.flxPayeeNickname.setVisibility(false);
          this.setSuccessAcknowledgementDetails();
          if(deviceName !== "iPhone")
          {
            this.view.lblHeaderLabel.top = "50dp";
          }
          this.view.forceLayout();
        }
        else
        {
          this.view.flxSuccess.setVisibility(false);
          this.view.flxFail.setVisibility(true);
          this.view.imgBack.setVisibility(false);
          this.view.flxPayeeNickname.setVisibility(false);
          this.setFailureAcknowledgementDetails();
          if(deviceName !== "iPhone")
          {
            this.view.lblHeaderLabel.top = "50dp";
          }
          this.view.forceLayout();
        }
        this.requestEnd();
        this.view.forceLayout();
      }
      catch(err)
      {
        this.requestEnd();
        var errorObj =
            {
              "errorInfo" : "Error in processing the service responce",
              "errorLevel" : "Business",
              "error": err
            };
        this.onError(errorObj);
      }
    },

    /**
     * Component errorResponse
     * Reponsible to process the failure response
     * @param response{object} - used to set failure acknowledgment details
     */
    errorResponse : function(response)
    {
     
      try{
        this.view.flxSuccess.setVisibility(false);
        this.view.flxFail.setVisibility(true);
        this.view.flxPayeeNickname.setVisibility(false);
        this.setFailureAcknowledgementDetails();
        this.requestEnd();
        this.view.forceLayout();
      }
      catch(err)
      {
        this.requestEnd();
        var errorObj =
            {
              "errorInfo" : "Error in processing the service responce",
              "errorLevel" : "Business",
              "error": err
            };
        this.onError(errorObj);
      }
    },

    /**
     * Component validateNickname
     * Reponsible to validate the nickname entered by the user
     */
    validateNickname : function()
    {
      try
      {
        
        var name = this.view.txtNickname.text;
        var min = this.getFieldValue(this._nicknameTextboxValue, "min");
        var max = this.getFieldValue(this._nicknameTextboxValue, "max");
        if(!this.isEmptyNullUndefined(name) && name.length >= min && name.length <=max)
        {
          this.view.btnContinue.setEnabled(true);
          this.view.btnContinue.skin = this._sknEnabledButton;
          this.context["nickName"] = this.view.txtNickname.text;
        }
        else
        {
          this.view.btnContinue.setEnabled(false);
          this.view.btnContinue.skin = this._sknDisabledButton; 
        }
        this.view.forceLayout();
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in validating the nickname",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    /**
     * Component setSuccessAcknowledgementDetails
     * Reponsible to set Success acknowledgement details and button actions
     */
    setSuccessAcknowledgementDetails : function()
    {
      var scope = this;
      try{
        scope.view.imgSuccess.src = scope.icons.SUCCESS_ICON;
        scope.view.lblSuccessTitle.text = scope.getFieldValue(scope._successAcknowledgementTitle,"text");
        scope.view.lblSuccessTitle.skin = scope.getFieldValue(scope._sknSuccessAcknowledgementTitle);
        scope.view.lblSuccessDescription.text = scope.getFieldValue(scope._successAcknowledgementDescription,"text");
        scope.view.lblSuccessDescription.skin = scope.getFieldValue(scope._sknSuccessAcknowledgementDescription);
        try
        {
          let text = scope.getFieldValue(scope._successButtonAction1,"text");
          var data = scope.context;
          var btnId= scope.getFieldValue(scope._successButtonAction1,"id");
          if(!scope.isEmptyNullUndefined(text)){
            scope.view.btnSuccessAction1.text = text;
            scope.view.btnSuccessAction1.skin= scope.getFieldValue(scope._successButtonAction1, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._successButtonAction1, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._successButtonAction1, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnSuccessAction1.setVisibility(true);
                }
                else{
                  scope.view.btnSuccessAction1.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnSuccessAction1.setVisibility(false);
            }          
            else{
              scope.view.btnSuccessAction1.setVisibility(true);
            }
          }
          else{
            scope.view.btnSuccessAction1.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnSuccessAction1.setVisibility(false);
        }

        try
        {
          let text = scope.getFieldValue(scope._successButtonAction2,"text");
          var data = scope.context;
          var btnId= scope.getFieldValue(scope._successButtonAction2,"id");
          if(!scope.isEmptyNullUndefined(text)){
            scope.view.btnSuccessAction2.text = text;
            scope.view.btnSuccessAction2.skin= scope.getFieldValue(scope._successButtonAction2, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._successButtonAction2, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._successButtonAction2, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnSuccessAction2.setVisibility(true);
                }
                else{
                  scope.view.btnSuccessAction2.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnSuccessAction2.setVisibility(false);
            }          
            else{
              scope.view.btnSuccessAction2.setVisibility(true);
            }
          }
          else{
            scope.view.btnSuccessAction2.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnSuccessAction2.setVisibility(false);
        }

        try
        {
          let text = scope.getFieldValue(scope._successButtonAction3,"text");
          var data = scope.context;
          var btnId= scope.getFieldValue(scope._successButtonAction3,"id");
          if(!scope.isEmptyNullUndefined(text)){
            scope.view.btnSuccessAction3.text = text;
            scope.view.btnSuccessAction3.skin= scope.getFieldValue(scope._successButtonAction3, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._successButtonAction3, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._successButtonAction3, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnSuccessAction3.setVisibility(true);
                }
                else{
                  scope.view.btnSuccessAction3.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnSuccessAction3.setVisibility(false);
            }          
            else{
              scope.view.btnSuccessAction3.setVisibility(true);
            }
          }
          else{
            scope.view.btnSuccessAction3.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnSuccessAction3.setVisibility(false);
        }

        try
        {
          let text = scope.getFieldValue(scope._successButtonAction4,"text");
          var data = scope.context;
          var btnId= scope.getFieldValue(scope._successButtonAction4,"id");
          if(!scope.isEmptyNullUndefined(text)){
            scope.view.btnSuccessAction4.text = text;
            scope.view.btnSuccessAction4.skin= scope.getFieldValue(scope._successButtonAction4, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._successButtonAction4, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._successButtonAction4, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnSuccessAction4.setVisibility(true);
                }
                else{
                  scope.view.btnSuccessAction4.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnSuccessAction4.setVisibility(false);
            }          
            else{
              scope.view.btnSuccessAction4.setVisibility(true);
            }
          }
          else{
            scope.view.btnSuccessAction4.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnSuccessAction4.setVisibility(false);
        }
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in set success acknowledgement details",
          "errorLevel": "Configuration",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * Component setFailureAcknowledgementDetails
     * Reponsible to set failure acknowledgement details and button actions
     */
    setFailureAcknowledgementDetails : function()
    {
      var scope = this;
      try{
        scope.view.imgFail.src = scope.icons.FAILURE_ICON;
        scope.view.lblFailTitle.text = scope.getFieldValue(scope._failureAcknowledgementTitle,"text");
        scope.view.lblFailTitle.skin = scope.getFieldValue(scope._sknFailureAcknowledgementTitle);
        scope.view.lblFailDescription.text = scope.getFieldValue(scope._failureAcknowledgementDescription,"text");
        scope.view.lblFailDescription.skin = scope.getFieldValue(scope._sknFailureAcknowledgementDescription);
        try
        {
          let text = scope.getFieldValue(scope._failureButtonAction1,"text");
          var data = scope.context;
          if(!scope.isEmptyNullUndefined(text)){
            scope.view.btnFailureAction1.text = text;
            var btnId= scope.getFieldValue(scope._failureButtonAction1,"id");
            scope.view.btnFailureAction1.skin= scope.getFieldValue(scope._failureButtonAction1, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._failureButtonAction1, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._failureButtonAction1, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnFailureAction1.setVisibility(true);
                }
                else{
                  scope.view.btnFailureAction1.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnFailureAction1.setVisibility(false);
            }          
            else{
              scope.view.btnFailureAction1.setVisibility(true);
            }
          }
          else{
            scope.view.btnFailureAction1.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnFailureAction1.setVisibility(false);
        }
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in set failure acknowledgement details",
          "errorLevel": "Configuration",
          "error": err
        };
        scope.onError(errorObj);
      }
      scope.view.forceLayout();
    },

    /**
         * Component printJSONValidator
         * prints the invalid JSON field and its syntaxError
         */
    printJSONValidator: function() {
     
      try {
        for (var i = 0; i < (this.invalidJSONLoggerArray.length); i++) {
          var invalidJSONString = "FieldName: " + this.invalidJSONLoggerArray[i].fieldName + "SyntaxError: " + this.invalidJSONLoggerArray[i].syntaxError;
          console.error(invalidJSONString);
        }
      } catch (err) {
        var errorObj = {
          "errorInfo": "Error in printJSONValidator",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    /**
         * Component getFieldValue
         * Parse the exposed contract value based on accountType selected and breakpoint consideration
         * @param: Value{string} - value collected from exposed contract
         * @param: key{string} - lookup key in the JSON string
         * @return : {string} - Processed value
         */
    getFieldValue: function(Value, key) {
      try {
        var value = Value;
        if (typeof(Value) === "string") {
          value = JSON.parse(Value);
        }
        if (value[this.currentTransactionType]) {
          value = value[this.currentTransactionType];
        }
        if (value["default"]) {
          value = value["default"];
        }
        if (!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)) {
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if (typeof(value) === "string")
            return this.getProcessedText(value);
        } else return "";
      } catch (e) {
        kony.print(e);
      }
      return this.getProcessedText(Value);
    },

    /**
         * Component getProcessedText
         * Pass the text to format util to obtained the processed value.
         * text {string} - value to be processed
         * @return : {string} - processed value
         */
    getProcessedText: function(text) {
      return this.parserUtilsManager.getParsedValue(text);
    },

    /**
         * Component isEmptyNullUndefined
         * Verifies if the value is empty, null or undefined
         * data {string} - value to be verified
         * @return : {boolean} - validity of the value passed
         */
    isEmptyNullUndefined: function(data) {
      if (data === null || data === undefined || data === "")
        return true;

      return false;
    },

    /**
         * Component setContext
         * To collect the context object required for the component
         * context{JSONobject} - account object
         */
    setContext: function(context) {
      
      try {
        this.context = context;
        this.parserUtilsManager.setContext(this.context);
      } catch (err) {
        var errorObj = {
          "errorInfo": "Error in the setContext of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    

    /**
     * Component getCriteria
     * Parse the criteria from configuration
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria:function(){
     
      try{
        return this.payeeCriteria;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in returning criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        this.onError(errorObj);
      }
      return "";
    },

    /**
     * Component setCriteria
     * Update the criteria based on accountType ans filter
     * criteria {string} - value collected from exposed contract
     */
    setCriteria:function(criteria){
      
      try
      {
        var criteriaObject = JSON.parse(this._criteria);
        for(var key in  criteriaObject){
          criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
        }
        var criteriaJSON = criteria;
        if(typeof(criteria) == "string"){
          criteriaJSON = JSON.parse(criteria);
        }
        for(var key in  criteriaJSON){
          criteriaObject[key] = this.getFieldValue(criteriaJSON[key]);
        }
        this.payeeCriteria = criteriaObject;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        this.onError(errorObj);
      }
    },
  };
});