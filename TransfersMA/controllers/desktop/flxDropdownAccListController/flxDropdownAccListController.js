define({ 

 //Type your controller code here 
onViewCreated: function() {
        try {
            this.view.onKeyPress = this.rowKeyPress;
        } catch (exc) {
            kony.print("Exception in onViewCreated!!!" + exc);
        }
    },
    rowKeyPress: function(eventobject,eventPayload, context) {
        try {
            kony.print("Entered rowonClick");
            this.executeOnParent("onRowKeyPresssed",{
                context: context,
                eventPayload: eventPayload,
                eventobject: eventobject
            });
        } catch (exc) {
            console.error(exc);
            kony.print("exception in rowonClick!!!" + exc);
        }
    },
 });