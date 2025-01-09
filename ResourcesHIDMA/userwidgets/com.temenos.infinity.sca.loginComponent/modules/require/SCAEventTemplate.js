define(function () {
   
   const SCAEventConstants = {
        getLoginPayload: function(loginJSON) {
            // Using ES6 Template Literal
            return `{
                  "Meta": {
                      "EventType": "urn:com:temenos:security:event:login:v1",  
                      "RiskScore": {
                          "Required": "${loginJSON.requiredRiskScore}",
                          "Current": "${loginJSON.currentRiskScore}"
                      }
                      "TransactionId": "${loginJSON.transactionId}"
                  }
                  "urn:com:temenos:security:event:login:v1": {
                      "Scope": "LOGIN" 
                      "Name": "Temenos Internet Banking",
                      "userid": "${loginJSON.userid}",
                      "password": "${loginJSON.password}"
                  }
            }`;
        }
    }
    return {
        getLoginPayload : function(loginJSON){
             kony.print('SCA Event Login Payload -->' + SCAEventConstants.getLoginPayload(loginJSON));
             return SCAEventConstants.getLoginPayload(loginJSON);
        }
    };
});