define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    return /** @alias module:frmUserManagementController */ {
        /**
         * Method to display the footer at the end of the screen by calculating the size of screen dynamically
         * @param {integer} data value
         **/
        selectedCustIndex: "",
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
        this.view.customheader.onBreakpointChangeComponent(width);
        var scope=this;
        var data = scope.breakPointSegData;
        this.seti18nValues();
        if(data !== undefined){
          //data=(scope.segData!=="")? scope.segData:scope.view.segCustomers.data;
          var mapping = {
            "flxSelectSignatoryGroup": "flxSelectSignatoryGroup",
            "flxInnerRole": "flxInnerRole",
            "flxSelectSignatory": "flxSelectSignatory",
            "imgSelectRole": "imgSelectRole",
            "lblRoleName": "lblRoleName",
            "lblRoleDesc": "lblRoleDesc",
            "lblPermision" : "lblPermision",
            "lblPermissionValue" : "lblPermissionValue",
            "imgArrow" : "imgArrow"
          };
          scope.view.segCustomers.rowTemplate="flxUserManagementSignatoryGroup";
          scope.view.segCustomers.widgetDataMap=mapping;
          scope.view.segCustomers.setData(data);
          if (width <= 640 || orientationHandler.isMobile) {
            scope.view.segCustomers.setData(data);
          } else if (width <= 1024) {
            scope.view.segCustomers.setData(data);
          } else if (width <= 1366) {
            scope.view.segCustomers.setData(data);
          } else {
            scope.view.segCustomers.setData(data);
          }
        }
      },
        /**
         * hide all ui flexes in user management form
         */
        resetUI: function() {
            this.adjustScreen();
        },
        initActions: function() {
            var scopeObj = this;
           kony.application.dismissLoadingScreen();
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            //this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnProceedRoles.onClick = function() {};
            this.view.flxMainWrapper.isVisible = false;
            this.view.imgCloseDowntimeWarning.onTouchEnd = function() {
                scopeObj.view.flxMainWrapper.isVisible = false;
            };
            this.view.btnCancelRoles.onClick = function() {
                scopeObj.goBackFunction();
            }.bind(this);
            this.view.segSignatoryRoles.onRowClick = this.onRoleSelected;
          this.view.imgSelectRoleNone.onTouchEnd = this.onNoneSelected;
        },
        onSkip: function() {
          var navManager = applicationManager.getNavigationManager();
          var entityDetails = navManager.getCustomInfo("addToEntityDetails");
          this.view.flxEntityHeader.setVisibility(true);
          this.view.lblContentHeader.text="Select Signatory Group (Optional)";
          //this.view.flxAddUser.height = "45dp";
          this.view.lblEntityHeader.text = "Adding " + '"' + entityDetails.userDetails.selectedUserName + '"' + " to " + '"' + entityDetails.addToEntityName + '"' + " entity";
          this.view.lblEntityHeader.skin = "sknSSPSB42424218Px";
      },
        goBackFunction: function() {
            applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
        },
        loadBusinessBankingModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        },
        /**
         * Method will invoke on form pre show
         */
        preShow: function() {
          var scope = this;
            this.view.customheader.forceCloseHamburger();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);
            this.limits = this.loadBusinessBankingModule().presentationController.getUserManagementData();
             this.imgArrowTransform = this.loadBusinessBankingModule().presentationController.getImgTransformObj();
            //this.limitsValues = this.loadBusinessBankingModule().presentationController.getTransactionLimitsFromUserManagement();
          //if(!applicationManager.getConfigurationManager().backFlag){
          if(applicationManager.getConfigurationManager().copyFlag === undefined){
            if(this.limits.signatoryGroups !== undefined){
              if(this.limits.signatoryGroups.length > 0){
                this.view.flxRoleLeftContainer.setVisibility(true);
                this.view.flxSelectSignatory.setVisibility(true);
                this.view.lblRoleName.text = kony.i18n.getLocalizedString("i18n.common.none");
                this.view.segSignatoryRoles.setVisibility(true);
                this.view.btnProceedRoles.setVisibility(true);
                this.setCustomers(this.limits);
                var segData = this.view.segCustomers.data;
                var companyName = segData[0].lblRoleName.text;
                this.setSigGroups(companyName,0);
                this.unselectSigGrps();  // default selected "None"
              }
              else{
                var compNames = applicationManager.getConfigurationManager().compNameArr;
                if(compNames !== undefined){
                  this.view.flxRoleLeftContainer.setVisibility(true);
                  this.view.flxSelectSignatory.setVisibility(false);
                  this.setCompNameWithNoSigGrps(compNames);
                  this.view.lblRoleName.text = kony.i18n.getLocalizedString("konybb.userMgmt.errorsignatorygroup");
                  this.view.segSignatoryRoles.setVisibility(false);
                  this.view.btnProceedRoles.setVisibility(true);
                  FormControllerUtility.disableButton(this.view.btnProceedRoles);
                }
              }
            }
            else{
              var compNames = applicationManager.getConfigurationManager().compNameArr;
              if(compNames !== undefined){
                this.view.flxRoleLeftContainer.setVisibility(true);
                this.view.flxSelectSignatory.setVisibility(false);
                this.setCompNameWithNoSigGrps(compNames);
                this.view.lblRoleName.text = kony.i18n.getLocalizedString("konybb.userMgmt.errorsignatorygroup");
                this.view.segSignatoryRoles.setVisibility(false);
                this.view.btnProceedRoles.setVisibility(true);
                FormControllerUtility.disableButton(this.view.btnProceedRoles);
              }
            }
          }
            this.view.flxSelectSignatory.onClick = function() {
              scope.unselectSigGrps();
            }.bind(this);
            this.view.btnProceedRoles.onClick = function() {
              scope.navToAck();
            }.bind(this);
            this.view.btnSkip.onClick = function() {
              scope.navToAckSkip();
            }.bind(this);
            this.view.btnBackAccessRoles.onClick = function() {
              scope.navToBBAccountAccess();
            }.bind(this);
            this.view.btnCancelRoles.onClick = function() {
              scope.navToBBDashBoard();
            }.bind(this);
            var isEditFlow = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            if(isEditFlow){
              this.view.btnBackAccessRoles.setVisibility(false);
              this.view.btnSkip.setVisibility(false);
              this.view.btnProceedRoles.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
            }
            else{
              this.view.btnBackAccessRoles.setVisibility(true);
              this.view.btnSkip.setVisibility(true);
              this.view.btnProceedRoles.text = kony.i18n.getLocalizedString("konybb.userMgmt.Copy");
            }
            applicationManager.getConfigurationManager().skipFlag = false;
          //}
          this.seti18nValues();
          FormControllerUtility.hideProgressBar(this.view);
        },
      
      navToBBAccountAccess : function(){
        applicationManager.getNavigationManager().navigateTo("frmBBAccountAccessAndRole");
      },
      navToBBDashBoard : function(){
        this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
      },
      navToAck : function(){
        this.loadBusinessBankingModule().presentationController.setUserManagementData(this.limits);
        applicationManager.getConfigurationManager().copyFlag = true;
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
      },
      navToAckSkip : function(){
        //this.loadBusinessBankingModule().presentationController.setUserManagementData(this.limits);
        applicationManager.getConfigurationManager().skipFlag = true;
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
      },
      seti18nValues : function(){
        var isEditFlow = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
         if(isEditFlow){
          this.view.btnProceedRoles.text = kony.i18n.getLocalizedString("konybb.userMgmt.update");
          this.view.btnProceedRoles.toolTip = kony.i18n.getLocalizedString("konybb.userMgmt.update");      
         }
         else{
           this.view.btnProceedRoles.text = kony.i18n.getLocalizedString("konybb.userMgmt.Copy");
           this.view.btnProceedRoles.toolTip = kony.i18n.getLocalizedString("konybb.userMgmt.Copy");
         }
         this.view.btnCancelRoles.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
         this.view.btnBackAccessRoles.toolTip =  kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
         this.view.btnSkip.toolTip =  kony.i18n.getLocalizedString("konybb.i18n.common.skip");
         CommonUtilities.setFooterButtonToolTips(this.view.customfooternew);
      },
      unselectSigGrps : function(){
        var scopeObj = this;
        this.view.imgSelectRoleNone.src = "radiobtn_active.png";
        var segData = this.view.segSignatoryRoles.data;
        for (var j = 0; j < segData.length; j++) {
          segData[j].imgSelectRole.src = "radioinactivebb.png";
        }
        this.view.segSignatoryRoles.setData(segData);
        this.setSelectedSigGrp("None");
      },
      
      setSigGroups: function(selectedCompName,index,context) {
        //var selectedCompName = context.lblRoleName.text;
        var RowData = [];
        var limits = this.limits;
        var scopeObj = this;
        var segData = this.view.segCustomers.data;
        var selectedGroup;
        scopeObj.view.imgSelectRoleNone.src = "radioinactivebb.png";
        for (var j = 0; j < limits.signatoryGroups.length; j++) {
          segData[j].imgArrow.isVisible = false;
          segData[j].imgArrow.transform= scopeObj.imgArrowTransform;
        }
        this.view.segCustomers.setData(segData);
        var segDataFinal = this.view.segCustomers.data;
        for (var i = 0; i < limits.signatoryGroups.length; i++) {
          if (limits.signatoryGroups[i].companyName === selectedCompName) {
            selectedGroup = limits.signatoryGroups[i].groups;
            segDataFinal[index].imgArrow.isVisible = true;
          }
        }
        this.view.segCustomers.setData(segDataFinal);

        var count = 0;
        var srcVal;
        if(selectedGroup.length > 0){
          selectedGroup.forEach(function(item){
            if(item.isAssociated === "true"){
              srcVal =  "radiobtn_active.png";
              count++;
            }
            else
              srcVal = "radioinactivebb.png";
            var centerY = (item.signatoryGroupDescription !==null && item.signatoryGroupDescription !== undefined && item.signatoryGroupDescription !== "") ? "30%" :"50%";
            var RowVal = {
              lblRoleName: {
                "text": item.signatoryGroupName,
                "centerY":centerY
              },
              lblRoleDesc: {
                "text": item.signatoryGroupDescription,
                "isVisible":centerY ==="30%"?true:false
              },
              imgSelectRole: {
                "src": srcVal,//"radioactivebb.png"
                "onTouchEnd" : scopeObj.selectSigGrp.bind(this,item.signatoryGroupName,selectedGroup)
              }
            };
            RowData.push(RowVal);
          });

          //if(count !== 0){
            this.view.segSignatoryRoles.setVisibility(true);
            this.view.flxInnerRole.setVisibility(true);
            //this.view.flxNosigGrps.setVisibility(false);
            this.view.flxSelectSignatory.setVisibility(true);
            this.view.imgNoSignatory.setVisibility(false);
            this.view.lblRoleName.text = kony.i18n.getLocalizedString("i18n.common.none");
            var dataMapping = this.getWidgetDataMappingForSigGroup();
            this.view.segSignatoryRoles.widgetDataMap = dataMapping;
            this.view.segSignatoryRoles.setData(RowData);
          //}
//           else{
//             this.view.segSignatoryRoles.setVisibility(false);
//             this.view.flxInnerRole.setVisibility(true);
//             //this.view.flxNosigGrps.setVisibility(true);
//             this.view.flxSelectSignatory.setVisibility(false);
//             this.view.imgNoSignatory.setVisibility(true);
//             this.view.lblRoleName.text = "User does not have any approval permission";
//           }
        }
        else{
          this.view.segSignatoryRoles.setVisibility(false);
          this.view.flxInnerRole.setVisibility(false);
          this.view.flxNosigGrps.setVisibility(true);
        }

        this.view.forceLayout();
      },
      
      selectSigGrp : function(selectedGrpName,selectedGrp,context){
        var scopeObj = this;
        var segData = this.view.segSignatoryRoles.data;
        for (var j = 0; j < selectedGrp.length; j++) {
          segData[j].imgSelectRole.src = "radioinactivebb.png";
        }
        this.view.segSignatoryRoles.setData(segData);
        
        var segDataFinal = this.view.segSignatoryRoles.data;
        for (var i = 0; i < selectedGrp.length; i++) {
          if(segDataFinal[i].lblRoleName.text === selectedGrpName)
            segDataFinal[i].imgSelectRole.src = "radiobtn_active.png";
          scopeObj.view.imgSelectRoleNone.src = "radioinactivebb.png";
        }
        this.view.segSignatoryRoles.setData(segDataFinal);
        this.setSelectedSigGrp(selectedGrpName);
      },
      
      setSelectedSigGrp : function(selectedGrpName){
        var segData = this.view.segCustomers.data;
        var scope = this;
        segData.forEach(function(item){
          if(item.imgArrow.isVisible === true){
            item.lblPermissionValue.text = kony.i18n.getLocalizedString("i18n.common.none");  
            item.lblPermissionValue.text = selectedGrpName;
            scope.limits.signatoryGroups.forEach(function(data){
              if(data.companyName === item.lblRoleName.text){
                if(data.groups.length > 0){
                  data.groups.forEach(function(grp){
                    if(item.lblPermissionValue.text !== kony.i18n.getLocalizedString("i18n.common.none")){
                      item.lblPermissionValue.text = kony.i18n.getLocalizedString("i18n.common.none");  
                      if(grp.signatoryGroupName === item.lblPermissionValue.text){
                        grp.isAssociated = "true";
                      }
                      else
                        grp.isAssociated = "false";
                    }
                    else{
                      grp.isAssociated = "false";
                    }
                  });
                }
              }
            })
          }
        });
        this.view.segCustomers.setData(segData);
      },
      
      setCustomers: function(limits) {
        var RowData = [];
        var scopeObj = this;
        let index = -1;
        var selectedGroup;
        var count = 0;
        var compName = [];
        
        if(applicationManager.getConfigurationManager().compNameArr === undefined){
          for (var j = 0; j < limits.signatoryGroups.length; j++) {
            compName.push(limits.signatoryGroups[j].companyName);
          }
        }
        else{
          compName = applicationManager.getConfigurationManager().compNameArr;
        }
        for (var i = 0; i < limits.signatoryGroups.length; i++) {
          if(compName.includes(limits.signatoryGroups[i].companyName)){
            if(limits.signatoryGroups[i].groups.length === 0 ){
              selectedGroup = "None";
            }
            else{
              limits.signatoryGroups[i].groups.forEach(function(item){
                if(item.isAssociated === "true"){
                  selectedGroup = item.signatoryGroupName;
                  count++;
                }
                if(item.isAssociated === "false" && count === 0){
                  selectedGroup = "None";
                }
              });
            }
            index += 1;
            var RowVal = {
              lblRoleName: {
                "text": limits.signatoryGroups[i].companyName
              },
              lblPermision : {
                "text" : kony.i18n.getLocalizedString("i18n.ProfileManagement.Selected:")
              },
              lblPermissionValue : {
                "text" : selectedGroup
              },
              imgArrow : {
                "src" : "arrowtest.png",
                "transform": scopeObj.imgArrowTransform,
                "isVisible": false
              },
              flxInnerRole : {
                "onClick" : scopeObj.setSigGroups.bind(this,limits.signatoryGroups[i].companyName, index),//scopeObj.setSigGroups(limits.signatoryGroups[i].companyName, index)//scopeObj.setSigGroups(this,limits.signatoryGroups[i].companyName,index)
              }
            };
            RowData.push(RowVal);
          }
        }
        this.breakPointSegData = RowData;
        var dataMapping = this.getWidgetDataMappingForAssignSignatory();
        this.view.segCustomers.rowTemplate = "flxUserManagementSignatoryGroup";
        this.view.segCustomers.widgetDataMap = dataMapping;
        this.view.segCustomers.setData(RowData);
        //this.view.segCustomers.onRowClick = this.setSigGroups(this);
        this.view.forceLayout();
      },
      
      setCompNameWithNoSigGrps: function(limits) {
        var RowData = [];
        var scopeObj = this;
        let index = -1;
        var selectedGroup;
        var count = 0;
        var compName = [];
        
       
        for (var i = 0; i < limits.length; i++) {
          
            var RowVal = {
              lblRoleName: {
                "text": limits[i]
              },
              lblPermision : {
                "text" : kony.i18n.getLocalizedString("i18n.ProfileManagement.Selected")
              },
              lblPermissionValue : {
                "text" : kony.i18n.getLocalizedString("i18n.common.none")
              },
              imgArrow : {
                "src" : "arrowtest.png",
                "transform": scopeObj.imgArrowTransform,
                "isVisible": false
              }
//               flxInnerRole : {
//                 //"onClick" : scopeObj.setSigGroups.bind(this,limits.signatoryGroups[i].companyName, index),//scopeObj.setSigGroups(limits.signatoryGroups[i].companyName, index)//scopeObj.setSigGroups(this,limits.signatoryGroups[i].companyName,index)
//               }
            };
            RowData.push(RowVal);
          }
        this.breakPointSegData = RowData;
        var dataMapping = this.getWidgetDataMappingForAssignSignatory();
        this.view.segCustomers.widgetDataMap = dataMapping;
        this.view.segCustomers.setData(RowData);
        //this.view.segCustomers.onRowClick = this.setSigGroups(this);
        this.view.forceLayout();
      },
      
        resetTodefault: function() {
            limits = this.loadBusinessBankingModule().presentationController.getInitUserManagementData();
            this.setCustomers(limits);
        },
        setLimit: function(context) {
            var selectedRow = context.selectedRowIndex;
           // var selectedID = this.view.segCustomers.data[selectedRow[1]].cif.text;
           // var companyName = this.view.segCustomers.data[selectedRow[1]].lblRoleName.text;
            //compName = companyName.substring(0, companyName.length - 10);
            var index = this.view.segCustomers.selectedRowIndex[1];
            var self=this;
            var segDataval = this.view.segCustomers.data;
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
          this.selectedCustIndex=index;
            this.view.segCustomers.setData(segDataval);
            //check edit flow or create flow create flow clear
            this.clearSignatory();
        },
        clearSignatory: function() {
            var scope = this;
            this.view.imgSelectRoleNone.src = "radioinactivebb.png";
            var segData = scope.view.segSignatoryRoles.data;
            segData.forEach(function(arrayElement, i) {
                arrayElement.imgSelectRole = {
                    "src": "radioinactivebb.png"
                };
            });
            this.view.segSignatoryRoles.setData(segData);
        },
        onNoneSelected: function() {
            var scope = this;
            if (this.view.imgSelectRoleNone.src === "radioinactivebb.png") this.view.imgSelectRoleNone.src = "radiobtn_active.png";
            else this.view.imgSelectRoleNone.src = "radioinactivebb.png";
            var segData = scope.view.segSignatoryRoles.data;
            segData.forEach(function(arrayElement, i) {
                arrayElement.imgSelectRole = {
                    "src": "radioinactivebb.png"
                };
            });
            this.view.segSignatoryRoles.setData(segData);
            this.generateSelected(kony.i18n.getLocalizedString("i18n.common.none"));
        },
        onRoleSelected: function() {
            var scope = this;
            var selectedVal;
            this.view.imgSelectRoleNone.src = "radioinactivebb.png";
            var index = this.view.segSignatoryRoles.selectedRowIndex[1];
            var segData = scope.view.segSignatoryRoles.data;
            segData.forEach(function(arrayElement, i) {
                if (i === index) {
                    arrayElement.imgSelectRole = {
                        "src": "radiobtn_active.png"
                    };
                    selectedVal = arrayElement.lblRoleName;
                } else {
                    arrayElement.imgSelectRole = {
                        "src": "radioinactivebb.png"
                    };
                }
            });
            this.view.segSignatoryRoles.setData(segData);
            this.generateSelected(selectedVal);
        },
        generateSelected: function(selectedValue) {
            var scope = this;
            var index =  this.selectedCustIndex;
            var segDataval = this.view.segCustomers.data;
            segDataval.forEach(function(arrayElement, i) {
                if (i === index) {
                    arrayElement.lblPermissionValue = {
                        "text": selectedValue
                    };
                } 
                
            });
            this.view.segCustomers.setData(segDataval);
        },
        getWidgetDataMappingForAssignSignatory: function() {
            var mapping = {
                "flxSelectSignatoryGroup": "flxSelectSignatoryGroup",
                "flxInnerRole": "flxInnerRole",
                "flxSelectSignatory": "flxSelectSignatory",
                "imgSelectRole": "imgSelectRole",
                "lblRoleName": "lblRoleName",
                "lblRoleDesc": "lblRoleDesc",
              "lblPermision" : "lblPermision",
              "lblPermissionValue" : "lblPermissionValue",
              "imgArrow" : "imgArrow"
            };
            return mapping;
        },
      getWidgetDataMappingForSigGroup: function() {
        var mapping = {
          "flxSelectSignatoryGroup": "flxSelectSignatoryGroup",
          "flxInnerRole": "flxInnerRole",
          "flxSelectSignatory": "flxSelectSignatory",
          "imgSelectRole": "imgSelectRole",
          "lblRoleName": "lblRoleName",
          "lblRoleDesc": "lblRoleDesc"
        };
        return mapping;
      },
        /**
         * Method will invoke on form post show
         */
        postShow: function() {
            //this.onBreakpointChange();
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
              if (kony.application.getCurrentBreakpoint() <= 1024) {
                  this.view.flxInnerRole.left = "45.8%";
                  this.view.flxInnerRole.width = "95%";
              }
          }
          if (isAddToEntityFlow === "addToEntity") {
            this.onSkip();
        } else {
            var flowType = this.loadBusinessBankingModule().presentationController.getUserManagementFlow();
            var createOrEditFlow = this.loadBusinessBankingModule().presentationController.getUserNavigationType();
            if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
                this.view.lblUserName.isVisible = true;
                var navManager = applicationManager.getNavigationManager();
                CommonUtilities.setText(this.view.lblUserName, navManager.getCustomInfo("CustomerName"), CommonUtilities.getaccessibilityConfig());
                this.view.lblEmail.isVisible = true;
                CommonUtilities.setText(this.view.lblEmail, navManager.getCustomInfo("CustomerEmailId"), CommonUtilities.getaccessibilityConfig());
                this.view.lblEmail.isVisible = true;
                if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                    //this.view.customheader.activateMenu("User Management", "Create Custom Role");
                    CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("konybb.userMgmt.CreateCustomRoleAssignSignatory"), CommonUtilities.getaccessibilityConfig());
                } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
                    //this.view.customheader.activateMenu("User Management", "User Roles");
                    CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("konybb.userMgmt.CreateCustomRoleAssignSignatory"), CommonUtilities.getaccessibilityConfig());
                }
            } else if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION) {
                this.userDetails = this.loadBusinessBankingModule().presentationController.getUserDetails();
                this.view.lblUserName.isVisible = true;
                this.view.lblEmail.isVisible = true;
                var navManager = applicationManager.getNavigationManager();
                CommonUtilities.setText(this.view.lblUserName, navManager.getCustomInfo("CustomerName"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(this.view.lblEmail, navManager.getCustomInfo("CustomerEmailId"), CommonUtilities.getaccessibilityConfig());
                if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                    //this.view.customheader.activateMenu("User Management", "Create UM User");
                    CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("konybb.userMgmt.CreateuserSignatory"), CommonUtilities.getaccessibilityConfig());
                } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
                    //this.view.customheader.activateMenu("User Management", "All Users");
                    CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("konybb.userMgmt.CreateuserSignatory"), CommonUtilities.getaccessibilityConfig());
                }
            }
          }
        },
    };
});