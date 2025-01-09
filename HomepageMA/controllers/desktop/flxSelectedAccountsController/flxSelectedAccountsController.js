define({
    toggleCheckBox: function() {
        var index;
        var data;
        if (kony.application.getCurrentForm().AddExternalAccounts.flxLoginUsingSelectedBank.isVisible === true) {
            index = kony.application.getCurrentForm().AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.selectedIndex[1];
            data = kony.application.getCurrentForm().AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.data;
            for (i = 0; i < data.length; i++) {
                if (i == index) {
                    kony.print("index:" + index);
                    if (data[i].lblCheckBox === "C") {
                        data[i].lblCheckBox = "D";
                    } else {
                        data[i].lblCheckBox = "C";
                    }
                }
                kony.application.getCurrentForm().AddExternalAccounts.LoginUsingSelectedBank.segSelectedAccounts.setData(data);
            }
        } else {
            index = kony.application.getCurrentForm().AddExternalAccounts.flxAcknowledgment.segSelectedAccounts.selectedIndex[1];
            data = kony.application.getCurrentForm().AddExternalAccounts.flxAcknowledgment.segSelectedAccounts.data;
            for (i = 0; i < data.length; i++) {
                if (i == index) {
                    kony.print("index:" + index);
                    if (data[i].lblCheckBox === "C") {
                        data[i].lblCheckBox = "D";
                    } else {
                        data[i].lblCheckBox = "C";
                    }
                }
                kony.application.getCurrentForm().AddExternalAccounts.flxAcknowledgment.segSelectedAccounts.setData(data);
            }
        }
    },
});