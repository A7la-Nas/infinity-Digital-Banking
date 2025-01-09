define(function () {

  return {

    flxDropDownIconRef: undefined,
    flxDropDownBodyRef: undefined,
    lblFlxDropDownIconRef: undefined,
    segRoadMapItemsRef: this.view.segRoadMapItems,

    lblRoadMapBodyRef: undefined,

    statusConstants: {
      PENDING: 'Pending',
      APPROVED: 'Approved',
      REJECTED: 'Rejected',
      SKIPPED: 'Skipped'
    },

    desktopSkinConfig: {
      sknLblRoadMapNumber: 'slLabel424242Regular15px',
      sknLblRoadMapNumberHighlight: 'slLabelFFFFFFRegular15px',
      sknLblRoadMapLabel: 'slLabel424242Regular15px',
      sknLblRoadMapLabelHighlight: 'slLabel333333Regular15px',
      sknLblRoadMapLabelActed: 'slLabel2B2B2BRegular15px',
      lblRoadMapSubLabel: 'slLabel424242Regular13px'
    },

    mobileSkinConfig: {
      sknLblRoadMapNumber: 'slLabel424242Regular15px',
      sknLblRoadMapNumberHighlight: 'slLabelFFFFFFRegular15px',
      sknLblRoadMapLabel: 'slLabel424242Regular13px',
      sknLblRoadMapLabelHighlight: 'slLabel424242Regular13px',
      sknLblRoadMapLabelActed: 'slLabel424242Regular13px',
      lblRoadMapSubLabel: 'slLabel424242Regular13px'
    },

    tabletSkinConfig: {
      sknLblRoadMapNumber: 'slLabel424242Regular15px',
      sknLblRoadMapNumberHighlight: 'slLabelFFFFFFRegular15px',
      sknLblRoadMapLabel: 'slLabel949494Regular15px',
      sknLblRoadMapLabelHighlight: 'slLabel333333Regular15px',
      sknLblRoadMapLabelActed: 'slLabel2B2B2BRegular15px',
      lblRoadMapSubLabel: 'slLabel424242Regular13px'
    },

    // default - desktop skin config
    currentSkinConfig: {
      sknLblRoadMapHeader: 'slLabel424242Regular17px',
      sknLblRoadMapBody: 'slLabel424242Regular15px',
      sknLblRoadMapNumber: 'slLabel424242Regular15px',
      sknLblRoadMapNumberHighlight: 'slLabelFFFFFFRegular15px',
      sknLblRoadMapLabel: 'slLabel424242Regular15px',
      sknLblRoadMapLabelHighlight: 'slLabel333333Regular15px',
      sknLblRoadMapLabelActed: 'slLabel2B2B2BRegular15px',
      lblRoadMapSubLabel: 'slLabel424242Regular13px'
    },

    defaultComponentConfig: [
      {
        requestLabel: 'Request 1',
        isCurrent: true
      },
      {
        requestLabel: 'Request 2'
      },
      {
        requestLabel: 'Request 3'
      },
      {
        requestLabel: 'Request 4'
      },
      {
        requestLabel: 'Request 5'
      },
      {
        requestLabel: 'Acknowledgement'
      }
    ],

    onPreShow: function () {
    },

    onPostShow: function () {
      this.initCurrentDateForRoadMap();
      this.initDesktopView();
    },

    /**
     * @description loads the RoadMap Component for Mobile Responsive view [NOTE: call this function in the breakpoint change handler of the parent form]
     */
    initMobileView: function(){
      this.currentSkinConfig = this.mobileSkinConfig;
      this.view.flxApprovalRoadMapElement.isVisible = false;
      this.view.flxApprovalRoadMapElementTablet.isVisible = false;
      this.view.flxApprovalRoadMapElementMobile.isVisible = true;
      this.segRoadMapItemsRef = this.view.segRoadMapItemsMobile;
      this.flxDropDownIconRef = this.view.flxDropDownIconMobile;
      this.lblFlxDropDownIconRef = this.view.lblDropDownIconMobile;
      this.flxDropDownBodyRef = this.view.flxDropDownBodyMobile;
      this.initFlxDropDownAction();
      this.initComponent();
    },

    /**
     * @description loads the RoadMap Component for Tablet Responsive view [NOTE: call this function in the breakpoint change handler of the parent form]
     */
    initTabletView: function(){
      this.currentSkinConfig = this.tabletSkinConfig;
      this.view.flxApprovalRoadMapElement.isVisible = false;
      this.view.flxApprovalRoadMapElementMobile.isVisible = false;
      this.view.flxApprovalRoadMapElementTablet.isVisible = true;
      this.segRoadMapItemsRef = this.view.segRoadMapItemsTablet;
      this.flxDropDownIconRef = this.view.flxDropDownIconTablet;
      this.lblFlxDropDownIconRef = this.view.lblDropDownIconTablet;
      this.flxDropDownBodyRef = this.view.flxDropDownBodyTablet;
      this.initFlxDropDownAction();
      this.initComponent();
    },

    /**
     * @description loads the RoadMap Component for Desktop Responsive view [NOTE: call this function in the breakpoint change handler of the parent form]
     */
    initDesktopView: function(){
      this.currentSkinConfig = this.desktopSkinConfig;
      this.view.flxApprovalRoadMapElementTablet.isVisible = false;
      this.view.flxApprovalRoadMapElementMobile.isVisible = false;
      this.view.flxApprovalRoadMapElement.isVisible = true;
      this.segRoadMapItemsRef = this.view.segRoadMapItems;
      this.initComponent();
    },

    initFlxDropDownAction: function(){
      if(!kony.sdk.isNullOrUndefined(this.flxDropDownIconRef) && !kony.sdk.isNullOrUndefined(this.lblFlxDropDownIconRef)){
        this.flxDropDownIconRef.onClick = () => {
          if(!kony.sdk.isNullOrUndefined(this.flxDropDownBodyRef)){
            if(this.lblFlxDropDownIconRef.text === 'O'){
              this.lblFlxDropDownIconRef.text = 'P';
              this.flxDropDownBodyRef.isVisible = true;
              this.initRoadMapSegment();
            }
            else{
              this.lblFlxDropDownIconRef.text = 'O';
              this.flxDropDownBodyRef.isVisible = false;
            }
            this.view.forceLayout();
          }
        }
      }
    },

    /**
    * @description - marks the initialization of the component view - pass the window breakpoint to generate the respective views
    */
    initComponent: function () {
      this.initRoadMapSegment();
      this.view.forceLayout();
    },

    initRoadMapSegment: function () {
      this.segRoadMapItemsRef.widgetDataMap = this.getSegRoadMapItemsDataMap();
      this.segRoadMapItemsRef.setData(this.getSegRoadMapItemsDefaultValues(this.defaultComponentConfig));
    },

    /**
     * @description sets the road map layout of the component [NOTE: To be called only in the postShow of the parent form during initialization]
     * @param {} componentConfig 
     */
    setRoadMapComponentConfig: function(componentConfig){
      this.defaultComponentConfig = componentConfig;
      this.initComponent();
    },

    /**
     * @description initializes the date time of the component label
     */
    initCurrentDateForRoadMap: function(){
      const currentDate = new Date();
      let YYYY = currentDate.getFullYear();
      let MM = currentDate.getMonth() + 1;
      let DD = currentDate.getDate();

      DD = DD < 10 ? ('0' + DD) : ('' + DD);
      MM = MM < 10 ? ('0' + MM) : ('' + MM);

      const fullDateString = 'Started on: ' + DD + '/' + MM + '/' + YYYY;
      this.view.lblRoadMapBody.text = fullDateString;
      this.view.lblRoadMapBodyMobile.text = fullDateString;
      this.view.lblRoadMapBodyTablet.text = fullDateString;
    },

    getSegRoadMapItemsDataMap: function () {
      return {
        'flxRoadMapHighlighter': 'flxRoadMapHighlighter',
        'flxRoadMapNumber': 'flxRoadMapNumber',
        'imgRoadMapLineTop': 'imgRoadMapLineTop',
        'imgRoadMapLineBottom': 'imgRoadMapLineBottom',
        'lblRoadMapNumber': 'lblRoadMapNumber',
        'lblRoadMapLabel': 'lblRoadMapLabel',
        'imgRoadMapSuccess': 'imgRoadMapSuccess',
        'imgRoadMapFailure': 'imgRoadMapFailure',
        'imgRoadMapSkipped': 'imgRoadMapSkipped',
        'lblRoadMapSubLabel': 'lblRoadMapSubLabel'
      }
    },

    getSegRoadMapItemsDefaultValues: function (componentConfig) {
      let defaultValues = [];
      let configLen = componentConfig.length;
      componentConfig.forEach((config, index) => {
        defaultValues.push(this.getSegRoadMapItemRowData({
          isCurrent: config.isCurrent ? true : false,
          count: (index+1).toString(),
          status: config.status,
          label: config.requestLabel + (config.requestId ? " - " + config.requestId : ""),
          isLast: (index+1) === configLen,
          isFirst: (index+1) === 1
        }));
      });
      return defaultValues;
    },

    getSegRoadMapItemRowData: function (placeholderData) {
      return {
        'flxRoadMapHighlighter': {
          'skin': placeholderData.isCurrent ? 'slFBoxRoadMapHighlighter' : 'slFBox'
        },
        'flxRoadMapNumber': {
          'isVisible': placeholderData.status != this.statusConstants.APPROVED && placeholderData.status != this.statusConstants.REJECTED && placeholderData.status != this.statusConstants.SKIPPED,
          'skin': placeholderData.isCurrent ? 'slFBoxRoadMapNumberHighlighter' : 'slFBoxRoadMapNumber'
        },
        'imgRoadMapSuccess': {
          'isVisible': (placeholderData.status == this.statusConstants.APPROVED || (placeholderData.isLast === true && placeholderData.isCurrent === true))
        },
        'imgRoadMapFailure': {
          'isVisible': placeholderData.status == this.statusConstants.REJECTED
        },
        'imgRoadMapSkipped': {
          'isVisible': placeholderData.status == this.statusConstants.SKIPPED
        },
        'lblRoadMapNumber': {
          'text': placeholderData.count ? placeholderData.count : '-',
          'skin': placeholderData.isCurrent ? this.currentSkinConfig.sknLblRoadMapNumberHighlight : this.currentSkinConfig.sknLblRoadMapNumber
        },
        'lblRoadMapLabel': {
          'text': placeholderData.isLast ? kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement") : (kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + placeholderData.count),
          'skin': placeholderData.isCurrent ? this.currentSkinConfig.sknLblRoadMapLabelHighlight : (placeholderData.status === this.statusConstants.APPROVED || placeholderData.status === this.statusConstants.REJECTED || placeholderData.status === this.statusConstants.SKIPPED) ? this.currentSkinConfig.sknLblRoadMapLabelActed : this.currentSkinConfig.sknLblRoadMapLabel
        },
        'lblRoadMapSubLabel': {
          'text': this.getI18nStatusText(placeholderData.status),
          'skin': this.currentSkinConfig.lblRoadMapSubLabel
        },
        'imgRoadMapLineTop': {
          'height': placeholderData.isFirst ? '0dp' : '30dp',
          'width': placeholderData.isFirst ? '0dp' : '30dp'
        },
        'imgRoadMapLineBottom': {
          'height': placeholderData.isLast ? '0dp' : '30dp',
          'width': placeholderData.isLast ? '0dp' : '30dp'
        }
      }
    },

    getI18nStatusText: function(status){
      switch(status){
        case this.statusConstants.PENDING: return kony.i18n.getLocalizedString('i18n.konybb.Common.Pending');
        case this.statusConstants.APPROVED: return kony.i18n.getLocalizedString('i18n.konybb.Common.Approved');
        case this.statusConstants.REJECTED: return kony.i18n.getLocalizedString('i18n.konybb.Common.Rejected');
        case this.statusConstants.SKIPPED: return kony.i18n.getLocalizedString('i18n.konybb.Common.Skipped');
        default: return '';
      }
    }
  };
});