define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for SwiftLookup **/
    AS_FlexContainer_b44641d62534452a926e977e2d77310c: function AS_FlexContainer_b44641d62534452a926e977e2d77310c(eventobject) {
        var self = this;
        return self.preshow.call(this);
    },
    /** onBreakpointChange defined for SwiftLookup **/
    AS_FlexContainer_e163f15e5e1347a886b67f4984eec9ce: function AS_FlexContainer_e163f15e5e1347a886b67f4984eec9ce(eventobject, breakpoint) {
        var self = this;
        return self.onBreakPointChange.call(this);
    },
    /** postShow defined for SwiftLookup **/
    AS_FlexContainer_ff7936056c9e4bb4b1f9af22dd7ee613: function AS_FlexContainer_ff7936056c9e4bb4b1f9af22dd7ee613(eventobject) {
        var self = this;
        return self.postshow.call(this);
    },
    /** onRowClick defined for segLookupRecords **/
    AS_Segment_f84760e7e157444c8bd4acea8dd1616a: function AS_Segment_f84760e7e157444c8bd4acea8dd1616a(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.getSwiftData.call(this);
    }
});