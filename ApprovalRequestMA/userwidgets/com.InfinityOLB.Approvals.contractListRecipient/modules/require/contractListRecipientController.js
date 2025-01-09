define(function () {

  return {

    preshow: function (data, action) {
      this.initialiseComponent(data, action);
      this.initializeSortActions();
    },
    
    initializeSortActions: function() {
      this.view.imgCol1.src = "sorting_next.png";
      this.view.imgCol1.onTouchEnd = this.sortByContractName.bind(this);
      this.view.imgCol2.src = "sorting.png";
      this.view.imgCol2.onTouchEnd = this.sortByIdentityNumber.bind(this);
      this.view.imgCol3.src = "sorting_next.png";
      this.view.imgCol3.onTouchEnd = this.sortByContractName.bind(this);
    },

    initialiseComponent: function (data, action) {
      this.setDataForContracts(data, action);
    },
 
    setSegWidgetDataMap: function () {
      return {
        "flxDropdown": "flxDropdown",
        "imgDropdown": "imgDropdown",
        "lblDropdown": "lblDropdown",
        "flxContract": "flxContract",
        "lblContract": "lblContract",
        "flxIdnetityNumber": "flxIdnetityNumber",
        "lblIdentityNumber": "lblIdentityNumber",
        "flxCIF": "flxCIF",
        "lblCIF": "lblCIF",
        "flxRowCheckBox": "flxRowCheckBox",
        "lblCheckBoxSelect": "lblCheckBoxSelect",
        "flxCustomer": "flxCustomer",
        "flxCustomerDetails": "flxCustomerDetails",
        "lblCutomerName": "lblCutomerName",
        "lblCustomerNumber": "lblCustomerNumber",
        "flxRow": "flxRow",
        "flxCol1": "flxCol1",
        "flxCol2": "flxCol2",
        "flxCol3": "flxCol3",
        "lblCol1": "lblCol1",
        "lblCol2": "lblCol2",
        "lblColumn3": "lblColumn3",
        "imgCol1": "imgCol1",
        "imgCol2": "imgCol2",
        "flxContractsCollapsed": "flxContractsCollapsed",
        "imgRowCheckBox": "imgRowCheckBox",
        "flxContractsCollapsedWrapper": "flxContractsCollapsedWrapper",
        "flxSeparatorVertical": "flxSeparatorVertical",
        "flxSeparatorForHeader": "flxSeparatorForHeader",
        "lblCustomerName": "lblCustomerName",
        "flxCIFDetails": "flxCIFDetails",
        "flxHeader": "flxHeader",
        "lblUserType": "lblUserType",
        "flxCustomerNameTypeLinked":"flxCustomerNameTypeLinked",
        "ImglinkedStatus":"ImglinkedStatus",
        "flxFlag": "flxFlag",
        "ImgIsUpdatedStatus": "ImgIsUpdatedStatus",
        "lblIsUpdatedStatus": "lblIsUpdatedStatus",
        "lblIsLinked": "lblIsLinked",
        "lblCIFName": "lblCIFName",
        "flxCustLinked": "flxCustLinked",
        "flxCustLinkedLeftHighlight": "flxCustLinkedLeftHighlight",
        "lblUpdatedHeader": "lblUpdatedHeader",
        "lblLinkedVal": "lblLinkedVal",
        "flxDetailsHighlighter1": "flxDetailsHighlighter1",
        "flxDetailsHighlighter": "flxDetailsHighlighter",
        "lblDetailsHighligher": "lblDetailsHighligher",
        "lblCustomerHeader": "lblCustomerHeader",
        "flxCustomerValues": "flxCustomerValues",
        "flxContractsCollapsedMobile": "flxContractsCollapsedMobile",
        "lblCustomerCheckbox": "lblCustomerCheckbox",
        "lblSelectedCount": "lblSelectedCount"
      };
    },

    setDataForContracts: function (data, action) {
      let segData = [];
      data.contracts.forEach(x => {
        let headerData = [],selCount =0;
        let rowData = [];

        x.contractCustomers.forEach(y => {
          // to check if Linked/Delinked label needs to be shown or hidden based on association
          //var showLinkedLabel = (action === "EDIT_UPDATED" ||action === "EDIT_EXISTING") ? ((y.isLinked === true || y.isLinked === false) ? true : false) : false;
          var showLinkedLabel = false;
          if((action === "EDIT_UPDATED" || action === "EDIT_EXISTING")) {
            if((y.isLinked === true || y.isLinked === false)) {
              showLinkedLabel = true;
            }
          }
          if (y.isItUpdatedValue == false) {
            showLinkedLabel = false;
          }
          selCount = (y.isLinked === true || y.isLinked === false ) ?
                      (y.isLinked === true ? selCount+1 : selCount) :
                      (action === "EDIT_UPDATED" ||action === "EDIT_EXISTING")? selCount :(selCount+1);

          if (kony.application.getCurrentBreakpoint() === 640) {
            var mobileRowObj = {
              "flxCustomer": { "isVisible": false },
              "flxContractsCollapsedWrapper": { "isVisible": false },
              "lblCustomerCheckbox": {
                "text": (y.isLinked === true || y.isLinked === false) ?
                  (y.isLinked === true ? "C" : "D") :
                  (action === "EDIT_UPDATED" || action === "EDIT_EXISTING") ? "D" : "C"
              },
              "flxSeparatorVertical":{"isVisible":false},
              "lblUserType": { "text": y.isBusiness == "true" ? "r" : "s" },
              "lblCustomerHeader": { "text": kony.i18n.getLocalizedString("konybb.userMgmt.Customers") + ":" },
              "lblCustomerName": { "text": y.coreCustomerName &&  y.coreCustomerName.length >30 ?
                                           y.coreCustomerName.substr(0,30)+"..." : y.coreCustomerName},
              "lblCIFName": { "text": kony.i18n.getLocalizedString("i18n.payments.identityNumber") + ":" },
              "lblCIF": { "text": y.coreCustomerId },
              "flxCustLinked": { "isVisible": (showLinkedLabel === true) ? true : false },
              "lblUpdatedHeader": { "text": "Updated:" },
              "lblLinkedVal": {
                "text": (y.isLinked === true || y.isLinked === false) ? (y.isLinked === true ? "Linked" : "De-linked") : "Linked"
              },
              "template": "flxContractsCollapsedMobile"

            }
            rowData.push(mobileRowObj);
            var mobileHeaderObj = {
              "flxCustomer": { "isVisible": false },
              "flxContractsCollapsedWrapper": { "isVisible": true },
              "flxContractsCollapsedMobile":{"skin":"sknFlxffffffBorder0"},
               "flxSeparatorVertical":{"isVisible":false},
                            "flxSeparator": {"isVisible": false},
               "lblSelectedCount": {
                "isVisible": kony.application.getCurrentBreakpoint() === 640 ? true : false,
                "text": selCount + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + x.contractCustomers.length
              },
              "flxDropdown": {
                "onClick": this.toogleExpandRow
              },
              "lblIdentityNumber":{"text":  x.contractId},
              "lblDropdown": { "text": "O" },
              "lblContract": { "text": x.contractName && x.contractName.length >30 ?
                                       x.contractName.substr(0,30)+"..." : x.contractName},
              "flxFlag": { "isVisible": y.isItUpdatedValue ? y.isItUpdatedValue : false },
              "template": "flxContractsCollapsedMobile"
            };
            headerData.push(mobileHeaderObj, rowData);
          } else {
            rowData.push({
              "lblCustomerName": {
                "text": y.coreCustomerName
              },
              "lblCustomerNumber": {
                "text": y.coreCustomerId
              },
              "flxContractsCollapsedWrapper": {
                "isVisible": false,
                "skin": "slFbox"
              },
              "flxCustomerDetails": {
                "isVisible": false
              },
              "flxSeparatorForHeader": {
                "isVisible": false
              },
              "flxSeparator": {
                "isVisible": false
              },
              "flxCIFDetails": {
                "isVisible": false
              },
              "lblUserType": {
                "text": y.isBusiness == "true" ? "r" : "s",
                "isVisible": data.isCombinedUser
              },
              "flxFlag": { "isVisible": false },
              "lblIsLinked": {
                "text": (y.isLinked === true || y.isLinked === false) ? (y.isLinked === true ? "Linked" : "De-linked") : "Linked",
                "isVisible": (showLinkedLabel === true) ? true : false
              },
              "ImglinkedStatus": {
                "src": (y.isLinked === true || y.isLinked === false) ?
                  (y.isLinked === true ? "activecheckbox.png" : "inactivecheckbox.png") :
                  (action === "EDIT_UPDATED" || action === "EDIT_EXISTING") ? "inactivecheckbox.png" : "activecheckbox.png"
              },
              "template": "flxContractsCollapsed",
            });
            headerData.push({
              "flxDropdown": {
                "onClick": this.toogleExpandRow
              },
              "lblContract": {
                "text": x.contractName,
              },
              "lblIdentityNumber": {
                "text": x.contractId
              },
              "lblCIF": {
                "text": selCount + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + x.contractCustomers.length
              },
              "template":"flxContractsCollapsed",
              "lblDropdown": {
                "text": "O"
              },
              "lblCheckBoxSelect": {
                "text": "D"
              },
              "flxContractsCollapsedWrapper": {
                "isVisible": true,
                "skin": "slFbox"
              },
              "flxCustomerDetails": {
                "isVisible": false
              },
              "flxSeparatorVertical": {
                "isVisible": false
              },
              "flxSeparator": {
                "isVisible": false
              },
              "flxSeparatorForHeader": {
                "isVisible": true
              },
              "flxCIFDetails": {
                "isVisible": false
              },
            }, rowData);
          }
        });
        segData.push(headerData);
      });

      this.view.segContract.widgetDataMap = this.setSegWidgetDataMap();
      segData = this.getSortedData(segData, "lblContract", "ASC");
      this.view.segContract.setData(segData);
    },
    findContractIdforEdit: function (contractId, arr) {

      let returnArr = [];
      arr.forEach(x => {
        if (x.contractId == contractId) {
          returnArr.push(true);
          returnArr.push(x.coreCustomerId.split(','));
        }
      })

      return returnArr;

    },

    findcoreCustomerIdforEdit: function (coreCustomerId, arr) {
      return arr.includes(coreCustomerId);
    },

    toogleExpandRow: function () {

      let data = this.view.segContract.data;
      let selectedRowIndex = this.view.segContract.selectedRowIndex[0];

      if (data[selectedRowIndex][0].lblDropdown.text === "O") {
        data[selectedRowIndex][0].lblDropdown.text = "P";
        data[selectedRowIndex][0].flxSeparatorVertical.isVisible = true;
        data[selectedRowIndex][0].flxSeparator.isVisible = true;
        data[selectedRowIndex][0].flxContractsCollapsedWrapper.skin = "slFboxBGf8f7f8B0";
        if(kony.application.getCurrentBreakpoint() === 640){
          data[selectedRowIndex][1].forEach(x => x.flxCustomer.isVisible = true);
        }
        else{
          data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = true);
        }
        //kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = true : ""

      } else {
        data[selectedRowIndex][0].lblDropdown.text = "O";
        data[selectedRowIndex][0].flxSeparatorVertical.isVisible = false;
        data[selectedRowIndex][0].flxSeparator.isVisible = false;
        data[selectedRowIndex][0].flxContractsCollapsedWrapper.skin = "slFbox";
        if(kony.application.getCurrentBreakpoint() === 640){
          data[selectedRowIndex][1].forEach(x => x.flxCustomer.isVisible = false);
        }
        else{
          data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = false);  
        }
        //kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = false : ""
      }

      // data = this.getSortedData(data, "lblContract", "ASC");
      this.view.segContract.setData(data);
    },
    
    sortByContractName: function() {
      var scopeObj = this;
      var sortType = "ASC";
      if(scopeObj.view.imgCol1.src === "sorting_next.png") {
        scopeObj.view.imgCol1.src = "sorting_previous.png";
        sortType = "DESC";
      }
      else{
        scopeObj.view.imgCol1.src = "sorting_next.png";
      }
      scopeObj.view.imgCol2.src = "sorting.png";
      
      var data = scopeObj.view.segContract.data;
      data = scopeObj.getSortedData(data, "lblContract",sortType);
      scopeObj.view.segContract.setData(data);
      scopeObj.view.forceLayout();
    },
    
    sortByIdentityNumber: function() {
      var scopeObj = this;
      var sortType = "ASC";
      if(scopeObj.view.imgCol2.src === "sorting_next.png") {
        scopeObj.view.imgCol2.src = "sorting_previous.png";
        sortType = "DESC";
      }
      else{
        scopeObj.view.imgCol2.src = "sorting_next.png";
      }
      scopeObj.view.imgCol1.src = "sorting.png";
      
      var data = scopeObj.view.segContract.data;
      data = scopeObj.getSortedData(data, "lblIdentityNumber",sortType);
      scopeObj.view.segContract.setData(data);
      scopeObj.view.forceLayout();
    },
    
    getSortedData: function(data, sortField, sortType) {
      data.sort(function(a, b) {
        var data1 = a[0][sortField].text;
        var data2 = b[0][sortField].text;
        if(sortField === "lblIdentityNumber"){
          data1 = parseInt(data1);
          data2 = parseInt(data2);
        }
        else{
          data1 = data1.toLowerCase();
          data2 = data2.toLowerCase();
        }
        if (data1 > data2) {
          if (sortType === "ASC") return 1;
          else if (sortType === "DESC") return -1;
        } else if (data1 < data2) {
          if (sortType === "ASC") return -1;
          else if (sortType === "DESC") return 1;
        } else return 0;
      });
      return data; 
    }
  };
});
