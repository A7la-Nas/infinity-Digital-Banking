define(function() {
    return {
        rdnaObj: null,
        getSyncResponse: function(response) {
            var res = JSON.parse(response);
            return [JSON.parse(res.error), res.response];
        },
        init: function() {
            // if (this.rdnaObj === null) {
            //    var RDNAClient = java.import("com.uniken.rdnaplugin.RDNAClient");
            //   this.rdnaObj = new RDNAClient();
            // }
            if (this.rdnaObj === null) {
                var devicePlatform = kony.os.deviceInfo().name;
                if (devicePlatform == "android") {
                    var RDNAClient = java.import("com.uniken.rdnaplugin.RDNAClient");
                    this.rdnaObj = new RDNAClient();
                } else {
                    this.rdnaObj = objc.import("RDNAClient").sharedInstance();
                }
            }
        },
        authenticateUserAndSignData: function(payload, authLevel, authenticatorType, reason) {
            return this.getSyncResponse(this.rdnaObj.authenticateUserAndSignData(payload, authLevel, authenticatorType, reason));
        },
        initialize: function(agentInfo, relidCallbacks, gwHNIP, gwPort, cipherSpec, cipherSalt, proxySettings, rdnaSSLCertificate, loggingLevel, initializeSyncRespose) {
            this.init();
            this.rdnaObj.initialize(agentInfo, relidCallbacks, gwHNIP, gwPort, cipherSpec, cipherSalt, proxySettings, rdnaSSLCertificate, loggingLevel, initializeSyncRespose);
        },
        takeActionOnThreats: function(threadsJson) {
            return this.getSyncResponse(this.rdnaObj.takeActionOnThreats(threadsJson));
        },
        setUser: function(userName) {
            return this.getSyncResponse(this.rdnaObj.setUser(userName));
        },
        setActivationCode(activationCode) {
               return this.getSyncResponse(this.rdnaObj.setAccessCode(activationCode));
        },
        resendActivationCode() {
            return this.getSyncResponse(this.rdnaObj.resendActivationCode());
        },
        setUserConsentForLDA: function(shouldEnrollLDA, challengeMode, authenticationType) {
            return this.getSyncResponse(this.rdnaObj.setUserConsentForLDA(shouldEnrollLDA, challengeMode, authenticationType));
        },
        setPassword: function(password,challengeMode) {
            return this.getSyncResponse(this.rdnaObj.setPassword(password, challengeMode));
        },
        addAlternateLoginId(loginID) {
            return this.getSyncResponse(this.rdnaObj.addAlternateLoginId(loginID));
        },
        verifyPassword: function(password, mode) {
            return this.getSyncResponse(this.rdnaObj.setPassword(password, mode));
        },
        performVerifyAuth: function(isProceed) {
            return this.getSyncResponse(this.rdnaObj.performVerifyAuth(isProceed));
        },
        fallbackNewDeviceActivationFlow: function() {
            return this.getSyncResponse(this.rdnaObj.fallbackNewDeviceActivationFlow());
        },
        setAccessCode: function(accessCode) {
            return this.getSyncResponse(this.rdnaObj.setAccessCode(accessCode));
        },
        resendAccessCode: function() {
            return this.getSyncResponse(this.rdnaObj.resendAccessCode());
        },
        setCustomChallengeResponse: function(customChlng) {
            return this.getSyncResponse(this.rdnaObj.setCustomChallengeResponse(customChlng));
        },
        resetBlockedUserAccount: function() {
            return this.getSyncResponse(this.rdnaObj.resetBlockedUserAccount());
        },
        getNotifications: function(recordCount, enterpriseID, startIndex, startDate, endDate) {
            return this.getSyncResponse(this.rdnaObj.getNotifications(recordCount, enterpriseID, startIndex, startDate, endDate));
        },
        openHttpConnection: function(method, url, headers, body) {
            return this.getSyncResponse(this.rdnaObj.openHttpConnection(method, url, headers, body));
        },
        getSessionID: function() {
            return this.getSyncResponse(this.rdnaObj.getSessionID());
        },
        updateNotification: function(notificationID, action) {
            return this.getSyncResponse(this.rdnaObj.updateNotification(notificationID, action));
        },
        getNotificationHistory: function(recordCount, enterpriseID, startIndex, startDate, endDate, notificationStatus, actionPerformed, keywordSearch, deviceID) {
            return this.getSyncResponse(this.rdnaObj.getNotificationHistory(recordCount, enterpriseID, startIndex, startDate, endDate, notificationStatus, actionPerformed, keywordSearch, deviceID));
        },
        logOff: function(userID) {
            return this.getSyncResponse(this.rdnaObj.logOff(userID));
        },
        forgotPassword: function() {
            return this.getSyncResponse(this.rdnaObj.forgotPassword());
        },
        resetAuthState: function() {
            return this.getSyncResponse(this.rdnaObj.resetAuthState());
        },
        resetAuthenticateUserAndSignDataState:function(){
            return this.getSyncResponse(this.rdnaObj.resetAuthenticateUserAndSignDataState());
            },
            
        getRegisteredDeviceDetails: function(userID) {
            return this.getSyncResponse(this.rdnaObj.getRegisteredDeviceDetails(userID));
        },
        updateDeviceDetails: function(userID, deviceDetailsJsonString) {
            return this.getSyncResponse(this.rdnaObj.updateDeviceDetails(userID, deviceDetailsJsonString));
        },
        initiateUpdateFlowForCredential: function(credentialName) {
            return this.getSyncResponse(this.rdnaObj.initiateUpdateFlowForCredential(credentialName));
        },
        updatePassword: function(currentPassword, newPassword) {
            return this.getSyncResponse(this.rdnaObj.updatePassword(currentPassword, newPassword, 2));
        },
        updatePasswordOnExpiry: function(currentPassword, newPassword) {
            return this.getSyncResponse(this.rdnaObj.updatePassword(currentPassword, newPassword, 4));
        },
        encryptDataPacket: function(privacyScope, cipherSpec, cipherSalt, plainText) {
            return this.getSyncResponse(this.rdnaObj.encryptDataPacket(privacyScope, cipherSpec, cipherSalt, plainText));
        },
        decryptDataPacket: function(privacyScope, cipherSpec, cipherSalt, cipherText) {
            return this.getSyncResponse(this.rdnaObj.decryptDataPacket(privacyScope, cipherSpec, cipherSalt, cipherText));
        },
        getDeviceAuthenticationDetails: function() {
            return this.getSyncResponse(this.rdnaObj.getDeviceAuthenticationDetails());
        },
        manageDeviceAuthenticationModes: function(isEnabled, authenticationType) {
            return this.getSyncResponse(this.rdnaObj.manageDeviceAuthenticationModes(isEnabled, authenticationType));
        },
        terminate: function() {
            return this.getSyncResponse(this.rdnaObj.terminate());
        },
        generateTOTP: function(userID) {
            return this.getSyncResponse(this.rdnaObj.generateTOTP(userID));
        },
        forgotLoginID: function(requestType, requestData) {
            return this.getSyncResponse(this.rdnaObj.forgotLoginID(requestType, requestData));
        },
        getDeviceID: function() {
            return this.getSyncResponse(this.rdnaObj.getDeviceID());
        },
        getDefaultCipherSpec: function() {
            return this.getSyncResponse(this.rdnaObj.getDefaultCipherSpec());
        },
        getDefaultCipherSalt: function() {
            return this.getSyncResponse(this.rdnaObj.getDefaultCipherSalt());
        },
        getSDKVersion: function() {
            this.init();
            return this.getSyncResponse(this.rdnaObj.getSDKVersion());
        },
        getAgentID: function() {
            return this.getSyncResponse(this.rdnaObj.getAgentID());
        },
        getAllChallenges: function(userId) {
            return this.getSyncResponse(this.rdnaObj.getAllChallenges(userId));
        },
        getConfig: function(configRequest) {
            return this.getSyncResponse(this.rdnaObj.getConfig(configRequest));
        },
        activateUsing: function(choice) {
            return this.getSyncResponse(this.rdnaObj.activateUsing(choice));
        },
        getSecurityThreatLogs: function(startIndex, count) {
            return this.getSyncResponse(this.rdnaObj.getSecurityThreatLogs(startIndex, count));
        },
        requestNewAccessToken: function(reasonForRefresh) {
            return this.getSyncResponse(this.rdnaObj.requestNewAccessToken(reasonForRefresh));
        },
        //IDV Implementation
        setIDVDocumentScanProcessStartConfirmation: function(isConfirm, idvWorkflow) {
            return this.getSyncResponse(this.rdnaObj.setIDVDocumentScanProcessStartConfirmation(isConfirm, idvWorkflow));
        },
        setIDVConfirmDocumentDetails: function(isConfirm, challengeMode) {
            return this.getSyncResponse(this.rdnaObj.setIDVConfirmDocumentDetails(isConfirm, challengeMode));
        },
        setIDVSelfieProcessStartConfirmation: function(isConfirm,useDeviceBackCamera,rdnaidvWorkflowValue) {
            return this.getSyncResponse(this.rdnaObj.setIDVSelfieProcessStartConfirmation(isConfirm,false,rdnaidvWorkflowValue));
        },
        setIDVSelfieConfirmation: function(action, challengeMode) {
            return this.getSyncResponse(this.rdnaObj.setIDVSelfieConfirmation(action, challengeMode));
        },
        setIDVBiometricOptInConsent: function(isOptIn, challengeMode) {
            return this.getSyncResponse(this.rdnaObj.setIDVBiometricOptInConsent(isOptIn, challengeMode));
        },
        checkIDVUserBiometricTemplateStatus: function() {
            return this.getSyncResponse(this.rdnaObj.checkIDVUserBiometricTemplateStatus());
        },
        initiateIDVServerBiometricAuthentication: function(reason, retries) {
            return this.getSyncResponse(this.rdnaObj.initiateIDVServerBiometricAuthentication(reason, retries));
        },
        initiateIDVBiometricOptOut: function() {
            var syncResponse = null;
            var devicePlatform = kony.os.deviceInfo().name;
            if (devicePlatform == "android") {
                syncResponse = this.rdnaObj.initiateIDVBiometricOptOut();
            } else {
                syncResponse = this.rdnaObj.jsinitiateIDVBiometricOptOut();
            }
            return this.getSyncResponse(syncResponse);
        },
        setIDVBiometricOptInConfirmation: function(status) {
            return this.getSyncResponse(this.rdnaObj.setIDVBiometricOptInConfirmation(status));
        },
        initiateIDVBiometricOptIn: function() {
            var syncResponse = null;
            var devicePlatform = kony.os.deviceInfo().name;
            if (devicePlatform == "android") {
                syncResponse = this.rdnaObj.initiateIDVBiometricOptIn();
            } else {
                syncResponse = this.rdnaObj.jsinitiateIDVBiometricOptIn();
            }
            return this.getSyncResponse(syncResponse);
        },
        initiateIDVAdditionalDocumentScan: function(reason) {
            return this.getSyncResponse(this.rdnaObj.initiateIDVAdditionalDocumentScan(reason));
        },
        initiateActivatedCustomerKYC: function(reason) {
            return this.getSyncResponse(this.rdnaObj.initiateActivatedCustomerKYC(reason));
        },
        initiateAgentKYCforUser: function(userID, reason) {
            return this.getSyncResponse(this.rdnaObj.initiateAgentKYCforUser(userID, reason));
        },
        getIDVConfig: function() {
            return this.getSyncResponse(this.rdnaObj.getIDVConfig());
        },
        setIDVConfig: function(configJson) {
            return this.getSyncResponse(this.rdnaObj.setIDVConfig(configJson));
        },
        setDeviceToken: function(deviceToken) {
            this.init();
            if (this.rdnaObj !== null) {
                this.rdnaObj.setDeviceToken(deviceToken);
            }
        }
    };
});