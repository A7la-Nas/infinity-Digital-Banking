/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ArrangementDetails", "objectService" : "Holdings"};

    var setterFunctions = {
        accountHolder: function(val, state) {
            context["field"] = "accountHolder";
            context["metadata"] = (objectMetadata ? objectMetadata["accountHolder"] : null);
            state['accountHolder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountli: function(val, state) {
            context["field"] = "accountli";
            context["metadata"] = (objectMetadata ? objectMetadata["accountli"] : null);
            state['accountli'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountPreference: function(val, state) {
            context["field"] = "accountPreference";
            context["metadata"] = (objectMetadata ? objectMetadata["accountPreference"] : null);
            state['accountPreference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        availableCredit: function(val, state) {
            context["field"] = "availableCredit";
            context["metadata"] = (objectMetadata ? objectMetadata["availableCredit"] : null);
            state['availableCredit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        bondInterest: function(val, state) {
            context["field"] = "bondInterest";
            context["metadata"] = (objectMetadata ? objectMetadata["bondInterest"] : null);
            state['bondInterest'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bondInterestLastYear: function(val, state) {
            context["field"] = "bondInterestLastYear";
            context["metadata"] = (objectMetadata ? objectMetadata["bondInterestLastYear"] : null);
            state['bondInterestLastYear'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bsbNum: function(val, state) {
            context["field"] = "bsbNum";
            context["metadata"] = (objectMetadata ? objectMetadata["bsbNum"] : null);
            state['bsbNum'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        closingDate: function(val, state) {
            context["field"] = "closingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["closingDate"] : null);
            state['closingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditCardNumber: function(val, state) {
            context["field"] = "creditCardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["creditCardNumber"] : null);
            state['creditCardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditLimit: function(val, state) {
            context["field"] = "creditLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
            state['creditLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentAmountDue: function(val, state) {
            context["field"] = "currentAmountDue";
            context["metadata"] = (objectMetadata ? objectMetadata["currentAmountDue"] : null);
            state['currentAmountDue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentBalance: function(val, state) {
            context["field"] = "currentBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
            state['currentBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceID: function(val, state) {
            context["field"] = "deviceID";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
            state['deviceID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dividendLastPaidAmount: function(val, state) {
            context["field"] = "dividendLastPaidAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["dividendLastPaidAmount"] : null);
            state['dividendLastPaidAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dividendLastPaidDate: function(val, state) {
            context["field"] = "dividendLastPaidDate";
            context["metadata"] = (objectMetadata ? objectMetadata["dividendLastPaidDate"] : null);
            state['dividendLastPaidDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dividendPaidYTD: function(val, state) {
            context["field"] = "dividendPaidYTD";
            context["metadata"] = (objectMetadata ? objectMetadata["dividendPaidYTD"] : null);
            state['dividendPaidYTD'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dividendRate: function(val, state) {
            context["field"] = "dividendRate";
            context["metadata"] = (objectMetadata ? objectMetadata["dividendRate"] : null);
            state['dividendRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dividendYTD: function(val, state) {
            context["field"] = "dividendYTD";
            context["metadata"] = (objectMetadata ? objectMetadata["dividendYTD"] : null);
            state['dividendYTD'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        eStatementEnable: function(val, state) {
            context["field"] = "eStatementEnable";
            context["metadata"] = (objectMetadata ? objectMetadata["eStatementEnable"] : null);
            state['eStatementEnable'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        favouriteStatus: function(val, state) {
            context["field"] = "favouriteStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["favouriteStatus"] : null);
            state['favouriteStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        interestEarned: function(val, state) {
            context["field"] = "interestEarned";
            context["metadata"] = (objectMetadata ? objectMetadata["interestEarned"] : null);
            state['interestEarned'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        interestPaidLastYear: function(val, state) {
            context["field"] = "interestPaidLastYear";
            context["metadata"] = (objectMetadata ? objectMetadata["interestPaidLastYear"] : null);
            state['interestPaidLastYear'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        interestPaidPreviousYTD: function(val, state) {
            context["field"] = "interestPaidPreviousYTD";
            context["metadata"] = (objectMetadata ? objectMetadata["interestPaidPreviousYTD"] : null);
            state['interestPaidPreviousYTD'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        interestPaidYTD: function(val, state) {
            context["field"] = "interestPaidYTD";
            context["metadata"] = (objectMetadata ? objectMetadata["interestPaidYTD"] : null);
            state['interestPaidYTD'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        interestRate: function(val, state) {
            context["field"] = "interestRate";
            context["metadata"] = (objectMetadata ? objectMetadata["interestRate"] : null);
            state['interestRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isInternationalAccount: function(val, state) {
            context["field"] = "isInternationalAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["isInternationalAccount"] : null);
            state['isInternationalAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isPFM: function(val, state) {
            context["field"] = "isPFM";
            context["metadata"] = (objectMetadata ? objectMetadata["isPFM"] : null);
            state['isPFM'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        jointHolders: function(val, state) {
            context["field"] = "jointHolders";
            context["metadata"] = (objectMetadata ? objectMetadata["jointHolders"] : null);
            state['jointHolders'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastDividendPaidAmount: function(val, state) {
            context["field"] = "lastDividendPaidAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["lastDividendPaidAmount"] : null);
            state['lastDividendPaidAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastDividendPaidDate: function(val, state) {
            context["field"] = "lastDividendPaidDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lastDividendPaidDate"] : null);
            state['lastDividendPaidDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastPaymentAmount: function(val, state) {
            context["field"] = "lastPaymentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentAmount"] : null);
            state['lastPaymentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastPaymentDate: function(val, state) {
            context["field"] = "lastPaymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentDate"] : null);
            state['lastPaymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastStatementBalance: function(val, state) {
            context["field"] = "lastStatementBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["lastStatementBalance"] : null);
            state['lastStatementBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lateFeesDue: function(val, state) {
            context["field"] = "lateFeesDue";
            context["metadata"] = (objectMetadata ? objectMetadata["lateFeesDue"] : null);
            state['lateFeesDue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maturityAmount: function(val, state) {
            context["field"] = "maturityAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["maturityAmount"] : null);
            state['maturityAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maturityDate: function(val, state) {
            context["field"] = "maturityDate";
            context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
            state['maturityDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maturityOption: function(val, state) {
            context["field"] = "maturityOption";
            context["metadata"] = (objectMetadata ? objectMetadata["maturityOption"] : null);
            state['maturityOption'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        originalAmount: function(val, state) {
            context["field"] = "originalAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["originalAmount"] : null);
            state['originalAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        outstandingBalance: function(val, state) {
            context["field"] = "outstandingBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
            state['outstandingBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDue: function(val, state) {
            context["field"] = "paymentDue";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDue"] : null);
            state['paymentDue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentMethod: function(val, state) {
            context["field"] = "paymentMethod";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentMethod"] : null);
            state['paymentMethod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentTerm: function(val, state) {
            context["field"] = "paymentTerm";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentTerm"] : null);
            state['paymentTerm'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payoffAmount: function(val, state) {
            context["field"] = "payoffAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["payoffAmount"] : null);
            state['payoffAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payOffCharge: function(val, state) {
            context["field"] = "payOffCharge";
            context["metadata"] = (objectMetadata ? objectMetadata["payOffCharge"] : null);
            state['payOffCharge'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pendingDeposit: function(val, state) {
            context["field"] = "pendingDeposit";
            context["metadata"] = (objectMetadata ? objectMetadata["pendingDeposit"] : null);
            state['pendingDeposit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pendingWithdrawal: function(val, state) {
            context["field"] = "pendingWithdrawal";
            context["metadata"] = (objectMetadata ? objectMetadata["pendingWithdrawal"] : null);
            state['pendingWithdrawal'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phoneId: function(val, state) {
            context["field"] = "phoneId";
            context["metadata"] = (objectMetadata ? objectMetadata["phoneId"] : null);
            state['phoneId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        previousYearDividend: function(val, state) {
            context["field"] = "previousYearDividend";
            context["metadata"] = (objectMetadata ? objectMetadata["previousYearDividend"] : null);
            state['previousYearDividend'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        previousYearsDividends: function(val, state) {
            context["field"] = "previousYearsDividends";
            context["metadata"] = (objectMetadata ? objectMetadata["previousYearsDividends"] : null);
            state['previousYearsDividends'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        principalBalance: function(val, state) {
            context["field"] = "principalBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["principalBalance"] : null);
            state['principalBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        principalValue: function(val, state) {
            context["field"] = "principalValue";
            context["metadata"] = (objectMetadata ? objectMetadata["principalValue"] : null);
            state['principalValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        regularPaymentAmount: function(val, state) {
            context["field"] = "regularPaymentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["regularPaymentAmount"] : null);
            state['regularPaymentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        routingNumber: function(val, state) {
            context["field"] = "routingNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
            state['routingNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        supportCardlessCash: function(val, state) {
            context["field"] = "supportCardlessCash";
            context["metadata"] = (objectMetadata ? objectMetadata["supportCardlessCash"] : null);
            state['supportCardlessCash'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        swiftCode: function(val, state) {
            context["field"] = "swiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
            state['swiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        unpaidInterest: function(val, state) {
            context["field"] = "unpaidInterest";
            context["metadata"] = (objectMetadata ? objectMetadata["unpaidInterest"] : null);
            state['unpaidInterest'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        email: function(val, state) {
            context["field"] = "email";
            context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
            state['email'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        jointAccountHolder1: function(val, state) {
            context["field"] = "jointAccountHolder1";
            context["metadata"] = (objectMetadata ? objectMetadata["jointAccountHolder1"] : null);
            state['jointAccountHolder1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        jointAccountHolder2: function(val, state) {
            context["field"] = "jointAccountHolder2";
            context["metadata"] = (objectMetadata ? objectMetadata["jointAccountHolder2"] : null);
            state['jointAccountHolder2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankAddress: function(val, state) {
            context["field"] = "bankAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["bankAddress"] : null);
            state['bankAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        intermediaryBankName: function(val, state) {
            context["field"] = "intermediaryBankName";
            context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBankName"] : null);
            state['intermediaryBankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        intermediaryBankAddress: function(val, state) {
            context["field"] = "intermediaryBankAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBankAddress"] : null);
            state['intermediaryBankAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        intermediaryBankSwiftCode: function(val, state) {
            context["field"] = "intermediaryBankSwiftCode";
            context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBankSwiftCode"] : null);
            state['intermediaryBankSwiftCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        StatusDesc: function(val, state) {
            context["field"] = "StatusDesc";
            context["metadata"] = (objectMetadata ? objectMetadata["StatusDesc"] : null);
            state['StatusDesc'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        supportChecks: function(val, state) {
            context["field"] = "supportChecks";
            context["metadata"] = (objectMetadata ? objectMetadata["supportChecks"] : null);
            state['supportChecks'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceName: function(val, state) {
            context["field"] = "serviceName";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
            state['serviceName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productLi: function(val, state) {
            context["field"] = "productLi";
            context["metadata"] = (objectMetadata ? objectMetadata["productLi"] : null);
            state['productLi'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phone: function(val, state) {
            context["field"] = "phone";
            context["metadata"] = (objectMetadata ? objectMetadata["phone"] : null);
            state['phone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountSubType: function(val, state) {
            context["field"] = "accountSubType";
            context["metadata"] = (objectMetadata ? objectMetadata["accountSubType"] : null);
            state['accountSubType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        schemeName: function(val, state) {
            context["field"] = "schemeName";
            context["metadata"] = (objectMetadata ? objectMetadata["schemeName"] : null);
            state['schemeName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        identification: function(val, state) {
            context["field"] = "identification";
            context["metadata"] = (objectMetadata ? objectMetadata["identification"] : null);
            state['identification'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secondaryIdentification: function(val, state) {
            context["field"] = "secondaryIdentification";
            context["metadata"] = (objectMetadata ? objectMetadata["secondaryIdentification"] : null);
            state['secondaryIdentification'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        servicerSchemeName: function(val, state) {
            context["field"] = "servicerSchemeName";
            context["metadata"] = (objectMetadata ? objectMetadata["servicerSchemeName"] : null);
            state['servicerSchemeName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        servicerIdentification: function(val, state) {
            context["field"] = "servicerIdentification";
            context["metadata"] = (objectMetadata ? objectMetadata["servicerIdentification"] : null);
            state['servicerIdentification'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dataCreditDebitIndicator: function(val, state) {
            context["field"] = "dataCreditDebitIndicator";
            context["metadata"] = (objectMetadata ? objectMetadata["dataCreditDebitIndicator"] : null);
            state['dataCreditDebitIndicator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dataType: function(val, state) {
            context["field"] = "dataType";
            context["metadata"] = (objectMetadata ? objectMetadata["dataType"] : null);
            state['dataType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dataDateTime: function(val, state) {
            context["field"] = "dataDateTime";
            context["metadata"] = (objectMetadata ? objectMetadata["dataDateTime"] : null);
            state['dataDateTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dataCreditLineIncluded: function(val, state) {
            context["field"] = "dataCreditLineIncluded";
            context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineIncluded"] : null);
            state['dataCreditLineIncluded'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dataCreditLineType: function(val, state) {
            context["field"] = "dataCreditLineType";
            context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineType"] : null);
            state['dataCreditLineType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dataCreditLineAmount: function(val, state) {
            context["field"] = "dataCreditLineAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineAmount"] : null);
            state['dataCreditLineAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dataCreditLineCurrency: function(val, state) {
            context["field"] = "dataCreditLineCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineCurrency"] : null);
            state['dataCreditLineCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IBAN: function(val, state) {
            context["field"] = "IBAN";
            context["metadata"] = (objectMetadata ? objectMetadata["IBAN"] : null);
            state['IBAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        displayName: function(val, state) {
            context["field"] = "displayName";
            context["metadata"] = (objectMetadata ? objectMetadata["displayName"] : null);
            state['displayName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Account_id: function(val, state) {
            context["field"] = "Account_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Account_id"] : null);
            state['Account_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Organization_Id: function(val, state) {
            context["field"] = "Organization_Id";
            context["metadata"] = (objectMetadata ? objectMetadata["Organization_Id"] : null);
            state['Organization_Id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Account_Type: function(val, state) {
            context["field"] = "Account_Type";
            context["metadata"] = (objectMetadata ? objectMetadata["Account_Type"] : null);
            state['Account_Type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Customer_id: function(val, state) {
            context["field"] = "Customer_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
            state['Customer_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Membership_id: function(val, state) {
            context["field"] = "Membership_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Membership_id"] : null);
            state['Membership_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Taxid: function(val, state) {
            context["field"] = "Taxid";
            context["metadata"] = (objectMetadata ? objectMetadata["Taxid"] : null);
            state['Taxid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CustomerType: function(val, state) {
            context["field"] = "CustomerType";
            context["metadata"] = (objectMetadata ? objectMetadata["CustomerType"] : null);
            state['CustomerType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Ssn: function(val, state) {
            context["field"] = "Ssn";
            context["metadata"] = (objectMetadata ? objectMetadata["Ssn"] : null);
            state['Ssn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status: function(val, state) {
            context["field"] = "Status";
            context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
            state['Status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchString: function(val, state) {
            context["field"] = "searchString";
            context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
            state['searchString'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Ownership: function(val, state) {
            context["field"] = "Ownership";
            context["metadata"] = (objectMetadata ? objectMetadata["Ownership"] : null);
            state['Ownership'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        LastUpdated: function(val, state) {
            context["field"] = "LastUpdated";
            context["metadata"] = (objectMetadata ? objectMetadata["LastUpdated"] : null);
            state['LastUpdated'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ActualUpdatedBY: function(val, state) {
            context["field"] = "ActualUpdatedBY";
            context["metadata"] = (objectMetadata ? objectMetadata["ActualUpdatedBY"] : null);
            state['ActualUpdatedBY'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UpdatedBy: function(val, state) {
            context["field"] = "UpdatedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["UpdatedBy"] : null);
            state['UpdatedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        address: function(val, state) {
            context["field"] = "address";
            context["metadata"] = (objectMetadata ? objectMetadata["address"] : null);
            state['address'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOfBirth: function(val, state) {
            context["field"] = "dateOfBirth";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
            state['dateOfBirth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        firstName: function(val, state) {
            context["field"] = "firstName";
            context["metadata"] = (objectMetadata ? objectMetadata["firstName"] : null);
            state['firstName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastName: function(val, state) {
            context["field"] = "lastName";
            context["metadata"] = (objectMetadata ? objectMetadata["lastName"] : null);
            state['lastName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stateId: function(val, state) {
            context["field"] = "stateId";
            context["metadata"] = (objectMetadata ? objectMetadata["stateId"] : null);
            state['stateId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCurrency: function(val, state) {
            context["field"] = "transactionCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
            state['transactionCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productId: function(val, state) {
            context["field"] = "productId";
            context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
            state['productId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payingAccount: function(val, state) {
            context["field"] = "payingAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["payingAccount"] : null);
            state['payingAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payoutAccount: function(val, state) {
            context["field"] = "payoutAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["payoutAccount"] : null);
            state['payoutAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        duration: function(val, state) {
            context["field"] = "duration";
            context["metadata"] = (objectMetadata ? objectMetadata["duration"] : null);
            state['duration'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isBusinessAccount: function(val, state) {
            context["field"] = "isBusinessAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["isBusinessAccount"] : null);
            state['isBusinessAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        actions: function(val, state) {
            context["field"] = "actions";
            context["metadata"] = (objectMetadata ? objectMetadata["actions"] : null);
            state['actions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceKey: function(val, state) {
            context["field"] = "serviceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
            state['serviceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        membershipId: function(val, state) {
            context["field"] = "membershipId";
            context["metadata"] = (objectMetadata ? objectMetadata["membershipId"] : null);
            state['membershipId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        campaignId: function(val, state) {
            context["field"] = "campaignId";
            context["metadata"] = (objectMetadata ? objectMetadata["campaignId"] : null);
            state['campaignId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyInformation: function(val, state) {
            context["field"] = "companyInformation";
            context["metadata"] = (objectMetadata ? objectMetadata["companyInformation"] : null);
            state['companyInformation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerInformation: function(val, state) {
            context["field"] = "customerInformation";
            context["metadata"] = (objectMetadata ? objectMetadata["customerInformation"] : null);
            state['customerInformation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        externalIndicator: function(val, state) {
            context["field"] = "externalIndicator";
            context["metadata"] = (objectMetadata ? objectMetadata["externalIndicator"] : null);
            state['externalIndicator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        masterServiceKey: function(val, state) {
            context["field"] = "masterServiceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["masterServiceKey"] : null);
            state['masterServiceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isOrganizationAccount: function(val, state) {
            context["field"] = "isOrganizationAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["isOrganizationAccount"] : null);
            state['isOrganizationAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productType: function(val, state) {
            context["field"] = "productType";
            context["metadata"] = (objectMetadata ? objectMetadata["productType"] : null);
            state['productType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        typeId: function(val, state) {
            context["field"] = "typeId";
            context["metadata"] = (objectMetadata ? objectMetadata["typeId"] : null);
            state['typeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MembershipName: function(val, state) {
            context["field"] = "MembershipName";
            context["metadata"] = (objectMetadata ? objectMetadata["MembershipName"] : null);
            state['MembershipName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        term: function(val, state) {
            context["field"] = "term";
            context["metadata"] = (objectMetadata ? objectMetadata["term"] : null);
            state['term'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        categoryId: function(val, state) {
            context["field"] = "categoryId";
            context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
            state['categoryId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        connectionAlertDays: function(val, state) {
            context["field"] = "connectionAlertDays";
            context["metadata"] = (objectMetadata ? objectMetadata["connectionAlertDays"] : null);
            state['connectionAlertDays'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nextPaymentAmount: function(val, state) {
            context["field"] = "nextPaymentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["nextPaymentAmount"] : null);
            state['nextPaymentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiresAt: function(val, state) {
            context["field"] = "expiresAt";
            context["metadata"] = (objectMetadata ? objectMetadata["expiresAt"] : null);
            state['expiresAt'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankCode: function(val, state) {
            context["field"] = "bankCode";
            context["metadata"] = (objectMetadata ? objectMetadata["bankCode"] : null);
            state['bankCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nextPaymentDate: function(val, state) {
            context["field"] = "nextPaymentDate";
            context["metadata"] = (objectMetadata ? objectMetadata["nextPaymentDate"] : null);
            state['nextPaymentDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementId: function(val, state) {
            context["field"] = "arrangementId";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
            state['arrangementId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        processingTime: function(val, state) {
            context["field"] = "processingTime";
            context["metadata"] = (objectMetadata ? objectMetadata["processingTime"] : null);
            state['processingTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        name: function(val, state) {
            context["field"] = "name";
            context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
            state['name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountIds: function(val, state) {
            context["field"] = "accountIds";
            context["metadata"] = (objectMetadata ? objectMetadata["accountIds"] : null);
            state['accountIds'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        logoURL: function(val, state) {
            context["field"] = "logoURL";
            context["metadata"] = (objectMetadata ? objectMetadata["logoURL"] : null);
            state['logoURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        blockedAmount: function(val, state) {
            context["field"] = "blockedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["blockedAmount"] : null);
            state['blockedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        futureInstallmentsCount: function(val, state) {
            context["field"] = "futureInstallmentsCount";
            context["metadata"] = (objectMetadata ? objectMetadata["futureInstallmentsCount"] : null);
            state['futureInstallmentsCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        overDueInstallmentsCount: function(val, state) {
            context["field"] = "overDueInstallmentsCount";
            context["metadata"] = (objectMetadata ? objectMetadata["overDueInstallmentsCount"] : null);
            state['overDueInstallmentsCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paidInstallmentsCount: function(val, state) {
            context["field"] = "paidInstallmentsCount";
            context["metadata"] = (objectMetadata ? objectMetadata["paidInstallmentsCount"] : null);
            state['paidInstallmentsCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        installmentAmount: function(val, state) {
            context["field"] = "installmentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["installmentAmount"] : null);
            state['installmentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rePaymentFrequency: function(val, state) {
            context["field"] = "rePaymentFrequency";
            context["metadata"] = (objectMetadata ? objectMetadata["rePaymentFrequency"] : null);
            state['rePaymentFrequency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sanctionedAmount: function(val, state) {
            context["field"] = "sanctionedAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["sanctionedAmount"] : null);
            state['sanctionedAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerName: function(val, state) {
            context["field"] = "customerName";
            context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
            state['customerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sanctionedDate: function(val, state) {
            context["field"] = "sanctionedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["sanctionedDate"] : null);
            state['sanctionedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accruedInterest: function(val, state) {
            context["field"] = "accruedInterest";
            context["metadata"] = (objectMetadata ? objectMetadata["accruedInterest"] : null);
            state['accruedInterest'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        coreCustomerId: function(val, state) {
            context["field"] = "coreCustomerId";
            context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
            state['coreCustomerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        partyId: function(val, state) {
            context["field"] = "partyId";
            context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
            state['partyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        termInterestDue: function(val, state) {
            context["field"] = "termInterestDue";
            context["metadata"] = (objectMetadata ? objectMetadata["termInterestDue"] : null);
            state['termInterestDue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        interestDueDate: function(val, state) {
            context["field"] = "interestDueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["interestDueDate"] : null);
            state['interestDueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ArrangementDetails(defaultValues) {
        var privateState = {};
        context["field"] = "accountHolder";
        context["metadata"] = (objectMetadata ? objectMetadata["accountHolder"] : null);
        privateState.accountHolder = defaultValues ?
            (defaultValues["accountHolder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountHolder"], context) :
                null) :
            null;

        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "accountli";
        context["metadata"] = (objectMetadata ? objectMetadata["accountli"] : null);
        privateState.accountli = defaultValues ?
            (defaultValues["accountli"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountli"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "accountPreference";
        context["metadata"] = (objectMetadata ? objectMetadata["accountPreference"] : null);
        privateState.accountPreference = defaultValues ?
            (defaultValues["accountPreference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountPreference"], context) :
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

        context["field"] = "availableCredit";
        context["metadata"] = (objectMetadata ? objectMetadata["availableCredit"] : null);
        privateState.availableCredit = defaultValues ?
            (defaultValues["availableCredit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableCredit"], context) :
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

        context["field"] = "bondInterest";
        context["metadata"] = (objectMetadata ? objectMetadata["bondInterest"] : null);
        privateState.bondInterest = defaultValues ?
            (defaultValues["bondInterest"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bondInterest"], context) :
                null) :
            null;

        context["field"] = "bondInterestLastYear";
        context["metadata"] = (objectMetadata ? objectMetadata["bondInterestLastYear"] : null);
        privateState.bondInterestLastYear = defaultValues ?
            (defaultValues["bondInterestLastYear"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bondInterestLastYear"], context) :
                null) :
            null;

        context["field"] = "bsbNum";
        context["metadata"] = (objectMetadata ? objectMetadata["bsbNum"] : null);
        privateState.bsbNum = defaultValues ?
            (defaultValues["bsbNum"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bsbNum"], context) :
                null) :
            null;

        context["field"] = "closingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["closingDate"] : null);
        privateState.closingDate = defaultValues ?
            (defaultValues["closingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["closingDate"], context) :
                null) :
            null;

        context["field"] = "creditCardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["creditCardNumber"] : null);
        privateState.creditCardNumber = defaultValues ?
            (defaultValues["creditCardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditCardNumber"], context) :
                null) :
            null;

        context["field"] = "creditLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
        privateState.creditLimit = defaultValues ?
            (defaultValues["creditLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditLimit"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "currentAmountDue";
        context["metadata"] = (objectMetadata ? objectMetadata["currentAmountDue"] : null);
        privateState.currentAmountDue = defaultValues ?
            (defaultValues["currentAmountDue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentAmountDue"], context) :
                null) :
            null;

        context["field"] = "currentBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
        privateState.currentBalance = defaultValues ?
            (defaultValues["currentBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentBalance"], context) :
                null) :
            null;

        context["field"] = "deviceID";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
        privateState.deviceID = defaultValues ?
            (defaultValues["deviceID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceID"], context) :
                null) :
            null;

        context["field"] = "dividendLastPaidAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["dividendLastPaidAmount"] : null);
        privateState.dividendLastPaidAmount = defaultValues ?
            (defaultValues["dividendLastPaidAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dividendLastPaidAmount"], context) :
                null) :
            null;

        context["field"] = "dividendLastPaidDate";
        context["metadata"] = (objectMetadata ? objectMetadata["dividendLastPaidDate"] : null);
        privateState.dividendLastPaidDate = defaultValues ?
            (defaultValues["dividendLastPaidDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dividendLastPaidDate"], context) :
                null) :
            null;

        context["field"] = "dividendPaidYTD";
        context["metadata"] = (objectMetadata ? objectMetadata["dividendPaidYTD"] : null);
        privateState.dividendPaidYTD = defaultValues ?
            (defaultValues["dividendPaidYTD"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dividendPaidYTD"], context) :
                null) :
            null;

        context["field"] = "dividendRate";
        context["metadata"] = (objectMetadata ? objectMetadata["dividendRate"] : null);
        privateState.dividendRate = defaultValues ?
            (defaultValues["dividendRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dividendRate"], context) :
                null) :
            null;

        context["field"] = "dividendYTD";
        context["metadata"] = (objectMetadata ? objectMetadata["dividendYTD"] : null);
        privateState.dividendYTD = defaultValues ?
            (defaultValues["dividendYTD"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dividendYTD"], context) :
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

        context["field"] = "eStatementEnable";
        context["metadata"] = (objectMetadata ? objectMetadata["eStatementEnable"] : null);
        privateState.eStatementEnable = defaultValues ?
            (defaultValues["eStatementEnable"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["eStatementEnable"], context) :
                null) :
            null;

        context["field"] = "favouriteStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["favouriteStatus"] : null);
        privateState.favouriteStatus = defaultValues ?
            (defaultValues["favouriteStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["favouriteStatus"], context) :
                null) :
            null;

        context["field"] = "interestEarned";
        context["metadata"] = (objectMetadata ? objectMetadata["interestEarned"] : null);
        privateState.interestEarned = defaultValues ?
            (defaultValues["interestEarned"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["interestEarned"], context) :
                null) :
            null;

        context["field"] = "interestPaidLastYear";
        context["metadata"] = (objectMetadata ? objectMetadata["interestPaidLastYear"] : null);
        privateState.interestPaidLastYear = defaultValues ?
            (defaultValues["interestPaidLastYear"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["interestPaidLastYear"], context) :
                null) :
            null;

        context["field"] = "interestPaidPreviousYTD";
        context["metadata"] = (objectMetadata ? objectMetadata["interestPaidPreviousYTD"] : null);
        privateState.interestPaidPreviousYTD = defaultValues ?
            (defaultValues["interestPaidPreviousYTD"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["interestPaidPreviousYTD"], context) :
                null) :
            null;

        context["field"] = "interestPaidYTD";
        context["metadata"] = (objectMetadata ? objectMetadata["interestPaidYTD"] : null);
        privateState.interestPaidYTD = defaultValues ?
            (defaultValues["interestPaidYTD"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["interestPaidYTD"], context) :
                null) :
            null;

        context["field"] = "interestRate";
        context["metadata"] = (objectMetadata ? objectMetadata["interestRate"] : null);
        privateState.interestRate = defaultValues ?
            (defaultValues["interestRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["interestRate"], context) :
                null) :
            null;

        context["field"] = "isInternationalAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["isInternationalAccount"] : null);
        privateState.isInternationalAccount = defaultValues ?
            (defaultValues["isInternationalAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isInternationalAccount"], context) :
                null) :
            null;

        context["field"] = "isPFM";
        context["metadata"] = (objectMetadata ? objectMetadata["isPFM"] : null);
        privateState.isPFM = defaultValues ?
            (defaultValues["isPFM"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isPFM"], context) :
                null) :
            null;

        context["field"] = "jointHolders";
        context["metadata"] = (objectMetadata ? objectMetadata["jointHolders"] : null);
        privateState.jointHolders = defaultValues ?
            (defaultValues["jointHolders"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["jointHolders"], context) :
                null) :
            null;

        context["field"] = "lastDividendPaidAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["lastDividendPaidAmount"] : null);
        privateState.lastDividendPaidAmount = defaultValues ?
            (defaultValues["lastDividendPaidAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastDividendPaidAmount"], context) :
                null) :
            null;

        context["field"] = "lastDividendPaidDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lastDividendPaidDate"] : null);
        privateState.lastDividendPaidDate = defaultValues ?
            (defaultValues["lastDividendPaidDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastDividendPaidDate"], context) :
                null) :
            null;

        context["field"] = "lastPaymentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentAmount"] : null);
        privateState.lastPaymentAmount = defaultValues ?
            (defaultValues["lastPaymentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastPaymentAmount"], context) :
                null) :
            null;

        context["field"] = "lastPaymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentDate"] : null);
        privateState.lastPaymentDate = defaultValues ?
            (defaultValues["lastPaymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastPaymentDate"], context) :
                null) :
            null;

        context["field"] = "lastStatementBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["lastStatementBalance"] : null);
        privateState.lastStatementBalance = defaultValues ?
            (defaultValues["lastStatementBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastStatementBalance"], context) :
                null) :
            null;

        context["field"] = "lateFeesDue";
        context["metadata"] = (objectMetadata ? objectMetadata["lateFeesDue"] : null);
        privateState.lateFeesDue = defaultValues ?
            (defaultValues["lateFeesDue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lateFeesDue"], context) :
                null) :
            null;

        context["field"] = "maturityAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["maturityAmount"] : null);
        privateState.maturityAmount = defaultValues ?
            (defaultValues["maturityAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maturityAmount"], context) :
                null) :
            null;

        context["field"] = "maturityDate";
        context["metadata"] = (objectMetadata ? objectMetadata["maturityDate"] : null);
        privateState.maturityDate = defaultValues ?
            (defaultValues["maturityDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maturityDate"], context) :
                null) :
            null;

        context["field"] = "maturityOption";
        context["metadata"] = (objectMetadata ? objectMetadata["maturityOption"] : null);
        privateState.maturityOption = defaultValues ?
            (defaultValues["maturityOption"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maturityOption"], context) :
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

        context["field"] = "originalAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["originalAmount"] : null);
        privateState.originalAmount = defaultValues ?
            (defaultValues["originalAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["originalAmount"], context) :
                null) :
            null;

        context["field"] = "outstandingBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance"] : null);
        privateState.outstandingBalance = defaultValues ?
            (defaultValues["outstandingBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["outstandingBalance"], context) :
                null) :
            null;

        context["field"] = "paymentDue";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDue"] : null);
        privateState.paymentDue = defaultValues ?
            (defaultValues["paymentDue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDue"], context) :
                null) :
            null;

        context["field"] = "paymentMethod";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentMethod"] : null);
        privateState.paymentMethod = defaultValues ?
            (defaultValues["paymentMethod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentMethod"], context) :
                null) :
            null;

        context["field"] = "paymentTerm";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentTerm"] : null);
        privateState.paymentTerm = defaultValues ?
            (defaultValues["paymentTerm"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentTerm"], context) :
                null) :
            null;

        context["field"] = "payoffAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["payoffAmount"] : null);
        privateState.payoffAmount = defaultValues ?
            (defaultValues["payoffAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payoffAmount"], context) :
                null) :
            null;

        context["field"] = "payOffCharge";
        context["metadata"] = (objectMetadata ? objectMetadata["payOffCharge"] : null);
        privateState.payOffCharge = defaultValues ?
            (defaultValues["payOffCharge"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payOffCharge"], context) :
                null) :
            null;

        context["field"] = "pendingDeposit";
        context["metadata"] = (objectMetadata ? objectMetadata["pendingDeposit"] : null);
        privateState.pendingDeposit = defaultValues ?
            (defaultValues["pendingDeposit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pendingDeposit"], context) :
                null) :
            null;

        context["field"] = "pendingWithdrawal";
        context["metadata"] = (objectMetadata ? objectMetadata["pendingWithdrawal"] : null);
        privateState.pendingWithdrawal = defaultValues ?
            (defaultValues["pendingWithdrawal"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pendingWithdrawal"], context) :
                null) :
            null;

        context["field"] = "phoneId";
        context["metadata"] = (objectMetadata ? objectMetadata["phoneId"] : null);
        privateState.phoneId = defaultValues ?
            (defaultValues["phoneId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phoneId"], context) :
                null) :
            null;

        context["field"] = "previousYearDividend";
        context["metadata"] = (objectMetadata ? objectMetadata["previousYearDividend"] : null);
        privateState.previousYearDividend = defaultValues ?
            (defaultValues["previousYearDividend"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["previousYearDividend"], context) :
                null) :
            null;

        context["field"] = "previousYearsDividends";
        context["metadata"] = (objectMetadata ? objectMetadata["previousYearsDividends"] : null);
        privateState.previousYearsDividends = defaultValues ?
            (defaultValues["previousYearsDividends"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["previousYearsDividends"], context) :
                null) :
            null;

        context["field"] = "principalBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["principalBalance"] : null);
        privateState.principalBalance = defaultValues ?
            (defaultValues["principalBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["principalBalance"], context) :
                null) :
            null;

        context["field"] = "principalValue";
        context["metadata"] = (objectMetadata ? objectMetadata["principalValue"] : null);
        privateState.principalValue = defaultValues ?
            (defaultValues["principalValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["principalValue"], context) :
                null) :
            null;

        context["field"] = "regularPaymentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["regularPaymentAmount"] : null);
        privateState.regularPaymentAmount = defaultValues ?
            (defaultValues["regularPaymentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["regularPaymentAmount"], context) :
                null) :
            null;

        context["field"] = "routingNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
        privateState.routingNumber = defaultValues ?
            (defaultValues["routingNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["routingNumber"], context) :
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

        context["field"] = "supportCardlessCash";
        context["metadata"] = (objectMetadata ? objectMetadata["supportCardlessCash"] : null);
        privateState.supportCardlessCash = defaultValues ?
            (defaultValues["supportCardlessCash"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportCardlessCash"], context) :
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

        context["field"] = "swiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
        privateState.swiftCode = defaultValues ?
            (defaultValues["swiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["swiftCode"], context) :
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

        context["field"] = "unpaidInterest";
        context["metadata"] = (objectMetadata ? objectMetadata["unpaidInterest"] : null);
        privateState.unpaidInterest = defaultValues ?
            (defaultValues["unpaidInterest"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unpaidInterest"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "email";
        context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
        privateState.email = defaultValues ?
            (defaultValues["email"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["email"], context) :
                null) :
            null;

        context["field"] = "jointAccountHolder1";
        context["metadata"] = (objectMetadata ? objectMetadata["jointAccountHolder1"] : null);
        privateState.jointAccountHolder1 = defaultValues ?
            (defaultValues["jointAccountHolder1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["jointAccountHolder1"], context) :
                null) :
            null;

        context["field"] = "jointAccountHolder2";
        context["metadata"] = (objectMetadata ? objectMetadata["jointAccountHolder2"] : null);
        privateState.jointAccountHolder2 = defaultValues ?
            (defaultValues["jointAccountHolder2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["jointAccountHolder2"], context) :
                null) :
            null;

        context["field"] = "bankAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["bankAddress"] : null);
        privateState.bankAddress = defaultValues ?
            (defaultValues["bankAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankAddress"], context) :
                null) :
            null;

        context["field"] = "intermediaryBankName";
        context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBankName"] : null);
        privateState.intermediaryBankName = defaultValues ?
            (defaultValues["intermediaryBankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["intermediaryBankName"], context) :
                null) :
            null;

        context["field"] = "intermediaryBankAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBankAddress"] : null);
        privateState.intermediaryBankAddress = defaultValues ?
            (defaultValues["intermediaryBankAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["intermediaryBankAddress"], context) :
                null) :
            null;

        context["field"] = "intermediaryBankSwiftCode";
        context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBankSwiftCode"] : null);
        privateState.intermediaryBankSwiftCode = defaultValues ?
            (defaultValues["intermediaryBankSwiftCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["intermediaryBankSwiftCode"], context) :
                null) :
            null;

        context["field"] = "StatusDesc";
        context["metadata"] = (objectMetadata ? objectMetadata["StatusDesc"] : null);
        privateState.StatusDesc = defaultValues ?
            (defaultValues["StatusDesc"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["StatusDesc"], context) :
                null) :
            null;

        context["field"] = "supportChecks";
        context["metadata"] = (objectMetadata ? objectMetadata["supportChecks"] : null);
        privateState.supportChecks = defaultValues ?
            (defaultValues["supportChecks"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportChecks"], context) :
                null) :
            null;

        context["field"] = "serviceName";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
        privateState.serviceName = defaultValues ?
            (defaultValues["serviceName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceName"], context) :
                null) :
            null;

        context["field"] = "productLi";
        context["metadata"] = (objectMetadata ? objectMetadata["productLi"] : null);
        privateState.productLi = defaultValues ?
            (defaultValues["productLi"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productLi"], context) :
                null) :
            null;

        context["field"] = "phone";
        context["metadata"] = (objectMetadata ? objectMetadata["phone"] : null);
        privateState.phone = defaultValues ?
            (defaultValues["phone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phone"], context) :
                null) :
            null;

        context["field"] = "accountSubType";
        context["metadata"] = (objectMetadata ? objectMetadata["accountSubType"] : null);
        privateState.accountSubType = defaultValues ?
            (defaultValues["accountSubType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountSubType"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "schemeName";
        context["metadata"] = (objectMetadata ? objectMetadata["schemeName"] : null);
        privateState.schemeName = defaultValues ?
            (defaultValues["schemeName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["schemeName"], context) :
                null) :
            null;

        context["field"] = "identification";
        context["metadata"] = (objectMetadata ? objectMetadata["identification"] : null);
        privateState.identification = defaultValues ?
            (defaultValues["identification"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["identification"], context) :
                null) :
            null;

        context["field"] = "secondaryIdentification";
        context["metadata"] = (objectMetadata ? objectMetadata["secondaryIdentification"] : null);
        privateState.secondaryIdentification = defaultValues ?
            (defaultValues["secondaryIdentification"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secondaryIdentification"], context) :
                null) :
            null;

        context["field"] = "servicerSchemeName";
        context["metadata"] = (objectMetadata ? objectMetadata["servicerSchemeName"] : null);
        privateState.servicerSchemeName = defaultValues ?
            (defaultValues["servicerSchemeName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["servicerSchemeName"], context) :
                null) :
            null;

        context["field"] = "servicerIdentification";
        context["metadata"] = (objectMetadata ? objectMetadata["servicerIdentification"] : null);
        privateState.servicerIdentification = defaultValues ?
            (defaultValues["servicerIdentification"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["servicerIdentification"], context) :
                null) :
            null;

        context["field"] = "dataCreditDebitIndicator";
        context["metadata"] = (objectMetadata ? objectMetadata["dataCreditDebitIndicator"] : null);
        privateState.dataCreditDebitIndicator = defaultValues ?
            (defaultValues["dataCreditDebitIndicator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dataCreditDebitIndicator"], context) :
                null) :
            null;

        context["field"] = "dataType";
        context["metadata"] = (objectMetadata ? objectMetadata["dataType"] : null);
        privateState.dataType = defaultValues ?
            (defaultValues["dataType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dataType"], context) :
                null) :
            null;

        context["field"] = "dataDateTime";
        context["metadata"] = (objectMetadata ? objectMetadata["dataDateTime"] : null);
        privateState.dataDateTime = defaultValues ?
            (defaultValues["dataDateTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dataDateTime"], context) :
                null) :
            null;

        context["field"] = "dataCreditLineIncluded";
        context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineIncluded"] : null);
        privateState.dataCreditLineIncluded = defaultValues ?
            (defaultValues["dataCreditLineIncluded"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dataCreditLineIncluded"], context) :
                null) :
            null;

        context["field"] = "dataCreditLineType";
        context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineType"] : null);
        privateState.dataCreditLineType = defaultValues ?
            (defaultValues["dataCreditLineType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dataCreditLineType"], context) :
                null) :
            null;

        context["field"] = "dataCreditLineAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineAmount"] : null);
        privateState.dataCreditLineAmount = defaultValues ?
            (defaultValues["dataCreditLineAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dataCreditLineAmount"], context) :
                null) :
            null;

        context["field"] = "dataCreditLineCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineCurrency"] : null);
        privateState.dataCreditLineCurrency = defaultValues ?
            (defaultValues["dataCreditLineCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dataCreditLineCurrency"], context) :
                null) :
            null;

        context["field"] = "IBAN";
        context["metadata"] = (objectMetadata ? objectMetadata["IBAN"] : null);
        privateState.IBAN = defaultValues ?
            (defaultValues["IBAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IBAN"], context) :
                null) :
            null;

        context["field"] = "displayName";
        context["metadata"] = (objectMetadata ? objectMetadata["displayName"] : null);
        privateState.displayName = defaultValues ?
            (defaultValues["displayName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["displayName"], context) :
                null) :
            null;

        context["field"] = "Account_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Account_id"] : null);
        privateState.Account_id = defaultValues ?
            (defaultValues["Account_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Account_id"], context) :
                null) :
            null;

        context["field"] = "Organization_Id";
        context["metadata"] = (objectMetadata ? objectMetadata["Organization_Id"] : null);
        privateState.Organization_Id = defaultValues ?
            (defaultValues["Organization_Id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Organization_Id"], context) :
                null) :
            null;

        context["field"] = "Account_Type";
        context["metadata"] = (objectMetadata ? objectMetadata["Account_Type"] : null);
        privateState.Account_Type = defaultValues ?
            (defaultValues["Account_Type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Account_Type"], context) :
                null) :
            null;

        context["field"] = "Customer_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
        privateState.Customer_id = defaultValues ?
            (defaultValues["Customer_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Customer_id"], context) :
                null) :
            null;

        context["field"] = "Membership_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Membership_id"] : null);
        privateState.Membership_id = defaultValues ?
            (defaultValues["Membership_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Membership_id"], context) :
                null) :
            null;

        context["field"] = "Taxid";
        context["metadata"] = (objectMetadata ? objectMetadata["Taxid"] : null);
        privateState.Taxid = defaultValues ?
            (defaultValues["Taxid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Taxid"], context) :
                null) :
            null;

        context["field"] = "CustomerType";
        context["metadata"] = (objectMetadata ? objectMetadata["CustomerType"] : null);
        privateState.CustomerType = defaultValues ?
            (defaultValues["CustomerType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CustomerType"], context) :
                null) :
            null;

        context["field"] = "Ssn";
        context["metadata"] = (objectMetadata ? objectMetadata["Ssn"] : null);
        privateState.Ssn = defaultValues ?
            (defaultValues["Ssn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Ssn"], context) :
                null) :
            null;

        context["field"] = "Status";
        context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
        privateState.Status = defaultValues ?
            (defaultValues["Status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status"], context) :
                null) :
            null;

        context["field"] = "searchString";
        context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
        privateState.searchString = defaultValues ?
            (defaultValues["searchString"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchString"], context) :
                null) :
            null;

        context["field"] = "Ownership";
        context["metadata"] = (objectMetadata ? objectMetadata["Ownership"] : null);
        privateState.Ownership = defaultValues ?
            (defaultValues["Ownership"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Ownership"], context) :
                null) :
            null;

        context["field"] = "LastUpdated";
        context["metadata"] = (objectMetadata ? objectMetadata["LastUpdated"] : null);
        privateState.LastUpdated = defaultValues ?
            (defaultValues["LastUpdated"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["LastUpdated"], context) :
                null) :
            null;

        context["field"] = "ActualUpdatedBY";
        context["metadata"] = (objectMetadata ? objectMetadata["ActualUpdatedBY"] : null);
        privateState.ActualUpdatedBY = defaultValues ?
            (defaultValues["ActualUpdatedBY"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ActualUpdatedBY"], context) :
                null) :
            null;

        context["field"] = "UpdatedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["UpdatedBy"] : null);
        privateState.UpdatedBy = defaultValues ?
            (defaultValues["UpdatedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UpdatedBy"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "address";
        context["metadata"] = (objectMetadata ? objectMetadata["address"] : null);
        privateState.address = defaultValues ?
            (defaultValues["address"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["address"], context) :
                null) :
            null;

        context["field"] = "dateOfBirth";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
        privateState.dateOfBirth = defaultValues ?
            (defaultValues["dateOfBirth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOfBirth"], context) :
                null) :
            null;

        context["field"] = "firstName";
        context["metadata"] = (objectMetadata ? objectMetadata["firstName"] : null);
        privateState.firstName = defaultValues ?
            (defaultValues["firstName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["firstName"], context) :
                null) :
            null;

        context["field"] = "lastName";
        context["metadata"] = (objectMetadata ? objectMetadata["lastName"] : null);
        privateState.lastName = defaultValues ?
            (defaultValues["lastName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastName"], context) :
                null) :
            null;

        context["field"] = "stateId";
        context["metadata"] = (objectMetadata ? objectMetadata["stateId"] : null);
        privateState.stateId = defaultValues ?
            (defaultValues["stateId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stateId"], context) :
                null) :
            null;

        context["field"] = "transactionCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
        privateState.transactionCurrency = defaultValues ?
            (defaultValues["transactionCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrency"], context) :
                null) :
            null;

        context["field"] = "productId";
        context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
        privateState.productId = defaultValues ?
            (defaultValues["productId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productId"], context) :
                null) :
            null;

        context["field"] = "payingAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["payingAccount"] : null);
        privateState.payingAccount = defaultValues ?
            (defaultValues["payingAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payingAccount"], context) :
                null) :
            null;

        context["field"] = "payoutAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["payoutAccount"] : null);
        privateState.payoutAccount = defaultValues ?
            (defaultValues["payoutAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payoutAccount"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "duration";
        context["metadata"] = (objectMetadata ? objectMetadata["duration"] : null);
        privateState.duration = defaultValues ?
            (defaultValues["duration"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["duration"], context) :
                null) :
            null;

        context["field"] = "isBusinessAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["isBusinessAccount"] : null);
        privateState.isBusinessAccount = defaultValues ?
            (defaultValues["isBusinessAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isBusinessAccount"], context) :
                null) :
            null;

        context["field"] = "actions";
        context["metadata"] = (objectMetadata ? objectMetadata["actions"] : null);
        privateState.actions = defaultValues ?
            (defaultValues["actions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["actions"], context) :
                null) :
            null;

        context["field"] = "serviceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
        privateState.serviceKey = defaultValues ?
            (defaultValues["serviceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceKey"], context) :
                null) :
            null;

        context["field"] = "membershipId";
        context["metadata"] = (objectMetadata ? objectMetadata["membershipId"] : null);
        privateState.membershipId = defaultValues ?
            (defaultValues["membershipId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["membershipId"], context) :
                null) :
            null;

        context["field"] = "campaignId";
        context["metadata"] = (objectMetadata ? objectMetadata["campaignId"] : null);
        privateState.campaignId = defaultValues ?
            (defaultValues["campaignId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["campaignId"], context) :
                null) :
            null;

        context["field"] = "companyInformation";
        context["metadata"] = (objectMetadata ? objectMetadata["companyInformation"] : null);
        privateState.companyInformation = defaultValues ?
            (defaultValues["companyInformation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyInformation"], context) :
                null) :
            null;

        context["field"] = "customerInformation";
        context["metadata"] = (objectMetadata ? objectMetadata["customerInformation"] : null);
        privateState.customerInformation = defaultValues ?
            (defaultValues["customerInformation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerInformation"], context) :
                null) :
            null;

        context["field"] = "externalIndicator";
        context["metadata"] = (objectMetadata ? objectMetadata["externalIndicator"] : null);
        privateState.externalIndicator = defaultValues ?
            (defaultValues["externalIndicator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["externalIndicator"], context) :
                null) :
            null;

        context["field"] = "masterServiceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["masterServiceKey"] : null);
        privateState.masterServiceKey = defaultValues ?
            (defaultValues["masterServiceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["masterServiceKey"], context) :
                null) :
            null;

        context["field"] = "isOrganizationAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["isOrganizationAccount"] : null);
        privateState.isOrganizationAccount = defaultValues ?
            (defaultValues["isOrganizationAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isOrganizationAccount"], context) :
                null) :
            null;

        context["field"] = "productType";
        context["metadata"] = (objectMetadata ? objectMetadata["productType"] : null);
        privateState.productType = defaultValues ?
            (defaultValues["productType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productType"], context) :
                null) :
            null;

        context["field"] = "typeId";
        context["metadata"] = (objectMetadata ? objectMetadata["typeId"] : null);
        privateState.typeId = defaultValues ?
            (defaultValues["typeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["typeId"], context) :
                null) :
            null;

        context["field"] = "MembershipName";
        context["metadata"] = (objectMetadata ? objectMetadata["MembershipName"] : null);
        privateState.MembershipName = defaultValues ?
            (defaultValues["MembershipName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MembershipName"], context) :
                null) :
            null;

        context["field"] = "term";
        context["metadata"] = (objectMetadata ? objectMetadata["term"] : null);
        privateState.term = defaultValues ?
            (defaultValues["term"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["term"], context) :
                null) :
            null;

        context["field"] = "categoryId";
        context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
        privateState.categoryId = defaultValues ?
            (defaultValues["categoryId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["categoryId"], context) :
                null) :
            null;

        context["field"] = "connectionAlertDays";
        context["metadata"] = (objectMetadata ? objectMetadata["connectionAlertDays"] : null);
        privateState.connectionAlertDays = defaultValues ?
            (defaultValues["connectionAlertDays"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["connectionAlertDays"], context) :
                null) :
            null;

        context["field"] = "nextPaymentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["nextPaymentAmount"] : null);
        privateState.nextPaymentAmount = defaultValues ?
            (defaultValues["nextPaymentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nextPaymentAmount"], context) :
                null) :
            null;

        context["field"] = "expiresAt";
        context["metadata"] = (objectMetadata ? objectMetadata["expiresAt"] : null);
        privateState.expiresAt = defaultValues ?
            (defaultValues["expiresAt"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiresAt"], context) :
                null) :
            null;

        context["field"] = "bankCode";
        context["metadata"] = (objectMetadata ? objectMetadata["bankCode"] : null);
        privateState.bankCode = defaultValues ?
            (defaultValues["bankCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankCode"], context) :
                null) :
            null;

        context["field"] = "nextPaymentDate";
        context["metadata"] = (objectMetadata ? objectMetadata["nextPaymentDate"] : null);
        privateState.nextPaymentDate = defaultValues ?
            (defaultValues["nextPaymentDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nextPaymentDate"], context) :
                null) :
            null;

        context["field"] = "arrangementId";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
        privateState.arrangementId = defaultValues ?
            (defaultValues["arrangementId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementId"], context) :
                null) :
            null;

        context["field"] = "processingTime";
        context["metadata"] = (objectMetadata ? objectMetadata["processingTime"] : null);
        privateState.processingTime = defaultValues ?
            (defaultValues["processingTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["processingTime"], context) :
                null) :
            null;

        context["field"] = "name";
        context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
        privateState.name = defaultValues ?
            (defaultValues["name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["name"], context) :
                null) :
            null;

        context["field"] = "accountIds";
        context["metadata"] = (objectMetadata ? objectMetadata["accountIds"] : null);
        privateState.accountIds = defaultValues ?
            (defaultValues["accountIds"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountIds"], context) :
                null) :
            null;

        context["field"] = "logoURL";
        context["metadata"] = (objectMetadata ? objectMetadata["logoURL"] : null);
        privateState.logoURL = defaultValues ?
            (defaultValues["logoURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["logoURL"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "blockedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["blockedAmount"] : null);
        privateState.blockedAmount = defaultValues ?
            (defaultValues["blockedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["blockedAmount"], context) :
                null) :
            null;

        context["field"] = "futureInstallmentsCount";
        context["metadata"] = (objectMetadata ? objectMetadata["futureInstallmentsCount"] : null);
        privateState.futureInstallmentsCount = defaultValues ?
            (defaultValues["futureInstallmentsCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["futureInstallmentsCount"], context) :
                null) :
            null;

        context["field"] = "overDueInstallmentsCount";
        context["metadata"] = (objectMetadata ? objectMetadata["overDueInstallmentsCount"] : null);
        privateState.overDueInstallmentsCount = defaultValues ?
            (defaultValues["overDueInstallmentsCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["overDueInstallmentsCount"], context) :
                null) :
            null;

        context["field"] = "paidInstallmentsCount";
        context["metadata"] = (objectMetadata ? objectMetadata["paidInstallmentsCount"] : null);
        privateState.paidInstallmentsCount = defaultValues ?
            (defaultValues["paidInstallmentsCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paidInstallmentsCount"], context) :
                null) :
            null;

        context["field"] = "installmentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["installmentAmount"] : null);
        privateState.installmentAmount = defaultValues ?
            (defaultValues["installmentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["installmentAmount"], context) :
                null) :
            null;

        context["field"] = "rePaymentFrequency";
        context["metadata"] = (objectMetadata ? objectMetadata["rePaymentFrequency"] : null);
        privateState.rePaymentFrequency = defaultValues ?
            (defaultValues["rePaymentFrequency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rePaymentFrequency"], context) :
                null) :
            null;

        context["field"] = "sanctionedAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["sanctionedAmount"] : null);
        privateState.sanctionedAmount = defaultValues ?
            (defaultValues["sanctionedAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sanctionedAmount"], context) :
                null) :
            null;

        context["field"] = "customerName";
        context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
        privateState.customerName = defaultValues ?
            (defaultValues["customerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerName"], context) :
                null) :
            null;

        context["field"] = "sanctionedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["sanctionedDate"] : null);
        privateState.sanctionedDate = defaultValues ?
            (defaultValues["sanctionedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sanctionedDate"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
                null) :
            null;

        context["field"] = "accruedInterest";
        context["metadata"] = (objectMetadata ? objectMetadata["accruedInterest"] : null);
        privateState.accruedInterest = defaultValues ?
            (defaultValues["accruedInterest"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accruedInterest"], context) :
                null) :
            null;

        context["field"] = "coreCustomerId";
        context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
        privateState.coreCustomerId = defaultValues ?
            (defaultValues["coreCustomerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["coreCustomerId"], context) :
                null) :
            null;

        context["field"] = "partyId";
        context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
        privateState.partyId = defaultValues ?
            (defaultValues["partyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["partyId"], context) :
                null) :
            null;

        context["field"] = "termInterestDue";
        context["metadata"] = (objectMetadata ? objectMetadata["termInterestDue"] : null);
        privateState.termInterestDue = defaultValues ?
            (defaultValues["termInterestDue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["termInterestDue"], context) :
                null) :
            null;

        context["field"] = "interestDueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["interestDueDate"] : null);
        privateState.interestDueDate = defaultValues ?
            (defaultValues["interestDueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["interestDueDate"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "accountHolder": {
                get: function() {
                    context["field"] = "accountHolder";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountHolder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountHolder, context);
                },
                set: function(val) {
                    setterFunctions['accountHolder'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "accountli": {
                get: function() {
                    context["field"] = "accountli";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountli"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountli, context);
                },
                set: function(val) {
                    setterFunctions['accountli'].call(this, val, privateState);
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
            "accountPreference": {
                get: function() {
                    context["field"] = "accountPreference";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountPreference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountPreference, context);
                },
                set: function(val) {
                    setterFunctions['accountPreference'].call(this, val, privateState);
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
            "availableCredit": {
                get: function() {
                    context["field"] = "availableCredit";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableCredit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableCredit, context);
                },
                set: function(val) {
                    setterFunctions['availableCredit'].call(this, val, privateState);
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
            "bondInterest": {
                get: function() {
                    context["field"] = "bondInterest";
                    context["metadata"] = (objectMetadata ? objectMetadata["bondInterest"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bondInterest, context);
                },
                set: function(val) {
                    setterFunctions['bondInterest'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bondInterestLastYear": {
                get: function() {
                    context["field"] = "bondInterestLastYear";
                    context["metadata"] = (objectMetadata ? objectMetadata["bondInterestLastYear"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bondInterestLastYear, context);
                },
                set: function(val) {
                    setterFunctions['bondInterestLastYear'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bsbNum": {
                get: function() {
                    context["field"] = "bsbNum";
                    context["metadata"] = (objectMetadata ? objectMetadata["bsbNum"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bsbNum, context);
                },
                set: function(val) {
                    setterFunctions['bsbNum'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "closingDate": {
                get: function() {
                    context["field"] = "closingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["closingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.closingDate, context);
                },
                set: function(val) {
                    setterFunctions['closingDate'].call(this, val, privateState);
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
            "creditLimit": {
                get: function() {
                    context["field"] = "creditLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditLimit, context);
                },
                set: function(val) {
                    setterFunctions['creditLimit'].call(this, val, privateState);
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
            "currentAmountDue": {
                get: function() {
                    context["field"] = "currentAmountDue";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentAmountDue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentAmountDue, context);
                },
                set: function(val) {
                    setterFunctions['currentAmountDue'].call(this, val, privateState);
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
            "dividendLastPaidAmount": {
                get: function() {
                    context["field"] = "dividendLastPaidAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["dividendLastPaidAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dividendLastPaidAmount, context);
                },
                set: function(val) {
                    setterFunctions['dividendLastPaidAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dividendLastPaidDate": {
                get: function() {
                    context["field"] = "dividendLastPaidDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["dividendLastPaidDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dividendLastPaidDate, context);
                },
                set: function(val) {
                    setterFunctions['dividendLastPaidDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dividendPaidYTD": {
                get: function() {
                    context["field"] = "dividendPaidYTD";
                    context["metadata"] = (objectMetadata ? objectMetadata["dividendPaidYTD"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dividendPaidYTD, context);
                },
                set: function(val) {
                    setterFunctions['dividendPaidYTD'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dividendRate": {
                get: function() {
                    context["field"] = "dividendRate";
                    context["metadata"] = (objectMetadata ? objectMetadata["dividendRate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dividendRate, context);
                },
                set: function(val) {
                    setterFunctions['dividendRate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dividendYTD": {
                get: function() {
                    context["field"] = "dividendYTD";
                    context["metadata"] = (objectMetadata ? objectMetadata["dividendYTD"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dividendYTD, context);
                },
                set: function(val) {
                    setterFunctions['dividendYTD'].call(this, val, privateState);
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
            "eStatementEnable": {
                get: function() {
                    context["field"] = "eStatementEnable";
                    context["metadata"] = (objectMetadata ? objectMetadata["eStatementEnable"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.eStatementEnable, context);
                },
                set: function(val) {
                    setterFunctions['eStatementEnable'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "favouriteStatus": {
                get: function() {
                    context["field"] = "favouriteStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["favouriteStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.favouriteStatus, context);
                },
                set: function(val) {
                    setterFunctions['favouriteStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "interestEarned": {
                get: function() {
                    context["field"] = "interestEarned";
                    context["metadata"] = (objectMetadata ? objectMetadata["interestEarned"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.interestEarned, context);
                },
                set: function(val) {
                    setterFunctions['interestEarned'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "interestPaidLastYear": {
                get: function() {
                    context["field"] = "interestPaidLastYear";
                    context["metadata"] = (objectMetadata ? objectMetadata["interestPaidLastYear"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.interestPaidLastYear, context);
                },
                set: function(val) {
                    setterFunctions['interestPaidLastYear'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "interestPaidPreviousYTD": {
                get: function() {
                    context["field"] = "interestPaidPreviousYTD";
                    context["metadata"] = (objectMetadata ? objectMetadata["interestPaidPreviousYTD"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.interestPaidPreviousYTD, context);
                },
                set: function(val) {
                    setterFunctions['interestPaidPreviousYTD'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "interestPaidYTD": {
                get: function() {
                    context["field"] = "interestPaidYTD";
                    context["metadata"] = (objectMetadata ? objectMetadata["interestPaidYTD"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.interestPaidYTD, context);
                },
                set: function(val) {
                    setterFunctions['interestPaidYTD'].call(this, val, privateState);
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
            "isInternationalAccount": {
                get: function() {
                    context["field"] = "isInternationalAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["isInternationalAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isInternationalAccount, context);
                },
                set: function(val) {
                    setterFunctions['isInternationalAccount'].call(this, val, privateState);
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
            "jointHolders": {
                get: function() {
                    context["field"] = "jointHolders";
                    context["metadata"] = (objectMetadata ? objectMetadata["jointHolders"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.jointHolders, context);
                },
                set: function(val) {
                    setterFunctions['jointHolders'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastDividendPaidAmount": {
                get: function() {
                    context["field"] = "lastDividendPaidAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastDividendPaidAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastDividendPaidAmount, context);
                },
                set: function(val) {
                    setterFunctions['lastDividendPaidAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastDividendPaidDate": {
                get: function() {
                    context["field"] = "lastDividendPaidDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastDividendPaidDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastDividendPaidDate, context);
                },
                set: function(val) {
                    setterFunctions['lastDividendPaidDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastPaymentAmount": {
                get: function() {
                    context["field"] = "lastPaymentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastPaymentAmount, context);
                },
                set: function(val) {
                    setterFunctions['lastPaymentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastPaymentDate": {
                get: function() {
                    context["field"] = "lastPaymentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastPaymentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastPaymentDate, context);
                },
                set: function(val) {
                    setterFunctions['lastPaymentDate'].call(this, val, privateState);
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
            "lateFeesDue": {
                get: function() {
                    context["field"] = "lateFeesDue";
                    context["metadata"] = (objectMetadata ? objectMetadata["lateFeesDue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lateFeesDue, context);
                },
                set: function(val) {
                    setterFunctions['lateFeesDue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maturityAmount": {
                get: function() {
                    context["field"] = "maturityAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["maturityAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maturityAmount, context);
                },
                set: function(val) {
                    setterFunctions['maturityAmount'].call(this, val, privateState);
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
            "maturityOption": {
                get: function() {
                    context["field"] = "maturityOption";
                    context["metadata"] = (objectMetadata ? objectMetadata["maturityOption"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maturityOption, context);
                },
                set: function(val) {
                    setterFunctions['maturityOption'].call(this, val, privateState);
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
            "originalAmount": {
                get: function() {
                    context["field"] = "originalAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["originalAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.originalAmount, context);
                },
                set: function(val) {
                    setterFunctions['originalAmount'].call(this, val, privateState);
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
            "paymentDue": {
                get: function() {
                    context["field"] = "paymentDue";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentDue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentDue, context);
                },
                set: function(val) {
                    setterFunctions['paymentDue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentMethod": {
                get: function() {
                    context["field"] = "paymentMethod";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentMethod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentMethod, context);
                },
                set: function(val) {
                    setterFunctions['paymentMethod'].call(this, val, privateState);
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
            "payoffAmount": {
                get: function() {
                    context["field"] = "payoffAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["payoffAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payoffAmount, context);
                },
                set: function(val) {
                    setterFunctions['payoffAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payOffCharge": {
                get: function() {
                    context["field"] = "payOffCharge";
                    context["metadata"] = (objectMetadata ? objectMetadata["payOffCharge"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payOffCharge, context);
                },
                set: function(val) {
                    setterFunctions['payOffCharge'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pendingDeposit": {
                get: function() {
                    context["field"] = "pendingDeposit";
                    context["metadata"] = (objectMetadata ? objectMetadata["pendingDeposit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pendingDeposit, context);
                },
                set: function(val) {
                    setterFunctions['pendingDeposit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pendingWithdrawal": {
                get: function() {
                    context["field"] = "pendingWithdrawal";
                    context["metadata"] = (objectMetadata ? objectMetadata["pendingWithdrawal"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pendingWithdrawal, context);
                },
                set: function(val) {
                    setterFunctions['pendingWithdrawal'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "phoneId": {
                get: function() {
                    context["field"] = "phoneId";
                    context["metadata"] = (objectMetadata ? objectMetadata["phoneId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phoneId, context);
                },
                set: function(val) {
                    setterFunctions['phoneId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "previousYearDividend": {
                get: function() {
                    context["field"] = "previousYearDividend";
                    context["metadata"] = (objectMetadata ? objectMetadata["previousYearDividend"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.previousYearDividend, context);
                },
                set: function(val) {
                    setterFunctions['previousYearDividend'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "previousYearsDividends": {
                get: function() {
                    context["field"] = "previousYearsDividends";
                    context["metadata"] = (objectMetadata ? objectMetadata["previousYearsDividends"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.previousYearsDividends, context);
                },
                set: function(val) {
                    setterFunctions['previousYearsDividends'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "principalBalance": {
                get: function() {
                    context["field"] = "principalBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["principalBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.principalBalance, context);
                },
                set: function(val) {
                    setterFunctions['principalBalance'].call(this, val, privateState);
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
            "regularPaymentAmount": {
                get: function() {
                    context["field"] = "regularPaymentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["regularPaymentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.regularPaymentAmount, context);
                },
                set: function(val) {
                    setterFunctions['regularPaymentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "routingNumber": {
                get: function() {
                    context["field"] = "routingNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["routingNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.routingNumber, context);
                },
                set: function(val) {
                    setterFunctions['routingNumber'].call(this, val, privateState);
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
            "supportCardlessCash": {
                get: function() {
                    context["field"] = "supportCardlessCash";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportCardlessCash"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportCardlessCash, context);
                },
                set: function(val) {
                    setterFunctions['supportCardlessCash'].call(this, val, privateState);
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
            "swiftCode": {
                get: function() {
                    context["field"] = "swiftCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["swiftCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.swiftCode, context);
                },
                set: function(val) {
                    setterFunctions['swiftCode'].call(this, val, privateState);
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
            "unpaidInterest": {
                get: function() {
                    context["field"] = "unpaidInterest";
                    context["metadata"] = (objectMetadata ? objectMetadata["unpaidInterest"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unpaidInterest, context);
                },
                set: function(val) {
                    setterFunctions['unpaidInterest'].call(this, val, privateState);
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
            "email": {
                get: function() {
                    context["field"] = "email";
                    context["metadata"] = (objectMetadata ? objectMetadata["email"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.email, context);
                },
                set: function(val) {
                    setterFunctions['email'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "jointAccountHolder1": {
                get: function() {
                    context["field"] = "jointAccountHolder1";
                    context["metadata"] = (objectMetadata ? objectMetadata["jointAccountHolder1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.jointAccountHolder1, context);
                },
                set: function(val) {
                    setterFunctions['jointAccountHolder1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "jointAccountHolder2": {
                get: function() {
                    context["field"] = "jointAccountHolder2";
                    context["metadata"] = (objectMetadata ? objectMetadata["jointAccountHolder2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.jointAccountHolder2, context);
                },
                set: function(val) {
                    setterFunctions['jointAccountHolder2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankAddress": {
                get: function() {
                    context["field"] = "bankAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankAddress, context);
                },
                set: function(val) {
                    setterFunctions['bankAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "intermediaryBankName": {
                get: function() {
                    context["field"] = "intermediaryBankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.intermediaryBankName, context);
                },
                set: function(val) {
                    setterFunctions['intermediaryBankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "intermediaryBankAddress": {
                get: function() {
                    context["field"] = "intermediaryBankAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBankAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.intermediaryBankAddress, context);
                },
                set: function(val) {
                    setterFunctions['intermediaryBankAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "intermediaryBankSwiftCode": {
                get: function() {
                    context["field"] = "intermediaryBankSwiftCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["intermediaryBankSwiftCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.intermediaryBankSwiftCode, context);
                },
                set: function(val) {
                    setterFunctions['intermediaryBankSwiftCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "StatusDesc": {
                get: function() {
                    context["field"] = "StatusDesc";
                    context["metadata"] = (objectMetadata ? objectMetadata["StatusDesc"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.StatusDesc, context);
                },
                set: function(val) {
                    setterFunctions['StatusDesc'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "supportChecks": {
                get: function() {
                    context["field"] = "supportChecks";
                    context["metadata"] = (objectMetadata ? objectMetadata["supportChecks"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportChecks, context);
                },
                set: function(val) {
                    setterFunctions['supportChecks'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceName": {
                get: function() {
                    context["field"] = "serviceName";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceName, context);
                },
                set: function(val) {
                    setterFunctions['serviceName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "productLi": {
                get: function() {
                    context["field"] = "productLi";
                    context["metadata"] = (objectMetadata ? objectMetadata["productLi"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productLi, context);
                },
                set: function(val) {
                    setterFunctions['productLi'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "phone": {
                get: function() {
                    context["field"] = "phone";
                    context["metadata"] = (objectMetadata ? objectMetadata["phone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phone, context);
                },
                set: function(val) {
                    setterFunctions['phone'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountSubType": {
                get: function() {
                    context["field"] = "accountSubType";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountSubType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountSubType, context);
                },
                set: function(val) {
                    setterFunctions['accountSubType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "description": {
                get: function() {
                    context["field"] = "description";
                    context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.description, context);
                },
                set: function(val) {
                    setterFunctions['description'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "schemeName": {
                get: function() {
                    context["field"] = "schemeName";
                    context["metadata"] = (objectMetadata ? objectMetadata["schemeName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.schemeName, context);
                },
                set: function(val) {
                    setterFunctions['schemeName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "identification": {
                get: function() {
                    context["field"] = "identification";
                    context["metadata"] = (objectMetadata ? objectMetadata["identification"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.identification, context);
                },
                set: function(val) {
                    setterFunctions['identification'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secondaryIdentification": {
                get: function() {
                    context["field"] = "secondaryIdentification";
                    context["metadata"] = (objectMetadata ? objectMetadata["secondaryIdentification"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secondaryIdentification, context);
                },
                set: function(val) {
                    setterFunctions['secondaryIdentification'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "servicerSchemeName": {
                get: function() {
                    context["field"] = "servicerSchemeName";
                    context["metadata"] = (objectMetadata ? objectMetadata["servicerSchemeName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.servicerSchemeName, context);
                },
                set: function(val) {
                    setterFunctions['servicerSchemeName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "servicerIdentification": {
                get: function() {
                    context["field"] = "servicerIdentification";
                    context["metadata"] = (objectMetadata ? objectMetadata["servicerIdentification"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.servicerIdentification, context);
                },
                set: function(val) {
                    setterFunctions['servicerIdentification'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dataCreditDebitIndicator": {
                get: function() {
                    context["field"] = "dataCreditDebitIndicator";
                    context["metadata"] = (objectMetadata ? objectMetadata["dataCreditDebitIndicator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dataCreditDebitIndicator, context);
                },
                set: function(val) {
                    setterFunctions['dataCreditDebitIndicator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dataType": {
                get: function() {
                    context["field"] = "dataType";
                    context["metadata"] = (objectMetadata ? objectMetadata["dataType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dataType, context);
                },
                set: function(val) {
                    setterFunctions['dataType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dataDateTime": {
                get: function() {
                    context["field"] = "dataDateTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["dataDateTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dataDateTime, context);
                },
                set: function(val) {
                    setterFunctions['dataDateTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dataCreditLineIncluded": {
                get: function() {
                    context["field"] = "dataCreditLineIncluded";
                    context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineIncluded"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dataCreditLineIncluded, context);
                },
                set: function(val) {
                    setterFunctions['dataCreditLineIncluded'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dataCreditLineType": {
                get: function() {
                    context["field"] = "dataCreditLineType";
                    context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dataCreditLineType, context);
                },
                set: function(val) {
                    setterFunctions['dataCreditLineType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dataCreditLineAmount": {
                get: function() {
                    context["field"] = "dataCreditLineAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dataCreditLineAmount, context);
                },
                set: function(val) {
                    setterFunctions['dataCreditLineAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dataCreditLineCurrency": {
                get: function() {
                    context["field"] = "dataCreditLineCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["dataCreditLineCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dataCreditLineCurrency, context);
                },
                set: function(val) {
                    setterFunctions['dataCreditLineCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "IBAN": {
                get: function() {
                    context["field"] = "IBAN";
                    context["metadata"] = (objectMetadata ? objectMetadata["IBAN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IBAN, context);
                },
                set: function(val) {
                    setterFunctions['IBAN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "displayName": {
                get: function() {
                    context["field"] = "displayName";
                    context["metadata"] = (objectMetadata ? objectMetadata["displayName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.displayName, context);
                },
                set: function(val) {
                    setterFunctions['displayName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Account_id": {
                get: function() {
                    context["field"] = "Account_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Account_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Account_id, context);
                },
                set: function(val) {
                    setterFunctions['Account_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Organization_Id": {
                get: function() {
                    context["field"] = "Organization_Id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Organization_Id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Organization_Id, context);
                },
                set: function(val) {
                    setterFunctions['Organization_Id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Account_Type": {
                get: function() {
                    context["field"] = "Account_Type";
                    context["metadata"] = (objectMetadata ? objectMetadata["Account_Type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Account_Type, context);
                },
                set: function(val) {
                    setterFunctions['Account_Type'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Customer_id": {
                get: function() {
                    context["field"] = "Customer_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Customer_id, context);
                },
                set: function(val) {
                    setterFunctions['Customer_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Membership_id": {
                get: function() {
                    context["field"] = "Membership_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Membership_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Membership_id, context);
                },
                set: function(val) {
                    setterFunctions['Membership_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Taxid": {
                get: function() {
                    context["field"] = "Taxid";
                    context["metadata"] = (objectMetadata ? objectMetadata["Taxid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Taxid, context);
                },
                set: function(val) {
                    setterFunctions['Taxid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CustomerType": {
                get: function() {
                    context["field"] = "CustomerType";
                    context["metadata"] = (objectMetadata ? objectMetadata["CustomerType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CustomerType, context);
                },
                set: function(val) {
                    setterFunctions['CustomerType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Ssn": {
                get: function() {
                    context["field"] = "Ssn";
                    context["metadata"] = (objectMetadata ? objectMetadata["Ssn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Ssn, context);
                },
                set: function(val) {
                    setterFunctions['Ssn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Status": {
                get: function() {
                    context["field"] = "Status";
                    context["metadata"] = (objectMetadata ? objectMetadata["Status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Status, context);
                },
                set: function(val) {
                    setterFunctions['Status'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchString": {
                get: function() {
                    context["field"] = "searchString";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchString"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchString, context);
                },
                set: function(val) {
                    setterFunctions['searchString'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Ownership": {
                get: function() {
                    context["field"] = "Ownership";
                    context["metadata"] = (objectMetadata ? objectMetadata["Ownership"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Ownership, context);
                },
                set: function(val) {
                    setterFunctions['Ownership'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "LastUpdated": {
                get: function() {
                    context["field"] = "LastUpdated";
                    context["metadata"] = (objectMetadata ? objectMetadata["LastUpdated"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.LastUpdated, context);
                },
                set: function(val) {
                    setterFunctions['LastUpdated'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ActualUpdatedBY": {
                get: function() {
                    context["field"] = "ActualUpdatedBY";
                    context["metadata"] = (objectMetadata ? objectMetadata["ActualUpdatedBY"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ActualUpdatedBY, context);
                },
                set: function(val) {
                    setterFunctions['ActualUpdatedBY'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UpdatedBy": {
                get: function() {
                    context["field"] = "UpdatedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["UpdatedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UpdatedBy, context);
                },
                set: function(val) {
                    setterFunctions['UpdatedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userId": {
                get: function() {
                    context["field"] = "userId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userId, context);
                },
                set: function(val) {
                    setterFunctions['userId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "address": {
                get: function() {
                    context["field"] = "address";
                    context["metadata"] = (objectMetadata ? objectMetadata["address"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.address, context);
                },
                set: function(val) {
                    setterFunctions['address'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateOfBirth": {
                get: function() {
                    context["field"] = "dateOfBirth";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateOfBirth"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateOfBirth, context);
                },
                set: function(val) {
                    setterFunctions['dateOfBirth'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "firstName": {
                get: function() {
                    context["field"] = "firstName";
                    context["metadata"] = (objectMetadata ? objectMetadata["firstName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.firstName, context);
                },
                set: function(val) {
                    setterFunctions['firstName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastName": {
                get: function() {
                    context["field"] = "lastName";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastName, context);
                },
                set: function(val) {
                    setterFunctions['lastName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "stateId": {
                get: function() {
                    context["field"] = "stateId";
                    context["metadata"] = (objectMetadata ? objectMetadata["stateId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stateId, context);
                },
                set: function(val) {
                    setterFunctions['stateId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionCurrency": {
                get: function() {
                    context["field"] = "transactionCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionCurrency, context);
                },
                set: function(val) {
                    setterFunctions['transactionCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "productId": {
                get: function() {
                    context["field"] = "productId";
                    context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productId, context);
                },
                set: function(val) {
                    setterFunctions['productId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payingAccount": {
                get: function() {
                    context["field"] = "payingAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["payingAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payingAccount, context);
                },
                set: function(val) {
                    setterFunctions['payingAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payoutAccount": {
                get: function() {
                    context["field"] = "payoutAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["payoutAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payoutAccount, context);
                },
                set: function(val) {
                    setterFunctions['payoutAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amount": {
                get: function() {
                    context["field"] = "amount";
                    context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amount, context);
                },
                set: function(val) {
                    setterFunctions['amount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "duration": {
                get: function() {
                    context["field"] = "duration";
                    context["metadata"] = (objectMetadata ? objectMetadata["duration"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.duration, context);
                },
                set: function(val) {
                    setterFunctions['duration'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isBusinessAccount": {
                get: function() {
                    context["field"] = "isBusinessAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["isBusinessAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isBusinessAccount, context);
                },
                set: function(val) {
                    setterFunctions['isBusinessAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "actions": {
                get: function() {
                    context["field"] = "actions";
                    context["metadata"] = (objectMetadata ? objectMetadata["actions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.actions, context);
                },
                set: function(val) {
                    setterFunctions['actions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceKey": {
                get: function() {
                    context["field"] = "serviceKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceKey, context);
                },
                set: function(val) {
                    setterFunctions['serviceKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "membershipId": {
                get: function() {
                    context["field"] = "membershipId";
                    context["metadata"] = (objectMetadata ? objectMetadata["membershipId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.membershipId, context);
                },
                set: function(val) {
                    setterFunctions['membershipId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "campaignId": {
                get: function() {
                    context["field"] = "campaignId";
                    context["metadata"] = (objectMetadata ? objectMetadata["campaignId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.campaignId, context);
                },
                set: function(val) {
                    setterFunctions['campaignId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyInformation": {
                get: function() {
                    context["field"] = "companyInformation";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyInformation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyInformation, context);
                },
                set: function(val) {
                    setterFunctions['companyInformation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerInformation": {
                get: function() {
                    context["field"] = "customerInformation";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerInformation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerInformation, context);
                },
                set: function(val) {
                    setterFunctions['customerInformation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "externalIndicator": {
                get: function() {
                    context["field"] = "externalIndicator";
                    context["metadata"] = (objectMetadata ? objectMetadata["externalIndicator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.externalIndicator, context);
                },
                set: function(val) {
                    setterFunctions['externalIndicator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "masterServiceKey": {
                get: function() {
                    context["field"] = "masterServiceKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["masterServiceKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.masterServiceKey, context);
                },
                set: function(val) {
                    setterFunctions['masterServiceKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isOrganizationAccount": {
                get: function() {
                    context["field"] = "isOrganizationAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["isOrganizationAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isOrganizationAccount, context);
                },
                set: function(val) {
                    setterFunctions['isOrganizationAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "productType": {
                get: function() {
                    context["field"] = "productType";
                    context["metadata"] = (objectMetadata ? objectMetadata["productType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productType, context);
                },
                set: function(val) {
                    setterFunctions['productType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "typeId": {
                get: function() {
                    context["field"] = "typeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["typeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.typeId, context);
                },
                set: function(val) {
                    setterFunctions['typeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MembershipName": {
                get: function() {
                    context["field"] = "MembershipName";
                    context["metadata"] = (objectMetadata ? objectMetadata["MembershipName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MembershipName, context);
                },
                set: function(val) {
                    setterFunctions['MembershipName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "term": {
                get: function() {
                    context["field"] = "term";
                    context["metadata"] = (objectMetadata ? objectMetadata["term"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.term, context);
                },
                set: function(val) {
                    setterFunctions['term'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "categoryId": {
                get: function() {
                    context["field"] = "categoryId";
                    context["metadata"] = (objectMetadata ? objectMetadata["categoryId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.categoryId, context);
                },
                set: function(val) {
                    setterFunctions['categoryId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "connectionAlertDays": {
                get: function() {
                    context["field"] = "connectionAlertDays";
                    context["metadata"] = (objectMetadata ? objectMetadata["connectionAlertDays"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.connectionAlertDays, context);
                },
                set: function(val) {
                    setterFunctions['connectionAlertDays'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nextPaymentAmount": {
                get: function() {
                    context["field"] = "nextPaymentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["nextPaymentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nextPaymentAmount, context);
                },
                set: function(val) {
                    setterFunctions['nextPaymentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiresAt": {
                get: function() {
                    context["field"] = "expiresAt";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiresAt"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiresAt, context);
                },
                set: function(val) {
                    setterFunctions['expiresAt'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankCode": {
                get: function() {
                    context["field"] = "bankCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankCode, context);
                },
                set: function(val) {
                    setterFunctions['bankCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nextPaymentDate": {
                get: function() {
                    context["field"] = "nextPaymentDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["nextPaymentDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nextPaymentDate, context);
                },
                set: function(val) {
                    setterFunctions['nextPaymentDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementId": {
                get: function() {
                    context["field"] = "arrangementId";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementId, context);
                },
                set: function(val) {
                    setterFunctions['arrangementId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "processingTime": {
                get: function() {
                    context["field"] = "processingTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["processingTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.processingTime, context);
                },
                set: function(val) {
                    setterFunctions['processingTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "name": {
                get: function() {
                    context["field"] = "name";
                    context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.name, context);
                },
                set: function(val) {
                    setterFunctions['name'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountIds": {
                get: function() {
                    context["field"] = "accountIds";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountIds"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountIds, context);
                },
                set: function(val) {
                    setterFunctions['accountIds'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "logoURL": {
                get: function() {
                    context["field"] = "logoURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["logoURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.logoURL, context);
                },
                set: function(val) {
                    setterFunctions['logoURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerId": {
                get: function() {
                    context["field"] = "customerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerId, context);
                },
                set: function(val) {
                    setterFunctions['customerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "id": {
                get: function() {
                    context["field"] = "id";
                    context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);
                },
                set: function(val) {
                    setterFunctions['id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrCode": {
                get: function() {
                    context["field"] = "dbpErrCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrCode, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrMsg": {
                get: function() {
                    context["field"] = "dbpErrMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrMsg, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrMsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "blockedAmount": {
                get: function() {
                    context["field"] = "blockedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["blockedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.blockedAmount, context);
                },
                set: function(val) {
                    setterFunctions['blockedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "futureInstallmentsCount": {
                get: function() {
                    context["field"] = "futureInstallmentsCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["futureInstallmentsCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.futureInstallmentsCount, context);
                },
                set: function(val) {
                    setterFunctions['futureInstallmentsCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "overDueInstallmentsCount": {
                get: function() {
                    context["field"] = "overDueInstallmentsCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["overDueInstallmentsCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.overDueInstallmentsCount, context);
                },
                set: function(val) {
                    setterFunctions['overDueInstallmentsCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paidInstallmentsCount": {
                get: function() {
                    context["field"] = "paidInstallmentsCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["paidInstallmentsCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paidInstallmentsCount, context);
                },
                set: function(val) {
                    setterFunctions['paidInstallmentsCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "installmentAmount": {
                get: function() {
                    context["field"] = "installmentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["installmentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.installmentAmount, context);
                },
                set: function(val) {
                    setterFunctions['installmentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rePaymentFrequency": {
                get: function() {
                    context["field"] = "rePaymentFrequency";
                    context["metadata"] = (objectMetadata ? objectMetadata["rePaymentFrequency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rePaymentFrequency, context);
                },
                set: function(val) {
                    setterFunctions['rePaymentFrequency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sanctionedAmount": {
                get: function() {
                    context["field"] = "sanctionedAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["sanctionedAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sanctionedAmount, context);
                },
                set: function(val) {
                    setterFunctions['sanctionedAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerName": {
                get: function() {
                    context["field"] = "customerName";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerName, context);
                },
                set: function(val) {
                    setterFunctions['customerName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sanctionedDate": {
                get: function() {
                    context["field"] = "sanctionedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["sanctionedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sanctionedDate, context);
                },
                set: function(val) {
                    setterFunctions['sanctionedDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyId": {
                get: function() {
                    context["field"] = "companyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyId, context);
                },
                set: function(val) {
                    setterFunctions['companyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accruedInterest": {
                get: function() {
                    context["field"] = "accruedInterest";
                    context["metadata"] = (objectMetadata ? objectMetadata["accruedInterest"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accruedInterest, context);
                },
                set: function(val) {
                    setterFunctions['accruedInterest'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "coreCustomerId": {
                get: function() {
                    context["field"] = "coreCustomerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["coreCustomerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.coreCustomerId, context);
                },
                set: function(val) {
                    setterFunctions['coreCustomerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "partyId": {
                get: function() {
                    context["field"] = "partyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["partyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.partyId, context);
                },
                set: function(val) {
                    setterFunctions['partyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "termInterestDue": {
                get: function() {
                    context["field"] = "termInterestDue";
                    context["metadata"] = (objectMetadata ? objectMetadata["termInterestDue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.termInterestDue, context);
                },
                set: function(val) {
                    setterFunctions['termInterestDue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "interestDueDate": {
                get: function() {
                    context["field"] = "interestDueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["interestDueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.interestDueDate, context);
                },
                set: function(val) {
                    setterFunctions['interestDueDate'].call(this, val, privateState);
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
            privateState.accountHolder = value ? (value["accountHolder"] ? value["accountHolder"] : null) : null;
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.accountli = value ? (value["accountli"] ? value["accountli"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.accountPreference = value ? (value["accountPreference"] ? value["accountPreference"] : null) : null;
            privateState.accountType = value ? (value["accountType"] ? value["accountType"] : null) : null;
            privateState.availableBalance = value ? (value["availableBalance"] ? value["availableBalance"] : null) : null;
            privateState.availableCredit = value ? (value["availableCredit"] ? value["availableCredit"] : null) : null;
            privateState.availablePoints = value ? (value["availablePoints"] ? value["availablePoints"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.bondInterest = value ? (value["bondInterest"] ? value["bondInterest"] : null) : null;
            privateState.bondInterestLastYear = value ? (value["bondInterestLastYear"] ? value["bondInterestLastYear"] : null) : null;
            privateState.bsbNum = value ? (value["bsbNum"] ? value["bsbNum"] : null) : null;
            privateState.closingDate = value ? (value["closingDate"] ? value["closingDate"] : null) : null;
            privateState.creditCardNumber = value ? (value["creditCardNumber"] ? value["creditCardNumber"] : null) : null;
            privateState.creditLimit = value ? (value["creditLimit"] ? value["creditLimit"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.currentAmountDue = value ? (value["currentAmountDue"] ? value["currentAmountDue"] : null) : null;
            privateState.currentBalance = value ? (value["currentBalance"] ? value["currentBalance"] : null) : null;
            privateState.deviceID = value ? (value["deviceID"] ? value["deviceID"] : null) : null;
            privateState.dividendLastPaidAmount = value ? (value["dividendLastPaidAmount"] ? value["dividendLastPaidAmount"] : null) : null;
            privateState.dividendLastPaidDate = value ? (value["dividendLastPaidDate"] ? value["dividendLastPaidDate"] : null) : null;
            privateState.dividendPaidYTD = value ? (value["dividendPaidYTD"] ? value["dividendPaidYTD"] : null) : null;
            privateState.dividendRate = value ? (value["dividendRate"] ? value["dividendRate"] : null) : null;
            privateState.dividendYTD = value ? (value["dividendYTD"] ? value["dividendYTD"] : null) : null;
            privateState.dueDate = value ? (value["dueDate"] ? value["dueDate"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.eStatementEnable = value ? (value["eStatementEnable"] ? value["eStatementEnable"] : null) : null;
            privateState.favouriteStatus = value ? (value["favouriteStatus"] ? value["favouriteStatus"] : null) : null;
            privateState.interestEarned = value ? (value["interestEarned"] ? value["interestEarned"] : null) : null;
            privateState.interestPaidLastYear = value ? (value["interestPaidLastYear"] ? value["interestPaidLastYear"] : null) : null;
            privateState.interestPaidPreviousYTD = value ? (value["interestPaidPreviousYTD"] ? value["interestPaidPreviousYTD"] : null) : null;
            privateState.interestPaidYTD = value ? (value["interestPaidYTD"] ? value["interestPaidYTD"] : null) : null;
            privateState.interestRate = value ? (value["interestRate"] ? value["interestRate"] : null) : null;
            privateState.isInternationalAccount = value ? (value["isInternationalAccount"] ? value["isInternationalAccount"] : null) : null;
            privateState.isPFM = value ? (value["isPFM"] ? value["isPFM"] : null) : null;
            privateState.jointHolders = value ? (value["jointHolders"] ? value["jointHolders"] : null) : null;
            privateState.lastDividendPaidAmount = value ? (value["lastDividendPaidAmount"] ? value["lastDividendPaidAmount"] : null) : null;
            privateState.lastDividendPaidDate = value ? (value["lastDividendPaidDate"] ? value["lastDividendPaidDate"] : null) : null;
            privateState.lastPaymentAmount = value ? (value["lastPaymentAmount"] ? value["lastPaymentAmount"] : null) : null;
            privateState.lastPaymentDate = value ? (value["lastPaymentDate"] ? value["lastPaymentDate"] : null) : null;
            privateState.lastStatementBalance = value ? (value["lastStatementBalance"] ? value["lastStatementBalance"] : null) : null;
            privateState.lateFeesDue = value ? (value["lateFeesDue"] ? value["lateFeesDue"] : null) : null;
            privateState.maturityAmount = value ? (value["maturityAmount"] ? value["maturityAmount"] : null) : null;
            privateState.maturityDate = value ? (value["maturityDate"] ? value["maturityDate"] : null) : null;
            privateState.maturityOption = value ? (value["maturityOption"] ? value["maturityOption"] : null) : null;
            privateState.minimumDue = value ? (value["minimumDue"] ? value["minimumDue"] : null) : null;
            privateState.nickName = value ? (value["nickName"] ? value["nickName"] : null) : null;
            privateState.openingDate = value ? (value["openingDate"] ? value["openingDate"] : null) : null;
            privateState.originalAmount = value ? (value["originalAmount"] ? value["originalAmount"] : null) : null;
            privateState.outstandingBalance = value ? (value["outstandingBalance"] ? value["outstandingBalance"] : null) : null;
            privateState.paymentDue = value ? (value["paymentDue"] ? value["paymentDue"] : null) : null;
            privateState.paymentMethod = value ? (value["paymentMethod"] ? value["paymentMethod"] : null) : null;
            privateState.paymentTerm = value ? (value["paymentTerm"] ? value["paymentTerm"] : null) : null;
            privateState.payoffAmount = value ? (value["payoffAmount"] ? value["payoffAmount"] : null) : null;
            privateState.payOffCharge = value ? (value["payOffCharge"] ? value["payOffCharge"] : null) : null;
            privateState.pendingDeposit = value ? (value["pendingDeposit"] ? value["pendingDeposit"] : null) : null;
            privateState.pendingWithdrawal = value ? (value["pendingWithdrawal"] ? value["pendingWithdrawal"] : null) : null;
            privateState.phoneId = value ? (value["phoneId"] ? value["phoneId"] : null) : null;
            privateState.previousYearDividend = value ? (value["previousYearDividend"] ? value["previousYearDividend"] : null) : null;
            privateState.previousYearsDividends = value ? (value["previousYearsDividends"] ? value["previousYearsDividends"] : null) : null;
            privateState.principalBalance = value ? (value["principalBalance"] ? value["principalBalance"] : null) : null;
            privateState.principalValue = value ? (value["principalValue"] ? value["principalValue"] : null) : null;
            privateState.regularPaymentAmount = value ? (value["regularPaymentAmount"] ? value["regularPaymentAmount"] : null) : null;
            privateState.routingNumber = value ? (value["routingNumber"] ? value["routingNumber"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.supportBillPay = value ? (value["supportBillPay"] ? value["supportBillPay"] : null) : null;
            privateState.supportCardlessCash = value ? (value["supportCardlessCash"] ? value["supportCardlessCash"] : null) : null;
            privateState.supportDeposit = value ? (value["supportDeposit"] ? value["supportDeposit"] : null) : null;
            privateState.supportTransferFrom = value ? (value["supportTransferFrom"] ? value["supportTransferFrom"] : null) : null;
            privateState.supportTransferTo = value ? (value["supportTransferTo"] ? value["supportTransferTo"] : null) : null;
            privateState.swiftCode = value ? (value["swiftCode"] ? value["swiftCode"] : null) : null;
            privateState.totalCreditMonths = value ? (value["totalCreditMonths"] ? value["totalCreditMonths"] : null) : null;
            privateState.totalDebitsMonth = value ? (value["totalDebitsMonth"] ? value["totalDebitsMonth"] : null) : null;
            privateState.transactionLimit = value ? (value["transactionLimit"] ? value["transactionLimit"] : null) : null;
            privateState.transferLimit = value ? (value["transferLimit"] ? value["transferLimit"] : null) : null;
            privateState.unpaidInterest = value ? (value["unpaidInterest"] ? value["unpaidInterest"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.email = value ? (value["email"] ? value["email"] : null) : null;
            privateState.jointAccountHolder1 = value ? (value["jointAccountHolder1"] ? value["jointAccountHolder1"] : null) : null;
            privateState.jointAccountHolder2 = value ? (value["jointAccountHolder2"] ? value["jointAccountHolder2"] : null) : null;
            privateState.bankAddress = value ? (value["bankAddress"] ? value["bankAddress"] : null) : null;
            privateState.intermediaryBankName = value ? (value["intermediaryBankName"] ? value["intermediaryBankName"] : null) : null;
            privateState.intermediaryBankAddress = value ? (value["intermediaryBankAddress"] ? value["intermediaryBankAddress"] : null) : null;
            privateState.intermediaryBankSwiftCode = value ? (value["intermediaryBankSwiftCode"] ? value["intermediaryBankSwiftCode"] : null) : null;
            privateState.StatusDesc = value ? (value["StatusDesc"] ? value["StatusDesc"] : null) : null;
            privateState.supportChecks = value ? (value["supportChecks"] ? value["supportChecks"] : null) : null;
            privateState.serviceName = value ? (value["serviceName"] ? value["serviceName"] : null) : null;
            privateState.productLi = value ? (value["productLi"] ? value["productLi"] : null) : null;
            privateState.phone = value ? (value["phone"] ? value["phone"] : null) : null;
            privateState.accountSubType = value ? (value["accountSubType"] ? value["accountSubType"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.schemeName = value ? (value["schemeName"] ? value["schemeName"] : null) : null;
            privateState.identification = value ? (value["identification"] ? value["identification"] : null) : null;
            privateState.secondaryIdentification = value ? (value["secondaryIdentification"] ? value["secondaryIdentification"] : null) : null;
            privateState.servicerSchemeName = value ? (value["servicerSchemeName"] ? value["servicerSchemeName"] : null) : null;
            privateState.servicerIdentification = value ? (value["servicerIdentification"] ? value["servicerIdentification"] : null) : null;
            privateState.dataCreditDebitIndicator = value ? (value["dataCreditDebitIndicator"] ? value["dataCreditDebitIndicator"] : null) : null;
            privateState.dataType = value ? (value["dataType"] ? value["dataType"] : null) : null;
            privateState.dataDateTime = value ? (value["dataDateTime"] ? value["dataDateTime"] : null) : null;
            privateState.dataCreditLineIncluded = value ? (value["dataCreditLineIncluded"] ? value["dataCreditLineIncluded"] : null) : null;
            privateState.dataCreditLineType = value ? (value["dataCreditLineType"] ? value["dataCreditLineType"] : null) : null;
            privateState.dataCreditLineAmount = value ? (value["dataCreditLineAmount"] ? value["dataCreditLineAmount"] : null) : null;
            privateState.dataCreditLineCurrency = value ? (value["dataCreditLineCurrency"] ? value["dataCreditLineCurrency"] : null) : null;
            privateState.IBAN = value ? (value["IBAN"] ? value["IBAN"] : null) : null;
            privateState.displayName = value ? (value["displayName"] ? value["displayName"] : null) : null;
            privateState.Account_id = value ? (value["Account_id"] ? value["Account_id"] : null) : null;
            privateState.Organization_Id = value ? (value["Organization_Id"] ? value["Organization_Id"] : null) : null;
            privateState.Account_Type = value ? (value["Account_Type"] ? value["Account_Type"] : null) : null;
            privateState.Customer_id = value ? (value["Customer_id"] ? value["Customer_id"] : null) : null;
            privateState.Membership_id = value ? (value["Membership_id"] ? value["Membership_id"] : null) : null;
            privateState.Taxid = value ? (value["Taxid"] ? value["Taxid"] : null) : null;
            privateState.CustomerType = value ? (value["CustomerType"] ? value["CustomerType"] : null) : null;
            privateState.Ssn = value ? (value["Ssn"] ? value["Ssn"] : null) : null;
            privateState.Status = value ? (value["Status"] ? value["Status"] : null) : null;
            privateState.searchString = value ? (value["searchString"] ? value["searchString"] : null) : null;
            privateState.Ownership = value ? (value["Ownership"] ? value["Ownership"] : null) : null;
            privateState.LastUpdated = value ? (value["LastUpdated"] ? value["LastUpdated"] : null) : null;
            privateState.ActualUpdatedBY = value ? (value["ActualUpdatedBY"] ? value["ActualUpdatedBY"] : null) : null;
            privateState.UpdatedBy = value ? (value["UpdatedBy"] ? value["UpdatedBy"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.address = value ? (value["address"] ? value["address"] : null) : null;
            privateState.dateOfBirth = value ? (value["dateOfBirth"] ? value["dateOfBirth"] : null) : null;
            privateState.firstName = value ? (value["firstName"] ? value["firstName"] : null) : null;
            privateState.lastName = value ? (value["lastName"] ? value["lastName"] : null) : null;
            privateState.stateId = value ? (value["stateId"] ? value["stateId"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
            privateState.productId = value ? (value["productId"] ? value["productId"] : null) : null;
            privateState.payingAccount = value ? (value["payingAccount"] ? value["payingAccount"] : null) : null;
            privateState.payoutAccount = value ? (value["payoutAccount"] ? value["payoutAccount"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.duration = value ? (value["duration"] ? value["duration"] : null) : null;
            privateState.isBusinessAccount = value ? (value["isBusinessAccount"] ? value["isBusinessAccount"] : null) : null;
            privateState.actions = value ? (value["actions"] ? value["actions"] : null) : null;
            privateState.serviceKey = value ? (value["serviceKey"] ? value["serviceKey"] : null) : null;
            privateState.membershipId = value ? (value["membershipId"] ? value["membershipId"] : null) : null;
            privateState.campaignId = value ? (value["campaignId"] ? value["campaignId"] : null) : null;
            privateState.companyInformation = value ? (value["companyInformation"] ? value["companyInformation"] : null) : null;
            privateState.customerInformation = value ? (value["customerInformation"] ? value["customerInformation"] : null) : null;
            privateState.externalIndicator = value ? (value["externalIndicator"] ? value["externalIndicator"] : null) : null;
            privateState.masterServiceKey = value ? (value["masterServiceKey"] ? value["masterServiceKey"] : null) : null;
            privateState.isOrganizationAccount = value ? (value["isOrganizationAccount"] ? value["isOrganizationAccount"] : null) : null;
            privateState.productType = value ? (value["productType"] ? value["productType"] : null) : null;
            privateState.typeId = value ? (value["typeId"] ? value["typeId"] : null) : null;
            privateState.MembershipName = value ? (value["MembershipName"] ? value["MembershipName"] : null) : null;
            privateState.term = value ? (value["term"] ? value["term"] : null) : null;
            privateState.categoryId = value ? (value["categoryId"] ? value["categoryId"] : null) : null;
            privateState.connectionAlertDays = value ? (value["connectionAlertDays"] ? value["connectionAlertDays"] : null) : null;
            privateState.nextPaymentAmount = value ? (value["nextPaymentAmount"] ? value["nextPaymentAmount"] : null) : null;
            privateState.expiresAt = value ? (value["expiresAt"] ? value["expiresAt"] : null) : null;
            privateState.bankCode = value ? (value["bankCode"] ? value["bankCode"] : null) : null;
            privateState.nextPaymentDate = value ? (value["nextPaymentDate"] ? value["nextPaymentDate"] : null) : null;
            privateState.arrangementId = value ? (value["arrangementId"] ? value["arrangementId"] : null) : null;
            privateState.processingTime = value ? (value["processingTime"] ? value["processingTime"] : null) : null;
            privateState.name = value ? (value["name"] ? value["name"] : null) : null;
            privateState.accountIds = value ? (value["accountIds"] ? value["accountIds"] : null) : null;
            privateState.logoURL = value ? (value["logoURL"] ? value["logoURL"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.blockedAmount = value ? (value["blockedAmount"] ? value["blockedAmount"] : null) : null;
            privateState.futureInstallmentsCount = value ? (value["futureInstallmentsCount"] ? value["futureInstallmentsCount"] : null) : null;
            privateState.overDueInstallmentsCount = value ? (value["overDueInstallmentsCount"] ? value["overDueInstallmentsCount"] : null) : null;
            privateState.paidInstallmentsCount = value ? (value["paidInstallmentsCount"] ? value["paidInstallmentsCount"] : null) : null;
            privateState.installmentAmount = value ? (value["installmentAmount"] ? value["installmentAmount"] : null) : null;
            privateState.rePaymentFrequency = value ? (value["rePaymentFrequency"] ? value["rePaymentFrequency"] : null) : null;
            privateState.sanctionedAmount = value ? (value["sanctionedAmount"] ? value["sanctionedAmount"] : null) : null;
            privateState.customerName = value ? (value["customerName"] ? value["customerName"] : null) : null;
            privateState.sanctionedDate = value ? (value["sanctionedDate"] ? value["sanctionedDate"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.accruedInterest = value ? (value["accruedInterest"] ? value["accruedInterest"] : null) : null;
            privateState.coreCustomerId = value ? (value["coreCustomerId"] ? value["coreCustomerId"] : null) : null;
            privateState.partyId = value ? (value["partyId"] ? value["partyId"] : null) : null;
            privateState.termInterestDue = value ? (value["termInterestDue"] ? value["termInterestDue"] : null) : null;
            privateState.interestDueDate = value ? (value["interestDueDate"] ? value["interestDueDate"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ArrangementDetails);

    //Create new class level validator object
    BaseModel.Validator.call(ArrangementDetails);

    var registerValidatorBackup = ArrangementDetails.registerValidator;

    ArrangementDetails.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ArrangementDetails.isValid(this, propName, val)) {
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
    //For Operation 'getDetails' with service id 'getAccountDetails2410'
     ArrangementDetails.getDetails = function(params, onCompletion){
        return ArrangementDetails.customVerb('getDetails', params, onCompletion);
     };

    var relations = [];

    ArrangementDetails.relations = relations;

    ArrangementDetails.prototype.isValid = function() {
        return ArrangementDetails.isValid(this);
    };

    ArrangementDetails.prototype.objModelName = "ArrangementDetails";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ArrangementDetails.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Holdings", "ArrangementDetails", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ArrangementDetails.clone = function(objectToClone) {
        var clonedObj = new ArrangementDetails();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ArrangementDetails;
});