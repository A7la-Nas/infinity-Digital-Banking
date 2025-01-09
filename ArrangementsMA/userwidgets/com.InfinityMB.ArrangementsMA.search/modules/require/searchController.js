define(['./ParserUtilsManager'], function(ParserUtilsManager) {

    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            // Skin Properties.
            this._searchTxtBoxSkin = "";
            this._btnCancelSkin = "";
            this._flxBgSkin = "";
            this._flxShadowSkin = "";

            // General Properties.
            this._searchPlaceholder = "";

            // Icons Properties.
            this._searchIcon = "";
            this._advancedFilterIcon = "";

            // Icons Visibility Properties.
            this._isFilterIconVisible = "";
            this._isSearchIconVisible = "";

            // Context Setting Properties.
            this.context = {};
            this.searchTextBackup = {};
            this.accountType = "";
            this.accountID = "";
            this._accountTypeFromContext;
            this._accountIDFromContext;
            this.parserUtilsManager = new ParserUtilsManager();
        },

        // Logic for getters/setters of custom properties.
        initGettersSetters: function() {
            // General Getters and Setters.  
            defineSetter(this, "searchPlaceholder", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._searchPlaceholder = val;
                }
            });
            defineGetter(this, "searchPlaceholder", function() {
                return this._searchPlaceholder;
            });

            // Icons Getters and Setters.
            defineSetter(this, "searchIcon", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._searchIcon = val;
                }
            });
            defineGetter(this, "searchIcon", function() {
                return this._searchIcon;
            });

            defineSetter(this, "advancedFilterIcon", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._advancedFilterIcon = val;
                }
            });
            defineGetter(this, "advancedFilterIcon", function() {
                return this._advancedFilterIcon;
            });

            // Skins Getters and Setters.
            defineSetter(this, "searchTxtBoxSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._searchTxtBoxSkin = val;
                }
            });
            defineGetter(this, "searchTxtBoxSkin", function() {
                return this._searchTxtBoxSkin;
            });

            defineSetter(this, "btnCancelSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._btnCancelSkin = val;
                }
            });
            defineGetter(this, "btnCancelSkin", function() {
                return this._btnCancelSkin;
            });

            defineSetter(this, "flxBgSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._flxBgSkin = val;
                }
            });
            defineGetter(this, "flxBgSkin", function() {
                return this._flxBgSkin;
            });

            defineSetter(this, "flxShadowSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._flxShadowSkin = val;
                }
            });
            defineGetter(this, "flxShadowSkin", function() {
                return this._flxShadowSkin;
            });

            // Icons Visibility Getters and Setters.
            defineSetter(this, "isFilterIconVisible", function(val) {
                if ((typeof val === 'boolean') && (val !== "")) {
                    this._isFilterIconVisible = val;
                }
            });
            defineGetter(this, "isFilterIconVisible", function() {
                return this._isFilterIconVisible;
            });

            defineSetter(this, "isSearchIconVisible", function(val) {
                if ((typeof val === 'boolean') && (val !== "")) {
                    this._isSearchIconVisible = val;
                }
            });
            defineGetter(this, "isSearchIconVisible", function() {
                return this._isSearchIconVisible;
            });

            // Context Setting Getters and Setters.
            defineSetter(this, "accountTypeFromContext", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._accountTypeFromContext = val;
                }
            });
            defineGetter(this, "accountTypeFromContext", function() {
                return this._accountTypeFromContext;
            });

            defineSetter(this, "accountIDFromContext", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._accountIDFromContext = val;
                }
            });
            defineGetter(this, "accountIDFromContext", function() {
                return this._accountIDFromContext;
            });
        },

        /**
         * Component setContext.
         * To collect the context object required for the component.
         * @param: context{JSONobject} - account object.
         */
        setContext: function(context) {
            this.context = context;
            this.parserUtilsManager.setContext(this.context);
            this.setAccountTypeFromContext();
            this.setAccountIDFromContext();
        },

        /**
         * Component setAccountTypeFromContext.
         * To set account type from the context object.
         */
        setAccountTypeFromContext: function() {
            this.accountType = this.parserUtilsManager.getParsedValue(this._accountTypeFromContext);
        },

        /**
         * Component setAccountIDFromContext.
         * To set account id from the context object.
         */
        setAccountIDFromContext: function() {
            this.accountID = this.parserUtilsManager.getParsedValue(this._accountIDFromContext);
        },

        /**
         * Component preShow.
         * Reponsible to invoke the functions needed to be load before form loading.
         */
        searchPreShow: function() {
            try {
                var previousFormName = (kony.application.getPreviousForm());
                this.view.tbxSearch.setFocus(false);
                this.view.tbxSearchBox.text = "";
                this.view.tbxSearch.text = "";
                this.view.flxSearchWithCancel.setVisibility(false);
                this.setCustomProperties();
                this.view.tbxSearch.onTouchEnd = this.showSearchFlex;
                this.view.btnCancel.onClick = this.onCancelBtnClick;
                this.view.imgAdvancedSearchIcon.onTouchStart = this.onFilterIconClick;
                if (previousFormName.id === "frmAccountTransactionDetails" || previousFormName.id === "frmLoanTransactionDetails") {
                    if (this.searchTextBackup.searchKey !== "" && this.searchTextBackup.searchKey !== undefined) {
                        this.showSearchFlex();
                        this.view.tbxSearchBox.text = this.searchTextBackup.searchKey;
                    } else {
                        this.onCancelBtnClick();
                    }

                } else {
                    this.onCancelBtnClick();
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in preshow method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component setCustomProperties.
         * Reponsible to retain the data for custom properties for multiple entries into the component.
         */
        setCustomProperties: function() {
            try {
                this.setLabelTexts();
                this.setSkins();
                this.setFlexVisibilities();
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setCustomProperties method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component setLabelTexts.
         * Reponsible to handle the dynamic text allocations for widgets.
         */
        setLabelTexts: function() {
            try {
                var tbxPlaceholder = kony.i18n.getLocalizedString(this._searchPlaceholder);
                this.view.tbxSearch.placeholder = tbxPlaceholder;
                this.view.tbxSearchBox.placeholder = tbxPlaceholder;
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setLabelTexts method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component setSkins.
         * Reponsible to handle the dynamic skin allocations for widgets.
         */
        setSkins: function() {
            try {
                this.view.flxSearch.skin = this._flxBgSkin;
                this.view.flxSearchShadow.skin = this._flxShadowSkin;
                this.view.flxShadow.skin = this._flxShadowSkin;
                this.view.tbxSearch.skin = this._searchTxtBoxSkin;
                this.view.tbxSearchBox.skin = this._searchTxtBoxSkin;
                this.view.btnCancel.skin = this._btnCancelSkin;
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setSkins method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component setFlexVisibilities.
         * Reponsible to handle the visibilities of widgets.
         */
        setFlexVisibilities: function() {
            try {
                if (this._isFilterIconVisible === true) {
                    this.view.imgAdvancedSearchIcon.src = this._advancedFilterIcon;
                    this.view.imgAdvancedSearchIcon.setVisibility(true);
                } else
                    this.view.imgAdvancedSearchIcon.setVisibility(false);
                if (this._isSearchIconVisible === true) {
                    this.view.imgSearch.src = this._searchIcon;
                    this.view.imgSearchIcon.src = this._searchIcon;
                    this.view.imgSearchIcon.setVisibility(true);
                    this.view.imgSearch.setVisibility(true);
                } else {
                    this.view.imgSearchIcon.setVisibility(false);
                    this.view.imgSearch.setVisibility(false);
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setFlexVisibilities method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component showSearchFlex.
         * Reponsible to handle the visibility and functions of search box.
         */
        showSearchFlex: function() {
            var scope = this;
            try {
                scope.view.flxSearchWithAdvancedFilter.setVisibility(false);
                scope.view.flxSearchWithCancel.setVisibility(true);
                scope.view.forceLayout();
                kony.timer.schedule("timerId", function() {
                    scope.view.tbxSearchBox.setFocus(true);
                }, 0.1, false);
                this.view.tbxSearchBox.onDone = this.onSearchText;
                this.view.imgSearchIcon.onTouchEnd = this.onSearchText;
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in showSearchFlex method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component onSearchText.
         * Event triggered to send the search text along with user details to the specific form.
         */
        onSearchText: function() {
            var searchText = this.view.tbxSearchBox.text;
            this.searchTextBackup["searchKey"] = this.view.tbxSearchBox.text;
            var bindData = {
                "accountID": this.accountID,
                "accountType": this.accountType,
                "searchValue": searchText
            };
            try {
                if (searchText !== "") {
                    this.onSearchClick(bindData);
                }

            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in onSearchText method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component onCancelBtnClick.
         * Responsible to handle the visibility of cancel button and the search flex.
         */
        onCancelBtnClick: function() {
            try {
                this.view.tbxSearchBox.text = "";
                this.view.flxSearchWithCancel.setVisibility(false);
                this.view.flxSearchWithAdvancedFilter.setVisibility(true);
                if (this.searchTextBackup.searchKey !== undefined) {
                    this.searchTextBackup["searchKey"] = "";
                }
                this.onCancelClick();
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in onCancelBtnClick method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component onFilterIconClick.
         * Even triggered to navigate to the form specified.
         */
        onFilterIconClick: function() {
            try {
                this.onFilterClick(this.context);
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in onFilterIconClick method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },
    };
});