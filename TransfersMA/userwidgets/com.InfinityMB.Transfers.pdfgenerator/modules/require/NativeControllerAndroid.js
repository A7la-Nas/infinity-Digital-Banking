define(['./Inherits', './NativeController', './KonyLogger'], function(Inherits, NativeController, konyLogger) {
  var konymp = konymp || {};
  konymp.logger = (new konyLogger("PDF Generator Component")) || function() {};
  konymp.logger.setLogLevel("DEBUG");
  konymp.logger.enableServerLogging = true;
  var NativeControllerAndroid = function(componentInstance) {
    this.componentInstance = componentInstance;
    NativeController.call(this, componentInstance);
  };

  Inherits(NativeControllerAndroid, NativeController);
  NativeControllerAndroid.prototype.createFile = function(base64data,filename) {
    var uri = kony.convertToRawBytes(base64data.replace(/^data:application\/pdf;filename=generated.pdf;base64,/, ""));
    var path = "/storage/emulated/0/Download";
    kony.print("raw bytes "+uri);
    function permissionAlertHandler(resp) {
      konymp.logger.trace("--------in permission alert handler---------");
      if (resp)
        kony.application.openApplicationSettings();
    }

    function permissionStatusCallback(response) {

      if (response.status == kony.application.PERMISSION_GRANTED) {
//         var share = require("com/konymp/"+"socialshare"+"/NativeController");
//         var base64raw = base64data.replace(/^data:application\/pdf;filename=generated.pdf;base64,/, "");
//         var fileName = filename + ".pdf";
        var myFileLoc = path + "/"+filename+".pdf";
        var myFileName = new kony.io.File(myFileLoc).createFile();
        try {
//           konymp.logger.trace("file shared firstperm");
//           share.shareWithBase64(base64raw, fileName);
          konymp.logger.trace("file shared perm");
             var writing = new kony.io.File(myFileLoc).write(uri);
             if (writing) {
                konymp.logger.trace("--------file saved");
             } else {
                konymp.logger.trace("file not saved");
             }
        } catch (err) {
          konymp.logger.trace("--------exception " + err);
        }
      } else if (response.status === kony.application.PERMISSION_DENIED) {
        konymp.logger.trace("--------permission denied " + err);
      }
    }
    var options = {
      isAccessModeAlways: true
    };
    var result = kony.application.checkPermission(kony.os.RESOURCE_EXTERNAL_STORAGE, options);
    if (result.status == kony.application.PERMISSION_DENIED) {
      //Indicates permission denied
      if (result.canRequestPermission) {
        kony.application.requestPermission(kony.os.RESOURCE_EXTERNAL_STORAGE, permissionStatusCallback);
      } else {
        konymp.logger.trace("--------cant request permission " + err);
      }
    } else if (result.status == kony.application.PERMISSION_GRANTED) {
//       var share = require("com/konymp/"+"socialshare"+"/NativeController");
//       var base64raw = base64data.replace(/^data:application\/pdf;filename=generated.pdf;base64,/, "");
//       var fileName = filename + ".pdf";
      var myFileLoc = path + "/"+filename+".pdf";
      var myFileName = new kony.io.File(myFileLoc).createFile();
      try {
//         share.shareWithBase64(base64raw, fileName);
//         konymp.logger.trace("file shared");
        var writing = new kony.io.File(myFileLoc).write(uri);
        if (writing) {
           konymp.logger.trace("file saved");
        } else {
        konymp.logger.trace("file not saved");
        }
      } catch (err) {
        konymp.logger.trace("--------exception " + err);
      }
    } else if (result.status == kony.application.PERMISSION_RESTRICTED) {
      konymp.logger.trace("------------Resource Aceess Restricted for User");
    }


  };
  return NativeControllerAndroid;
});