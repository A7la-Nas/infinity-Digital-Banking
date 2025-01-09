define(['./Inherits', './NativeController', './KonyLogger'], function(Inherits, NativeController, konyLogger) {
    var konymp = konymp || {};
    konymp.logger = (new konyLogger("Youtube Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    /**
     * @function
     *
     * @param componentInstance 
     */
    var NativeControllerThinclient = function(componentInstance) {
        this.componentInstance = componentInstance;
        NativeController.call(this, componentInstance);
    };
    Inherits(NativeControllerThinclient, NativeController);
    return NativeControllerThinclient;
});