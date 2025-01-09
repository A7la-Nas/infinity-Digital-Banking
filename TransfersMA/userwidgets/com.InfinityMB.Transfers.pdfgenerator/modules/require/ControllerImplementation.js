define(function() {
    var ControllerImplementation = function(componentInstance, componentName) {
        this.componentInstance = componentInstance;
        this.componentName = componentName;
        this.getNativeController = function() {
            if (this.nativeControllerInstance === undefined) {
                var deviceInfo = kony.os.deviceInfo();
                var platformName = null;
                if (deviceInfo.name.toLowerCase() === 'iphone' || deviceInfo.name.toLowerCase() === 'ipad') {
                    platformName = 'IOS';
                } else if (deviceInfo.name.toLowerCase() === 'android') {
                    platformName = 'Android';
                } else {
                    platformName = deviceInfo.name.charAt(0).toUpperCase() + deviceInfo.name.slice(1);
                }
                var nativeControllerPath = 'com/InfinityMB/Transfers/pdfgenerator' + '/NativeController' + platformName;
                var nativeController = require(nativeControllerPath);
                this.nativeControllerInstance = new nativeController(componentInstance);
            }
            return this.nativeControllerInstance;
        };
        /**
         * @function
         *
         */
        this.createFile = function(base64data,filename) {
            this.getNativeController().createFile(base64data,filename);
        };
    };
    return ControllerImplementation;
});