define({
    //Add your navigation controller code here.
    handleTransferNavigation: function(data) {
        var formToBeNavigated = "";
        if (data !== null) {
            formToBeNavigated = {
                "friendlyName": data.frm,
                "appName": data.appName
            };
            return formToBeNavigated;
        }
        return null;
    },
    handlefrmAcknowledgementNavigation:function(data){
        if (data !== null) {
          if (data.button1click === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName": "TransfersMA"
            };
          } else if (data.button2click === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName" : "TransfersMA"
            };
          }
        }
        return null;
      },
    
      handlefrmActivateP2PNavigation:function(data){
        if (data !== null) {
          if (data.buttonCancelclick === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName": "TransfersMA"
            };
          } else if (data.setAckFlow === "Activation") {
            return {
              "friendlyName": "frmAcknowledgement",
              "appName" : "TransfersMA"
            };
          }
          else if (data.setAckFlow === "Deactivation") {
            return {
              "friendlyName": "frmDeactivateAcknowledgement",
              "appName" : "TransfersMA"
            };
          }
          else if (data.setAckFlowFailure === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName" : "TransfersMA"
            };
          }
        }
        return null;
      },
    
      handlefrmDeactivateAcknowledgementNavigation:function(data){
        if (data !== null) {
          if (data.button1click === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName": "TransfersMA"
            };
          } 
        }
        return null;
      },
    
      handlefrmUTFP2PTransferNavigation:function(data){
        if (data !== null) {
          if (data.onCancelClick === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName": "TransfersMA"
            };
          } else if (data.transferType === "Same Bank") {
            return {
              "friendlyName": "frmUTFSameBankTransfer",
              "appName" : "TransfersMA"
            };
          }
          else if (data.transferType === "Domestic Transfer") {
            return {
              "friendlyName": "frmUTFDomesticTransfer",
              "appName" : "TransfersMA"
            };
          }
          else if (data.transferType === "International Transfer") {
            return {
              "friendlyName": "frmUTFInternationalTransfer",
              "appName" : "TransfersMA"
            };
          }
          else if (data.transferType === "Pay a Person") {
            return {
              "friendlyName": "frmUTFP2PTransfer",
              "appName" : "TransfersMA"
            };
          }
          else if(data.createTransfer === true){
             return {
              "friendlyName": "frmUTFP2PTransferConfirmation",
              "appName": "TransfersMA"
            };
          }
          
        }
        return null;
      },
    
      handlefrmUTFP2PTransferAcknowledgementNavigation:function(data){
        if (data !== null) {
          if (data.button1click === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName": "TransfersMA"
            };
          } else if (data.button2click === true) {
            return {
              "friendlyName": "frmSavePayeeforOTT",
              "appName" : "TransfersMA"
            };
          }
        }
        return null;
      },
    
      handlefrmUTFP2PTransferConfirmationNavigation:function(data){
        if (data !== null) {
          if (data.MFAType === "SECURE_ACCESS_CODE") {
            return {
              "friendlyName": "frmUTFEmailOrSMS",
              "appName": "TransfersMA"
            };
          } else if (data.MFAType === "SECURITY_QUESTIONS") {
            return {
              "friendlyName": "frmUTFSecurityQuestions",
              "appName" : "TransfersMA"
            };
          }
          else if (data.buttonModifyClick === true) {
            return {
              "friendlyName": "frmUTFP2PTransfer",
              "appName" : "TransfersMA"
            };
          }
          else if (data.buttonCancelClick === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName" : "TransfersMA"
            };
          }
          else if (data.buttonConfirmClick === true) {
            return {
              "friendlyName": "frmUTFP2PTransferAcknowledgement",
              "appName" : "TransfersMA"
            };
          }
        }
        return null;
      },
    
      handlefrmPayaPersonAddBeneAcknowledgementNavigation:function(data){
        if (data !== null) {
          if (data.newTransfer === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName": "TransfersMA"
            };
          } 
        }
        return null;
      },
    
      handlefrmPayaPersonAddBeneficiaryNavigation:function(data){
        if (data !== null) {
          if (data.samebankTransfer === true) {
            return {
              "friendlyName": "frmSameBankAddBeneficiary",
              "appName": "TransfersMA"
            };
          } else if (data.domesticTransfer === true) {
            return {
              "friendlyName": "frmDomesticAddBeneficiary",
              "appName" : "TransfersMA"
            };
          }
            else if (data.internationalTransfer === true) {
            return {
              "friendlyName": "frmInternationalAddBeneficiary",
              "appName" : "TransfersMA"
            };
            }
            else if (data.p2pTransfer === true) {
            return {
              "friendlyName": "frmPayaPersonAddBeneficiary",
              "appName" : "TransfersMA"
            };
            
          }
          else if (data.continueAddBen === false) {
            return {
              "friendlyName": "frmLinkPayee",
              "appName" : "TransfersMA"
            };
            
          }
          else if (data.continueAddBen !== false) {
            return {
              "friendlyName": "frmPayaPersonAddBeneficiaryConfirm",
              "appName" : "TransfersMA"
            };
            
          }
         else if (data.buttonConfirmCancel === true){
            return {
              "friendlyName": "frmUTFLanding",
              "appName" : "TransfersMA"
            };
         }
        }
        return null;
      },
    
      handlefrmPayaPersonAddBeneficiaryConfirmNavigation:function(data){
        if (data !== null) {
          if (data.preshowCall === true) {
            return {
              "friendlyName": "frmUTFLanding",
              "appName": "TransfersMA"
            };
          } else if (data.navToack === true) {
            return {
              "friendlyName": "frmPayaPersonAddBeneAcknowledgement",
              "appName" : "TransfersMA"
            };
          }
          else if (data.modifyTransfer === true) {
            return {
              "friendlyName": "frmPayaPersonAddBeneficiary",
              "appName" : "TransfersMA"
            };
          }
          else if (data.confirmTransferSuccess === true) {
            return {
              "friendlyName": "frmPayaPersonAddBeneAcknowledgement",
              "appName" : "TransfersMA"
            };
          }
           else if (data.confirmTransferError === true) {
            return {
              "friendlyName": "frmPayaPersonAddBeneficiary",
              "appName" : "TransfersMA"
            };
          }
    
        }
        return null;
      },
});