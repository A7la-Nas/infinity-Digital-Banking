define({
  selectedCards: [],
  rowVal: [],
  allCards:[],
  init: function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
  },
  preShow: function() {
    var scopeObj = this;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.title = "Filter Cards";
    this.view.btnContinueSelectProducts.setEnabled(false);
    this.view.btnContinueSelectProducts.skin = "sknBtna0a0a0SSPReg26px";
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeader.isVisible = true;
    } else {
      this.view.flxHeader.isVisible = false;
    }
    this.view.customHeader.flxBack.onClick = function() {
      var navMan = applicationManager.getNavigationManager();
      navMan.goBack();
    };
    this.view.customHeader.btnRight.onClick = this.onClose;
    this.setCardData();
    this.view.segCardsList.onRowClick = function() {
      var rowindex = scopeObj.view.segCardsList.selectedRowIndex[1];
      var val = scopeObj.view.segCardsList.data[rowindex];
      var card = val["cardinfo"];
      //   scopeObj.selectedCards.push(card);scope
      if (card === "ALL") {
        //all option
        if (scopeObj.selectedCards.length == 0 || scopeObj.selectedCards.length != scopeObj.view.segCardsList.data.length - 1) {
          //unselect to select
          scopeObj.selectedCards = [];
          scopeObj.view.segCardsList.selectedRowIndices = [
            [0.0, []]
          ];
          // scopeObj.selectedCards.push(card);
          var segDta = scopeObj.view.segCardsList.data;
          scopeObj.rowVal=[];
          for (var i = 0; i < segDta.length; i++) {
            scopeObj.rowVal.push(i);
            if (i == 0) continue;
            else scopeObj.selectedCards.push(segDta[i]["cardinfo"]);
          }
          scopeObj.view.segCardsList.selectedRowIndices = [
            [0.0, scopeObj.rowVal]
          ];
        } else {
          //select to unselect
          scopeObj.selectedCards = [];
          scopeObj.rowVal = [];
          scopeObj.view.segCardsList.selectedRowIndices = [
            [0.0, scopeObj.rowVal]
          ];
        }
      } else {
        //other than all option
        if ((scopeObj.selectedCards.indexOf(card) === -1)) {
          var id =scopeObj.allCards.indexOf(card);
          scopeObj.selectedCards.push(card);
          scopeObj.rowVal.push(id +1);
          if(scopeObj.rowVal.length===scopeObj.allCards.length)
            scopeObj.rowVal.push(0);

        } else {
          var id =scopeObj.allCards.indexOf(card);
          scopeObj.selectedCards.splice(scopeObj.selectedCards.indexOf(card), 1);
          scopeObj.rowVal.splice(scopeObj.rowVal.indexOf(id+1), 1);
          if(scopeObj.rowVal.indexOf(0)!=-1)
            scopeObj.rowVal.splice(scopeObj.rowVal.indexOf(0),1);
        }
      }
      scopeObj.view.segCardsList.selectedRowIndices = [
        [0.0, []]
      ];
      scopeObj.view.segCardsList.selectedRowIndices = [
        [0.0, scopeObj.rowVal]
      ];
      if (scopeObj.selectedCards.length > 0) {
        scopeObj.view.btnContinueSelectProducts.setEnabled(true);
        scopeObj.view.btnContinueSelectProducts.skin = "sknBtn0095e4RoundedffffffSSP26px";
      } else {
        scopeObj.view.btnContinueSelectProducts.setEnabled(false);
        scopeObj.view.btnContinueSelectProducts.skin = "sknBtna0a0a0SSPReg26px";
      }
    };
    scopeObj.view.btnContinueSelectProducts.onClick = function() {
      var filteredCards = [];
      var cardsManager = applicationManager.getCardsManager();
      var cardsList = JSON.parse(JSON.stringify(cardsManager.getCardsList()));
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardManageHome", {
        "isMainScreen": false
      });
      if (scopeObj.selectedCards.indexOf("ALL") !== -1) {
        scopeObj.selectedCards = [];
        manageCardsModule.presentationController.cardsFetchSuccess(cardsList);
      } else {
        for (var i = 0; i < scopeObj.selectedCards.length; i++) {
          var accName = scopeObj.selectedCards[i].split("?")[0];
          var accId = scopeObj.selectedCards[i].split("?")[1];
          var data = cardsList.filter(acc => acc.maskedAccountNumber === accId);
          filteredCards = data.concat(filteredCards);
        }
        // scopeObj.selectedCards = [];
        manageCardsModule.presentationController.cardsFetchSuccess(filteredCards);
      }
    };
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  clearSelection: function() {
    this.selectedCards = [];
    this.view.segCardsList.selectedRowIndices = [
      [0.0, []]
    ];
    this.rowVal = [];
    this.view.btnContinueSelectProducts.setEnabled(false);
    this.view.btnContinueSelectProducts.skin = "sknBtna0a0a0SSPReg26px";
  },
  clearData: function() {
    this.rowVal = [];
    this.selectedProducts = [];
    if (this.selectedCards.length > 0) {
      this.view.btnContinueSelectProducts.setEnabled(true);
      this.view.btnContinueSelectProducts.skin = "sknBtn0095e4RoundedffffffSSP26px";
    } else {
      this.view.btnContinueSelectProducts.setEnabled(false);
      this.view.btnContinueSelectProducts.skin = "sknBtna0a0a0SSPReg26px";
    }
  },
  onClose: function() {
    this.view.segCardsList.selectedRowIndices = [
      [0.0, []]
    ];
    this.rowVal = [];
    this.selectedCards = [];
    this.view.btnContinueSelectProducts.setEnabled(false);
    this.view.btnContinueSelectProducts.skin = "sknBtna0a0a0SSPReg26px";
  },
  setCardData: function() {
    //    var scope = this;
    var cardsData = [];
    var cardManager = applicationManager.getCardsManager();
    this.view.segCardsList.removeAll();
    var response = cardManager.getFilterAccounts();
    cardsData.push({
      "lblProductTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.manage.showAllAccounts"),
      "imgCheckbox": "remeberme.png",
      "cardinfo": "ALL"
    });

    for (var i = 0; i < response.length; i++) {
      var cardsInfo = response[i].split("?");
      var accName = cardsInfo[0];
      var accNo = cardsInfo[1];
      var nickName = (applicationManager.getAccountManager().getInternalAccountByID(accNo)).nickName;
      var truncateData = (nickName !== null && nickName !== undefined && nickName !== "" ? nickName : accName) + "-" + accNo.substring((accNo.length - 4));
      cardsData.push({
        "lblProductTitle": truncateData,
        "imgCheckbox": "remeberme.png",
        "cardinfo": response[i]
      });
      this.allCards.push(response[i]);
    }
    this.view.segCardsList.setData(cardsData);
    if (this.selectedCards.length > 0 && this.selectedCards.length != (this.view.segCardsList.data.length - 1)) {
      //already selected data
      this.rowVal=[];
      for (var i = 0; i <= this.selectedCards.length; i++) {
        for (var j = 0; j < this.view.segCardsList.data.length; j++) {
          if (this.view.segCardsList.data[j]["cardinfo"] == this.selectedCards[i]) this.rowVal.push(j);
        }
      }
      this.view.segCardsList.selectedRowIndices = [
        [0.0, this.rowVal]
      ];
    } else {
      this.rowVal=[];
      this.selectedCards = [];
      var segDta = this.view.segCardsList.data;
      for (var i = 0; i < segDta.length; i++) {
        this.rowVal.push(i);
        if (i == 0) continue;
        else this.selectedCards.push(segDta[i]["cardinfo"]);
      }
      this.view.segCardsList.selectedRowIndices = [
        [0.0, this.rowVal]
      ];
    }
    this.view.btnContinueSelectProducts.setEnabled(true);
    this.view.btnContinueSelectProducts.skin = "sknBtn0095e4RoundedffffffSSP26px";
  }
});