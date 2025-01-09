define({
	countries: {},
	states: {},
	cities: {},
	navOption: "",
	travelPlan: {},
	updateTravelPlan: {},
	init: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### init #### for form: " + currentForm);
			applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	preShow: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### preShow #### for form: " + currentForm);
          	if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
              this.view.flxHeader.isVisible = true;
            } else {
              this.view.flxHeader.isVisible = false;
            }
			var custInfo = navManager.getCustomInfo("frmManageTravelDestination");
			if (kony.sdk.isNullOrUndefined(custInfo) || kony.sdk.isEmptyObject(custInfo)) {
				loggerManager.log("customInfo failed to fetch ");
			} else {
				this.travelPlan = custInfo.data;
				loggerManager.log("CustomData for frmManageTravelDestination: " + JSON.stringify(this.travelPlan));
				this.navOption = custInfo.option;
				loggerManager.log("entered this form with navigation option as: "+this.navOption);
				this.clearData();
				this.setData();
				this.setFlowActions();
				this.view.tbxSearch.onTextChange = this.showSearchSuggestions;
				this.view.segTravelDestinationResults.onRowClick = this.selectDestinationResult;
				this.view.btnAdd.onClick = this.updateSelectedlist;
				this.view.segTravelDestination.onRowClick = this.removeSelectedlist;
				this.view.btnSave.onClick = this.saveAndNavigate;
          var cardsMan = applicationManager.getCardsManager();
          var locs = cardsMan.getLocations();
          this.setLocationsData(locs);
              	this.goBackInfo();
				applicationManager.getPresentationUtility().dismissLoadingScreen();
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
			applicationManager.getPresentationUtility().dismissLoadingScreen();
		}
	},
  	goBackInfo: function(){
      var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### setLocationsData #### for form: " + currentForm);
          if (this.navOption === "edit") {
            navManager.setCustomInfo("frmManageTravelDetails", this.travelPlan);
            //manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
          } else if (this.navOption === "add") {
            navManager.setCustomInfo("frmManageTravelEndDate", {
              "option": "add",
              "data": this.travelPlan
            });
          }
      } catch (exc) {
			loggerManager.log("#### in catch " + JSON.stringify(exc) + " ####");
		}
    },
	clearData: function() {
		this.view.tbxSearch.text = "";
		this.view.segTravelDestinationResults.setData([]);
		this.view.segTravelDestination.setData([]);
      	this.view.btnSave.setEnabled(false);
      	this.view.btnSave.skin = "sknBtna0a0a0SSPReg26px";
	},
	setData: function() {
		this.view.flxSearch.isVisible = true;
		this.view.btnAdd.setEnabled(false);
		this.view.flxDestinations.isVisible = true;
		this.view.btnSave.isVisible = true;
		this.view.flxSearchResults.isVisible = false;
      	if (this.navOption === "edit") {
          this.view.btnSave.text = kony.i18n.getLocalizedString("kony.mb.common.save");
        } else if (this.navOption === "add") {
          this.view.btnSave.text = kony.i18n.getLocalizedString("kony.mb.common.continue");
        }
		this.initSelectedList();
	},
	setLocationsData: function(locs) {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			if (!kony.sdk.isNullOrUndefined(locs) && !kony.sdk.isEmptyObject(locs)) {
          this.countries = locs.countries;
          this.states = locs.states;
          this.cities = locs.cities;
			} else {
				//handle failure case when services dont respond.
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	initSelectedList: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### initSelectedList #### for form: " + currentForm);
			var self = this;
			var list = [];
			if (!kony.sdk.isNullOrUndefined(this.travelPlan)) {
				if (typeof(this.travelPlan.destinations) === "string") {
					list = this.travelPlan.destinations.split("-");
				} else {
					list = this.travelPlan.destinations;
				}
				var selectedDestinations = [];
				var data = {};
				list.forEach(
					function(ele) {
						data = {
							"destinationValue": ele,
							"image": {
								"src": "closeicon.png"
							}
						};
						selectedDestinations.push(data);
					});
				var dataMap = {
					"lblName": "destinationValue",
					"imgIcon": "image"
				};
				this.view.segTravelDestination.widgetDataMap = dataMap;
				this.view.segTravelDestination.setData(selectedDestinations);
              	if((kony.sdk.isNullOrUndefined(this.view.segTravelDestination.data)) || this.view.segTravelDestination.data.length <= 0){
                  this.view.btnSave.setEnabled(false);
                  this.view.btnSave.skin = "sknBtna0a0a0SSPReg26px";
                } else {
                  this.view.btnSave.setEnabled(true);
                  this.view.btnSave.skin = "sknBtn0095e4RoundedffffffSSP26px";
                }
			} else {
				loggerManager.log("reponse from previous form" + JSON.stringify(this.travelPlan));
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	updateSelectedlist: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### updateSelectedlist #### for form: " + currentForm);
			var self = this;
			var listData = self.view.segTravelDestination.data;
          	var destinationName = self.view.tbxSearch.text;
			var listLength = 0;
          	var alreadyAdded = false;
			if ((!kony.sdk.isNullOrUndefined(listData)) && (!kony.sdk.isEmptyObject(listData))) {
				listLength = listData.length;
			}
          	if(listLength > 0){
              listData.forEach(
                function(element){
                  if(element.destinationValue === destinationName){
                    alreadyAdded = true;
                  }
                });
            }
			var configMang = applicationManager.getConfigurationManager();
			var destinationLimit = configMang.getConstantValue("TRAVELPLANS_DESTINATION_LIMIT");
			if (listLength === destinationLimit || alreadyAdded === true) {
              if(alreadyAdded === true){
                loggerManager.log("frmManageTravelDestination: Cannot add similar destination more than once: " + destinationName);
              }else
                loggerManager.log("frmManageTravelDestination: Cannot add more data into the destinations crossed the limit" + destinationLimit);
			} else {
				var dataMap = {
					"lblName": "destinationValue",
					"imgIcon": "image"
				};
				this.view.segTravelDestination.widgetDataMap = dataMap;
				if(destinationName){
				this.view.segTravelDestination.addDataAt({
					"destinationValue": destinationName,
					"image": {
						"src": "closeicon.png"
					}
				}, listLength);
			}
				loggerManager.log("frmManageTravelDestination: successfully added destination");
				this.view.btnAdd.skin = "sknBtna0a0a0SSPReg26px";
				this.view.btnAdd.setEnabled(false);
				this.view.tbxSearch.text = "";
              	if((kony.sdk.isNullOrUndefined(this.view.segTravelDestination.data)) || this.view.segTravelDestination.data.length <= 0){
                  this.view.btnSave.setEnabled(false);
                  this.view.btnSave.skin = "sknBtna0a0a0SSPReg26px";
                } else {
                  this.view.btnSave.setEnabled(true);
                  this.view.btnSave.skin = "sknBtn0095e4RoundedffffffSSP26px";
                }
				this.view.forceLayout();
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	removeSelectedlist: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### removeSelectedlist #### for form: " + currentForm);
			this.view.segTravelDestination.removeAt(this.view.segTravelDestination.selectedRowIndex[1]);
          	if((kony.sdk.isNullOrUndefined(this.view.segTravelDestination.data)) || this.view.segTravelDestination.data.length <= 0){
              this.view.btnSave.setEnabled(false);
              this.view.btnSave.skin = "sknBtna0a0a0SSPReg26px";
            } else {
              this.view.btnSave.setEnabled(true);
              this.view.btnSave.skin = "sknBtn0095e4RoundedffffffSSP26px";
            }
          	this.view.forceLayout();
			loggerManager.log("frmTravelDestination: successfully removed a destination");
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	setFlowActions: function() {
		var scope = this;
		scope.view.tbxSearch.onTextChange = scope.showSearch;
		scope.view.customHeader.flxBack.onClick = this.backOnClick;
		scope.view.customHeader.btnRight.onClick = this.cancelOnClick;
      	scope.view.flxTop.onClick = scope.view.flxEditOptions.setVisibility(false);
	},
	backOnClick: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### backOnClick #### for form: " + currentForm);
          	navManager.goBack();
        } catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	cancelOnClick: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### cancelOnClick #### for form: " + currentForm);
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			if (this.navOption === "edit") {
				navManager.setCustomInfo("frmManageTravelDetails", this.travelPlan);
				manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
			} else if (this.navOption === "add") {
				manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelPlans");
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	selectDestinationResult: function() {
		var scope = this;
		scope.view.tbxSearch.text = scope.view.segTravelDestinationResults.selectedRowItems[0].destinationValue;
		scope.view.btnAdd.setEnabled(true);
		this.view.btnAdd.skin = "sknBtn0095e4RoundedffffffSSP26px";
		scope.showLowerElements();
	},
	showSearch: function() {
		this.hidelowerElements();
		if (this.view.tbxSearch.text !== "") {
			this.view.flxSearchResults.isVisible = true;
		} else {
			this.showLowerElements();
			this.view.flxSearchResults.isVisible = false;
		}
	},
	showSearchSuggestions: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### showSearchSuggestions #### for form: " + currentForm);
			this.view.btnAdd.skin = "sknBtna0a0a0SSPReg26px";
			this.view.btnAdd.setEnabled(false);
			var countryData = [];
			var newData = {};
			var stateId;
			var countryId;
			var key;
			var dataMap = {
				"lblsearchResult": "destinationValue"
			};
			var tbxText = this.toTitleCase(this.view.tbxSearch.text);
			if (tbxText.length <= 2) {
				countryData = [];
			} else { //  if(tbxText.length > 2){
				for (key in this.cities) {
					if (this.cities[key].name.indexOf('' + tbxText) === 0) {
						stateId = this.cities[key].state_id;
						countryId = this.cities[key].country_id;
						newData = {
							"countryId": countryId,
							"destinationValue": this.cities[key].name + ", " + this.states[stateId].name + ", " + this.countries[countryId].name
						};
						countryData.push(newData);
					}
				}
				for (key in this.states) {
					if (this.states[key].name.indexOf('' + tbxText) === 0) {
						countryId = this.states[key].country_id;
						newData = {
							"countryId": countryId,
							"destinationValue": this.states[key].name + ", " + this.countries[countryId].name
						};
						countryData.push(newData);
					}
				}
				for (key in this.countries) {
					if (this.countries[key].name.indexOf('' + tbxText) === 0) {
						newData = {
							"countryId": countryId,
							"destinationValue": "" + this.countries[key].name
						};
						countryData.push(newData);
					}
				}
			}
			this.showSearch();
			this.view.segTravelDestinationResults.widgetDataMap = dataMap;
			this.view.segTravelDestinationResults.setData(countryData);
			this.view.forceLayout();
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	hidelowerElements: function() {
		this.view.flxDestinations.isVisible = false;
		this.view.btnSave.isVisible = false;
	},
	showLowerElements: function() {
		this.view.flxSearchResults.isVisible = false;
		this.view.flxDestinations.isVisible = true;
		this.view.btnSave.isVisible = true;
	},
	toTitleCase: function(str) {
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	},
	saveAndNavigate: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### saveAndNavigate #### for form: " + currentForm);
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			this.updateTravelPlan = JSON.parse(JSON.stringify(this.travelPlan));
			var updatedDestinationlist = this.view.segTravelDestination.data;
			var destinations = [];
			updatedDestinationlist.forEach(
				function(element) {
					destinations.push(element.destinationValue);
				}
			);
			this.updateTravelPlan.destinations = destinations;
			if (this.navOption === "edit") {
				applicationManager.getPresentationUtility().showLoadingScreen();
				loggerManager.log("TravelDetailsObjectRequest: "+JSON.stringify(this.travelPlan));
				loggerManager.log("TravelDetailsObjectUpdated: "+JSON.stringify(this.updateTravelPlan));
				manageCardsModule.presentationController.updateTravelPlan(this.updateTravelPlan, this.successCallbackForUpdate, this.failureCallbackForUpdate);
			} else {
				navManager.setCustomInfo("frmManageTravelSelectCards", {"option": "add","data": this.updateTravelPlan});
				manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelSelectCards");
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	successCallbackForUpdate: function(resp) {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### successCallbackForUpdate #### for form: " + currentForm);
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			this.updateTravelPlan.showToast = true;
			this.updateTravelPlan.isSuccess = true;
			this.updateTravelPlan.message = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.updateTravelPlanSuccess");
			navManager.setCustomInfo("frmManageTravelDetails", this.updateTravelPlan);
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
		} catch (exc) {
			loggerManager.log("#### in catch successCallbackForUpdate" + exc + " ####");
		}
	},
	failureCallbackForUpdate: function(err) {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### failureCallbackForUpdate #### for form: " + currentForm);
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			loggerManager.log("error: came to  failureCallbackForUpdate: " + JSON.stringify(err));
			if (err["isServerUnreachable"])
				applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
			this.travelPlan.showToast = true;
			this.travelPlan.isSuccess = false;
			this.travelPlan.message = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.updateTravelPlanFailure");
			navManager.setCustomInfo("frmManageTravelDetails", this.travelPlan);
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
		} catch (exc) {
			loggerManager.log("#### in catch failureCallbackForUpdate" + exc + " ####");
		}
	}
});