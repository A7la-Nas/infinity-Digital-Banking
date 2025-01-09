define(function() {
    return {
        userId: null,
        sessionObj: null,

        setUserId : function(userId){
            this.userId = userId;
        },
        getUserId : function(){
            return this.userId;
        },

        showLoadingScreen: function() {
//            kony.application.showLoadingScreen(null, "Please wait...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
//                shouldShowLabelInBottom: "false",
//                separatorHeight: 200,
//                progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
//                progressIndicatorColor: "Gray"
//            });
            kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        },
        hideLoadingScreen: function() {
            kony.application.dismissLoadingScreen();
        },
        isEmpty: function(str) {
            return (!str || str.length === 0);
        },
        showAlert: function(message) {
            kony.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": null,
                "yesLabel": null,
                "noLabel": null,
                "alertIcon": null,
                "message": message
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
        },
        getErrorMessage: function(error) {
            return "Error Code: " + error.longErrorCode + "\nError Message: " + error.errorString;
        },
        getChallengeInfo: function(response, key) {
            //Uncomment below for local testing - this is demo policy
            //return `maxL=16||minL=8||minDg=1||minUc=1||minLc=1||minSc=1||Repetition=2||SeqCheck=ASC||charsNotAllowed=#||userIdCheck=true||msg=<html><head></head><body><ul><li>Password length must be between 8 and 16</li><li>It must contain atleast a number, an upper case character, a lower case character, and a special character</li><li>It can have only two repetition for a particular character</li><li>It should not be in ascending order eg: abcd or 1234 </li><li>It should not contain your username</li><li>Special character '#' is not allowed</li></ul></body></html>`
            if (response.challengeResponse.challengeInfo && response.challengeResponse.challengeInfo.length > 0) {
                var infoArr = response.challengeResponse.challengeInfo
                for (var i = 0; i < infoArr.length; i++) {
                    var info = infoArr[i]
                    if (info.key === key && info.value && info.value.length > 0) {
                        return info.value
                    }
                }
                return null
            }
        },
        initSession: function() {
            if (this.sessionObj === null) {
                this.sessionObj = {
                    "isUserLoggedIn": false
                }
            }
        },
        getSession: function(session) {
            this.initSession();
            return this.sessionObj;
        },
        setErrorMessageAndLogout: function (msg) {
            var navManager = applicationManager.getNavigationManager();
            const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AuthUIModule",
                "appName": "AuthenticationMA"
            });
            authMod.presentationController.sessionExpiredLogout();
        },
    }
});