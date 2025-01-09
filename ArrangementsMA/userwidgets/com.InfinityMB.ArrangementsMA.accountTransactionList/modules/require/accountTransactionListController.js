define(['CacheUtils','./TransactionListDAO','./ParserUtilsManager','./FormatUtils','./EntitlementUtils','./CacheUtils'],function(cacheUtilities,TransactionListDAO,ParserUtilsManager,FormatUtils, EntitlementUtils,CacheUtils) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //custom properties
      this._filterTab1="";
      this._filterTab2="";
      this._filterTab3="";
      this._filterTab4="";
      this._filterTab5="";
      this._filterTab6="slfBoxffffffB1R5";
	  this._filterValueTab1 = "";
      this._filterValueTab2 = "";
      this._filterValueTab3 = "";
      this._filterValueTab4 = "";
      this._filterValueTab5 = "";
	  this._GAserviceEnable = "";
      this._GAobjectServiceName="";
      this._GAobjectName="";
      this._GAoperationName="";
      this._GAcriteria="";
      this._TLobjectServiceName="";
      this._TLobjectName="";
      this._TLoperationName="";
      this._TLcriteria="";
      this._TLserviceResponseIdentifier="";
      this._TLaccountType="";
      this._TLaccountId = "";
      this._dataAvailability = "";
      this.accountType="";
      this._blockTitle="";
      this._transDetailsVisibility=true;
      this._TLenableForSearch=true;
      this._sknFilterActiveTab="";
      this._sknFilterActiveTabHover="";
      this._sknFilterInactiveTab="";
      this._sknFilterInactiveTabHover="";
      this._sknTableHeader="";
      this._sknTableHeaderText="";
      this._sknPendingLabel="";
      this._sknPostedLabel="";
      this._sknRowExpanded="";
      this._sknRowHover="";
      this._sknRowSeperator="";
      this._sknValueField="";
      this._sknTransDetailsLabel="";
      this._sknTransDetailsValue="";
      this._sknActionButtons="";
      this._sknSearchLabel="";
      this._sknSearchTextbox="";
      this._sknSearchActiveTextbox="";
      this._sknSearchDropdown="";
      this._sknSearchActiveDropdown="";
      this._sknSearchCalendar="";
      this._sknSearchActiveCalendar="";
      this._sknSearchButton="";
      this._sknSearchButtonHover="";
      this._sknSearchCancelButton="";
      this._sknSearchCancelButtonHover="";
      this._sknMBFieldValueBig="";
      this._sknMBFieldValueSmall="";
      this._sknMBTransactionDetailsLabel="";
      this._sknMBTransactionDetailsValue="";
      this._MBcolumn1Visibility="";
      this._MBcolumn2Visibility="";
      this._MBcolumn3Visibility="";
      this._MBcolumn4Visibility="";
      this._MBcolumn5Visibility="";
      this._MBcolumn6Visibility="";
      this._iconSearch="";
      this._iconDownload="";
      this._iconPrint="";
      this._iconRowExpand="";
      this._iconRowCollapse="";
      this._iconColumnSort="";
      this._iconColumnSortAsc="";
      this._iconColumnSortDesc="";
      this._amountFormat = "";
      this._dateFormat  = "";
      this._backendDateFormat = "";
      this._percentageFormat = "";
      this._currencyCode = "";
      //Data grid properties
      this._dataGridColumn1="";
      this._dataGridColumn2="";
      this._dataGridColumn3="";
      this._dataGridColumn4="";
      this._dataGridColumn5="";
      this._dataGridColumn6="";
      this._mobileDataGridField1="";
      this._mobileDataGridField2="";
      this._mobileDataGridField3="";
      this._transactionListArray = "";
      this._transactionListIdentifier = "";
      this._segregationDecider = "";
      this._segregationTypes = "";
      this._sknPositiveAmount = "";
      this._sknNegativeAmoount = "";
      this._sknDate = "";
      this._sknPercentage = "";
      this._field1Label = "";
      this._field1Value = "";
      this._field1Type = "";
      this._field2Label = "";
      this._field2Value = "";
      this._field2Type = "";
      this._field3Label = "";
      this._field3Value = "";
      this._field3Type = "";
      this._field4Label = "";
      this._field4Value = "";
      this._field4Type = "";
      this._field5Label = "";
      this._field5Value = "";
      this._field5Type = "";
      this._field6Label = "";
      this._field6Value = "";
      this._field6Type = "";
      this._field7Label = "";
      this._field7Value = "";
      this._field7Type = "";
      this._field8Label = "";
      this._field8Value = "";
      this._field8Type = "";
      this._field9Label = "";
      this._field9Value = "";
      this._field9Type = "";
      this._field10Label = "";
      this._field10Value = "";
      this._field10Type = "";
      this._btnContextualAction1 = "";
      this._btnContextualAction2 = "";
      this._btnContextualAction3 = "";
      this._btnContextualAction4 = "";
      //Search fields
      this._searchLabel1 = "";
      this._searchLabel2 = "";
      this._searchLabel3 = "";
      this._searchLabel4 = "";
      this._searchLabel5 = "";
      this._searchLabel6 = "";
      this._val1PlaceHolder = "";
      this._val4FromPlaceHolder = "";
      this._val4ToPlaceHolder = "";
 	  //Dispute transaction contracts
      this._disputeTransactionField = "";
      this._disputeIcon = "";
      this._disputeProperty = "";
      this._displayDisputeIcon = true;
      this._disputeTransactionMobileField = "";
      //DAO object
      this.transactionListDAO = new TransactionListDAO();
      //Parser Util Object
      this.parserUtilsManager = new ParserUtilsManager();
      //Format util object
      this.FormatUtils = new FormatUtils();
      //Entitlement util object
      this.EntitlementUtils = new EntitlementUtils();
      //global variables
      this.map={};
      this.skins = {};
      this.formatSkins = {};
      this.context = {};
      this.formattingJSON = {};
      this.selectedTab = 1;
      this.rowTemplate = "";
      this.expandedTemplate = "";
      this.offset = 0;
      this.sorting= "desc";
      this.criteria = {};
      //globals used for search functionality  
      this.searchConstants = {
		//BOTH: 'Both',
        BOTH: 'All',
        CHOOSE_TIME_RANGE: 'CHOOSE_TIME_RANGE',
        CUSTOM_DATE_RANGE: 'CUSTOM_DATE_RANGE',
      };
      this.transactionTypes = {
        //Both: 'i18n.accounts.selectTransaction',
        //Both: 'kony.mb.approvalsAndRequest.filter.SelectTransactionType',
        All: 'i18n.accounts.allTransactions',
        Deposit: 'i18n.accounts.deposits',
        Withdrawal: 'i18n.accounts.withdrawls',
        Cheque: 'i18n.accounts.checks',
        Transfers: "i18n.hamburger.transfers",
        BillPay: "i18n.billPay.BillPay",
        P2PDebits: 'i18n.accounts.p2pDebits',
        P2PCredits: 'i18n.accounts.p2pCredits'
      },
        this.timePeriods = {
        CHOOSE_TIME_RANGE: 'i18n.accounts.chooseTimeRange',
        LAST_SEVEN_DAYS: 'i18n.accounts.lastSevenDays',
        LAST_FOURTEEN_DAYS: 'i18n.accounts.lastFourteenDays',
        LAST_ONE_MONTH: 'i18n.accounts.lastOneMonth',
        LAST_TWO_MONTHS: 'i18n.accounts.lastTwoMonths',
        LAST_THREE_MONTHS: 'i18n.accounts.lastThreeMonths',
        LAST_SIX_MONTHS: 'i18n.accounts.lastSixMonths',
        LAST_TWELVE_MONTHS: 'i18n.accounts.lastTwelveMonths',
        CUSTOM_DATE_RANGE: 'i18n.accounts.customDateRange'
      };
      var today = new Date();
      this.searchViewModel = {
        searchPerformed: false,
        visible: false,
        searchResults: [],
        keyword: '',
        transactionTypes: this.objectToListBoxArray(this.transactionTypes),
        transactionTypeSelected: this.searchConstants.BOTH,
        timePeriods: this.objectToListBoxArray(this.timePeriods),
        timePeriodSelected: "CHOOSE_TIME_RANGE",
        fromCheckNumber: '',
        toCheckNumber: '',
        fromAmount: '',
        toAmount: '',
        fromDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()],
        toDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()],
        bfKeyword: '',
        bfReferenceNumber: '',
        bfFromDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()],
        bfToDate: [today.getDate(), today.getMonth() + 1, today.getFullYear()]
      };
      this.transactionListTypes = {};
	  this.response = {};
      //Tab 6 Properties
      this._tab6ObjectServiceName="";
      this._tab6ObjectName="";
      this.tab6OperationName="";
      this._tab6Criteria="";
      this._tab6ServiceResponseIdentifier="";
      this._tab6Title="";
      this._tab6TransactionListArray="";
      this._tab6DataGridColumn1="";
      this._tab6DataGridColumn2="";
      this._tab6DataGridColumn3="";
      this._tab6DataGridColumn4="";
      this._tab6DataGridColumn5="";
      this._tab6DataGridColumn6="";
      this._tab6MobileDataGridField1="";
      this._tab6MobileDataGridField2="";
      this._tab6MobileDataGridField3="";
      this._tab6Field1Label="";
      this._tab6Field1Value="";
      this._tab6Field1Type="";
      this._tab6Field2Label="";
      this._tab6Field2Value="";
      this._tab6Field2Type="";
      this._tab6Field3Label="";
      this._tab6Field3Value="";
      this._tab6Field3Type="";
      this._tab6Field4Label="";
      this._tab6Field4Value="";
      this._tab6Field4Type="";
      this._tab6Field5Label="";
      this._tab6Field5Value="";
      this._tab6Field5Type="";
      this._tab6Field6Label="";
      this._tab6Field6Value="";
      this._tab6Field6Type="";
      this._tab6Field7Label="";
      this._tab6Field7Value="";
      this._tab6Field7Type="";
      this._tab6Field8Label="";
      this._tab6Field8Value="";
      this._tab6Field8Type="";
      this._tab6Field9Label="";
      this._tab6Field9Value="";
      this._tab6Field9Type="";
      this._tab6Field10Label="";
      this._tab6Field10Value="";
      this._tab6Field10Type="";
      this._tab6BtnContextualAction1="";
      this._tab6BtnContextualAction2="";
      this._tab6BtnContextualAction3="";
      this._tab6BtnContextualAction4="";
	  this.totalRecords = "";
	  this._cacheTotalRecords = "";
      this._responseData="";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      //Custom property - Filter Tab 1
      defineSetter(this, "filterTab1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._filterTab1=val;
        }
      });
      defineGetter(this, "filterTab1", function() {
        return this._filterTab1;
      });
      //Custom property - Filter Tab 2
      defineSetter(this, "filterTab2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._filterTab2=val;
        }
      });
      defineGetter(this, "filterTab2", function() {
        return this._filterTab2;
      });
      //Custom property - Filter Tab 3
      defineSetter(this, "filterTab3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._filterTab3=val;
        }
      });
      defineGetter(this, "filterTab3", function() {
        return this._filterTab3;
      });
      //Custom property - Filter Tab 4
      defineSetter(this, "filterTab4", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._filterTab4=val;
        }
      });
      defineGetter(this, "filterTab4", function() {
        return this._filterTab4;
      });
      //Custom property - Filter Tab 5
      defineSetter(this, "filterTab5", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._filterTab5=val;
        }
      });
      defineGetter(this, "filterTab5", function() {
        return this._filterTab5;
      });
      //Custom property - Filter Tab 6
      defineSetter(this, "filterTab6", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._filterTab6=val;
        }
      });
      defineGetter(this, "filterTab6", function() {
        return this._filterTab6;
      });
	   //Custom property - Filter value Tab 1
      defineSetter(this, "filterValueTab1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._filterValueTab1=val;
        }
      });
      defineGetter(this, "filterValueTab1", function() {
        return this._filterValueTab1;
      });
      //Custom property - Filter value Tab 2
      defineSetter(this, "filterValueTab2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._filterValueTab2=val;
        }
      });
      defineGetter(this, "filterValueTab2", function() {
        return this._filterValueTab2;
      });
      //Custom property - Filter value Tab 3
      defineSetter(this, "filterValueTab3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._filterValueTab3=val;
        }
      });
      defineGetter(this, "filterValueTab3", function() {
        return this._filterValueTab3;
      });
      //Custom property - Filter value Tab 4
      defineSetter(this, "filterValueTab4", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._filterValueTab4=val;
        }
      });
      defineGetter(this, "filterValueTab4", function() {
        return this._filterValueTab4;
      });
      //Custom property - Filter value Tab 5
      defineSetter(this, "filterValueTab5", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._filterValueTab5=val;
        }
      });
      defineGetter(this, "filterValueTab5", function() {
        return this._filterValueTab5;
      });
      // Custom property - Data Grid (table) column 1
      defineSetter(this, "dataGridColumn1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dataGridColumn1=val;
        }
      });
      defineGetter(this, "dataGridColumn1", function() {
        return this._dataGridColumn1;
      });
      // Custom property - Data Grid (table) column 2
      defineSetter(this, "dataGridColumn2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dataGridColumn2=val;
        }
      });
      defineGetter(this, "dataGridColumn2", function() {
        return this._dataGridColumn2;
      });
      // Custom property - Data Grid (table) column 3
      defineSetter(this, "dataGridColumn3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dataGridColumn3=val;
        }
      });
      defineGetter(this, "dataGridColumn3", function() {
        return this._dataGridColumn3;
      });
      // Custom property - Data Grid (table) column 4
      defineSetter(this, "dataGridColumn4", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dataGridColumn4=val;
        }
      });
      defineGetter(this, "dataGridColumn4", function() {
        return this._dataGridColumn4;
      });
      // Custom property - Data Grid (table) column 5
      defineSetter(this, "dataGridColumn5", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dataGridColumn5=val;
        }
      });
      defineGetter(this, "dataGridColumn5", function() {
        return this._dataGridColumn5;
      });
      // Custom property - Data Grid (table) column 6
      defineSetter(this, "dataGridColumn6", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dataGridColumn6=val;
        }
      });
      defineGetter(this, "dataGridColumn6", function() {
        return this._dataGridColumn6;
      });
      // Custom property - Data Grid Mobile(table) Field 1
      defineSetter(this, "mobileDataGridField1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._mobileDataGridField1=val;
        }
      });
      defineGetter(this, "mobileDataGridField1", function() {
        return this._mobileDataGridField1;
      });
      // Custom property - Data Grid Mobile(table) Field 2
      defineSetter(this, "mobileDataGridField2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._mobileDataGridField2=val;
        }
      });
      defineGetter(this, "mobileDataGridField2", function() {
        return this._mobileDataGridField2;
      });
      // Custom property - Data Grid Mobile(table) Field 3
      defineSetter(this, "mobileDataGridField3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._mobileDataGridField3=val;
        }
      });
      defineGetter(this, "mobileDataGridField3", function() {
        return this._mobileDataGridField3;
      });
	   
      defineSetter(this, "GAserviceEnable", function(val) {
        if((typeof val==='boolean') && (val !== "")){
          this._GAserviceEnable=val;
        }
      });
      defineGetter(this, "GAserviceEnable", function() {
        return this._GAserviceEnable;
      });
      // get attachments service setters and getters
      defineSetter(this, "GAobjectServiceName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this.fetchAttachments=val;
        }
      });
      defineGetter(this, "GAobjectServiceName", function() {
        return this._GAobjectServiceName;
      });
      defineSetter(this, "GAobjectName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._GAobjectName=val;
        }
      });
      defineGetter(this, "GAobjectName", function() {
        return this._GAobjectName;
      });
      defineSetter(this, "GAoperationName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._GAoperationName=val;
        }
      });
      defineGetter(this, "GAoperationName", function() {
        return this._GAoperationName;
      });
      defineSetter(this, "GAcriteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._GAcriteria=val;
        }
      });
      defineGetter(this, "GAcriteria", function() {
        return this._GAcriteria;
      });
      //Transaction list service setters and getters
      defineSetter(this, "TLobjectServiceName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._TLobjectServiceName=val;
        }
      });
      defineGetter(this, "TLobjectServiceName", function() {
        return this._TLobjectServiceName;
      });
      defineSetter(this, "TLobjectName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._TLobjectName=val;
        }
      });
      defineGetter(this, "TLobjectName", function() {
        return this._TLobjectName;
      });
      defineSetter(this, "TLoperationName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._TLoperationName=val;
        }
      });
      defineGetter(this, "TLoperationName", function() {
        return this._TLoperationName;
      });
      defineSetter(this, "TLcriteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._TLcriteria=val;
        }
      });
      defineGetter(this, "TLcriteria", function() {
        return this._TLcriteria;
      });
      defineSetter(this, "TLserviceResponseIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._TLserviceResponseIdentifier=val;
        }
      });
      defineGetter(this, "TLserviceResponseIdentifier", function() {
        return this._TLserviceResponseIdentifier;
      });
      defineSetter(this, "dataAvailability", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dataAvailability=val;
        }
      });
      defineGetter(this, "dataAvailability", function() {
        return this._dataAvailability;
      });
      //Context setting
      defineSetter(this, "TLaccountType", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._TLaccountType=val;
        }
      });
      defineGetter(this, "TLaccountType", function() {
        return this._TLaccountType;
      });   
      defineSetter(this, "TLaccountId", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._TLaccountId=val;
        }
      });
      defineGetter(this, "TLaccountId", function() {
        return this._TLaccountId;
      });   
      //general properties
      defineSetter(this, "blockTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._blockTitle=val;
        }
      });
      defineGetter(this, "blockTitle", function() {
        return this._blockTitle;
      });   
      defineSetter(this, "transDetailsVisibility", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._transDetailsVisibility=val;
        }
      });
      defineGetter(this, "transDetailsVisibility", function() {
        return this._transDetailsVisibility;
      });  
      defineSetter(this, "TLenableForSearch", function(val) {
        if((typeof val==='boolean') && (val !== "")){
          this._TLenableForSearch=val;
        }
      });
      defineGetter(this, "TLenableForSearch", function() {
        return this._TLenableForSearch;
      });  
      //skins
      defineSetter(this, "sknFilterActiveTab", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknFilterActiveTab=val;
        }
      });
      defineGetter(this, "sknFilterActiveTab", function() {
        return this._sknFilterActiveTab;
      });
      defineSetter(this, "sknFilterActiveTabHover", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknFilterActiveTabHover=val;
        }
      });
      defineGetter(this, "sknFilterActiveTabHover", function() {
        return this._sknFilterActiveTabHover;
      });
      defineSetter(this, "sknFilterInactiveTab", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknFilterInactiveTab=val;
        }
      });
      defineGetter(this, "sknFilterInactiveTab", function() {
        return this._sknFilterInactiveTab;
      });
      defineSetter(this, "sknFilterInactiveTabHover", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknFilterInactiveTabHover=val;
        }
      });
      defineGetter(this, "sknFilterInactiveTabHover", function() {
        return this._sknFilterInactiveTabHover;
      });
      defineSetter(this, "sknTableHeader", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknTableHeader=val;
        }
      });
      defineGetter(this, "sknTableHeader", function() {
        return this._sknTableHeader;
      });
      defineSetter(this, "sknTableHeaderText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknTableHeaderText=val;
        }
      });
      defineGetter(this, "sknTableHeaderText", function() {
        return this._sknTableHeaderText;
      });
      defineSetter(this, "sknPendingLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPendingLabel=val;
        }
      });
      defineGetter(this, "sknPendingLabel", function() {
        return this._sknPendingLabel;
      });
      defineSetter(this, "sknPostedLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPostedLabel=val;
        }
      });
      defineGetter(this, "sknPostedLabel", function() {
        return this._sknPostedLabel;
      });
      defineSetter(this, "sknRowExpanded", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknRowExpanded=val;
        }
      });
      defineGetter(this, "sknRowExpanded", function() {
        return this._sknRowExpanded;
      });
      defineSetter(this, "sknRowHover", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknRowHover=val;
        }
      });
      defineGetter(this, "sknRowHover", function() {
        return this._sknRowHover;
      });
      defineSetter(this, "sknRowSeperator", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknRowSeperator=val;
        }
      });
      defineGetter(this, "sknRowSeperator", function() {
        return this._sknRowSeperator;
      });
      defineSetter(this, "sknValueField", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknValueField=val;
        }
      });
      defineGetter(this, "sknValueField", function() {
        return this._sknValueField;
      });
      defineSetter(this, "sknTransDetailsLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknTransDetailsLabel=val;
        }
      });
      defineGetter(this, "sknTransDetailsLabel", function() {
        return this._sknTransDetailsLabel;
      });
      defineSetter(this, "sknTransDetailsValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknTransDetailsValue=val;
        }
      });
      defineGetter(this, "sknTransDetailsValue", function() {
        return this._sknTransDetailsValue;
      });
      defineSetter(this, "sknActionButtons", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknActionButtons=val;
        }
      });
      defineGetter(this, "sknActionButtons", function() {
        return this._sknActionButtons;
      });
      defineSetter(this, "sknSearchLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchLabel=val;
        }
      });
      defineGetter(this, "sknSearchLabel", function() {
        return this._sknSearchLabel;
      });
      defineSetter(this, "sknSearchTextbox", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchTextbox=val;
        }
      });
      defineGetter(this, "sknSearchTextbox", function() {
        return this._sknSearchTextbox;
      });
      defineSetter(this, "sknSearchActiveTextbox", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchActiveTextbox=val;
        }
      });
      defineGetter(this, "sknSearchActiveTextbox", function() {
        return this._sknSearchActiveTextbox;
      });
      defineSetter(this, "sknSearchDropdown", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchDropdown=val;
        }
      });
      defineGetter(this, "sknSearchDropdown", function() {
        return this._sknSearchDropdown;
      });
      defineSetter(this, "sknSearchActiveDropdown", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchActiveDropdown=val;
        }
      });
      defineGetter(this, "sknSearchActiveDropdown", function() {
        return this._sknSearchActiveDropdown;
      });
      defineSetter(this, "sknSearchCalendar", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchCalendar=val;
        }
      });
      defineGetter(this, "sknSearchCalendar", function() {
        return this._sknSearchCalendar;
      });
      defineSetter(this, "sknSearchActiveCalendar", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchActiveCalendar=val;
        }
      });
      defineGetter(this, "sknSearchActiveCalendar", function() {
        return this._sknSearchActiveCalendar;
      });
      defineSetter(this, "sknSearchButton", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchButton=val;
        }
      });
      defineGetter(this, "sknSearchButton", function() {
        return this._sknSearchButton;
      });
      defineSetter(this, "sknSearchButtonHover", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchButtonHover=val;
        }
      });
      defineGetter(this, "sknSearchButtonHover", function() {
        return this._sknSearchButtonHover;
      });
      defineSetter(this, "sknSearchCancelButton", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchCancelButton=val;
        }
      });
      defineGetter(this, "sknSearchCancelButton", function() {
        return this._sknSearchCancelButton;
      });
      defineSetter(this, "sknSearchCancelButtonHover", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchCancelButtonHover=val;
        }
      });
      defineGetter(this, "sknSearchCancelButtonHover", function() {
        return this._sknSearchCancelButtonHover;
      });
      defineGetter(this, "sknPositiveAmount", function() {
        return this._sknPositiveAmount;
      });
      defineSetter(this, "sknPositiveAmount", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPositiveAmount=val;
        }
      });
      defineGetter(this, "sknNegativeAmoount", function() {
        return this._sknNegativeAmoount;
      });
      defineGetter(this, "sknNegativeAmoount", function() {
        return this._sknNegativeAmoount;
      });
      defineSetter(this, "sknDate", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknDate=val;
        }
      });
      defineGetter(this, "sknDate", function() {
        return this._sknDate;
      });
      defineSetter(this, "sknPercentage", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPercentage=val;
        }
      });
      defineGetter(this, "sknPercentage", function() {
        return this._sknPercentage;
      });
      //mobile specific
      defineSetter(this, "sknMBFieldValueBig", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknMBFieldValueBig=val;
        }
      });
      defineGetter(this, "sknMBFieldValueBig", function() {
        return this._sknMBFieldValueBig;
      });
      defineSetter(this, "sknMBFieldValueSmall", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknMBFieldValueSmall=val;
        }
      });
      defineGetter(this, "sknMBFieldValueSmall", function() {
        return this._sknMBFieldValueSmall;
      });
      defineSetter(this, "sknMBTransactionDetailsLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknMBTransactionDetailsLabel=val;
        }
      });
      defineGetter(this, "sknMBTransactionDetailsLabel", function() {
        return this._sknMBTransactionDetailsLabel;
      });
      defineSetter(this, "sknMBTransactionDetailsValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknMBTransactionDetailsValue=val;
        }
      });
      defineGetter(this, "sknMBTransactionDetailsValue", function() {
        return this._sknMBTransactionDetailsValue;
      });
      defineSetter(this, "MBcolumn1Visibility", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._MBcolumn1Visibility=val;
        }
      });
      defineGetter(this, "MBcolumn1Visibility", function() {
        return this._MBcolumn1Visibility;
      });
      defineSetter(this, "MBcolumn2Visibility", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._MBcolumn2Visibility=val;
        }
      });
      defineGetter(this, "MBcolumn2Visibility", function() {
        return this._MBcolumn2Visibility;
      });
      defineSetter(this, "MBcolumn3Visibility", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._MBcolumn3Visibility=val;
        }
      });
      defineGetter(this, "MBcolumn3Visibility", function() {
        return this._MBcolumn3Visibility;
      });
      defineSetter(this, "MBcolumn4Visibility", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._MBcolumn4Visibility=val;
        }
      });
      defineGetter(this, "MBcolumn4Visibility", function() {
        return this._MBcolumn4Visibility;
      });
      defineSetter(this, "MBcolumn5Visibility", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._MBcolumn5Visibility=val;
        }
      });
      defineGetter(this, "MBcolumn5Visibility", function() {
        return this._MBcolumn5Visibility;
      });
      defineSetter(this, "MBcolumn6Visibility", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._MBcolumn6Visibility=val;
        }
      });
      defineGetter(this, "MBcolumn6Visibility", function() {
        return this._MBcolumn6Visibility;
      });
      //icons
      defineSetter(this, "iconSearch", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconSearch=val;
        }
      });
      defineGetter(this, "iconSearch", function() {
        return this._iconSearch;
      });
      defineSetter(this, "iconDownload", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconDownload=val;
        }
      });
      defineGetter(this, "iconDownload", function() {
        return this._iconDownload;
      });
      defineSetter(this, "iconPrint", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconPrint=val;
        }
      });
      defineGetter(this, "iconPrint", function() {
        return this._iconPrint;
      });
      defineSetter(this, "iconRowExpand", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconRowExpand=val;
        }
      });
      defineGetter(this, "iconRowExpand", function() {
        return this._iconRowExpand;
      });
      defineSetter(this, "iconRowCollapse", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconRowCollapse=val;
        }
      });
      defineGetter(this, "iconRowCollapse", function() {
        return this._iconRowCollapse;
      });
      defineSetter(this, "iconColumnSort", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconColumnSort=val;
        }
      });
      defineGetter(this, "iconColumnSort", function() {
        return this._iconColumnSort;
      });
      defineSetter(this, "iconColumnSortAsc", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconColumnSortAsc=val;
        }
      });
      defineGetter(this, "iconColumnSortAsc", function() {
        return this._iconColumnSortAsc;
      });
      defineSetter(this, "iconColumnSortDesc", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconColumnSortDesc=val;
        }
      });
      defineGetter(this, "iconColumnSortDesc", function() {
        return this._iconColumnSortDesc;
      });
      //data formats
      defineSetter(this, "amountFormat", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._amountFormat=val;
        }
      });
      defineGetter(this, "amountFormat", function() {
        return this._amountFormat;
      });
      defineSetter(this, "dateFormat", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dateFormat=val;
        }
      });
      defineGetter(this, "dateFormat", function() {
        return this._dateFormat;
      });
      defineSetter(this, "backendDateFormat", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._backendDateFormat=val;
        }
      });
      defineGetter(this, "backendDateFormat", function() {
        return this._backendDateFormat;
      });
      defineSetter(this, "percentageFormat", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._percentageFormat=val;
        }
      });
      defineGetter(this, "percentageFormat", function() {
        return this._percentageFormat;
      });
      //Data grid
      defineSetter(this, "transactionListArray", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._transactionListArray=val;
        }
      });
      defineGetter(this, "transactionListArray", function() {
        return this._transactionListArray;
      });
      defineSetter(this, "transactionListIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._transactionListIdentifier=val;
        }
      });
      defineGetter(this, "transactionListIdentifier", function() {
        return this._transactionListIdentifier;
      });
      defineSetter(this, "segregationDecider", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._segregationDecider=val;
        }
      });
      defineGetter(this, "segregationDecider", function() {
        return this._segregationDecider;
      });
      defineSetter(this, "segregationTypes", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._segregationTypes=val;
        }
      });
      defineGetter(this, "segregationTypes", function() {
        return this._segregationTypes;
      });
      defineSetter(this, "currencyCode", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._currencyCode=val;
        }
      });
      defineGetter(this, "currencyCode", function() {
        return this._currencyCode;
      });
      // Custom property - transaction details field 1
      defineSetter(this, "field1Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field1Label=val;
        }
      });
      defineGetter(this, "field1Label", function() {
        return this._field1Label;
      });
      defineSetter(this, "field1Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field1Value=val;
        }
      });
      defineGetter(this, "field1Value", function() {
        return this._field1Value;
      });
      defineSetter(this, "field1Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field1Type=val;
        }
      });
      defineGetter(this, "field1Type", function() {
        return this._field1Type;
      });
      // Custom property - transaction details field 2
      defineSetter(this, "field2Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field2Label=val;
        }
      });
      defineGetter(this, "field2Label", function() {
        return this._field2Label;
      });
      defineSetter(this, "field2Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field2Value=val;
        }
      });
      defineGetter(this, "field2Value", function() {
        return this._field2Value;
      });
      defineSetter(this, "field2Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field2Type=val;
        }
      });
      defineGetter(this, "field2Type", function() {
        return this._field2Type;
      });
      // Custom property - transaction details field 3
      defineSetter(this, "field3Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field3Label=val;
        }
      });
      defineGetter(this, "field3Label", function() {
        return this._field3Label;
      });
      defineSetter(this, "field3Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field3Value=val;
        }
      });
      defineGetter(this, "field3Value", function() {
        return this._field3Value;
      });
      defineSetter(this, "field3Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field3Type=val;
        }
      });
      defineGetter(this, "field3Type", function() {
        return this._field3Type;
      });
      // Custom property - transaction details field 4
      defineSetter(this, "field4Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field4Label=val;
        }
      });
      defineGetter(this, "field4Label", function() {
        return this._field4Label;
      });
      defineSetter(this, "field4Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field4Value=val;
        }
      });
      defineGetter(this, "field4Value", function() {
        return this._field4Value;
      });
      defineSetter(this, "field4Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field4Type=val;
        }
      });
      defineGetter(this, "field4Type", function() {
        return this._field4Type;
      });
      // Custom property - transaction details field 5
      defineSetter(this, "field5Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field5Label=val;
        }
      });
      defineGetter(this, "field5Label", function() {
        return this._field5Label;
      });
      defineSetter(this, "field5Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field5Value=val;
        }
      });
      defineGetter(this, "field5Value", function() {
        return this._field5Value;
      });
      defineSetter(this, "field5Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field5Type=val;
        }
      });
      defineGetter(this, "field5Type", function() {
        return this._field5Type;
      });
      // Custom property - transaction details field 6
      defineSetter(this, "field6Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field6Label=val;
        }
      });
      defineGetter(this, "field6Label", function() {
        return this._field6Label;
      });
      defineSetter(this, "field6Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field6Value=val;
        }
      });
      defineGetter(this, "field6Value", function() {
        return this._field6Value;
      });
      defineSetter(this, "field6Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field6Type=val;
        }
      });
      defineGetter(this, "field6Type", function() {
        return this._field6Type;
      });
      // Custom property - transaction details field 7
      defineSetter(this, "field7Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field7Label=val;
        }
      });
      defineGetter(this, "field7Label", function() {
        return this._field7Label;
      });
      defineSetter(this, "field7Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field7Value=val;
        }
      });
      defineGetter(this, "field7Value", function() {
        return this._field7Value;
      });
      defineSetter(this, "field7Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field7Type=val;
        }
      });
      defineGetter(this, "field7Type", function() {
        return this._field7Type;
      });
      // Custom property - transaction details field 8
      defineSetter(this, "field8Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field8Label=val;
        }
      });
      defineGetter(this, "field8Label", function() {
        return this._field8Label;
      });
      defineSetter(this, "field8Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field8Value=val;
        }
      });
      defineGetter(this, "field8Value", function() {
        return this._field8Value;
      });
      defineSetter(this, "field8Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field8Type=val;
        }
      });
      defineGetter(this, "field8Type", function() {
        return this._field8Type;
      });
      // Custom property - transaction details field 9
      defineSetter(this, "field9Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field9Label=val;
        }
      });
      defineGetter(this, "field9Label", function() {
        return this._field9Label;
      });
      defineSetter(this, "field9Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field9Value=val;
        }
      });
      defineGetter(this, "field9Value", function() {
        return this._field9Value;
      });
      defineSetter(this, "field9Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field9Type=val;
        }
      });
      defineGetter(this, "field9Type", function() {
        return this._field9Type;
      });
      // Custom property - transaction details field 10
      defineSetter(this, "field10Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field10Label=val;
        }
      });
      defineGetter(this, "field10Label", function() {
        return this._field10Label;
      });
      defineSetter(this, "field10Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field10Value=val;
        }
      });
      defineGetter(this, "field10Value", function() {
        return this._field10Value;
      });
      defineSetter(this, "field10Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field10Type=val;
        }
      });
      defineGetter(this, "field10Type", function() {
        return this._field10Type;
      });
      defineSetter(this, "btnContextualAction1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._btnContextualAction1=val;
        }
      });
      defineGetter(this, "btnContextualAction1", function() {
        return this._btnContextualAction1;
      });
      defineSetter(this, "btnContextualAction2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._btnContextualAction2=val;
        }
      });
      defineGetter(this, "btnContextualAction2", function() {
        return this._btnContextualAction2;
      });
      defineSetter(this, "btnContextualAction3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._btnContextualAction3=val;
        }
      });
      defineGetter(this, "btnContextualAction3", function() {
        return this._btnContextualAction3;
      });
       defineSetter(this, "btnContextualAction4", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._btnContextualAction4=val;
        }
      });
      defineGetter(this, "btnContextualAction4", function() {
        return this._btnContextualAction4;
      });
      //Search fields
      defineSetter(this, "searchLabel1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._searchLabel1=val;
        }
      });
      defineGetter(this, "searchLabel1", function() {
        return this._searchLabel1;
      });
      defineSetter(this, "searchLabel2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._searchLabel2=val;
        }
      });
      defineGetter(this, "searchLabel2", function() {
        return this._searchLabel2;
      });
      defineSetter(this, "searchLabel3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._searchLabel3=val;
        }
      });
      defineGetter(this, "searchLabel3", function() {
        return this._searchLabel3;
      });
      defineSetter(this, "searchLabel4", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._searchLabel4=val;
        }
      });
      defineGetter(this, "searchLabel4", function() {
        return this._searchLabel4;
      });
      defineSetter(this, "searchLabel5", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._searchLabel5=val;
        }
      });
      defineGetter(this, "searchLabel5", function() {
        return this._searchLabel5;
      });
      defineSetter(this, "searchLabel6", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._searchLabel6=val;
        }
      });
      defineGetter(this, "searchLabel6", function() {
        return this._searchLabel6;
      });
      defineSetter(this, "val1PlaceHolder", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._val1PlaceHolder=val;
        }
      });
      defineGetter(this, "val1PlaceHolder", function() {
        return this._val1PlaceHolder;
      });
      defineSetter(this, "val4FromPlaceHolder", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._val4FromPlaceHolder=val;
        }
      });
      defineGetter(this, "val4FromPlaceHolder", function() {
        return this._val4FromPlaceHolder;
      });
      defineSetter(this, "val4ToPlaceHolder", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._val4ToPlaceHolder=val;
        }
      });
      defineGetter(this, "val4ToPlaceHolder", function() {
        return this._val4ToPlaceHolder;
      });
      // Custom property - Tab 6 (table) column 1
      defineSetter(this, "tab6DataGridColumn1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6DataGridColumn1=val;
        }
      });
      defineGetter(this, "tab6DataGridColumn1", function() {
        return this._tab6DataGridColumn1;
      });
      // Custom property - Tab 6 (table) column 2
      defineSetter(this, "tab6DataGridColumn2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6DataGridColumn2=val;
        }
      });
      defineGetter(this, "tab6DataGridColumn2", function() {
        return this._tab6DataGridColumn2;
      });
      // Custom property - Tab 6 (table) column 3
      defineSetter(this, "tab6DataGridColumn3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6DataGridColumn3=val;
        }
      });
      defineGetter(this, "tab6DataGridColumn3", function() {
        return this._tab6DataGridColumn3;
      });
      // Custom property - Tab 6 (table) column 4
      defineSetter(this, "tab6DataGridColumn4", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6DataGridColumn4=val;
        }
      });
      defineGetter(this, "tab6DataGridColumn4", function() {
        return this._tab6DataGridColumn4;
      });
      // Custom property - Tab 6 (table) column 5
      defineSetter(this, "tab6DataGridColumn5", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6DataGridColumn5=val;
        }
      });
      defineGetter(this, "tab6DataGridColumn5", function() {
        return this._tab6DataGridColumn5;
      });
      // Custom property - Tab 6 (table) column 6
      defineSetter(this, "tab6DataGridColumn6", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6DataGridColumn6=val;
        }
      });
      defineGetter(this, "tab6DataGridColumn6", function() {
        return this._tab6DataGridColumn6;
      });
      // Custom property - Tab 6 (table) Field 1
      defineSetter(this, "tab6MobileDataGridField1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6MobileDataGridField1=val;
        }
      });
      defineGetter(this, "tab6MobileDataGridField1", function() {
        return this._tab6MobileDataGridField1;
      });
      // Custom property - Tab 6 (table) Field 2
      defineSetter(this, "tab6MobileDataGridField2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6MobileDataGridField2=val;
        }
      });
      defineGetter(this, "tab6MobileDataGridField2", function() {
        return this._tab6MobileDataGridField2;
      });
      // Custom property - Tab 6 (table) Field 3
      defineSetter(this, "tab6MobileDataGridField3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6MobileDataGridField3=val;
        }
      });
      defineGetter(this, "tab6MobileDataGridField3", function() {
        return this._tab6MobileDataGridField3;
      });
      //Tab 6 service setters and getters
      defineSetter(this, "tab6ObjectServiceName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6ObjectServiceName=val;
        }
      });
      defineGetter(this, "tab6ObjectServiceName", function() {
        return this._tab6ObjectServiceName;
      });
      defineSetter(this, "tab6ObjectName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6ObjectName=val;
        }
      });
      defineGetter(this, "tab6ObjectName", function() {
        return this._tab6ObjectName;
      });
      defineSetter(this, "tab6OperationName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6OperationName=val;
        }
      });
      defineGetter(this, "tab6OperationName", function() {
        return this._tab6OperationName;
      });
      defineSetter(this, "tab6Criteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Criteria=val;
        }
      });
      defineGetter(this, "tab6Criteria", function() {
        return this._tab6Criteria;
      });
      defineSetter(this, "tab6ServiceResponseIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6ServiceResponseIdentifier=val;
        }
      });
      defineGetter(this, "tab6ServiceResponseIdentifier", function() {
        return this._tab6ServiceResponseIdentifier;
      });
      //Tab 6 Title setter and getter
      defineSetter(this, "tab6Title", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Title=val;
        }
      });
      defineGetter(this, "tab6Title", function() {
        return this._tab6Title;
      });
      //Tab 6 transaction list array
      defineSetter(this, "tab6TransactionListArray", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6TransactionListArray=val;
        }
      });
      defineGetter(this, "tab6TransactionListArray", function() {
        return this._tab6TransactionListArray;
      });
      // Custom property - Tab 6 field 1
      defineSetter(this, "tab6Field1Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field1Label=val;
        }
      });
      defineGetter(this, "tab6Field1Label", function() {
        return this._tab6Field1Label;
      });
      defineSetter(this, "tab6Field1Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field1Value=val;
        }
      });
      defineGetter(this, "tab6Field1Value", function() {
        return this._tab6Field1Value;
      });
      defineSetter(this, "tab6field1Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field1Type=val;
        }
      });
      defineGetter(this, "tab6field1Type", function() {
        return this._tab6Field1Type;
      });
      // Custom property - Tab 6 field 2
      defineSetter(this, "tab6Field2Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field2Label=val;
        }
      });
      defineGetter(this, "tab6Field2Label", function() {
        return this._tab6Field2Label;
      });
      defineSetter(this, "tab6Field2Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field2Value=val;
        }
      });
      defineGetter(this, "tab6Field2Value", function() {
        return this._tab6Field2Value;
      });
      defineSetter(this, "tab6Field2Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field2Type=val;
        }
      });
      defineGetter(this, "tab6Field2Type", function() {
        return this._tab6Field2Type;
      });
      // Custom property - Tab 6 field 3
      defineSetter(this, "tab6Field3Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field3Label=val;
        }
      });
      defineGetter(this, "tab6Field3Label", function() {
        return this._tab6Field3Label;
      });
      defineSetter(this, "tab6Field3Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field3Value=val;
        }
      });
      defineGetter(this, "tab6Field3Value", function() {
        return this._tab6Field3Value;
      });
      defineSetter(this, "tab6Field3Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field3Type=val;
        }
      });
      defineGetter(this, "tab6Field3Type", function() {
        return this._tab6Field3Type;
      });
      // Custom property - Tab 6 field 4
      defineSetter(this, "tab6Field4Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field4Label=val;
        }
      });
      defineGetter(this, "tab6Field4Label", function() {
        return this._tab6Field4Label;
      });
      defineSetter(this, "tab6Field4Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field4Value=val;
        }
      });
      defineGetter(this, "tab6Field4Value", function() {
        return this._tab6Field4Value;
      });
      defineSetter(this, "tab6Field4Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field4Type=val;
        }
      });
      defineGetter(this, "tab6Field4Type", function() {
        return this._tab6Field4Type;
      });
      // Custom property - Tab 6 field 5
      defineSetter(this, "tab6Field5Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field5Label=val;
        }
      });
      defineGetter(this, "tab6Field5Label", function() {
        return this._tab6Field5Label;
      });
      defineSetter(this, "tab6Field5Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field5Value=val;
        }
      });
      defineGetter(this, "tab6Field5Value", function() {
        return this._tab6Field5Value;
      });
      defineSetter(this, "tab6Field5Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field5Type=val;
        }
      });
      defineGetter(this, "tab6Field5Type", function() {
        return this._tab6Field5Type;
      });
      // Custom property - Tab 6 field 6
      defineSetter(this, "tab6Field6Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field6Label=val;
        }
      });
      defineGetter(this, "tab6Field6Label", function() {
        return this._tab6Field6Label;
      });
      defineSetter(this, "tab6Field6Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field6Value=val;
        }
      });
      defineGetter(this, "tab6Field6Value", function() {
        return this._tab6Field6Value;
      });
      defineSetter(this, "tab6Field6Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field6Type=val;
        }
      });
      defineGetter(this, "tab6Field6Type", function() {
        return this._tab6Field6Type;
      });
      // Custom property - Tab 6 field 7
      defineSetter(this, "tab6Field7Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field7Label=val;
        }
      });
      defineGetter(this, "tab6Field7Label", function() {
        return this._tab6Field7Label;
      });
      defineSetter(this, "tab6Field7Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field7Value=val;
        }
      });
      defineGetter(this, "tab6Field7Value", function() {
        return this._tab6Field7Value;
      });
      defineSetter(this, "tab6Field7Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field7Type=val;
        }
      });
      defineGetter(this, "tab6Field7Type", function() {
        return this._tab6Field7Type;
      });
      // Custom property - Tab 6 field 8
      defineSetter(this, "tab6Field8Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field8Label=val;
        }
      });
      defineGetter(this, "tab6Field8Label", function() {
        return this._tab6Field8Label;
      });
      defineSetter(this, "tab6Field8Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field8Value=val;
        }
      });
      defineGetter(this, "tab6Field8Value", function() {
        return this._tab6Field8Value;
      });
      defineSetter(this, "tab6Field8Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field8Type=val;
        }
      });
      defineGetter(this, "tab6Field8Type", function() {
        return this._tab6Field8Type;
      });
      // Custom property - Tab 6 field 9
      defineSetter(this, "tab6Field9Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field9Label=val;
        }
      });
      defineGetter(this, "tab6Field9Label", function() {
        return this._tab6Field9Label;
      });
      defineSetter(this, "tab6Field9Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field9Value=val;
        }
      });
      defineGetter(this, "tab6Field9Value", function() {
        return this._tab6Field9Value;
      });
      defineSetter(this, "tab6Field9Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field9Type=val;
        }
      });
      defineGetter(this, "tab6Field9Type", function() {
        return this._tab6Field9Type;
      });
      // Custom property - Tab 6 field 10
      defineSetter(this, "tab6Field10Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field10Label=val;
        }
      });
      defineGetter(this, "tab6Field10Label", function() {
        return this._tab6Field10Label;
      });
      defineSetter(this, "tab6Field10Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field10Value=val;
        }
      });
      defineGetter(this, "tab6Field10Value", function() {
        return this._tab6Field10Value;
      });
      defineSetter(this, "tab6Field10Type", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6Field10Type=val;
        }
      });
      defineGetter(this, "tab6Field10Type", function() {
        return this._tab6Field10Type;
      });
      defineSetter(this, "tab6BtnContextualAction1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6BtnContextualAction1=val;
        }
      });
      defineGetter(this, "tab6BtnContextualAction1", function() {
        return this._tab6BtnContextualAction1;
      });
      defineSetter(this, "tab6BtnContextualAction2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6BtnContextualAction2=val;
        }
      });
      defineGetter(this, "tab6BtnContextualAction2", function() {
        return this._tab6BtnContextualAction2;
      });
      defineSetter(this, "tab6BtnContextualAction3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6BtnContextualAction3=val;
        }
      });
      defineGetter(this, "tab6BtnContextualAction3", function() {
        return this._tab6BtnContextualAction3;
      });
       defineSetter(this, "tab6BtnContextualAction4", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tab6BtnContextualAction4=val;
        }
      });
      defineGetter(this, "tab6BtnContextualAction4", function() {
        return this._tab6BtnContextualAction4;
      });
      //View Checks and swift transactions 
      defineSetter(this, "checkNumberField", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._checkNumberField=val;
        }
      });
      defineGetter(this, "checkNumberField", function() {
        return this._checkNumberField;
      });
      defineSetter(this, "swiftTransactionField", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._swiftTransactionField=val;
        }
      });
      defineGetter(this, "swiftTransactionField", function() {
        return this._swiftTransactionField;
      });
      defineSetter(this, "sknHyperlink", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknHyperlink=val;
        }
      });
      defineGetter(this, "sknHyperlink", function() {
        return this._sknHyperlink;
      });
      defineSetter(this, "cacheTotalRecords", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._cacheTotalRecords=val;
        }
      });
      defineGetter(this, "cacheTotalRecords", function() {
        return this._cacheTotalRecords;
            });
            defineGetter(this, 'isBackendPropEnabled', () => {
                return this._isBackendPropEnabled;
            });
            defineSetter(this, 'isBackendPropEnabled', value => {
                this._isBackendPropEnabled = value;
      });
    },
    /**
     * Component setContext
     * To collect the context object required for the component 
     * context{JSONobject} - account object 
     */
    setContext:function(context){
      var self = this;
      try
      {
        this.context=context;
        this.parserUtilsManager.setContext(this.context);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the preshow of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setFormContext
     * To collect the form object 
     * formObject{JSONobject} - form object 
     */
    setFormContext: function(formObject) {
      this.formObject = formObject;
    },
    /**
     * Component preShow
     * Reponsible to retain the data for custom properties for multiple entries into the component
                      Invoke the DAO layer to collect information from the service
     */
    preShow:function(){  
      var scopeObj = this;
      try
      {
        var currentBreakPoint=kony.application.getCurrentBreakpoint();
        this.formattingJSON = {
          "amountFormat" : JSON.parse(this._amountFormat),
          "dateFormat" : this._dateFormat,
          "backenddateformat" : this._backendDateFormat,
        }
        this.skins = {
          FILTER_SELECTED: scopeObj._sknFilterActiveTab,
          FILTER_SELECTED_HOVER: scopeObj._sknFilterActiveTabHover,
          FILTER_UNSELECTED_HOVER: scopeObj._sknFilterInactiveTabHover,
          FILTER_INACTIVE: scopeObj._sknFilterInactiveTab,
        };
        this.formatSkins = {
          TEXT_SKIN : (currentBreakPoint == "640")?scopeObj._sknMBFieldValueSmall:scopeObj._sknTransDetailsValue,
          POSITIVE_AMOUNT_SKIN : scopeObj._sknPositiveAmount,
          NEGATIVE_AMOUNT_SKIN : scopeObj._sknNegativeAmoount,
          DATE_SKIN : scopeObj._sknDate,
          PERCENTAGE_SKIN : scopeObj._sknPercentage
        }
        if(currentBreakPoint == "640"){
          this.rowTemplate = "ICFlxSegTransactionsRowSavingsMobile";
          this.expandedTemplate = "ICFlxSegTransactionRowSelectedMobile";
        }
        else{
          this.rowTemplate = "ICFlxSegTransactionRowSavings";
          this.expandedTemplate = "ICFlxSegTransactionRowSelected";
        }
		this.EntitlementUtils.setEntitlements(this.context);
        if(kony.application.getCurrentBreakpoint() !== 640){
           this.view.paginationFooter.setVisibility(true);
          this.view.paginationHeader.setVisibility(true);   
        }
        this.transactionListTypes = JSON.parse(this._segregationTypes);
        this.criteria = {};
        this.tabNavigation = true;
        this.setAccountTypeFromContext();
        this.setFilterData();
        this.selectedTab = 1;
        this.setSelectedTabUI();
        this.setSelectedTabUIMobile();
		var offsetLimit = this.view.paginationFooter.getDefaultOffsetAndLimit();
        this.offset = offsetLimit.offset;
        this.noOfRecords = offsetLimit.limit;   
        this.setCriteria(this._TLcriteria);
		this.criteria.offset = this.offset;
        this.criteria.limit = this.noOfRecords;
        var defaultParams = {
          "sortBy" : this.criteria["sortBy"],
          "pageSize" : this.noOfRecords,
          "onUpdate" : this.cacheCallBack,
          "filterParam" : "transactionType",
          "filterValue" : "All",
          "sortOrder" : "desc",
          "segregationTypes" : this.transactionListTypes,
          "segregationField" : this._segregationDecider
        };
        this.cacheUtils = new CacheUtils(defaultParams);
        cacheUtils = new cacheUtilities({});
        var tab6DefaultParams = {
        "sortBy" : this.criteria["sortBy"],
        "pageSize" : this.noOfRecords,
        "onUpdate" : this.tab6CacheCallBack,
        "filterParam" : "transactionType",
        "filterValue" : "All",
        "sortOrder" : "desc",
        "segregationTypes" : this.transactionListTypes,
        "segregationField" : "installmentType"
        };
        this.tab6CacheUtils = new CacheUtils(tab6DefaultParams);
        this.getTransactionList();
        this.view.lblTransactions.text = kony.i18n.getLocalizedString("i18n.common.transactions");
        this.resetSortingImages();
        this.searchViewModel.visible = false;
        this.renderSearchForm(this.searchViewModel);
        this.setIcons();
        this.clearSearch();
        this.updateSearchTransactionView();
        this.view.paginationHeader.fetchPaginatedRecords = scopeObj.fetchPaginationHeader;
        this.view.paginationFooter.fetchPaginatedRecords = scopeObj.fetchPaginationFooter;

        this.view.imgRadioBtnAccountType1.text = "M";
        this.view.imgRadioBtnAccountType2.text = "L";
        this.view.imgRadioBtnAccountType1.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
        this.view.imgRadioBtnAccountType2.skin = "ICSknC2";
        this.view.lblAccountTypeRadio1.skin = "ICSknLblSSP42424215px";
        this.view.lblAccountTypeRadio2.skin = "ICSknLblSSP72727215px";
        this.initActions();
        this.setAccessibilityData();
        this.setAriaSelectedAccessibility();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the preshow of the component.",
              "errorLevel" : "Business",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },
    /**
     * Component initActions
     * Reponsible to initialize actions
     */
    initActions: function(){
      var self = this;
      try
      {
        this.view.flxColumn1.onClick = this.flxColumn1onClick.bind(this);
        this.view.imgColumn2Right.onTouchEnd = this.flxColumn2onClick;
        this.view.imgColumn2Left.onTouchEnd = this.flxColumn2onClick;
        this.view.flxColumn3.onClick = this.flxColumn3onClick;
        this.view.flxColumn4.onClick = this.flxColumn4onClick.bind(this);
        this.view.flxColumn5.onClick = this.flxColumn5onClick;  
        this.view.imgColumn6Right.onTouchEnd = this.flxColumn6onClick;
        this.view.imgColumn6Left.onTouchEnd = this.flxColumn6onClick;
        this.view.btnDummyLeftScroll.onClick = this.scrollFiltersLeft;
        this.view.btnDummyRightScroll.onClick = this.scrollFiltersRight;
        this.view.flxFiltersScroll.enableScrolling = false;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the actions to columns.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component cacheCallBack
     * Reponsible to get cache data.
     * @param: data{JSON} - data from cache
     * @param: params{JSON} - params related to pagination
     */
    cacheCallBack: function(data,params){
      var self = this;
      try
      {
        this.totalRecords = params.pagination.totalSize;
        this.processResponse(data,this._TLserviceResponseIdentifier);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the cache call back.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onResetPagination:function(){
      this.view.paginationFooter.resetStartIndex();
    },
    /**
     * Component getCacheData
     * Reponsible to get cache data.
     */
    getCacheData: function()
    {
      var self = this;
      try
      {
        var filterValues = this.getFilterValue();
        if(this.state === "pagination")
        {
          this.cacheUtils.applyPagination(this.criteria["offset"],this.noOfRecords);
          this.tab6CacheUtils.pageSize = this.noOfRecords;
        }
        else if(this.state === "filterData")
        {
          this.onResetPagination();
          this.cacheUtils.applyFilter("transactionType",filterValues);
        }
        else if(this.state === "sortedData")
        {
          this.onResetPagination();
          this.cacheUtils.applySorting(this.criteria["sortBy"],this.criteria["order"]);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the get cache data method.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setCacheData
     * Reponsible to set cache data.
     * @param: response{JSON} - data from service
     */
    setCacheData: function(response)
    {
      var self = this;
      try
      {
        this.cacheUtils.setData(response.Transactions);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the set cache data method.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /** 
    * Component getFilterValue
    * Responsible to get Filter values
    */
    getFilterValue: function()
    {
      var self = this;
      try
      {
        var selectedTab = this.selectedTab;
        var filtervalues= this.getFieldValue(eval("this._filterValueTab"+selectedTab), "transactionsTypes");
        return filtervalues;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the set geting filter value.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    setAriaSelectedAccessibility : function(){
      if(this.view.btnAllMobile.skin === this.skins.FILTER_SELECTED || this.view.btnAll.skin === this.skins.FILTER_SELECTED) {
        this.view.btnAllMobile.accessibilityConfig = {
          "a11yARIA": {
            "aria-selected": true,
            "role" : "tab"
          }
        }
        this.view.btnAll.accessibilityConfig = {
          "a11yARIA": {
            "aria-selected": true,
            "role" : "tab"
          }
        }
      }
      else if(this.view.btnAllMobile.skin === this.skins.FILTER_INACTIVE || this.view.btnAll.skin === this.skins.FILTER_INACTIVE){
        this.view.btnAllMobile.accessibilityConfig = {
          "a11yARIA": {
            "aria-selected": false,
            "role" : "tab"
          }
        }
        this.view.btnAll.accessibilityConfig = {
          "a11yARIA": {
            "aria-selected": false,
            "role" : "tab"
          }
        }
      }
      for (var i = 2; i <= 6; i++) {
        if (this.view["btnFilter" + i].skin === this.skins.FILTER_SELECTED || this.view["btnFilter" + i + "Mobile"].skin === this.skins.FILTER_SELECTED) {
          this.view["btnFilter" + i].accessibilityConfig = {
            "a11yARIA": {
              "aria-selected": true,
              "role" : "tab"
            }
          }
          this.view["btnFilter" + i + "Mobile"].accessibilityConfig = {
            "a11yARIA": {
              "aria-selected": true,
              "role" : "tab"
            }
          }
        }
        else if (this.view["btnFilter" + i].skin === this.skins.FILTER_INACTIVE || this.view["btnFilter" + i + "Mobile"].skin === this.skins.FILTER_INACTIVE) {
          this.view["btnFilter" + i].accessibilityConfig = {
            "a11yARIA": {
              "aria-selected": false,
              "role" : "tab"
            }
          }
          this.view["btnFilter" + i + "Mobile"].accessibilityConfig = {
            "a11yARIA": {
              "aria-selected": true,
              "role" : "tab"
            }
          }
        }
      }
    },

    accFunction: function(path) {
      path.accessibilityConfig = {
          "a11yARIA": {
              tabindex: -1
          }
      };
    },

    setAccessibilityData: function(){
      this.view.lblTransactions.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.imgDownload.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.imgDownloadIcon.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.imgSearch.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.imgSearchIcon.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.imgPrint.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.imgPrintIcon.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblAccountType.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblAccountTypeRadio1.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblAccountTypeRadio2.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.imgRadioBtnAccountType1.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.imgRadioBtnAccountType2.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblByKeyword.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblByTransactionType.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblByTimePeriod.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblByAmountRange.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblToByAmountRange.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.flxAmountTo.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblCurrencySymbolFrom.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblCurrencySymbolTo.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.imgInfo.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblByCheckNumber.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.flxCheckTo.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblToByCheckNumber.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.flxAmountRangeFrom.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.flxAmountRangeTo.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblBFByKeyword.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblBFReferenceNumber.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblBFByDate.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblBFToByDate.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.flxAccountTypeRadioBtns.accessibilityConfig = {
        "a11yARIA": {
          "aria-labelledby": "lblAccountType",
          role : "radiogroup",
          tabindex: -1
        }
      } 
      this.view.flxRadioBtnAccountType1.accessibilityConfig = {
        "a11yARIA": {
          "aria-labelledby": "lblAccountTypeRadio1",
          role : "radio",
          "aria-checked": true
        }
      }
      this.view.flxRadioBtnAccountType2.accessibilityConfig = {
        "a11yARIA": {
          "aria-labelledby": "lblAccountTypeRadio2",
          role : "radio",
          "aria-checked": false
        }
      }
      this.view.rtxNoPaymentMessage.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.lblColumn2.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
    this.view.lblColumn3.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
    this.view.lblColumn5.accessibilityConfig = {
      "a11yARIA": {
        tabindex: -1
      }
    }
    this.view.flxCancelKeywordM.accessibilityConfig = {
      "a11yLabel": "close",
      "a11yARIA": {
        role: "button"
      }
    }
    this.view.flxBFCancelKeywordM.accessibilityConfig = {
      "a11yLabel": "close",
      "a11yARIA": {
        role: "button"
      }
    }
    this.view.imgBFCancelM.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        tabindex: -1
      }
    }
    this.view.flxCancelTypeM.accessibilityConfig = {
      "a11yLabel": "close",
      "a11yARIA": {
        role: "button"
      }
    }
    this.view.imgCancelTypeM.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        tabindex: -1
      }
    }
    this.view.flxCancelAmountRangeM.accessibilityConfig = {
      "a11yLabel": "close",
      "a11yARIA": {
        role: "button"
      }
    }
    this.view.imgCancelAmountRangeM.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        tabindex: -1
      }
    }
    this.view.flxCancelDateRangeM.accessibilityConfig = {
      "a11yLabel": "close",
      "a11yARIA": {
        role: "button"
      }
    }
    this.view.imgCancelDateRangeM.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        tabindex: -1
      }
    }
    this.view.flxBFCancelDateRangeM.accessibilityConfig = {
      "a11yLabel": "close",
      "a11yARIA": {
        role: "button"
      }
    }
    this.view.imgBFCancelDateRangeM.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        tabindex: -1
      }
    }
    this.view.flxCancelCheckNumberM.accessibilityConfig = {
      "a11yLabel": "close",
      "a11yARIA": {
        role: "button"
      }
    }
    this.view.imgCancelCheckNumberM.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        tabindex: -1
      }
    }
    this.view.flxBFCancelReferenceNumberM.accessibilityConfig = {
      "a11yLabel": "close",
      "a11yARIA": {
        role: "button"
      }
    }
    this.view.imgCancelReferenceNumberM.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        tabindex: -1
      }
    }
    this.view.imgCancelM.accessibilityConfig = {
      "a11yHidden": true,
      "a11yARIA": {
        tabindex: -1
      }
    }
    this.view.flxColumn1.accessibilityConfig = {
      "a11yLabel": "Sort by transaction",
      "a11yARIA": {
          role : "button"
      }
    }
    this.view.flxColumn3.accessibilityConfig = {
      "a11yARIA": {
          tabindex: -1
      }
  }
  this.view.flxColumn5.accessibilityConfig = {
      "a11yARIA": {
          tabindex: -1
      }
  }
    this.view.lblColumn1.accessibilityConfig = {
      "a11yARIA": {
          tabindex: -1
      }
    }
    this.view.imgColumn1Right.accessibilityConfig = {
      "a11yARIA": {
          tabindex: -1
      }
    }
    this.view.imgColumn1Left.accessibilityConfig = {
      "a11yARIA": {
          tabindex: -1
      }
    }
    this.view.flxColumn4.accessibilityConfig = {
      "a11yLabel": "Sort by Amount",
      "a11yARIA": {
          role : "button"
      }
    }
    this.view.lblColumn4.accessibilityConfig = {
      "a11yARIA": {
          tabindex: -1
      }
    }
    this.view.imgColumn4Right.accessibilityConfig = {
      "a11yARIA": {
          tabindex: -1
      }
    }
    this.view.imgColumn4Left.accessibilityConfig = {
      "a11yARIA": {
          tabindex: -1
      }
    }
    this.accFunction(this.view.lblBFDateRangeTitle);
    this.accFunction(this.view.lblBFDateRangeValue);
    this.accFunction(this.view.lblBFReferenceNumberTitle);
    this.accFunction(this.view.lblBFReferenceNumberValue);
    this.accFunction(this.view.lblAmountRangeTitle);
    this.accFunction(this.view.lblAmountRangeValue);
    this.accFunction(this.view.lblDateRangeTitle);
    this.accFunction(this.view.lblDateRangeValue);
    this.accFunction(this.view.lblCheckNumberTitle);
    this.accFunction(this.view.lblCheckNumberValue);
    this.accFunction(this.view.lblKeywordTitleM);
    this.accFunction(this.view.lblKeywordValueM);
    this.accFunction(this.view.lblBFKeywordTitleM);
    this.accFunction(this.view.lblBFKeywordValueM);
    this.accFunction(this.view.lblTypeTitleM);
    this.accFunction(this.view.lblTypeValueM);
    this.accFunction(this.view.lblAmountRangeTitleM);
    this.accFunction(this.view.lblAmountRangeValueM);
    this.accFunction(this.view.lblDateRangeTitleM);
    this.accFunction(this.view.lblDateRangeValueM);
    this.accFunction(this.view.lblBFDateRangeTitleM);
    this.accFunction(this.view.lblBFDateRangeValueM);
    this.accFunction(this.view.lblCheckNumberTitleM);
    this.accFunction(this.view.lblCheckNumberValueM);
    this.accFunction(this.view.lblBFReferenceNumberTitleM);
    this.accFunction(this.view.lblBFReferenceNumberNumberValueM);
    this.view.flxFilters.accessibilityConfig = {
      "a11yARIA":{
          "role" : "tablist",
          "tabindex" : -1
      }
  }
    },

    setBackFocus: function(){
      this.view.flxDownload.setActive(true);
    },
    setTransactionData: function(data){
      this._responseData=data?data:this._responseData?this._responseData:"";
      if(data){
      this.cacheUtils.setTransactionListForSearch(data.Transactions);
      this.setCacheData(data);
      }
      else{
        this.cacheUtils.setTransactionListForSearch(this._responseData.Transactions);
        this.setCacheData(this._responseData);
      }
    },
    /**
     * Component getTransactionList
     * Reponsible to call the DAO method for invoking service api.
     */
    getTransactionList: function(){
      var self =this;
      try
      {
        this.requestStart();
        if(this.cacheUtils.data.length===0)
        {
          if(self._isBackendPropEnabled){
            if(!(isNaN(self.getFieldValue(self._cacheTotalRecords))))
              this.criteria.limit = parseInt(self.getFieldValue(self._cacheTotalRecords));
            else{
              this.criteria.limit = 300;
            }
          }
          else{
            this.criteria.limit = parseInt(this._cacheTotalRecords); 
          }

          if(this._TLobjectServiceName && this._TLobjectName && this._TLoperationName && this._dataAvailability == "Service calls by component"){
            this.transactionListDAO.fetchTransactionList(this._TLobjectServiceName,this._TLoperationName,this._TLobjectName,this.getCriteria(),this._TLserviceResponseIdentifier,this.setTransactionData,this.onError);
          }
          else{
            this.updateTransactions();
          }
        } 
        else
          {
            this.getCacheData();
          }
       
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in doing service call to fetch transactions",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component cacheCallBack
     * Reponsible to implement cache call back.
     */
    tab6CacheCallBack: function(data,params){
      var self = this;
      try
      {
        this.totalRecords = params.pagination.totalSize;
        this.processTab6Response(data,this._tab6ServiceResponseIdentifier);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting tab6 cache data",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }

    },
    /**
     * Component getCacheData
     * Reponsible to get cache data.
     */
    getTab6CacheData: function()
    {
      var self = this;
      try
      {
         if(this.state === "sortedData")
        {
          this.tab6CacheUtils.applySorting(this.criteria["sortBy"],this.criteria["order"]);
        }
        else
        {
          this.tab6CacheUtils.applyPagination(this.criteria["offset"],this.noOfRecords);
          this.cacheUtils.pageSize = this.noOfRecords;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in getting tab6 cache data",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setCacheData
     * Reponsible to set cache data.
     * @param: response{JSON} - data from service
     */
    setTab6CacheData: function(response)
    {
      var self = this;
      try
      {
        this.tab6CacheUtils.setData(response.Transactions);		
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting tab6 cache data",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    setTab6Transactions : function(data){
      for(var i = 0; i < data.Transactions.length; i++){
          if (!(data.Transactions[i].installmentAmount)){
              data.Transactions[i].installmentAmount=data.Transactions[i].amount;
          }
      }
      this.cacheUtils.setBlockedFundsListForSearch(data.Transactions);
      this.setTab6CacheData(data);
    },
    /**
     * Component getTab6Transactions
     * Reponsible to call the DAO method for invoking service api.
     */
    getTab6Transactions: function(){
      var self =this;
      try
      {
        if(this.tab6CacheUtils.data.length===0)
        {
          //this.criteria.limit = parseInt(this._cacheTotalRecords);
          if(self._isBackendPropEnabled){
            if(!(isNaN(self.getFieldValue(self._cacheTotalRecords))))
              this.criteria.limit = parseInt(self.getFieldValue(self._cacheTotalRecords));
            else{
              this.criteria.limit = 300;
            }
          }
          else{
            this.criteria.limit = parseInt(this._cacheTotalRecords); 
          }
          this.requestStart();
          var operationName = self.getFieldValue(self._tab6OperationName,"operationName");
          var objectName = self.getFieldValue(self._tab6ObjectName,"objectName");
          if(this._tab6ObjectServiceName && this._tab6ObjectName && operationName){
            this.transactionListDAO.fetchTransactionList(this._tab6ObjectServiceName,operationName,objectName,this.getCriteria(),this._tab6ServiceResponseIdentifier,this.setTab6Transactions,this.onError);
          }
          else{
            this.updateTab6Transactions();
          }
        }
        else
        {
          this.getTab6CacheData();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in doing service call to fetch transactions",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setFilterData
     * Reponsible to set all the properties to the filters.
     */
    setFilterData : function(){
      var scope = this;
      scope.setFilterText();
      scope.setFiltersVisibility();
      scope.setFilterActions();
      scope.setSelectedTabUI();
      scope.setSelectedTabUIMobile();
    },
    /**
     * Component setFilterText
     * Reponsible to set text to all the filters.
     */
    setFilterText: function(){
      var self =this;
      try{
        this.view.btnAll.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL");
        this.view.btnFilter2.text = this.getFieldValue(this._filterTab2,"title");
        this.view.btnFilter3.text = this.getFieldValue(this._filterTab3,"title");
        this.view.btnFilter4.text = this.getFieldValue(this._filterTab4,"title");
        this.view.btnFilter5.text = this.getFieldValue(this._filterTab5,"title");
        if(this.EntitlementUtils.isEntitled(this.getFieldValue(this._tab6Title, "entitlement_keys")))
          this.view.btnFilter6.text = this.getFieldValue(this._tab6Title,"title");
        else
          this.view.btnFilter6.text = "";
        
        // For mobile breakpoint.
        this.view.btnAllMobile.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL");
        this.view.btnFilter2Mobile.text = this.getFieldValue(this._filterTab2,"title");
        this.view.btnFilter3Mobile.text = this.getFieldValue(this._filterTab3,"title");
        this.view.btnFilter4Mobile.text = this.getFieldValue(this._filterTab4,"title");
        this.view.btnFilter5Mobile.text = this.getFieldValue(this._filterTab5,"title");
        if(this.EntitlementUtils.isEntitled(this.getFieldValue(this._tab6Title, "entitlement_keys")))
          this.view.btnFilter6Mobile.text = this.getFieldValue(this._tab6Title,"title");
        else
          this.view.btnFilter6Mobile.text = "";
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the Filter titles",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setFiltersVisibility
     * Reponsible to show and hide filters based on configuration.
     */
    setFiltersVisibility:function(){
      var self = this;
      try{
        this.view.btnFilter2.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter2.text));
        this.view.btnFilter3.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter3.text));
        this.view.btnFilter4.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter4.text));
        this.view.btnFilter5.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter5.text));
        this.view.btnFilter6.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter6.text));
        
        // For mobile breakpoint.
        this.view.btnFilter2Mobile.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter2Mobile.text));
        this.view.btnFilter3Mobile.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter3Mobile.text));
        this.view.btnFilter4Mobile.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter4Mobile.text));
        this.view.btnFilter5Mobile.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter5Mobile.text));
        this.view.btnFilter6Mobile.setVisibility(!this.isEmptyNullUndefined(this.view.btnFilter6Mobile.text));
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the Filters visibility",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component scrollFiltersLeft
     * Reponsible to perfrom actions on left scroll of filters in mobile breakpoint.
     */
    scrollFiltersRight: function() {
      this.view.flxFiltersScroll.left = "8.5%";
      this.view.flxFiltersScroll.right = "0dp";
      this.view.flxFiltersScroll.scrollToEnd();
      this.view.btnDummyLeftScroll.isVisible = true;
      this.view.btnDummyRightScroll.isVisible = false;
    },
    /**
     * Component scrollFiltersRight
     * Reponsible to perfrom actions on right scroll of filters in mobile breakpoint.
     */
    scrollFiltersLeft: function() {
      this.view.flxFiltersScroll.left = "0dp";
      this.view.flxFiltersScroll.right = "8.5%";
      this.view.flxFiltersScroll.scrollToBeginning();
      this.view.btnDummyLeftScroll.isVisible = false;
      this.view.btnDummyRightScroll.isVisible = true;
    },
    /**
     * Component setFilterActions
     * Reponsible to set the on click actions to the filters.
     */
    setFilterActions:function(){
      var self =this;
      try
      {
        var scope = this;
        scope.view.btnAll.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab1, 1);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter2.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab2, 2);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter3.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab3, 3);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter4.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab4, 4);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter5.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab5, 5);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter6.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setTab6Data(scope._tab6Criteria, 6);
          scope.setAriaSelectedAccessibility();
        };
        
        // Mobile breakpoint.
        scope.view.btnAllMobile.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab1, 1);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter2Mobile.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab2, 2);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter3Mobile.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab3, 3);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter4Mobile.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab4, 4);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter5Mobile.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setSelectedTabData(scope._filterTab5, 5);
          scope.setAriaSelectedAccessibility();
        };
        scope.view.btnFilter6Mobile.onClick = function(){
          scope.clearSearchOnTagClick();
          scope.setTab6Data(scope._tab6Criteria, 6);
          scope.setAriaSelectedAccessibility();
        };
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the Filter onCLicks",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSelectedTabData
     * Set the filter data and UI according to the tab selected
     * @param: filterData{string} - filter data of the selected account type
     * @param: selectedTab{integer} - selected tab number
     */
    setSelectedTabData: function(filterData,selectedTab){
      var self =this;
      try
      {
        var scope = this;
        scope.criteria = "";
        scope.offset = 0;
		this.state = "filterData";
        scope.view.paginationFooter.resetStartIndex();
        this.view.paginationFooter.collapseDropDown();
        this.view.paginationHeader.collapseDropDown();   
        scope.setCriteria(scope.getFieldValue(filterData,"requestPayoad"));
        scope.criteria["offset"] = scope.offset;
        scope.criteria["limit"] = parseInt(scope.noOfRecords);
        scope.selectedTab = selectedTab;
        scope.setSelectedTabUI();
        scope.setSelectedTabUIMobile();
        scope.resetSortingImages();
        scope.tabNavigation = true;
        if(scope._dataAvailability == "Service calls by component")
		{
			if(selectedTab == 1)
					{
						scope.setTransactionData();
					}
          scope.getTransactionList();
		}
        else
          scope.dataRequestCallback();
        scope.view.flxColumn1.accessibilityConfig = {
          "a11yLabel": "Sort by Transaction",
          "a11yARIA": {
            role: "button"
          }
        }
        scope.view.flxColumn4.accessibilityConfig = {
          "a11yLabel": "Sort by Amount",
          "a11yARIA": {
            role: "button"
          }
        }
        scope.view.flxColumn3.accessibilityConfig = {
          "a11yARIA": {
            tabindex: -1
          }
        }
        scope.view.flxColumn5.accessibilityConfig = {
          "a11yARIA": {
            tabindex: -1
          }
        }
      }
      catch (err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the citeria for service call for selected tab",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setTab6Data
     * Set the filter data and UI for Tab 6
     * @param: filterData{string} - filter data of the selected account type
     * @param: selectedTab{integer} - selected tab number
     */
    setTab6Data: function(filterData,selectedTab){
      var self =this;
      try
      {
        var scope = this;
        scope.criteria = "";
        scope.offset = 0;
		scope.view.paginationFooter.resetStartIndex();
        this.view.paginationFooter.collapseDropDown();
        this.view.paginationHeader.collapseDropDown();
        scope.setCriteria(scope.getFieldValue(filterData,"requestPayoad"));
        scope.criteria["offset"] = scope.offset;
        scope.criteria["limit"] = parseInt(scope.noOfRecords);
        scope.selectedTab = selectedTab;
        scope.setSelectedTabUI();
        scope.setSelectedTabUIMobile();
        scope.resetSortingImages();
        scope.tabNavigation = true;
        scope.getTab6Transactions();
        if (scope.accountType === "Loan") {
          scope.view.flxColumn1.accessibilityConfig = {
            "a11yLabel": "Sort by Transaction",
            "a11yARIA": {
              role: "button"
            }
          }
          scope.view.flxColumn4.accessibilityConfig = {
            "a11yLabel": "Sort by Amount",
            "a11yARIA": {
              role: "button"
            }
          }
        }
        else {
          scope.view.flxColumn1.accessibilityConfig = {
            "a11yARIA": {
              tabindex: -1
            }
          }
          scope.view.flxColumn3.accessibilityConfig = {
            "a11yLabel": "Sort by From Date",
            "a11yARIA": {
              role: "button"
            }
          }
          scope.view.flxColumn4.accessibilityConfig = {
            "a11yLabel": "Sort by To Date",
            "a11yARIA": {
              role: "button"
            }
          }
          scope.view.flxColumn5.accessibilityConfig = {
            "a11yLabel": "Sort by Amount",
            "a11yARIA": {
              role: "button"
            }
          }
        }
      }
      catch (err) {
        var errorObj =
        {
          "errorInfo": "Error in setting the citeria for service call for selected tab",
          "errorLevel": "Business",
          "error": err
        };
        self.onError(errorObj);
      }
    },
    getFilterName: function () {
      var self = this;
      try {
        let scope = this;
        let selectedTab = scope.selectedTab;
        let tabData = eval("scope._filterTab" + selectedTab);
        return scope.getFieldValue(tabData, "title");
      }
      catch (err) {
        var errorObj =
            {
              "errorInfo" : "Error in getting the fileter name.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    dataRequestCallback: function(searchCrteria){
      var self =this;
      try{
        var scopeObj = this;
        var dataObj = {
          "accountId" : scopeObj.getFieldValue(scopeObj._TLaccountId),
          "accountType" : scopeObj.getFieldValue(scopeObj._TLaccountType),
          "filterBy" : scopeObj.getFilterName(),
          "sortBy" : scopeObj.sorting,
          "offset" : scopeObj.offset,
          "limit" : scopeObj.noOfRecords,
          "searchCriteria" : searchCrteria
        };
        scopeObj.getTransactionsData(dataObj,scopeObj.updateTransactions);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the citeria to get Data from form",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSelectedTabUI
     * Reponsible to set the selected skin to the selected tab and reset the skins of other tabs.
     */
    setSelectedTabUI : function(){
      var self =this;
      try
      {
        this.view.btnAll.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter2.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter3.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter4.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter5.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter6.skin = this.skins.FILTER_INACTIVE;
        switch(this.selectedTab){
          case 1 : this.view.btnAll.skin = this.skins.FILTER_SELECTED;
            break;
          case 2 : this.view.btnFilter2.skin = this.skins.FILTER_SELECTED;
            break;
          case 3 : this.view.btnFilter3.skin = this.skins.FILTER_SELECTED;
            break;
          case 4 : this.view.btnFilter4.skin = this.skins.FILTER_SELECTED;
            break;
          case 5 : this.view.btnFilter5.skin = this.skins.FILTER_SELECTED;
            break;
          case 6 : this.view.btnFilter6.skin = this.skins.FILTER_SELECTED;
            break;
          default : this.view.btnAll.skin = this.skins.FILTER_SELECTED;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the skins for Filter",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * Component setSelectedTabUIMobile
     * Reponsible to set the selected skin to the selected tab and reset the skins of other tabs in mobile breakpoint.
     */
    setSelectedTabUIMobile : function(){
      var self =this;
      try
      {
        this.view.btnAllMobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter2Mobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter3Mobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter4Mobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter5Mobile.skin = this.skins.FILTER_INACTIVE;
        this.view.btnFilter6Mobile.skin = this.skins.FILTER_INACTIVE;
        switch(this.selectedTab){
          case 1 : {
            this.view.btnAllMobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnAllMobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 2 : {
            this.view.btnFilter2Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter2Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 3 : {
            this.view.btnFilter3Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter3Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 4 : {
            this.view.btnFilter4Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter4Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 5 : {
            this.view.btnFilter5Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter5Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          case 6 : {
            this.view.btnFilter6Mobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnFilter6Mobile.focusSkin = this.skins.FILTER_SELECTED;
            break;
          }
          default : {
            this.view.btnAllMobile.skin = this.skins.FILTER_SELECTED;
            this.view.btnAllMobile.focusSkin = this.skins.FILTER_SELECTED;
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the skins for Filter in mobile breakpoint.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getFieldValue
     * Parse the exposed contract value based on accountType selected and breakpoint consideration
     * @param: Value{string} - value collected from exposed contract
     * @param: key{string} - lookup key in the JSON string
     * @return : {string} - Processed value
     */
    getFieldValue: function(Value,key) {
      try 
      {
        var value = Value;
        if(typeof(Value) == "string"){
          value = JSON.parse(Value);
        }
        if(value[this.accountType]){
          value = value[this.accountType];
        }
        if(!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)){
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if(typeof(value)=="string")
            return this.getProcessedText(value);
          else{
            var text=this.breakPointParser(value,kony.application.getCurrentBreakpoint());
            return this.getProcessedText(text);
          }
        } else return "";
      }  
      catch(err)
      {
        kony.print(err);
      }
      return this.getProcessedText(Value);
    },
    /**
     * Component breakPointParser
     * Helper method to parse the exposed contract based on the current breakpoint
     * inputJSON {JSONObject} - object containing information about various breakpoints and associated texts
     * lookUpKey {string}     - current breakpoint value to be looked upon the above object
     * @return : value of the lookup key in the input object
     */
    breakPointParser:function(inputJSON,lookUpKey){
      var self = this;
      try
      {
        if(inputJSON.hasOwnProperty(lookUpKey)){
          return inputJSON[lookUpKey];
        }
        else if(inputJSON.hasOwnProperty("default")){
          return inputJSON["default"];
        }
        return inputJSON;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in parsing th break point",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setAccountTypeFromContext
     * Set account type from the context object
     */
    setAccountTypeFromContext : function(){
      this.accountType= this.getFieldValue(this._TLaccountType);
    },
    /**
     * Component processResponse
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */
    processResponse:function(backendResponse,unicode){
      var self = this;
      try
      {
        this.response = backendResponse;
        this.map = {};
        this.readObject(backendResponse);
        this.parserUtilsManager.setResponseData(unicode,this.map);
        this.updateTransactions();
        this.requestEnd();
        this.view.forceLayout();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in processing the service responce",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component processTab6Response
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */
    processTab6Response:function(backendResponse,unicode){
      var self = this;
      try
      {
        this.tab6Response = backendResponse;
        this.map = {};
        this.readObject(backendResponse);
        this.parserUtilsManager.setResponseData(unicode,this.map);
        this.updateTab6Transactions();
        this.requestEnd();
        this.view.forceLayout();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in processing the service responce",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
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
              value=eval('('+value+')');
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
     * Helper method to parse the backend response
     * array{JSONArray} - array of records
     * jsonPath{String} - jsonPath traversed till the search field is reachable
     */
    readArray: function(array, jsonPath) {
      var self = this;
      try
      {
        var parentPath = jsonPath;
        for (var i = 0; i < array.length; i++) {
          var value = array[i];
          jsonPath = parentPath + "[" + i + "]";
          if (value instanceof Array) {
            this.readArray(value, jsonPath);
          } else if (value instanceof Object) {
            this.readObject(value, jsonPath);
          } else { // is a value
            if(isNaN(value) && (value.indexOf("{")>-1 ||value.indexOf("[")>-1))
              value=eval('('+value+')');
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
              "errorInfo" : "Error in reading the array.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSegmentHeader
     * Responsible to set the data and UI to the header.
     */
    setSegmentHeader: function(){
      var self = this;
      try
      {
        var selectTab;
        if(this.selectedTab === 6)
        {
          selectTab = "this._tab6Criteria"+this.selectedTab.toString();
        }
        else
        {
          selectTab = "this._filterTab"+this.selectedTab.toString();
        }
        var columnVisibility = this.getFieldValue(eval(selectTab),"ColumnVisiblity");
        for(var i = 1; i <= 6; i++){
          var column = "this._dataGridColumn";
          if(columnVisibility["column" + i])
            this.view["flxColumn" + i].setVisibility(columnVisibility["column" + i]);
          else
            this.view["flxColumn" + i].setVisibility(false);
          if(this.view["flxColumn"+i].isVisible){
            this.view["lblColumn"+i].text = this.getFieldValue(eval(column+i),"title");
            var sortBy = this.getFieldValue(eval(column+i),"sortBy");
            var align = this.getFieldValue(eval(column+i),"alignment");
            if(align === "right")
              {
                this.view["imgColumn"+i+"Right"].setVisibility(false);
                this.view["imgColumn"+i+"Left"].setVisibility(!this.isEmptyNullUndefined(sortBy));
                this.view["flxColumn" + i].reverseLayoutDirection = true;                
              }
            else
              {
                this.view["imgColumn"+i+"Right"].setVisibility(!this.isEmptyNullUndefined(sortBy));
                this.view["imgColumn"+i+"Left"].setVisibility(false);
                this.view["flxColumn" + i].reverseLayoutDirection = false;
              }
            var defaultSorting = this.getFieldValue(eval(column+i),"defaultSorting");
            if(defaultSorting && this.tabNavigation){
              let order = this.getFieldValue(eval(column+i),"order")
              if(order && order == "desc"){
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSortDesc)["img"];
                self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSortDesc)["img"];
                this.sorting = order;
              }
              else if(order && order == "asc"){
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSortAsc)["img"];
                self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSortAsc)["img"];
                this.sorting = order;
              }
              else{
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSort)["img"];
                 self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSort)["img"];
                this.sorting = "desc";
              }
              this.tabNavigation = false;
            }
            this.view["lblColumn"+i].skin = this._sknTableHeaderText;
            this.view["flxColumn"+i].width = this.getFieldValue(eval("this._dataGridColumn"+i),"width");
          }
        }
        this.view.flxSort.skin = this._sknTableHeader;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the heading of the segment",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setTab6SegmentHeader
     * Responsible to set the data and UI to the header.
     */
    setTab6SegmentHeader: function(){
      var self = this;
      try
      {
        var columnVisibility = this.getFieldValue(self._tab6Title,"ColumnVisiblity");
        for(var i = 1; i <= 6; i++){
          var column = "this._tab6DataGridColumn";
          if(columnVisibility["column" + i])
            this.view["flxColumn" + i].setVisibility(columnVisibility["column" + i]);
          else
            this.view["flxColumn" + i].setVisibility(false);
          if(this.view["flxColumn"+i].isVisible){
            this.view["lblColumn"+i].text = this.getFieldValue(eval(column+i),"title");
            var sortBy = this.getFieldValue(eval(column+i),"sortBy");
            var align = this.getFieldValue(eval(column+i),"alignment");
            if(align === "right")
              {
                this.view["imgColumn"+i+"Right"].setVisibility(false);
                this.view["imgColumn"+i+"Left"].setVisibility(!this.isEmptyNullUndefined(sortBy));
                this.view["flxColumn" + i].reverseLayoutDirection = true;
              }
            else
              {
                this.view["imgColumn"+i+"Right"].setVisibility(!this.isEmptyNullUndefined(sortBy));
                this.view["imgColumn"+i+"Left"].setVisibility(false);
                this.view["flxColumn" + i].reverseLayoutDirection = false;
              }
            var defaultSorting = this.getFieldValue(eval(column+i),"defaultSorting");
            if(defaultSorting && this.tabNavigation){
              let order = this.getFieldValue(eval(column+i),"order")
              if(order && order == "desc"){
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSortDesc)["img"];
                self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSortDesc)["img"];
                this.sorting = order;
              }
              else if(order && order == "asc"){
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSortAsc)["img"];
                self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSortAsc)["img"];
                this.sorting = order;
              }
              else{
                self.view["imgColumn"+i+"Right"].src = JSON.parse(self._iconColumnSort)["img"];
                 self.view["imgColumn"+i+"Left"].src = JSON.parse(self._iconColumnSort)["img"];
                this.sorting = "desc";
              }
              this.tabNavigation = false;
            }
            this.view["lblColumn"+i].skin = this._sknTableHeaderText;
            this.view["flxColumn"+i].width = this.getFieldValue(eval("this._tab6DataGridColumn"+i),"width");
          }
        }
        this.view.flxSort.skin = this._sknTableHeader;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the heading of the segment",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component updateTransactions
     * Responsible to set the data and UI to the segment.
     */
    updateTransactions: function(transactionData) {
      var self = this;
      try{
        this.setSegmentHeader();
        var selectedTab = "this._filterTab"+this.selectedTab.toString();
        var columnVisibility = this.getFieldValue(eval(selectedTab),"ColumnVisiblity");
        var scopeObj = this;
        var transactions = transactionData;
        if(this.isEmptyNullUndefined(transactionData)){
          transactions = this.response;
        }
		var recordsLength = 0;
        if(transactionData && transactionData.length>0){
          transactionData.length = transactionData.length;
        }
        //self.view.paginationFooter.updatePaginationBar(recordsLength,this.totalRecords);      
        if(typeof(transactions) == "string" || transactions.length <= 0) {
          this.view.segTransactions.setVisibility(false);
          this.view.flxNoTransactions.setVisibility(true);
          this.view.paginationFooter.setVisibility(false);
        } else {
          this.view.segTransactions.setVisibility(true);
          this.view.flxNoTransactions.setVisibility(false);
          this.view.paginationFooter.setVisibility(true);
          self.view.paginationFooter.updatePaginationBar(recordsLength,this.totalRecords);
          var section1Array = [];
          var section2Array = [];
          var unicode = this._transactionListIdentifier;
          var collection = this.getFieldValue(this._transactionListArray);
          var currentBreakPoint=kony.application.getCurrentBreakpoint();
          var typeKey1 = Object.keys(this.transactionListTypes)[0];
          var typeKey2 = Object.keys(this.transactionListTypes)[1];
          this.parserUtilsManager.setResponseData(unicode,collection);
          for(var i = 0; i < transactions.length; i++){
            var record = {};
            record["data"] = transactions[i];
            record["btnDropdown"] = {
              onClick : scopeObj.onToggle.bind(scopeObj),
              skin : JSON.parse(scopeObj._iconRowExpand)["skin"],
              text : JSON.parse(scopeObj._iconRowExpand)["vizIcon"],
              accessibilityConfig : {
                "a11yLabel": "Show more details",
                "a11yARIA": {
                  role: "button",
                  "aria-expanded": false,
                  "aria-live": "off"
                }
              }
            };
            if(currentBreakPoint == "1024") {
              record["btnDropdown"] = {
                onClick : scopeObj.onToggle.bind(scopeObj),
                skin : JSON.parse(scopeObj._iconRowExpand)["skin"],
                text : JSON.parse(scopeObj._iconRowExpand)["vizIcon"],
                left : "10dp",
                accessibilityConfig : {
                  "a11yLabel": "Show more details",
                  "a11yARIA": {
                    role: "button",
                    "aria-expanded": false,
                    "aria-live": "off"
                  }
                }
              };
            }
            if(currentBreakPoint == "640")
            {
              record["lblTransactionDescription"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField1,"mapping")],scopeObj.getFieldValue(scopeObj._mobileDataGridField1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField1, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueBig,
              };
              if(record["lblTransactionDescription"].text!==undefined && record["lblTransactionDescription"].text!==null && record["lblTransactionDescription"].text.length>25)
                record["lblTransactionDescription"].text = record["lblTransactionDescription"].text.substring(0,25)+"...";    
              record["lblDescription"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField1,"mapping")],scopeObj.getFieldValue(scopeObj._mobileDataGridField1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField1, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueBig,
              };
             record["flxDescription"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._mobileDataGridField1,"width")
              };
              record["lblAmount"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField2,"mapping")],scopeObj.getFieldValue(scopeObj._mobileDataGridField2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField2, "currencyCode")]).text,
                skin : scopeObj._sknValueField
              };
              record["flxAmount"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._mobileDataGridField2,"width")
              };
              record["lblDate"] ={
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField3,"mapping")],scopeObj.getFieldValue(scopeObj._mobileDataGridField3, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._mobileDataGridField3, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueSmall,
              };
              record["flxDate"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._mobileDataGridField3,"width")
              };
            }
            else
            {
              if(columnVisibility["column1"]){
                record["lblDate"] ={
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn1,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn1, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxDate"] = {
                  isVisible : columnVisibility["column1"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn1,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn1,"alignment")
                if(align=="right")
                  {
                     record["flxDate"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxDate"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxDate"] = {isVisible : false};
              }
              if(columnVisibility["column2"]){
                record["lblTransactionDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn2,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn2, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                if(record["lblTransactionDescription"].text!==undefined && record["lblTransactionDescription"].text!==null && record["lblTransactionDescription"].text.length>30)
                  record["lblTransactionDescription"].text = record["lblTransactionDescription"].text.substring(0,30)+"...";
                record["lblDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn2,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn2, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxDescription"] = {
                  isVisible : columnVisibility["column2"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn2,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn2,"alignment")
                if(align=="right")
                  {
                     record["flxDescription"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxDescription"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxDescription"] = {isVisible : false};
              }
              if(columnVisibility["column3"]){
                record["lblType"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn3,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn3, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn3, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxType"] = {
                  isVisible : columnVisibility["column3"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn3,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn3,"alignment")
                if(align=="right")
                  {
                     record["flxType"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxType"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxType"] = {isVisible : false};
              }
              if(columnVisibility["column4"]){
                record["lblAmount"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn4,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn4, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn4, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxAmount"] = {
                  isVisible : columnVisibility["column4"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn4,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn4,"alignment")
                if(align=="right")
                  {
                     record["flxAmount"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxAmount"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxAmount"] = { isVisible : false};
              }
              if(columnVisibility["column5"]){
                record["lblBalance"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn5,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn5, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn5, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxBalance"] = {
                  isVisible : columnVisibility["column5"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn5,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn5,"alignment")
                if(align=="right")
                  {
                     record["flxBalance"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxBalance"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["lblBalance"] = { isVisible : false};
              }
              if(columnVisibility["column6"]){
                record["lblCategory"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn6,"mapping")],scopeObj.getFieldValue(scopeObj._dataGridColumn6, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._dataGridColumn6, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxCategory"] = {
                  isVisible : columnVisibility["column6"],
                  width : scopeObj.getFieldValue(scopeObj._dataGridColumn6,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._dataGridColumn6,"alignment")
                if(align=="right")
                  {
                     record["flxCategory"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxCategory"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["lblCategory"] = { isVisible : false};
              }
            } 
            if(transactions[i][this._segregationDecider] === this.transactionListTypes[typeKey1]["value"]){
              var selectedType = typeKey1;
            }
            else{
              var selectedType = typeKey2;
            }
            for(var j = 1; j <= 10; j++){
              var title = scopeObj.getFieldValue(eval("this._field"+j+"Label"), "text");
              if(typeof(title) != "string"){
                title = scopeObj.getFieldValue(title[selectedType]);
              }
              if(!scopeObj.isEmptyNullUndefined(title)){
                record["lblDetails"+j+"Title"] = {
                  "text": title,
                  "skin": (currentBreakPoint == "640")?scopeObj._sknMBTransactionDetailsLabel:scopeObj._sknTransDetailsLabel
                }
              }
              else{
                record["lblDetails"+j+"Title"] = "";
              }
              var value = scopeObj.getFieldValue(eval("this._field"+j+"Value"), "text");
              value = scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(value[selectedType])],scopeObj.getFieldValue(scopeObj.getFieldValue(eval("this._field"+j+"Type"))[selectedType]),transactions[i][scopeObj.getFieldValue(scopeObj.getFieldValue(eval("this._field"+j+"Value"), "currencyCode")[selectedType])]);
              if(!scopeObj.isEmptyNullUndefined(value.text)){
                record["lblDetails"+j+"Value"] = {
                  "text": value.text,
                  "skin": (currentBreakPoint == "640")?scopeObj._sknMBTransactionDetailsValue:value.skin
                }
              }
              else{
                record["lblDetails"+j+"Value"] = "";
              }
              record["flxDetails"+j] = {
                isVisible : (!scopeObj.isEmptyNullUndefined(record["lblDetails"+j+"Title"]) || !scopeObj.isEmptyNullUndefined(record["lblDetails"+j+"Value"].text))
              }
            }
			if(transactions[i].transactionType=="Cheque" || transactions[i].transactionType=="Draft")
            {
              var x = this._checkNumberField.split(" ")[1];
              record["flxDetails"+x].isVisible = true;
              if(record["lblDetails"+x+"Value"] === "")
                {
                  record["lblDetails"+x+"Value"] = {};
                  record["lblDetails"+x+"Value"].text ="NA";
                }
              record["lblDetails"+x+"Value"].skin = this._sknHyperlink;
              record["lblDetails"+x+"Value"].onTouchEnd = function(){
                var data = scopeObj.rowData.data;
                data.id = "Cheque";
                scopeObj.contextualActionButtonOnClick(data);
              };
            }
            else
            {
                var x = this._checkNumberField.split(" ")[1];
                record["flxDetails"+x].isVisible = false;
            }
            if(transactions[i].transactionType=="SwiftPayment")
            {
			  var x = this._swiftTransactionField.split(" ")[1];
              record["lblDetails"+x+"Value"].skin = this._sknHyperlink;
              record["lblDetails"+x+"Value"].onTouchEnd = function(){
                var data = scopeObj.rowData.data;
                data.id = "SwiftPayment";
                scopeObj.contextualActionButtonOnClick(data);
              };
            }
            try{
              if(this.accountType == 'Loan' && kony.application.getPreviousForm().id == 'frmMortgageAccountDetails'){
                record["btnDetails1"] = {"isVisible":false};
              }else{
                let text = scopeObj.getFieldValue(scopeObj._btnContextualAction1,"text");
                text = scopeObj.getFieldValue(text[selectedType]);
                switch(text){
                  case "Dispute": text = kony.i18n.getLocalizedString("i18n.accounts.disputeTransaction");break;
                  case "Download": text = kony.i18n.getLocalizedString("i18n.common.Download");break;
                  case "Attachments": text = kony.i18n.getLocalizedString("i18n.common.Attachments");break;
                }
                if(!this.isEmptyNullUndefined(text)){
                  record["btnDetails1"] = {
                    "text": text,
                    "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction1, "width")[selectedType]),
                    "onClick": function(){
                      var data = scopeObj.rowData.data;
                     var currentForm = kony.application.getCurrentForm();
                      //currentForm.flxDialogs.setVisibility(true);
                     currentForm.flxSingleTransactionDownload.setVisibility(true);
                     currentForm.btnSTClose.setFocus(true);
                     currentForm.btnSTDownload.onClick = function()
                     {
                      var data = scopeObj.rowData.data;
                      data.id = scopeObj.getFieldValue(scopeObj._btnContextualAction1, "id")[selectedType];
                      scopeObj.contextualActionButtonOnClick(data);
                     };
                     currentForm.btnSTCancel.onClick = function() {
                          currentForm.flxSingleTransactionDownload.setVisibility(false);
                     };
                     currentForm.btnSTClose.onClick = function() {
                      currentForm.flxSingleTransactionDownload.setVisibility(false);
                 };                    
                                            
                    },
                    "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction1, "skin")[selectedType]),
                    "accessibilityConfig": {
                      "a11yLabel": text
                    }
                  }
                  record["btnDetails1"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails1"].text);
                  if(record["btnDetails1"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction1, "entitlement_action")[selectedType])) {
                    scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction1, "id")[selectedType]),function(visibility){
                      if(visibility === true) {
                        record["btnDetails1"]["isVisible"] = true;
                      } else{
                        record["btnDetails1"]["isVisible"] = false;
                      }
                    });
                  }
                  else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._btnContextualAction1, "entitlement_key"))){
                     record["btnDetails1"] = {"isVisible":false};
                  }
                }
                else{
                  record["btnDetails1"] = {"isVisible":false};
                }
              }
            }
            catch(e){
              record["btnDetails1"] = {"isVisible":false};
            }
            try{
              if(this.accountType == 'Loan' && kony.application.getPreviousForm().id == 'frmMortgageAccountDetails'){
                record["btnDetails2"] = {"isVisible":false};
              }else{
                let text = scopeObj.getFieldValue(scopeObj._btnContextualAction2,"text");
                text = scopeObj.getFieldValue(text[selectedType]);
                switch(text){
                  case "Dispute": text = kony.i18n.getLocalizedString("i18n.accounts.disputeTransaction");break;
                  case "Download": text = kony.i18n.getLocalizedString("i18n.common.Download");break;
                  case "Attachments": text = kony.i18n.getLocalizedString("i18n.common.Attachments");break;
                }
                   if(!this.isEmptyNullUndefined(text)){
                  record["btnDetails2"] = {
                    "text": text,
                    "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction2, "width")[selectedType]),
                    "onClick": function(){
                      var data = scopeObj.rowData.data;
                      data.id = scopeObj.getFieldValue(scopeObj._btnContextualAction2,"id")[selectedType];
                      data.fromAccountNumber=(scopeObj.context.Account_id) ? scopeObj.context.Account_id : (scopeObj.context.accountID) ? scopeObj.context.accountID : (scopeObj.context.account_id) ? scopeObj.context.account_id : "";
                      data.fromAccountName=(scopeObj.context.accountName) ? scopeObj.context.accountName : (scopeObj.context.nickName) ? scopeObj.context.nickName : (scopeObj.context.displayName) ? scopeObj.context.displayName : "";
                      scopeObj.contextualActionButtonOnClick(data);
                    },
                    "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction2, "skin")[selectedType]),
                    "accessibilityConfig": {
                      "a11yLabel": text,
                      "a11yARIA": {
                        "role": "link"
                      }
                    }
                  }
                  record["btnDetails2"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails2"].text);
                  if(record["btnDetails2"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction2, "entitlement_action")[selectedType])) {
                    scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction2, "id")[selectedType]),function(visibility){
                      if(visibility === true) {
                        record["btnDetails2"]["isVisible"] = true;
                      } else{
                        record["btnDetails2"]["isVisible"] = false;
                      }
                    });
                  }
                  else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._btnContextualAction2, "entitlement_key"))){
                     record["btnDetails2"] = {"isVisible":false};
                  }
                }
                else{
                  record["btnDetails2"] = {"isVisible":false};
                }
              }
            }
            catch(e){
              record["btnDetails2"] = {"isVisible":false};
            }
            try{
              if(this.accountType == 'Loan' && kony.application.getPreviousForm().id == 'frmMortgageAccountDetails'){
                record["btnDetails3"] = {"isVisible":false};
              }else{
                let text = scopeObj.getFieldValue(scopeObj._btnContextualAction3,"text");
                text = scopeObj.getFieldValue(text[selectedType]);
                switch(text){
                  case "Dispute": text = kony.i18n.getLocalizedString("i18n.accounts.disputeTransaction");break;
                  case "Download": text = kony.i18n.getLocalizedString("i18n.common.Download");break;
                  case "Attachments": text = kony.i18n.getLocalizedString("i18n.common.Attachments");break;
                }
                  if(!this.isEmptyNullUndefined(text)){
                  record["btnDetails3"] = {
                    "text": text,
                    "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction3, "width")[selectedType]),
                    "onClick": function(){
                      var data = scopeObj.rowData.data;
                      data.id = scopeObj.getFieldValue(scopeObj._btnContextualAction3,"id")[selectedType];
                      scopeObj.contextualActionButtonOnClick(data);
                    },
                    "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction3, "skin")[selectedType]),
                    "accessibilityConfig": {
                      "a11yLabel": text
                    }
                  }
                  record["btnDetails3"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails3"].text);
                  if(record["btnDetails3"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction3, "entitlement_action")[selectedType])) {
                    scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction3, "id")[selectedType]),function(visibility){
                      if(visibility === true) {
                        record["btnDetails3"]["isVisible"] = true;
                      } else{
                        record["btnDetails3"]["isVisible"] = false;
                      }
                    });
                  }
                  else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._btnContextualAction3, "entitlement_key"))){
                     record["btnDetails3"] = {"isVisible":false};
                  }
                }
                else{
                  record["btnDetails3"] = {"isVisible":false};
                }
              }
            }
            catch(e){
              record["btnDetails3"] = {"isVisible":false};
            }
             try{
              if(this.accountType == 'Loan' && kony.application.getPreviousForm().id == 'frmMortgageAccountDetails'){
                record["btnDetails4"] = {"isVisible":false};
              }else{
                let text = scopeObj.getFieldValue(scopeObj._btnContextualAction4,"text");
                text = scopeObj.getFieldValue(text[selectedType]);
                switch(text){
                  case "Dispute": text = kony.i18n.getLocalizedString("i18n.accounts.disputeTransaction");break;
                  case "Download": text = kony.i18n.getLocalizedString("i18n.common.Download");break;
                  case "Attachments": text = kony.i18n.getLocalizedString("i18n.common.Attachments");break;
                }
                 if(!this.isEmptyNullUndefined(text)){
                 record["btnDetails4"] = {
                   "text": text,
                   "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction4, "width")[selectedType]),
                   "onClick": function(){
                     var data = scopeObj.rowData.data;
                     data.id = scopeObj.getFieldValue(scopeObj._btnContextualAction4,"id")[selectedType];
                     scopeObj.contextualActionButtonOnClick(data);
                   },
                   "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction4, "skin")[selectedType]),
                   "accessibilityConfig": {
                    "a11yLabel": text
                  }
                 }
                 record["btnDetails4"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails4"].text);
                 if(record["btnDetails4"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction4, "entitlement_action")[selectedType])) {
                   scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._btnContextualAction4, "id")[selectedType]),function(visibility){
                     if(visibility === true) {
                       record["btnDetails4"]["isVisible"] = true;
                     } else{
                       record["btnDetails4"]["isVisible"] = false;
                     }
                   });
                 }
                 else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._btnContextualAction4, "entitlement_key"))){
                    record["btnDetails4"] = {"isVisible":false};
                 }
               }
               else{
                 record["btnDetails4"] = {"isVisible":false};
               }
              }
            }
            catch(e){
              record["btnDetails4"] = {"isVisible":false};
            }
            record["lblSeparator"] = {
              "text":".",
              "skin":scopeObj._sknRowSeperator
            };
            if(transactions[i][this._segregationDecider].toUpperCase() == this.transactionListTypes[typeKey2].value.toUpperCase())
              section2Array.push(record);
            else
              section1Array.push(record);
          }
          if(section1Array.length == 0){
            var sectionData = [
              [
                {"lblTransactionHeader":{
                  "text":  kony.i18n.getLocalizedString("i18n.accounts.posted"),
                  "skin" : this._sknPostedLabel
                }},section2Array
              ]
            ]
            }
          else if(section2Array.length == 0){
            var sectionData = [
              [
                {"lblTransactionHeader":{
                  "text": kony.i18n.getLocalizedString("i18n.accounts.pending"),
                  "skin" : this._sknPendingLabel
                }},section1Array
              ]
            ]
            }
          else{
            var sectionData = [
              [
                {"lblTransactionHeader":{
                  "text": kony.i18n.getLocalizedString("i18n.accounts.pending"),
                  "skin" : this._sknPendingLabel
                }},section1Array
              ]
              ,
              [
                {"lblTransactionHeader":{
                   "text": kony.i18n.getLocalizedString("i18n.accounts.posted"),
                  "skin" : this._sknPostedLabel
                }},section2Array
              ]
            ];
          }
          this.view.segTransactions.widgetDataMap = {
            "btnRepeat": "btnRepeat",
            "lblNoteTitle": "lblNoteTitle",
            "lblNoteValue": "lblNoteValue",
            "lblFrequencyTitle": "lblFrequencyTitle",
            "lblFrequencyValue": "lblFrequencyValue",
            "lblRecurrenceTitle": "lblRecurrenceTitle",
            "lblRecurrenceValue": "lblRecurrenceValue",
            "btnDisputeTransaction": "btnDisputeTransaction",
            "data": "data",
            "btnDownload": "btnDownload",
            "btnViewRequests": "btnViewRequests",
            "imgError": "imgError",
            "imgWarning": "imgWarning",
            "lblDisputedWarning": "lblDisputedWarning",
            "btnEditRule": "btnEditRule",
            "btnPrint": "btnPrint",
            "cbxRememberCategory": "cbxRememberCategory",
            "flxActions": "flxActions",
            "flxActionsWrapper": "flxActionsWrapper",
            "flxAmount": "flxAmount",
            "flxBalance": "flxBalance",
            "flxCategory": "flxCategory",
            "flxDate": "flxDate",
            "flxDescription": "flxDescription",
            "flxDetail": "flxDetail",
            "flxDetailData": "flxDetailData",
            "flxDetailHeader": "flxDetailHeader",
            "btnDropdown": "btnDropdown",
            "flxIdentifier": "flxIdentifier",
            "flxInformation": "flxInformation",
            "flxLeft": "flxLeft",
            "flxMemo": "flxMemo",
            "flxRight": "flxRight",
            "flxSegTransactionHeader": "flxSegTransactionHeader",
            "flxSegTransactionRowSavings": "flxSegTransactionRowSavings",
            "flxSegTransactionRowSelected": "flxSegTransactionRowSelected",
            "flxSegTransactionRowWrapper": "flxSegTransactionRowWrapper",
            "flxSelectedRowWrapper": "flxSelectedRowWrapper",
            "flxToData": "flxToData",
            "flxDetails2": "flxDetails2",
            "flxType": "flxType",
            "flxDetails1": "flxDetails1",
            "flxTypeHeader": "flxTypeHeader",
            "flxWithdrawalAmountData": "flxWithdrawalAmountData",
            "flxDetails4": "flxDetails4",
            "flxDetails5": "flxDetails5",
            "flxDetails6": "flxDetails6",
            "flxDetails7": "flxDetails7",
            "flxDetails8": "flxDetails8",
            "flxDetails9": "flxDetails9",
            "flxDetails10": "flxDetails10",
            "flxWrapper": "flxWrapper",
            "imgCategoryDropdown": "imgCategoryDropdown",
            "imgType": "imgType",
            "lblType": "lblType",
            "lblAmount": "lblAmount",
            "lblBalance": "lblBalance",
            "lblCategory": "lblCategory",
            "lblDate": "lblDate",
            "lblDescription": "lblDescription",
            "lblTransactionDescription": "lblTransactionDescription",
            "lblIdentifier": "lblIdentifier",
            "lblSeparator": "lblSeparator",
            "lblSeparatorActions": "lblSeparatorActions",
            "lblSeparatorDetailData": "lblSeparatorDetailData",
            "lblSeparatorDetailHeader": "lblSeparatorDetailHeader",
            "lblDetails2Title": "lblDetails2Title",
            "lblDetails2Value": "lblDetails2Value",
            "lblTransactionHeader": "lblTransactionHeader",
            "lblDetails1Title": "lblDetails1Title",
            "lblDetails1Value": "lblDetails1Value",
            "lblDetails4Title": "lblDetails4Title",
            "lblDetails4Value": "lblDetails4Value",
            "lblDetails3Title": "lblDetails3Title",
            "lblDetails3Value": "lblDetails3Value",
            "lblDetails5Title": "lblDetails5Title",
            "lblDetails5Value": "lblDetails5Value",
            "lblDetails6Title": "lblDetails6Title",
            "lblDetails6Value": "lblDetails6Value",
            "lblDetails7Title": "lblDetails7Title",
            "lblDetails7Value": "lblDetails7Value",
            "lblDetails8Title": "lblDetails8Title",
            "lblDetails8Value": "lblDetails8Value",
            "lblDetails9Title": "lblDetails9Title",
            "lblDetails9Value": "lblDetails9Value",
            "lblDetails10Title": "lblDetails10Title",
            "lblDetails10Value": "lblDetails10Value",
            "txtMemo": "txtMemo",
            "CopyflxToHeader0g61ceef5594d41": "CopyflxToHeader0g61ceef5594d41",
            "CopylblToTitle0a2c47b22996e4f": "CopylblToTitle0a2c47b22996e4f",
            "flxBankName1": "flxBankName1",
            "flxBankName2": "flxBankName2",
            "flxCash": "flxCash",
            "flxCheck1": "flxCheck1",
            "flxCheck1Ttitle": "flxCheck1Ttitle",
            "flxCheck2": "flxCheck2",
            "flxCheck2Ttitle": "flxCheck2Ttitle",
            "flxCheckImage": "flxCheckImage",
            "flxCheckImage2Icon": "flxCheckImage2Icon",
            "flxCheckImageIcon": "flxCheckImageIcon",
            "flxRememberCategory": "flxRememberCategory",
            "flxSegCheckImages": "flxSegCheckImages", 
            "flxTotal": "flxTotal",
            "flxTotalValue": "flxTotalValue",
            "flxTransactionFee": "flxTransactionFee",
            "flxFrequencyTitle": "flxFrequencyTitle",
            "flxRecurrenceTitle": "flxRecurrenceTitle",
            "flxDetails3": "flxDetails3",
            "flxWithdrawalAmount": "flxWithdrawalAmount",
            "flxWithdrawalAmountCash": "flxWithdrawalAmountCash",
            "flxWithdrawalAmountCheck1": "flxWithdrawalAmountCheck1",
            "flxWithdrawalAmountCheck2": "flxWithdrawalAmountCheck2",
            "imgCheckimage": "imgCheckimage",
            "imgCheckImage1Icon": "imgCheckImage1Icon",
            "imgCheckImage2Icon": "imgCheckImage2Icon",
            "imgRememberCategory": "imgRememberCategory",
            "lblTransactionFeeKey": "lblTransactionFeeKey",
            "lblTransactionFeeValue": "lblTransactionFeeValue",
            "lblBankName1": "lblBankName1",
            "lblBankName2": "lblBankName2",
            "lblCheck1Ttitle": "lblCheck1Ttitle",
            "lblCheck2Ttitle": "lblCheck2Ttitle",
            "lblRememberCategory": "lblRememberCategory",
            "lblSeparator2": "lblSeparator2",
            "lblSeperatorhor1": "lblSeperatorhor1",
            "lblSeperatorhor2": "lblSeperatorhor2",
            "lblSeperatorhor3": "lblSeperatorhor3",
            "lblSeperatorhor4": "lblSeperatorhor4",
            "lblSeperatorhor5": "lblSeperatorhor5",
            "lblTotalValue": "lblTotalValue",
            "lblWithdrawalAmount": "lblWithdrawalAmount",
            "lblWithdrawalAmountCash": "lblWithdrawalAmountCash",
            "lblWithdrawalAmountCheck1": "lblWithdrawalAmountCheck1",
            "lblWithdrawalAmountCheck2": "lblWithdrawalAmountCheck2",
            "segCheckImages": "segCheckImages",
            "txtFieldMemo": "txtFieldMemo",
            "lblToTitle2": "lblToTitle2",
            "lblTypeTitle2": "lblTypeTitle2",
            "lblWithdrawalAmountTitle2": "lblWithdrawalAmountTitle2",
            "btnDetails1": "btnDetails1",
            "btnDetails2": "btnDetails2",
            "btnDetails3": "btnDetails3",
            "btnDetails4": "btnDetails4",
            "accountId" : scopeObj.getFieldValue(scopeObj._TLaccountId),
            "accountType" : scopeObj.getFieldValue(scopeObj._TLaccountType)
          };
          this.view.segTransactions.rowTemplate = this.rowTemplate;
          if (this.accountType == 'mortgageFacility'){
            this.view.segTransactions.sectionHeaderTemplate = "";
          }
          else{
            this.view.segTransactions.sectionHeaderTemplate = "ICFlxSegTransactionHeader";
          }
          this.view.segTransactions.backgroundColor = "f8f7f8";
          this.view.segTransactions.removeAll(); 
          this.view.segTransactions.setData(sectionData);
          try{
            this.adjustScreen();
          }
          catch(e)
          {
            kony.print(e);
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the transactions in segment",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * Component updateTab6Transactions
     * Responsible to set the data and UI to the segment.
     */
    updateTab6Transactions: function(transactionData) {
      var self = this;
      try{
        this.setTab6SegmentHeader();
        var columnVisibility = this.getFieldValue(self._tab6Title,"ColumnVisiblity");
        var scopeObj = this;
        var transactions = transactionData;
        if(this.isEmptyNullUndefined(transactionData)){
          transactions = this.tab6Response;
        }
		var recordsLength = 0;
        if(transactionData && transactionData.length>0){
          recordsLength = transactionData.length;
        }
        if(typeof(transactions) == "string" || transactions.length == 0){
          this.view.segTransactions.setVisibility(false);
          this.view.flxNoTransactions.setVisibility(true);
          this.view.paginationFooter.setVisibility(false);
        } else {
          this.view.segTransactions.setVisibility(true);
          this.view.flxNoTransactions.setVisibility(false);
          this.view.paginationFooter.setVisibility(true);
          self.view.paginationFooter.updatePaginationBar(recordsLength,this.totalRecords);
          var section1Array = [];
          var section2Array = [];
          var section3Array = [];
          var collection = this.getFieldValue(this._tab6TransactionListArray);
          var currentBreakPoint=kony.application.getCurrentBreakpoint();
          var typeKey1 = Object.keys(this.transactionListTypes)[2];
          var typeKey2 = Object.keys(this.transactionListTypes)[3];
          for(var i = 0; i < transactions.length; i++){
            var record = {};
            record["data"] = transactions[i];
            if(this.accountType=="Loan" || this.accountType=="mortgageFacility")
            {
              record["btnDropdown"] = {
                isVisble : true,
                onClick : scopeObj.onToggle.bind(scopeObj),
                skin : JSON.parse(scopeObj._iconRowExpand)["skin"],
                text : JSON.parse(scopeObj._iconRowExpand)["vizIcon"]
              };
            }
            else
            {
              record["btnDropdown"] = {
                isVisible : false
              };
            }
            if(currentBreakPoint == "1024") {
              record["btnDropdown"] = {
                onClick : scopeObj.onToggle.bind(scopeObj),
                skin : JSON.parse(scopeObj._iconRowExpand)["skin"],
                text : JSON.parse(scopeObj._iconRowExpand)["vizIcon"],
                left : "10dp",
              };
            }
            if(currentBreakPoint == "640")
            {          
               record["lblTransactionDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1,"mapping")],scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1, "currencyCode")]).text,
                  skin : scopeObj._sknMBFieldValueBig,
                };
              if(record["lblTransactionDescription"].text!==undefined && record["lblTransactionDescription"].text!==null && record["lblTransactionDescription"].text.length>25)
                  record["lblTransactionDescription"].text = record["lblTransactionDescription"].text.substring(0,25)+"...";                 
               record["lblDescription"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1,"mapping")],scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueBig,
              };
              record["flxDescription"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField1,"width")
              };
              record["lblAmount"] = {
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField2,"mapping")],scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField2, "currencyCode")]).text,
                skin : scopeObj._sknValueField
              };
              record["flxAmount"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField2,"width")
              };
              record["lblDate"] ={
                text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField3,"mapping")],scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField3, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField3, "currencyCode")]).text,
                skin : scopeObj._sknMBFieldValueSmall,
              };
              record["flxDate"] = {
                isVisible : true,
                width : scopeObj.getFieldValue(scopeObj._tab6MobileDataGridField3,"width")
              };
            }
            else
            {
              if(columnVisibility["column1"]){
                record["lblDate"] ={
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxDate"] = {
                  isVisible : columnVisibility["column1"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn1,"alignment")
                if(align=="right")
                  {
                     record["flxDate"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxDate"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxDate"] = {isVisible : false};
              }
              if(columnVisibility["column2"]){
                record["lblTransactionDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                if(record["lblTransactionDescription"].text!==undefined && record["lblTransactionDescription"].text!==null && record["lblTransactionDescription"].text.length>30)
                  record["lblTransactionDescription"].text = record["lblTransactionDescription"].text.substring(0,30)+"...";
                record["lblDescription"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxDescription"] = {
                  isVisible : columnVisibility["column2"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn2,"alignment")
                if(align=="right")
                  {
                     record["flxDescription"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxDescription"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxDescription"] = {isVisible : false};
              }
              if(columnVisibility["column3"]){
                record["lblType"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3, "currencyCode")]).text,
                  skin : scopeObj._sknValueField,
                };
                record["flxType"] = {
                  isVisible : columnVisibility["column3"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn3,"alignment")
                if(align=="right")
                  {
                     record["flxType"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxType"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxType"] = {isVisible : false};
              }
              if(columnVisibility["column4"]){
                record["lblAmount"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxAmount"] = {
                  isVisible : columnVisibility["column4"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn4,"alignment")
                if(align=="right")
                  {
                     record["flxAmount"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxAmount"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["flxAmount"] = { isVisible : false};
              }
              if(columnVisibility["column5"]){
                record["lblBalance"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxBalance"] = {
                  isVisible : columnVisibility["column5"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn5,"alignment")
                if(align=="right")
                  {
                     record["flxBalance"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxBalance"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["lblBalance"] = { isVisible : false};
              }
              if(columnVisibility["column6"]){
                record["lblCategory"] = {
                  text : scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6,"mapping")],scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6, "fieldType"),transactions[i][scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6, "currencyCode")]).text,
                  skin : scopeObj._sknValueField
                };
                record["flxCategory"] = {
                  isVisible : columnVisibility["column6"],
                  width : scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6,"width")
                };
                var align = scopeObj.getFieldValue(scopeObj._tab6DataGridColumn6,"alignment")
                if(align=="right")
                  {
                     record["flxCategory"].reverseLayoutDirection = true;
                  }
                else
                  {
                     record["flxCategory"].reverseLayoutDirection = false;
                  }
              }
              else{
                record["lblCategory"] = { isVisible : false};
              }
            } 
            if(transactions[i]["installmentType"]!==null && transactions[i]["installmentType"]!== undefined && transactions[i]["installmentType"].toUpperCase() === this.transactionListTypes[typeKey1]["value"].toUpperCase()){
              var selectedType = typeKey1;
            }
            else{
              var selectedType = typeKey2;
            }
            for(var j = 1; j <= 10; j++){
              var title = scopeObj.getFieldValue(eval("this._tab6Field"+j+"Label"), "text");
              if(typeof(title) != "string"){
                title = scopeObj.getFieldValue(title[selectedType]);
              }
              if(!scopeObj.isEmptyNullUndefined(title)){
                record["lblDetails"+j+"Title"] = {
                  "text": title,
                  "skin": (currentBreakPoint == "640")?scopeObj._sknMBTransactionDetailsLabel:scopeObj._sknTransDetailsLabel
                }
              }
              else{
                record["lblDetails"+j+"Title"] = "";
              }
              var value = scopeObj.getFieldValue(eval("this._tab6Field"+j+"Value"), "text");
              value = scopeObj.getFormattedData(transactions[i][scopeObj.getFieldValue(value[selectedType])],scopeObj.getFieldValue(scopeObj.getFieldValue(eval("this._tab6Field"+j+"Type"))[selectedType]),transactions[i][scopeObj.getFieldValue(scopeObj.getFieldValue(eval("this._tab6Field"+j+"Value"), "currencyCode")[selectedType])]);
              if(!scopeObj.isEmptyNullUndefined(value.text)){
                record["lblDetails"+j+"Value"] = {
                  "text": value.text,
                  "skin": (currentBreakPoint == "640")?scopeObj._sknMBTransactionDetailsValue:value.skin
                }
              }
              else{
                record["lblDetails"+j+"Value"] = "";
              }
              record["flxDetails"+j] = {
                isVisible : (!scopeObj.isEmptyNullUndefined(record["lblDetails"+j+"Title"]) || !scopeObj.isEmptyNullUndefined(record["lblDetails"+j+"Value"].text))
              }
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1,"text");
              text = scopeObj.getFieldValue(text[selectedType])
              if(!this.isEmptyNullUndefined(text)){
                record["btnDetails1"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "width")[selectedType]),
                  "onClick": function() {
                    var data = scopeObj.rowData.data;
                    if (data["installmentType"] !== null && data["installmentType"] !== undefined && data["installmentType"].toUpperCase() === scopeObj.transactionListTypes[typeKey1]["value"].toUpperCase()) {
                      var selectedType = typeKey1;
                    } else {
                      var selectedType = typeKey2;
                    }
                    data.id = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "skin")[selectedType])
                }
                record["btnDetails1"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails1"].text);
                if(record["btnDetails1"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails1"]["isVisible"] = true;
                    } else{
                      record["btnDetails1"]["isVisible"] = false;
                    }
                  });
                }
                else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._tab6BtnContextualAction1, "entitlement_key"))){
                   record["btnDetails1"] = {"isVisible":false};
                }
              }
              else{
                record["btnDetails1"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails1"] = {"isVisible":false};
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2,"text");
              text = scopeObj.getFieldValue(text[selectedType]);
              if(!this.isEmptyNullUndefined(text)){
                record["btnDetails2"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2, "width")[selectedType]),
                   "onClick": function() {
                    var data = scopeObj.rowData.data;
                    if (data["installmentType"] !== null && data["installmentType"] !== undefined && data["installmentType"].toUpperCase() === scopeObj.transactionListTypes[typeKey1]["value"].toUpperCase()) {
                      var selectedType = typeKey1;
                    } else {
                      var selectedType = typeKey2;
                    }
                    data.id = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2, "skin")[selectedType])
                }
                record["btnDetails2"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails2"].text);
                if(record["btnDetails2"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction2, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails2"]["isVisible"] = true;
                    } else{
                      record["btnDetails2"]["isVisible"] = false;
                    }
                  });
                }
                else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._tab6BtnContextualAction1, "entitlement_key"))){
                   record["btnDetails2"] = {"isVisible":false};
                }
              }
              else{
                record["btnDetails2"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails2"] = {"isVisible":false};
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3,"text");
              text = scopeObj.getFieldValue(text[selectedType]);
               if(!this.isEmptyNullUndefined(text)){
                record["btnDetails3"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3, "width")[selectedType]),
                   "onClick": function() {
                    var data = scopeObj.rowData.data;
                    if (data["installmentType"] !== null && data["installmentType"] !== undefined && data["installmentType"].toUpperCase() === scopeObj.transactionListTypes[typeKey1]["value"].toUpperCase()) {
                      var selectedType = typeKey1;
                    } else {
                      var selectedType = typeKey2;
                    }
                    data.id = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction1, "id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3, "skin")[selectedType])
                }
                record["btnDetails3"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails3"].text);
                if(record["btnDetails3"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction3, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails3"]["isVisible"] = true;
                    } else{
                      record["btnDetails3"]["isVisible"] = false;
                    }
                  });
                }
                else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._tab6BtnContextualAction3, "entitlement_key"))){
                   record["btnDetails3"] = {"isVisible":false};
                }
              }
              else{
                record["btnDetails3"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails3"] = {"isVisible":false};
            }
            try{
              let text = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4,"text");
              text = scopeObj.getFieldValue(text[selectedType]);
               if(!this.isEmptyNullUndefined(text)){
                record["btnDetails4"] = {
                  "text": text,
                  "width": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4, "width")[selectedType]),
                  "onClick": function(){
                    var data = scopeObj.rowData.data;
                    data.id = scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4,"id")[selectedType];
                    scopeObj.contextualActionButtonOnClick(data);
                  },
                  "skin": scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4, "skin")[selectedType])
                }
                record["btnDetails4"]["isVisible"] = !this.isEmptyNullUndefined(record["btnDetails4"].text);
                if(record["btnDetails4"]["isVisible"] && scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4, "entitlement_action")[selectedType])) {
                  scopeObj.getBtnEntitlement(transactions[i],scopeObj.getFieldValue(scopeObj.getFieldValue(scopeObj._tab6BtnContextualAction4, "id")[selectedType]),function(visibility){
                    if(visibility === true) {
                      record["btnDetails4"]["isVisible"] = true;
                    } else{
                      record["btnDetails4"]["isVisible"] = false;
                    }
                  });
                }
                else if(this.EntitlementUtils.isEntitled(this.getFieldValue(scopeObj._tab6BtnContextualAction4, "entitlement_key"))){
                   record["btnDetails4"] = {"isVisible":false};
                }
              }
              else{
                record["btnDetails4"] = {"isVisible":false};
              }
            }
            catch(e){
              record["btnDetails4"] = {"isVisible":false};
            }
            record["lblSeparator"] = {
              "text":".",
              "skin":scopeObj._sknRowSeperator
            };
            if(transactions[i]["installmentType"]!== undefined && transactions[i]["installmentType"]!== null)
            {
              if(transactions[i]["installmentType"].toUpperCase() == this.transactionListTypes[typeKey2].value.toUpperCase())
                section2Array.push(record);
              else if(transactions[i]["installmentType"].toUpperCase() == this.transactionListTypes[typeKey1].value.toUpperCase())
                section1Array.push(record);
            }
            else
            {
              section3Array.push(record);
            }
          }
          if(section1Array.length == 0){
            var sectionData = [
              [
                {"lblTransactionHeader":{
                   "text": kony.i18n.getLocalizedString("i18n.AccountSummary.paidInstallments"),
                  "skin" : this._sknPostedLabel
                }},section2Array
              ]
            ]
            }
          else if(section2Array.length == 0){
            var sectionData = [
              [
                {"lblTransactionHeader":{
                   "text": kony.i18n.getLocalizedString("i18n.AccountSummary.overdueInstallments"),
                  "skin" : this._sknPendingLabel
                }},section1Array
              ]
            ]
            }
          else{
            var sectionData = [
              [
                {"lblTransactionHeader":{
                   "text": kony.i18n.getLocalizedString("i18n.AccountSummary.overdueInstallments"),
                  "skin" : this._sknPendingLabel
                }},section1Array
              ]
              ,
              [
                {"lblTransactionHeader":{
                  "text": kony.i18n.getLocalizedString("i18n.AccountSummary.paidInstallments"),
                  "skin" : this._sknPostedLabel
                }},section2Array
              ]
            ];
          }
         if(section3Array.length!==0)
          {
            sectionData = section3Array;
          }
          this.view.segTransactions.widgetDataMap = {
            "btnRepeat": "btnRepeat",
            "lblNoteTitle": "lblNoteTitle",
            "lblNoteValue": "lblNoteValue",
            "lblFrequencyTitle": "lblFrequencyTitle",
            "lblFrequencyValue": "lblFrequencyValue",
            "lblRecurrenceTitle": "lblRecurrenceTitle",
            "lblRecurrenceValue": "lblRecurrenceValue",
            "btnDisputeTransaction": "btnDisputeTransaction",
            "btnDownload": "btnDownload",
            "data": "data",
            "btnViewRequests": "btnViewRequests",
            "imgError": "imgError",
            "imgWarning": "imgWarning",
            "lblDisputedWarning": "lblDisputedWarning",
            "btnEditRule": "btnEditRule",
            "btnPrint": "btnPrint",
            "cbxRememberCategory": "cbxRememberCategory",
            "flxActions": "flxActions",
            "flxActionsWrapper": "flxActionsWrapper",
            "flxAmount": "flxAmount",
            "flxBalance": "flxBalance",
            "flxCategory": "flxCategory",
            "flxDate": "flxDate",
            "flxDescription": "flxDescription",
            "flxDetail": "flxDetail",
            "flxDetailData": "flxDetailData",
            "flxDetailHeader": "flxDetailHeader",
            "btnDropdown": "btnDropdown",
            "flxIdentifier": "flxIdentifier",
            "flxInformation": "flxInformation",
            "flxLeft": "flxLeft",
            "flxMemo": "flxMemo",
            "flxRight": "flxRight",
            "flxSegTransactionHeader": "flxSegTransactionHeader",
            "flxSegTransactionRowSavings": "flxSegTransactionRowSavings",
            "flxSegTransactionRowSelected": "flxSegTransactionRowSelected",
            "flxSegTransactionRowWrapper": "flxSegTransactionRowWrapper",
            "flxSelectedRowWrapper": "flxSelectedRowWrapper",
            "flxToData": "flxToData",
            "flxDetails2": "flxDetails2",
            "flxType": "flxType",
            "flxDetails1": "flxDetails1",
            "flxTypeHeader": "flxTypeHeader",
            "flxWithdrawalAmountData": "flxWithdrawalAmountData",
            "flxDetails4": "flxDetails4",
            "flxDetails5": "flxDetails5",
            "flxDetails6": "flxDetails6",
            "flxDetails7": "flxDetails7",
            "flxDetails8": "flxDetails8",
            "flxDetails9": "flxDetails9",
            "flxDetails10": "flxDetails10",
            "flxWrapper": "flxWrapper",
            "imgCategoryDropdown": "imgCategoryDropdown",
            "imgType": "imgType",
            "lblType": "lblType",
            "lblAmount": "lblAmount",
            "lblBalance": "lblBalance",
            "lblCategory": "lblCategory",
            "lblDate": "lblDate",
            "lblDescription": "lblDescription",
            "lblTransactionDescription": "lblTransactionDescription",
            "lblIdentifier": "lblIdentifier",
            "lblSeparator": "lblSeparator",
            "lblSeparatorActions": "lblSeparatorActions",
            "lblSeparatorDetailData": "lblSeparatorDetailData",
            "lblSeparatorDetailHeader": "lblSeparatorDetailHeader",
            "lblDetails2Title": "lblDetails2Title",
            "lblDetails2Value": "lblDetails2Value",
            "lblTransactionHeader": "lblTransactionHeader",
            "lblDetails1Title": "lblDetails1Title",
            "lblDetails1Value": "lblDetails1Value",
            "lblDetails4Title": "lblDetails4Title",
            "lblDetails4Value": "lblDetails4Value",
            "lblDetails3Title": "lblDetails3Title",
            "lblDetails3Value": "lblDetails3Value",
            "lblDetails5Title": "lblDetails5Title",
            "lblDetails5Value": "lblDetails5Value",
            "lblDetails6Title": "lblDetails6Title",
            "lblDetails6Value": "lblDetails6Value",
            "lblDetails7Title": "lblDetails7Title",
            "lblDetails7Value": "lblDetails7Value",
            "lblDetails8Title": "lblDetails8Title",
            "lblDetails8Value": "lblDetails8Value",
            "lblDetails9Title": "lblDetails9Title",
            "lblDetails9Value": "lblDetails9Value",
            "lblDetails10Title": "lblDetails10Title",
            "lblDetails10Value": "lblDetails10Value",
            "txtMemo": "txtMemo",
            "CopyflxToHeader0g61ceef5594d41": "CopyflxToHeader0g61ceef5594d41",
            "CopylblToTitle0a2c47b22996e4f": "CopylblToTitle0a2c47b22996e4f",
            "flxBankName1": "flxBankName1",
            "flxBankName2": "flxBankName2",
            "flxCash": "flxCash",
            "flxCheck1": "flxCheck1",
            "flxCheck1Ttitle": "flxCheck1Ttitle",
            "flxCheck2": "flxCheck2",
            "flxCheck2Ttitle": "flxCheck2Ttitle",
            "flxCheckImage": "flxCheckImage",
            "flxCheckImage2Icon": "flxCheckImage2Icon",
            "flxCheckImageIcon": "flxCheckImageIcon",
            "flxRememberCategory": "flxRememberCategory",
            "flxSegCheckImages": "flxSegCheckImages", 
            "flxTotal": "flxTotal",
            "flxTotalValue": "flxTotalValue",
            "flxTransactionFee": "flxTransactionFee",
            "flxFrequencyTitle": "flxFrequencyTitle",
            "flxRecurrenceTitle": "flxRecurrenceTitle",
            "flxDetails3": "flxDetails3",
            "flxWithdrawalAmount": "flxWithdrawalAmount",
            "flxWithdrawalAmountCash": "flxWithdrawalAmountCash",
            "flxWithdrawalAmountCheck1": "flxWithdrawalAmountCheck1",
            "flxWithdrawalAmountCheck2": "flxWithdrawalAmountCheck2",
            "imgCheckimage": "imgCheckimage",
            "imgCheckImage1Icon": "imgCheckImage1Icon",
            "imgCheckImage2Icon": "imgCheckImage2Icon",
            "imgRememberCategory": "imgRememberCategory",
            "lblTransactionFeeKey": "lblTransactionFeeKey",
            "lblTransactionFeeValue": "lblTransactionFeeValue",
            "lblBankName1": "lblBankName1",
            "lblBankName2": "lblBankName2",
            "lblCheck1Ttitle": "lblCheck1Ttitle",
            "lblCheck2Ttitle": "lblCheck2Ttitle",
            "lblRememberCategory": "lblRememberCategory",
            "lblSeparator2": "lblSeparator2",
            "lblSeperatorhor1": "lblSeperatorhor1",
            "lblSeperatorhor2": "lblSeperatorhor2",
            "lblSeperatorhor3": "lblSeperatorhor3",
            "lblSeperatorhor4": "lblSeperatorhor4",
            "lblSeperatorhor5": "lblSeperatorhor5",
            "lblTotalValue": "lblTotalValue",
            "lblWithdrawalAmount": "lblWithdrawalAmount",
            "lblWithdrawalAmountCash": "lblWithdrawalAmountCash",
            "lblWithdrawalAmountCheck1": "lblWithdrawalAmountCheck1",
            "lblWithdrawalAmountCheck2": "lblWithdrawalAmountCheck2",
            "segCheckImages": "segCheckImages",
            "txtFieldMemo": "txtFieldMemo",
            "lblToTitle2": "lblToTitle2",
            "lblTypeTitle2": "lblTypeTitle2",
            "lblWithdrawalAmountTitle2": "lblWithdrawalAmountTitle2",
            "btnDetails1": "btnDetails1",
            "btnDetails2": "btnDetails2",
            "btnDetails3": "btnDetails3",
            "btnDetails4": "btnDetails4",
            "accountId" : scopeObj.getFieldValue(scopeObj._TLaccountId),
            "accountType" : scopeObj.getFieldValue(scopeObj._TLaccountType)
          };
          this.view.segTransactions.rowTemplate = this.rowTemplate;
          this.view.segTransactions.sectionHeaderTemplate = "ICFlxSegTransactionHeader";
          this.view.segTransactions.backgroundColor = "f8f7f8";
          this.view.segTransactions.removeAll(); 
          this.view.segTransactions.setData(sectionData);
          try{
            this.adjustScreen();
          }
          catch(e)
          {
            kony.print(e);
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the transactions in segment",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getFormattedData
     * Responsible to get the formatted data to be assigned.
     * @param value{string} - value to be be formatted
     * @param type{string} - type of the value passed
     * @param currencyCode{string} - currency code to be appended for amount
     * @return : {JSONObject} - jsonvalue of formatted value and skin
     */
    getFormattedData : function(value,type,currencyCode){
      var self = this;
      try
      {
        if(this.isEmptyNullUndefined(currencyCode))
          currencyCode = this.getFieldValue(this._currencyCode);
        return this.FormatUtils.formatText(value,type,this.formatSkins,this.formattingJSON,currencyCode);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in Formating the data.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component resetSortingImages
     * Set the sorting images in the header
     */
    resetSortingImages: function(){
      var self =this;
      try
      {
        this.view.imgColumn1Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn1Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn2Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn2Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn3Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn3Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn4Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn4Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn5Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn5Left.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn6Right.src = JSON.parse(this._iconColumnSort).img;
        this.view.imgColumn6Left.src = JSON.parse(this._iconColumnSort).img;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the sorting images",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component flxColumn1onClick
     * on click for sort on the first column
     */
    flxColumn1onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn1,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn1,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn1Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn1Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img,
          this.criteria["order"] = "asc";
          this.view.flxColumn1.accessibilityConfig = {
            "a11yLabel": "Sort by oldest transaction first",
            "a11yARIA": {
                role : "button",
            }
        }
        }
        else if(this.view.imgColumn1Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img,
          this.view.flxColumn1.accessibilityConfig = {
            "a11yLabel": "Sort by recent transaction first",
            "a11yARIA": {
                role : "button",
            }
        }
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img,
          this.view.flxColumn1.accessibilityConfig = {
            "a11yLabel": "Sort by oldest transaction first",
            "a11yARIA": {
                role : "button",
            }
        }
        }
        this.resetSortingImages();
        this.view.imgColumn1Right.src = image;
        this.view.imgColumn1Left.src = image;
        if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 1 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component flxColumn2onClick
     * on click for sort on the second column
     */
    flxColumn2onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn2,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn2,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn2Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn2Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
        }
        else if(this.view.imgColumn2Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
        }
        this.resetSortingImages();
        this.view.imgColumn2Right.src = image;
        this.view.imgColumn2Left.src = image;
        if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 2 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component flxColumn3onClick
     * on click for sort on the third column
     */
    flxColumn3onClick: function(){
      var self =this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn3,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn3,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn3Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn3Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
          this.view.flxColumn3.accessibilityConfig = {
            "a11yLabel": "Sort by oldest From Date",
            "a11yARIA": {
                role: "button",
            }
          }
        }
        else if(this.view.imgColumn3Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img,
          this.view.flxColumn3.accessibilityConfig = {
            "a11yLabel": "Sort by newest From Date",
            "a11yARIA": {
                role: "button",
            }
          }
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img,
          this.view.flxColumn1.accessibilityConfig = {
            "a11yLabel": "Sort by oldest From Date",
            "a11yARIA": {
                role: "button",
            }
          }
        }
        this.resetSortingImages();
        this.view.imgColumn3Right.src = image;
        this.view.imgColumn3Left.src = image;
        if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 3 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component flxColumn4onClick
     * on click for sort on the fourth column
     */
    flxColumn4onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn4,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn4,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn4Right.src === JSON.parse(this._iconColumnSort).img  || this.view.imgColumn4Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
          this.view.flxColumn4.accessibilityConfig = {
            "a11yLabel": "Sort by lowest amount",
            "a11yARIA": {
                role : "button",
            }
          }
        }
        else if(this.view.imgColumn4Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
          this.view.flxColumn4.accessibilityConfig = {
            "a11yLabel": "Sort by highest amount",
            "a11yARIA": {
                role : "button",
            }
          }
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.view.flxColumn4.accessibilityConfig = {
            "a11yLabel": "Sort by lowest Amount",
            "a11yARIA": {
                role : "button",
            }
          }
        }
        this.resetSortingImages();
        this.view.imgColumn4Right.src = image;
        this.view.imgColumn4Left.src = image;
        if (this.selectedTab == 6) {
          this.getTab6Transactions();
          if (this.view.imgColumn4Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn4Right.src === JSON.parse(this._iconColumnSortDesc).img) {
            this.view.flxColumn4.accessibilityConfig = {
              "a11yLabel": "Sort by oldest To Date",
              "a11yARIA": {
                role: "button",
              }
            }
          }
          else {
            this.view.flxColumn4.accessibilityConfig = {
              "a11yLabel": "Sort by newest To Date",
              "a11yARIA": {
                role: "button",
              }
            }
        }
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 4 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },   
    /**
     * Component flxColumnon5Click
     * on click for sort on the fifth column
     */
    flxColumn5onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn5,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn5,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn5Right.src === JSON.parse(this._iconColumnSort).img  || this.view.imgColumn5Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
        }
        else if(this.view.imgColumn5Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
        }
        this.resetSortingImages();
        this.view.imgColumn5Right.src = image;
        this.view.imgColumn5Left.src = image;
        if (this.selectedTab == 6) {
          this.getTab6Transactions();
          if (this.view.imgColumn5Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn5Right.src === JSON.parse(this._iconColumnSortDesc).img) {
            this.view.flxColumn5.accessibilityConfig = {
              "a11yLabel": "Sort by lowest amount",
              "a11yARIA": {
                role: "button",
              }
            }
          } else {
            this.view.flxColumn5.accessibilityConfig = {
              "a11yLabel": "Sort by highest amount",
              "a11yARIA": {
                role: "button",
              }
            }
          }
        }
        else {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 5 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },   
    /**
     * Component flxColumn6onClick
     * on click for sort on the sixth column
     */
    flxColumn6onClick: function(){
      var self = this;
      try
      {
        var image= JSON.parse(this._iconColumnSort).img;
        this.criteria["sortBy"] = this.getFieldValue(this._dataGridColumn6,"sortBy");
		if(this.selectedTab==6)
          {
             this.criteria["sortBy"] = this.getFieldValue(this._tab6DataGridColumn6,"sortBy");
          }
        this.criteria["order"] = "desc";
		this.state = "sortedData";
        if(this.view.imgColumn6Right.src === JSON.parse(this._iconColumnSort).img || this.view.imgColumn6Right.src === JSON.parse(this._iconColumnSortDesc).img)
        {
          image = JSON.parse(this.iconColumnSortAsc).img
          this.criteria["order"] = "asc";
        }
        else if(this.view.imgColumn6Right.src === JSON.parse(this.iconColumnSortAsc).img)
        {
          image = JSON.parse(this.iconColumnSortDesc).img
        }
        else
        {
          image = JSON.parse(this.iconColumnSortAsc).img
        }
        this.resetSortingImages();
        this.view.imgColumn6Right.src = image;
        this.view.imgColumn6Left.src = image;
         if(this.selectedTab==6)
        {
          this.getTab6Transactions();
        }
        else
        {
          if(this._dataAvailability == "Service calls by component")
            this.getTransactionList();
          else
            this.dataRequestCallback();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria and invoking column 6 related service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },   
    /**
     * Component getCriteria
     * Parse the criteria from configuration
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria:function(){
      var self = this;
      try{
        return this.criteria;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in returning criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
      return "";
    },
    /**
     * Component onToggle
     * Responsible for expanding and collapsing rows in the segment based on selection
     */
    onToggle: function(widgetInfo, segInfo){
      var self = this;
      try
      {
        var scopeObj = this;
        var index = [segInfo.rowIndex, segInfo.sectionIndex];
        var sectionIndex = index[1];
        var widgetPathSelected = "flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.btnDropdown";
        var widgetPathUnselected = "flxSegTransactionRowWrapper.btnDropdown";
        var rowIndex = index[0];
        var data = scopeObj.view.segTransactions.data;
        var rowData = data[sectionIndex][1][rowIndex];
        self.rowData = rowData;
        var section = data.length;
        var collapseAll = function(segments, section) {
          segments.forEach(function(segment, i) {
            segment.template = scopeObj.rowTemplate;
            segment.btnDropdown["skin"] = JSON.parse(scopeObj._iconRowExpand)["skin"];
            segment.btnDropdown["text"] = JSON.parse(scopeObj._iconRowExpand)["vizIcon"];
            scopeObj.view.segTransactions.setDataAt(segment, i, section);
          });
        };
        if(scopeObj._transDetailsVisibility){
          if(rowData.template != this.expandedTemplate){
            while (section--) {
              collapseAll(data[section][1], section);
            }
            data[sectionIndex][1][rowIndex].btnDropdown["skin"] = JSON.parse(scopeObj._iconRowCollapse)["skin"];
            data[sectionIndex][1][rowIndex].btnDropdown["text"] = JSON.parse(scopeObj._iconRowCollapse)["vizIcon"];
            data[sectionIndex][1][rowIndex].btnDropdown.accessibilityConfig = {
              "a11yLabel": "Hide Details",
              "a11yARIA": {
                role: "button",
                "aria-expanded": true,
                "aria-live": "off"
              }
            };
            data[sectionIndex][1][rowIndex].template = this.expandedTemplate;
            scopeObj.view.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
			    if(this._GAserviceEnable && this.selectedTab!==6)
              {
                this.index = index;
                this.context.transactionId = rowData.data.transactionId;
                this.getAttachments();
              }
            else
              {
                 scopeObj.view.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex); 
              }
              kony.application.dismissLoadingScreen();
              if (kony.application.getCurrentBreakpoint() == "640") {
                scopeObj.view.segTransactions.rowTemplate = "ICFlxSegTransactionRowSelectedMobile";
                scopeObj.view.segTransactions.setActive(rowIndex,sectionIndex,"ICFlxSegTransactionRowSelectedMobile.ICFlxSegTransactionRowSelectedMobileGroup.flxMain.flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.btnDropdown");
              } else {
                scopeObj.view.segTransactions.rowTemplate = "ICFlxSegTransactionRowSelected";
                scopeObj.view.segTransactions.setActive(rowIndex,sectionIndex,"ICFlxSegTransactionRowSelected.ICFlxGroupSegTransactionRowSelected.flxMain.flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.btnDropdown");
              }
          }
          else{
            data[sectionIndex][1][rowIndex].btnDropdown["skin"] = JSON.parse(scopeObj._iconRowExpand)["skin"];
            data[sectionIndex][1][rowIndex].btnDropdown["text"] = JSON.parse(scopeObj._iconRowExpand)["vizIcon"];
            data[sectionIndex][1][rowIndex].btnDropdown.accessibilityConfig = {
              "a11yLabel": "Show more details",
              "a11yARIA": {
                role: "button",
                "aria-expanded": false,
                "aria-live": "off"
              }
            };
            data[sectionIndex][1][rowIndex].template = this.rowTemplate;
            scopeObj.view.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            if (kony.application.getCurrentBreakpoint() == "640") {
              scopeObj.view.segTransactions.rowTemplate = "ICFlxSegTransactionsRowSavingsMobile";
              scopeObj.view.segTransactions.setActive(rowIndex, sectionIndex, "ICFlxSegTransactionsRowSavingsMobile.ICFlxSegTransactionsRowSavingsMobileGroup.flxSegTransactionRowWrapper.btnDropdown");
            } else {
              scopeObj.view.segTransactions.rowTemplate = "ICFlxSegTransactionRowSavings";
              scopeObj.view.segTransactions.setActive(rowIndex, sectionIndex, "ICFlxSegTransactionRowSavings.flxGroupTransactionRowSavings.flxSegTransactionRowWrapper.btnDropdown");
            }
          }
        }
       // scopeObj.adjustScreen();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the data in details view",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
      
    },
	/**
     * Component getAttachments
     * Responsible for getting attachments from service response
     */
	getAttachments: function()
    {
      var self =this;
      try
      {
        this.requestStart();
        var criteriaObject = JSON.parse(this._GAcriteria);
        for(var key in  criteriaObject){
          criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
        }
        if(this.fetchAttachments && this._GAobjectName && this._GAoperationName){
          this.transactionListDAO.fetchAttachments(this.fetchAttachments,this._GAoperationName,this._GAobjectName,criteriaObject,this.setRowData,this.setRowData);
        }
        else{
          this.setRowData();
        }    
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in doing service call to  Get attachments",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
	/**
     * Component getAttachments
     * Responsible for setting row data with attachments.
	 * @param response {JSON} service response with attachments for particular transaction.
     */
    setRowData: function(response){
      var scopeObj = this;
      try
      {
        var index = scopeObj.index;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = scopeObj.view.segTransactions.data;
        var rowData = data[sectionIndex][1][rowIndex];
        var key;
        var attachments;       
        key = scopeObj.getFieldValue(scopeObj._btnContextualAction1,"attachments");
        attachments = response[key];
        if(attachments!== null && attachments!== undefined)
        {
          rowData["btnDetails1"].text = rowData["btnDetails1"].text.split(" ")[0] + " ("+attachments.length+")";
          rowData["data"][key] =  attachments;
        }
        key = scopeObj.getFieldValue(scopeObj._btnContextualAction2,"attachments");
        attachments = response[key];
        if(attachments!== null && attachments!== undefined)
        {
          rowData["btnDetails2"].text = rowData["btnDetails2"].text.split(" ")[0] + " ("+attachments.length+")";
          rowData["data"][key] =  attachments;
        }
        key = scopeObj.getFieldValue(scopeObj._btnContextualAction3,"attachments");
        attachments = response[key];
        if(attachments!== null && attachments!== undefined)
        {
          rowData["btnDetails3"].text = rowData["btnDetails3"].text.split(" ")[0] + " ("+attachments.length+")";
          rowData["data"][key] =  attachments;
        }
        key = scopeObj.getFieldValue(scopeObj._btnContextualAction4,"attachments");
        attachments = response[key];
        if(attachments!== null && attachments!== undefined)
        {
          rowData["btnDetails4"].text = rowData["btnDetails4"].text.split(" ")[0] + " ("+attachments.length+")";
          rowData["data"][key] =  attachments;
        }
        scopeObj.view.segTransactions.setDataAt(rowData, rowIndex, sectionIndex); 
        this.requestEnd();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in doing setting row data",
              "errorLevel" : "Business",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },
    /**
     * Component setIcons
     * responsible for setting the given icons
     */
    setIcons: function(){
      var self = this;
      try
      {
        var img = JSON.parse(this._iconSearch)["img"];
        if(!this.isEmptyNullUndefined(img)){
          this.view.imgMobileSearch.src = img;
          this.view.imgSearch.src = img;
          this.view.imgMobileSearchIcon.setVisibility(false);
          this.view.imgSearchIcon.setVisibility(false);
          this.view.imgMobileSearch.setVisibility(true);
          this.view.imgSearch.setVisibility(true);
        }
        else{
          this.view.imgMobileSearch.setVisibility(false);
          this.view.imgSearch.setVisibility(false);
          this.view.imgMobileSearchIcon.setVisibility(true);
          this.view.imgSearchIcon.setVisibility(true);
          this.view.imgMobileSearchIcon.text = JSON.parse(this._iconSearch)["vizIcon"];
          this.view.imgMobileSearchIcon.skin = JSON.parse(this._iconSearch)["skin"];
          this.view.imgSearchIcon.text = JSON.parse(this._iconSearch)["vizIcon"];
          this.view.imgSearchIcon.skin = JSON.parse(this._iconSearch)["skin"];
        }
        img = this.isEmptyNullUndefined(this._iconDownload)?JSON.parse(this._iconDownload)["img"]:"";
        if(!this.isEmptyNullUndefined(img)){
          this.view.imgDownload.src = img;
          this.view.imgDownloadIcon.setVisibility(false);
          this.view.imgDownload.setVisibility(true);
        }
        else{
          this.view.imgDownload.setVisibility(false);
          this.view.imgDownloadIcon.setVisibility(true);
         // this.view.imgDownloadIcon.text = JSON.parse(this._iconSearch)["vizIcon"];
          //this.view.imgDownloadIcon.skin = JSON.parse(this._iconSearch)["skin"];
        }
        img = JSON.parse(this._iconPrint)["img"];
        if(!this.isEmptyNullUndefined(img)){
          this.view.imgPrint.src = img;
          this.view.imgPrintIcon.setVisibility(false);
          this.view.imgPrint.setVisibility(true);
        }
        else{
          this.view.imgPrint.setVisibility(false);
          this.view.imgPrintIcon.setVisibility(true);
          this.view.imgPrintIcon.text = JSON.parse(this._iconSearch)["vizIcon"];
          this.view.imgPrintIcon.skin = JSON.parse(this._iconSearch)["skin"];
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the icons.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setCriteria
     * Update the criteria based on accountType ans filter
     * criteria {string} - value collected from exposed contract
     */
    setCriteria:function(criteria){
      var self = this;
      try
      {
        var criteriaObject = JSON.parse(this._TLcriteria);
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
        this.criteria = criteriaObject;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getProcessedText
     * Pass the text to format util to obtained the processed value.
     * text {string} - value to be processed
     * @return : {string} - processed value
     */
    getProcessedText:function(text){
      return this.parserUtilsManager.getParsedValue(text);
    },
    /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
        return true;
      return false;
    },
    onBreakpointChange: function(){
      var self = this;
      try
      {
		    this.setFilterData();
        if(kony.application.getCurrentBreakpoint() == "640"){
          this.rowTemplate = "ICFlxSegTransactionsRowSavingsMobile";
          this.expandedTemplate = "ICFlxSegTransactionRowSelectedMobile";
        }
        else{
          this.rowTemplate = "ICFlxSegTransactionRowSavings";
          this.expandedTemplate = "ICFlxSegTransactionRowSelected";
        }
        if(self.selectedTab === 6)
          this.updateTab6Transactions();
        else
          this.updateTransactions();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in change of breakpoint",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component enableSearchButton
     * This method is used enable the search button and change the skins
     */
    enableSearchButton: function () {
      var self = this;
      try
      {
        this.view.btnSearch.skin = "sknbtnSSPffffff0278ee15pxbr3px";
        this.view.btnSearch.setEnabled(true);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in enabling search button",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component disableSearchButton
     * This method is used disable the search button and change the skins
     */
    disableSearchButton: function () {
      var self = this;
      try
      {
        this.view.btnSearch.setEnabled(false);
        this.view.btnSearch.skin="sknBtnBlockedSSPFFFFFF15Px";
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in disabling search button.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
     /**
     * Component enableSearchButton
     * This method is used enable the search button for blocked funds and change the skins
     */
    enableSearchButtonBF: function () {
      var self = this;
      try
      {
        this.view.btnBFSearch.skin = "sknbtnSSPffffff0278ee15pxbr3px";
        this.view.btnBFSearch.setEnabled(true);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in enabling blocked funds search button",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component disableSearchButtonBF
     * This method is used to disable the search button for blocked funds and change the skins
     */
    disableSearchButtonBF: function () {
      var self = this;
      try
      {
        this.view.btnBFSearch.setEnabled(false);
        this.view.btnBFSearch.skin="sknBtnBlockedSSPFFFFFF15Px";
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in disabling blocked funds search button.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component showByDateWidgets
     * This method is used to turn on the visibility of Date Widgets.
     */ 
    showByDateWidgets: function () {
      var self = this;
      try
      {
        this.view.lblByDate.setVisibility(true);
        this.view.flxByDate.setVisibility(true);
        this.view.flxBlankSpace.setVisibility(false);
                  
         var currentBreakpoint = kony.application.getCurrentBreakpoint();
		if(currentBreakpoint == 640){
             this.view.flxSearchContainerWrapper.height ="650dp";
          this.view.flxRightSearchWrapper.height ="400dp";
        } else {
       this.view.flxBlankSpace.setVisibility(true);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in showing the date widgets",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component showByDateWidgets
     * This method is used to turn off the visibility of Date Widgets.
     */
    hideByDateWidgets: function () {
      var self = this;
      try
      {
        this.view.lblByDate.setVisibility(false);
        this.view.flxByDate.setVisibility(false);
         
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
		if(currentBreakpoint == 640){
               this.view.flxSearchContainerWrapper.height ="570dp";
          this.view.flxRightSearchWrapper.height ="300dp";
        } 
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in hiding date widgets",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSearchVisible
     * This method is used to turn on and turn off the visiblibity of search flex.
     * @param : isVisible {Boolean}  - used to decide the visibilty of search flex.
     */ 
    setSearchVisible: function (isVisible) {
      var self = this;
      try
      {
        this.setSearchUI();
        this.view.flxSearchContainer.setVisibility(isVisible);
        if(this.accountType=="Savings"|| this.accountType=="Checking")
        {
          this.view.flxAccountType.setVisibility(true)
        }
        else
        {
          this.view.flxAccountType.setVisibility(false)
        }
        this.view.imgSearch.src = (isVisible || this.view.flxSearchResults.isVisible) ? "selecetd_search.png": "search_blue.png";		
        this.adjustScreen();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the search visiblity on or off.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setSearchResultsVisible
     * This method is used to turn on and turn off the visiblibity of search results flex.
     * @param : isVisible {Boolean}  - used to decide the visibilty of search results flex.
     */ 
    setSearchResultsVisible : function(isVisible) {
      var self = this;
      try
      {
        this.view.imgSearch.src = (isVisible || this.view.flxSearchContainer.isVisible) ? "selecetd_search.png": "search_blue.png";
        //this.view.flxSeparatorSearch.setVisibility(isVisible);
        this.view.flxSearchResults.setVisibility(isVisible);
        if(isVisible === true){
          this.view.lblYouHaveSearchedFor.setFocus(true);
        }
        this.adjustScreen();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the search results visibility on or off.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * component hideSearchFlex
     * This method is used to hide both search flex and search results flex.
     */ 
    hideSearchFlex: function() {
      var self = this;
      try
      {
        this.setSearchVisible(false);
        this.setSearchResultsVisible(false);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in hiding the search flexes",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component objectToListBoxArray
     * This method converts given object to list box array
     * @param : obj {JSONObject}  - object used to convert to list box array
     * @return : list {Array} - list box array
     */ 
    objectToListBoxArray: function(obj) {
      var self = this;
      try
      {
        var list = [];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            list.push([key, kony.i18n.getLocalizedString(obj[key])]);
          }
        }
        return list;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in converting object to list box",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component updateSearchViewModel
     * This method updates the locally maintained JSON searchViewModel with 
     * latest values of search parameters.
     */ 
    updateSearchViewModel: function() {
      var self = this;
      try
      {
        this.searchViewModel.keyword = this.view.txtKeyword.text.trim();
        this.searchViewModel.transactionTypeSelected = this.view.lstbxTransactionType.selectedKey;
        this.searchViewModel.timePeriodSelected = this.view.lstbxTimePeriod.selectedKey;
        this.searchViewModel.fromCheckNumber = this.view.txtCheckNumberFrom.text.trim();
        this.searchViewModel.toCheckNumber = this.view.txtCheckNumberTo.text.trim();
        this.searchViewModel.fromDate = this.view.calDateFrom.dateComponents;
        this.searchViewModel.fromAmount = this.view.txtAmountRangeFrom.text.trim();
        this.searchViewModel.toAmount = this.view.txtAmountRangeTo.text.trim();
        this.searchViewModel.toDate = this.view.calDateTo.dateComponents;
        this.searchViewModel.bfKeyword = this.view.txtBFKeyword.text;
        this.searchViewModel.bfReferenceNumber = this.view.txtBFReferenceNumber.text;
        this.searchViewModel.bfFromDate = this.view.calBFDateFrom.dateComponents;
        this.searchViewModel.bfToDate = this.view.calBFDateTo.dateComponents;
        return this.searchViewModel;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the valuses of fields in search Json",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component renderSearchForm
     * This method is used to populate values in respective search parameters from 
     * locally maintained JSON searchViewModel.
     * @param : searchViewModel {JSONObject} - locally maintained search parameters.	
     */ 
    renderSearchForm: function(searchViewModel) {
      var self = this
      try
      {
        this.setSearchVisible(true);
        this.setSearchResultsVisible(false);
        this.view.txtKeyword.text = searchViewModel.keyword;
        this.view.lstbxTransactionType.masterData = searchViewModel.transactionTypes;
        this.view.lstbxTransactionType.selectedKey = searchViewModel.transactionTypeSelected;
        this.view.lstbxTimePeriod.masterData = searchViewModel.timePeriods;
        this.view.lstbxTimePeriod.selectedKey = searchViewModel.timePeriodSelected;
        this.view.txtCheckNumberFrom.text = searchViewModel.fromCheckNumber;
        this.view.txtCheckNumberTo.text = searchViewModel.toCheckNumber;
        this.view.txtAmountRangeFrom.text = searchViewModel.fromAmount;
        this.view.txtAmountRangeTo.text = searchViewModel.toAmount;
        var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?><`':;\"\\";
		var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
		this.view.txtAmountRangeFrom.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
		this.view.txtAmountRangeTo.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
        this.view.calDateFrom.dateComponents = searchViewModel.fromDate;
        this.view.calDateTo.dateComponents = searchViewModel.toDate;
        this.view.txtBFKeyword.text = searchViewModel.bfKeyword;
        this.view.txtBFReferenceNumber.text = searchViewModel.bfReferenceNumber;
        this.view.calBFDateFrom.dateComponents = searchViewModel.bfFromDate;
        this.view.calBFDateTo.dateComponents = searchViewModel.bfToDate;
        this.view.lblCurrencySymbolFrom.text= this.FormatUtils.getCurrencySymbol(this.getFieldValue(this._currencyCode));
        this.view.lblCurrencySymbolTo.text = this.FormatUtils.getCurrencySymbol(this.getFieldValue(this._currencyCode));
        this.onTimePeriodChange();
        this.checkSearchButtonState();
        this.checkBlockedFundsSearchButtonState();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the values of search parameters",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * component clearSearch
     * This method is used to clear all the values of search params in UI.
     */ 
    clearSearch: function() {
      var self = this;
      try
      {
        var today = new Date();
        this.view.txtKeyword.text = ""
        this.view.lstbxTransactionType.selectedKey = this.searchConstants.BOTH;
        this.view.lstbxTimePeriod.selectedKey = this.searchConstants.CHOOSE_TIME_RANGE;
        this.onTimePeriodChange();
        this.view.txtCheckNumberTo.text = ""
        this.view.txtCheckNumberFrom.text = ""
        this.view.txtAmountRangeTo.text = ""
        this.view.txtAmountRangeFrom.text = ""
        this.view.calDateFrom.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.calDateFrom.validEndDate = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.calDateTo.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.calDateTo.validEndDate = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.txtBFKeyword.text = "";
        this.view.txtBFReferenceNumber.text = "";
        this.view.calBFDateFrom.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        this.view.calBFDateTo.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];  
        //this.view.flxPaginationWrapper.setVisibility(true);
        if(kony.application.getCurrentBreakpoint() !== 640){
        this.view.paginationFooter.setVisibility(true);
		this.view.paginationHeader.setVisibility(true);
        // this.cacheUtils.data = [];
        // this.tab6CacheUtils.data = [];
		}
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in clearing search fields",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }

    }, 
    /**
     * Component setSearchUI
     * This method is used to set the static labels in the search UI
     */ 
    setSearchUI: function(){
      var self = this;
      try
      {
        this.view.lblByKeyword.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ByKeyword");
        this.view.lblByTransactionType.text =  kony.i18n.getLocalizedString("i18n.AccountsDetails.ByTransactionType");
        this.view.lblByTimePeriod.text =  kony.i18n.getLocalizedString("i18n.AccountsDetails.ByTimePeriod");
       this.view.lblByCheckNumber.text =  kony.i18n.getLocalizedString("i18n.AccountsDetails.ByCheckNumber");
        this.view.lblByAmountRange.text =  kony.i18n.getLocalizedString("i18n.AccountsDetails.ByAmountRange");
        this.view.lblByDate.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ByDate");
        this.view.txtKeyword.placeholder = kony.i18n.getLocalizedString("i18n.AccountsDetails.ByKeyword");
        this.view.txtCheckNumberFrom.placeholder = kony.i18n.getLocalizedString("i18n.AccountsDetails.ByCheckNumber");
        this.view.txtCheckNumberTo.placeholder = kony.i18n.getLocalizedString("i18n.AccountsDetails.ByCheckNumber");
        if(!this.isEmptyNullUndefined(this._sknSearchLabel)){
          this.view.lblByKeyword.skin = this._sknSearchLabel;
          this.view.lblByTransactionType.skin = this._sknSearchLabel;
          this.view.lblByTimePeriod.skin = this._sknSearchLabel;
          this.view.lblByCheckNumber.skin = this._sknSearchLabel;
          this.view.lblByAmountRange.skin = this._sknSearchLabel;
          this.view.lblByDate.skin = this._sknSearchLabel;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchTextbox)){
          this.view.txtKeyword.skin = this._sknSearchTextbox;
          this.view.txtAmountRangeFrom.skin = this._sknSearchTextbox;
          this.view.txtAmountRangeTo.skin = this._sknSearchTextbox;
          this.view.txtCheckNumberFrom.skin = this._sknSearchTextbox;
          this.view.txtCheckNumberTo.skin = this._sknSearchTextbox;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchActiveTextbox)){
          this.view.txtKeyword.focusSkin = this._sknSearchActiveTextbox;
          this.view.txtAmountRangeFrom.focusSkin = this._sknSearchActiveTextbox;
          this.view.txtAmountRangeTo.focusSkin = this._sknSearchActiveTextbox;
          this.view.txtCheckNumberFrom.focusSkin = this._sknSearchActiveTextbox;
          this.view.txtCheckNumberTo.focusSkin = this._sknSearchActiveTextbox;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchDropdown)){
          this.view.lstbxTimePeriod.skin = this._sknSearchDropdown;
          this.view.lstbxTransactionType.skin = this._sknSearchDropdown;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchActiveDropdown)){
          this.view.lstbxTimePeriod.focusSkin = this._sknSearchActiveDropdown;
          this.view.lstbxTransactionType.focusSkin = this._sknSearchActiveDropdown;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchCalendar)){
          this.view.calDateFrom.skin = this._sknSearchCalendar;
          this.view.calDateTo.skin = this._sknSearchCalendar;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchActiveCalendar)){
          this.view.calDateFrom.focusSkin = this._sknSearchActiveCalendar;
          this.view.calDateTo.skin = this._sknSearchActiveCalendar;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchButton)){
          this.view.btnSearch.skin = this._sknSearchButton;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchButtonHover)){
          this.view.btnSearch.hoverSkin = this._sknSearchButtonHover;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchCancelButton)){
          this.view.btnCancel.skin = this._sknSearchCancelButton;
        }
        if(!this.isEmptyNullUndefined(this._sknSearchCancelButtonHover)){
          this.view.btnCancel.hoverSkin = this._sknSearchCancelButtonHover;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the search UI with default properties",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component updateSearchTransactionView
     * This method is used to update the UI of search flexes based upon search performed 
     * or not and assign actions to flxSearch.
     */ 
    updateSearchTransactionView: function(data) {
      var self = this;
      try
      {
        this.view.flxSearch.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Search");
        this.view.flxSearchMobile.onClick = function() {
          if (self.searchViewModel.visible === true) {
            self.searchViewModel.visible = false;
            self.setSearchVisible(false);
          } else {
            self.searchViewModel.visible = true;
            self.setSearchVisible(true);
          }
        //  self.view.flxBlankSpace.setVisibility(false);
           var currentBreakpoint = kony.application.getCurrentBreakpoint();
          if(currentBreakpoint == 640){
             self.view.flxBlankSpace.setVisibility(false);
            self.view.flxSearchContainerWrapper.height ="570dp";
          self.view.flxRightSearchWrapper.height ="300dp";
          } else {
             self.view.flxBlankSpace.setVisibility(true);
          }
        };
        this.view.flxSearch.onClick = function() {
          if (self.searchViewModel.visible === true) {
            self.searchViewModel.visible = false;
            self.setSearchVisible(false);
          } else {
            self.searchViewModel.visible = true;
            self.setSearchVisible(true);
          }
          self.view.flxBlankSpace.setVisibility(true);
        };
        this.view.flxPrint.onClick = function(){
          self.printTransactionList(self.view.segTransactions.data);
        };
        this.view.flxPrint0f53bea379ac04f.onClick = function(){
          self.printTransactionList(self.view.segTransactions.data);
        };
         this.view.flxDownload0c977cf70d5d549.onClick = function() {
                    var transactionType = "";
                    if (self.searchViewModel.searchPerformed === false) {
                        if (self.selectedTab === 6) {
                            var data = self.getFieldValue(self._tab6Criteria, "requestPayoad");
                            transactionType = data.transactionType;
                        } else {
                            var data = self.getFieldValue(self["_filterTab" + self.selectedTab], "requestPayoad");
                            transactionType = data.transactionType;
                        }
                        self.downloadTransactionList(transactionType);
                    } else {
                        self.downloadTransactionList(self.searchViewModel);
                    }
                };
        this.view.flxDownload.onClick = function(){
          var transactionType="";
          if(self.searchViewModel.searchPerformed === false)
          {
            if(self.selectedTab === 6)
            {
              var data = self.getFieldValue(self._tab6Criteria,"requestPayoad");
              transactionType = data.transactionType;
            }
            else
            {
              var data = self.getFieldValue(self["_filterTab"+self.selectedTab],"requestPayoad");
              transactionType = data.transactionType;
            }
            self.downloadTransactionList(transactionType);
          }
          else
          {
            self.downloadTransactionList(self.searchViewModel);
          }
          if(kony.application.getCurrentForm().id === "frmAccountsDetails"){
            if(kony.application.getCurrentForm().flxSearchDownloadTransaction){
              kony.application.getCurrentForm().flxSearchDownloadTransaction.height = "100%";
            }
          }
          
        };
        if (this.searchViewModel.visible && !this.searchViewModel.searchPerformed) {
          this.renderSearchForm(this.searchViewModel);
        } else if (this.searchViewModel.visible && this.searchViewModel.searchPerformed) {
          this.showSearchResults(this.searchViewModel);
        } else {
          this.hideSearchFlex();
        }
        this.bindSearchFormActions();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the search transction view and setting actions",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component showSearchResults
     * This method is used to assign actions to btnModifySearch and btnClearSearch and
     * and invoke other methods to update the UI in searchResults flex.
     * @param : searchViewModel {JSONObject} - locally maintained search parameters.	
     */ 
    showSearchResults: function(searchViewModel) {
      var self = this;
      try
      {
        var self = this;
        this.view.btnModifySearch.onClick = function() {
		 /*if(self.cacheUtils.data.length===0){
			 self.view.flxPaginationWrapper.setVisibility(false);
		 }
		 else{
			 self.view.flxPaginationWrapper.setVisibility(true);
		 }*/
          if(kony.application.getCurrentBreakpoint() !== 640 &&self.cacheUtils.data.length!=0 ){
            self.view.paginationFooter.setVisibility(true);
            self.view.paginationHeader.setVisibility(true);  
          }
          self.modifySearch();
        };
        this.view.btnClearSearch.onClick = function() {
          self.searchViewModel.searchPerformed = false;
          self.clearSearch();     
          self.hideSearchFlex();
          if(self.selectedTab === 6)
          {
            self.cacheUtils.data = [];
            self.tab6CacheUtils.data = [];
            self.setTab6Data(self._tab6Criteria, 6);
          }
          else
          {
		      	self.setTransactionData();
            self.setSelectedTabData(self._filterTab1, 1)
          }

        };
        if(!self._TLenableForSearch)
          {
            self.view.paginationFooter.setVisibility(false);
            self.view.paginationHeader.setVisibility(false);
          }
        this.setSearchVisible(false);
        this.setSearchResultsVisible(true);
        this.configureActionsForTags(searchViewModel);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in showing search results",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component modifySearch
     * This method is used to change the UI so that User can modify the search.
     */ 
    modifySearch: function() {
      var self = this;
      try
      {
        this.searchViewModel.visible = true;
        this.searchViewModel.searchPerformed = false;
        this.renderSearchForm(this.searchViewModel);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in modifying the search",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component onTimePeriodChange
     * This method is used to check for custom date range and enable or disable Datewidgets.
     */ 
    onTimePeriodChange: function() {
      var self = this;
      try
      {
        if (this.view.lstbxTimePeriod.selectedKey === this.searchConstants.CUSTOM_DATE_RANGE) {
          this.showByDateWidgets();
          this.view.flxBlankSpace.height="10dp";
        } else {
          this.hideByDateWidgets();
        }
        this.checkSearchButtonState();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in showing or hiding date widgets",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component checkSearchButtonState
     * This method is used to enable or disable the search button based on user input.
     */ 
    checkSearchButtonState: function() {
      var self = this;
      try
      {
        var formData = this.updateSearchViewModel({});
        if (this.userCanSearch(formData)) {
          this.enableSearchButton();
        } else {
          this.disableSearchButton();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the search button state.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
     /**
     * Component checkBlockedFundsSearchButtonState
     * This method is used to enable or disable the search button based on user input in Blocked funds.
     */ 
    checkBlockedFundsSearchButtonState: function() {
      var self = this;
      try
      {
        var formData = this.updateSearchViewModel({});
        if (this.userCanSearchBlockedFunds(formData)) {
          this.enableSearchButtonBF();
        } else {
          this.disableSearchButtonBF();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the search button state.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component onSearchToggle
     * This method is used to toggle between transactions and blocked funds search
     */ 
    onSearchToggle: function()
    {
      var self = this;
      try
      {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        if(currentBreakpoint == 640){
          this.view.flxBlankSpace.setVisibility(false);
          this.view.flxBFBlankSpace.setVisibility(false);
          this.view.flxBFSearchContainer.height ="400dp";  
          this.view.flxSearchContainerWrapper.height ="570dp";
          this.view.flxRightSearchWrapper.height ="300dp";

        } else {
          this.view.flxBlankSpace.setVisibility(true);
          this.view.flxBFBlankSpace.setVisibility(true);
        }
        if(this.view.imgRadioBtnAccountType1.text === "M")
        {
          this.view.imgRadioBtnAccountType1.skin = "ICSknC2";
          this.view.imgRadioBtnAccountType2.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
          this.view.imgRadioBtnAccountType1.text = "L";
          this.view.imgRadioBtnAccountType2.text = "M";
          this.view.lblAccountTypeRadio2.skin = "ICSknLblSSP42424215px";
          this.view.lblAccountTypeRadio1.skin = "ICSknLblSSP72727215px";
          this.view.flxSearchContainerWrapper.setVisibility(false);
          this.view.flxBFSearchContainer.setVisibility(true);
          this.clearSearch();
          this.updateSearchViewModel();
        }
        else
        {
          this.view.imgRadioBtnAccountType1.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
          this.view.imgRadioBtnAccountType2.skin = "ICSknC2";
          this.view.imgRadioBtnAccountType1.text = "M";
          this.view.imgRadioBtnAccountType2.text = "L";
          this.view.lblAccountTypeRadio1.skin = "ICSknLblSSP42424215px";
          this.view.lblAccountTypeRadio2.skin = "ICSknLblSSP72727215px";
          this.view.flxSearchContainerWrapper.setVisibility(true);
          this.view.flxBFSearchContainer.setVisibility(false);
          this.clearSearch();
          this.updateSearchViewModel();
        }
        this.adjustScreen();
        if(this.view.imgRadioBtnAccountType1.text === "M"){
          this.view.flxRadioBtnAccountType1.accessibilityConfig = {
              "a11yARIA": {
                  "aria-labelledby": "lblAccountTypeRadio1",
                  role: "radio",
                  "aria-checked": true
              }
          }
          this.view.flxRadioBtnAccountType2.accessibilityConfig = {
              "a11yARIA": {
                  "aria-labelledby": "lblAccountTypeRadio2",
                  role: "radio",
                  "aria-checked": false
              }
          }
      }
      if(this.view.imgRadioBtnAccountType1.text === "L"){
          this.view.flxRadioBtnAccountType1.accessibilityConfig = {
              "a11yARIA": {
                  "aria-labelledby": "lblAccountTypeRadio1",
                  role: "radio",
                  "aria-checked": false
              }
          }
          this.view.flxRadioBtnAccountType2.accessibilityConfig = {
              "a11yARIA": {
                  "aria-labelledby": "lblAccountTypeRadio2",
                  role: "radio",
                  "aria-checked": true
              }
          }
      }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in toggle of search type",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    clearSearchOnTagClick: function(){
      var scope = this;
      if(scope.searchViewModel.searchPerformed){
        scope.clearSearch();
        scope.searchViewModel.visible = false;
        scope.hideSearchFlex();
        scope.searchViewModel.searchPerformed = false;
      }
    },
    /**
     * Component bindSearchFormActions
     * This method is used to bind all the actions for ever filed in search Flex.
     */ 
    bindSearchFormActions: function() {
      var scope = this;
      try
      {
        this.view.btnSearch.onClick = function() {
          scope.updateSearchViewModel();
          scope.startSearch();
        };
        this.view.btnBFSearch.onClick = function(){
          scope.updateSearchViewModel();
          scope.startBFSearch();
        };
        this.view.btnCancel.onClick = function() {
          scope.clearSearch();
          scope.searchViewModel.visible = false;
          scope.hideSearchFlex();
          scope.searchViewModel.searchPerformed = false;
          if(scope.selectedTab === 1)
              scope.setSelectedTabData(scope._filterTab1, 1);
        };
        this.view.btnBFCancel.onClick = function() {
          scope.clearSearch();
          scope.searchViewModel.visible = false;
          scope.hideSearchFlex();
          scope.searchViewModel.searchPerformed = false;
          if(scope.selectedTab === 6)
          scope.setTab6Data(scope._tab6Criteria, 6);
        };
        this.view.flxRadioBtnAccountType1.onClick = this.onSearchToggle;
        this.view.flxRadioBtnAccountType2.onClick = this.onSearchToggle;
        this.view.txtKeyword.onKeyUp = this.checkSearchButtonState;
        this.view.txtBFKeyword.onKeyUp = this.checkBlockedFundsSearchButtonState;
        this.view.txtBFReferenceNumber.onKeyUp = this.checkBlockedFundsSearchButtonState;
        this.view.calBFDateFrom.onSelection = this.checkBlockedFundsSearchButtonState;
        this.view.calBFDateTo.onSelection = this.checkBlockedFundsSearchButtonState;
		this.view.calBFDateFrom.onTouchEnd = this.checkBlockedFundsSearchButtonState;
        this.view.calBFDateTo.onTouchEnd = this.checkBlockedFundsSearchButtonState;
        this.view.lstbxTransactionType.onSelection = this.checkSearchButtonState;
        this.view.txtCheckNumberFrom.onKeyUp = this.checkSearchButtonState;
        this.view.lstbxTimePeriod.onSelection = this.onTimePeriodChange;
        this.view.txtCheckNumberTo.onKeyUp = this.checkSearchButtonState;
        this.view.txtAmountRangeFrom.onKeyUp = this.checkSearchButtonState;
        this.view.txtAmountRangeTo.onKeyUp = this.checkSearchButtonState;
        var scopeObj = this;
        var today = new Date();
        //commented for defect ARB-37463
     //   scopeObj.view.calBFDateFrom.enableRangeOfDates("", [today.getDate(), today.getMonth() + 1, today.getFullYear()], "skn", true);
        this.view.calDateFrom.onSelection = function() {
          var fromdate = scopeObj.view.calDateFrom.dateComponents;
          scopeObj.view.calDateTo.enableRangeOfDates([fromdate[0], fromdate[1], fromdate[2]], [today.getDate(), today.getMonth() + 1, today.getFullYear()], "skn", true);
        };
		this.view.calBFDateFrom.onSelection = function() {
          var fromdate = scopeObj.view.calBFDateFrom.dateComponents;
          scopeObj.view.calBFDateTo.enableRangeOfDates([fromdate[0], fromdate[1], fromdate[2]], [today.getDate(), today.getMonth() + 1, today.getFullYear()], "skn", true);
        };
		this.view.calBFDateTo.onSelection = function() {
          var todate = scopeObj.view.calBFDateTo.dateComponents;
          scopeObj.view.calBFDateFrom.enableRangeOfDates("",[todate[0], todate[1], todate[2]], "skn", true);
        };
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in binding actions to search fileds.",
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * Component constructSearchCriteriaForTransactions
     * This method is used to create the transactions criteria for advanced search
     */
    constructSearchCriteriaForTransactions: function(commandObj){
      var searchCriteria = [];
      if(commandObj.searchTransactionType){
        if((commandObj.searchTransactionType != this.searchConstants.BOTH) && (commandObj.searchTransactionType != "All")){
          var criteriaObject = {
            "fields" : ["transactionType"],
            "value" : commandObj.searchTransactionType,
            "type" : "completeMatch",
          };
          searchCriteria.push(criteriaObject);
        }
      }
      if(commandObj.searchDescription){
        var criteriaObject = {
          "fields" : ["description","transactionsNotes","transactionId"],
          "value" : commandObj.searchDescription,
          "type" : "substringMatch",
        };
        searchCriteria.push(criteriaObject);
      }
      if(commandObj.searchMinAmount && commandObj.searchMaxAmount && !isNaN(commandObj.searchMinAmount) && !isNaN(commandObj.searchMaxAmount)){
        var criteriaObject = {
          "fields" : ["amount"],
          "type" : "rangeBetween",
          "minimum" : commandObj.searchMinAmount,
          "maximum" : commandObj.searchMaxAmount
        };
        searchCriteria.push(criteriaObject);
      }
      if(commandObj.searchStartDate && commandObj.searchEndDate){
        var criteriaObject = {
          "fields" : ["postedDate"],
          "type" : "dateBetween",
          "minimum" : commandObj.searchStartDate,
          "maximum" : commandObj.searchEndDate,
        };
        searchCriteria.push(criteriaObject);
      }
      if (commandObj.fromCheckNumber){
        if (commandObj.fromCheckNumber == commandObj.toCheckNumber) {
            var criteriaObject = {
                "fields": ["checkNumber"],
                "type": "completeMatch",
                "value": commandObj.fromCheckNumber,
            };
        } else {
            var criteriaObject = {
                "fields": ["checkNumber"],
                "type": "rangeBetween",
                "minimum": commandObj.fromCheckNumber,
                "maximum": commandObj.toCheckNumber,
            };
        }
        searchCriteria.push(criteriaObject);
    }
           
      return searchCriteria;
    },
    /**
     * Component startSearch
     * This method is used to create the criteria and do search service call and 
     * fetch search results.
     */
    startSearch: function() {
      var scopeObj = this;
      // try
      // {
        // this.requestStart();
        this.searchViewModel.searchPerformed = true;
        this.searchViewModel.dateRange = this.getDateRangeForTimePeriod(this.searchViewModel);
        var startDate = this.searchViewModel.dateRange.startDate;
        var endDate = this.searchViewModel.dateRange.endDate;
        var commandObj = {
          searchTransactionType: this.searchViewModel.transactionTypeSelected,
          searchDescription: this.searchViewModel.keyword,
          searchMinAmount: this.searchViewModel.fromAmount,
          searchMaxAmount: this.searchViewModel.toAmount,
          searchStartDate: startDate,
          searchEndDate: endDate,
          isScheduled: 0,
          fromCheckNumber: this.searchViewModel.fromCheckNumber,
          toCheckNumber: this.searchViewModel.toCheckNumber,
          accountNumber: this.getFieldValue(scopeObj._TLaccountId),
          offset: scopeObj.offset,
          limit : parseInt(scopeObj.noOfRecords)
        };
        var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("searchTransactionType", commandObj.searchTransactionType), kony.mvc.Expression.eq("searchDescription", commandObj.searchDescription), kony.mvc.Expression.eq("searchMinAmount", commandObj.searchMinAmount), kony.mvc.Expression.eq("searchMaxAmount", commandObj.searchMaxAmount), kony.mvc.Expression.eq("searchStartDate", commandObj.searchStartDate), kony.mvc.Expression.eq("searchEndDate", commandObj.searchEndDate), kony.mvc.Expression.eq("fromCheckNumber", commandObj.fromCheckNumber), kony.mvc.Expression.eq("toCheckNumber", commandObj.toCheckNumber), kony.mvc.Expression.eq("accountNumber", commandObj.accountNumber), kony.mvc.Expression.eq("isScheduled", commandObj.isScheduled), kony.mvc.Expression.eq("searchType", "Search"));
        // if(this._dataAvailability == "Service calls by component")
              var transactions = this.cacheUtils.getTransactionList();
              var criteria = this.constructSearchCriteriaForTransactions(commandObj);
              var searchResults = cacheUtils.advancedSearch(transactions,criteria);
              this.cacheUtils.setFilterValue("All");
              this.fetchTransactionsBySearchSuccess(searchResults);
          // this.transactionListDAO.fetchTransactionsByCriteria(criteria, this.fetchTransactionsBySearchSuccess, this.fetchTransactionsBySearchFailure);
        // else
        //   this.dataRequestCallback(commandObj);
      // }
      // catch(err)
      // {
      //   var errorObj =
      //       {
      //         "errorInfo" : "Error in the creating search criteria and invoking search service call",
      //         "errorLevel" : "Business",
      //         "error": err
      //       };
      //   scopeObj.onError(errorObj);
      // }
    },
    /**
     * Component startBFSearch
     * This method is used to create the criteria and do search service call and 
     * fetch search results for blocked funds.
     */
    startBFSearch: function()
    {
      var scopeObj = this;
      // try
      // {
      //   this.requestStart();
        this.searchViewModel.searchPerformed = true;
        this.searchViewModel.bfDateRange = this.getDateRangeForTimePeriod(this.searchViewModel);
        var startDate = this.searchViewModel.bfDateRange.bfStartDate;
        var endDate = this.searchViewModel.bfDateRange.bfEndDate;      
        var commandObj = {
          accountID : this.getFieldValue(scopeObj._TLaccountId),
          lockedEventId : this.searchViewModel.bfReferenceNumber,
          lockReason: this.searchViewModel.bfKeyword,
          searchStartDate : startDate,
          searchEndDate : endDate
        }
        // var criteria = commandObj;
        // var operationName = "getBlockedFunds";
        // if(this._tab6ObjectServiceName && this._tab6ObjectName && operationName){
        //   this.transactionListDAO.fetchTransactionList(this._tab6ObjectServiceName,operationName,this._tab6ObjectName,criteria,this._tab6ServiceResponseIdentifier,this.processSearchResponce,this.onError);
        // }

        var transactions = this.cacheUtils.getBlockedFundsList();
        var criteria = this.constructSearchCriteriaForBF(commandObj);
        var searchResults = cacheUtils.advancedSearch(transactions,criteria);
        var data = {
          "Transactions" : searchResults
        };
        this.processSearchResponce(data);
      // }
      // catch(err)
      // {
      //   var errorObj =
      //       {
      //         "errorInfo" : "Error in the creating search criteria and invoking search service call",
      //         "errorLevel" : "Business",
      //         "error": err
      //       };
      //   scopeObj.onError(errorObj);
      // }
    },

    /**
     * Component constructSearchCriteriaForBF
     * This method is used to create the blocked funds criteria for advanced search
     */
    constructSearchCriteriaForBF : function(commandObj){
      var searchCriteria = [];
      if(commandObj.lockedEventId){
        var criteriaObject = {
          "fields" : ["lockedEventId"],
          "value" : commandObj.lockedEventId,
          "type" : "completeMatch",
        };
        searchCriteria.push(criteriaObject);
      }
      if(commandObj.searchStartDate && commandObj.searchEndDate){
        var criteriaObject = {
          "fields" : ["fromDate","toDate"],
          "type" : "dateBetween",
          "minimum" : commandObj.searchStartDate,
          "maximum" : commandObj.searchEndDate,
        };
        searchCriteria.push(criteriaObject);
      }
      if(commandObj.lockReason){
        var criteriaObject = {
          "fields" : ["lockReason"],
          "value" : commandObj.lockReason,
          "type" : "substringMatch",
        };
        searchCriteria.push(criteriaObject);
      }
      return searchCriteria;
    },
    /**
     * Component processSearchResponce
     * This method is invoked on success of Block funds Search transactions service call.
     * @param : data {Array} -  consists of the arrays transactions JSON. 
     */
    processSearchResponce: function(data){
      var scope = this;
      this.updateSearchTransactionView(data["Transactions"]);
      this.selectedTab = 6;
	  this.setSelectedTabUI();
	  this.tab6CacheUtils.setData(data["Transactions"]);
//       this.requestEnd();
    },
    /**
     * Component fetchTransactionsBySearchSuccess
     * This method is invoked on success of Search transactions service call.
     * @param : data {Array} -  consists of the arrays transactions JSON. 
     */
    fetchTransactionsBySearchSuccess: function(data){
      var scope = this;
      this.updateSearchTransactionView(data);
      this.selectedTab = 1;
	  this.setSelectedTabUI();
      this.setSelectedTabUIMobile();
	  this.cacheUtils.setData(data);
      // this.requestEnd();
    },
    /**
     * Component fetchTransactionsBySearchFailure
     * This method is invoked on failure of Search transactions service call.
     * @param : err - {JSONObject} - consists of the error message.
     */
    fetchTransactionsBySearchFailure: function(err){
      var self = this;
      this.requesEnd();
      var errorObj =
          {
            "errorInfo" : "Error in the search service call",
            "errorLevel" : "Fabric",
            "error": err
          };
      self.onError(errorObj);
    },
    /**
     * Component tagState
     * This is used to keep track on tags in searchResult flex.
     */
    tagState: {
      visible: 0,
      NUMBER_OF_TAGS: 5,
      decrement: function() {
        if (this.visible > 0) {
          this.visible--;
        }
      },
      increment: function() {
        if (this.visible < this.NUMBER_OF_TAGS) {
          this.visible++;
        }
      }
    },
    /**
     * Component getTagConfig
     * Builds config for all the tags that are shown in flex searchResults.
     * @param : searchViewModel {JSONObject} - locally maintained search parameters.
     * @return : config{JSON} -  the config of Tags
     */
    getTagConfig: function(searchViewModel) {
      var scopeObj = this;
      try
      {
        var config;
        if (kony.application.getCurrentBreakpoint() == 640) {
          config = [{
            actionOn: 'flxCancelKeywordM',
            hide: ['flxKeywordWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'keyword',
              resetValue: ''
            }],
            value: {
              label: 'lblKeywordValueM',
              computedValue: function() {
                if (searchViewModel.keyword === "") {
                  return null;
                }
                return searchViewModel.keyword;
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxBFCancelKeywordM',
            hide: ['flxBFKeywordWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfKeyword',
              resetValue: ''
            }],
            value: {
              label: 'lblBFKeywordValueM',
              computedValue: function() {
                if (searchViewModel.bfKeyword === "") {
                  return null;
                }
                return searchViewModel.bfKeyword;
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelTypeM',
            hide: ['flxTypeWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'transactionTypeSelected',
              resetValue: this.searchConstants.BOTH
            }],
            value: {
              label: 'lblTypeValueM',
              computedValue: function() {
                if (searchViewModel.transactionTypeSelected === this.searchConstants.BOTH) {
                  return null;
                }
                return kony.i18n.getLocalizedString(this.transactionTypes[searchViewModel.transactionTypeSelected]);
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelAmountRangeM',
            hide: ['flxAmountRangeWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'fromAmount',
              resetValue: ''
            }, {
              propertyName: 'toAmount',
              resetValue: ''
            }],
            value: {
              label: 'lblAmountRangeValueM',
              computedValue: function() {
                if (searchViewModel.fromAmount === "" || searchViewModel.toAmount === "") {
                  return null;
                }
                return this.FormatUtils.formatAmountAndAddCurrencySymbol(searchViewModel.fromAmount,this.getFieldValue(this._currencyCode)) + " to " + this.FormatUtils.formatAmountAndAddCurrencySymbol(searchViewModel.toAmount,this.getFieldValue(this._currencyCode));
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelDateRangeM',
            hide: ['flxDateRangeWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'timePeriodSelected',
              resetValue: this.searchConstants.CHOOSE_TIME_RANGE
            }],
            value: {
              label: 'lblDateRangeValueM',
              computedValue: function() {
                if (searchViewModel.timePeriodSelected === this.searchConstants.CHOOSE_TIME_RANGE) {
                  return null;
                } else if (searchViewModel.timePeriodSelected === this.searchConstants.CUSTOM_DATE_RANGE) {
                  var fromDate = this.searchViewModel.dateRange.startDate;
                  var toDate = this.searchViewModel.dateRange.endDate;
                  return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                }
                return kony.i18n.getLocalizedString(this.timePeriods[searchViewModel.timePeriodSelected]);
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxBFCancelDateRangeM',
            hide: ['flxBFDateRangeWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfFromDate',
              resetValue: ''
            },{
              propertyName: 'bfToDate',
              resetValue: ''
            }],
            value: {
              label: 'lblBFDateRangeValueM',
              computedValue: function() { 
                if(this.view.imgRadioBtnAccountType1.text !== "M")
                {
                  var fromDate = this.searchViewModel.bfDateRange.bfStartDate;
                  var toDate = this.searchViewModel.bfDateRange.bfEndDate;
                  return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                }
                else
                {
                  return null;
                }
              }.bind(scopeObj)
            }
          },{
            actionOn: 'flxBFCancelReferenceNumberM',
            hide: ['flxBFReferenceNumberWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfReferenceNumber',
              resetValue: ''
            }],
            value: {
              label: 'lblBFReferenceNumberNumberValueM',
              computedValue: function() {
                if (searchViewModel.bfReferenceNumber === "") {
                  return null;
                }
                return searchViewModel.bfReferenceNumber;
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelCheckNumberM',
            hide: ['flxCheckNumberWrapper'],
            clearPropertiesFromViewModel: [{
              propertyName: 'fromCheckNumber',
              resetValue: ''
            }, {
              propertyName: 'toCheckNumber',
              resetValue: ''
            }],
            value: {
              label: 'lblCheckNumberValueM',
              computedValue: function() {
                if (searchViewModel.fromCheckNumber === "" || searchViewModel.toCheckNumber === "") {
                  return null;
                }
                return searchViewModel.fromCheckNumber + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + searchViewModel.toCheckNumber;
              }.bind(scopeObj)
            }
          }];
        } else {

          config = [{
            actionOn: 'flxCancelKeyword',
            hide: ['lblKeywordTitle', 'lblKeywordValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'keyword',
              resetValue: ''
            }],
            value: {
              label: 'lblKeywordValue',
              computedValue: function() {
                if (searchViewModel.keyword === "") {
                  return null;
                }
                return searchViewModel.keyword;
              }.bind(scopeObj)
            }
          },{
            actionOn: 'flxBFCancelKeyword',
            hide: ['lblBFKeywordTitle', 'lblBFKeywordValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfKeyword',
              resetValue: ''
            }],
            value: {
              label: 'lblBFKeywordValue',
              computedValue: function() {
                if (searchViewModel.bfKeyword === "") {
                  return null;
                }
                return searchViewModel.bfKeyword;
              }.bind(scopeObj)
            }
          },  {
            actionOn: 'flxCancelType',
            hide: ['lblTypeValue', 'lblTypeTitle'],
            clearPropertiesFromViewModel: [{
              propertyName: 'transactionTypeSelected',
              resetValue: this.searchConstants.BOTH
            }],
            value: {
              label: 'lblTypeValue',
              computedValue: function() {
                if (searchViewModel.transactionTypeSelected === this.searchConstants.BOTH) {
                  return null;
                }
                return kony.i18n.getLocalizedString(this.transactionTypes[searchViewModel.transactionTypeSelected]);
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelAmountRange',
            hide: ['lblAmountRangeTitle', 'lblAmountRangeValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'fromAmount',
              resetValue: ''
            }, {
              propertyName: 'toAmount',
              resetValue: ''
            }],
            value: {
              label: 'lblAmountRangeValue',
              computedValue: function() {
                if (searchViewModel.fromAmount === "" || searchViewModel.toAmount === "") {
                  return null;
                }
                return this.FormatUtils.formatAmountAndAddCurrencySymbol(searchViewModel.fromAmount,this.getFieldValue(this._currencyCode)) + " to " + this.FormatUtils.formatAmountAndAddCurrencySymbol(searchViewModel.toAmount,this.getFieldValue(this._currencyCode));
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelDateRange',
            hide: ['lblDateRangeTitle', 'lblDateRangeValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'timePeriodSelected',
              resetValue: this.searchConstants.CHOOSE_TIME_RANGE
            }],
            value: {
              label: 'lblDateRangeValue',
              computedValue: function() {
                if (searchViewModel.timePeriodSelected === this.searchConstants.CHOOSE_TIME_RANGE) {
                  return null;
                } else if (searchViewModel.timePeriodSelected === this.searchConstants.CUSTOM_DATE_RANGE) {
                  var fromDate = this.searchViewModel.dateRange.startDate;
                  var toDate = this.searchViewModel.dateRange.endDate;
                  return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                }
                return kony.i18n.getLocalizedString(this.timePeriods[searchViewModel.timePeriodSelected]);
              }.bind(scopeObj)
            }
          },{
            actionOn: 'flxBFCancelDateRange',
            hide: ['lblBFDateRangeTitle', 'lblBFDateRangeValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfFromDate',
              resetValue: ''
            },{
              propertyName: 'bfToDate',
              resetValue: ''
            }],
            value: {
              label: 'lblBFDateRangeValue',
              computedValue: function() { 
                if(this.view.imgRadioBtnAccountType1.text !== "M" &&  this.searchViewModel.bfDateRange.bfStartDate !== null && this.searchViewModel.bfDateRange.bfEndDate)
                {
                  var fromDate = this.searchViewModel.bfDateRange.bfStartDate;
                  var toDate = this.searchViewModel.bfDateRange.bfEndDate;
                  return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
                }
                else
                {
                  return null;
                }
              }.bind(scopeObj)
            }
          },{
            actionOn: 'flxBFCancelReferenceNumber',
            hide: ['flxBFReferenceWrapper', 'lblBFReferenceNumberTitle', 'lblBFReferenceNumberValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'bfReferenceNumber',
              resetValue: ''
            }],
            value: {
              label: 'lblBFReferenceNumberValue',
              computedValue: function() {
                if (searchViewModel.bfReferenceNumber === "") {
                  return null;
                }
                return searchViewModel.bfReferenceNumber;
              }.bind(scopeObj)
            }
          }, {
            actionOn: 'flxCancelCheckNumber',
            hide: ['lblCheckNumberTitle', 'lblCheckNumberValue'],
            clearPropertiesFromViewModel: [{
              propertyName: 'fromCheckNumber',
              resetValue: ''
            }, {
              propertyName: 'toCheckNumber',
              resetValue: ''
            }],
            value: {
              label: 'lblCheckNumberValue',
              computedValue: function() {
                if (searchViewModel.fromCheckNumber === "" || searchViewModel.toCheckNumber === "") {
                  return null;
                }
                return searchViewModel.fromCheckNumber + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + searchViewModel.toCheckNumber;
              }.bind(scopeObj)
            }
          }];
        }
        return config;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the search button state.",
              "errorLevel" : "Business",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },

    /**
     * Component configureActionsForTags
     * This method is used to assign Actions to all the tags in SearchResults flex.
     * @param : searchViewModel {JSONObject} - locally maintained search parameters.
    */
    configureActionsForTags: function(searchViewModel) {
      var scopeObj = this;
      try
      {
        var tagConfig = scopeObj.getTagConfig(searchViewModel);
        function generateClickListenerForTag(config) {
          return function() {
            hideTag(config);
            scopeObj.tagState.decrement();
            config.clearPropertiesFromViewModel.forEach(function(property) {
              scopeObj.searchViewModel[property.propertyName] = property.resetValue;
            });
            if (scopeObj.tagState.visible === 0) {
              scopeObj.clearSearch();
              scopeObj.searchViewModel.visible = false;
              scopeObj.hideSearchFlex();
              if(scopeObj.selectedTab === 6)
              {
				  scopeObj.cacheUtils.data = [];
                  scopeObj.tab6CacheUtils.data = [];
                scopeObj.setTab6Data(scopeObj._tab6Criteria, 6);
              }
              else
              {
				  scopeObj.setTransactionData();
                scopeObj.setSelectedTabData(scopeObj._filterTab1, 1)
              }
              if(kony.application.getCurrentBreakpoint() !== 640){
                //scopeObj.view.flxPaginationWrapper.setVisibility(true);
                scopeObj.view.flxPickListHeader.setVisibility(scopeObj._TLrecordsPerPagePickList);
                scopeObj.view.flxPickListFooter.setVisibility(scopeObj._TLrecordsPerPagePickList);
              }
            } else {
              if(scopeObj.view.imgRadioBtnAccountType1.text !== "M")
               scopeObj.startBFSearch();
              else
               scopeObj.startSearch();
            }
            scopeObj.view.forceLayout();
          };
        }
        function hideTag(config) {
          scopeObj.view[config.actionOn].setVisibility(false);
          config.hide.forEach(function(widgetToHide) {
            scopeObj.view[widgetToHide].setVisibility(false);
          });
          scopeObj.view.forceLayout();
        }
        function showTag(config) {
          scopeObj.view[config.actionOn].setVisibility(true);
          config.hide.forEach(function(widgetToHide) {
            scopeObj.view[widgetToHide].setVisibility(true);
          });
          scopeObj.view.forceLayout();
          scopeObj.tagState.increment();
        }
        this.tagState.visible = 0;
        tagConfig.forEach(function(config) {
          if (config.value.computedValue() === null) {
            hideTag(config);
          } else {
            showTag(config);
            scopeObj.view[config.actionOn].onClick = generateClickListenerForTag(config);
            scopeObj.view[config.value.label].text = config.value.computedValue();
          }
        });
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the configuration of action tags",
              "errorLevel" : "Business",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },
    /**
     * Component userCanSearch
     * This method is used to decide whether to enable or disable search button
     * @param : formData{JSON} consists of all the parameters for search
     * @return : {Boolean}  to enable or disable search
    */
    userCanSearch: function(formData) {
      var self = this
      try
      {
        var searchConstants = this.searchConstants;
        var searchRegex= /^[a-zA-Z0-9]*$/;
        function checkIfEmpty(value) {
          if (value === null || value === "") {
            return true;
          }
          return false;
        }
        if (!checkIfEmpty(formData.keyword) && searchRegex.test(formData.keyword)) {
          return true;
        } else if (formData.transactionTypeSelected !== searchConstants.BOTH) {
          return true;
        } else if (formData.timePeriodSelected !== searchConstants.CHOOSE_TIME_RANGE) {
          return true;
        } else if (!checkIfEmpty(formData.fromCheckNumber) && !checkIfEmpty(formData.toCheckNumber)) {
          return true;
        } else if (!checkIfEmpty(formData.fromAmount) && !checkIfEmpty(formData.toAmount)) {
          return true;
        } else {
          return false;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the whether user can search or not",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
     /**
     * Component userCanSearchBlockedFunds
     * This method is used to decide whether to enable or disable search button in blocked funds
     * @param : formData{JSON} consists of all the parameters for search
     * @return : {Boolean}  to enable or disable search
    */
    userCanSearchBlockedFunds: function(formData) {
      var self = this
      try
      {
        var searchRegex= /^[a-zA-Z0-9]*$/;
        function checkIfEmpty(value) {
          if (value === null || value === "") {
            return true;
          }
          return false;
        }
        if (!checkIfEmpty(formData.bfKeyword)) {
          if(searchRegex.test(formData.bfKeyword))
          return true;
          else
            return false;
        }
        else if (!checkIfEmpty(formData.bfReferenceNumber)) {
          return true;
        }
        else if(formData.bfFromDate!== null && formData.bfToDate!== null)
          {
            return true;
          }
        else {
          return false;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checking the whether user can search or not",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getDateRangeForTimePeriod
     * This method is used to get the start date and end date for search in backend Date format.
     * @param : searchviewmodel{JSON} - consists of all the parameters for search
     * @return : {JSON} - of start date and end date
    */
    getDateRangeForTimePeriod: function(searchviewmodel) {
      var self = this;
      try
      {
        var startDate = null;
        var endDate = null;
        var bfStartDate = null;
        var bfEndDate = null;
        if (searchviewmodel.timePeriodSelected === this.searchConstants.CHOOSE_TIME_RANGE) {
          startDate = "";
          endDate = "";
        } else if (searchviewmodel.timePeriodSelected === 'CUSTOM_DATE_RANGE') {
          function padDigits(n) {
            n = n + '';
            return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
          }
          var dd_mm_yyyy_startDate = padDigits(searchviewmodel.fromDate[0]) + "/" + padDigits(searchviewmodel.fromDate[1]) + "/" + searchviewmodel.fromDate[2];
          var dd_mm_yyyy_endDate = padDigits(searchviewmodel.toDate[0]) + "/" + padDigits(searchviewmodel.toDate[1]) + "/" + searchviewmodel.toDate[2];
          startDate = this.FormatUtils.getFormatedDateString(this.FormatUtils.getDateObjectFromCalendarString(dd_mm_yyyy_startDate, "DD/MM/YYYY"), "Y-m-d");
          endDate = this.FormatUtils.getFormatedDateString(this.FormatUtils.getDateObjectFromCalendarString(dd_mm_yyyy_endDate, "DD/MM/YYYY"), "Y-m-d");
        } else {
          var dateConfig = {
            LAST_SEVEN_DAYS: 7,
            LAST_FOURTEEN_DAYS: 14,
            LAST_ONE_MONTH: 30,
            LAST_TWO_MONTHS: 60,
            LAST_THREE_MONTHS: 90,
            LAST_SIX_MONTHS: 180,
            LAST_TWELVE_MONTHS: 365
          };
          var today = new Date();
          endDate = this.FormatUtils.getFormatedDateString(today, this.formattingJSON.backenddateformat);
          today.setDate(today.getDate() - dateConfig[searchviewmodel.timePeriodSelected]);
          startDate = this.FormatUtils.getFormatedDateString(today, this.formattingJSON.backenddateformat);
        }
        if(this.view.imgRadioBtnAccountType1.text !== "M" && searchviewmodel.bfFromDate !== null && searchviewmodel.bfToDate!== null)
        {
          function padDigits(n) {
            n = n + '';
            return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
          }
          var dd_mm_yyyy_startDate = padDigits(searchviewmodel.bfFromDate[0]) + "/" + padDigits(searchviewmodel.bfFromDate[1]) + "/" + searchviewmodel.bfFromDate[2];
          var dd_mm_yyyy_endDate = padDigits(searchviewmodel.bfToDate[0]) + "/" + padDigits(searchviewmodel.bfToDate[1]) + "/" + searchviewmodel.bfToDate[2];
          bfStartDate = this.FormatUtils.getFormatedDateString(this.FormatUtils.getDateObjectFromCalendarString(dd_mm_yyyy_startDate, "DD/MM/YYYY"), "Y-m-d");
          bfEndDate = this.FormatUtils.getFormatedDateString(this.FormatUtils.getDateObjectFromCalendarString(dd_mm_yyyy_endDate, "DD/MM/YYYY"), "Y-m-d");          
        }
        else
        {
          bfStartDate = "";
          bfEndDate = "";
        }
        return {
          startDate: startDate,
          endDate: endDate,
          bfStartDate: bfStartDate,
          bfEndDate: bfEndDate
        };
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in getting date range for selected time period",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
	/**
     * Component performTransactionOperations
     * Reponsible to perform the search or retrieve transactions operations after pager component events
     */
    performTransactionOperations : function(){
	try{
      var self = this;
      this.state = "pagination";
      if(self.searchViewModel.searchPerformed === true)
      {
        self.getCacheData();
      }
      else
      {
        if(self.selectedTab === 6)
        {
          self.getTab6Transactions();
        }
        else
        {
          if(self._dataAvailability === "Service calls by component")
            self.getTransactionList();
          else
            self.dataRequestCallback();
        }
      }
	}
	 catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in performing search or transactions retrieval operation",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }

    },
   /**
     * Component fetchPaginationHeader
     * Reponsible to update the offset and limit on the pagination header component events
	 * @param : offset {Integer} - offset calculated based on the pagination buttons click 
	 * @param : limit {Integer} - limit calculated based on the pagination buttons click
     */
    fetchPaginationHeader: function(offset,noOfRecords){
	try{
      var self = this;
      self.criteria["offset"] = offset;
      self.criteria["limit"] = noOfRecords;
      this.noOfRecords = noOfRecords;
      this.offset = offset;
      this.view.paginationFooter.setDropDownSelectedKey();
      this.view.paginationFooter.collapseDropDown();
      this.performTransactionOperations();
	}
	 catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the offset,limit and update dropdown selected value for pagination header",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
	
    },
   /**
     * Component fetchPaginationFooter
     * Reponsible to update the offset and limit on the pagination footer component events
	 * @param : offset {Integer} - offset calculated based on the pagination buttons click 
	 * @param : limit {Integer} - limit calculated based on the pagination buttons click
     */
    fetchPaginationFooter: function(offset,noOfRecords){
	try{
      var self = this;
      self.criteria["offset"] = offset;
      self.criteria["limit"] = noOfRecords;
      this.noOfRecords = noOfRecords;
      this.offset = offset;
      this.view.paginationHeader.setDropDownSelectedKey();
      this.view.paginationHeader.collapseDropDown();
      this.performTransactionOperations();
	}
	catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the offset,limit and update dropdown selected value for pagination footer",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    }
  };
});