define(['./ParserUtilsManager','./FormatValueUtils','./EntitlementUtils','./DetailsDAO'],function(ParserUtilsManager,FormatValueUtils,EntitlementUtils,DetailsDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //declaration for Object Service Name1 in the group:Management Service
      this._serviceName1="";

      //declaration for Field1 Label in the group:Details
      this._field1Label="";

      //declaration for Button1 in the group:Button
      this._button1="";

      //declaration for Label Skin in the group:Skins
      this._labelSkin="";

      //declaration for Retail Icon in the group:Icons
      this._retailIcon="";

      //declaration for Amount Format in the group:Data Format
      this._amountFormat="";

      //declaration for Alert Text1 in the group:Alert Properties
      this._alertText1="";

      //declaration for Object Name1 in the group:Management Service
      this._objectName1="";

      //declaration for Field1 Value in the group:Details
      this._field1Value="";

      //declaration for Value Skin in the group:Skins
      this._valueSkin="";

      //declaration for CombinedUser Icon in the group:Icons
      this._combinedUserIcon="";

      //declaration for Date Format in the group:Data Format
      this._dateFormat="";

      //declaration for Operation Name1 in the group:Management Service
      this._operationName1="";

      //declaration for Field1 Type in the group:Details
      this._field1Type="";

      //declaration for Button2 in the group:Button
      this._button2="";

      //declaration for Amount Skin in the group:Skins
      this._amountSkin="";

      //declaration for Backend Date Format in the group:Data Format
      this._backendDateFormat="";

      //declaration for Icon Visibility in the group:Icons
      this._iconVisibility="";

      //declaration for Criteria1 in the group:Management Service
      this._criteria1="";

      //declaration for Status Label in the group:Details
      this._statusLabel="";

      //declaration for Account Number Format in the group:Data Format
      this._accountNumberFormat="";

      //declaration for Yes Label in the group:Alert Properties
      this._yesLabel="";

      //declaration for Field2 Label in the group:Details
      this._field2Label="";

      //declaration for Button3 in the group:Button
      this._button3="";

      //declaration for No Label in the group:Alert Properties
      this._noLabel="";

      //declaration for Currency Code in the group:Data Format
      this._currencyCode="";

      //declaration for Field2 Value in the group:Details
      this._field2Value="";

      //declaration for Separator Skin in the group:Skins
      this._separatorSkin="";

      //declaration for Account Number Length Display in the group:Data Format
      this._accNoLengthDisplay="";

      //declaration for Alert Text2 in the group:Alert Properties
      this._alertText2="";

      //declaration for Field2 Type in the group:Details
      this._field2Type="";

      //declaration for Button4 in the group:Button
      this._button4="";

      //declaration for Object Service Name2 in the group:Management Service
      this._serviceName2="";

      //declaration for Field3 Label in the group:Details
      this._field3Label="";

      //declaration for Object Name2 in the group:Management Service
      this._objectName2="";

      //declaration for Field3 Value in the group:Details
      this._field3Value="";

      //declaration for Button5 in the group:Button
      this._button5="";

      //declaration for Operation Name2 in the group:Management Service
      this._operationName2="";

      //declaration for Field3 Type in the group:Details
      this._field3Type="";

      //declaration for Criteria2 in the group:Management Service
      this._criteria2="";

      //declaration for Field4 Label in the group:Details
      this._field4Label="";

      //declaration for Field4 Value in the group:Details
      this._field4Value="";

      //declaration for Field4 Type in the group:Details
      this._field4Type="";

      //declaration for Object Service Name3 in the group:Management Service
      this._serviceName3="";

      //declaration for Field5 Label in the group:Details
      this._field5Label="";

      //declaration for Object Name3 in the group:Management Service
      this._objectName3="";

      //declaration for Field5 Value in the group:Details
      this._field5Value="";

      //declaration for Operation Name3 in the group:Management Service
      this._operationName3="";

      //declaration for Field5 Type in the group:Details
      this._field5Type="";

      //declaration for Criteria3 in the group:Management Service
      this._criteria3="";

      //declaration for Field6 Label in the group:Details
      this._field6Label="";

      //declaration for Data Availability in the group:Management Service
      this._dataAvailability="";

      //declaration for Field6 Value in the group:Details
      this._field6Value="";

      //declaration for Service Identifier in the group:Management Service
      this._serviceIdentifier="";

      //declaration for Field6 Type in the group:Details
      this._field6Type="";

      //declaration for Field7 Label in the group:Details
      this._field7Label="";

      //declaration for Field7 Value in the group:Details
      this._field7Value="";

      //declaration for Field7 Type in the group:Details
      this._field7Type="";

      //declaration for Field8 Label in the group:Details
      this._field8Label="";

      //declaration for Field8 Value in the group:Details
      this._field8Value="";

      //declaration for Field8 Type in the group:Details
      this._field8Type="";

      //declaration for Field9 Label in the group:Details
      this._field9Label="";

      //declaration for Field9 Value in the group:Details
      this._field9Value="";

      //declaration for Field9 Type in the group:Details
      this._field9Type="";

      //declaration for Field10 Label in the group:Details
      this._field10Label="";

      //declaration for Field10 Value in the group:Details
      this._field10Value="";

      //declaration for Field10 Type in the group:Details
      this._field10Type="";

      //declaration for Field11 Label in the group:Details
      this._field11Label="";

      //declaration for Field11 Value in the group:Details
      this._field11Value="";

      //declaration for Field11 Type in the group:Details
      this._field11Type="";

      //declaration for Field12 Label in the group:Details
      this._field12Label="";

      //declaration for Field12 Value in the group:Details
      this._field12Value ="";
      //declaration for Field12 Type in the group:Details
      this._field12Type="";

      //declaration for Status Image Format in the group:Details
      this._statusImageFormat="";

      this._buttonCount ="5";
      
      // Buttons Available count
      this.buttonsAvail= 0;

      this.parserUtilsManager = new ParserUtilsManager();
      this.FormatValueUtils = new FormatValueUtils();
      this.EntitlementUtils = new EntitlementUtils();
      this.DetailsDAO = new DetailsDAO();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      //setter method for Object Service Name1 in the group:Management Service
      defineSetter(this, "serviceName1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._serviceName1=val;
        }
      });

      //getter method for Object Service Name1 in the group:Management Service
      defineGetter(this, "serviceName1", function() {
        return this._serviceName1;
      });

      //setter method for Field1 Label in the group:Details
      defineSetter(this, "field1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field1Label=val;
        }
      });

      //getter method for Field1 Label in the group:Details
      defineGetter(this, "field1Label", function() {
        return this._field1Label;
      });

      //setter method for Button1 in the group:Button
      defineSetter(this, "button1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._button1=val;
        }
      });

      //getter method for Button1 in the group:Button
      defineGetter(this, "button1", function() {
        return this._button1;
      });

      //setter method for Label Skin in the group:Skins
      defineSetter(this, "labelSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._labelSkin=val;
        }
      });

      //getter method for Label Skin in the group:Skins
      defineGetter(this, "labelSkin", function() {
        return this._labelSkin;
      });

      //setter method for Retail Icon in the group:Icons
      defineSetter(this, "retailIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._retailIcon=val;
        }
      });

      //getter method for Retail Icon in the group:Icons
      defineGetter(this, "retailIcon", function() {
        return this._retailIcon;
      });

      //setter method for Amount Format in the group:Data Format
      defineSetter(this, "amountFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._amountFormat=val;
        }
      });

      //getter method for Amount Format in the group:Data Format
      defineGetter(this, "amountFormat", function() {
        return this._amountFormat;
      });

      //setter method for Alert Text1 in the group:Alert Properties
      defineSetter(this, "alertText1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._alertText1=val;
        }
      });

      //getter method for Alert Text1 in the group:Alert Properties
      defineGetter(this, "alertText1", function() {
        return this._alertText1;
      });

      //setter method for Object Name1 in the group:Management Service
      defineSetter(this, "objectName1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._objectName1=val;
        }
      });

      //getter method for Object Name1 in the group:Management Service
      defineGetter(this, "objectName1", function() {
        return this._objectName1;
      });

      //setter method for Field1 Value in the group:Details
      defineSetter(this, "field1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field1Value=val;
        }
      });

      //getter method for Field1 Value in the group:Details
      defineGetter(this, "field1Value", function() {
        return this._field1Value;
      });

      //setter method for Value Skin in the group:Skins
      defineSetter(this, "valueSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._valueSkin=val;
        }
      });

      //getter method for Value Skin in the group:Skins
      defineGetter(this, "valueSkin", function() {
        return this._valueSkin;
      });

      //setter method for CombinedUser Icon in the group:Icons
      defineSetter(this, "combinedUserIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._combinedUserIcon=val;
        }
      });

      //getter method for CombinedUser Icon in the group:Icons
      defineGetter(this, "combinedUserIcon", function() {
        return this._combinedUserIcon;
      });

      //setter method for Date Format in the group:Data Format
      defineSetter(this, "dateFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._dateFormat=val;
        }
      });

      //getter method for Date Format in the group:Data Format
      defineGetter(this, "dateFormat", function() {
        return this._dateFormat;
      });

      //setter method for Operation Name1 in the group:Management Service
      defineSetter(this, "operationName1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._operationName1=val;
        }
      });

      //getter method for Operation Name1 in the group:Management Service
      defineGetter(this, "operationName1", function() {
        return this._operationName1;
      });

      //setter method for Field1 Type in the group:Details
      defineSetter(this, "field1Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field1Type=val;
        }
      });

      //getter method for Field1 Type in the group:Details
      defineGetter(this, "field1Type", function() {
        return this._field1Type;
      });

      //setter method for Button2 in the group:Button
      defineSetter(this, "button2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._button2=val;
        }
      });

      //getter method for Button2 in the group:Button
      defineGetter(this, "button2", function() {
        return this._button2;
      });

      //setter method for Amount Skin in the group:Skins
      defineSetter(this, "amountSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._amountSkin=val;
        }
      });

      //getter method for Amount Skin in the group:Skins
      defineGetter(this, "amountSkin", function() {
        return this._amountSkin;
      });

      //setter method for Backend Date Format in the group:Data Format
      defineSetter(this, "backendDateFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._backendDateFormat=val;
        }
      });

      //getter method for Backend Date Format in the group:Data Format
      defineGetter(this, "backendDateFormat", function() {
        return this._backendDateFormat;
      });

      //setter method for Icon Visibility in the group:Icons
      defineSetter(this, "iconVisibility", function(val) {
        if((typeof val=='boolean') && (val != "")){
          this._iconVisibility=val;
        }
      });

      //getter method for Icon Visibility in the group:Icons
      defineGetter(this, "iconVisibility", function() {
        return this._iconVisibility;
      });

      //setter method for Criteria1 in the group:Management Service
      defineSetter(this, "criteria1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._criteria1=val;
        }
      });

      //getter method for Criteria1 in the group:Management Service
      defineGetter(this, "criteria1", function() {
        return this._criteria1;
      });

      //setter method for Status Label in the group:Details
      defineSetter(this, "statusLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._statusLabel=val;
        }
      });

      //getter method for Status Label in the group:Details
      defineGetter(this, "statusLabel", function() {
        return this._statusLabel;
      });

      //setter method for Account Number Format in the group:Data Format
      defineSetter(this, "accountNumberFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._accountNumberFormat=val;
        }
      });

      //getter method for Account Number Format in the group:Data Format
      defineGetter(this, "accountNumberFormat", function() {
        return this._accountNumberFormat;
      });

      //setter method for Yes Label in the group:Alert Properties
      defineSetter(this, "yesLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._yesLabel=val;
        }
      });

      //getter method for Yes Label in the group:Alert Properties
      defineGetter(this, "yesLabel", function() {
        return this._yesLabel;
      });

      //setter method for Field2 Label in the group:Details
      defineSetter(this, "field2Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field2Label=val;
        }
      });

      //getter method for Field2 Label in the group:Details
      defineGetter(this, "field2Label", function() {
        return this._field2Label;
      });

      //setter method for Button3 in the group:Button
      defineSetter(this, "button3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._button3=val;
        }
      });

      //getter method for Button3 in the group:Button
      defineGetter(this, "button3", function() {
        return this._button3;
      });

      //setter method for No Label in the group:Alert Properties
      defineSetter(this, "noLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._noLabel=val;
        }
      });

      //getter method for No Label in the group:Alert Properties
      defineGetter(this, "noLabel", function() {
        return this._noLabel;
      });

      //setter method for Currency Code in the group:Data Format
      defineSetter(this, "currencyCode", function(val) {
        if((typeof val=='string') && (val != "")){
          this._currencyCode=val;
        }
      });

      //getter method for Currency Code in the group:Data Format
      defineGetter(this, "currencyCode", function() {
        return this._currencyCode;
      });

      //setter method for Field2 Value in the group:Details
      defineSetter(this, "field2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field2Value=val;
        }
      });

      //getter method for Field2 Value in the group:Details
      defineGetter(this, "field2Value", function() {
        return this._field2Value;
      });

      //setter method for Separator Skin in the group:Skins
      defineSetter(this, "separatorSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._separatorSkin=val;
        }
      });

      //getter method for Separator Skin in the group:Skins
      defineGetter(this, "separatorSkin", function() {
        return this._separatorSkin;
      });

      //setter method for Account Number Length Display in the group:Data Format
      defineSetter(this, "accNoLengthDisplay", function(val) {
        if((typeof val=='string') && (val != "")){
          this._accNoLengthDisplay=val;
        }
      });

      //getter method for Account Number Length Display in the group:Data Format
      defineGetter(this, "accNoLengthDisplay", function() {
        return this._accNoLengthDisplay;
      });

      //setter method for Alert Text2 in the group:Alert Properties
      defineSetter(this, "alertText2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._alertText2=val;
        }
      });

      //getter method for Alert Text2 in the group:Alert Properties
      defineGetter(this, "alertText2", function() {
        return this._alertText2;
      });

      //setter method for Field2 Type in the group:Details
      defineSetter(this, "field2Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field2Type=val;
        }
      });

      //getter method for Field2 Type in the group:Details
      defineGetter(this, "field2Type", function() {
        return this._field2Type;
      });

      //setter method for Button4 in the group:Button
      defineSetter(this, "button4", function(val) {
        if((typeof val=='string') && (val != "")){
          this._button4=val;
        }
      });

      //getter method for Button4 in the group:Button
      defineGetter(this, "button4", function() {
        return this._button4;
      });

      //setter method for Object Service Name2 in the group:Management Service
      defineSetter(this, "serviceName2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._serviceName2=val;
        }
      });

      //getter method for Object Service Name2 in the group:Management Service
      defineGetter(this, "serviceName2", function() {
        return this._serviceName2;
      });

      //setter method for Field3 Label in the group:Details
      defineSetter(this, "field3Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field3Label=val;
        }
      });

      //getter method for Field3 Label in the group:Details
      defineGetter(this, "field3Label", function() {
        return this._field3Label;
      });

      //setter method for Object Name2 in the group:Management Service
      defineSetter(this, "objectName2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._objectName2=val;
        }
      });

      //getter method for Object Name2 in the group:Management Service
      defineGetter(this, "objectName2", function() {
        return this._objectName2;
      });

      //setter method for Field3 Value in the group:Details
      defineSetter(this, "field3Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field3Value=val;
        }
      });

      //getter method for Field3 Value in the group:Details
      defineGetter(this, "field3Value", function() {
        return this._field3Value;
      });

      //setter method for Button5 in the group:Button
      defineSetter(this, "button5", function(val) {
        if((typeof val=='string') && (val != "")){
          this._button5=val;
        }
      });

      //getter method for Button5 in the group:Button
      defineGetter(this, "button5", function() {
        return this._button5;
      });

      //setter method for Operation Name2 in the group:Management Service
      defineSetter(this, "operationName2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._operationName2=val;
        }
      });

      //getter method for Operation Name2 in the group:Management Service
      defineGetter(this, "operationName2", function() {
        return this._operationName2;
      });

      //setter method for Field3 Type in the group:Details
      defineSetter(this, "field3Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field3Type=val;
        }
      });

      //getter method for Field3 Type in the group:Details
      defineGetter(this, "field3Type", function() {
        return this._field3Type;
      });

      //setter method for Criteria2 in the group:Management Service
      defineSetter(this, "criteria2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._criteria2=val;
        }
      });

      //getter method for Criteria2 in the group:Management Service
      defineGetter(this, "criteria2", function() {
        return this._criteria2;
      });

      //setter method for Field4 Label in the group:Details
      defineSetter(this, "field4Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field4Label=val;
        }
      });

      //getter method for Field4 Label in the group:Details
      defineGetter(this, "field4Label", function() {
        return this._field4Label;
      });

      //setter method for Field4 Value in the group:Details
      defineSetter(this, "field4Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field4Value=val;
        }
      });

      //getter method for Field4 Value in the group:Details
      defineGetter(this, "field4Value", function() {
        return this._field4Value;
      });

      //setter method for Field4 Type in the group:Details
      defineSetter(this, "field4Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field4Type=val;
        }
      });

      //getter method for Field4 Type in the group:Details
      defineGetter(this, "field4Type", function() {
        return this._field4Type;
      });

      //setter method for Object Service Name3 in the group:Management Service
      defineSetter(this, "serviceName3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._serviceName3=val;
        }
      });

      //getter method for Object Service Name3 in the group:Management Service
      defineGetter(this, "serviceName3", function() {
        return this._serviceName3;
      });

      //setter method for Field5 Label in the group:Details
      defineSetter(this, "field5Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field5Label=val;
        }
      });

      //getter method for Field5 Label in the group:Details
      defineGetter(this, "field5Label", function() {
        return this._field5Label;
      });

      //setter method for Object Name3 in the group:Management Service
      defineSetter(this, "objectName3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._objectName3=val;
        }
      });

      //getter method for Object Name3 in the group:Management Service
      defineGetter(this, "objectName3", function() {
        return this._objectName3;
      });

      //setter method for Field5 Value in the group:Details
      defineSetter(this, "field5Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field5Value=val;
        }
      });

      //getter method for Field5 Value in the group:Details
      defineGetter(this, "field5Value", function() {
        return this._field5Value;
      });

      //setter method for Operation Name3 in the group:Management Service
      defineSetter(this, "operationName3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._operationName3=val;
        }
      });

      //getter method for Operation Name3 in the group:Management Service
      defineGetter(this, "operationName3", function() {
        return this._operationName3;
      });

      //setter method for Field5 Type in the group:Details
      defineSetter(this, "field5Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field5Type=val;
        }
      });

      //getter method for Field5 Type in the group:Details
      defineGetter(this, "field5Type", function() {
        return this._field5Type;
      });

      //setter method for Criteria3 in the group:Management Service
      defineSetter(this, "criteria3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._criteria3=val;
        }
      });

      //getter method for Criteria3 in the group:Management Service
      defineGetter(this, "criteria3", function() {
        return this._criteria3;
      });

      //setter method for Field6 Label in the group:Details
      defineSetter(this, "field6Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field6Label=val;
        }
      });

      //getter method for Field6 Label in the group:Details
      defineGetter(this, "field6Label", function() {
        return this._field6Label;
      });

      //setter method for Data Availability in the group:Management Service
      defineSetter(this, "dataAvailability", function(val) {
        if((typeof val=='string') && (val != "")){
          this._dataAvailability=val;
        }
      });

      //getter method for Data Availability in the group:Management Service
      defineGetter(this, "dataAvailability", function() {
        return this._dataAvailability;
      });

      //setter method for Field6 Value in the group:Details
      defineSetter(this, "field6Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field6Value=val;
        }
      });

      //getter method for Field6 Value in the group:Details
      defineGetter(this, "field6Value", function() {
        return this._field6Value;
      });

      //setter method for Service Identifier in the group:Management Service
      defineSetter(this, "serviceIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._serviceIdentifier=val;
        }
      });

      //getter method for Service Identifier in the group:Management Service
      defineGetter(this, "serviceIdentifier", function() {
        return this._serviceIdentifier;
      });

      //setter method for Field6 Type in the group:Details
      defineSetter(this, "field6Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field6Type=val;
        }
      });

      //getter method for Field6 Type in the group:Details
      defineGetter(this, "field6Type", function() {
        return this._field6Type;
      });

      //setter method for Field7 Label in the group:Details
      defineSetter(this, "field7Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field7Label=val;
        }
      });

      //getter method for Field7 Label in the group:Details
      defineGetter(this, "field7Label", function() {
        return this._field7Label;
      });

      //setter method for Field7 Value in the group:Details
      defineSetter(this, "field7Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field7Value=val;
        }
      });

      //getter method for Field7 Value in the group:Details
      defineGetter(this, "field7Value", function() {
        return this._field7Value;
      });

      //setter method for Field7 Type in the group:Details
      defineSetter(this, "field7Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field7Type=val;
        }
      });

      //getter method for Field7 Type in the group:Details
      defineGetter(this, "field7Type", function() {
        return this._field7Type;
      });

      //setter method for Field8 Label in the group:Details
      defineSetter(this, "field8Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field8Label=val;
        }
      });

      //getter method for Field8 Label in the group:Details
      defineGetter(this, "field8Label", function() {
        return this._field8Label;
      });

      //setter method for Field8 Value in the group:Details
      defineSetter(this, "field8Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field8Value=val;
        }
      });

      //getter method for Field8 Value in the group:Details
      defineGetter(this, "field8Value", function() {
        return this._field8Value;
      });

      //setter method for Field8 Type in the group:Details
      defineSetter(this, "field8Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field8Type=val;
        }
      });

      //getter method for Field8 Type in the group:Details
      defineGetter(this, "field8Type", function() {
        return this._field8Type;
      });

      //setter method for Field9 Label in the group:Details
      defineSetter(this, "field9Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field9Label=val;
        }
      });

      //getter method for Field9 Label in the group:Details
      defineGetter(this, "field9Label", function() {
        return this._field9Label;
      });

      //setter method for Field9 Value in the group:Details
      defineSetter(this, "field9Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field9Value=val;
        }
      });

      //getter method for Field9 Value in the group:Details
      defineGetter(this, "field9Value", function() {
        return this._field9Value;
      });

      //setter method for Field9 Type in the group:Details
      defineSetter(this, "field9Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field9Type=val;
        }
      });

      //getter method for Field9 Type in the group:Details
      defineGetter(this, "field9Type", function() {
        return this._field9Type;
      });

      //setter method for Field10 Label in the group:Details
      defineSetter(this, "field10Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field10Label=val;
        }
      });

      //getter method for Field10 Label in the group:Details
      defineGetter(this, "field10Label", function() {
        return this._field10Label;
      });

      //setter method for Field10 Value in the group:Details
      defineSetter(this, "field10Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field10Value=val;
        }
      });

      //getter method for Field10 Value in the group:Details
      defineGetter(this, "field10Value", function() {
        return this._field10Value;
      });

      //setter method for Field10 Type in the group:Details
      defineSetter(this, "field10Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field10Type=val;
        }
      });

      //getter method for Field10 Type in the group:Details
      defineGetter(this, "field10Type", function() {
        return this._field10Type;
      });

      //setter method for Field11 Label in the group:Details
      defineSetter(this, "field11Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field11Label=val;
        }
      });

      //getter method for Field11 Label in the group:Details
      defineGetter(this, "field11Label", function() {
        return this._field11Label;
      });

      //setter method for Field11 Value in the group:Details
      defineSetter(this, "field11Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field11Value=val;
        }
      });

      //getter method for Field11 Value in the group:Details
      defineGetter(this, "field11Value", function() {
        return this._field11Value;
      });

      //setter method for Field11 Type in the group:Details
      defineSetter(this, "field11Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field11Type=val;
        }
      });

      //getter method for Field11 Type in the group:Details
      defineGetter(this, "field11Type", function() {
        return this._field11Type;
      });

      //setter method for Field12 Label in the group:Details
      defineSetter(this, "field12Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field12Label=val;
        }
      });

      //getter method for Field12 Label in the group:Details
      defineGetter(this, "field12Label", function() {
        return this._field12Label;
      });

      //setter method for Field12 Value in the group:Details
      defineSetter(this, "field12Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field12Value=val;
        }
      });

      //getter method for Field12 Value in the group:Details
      defineGetter(this, "field12Value", function() {
        return this._field12Value;
      });

      //setter method for Field12 Type in the group:Details
      defineSetter(this, "field12Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field12Type=val;
        }
      });

      //getter method for Field12 Type in the group:Details
      defineGetter(this, "field12Type", function() {
        return this._field12Type;
      });

      //setter method for Status Image Format in the group:Details
      defineSetter(this, "statusImageFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._statusImageFormat=val;
        }
      });

      //getter method for Status Image Format in the group:Details
      defineGetter(this, "statusImageFormat", function() {
        return this._statusImageFormat;
      });

    },

    preShow :function(){
      this.serviceFinder();
      this.view.forceLayout();
    },
    /*
     Based on dataAvailability 
     Field values can be taken from Context / Reponse 
    */
    serviceFinder : function(){
      var scope = this;
      this.setEntitlements();
      this.criteria3 = this.parserUtilsManager.getParsedValue(this._criteria3);
      if (this._dataAvailability === "Service Call by Component"){
        try{
        this.showLoading();
        scope.DetailsDAO.getDetails(scope._serviceName3,
                                    scope._operationName3, scope._objectName3,
                                    JSON.parse(scope.criteria3), scope._serviceIdentifier,scope.detailsSuccessCallBack, scope.deleteFailureCallBack);
       
        }catch (err) {
          this.dismissLoading();
          var errorObj = {
            "errorInfo": "Error in doing service call to fetch transactions",
            "errorLevel": "Business",
            "error": err
          };
          this.deleteFailureCallBack(errorObj);
        }
      }else{
        this.setFieldValueFromContext();
        this.detailsConfig();
        this.buttonConfig();
        this.uiConfig();
      }
    },
    detailsSuccessCallBack: function(response,unicode){
      this.map ={};
      this.ReponseDetails = response;
      this.readObject(response);
      this.parserUtilsManager.setResponseData(unicode, this.map);
      this.setFieldValueFromContext();
      this.detailsConfig();
      this.buttonConfig();
      this.uiConfig();
      this.dismissLoading();
    },
    
    setContext :function(context){
      this._context = context;
      this.parserUtilsManager.setContext(context);
    },
    /*
    Permissions and features
    */
    setEntitlements: function(){
      this.EntitlementUtils.setEntitlements(this._context);
    },
    /*
    Layout Change when field count is less than 7 and ButtonCount is 1
    */
    uiConfig : function(){
      this.view.flxMain.layoutType = kony.flex.FLOW_VERTICAL;
      this.view["flxSeparator"+this.fieldCount].width= "100%";
      if(this.fieldCount <7 && this.buttonsAvail===1 ){
        this.view.flxMain.layoutType = kony.flex.FREE_FORM;
        this.view.flxButtons.bottom ="20dp";
        this.view.flxButtons.right = "0dp";
        this.view.forceLayout();
      }
    },
    /*
    Parsing of Field Values using parsing Util Manager
    */
    setFieldValueFromContext: function(){
      // to maintain fieldCount
      this.fieldCount = 0;
      this.buttonsAvail = 0;
      //field Label parsing
      this.fieldLabel1= this.parserUtilsManager.getParsedValue(this._field1Label);
      this.fieldLabel2= this.parserUtilsManager.getParsedValue(this._field2Label);
      this.fieldLabel3= this.parserUtilsManager.getParsedValue(this._field3Label);
      this.fieldLabel4= this.parserUtilsManager.getParsedValue(this._field4Label);
      this.fieldLabel5= this.parserUtilsManager.getParsedValue(this._field5Label);
      this.fieldLabel6= this.parserUtilsManager.getParsedValue(this._field6Label);
      this.fieldLabel7= this.parserUtilsManager.getParsedValue(this._field7Label);
      this.fieldLabel8= this.parserUtilsManager.getParsedValue(this._field8Label);
      this.fieldLabel9= this.parserUtilsManager.getParsedValue(this._field9Label);
      this.fieldLabel10= this.parserUtilsManager.getParsedValue(this._field10Label);
      this.fieldLabel11= this.parserUtilsManager.getParsedValue(this._field11Label);
      this.fieldLabel12= this.parserUtilsManager.getParsedValue(this._field12Label);
      //Count Number Of fields available for UI Fix 
      for(var i=1;i<13;i++){
        !this.isEmptyNullUndefined(this["fieldLabel"+i])? this.fieldCount++ : this.fieldCount; 
      }
    
      //StatusLabel parsing
      this.statusLabel1= this.parserUtilsManager.getParsedValue(this._statusLabel);
      //dataForamt parsing 
      this.currency = this.parserUtilsManager.getParsedValue(this._currencyCode);

    },
    isJSON : function(str) {
      try {
       JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    /*** Flex Details Construction ***/

    detailsConfig :function(){
      
      /*Common Values required for formatting throughout the component */
      var formatUtils = {
        "BALANCE_AMOUNT_SKIN": "",
        "AMOUNT_SKIN": this._amountSkin,
        "DETAILS_AMOUNT_SKIN": "",
        "DATE_SKIN": "",
        "PERCENTAGE_SKIN": "",
        "ACCOUNT_NUMBER_SKIN": "",
        "TEXT_SKIN": this._valueSkin,
        "AMOUNT_FORMAT": this._amountFormat,
        "POSITIVE_AMOUNT_SKIN": "",
        "NEGATIVE_AMOUNT_SKIN": "",
        "DATE_FORMAT":this._dateFormat,
        "BACKEND_DATE_FORMAT": this._backendDateFormat,
        "ACCOUNT_NUMBER_FORMAT": this._accountNumberFormat,
        "MASKING": "",
        "MASKING_EYE_ICON": "",
        "UNMASKING_EYE_ICON": "",
        "MASKING_EYE_ICON_SKIN": "",
        "UNMASKING_EYE_ICON_SKIN": "",
        "CURRENCY_SYMBOL_CODE": this.currency,
        "RETAIL_ICON" : this.parserUtilsManager.getParsedValue(this._retailIcon),
        "BUSINESS_ICON": this.parserUtilsManager.getParsedValue(this._combinedUserIcon),
        "ICON_VISIBILITY": this._iconVisibility,
        "ACCOUNT_NUMBER_LENGTH": this._accNoLengthDisplay
      };
      // Field 1 UI Config & Status Config
      if(!this.isEmptyNullUndefined(this.fieldLabel1)){
        this.view.flx1.setVisibility(true);
        this.view.lblText1.text= this.fieldLabel1;
        this.view.lblText1.skin = JSON.parse(this._labelSkin).skin;
        if(this.isJSON(this._field1Value)){
        if(!this.isEmptyNullUndefined(JSON.parse(this._field1Value).UIMapping)){
            var val1 = JSON.parse(this._field1Value).UIMapping[this.parserUtilsManager.getParsedValue(JSON.parse(this._field1Value).mapping)]
            if(!this.isEmptyNullUndefined(val1)){
            var value1 = this.FormatValueUtils.formatText({
              "text": val1,
              "type": this._field1Type,
            }, formatUtils);
            }else{
              this.view.flx1.setVisibility(false);
            }
        }else{
          var value1 = this.FormatValueUtils.formatText({
            "text": this.parserUtilsManager.getParsedValue(this._field1Value),
            "type": this._field1Type,
          }, formatUtils);
        }
        }else{
          var value1 = this.FormatValueUtils.formatText({
            "text": this.parserUtilsManager.getParsedValue(this._field1Value),
            "type": this._field1Type,
          }, formatUtils);
        }
        this.view.lblValue1.text= !this.isEmptyNullUndefined(value1.text)?value1.text:"-";
        this.view.lblValue1.skin=value1.skin;
        if(!this.isEmptyNullUndefined(value1.Icon)){
          this.view.flxIcon1.setVisibility(true);
          this.view.icon1.src = value1.Icon;
        }else{
          this.view.flxIcon1.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this.statusLabel1)){
          if(!this.isEmptyNullUndefined(this._statusImageFormat)){
            this.view.flxStatus.setVisibility(true);
            this.view.flxS.setVisibility(true);
            this.view.statusLabel.text = this.statusLabel1;
            this.statusImage(this.statusLabel1,this._statusImageFormat);
          }else{
            this.view.flxStatus.setVisibility(false);
          }
        }else{
          this.view.flxS.setVisibility(false);
        } 
        this.view.flxSeparator1.skin =  JSON.parse(this._separatorSkin).skin;
      }else{
        this.view.flx1.setVisibility(false);
      }
      /* Maximum Field Count 12
         Field 2 to 12 UI Config
         Formatting of Field Values
      */
      for(var i=2; i<=12; i++){
        if(!this.isEmptyNullUndefined(this["fieldLabel"+i])){
        this.view["flx"+i].setVisibility(true);
        this.view["lblText"+i].text =this["fieldLabel"+i];
        this.view["lblText"+i].skin = JSON.parse(this._labelSkin).skin;
        if(this.isJSON(this["_field"+i+"Value"])){
        if(!this.isEmptyNullUndefined(JSON.parse(this["_field"+i+"Value"]).UIMapping)){
          var val = JSON.parse(this["_field"+i+"Value"]).UIMapping[this.parserUtilsManager.getParsedValue(JSON.parse(this["_field"+i+"Value"]).mapping)];
          if(!this.isEmptyNullUndefined(val)){
            var value = this.FormatValueUtils.formatText({
              "text": val,
              "type": this["_field"+i+"Type"],
            }, formatUtils);
          }else{
            this.view["flx"+i].setVisibility(false);
          }
        }else{
          var value = this.FormatValueUtils.formatText({
          "text": this.parserUtilsManager.getParsedValue(this["_field"+i+"Value"]),
          "type": this["_field"+i+"Type"],
        }, formatUtils);
        }
        }else{
          var temptext=this.parserUtilsManager.getParsedValue(this["_field" + i + "Value"]);
          if(i==5 && temptext==""){
            var value = this.FormatValueUtils.formatText({
            "text": "Until I Cancel",
            "type": "Label",
          }, formatUtils);
          }
          else{
          var value = this.FormatValueUtils.formatText({
            "text": temptext,
            "type": this["_field"+i+"Type"],
          }, formatUtils);
          }
        }
        this.view["lblValue"+i].text =  !this.isEmptyNullUndefined(value.text)?value.text:"-";
        this.view["lblValue"+i].skin = value.skin;
        if(!this.isEmptyNullUndefined(value.Icon)){
          this.view["flxIcon"+i].setVisibility(true);
          this.view["icon"+i].src = value.Icon;
        }else{
          this.view["flxIcon"+i].setVisibility(false);
        }
        this.view["flxSeparator"+i].skin =  JSON.parse(this._separatorSkin).skin;
      }
      else{
        this.view["flx"+i].setVisibility(false);
      } 
    }

    },
    
    /*To check for Null / undefined **/
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
        return true;
      return false;
    },
    /*Status Image Ui Config
    @params  statusLabel , Image 
    @returns StatusImage based on Label 
    */
    statusImage:function(statusLabel,statusImageFormat){
      var status = JSON.parse(statusImageFormat)
      if(status.hasOwnProperty(statusLabel)){
        for (var i in status){
          if(i ===statusLabel){
            this.view.flxStatus.setVisibility(true);
            this.view.statusImage.src = status[i];
          }
        }}else{
          this.view.flxStatus.setVisibility(false);
        }
    },
    /*
    Checks for the permission 
    */
    isEntitled: function(data){
      return this.EntitlementUtils.isEntitled(data);
    },
    
    /*
     Button Count : 5
     button configuration based on entitlement and status
     UI Configuration of buttons
    */
      buttonConfig : function(){
      for(var i=1; i<=this._buttonCount; i++){
        var button = this["_button"+i];
        var widget = "button"+i;
        if(!this.isEmptyNullUndefined(button)) {
		  var btnConfig = JSON.parse(button);
          if((!this.isEmptyNullUndefined(btnConfig)) && btnConfig.hasOwnProperty("restrictActions")) {
            var value =this.parserUtilsManager.getParsedValue(btnConfig.restrictActions);
            if(value){
              this.view[widget].setVisibility(false);
              continue;
            }
          }
          if(this.isEmptyNullUndefined(JSON.parse(button).buttonId)){
            var type =this.parserUtilsManager.getParsedValue(JSON.parse(button).mapping);
            var typeProperties =JSON.parse(button)[type];
            if(!this.isEmptyNullUndefined(typeProperties)){
              var status = this.parserUtilsManager.getParsedValue(typeProperties.statusMapping);
              var buttonProperties = typeProperties[status];
              if(!this.isEmptyNullUndefined(buttonProperties)){
                if(!this.isEmptyNullUndefined(buttonProperties.visibilityMapping)){
                  var Fieldavail = this.parserUtilsManager.getParsedValue(buttonProperties.visibilityMapping);
                  if(this.isEntitled(buttonProperties.entitlement) && Fieldavail.length>0) {
                    this.view[widget].text=this.parserUtilsManager.getParsedValue(buttonProperties.title);
                    this.view[widget].skin= buttonProperties.skin;
                    this.view[widget].setVisibility(true);
                    this.buttonsAvail++;
                    this.view[widget].onClick = this.onButtonClick.bind(this,this.parserUtilsManager.getParsedValue(buttonProperties.buttonId));
                    if(scope_configManager.TransferFlowType === "UTF" && (this.view[widget].text === "Edit" || this.view[widget].text === "Cancel Series" || this.view[widget].text === "Cancel Transaction" || this.view[widget].text === "Cancel"))
                      //this.view[widget].setVisibility(false);
                      this.view[widget].setVisibility(true);
                  }else{
                    this.view[widget].setVisibility(false);
                  }
                }
                else{
                  if(this.isEntitled(buttonProperties.entitlement)) {
                    this.view[widget].text=this.parserUtilsManager.getParsedValue(buttonProperties.title);
                    this.view[widget].skin= buttonProperties.skin;
                    this.view[widget].setVisibility(true);
                    this.buttonsAvail++;
                    this.view[widget].onClick = this.onButtonClick.bind(this,this.parserUtilsManager.getParsedValue(buttonProperties.buttonId));
                    if(scope_configManager.TransferFlowType === "UTF" && (this.view[widget].text === "Edit" || this.view[widget].text === "Cancel Series" || this.view[widget].text === "Cancel Transaction" || this.view[widget].text === "Cancel"))
                      //this.view[widget].setVisibility(false);
                      this.view[widget].setVisibility(true);
                  }
                }
              }else{
                    this.view[widget].setVisibility(false);
                }
            }
            else{
              this.view[widget].setVisibility(false);
            }
          }else{
            /* Direct Button Configuration based on entitlement alone */
            var buttonProperties = JSON.parse(button);
            if(this.isEntitled(buttonProperties.entitlement)){
              this.view[widget].text=this.parserUtilsManager.getParsedValue(buttonProperties.title);
              this.view[widget].skin= buttonProperties.skin;
              this.view[widget].setVisibility(true);
              this.buttonsAvail++;
              this.view[widget].onClick = this.onButtonClick.bind(this,this.parserUtilsManager.getParsedValue(buttonProperties.buttonId)); 
            }else{
              this.view[widget].setVisibility(false);
            }

          }
        }else{
          this.view[widget].setVisibility(false);
        }
      }
    },
    /* @event based on buttonID events will be triggered
      except Cancel1 and Cancel2 other actions will be handled at form level 
      @params : button Id and response 
      
    */
    onButtonClick : function(buttonId){
      this.buttonIdentifier = buttonId;
      if(buttonId === "Cancel1")
        this.onCancel1();
      else if (buttonId ==="Cancel2")
        this.onCancel2();
      else{
         if (this._dataAvailability === "Service Call by Component")
            this.onButtonAction(buttonId,this.ReponseDetails);
         else
            this.onButtonAction(buttonId,this._context);
       }  
      
    },
    /*
    buttonId as cancel1 will refer this method
    @event: cancel ,alert box with appropriate text confirmation
    calls the cancel Service 
    @params :_serviceName1,_operationName1,_objectName1,_criteria1,deleteSuccessCallBack,onError
    @returns : response /error 
    */
    onCancel1 : function(){
      var scope =this;
      this.cancelCriteria1 = this.parserUtilsManager.getParsedValue(this._criteria1);
      var basicConfig = {
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "message": this.parserUtilsManager.getParsedValue(this._alertText1),
        "yesLabel": this.parserUtilsManager.getParsedValue(this._yesLabel),
        "noLabel": this.parserUtilsManager.getParsedValue(this._noLabel),
        "alertHandler": this.deleteConnection.bind(this)
      };
      var pspConfig = {};
      kony.ui.Alert(basicConfig, pspConfig);
    },
   operationNameFinder: function(opStruct){
     if(typeof(opStruct) == "string"){
       if(this.isJSON(opStruct)){
       if(JSON.parse(opStruct).hasOwnProperty("mapping")){
           var value =this.parserUtilsManager.getParsedValue(JSON.parse(opStruct).mapping);
           return JSON.parse(opStruct)[value];
        }
       }else{
          return opStruct;
        }
     }
    },
    deleteConnection: function(response){
      var scope =this;
      if(response===true){
        try{
          scope.showLoading();
          var operName1 = this.operationNameFinder(scope._operationName1);
          scope.DetailsDAO.cancelCall(scope._serviceName1,
                                      operName1, scope._objectName1,
                                      JSON.parse(scope.cancelCriteria1), scope.deleteSuccessCallBack, scope.deleteFailureCallBack);}
        catch (err) {
          this.dismissLoading();
          var errorObj = {
            "errorInfo": "Error in doing service call to fetch transactions",
            "errorLevel": "Business",
            "error": err
          };
          this.deleteFailureCallBack(errorObj);
        }
      }
    },
    deleteSuccessCallBack : function(response){
      response.buttonIdentifier = this.buttonIdentifier;
      this.dismissLoading();
      this.onSuccess(response);
    },
    deleteFailureCallBack : function(error){
      this.dismissLoading();
      if (error.error) {
        error = error.error;
      }
      var errMsg, isServiceFailure, resError, res, btnIdentifier;
      if (error.opstatus == 1011 || error.errcode == 1011 || error.opstatus == 1023 || error.errcode == 1023)
      {
        if(kony.os.deviceInfo().name === "thinclient" && kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)===false){
          location.reload(); //todo later so that it can be in sync with RB
        }
        else{
          isServiceFailure = true;
          if(error.errmsg){
            errMsg = error.errmsg;
          }
          else if(error.dbpErrMsg)
          	errMsg = error.dbpErrMsg;
          else{
            errMsg = kony.i18n.getLocalizedString("kony.mb.An.error.occurred.while.making.the.request.");
          }
        }
      }
      else
      {
        isServiceFailure = false;
        if(error.errmsg)
          errMsg = error.errmsg;
        else if(error.dbpErrMsg)
          errMsg = error.dbpErrMsg;
        else
          errMsg = kony.i18n.getLocalizedString("kony.mb.An.Internal.Error.occured.Please.try.after.sometime.");
      }
      btnIdentifier = this.buttonIdentifier;
      resError={"errorMessage":errMsg,"isServerUnreachable":isServiceFailure,"serverErrorRes":error,"buttonIdentifier":btnIdentifier};
      res={"status":false,"errmsg":resError};
      this.onError(res.errmsg);
    },
    /*
    buttonId as cancel2 will refer this method
    @event: cancel ,alert box with appropriate text confirmation
    calls the cancel Service 
    @params :_serviceName2,_operationName2,_objectName2,_criteria2,deleteSuccessCallBack,onError
    @returns : response /error 
    */
    onCancel2 : function(){
      var scope =this;
      this.cancelCriteria2 = this.parserUtilsManager.getParsedValue(this._criteria2);
      var basicConfig = {
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "message": this.parserUtilsManager.getParsedValue(this._alertText2),
        "yesLabel": this.parserUtilsManager.getParsedValue(this._yesLabel),
        "noLabel": this.parserUtilsManager.getParsedValue(this._noLabel),
        "alertHandler": this.cancelConnection.bind(this)
      };
      var pspConfig = {};
      kony.ui.Alert(basicConfig, pspConfig);
    },

    cancelConnection: function(response){
      var scope = this;
      if(response===true){
        try{
          scope.showLoading();
            var operName2 = this.operationNameFinder(scope._operationName2);
          scope.DetailsDAO.cancelCall(scope._serviceName2,
                                     operName2, scope._objectName2,
                                      JSON.parse(scope.cancelCriteria2), scope.deleteSuccessCallBack, scope.deleteFailureCallBack);
        }
        catch (err) {
          this.dismissLoading();
          var errorObj = {
            "errorInfo": "Error in doing service call to fetch transactions",
            "errorLevel": "Business",
            "error": err
          };
          this.deleteFailureCallBack(errorObj);
        }

      }
    },
    /*
    @method helps to convert the JSON response into the readable object 
    that can be accessed via service identifier in fieldValues
    */
    readObject: function(obj, jsonPath) {
      var keysItr = Object.keys(obj);
      var parentPath = jsonPath;
      for (var i = 0; i < keysItr.length; i++) {
        var key = keysItr[i];
        var value = obj[key]
        if(parentPath){
          jsonPath = parentPath + "." + key;
        }
        else{
          jsonPath = key;
        }
        if (value instanceof Array) {
          this.readArray(value, jsonPath);
        } else if (value instanceof Object) {
          this.readObject(value, jsonPath);
        } else { 
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
    }


  };
});