/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PFMAccounts", "objectService" : "PFM"};

    var setterFunctions = {
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountType: function(val, state) {
            context["field"] = "accountType";
            context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
            state['accountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableBalance: function(val, state) {
            context["field"] = "availableBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
            state['availableBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availablePoints: function(val, state) {
            context["field"] = "availablePoints";
            context["metadata"] = (objectMetadata ? objectMetadata["availablePoints"] : null);
            state['availablePoints'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditCardNumber: function(val, state) {
            context["field"] = "creditCardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["creditCardNumber"] : null);
            state['creditCardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentBalance: function(val, state) {
            context["field"] = "currentBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
            state['currentBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dueDate: function(val, state) {
            context["field"] = "dueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["dueDate"] : null);
            state['dueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        interestRate: function(val, state) {
            context["field"] = "interestRate";
            context["metadata"] = (objectMetadata ? objectMetadata["interestRate"] : null);
            state['interestRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isPFM: function(val, state) {
            context["field"] = "isPFM";
            context["metadata"] = (objectMetadata ? objectMetadata["isPFM"] : null);
            state['isPFM'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastStatementBalance: function(val, state) {
            context["field"] = "lastStatementBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["lastStatementBalance"] : null);
            state['lastStatementBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maturityDate: function(val, state) {
            context["field"] = "maturityDate";
            context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
            state['maturityDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        minimumDue: function(val, state) {
            context["field"] = "minimumDue";
            context["metadata"] = (objectMetadata ? objectMetadata["minimumDue"] : null);
            state['minimumDue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nickName: function(val, state) {
            context["field"] = "nickName";
            context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
            state['nickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        openingDate: function(val, state) {
            context["field"] = "openingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["openingDate"] : null);
            state['openingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        outstandingBalance: function(val, state) {
            context["field"] = "outstandingBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
            state['outstandingBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentTerm: function(val, state) {
            context["field"] = "paymentTerm";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentTerm"] : null);
            state['paymentTerm'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        principalValue: function(val, state) {
            context["field"] = "principalValue";
            context["metadata"] = (objectMetadata ? objectMetadata["principalValue"] : null);
            state['principalValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supportBillPay: function(val, state) {
            context["field"] = "supportBillPay";
            context["metadata"] = (objectMetadata ? objectMetadata["supportBillPay"] : null);
            state['supportBillPay'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supportDeposit: function(val, state) {
            context["field"] = "supportDeposit";
            context["metadata"] = (objectMetadata ? objectMetadata["supportDeposit"] : null);
            state['supportDeposit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supportTransferFrom: function(val, state) {
            context["field"] = "supportTransferFrom";
            context["metadata"] = (objectMetadata ? objectMetadata["supportTransferFrom"] : null);
            state['supportTransferFrom'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supportTransferTo: function(val, state) {
            context["field"] = "supportTransferTo";
            context["metadata"] = (objectMetadata ? objectMetadata["supportTransferTo"] : null);
            state['supportTransferTo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionLimit: function(val, state) {
            context["field"] = "transactionLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionLimit"] : null);
            state['transactionLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transferLimit: function(val, state) {
            context["field"] = "transferLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["transferLimit"] : null);
            state['transferLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceID: function(val, state) {
            context["field"] = "deviceID";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
            state['deviceID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCreditMonths: function(val, state) {
            context["field"] = "totalCreditMonths";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCreditMonths"] : null);
            state['totalCreditMonths'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalDebitsMonth: function(val, state) {
            context["field"] = "totalDebitsMonth";
            context["metadata"] = (objectMetadata ? objectMetadata["totalDebitsMonth"] : null);
            state['totalDebitsMonth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PFMAccounts(defaultValues) {
        var privateState = {};
        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "accountType";
        context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
        privateState.accountType = defaultValues ?
            (defaultValues["accountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountType"], context) :
                null) :
            null;

        context["field"] = "availableBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
        privateState.availableBalance = defaultValues ?
            (defaultValues["availableBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableBalance"], context) :
                null) :
            null;

        context["field"] = "availablePoints";
        context["metadata"] = (objectMetadata ? objectMetadata["availablePoints"] : null);
        privateState.availablePoints = defaultValues ?
            (defaultValues["availablePoints"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availablePoints"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "creditCardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["creditCardNumber"] : null);
        privateState.creditCardNumber = defaultValues ?
            (defaultValues["creditCardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditCardNumber"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "currentBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
        privateState.currentBalance = defaultValues ?
            (defaultValues["currentBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentBalance"], context) :
                null) :
            null;

        context["field"] = "dueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["dueDate"] : null);
        privateState.dueDate = defaultValues ?
            (defaultValues["dueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dueDate"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "interestRate";
        context["metadata"] = (objectMetadata ? objectMetadata["interestRate"] : null);
        privateState.interestRate = defaultValues ?
            (defaultValues["interestRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["interestRate"], context) :
                null) :
            null;

        context["field"] = "isPFM";
        context["metadata"] = (objectMetadata ? objectMetadata["isPFM"] : null);
        privateState.isPFM = defaultValues ?
            (defaultValues["isPFM"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isPFM"], context) :
                null) :
            null;

        context["field"] = "lastStatementBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["lastStatementBalance"] : null);
        privateState.lastStatementBalance = defaultValues ?
            (defaultValues["lastStatementBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastStatementBalance"], context) :
                null) :
            null;

        context["field"] = "maturityDate";
        context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
        privateState.maturityDate = defaultValues ?
            (defaultValues["maturityDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maturityDate"], context) :
                null) :
            null;

        context["field"] = "minimumDue";
        context["metadata"] = (objectMetadata ? objectMetadata["minimumDue"] : null);
        privateState.minimumDue = defaultValues ?
            (defaultValues["minimumDue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["minimumDue"], context) :
                null) :
            null;

        context["field"] = "nickName";
        context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
        privateState.nickName = defaultValues ?
            (defaultValues["nickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nickName"], context) :
                null) :
            null;

        context["field"] = "openingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["openingDate"] : null);
        privateState.openingDate = defaultValues ?
            (defaultValues["openingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["openingDate"], context) :
                null) :
            null;

        context["field"] = "outstandingBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
        privateState.outstandingBalance = defaultValues ?
            (defaultValues["outstandingBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["outstandingBalance"], context) :
                null) :
            null;

        context["field"] = "paymentTerm";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentTerm"] : null);
        privateState.paymentTerm = defaultValues ?
            (defaultValues["paymentTerm"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentTerm"], context) :
                null) :
            null;

        context["field"] = "principalValue";
        context["metadata"] = (objectMetadata ? objectMetadata["principalValue"] : null);
        privateState.principalValue = defaultValues ?
            (defaultValues["principalValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["principalValue"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "supportBillPay";
        context["metadata"] = (objectMetadata ? objectMetadata["supportBillPay"] : null);
        privateState.supportBillPay = defaultValues ?
            (defaultValues["supportBillPay"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportBillPay"], context) :
                null) :
            null;

        context["field"] = "supportDeposit";
        context["metadata"] = (objectMetadata ? objectMetadata["supportDeposit"] : null);
        privateState.supportDeposit = defaultValues ?
            (defaultValues["supportDeposit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportDeposit"], context) :
                null) :
            null;

        context["field"] = "supportTransferFrom";
        context["metadata"] = (objectMetadata ? objectMetadata["supportTransferFrom"] : null);
        privateState.supportTransferFrom = defaultValues ?
            (defaultValues["supportTransferFrom"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportTransferFrom"], context) :
                null) :
            null;

        context["field"] = "supportTransferTo";
        context["metadata"] = (objectMetadata ? objectMetadata["supportTransferTo"] : null);
        privateState.supportTransferTo = defaultValues ?
            (defaultValues["supportTransferTo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportTransferTo"], context) :
                null) :
            null;

        context["field"] = "transactionLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionLimit"] : null);
        privateState.transactionLimit = defaultValues ?
            (defaultValues["transactionLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionLimit"], context) :
                null) :
            null;

        context["field"] = "transferLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["transferLimit"] : null);
        privateState.transferLimit = defaultValues ?
            (defaultValues["transferLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transferLimit"], context) :
                null) :
            null;

        context["field"] = "deviceID";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
        privateState.deviceID = defaultValues ?
            (defaultValues["deviceID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceID"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "totalCreditMonths";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCreditMonths"] : null);
        privateState.totalCreditMonths = defaultValues ?
            (defaultValues["totalCreditMonths"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCreditMonths"], context) :
                null) :
            null;

        context["field"] = "totalDebitsMonth";
        context["metadata"] = (objectMetadata ? objectMetadata["totalDebitsMonth"] : null);
        privateState.totalDebitsMonth = defaultValues ?
            (defaultValues["totalDebitsMonth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalDebitsMonth"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "accountID": {
                get: function() {
                    context["field"] = "accountID";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountID, context);
                },
                set: function(val) {
                    setterFunctions['accountID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountName": {
                get: function() {
                    context["field"] = "accountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountName, context);
                },
                set: function(val) {
                    setterFunctions['accountName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountType": {
                get: function() {
                    context["field"] = "accountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountType, context);
                },
                set: function(val) {
                    setterFunctions['accountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableBalance": {
                get: function() {
                    context["field"] = "availableBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableBalance, context);
                },
                set: function(val) {
                    setterFunctions['availableBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availablePoints": {
                get: function() {
                    context["field"] = "availablePoints";
                    context["metadata"] = (objectMetadata ? objectMetadata["availablePoints"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availablePoints, context);
                },
                set: function(val) {
                    setterFunctions['availablePoints'].call(this, val, privateState);
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
            "creditCardNumber": {
                get: function() {
                    context["field"] = "creditCardNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditCardNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditCardNumber, context);
                },
                set: function(val) {
                    setterFunctions['creditCardNumber'].call(this, val, privateState);
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
            "currentBalance": {
                get: function() {
                    context["field"] = "currentBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentBalance, context);
                },
                set: function(val) {
                    setterFunctions['currentBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dueDate": {
                get: function() {
                    context["field"] = "dueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["dueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dueDate, context);
                },
                set: function(val) {
                    setterFunctions['dueDate'].call(this, val, privateState);
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
            "interestRate": {
                get: function() {
                    context["field"] = "interestRate";
                    context["metadata"] = (objectMetadata ? objectMetadata["interestRate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.interestRate, context);
                },
                set: function(val) {
                    setterFunctions['interestRate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isPFM": {
                get: function() {
                    context["field"] = "isPFM";
                    context["metadata"] = (objectMetadata ? objectMetadata["isPFM"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isPFM, context);
                },
                set: function(val) {
                    setterFunctions['isPFM'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastStatementBalance": {
                get: function() {
                    context["field"] = "lastStatementBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastStatementBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastStatementBalance, context);
                },
                set: function(val) {
                    setterFunctions['lastStatementBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maturityDate": {
                get: function() {
                    context["field"] = "maturityDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maturityDate, context);
                },
                set: function(val) {
                    setterFunctions['maturityDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "minimumDue": {
                get: function() {
                    context["field"] = "minimumDue";
                    context["metadata"] = (objectMetadata ? objectMetadata["minimumDue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.minimumDue, context);
                },
                set: function(val) {
                    setterFunctions['minimumDue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nickName": {
                get: function() {
                    context["field"] = "nickName";
                    context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nickName, context);
                },
                set: function(val) {
                    setterFunctions['nickName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "openingDate": {
                get: function() {
                    context["field"] = "openingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["openingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.openingDate, context);
                },
                set: function(val) {
                    setterFunctions['openingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "outstandingBalance": {
                get: function() {
                    context["field"] = "outstandingBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.outstandingBalance, context);
                },
                set: function(val) {
                    setterFunctions['outstandingBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentTerm": {
                get: function() {
                    context["field"] = "paymentTerm";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentTerm"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentTerm, context);
                },
                set: function(val) {
                    setterFunctions['paymentTerm'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "principalValue": {
                get: function() {
                    context["field"] = "principalValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["principalValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.principalValue, context);
                },
                set: function(val) {
                    setterFunctions['principalValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "success": {
                get: function() {
                    context["field"] = "success";
                    context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.success, context);
                },
                set: function(val) {
                    setterFunctions['success'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supportBillPay": {
                get: function() {
                    context["field"] = "supportBillPay";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportBillPay"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportBillPay, context);
                },
                set: function(val) {
                    setterFunctions['supportBillPay'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supportDeposit": {
                get: function() {
                    context["field"] = "supportDeposit";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportDeposit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportDeposit, context);
                },
                set: function(val) {
                    setterFunctions['supportDeposit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supportTransferFrom": {
                get: function() {
                    context["field"] = "supportTransferFrom";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportTransferFrom"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportTransferFrom, context);
                },
                set: function(val) {
                    setterFunctions['supportTransferFrom'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supportTransferTo": {
                get: function() {
                    context["field"] = "supportTransferTo";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportTransferTo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportTransferTo, context);
                },
                set: function(val) {
                    setterFunctions['supportTransferTo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionLimit": {
                get: function() {
                    context["field"] = "transactionLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionLimit, context);
                },
                set: function(val) {
                    setterFunctions['transactionLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transferLimit": {
                get: function() {
                    context["field"] = "transferLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["transferLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transferLimit, context);
                },
                set: function(val) {
                    setterFunctions['transferLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceID": {
                get: function() {
                    context["field"] = "deviceID";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceID, context);
                },
                set: function(val) {
                    setterFunctions['deviceID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userName": {
                get: function() {
                    context["field"] = "userName";
                    context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userName, context);
                },
                set: function(val) {
                    setterFunctions['userName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalCreditMonths": {
                get: function() {
                    context["field"] = "totalCreditMonths";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalCreditMonths"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalCreditMonths, context);
                },
                set: function(val) {
                    setterFunctions['totalCreditMonths'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalDebitsMonth": {
                get: function() {
                    context["field"] = "totalDebitsMonth";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalDebitsMonth"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalDebitsMonth, context);
                },
                set: function(val) {
                    setterFunctions['totalDebitsMonth'].call(this, val, privateState);
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
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.availableBalance = value ? (value["availableBalance"] ? value["availableBalance"] : null) : null;
            privateState.availablePoints = value ? (value["availablePoints"] ? value["availablePoints"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.creditCardNumber = value ? (value["creditCardNumber"] ? value["creditCardNumber"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.currentBalance = value ? (value["currentBalance"] ? value["currentBalance"] : null) : null;
            privateState.dueDate = value ? (value["dueDate"] ? value["dueDate"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.interestRate = value ? (value["interestRate"] ? value["interestRate"] : null) : null;
            privateState.isPFM = value ? (value["isPFM"] ? value["isPFM"] : null) : null;
            privateState.lastStatementBalance = value ? (value["lastStatementBalance"] ? value["lastStatementBalance"] : null) : null;
            privateState.maturityDate = value ? (value["maturityDate"] ? value["maturityDate"] : null) : null;
            privateState.minimumDue = value ? (value["minimumDue"] ? value["minimumDue"] : null) : null;
            privateState.nickName = value ? (value["nickName"] ? value["nickName"] : null) : null;
            privateState.openingDate = value ? (value["openingDate"] ? value["openingDate"] : null) : null;
            privateState.outstandingBalance = value ? (value["outstandingBalance"] ? value["outstandingBalance"] : null) : null;
            privateState.paymentTerm = value ? (value["paymentTerm"] ? value["paymentTerm"] : null) : null;
            privateState.principalValue = value ? (value["principalValue"] ? value["principalValue"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.supportBillPay = value ? (value["supportBillPay"] ? value["supportBillPay"] : null) : null;
            privateState.supportDeposit = value ? (value["supportDeposit"] ? value["supportDeposit"] : null) : null;
            privateState.supportTransferFrom = value ? (value["supportTransferFrom"] ? value["supportTransferFrom"] : null) : null;
            privateState.supportTransferTo = value ? (value["supportTransferTo"] ? value["supportTransferTo"] : null) : null;
            privateState.transactionLimit = value ? (value["transactionLimit"] ? value["transactionLimit"] : null) : null;
            privateState.transferLimit = value ? (value["transferLimit"] ? value["transferLimit"] : null) : null;
            privateState.deviceID = value ? (value["deviceID"] ? value["deviceID"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.totalCreditMonths = value ? (value["totalCreditMonths"] ? value["totalCreditMonths"] : null) : null;
            privateState.totalDebitsMonth = value ? (value["totalDebitsMonth"] ? value["totalDebitsMonth"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PFMAccounts);

    //Create new class level validator object
    BaseModel.Validator.call(PFMAccounts);

    var registerValidatorBackup = PFMAccounts.registerValidator;

    PFMAccounts.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PFMAccounts.isValid(this, propName, val)) {
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
    //For Operation 'getPFMAccounts' with service id 'getAccountsPostLogin5807'
     PFMAccounts.getPFMAccounts = function(params, onCompletion){
        return PFMAccounts.customVerb('getPFMAccounts', params, onCompletion);
     };

    var relations = [];

    PFMAccounts.relations = relations;

    PFMAccounts.prototype.isValid = function() {
        return PFMAccounts.isValid(this);
    };

    PFMAccounts.prototype.objModelName = "PFMAccounts";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PFMAccounts.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PFM", "PFMAccounts", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PFMAccounts.clone = function(objectToClone) {
        var clonedObj = new PFMAccounts();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PFMAccounts;
});