define(function () {
    return {
        constructor: function (baseConfig, layoutConfig, pspConfig) {
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.flxWarningCard.doLayout = this.alignCard;
            this.view.doLayout = this.alignCard;
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function () { },
        alignCard: function () {
            let cardHeight = this.view.flxWarningCard.frame.height;
            let screenHeight = kony.os.deviceInfo().screenHeight;
            let cardTop = screenHeight / 2 - cardHeight / 2;
            if(screenHeight < cardHeight) {
                cardTop = 20;
            }
            this.view.flxWarningCard.top = cardTop + "px";
        },
        onBreakpointChange: function (eventobject, breakpoint) {
            if (breakpoint === 640) {
                this.view.isVisible = true;
            } else {
                this.view.isVisible = false;
            }
        },
    };
});
