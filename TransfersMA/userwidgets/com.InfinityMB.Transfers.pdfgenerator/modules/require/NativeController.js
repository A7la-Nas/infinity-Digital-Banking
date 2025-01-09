define(["./KonyLogger"], function(konyLogger) {
    var konymp = konymp || {};
    konymp.logger = (new konyLogger("Youtube Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    var NativeController = function(componentInstance) {
        this.componentInstance = componentInstance;
    };
    return NativeController;
});