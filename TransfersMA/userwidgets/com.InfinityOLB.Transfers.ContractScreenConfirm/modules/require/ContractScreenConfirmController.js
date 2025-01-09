define(function () {

	return {

		preshow: function () {
          this.initializeSortActions();
          this.view.flximgSortContracts.accessibilityConfig = {
			"a11yARIA": {
				"role": "button"
			},
			"a11yLabel": "Contracts column. Sorted in Ascending order. Click to Sort in Descending order"
		};
		this.view.flximgSortIdentityNumber.accessibilityConfig = {
			"a11yARIA": {
				"role": "button"
			},
			"a11yLabel": "Identity numbers Column. No Sort Applied. Click to Sort in Ascending Order"
		};
		},

        initializeSortActions: function() {
          this.view.imgSortColumn1.src = "sorting_previous.png";
          //this.view.imgSortColumn1.onTouchEnd = this.sortByContractName.bind(this);
          this.view.flximgSortContracts.onClick = this.sortByContractName.bind(this);
          this.view.imgSortColumn2.src = "sorting.png";
          //this.view.imgSortColumn2.onTouchEnd = this.sortByIdentityNumber.bind(this);
          this.view.flximgSortIdentityNumber.onClick = this.sortByIdentityNumber.bind(this);
        },
      
		setContractsWidgetDataMap: function () {
			return {

				"flxDropDown": "flxDropDown",
				"imgDropDown": "imgDropDown",
				"lblDropdown": "lblDropdown",
				"lblColumn1": "lblColumn1",
				"lblColumn2": "lblColumn2",
				"lblColumn3": "lblColumn3",
				"lblColumn1dummy": "lblColumn1dummy",
				"lblColumn2dummy": "lblColumn2dummy",
				"lblColumn3dummy": "lblColumn3dummy",
				"flxSeparatorVertical": "flxSeparatorVertical",
				"lblContractName": "lblContractName",
				"lblContractIdentityNum": "lblContractIdentityNum",
				"flxUserCommonRowHeader": "flxUserCommonRowHeader",
				"flxRowDetails": "flxRowDetails",
				"flxUserDetails": "flxUserDetails",
				"flxCIFDetails": "flxCIFDetails",
				"lblUserType": "lblUserType",
              	"flxBottomSeperator": "flxBottomSeperator",
				"flxSeparatorForHeader": "flxSeparatorForHeader",
				"lblSample1": "lblSample1",
				"lblSample2": "lblSample2",
				"lblColumn1dummy": "lblColumn1dummy",
				"lblColumn2dummy": "lblColumn2dummy",
				"lblColumn3dummy": "lblColumn3dummy"
			};
		},

		setConfirmScreenContractsData: function (data) {
            var form= kony.application.getCurrentForm();
			var scopeObj = this;
			let segData = [];
			// let data = this.view.contractList.segContract.data;

			for (let i = 0; i < data.length; i++) {
				const element = data[i];
				let headerData = [];
				let rowData = [];

				if (element[0].lblCheckBoxSelect.text === "C") {

					element[1].forEach(y => {

						if (y.lblCustomerCheckbox.text === "C") {
							rowData.push({
								"flxUserCommonRowHeader": {
									"isVisible": false
								},
								"flxUserDetails": {
									"isVisible": false
								},
								"flxCIFDetails": {
									"isVisible": false
								},
                              	"flxBottomSeperator": {
                                    "isVisible": false
                                },
                              	"flxSeparatorForHeader": {
                                    "isVisible": false
                                },
								"lblContractName": {
									"text": y.lblCustomerName.text,
									"accessibilityConfig":{
										a11yARIA:{
											"tabindex":-1,
											"aria-hidden": true
										}
									  }
								},
								"lblSample1":{
									"text":"Account name " + " " + y.lblCustomerName.text,
									"accessibilityConfig":{
										a11yARIA:{
											"tabindex":-1
										}
									  }
								},
								"lblContractIdentityNum": {
									"text": y.lblCustomerNumber.text,
									"accessibilityConfig":{
										a11yARIA:{
											"tabindex":-1,
											"aria-hidden": true
										}
									  }
								},
								"lblSample2":{
									"text": "Account number " + " " + y.lblCustomerNumber.text,
									"accessibilityConfig":{
										a11yARIA:{
											"tabindex":-1
										}
									  }
								},
								"lblUserType": {
									"text": y.lblUserType.text,
									"isVisible": y.lblUserType.isVisible
								},
								"template": kony.application.getCurrentBreakpoint() === 640
									? "flxContractConfirmScreenRowTemplateMobile"
									: "flxContractConfirmScreenRowTemplate",
							})
						}
					});

					headerData.push({
						"flxDropDown": {
                          "accessibilityConfig":{
							a11yLabel:"show more details for Contract" + element[0].lblContract.text,
                                "a11yARIA": {
                                  "role" : "button",
                                  "aria-expanded" : false,
                                }
                              },
							"onClick": scopeObj.onClickRowExpand
						},
						"lblColumn1": {
							"text": element[0].lblContract.text,
							"accessibilityConfig": {
								"tagName": "span",
								"a11yARIA": {
								 "tabindex": -1,
								 "aria-hidden": true
								}
							  },
						},
						"lblColumn1dummy": {
							"text": "Contract" + " " + element[0].lblContract.text,
							"accessibilityConfig":{
								a11yARIA:{
									"tabindex":-1
								}
							}
						},
						"lblColumn1dummy": {
							"text": element[0].lblContract1.text,
						},
						"lblColumn2": {
							"text": element[0].lblIdentityNumber.text,
							"accessibilityConfig": {
								"tagName": "span",
								"a11yARIA": {
								 "tabindex": -1,
								 "aria-hidden": true
								}
							  },
						},
						"lblColumn2dummy": {
							"text":  "Identity Number" + " " + element[0].lblIdentityNumber.text,
							"accessibilityConfig":{
								a11yARIA:{
									"tabindex":-1
								}
							}
						},
						"lblColumn2dummy": {
							"text": element[0].lblIdentityNumber1.text,
						},
						"lblColumn3": {
							"text": element[0].lblCIF.text,
                            "accessibilityConfig": {
                                  "tagName": "span",
                                  "a11yARIA": {
                                   "tabindex": -1,
								   "aria-hidden": true
                                  }
                                },
						},
						"lblColumn3dummy": {
							"text": "Selected CIF" + " " + element[0].lblCIF.text,
							"accessibilityConfig":{
								a11yARIA:{
									"tabindex":-1
								}
							}
						},
						"template": kony.application.getCurrentBreakpoint() === 640
							? "flxContractConfirmScreenRowTemplateMobile"
							: "flxContractConfirmScreenRowTemplate",
						"lblDropdown": {
							"text": "O"
						},
						"flxSeparatorVertical": {
							"isVisible": false
						},
                        "flxBottomSeperator": {
							"isVisible": false
						},
						"flxUserDetails": {
							"isVisible": false
						},
						"flxRowDetails": {
                            "accessibilityConfig":{
                                a11yARIA:{
                                    "tabindex":-1,
                                    "aria-hidden": true
                                }
                              }
                        },
						"flxUserCommonRowHeader": {
							"isVisible": true
						},
                        "flxSeparatorForHeader": {
                          "isVisible": true
                        },
						"flxCIFDetails": {
							"isVisible": false
						},
					}, rowData);
					segData.push(headerData);
				}
			}

			if (segData.length == 0) {
				this.view.setVisibility(false);
			} else {
				this.view.setVisibility(true);
				this.view.segContracts.widgetDataMap = this.setContractsWidgetDataMap();
                segData = this.getSortedData(segData,"lblColumn1","ASC");
				this.view.segContracts.setData(segData);
			}

		},

		setAckScreenContractsData: function (segData) {
			if (segData.length == 0) {
				this.view.setVisibility(false);
			} else {
				this.view.setVisibility(true);
				this.view.segContracts.widgetDataMap = this.setContractsWidgetDataMap();
                segData = this.getSortedData(segData,"lblColumn1","ASC");
				this.view.segContracts.setData(segData);
			}
		},

		onClickRowExpand: function (widgetInfo, context) {

			var scopeObj = this;
			var currentForm = kony.application.getCurrentForm();
            var data = [];
            var selectedRowIndex;
          
			if(currentForm.id === "frmFastP2P"){
				data = scopeObj.view.segContracts.data;
				selectedRowIndex = scopeObj.view.segContracts.selectedRowIndex[0];
			}else{
				data = currentForm.screenConfirm.segContracts.data;
				selectedRowIndex = currentForm.screenConfirm.segContracts.selectedRowIndex[0];
			}
			

			if (data[selectedRowIndex][0].lblDropdown.text === "O") {
				data[selectedRowIndex][0].lblDropdown.text = "P";
				data[selectedRowIndex][0].flxSeparatorVertical.isVisible = true;
                data[selectedRowIndex][0].flxBottomSeperator.isVisible = true;
                data[selectedRowIndex][0].flxUserCommonRowHeader.skin = "slFboxBGf8f7f8B0";
				data[selectedRowIndex][0].flxDropDown.accessibilityConfig = { 
					a11yLabel:"Hide details for Contract" + data[selectedRowIndex][0].lblColumn1.text,
					"a11yARIA": {
					   "role": "button",
					   "tabindex": 0,
	               "aria-expanded": true
				   }
			   };
				data[selectedRowIndex][1].forEach(x => x.flxUserDetails.isVisible = true)
				kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = true : ""
			} else {
				data[selectedRowIndex][0].lblDropdown.text = "O";
				data[selectedRowIndex][0].flxSeparatorVertical.isVisible = false;
                data[selectedRowIndex][0].flxBottomSeperator.isVisible = false;
                data[selectedRowIndex][0].flxUserCommonRowHeader.skin = "sknFlxffffffBorder0";
				data[selectedRowIndex][0].flxDropDown.accessibilityConfig = { 
					a11yLabel:"show more details for Contract" + data[selectedRowIndex][0].lblColumn1.text,
					"a11yARIA": {
					   "role": "button",
					   "tabindex": 0,
					   "aria-expanded": false
				   }
			   };
				data[selectedRowIndex][1].forEach(x => x.flxUserDetails.isVisible = false)
				kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = false : ""
			}

			data = this.getSortedData(data,"lblColumn1","ASC");
          
			if(currentForm.id === "frmFastP2P"){
				scopeObj.view.segContracts.setData(data);
			}else{
				currentForm.screenConfirm.segContracts.setData(data);
			}
			if (kony.application.getCurrentBreakpoint() == 640) {
				scopeObj.view.segContracts.sectionHeaderTemplate = "flxContractConfirmScreenRowTemplateMobile";
				scopeObj.view.segContracts.setActive(context.rowIndex, context.sectionIndex, "flxContractConfirmScreenRowTemplate.flxUserCommonRowHeader.flxDropDown");
			} else {
				scopeObj.view.segContracts.sectionHeaderTemplate = "flxContractConfirmScreenRowTemplate";
				scopeObj.view.segContracts.setActive(context.rowIndex, context.sectionIndex, "flxContractConfirmScreenRowTemplate.flxGroup1.flxUserCommonRowHeader.flxContent.flxDropDown");
			}
		},

		createCIFDataForAddBenificiary: function (segData) {
			let cif = [];
			segData.forEach(x => {
				let coreCustomerIdArray = []
				x[1].forEach(y => coreCustomerIdArray.push(y.lblContractIdentityNum.text));
				cif.push({
					"contractId": x[0].lblColumn2.text,
					"coreCustomerId": coreCustomerIdArray.join(',')
				})
			});
			return JSON.stringify(cif);
		},

      sortByContractName: function() {
        var scopeObj = this;
        var sortType = "ASC";
        if(scopeObj.view.imgSortColumn1.src === "sorting_previous.png") {
          scopeObj.view.imgSortColumn1.src = "sorting_next.png";
          scopeObj.view.flximgSortContracts.accessibilityConfig = {
			"a11yARIA": {
				"role": "button"
			},
			"a11yLabel": "Contracts column. Sorted in Descending order. Click to Sort in Ascending order"
		};
          sortType = "DESC";
        }
        else{
          scopeObj.view.imgSortColumn1.src = "sorting_previous.png";
          this.view.flximgSortContracts.accessibilityConfig = {
			"a11yARIA": {
				"role": "button"
			},
			"a11yLabel": "Contracts column. Sorted in Ascending order. Click to Sort in Descending order"
		};
        }
        scopeObj.view.imgSortColumn2.src = "sorting.png";
        this.view.flximgSortIdentityNumber.accessibilityConfig = {
			"a11yARIA": {
				"role": "button"
			},
			"a11yLabel": "Identity Numbers Column. No Sort Applied. Click to Sort in Ascending Order"
		};
        
        var data = scopeObj.view.segContracts.data;
        data = scopeObj.getSortedData(data,"lblColumn1",sortType);
        scopeObj.view.segContracts.setData(data);
        scopeObj.view.forceLayout();
      },

      sortByIdentityNumber: function() {
        var scopeObj = this;
        var sortType = "ASC";
        if(scopeObj.view.imgSortColumn2.src === "sorting_previous.png") {
          this.view.imgSortColumn2.src = "sorting_next.png";
          this.view.flximgSortIdentityNumber.accessibilityConfig = {
			"a11yARIA": {
				"role": "button"
			},
			"a11yLabel": "Identity Numbers column. Sorted in Descending Order. Click to Sort in Ascending Order"
		};
          sortType = "DESC";
        }
        else{
          scopeObj.view.imgSortColumn2.src = "sorting_previous.png";
          this.view.flximgSortIdentityNumber.accessibilityConfig = {
			"a11yARIA": {
				"role": "button"
			},
			"a11yLabel": "Identity Numbers Column. Sorted in Ascending Order. Click to Sort in Descending Order"
		};
        }
        scopeObj.view.imgSortColumn1.src = "sorting.png";
        this.view.flximgSortContracts.accessibilityConfig = {
			"a11yARIA": {
				"role": "button"
			},
			"a11yLabel": "Contracts Column. No Sort Applied. Click to Sort in Ascending Order"
		};
        
        var data = scopeObj.view.segContracts.data;
        data = scopeObj.getSortedData(data,"lblColumn2",sortType);
        scopeObj.view.segContracts.setData(data);
        scopeObj.view.forceLayout();
      },

      getSortedData: function(data, sortField, sortType) {
        data.sort(function(a, b) {
          var data1 = a[0][sortField].text;
          var data2 = b[0][sortField].text;
          if(sortField === "lblColumn2"){
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