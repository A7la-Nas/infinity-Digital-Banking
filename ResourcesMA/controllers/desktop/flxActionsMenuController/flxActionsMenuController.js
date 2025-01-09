define({ 

 //Type your controller code here 
    onTransfersKeyPressCallback: function(eventobject, eventPayload, context) {
        var scope = this;
        var params = [];
            params.push(eventobject);
            params.push(eventPayload);
            params.push(context);
            scope.executeOnParent("transfersKeyPress", params);
    },

 });