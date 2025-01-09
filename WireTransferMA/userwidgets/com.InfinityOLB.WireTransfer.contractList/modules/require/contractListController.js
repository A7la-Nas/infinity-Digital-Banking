define(function () {

  return {

    preshow: function (data, editData) {
      this.initialiseComponent(data, editData);
      this.initializeSearchActions();
      this.initializeSortActions();
      this.view.lblCheckBoxSelectAll.onTouchStart = this.toogleSelectAllCheckBox;
    },
    
    initializeSearchActions: function() {
      this.view.txtSearch.text = "";
      this.view.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.SearchPlaceholder");
      this.view.flxClear.setVisibility(false);
      this.view.flxClear.onClick = this.onSearchClearBtnClick.bind(this);
      this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
      this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this);
      this.view.flxSearchBtn.onClick = this.onSearchBtnClick.bind(this);
    },
    
    initializeSortActions: function() {
      this.view.imgCol1.src = "sorting_next.png";
      this.view.imgCol1.onTouchEnd = this.sortByContractName.bind(this);
      this.view.imgCol2.src = "sorting.png";
      this.view.imgCol2.onTouchEnd = this.sortByIdentityNumber.bind(this);
    },

    initialiseComponent: function (data, editData) {
      this.view.flxNoResultsFound.setVisibility(false);
      this.setDataForContracts(data, editData);
      this.setDataForSelecAllCheckBox();

    },

    disableConfirmButton: function (value) {

      if (value == true) {
        this.view.btnAction6.setEnabled(false);
        this.view.btnAction6.skin = "sknBtnBlockedSSPFFFFFF15Px";
      } else if (value == false) {
        this.view.btnAction6.setEnabled(true);
        this.view.btnAction6.skin = "sknBtnNormalSSPFFFFFF4vs";
      } else {
        this.disableConfirmButton(this.view.segContract.data.every(x => {
          return x[0].lblCheckBoxSelect.text === "D"
        }));
      }

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
        "lblCustomerCheckbox": "lblCustomerCheckbox",
        "lblCutomerName": "lblCutomerName",
        "lblCustomerNumber": "lblCustomerNumber",
        "flxRow": "flxRow",
        "flxCol1": "flxCol1",
        "flxCol2": "flxCol2",
        "flxCol3": "flxCol3",
        "flxCol4": "flxCol4",
        "lblCol1": "lblCol1",
        "lblCol2": "lblCol2",
        "lblColumn3": "lblColumn3",
        "lblCol4": "lblCol4",
        "imgCol1": "imgCol1",
        "imgCol2": "imgCol2",
        "lblCheckBoxSelectAll": "lblCheckBoxSelectAll",
        "flxContractsCollapsed": "flxContractsCollapsed",
        "imgRowCheckBox": "imgRowCheckBox",
        "flxContractsCollapsedWrapper": "flxContractsCollapsedWrapper",
        "flxSeparatorVertical": "flxSeparatorVertical",
        "flxSeparatorForHeader": "flxSeparatorForHeader",
        "flxSeparator": "flxSeparator",
        "lblCustomerName": "lblCustomerName",
        "flxCustomerCheckbox": "flxCustomerCheckbox",
        "flxCIFDetails": "flxCIFDetails",
        "flxHeader": "flxHeader",
        "lblUserType": "lblUserType",
        "flxCheckBox": "flxCheckBox"
      };
    },

    setDataForContracts: function (data, editData) {

      let segData = [];

      data.contracts.forEach(x => {
        let headerData = [];
        let rowData = [];

        x.contractCustomers.forEach(y => {
          rowData.push({
            "lblCustomerName": {
              "text": y.coreCustomerName
            },
            "lblCustomerNumber": {
              "text": y.coreCustomerId
            },
            "lblCustomerCheckbox": {
              "text": "D"
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
            "flxCustomerCheckbox": {
              "onClick": this.toogleCustomerCheckBox
            },
            "flxCIFDetails": {
              "isVisible": false
            },
            "lblUserType": {
              "text": y.isBusiness == "true" ? "r" : "s",
              "isVisible": data.isCombinedUser
            },
            "template": kony.application.getCurrentBreakpoint() === 640
              ? "flxContractsCollapsedMobile"
              : "flxContractsCollapsed",
          })
        })

        headerData.push({
          "flxDropdown": {
            "onClick": this.toogleExpandRow
          },
          "flxCheckBox": {
            "onClick": this.toogleRowCheckBox
          },
          "lblContract": {
            "text": x.contractName,
          },
          "lblIdentityNumber": {
            "text": x.contractId
          },
          "lblCIF": {
            "text": "0 of " + x.contractCustomers.length
          },
          "template": kony.application.getCurrentBreakpoint() === 640
            ? "flxContractsCollapsedMobile"
            : "flxContractsCollapsed",
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

        segData.push(headerData);
      });

      this.view.segContract.widgetDataMap = this.setSegWidgetDataMap();
      segData = this.getSortedData(segData, "lblContract", "ASC");

      if (editData) {
        segData.forEach(x => {
          let contractId = x[0].lblIdentityNumber.text;
          let contractIdDetails = this.findContractIdforEdit(contractId, JSON.parse(editData));
          if (contractIdDetails[0]) {
            x[0].lblCheckBoxSelect.text = "C";
            x[0].lblCIF.text = contractIdDetails[1].length + x[0].lblCIF.text.substr(x[0].lblCIF.text.indexOf("of") - 1);
            x[1].forEach(y => {
              let coreCustomerId = y.lblCustomerNumber.text;
              let coreCustomerIdDetails = this.findcoreCustomerIdforEdit(coreCustomerId, contractIdDetails[1])
              if (coreCustomerIdDetails) {
                y.lblCustomerCheckbox.text = "C"
              }
            })
          }
        });
        this.disableConfirmButton(false);
      }
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
        data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = true);
        kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = true : ""

      } else {
        data[selectedRowIndex][0].lblDropdown.text = "O";
        data[selectedRowIndex][0].flxSeparatorVertical.isVisible = false;
        data[selectedRowIndex][0].flxSeparator.isVisible = false;
        data[selectedRowIndex][0].flxContractsCollapsedWrapper.skin = "slFbox";
        data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = false);
        kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = false : ""
      }

      // data = this.getSortedData(data, "lblContract", "ASC");
      this.view.segContract.setData(data);
    },

    toogleRowCheckBox: function (index) {

      let data = this.view.segContract.data;
      let selectedRowIndex;

      if (index != undefined && index >= 0) {
        selectedRowIndex = index;
      } else {
        selectedRowIndex = this.view.segContract.selectedRowIndex[0];
      }
      let customerLength = data[selectedRowIndex][1].length;

      if (data[selectedRowIndex][0].lblCheckBoxSelect.text === "D") {
        data[selectedRowIndex][0].lblCheckBoxSelect.text = "C";
        data[selectedRowIndex][0].lblCIF.text = customerLength + " of " + customerLength;
        data[selectedRowIndex][1].forEach(x => x.lblCustomerCheckbox.text = "C");
      } else {
        data[selectedRowIndex][0].lblCheckBoxSelect.text = "D";
        data[selectedRowIndex][0].lblCIF.text = 0 + " of " + customerLength;
        data[selectedRowIndex][1].forEach(x => x.lblCustomerCheckbox.text = "D")
        this.view.lblCheckBoxSelectAll.text = "D"
      }
      // data = this.getSortedData(data, "lblContract", "ASC");
      this.view.segContract.setData(data);

      this.setDataForSelecAllCheckBox();
    },

    toogleCustomerCheckBox: function () {

      let data = this.view.segContract.data;
      let selectedRowIndex = this.view.segContract.selectedRowIndex[0];
      let selectedSectionIndex = this.view.segContract.selectedRowIndices[0][1][0];

      let length = 0;
      let customerLength = data[selectedRowIndex][1].length;

      data[selectedRowIndex][1][selectedSectionIndex].lblCustomerCheckbox.text === "D"
        ? data[selectedRowIndex][1][selectedSectionIndex].lblCustomerCheckbox.text = "C"
        : data[selectedRowIndex][1][selectedSectionIndex].lblCustomerCheckbox.text = "D",
        this.view.lblCheckBoxSelectAll.text = "D";

      data[selectedRowIndex][1].forEach(x => {
        x.lblCustomerCheckbox.text === "C"
          ? data[selectedRowIndex][0].lblCheckBoxSelect.text !== "C"
            ? data[selectedRowIndex][0].lblCheckBoxSelect.text = "C"
            : ""
          : length++
      });

      length == customerLength
        ? data[selectedRowIndex][0].lblCheckBoxSelect.text = "D"
        : ""

      data[selectedRowIndex][0].lblCIF.text = customerLength - length + " of " + customerLength;
      // data = this.getSortedData(data, "lblContract", "ASC");
      this.view.segContract.setData(data);

      this.setDataForSelecAllCheckBox();
    },

    toogleSelectAllCheckBox: function () {

      let data = this.view.segContract.data;

      if (this.view.lblCheckBoxSelectAll.text === "D") {
        this.view.lblCheckBoxSelectAll.text = "C"
        data.forEach((x, i) => {
          x[0].lblCheckBoxSelect.text = "D"
          this.toogleRowCheckBox(i)
        })
      } else {
        this.view.lblCheckBoxSelectAll.text = "D"
        data.forEach((x, i) => {
          x[0].lblCheckBoxSelect.text = "C"
          this.toogleRowCheckBox(i)
        })
      }
    },

    setDataForSelecAllCheckBox: function () {

      if (this.view.segContract.data.every(x => {
        return x[0].lblCheckBoxSelect.text === "C"
      })) {
        this.view.lblCheckBoxSelectAll.text = "C"
      } else {
        this.view.lblCheckBoxSelectAll.text = "D"
      }
      this.disableConfirmButton();
    },

    onTxtSearchKeyUp: function () {
      var scopeObj = this;
      var searchKeyword = scopeObj.view.txtSearch.text.trim();
      if (searchKeyword.length > 0) {
        scopeObj.view.flxClear.setVisibility(true);
      } else {
        scopeObj.view.flxClear.setVisibility(false);
      }
      scopeObj.view.flxSearch.forceLayout();
    },
		
    onSearchClearBtnClick: function () {
      var scopeObj = this;      
      scopeObj.view.txtSearch.text = "";
      scopeObj.view.flxClear.setVisibility(false);      
      scopeObj.clearSearch();     
    },
    
    onSearchBtnClick: function () {
      var scopeObj = this;    
      var searchQuery = scopeObj.view.txtSearch.text.trim();      
      if (kony.sdk.isNullOrUndefined(searchQuery) || searchQuery === "") {
        scopeObj.clearSearch();
      }
      else{
        scopeObj.setSearchData(searchQuery);  
      }
    }, 
    
    setSearchData: function(searchQuery) {
      var scopeObj = this; 
      var data = scopeObj.view.segContract.data;
      var resultsFound = false;
      for (var i = 0; i < data.length; i++) { 
        data[i][0].flxContractsCollapsedWrapper.height = "0dp";
        for(var j = 0; j < data[i][1].length ; j++){
          if((data[i][0].lblContract && data[i][0].lblContract.text && data[i][0].lblContract.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)
             || (data[i][0].lblIdentityNumber && data[i][0].lblIdentityNumber.text && data[i][0].lblIdentityNumber.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)
             || (data[i][1][j].lblCustomerName && data[i][1][j].lblCustomerName.text && data[i][1][j].lblCustomerName.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)
             || (data[i][1][j].lblCustomerNumber && data[i][1][j].lblCustomerNumber.text && data[i][1][j].lblCustomerNumber.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)
            ){
            resultsFound = true;
            data[i][1][j].flxCustomerDetails.height = "50dp";
            data[i][0].flxContractsCollapsedWrapper.height = "51dp";
          }
          else{
            data[i][1][j].flxCustomerDetails.height = "0dp";
          }
        }
      }
      if(resultsFound){
        scopeObj.view.flxNoResultsFound.setVisibility(false);
      }
      else{
        scopeObj.view.flxNoResultsFound.setVisibility(true);
      }
      scopeObj.view.segContract.setData(data);
      scopeObj.view.forceLayout(); 
    },

    clearSearch: function() {
      var scopeObj = this;
      var data = scopeObj.view.segContract.data;
      for (var i = 0; i < data.length; i++) { 
         data[i][0].flxContractsCollapsedWrapper.height = "51dp";
         for(var j = 0; j < data[i][1].length ; j++){
            data[i][1][j].flxCustomerDetails.height = "50dp";
         }
      }
      scopeObj.view.flxNoResultsFound.setVisibility(false);
      scopeObj.view.segContract.setData(data);
      scopeObj.view.forceLayout();
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