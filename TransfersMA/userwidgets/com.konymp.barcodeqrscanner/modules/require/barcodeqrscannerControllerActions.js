define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxClose **/
    AS_FlexContainer_c3f0a4f4172f457f87fe02622ac8f621: function AS_FlexContainer_c3f0a4f4172f457f87fe02622ac8f621(eventobject) {
        var self = this;
        this.stopScan();
        this.onClickClose();
    },
    /** onClick defined for flxFlash **/
    AS_FlexContainer_c6545baf346441c78d4c381e92a8b792: function AS_FlexContainer_c6545baf346441c78d4c381e92a8b792(eventobject) {
        var self = this;
        this.flashControl();
    },
    /** onClick defined for flxCamera **/
    AS_FlexContainer_j528b4acdb0046968bc3bd78e2a330ca: function AS_FlexContainer_j528b4acdb0046968bc3bd78e2a330ca(eventobject) {
        var self = this;
        this.toggleCamera();
    },
    /** onCreated defined for ncScan **/
    AS_NativeContainer_a3775d32406e4bb8a9d30d74d52f20f5: function AS_NativeContainer_a3775d32406e4bb8a9d30d74d52f20f5(eventobject) {
        var self = this;
        this.scan(eventobject);
    },
    /** onCleanup defined for ncScan **/
    AS_NativeContainer_g2379d5cc99a443f85cf33a193802f20: function AS_NativeContainer_g2379d5cc99a443f85cf33a193802f20(eventobject) {
        var self = this;
        this.release(eventobject);
    }
});