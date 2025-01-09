/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Application", "objectService" : "Utility"};

    var setterFunctions = {
        AppVersion: function(val, state) {
            context["field"] = "AppVersion";
            context["metadata"] = (objectMetadata ? objectMetadata["AppVersion"] : null);
            state['AppVersion'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bannerURL: function(val, state) {
            context["field"] = "bannerURL";
            context["metadata"] = (objectMetadata ? objectMetadata["bannerURL"] : null);
            state['bannerURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        branchType: function(val, state) {
            context["field"] = "branchType";
            context["metadata"] = (objectMetadata ? objectMetadata["branchType"] : null);
            state['branchType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        businessDays: function(val, state) {
            context["field"] = "businessDays";
            context["metadata"] = (objectMetadata ? objectMetadata["businessDays"] : null);
            state['businessDays'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        distanceUnit: function(val, state) {
            context["field"] = "distanceUnit";
            context["metadata"] = (objectMetadata ? objectMetadata["distanceUnit"] : null);
            state['distanceUnit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        facialLicenseServerUrl: function(val, state) {
            context["field"] = "facialLicenseServerUrl";
            context["metadata"] = (objectMetadata ? objectMetadata["facialLicenseServerUrl"] : null);
            state['facialLicenseServerUrl'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        facialLicenseString: function(val, state) {
            context["field"] = "facialLicenseString";
            context["metadata"] = (objectMetadata ? objectMetadata["facialLicenseString"] : null);
            state['facialLicenseString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUpdate: function(val, state) {
            context["field"] = "isUpdate";
            context["metadata"] = (objectMetadata ? objectMetadata["isUpdate"] : null);
            state['isUpdate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUpdateMandatory: function(val, state) {
            context["field"] = "isUpdateMandatory";
            context["metadata"] = (objectMetadata ? objectMetadata["isUpdateMandatory"] : null);
            state['isUpdateMandatory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchaddressLine1: function(val, state) {
            context["field"] = "MainBranchaddressLine1";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchaddressLine1"] : null);
            state['MainBranchaddressLine1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchaddressLine2: function(val, state) {
            context["field"] = "MainBranchaddressLine2";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchaddressLine2"] : null);
            state['MainBranchaddressLine2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchCity: function(val, state) {
            context["field"] = "MainBranchCity";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchCity"] : null);
            state['MainBranchCity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchLatitude: function(val, state) {
            context["field"] = "MainBranchLatitude";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchLatitude"] : null);
            state['MainBranchLatitude'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchLongitude: function(val, state) {
            context["field"] = "MainBranchLongitude";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchLongitude"] : null);
            state['MainBranchLongitude'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchPhone: function(val, state) {
            context["field"] = "MainBranchPhone";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchPhone"] : null);
            state['MainBranchPhone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchServices: function(val, state) {
            context["field"] = "MainBranchServices";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchServices"] : null);
            state['MainBranchServices'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchState: function(val, state) {
            context["field"] = "MainBranchState";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchState"] : null);
            state['MainBranchState'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchWorkingHours: function(val, state) {
            context["field"] = "MainBranchWorkingHours";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchWorkingHours"] : null);
            state['MainBranchWorkingHours'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchzipCode: function(val, state) {
            context["field"] = "MainBranchzipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchzipCode"] : null);
            state['MainBranchzipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ocrApiKey: function(val, state) {
            context["field"] = "ocrApiKey";
            context["metadata"] = (objectMetadata ? objectMetadata["ocrApiKey"] : null);
            state['ocrApiKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ocrSecretKey: function(val, state) {
            context["field"] = "ocrSecretKey";
            context["metadata"] = (objectMetadata ? objectMetadata["ocrSecretKey"] : null);
            state['ocrSecretKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        OSType: function(val, state) {
            context["field"] = "OSType";
            context["metadata"] = (objectMetadata ? objectMetadata["OSType"] : null);
            state['OSType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        OSversion: function(val, state) {
            context["field"] = "OSversion";
            context["metadata"] = (objectMetadata ? objectMetadata["OSversion"] : null);
            state['OSversion'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        versionLink: function(val, state) {
            context["field"] = "versionLink";
            context["metadata"] = (objectMetadata ? objectMetadata["versionLink"] : null);
            state['versionLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        appStoreLink: function(val, state) {
            context["field"] = "appStoreLink";
            context["metadata"] = (objectMetadata ? objectMetadata["appStoreLink"] : null);
            state['appStoreLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        playStoreLink: function(val, state) {
            context["field"] = "playStoreLink";
            context["metadata"] = (objectMetadata ? objectMetadata["playStoreLink"] : null);
            state['playStoreLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ipadNativeAppLink: function(val, state) {
            context["field"] = "ipadNativeAppLink";
            context["metadata"] = (objectMetadata ? objectMetadata["ipadNativeAppLink"] : null);
            state['ipadNativeAppLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        androidTabletNativeAppLink: function(val, state) {
            context["field"] = "androidTabletNativeAppLink";
            context["metadata"] = (objectMetadata ? objectMetadata["androidTabletNativeAppLink"] : null);
            state['androidTabletNativeAppLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isLanguageSelectionEnabled: function(val, state) {
            context["field"] = "isLanguageSelectionEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isLanguageSelectionEnabled"] : null);
            state['isLanguageSelectionEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBackEndCurencySymbolEnabled: function(val, state) {
            context["field"] = "isBackEndCurencySymbolEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isBackEndCurencySymbolEnabled"] : null);
            state['isBackEndCurencySymbolEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isCountryCodeEnabled: function(val, state) {
            context["field"] = "isCountryCodeEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isCountryCodeEnabled"] : null);
            state['isCountryCodeEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isSortCodeVisible: function(val, state) {
            context["field"] = "isSortCodeVisible";
            context["metadata"] = (objectMetadata ? objectMetadata["isSortCodeVisible"] : null);
            state['isSortCodeVisible'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currenciesSupported: function(val, state) {
            context["field"] = "currenciesSupported";
            context["metadata"] = (objectMetadata ? objectMetadata["currenciesSupported"] : null);
            state['currenciesSupported'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUTCDateFormattingEnabled: function(val, state) {
            context["field"] = "isUTCDateFormattingEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isUTCDateFormattingEnabled"] : null);
            state['isUTCDateFormattingEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        language: function(val, state) {
            context["field"] = "language";
            context["metadata"] = (objectMetadata ? objectMetadata["language"] : null);
            state['language'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deploymentGeography: function(val, state) {
            context["field"] = "deploymentGeography";
            context["metadata"] = (objectMetadata ? objectMetadata["deploymentGeography"] : null);
            state['deploymentGeography'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBusinessBankingEnabled: function(val, state) {
            context["field"] = "isBusinessBankingEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isBusinessBankingEnabled"] : null);
            state['isBusinessBankingEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAccountAggregationEnabled: function(val, state) {
            context["field"] = "isAccountAggregationEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isAccountAggregationEnabled"] : null);
            state['isAccountAggregationEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isFeedbackEnabled: function(val, state) {
            context["field"] = "isFeedbackEnabled";
            context["metadata"] = (objectMetadata ? objectMetadata["isFeedbackEnabled"] : null);
            state['isFeedbackEnabled'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfDaysForRatingFromProfile: function(val, state) {
            context["field"] = "noOfDaysForRatingFromProfile";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfDaysForRatingFromProfile"] : null);
            state['noOfDaysForRatingFromProfile'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfDaysForRatingFromTransactions: function(val, state) {
            context["field"] = "noOfDaysForRatingFromTransactions";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfDaysForRatingFromTransactions"] : null);
            state['noOfDaysForRatingFromTransactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        noOfDaysForAnotherAttemptForRating: function(val, state) {
            context["field"] = "noOfDaysForAnotherAttemptForRating";
            context["metadata"] = (objectMetadata ? objectMetadata["noOfDaysForAnotherAttemptForRating"] : null);
            state['noOfDaysForAnotherAttemptForRating'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maxtimesFeedbackperversion: function(val, state) {
            context["field"] = "maxtimesFeedbackperversion";
            context["metadata"] = (objectMetadata ? objectMetadata["maxtimesFeedbackperversion"] : null);
            state['maxtimesFeedbackperversion'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        majorVersionsForFeedback: function(val, state) {
            context["field"] = "majorVersionsForFeedback";
            context["metadata"] = (objectMetadata ? objectMetadata["majorVersionsForFeedback"] : null);
            state['majorVersionsForFeedback'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bannerImageURL: function(val, state) {
            context["field"] = "bannerImageURL";
            context["metadata"] = (objectMetadata ? objectMetadata["bannerImageURL"] : null);
            state['bannerImageURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        desktopBannerImageURL: function(val, state) {
            context["field"] = "desktopBannerImageURL";
            context["metadata"] = (objectMetadata ? objectMetadata["desktopBannerImageURL"] : null);
            state['desktopBannerImageURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        mobileBannerImageURL: function(val, state) {
            context["field"] = "mobileBannerImageURL";
            context["metadata"] = (objectMetadata ? objectMetadata["mobileBannerImageURL"] : null);
            state['mobileBannerImageURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        viewMoreDBXLink: function(val, state) {
            context["field"] = "viewMoreDBXLink";
            context["metadata"] = (objectMetadata ? objectMetadata["viewMoreDBXLink"] : null);
            state['viewMoreDBXLink'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        showAdsPostLogin: function(val, state) {
            context["field"] = "showAdsPostLogin";
            context["metadata"] = (objectMetadata ? objectMetadata["showAdsPostLogin"] : null);
            state['showAdsPostLogin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAlertAccountLevel: function(val, state) {
            context["field"] = "isAlertAccountLevel";
            context["metadata"] = (objectMetadata ? objectMetadata["isAlertAccountLevel"] : null);
            state['isAlertAccountLevel'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAlertAccountIDLevel: function(val, state) {
            context["field"] = "isAlertAccountIDLevel";
            context["metadata"] = (objectMetadata ? objectMetadata["isAlertAccountIDLevel"] : null);
            state['isAlertAccountIDLevel'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isAccountTypeLevelAlerts: function(val, state) {
            context["field"] = "isAccountTypeLevelAlerts";
            context["metadata"] = (objectMetadata ? objectMetadata["isAccountTypeLevelAlerts"] : null);
            state['isAccountTypeLevelAlerts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isprofileImageAvailable: function(val, state) {
            context["field"] = "isprofileImageAvailable";
            context["metadata"] = (objectMetadata ? objectMetadata["isprofileImageAvailable"] : null);
            state['isprofileImageAvailable'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bwFileTransactionsLimit: function(val, state) {
            context["field"] = "bwFileTransactionsLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["bwFileTransactionsLimit"] : null);
            state['bwFileTransactionsLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        timeZoneOffset: function(val, state) {
            context["field"] = "timeZoneOffset";
            context["metadata"] = (objectMetadata ? objectMetadata["timeZoneOffset"] : null);
            state['timeZoneOffset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newSettings: function(val, state) {
            context["field"] = "newSettings";
            context["metadata"] = (objectMetadata ? objectMetadata["newSettings"] : null);
            state['newSettings'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Application(defaultValues) {
        var privateState = {};
        context["field"] = "AppVersion";
        context["metadata"] = (objectMetadata ? objectMetadata["AppVersion"] : null);
        privateState.AppVersion = defaultValues ?
            (defaultValues["AppVersion"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AppVersion"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "bannerURL";
        context["metadata"] = (objectMetadata ? objectMetadata["bannerURL"] : null);
        privateState.bannerURL = defaultValues ?
            (defaultValues["bannerURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bannerURL"], context) :
                null) :
            null;

        context["field"] = "branchType";
        context["metadata"] = (objectMetadata ? objectMetadata["branchType"] : null);
        privateState.branchType = defaultValues ?
            (defaultValues["branchType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["branchType"], context) :
                null) :
            null;

        context["field"] = "businessDays";
        context["metadata"] = (objectMetadata ? objectMetadata["businessDays"] : null);
        privateState.businessDays = defaultValues ?
            (defaultValues["businessDays"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["businessDays"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "distanceUnit";
        context["metadata"] = (objectMetadata ? objectMetadata["distanceUnit"] : null);
        privateState.distanceUnit = defaultValues ?
            (defaultValues["distanceUnit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["distanceUnit"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "facialLicenseServerUrl";
        context["metadata"] = (objectMetadata ? objectMetadata["facialLicenseServerUrl"] : null);
        privateState.facialLicenseServerUrl = defaultValues ?
            (defaultValues["facialLicenseServerUrl"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facialLicenseServerUrl"], context) :
                null) :
            null;

        context["field"] = "facialLicenseString";
        context["metadata"] = (objectMetadata ? objectMetadata["facialLicenseString"] : null);
        privateState.facialLicenseString = defaultValues ?
            (defaultValues["facialLicenseString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facialLicenseString"], context) :
                null) :
            null;

        context["field"] = "isUpdate";
        context["metadata"] = (objectMetadata ? objectMetadata["isUpdate"] : null);
        privateState.isUpdate = defaultValues ?
            (defaultValues["isUpdate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUpdate"], context) :
                null) :
            null;

        context["field"] = "isUpdateMandatory";
        context["metadata"] = (objectMetadata ? objectMetadata["isUpdateMandatory"] : null);
        privateState.isUpdateMandatory = defaultValues ?
            (defaultValues["isUpdateMandatory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUpdateMandatory"], context) :
                null) :
            null;

        context["field"] = "MainBranchaddressLine1";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchaddressLine1"] : null);
        privateState.MainBranchaddressLine1 = defaultValues ?
            (defaultValues["MainBranchaddressLine1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchaddressLine1"], context) :
                null) :
            null;

        context["field"] = "MainBranchaddressLine2";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchaddressLine2"] : null);
        privateState.MainBranchaddressLine2 = defaultValues ?
            (defaultValues["MainBranchaddressLine2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchaddressLine2"], context) :
                null) :
            null;

        context["field"] = "MainBranchCity";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchCity"] : null);
        privateState.MainBranchCity = defaultValues ?
            (defaultValues["MainBranchCity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchCity"], context) :
                null) :
            null;

        context["field"] = "MainBranchLatitude";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchLatitude"] : null);
        privateState.MainBranchLatitude = defaultValues ?
            (defaultValues["MainBranchLatitude"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchLatitude"], context) :
                null) :
            null;

        context["field"] = "MainBranchLongitude";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchLongitude"] : null);
        privateState.MainBranchLongitude = defaultValues ?
            (defaultValues["MainBranchLongitude"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchLongitude"], context) :
                null) :
            null;

        context["field"] = "MainBranchPhone";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchPhone"] : null);
        privateState.MainBranchPhone = defaultValues ?
            (defaultValues["MainBranchPhone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchPhone"], context) :
                null) :
            null;

        context["field"] = "MainBranchServices";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchServices"] : null);
        privateState.MainBranchServices = defaultValues ?
            (defaultValues["MainBranchServices"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchServices"], context) :
                null) :
            null;

        context["field"] = "MainBranchState";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchState"] : null);
        privateState.MainBranchState = defaultValues ?
            (defaultValues["MainBranchState"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchState"], context) :
                null) :
            null;

        context["field"] = "MainBranchWorkingHours";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchWorkingHours"] : null);
        privateState.MainBranchWorkingHours = defaultValues ?
            (defaultValues["MainBranchWorkingHours"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchWorkingHours"], context) :
                null) :
            null;

        context["field"] = "MainBranchzipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchzipCode"] : null);
        privateState.MainBranchzipCode = defaultValues ?
            (defaultValues["MainBranchzipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchzipCode"], context) :
                null) :
            null;

        context["field"] = "ocrApiKey";
        context["metadata"] = (objectMetadata ? objectMetadata["ocrApiKey"] : null);
        privateState.ocrApiKey = defaultValues ?
            (defaultValues["ocrApiKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ocrApiKey"], context) :
                null) :
            null;

        context["field"] = "ocrSecretKey";
        context["metadata"] = (objectMetadata ? objectMetadata["ocrSecretKey"] : null);
        privateState.ocrSecretKey = defaultValues ?
            (defaultValues["ocrSecretKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ocrSecretKey"], context) :
                null) :
            null;

        context["field"] = "OSType";
        context["metadata"] = (objectMetadata ? objectMetadata["OSType"] : null);
        privateState.OSType = defaultValues ?
            (defaultValues["OSType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["OSType"], context) :
                null) :
            null;

        context["field"] = "OSversion";
        context["metadata"] = (objectMetadata ? objectMetadata["OSversion"] : null);
        privateState.OSversion = defaultValues ?
            (defaultValues["OSversion"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["OSversion"], context) :
                null) :
            null;

        context["field"] = "versionLink";
        context["metadata"] = (objectMetadata ? objectMetadata["versionLink"] : null);
        privateState.versionLink = defaultValues ?
            (defaultValues["versionLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["versionLink"], context) :
                null) :
            null;

        context["field"] = "appStoreLink";
        context["metadata"] = (objectMetadata ? objectMetadata["appStoreLink"] : null);
        privateState.appStoreLink = defaultValues ?
            (defaultValues["appStoreLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["appStoreLink"], context) :
                null) :
            null;

        context["field"] = "playStoreLink";
        context["metadata"] = (objectMetadata ? objectMetadata["playStoreLink"] : null);
        privateState.playStoreLink = defaultValues ?
            (defaultValues["playStoreLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["playStoreLink"], context) :
                null) :
            null;

        context["field"] = "ipadNativeAppLink";
        context["metadata"] = (objectMetadata ? objectMetadata["ipadNativeAppLink"] : null);
        privateState.ipadNativeAppLink = defaultValues ?
            (defaultValues["ipadNativeAppLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ipadNativeAppLink"], context) :
                null) :
            null;

        context["field"] = "androidTabletNativeAppLink";
        context["metadata"] = (objectMetadata ? objectMetadata["androidTabletNativeAppLink"] : null);
        privateState.androidTabletNativeAppLink = defaultValues ?
            (defaultValues["androidTabletNativeAppLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["androidTabletNativeAppLink"], context) :
                null) :
            null;

        context["field"] = "isLanguageSelectionEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isLanguageSelectionEnabled"] : null);
        privateState.isLanguageSelectionEnabled = defaultValues ?
            (defaultValues["isLanguageSelectionEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isLanguageSelectionEnabled"], context) :
                null) :
            null;

        context["field"] = "isBackEndCurencySymbolEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isBackEndCurencySymbolEnabled"] : null);
        privateState.isBackEndCurencySymbolEnabled = defaultValues ?
            (defaultValues["isBackEndCurencySymbolEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBackEndCurencySymbolEnabled"], context) :
                null) :
            null;

        context["field"] = "isCountryCodeEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isCountryCodeEnabled"] : null);
        privateState.isCountryCodeEnabled = defaultValues ?
            (defaultValues["isCountryCodeEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isCountryCodeEnabled"], context) :
                null) :
            null;

        context["field"] = "isSortCodeVisible";
        context["metadata"] = (objectMetadata ? objectMetadata["isSortCodeVisible"] : null);
        privateState.isSortCodeVisible = defaultValues ?
            (defaultValues["isSortCodeVisible"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isSortCodeVisible"], context) :
                null) :
            null;

        context["field"] = "currenciesSupported";
        context["metadata"] = (objectMetadata ? objectMetadata["currenciesSupported"] : null);
        privateState.currenciesSupported = defaultValues ?
            (defaultValues["currenciesSupported"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currenciesSupported"], context) :
                null) :
            null;

        context["field"] = "isUTCDateFormattingEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isUTCDateFormattingEnabled"] : null);
        privateState.isUTCDateFormattingEnabled = defaultValues ?
            (defaultValues["isUTCDateFormattingEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUTCDateFormattingEnabled"], context) :
                null) :
            null;

        context["field"] = "language";
        context["metadata"] = (objectMetadata ? objectMetadata["language"] : null);
        privateState.language = defaultValues ?
            (defaultValues["language"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["language"], context) :
                null) :
            null;

        context["field"] = "deploymentGeography";
        context["metadata"] = (objectMetadata ? objectMetadata["deploymentGeography"] : null);
        privateState.deploymentGeography = defaultValues ?
            (defaultValues["deploymentGeography"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deploymentGeography"], context) :
                null) :
            null;

        context["field"] = "isBusinessBankingEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isBusinessBankingEnabled"] : null);
        privateState.isBusinessBankingEnabled = defaultValues ?
            (defaultValues["isBusinessBankingEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBusinessBankingEnabled"], context) :
                null) :
            null;

        context["field"] = "isAccountAggregationEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isAccountAggregationEnabled"] : null);
        privateState.isAccountAggregationEnabled = defaultValues ?
            (defaultValues["isAccountAggregationEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAccountAggregationEnabled"], context) :
                null) :
            null;

        context["field"] = "isFeedbackEnabled";
        context["metadata"] = (objectMetadata ? objectMetadata["isFeedbackEnabled"] : null);
        privateState.isFeedbackEnabled = defaultValues ?
            (defaultValues["isFeedbackEnabled"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isFeedbackEnabled"], context) :
                null) :
            null;

        context["field"] = "noOfDaysForRatingFromProfile";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfDaysForRatingFromProfile"] : null);
        privateState.noOfDaysForRatingFromProfile = defaultValues ?
            (defaultValues["noOfDaysForRatingFromProfile"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfDaysForRatingFromProfile"], context) :
                null) :
            null;

        context["field"] = "noOfDaysForRatingFromTransactions";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfDaysForRatingFromTransactions"] : null);
        privateState.noOfDaysForRatingFromTransactions = defaultValues ?
            (defaultValues["noOfDaysForRatingFromTransactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfDaysForRatingFromTransactions"], context) :
                null) :
            null;

        context["field"] = "noOfDaysForAnotherAttemptForRating";
        context["metadata"] = (objectMetadata ? objectMetadata["noOfDaysForAnotherAttemptForRating"] : null);
        privateState.noOfDaysForAnotherAttemptForRating = defaultValues ?
            (defaultValues["noOfDaysForAnotherAttemptForRating"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["noOfDaysForAnotherAttemptForRating"], context) :
                null) :
            null;

        context["field"] = "maxtimesFeedbackperversion";
        context["metadata"] = (objectMetadata ? objectMetadata["maxtimesFeedbackperversion"] : null);
        privateState.maxtimesFeedbackperversion = defaultValues ?
            (defaultValues["maxtimesFeedbackperversion"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maxtimesFeedbackperversion"], context) :
                null) :
            null;

        context["field"] = "majorVersionsForFeedback";
        context["metadata"] = (objectMetadata ? objectMetadata["majorVersionsForFeedback"] : null);
        privateState.majorVersionsForFeedback = defaultValues ?
            (defaultValues["majorVersionsForFeedback"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["majorVersionsForFeedback"], context) :
                null) :
            null;

        context["field"] = "bannerImageURL";
        context["metadata"] = (objectMetadata ? objectMetadata["bannerImageURL"] : null);
        privateState.bannerImageURL = defaultValues ?
            (defaultValues["bannerImageURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bannerImageURL"], context) :
                null) :
            null;

        context["field"] = "desktopBannerImageURL";
        context["metadata"] = (objectMetadata ? objectMetadata["desktopBannerImageURL"] : null);
        privateState.desktopBannerImageURL = defaultValues ?
            (defaultValues["desktopBannerImageURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["desktopBannerImageURL"], context) :
                null) :
            null;

        context["field"] = "mobileBannerImageURL";
        context["metadata"] = (objectMetadata ? objectMetadata["mobileBannerImageURL"] : null);
        privateState.mobileBannerImageURL = defaultValues ?
            (defaultValues["mobileBannerImageURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["mobileBannerImageURL"], context) :
                null) :
            null;

        context["field"] = "viewMoreDBXLink";
        context["metadata"] = (objectMetadata ? objectMetadata["viewMoreDBXLink"] : null);
        privateState.viewMoreDBXLink = defaultValues ?
            (defaultValues["viewMoreDBXLink"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["viewMoreDBXLink"], context) :
                null) :
            null;

        context["field"] = "showAdsPostLogin";
        context["metadata"] = (objectMetadata ? objectMetadata["showAdsPostLogin"] : null);
        privateState.showAdsPostLogin = defaultValues ?
            (defaultValues["showAdsPostLogin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["showAdsPostLogin"], context) :
                null) :
            null;

        context["field"] = "isAlertAccountLevel";
        context["metadata"] = (objectMetadata ? objectMetadata["isAlertAccountLevel"] : null);
        privateState.isAlertAccountLevel = defaultValues ?
            (defaultValues["isAlertAccountLevel"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAlertAccountLevel"], context) :
                null) :
            null;

        context["field"] = "isAlertAccountIDLevel";
        context["metadata"] = (objectMetadata ? objectMetadata["isAlertAccountIDLevel"] : null);
        privateState.isAlertAccountIDLevel = defaultValues ?
            (defaultValues["isAlertAccountIDLevel"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAlertAccountIDLevel"], context) :
                null) :
            null;

        context["field"] = "isAccountTypeLevelAlerts";
        context["metadata"] = (objectMetadata ? objectMetadata["isAccountTypeLevelAlerts"] : null);
        privateState.isAccountTypeLevelAlerts = defaultValues ?
            (defaultValues["isAccountTypeLevelAlerts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isAccountTypeLevelAlerts"], context) :
                null) :
            null;

        context["field"] = "isprofileImageAvailable";
        context["metadata"] = (objectMetadata ? objectMetadata["isprofileImageAvailable"] : null);
        privateState.isprofileImageAvailable = defaultValues ?
            (defaultValues["isprofileImageAvailable"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isprofileImageAvailable"], context) :
                null) :
            null;

        context["field"] = "bwFileTransactionsLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["bwFileTransactionsLimit"] : null);
        privateState.bwFileTransactionsLimit = defaultValues ?
            (defaultValues["bwFileTransactionsLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bwFileTransactionsLimit"], context) :
                null) :
            null;

        context["field"] = "timeZoneOffset";
        context["metadata"] = (objectMetadata ? objectMetadata["timeZoneOffset"] : null);
        privateState.timeZoneOffset = defaultValues ?
            (defaultValues["timeZoneOffset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["timeZoneOffset"], context) :
                null) :
            null;

        context["field"] = "newSettings";
        context["metadata"] = (objectMetadata ? objectMetadata["newSettings"] : null);
        privateState.newSettings = defaultValues ?
            (defaultValues["newSettings"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newSettings"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "AppVersion": {
                get: function() {
                    context["field"] = "AppVersion";
                    context["metadata"] = (objectMetadata ? objectMetadata["AppVersion"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AppVersion, context);
                },
                set: function(val) {
                    setterFunctions['AppVersion'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankName": {
                get: function() {
                    context["field"] = "bankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankName, context);
                },
                set: function(val) {
                    setterFunctions['bankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bannerURL": {
                get: function() {
                    context["field"] = "bannerURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["bannerURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bannerURL, context);
                },
                set: function(val) {
                    setterFunctions['bannerURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "branchType": {
                get: function() {
                    context["field"] = "branchType";
                    context["metadata"] = (objectMetadata ? objectMetadata["branchType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.branchType, context);
                },
                set: function(val) {
                    setterFunctions['branchType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "businessDays": {
                get: function() {
                    context["field"] = "businessDays";
                    context["metadata"] = (objectMetadata ? objectMetadata["businessDays"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.businessDays, context);
                },
                set: function(val) {
                    setterFunctions['businessDays'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currencyCode": {
                get: function() {
                    context["field"] = "currencyCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyCode, context);
                },
                set: function(val) {
                    setterFunctions['currencyCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "distanceUnit": {
                get: function() {
                    context["field"] = "distanceUnit";
                    context["metadata"] = (objectMetadata ? objectMetadata["distanceUnit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.distanceUnit, context);
                },
                set: function(val) {
                    setterFunctions['distanceUnit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errmsg": {
                get: function() {
                    context["field"] = "errmsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errmsg, context);
                },
                set: function(val) {
                    setterFunctions['errmsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "facialLicenseServerUrl": {
                get: function() {
                    context["field"] = "facialLicenseServerUrl";
                    context["metadata"] = (objectMetadata ? objectMetadata["facialLicenseServerUrl"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.facialLicenseServerUrl, context);
                },
                set: function(val) {
                    setterFunctions['facialLicenseServerUrl'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "facialLicenseString": {
                get: function() {
                    context["field"] = "facialLicenseString";
                    context["metadata"] = (objectMetadata ? objectMetadata["facialLicenseString"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.facialLicenseString, context);
                },
                set: function(val) {
                    setterFunctions['facialLicenseString'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isUpdate": {
                get: function() {
                    context["field"] = "isUpdate";
                    context["metadata"] = (objectMetadata ? objectMetadata["isUpdate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isUpdate, context);
                },
                set: function(val) {
                    setterFunctions['isUpdate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isUpdateMandatory": {
                get: function() {
                    context["field"] = "isUpdateMandatory";
                    context["metadata"] = (objectMetadata ? objectMetadata["isUpdateMandatory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isUpdateMandatory, context);
                },
                set: function(val) {
                    setterFunctions['isUpdateMandatory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchaddressLine1": {
                get: function() {
                    context["field"] = "MainBranchaddressLine1";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchaddressLine1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchaddressLine1, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchaddressLine1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchaddressLine2": {
                get: function() {
                    context["field"] = "MainBranchaddressLine2";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchaddressLine2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchaddressLine2, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchaddressLine2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchCity": {
                get: function() {
                    context["field"] = "MainBranchCity";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchCity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchCity, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchCity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchLatitude": {
                get: function() {
                    context["field"] = "MainBranchLatitude";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchLatitude"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchLatitude, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchLatitude'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchLongitude": {
                get: function() {
                    context["field"] = "MainBranchLongitude";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchLongitude"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchLongitude, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchLongitude'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchPhone": {
                get: function() {
                    context["field"] = "MainBranchPhone";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchPhone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchPhone, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchPhone'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchServices": {
                get: function() {
                    context["field"] = "MainBranchServices";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchServices"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchServices, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchServices'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchState": {
                get: function() {
                    context["field"] = "MainBranchState";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchState"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchState, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchState'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchWorkingHours": {
                get: function() {
                    context["field"] = "MainBranchWorkingHours";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchWorkingHours"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchWorkingHours, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchWorkingHours'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchzipCode": {
                get: function() {
                    context["field"] = "MainBranchzipCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchzipCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchzipCode, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchzipCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ocrApiKey": {
                get: function() {
                    context["field"] = "ocrApiKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["ocrApiKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ocrApiKey, context);
                },
                set: function(val) {
                    setterFunctions['ocrApiKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ocrSecretKey": {
                get: function() {
                    context["field"] = "ocrSecretKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["ocrSecretKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ocrSecretKey, context);
                },
                set: function(val) {
                    setterFunctions['ocrSecretKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "OSType": {
                get: function() {
                    context["field"] = "OSType";
                    context["metadata"] = (objectMetadata ? objectMetadata["OSType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.OSType, context);
                },
                set: function(val) {
                    setterFunctions['OSType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "OSversion": {
                get: function() {
                    context["field"] = "OSversion";
                    context["metadata"] = (objectMetadata ? objectMetadata["OSversion"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.OSversion, context);
                },
                set: function(val) {
                    setterFunctions['OSversion'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "versionLink": {
                get: function() {
                    context["field"] = "versionLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["versionLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.versionLink, context);
                },
                set: function(val) {
                    setterFunctions['versionLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "appStoreLink": {
                get: function() {
                    context["field"] = "appStoreLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["appStoreLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.appStoreLink, context);
                },
                set: function(val) {
                    setterFunctions['appStoreLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "playStoreLink": {
                get: function() {
                    context["field"] = "playStoreLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["playStoreLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.playStoreLink, context);
                },
                set: function(val) {
                    setterFunctions['playStoreLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ipadNativeAppLink": {
                get: function() {
                    context["field"] = "ipadNativeAppLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["ipadNativeAppLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ipadNativeAppLink, context);
                },
                set: function(val) {
                    setterFunctions['ipadNativeAppLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "androidTabletNativeAppLink": {
                get: function() {
                    context["field"] = "androidTabletNativeAppLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["androidTabletNativeAppLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.androidTabletNativeAppLink, context);
                },
                set: function(val) {
                    setterFunctions['androidTabletNativeAppLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isLanguageSelectionEnabled": {
                get: function() {
                    context["field"] = "isLanguageSelectionEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isLanguageSelectionEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isLanguageSelectionEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isLanguageSelectionEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isBackEndCurencySymbolEnabled": {
                get: function() {
                    context["field"] = "isBackEndCurencySymbolEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isBackEndCurencySymbolEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isBackEndCurencySymbolEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isBackEndCurencySymbolEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isCountryCodeEnabled": {
                get: function() {
                    context["field"] = "isCountryCodeEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isCountryCodeEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isCountryCodeEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isCountryCodeEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isSortCodeVisible": {
                get: function() {
                    context["field"] = "isSortCodeVisible";
                    context["metadata"] = (objectMetadata ? objectMetadata["isSortCodeVisible"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isSortCodeVisible, context);
                },
                set: function(val) {
                    setterFunctions['isSortCodeVisible'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currenciesSupported": {
                get: function() {
                    context["field"] = "currenciesSupported";
                    context["metadata"] = (objectMetadata ? objectMetadata["currenciesSupported"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currenciesSupported, context);
                },
                set: function(val) {
                    setterFunctions['currenciesSupported'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isUTCDateFormattingEnabled": {
                get: function() {
                    context["field"] = "isUTCDateFormattingEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isUTCDateFormattingEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isUTCDateFormattingEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isUTCDateFormattingEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "language": {
                get: function() {
                    context["field"] = "language";
                    context["metadata"] = (objectMetadata ? objectMetadata["language"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.language, context);
                },
                set: function(val) {
                    setterFunctions['language'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deploymentGeography": {
                get: function() {
                    context["field"] = "deploymentGeography";
                    context["metadata"] = (objectMetadata ? objectMetadata["deploymentGeography"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deploymentGeography, context);
                },
                set: function(val) {
                    setterFunctions['deploymentGeography'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isBusinessBankingEnabled": {
                get: function() {
                    context["field"] = "isBusinessBankingEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isBusinessBankingEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isBusinessBankingEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isBusinessBankingEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isAccountAggregationEnabled": {
                get: function() {
                    context["field"] = "isAccountAggregationEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAccountAggregationEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAccountAggregationEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isAccountAggregationEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isFeedbackEnabled": {
                get: function() {
                    context["field"] = "isFeedbackEnabled";
                    context["metadata"] = (objectMetadata ? objectMetadata["isFeedbackEnabled"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isFeedbackEnabled, context);
                },
                set: function(val) {
                    setterFunctions['isFeedbackEnabled'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfDaysForRatingFromProfile": {
                get: function() {
                    context["field"] = "noOfDaysForRatingFromProfile";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfDaysForRatingFromProfile"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfDaysForRatingFromProfile, context);
                },
                set: function(val) {
                    setterFunctions['noOfDaysForRatingFromProfile'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfDaysForRatingFromTransactions": {
                get: function() {
                    context["field"] = "noOfDaysForRatingFromTransactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfDaysForRatingFromTransactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfDaysForRatingFromTransactions, context);
                },
                set: function(val) {
                    setterFunctions['noOfDaysForRatingFromTransactions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "noOfDaysForAnotherAttemptForRating": {
                get: function() {
                    context["field"] = "noOfDaysForAnotherAttemptForRating";
                    context["metadata"] = (objectMetadata ? objectMetadata["noOfDaysForAnotherAttemptForRating"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.noOfDaysForAnotherAttemptForRating, context);
                },
                set: function(val) {
                    setterFunctions['noOfDaysForAnotherAttemptForRating'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maxtimesFeedbackperversion": {
                get: function() {
                    context["field"] = "maxtimesFeedbackperversion";
                    context["metadata"] = (objectMetadata ? objectMetadata["maxtimesFeedbackperversion"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maxtimesFeedbackperversion, context);
                },
                set: function(val) {
                    setterFunctions['maxtimesFeedbackperversion'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "majorVersionsForFeedback": {
                get: function() {
                    context["field"] = "majorVersionsForFeedback";
                    context["metadata"] = (objectMetadata ? objectMetadata["majorVersionsForFeedback"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.majorVersionsForFeedback, context);
                },
                set: function(val) {
                    setterFunctions['majorVersionsForFeedback'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bannerImageURL": {
                get: function() {
                    context["field"] = "bannerImageURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["bannerImageURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bannerImageURL, context);
                },
                set: function(val) {
                    setterFunctions['bannerImageURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "desktopBannerImageURL": {
                get: function() {
                    context["field"] = "desktopBannerImageURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["desktopBannerImageURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.desktopBannerImageURL, context);
                },
                set: function(val) {
                    setterFunctions['desktopBannerImageURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "mobileBannerImageURL": {
                get: function() {
                    context["field"] = "mobileBannerImageURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["mobileBannerImageURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.mobileBannerImageURL, context);
                },
                set: function(val) {
                    setterFunctions['mobileBannerImageURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "viewMoreDBXLink": {
                get: function() {
                    context["field"] = "viewMoreDBXLink";
                    context["metadata"] = (objectMetadata ? objectMetadata["viewMoreDBXLink"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.viewMoreDBXLink, context);
                },
                set: function(val) {
                    setterFunctions['viewMoreDBXLink'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "showAdsPostLogin": {
                get: function() {
                    context["field"] = "showAdsPostLogin";
                    context["metadata"] = (objectMetadata ? objectMetadata["showAdsPostLogin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.showAdsPostLogin, context);
                },
                set: function(val) {
                    setterFunctions['showAdsPostLogin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isAlertAccountLevel": {
                get: function() {
                    context["field"] = "isAlertAccountLevel";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAlertAccountLevel"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAlertAccountLevel, context);
                },
                set: function(val) {
                    setterFunctions['isAlertAccountLevel'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isAlertAccountIDLevel": {
                get: function() {
                    context["field"] = "isAlertAccountIDLevel";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAlertAccountIDLevel"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAlertAccountIDLevel, context);
                },
                set: function(val) {
                    setterFunctions['isAlertAccountIDLevel'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isAccountTypeLevelAlerts": {
                get: function() {
                    context["field"] = "isAccountTypeLevelAlerts";
                    context["metadata"] = (objectMetadata ? objectMetadata["isAccountTypeLevelAlerts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isAccountTypeLevelAlerts, context);
                },
                set: function(val) {
                    setterFunctions['isAccountTypeLevelAlerts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isprofileImageAvailable": {
                get: function() {
                    context["field"] = "isprofileImageAvailable";
                    context["metadata"] = (objectMetadata ? objectMetadata["isprofileImageAvailable"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isprofileImageAvailable, context);
                },
                set: function(val) {
                    setterFunctions['isprofileImageAvailable'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bwFileTransactionsLimit": {
                get: function() {
                    context["field"] = "bwFileTransactionsLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["bwFileTransactionsLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bwFileTransactionsLimit, context);
                },
                set: function(val) {
                    setterFunctions['bwFileTransactionsLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "timeZoneOffset": {
                get: function() {
                    context["field"] = "timeZoneOffset";
                    context["metadata"] = (objectMetadata ? objectMetadata["timeZoneOffset"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.timeZoneOffset, context);
                },
                set: function(val) {
                    setterFunctions['timeZoneOffset'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "newSettings": {
                get: function() {
                    context["field"] = "newSettings";
                    context["metadata"] = (objectMetadata ? objectMetadata["newSettings"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newSettings, context);
                },
                set: function(val) {
                    setterFunctions['newSettings'].call(this, val, privateState);
                },
                enumerable: true,
            },
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.AppVersion = value ? (value["AppVersion"] ? value["AppVersion"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.bannerURL = value ? (value["bannerURL"] ? value["bannerURL"] : null) : null;
            privateState.branchType = value ? (value["branchType"] ? value["branchType"] : null) : null;
            privateState.businessDays = value ? (value["businessDays"] ? value["businessDays"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.distanceUnit = value ? (value["distanceUnit"] ? value["distanceUnit"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.facialLicenseServerUrl = value ? (value["facialLicenseServerUrl"] ? value["facialLicenseServerUrl"] : null) : null;
            privateState.facialLicenseString = value ? (value["facialLicenseString"] ? value["facialLicenseString"] : null) : null;
            privateState.isUpdate = value ? (value["isUpdate"] ? value["isUpdate"] : null) : null;
            privateState.isUpdateMandatory = value ? (value["isUpdateMandatory"] ? value["isUpdateMandatory"] : null) : null;
            privateState.MainBranchaddressLine1 = value ? (value["MainBranchaddressLine1"] ? value["MainBranchaddressLine1"] : null) : null;
            privateState.MainBranchaddressLine2 = value ? (value["MainBranchaddressLine2"] ? value["MainBranchaddressLine2"] : null) : null;
            privateState.MainBranchCity = value ? (value["MainBranchCity"] ? value["MainBranchCity"] : null) : null;
            privateState.MainBranchLatitude = value ? (value["MainBranchLatitude"] ? value["MainBranchLatitude"] : null) : null;
            privateState.MainBranchLongitude = value ? (value["MainBranchLongitude"] ? value["MainBranchLongitude"] : null) : null;
            privateState.MainBranchPhone = value ? (value["MainBranchPhone"] ? value["MainBranchPhone"] : null) : null;
            privateState.MainBranchServices = value ? (value["MainBranchServices"] ? value["MainBranchServices"] : null) : null;
            privateState.MainBranchState = value ? (value["MainBranchState"] ? value["MainBranchState"] : null) : null;
            privateState.MainBranchWorkingHours = value ? (value["MainBranchWorkingHours"] ? value["MainBranchWorkingHours"] : null) : null;
            privateState.MainBranchzipCode = value ? (value["MainBranchzipCode"] ? value["MainBranchzipCode"] : null) : null;
            privateState.ocrApiKey = value ? (value["ocrApiKey"] ? value["ocrApiKey"] : null) : null;
            privateState.ocrSecretKey = value ? (value["ocrSecretKey"] ? value["ocrSecretKey"] : null) : null;
            privateState.OSType = value ? (value["OSType"] ? value["OSType"] : null) : null;
            privateState.OSversion = value ? (value["OSversion"] ? value["OSversion"] : null) : null;
            privateState.versionLink = value ? (value["versionLink"] ? value["versionLink"] : null) : null;
            privateState.appStoreLink = value ? (value["appStoreLink"] ? value["appStoreLink"] : null) : null;
            privateState.playStoreLink = value ? (value["playStoreLink"] ? value["playStoreLink"] : null) : null;
            privateState.ipadNativeAppLink = value ? (value["ipadNativeAppLink"] ? value["ipadNativeAppLink"] : null) : null;
            privateState.androidTabletNativeAppLink = value ? (value["androidTabletNativeAppLink"] ? value["androidTabletNativeAppLink"] : null) : null;
            privateState.isLanguageSelectionEnabled = value ? (value["isLanguageSelectionEnabled"] ? value["isLanguageSelectionEnabled"] : null) : null;
            privateState.isBackEndCurencySymbolEnabled = value ? (value["isBackEndCurencySymbolEnabled"] ? value["isBackEndCurencySymbolEnabled"] : null) : null;
            privateState.isCountryCodeEnabled = value ? (value["isCountryCodeEnabled"] ? value["isCountryCodeEnabled"] : null) : null;
            privateState.isSortCodeVisible = value ? (value["isSortCodeVisible"] ? value["isSortCodeVisible"] : null) : null;
            privateState.currenciesSupported = value ? (value["currenciesSupported"] ? value["currenciesSupported"] : null) : null;
            privateState.isUTCDateFormattingEnabled = value ? (value["isUTCDateFormattingEnabled"] ? value["isUTCDateFormattingEnabled"] : null) : null;
            privateState.language = value ? (value["language"] ? value["language"] : null) : null;
            privateState.deploymentGeography = value ? (value["deploymentGeography"] ? value["deploymentGeography"] : null) : null;
            privateState.isBusinessBankingEnabled = value ? (value["isBusinessBankingEnabled"] ? value["isBusinessBankingEnabled"] : null) : null;
            privateState.isAccountAggregationEnabled = value ? (value["isAccountAggregationEnabled"] ? value["isAccountAggregationEnabled"] : null) : null;
            privateState.isFeedbackEnabled = value ? (value["isFeedbackEnabled"] ? value["isFeedbackEnabled"] : null) : null;
            privateState.noOfDaysForRatingFromProfile = value ? (value["noOfDaysForRatingFromProfile"] ? value["noOfDaysForRatingFromProfile"] : null) : null;
            privateState.noOfDaysForRatingFromTransactions = value ? (value["noOfDaysForRatingFromTransactions"] ? value["noOfDaysForRatingFromTransactions"] : null) : null;
            privateState.noOfDaysForAnotherAttemptForRating = value ? (value["noOfDaysForAnotherAttemptForRating"] ? value["noOfDaysForAnotherAttemptForRating"] : null) : null;
            privateState.maxtimesFeedbackperversion = value ? (value["maxtimesFeedbackperversion"] ? value["maxtimesFeedbackperversion"] : null) : null;
            privateState.majorVersionsForFeedback = value ? (value["majorVersionsForFeedback"] ? value["majorVersionsForFeedback"] : null) : null;
            privateState.bannerImageURL = value ? (value["bannerImageURL"] ? value["bannerImageURL"] : null) : null;
            privateState.desktopBannerImageURL = value ? (value["desktopBannerImageURL"] ? value["desktopBannerImageURL"] : null) : null;
            privateState.mobileBannerImageURL = value ? (value["mobileBannerImageURL"] ? value["mobileBannerImageURL"] : null) : null;
            privateState.viewMoreDBXLink = value ? (value["viewMoreDBXLink"] ? value["viewMoreDBXLink"] : null) : null;
            privateState.showAdsPostLogin = value ? (value["showAdsPostLogin"] ? value["showAdsPostLogin"] : null) : null;
            privateState.isAlertAccountLevel = value ? (value["isAlertAccountLevel"] ? value["isAlertAccountLevel"] : null) : null;
            privateState.isAlertAccountIDLevel = value ? (value["isAlertAccountIDLevel"] ? value["isAlertAccountIDLevel"] : null) : null;
            privateState.isAccountTypeLevelAlerts = value ? (value["isAccountTypeLevelAlerts"] ? value["isAccountTypeLevelAlerts"] : null) : null;
            privateState.isprofileImageAvailable = value ? (value["isprofileImageAvailable"] ? value["isprofileImageAvailable"] : null) : null;
            privateState.bwFileTransactionsLimit = value ? (value["bwFileTransactionsLimit"] ? value["bwFileTransactionsLimit"] : null) : null;
            privateState.timeZoneOffset = value ? (value["timeZoneOffset"] ? value["timeZoneOffset"] : null) : null;
            privateState.newSettings = value ? (value["newSettings"] ? value["newSettings"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Application);

    //Create new class level validator object
    BaseModel.Validator.call(Application);

    var registerValidatorBackup = Application.registerValidator;

    Application.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Application.isValid(this, propName, val)) {
                    return setterBackup.apply(null, arguments);
                } else {
                    throw Error("Validation failed for " + propName + " : " + val);
                }
            }
            setterFunctions[arguments[0]].changed = true;
        }
        return registerValidatorBackup.apply(null, arguments);
    }

    //Extending Model for custom operations
    //For Operation 'getServerTimeZoneOffset' with service id 'getServerTimeZoneOffset6081'
     Application.getServerTimeZoneOffset = function(params, onCompletion){
        return Application.customVerb('getServerTimeZoneOffset', params, onCompletion);
     };

    var relations = [];

    Application.relations = relations;

    Application.prototype.isValid = function() {
        return Application.isValid(this);
    };

    Application.prototype.objModelName = "Application";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Application.registerProcessors = function(options, successCallback, failureCallback) {

        if(!options) {
            options = {};
        }

        if(options && ((options["preProcessor"] && typeof(options["preProcessor"]) === "function") || !options["preProcessor"])) {
            preProcessorCallback = options["preProcessor"];
        }

        if(options && ((options["postProcessor"] && typeof(options["postProcessor"]) === "function") || !options["postProcessor"])) {
            postProcessorCallback = options["postProcessor"];
        }

        function metaDataSuccess(res) {
            objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
            successCallback();
        }

        function metaDataFailure(err) {
            failureCallback(err);
        }

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Utility", "Application", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Application.clone = function(objectToClone) {
        var clonedObj = new Application();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Application;
});
