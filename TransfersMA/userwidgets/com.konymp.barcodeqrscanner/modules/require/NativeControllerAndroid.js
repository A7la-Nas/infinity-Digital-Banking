define(['./Inherits', './NativeController', './KonyLogger'], function(Inherits, NativeController, konyLoggerModule) {
    var konymp = konymp || {};
    konymp.logger = new konyLoggerModule("NativeControllerAndroid");
    var NativeControllerAndroid = function(componentInstance) {
        konymp.logger.trace("-- Start constructor NativeControllerAndroid --", konymp.logger.FUNCTION_ENTRY);
        var self = this;
        this.componentInstance = componentInstance;
        this.KonyMain = java.import("com.konylabs.android.KonyMain");
        this.konyContext = this.KonyMain.getActivityContext();
		this.fragment=java.import("androidx.fragment.app.Fragment");
		this.BarcodeCapture = java.import("dev.daryl.mlkitbarcodescanner.Fragment1");
        this.barcodeCaptureObject = new this.BarcodeCapture();
        this.layoutView = java.import("android.widget.LinearLayout");
        this.viewGroup = java.import("android.view.ViewGroup");
        this.REQUEST_CODE = 9001;
        this._cameraFacing = "Back";
        this.eventObject = null;
        this.format = this.componentInstance.format;
        NativeController(componentInstance);
        konymp.logger.trace("-- Exit constructor NativeControllerAndroid -- ", konymp.logger.FUNCTION_EXIT);
    };
    Inherits(NativeControllerAndroid, NativeController);
    /**
     * @function scan
     * @private
     * @description: scan the code
     */
    NativeControllerAndroid.prototype.scan = function(eventobject, cameraFacing) {
        konymp.logger.trace("-- Entering scan in NativeControllerAndroid -- ", konymp.logger.FUNCTION_ENTRY);
        try {
            this.linearLayout = new this.layoutView(this.konyContext);
            this.linearLayout.setLayoutParams(new this.viewGroup.LayoutParams(this.viewGroup.LayoutParams.MATCH_PARENT, this.viewGroup.LayoutParams.MATCH_PARENT));
            this.linearLayout.setId(1234);
            eventobject.setId(123453);
            var fragmentTransaction = java.import("androidx.fragment.app.FragmentTransaction");
            var fm = this.konyContext.getSupportFragmentManager();
            var ft = fm.beginTransaction();
             var resultClass = java.newClass("resultClass", "java.lang.Object", ["dev.daryl.mlkitbarcodescanner.BarcodeRetriever"], {
                onRetrieved: function(result) {
                    if (result !== null) {
                        var format = "";
                        this.componentInstance.afterScan(result.getRawValue(), result.getFormat());
                        
                    } 
                }.bind(this),
                onPermissionRequestDenied: function() {
                    this.componentInstance.errorCallback("Barcode Scanner requires Camera permissions");
                }.bind(this)
            });
          
            var classObj = new resultClass();
            this.barcodeCaptureObject.setRetrieval(classObj);
            ft.add(eventobject.getId(), this.barcodeCaptureObject,"123");
            ft.commit();
        } catch (e) {
            throw new Error("Exception in Scanning the code  :" + e);
        }
        konymp.logger.trace("-- Exiting scan in NativeControllerAndroid-- ", konymp.logger.FUNCTION_EXIT);
    };
    /**
     * @function resumeScan
     * @private
     * @description: API to resume the scan after 1 successful scan
     */
    NativeControllerAndroid.prototype.resumeScan = function() {
        this.barcodeCaptureObject.resume();
    };
    /**
     * @function flashControl
     * @private
     * @description: API to let user control the flash of camera
     */
    NativeControllerAndroid.prototype.flashControl = function() {
        var flashOnOff = kony.runOnMainThread(mainthread.bind(this), []);

        function mainthread() {
            this.barcodeCaptureObject.setFlash();
        }
    };
    /**
     * @function release
     * @private
     * @description: release the view of native container
     */
    NativeControllerAndroid.prototype.release = function(eventobject) {
        if (this.konyContext.getSupportFragmentManager().findFragmentByTag("123") !== null) {
            this.konyContext.getSupportFragmentManager().beginTransaction().remove(this.konyContext.getSupportFragmentManager().findFragmentByTag("123")).commit();
        }
        kony.runOnMainThread(function() {
            eventobject.removeAllViews();
        }.bind(this), [eventobject]);
    };
    return NativeControllerAndroid;
});