define({
    handleWireTransferNavigation: function(data) {
    if (data !== null) {
      if (data.activate === true) {
        return {
          "friendlyName": "frmActivateWireTransfer",
          "appName": "WireTransferMA"
        };
      } else if(data.window === true) {
        return {
          "friendlyName": "frmWireTransfersWindow",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmAccountInfoForInboundTransfer === true) {
        return {
          "friendlyName": "frmAccountInfoForInboundTransfer",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmAddBulkTemplateFile === true) {
        return {
          "friendlyName": "frmAddBulkTemplateFile",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmAddBulkTransferFile === true) {
        return {
          "friendlyName": "frmAddBulkTransferFile",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkTemplateEditRecipients === true) {
        return {
          "friendlyName": "frmBulkTemplateEditRecipients",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkTransferFiles === true) {
        return {
          "friendlyName": "frmBulkTransferFiles",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkTemplateAddRecipients === true) {
        return {
          "friendlyName": "frmBulkTemplateAddRecipients",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireActivityAll === true) {
        return {
          "friendlyName": "frmBulkWireActivityAll",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireActivityFailed === true) {
        return {
          "friendlyName": "frmBulkWireActivityFailed",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireActivityPending === true) {
        return {
          "friendlyName": "frmBulkWireActivityPending",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireActivitySuccess === true) {
        return {
          "friendlyName": "frmBulkWireActivitySuccess",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireConfirmTransfer === true) {
        return {
          "friendlyName": "frmBulkWireConfirmTransfer",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireCreateTemplateAck === true) {
        return {
          "friendlyName": "frmBulkWireCreateTemplateAck",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkwireCreateTemplateConfirm === true) {
        return {
          "friendlyName": "frmBulkwireCreateTemplateConfirm",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireEditRecipient === true) {
        return {
          "friendlyName": "frmBulkWireEditRecipient",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireEditTemplateRecipient === true) {
        return {
          "friendlyName": "frmBulkWireEditTemplateRecipient",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireFileTransactionsActivity === true) {
        return {
          "friendlyName": "frmBulkWireFileTransactionsActivity",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireTemplateRemovedRecipients === true) {
        return {
          "friendlyName": "frmBulkWireTemplateRemovedRecipients",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireTransferRemovedRecipients === true) {
        return {
          "friendlyName": "frmBulkWireTransferRemovedRecipients",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireViewFileDetails === true) {
        return {
          "friendlyName": "frmBulkWireViewFileDetails",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBulkWireViewTemplate === true) {
        return {
          "friendlyName": "frmBulkWireViewTemplate",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBWTCreateRecipientFile === true) {
        return {
          "friendlyName": "frmBWTCreateRecipientFile",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBWTEditRecipientFile === true) {
        return {
          "friendlyName": "frmBWTEditRecipientFile",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmBWTemplateConfirmTransfer === true) {
        return {
          "friendlyName": "frmBWTemplateConfirmTransfer",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmConfirmDetails === true) {
        return {
          "friendlyName": "frmConfirmDetails",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmCreateTempAddDomestic === true) {
        return {
          "friendlyName": "frmCreateTempAddDomestic",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmCreateTempAddInternational === true) {
        return {
          "friendlyName": "frmCreateTempAddInternational",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmCreateTemplatePrimaryDetails === true) {
        return {
          "friendlyName": "frmCreateTemplatePrimaryDetails",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmCreateTempSelectRecipients === true) {
        return {
          "friendlyName": "frmCreateTempSelectRecipients",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmEditBulkTemplateFile === true) {
        return {
          "friendlyName": "frmEditBulkTemplateFile",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmEditTempAddDomestic === true) {
        return {
          "friendlyName": "frmEditTempAddDomestic",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmEditTempAddInternational === true) {
        return {
          "friendlyName": "frmEditTempAddInternational",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmEditTemplatePrimaryDetails === true) {
        return {
          "friendlyName": "frmEditTemplatePrimaryDetails",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmEditTempSelectRecipients === true) {
        return {
          "friendlyName": "frmEditTempSelectRecipients",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmMakeBulkTransfer === true) {
        return {
          "friendlyName": "frmMakeBulkTransfer",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmMakeBulkTransferTemplate === true) {
        return {
          "friendlyName": "frmMakeBulkTransferTemplate",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmNotEligibleToTransfer === true) {
        return {
          "friendlyName": "frmNotEligibleToTransfer",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferAddInternationalAccountAck === true) {
        return {
          "friendlyName": "frmWireTransferAddInternationalAccountAck",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferAddInternationalAccountConfirm === true) {
        return {
          "friendlyName": "frmWireTransferAddInternationalAccountConfirm",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferAddInternationalAccountStep1 === true) {
        return {
          "friendlyName": "frmWireTransferAddInternationalAccountStep1",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferAddInternationalAccountStep2 === true) {
        return {
          "friendlyName": "frmWireTransferAddInternationalAccountStep2",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferAddKonyAccountAck === true) {
        return {
          "friendlyName": "frmWireTransferAddKonyAccountAck",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferAddKonyAccountConfirm === true) {
        return {
          "friendlyName": "frmWireTransferAddKonyAccountConfirm",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferAddKonyAccountStep1 === true) {
        return {
          "friendlyName": "frmWireTransferAddKonyAccountStep1",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferAddKonyAccountStep2 === true) {
        return {
          "friendlyName": "frmWireTransferAddKonyAccountStep2",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferMakeTransfer === true) {
        return {
          "friendlyName": "frmWireTransferMakeTransfer",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferOneTimePaymentConfirm === true) {
        return {
          "friendlyName": "frmWireTransferOneTimePaymentConfirm",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferOneTimePaymentStep1 === true) {
        return {
          "friendlyName": "frmWireTransferOneTimePaymentStep1",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferOneTimePaymentStep2 === true) {
        return {
          "friendlyName": "frmWireTransferOneTimePaymentStep2",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferOneTimePaymentStep3 === true) {
        return {
          "friendlyName": "frmWireTransferOneTimePaymentStep3",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransfersManageRecipients === true) {
        return {
          "friendlyName": "frmWireTransfersManageRecipients",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransfersRecent === true) {
        return {
          "friendlyName": "frmWireTransfersRecent",
          "appName" : "WireTransferMA"
        };
      } else if(data.frmWireTransferViewActivity === true) {
        return {
          "friendlyName": "frmWireTransferViewActivity",
          "appName" : "WireTransferMA"
        };
      }
    }
    return null;
  }
});