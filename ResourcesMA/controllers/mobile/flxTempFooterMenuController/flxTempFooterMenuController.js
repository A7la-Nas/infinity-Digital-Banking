define({
    /**
     * @api: setAppLevelProperty
     * Pass the required context from parentwidget to Component
     * @Param {Object} componentContextData, Object contains information about footer Menu Items
     * @return: NA
     */
    setAppLevelProperty: function (componentContextData) {
      var scope = this;
      if(kony.os.deviceInfo().name === "android") {
        scope.view.skin = componentContextData.skin;
      }
      var footerMenuUtility = require('FooterMenuUtility');
      scope.footerMenuUtility = footerMenuUtility.getFooterMenuUtilityInstance();
      scope.bindActions();
      //sets the context data for Footer Menu Component.
      scope.view.FooterMenu.setContext(componentContextData.footerMenuData);
    },

    /**
     * @api: bindActions
     * Binds the action for all exposed events from component level
     * @return: NA
     */
    bindActions: function () {
      var scope = this;
      //gets triggered when any exception occurs in Footer Menu Component.
      scope.view.FooterMenu.onError = function (errorObject) {
        scope.footerMenuUtility.handleFooterMenuError(errorObject);
      };
      //gets triggered on Selection of Footer Menu item.
      scope.view.FooterMenu.handleCallToAction = function (selectedMenuItem) {
        scope.footerMenuUtility.handleFooterMenuNavigation(selectedMenuItem);
      };
    }
});