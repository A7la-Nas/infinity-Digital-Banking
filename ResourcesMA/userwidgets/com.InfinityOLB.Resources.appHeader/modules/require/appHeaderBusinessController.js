define(function () {
	function BusinessController(compViewCtrlScope) {
		this.store = {};
		this.configurationManager = null;
		this.compViewCtrlScope = compViewCtrlScope;
		this.contextKey = "";
	}

	/**
	 * Sets the key globally into which data can be stored in collection
	 * @param {String} contextKey - Key into whcih data to be stored into collection
	 */
	BusinessController.prototype.setContextKey = function (contextKey) {
		var scope = this;
		try {
			scope.contextKey = contextKey;
		} catch (err) {
			scope.setError(err, "setContextKey");
		}
	};

	/**
	 * Sets the context data in collection
	 * @param {Object} collectionData - Data to be set in collection
	 */
	BusinessController.prototype.setDataInCollection = function (dataToBeStored) {
		var scope = this;
		try {
			this.store.dispatch(
				{
					type: "UPDATE_COLLECTION",
					data: dataToBeStored,
					key: scope.contextKey,
				},
				this.compViewCtrlScope
			);
		} catch (err) {
			scope.setError(err, "setDataInCollection");
		}
	};

	/**
	 * returns actual data which has to be set to UI
	 * @param {Object} linkData - link data
	 */
	BusinessController.prototype.getLinkData = function (linkData) {
		var scope = this;
		var updatedLinkData = {};
		try {
			updatedLinkData.breakpointsList = linkData.breakpoints;
			updatedLinkData.isVisible = this.checkVisibility(linkData);
			updatedLinkData.image = linkData.image;
			updatedLinkData.fontIcon = this.convertTokensInDataMapping(linkData.fontIcon);
			updatedLinkData.fontIconSkin = linkData.fontIconSkin;
			updatedLinkData.title = this.convertTokensInDataMapping(linkData.title);
			if (linkData.id !== null && linkData.id !== undefined) {
				updatedLinkData.id = linkData.id;
			}
			if (linkData.isActive !== null && linkData.isActive !== undefined) {
				updatedLinkData.isActive = linkData.isActive;
			}
			if (linkData.toolTip) {
				updatedLinkData.toolTip = this.convertTokensInDataMapping(linkData.toolTip);
			} else {
				updatedLinkData.toolTip = this.convertTokensInDataMapping(linkData.title);
			}
			updatedLinkData.accessibilityConfig = {};
			if (linkData.accessibilityConfig&&linkData.accessibilityConfig.a11yLabel) {
				updatedLinkData.accessibilityConfig.a11yLabel =this.convertTokensInDataMapping(linkData.accessibilityConfig.a11yLabel);
			} else {
				//updatedLinkData.accessibilityConfig.a11yLabel = this.convertTokensInDataMapping(linkData.title);
			}
            if (linkData.accessibilityConfig && linkData.accessibilityConfig.a11yARIA) {
				updatedLinkData.accessibilityConfig.a11yARIA = linkData.accessibilityConfig.a11yARIA;
			}
            if (linkData.accessibilityConfig && linkData.accessibilityConfig.a11yHidden) {
				updatedLinkData.accessibilityConfig.a11yHidden = linkData.accessibilityConfig.a11yHidden;
			}
			if(linkData.onClick){
				updatedLinkData.onClick = linkData.onClick;
			}
			if (linkData.callToAction) {
				updatedLinkData.onClick = this.getLinkClick.bind(this, linkData);
				
			} else if (linkData.subMenu !== undefined && linkData.subMenu.length > 0) {
				updatedLinkData.subMenu = [];
				for (let i = 0; i < linkData.subMenu.length; i++) {
					const subMenuData = linkData.subMenu[i];
					updatedLinkData.subMenu.push(this.getLinkData(subMenuData));
				}
				if (updatedLinkData.subMenu.length===0) {
					updatedLinkData.isVisible = false;
				}
			}
			return updatedLinkData;
		} catch (err) {
			scope.setError(err, "getLinkData");
		}
	};

	/**
	 * checks if the link should be visible in the UI
	 * @param {object} linkData - Data of the link
	 * @returns {bool} link's visibility
	 */
	 BusinessController.prototype.checkVisibility = function (linkData) {
        var scope = this;
        try {
            currBreakpoint = kony.application.getCurrentBreakpoint();
			if(currBreakpoint > 1380) {
                currBreakpoint = 1380;
            }
            if (
                linkData.breakpoints !== undefined &&
                linkData.breakpoints.length > 0 &&
                linkData !== null &&
                linkData.breakpoints.indexOf(currBreakpoint) === -1
            ) {
                return false;
            }
            if (linkData.featureAndPermissions && linkData.featureAndPermissions.length > 0) {
                let isLinkVisible = false;
                 if(linkData.id==="PFM"){
                    for (let i = 0; i < linkData.userType.length; i++) {
                        if (this.configurationManager[linkData.userType[i]]==="true") {
                            isLinkVisible = true;
                            break;
                        }
                    }
                }
                for (let i = 0; i < linkData.featureAndPermissions.length; i++) {
                    let areAllReqPermPresent = true;
                    let isAtLeastOneReqPermPresent = true;
                    let isAtLeastOneFeatPresent = true;
                    const featAndPerm = linkData.featureAndPermissions[i];
                    if (
                        featAndPerm.allReqPermissions !== null &&
                        featAndPerm.allReqPermissions !== undefined &&
                        featAndPerm.allReqPermissions.length !== 0
                    ) {
                        areAllReqPermPresent = this.checkAllPermissions(featAndPerm.allReqPermissions);
                    }
                    if (
                        featAndPerm.atLeastOneReqPermissions !== null &&
                        featAndPerm.atLeastOneReqPermissions !== undefined &&
                        featAndPerm.atLeastOneReqPermissions.length !== 0
                    ) {
                        isAtLeastOneReqPermPresent = this.checkAtLeastOnePermission(featAndPerm.atLeastOneReqPermissions);
                    }
                    if (
                        featAndPerm.atLeastOneFeature !== null &&
                        featAndPerm.atLeastOneFeature !== undefined &&
                        featAndPerm.atLeastOneFeature.length !== 0
                    ) {
                        isAtLeastOneFeatPresent = this.checkAtLeastOneFeaturePresent(featAndPerm.atLeastOneFeature);
                    }
                    if (areAllReqPermPresent && isAtLeastOneReqPermPresent && isAtLeastOneFeatPresent) {
                        isLinkVisible = true;
                        break;
                    }
                }
                if (!isLinkVisible) {
                    return false;
                }
            }
            if (linkData.visibleInMAs !== undefined && linkData.visibleInMAs.length > 0) {
                let isLinkVisible = false;
                for (let i = 0; i < linkData.visibleInMAs.length; i++) {
                    if (this.configurationManager.isMicroAppPresent(this.configurationManager.microappConstants[linkData.visibleInMAs[i]])) {
                        isLinkVisible = true;
                    }
                }
                if (!isLinkVisible) {
                    return false;
                }
            }
            if (linkData.userType !== undefined && linkData.userType !== null && linkData.userType.length > 0) {
                let isLinkVisible = false;
                for (let i = 0; i < linkData.userType.length; i++) {
                    if (this.configurationManager[linkData.userType[i]]) {
                        isLinkVisible = true;
                        break;
                    }
                }
                if (!isLinkVisible) {
                    return false;
                }
            }
			  if (linkData.configurationType !== undefined && linkData.configurationType !== null && linkData.configurationType.length > 0) {
                let isLinkVisible = false;
                for (let i = 0; i < linkData.configurationType.length; i++) {
                    if (this.configurationManager.getConfigurationValue([linkData.configurationType[i]])) {
                        isLinkVisible = true;
                        break;
                    }
                }
                if (!isLinkVisible) {
                    return false;
                }
            }
            return true;
        } catch (err) {
            scope.setError(err, "checkVisibility");
        }
    };

	/**
	 * navigates to form
	 * @param {String} callToAction - Data from link
	 */
	BusinessController.prototype.getLinkClick = function (linkData) {
		var scope = this;
        var callToAction = linkData.callToAction;
		try {
			if (callToAction.presentationControllerMethod !== undefined && callToAction.presentationControllerMethod !== null) {
				var uiModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
					moduleName: callToAction.moduleName,
					appName: callToAction.microApp,
				});
              if(Array.isArray(callToAction.params)){
                uiModule.presentationController[callToAction.presentationControllerMethod].apply(this,callToAction.params);
              }
              else{
                uiModule.presentationController[callToAction.presentationControllerMethod](callToAction.params);
              }
			} else {
				var navMan = applicationManager.getNavigationManager();
				navMan.navigateTo(
					{
						appName: callToAction.microApp,
						friendlyName: callToAction.form,
					},
					false,
					callToAction.params
				);
			}
		} catch (err) {
			scope.setError(err, "getLinkClick");
		}
	};

	/**
	 * Processes the tokens in data mapping to text
	 * @param {String} fieldMapping - Data from collection
	 * @returns {String} Text to be displayed
	 */
	BusinessController.prototype.convertTokensInDataMapping = function (fieldMapping) {
		var scope = this;
		try {
			if (typeof fieldMapping === "string") {
				if (fieldMapping.indexOf("${i18n") !== -1) {
					return this.geti18nText(fieldMapping);
				} else {
					return fieldMapping;
				}
			}
		} catch (err) {
			scope.setError(err, "convertTokensInDataMapping");
		}
	};

	/**
	 * Gets the value mapped to corresponding i18n key
	 * @param {String} token - Token to be converted to a text
	 * @returns {String} Key associated to corresponding i18n key
	 */
	BusinessController.prototype.geti18nText = function (token) {
		var scope = this;
		try {
			let i18ntext = token.substring(token.indexOf("${i18n") + 7, token.length - 2);
			return kony.i18n.getLocalizedString(i18ntext);
		} catch (err) {
			scope.setError(err, "geti18nText");
		}
	};

	BusinessController.prototype.checkUserFeature = function (feature) {
		return this.configurationManager.checkUserFeature(feature);
	};

	BusinessController.prototype.checkAtLeastOneFeaturePresent = function (features) {
		return features.some(this.checkUserFeature.bind(this));
	};

	BusinessController.prototype.checkUserPermission = function (permission) {
		return this.configurationManager.checkUserPermission(permission);
	};

	BusinessController.prototype.checkAtLeastOnePermission = function (permissions) {
		return permissions.some(this.checkUserPermission.bind(this));
	};

	BusinessController.prototype.checkAllPermissions = function (permissions) {
		return permissions.every(this.checkUserPermission.bind(this));
	};

	/**
	 * Gets trigerred when any exception occurs in any method in business controller
	 * @param errorMsg {String} - error message
	 * @param method {String} - method from which error message is received
	 */
	BusinessController.prototype.setError = function (errorMsg, method) {
		let errorObj = {
			level: "ComponentBusinessController",
			method: method,
			error: errorMsg,
		};
		this.compViewCtrlScope.onError(errorObj);
	};

	return BusinessController;
});
