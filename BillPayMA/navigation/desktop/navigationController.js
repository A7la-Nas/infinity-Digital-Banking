define({
  /**
   * callback method to handle BillPay module navigations
   * @param {object} data contains callbackModelConfig
   * @returns object containing appName and friendlyName of the destination
   */
  handleBillPayNavigation: function (data) {
    if (!data) return null;
    if (data.notEligible) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmBillPayActivationNotEligible'
      }
    } else if (data.activate) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmBillPayActivation'
      }
    } else if (data.activateAcknowledgement) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmBillPayActivationAcknowledgement'
      }
    } else if (data.bulkPayees) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmBulkPayees'
      }
    } else if (data.bulkPayeesConfirm) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmBulkBillPayConfirm'
      }
    } else if (data.bulkPayeesAcknowledgement) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmBulkBillPayAcknowledgement'
      }
    } else if (data.duePayment) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmBillPaymentDue'
      }
    } else if (data.duePaymentConfirm) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmPaymentDueConfirm'
      }
    } else if (data.duePaymentAcknowledgement) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmPaymentDueAcknowledgement'
      }
    } else if (data.scheduled) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmBillPayScheduled'
      }
    } else if (data.history) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmBillPayHistory'
      }
    } else if (data.managePayees) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmManagePayees'
      }
    } else if (data.payABill) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmPayABill'
      }
    } else if (data.payABillConfirm) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmPayBillConfirm'
      }
    } else if (data.payABillAcknowledgement) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmPayBillAcknowledgement'
      }
    } else if (data.addPayee) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmAddPayee1'
      }
    } else if (data.addPayeeDetails) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmPayeeDetails'
      }
    } else if (data.addPayeeConfirm) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmVerifyPayee'
      }
    } else if (data.addPayeeAcknowledgement) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmPayeeAcknowledgement'
      }
    } else if (data.oneTimePayee) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmMakeOneTimePayee'
      }
    } else if (data.oneTimePayment) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmMakeOneTimePayment'
      }
    } else if (data.oneTimePaymentConfirm) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmOneTimePaymentConfirm'
      }
    } else if (data.oneTimePaymentAcknowledgement) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmOneTimePaymentAcknowledgement'
      }
    } else if (data.paymentActivity) {
      return {
        appName: 'BillPayMA',
        friendlyName: 'frmPaymentActivity'
      }
    } else if (data.printPage) {
      return {
        appName: 'CommonsMA',
        friendlyName: 'frmPrintTransfer'
      }
    }
  }
});