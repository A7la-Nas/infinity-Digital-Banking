define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().settings.segPhoneNumbers.selectedIndex[1];
        var data = kony.application.getCurrentForm().settings.segPhoneNumbers.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                data[i].imgCollapsible = "chevron_up.png";
                data[i].template = "flxSelectedPhoneNumbers";
            } else {
                data[i].imgCollapsible = "arrow_down.png";
                data[i].template = "flxPhoneNumbers";
            }
        }
        kony.application.getCurrentForm().settings.segPhoneNumbers.setData(data);
    },
    showEditPhoneNumber: function() {
        var currForm = kony.application.getCurrentForm();
        //currForm.settings.flxRight.height="760px";
        //currForm.settings.height="700px";
        currForm.settings.flxProfileWrapper.setVisibility(false);
        currForm.settings.flxNameChangeRequestWrapper.setVisibility(false);
        currForm.settings.flxPhoneNumbersWrapper.setVisibility(false);
        currForm.settings.flxEditPhoneNumbersWrapper.setVisibility(true);
        currForm.settings.flxAddPhoneNumbersWrapper.setVisibility(false);
        currForm.settings.flxEmailWrapper.setVisibility(false);
        currForm.settings.flxEditEmailWrapper.setVisibility(false);
        currForm.settings.flxEditUsernameWrapper.setVisibility(false);
        currForm.settings.flxAddNewEmailWrapper.setVisibility(false);
        currForm.settings.flxAddressesWrapper.setVisibility(false);
        currForm.settings.flxAddNewAddressWrapper.setVisibility(false);
        currForm.settings.flxEditAddressWrapper.setVisibility(false);
        currForm.settings.flxAccountsWrapper.setVisibility(false);
        currForm.settings.flxEditAccountsWrapper.setVisibility(false);
        currForm.settings.flxDefaultTransactionAccountWrapper.setVisibility(false);
        currForm.settings.flxUsernameAndPasswordWrapper.setVisibility(false);
        currForm.settings.flxAcknowledgementWrapper.setVisibility(false);
        currForm.settings.flxEditPasswordWrapper.setVisibility(false);
        currForm.settings.flxSecuritySettingVerificationWrapper.setVisibility(false);
        currForm.settings.flxUsernameVerificationWrapper.setVisibility(false);
        currForm.settings.flxUsernameVerificationWrapper2.setVisibility(false);
        currForm.settings.flxAnswerSecurityQuestionsWrapper.setVisibility(false);
        currForm.settings.flxSecureAccessCodeWrapper.setVisibility(false);
        currForm.settings.flxEditSecuritySettingsWrapper.setVisibility(false);
        //currForm.settings.lblOption1.setVisibility(true);
        //currForm.settings.lblOption2.setVisibility(true);
        //currForm.settings.lblOption3.setVisibility(true);
        currForm.forceLayout();
    },
    showDeletePopup: function() {
        var currForm = kony.application.getCurrentForm();
        currForm.flxDeletePopUp.setVisibility(true);
        currForm.flxDeletePopUp.setFocus(true);
        currForm.lblDeleteHeader.text = "DELETE";
        currForm.lblConfirmDelete.text = "Are you sure you want to delete this Phone Number?";
    }
});