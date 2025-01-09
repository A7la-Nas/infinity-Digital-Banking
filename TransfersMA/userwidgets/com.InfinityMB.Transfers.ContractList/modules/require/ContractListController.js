define(function() {

  var contractList = {};
  var businessIcon ="businessicon.png", personalIcon = "personalicon.png";
  var newSegData={};
  
  return {
    preshow: function (data) {
      this.customerSelectedCount = 0;
      this.initialiseComponent(data);
    },

    initialiseComponent: function (data) {
      this.setDataForContracts(data);
    },

    setContractsData: function (data) {
      contractList = data;
    },

    setDataForContracts: function (data) {
      if(typeof data === 'string')
        data = JSON.parse(data);
      var isCombinedUser = applicationManager.getUserPreferencesManager().profileAccess == "both" ? true : false;
      var segmentDataMap = {
        "flxContract":"flxContract",
        "flxRowCheckBox": "flxRowCheckBox",
        "imgCheckBox": "imgCheckBox",
        "flxContractHeader":"flxContractHeader",
        "lblContract": "lblContract",
        "lblCIF": "lblCIF",
        "flxDropdown": "flxDropdown",
        "flxParentSeparator":"flxParentSeparator",
        "imgDropdown":"imgDropdown",
        "flxCustomer": "flxCustomer",
        "flxCustomerDetails": "flxCustomerDetails",
        "flxCustomerCheckbox":"flxCustomerCheckbox",
        "imgCustomerCheckbox":"imgCustomerCheckbox",
        "flxCustomerContainer":"flxCustomerContainer",
        "lblCustomerName": "lblCustomerName",
        "flxChildCaptionContainer":"flxChildCaptionContainer",
        "lblCustomerNumberText":"lblCustomerNumberText",
        "lblCustomerNumber": "lblCustomerNumber",
        "flxChildSeperator":"flxChildSeperator",
        "flxCustomerIcon": "flxCustomerIcon",
        "imgCustomer": "imgCustomer"
      };

      let segData = [];

      contractList.contracts.forEach(x => {
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
            "imgCustomerCheckbox": {
              "src": this.checkCustomerCIFList(data,x.contractId,y.coreCustomerId)? "checkbox_ticked.png":"checkbox_normal.png"
            },
            "flxCustomerCheckbox": {
              "onClick": this.toogleCustomerCheckBox
            },
            "flxContract": {
              "isVisible": false
            },
            "flxCustomerDetails": {
              "isVisible": false
            },
            "imgCheckBox":{
              "src": "checkbox_normal.png"
            },
            "flxParentSeparator": {
              "isVisible": false
            },
            "lblCustomerNumberText":{
              "isVisible":true
            },
            "flxCustomerIcon": {
              "isVisible": isCombinedUser
            },
            "flxCustomerContainer": {
              "left": isCombinedUser ? "20%": "15%"
            },
            "imgCustomer": {
              "src": y.isBusiness == "true" ? businessIcon : personalIcon,
              "isVisible": isCombinedUser
            },
            "template": "flxContractsCollapsed"
          });
        });
        var totalCustomersSelected = this.getCustomerNumber(data,x.contractId);
        this.customerSelectedCount += totalCustomersSelected;
        headerData.push({
          "flxDropdown": {
            "onClick": this.toogleExpandRow
          },
          "flxRowCheckBox": {
            "onClick": this.toogleRowCheckBox
          },
          "lblContract": {
            "text": x.contractName,
          },
          "contractNumber":x.contractId,
          "lblCIF": {
            "text": totalCustomersSelected + " of " + x.contractCustomers.length
          },
          "template": "flxContractsCollapsed",
          "imgDropdown": {
            "src": "chevron_down.png"
          },
          "imgCheckBox": {
                        "src": (totalCustomersSelected > 0) ? "checkbox_ticked.png" : "checkbox_normal.png"
          },
           "flxCustomerDetails": {
              "isVisible": false
            },
          "flxContract": {
              "isVisible": true
            },
          "flxCustomer":{
            "isVisible":true
          },
          "flxParentSeparator": {
            "isVisible": true
          },
          "flxCustomerIcon": {
            "isVisible": false
          },
          "flxCustomerContainer": {
            "left": "15%"
          }
        }, rowData);
        segData.push(headerData);
      });

      this.view.segContract.widgetDataMap = segmentDataMap;
      newSegData=segData;
      this.view.segContract.setData(segData);

    },

    toogleExpandRow: function(eventObj, context) {
      let data = newSegData;
      let selectedRowIndex = context.sectionIndex;

      if (data[selectedRowIndex][0].imgDropdown.src === "chevron_down.png") {
        data[selectedRowIndex][0].imgDropdown.src = "chevron_up.png";
        data[selectedRowIndex][0].flxCustomer.isVisible = true;
        data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = true);
      } else {
        data[selectedRowIndex][0].imgDropdown.src = "chevron_down.png";
        data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = false);
      }
      this.view.segContract.setSectionAt(data[selectedRowIndex],selectedRowIndex);
    },

    toogleRowCheckBox: function (eventObj, context, index) {
		var scope = this;
      let data = newSegData;
      let selectedRowIndex;

      if (index !== undefined && index >= 0) {
        selectedRowIndex = index;
      } else {
        selectedRowIndex = context.sectionIndex;
      }
      let customerLength = data[selectedRowIndex][1].length;

      if (data[selectedRowIndex][0].imgCheckBox.src === "checkbox_normal.png") {
        data[selectedRowIndex][0].imgCheckBox.src = "checkbox_ticked.png";
        data[selectedRowIndex][0].lblCIF.text = customerLength + " of " + customerLength;
        data[selectedRowIndex][1].forEach(function(x) {
          if(x.imgCustomerCheckbox.src === "checkbox_normal.png"){
            x.imgCustomerCheckbox.src = "checkbox_ticked.png";
            scope.selectedCustomerCount(1,true);
          }
        });
        //this.selectedCustomerCount(customerLength,true);
      } else {
        data[selectedRowIndex][0].imgCheckBox.src = "checkbox_normal.png";
        data[selectedRowIndex][0].lblCIF.text = 0 + " of " + customerLength;
        data[selectedRowIndex][1].forEach(function(x) {
          if(x.imgCustomerCheckbox.src === "checkbox_ticked.png"){
            x.imgCustomerCheckbox.src = "checkbox_normal.png";
            scope.selectedCustomerCount(1,false);
          }
        });
        //this.selectedCustomerCount(customerLength,false);
      }
     this.view.segContract.setSectionAt(data[selectedRowIndex],selectedRowIndex);
    },

    toogleCustomerCheckBox: function (eventObj, context) {
      let data = newSegData;
      let selectedRowIndex = context.rowIndex;
      let selectedSectionIndex = context.sectionIndex;
      let length = 0;
      let customerLength = data[selectedSectionIndex][1].length;
      data[selectedSectionIndex][1][selectedRowIndex].imgCustomerCheckbox.src === "checkbox_normal.png" ? data[selectedSectionIndex][1][selectedRowIndex].imgCustomerCheckbox.src = "checkbox_ticked.png" : data[selectedSectionIndex][1][selectedRowIndex].imgCustomerCheckbox.src = "checkbox_normal.png";
      if(data[selectedSectionIndex][1][selectedRowIndex].imgCustomerCheckbox.src === "checkbox_normal.png"){
		this.selectedCustomerCount(1,false);
      } else {
        this.selectedCustomerCount(1,true);
      }
      data[selectedSectionIndex][1].forEach(x => {
        if (x.imgCustomerCheckbox.src === "checkbox_normal.png") {
          length++;
        }
      });
            (customerLength - length) === 0 ? data[selectedSectionIndex][0].imgCheckBox.src = "checkbox_normal.png" : data[selectedSectionIndex][0].imgCheckBox.src = "checkbox_ticked.png";
      data[selectedSectionIndex][0].lblCIF.text = customerLength - length + " of " + customerLength;
      //this.selectedCustomerCount(customerLength,false);
      this.view.segContract.setSectionAt(data[selectedSectionIndex],selectedSectionIndex);

    },

    createCIFData: function (segData) {
      var cif = [];
      var customerCount = 0;
      segData.forEach(function(contract) {
        var coreCustomerIdArray = [];
        contract[1].forEach(function(customer){  
          if(customer.imgCustomerCheckbox["src"] === "checkbox_ticked.png"){
            coreCustomerIdArray.push(customer.lblCustomerNumber.text);
            customerCount++;
          }
        });
        cif.push({
          "contractId": contract[0].contractNumber,
          "coreCustomerId": coreCustomerIdArray.join(',')
        });
      });
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("totalContractCustomerSelected",customerCount);
      return cif;
    },

    onSearchBtnClick: function(searchQuery) {
      var scopeObj = this;
       applicationManager.getPresentationUtility().showLoadingScreen();
      if (kony.sdk.isNullOrUndefined(searchQuery) || searchQuery === "" ) {
        scopeObj.clearSearch();
      } else {
        scopeObj.setSearchData(searchQuery);
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setSearchData: function(searchQuery) {
      var scopeObj = this;
      var data = scopeObj.view.segContract.data;
      var resultsFound = false;
      var results=[];
      for (var i = 0; i < data.length; i++) {
        data[i][0].flxContract.height = "0dp";
        for (var j = 0; j < data[i][1].length; j++) {
          if ((data[i][0].lblContract && data[i][0].lblContract.text && data[i][0].lblContract.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) 
              || (data[i][1][j].lblCustomerName && data[i][1][j].lblCustomerName.text && data[i][1][j].lblCustomerName.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) 
              || (data[i][1][j].lblCustomerNumber && data[i][1][j].lblCustomerNumber.text && data[i][1][j].lblCustomerNumber.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)) {
            resultsFound = true;
            data[i][1][j].flxCustomerDetails.height = "65dp";
            data[i][0].flxContract.height = "60dp";
            results.push(data[i]);
          } else {
            data[i][1][j].flxCustomerDetails.height = "0dp";
          }
        }
      }
      if (resultsFound) {
        scopeObj.view.flxNoContracts.setVisibility(false);
      } else {
        scopeObj.view.flxNoContracts.setVisibility(true);
      }
      scopeObj.view.segContract.setData(results);
      scopeObj.view.forceLayout();
    },

    clearSearch: function() {
      var scopeObj = this;
      var data = newSegData;
      for (var i = 0; i < data.length; i++) {
        data[i][0].flxContract.height = "60dp";
        for (var j = 0; j < data[i][1].length; j++) {
          data[i][1][j].flxCustomerDetails.height = "65dp";
        }
      }
      scopeObj.view.flxNoContracts.setVisibility(false);											
      scopeObj.view.segContract.setData(data);
      scopeObj.view.forceLayout();
    },
    checkCustomerCIFList: function(cifList, contractId, customerId){
      var isChecked = false;
      if(cifList !== undefined && cifList !== null){
        for(var i = 0; i< cifList.length;i++){
          if(cifList[i].contractId === contractId){
            var customerList = cifList[i].coreCustomerId;
            if(customerList.includes(customerId)){
              isChecked = true;
              break;
            }
          }
        }
      }
      return isChecked;
    },
    getCustomerNumber: function(cifList, contractId){
      var totalCustomersSelected = 0;
      if(cifList !== undefined && cifList !== null){
        for(var i = 0; i< cifList.length;i++){
          if(cifList[i].contractId === contractId){
            totalCustomersSelected = (cifList[i].coreCustomerId !== "")? cifList[i].coreCustomerId.split(",").length : 0;
            break;
          }
        }
      }
      return totalCustomersSelected;
    },

    selectedCustomerCount(count,isChecked){
      if(isChecked){
        this.customerSelectedCount += count;
      } else{
        this.customerSelectedCount -= count;
      }
      var controller = applicationManager.getPresentationUtility().getController('frmContracts', true);
      if(this.customerSelectedCount === 0){
        controller.disableContinueButton(true);
      } else{
        controller.disableContinueButton(false);
      }
    }
  };
});