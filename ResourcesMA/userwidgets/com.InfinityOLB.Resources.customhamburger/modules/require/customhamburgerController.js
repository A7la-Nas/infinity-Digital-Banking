define(['HamburgerConfig', 'ViewConstants'], function(HamburgerConfig, ViewConstants) {
    var MENU_CONTAINER = "flxMenuWrapper";
    var SAMPLE_MENU = "flxAccountsMenu";
    var SAMPLE_SUB_MENU = "flxAccountsSubMenu";
    var SAMPLE_SUB_MENU_ITEM = "flxMyAccounts";
    var onItemSelectListener = null;
    var i18nMap = {};
    var orientationHandler = new OrientationHandler();
    var MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH = 5; 
    return {
  
        initialized: false,
        actiavteWhenInitialized: null,
  
        /**
         * Sets onItemSelect Listener
         */
        setItemSelectListener: function(listener) {
            onItemSelectListener = listener;
        },
        postShow: function() {
            this.initialized = false;
            str = kony.i18n.getCurrentLocale();
            if (str === "ar_AE") {
                this.view.lbfonticonlLogout.text = "/";
            } else {
                this.view.lbfonticonlLogout.text = "l";
            }
            let singleEntityValue = "true";
            if (applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") !== undefined) {
                singleEntityValue = applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity");
            }
            let userLegalEntitesSize = applicationManager.getMultiEntityManager().getUserLegalEntitiesSize();
            if (singleEntityValue === "false") {
                this.view.flxLegalEntityHamburger.setEnabled(true);
                if (userLegalEntitesSize > 0) {
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        this.view.flxLegalEntityHamburger.setVisibility(true);
                    }
                    if (userLegalEntitesSize === 1)
                        this.view.flxLegalEntityHamburger.setEnabled(false);
                    this.view.flxLegalEntityDropdownHamburger.onClick = this.toggleLEDropdown.bind(this, this.view.flxSegLegalEntityHamburger, this.view.lblLegalEntityDropdownIconHamburger);
                    this.view.flxLegalEntityDropdownHamburger.onKeyPress = this.onKeyPressLEHamFlx;
                    this.view.tbxLESearchHamburger.onKeyUp = this.performSearch.bind(this);
                    this.view.flxLECrossHamburger.onClick = this.populateLEList.bind(this);
                    let scope = this;
                    this.view.segLegalEntityHamburger.onRowClick = function () {
                        scope.onEntitySwitchInDropdown(scope.view.segLegalEntityHamburger, scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityTextHamburger, scope.populateLEList);
                    };
                    this.populateLEList();
                } else {
                    this.view.flxLegalEntityHamburger.setVisibility(false);
                }
            } else {
                this.view.flxLegalEntityHamburger.setVisibility(false);
            }
            this.postShowHamburger();
            this.view.flxLegalEntityDropdownHamburger.accessibilityConfig={
                a11yLabel : this.view.lblLegalEntityHamburger.text + " " + this.view.lblLegalEntityTextHamburger.text,
                a11yARIA:{
                "role": "button",
                "aria-expanded":false,
                "tabindex":0
                }
            }
            this.view.forceLayout();
        },

        onKeyPressLEHamFlx: function (eventObject, eventPayload, context) {
            var scope = this;
            if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                if(scope.view.flxSegLegalEntityHamburger.isVisible===true)
                scope.toggleLEDropdown(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
            }
            if (eventPayload.keyCode === 27) {
                if(scope.view.flxSegLegalEntityHamburger.isVisible===true){
              scope.toggleLEDropdown(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);}
              scope.view.flxLegalEntityDropdownHamburger.setActive(true);
            }
          },
  
  
        /**
         * Activates the menu
         * @param {string} parentId of parent menu
         * @param {string} childId of parent menu
         */
        activateMenu: function(parentId, childId) {
            if (!this.initialized) {
                this.actiavteWhenInitialized = {
                    parentId: parentId,
                    childId: childId
                }
                return;
            }
            var parentIndex = 0;
            var menuObject = null;
            var visibleIndex = 1; //One as offset for sample widget 
            HamburgerConfig.config.forEach(function(menuItem) {
                if (!menuItem.isVisible || menuItem.isVisible()) {
                    if (menuItem.id.toLowerCase() === parentId.toLowerCase()) {
                        parentIndex = visibleIndex;
                        menuObject = menuItem;
                    }
                    visibleIndex++;
                }
            });
            if (menuObject) {
                this.activeMenu = menuObject.id;
                var childIndex = -1;
                var visibleChildIndex = 1; //One as offset for sample widget 
                var children = this.view[MENU_CONTAINER].widgets();
                this.collapseAll();
                this.resetSkins();
                this.expandWithoutAnimation(children[parentIndex * 2 + 1]);
                //children[parentIndex*2].widgets()[2].widgets()[0].text = "P";
                children[parentIndex * 2].widgets()[2].widgets()[0].accessibilityConfig = {
                    "a11yHidden": true,
                    "a11yARIA": {
                        tabindex: -1,
                        // "aria-expanded": false,
                    }
                };
                if (menuObject.id === "Exchange Rates") {
                    children[parentIndex * 2].widgets()[2].widgets()[0].accessibilityConfig = {
                        "a11yLabel": "",
                        "a11yARIA": {
                            "tabindex" /* Integer with no floating/decimal numbers*/: -1,
                        }
                    };
                }
                if (menuObject.subMenu.children.length === 0) {
                    str = kony.i18n.getCurrentLocale();
                    if (str === "ar_AE") {
                        children[parentIndex * 2].widgets()[2].widgets()[0].text = "R";
                    } else {
                        children[parentIndex * 2].widgets()[2].widgets()[0].text = "Q";
                    }
                    children[parentIndex * 2].widgets()[2].widgets()[0].width = "11dp";
                    children[parentIndex * 2].widgets()[2].widgets()[0].height = "12dp";
                }
                if (childId) {
                    var childObject = null;
                    menuObject.subMenu.children.forEach(function(childItem) {
                        if (!childItem.isVisible || childItem.isVisible()) {
                            if (childItem.id.toLowerCase() === childId.toLowerCase()) {
                                childIndex = visibleChildIndex;
                                childObject = childItem;
                            }
                            visibleChildIndex++;
                        }
                    });
                    if (childObject) {
                        children[parentIndex * 2 + 1].widgets()[childIndex].skin = "skncursor";
                        children[parentIndex * 2 + 1].widgets()[childIndex].hoverSkin = "skncursor";
                        children[parentIndex * 2 + 1].widgets()[childIndex].widgets()[0].skin = "sknLblHamburgerSelected";
                      children[parentIndex * 2 + 1].widgets()[childIndex].accessibilityConfig = {
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "link",
                                "aria-current": true
                            }
                        };
                    }
                }
            }
  
        },

        fetchTermsAndConditions: function (requestObj, callback) {
            let accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
            accountsModule.presentationController.fetchTermsAndConditions(requestObj, callback);
        },

        updateTermsAndConditions: function (requestObj, callback) {
            let accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
            accountsModule.presentationController.updateTermsAndConditions(requestObj, callback);
        },

        onEntitySwitchInDropdown: function (seg, flx, lbl, callback) {
            let scope = this;
            let selectedEntityRowData = seg.selectedRowItems[0];
            let selectedEntityData;
            if (selectedEntityRowData) {
                selectedEntityData = seg.data.find(entityData => entityData.id === selectedEntityRowData.id);
            }
            let checkTermsAndConditionsAlreadySignedCallback = function (response) {
                if (response && !response.alreadySigned) {
                    scope.showTermsAndConditionsLegalEntityPopup(response, seg, flx, lbl, callback);
                } else {
                    callback();
                }
            };
            if (selectedEntityData) {
                let request = {
                    "id": selectedEntityData.id
                };
                scope.fetchTermsAndConditions(request, checkTermsAndConditionsAlreadySignedCallback);
            }
        },

        performSearch: function () {
            let scope = this;
            if (this.view.tbxLESearchHamburger.text.trim().length > 0) {
                this.view.flxLECrossHamburger.isVisible = true;
                var entityData = this.view.segLegalEntityHamburger.info.data;
                var searchText = this.view.tbxLESearchHamburger.text.toLowerCase();
                var statusName = "";
                var filteredData = entityData.filter(function (rec) {
                    statusName = rec.lblDescription.text.toLowerCase();
                    if (statusName.indexOf(searchText) >= 0) return rec;
                });
                if (filteredData.length === 0) {
                    this.view.segLegalEntityHamburger.setVisibility(false);
                } else {
                    this.view.segLegalEntityHamburger.setVisibility(true);
                    this.view.segLegalEntityHamburger.setData(filteredData);
                }
            } else {
                this.populateLEList();
            }
            this.view.forceLayout();
        },

        populateLEList: function () {
            let scope = this;
            this.view.segLegalEntityHamburger.widgetDataMap = {
                "lblDescription": 'lblDescription',
                "id": "id",
                "flxMultiEntityList":"flxMultiEntityList",
            };
            let segData = [];
            let entitiesData = applicationManager.getMultiEntityManager().getUserLegalEntitiesListArr();
            for (let entityData of entitiesData) {
                segData.push({
                    "flxMultiEntityList": {
                        onKeyPress: scope.onHamLEKeyPressCallback
                      },
                    "lblDescription": {
                        text: entityData.companyName,
                        toolTip: entityData.companyName,
                        skin: 'ICSKNLbl42424215PxWordBreak'
                    },
                    "id": entityData.id
                })
            };
            this.view.segLegalEntityHamburger.setData(segData);
            this.view.segLegalEntityHamburger.info = {
                "data": this.view.segLegalEntityHamburger.data
            };
            this.view.segLegalEntityHamburger.setVisibility(true);
            if (segData.length <= MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH) {
                this.view.flxLESearchHamburger.isVisible = false;
            } else {
                this.view.flxLESearchHamburger.isVisible = true;
                this.view.tbxLESearchHamburger.text = "";
                this.view.flxLECrossHamburger.isVisible = false;
            }
            let currentLegalEntity = applicationManager.getUserPreferencesManager().getCurrentLegalEntity();
            let selectedEntityData = entitiesData.find(entityData => entityData.id === currentLegalEntity);
            this.view.lblLegalEntityTextHamburger.text = selectedEntityData && selectedEntityData.companyName ? selectedEntityData.companyName : "";
            this.view.lblLegalEntityDropdownIconHamburger.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.flxSegLegalEntityHamburger.setVisibility(false);
            this.view.forceLayout();
        },

        onHamLEKeyPressCallback: function (eventObject, eventPayload, context) {
            var scope = this;
            if (eventPayload.keyCode === 9 && context.sectionIndex === 0 && context.rowIndex === context.widgetInfo.data.length - 1 && !eventPayload.shiftKey) {
              scope.toggleLEDropdown(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
              scope.view.flxLegalEntityDropdownHamburger.setActive(true);
            }
            if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
              if (context.rowIndex === 0 && context.sectionIndex === 0) {
                scope.toggleLEDropdown(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
                eventPayload.preventDefault();
                scope.view.flxLegalEntityDropdownHamburger.setActive(true);
              }
            }
            if (eventPayload.keyCode === 27) {
              scope.toggleLEDropdown(scope.view.flxSegLegalEntityHamburger, scope.view.lblLegalEntityDropdownIconHamburger);
              scope.view.flxLegalEntityDropdownHamburger.setActive(true);
            }
          },

        toggleLEDropdown: function (flx, lbl) {
            var segData = this.view.segLegalEntityHamburger.data;
            if (segData.length <= MIN_ENTITIES_RECORDS_TO_ALLOW_SEARCH) {
                this.view.flxLESearchHamburger.isVisible = false;
                this.view.flxSegLegalEntityHamburger.height = segData.length >= 3 ?  '150dp' : 50 * segData.length + 1 + 'dp';
                this.view.segLegalEntityHamburger.height = '100%'
            } else {
                this.view.flxLESearchHamburger.isVisible = true;
                this.view.tbxLESearchHamburger.text = "";
                this.view.flxLECrossHamburger.isVisible = false;
                this.view.flxSegLegalEntityHamburger.height = '175dp'
                this.view.segLegalEntityHamburger.height = '85%'
            }
            if (flx.isVisible) {
                flx.setVisibility(false);
                lbl.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                this.view.flxLegalEntityDropdownHamburger.accessibilityConfig = {
                    a11yLabel : this.view.lblLegalEntityHamburger.text + " " + this.view.lblLegalEntityTextHamburger.text,
                    a11yARIA: {
                        "role": "button",
                        "aria-expanded": false,
                        "tabindex": 0
                    }
                };
            } else {
                flx.setVisibility(true);
                lbl.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                this.view.flxLegalEntityDropdownHamburger.accessibilityConfig = {
                    a11yLabel : this.view.lblLegalEntityHamburger.text + " " + this.view.lblLegalEntityTextHamburger.text,
                    a11yARIA: {
                        "role": "button",
                        "aria-expanded": true,
                        "tabindex": 0
                    }
                };
            }
            this.view.flxLegalEntityDropdownHamburger.setActive(true);
        },
  
        addTermsAndConditionsLegalEntityPopup: function () {
            let currForm = kony.application.getCurrentForm();
            if (!currForm.flxTermsAndConditionsLegalEntity) {
                var flxTermsAndConditionsLegalEntity = new kony.ui.FlexContainer({
                    "id": "flxTermsAndConditionsLegalEntity",
                    "autogrowMode": kony.flex.AUTOGROW_NONE,
                    "clipBounds": false,
                    "top": "0dp",
                    "left": "0dp",
                    "width": "100%",
                    "height": "100%",
                    "isVisible": false,
                    "layoutType": kony.flex.FREE_FORM,
                    "isModalContainer": true,
                    "skin": "sknflx000000op50",
                    "zIndex": 1200,
                    "appName": "ResourcesMA"
                }, {}, {});
                flxTermsAndConditionsLegalEntity.setDefaultUnit(kony.flex.DP);
                currForm.add(flxTermsAndConditionsLegalEntity);
            }
            if (!currForm.flxTermsAndConditionsLegalEntity.tandcLegalEntity) {
                var componentTAndCLegalEntity = new com.InfinityOLB.Resources.TermsAndConditionLegalEntity({
                    "autogrowMode": kony.flex.AUTOGROW_NONE,
                    "id": "tandcLegalEntity",
                    "layoutType": kony.flex.FLOW_VERTICAL,
                    "masterType": constants.MASTER_TYPE_DEFAULT,
                    "isModalContainer": true,
                    "appName": "ResourcesMA"
                });
                flxTermsAndConditionsLegalEntity.add(componentTAndCLegalEntity);
            }
        },

        showTermsAndConditionsLegalEntityPopup: function (response, seg, flx, lbl, callback) {
            let scope = this;
            if (kony.application.getCurrentForm()) {
                let currForm = kony.application.getCurrentForm();
                if (!currForm.flxTermsAndConditionsLegalEntity || !currForm.flxTermsAndConditionsLegalEntity.tandcLegalEntity) {
                    scope.addTermsAndConditionsLegalEntityPopup();
                }
                currForm.tandcLegalEntity.TermsAndConditionBody.text = response && response.termsAndConditionsContent ? response.termsAndConditionsContent : "";
                currForm.tandcLegalEntity.flxClose.setActive(true);
                currForm.tandcLegalEntity.flxClose.onClick = scope.onClickOfCancelTAndCLegalEntity.bind(scope, flx, callback);
                currForm.tandcLegalEntity.btnCancelTAndC.accessibilityConfig = {
                    "a11yARIA": {
                        "tabindex": 0
                    }
                };
                currForm.tandcLegalEntity.btnCancelTAndC.onClick = scope.onClickOfCancelTAndCLegalEntity.bind(scope, flx, callback);
                currForm.tandcLegalEntity.btnAcceptTAndC.accessibilityConfig = {
                    "a11yARIA": {
                        "tabindex": 0
                    }
                };
                currForm.tandcLegalEntity.btnAcceptTAndC.onClick = scope.onClickOfAcceptTAndCLegalEntity.bind(scope, seg, flx, lbl, callback);
                currForm.flxTermsAndConditionsLegalEntity.setVisibility(true);
                currForm.forceLayout();
            }
        },

        hideTermsAndConditionsLegalEntityPopup: function () {
            let currForm = kony.application.getCurrentForm();
            currForm.flxTermsAndConditionsLegalEntity.setVisibility(false);
            currForm.remove(currForm.flxTermsAndConditionsLegalEntity);
        },

        onClickOfAcceptTAndCLegalEntity: function (seg, flx, lbl, callback) {
            let scope = this;
            let selectedEntityRowData = seg.selectedRowItems[0];
            let selectedEntityData = seg.data.find(entityData => entityData.id === selectedEntityRowData.id);
            let requestObj = {
                "id": selectedEntityData.id
            };
            scope.hideTermsAndConditionsLegalEntityPopup();
            scope.updateTermsAndConditions(requestObj, callback);
        },

        onClickOfCancelTAndCLegalEntity: function (flx, callback) {
            let scope = this;
            flx.setVisibility(false);
            scope.hideTermsAndConditionsLegalEntityPopup();
            callback();
        },

        /**
         * EXpand WIthout Animation
         */
        expandWithoutAnimation: function(widget) {
            widget.height = (widget.widgets().length - 1) * 60;
            this.view.forceLayout();
        },
  
        /**
         * Resets the skin
         */
        resetSkins: function() {
            var subMenus = this.view[MENU_CONTAINER].widgets().filter(function(child, i) {
                return i % 2 !== 0;
            })
  
            subMenus.forEach(function(subMenu) {
                subMenu.widgets().forEach(function(subMenuItem) {
                    subMenuItem.skin = "skncursor";
                    subMenuItem.hoverSkin = "sknFlxHoverHamburger";
                    subMenuItem.widgets()[0].skin = "sknLblHamburgerUnSelected";
                })
            })
  
        },
  
        /**
         * Generate prefix by removing whitespace
         * @param {string} id Id of ite,
         * @returns {string} id with whitespace removed
         */
        getPrefix: function(id) {
            return id.replace(/ /g, '')
        },
  
        /**
         * Toggles the sub menu
         * @param {kony.ui.FlexContainer} widget Submenu widget to toggle 
         * @param {kony.ui.FlexContainer} imgArrow imgArrow to toggle
         */
        toggle: function(widget, imgArrow, parentWidget) {
            var menuText = widget.id.split("flx")[0];
            if (imgArrow.text !== "O") {
                this.collapseAll();
                imgArrow.text = "O";
                // imgArrow.toolTip="Expand";
                imgArrow.accessibilityConfig = {
                    "a11yHidden": true,
                    "a11yARIA": {
                        tabindex: -1,
  
                    }
                };
                if (imgArrow.text !== "Q") {
                    parentWidget.accessibilityConfig = {
                        //"a11yHidden" : true,
                        "a11yARIA": {
                            role: "button",
                            "aria-expanded": false,
                            "aria-labelledby": parentWidget.widgets()[1].id,
                        }
                    };
                }
  
                if (menuText === "Exchange Rates") {
                    imgArrow.accessibilityConfig = {
                        "a11yARIA": {
                            tabindex: -1,
                        }
                    };
                    parentWidget.accessibilityConfig = {
                        //"a11yHidden" : true,
                        "a11yARIA": {
                            role: "button",
                            //"aria-expanded" : false,
                            "aria-labelledby": parentWidget.widgets()[1].id,
                        }
  
                    }
                }
            } else {
                this.collapseAll(this.activeMenu);
                //if(imgArrow.src === "arrow_down.png"){
                this.activeMenu = menuText;
                imgArrow.text = "P";
                //  imgArrow.toolTip="Collapse";
                imgArrow.accessibilityConfig = {
                    "a11yHidden": true,
                    "a11yARIA": {
                        tabindex: -1,
                        //  "aria-expanded" : true,
                    }
                };
  
                parentWidget.accessibilityConfig = {
                    //"a11yHidden" : true,
                    "a11yARIA": {
                        role: "button",
                        "aria-expanded": true,
                        "aria-labelledby": parentWidget.widgets()[1].id,
                    }
                };
  
                if (menuText === "Exchange Rates") {
                    imgArrow.accessibilityConfig = {
                        "a11yARIA": {
                            tabindex: -1,
                        }
                    };
                }
                this.view.forceLayout();
                // }
                this.expand(widget);
            }
            this.view.forceLayout();
        },
  
        /**
         * Collapses the subMenu
         * @param {kony.ui.FlexContainer} widget Submenu widget to expand
         */
        expand: function(widget) {
            var scope = this;
            widget.isVisible = true;
            var animationDefinition = {
                100: {
                    "height": (widget.widgets().length - 1) * 60
                }
            };
            var animationConfiguration = {
                duration: 0.5,
                fillMode: kony.anim.FILL_MODE_FORWARDS
            };
            var callbacks = {
                animationEnd: function() {
                    // scope.checkLogoutPosition();
                    widget.widgets()[0].setFocus(true);
                    scope.view.forceLayout();
                }
            };
            var animationDef = kony.ui.createAnimation(animationDefinition);
            widget.animate(animationDef, animationConfiguration, callbacks);
        },
  
        /**
         * Collapse All the sub menu items
         */
        collapseAll: function(menuText) {
            var self = this;
            var menuItems = this.view[MENU_CONTAINER].widgets();
            menuItems.forEach(function(menuItem, i) {
                if (i % 2 !== 0) {
                    self.collapseWithoutAnimation(menuItem);
                    var imageWidget = menuItems[i - 1].widgets()[2].widgets()[0];
                    menuItems[i - 1].widgets()[2].accessibilityConfig = {
                      "a11yHidden":true,
                      "a11yARIA":{
                          "tabindex":-1
                      }
                  }
                    var parentWidget = menuItems[i - 1];
                    if (imageWidget.text !== "Q") {
                        parentWidget.accessibilityConfig = {
                            "a11yARIA": {
                                role: "button",
                                "aria-expanded": false,
                                "aria-labelledby": parentWidget.widgets()[1].id,
                            }
                        };
                    }
                    if (imageWidget.text === "P") {
                        imageWidget.text = "O";
                        if (menuText !== undefined) {
                            imageWidget.accessibilityConfig = {
                                "a11yHidden":true,
                                "a11yARIA": {
                                    tabindex: -1,
                                }
                            };
                            if (menuText === "Exchange Rates") {
  
                                imageWidget.accessibilityConfig = {
                                    "a11yHidden":true,
                                    "a11yARIA": {
                                        tabindex: -1,
                                    }
                                };
                            }
                            //imageWidget.forceLayout();
                        }
                        //                      imageWidget.accessibilityConfig = {
                        //                     "a11yLabel" :  "Expand Menu"
                        //                 };
                    }
  
                }
            })
            self.view.forceLayout();
        },
  
        /**
         * Collapse the submenu item
         * @param {kony.ui.FlexContainer} widget submenu flex to collapse
         */
        collapseWithoutAnimation: function(widget) {
            widget.height = 0;
            widget.isVisible = false;
            this.view.forceLayout();
        },
  
        /**
         * Generates View of the menu dynamically
         */
        generateMenu: function () {

            var self = this;
            let widgets = this.view[MENU_CONTAINER].widgets();
            for (let i = 2; i < widgets.length; i++) {
                this.view[MENU_CONTAINER].remove(widgets[i]);
            }
            HamburgerConfig.config.forEach(function(hamburgerItem) {
                if (!hamburgerItem.isVisible || hamburgerItem.isVisible()) {
                    var parentMenuView = self.getParentMenuItemView(hamburgerItem);
                    var subMenuView = self.getSubMenuView(hamburgerItem);
                    //Added for frame updations on Animation End 
                    subMenuView.doLayout = function(widget) {}
                    var imgArrow = parentMenuView.widgets()[2].widgets()[0];
                    var flxArrow = parentMenuView.widgets()[2];
                    if (hamburgerItem.subMenu.children.length === 0) {
                        flxArrow.isVisible = false;
                        imgArrow.isVisible = false;
                        str = kony.i18n.getCurrentLocale();
                        if (str === "ar_AE") {
                            imgArrow.text = "R";
                        } else {
                            imgArrow.text = "Q";
                        }
                        imgArrow.accessibilityConfig = {
                            "a11yHidden": true,
                            "a11yARIA": {
                                tabindex: -1,
                                // "aria-expanded" : false,
                            }
                        };
                        imgArrow.width = "11dp";
                        imgArrow.height = "12dp";
                        if (kony.application.getCurrentBreakpoint() == 640) {
                            flxArrow.left = "88%";
                            self.view.flxClose.left = "88%";
                        } else {
                            flxArrow.left = "92%";
                            self.view.flxClose.left = "92%";
                        }
                        self.view.forceLayout();
                        parentMenuView.onClick = hamburgerItem.onClick;
                    } else {
                        if (kony.application.getCurrentBreakpoint() == 640) {
                            flxArrow.left = "88%";
                            self.view.flxClose.left = "88%";
                        } else {
                            flxArrow.left = "92%";
                            self.view.flxClose.left = "92%";
                            imgArrow.text = "O";
                            imgArrow.accessibilityConfig = {
                                "a11yHidden": true,
                                "a11yARIA": {
                                    tabindex: -1,
                                }
                            };
                        }
                        if (imgArrow.text !== "Q") {
                            parentMenuView.accessibilityConfig = {
                                //"a11yHidden" : true,
                                "a11yARIA": {
                                    role: "button",
                                    "aria-expanded": false,
                                    "aria-labelledby": parentMenuView.widgets()[1].id,
                                }
                            };
                        } else {
                            parentMenuView.accessibilityConfig = {
                                //"a11yHidden" : true,
                                "a11yARIA": {
                                    role: "button",
                                    //"aria-expanded" : false,
                                    "aria-labelledby": parentMenuView.widgets()[1].id,
                                }
                            };
                        }
                        self.view.forceLayout();
                        parentMenuView.onClick = self.toggle.bind(self, subMenuView, imgArrow, parentMenuView);
                    }
                    self.view[MENU_CONTAINER].add(parentMenuView, subMenuView);
                }
  
            });
  
        },
  
        postShowHamburger: function() {
            this.setCustomHeaderLogo();
            if (!this.initialized && applicationManager.getUserPreferencesManager().isUserLoggedin()) {
                this.generateMenu();
                this.view.imgKony.onTouchEnd = this.showDashboardScreen;
                this.initialized = true;
                if (this.actiavteWhenInitialized) {
                    this.activateMenu(this.actiavteWhenInitialized.parentId, this.actiavteWhenInitialized.childId)
                    this.actiavteWhenInitialized = null;
                }
            }
            this.view.forceLayout();
        },
  
        setCustomHeaderLogo: function() {
            // var configurationManager = applicationManager.getConfigurationManager();
            // if (configurationManager.isSMEUser === "true") this.view.imgKony.src = "sbb_white.png";
            // else if (configurationManager.isRBUser === "true") {
            //     this.view.imgKony.src = "kony_logo_white.png";
            //     this.view.imgKony.width = "72dp";
            // } else if (configurationManager.isMBBUser === "true") this.view.imgKony.src = "mbb_white.png";
            // else this.view.imgKony.src = "kony_logo_white.png";
        },
        /**
         * Generates view of sub menu item
         * @param {object} subMenuItem Sub Menu Item Config
         * @param {string} id Id for prefixing
         * @param {boolean} removeSeperator Removes the seperator 
         * @returns {kony.ui.FlexContainer} Sub menu Item view
         */
        getSubMenuItemView: function(subMenuItem, id, removeSeperator) {
            var subMenuItemView = this.view[SAMPLE_SUB_MENU_ITEM].clone(id);
            subMenuItemView.widgets()[0].text = kony.i18n.getLocalizedString(subMenuItem.text);
            subMenuItemView.widgets()[0].accessibilityConfig = {
                //"a11yHidden" : true,
                "a11yARIA": {
                    "tabindex": -1
                },
            }
            i18nMap[subMenuItemView.widgets()[0].id] = subMenuItem.text;
            // subMenuItemView.widgets()[0].toolTip = kony.i18n.getLocalizedString(subMenuItem.toolTip);
            if (removeSeperator) {
                subMenuItemView.removeAt(1);
            }
            subMenuItemView.onClick = this.bindAction(subMenuItem.onClick)
            subMenuItemView.accessibilityConfig = {
                "a11yARIA": {
                    "role": "link",
                    "aria-current": false,
                }
            };
            subMenuItemView.isVisible = true;
            return subMenuItemView;
        },
  
        /**
         * Bind onclick to hamburger item
         * @param {function} originalOnclick Original OnClick from config
         * @returns {function} Composed function
         */
        bindAction: function(originalOnclick) {
            return function() {
                if (onItemSelectListener) {
                    onItemSelectListener();
                }
                originalOnclick();
            }
        },
  
        /**
         * Generates the view of sub menu
         * @param {object} hamburgerItem config of item
         * @returns {kony.ui.FlexContainer} returns the view of submenu
         */
        getSubMenuView: function(hamburgerItem) {
            var self = this;
            var subMenuView = this.view[SAMPLE_SUB_MENU].clone(this.getPrefix(hamburgerItem.id));
            hamburgerItem.subMenu.children.forEach(function(subMenuItem, index) {
                if (!subMenuItem.isVisible || subMenuItem.isVisible.call(HamburgerConfig)) {
                    var subMenuItemView = self.getSubMenuItemView(subMenuItem, self.getPrefix(hamburgerItem.id) + index, index !== hamburgerItem.subMenu.children.length - 1);
                    subMenuItemView.isVisible = true;
                    subMenuView.add(subMenuItemView);
                }
  
            })
            //Hiding Sample Sub Menu Item
            subMenuView.widgets()[0].isVisible = false;
            subMenuView.isVisible = true;
            return subMenuView;
        },
  
        /**
         * Generate View for Parent menu Item
         * @param {string} hamburgerItem Title of Parent Menu Item
         * @returns {kony.ui.FlexContainer} Returns the flex container object
         */
        getParentMenuItemView: function(hamburgerItem) {
            var configurationManager = applicationManager.getConfigurationManager();
            var parentMenuFlex = this.view[SAMPLE_MENU].clone(this.getPrefix(hamburgerItem.id));
            var childWidgets = parentMenuFlex.widgets();
            if (typeof hamburgerItem.icon === "function") {
                childWidgets[0].text = hamburgerItem.icon();
            } else {
                childWidgets[0].text = hamburgerItem.icon;
            }
            if (hamburgerItem.iconSkin) {
                childWidgets[0].skin = (typeof hamburgerItem.iconSkin === "function") ? hamburgerItem.iconSkin() : hamburgerItem.iconSkin;
            }
            if (typeof hamburgerItem.text === "function") {
                childWidgets[1].text = kony.i18n.getLocalizedString(hamburgerItem.text());
                childWidgets[1].accessibilityConfig = {
                    //"a11yLabel" : kony.i18n.getLocalizedString("i18n.hamburger.viewOptions") + " " + kony.i18n.getLocalizedString(hamburgerItem.text()) + " " + kony.i18n.getLocalizedString("i18n.hamburger.Menu"),
                    "a11yARIA": {
                        "tabindex": -1,
                    },
                }
                childWidgets[0].accessibilityConfig = {
                    "a11yHidden": true,
                    "a11yARIA": {
                        "tabindex": -1,
                    },
                };
                i18nMap[childWidgets[1].id] = hamburgerItem.text();
            } else {
                childWidgets[1].text = kony.i18n.getLocalizedString(hamburgerItem.text);
                childWidgets[1].accessibilityConfig = {
                    //  "a11yLabel" : kony.i18n.getLocalizedString("i18n.hamburger.viewOptions") + " " + kony.i18n.getLocalizedString(hamburgerItem.text) + " " + kony.i18n.getLocalizedString("i18n.hamburger.Menu"),
                    "a11yARIA": {
                        "tabindex": -1,
                    },
                }
                childWidgets[0].accessibilityConfig = {
                    "a11yHidden": true,
                    "a11yARIA": {
                        "tabindex": -1,
                    },
                };
                i18nMap[childWidgets[1].id] = hamburgerItem.text;
            }
            // if (typeof hamburgerItem.toolTip === "function") {
            //   childWidgets[1].toolTip = kony.i18n.getLocalizedString(hamburgerItem.toolTip());
            //   childWidgets[0].toolTip = kony.i18n.getLocalizedString(hamburgerItem.toolTip());
            // }
            // else {
            //   childWidgets[1].toolTip = kony.i18n.getLocalizedString(hamburgerItem.toolTip);
            //   childWidgets[0].toolTip = kony.i18n.getLocalizedString(hamburgerItem.toolTip);
  
            // }
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                childWidgets[3].left = "0%";
                childWidgets[3].width = "100%";
            }
            if (hamburgerItem.id == "TRANSFERS") {
                childWidgets[0].skin = "sknLblFontType0273E330px";
            }
            if (hamburgerItem.id == "About Us") {
                childWidgets[0].skin = "sknLblFontType0273E320px";
            }
            if (hamburgerItem.id == "TradeFinance") {
                childWidgets[0].skin = "sknLblFontTypeTradeFinance";
            }
            if (hamburgerItem.id == "SmartBankingAdvisory") {
                childWidgets[0].skin = "sknLblFontType0273E326px";
            }
            parentMenuFlex.isVisible = true;
            return parentMenuFlex;
        },
  
        /**
         * Preshow of Hamburger Component
         */
        preShow: function() {
            this.view.imgKony.accessibilityConfig = {
                "a11yLabel":"Infinity Digital Banking",
                "a11yARIA": {
                    "tabindex": -1
                }
            }
            this.view.flxAccountsCollapse.accessibilityConfig = {
                // "a11yLabel": "collapse",
                "a11yARIA": {
                    "tabindex": -1,
                }
            }
            this.view.lblCollapseAccounts.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1,
                }
            }
            this.view.imgCollapseAccounts.accessibilityConfig = {
                "a11yLabel": "collapse",
                "a11yARIA": {
                    "tabindex": -1,
                }
            }
            this.view.flxAccountsMenu.accessibilityConfig = {
                "a11yARIA": {
                    "role": "button"
                }
            }
            /*this.view.imgLogout.accessibilityConfig={
              "a11yLabel": "logout icon",
              "a11yARIA": {
                "tabindex" : -1,
              }
            }*/
            /*this.view.lbfonticonlLogout.accessibilityConfig={
              "a11yLabel": "logout icon",
              "a11yARIA": {
                "tabindex" : -1,
              }
            }*/
            /* this.view.lblLogout.accessibilityConfig={
               "a11yLabel": "logout",
               "a11yARIA": {
                 "tabindex" : -1,
               }
             }*/
             this.view.lblLegalEntityDropdownIconHamburger.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                  "tabindex": -1
                },
              }
              this.view.flxLegalEntityDropdownHamburger.accessibilityConfig={
                a11yLabel : this.view.lblLegalEntityHamburger.text + " " + this.view.lblLegalEntityTextHamburger.text,
                a11yARIA:{
                "role": "button",
                "aria-expanded":false,
                "tabindex":0
                }
                }
                this.view.flxSegLegalEntityHamburger.accessibilityConfig={
                  a11yARIA : {
                    "aria-live" : "off",
                    "tabindex":-1
                  }
                }
        },
        initHamburger: function() {
  
        },
  
        showDashboardScreen: function() {
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
            accountsModule.presentationController.showAccountsDashboard();
        },
        /**
         * For Change Language Support
         */
        forceInitializeHamburger: function() {
            this.generateMenu();
            this.initialized = true;
        },
        updateTextsHamburger: function() {
            this.updatesTextsHamburgerHelper(this.view[MENU_CONTAINER].widgets());
        },
  
        updatesTextsHamburgerHelper: function(widgets) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i] instanceof kony.ui.Label) {
                    if (i18nMap[widgets[i].id]) {
                        widgets[i].text = kony.i18n.getLocalizedString(i18nMap[widgets[i].id]);
                    }
                } else if (widgets[i] instanceof kony.ui.FlexContainer || widgets[i] instanceof kony.ui.FlexScrollContainer) {
                    this.updatesTextsHamburgerHelper(widgets[i].widgets());
                }
            }
        }
    }
  })