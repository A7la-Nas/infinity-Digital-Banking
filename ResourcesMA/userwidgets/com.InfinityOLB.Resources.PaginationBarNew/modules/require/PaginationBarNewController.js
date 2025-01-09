define(function () {

  return {

    // paginationParameters - default - to be overridden by the parent form
    paginationParams: {
      pageOffset: 0,
      pageSize: 20,
      totalRecords: 110
    },

    dropDownImageConfig:{
      open: "P",
      close: "O"
    },

    dropDownPageConfig: ['10', '20', '50'],

    dropDownState: false,

    pageNavButtons: {
      btnPrevious: {
        text: "l",
        skin: "sknBtnBgFFFFFFRoundedShadowC0C0C03Px293276FontIconNew9Px",
        focusSkin: "sknBtnBgFFFFFFRoundedShadowC0C0C02PxBlur293276FontIconNew9Px"
      },
      btnNext: {
        text: "k",
        skin: "sknBtnBgFFFFFFRoundedShadowC0C0C03Px293276FontIconNew9Px",
        focusSkin: "sknBtnBgFFFFFFRoundedShadowC0C0C02PxBlur293276FontIconNew9Px"
      },
      btnFirst: {
        text: "n",
        skin: "sknBtnBgFFFFFFRoundedShadowC0C0C03Px293276FontIconNew9Px",
        focusSkin: "sknBtnBgFFFFFFRoundedShadowC0C0C02PxBlur293276FontIconNew9Px"
      },
      btnLast: {
        text: "b",
        skin: "sknBtnBgFFFFFFRoundedShadowC0C0C03Px293276FontIcon9Px",
        focusSkin: "sknBtnBgFFFFFFRoundedShadowC0C0C02PxBlur293276FontIcon9Px"
      },
      btnPrevious_inactive: {
        text: "l",
        skin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px",
        focusSkin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px"
      },
      btnNext_inactive: {
        text: "k",
        skin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px",
        focusSkin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px"
      },
      btnFirst_inactive: {
        text: "n",
        skin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px",
        focusSkin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px"
      },
      btnLast_inactive: {
        text: "b",
        skin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIcon9Px",
        focusSkin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIcon9Px"
      }
    },

    pageNavButtonsRTL: {
      btnPrevious: {
        text: "k",
        skin: "sknBtnBgFFFFFFRoundedShadowC0C0C03Px293276FontIconNew9Px",
        focusSkin: "sknBtnBgFFFFFFRoundedShadowC0C0C02PxBlur293276FontIconNew9Px"
      },
      btnNext: {
        text: "l",
        skin: "sknBtnBgFFFFFFRoundedShadowC0C0C03Px293276FontIconNew9Px",
        focusSkin: "sknBtnBgFFFFFFRoundedShadowC0C0C02PxBlur293276FontIconNew9Px"
      },
      btnFirst: {
        text: "b",
        skin: "sknBtnBgFFFFFFRoundedShadowC0C0C03Px293276FontIcon9Px",
        focusSkin: "sknBtnBgFFFFFFRoundedShadowC0C0C02PxBlur293276FontIcon9Px"
      },
      btnLast: {
        text: "n",
        skin: "sknBtnBgFFFFFFRoundedShadowC0C0C03Px293276FontIconNew9Px",
        focusSkin: "sknBtnBgFFFFFFRoundedShadowC0C0C02PxBlur293276FontIconNew9Px"
      },
      btnPrevious_inactive: {
        text: "k",
        skin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px",
        focusSkin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px"
      },
      btnNext_inactive: {
        text: "l",
        skin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px",
        focusSkin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px"
      },
      btnFirst_inactive: {
        text: "b",
        skin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIcon9Px",
        focusSkin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIcon9Px"
      },
      btnLast_inactive: {
        text: "n",
        skin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px",
        focusSkin: "sknBtnBgFEFEFERoundedShadowBFBFBF2PxA0A0A0FontIconNew9Px"
      }
    },
    
    defaultButtonConfig: this.pageNavButtons,


    //----------------------- Page Navigation Buttons config -----------------------
    initButtonSkins: function () {
      this.view.btnPrevious.text = this.defaultButtonConfig.btnPrevious.text;
      this.view.btnPrevious.skin = this.defaultButtonConfig.btnPrevious.skin;
      this.view.btnPrevious.focusSkin = this.defaultButtonConfig.btnPrevious.focusSkin;

      this.view.btnNext.text = this.defaultButtonConfig.btnNext.text;
      this.view.btnNext.skin = this.defaultButtonConfig.btnNext.skin;
      this.view.btnNext.focusSkin = this.defaultButtonConfig.btnNext.focusSkin;

      this.view.btnFirst.text = this.defaultButtonConfig.btnFirst.text;
      this.view.btnFirst.skin = this.defaultButtonConfig.btnFirst.skin;
      this.view.btnFirst.focusSkin = this.defaultButtonConfig.btnFirst.focusSkin;

      this.view.btnLast.text = this.defaultButtonConfig.btnLast.text;
      this.view.btnLast.skin = this.defaultButtonConfig.btnLast.skin;
      this.view.btnLast.focusSkin = this.defaultButtonConfig.btnLast.focusSkin;
    },

    disableNavButton: function(...btnWidgetNames){
      try{
        btnWidgetNames.forEach((btnWidgetName) => {
          this.view[btnWidgetName].enable = false;
          this.view[btnWidgetName].skin = this.defaultButtonConfig[btnWidgetName + "_inactive"].skin;
          this.view[btnWidgetName].focusSkin = this.defaultButtonConfig[btnWidgetName + "_inactive"].focusSkin;
        });
      } catch(err){
        kony.print("Given button not found in this.view: " + err);
      }
    },

    enableNavButton: function(...btnWidgetNames){
      try{
        btnWidgetNames.forEach((btnWidgetName) => {
          this.view[btnWidgetName].enable = true;
          this.view[btnWidgetName].skin = this.defaultButtonConfig[btnWidgetName].skin;
          this.view[btnWidgetName].focusSkin = this.defaultButtonConfig[btnWidgetName].focusSkin;
        });
      } catch(err){
        kony.print("Given button not found in this.view: " + err);
      }
    },
    //-----------------------------------------------------------------------------

    setPaginationParams: function(paginationParams){
      if(!kony.sdk.isNullOrUndefined(paginationParams.pageOffset)){
        this.paginationParams.pageOffset = parseInt(paginationParams.pageOffset);
      }
      if(!kony.sdk.isNullOrUndefined(paginationParams.pageSize)){
        this.paginationParams.pageSize = parseInt(paginationParams.pageSize);
      }
      if(!kony.sdk.isNullOrUndefined(paginationParams.totalRecords)){
        this.paginationParams.totalRecords = parseInt(paginationParams.totalRecords);
      }
      this.updatePaginationBar();
    },

    resetPagination: function(){
      this.paginationParams.pageOffset = 0;
      this.updatePaginationBar();
    },

    updatePaginationBar: function(){
      let totalPages = Math.ceil(this.paginationParams.totalRecords/this.paginationParams.pageSize);
      this.view.lblSelectedPageCount.text = this.geti18nPageValue(this.paginationParams.pageSize);
      if(totalPages === 0){
        this.view.lblPagePosition.text = '-';
        this.disableNavButton('btnFirst', 'btnLast', 'btnPrevious', 'btnNext');
      }
      else{
        this.view.lblPagePosition.text = (this.paginationParams.pageOffset+1) + ' ' + kony.i18n.getLocalizedString('i18n.konybb.Common.of') + ' ' + totalPages + ' ' + kony.i18n.getLocalizedString('i18n.konybb.Common.Pages');
        if(this.paginationParams.pageOffset === 0){
          this.disableNavButton('btnFirst', 'btnPrevious');
          this.enableNavButton('btnNext', 'btnLast');
        }
        else if(this.paginationParams.pageOffset === totalPages - 1){
          this.disableNavButton('btnNext', 'btnLast');
          this.enableNavButton('btnFirst', 'btnPrevious');
        }
        else{
          this.enableNavButton('btnFirst', 'btnLast', 'btnPrevious', 'btnNext');
        }
      }
    },

    geti18nPageValue: function(pageNumber){
      return kony.i18n.getLocalizedString('i18n.paginationheader.' + pageNumber + 'pages');
    },

    setSegPageList: function(rowConfig){
      let defaultValues = [];
      rowConfig.forEach(item => {
        defaultValues.push({
          lblPageListItem: {
            text: this.geti18nPageValue(item)
          },
          meta: {
            key: item
          }
        })
      });
      this.view.segPageList.setData(defaultValues);
    },

    /**
    * @descriptiion the parent callback function that handles the pagination change/update
    * @params { pageSize, pageOffset, totalRecords} to be passed to the parent callback function
    */
    onPageUpdateParentCallback: undefined,
    
    /**
    * @description initialize the parent function handler to handle the view on pagination change/update
    */

    setOnPaginationUpdateCallback: function(parentCallback){
      this.onPageUpdateParentCallback = parentCallback;
    },

    //----------------------- Page DropDown Config ------------------------
    openFlxDropDownList: function(){
      this.dropDownState = true;
      this.view.flxDropDownList.isVisible = true;
      this.view.btnDropDownToggler.text = this.dropDownImageConfig.open;
    },

    closeFlxDropDownList: function(){
      this.dropDownState = false;
      this.view.flxDropDownList.isVisible = false;
      this.view.btnDropDownToggler.text = this.dropDownImageConfig.close;
    },

    toggleFlxDropDown: function(){
      if(this.dropDownState){
        this.closeFlxDropDownList();
      }
      else{
        this.openFlxDropDownList();
      }
    },

    setSelectedPageCount: function(eventobject, sectionIndex, rowIndex, selectedState){
      let selectedPageSize = parseInt(eventobject.data[rowIndex]['meta']['key']);
      this.view.lblSelectedPageCount.text = this.geti18nPageValue(selectedPageSize);
      this.paginationParams.pageSize = selectedPageSize;
      this.resetPagination();
      this.closeFlxDropDownList();
      if(!kony.sdk.isNullOrUndefined(this.onPageUpdateParentCallback)){
        this.onPageUpdateParentCallback(this.paginationParams);
      }
    },
    //-------------------------------------------------------------------------

    // init pagination component click events
    initComponentEvents: function(){
      this.view.segPageList.onRowClick = this.setSelectedPageCount;
      this.view.btnDropDownToggler.onClick = this.toggleFlxDropDown;
      this.view.btnFirst.onClick = () => {
        this.resetPagination();
        if(!kony.sdk.isNullOrUndefined(this.onPageUpdateParentCallback))
          this.onPageUpdateParentCallback(this.paginationParams);
      };
      this.view.btnLast.onClick = () => {
        this.paginationParams.pageOffset = Math.ceil(this.paginationParams.totalRecords/this.paginationParams.pageSize) - 1;
        this.updatePaginationBar();
        if(!kony.sdk.isNullOrUndefined(this.onPageUpdateParentCallback))
          this.onPageUpdateParentCallback(this.paginationParams);
      };
      this.view.btnPrevious.onClick = () => {
        this.paginationParams.pageOffset -= 1;
        this.updatePaginationBar();
        if(!kony.sdk.isNullOrUndefined(this.onPageUpdateParentCallback))
          this.onPageUpdateParentCallback(this.paginationParams);
      };
      this.view.btnNext.onClick = () => {
        this.paginationParams.pageOffset += 1;
        this.updatePaginationBar();
        if(!kony.sdk.isNullOrUndefined(this.onPageUpdateParentCallback))
          this.onPageUpdateParentCallback(this.paginationParams);
      };
    },

    // init pagination component data
    initComponentData: function(){
      if (["ar_AE", "ar"].includes(kony.i18n.getCurrentLocale())) {
        this.defaultButtonConfig = this.pageNavButtonsRTL;
      }
      else {
        this.defaultButtonConfig = this.pageNavButtons;
      }
      this.setSegPageList(this.dropDownPageConfig);
      this.view.lblSelectedPageCount.text = this.geti18nPageValue(this.paginationParams.pageSize);
      this.updatePaginationBar();
    },

    onPreShow: function () {
      this.initComponentData();
      this.initComponentEvents();
    },

    onPostShow: function () {
      this.initButtonSkins();
      this.updatePaginationBar();
      // this.view.forceLayout();
    },
  };
});