define({ 
onKeyPressCallBack: function(eventObject, eventPayload, context) {
  var params = [];
  params.push(eventObject);
  params.push(eventPayload);
  params.push(context);
        this.executeOnParent("shiftTab", params);
    }
 //Type your controller code here 

 });