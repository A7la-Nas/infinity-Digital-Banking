define({
    showEditAddress: function() {
        var currForm = kony.application.getCurrentForm();
        currForm.flxSettingsWrapper.height = "760dp";
        currForm.settings.height = "700dp";
        currForm.settings.flxProfileWrapper.setVisibility(false);
        currForm.settings.flxNameChangeRequestWrapper.setVisibility(false);
        currForm.settings.flxPhoneNumbersWrapper.setVisibility(false);
        currForm.settings.flxEditPhoneNumbersWrapper.setVisibility(false);
        currForm.settings.flxAddPhoneNumbersWrapper.setVisibility(false);
        currForm.settings.flxEmailWrapper.setVisibility(false);
        currForm.settings.flxEditEmailWrapper.setVisibility(false);
        currForm.settings.flxEditUsernameWrapper.setVisibility(false);
        currForm.settings.flxAddNewEmailWrapper.setVisibility(false);
        currForm.settings.flxAddressesWrapper.setVisibility(false);
        currForm.settings.flxAddNewAddressWrapper.setVisibility(false);
        currForm.settings.flxEditAddressWrapper.setVisibility(true);
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
        currForm.forceLayout();
    }
});