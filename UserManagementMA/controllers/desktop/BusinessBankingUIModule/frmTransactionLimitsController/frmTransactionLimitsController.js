define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
  var orientationHandler = new OrientationHandler();
   
 
  return /** @alias module:frmUserManagementController */ {

    /**
         * Method to display the footer at the end of the screen by calculating the size of screen dynamically
         * @param {integer} data value
         **/
    compName: "",
    adjustScreen: function() {
      this.view.forceLayout();
      this.view.flxFooter.isVisible = true;
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0) {
          this.view.flxFooter.top = mainheight + diff + "dp";
        } else {
          this.view.flxFooter.top = mainheight + "dp";
        }
        this.view.forceLayout();
      } else {
        this.view.flxFooter.top = mainheight + "dp";
        this.view.forceLayout();
      }
    },
    /**
         * Breakpont change
         */
    onBreakpointChange: function(width) {
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.btnViewNEdit.text = kony.i18n.getLocalizedString("konybb.i18n.resetToDefault");
    },
    /**
         * hide all ui flexes in user management form
         */
    resetUI: function() {
      this.adjustScreen();
    },
      
      updateFormUI: function(viewModel) {
        if (viewModel.serverError) {
          this.showServerError(viewModel.serverError);
        } else {
          if (viewModel.progressBar === true) {
            FormControllerUtility.showProgressBar(this.view);
          } else if (viewModel.progressBar === false) {
            FormControllerUtility.hideProgressBar(this.view);
          }
          if(viewModel.updateInfinityUserSuccess){
            this.navToAckAfterUpdate(viewModel.updateInfinityUserSuccess);
          }
          if(viewModel.updateInfinityUserFailure){
            this.navToAckAfterUpdate(viewModel.updateInfinityUserFailure);
          }
        }
      },
    /**
         * Method will invoke on form init

        initActions: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnProceedRoles.onClick = function() {
               // scopeObj.navToNextForm();
              this.loadBusinessBankingModule().presentationController.setTransactionLimitsFromUserManagement(limits);
            };
            this.view.btnTransactionLimits.onClick = function() {
                scopeObj.navToNextForm();
            };
            this.view.btnCancelRoles.onClick = function() {
				scopeObj.navToPrevForm();
                //this.loadBusinessBankingModule().presentationController.navigateToUMDashboard();
            };
            this.view.InfoIconPopup.flxCross.onClick = function() {
                this.view.InfoIconPopup.setVisibility(false);
            }.bind(this);
        },
		*/
    initActions: function() {
      var scopeObj = this;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function() {};
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.btnProceedRoles.onClick = function() {
        scopeObj.updateGlobalLimits();
        //scopeObj.navToNextForm();
        //scopeObj.updateGlobalLimits();
      };
      this.view.flxMainWrapper.isVisible = false;
      this.view.imgCloseDowntimeWarning.onTouchEnd = function() {
        scopeObj.view.flxMainWrapper.isVisible = false;
      };
      this.view.btnTransactionLimits.onClick = function() {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var featurePermissions = limits.transactionLimits[0].accounts[0].featurePermissions;
            if(featurePermissions !== undefined && featurePermissions.length !== 0)
              {
              featurePermissions[0].limits.length <=10 ? scopeObj.features = true : scopeObj.features = false;
              }
              else
                scopeObj.features=false;


        if (scopeObj.features) {
          scopeObj.navToNextForm();
        } else {
          var err = kony.i18n.getLocalizedString("i18n.UserManagement.Notransactionlimitsfoundfortheuser");
          scopeObj.view.flxMainWrapper.isVisible = true;
          scopeObj.view.flxDowntimeWarning.isVisible = true;
          CommonUtilities.setText(scopeObj.view.lblDowntimeWarning, err, accessibilityConfig);
        }
      };
      this.view.btnCancelRoles.onClick = function() {
        scopeObj.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
        //scopeObj.goBackFunction();
      }.bind(this);
      this.view.InfoIconPopup.flxCross.onClick = function() {
        this.view.InfoIconPopup.setVisibility(false);
      }.bind(this);
      //            this.loadBusinessBankingModule().presentationController.getCompaniesList();
    },
      
      goBackFunction : function(){
        var navManager =  applicationManager.getNavigationManager();
        navManager.setCustomInfo('editUserFlow',"editFlow");
        navManager.setCustomInfo('getInfinityUser',"false");
      applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
    },
      
     updateGlobalLimits: function() {
            var scope = this;
       var count;
       var flag;
       var token;
       var invalidData = 0;
       var individualTransaction;
       var bulkTransaction;
        var isSingleValid = true, isBulkValid = true;
            var limitsSegData = scope.view.segIndividualTransactionLimits.data;
            var bulklimitsSegData = scope.view.segBulkTransactionLimits.data;
            this.limitsValues.forEach(function(dataItem) {
			
                if (compName === dataItem.companyName) {
			  try{
                    var limitMap = {};
                    var swap = false;
                    
                    for (i=0; i<dataItem.limitGroups.length;i++){
                      var limitGroupRead = dataItem.limitGroups[i];
                        //if (i==0 && limitGroupRead["limitGroupId"] === "BULK_PAYMENT") swap = true ;
                         for (j=0; j<limitGroupRead.limits.length;j++){
                             var limitRead = limitGroupRead.limits[j];
                             if(limitGroupRead.limitGroupId === "SINGLE_PAYMENT"){
                               swap=true;
                               limitMap[limitGroupRead.limitGroupId+"_"+limitRead.id] = limitRead;
                               if(limitRead.id === "MAX_TRANSACTION_LIMIT"){
                                  limitRead.value=limitsSegData[0].tbxPerTransactionAmt.text;
                                  }
                               else if(limitRead.id === "WEEKLY_LIMIT"){
                                 limitRead.value=limitsSegData[0].tbxWeeklyTransactionAmt.text;
                               }
                               else if(limitRead.id ==="DAILY_LIMIT"){
                                 limitRead.value=limitsSegData[0].tbxDailyTransactionAmt.text;
                               }
                             }
                            else if(limitGroupRead.limitGroupId === "BULK_PAYMENT"){
                               limitMap[limitGroupRead.limitGroupId+"_"+limitRead.id] = limitRead;
                               if(limitRead.id === "MAX_TRANSACTION_LIMIT"){
                                  limitRead.value=bulklimitsSegData[0].tbxPerTransactionAmt.text;
                                  }
                               else if(limitRead.id === "WEEKLY_LIMIT"){
                                 limitRead.value=bulklimitsSegData[0].tbxWeeklyTransactionAmt.text;
                               }
                               else if(limitRead.id ==="DAILY_LIMIT"){
                                 limitRead.value=bulklimitsSegData[0].tbxDailyTransactionAmt.text;
                               }
                             }
                           else{
                             limitMap[limitGroupRead.limitGroupId+"_"+limitRead.id] = limitRead;
                           }
                         }
                      }
                
                    /*if(swap && dataItem.limitGroups.length==2){
                       var temp = dataItem.limitGroups[0];
                       dataItem.limitGroups[0] = dataItem.limitGroups[1];
                       dataItem.limitGroups[1] = temp;
                    }*/
			  }
			  catch(err) {
				  limitMap= {};
			  }
                    if (scope.noSingleFlag === false) {
                      for(var n=0; n<dataItem.limitGroups.length; n++){
                        if(dataItem.limitGroups[n].limitGroupId === "SINGLE_PAYMENT"){
                          individualTransaction = n;
                        }
                      }
                        if (scope.checkRange(Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxPerTransactionAmt.text)),dataItem.limitGroups[individualTransaction].limits[1].minValue,dataItem.limitGroups[individualTransaction].limits[1].maxValue)) {
                            dataItem.limitGroups[individualTransaction].limits[1].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxPerTransactionAmt.text));
                            count = count + 1;
                            limitsSegData[0].flxPerTrnasactionAmount.skin = "skne3e3e3br3pxradius";  
                        } else{
                         limitsSegData[0].lblErrorMessage.text =  kony.i18n.getLocalizedString("kony.i18n.userMgmt.valueShouldBe");
                       //  limitsSegData[0].lblErrorMessage.text = (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxPerTransactionAmt.text)) < dataItem.limitGroups[0].limits[1].minValue) ? "Value should be greater than min value." : "Value should be less than max value";
                         limitsSegData[0].flxPerTrnasactionAmount.skin = "sknborderff0000error";
                         limitsSegData[0].lblErrorMessage.isVisible = true;
                          invalidData+=1;
                      }
                        if (scope.checkRange(Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxDailyTransactionAmt.text)),dataItem.limitGroups[individualTransaction].limits[2].minValue,dataItem.limitGroups[individualTransaction].limits[2].maxValue)) 
                          {  
                            dataItem.limitGroups[individualTransaction].limits[2].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxDailyTransactionAmt.text));
                            count = count + 1;
                            limitsSegData[0].flxDailyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
                          } else 
                          {
                              limitsSegData[0].lblErrorMessage.text =  kony.i18n.getLocalizedString("kony.i18n.userMgmt.valueShouldBe");
                           //  limitsSegData[0].lblErrorMessage.text = (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxDailyTransactionAmt.text)) < dataItem.limitGroups[0].limits[2].minValue) ? "Value should be greater than min value." : "Value should be less than max value";
                             limitsSegData[0].flxDailyTrnasactionAmount.skin = "sknborderff0000error";
                             limitsSegData[0].lblErrorMessage.isVisible = true;
                            invalidData+=1;
                          }
                        if (scope.checkRange(Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxWeeklyTransactionAmt.text)), dataItem.limitGroups[individualTransaction].limits[0].minValue, dataItem.limitGroups[individualTransaction].limits[0].maxValue)) {                            
                           dataItem.limitGroups[individualTransaction].limits[0].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxWeeklyTransactionAmt.text));
                            count = count + 1;
                            limitsSegData[0].flxWeeklyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
                       } else
                        {
                            limitsSegData[0].lblErrorMessage.text =  kony.i18n.getLocalizedString("kony.i18n.userMgmt.valueShouldBe");
                            //limitsSegData[0].lblErrorMessage.text = (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxWeeklyTransactionAmt.text)) < dataItem.limitGroups[0].limits[0].minValue) ? "Value should be greater than min value." : "Value should be less than max value";
                            limitsSegData[0].flxWeeklyTrnasactionAmount.skin = "sknborderff0000error";
                            limitsSegData[0].lblErrorMessage.isVisible = true;
                            invalidData+=1;
                        }
                      
                      if (count ===3)
                        {
                          if(Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxPerTransactionAmt.text))<=
                             Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxDailyTransactionAmt.text)))
                             {
                            dataItem.limitGroups[individualTransaction].limits[1].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxPerTransactionAmt.text));
                            flag = flag + 1;
                            limitsSegData[0].flxPerTrnasactionAmount.skin = "skne3e3e3br3pxradius";                          
                        } 
                      else{
                          limitsSegData[0].lblErrorMessage.text =  "Value should be less than daily limit.";
                          limitsSegData[0].flxPerTrnasactionAmount.skin = "sknborderff0000error";
                          limitsSegData[0].lblErrorMessage.isVisible = true;
                          invalidData+=1;
                      }
                        if (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxDailyTransactionAmt.text))<=
                            Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxWeeklyTransactionAmt.text))){                            
                            dataItem.limitGroups[individualTransaction].limits[2].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxDailyTransactionAmt.text));
                            flag = flag + 1;
                            limitsSegData[0].flxDailyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
                        } else 
                          {
                             limitsSegData[0].lblErrorMessage.text =  "Value should be less than weekly limit.";
                             limitsSegData[0].flxDailyTrnasactionAmount.skin = "sknborderff0000error";
                             limitsSegData[0].lblErrorMessage.isVisible = true;
                             invalidData+=1;
                          }
                        if(Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxDailyTransactionAmt.text))<=
                           Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxWeeklyTransactionAmt.text)) ,
                           (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxPerTransactionAmt.text))<=
                            Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxWeeklyTransactionAmt.text)))){
                            dataItem.limitGroups[individualTransaction].limits[0].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segIndividualTransactionLimits.data[0].tbxWeeklyTransactionAmt.text));
                            flag = flag + 1;
                            limitsSegData[0].flxWeeklyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
                          
                        } else
                        {
                            limitsSegData[0].lblErrorMessage.text =   "Weekly limit should be greater than daily and per transaction limit.";
                            limitsSegData[0].flxDailyTrnasactionAmount.skin = "sknborderff0000error";
                            limitsSegData[0].flxPerTrnasactionAmount.skin = "sknborderff0000error";
                            limitsSegData[0].lblErrorMessage.isVisible = true;
                            invalidData+=1;
                        }
                      }
                    }
                  else {
                        flag = 6;
                    }
                  
                  
                    if (scope.noBulkFlag === false) {
                      for(var i=0; i<dataItem.limitGroups.length; i++){
                        if(dataItem.limitGroups[i].limitGroupId === "BULK_PAYMENT"){
                          bulkTransaction = i;
                        }
                      }
                        if (scope.checkRange(Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxPerTransactionAmt.text)),dataItem.limitGroups[bulkTransaction].limits[1].minValue, dataItem.limitGroups[bulkTransaction].limits[1].maxValue)){
                            dataItem.limitGroups[bulkTransaction].limits[1].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxPerTransactionAmt.text));
                            token = token + 1;
                            bulklimitsSegData[0].flxPerTrnasactionAmount.skin = "skne3e3e3br3pxradius"; 
                        }else 
                   {    
                        bulklimitsSegData[0].lblErrorMessage.text =  kony.i18n.getLocalizedString("kony.i18n.userMgmt.valueShouldBe");
                       // bulklimitsSegData[0].lblErrorMessage.text = (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxPerTransactionAmt.text)) < dataItem.limitGroups[1].limits[1].minValue) ? "Value should be greater than min value." : "Value should be less than max value";
                        bulklimitsSegData[0].lblErrorMessage.isVisible = true;
						bulklimitsSegData[0].flxPerTrnasactionAmount.skin = "sknborderff0000error";
                        invalidData+=1;
                   }
                        if (scope.checkRange(Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxDailyTransactionAmt.text)) , dataItem.limitGroups[bulkTransaction].limits[2].minValue, dataItem.limitGroups[bulkTransaction].limits[2].maxValue)){
                            dataItem.limitGroups[bulkTransaction].limits[2].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxDailyTransactionAmt.text));
                            token = token + 1;
                            bulklimitsSegData[0].flxDailyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
                        } else 
                   {
                      bulklimitsSegData[0].lblErrorMessage.text =  kony.i18n.getLocalizedString("kony.i18n.userMgmt.valueShouldBe");
                      //bulklimitsSegData[0].lblErrorMessage.text = (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxDailyTransactionAmt.text)) < dataItem.limitGroups[1].limits[2].minValue) ? "Value should be greater than min value." : "Value should be less than max value";
                      bulklimitsSegData[0].flxDailyTrnasactionAmount.skin = "sknborderff0000error";
                      bulklimitsSegData[0].lblErrorMessage.isVisible = true; 
                      invalidData+=1;
                   }
                      if (scope.checkRange(Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxWeeklyTransactionAmt.text)), dataItem.limitGroups[bulkTransaction].limits[0].minValue, dataItem.limitGroups[bulkTransaction].limits[0].maxValue)){                          
                            dataItem.limitGroups[bulkTransaction].limits[0].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxWeeklyTransactionAmt.text));
                            token = token + 1;
                            bulklimitsSegData[0].flxWeeklyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
                   } else 
					{
                       bulklimitsSegData[0].lblErrorMessage.text =  kony.i18n.getLocalizedString("kony.i18n.userMgmt.valueShouldBe");
                      // bulklimitsSegData[0].lblErrorMessage.text = (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxWeeklyTransactionAmt.text)) < dataItem.limitGroups[1].limits[0].minValue) ? "Value should be greater than min value." : "Value should be less than max value";
                       bulklimitsSegData[0].flxWeeklyTrnasactionAmount.skin = "sknborderff0000error";
                       bulklimitsSegData[0].lblErrorMessage.isVisible = true; 
                       invalidData+=1;
                    }
                      if(token===3){
                       if (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxPerTransactionAmt.text))<=
                           Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxDailyTransactionAmt.text))){
                           dataItem.limitGroups[bulkTransaction].limits[1].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxPerTransactionAmt.text));
                           flag = flag + 1;
                           bulklimitsSegData[0].flxPerTrnasactionAmount.skin = "skne3e3e3br3pxradius"; 
                  } else 
                   {     
                           bulklimitsSegData[0].lblErrorMessage.text = "Value should be less than daily limit.";
                           bulklimitsSegData[0].lblErrorMessage.isVisible = true;
                           bulklimitsSegData[0].flxPerTrnasactionAmount.skin = "sknborderff0000error";
                           invalidData+=1;
                   }
                        if (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxDailyTransactionAmt.text)) <=
                            Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxWeeklyTransactionAmt.text))) {
                               dataItem.limitGroups[bulkTransaction].limits[2].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxDailyTransactionAmt.text));
                               flag = flag + 1;
                               bulklimitsSegData[0].flxDailyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
                   } else 
                   {
                      bulklimitsSegData[0].lblErrorMessage.text = "Value should be less than weekly limit.";
                      bulklimitsSegData[0].flxDailyTrnasactionAmount.skin = "sknborderff0000error";
                      bulklimitsSegData[0].lblErrorMessage.isVisible = true; 
                      invalidData+=1;
                   }
                      if (Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxDailyTransactionAmt.text)) <=
                          Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxWeeklyTransactionAmt.text)),(
                          Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxPerTransactionAmt.text))<=
                          Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxWeeklyTransactionAmt.text)))) 
                          {   
                          
                            dataItem.limitGroups[bulkTransaction].limits[0].value = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(scope.view.segBulkTransactionLimits.data[0].tbxWeeklyTransactionAmt.text));
                            flag = flag + 1;
                            bulklimitsSegData[0].flxWeeklyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
                   }
                        else 
					{  
                       bulklimitsSegData[0].lblErrorMessage.text =   "Weekly limit should be greater than daily and per transaction limit.";
                       bulklimitsSegData[0].flxPerTrnasactionAmount.skin = "sknborderff0000error";
                       bulklimitsSegData[0].flxDailyTrnasactionAmount.skin = "sknborderff0000error";
                       bulklimitsSegData[0].lblErrorMessage.isVisible = true; 
                       invalidData+=1;
                    }
                    }
                    }
                  else {
                        flag = 6;
                    }
                 }
            });
            scope.view.segIndividualTransactionLimits.setData(limitsSegData);
            scope.view.segBulkTransactionLimits.setData(bulklimitsSegData);
            if (flag !== 6 && invalidData===0) {
                this.loadBusinessBankingModule().presentationController.setTransactionLimitsFromUserManagement(this.limitsValues);
                FormControllerUtility.showProgressBar(this.view);
                let navManager = applicationManager.getNavigationManager();
                var skipFlow = navManager.getCustomInfo('createSkipFlow');
                var editType = navManager.getCustomInfo('EditType');
                if(skipFlow !== "createSkipFlow"){
                   if(editType==="userEdit"){
                    this.loadBusinessBankingModule().presentationController.updateInfinityUser(this.loadBusinessBankingModule().presentationController.userManagementData,"limits");
       			   	}
       			   else if(editType === "roleEdit"){
        			this.loadBusinessBankingModule().presentationController.updateCustomRole(this.loadBusinessBankingModule().presentationController.userManagementData,"limits");
        			}
                }
                else{
                  applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
                }
              }
            },
            
            navToAckAfterUpdate : function(updateSuccessData){
              let navManager = applicationManager.getNavigationManager();
              navManager.setCustomInfo("updateSuccessData",updateSuccessData);
              var skipFlow = navManager.getCustomInfo('createSkipFlow');
              if(skipFlow !== "createSkipFlow"){
                navManager.setCustomInfo('editUserFlow',"editFlow");
                navManager.setCustomInfo('getInfinityUser',"false");
                applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
                FormControllerUtility.showProgressBar(this.view);
              }else{
                applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
                FormControllerUtility.showProgressBar(this.view);
                flag = 0;
            }
        },
    loadBusinessBankingModule: function() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
    },
    /**
         * Method will invoke on form pre show
         */
    preShow: function() {
      kony.application.dismissLoadingScreen();
      this.noBulkFlag = false;
      this.noSingleFlag = false;
      this.imgArrowTransform = this.getImgTransformObj();
      this.view.customheadernew.forceCloseHamburger();
      this.view.btnViewNEdit.text = kony.i18n.getLocalizedString("konybb.i18n.resetToDefault");
      this.view.btnProceedRoles.toolTip= kony.i18n.getLocalizedString("i18n.userManagement.Continue");
      this.view.btnCancelRoles.toolTip= kony.i18n.getLocalizedString("kony.tab.common.Cancel");
      var navManager = applicationManager.getNavigationManager();
      this.currencySymbol = navManager.getCustomInfo('userCurrency');
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);
      if (!kony.sdk.isNullOrUndefined(OLBConstants.CLIENT_PROPERTIES.ADVANCED_FEATURE_SELECTION) && OLBConstants.CLIENT_PROPERTIES.ADVANCED_FEATURE_SELECTION.toString().toLowerCase() === "true") {
        this.view.btnTransactionLimits.isVisible = true;
      } else {
        this.view.btnTransactionLimits.isVisible = false;
      }
      this.features = true;
      limits = this.loadBusinessBankingModule().presentationController.getUserManagementData();
      this.limitsValues = this.loadBusinessBankingModule().presentationController.getTransactionLimitsFromUserManagement();
	  //if(!this.limitsValues[0].limitGroups[0].limits[0].hasOwnProperty("maxValue"))
	  if(!kony.sdk.isNullOrUndefined(this.limitsValues) && !this.limitsValues[0].limitGroups[0].limits[0].hasOwnProperty("maxValue"))
			this.limitsValues = this.loadBusinessBankingModule().presentationController.getTransactionLimitsData();
      this.setCompany(limits);
      if (kony.i18n.getCurrentLocale() === "ar_AE") {
        this.view.enableScrolling = false;
      }
    },
    showInfoIcon: function(eveObj, content) {
      this.view.InfoIconPopup.flxAccountType.setVisibility(false);
      this.view.InfoIconPopup.flxInformation.height = "80px";
      if (this.view.InfoIconPopup.isVisible === true) {
        this.view.InfoIconPopup.setVisibility(false);
        // Populate the correct flex here
      } else {
        this.view.InfoIconPopup.lblInfo.text = content.info;
        this.view.InfoIconPopup.setVisibility(true);
       // this.view.InfoIconPopup.top = content.top + "dp";
        this.view.InfoIconPopup.left = content.left + "%";
        this.view.forceLayout();
      }
    },
     getImgTransformObj: function() {
            var imgTransformObj = kony.ui.makeAffineTransform();
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
              imgTransformObj.rotate(180);
            } else {
              imgTransformObj.rotate(0);
            }
            return imgTransformObj;
     },
    setCompany: function(limits) {
      var self = this;
      var companyData = limits.transactionLimits.map(function(dataItem) {
        var dataItemCif = dataItem.cif ? dataItem.cif : dataItem.companyId;
        var len = dataItemCif.length;
        var cif = dataItemCif.substring(len - 4, len);
        var limit = {
          "flxInnerRole": "flxInnerRole",
          "flxLabels": "flxLabels",
          "imgArrow": "imgArrow",
          "lblPermision": {
            "text": kony.i18n.getLocalizedString("i18n.UserManagement.default"),
          },
          "lblRoleName": {
            "text": dataItem.companyName + " - ..." + cif,
          },
          "cif": {
            "text": dataItemCif,
          },
        };
        return limit;
      });
      companyData.forEach(function(arrayElement, i) {
        if (i === 0) {
          arrayElement.imgArrow = {
            "transform": self.imgArrowTransform,
            "isVisible": true
          };
        } else {
          arrayElement.imgArrow = {
            "transform": self.imgArrowTransform,
            "isVisible": false
          };
        }
      });
      this.view.segCustomRoles.setData(companyData);
      compName = limits.transactionLimits[0].companyName; //companyData[0].lblRoleName.text.slice(0, companyData[0].lblRoleName.text.length - 10);
      if (limits.transactionLimits.length > 1) {
        if (compName[i] === limits.transactionLimits[0].companyName) {
          this.selectedCompany = companyData[0].lblRoleName.text;
        } else if (compName[i] === limits.transactionLimits[1].companyName) {
          this.selectedCompany = companyData[1].lblRoleName.text;
        }
      } else {
        this.selectedCompany = companyData[0].lblRoleName.text;
      }
      this.view.segCustomRoles.onRowClick = this.setLimit;
      this.view.btnViewNEdit.onClick = this.resetTodefault.bind(this, limits.transactionLimits[0].cif ? limits.transactionLimits[0].cif : limits.transactionLimits[0].companyId);
      // this.loadBusinessBankingModule().presentationController.getInfinityUserDetails(limits.transactionLimits[0].cif);
      this.setDataToTransactionLimits(limits);
      this.view.forceLayout();
    },
    resetTodefault: function() {
      limits = this.loadBusinessBankingModule().presentationController.getInitUserManagementData();
      this.setCompany(limits);
    },
    setLimit: function(context) {
      var selectedRow = context.selectedRowIndex;
      var self = this;
      var selectedID = this.view.segCustomRoles.data[selectedRow[1]].cif.text;
      var companyName = this.view.segCustomRoles.data[selectedRow[1]].lblRoleName.text;
      compName = companyName.substring(0, companyName.length - 10);
      var index = this.view.segCustomRoles.selectedRowIndex[1];
      var segDataval = this.view.segCustomRoles.data;
      segDataval.forEach(function(arrayElement, i) {
        if (i === index) {
          arrayElement.imgArrow = {
            "transform": self.imgArrowTransform,
            "isVisible": true
          };
        } else {
          arrayElement.imgArrow = {
            "transform": self.imgArrowTransform,
            "isVisible": false
          };
        }
      });
      this.view.segCustomRoles.setData(segDataval);
      this.view.btnViewNEdit.onClick = this.resetTodefault.bind(this, selectedID);
      // this.loadBusinessBankingModule().presentationController.getInfinityUserDetails(selectedID);
      this.setDataToTransactionLimits(limits);
    },
    setDataToTransactionLimits: function(companyDetails) {
        for(i in companyDetails.transactionLimits)
        {
          if(compName===companyDetails.transactionLimits[i].companyName)
          {
          var limitLength = companyDetails.transactionLimits[i].limitGroups.length;
          if (limitLength > 1) {
            this.setDataToIndividualTransactionLimits(companyDetails);
            this.setDataToBulkTransaction(companyDetails);
            } else if (limitLength === 1) 
			{
            var limitgroupID = companyDetails.transactionLimits[i].limitGroups[0].limitGroupId;
              if (limitgroupID === "SINGLE_PAYMENT") 
			  {
              this.setDataToIndividualTransactionLimits(companyDetails);
              this.setNoDataToBulkPayments();
			}
              else 
			  {
              this.setDataToBulkTransactionNew(companyDetails);
              this.setNoDataToSinglePayments();
            }
          }
        }
      }
    },
	  
	  setNoDataToBulkPayments:function()
	  {
      this.noBulkFlag = true;
      this.view.segBulkTransactionLimits.widgetDataMap = this.getWidgetDataMappingForNoTransactionLimits();
      finalresult = [
        [{
          "flxTransactionLimitValues": "flxTransactionLimitValues",
          "flxGroupHeaderComp": {
            isVisible: true,
          },
          "lblRowHeaderTitle": "Bulk Payment Limits",
          "imgInfo": {
            isVisible: false,
          },
        },
         [{
           "flxNoRecordFound": "flxNoRecordFound",
           "flxMessageWrapper": "flxMessageWrapper",
           "imgInfo1": {
             isVisible: true,
           },
           "lblNoRecordsFound": "No Transaction limits found",
         }]
        ]
      ];
      this.view.segBulkTransactionLimits.rowTemplate = "flxNoRecordFound";
      this.features = false;
      this.view.segBulkTransactionLimits.setData(finalresult);
    },
	  
	  setNoDataToSinglePayments:function()
	  {
      this.noSingleFlag = true;
      this.view.segIndividualTransactionLimits.widgetDataMap = this.getWidgetDataMappingForNoTransactionLimits();
      finaldata = [
        [{
          "flxTransactionLimitValues": "flxTransactionLimitValues",
          "flxGroupHeaderComp": {
            isVisible: true,
          },
          "lblRowHeaderTitle": "Single Payment Limits",
          "imgInfo": {
            isVisible: false,
          },
        },
         [{
           "flxNoRecordFound": "flxNoRecordFound",
           "flxMessageWrapper": "flxMessageWrapper",
           "imgInfo1": {
             isVisible: true,
           },
           "lblNoRecordsFound": "No Transaction limits found",
         }]
        ]
      ];
      this.view.segIndividualTransactionLimits.rowTemplate = "flxNoRecordFound";
      this.features = false;
      this.view.segIndividualTransactionLimits.setData(finaldata);
    },
    setDataToIndividualTransactionLimits: function(companyDetails) {
      // for individual transaction limits
      var scope = this;
      this.view.segIndividualTransactionLimits.widgetDataMap = this.getWidgetDataMappingForTransactionLimits();
      var finaldata = [];
      var week, daily, per;
      var individualTransaction;
      var segData = companyDetails.transactionLimits.map(function(dataItem) {
        if (compName === dataItem.companyName) {
          for(var n=0; n<dataItem.limitGroups.length ; n++){
            if(dataItem.limitGroups[n].limitGroupId === "SINGLE_PAYMENT"){
              individualTransaction = n; }}
          for(i=0;dataItem.limitGroups[individualTransaction].limits[i];i++)
          {
            if(dataItem.limitGroups[individualTransaction].limits[i].id === "WEEKLY_LIMIT")
              week = dataItem.limitGroups[individualTransaction].limits[i].value;
            if(dataItem.limitGroups[individualTransaction].limits[i].id === "DAILY_LIMIT")
              daily = dataItem.limitGroups[individualTransaction].limits[i].value;
            if(dataItem.limitGroups[individualTransaction].limits[i].id === "MAX_TRANSACTION_LIMIT")
              per = dataItem.limitGroups[individualTransaction].limits[i].value;
          }
          var values = {
            "flxTransactionLimitValues": "flxTransactionLimitValues",
            "flxGroupHeaderComp": {
              isVisible: true,
            },
            "lblRowHeaderTitle": dataItem.limitGroups[individualTransaction].limitGroupName,
            "imgInfo": {
              "isVisible": true,
              "onTouchEnd": function(eveObj, content) {
                content = {
                  left: "50",
                  top: "540",
                  info: dataItem.limitGroups[individualTransaction].limitGroupDescription, //dataItem.limitGroups[1].limitGroupId,
                };
                scope.showInfoIcon(eveObj, content);
              },
            },   
            "lblErrorMessage":{ "isVisible": false },
            "flxPerTransactionLimit": "flxPerTransactionLimit", 
            "flxPerTrnasactionAmount": {"skin":"skne3e3e3br3pxradius"},
            "flxPerTransactionCurrency": "flxPerTransactionCurrency",
            "flxPerTransactioEnterAmount": "flxPerTransactioEnterAmount",
             "lblPerTransactionLimitHeaderTitle" : {
							"isVisible" : true,
							"text"  : kony.i18n.getLocalizedString("i18n.konybb.perTransaction")
			},
             "lblDailyTransactionLimitHeaderTitle" : {
							"isVisible" : true,
							"text"  : kony.i18n.getLocalizedString("i18n.konybb.dailyTransaction")
			},
             "lblWeeklyTransactionLimitHeaderTitle" : {
							"isVisible" : true,
							"text"  : kony.i18n.getLocalizedString("i18n.konybb.weeklyTransaction")
			},
            "lblCurrency": {
              "text": scope.currencySymbol,
            },
            "lblCurrency2": {
              "text": scope.currencySymbol,
            },
            "lblCurrency1": {
              "text": scope.currencySymbol,
            },
            "tbxPerTransactionAmt": {
              "text": "" + applicationManager.getFormatUtilManager().formatAmount(per), //""+limitValues.singleMaxper,
              "onKeyUp": scope.validateTransactionLimitsUI.bind(this, "segIndividualTransactionLimits")
            },
            "flxDailyTransactionLimit": "flxDailyTransactionLimit",
            "flxDailyTrnasactionAmount":  {"skin":"skne3e3e3br3pxradius"},
            "flxDailyTransactionCurrency": "flxDailyTransactionCurrency",
            "flxDailyTransactioEnterAmount": "flxDailyTransactioEnterAmount",
            "tbxDailyTransactionAmt": {
              "text": "" + applicationManager.getFormatUtilManager().formatAmount(daily), //""+limitValues.singleMaxDaily,
              "onKeyUp": scope.validateTransactionLimitsUI.bind(this, "segIndividualTransactionLimits")
            },
            "flxWeeklyTransactionLimit": "flxWeeklyTransactionLimit",
            "flxWeeklyTrnasactionAmount":  {"skin":"skne3e3e3br3pxradius"},
            "flxWeeklyTransactionCurrency": "flxWeeklyTransactionCurrency",
            "flxWeeklyTransactioEnterAmount": "flxWeeklyTransactioEnterAmount",
            "tbxWeeklyTransactionAmt": {
              "text": "" + applicationManager.getFormatUtilManager().formatAmount(week), //""+limitValues.singleMaxWeekly,
              "onKeyUp": scope.validateTransactionLimitsUI.bind(this, "segIndividualTransactionLimits")
            }
          };
          return values;
        }
      });
      for (i = 0; i < segData.length; i++) {
        if (segData[i] !== undefined)
          //  segData[i].pop();
          finaldata.push(segData[i]);
      }
      if (finaldata.length !== 0) {
        this.view.segIndividualTransactionLimits.rowTemplate = "flxUserManagementTransactionLimits";
      } else {
        this.setNoDataToSinglePayments();
      }
      this.view.segIndividualTransactionLimits.setData(finaldata);
    },
    setDataToBulkTransaction: function(companyDetails) {
      // for bulk transaction limits
      var scope = this;
      var finalresult = [];
      this.view.segBulkTransactionLimits.widgetDataMap = this.getWidgetDataMappingForTransactionLimits();
      var week, daily, per;
      var bulkTransaction;
      var segmentData = companyDetails.transactionLimits.map(function(dataItem) {
        if (compName === dataItem.companyName) {
          for(var n=0; n<dataItem.limitGroups.length ; n++){
          if(dataItem.limitGroups[n].limitGroupId === "BULK_PAYMENT"){
              bulkTransaction = n; }}
          for(i=0;dataItem.limitGroups[bulkTransaction].limits[i];i++)
          {
            if(dataItem.limitGroups[bulkTransaction].limits[i].id === "WEEKLY_LIMIT")
              week = dataItem.limitGroups[bulkTransaction].limits[i].value;
            if(dataItem.limitGroups[bulkTransaction].limits[i].id === "DAILY_LIMIT")
              daily = dataItem.limitGroups[bulkTransaction].limits[i].value;
            if(dataItem.limitGroups[bulkTransaction].limits[i].id === "MAX_TRANSACTION_LIMIT")
              per = dataItem.limitGroups[bulkTransaction].limits[i].value;
          }
          var values = {
            "flxTransactionLimitValues": "flxTransactionLimitValues",
            "flxGroupHeaderComp": {
              isVisible: true,
            },
            "lblRowHeaderTitle": dataItem.limitGroups[bulkTransaction].limitGroupName,
            "imgInfo": {
              "isVisible": true,
              "onTouchEnd": function(eveObj, content) {
                content = {
                  left: "47",
                  top: "780",
                  info: dataItem.limitGroups[bulkTransaction].limitGroupDescription, //dataItem.limitGroups[0].limitGroupId,
                };
                scope.showInfoIcon(eveObj, content);
              },
            }, 
            "lblErrorMessage":  { "isVisible": false   },
            "flxPerTransactionLimit": "flxPerTransactionLimit",
            "flxPerTrnasactionAmount":  {"skin":"skne3e3e3br3pxradius"},
            "flxPerTransactionCurrency": "flxPerTransactionCurrency",
            "flxPerTransactioEnterAmount": "flxPerTransactioEnterAmount",
             "lblPerTransactionLimitHeaderTitle" : {
							"isVisible" : true,
							"text"  : kony.i18n.getLocalizedString("i18n.konybb.perTransaction")
			},
             "lblDailyTransactionLimitHeaderTitle" : {
							"isVisible" : true,
							"text"  : kony.i18n.getLocalizedString("i18n.konybb.dailyTransaction")
			},
             "lblWeeklyTransactionLimitHeaderTitle" : {
							"isVisible" : true,
							"text"  : kony.i18n.getLocalizedString("i18n.konybb.weeklyTransaction")
			},
            "lblCurrency": {
              "text": scope.currencySymbol,
            },
            "lblCurrency2": {
              "text": scope.currencySymbol,
            },
            "lblCurrency1": {
              "text": scope.currencySymbol,
            },
            "tbxPerTransactionAmt": {
              "text": "" + applicationManager.getFormatUtilManager().formatAmount(per), //""+limitValues.bulkMaxPer,
              "onKeyUp": scope.validateTransactionLimitsUI.bind(this, "segBulkTransactionLimits")
            },
            "flxDailyTransactionLimit": "flxDailyTransactionLimit",
            "flxDailyTrnasactionAmount" :{"skin":"skne3e3e3br3pxradius"},
            "flxDailyTransactionCurrency": "flxDailyTransactionCurrency",
            "flxDailyTransactioEnterAmount": "flxDailyTransactioEnterAmount",
            "tbxDailyTransactionAmt": {
              "text": "" + applicationManager.getFormatUtilManager().formatAmount(daily), //""+limitValues.bulkMaxDaily,
              "onKeyUp": scope.validateTransactionLimitsUI.bind(this, "segBulkTransactionLimits")
            },
            "flxWeeklyTransactionLimit": "flxWeeklyTransactionLimit",
            "flxWeeklyTrnasactionAmount" :{"skin":"skne3e3e3br3pxradius"},
            "flxWeeklyTransactionCurrency": "flxWeeklyTransactionCurrency",
            "flxWeeklyTransactioEnterAmount": "flxWeeklyTransactioEnterAmount",
            "tbxWeeklyTransactionAmt": {
              "text": "" + applicationManager.getFormatUtilManager().formatAmount(week), //""+limitValues.bulkMaxWeekly,
              "onKeyUp": scope.validateTransactionLimitsUI.bind(this, "segBulkTransactionLimits")
            }
          };
          return values;
      }
      });
      for (i = 0; i < segmentData.length; i++) {
        if (segmentData[i] !== undefined)
          //   segmentData[i].pop();
          finalresult.push(segmentData[i]);
      }
      if (finalresult.length !== 0) {
        this.view.segBulkTransactionLimits.rowTemplate = "flxUserManagementTransactionLimits";
      } else {
        this.setNoDataToBulkPayments();
      }
      this.view.segBulkTransactionLimits.setData(finalresult);
      this.view.forceLayout();
    },
    setDataToBulkTransactionNew: function(companyDetails) {
      // for bulk transaction limits
      var scope = this;
      var finalresult = [];
      this.view.segBulkTransactionLimits.widgetDataMap = this.getWidgetDataMappingForTransactionLimits();
      var week, daily, per;
      var segmentData = companyDetails.transactionLimits.map(function(dataItem) {
        if (compName === dataItem.companyName) {
          for(i=0;dataItem.limitGroups[0].limits[i];i++)
          {
            if(dataItem.limitGroups[0].limits[i].id === "WEEKLY_LIMIT")
              week = dataItem.limitGroups[0].limits[i].value;
            if(dataItem.limitGroups[0].limits[i].id === "DAILY_LIMIT")
              daily = dataItem.limitGroups[0].limits[i].value;
            if(dataItem.limitGroups[0].limits[i].id === "MAX_TRANSACTION_LIMIT")
              per = dataItem.limitGroups[0].limits[i].value;
          }
          var values = {
            "flxTransactionLimitValues": "flxTransactionLimitValues",
            "flxGroupHeaderComp": {
              isVisible: true,
            },
            "lblRowHeaderTitle": dataItem.limitGroups[0].limitGroupName,
            "imgInfo": {
              "isVisible": true,
              "onTouchEnd": function(eveObj, content) {
                content = {
                  left: "47",
                  top: "780",
                  info: dataItem.limitGroups[0].limitGroupDescription, //dataItem.limitGroups[0].limitGroupId,
                };
                scope.showInfoIcon(eveObj, content);
              },
            },
            "flxPerTransactionLimit": "flxPerTransactionLimit",
            "flxPerTrnasactionAmount": "flxPerTrnasactionAmount",
            "flxPerTransactionCurrency": "flxPerTransactionCurrency",
            "flxPerTransactioEnterAmount": "flxPerTransactioEnterAmount",
            "lblPerTransactionLimitHeaderTitle" : {
							"isVisible" : true,
							"text"  : kony.i18n.getLocalizedString("i18n.konybb.perTransaction")
			},
             "lblDailyTransactionLimitHeaderTitle" : {
							"isVisible" : true,
							"text"  : kony.i18n.getLocalizedString("i18n.konybb.dailyTransaction")
			},
             "lblWeeklyTransactionLimitHeaderTitle" : {
							"isVisible" : true,
							"text"  : kony.i18n.getLocalizedString("i18n.konybb.weeklyTransaction")
			},
            "lblCurrency": {
              "text": scope.currencySymbol,
            },
            "lblCurrency2": {
              "text": scope.currencySymbol,
            },
            "lblCurrency1": {
              "text": scope.currencySymbol,
            },
            "tbxPerTransactionAmt": {
              "text": "" + applicationManager.getFormatUtilManager().formatAmount(per), //""+limitValues.bulkMaxPer,
              "onKeyUp": scope.validateTransactionLimitsUI.bind(this, "segBulkTransactionLimits")
            },
            "flxDailyTransactionLimit": "flxDailyTransactionLimit",
            "flxDailyTrnasactionAmount": "flxDailyTrnasactionAmount",
            "flxDailyTransactionCurrency": "flxDailyTransactionCurrency",
            "flxDailyTransactioEnterAmount": "flxDailyTransactioEnterAmount",
            "tbxDailyTransactionAmt": {
              "text": "" + applicationManager.getFormatUtilManager().formatAmount(daily), //""+limitValues.bulkMaxDaily,
              "onKeyUp": scope.validateTransactionLimitsUI.bind(this, "segBulkTransactionLimits")
            },
            "flxWeeklyTransactionLimit": "flxWeeklyTransactionLimit",
            "flxWeeklyTrnasactionAmount": "flxWeeklyTrnasactionAmount",
            "flxWeeklyTransactionCurrency": "flxWeeklyTransactionCurrency",
            "flxWeeklyTransactioEnterAmount": "flxWeeklyTransactioEnterAmount",
            "tbxWeeklyTransactionAmt": {
              "text": "" + applicationManager.getFormatUtilManager().formatAmount(week), //""+limitValues.bulkMaxWeekly,
              "onKeyUp": scope.validateTransactionLimitsUI.bind(this, "segBulkTransactionLimits")
            }
          };
          return values;
        }
      });
      for (i = 0; i < segmentData.length; i++) {
        if (segmentData[i] !== undefined)
          //   segmentData[i].pop();
          finalresult.push(segmentData[i]);
      }
      if (finalresult.length !== 0) {
        this.view.segBulkTransactionLimits.rowTemplate = "flxUserManagementTransactionLimits";
      } else {
        this.setNoDataToBulkPayments();
      }
      this.view.segBulkTransactionLimits.setData(finalresult);
      this.view.forceLayout();
    },
		
    getWidgetDataMappingForNoTransactionLimits: function() {
      var mapping = {
        "flxTransactionLimitValues": "flxTransactionLimitValues",
        "flxGroupHeaderComp": "flxGroupHeaderComp",
        "lblRowHeaderTitle": "lblRowHeaderTitle",
        "imgInfo": "imgInfo",
        "flxNoRecordFound": "flxNoRecordFound",
        "flxMessageWrapper": "flxMessageWrapper",
        "imgInfo1": "imgInfo1",
        "lblNoRecordsFound": "lblNoRecordsFound"
      };
      return mapping;
    },
    getWidgetDataMappingForTransactionLimits: function() {
      var mapping = {
        "flxTransactionLimitValues": "flxTransactionLimitValues",
        "flxGroupHeaderComp": "flxGroupHeaderComp",
        "lblRowHeaderTitle": "lblRowHeaderTitle",
        "imgInfo": "imgInfo",
         "lblErrorMessage":"lblErrorMessage",
                "flxTransaction":"flxTransaction",
        "flxPerTransactionLimit": "flxPerTransactionLimit",
        "flxPerTrnasactionAmount": "flxPerTrnasactionAmount",
        "flxPerTransactionCurrency": "flxPerTransactionCurrency",
        "flxPerTransactioEnterAmount": "flxPerTransactioEnterAmount",
        "lblPerTransactionLimitHeaderTitle" : "lblPerTransactionLimitHeaderTitle",
        "lblDailyTransactionLimitHeaderTitle" : "lblDailyTransactionLimitHeaderTitle",
        "lblWeeklyTransactionLimitHeaderTitle" : "lblWeeklyTransactionLimitHeaderTitle",
        "tbxPerTransactionAmt": "tbxPerTransactionAmt",
        "flxDailyTransactionLimit": "flxDailyTransactionLimit",
        "flxDailyTrnasactionAmount": "flxDailyTrnasactionAmount",
        "flxDailyTransactionCurrency": "flxDailyTransactionCurrency",
        "flxDailyTransactioEnterAmount": "flxDailyTransactioEnterAmount",
        "tbxDailyTransactionAmt": "tbxDailyTransactionAmt",
        "flxWeeklyTransactionLimit": "flxWeeklyTransactionLimit",
        "flxWeeklyTrnasactionAmount": "flxWeeklyTrnasactionAmount",
        "flxWeeklyTransactionCurrency": "flxWeeklyTransactionCurrency",
        "flxWeeklyTransactioEnterAmount": "flxWeeklyTransactioEnterAmount",
        "tbxWeeklyTransactionAmt": "tbxWeeklyTransactionAmt",
        "lblCurrency": "lblCurrency",
        "lblCurrency2": "lblCurrency2",
        "lblCurrency1": "lblCurrency1",
      };
      return mapping;
    },
    /**
         * Method will invoke on form post show
         */
     
    postShow: function() {
      this.onBreakpointChange();
      FormControllerUtility.disableButton(this.view.btnProceedRoles);
      var flowType = this.loadBusinessBankingModule().presentationController.getUserManagementFlow();
      var createOrEditFlow = this.loadBusinessBankingModule().presentationController.getUserNavigationType();
      this.view.lblRoleDescription.text= kony.i18n.getLocalizedString( "konybb.i18n.featurePermissionsForCompany");
      if (kony.i18n.getCurrentLocale() === "ar_AE") {
        if (kony.application.getCurrentBreakpoint() <= 1024) {
            this.view.lblLabel1.right = "345px";
            this.view.lblUserName.left="84%";
            this.view.lblEmail.left="73%";
       } else if (kony.application.getCurrentBreakpoint() >= 1366) {
            this.view.lblLabel1.right = "630px";
             }
         }    
      if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
        this.view.lblUserName.isVisible = false;
        this.view.lblEmail.isVisible = false;
        if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
          this.view.customheadernew.customhamburger.activateMenu("User Management", "Create Custom Role");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.CreateRoleTransactionLimits"), CommonUtilities.getaccessibilityConfig());
        } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
          this.view.customheadernew.customhamburger.activateMenu("User Management", "User Roles");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.ViewEditRoleTransactionLimits"), CommonUtilities.getaccessibilityConfig());
        }
      } else if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION) {
        this.userDetails = this.loadBusinessBankingModule().presentationController.getUserDetails()
        this.view.lblUserName.isVisible = true;
        this.view.lblEmail.isVisible = true;
        CommonUtilities.setText(this.view.lblUserName, this.userDetails.firstName + " " + this.userDetails.lastName, CommonUtilities.getaccessibilityConfig());
        CommonUtilities.setText(this.view.lblEmail, this.userDetails.email, CommonUtilities.getaccessibilityConfig());
        if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
          this.view.customheadernew.customhamburger.activateMenu("User Management", "Create UM User");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.CreateUserTransactionLimits"), CommonUtilities.getaccessibilityConfig());
        } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
          this.view.customheadernew.customhamburger.activateMenu("User Management", "All Users");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.ViewEditUserTransactionLimits"), CommonUtilities.getaccessibilityConfig());
        }
      }
    },
    /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
    /* accessibilityFocusSetup: function(){
              let widgets = [
                [this.view.tbLastName, this.view.flxLastName],
                [this.view.tbxDriversLicense, this.view.flxDriversLicense],
                [this.view.tbxEmail, this.view.flxEmail],
                [this.view.tbxMiddleName, this.view.flxMiddleName],
                [this.view.tbxName, this.view.flxName],
                [this.view.tbxPhoneNum, this.view.flxPhoneNum],
                [this.view.tbxSSN, this.view.flxSSN]            
              ]
              for(let i=0; i<widgets.length; i++){
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
              }
            },*/
    /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */
    //     updateFormUI: function () {
    //     },
    navToNextForm: function() {
      //applicationManager.getNavigationManager().navigateTo("frmUpdatePermissionsInBulk");   
      var ntf = new kony.mvc.Navigation("frmUpdatePermissionsInBulk");
      ntf.navigate(this.selectedCompany);
    },
    /*
             navToPrevForm: function() {
            //applicationManager.getNavigationManager().navigateTo("frmUpdatePermissionsInBulk");   
            var ntf = new kony.mvc.Navigation("frmConfirmAndAck");
            ntf.navigate(this.selectedCompany);
        },
*/
    validateTransactionLimitsUI: function(id) {
      var scopeObj = this;
      //scopeObj.view.flxErrorMessageTransferPermissions.setVisibility(false);
      //this.adjustScreen();
      // this.view.segIndividualTransactionLimits
      var limitsSegData1 = scopeObj.view.segBulkTransactionLimits.data;
      var limitsSegData2 = scopeObj.view.segIndividualTransactionLimits.data;
      var limitsSegData;
      if (id === "segBulkTransactionLimits") {
        limitsSegData = limitsSegData1;
      } else limitsSegData = limitsSegData2;
      FormControllerUtility.disableButton(this.view.btnProceedRoles);
      for (var i in limitsSegData) {
           limitsSegData[i].lblErrorMessage.isVisible = false;
				limitsSegData[i].flxPerTrnasactionAmount.skin = "skne3e3e3br3pxradius";
				limitsSegData[i].flxDailyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
				limitsSegData[i].flxWeeklyTrnasactionAmount.skin = "skne3e3e3br3pxradius";
        if (limitsSegData[i].tbxPerTransactionAmt.text === "" || limitsSegData[i].tbxDailyTransactionAmt.text === "" || limitsSegData[i].tbxWeeklyTransactionAmt.text === "") {
          FormControllerUtility.disableButton(this.view.btnProceedRoles);
          return;
        }
      }
      // 			if (id === "segBulkTransactionLimits") {
      //                 scopeObj.view.segBulkTransactionLimits.setData(limitsSegData);
      //             } else
      // 				scopeObj.view.segIndividualTransactionLimits.setData(limitsSegData);
      FormControllerUtility.enableButton(this.view.btnProceedRoles);
    },
    checkRange: function(limitValue,minValue,maxValue) {
        if(!kony.sdk.isNullOrUndefined(minValue) && !kony.sdk.isNullOrUndefined(maxValue)) {
        if(limitValue >= minValue &&  limitValue <= maxValue)
          return true;
        else 
          return false;

      }
	  else {
		return false;
	 }
    },
  };
});