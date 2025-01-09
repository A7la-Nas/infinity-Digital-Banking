define(['./Inherits', './NativeController', './KonyLogger'], function(Inherits, NativeController, konyLogger) {
    var konymp = konymp || {};
    konymp.logger = (new konyLogger("Youtube Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    var NativeControllerIOS = function(componentInstance) {
        this.componentInstance = componentInstance;
        NativeController.call(this, componentInstance);
    };
    Inherits(NativeControllerIOS, NativeController);
    NativeControllerIOS.prototype.createFile = function(base64data,filename) {
        var uri = kony.convertToRawBytes(base64data.replace(/^data:application\/pdf;base64,/, ""));
        var path = kony.io.FileSystem.getDatabaseDirectoryPath();
        var myFileLoc = path + "/"+filename+".pdf";
        var myFileName = new kony.io.File(myFileLoc).createFile();
        try {
            var writing = new kony.io.File(myFileLoc).write(uri);
            if (writing) {
                konymp.logger.trace("file saved");
            } else {
                konymp.logger.trace("file not saved");
            }
        } catch (err) {
            konymp.logger.trace("exception " + err);
        }
    };
    return NativeControllerIOS;
});