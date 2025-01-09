define({
  init: function () {
    try {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
    } catch (e) {
      kony.print("Exception in init::" + e);
    }
  },

  preShow: function () {
    this.resetUI();
  },

  postShow: function () {
    this.setupOnClicks();
    this.view.forceLayout();
    this.getDataFromFrm();
    this.view.flxSpacer.setVisibility(true);
  },

  isiPhone: function () {
    return applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
  },

  setupOnClicks: function () {
    this.view.customHeader.flxSearch.onClick = this.filterClose.bind(this);
    this.view.btnAll.onClick = this.removeAllSelectedFromSegement.bind(this);
    this.view.btnSelectTransactionType.onClick = this.showOrHideTransactionType.bind(this);

    this.view.btnSortBy.onClick = this.showOrHideSortBy.bind(this);
    this.view.btnApprovalDate.onClick = this.selectApprovalDateSortBy.bind(this);
    this.view.btnStatus.onClick = this.selectStatusSortBy.bind(this);
    this.view.btnTransactionType.onClick = this.selectTypeSortBy.bind(this);

    this.view.btnViewBy.onClick = this.showOrHideStatus.bind(this);
    this.view.btnViewByStatusAll.onClick = this.selectStatusAll.bind(this);
    this.view.btnApproved.onClick = this.selectApproved.bind(this);
    this.view.btnRejected.onClick = this.selectRejected.bind(this);
    this.view.btnPending.onClick = this.selectPending.bind(this);

    this.view.btnViewByDuration.onClick = this.showOrHideViewByDuration.bind(this);
    this.view.btnLastSixMonths.onClick = this.selectLastSixMonths.bind(this);
    this.view.btnToday.onClick = this.selectToday.bind(this);
    this.view.btnlastoneweek.onClick = this.selectLastOneWeek.bind(this);
    this.view.btnLastOneMonth.onClick = this.selectLastOneMonths.bind(this);
    this.view.btnLastOneYear.onClick = this.selectLastOneYear.bind(this);
    this.view.btnApplyFilter.onClick = this.sendData2Form.bind(this);

    this.view.segSingleTransactions.onRowClick = this.singleSegmentSelected.bind(this);
    this.view.segBulkTransactions.onRowClick = this.bulkSegmentSelected.bind(this);
    this.view.segOtherRequests.onRowClick = this.otherSegmentSelected.bind(this);
    this.view.btnApplyFilter.onClick = this.sendData2Frm.bind(this);
  },

  resetUI: function () {   
       
    if (this.isiPhone()) {
      this.view.flxHeader.setVisibility(false);
    } else {
      this.view.flxHeader.setVisibility(true);
    }
    this.view.flxMain.setVisibility(true);

    this.view.flxSelectTransactionType.setVisibility(true);
    this.view.lblSelectTransactionTypeSeperator.setVisibility(true);
    this.view.lblSelectTransactionType.setVisibility(true);
    this.view.imgSelectTransactionType.setVisibility(true);
    this.view.imgSelectTransactionType.src = "arrowup.png";
    this.view.btnSelectTransactionType.setVisibility(true);

    this.view.flxSingleTransactions.isVisible = false;
    this.view.flxBulkTransactions.isVisible = false;
    this.view.flxOtherRequests.isVisible = false;
    
    this.view.flxAll.setVisibility(true);
    this.view.flxAllSeperator.setVisibility(true);
    this.view.imgAll.setVisibility(true);
    

    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
    var selectedData = presenter.presentationController.getFilters();
    if(selectedData===""){
       this.view.imgAll.src = "tickmark_green.png";
    }else{
       this.view.imgAll.src = "transparent.png";
    }   
    this.view.flxAllText.setVisibility(true);
    this.view.lblAllCounter.setVisibility(false);
    this.view.btnAll.setVisibility(true);

    this.view.flxSortBy.setVisibility(true);
    this.view.flxSortBys.setVisibility(true);
    this.view.imgSortBy.src = "arrowup.png";
    this.removeAllTicksFromSortBy();

    this.view.flxViewByStatus.setVisibility(true);
    this.view.flxViewByStatuss.setVisibility(true);
    this.view.imgViewBy.src = "arrowup.png";

    this.view.flxViewByDuration.setVisibility(true);
    this.view.flxViewByDurations.setVisibility(true);   
    this.view.btnApplyFilter.setVisibility(true);
    this.view.flxSpacer.setVisibility(true);

    this.setSelectedFilter();

    this.view.segSingleTransactions.widgetDataMap = {
      "flxApprovalsAndRequestFilter": "flxApprovalsAndRequestFilter",
      "flxText": "flxText",
      "imgSelect": "imgSelect",
      "lblCounter": "lblCounter",
      "lblSeperator": "lblSeperator",
      "lblText": "lblText"
    };
    this.view.segBulkTransactions.widgetDataMap = {
      "flxApprovalsAndRequestFilter": "flxApprovalsAndRequestFilter",
      "flxText": "flxText",
      "imgSelect": "imgSelect",
      "lblCounter": "lblCounter",
      "lblSeperator": "lblSeperator",
      "lblText": "lblText"
    };
    this.view.segOtherRequests.widgetDataMap = {
      "flxApprovalsAndRequestFilter": "flxApprovalsAndRequestFilter",
      "flxText": "flxText",
      "imgSelect": "imgSelect",
      "lblCounter": "lblCounter",
      "lblSeperator": "lblSeperator",
      "lblText": "lblText"
    };

    this.view.flxSpacer.setVisibility(true);

    var navManager = applicationManager.getNavigationManager();
    var formFlow = navManager.getCustomInfo("ApprovalandRequestHistory");
    if(formFlow === "RequestHistory"){
      this.view.lblPending.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      this.setDataforRequestHistoryFilter();
    }else{
      this.view.lblPending.text = kony.i18n.getLocalizedString("i18n.Search.Pending");
      this.setDataforApprovalHistoryFilter();
    }
  },
  setSelectedFilter: function () {
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');       
    var filterByStatus =  presenter.presentationController.getFiltersbyStatus();
    var filterByDuration = presenter.presentationController.getFiltersbyDuration();
    var filterBySort=  presenter.presentationController.getFiltersbySort();

    if(filterByStatus!==""){
      var seletedFilterbystatus = filterByStatus.split(",");
      if(seletedFilterbystatus.length === 3){
         this.selectStatusAll();
      }else{
      for(var j = 0; j < seletedFilterbystatus.length; j++) {      
          if(seletedFilterbystatus[j] === "Approved"){
            this.view.imgApproved.src= "checkboxtick.png";
          }else if(seletedFilterbystatus[j] === "Rejected"){
            this.view.imgRejected.src= "checkboxtick.png";
          }else if(seletedFilterbystatus[j] === "Pending"){
            this.view.imgPending.src= "checkboxtick.png";
          }else if(seletedFilterbystatus[j] === "Withdrawn"){
            this.view.imgPending.src= "checkboxtick.png";
          }
        }
      }
    } else{
      this.selectStatusAll();
    }

    
    if(filterBySort!==""){
      if(filterBySort==="sentDate"){
        this.view.flxpprovaldate.src = "tickmark_green.png";
      }else if(filterBySort==="status"){
        this.view.imgStatus.src = "tickmark_green.png";
      }else if(filterBySort==="featureActionName"){
        this.view.imgTransactionType.src = "tickmark_green.png";
      }
    }

    
    if(filterByDuration!==""){
      if(filterByDuration==="6,MONTH"){
        this.view.imgLastSixMonths.src = "radiobtn_big.png";
      }else if(filterByDuration==="1,DAY"){
        this.view.imgToday.src = "radiobtn_big.png";
      } else if(filterByDuration==="1,WEEk"){
        this.view.imglastoneweek.src = "radiobtn_big.png";
      }else if(filterByDuration==="1,MONTH"){
        this.view.imgLastOneMonth.src = "radiobtn_big.png";
      }else if(filterByDuration==="1,YEAR"){
        this.view.imgLastOneYear.src = "radiobtn_big.png";
      }   
    }else{       
      this.selectLastSixMonths();
    }
    
  },
  setDataforApprovalHistoryFilter: function () {
    var scope = this;
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
    var selectedData = presenter.presentationController.getFilters();
    var splitAccountTransType = selectedData.split(",");
    
    if(presenter.presentationController.isSingleApprovalsHistoryAvailable) {
      var segSingleData = presenter.presentationController.singleApprovalsHistory;
      var i = 0;
      for(i = 0; i < segSingleData.length; i++) {
        segSingleData[i]["imgSelect"] = "transparent.png";
        if(selectedData !== "") {
          for(var j = 0; j < splitAccountTransType.length; j++) {
            if(segSingleData[i]["lblText"] === splitAccountTransType[j]){
              segSingleData[i]["imgSelect"] = "tickmark_green.png"; 
            }
          }
        }
        else {
          segSingleData[i]["imgSelect"] = "transparent.png";
        }
      }
      scope.view.segSingleTransactions.setData(segSingleData);
      scope.view.segSingleTransactions.setVisibility(true);
       this.view.flxSelectTransactionTypeS.setVisibility(true);
     // scope.view.flxSingleTransactions.setVisibility(true);
    }
    else {
     // scope.view.flxSingleTransactions.setVisibility(false);
      scope.view.segSingleTransactions.setVisibility(false);
    }

    if(presenter.presentationController.isBulkApprovalsHistoryAvailable) {
      var segBulkData = presenter.presentationController.bulkApprovalsHistory;
      var j = 0;
      for(j = 0; j < segBulkData.length; j++) {
         segBulkData[j]["imgSelect"] = "transparent.png";
        if(selectedData !== "") {
          for(var j = 0; j < splitAccountTransType.length; j++) {
            if(segBulkData[j]["lblText"] === splitAccountTransType[j]){
              segBulkData[j]["imgSelect"] = "tickmark_green.png";    
            }
          }
        }else {
          segBulkData[j]["imgSelect"] = "transparent.png";
        }
      }
      scope.view.segBulkTransactions.setData(segBulkData);
      scope.view.segBulkTransactions.setVisibility(true);
       this.view.flxSelectTransactionTypeS.setVisibility(true);
      //scope.view.flxBulkTransactions.setVisibility(true);
    }
    else {
     // scope.view.flxBulkTransactions.setVisibility(false);
      scope.view.segBulkTransactions.setVisibility(false);
    }

    if(presenter.presentationController.isOtherApprovalsHistoryAvailable) {
      var segOtherData = presenter.presentationController.otherApprovalsHistory;
      var k = 0;
      for(k = 0; k < segOtherData.length; k++) {
          segOtherData[k]["imgSelect"] = "transparent.png";
        if(selectedData !== "") {
          for(var j = 0; j < splitAccountTransType.length; j++) {
            if(segOtherData[k]["lblText"] === splitAccountTransType[j]){
              segOtherData[k]["imgSelect"] = "tickmark_green.png"; }
          }
        }
        else {
          segOtherData[k]["imgSelect"] = "transparent.png";
        }
      }
      scope.view.segOtherRequests.setData(segOtherData);
      scope.view.segOtherRequests.setVisibility(true);
       this.view.flxSelectTransactionTypeS.setVisibility(true);
     // scope.view.flxOtherRequests.setVisibility(true);
    }
    else {
    //  scope.view.flxOtherRequests.setVisibility(false);
      scope.view.segOtherRequests.setVisibility(false);
    }
  },
  
  setDataforRequestHistoryFilter: function () {
    var scope = this;
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
    var selectedData = presenter.presentationController.getFilters();
    var splitAccountTransType = selectedData.split(",");
    
    if(presenter.presentationController.isSingleRequestsHistoryAvailable) {
      var segSingleData = presenter.presentationController.singleRequestsHistory;
      var i = 0;
      for(i = 0; i < segSingleData.length; i++) {
        segSingleData[i]["imgSelect"] = "transparent.png";
        if(selectedData !== "") {
          for(var j = 0; j < splitAccountTransType.length; j++) {
            if(segSingleData[i]["lblText"] === splitAccountTransType[j]){
              segSingleData[i]["imgSelect"] = "tickmark_green.png";}
          }}
        else {
          segSingleData[i]["imgSelect"] = "transparent.png";
        }
      }
      scope.view.segSingleTransactions.setData(segSingleData);
      scope.view.segSingleTransactions.setVisibility(true);
       this.view.flxSelectTransactionTypeS.setVisibility(true);
     // scope.view.flxSingleTransactions.setVisibility(true);
    }
    else {
     // scope.view.flxSingleTransactions.setVisibility(false);
      scope.view.segSingleTransactions.setVisibility(false);
    }

    if(presenter.presentationController.isBulkRequestsHistoryAvailable) {
      var segBulkData = presenter.presentationController.bulkRequestsHistory;
      var j = 0;
      for(j = 0; j < segBulkData.length; j++) {
        segBulkData[j]["imgSelect"] = "transparent.png";
        if(selectedData !== "") {
          for(var s = 0; s < splitAccountTransType.length; s++) {
            if(segBulkData[j]["lblText"] === splitAccountTransType[s]){
              segBulkData[j]["imgSelect"] = "tickmark_green.png";}
          }}
        else {
          segBulkData[j]["imgSelect"] = "transparent.png";
        }
      }
      scope.view.segBulkTransactions.setData(segBulkData);
      scope.view.segBulkTransactions.setVisibility(true);
       this.view.flxSelectTransactionTypeS.setVisibility(true);
    //  scope.view.flxBulkTransactions.setVisibility(true);
    }
    else {
    //  scope.view.flxBulkTransactions.setVisibility(false);
      scope.view.segBulkTransactions.setVisibility(false);
    }

    if(presenter.presentationController.isOtherRequestsHistoryAvailable) {
      var segOtherData = presenter.presentationController.otherRequestsHistory;
      var k = 0;
      for(k = 0; k < segOtherData.length; k++) {
        segOtherData[k]["imgSelect"] = "transparent.png";
        if(selectedData !== "") {
          for(var m = 0; m < splitAccountTransType.length; m++) {
          if(segOtherData[k]["lblText"] === splitAccountTransType[m]){
            segOtherData[k]["imgSelect"] = "tickmark_green.png";
          }
        }}
        else {
          segOtherData[k]["imgSelect"] = "transparent.png";
        }
      }
      scope.view.segOtherRequests.setData(segOtherData);
      scope.view.segOtherRequests.setVisibility(true);
       this.view.flxSelectTransactionTypeS.setVisibility(true);
     // scope.view.flxOtherRequests.setVisibility(true);
    }
    else {
     // scope.view.flxOtherRequests.setVisibility(false);
      scope.view.segOtherRequests.setVisibility(false);
    }
  },
  
  showOrHideTransactionType: function () {
    if (this.view.imgSelectTransactionType.src === "arrowup.png") {
      this.view.flxSelectTransactionTypeS.setVisibility(false);
      this.view.imgSelectTransactionType.src = "arrowdown.png";
    } else {
      this.view.flxSelectTransactionTypeS.setVisibility(true);
      this.view.imgSelectTransactionType.src = "arrowup.png";
    }
    this.view.forceLayout();
  },

  selectAllTransactionType: function () {
    this.removeAllTicksFromTransactionType(); //.bind(this);
    this.view.imgAll.src = "tickmark_green.png";
    this.view.forceLayout();
  },

  removeAllTicksFromTransactionType: function () {
    if (this.view.segSingleTransactions.isVisible) {
      var singleData = this.view.segSingleTransactions.data;
      singleData.forEach(function (entry) {
        if (!kony.sdk.isNullOrUndefined(entry["imgSelect"]))
          entry["imgSelect"]["src"] = "transparent.png";
      });
      this.view.segSingleTransactions.data = singleData;
    }
    if (this.view.segBulkTransactions.isVisible) {
      var bulkData = this.view.segBulkTransactions.data;
      bulkData.forEach(function (entry) {
        if (!kony.sdk.isNullOrUndefined(entry["imgSelect"]))
          entry["imgSelect"]["src"] = "transparent.png";
      });
      this.view.segBulkTransactions.data = bulkData;
    }
    if (this.view.segOtherRequests.isVisible) {
      var otherData = this.view.segOtherRequests.data;
      otherData.forEach(function (entry) {
        if (!kony.sdk.isNullOrUndefined(entry["imgSelect"]))
          entry["imgSelect"]["src"] = "transparent.png";
      });
      this.view.segOtherRequests.data = otherData;
    }
    this.view.imgAll.src = "transparent.png";
  },

  showOrHideSortBy: function () {
    if (this.view.imgSortBy.src === "arrowup.png") {
      this.view.flxSortBys.setVisibility(false);
      this.view.imgSortBy.src = "arrowdown.png";
    } else {
      this.view.flxSortBys.setVisibility(true);
      this.view.imgSortBy.src = "arrowup.png";
    }
    this.view.forceLayout();
  },

  removeAllTicksFromSortBy: function () {
    this.view.flxpprovaldate.src = "transparent.png";
    this.view.imgStatus.src = "transparent.png";
    this.view.imgTransactionType.src = "transparent.png";
  },

  selectApprovalDateSortBy: function () {
    this.removeAllTicksFromSortBy();
    this.view.flxpprovaldate.src = "tickmark_green.png";
  },

  selectStatusSortBy: function () {
    this.removeAllTicksFromSortBy();
    this.view.imgStatus.src = "tickmark_green.png";
  },

  selectTypeSortBy: function () {
    this.removeAllTicksFromSortBy();
    this.view.imgTransactionType.src = "tickmark_green.png";
  },

  showOrHideStatus: function () {
    if (this.view.imgViewBy.src === "arrowup.png") {
      this.view.flxViewByStatuss.setVisibility(false);
      this.view.imgViewBy.src = "arrowdown.png";
    } else {
      this.view.flxViewByStatuss.setVisibility(true);
      this.view.imgViewBy.src = "arrowup.png";
    }
    this.view.forceLayout();
  },

  removeCheckBoxesFromViewByStatus: function () {
    this.view.imgViewByStatusAll.src = "checkboxempty.png";
    this.view.imgApproved.src = "checkboxempty.png";
    this.view.imgRejected.src = "checkboxempty.png";
    this.view.imgPending.src = "checkboxempty.png";
  },

  selectStatusAll: function () {
    this.removeCheckBoxesFromViewByStatus();
    this.view.imgViewByStatusAll.src = "checkboxtick.png";
  },

  areAllSelected: function () {
    if (this.view.imgApproved.src === "checkboxtick.png")
      if (this.view.imgRejected.src === "checkboxtick.png")
        if (this.view.imgPending.src === "checkboxtick.png")
          return true;
    return false;
  },

  selectApproved: function () {
    if(this.view.imgViewByStatusAll.src === "checkboxempty.png"){ // master filter is deactivated
      // perform normal toggle
      this.view.imgApproved.src = this.view.imgApproved.src === "checkboxtick.png" ? "checkboxempty.png" : "checkboxtick.png";
      // check if Approved, Rejected and Withdrawn are selected
      if(this.areAllSelected()){
        this.selectStatusAll();
      }
    }
    else{
      // remove master toggle first (Approved, Rejected and Withdrawn remain unchecked)
      this.view.imgViewByStatusAll.src = "checkboxempty.png";
      // perform normal toggle
      this.view.imgApproved.src = this.view.imgApproved.src === "checkboxtick.png" ? "checkboxempty.png" : "checkboxtick.png";
    }
  },

  selectRejected: function () {   
    if(this.view.imgViewByStatusAll.src === "checkboxempty.png"){ // master filter is deactivated
      // perform normal toggle
      this.view.imgRejected.src = this.view.imgRejected.src === "checkboxtick.png" ? "checkboxempty.png" : "checkboxtick.png";
      // check if Approved, Rejected and Withdrawn are selected
      if(this.areAllSelected()){
        this.selectStatusAll();
      }
    }
    else{
      // remove master toggle first (Approved, Rejected and Withdrawn remain unchecked)
      this.view.imgViewByStatusAll.src = "checkboxempty.png";
      // perform normal toggle
      this.view.imgRejected.src = this.view.imgRejected.src === "checkboxtick.png" ? "checkboxempty.png" : "checkboxtick.png";
    }
  },

  selectPending: function () {
    if(this.view.imgViewByStatusAll.src === "checkboxempty.png"){ // master filter is deactivated
      // perform normal toggle
      this.view.imgPending.src = this.view.imgPending.src === "checkboxtick.png" ? "checkboxempty.png" : "checkboxtick.png";
      // check if Approved, Rejected and Withdrawn are selected
      if(this.areAllSelected()){
        this.selectStatusAll();
      }
    }
    else{
      // remove master toggle first (Approved, Rejected and Withdrawn remain unchecked)
      this.view.imgViewByStatusAll.src = "checkboxempty.png";
      // perform normal toggle
      this.view.imgPending.src = this.view.imgPending.src === "checkboxtick.png" ? "checkboxempty.png" : "checkboxtick.png";
    }
  },

  showOrHideViewByDuration: function () {
    if (this.view.imgViewByDuration.src === "arrowup.png") {
      this.view.flxViewByDurations.setVisibility(false);
      this.view.imgViewByDuration.src = "arrowdown.png";
    } else {
      this.view.flxViewByDurations.setVisibility(true);
      this.view.imgViewByDuration.src = "arrowup.png";
    }
    this.view.forceLayout();
  },

  removeAllDurations: function () {
    this.view.imgLastSixMonths.src = "radiobuttoninactive_big.png";
    this.view.imgToday.src = "radiobuttoninactive_big.png";
    this.view.imglastoneweek.src = "radiobuttoninactive_big.png";
    this.view.imgLastOneMonth.src = "radiobuttoninactive_big.png";
    this.view.imgLastOneYear.src = "radiobuttoninactive_big.png";
  },

  selectLastSixMonths: function () {
    this.removeAllDurations();
    this.view.imgLastSixMonths.src = "radiobtn_big.png";
  },

  selectToday: function () {
    this.removeAllDurations();
    this.view.imgToday.src = "radiobtn_big.png";
  },

  selectLastOneWeek: function () {
    this.removeAllDurations();
    this.view.imglastoneweek.src = "radiobtn_big.png";
  },

  selectLastOneMonths: function () {
    this.removeAllDurations();
    this.view.imgLastOneMonth.src = "radiobtn_big.png";
  },

  selectLastOneYear: function () {
    this.removeAllDurations();
    this.view.imgLastOneYear.src = "radiobtn_big.png";
  },

  sendData2Form : function () {
    try {
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');       
      presenter.presentationController.setFiltersbyStatus("");
      presenter.presentationController.setFiltersbyDuration("");
      presenter.presentationController.setFiltersbySort("");
      presenter.presentationController.setFilters("");
      
      if(this.view.imgAll.src === "tickmark_green.png") {
        this.setFilters("");
      } else {       
        if(presenter.presentationController.isSingleApprovalsHistoryAvailable == true || presenter.presentationController.isSingleRequestsHistoryAvailable == true) {
          var single = this.view.segSingleTransactions.data;
          single.forEach(function (entry) {
            if (!kony.sdk.isNullOrUndefined(entry["imgSelect"]))
              if(entry["imgSelect"] === "tickmark_green.png") {
                var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
                var presentData = presenter.presentationController.getFilters();
                var name = entry["lblText"];
                if(presentData === "") {
                  presenter.presentationController.setFilters(name);
                }
                else {
                  presenter.presentationController.setFilters(presentData + "," + name);
                }
              }
          });
        }
        
        if(presenter.presentationController.isBulkRequestsHistoryAvailable == true || presenter.presentationController.isBulkApprovalsHistoryAvailable == true) {
          var bulk = this.view.segBulkTransactions.data;
          bulk.forEach(function (entry) {
            if (!kony.sdk.isNullOrUndefined(entry["imgSelect"]))
              if(entry["imgSelect"] === "tickmark_green.png") {
                var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
                var presentData = presenter.presentationController.getFilters();
                var name = entry["lblText"];
                if(presentData === "") {
                  presenter.presentationController.setFilters(name);
                }
                else {
                  presenter.presentationController.setFilters(presentData + "," + name);
                }
              }
          });
        }
        if(presenter.presentationController.isOtherRequestsHistoryAvailable == true || presenter.presentationController.isOtherApprovalsHistoryAvailable == true) {
          var other = this.view.segOtherRequests.data;
          other.forEach(function (entry) {
            if (!kony.sdk.isNullOrUndefined(entry["imgSelect"]))
              if(entry["imgSelect"] === "tickmark_green.png") {
                var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
                var presentData = presenter.presentationController.getFilters();
                var name = entry["lblText"];
                if(presentData === "") {
                  presenter.presentationController.setFilters(name);
                }
                else {
                  presenter.presentationController.setFilters(presentData + "," + name);
                }
              }
          });
        }
      }  
      
      if(this.view.imgViewByStatusAll.src === "checkboxtick.png")
      {
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
        var presentData = presenter.presentationController.getFiltersbyStatus(); 
        var nameofStatus;
        var navManager = applicationManager.getNavigationManager();
        var formFlow = navManager.getCustomInfo("ApprovalandRequestHistory");
        if(formFlow === "RequestHistory"){
          nameofStatus="Withdrawn";
        }else{
          nameofStatus="Pending";
        }
        if(presentData === "") {
          presenter.presentationController.setFiltersbyStatus("Approved,Rejected,"+nameofStatus);
        } 
      }

      if(this.view.imgApproved.src === "checkboxtick.png")
      {
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
        var presentData = presenter.presentationController.getFiltersbyStatus();             
        if(presentData === "") {
          presenter.presentationController.setFiltersbyStatus("Approved");
        } else {
          presenter.presentationController.setFiltersbyStatus(presentData + "," +"Approved");
        }
      }

      if(this.view.imgRejected.src === "checkboxtick.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
        var presentData = presenter.presentationController.getFiltersbyStatus();             
        if(presentData === "") {
          presenter.presentationController.setFiltersbyStatus("Rejected");
        } else {
          presenter.presentationController.setFiltersbyStatus(presentData + "," +"Rejected");
        }
      }

      if(this.view.imgPending.src === "checkboxtick.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
        var presentData = presenter.presentationController.getFiltersbyStatus();  
        var navManager = applicationManager.getNavigationManager();
        var nameofStatus;
        var formFlow = navManager.getCustomInfo("ApprovalandRequestHistory");
        if(formFlow === "RequestHistory"){
          nameofStatus="Withdrawn";
        }else{
          nameofStatus="Pending";
        }         
        if(presentData === "") {
          presenter.presentationController.setFiltersbyStatus(nameofStatus);
        } else {
          presenter.presentationController.setFiltersbyStatus(presentData + "," +nameofStatus);
        }
      } 

      if(this.view.imgLastSixMonths.src === "radiobtn_big.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');                     
        presenter.presentationController.setFiltersbyDuration("6,MONTH");          
      }         
      if(this.view.imgToday.src === "radiobtn_big.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');                            
        presenter.presentationController.setFiltersbyDuration("1,DAY");          
      }        
      if(this.view.imglastoneweek.src === "radiobtn_big.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');                     
        presenter.presentationController.setFiltersbyDuration("1,WEEk");          
      }
      if(this.view.imgLastOneMonth.src === "radiobtn_big.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');                     
        presenter.presentationController.setFiltersbyDuration("1,MONTH");          
      }
      if(this.view.imgLastOneYear.src === "radiobtn_big.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');                      
        presenter.presentationController.setFiltersbyDuration("1,YEAR");          
      }
      if(this.view.flxpprovaldate.src === "tickmark_green.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');                      
        presenter.presentationController.setFiltersbySort("approvalDate");          
      }
      if(this.view.imgStatus.src === "tickmark_green.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');                      
        presenter.presentationController.setFiltersbySort("status");          
      }
      if(this.view.imgTransactionType.src === "tickmark_green.png"){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');                      
        presenter.presentationController.setFiltersbySort("featureActionName");          
      }
    }
   
    catch(e) {}
    this.dummyGoBack();
  },

  sendData2Frm: function() {
    this.sendData2Form();
  },

  getDataFromFrm : function () {

  },

  setFilters : function(data) {
    if(kony.sdk.isNullOrUndefined(data)) data = "";
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
    return presenter.presentationController.setFilters(data);
  },

  getFilters : function() {
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
    return presenter.presentationController.getFilters();
  },

  singleSegmentSelected : function(context1){
    //var selectedRowItem = context1["selectedRowItems"];
    this.view.imgAll.src = "transparent.png";
    var data = this.view.segSingleTransactions.data;
    if(data[context1["selectedRowIndices"][0][1][0]]["imgSelect"] === "transparent.png")
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"] = "tickmark_green.png";
    else
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"] = "transparent.png";
    this.view.segSingleTransactions.data = data;
  },

  bulkSegmentSelected : function(context1){
    this.view.imgAll.src = "transparent.png";
    var data = this.view.segBulkTransactions.data;
    if(data[context1["selectedRowIndices"][0][1][0]]["imgSelect"] === "transparent.png")
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"] = "tickmark_green.png";
    else
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"] = "transparent.png";
    this.view.segBulkTransactions.data = data;
  },

  otherSegmentSelected : function(context1){
    this.view.imgAll.src = "transparent.png";
    var data = this.view.segOtherRequests.data;
    if(data[context1["selectedRowIndices"][0][1][0]]["imgSelect"] === "transparent.png")
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"] = "tickmark_green.png";
    else
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"] = "transparent.png";
    this.view.segOtherRequests.data = data;
  },
  
  selectAll : function () {
    this.removeAllSelectedFromSegement();    
    this.view.imgAll.src = "tickmark_green.png";
  },

  removeAllSelectedFromSegement : function() {
//     if(this.view.imgAll.src==="tickmark_green.png"){
//        this.view.imgAll.src = "transparent.png";
//     }else{
       this.view.imgAll.src = "tickmark_green.png";
   // }
    
    var data0 = this.view.segOtherRequests.data;
    var data1 = this.view.segBulkTransactions.data;
    var data2 = this.view.segSingleTransactions.data;

    data0.forEach(function (entry) {
      entry["imgSelect"] = {
        "src" : "transparent.png"
      };
    });

    data1.forEach(function (entry) {
      entry["imgSelect"] = {
        "src" : "transparent.png"
      };
    });

    data2.forEach(function (entry) {
      entry["imgSelect"] = {
        "src" : "transparent.png"
      };
    });
    
    this.view.segOtherRequests.data = data0;
    this.view.segBulkTransactions.data = data1;
    this.view.segSingleTransactions.data = data2;
  },

  goBack : function () {
    //var navManager = applicationManager.getNavigationManager();
    //navManager.goBack();
    this.init();
  },
  filterClose :function () {
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');       
        presenter.presentationController.setFiltersbyStatus("");
        presenter.presentationController.setFiltersbyDuration("");
        presenter.presentationController.setFilters("");
        presenter.presentationController.setFiltersbySort("");
    var ntf = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
    ntf.navigate();
  },

  dummyGoBack : function () {
    //var navManager = applicationManager.getNavigationManager();
    //navManager.goBack();
    //this.init();
    var ntf = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
    ntf.navigate();
  },
});