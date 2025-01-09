define({ 

 //Type your controller code here 
 frmULTUNSendMoneyPreShow: function () {
    
    this.view.btnContacts.onClick = this.openContacts;
    this.view.btnSend.onClick = this.UNSendData;
 },
 openContacts: function() {
    try {
        var self = this;

        // Example using a Cordova plugin or NFI implementation
        if (typeof navigator.contacts !== "undefined" && navigator.contacts.pickContact) {
            navigator.contacts.pickContact(
                function(contact) {
                    // Handle selected contact
                    kony.print("Selected Contact: " + contact.displayName);
                    alert("Contact Name: " + contact.displayName);
                },
                function(err) {
                    // Handle error
                    kony.print("Error selecting contact: " + err);
                    alert("Failed to open contacts.");
                }
            );
        } else {
            alert("Contact picker is not available.");
        }
    } catch (err) {
        kony.print("Exception occurred: " + err.message);
        alert("An unexpected error occurred.");
    }
},

 UNSendData: function(){
    
    serviceName = "UNMoneyService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);

    operationName =  "UnMonySendRemittance";
    //data= {"debitAccountId": "<place-holder>","debitCurrency": "<place-holder>","debitAmount": "<place-holder>","recPhoneNo": "<place-holder>","recName": "<place-holder>","purpose": "<place-holder>"};
    data = {};
    
    data["debitAccountId"] = "200000006709";
    data["debitCurrency"] = "YER";
    data["debitAmount"] = this.view.txtAmount.text;
    data["recPhoneNo"] = this.view.txtPhonNumber.text;
    data["recName"] = this.view.txtUNName.text;
    data["purpose"] = "Transfer";
    headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);
    
    function operationSuccess(res){
        // code for success call back
        alert("تم عمل التحويل بنجاح");
    }
    function operationFailure(res){
        // code for failure call back
    }
        
    },



 });