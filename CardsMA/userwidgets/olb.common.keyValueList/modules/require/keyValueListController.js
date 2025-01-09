define(['CommonUtilities', 'FormControllerUtility', 'ViewConstants'], function() {

    var responsiveUtils = new ResponsiveUtils();

    return {
        inputJsonData: null,
        setData: function(jsonData) {
            this.inputJsonData = jsonData;

            var keys = Object.keys(jsonData);
            var values = Object.values(jsonData);

            var widgets = this.view.widgets();

            var i = 0;
            for (i = 0; i < keys.length; i++) {
                widgets[i].widgets()[0].text = kony.i18n.getLocalizedString(keys[i]);
                widgets[i].widgets()[0].accessibilityConfig = {
                    "a11yLabel": kony.i18n.getLocalizedString(keys[i])
                };

                widgets[i].widgets()[2].text = values[i];
                widgets[i].widgets()[2].accessibilityConfig = {
                    "a11yLabel": values[i]
                };
            }

            for (i ; i < widgets.length; i++) {
                widgets[i].setVisibility(false);
            }
        },
        getData: function() {
            return this.inputJsonData;
        },
        onBreakpointChange: function() {
            var widgets = this.view.widgets();
            if (responsiveUtils.isMobile) {
                widgets.forEach(function(node) {
                    node.layoutType=kony.flex.FREE_FORM;
                    node.widgets()[1].setVisibility(false);
                    node.widgets()[2].left="0%";
                })
            } else {
                widgets.forEach(function(node) {
                    node.layoutType=kony.flex.FLOW_HORIZONTAL;
                    node.widgets()[1].setVisibility(true);
                    node.widgets()[2].left="2.5%";
                })
            }
        }
    };
});