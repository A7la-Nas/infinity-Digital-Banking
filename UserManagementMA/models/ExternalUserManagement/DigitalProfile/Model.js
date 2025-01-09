/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DigitalProfile", "objectService" : "ExternalUserManagement"};

    var setterFunctions = {
        Id: function(val, state) {
            context["field"] = "Id";
            context["metadata"] = (objectMetadata ? objectMetadata["Id"] : null);
            state['Id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Customer_id: function(val, state) {
            context["field"] = "Customer_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
            state['Customer_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CreditScore: function(val, state) {
            context["field"] = "CreditScore";
            context["metadata"] = (objectMetadata ? objectMetadata["CreditScore"] : null);
            state['CreditScore'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfInquiries_6M: function(val, state) {
            context["field"] = "NumberOfInquiries_6M";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfInquiries_6M"] : null);
            state['NumberOfInquiries_6M'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfInquiries_12M: function(val, state) {
            context["field"] = "NumberOfInquiries_12M";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfInquiries_12M"] : null);
            state['NumberOfInquiries_12M'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfInquiries_24M: function(val, state) {
            context["field"] = "NumberOfInquiries_24M";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfInquiries_24M"] : null);
            state['NumberOfInquiries_24M'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TotalRevolvingOpenToBuyBalance: function(val, state) {
            context["field"] = "TotalRevolvingOpenToBuyBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["TotalRevolvingOpenToBuyBalance"] : null);
            state['TotalRevolvingOpenToBuyBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UtilizationPercentOfRevolvingTrades: function(val, state) {
            context["field"] = "UtilizationPercentOfRevolvingTrades";
            context["metadata"] = (objectMetadata ? objectMetadata["UtilizationPercentOfRevolvingTrades"] : null);
            state['UtilizationPercentOfRevolvingTrades'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        SinceRecentDelinquency_M: function(val, state) {
            context["field"] = "SinceRecentDelinquency_M";
            context["metadata"] = (objectMetadata ? objectMetadata["SinceRecentDelinquency_M"] : null);
            state['SinceRecentDelinquency_M'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TotalNumberOfDerogatory: function(val, state) {
            context["field"] = "TotalNumberOfDerogatory";
            context["metadata"] = (objectMetadata ? objectMetadata["TotalNumberOfDerogatory"] : null);
            state['TotalNumberOfDerogatory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        SinceRecentlyFiledCollection_M: function(val, state) {
            context["field"] = "SinceRecentlyFiledCollection_M";
            context["metadata"] = (objectMetadata ? objectMetadata["SinceRecentlyFiledCollection_M"] : null);
            state['SinceRecentlyFiledCollection_M'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TotalNumberOfTrades: function(val, state) {
            context["field"] = "TotalNumberOfTrades";
            context["metadata"] = (objectMetadata ? objectMetadata["TotalNumberOfTrades"] : null);
            state['TotalNumberOfTrades'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TotalNumberOfActiveTrades: function(val, state) {
            context["field"] = "TotalNumberOfActiveTrades";
            context["metadata"] = (objectMetadata ? objectMetadata["TotalNumberOfActiveTrades"] : null);
            state['TotalNumberOfActiveTrades'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfTradesOpened_24M: function(val, state) {
            context["field"] = "NumberOfTradesOpened_24M";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfTradesOpened_24M"] : null);
            state['NumberOfTradesOpened_24M'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfTradeswithUtilization: function(val, state) {
            context["field"] = "NumberOfTradeswithUtilization";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfTradeswithUtilization"] : null);
            state['NumberOfTradeswithUtilization'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        OldestOpenPersonalFinanceTrade_M: function(val, state) {
            context["field"] = "OldestOpenPersonalFinanceTrade_M";
            context["metadata"] = (objectMetadata ? objectMetadata["OldestOpenPersonalFinanceTrade_M"] : null);
            state['OldestOpenPersonalFinanceTrade_M'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        LoanToIncomeRatio: function(val, state) {
            context["field"] = "LoanToIncomeRatio";
            context["metadata"] = (objectMetadata ? objectMetadata["LoanToIncomeRatio"] : null);
            state['LoanToIncomeRatio'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        NumberOfLoanAapplications_24M: function(val, state) {
            context["field"] = "NumberOfLoanAapplications_24M";
            context["metadata"] = (objectMetadata ? objectMetadata["NumberOfLoanAapplications_24M"] : null);
            state['NumberOfLoanAapplications_24M'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        DebtToIncomeRatio: function(val, state) {
            context["field"] = "DebtToIncomeRatio";
            context["metadata"] = (objectMetadata ? objectMetadata["DebtToIncomeRatio"] : null);
            state['DebtToIncomeRatio'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PrequalifyScore: function(val, state) {
            context["field"] = "PrequalifyScore";
            context["metadata"] = (objectMetadata ? objectMetadata["PrequalifyScore"] : null);
            state['PrequalifyScore'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        YearsOfMembership: function(val, state) {
            context["field"] = "YearsOfMembership";
            context["metadata"] = (objectMetadata ? objectMetadata["YearsOfMembership"] : null);
            state['YearsOfMembership'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        AccountsBalance: function(val, state) {
            context["field"] = "AccountsBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["AccountsBalance"] : null);
            state['AccountsBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Age: function(val, state) {
            context["field"] = "Age";
            context["metadata"] = (objectMetadata ? objectMetadata["Age"] : null);
            state['Age'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        City: function(val, state) {
            context["field"] = "City";
            context["metadata"] = (objectMetadata ? objectMetadata["City"] : null);
            state['City'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        State: function(val, state) {
            context["field"] = "State";
            context["metadata"] = (objectMetadata ? objectMetadata["State"] : null);
            state['State'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ZipCode: function(val, state) {
            context["field"] = "ZipCode";
            context["metadata"] = (objectMetadata ? objectMetadata["ZipCode"] : null);
            state['ZipCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        DurationOfStay: function(val, state) {
            context["field"] = "DurationOfStay";
            context["metadata"] = (objectMetadata ? objectMetadata["DurationOfStay"] : null);
            state['DurationOfStay'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        HomeOwnership: function(val, state) {
            context["field"] = "HomeOwnership";
            context["metadata"] = (objectMetadata ? objectMetadata["HomeOwnership"] : null);
            state['HomeOwnership'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        GrossMonthlyIncome: function(val, state) {
            context["field"] = "GrossMonthlyIncome";
            context["metadata"] = (objectMetadata ? objectMetadata["GrossMonthlyIncome"] : null);
            state['GrossMonthlyIncome'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        AnnualIncome: function(val, state) {
            context["field"] = "AnnualIncome";
            context["metadata"] = (objectMetadata ? objectMetadata["AnnualIncome"] : null);
            state['AnnualIncome'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdby: function(val, state) {
            context["field"] = "createdby";
            context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
            state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedby: function(val, state) {
            context["field"] = "modifiedby";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
            state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdts: function(val, state) {
            context["field"] = "createdts";
            context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
            state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastmodifiedts: function(val, state) {
            context["field"] = "lastmodifiedts";
            context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
            state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        synctimestamp: function(val, state) {
            context["field"] = "synctimestamp";
            context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
            state['synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softdeleteflag: function(val, state) {
            context["field"] = "softdeleteflag";
            context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
            state['softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UserName: function(val, state) {
            context["field"] = "UserName";
            context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
            state['UserName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorCode: function(val, state) {
            context["field"] = "errorCode";
            context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
            state['errorCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMessage: function(val, state) {
            context["field"] = "errorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
            state['errorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function DigitalProfile(defaultValues) {
        var privateState = {};
        context["field"] = "Id";
        context["metadata"] = (objectMetadata ? objectMetadata["Id"] : null);
        privateState.Id = defaultValues ?
            (defaultValues["Id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Id"], context) :
                null) :
            null;

        context["field"] = "Customer_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
        privateState.Customer_id = defaultValues ?
            (defaultValues["Customer_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Customer_id"], context) :
                null) :
            null;

        context["field"] = "CreditScore";
        context["metadata"] = (objectMetadata ? objectMetadata["CreditScore"] : null);
        privateState.CreditScore = defaultValues ?
            (defaultValues["CreditScore"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CreditScore"], context) :
                null) :
            null;

        context["field"] = "NumberOfInquiries_6M";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfInquiries_6M"] : null);
        privateState.NumberOfInquiries_6M = defaultValues ?
            (defaultValues["NumberOfInquiries_6M"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfInquiries_6M"], context) :
                null) :
            null;

        context["field"] = "NumberOfInquiries_12M";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfInquiries_12M"] : null);
        privateState.NumberOfInquiries_12M = defaultValues ?
            (defaultValues["NumberOfInquiries_12M"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfInquiries_12M"], context) :
                null) :
            null;

        context["field"] = "NumberOfInquiries_24M";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfInquiries_24M"] : null);
        privateState.NumberOfInquiries_24M = defaultValues ?
            (defaultValues["NumberOfInquiries_24M"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfInquiries_24M"], context) :
                null) :
            null;

        context["field"] = "TotalRevolvingOpenToBuyBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["TotalRevolvingOpenToBuyBalance"] : null);
        privateState.TotalRevolvingOpenToBuyBalance = defaultValues ?
            (defaultValues["TotalRevolvingOpenToBuyBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TotalRevolvingOpenToBuyBalance"], context) :
                null) :
            null;

        context["field"] = "UtilizationPercentOfRevolvingTrades";
        context["metadata"] = (objectMetadata ? objectMetadata["UtilizationPercentOfRevolvingTrades"] : null);
        privateState.UtilizationPercentOfRevolvingTrades = defaultValues ?
            (defaultValues["UtilizationPercentOfRevolvingTrades"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UtilizationPercentOfRevolvingTrades"], context) :
                null) :
            null;

        context["field"] = "SinceRecentDelinquency_M";
        context["metadata"] = (objectMetadata ? objectMetadata["SinceRecentDelinquency_M"] : null);
        privateState.SinceRecentDelinquency_M = defaultValues ?
            (defaultValues["SinceRecentDelinquency_M"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["SinceRecentDelinquency_M"], context) :
                null) :
            null;

        context["field"] = "TotalNumberOfDerogatory";
        context["metadata"] = (objectMetadata ? objectMetadata["TotalNumberOfDerogatory"] : null);
        privateState.TotalNumberOfDerogatory = defaultValues ?
            (defaultValues["TotalNumberOfDerogatory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TotalNumberOfDerogatory"], context) :
                null) :
            null;

        context["field"] = "SinceRecentlyFiledCollection_M";
        context["metadata"] = (objectMetadata ? objectMetadata["SinceRecentlyFiledCollection_M"] : null);
        privateState.SinceRecentlyFiledCollection_M = defaultValues ?
            (defaultValues["SinceRecentlyFiledCollection_M"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["SinceRecentlyFiledCollection_M"], context) :
                null) :
            null;

        context["field"] = "TotalNumberOfTrades";
        context["metadata"] = (objectMetadata ? objectMetadata["TotalNumberOfTrades"] : null);
        privateState.TotalNumberOfTrades = defaultValues ?
            (defaultValues["TotalNumberOfTrades"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TotalNumberOfTrades"], context) :
                null) :
            null;

        context["field"] = "TotalNumberOfActiveTrades";
        context["metadata"] = (objectMetadata ? objectMetadata["TotalNumberOfActiveTrades"] : null);
        privateState.TotalNumberOfActiveTrades = defaultValues ?
            (defaultValues["TotalNumberOfActiveTrades"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TotalNumberOfActiveTrades"], context) :
                null) :
            null;

        context["field"] = "NumberOfTradesOpened_24M";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfTradesOpened_24M"] : null);
        privateState.NumberOfTradesOpened_24M = defaultValues ?
            (defaultValues["NumberOfTradesOpened_24M"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfTradesOpened_24M"], context) :
                null) :
            null;

        context["field"] = "NumberOfTradeswithUtilization";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfTradeswithUtilization"] : null);
        privateState.NumberOfTradeswithUtilization = defaultValues ?
            (defaultValues["NumberOfTradeswithUtilization"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfTradeswithUtilization"], context) :
                null) :
            null;

        context["field"] = "OldestOpenPersonalFinanceTrade_M";
        context["metadata"] = (objectMetadata ? objectMetadata["OldestOpenPersonalFinanceTrade_M"] : null);
        privateState.OldestOpenPersonalFinanceTrade_M = defaultValues ?
            (defaultValues["OldestOpenPersonalFinanceTrade_M"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["OldestOpenPersonalFinanceTrade_M"], context) :
                null) :
            null;

        context["field"] = "LoanToIncomeRatio";
        context["metadata"] = (objectMetadata ? objectMetadata["LoanToIncomeRatio"] : null);
        privateState.LoanToIncomeRatio = defaultValues ?
            (defaultValues["LoanToIncomeRatio"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["LoanToIncomeRatio"], context) :
                null) :
            null;

        context["field"] = "NumberOfLoanAapplications_24M";
        context["metadata"] = (objectMetadata ? objectMetadata["NumberOfLoanAapplications_24M"] : null);
        privateState.NumberOfLoanAapplications_24M = defaultValues ?
            (defaultValues["NumberOfLoanAapplications_24M"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["NumberOfLoanAapplications_24M"], context) :
                null) :
            null;

        context["field"] = "DebtToIncomeRatio";
        context["metadata"] = (objectMetadata ? objectMetadata["DebtToIncomeRatio"] : null);
        privateState.DebtToIncomeRatio = defaultValues ?
            (defaultValues["DebtToIncomeRatio"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DebtToIncomeRatio"], context) :
                null) :
            null;

        context["field"] = "PrequalifyScore";
        context["metadata"] = (objectMetadata ? objectMetadata["PrequalifyScore"] : null);
        privateState.PrequalifyScore = defaultValues ?
            (defaultValues["PrequalifyScore"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PrequalifyScore"], context) :
                null) :
            null;

        context["field"] = "YearsOfMembership";
        context["metadata"] = (objectMetadata ? objectMetadata["YearsOfMembership"] : null);
        privateState.YearsOfMembership = defaultValues ?
            (defaultValues["YearsOfMembership"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["YearsOfMembership"], context) :
                null) :
            null;

        context["field"] = "AccountsBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["AccountsBalance"] : null);
        privateState.AccountsBalance = defaultValues ?
            (defaultValues["AccountsBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AccountsBalance"], context) :
                null) :
            null;

        context["field"] = "Age";
        context["metadata"] = (objectMetadata ? objectMetadata["Age"] : null);
        privateState.Age = defaultValues ?
            (defaultValues["Age"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Age"], context) :
                null) :
            null;

        context["field"] = "City";
        context["metadata"] = (objectMetadata ? objectMetadata["City"] : null);
        privateState.City = defaultValues ?
            (defaultValues["City"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["City"], context) :
                null) :
            null;

        context["field"] = "State";
        context["metadata"] = (objectMetadata ? objectMetadata["State"] : null);
        privateState.State = defaultValues ?
            (defaultValues["State"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["State"], context) :
                null) :
            null;

        context["field"] = "ZipCode";
        context["metadata"] = (objectMetadata ? objectMetadata["ZipCode"] : null);
        privateState.ZipCode = defaultValues ?
            (defaultValues["ZipCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ZipCode"], context) :
                null) :
            null;

        context["field"] = "DurationOfStay";
        context["metadata"] = (objectMetadata ? objectMetadata["DurationOfStay"] : null);
        privateState.DurationOfStay = defaultValues ?
            (defaultValues["DurationOfStay"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DurationOfStay"], context) :
                null) :
            null;

        context["field"] = "HomeOwnership";
        context["metadata"] = (objectMetadata ? objectMetadata["HomeOwnership"] : null);
        privateState.HomeOwnership = defaultValues ?
            (defaultValues["HomeOwnership"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["HomeOwnership"], context) :
                null) :
            null;

        context["field"] = "GrossMonthlyIncome";
        context["metadata"] = (objectMetadata ? objectMetadata["GrossMonthlyIncome"] : null);
        privateState.GrossMonthlyIncome = defaultValues ?
            (defaultValues["GrossMonthlyIncome"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["GrossMonthlyIncome"], context) :
                null) :
            null;

        context["field"] = "AnnualIncome";
        context["metadata"] = (objectMetadata ? objectMetadata["AnnualIncome"] : null);
        privateState.AnnualIncome = defaultValues ?
            (defaultValues["AnnualIncome"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AnnualIncome"], context) :
                null) :
            null;

        context["field"] = "createdby";
        context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
        privateState.createdby = defaultValues ?
            (defaultValues["createdby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context) :
                null) :
            null;

        context["field"] = "modifiedby";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
        privateState.modifiedby = defaultValues ?
            (defaultValues["modifiedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context) :
                null) :
            null;

        context["field"] = "createdts";
        context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
        privateState.createdts = defaultValues ?
            (defaultValues["createdts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context) :
                null) :
            null;

        context["field"] = "lastmodifiedts";
        context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
        privateState.lastmodifiedts = defaultValues ?
            (defaultValues["lastmodifiedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context) :
                null) :
            null;

        context["field"] = "synctimestamp";
        context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
        privateState.synctimestamp = defaultValues ?
            (defaultValues["synctimestamp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["synctimestamp"], context) :
                null) :
            null;

        context["field"] = "softdeleteflag";
        context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
        privateState.softdeleteflag = defaultValues ?
            (defaultValues["softdeleteflag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdeleteflag"], context) :
                null) :
            null;

        context["field"] = "UserName";
        context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
        privateState.UserName = defaultValues ?
            (defaultValues["UserName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UserName"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "errorCode";
        context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
        privateState.errorCode = defaultValues ?
            (defaultValues["errorCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorCode"], context) :
                null) :
            null;

        context["field"] = "errorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
        privateState.errorMessage = defaultValues ?
            (defaultValues["errorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMessage"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "Id": {
                get: function() {
                    context["field"] = "Id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Id, context);
                },
                set: function(val) {
                    setterFunctions['Id'].call(this, val, privateState);
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
            "CreditScore": {
                get: function() {
                    context["field"] = "CreditScore";
                    context["metadata"] = (objectMetadata ? objectMetadata["CreditScore"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CreditScore, context);
                },
                set: function(val) {
                    setterFunctions['CreditScore'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfInquiries_6M": {
                get: function() {
                    context["field"] = "NumberOfInquiries_6M";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfInquiries_6M"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfInquiries_6M, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfInquiries_6M'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfInquiries_12M": {
                get: function() {
                    context["field"] = "NumberOfInquiries_12M";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfInquiries_12M"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfInquiries_12M, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfInquiries_12M'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfInquiries_24M": {
                get: function() {
                    context["field"] = "NumberOfInquiries_24M";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfInquiries_24M"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfInquiries_24M, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfInquiries_24M'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TotalRevolvingOpenToBuyBalance": {
                get: function() {
                    context["field"] = "TotalRevolvingOpenToBuyBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["TotalRevolvingOpenToBuyBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TotalRevolvingOpenToBuyBalance, context);
                },
                set: function(val) {
                    setterFunctions['TotalRevolvingOpenToBuyBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UtilizationPercentOfRevolvingTrades": {
                get: function() {
                    context["field"] = "UtilizationPercentOfRevolvingTrades";
                    context["metadata"] = (objectMetadata ? objectMetadata["UtilizationPercentOfRevolvingTrades"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UtilizationPercentOfRevolvingTrades, context);
                },
                set: function(val) {
                    setterFunctions['UtilizationPercentOfRevolvingTrades'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "SinceRecentDelinquency_M": {
                get: function() {
                    context["field"] = "SinceRecentDelinquency_M";
                    context["metadata"] = (objectMetadata ? objectMetadata["SinceRecentDelinquency_M"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.SinceRecentDelinquency_M, context);
                },
                set: function(val) {
                    setterFunctions['SinceRecentDelinquency_M'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TotalNumberOfDerogatory": {
                get: function() {
                    context["field"] = "TotalNumberOfDerogatory";
                    context["metadata"] = (objectMetadata ? objectMetadata["TotalNumberOfDerogatory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TotalNumberOfDerogatory, context);
                },
                set: function(val) {
                    setterFunctions['TotalNumberOfDerogatory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "SinceRecentlyFiledCollection_M": {
                get: function() {
                    context["field"] = "SinceRecentlyFiledCollection_M";
                    context["metadata"] = (objectMetadata ? objectMetadata["SinceRecentlyFiledCollection_M"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.SinceRecentlyFiledCollection_M, context);
                },
                set: function(val) {
                    setterFunctions['SinceRecentlyFiledCollection_M'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TotalNumberOfTrades": {
                get: function() {
                    context["field"] = "TotalNumberOfTrades";
                    context["metadata"] = (objectMetadata ? objectMetadata["TotalNumberOfTrades"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TotalNumberOfTrades, context);
                },
                set: function(val) {
                    setterFunctions['TotalNumberOfTrades'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TotalNumberOfActiveTrades": {
                get: function() {
                    context["field"] = "TotalNumberOfActiveTrades";
                    context["metadata"] = (objectMetadata ? objectMetadata["TotalNumberOfActiveTrades"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TotalNumberOfActiveTrades, context);
                },
                set: function(val) {
                    setterFunctions['TotalNumberOfActiveTrades'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfTradesOpened_24M": {
                get: function() {
                    context["field"] = "NumberOfTradesOpened_24M";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfTradesOpened_24M"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfTradesOpened_24M, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfTradesOpened_24M'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfTradeswithUtilization": {
                get: function() {
                    context["field"] = "NumberOfTradeswithUtilization";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfTradeswithUtilization"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfTradeswithUtilization, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfTradeswithUtilization'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "OldestOpenPersonalFinanceTrade_M": {
                get: function() {
                    context["field"] = "OldestOpenPersonalFinanceTrade_M";
                    context["metadata"] = (objectMetadata ? objectMetadata["OldestOpenPersonalFinanceTrade_M"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.OldestOpenPersonalFinanceTrade_M, context);
                },
                set: function(val) {
                    setterFunctions['OldestOpenPersonalFinanceTrade_M'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "LoanToIncomeRatio": {
                get: function() {
                    context["field"] = "LoanToIncomeRatio";
                    context["metadata"] = (objectMetadata ? objectMetadata["LoanToIncomeRatio"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.LoanToIncomeRatio, context);
                },
                set: function(val) {
                    setterFunctions['LoanToIncomeRatio'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "NumberOfLoanAapplications_24M": {
                get: function() {
                    context["field"] = "NumberOfLoanAapplications_24M";
                    context["metadata"] = (objectMetadata ? objectMetadata["NumberOfLoanAapplications_24M"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.NumberOfLoanAapplications_24M, context);
                },
                set: function(val) {
                    setterFunctions['NumberOfLoanAapplications_24M'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "DebtToIncomeRatio": {
                get: function() {
                    context["field"] = "DebtToIncomeRatio";
                    context["metadata"] = (objectMetadata ? objectMetadata["DebtToIncomeRatio"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DebtToIncomeRatio, context);
                },
                set: function(val) {
                    setterFunctions['DebtToIncomeRatio'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "PrequalifyScore": {
                get: function() {
                    context["field"] = "PrequalifyScore";
                    context["metadata"] = (objectMetadata ? objectMetadata["PrequalifyScore"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PrequalifyScore, context);
                },
                set: function(val) {
                    setterFunctions['PrequalifyScore'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "YearsOfMembership": {
                get: function() {
                    context["field"] = "YearsOfMembership";
                    context["metadata"] = (objectMetadata ? objectMetadata["YearsOfMembership"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.YearsOfMembership, context);
                },
                set: function(val) {
                    setterFunctions['YearsOfMembership'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "AccountsBalance": {
                get: function() {
                    context["field"] = "AccountsBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["AccountsBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AccountsBalance, context);
                },
                set: function(val) {
                    setterFunctions['AccountsBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Age": {
                get: function() {
                    context["field"] = "Age";
                    context["metadata"] = (objectMetadata ? objectMetadata["Age"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Age, context);
                },
                set: function(val) {
                    setterFunctions['Age'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "City": {
                get: function() {
                    context["field"] = "City";
                    context["metadata"] = (objectMetadata ? objectMetadata["City"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.City, context);
                },
                set: function(val) {
                    setterFunctions['City'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "State": {
                get: function() {
                    context["field"] = "State";
                    context["metadata"] = (objectMetadata ? objectMetadata["State"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.State, context);
                },
                set: function(val) {
                    setterFunctions['State'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ZipCode": {
                get: function() {
                    context["field"] = "ZipCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["ZipCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ZipCode, context);
                },
                set: function(val) {
                    setterFunctions['ZipCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "DurationOfStay": {
                get: function() {
                    context["field"] = "DurationOfStay";
                    context["metadata"] = (objectMetadata ? objectMetadata["DurationOfStay"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DurationOfStay, context);
                },
                set: function(val) {
                    setterFunctions['DurationOfStay'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "HomeOwnership": {
                get: function() {
                    context["field"] = "HomeOwnership";
                    context["metadata"] = (objectMetadata ? objectMetadata["HomeOwnership"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.HomeOwnership, context);
                },
                set: function(val) {
                    setterFunctions['HomeOwnership'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "GrossMonthlyIncome": {
                get: function() {
                    context["field"] = "GrossMonthlyIncome";
                    context["metadata"] = (objectMetadata ? objectMetadata["GrossMonthlyIncome"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.GrossMonthlyIncome, context);
                },
                set: function(val) {
                    setterFunctions['GrossMonthlyIncome'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "AnnualIncome": {
                get: function() {
                    context["field"] = "AnnualIncome";
                    context["metadata"] = (objectMetadata ? objectMetadata["AnnualIncome"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AnnualIncome, context);
                },
                set: function(val) {
                    setterFunctions['AnnualIncome'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdby": {
                get: function() {
                    context["field"] = "createdby";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdby, context);
                },
                set: function(val) {
                    setterFunctions['createdby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "modifiedby": {
                get: function() {
                    context["field"] = "modifiedby";
                    context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.modifiedby, context);
                },
                set: function(val) {
                    setterFunctions['modifiedby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdts": {
                get: function() {
                    context["field"] = "createdts";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdts, context);
                },
                set: function(val) {
                    setterFunctions['createdts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastmodifiedts": {
                get: function() {
                    context["field"] = "lastmodifiedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastmodifiedts, context);
                },
                set: function(val) {
                    setterFunctions['lastmodifiedts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "synctimestamp": {
                get: function() {
                    context["field"] = "synctimestamp";
                    context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.synctimestamp, context);
                },
                set: function(val) {
                    setterFunctions['synctimestamp'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "softdeleteflag": {
                get: function() {
                    context["field"] = "softdeleteflag";
                    context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softdeleteflag, context);
                },
                set: function(val) {
                    setterFunctions['softdeleteflag'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UserName": {
                get: function() {
                    context["field"] = "UserName";
                    context["metadata"] = (objectMetadata ? objectMetadata["UserName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UserName, context);
                },
                set: function(val) {
                    setterFunctions['UserName'].call(this, val, privateState);
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
            "errorCode": {
                get: function() {
                    context["field"] = "errorCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorCode, context);
                },
                set: function(val) {
                    setterFunctions['errorCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorMessage": {
                get: function() {
                    context["field"] = "errorMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorMessage, context);
                },
                set: function(val) {
                    setterFunctions['errorMessage'].call(this, val, privateState);
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
            privateState.Id = value ? (value["Id"] ? value["Id"] : null) : null;
            privateState.Customer_id = value ? (value["Customer_id"] ? value["Customer_id"] : null) : null;
            privateState.CreditScore = value ? (value["CreditScore"] ? value["CreditScore"] : null) : null;
            privateState.NumberOfInquiries_6M = value ? (value["NumberOfInquiries_6M"] ? value["NumberOfInquiries_6M"] : null) : null;
            privateState.NumberOfInquiries_12M = value ? (value["NumberOfInquiries_12M"] ? value["NumberOfInquiries_12M"] : null) : null;
            privateState.NumberOfInquiries_24M = value ? (value["NumberOfInquiries_24M"] ? value["NumberOfInquiries_24M"] : null) : null;
            privateState.TotalRevolvingOpenToBuyBalance = value ? (value["TotalRevolvingOpenToBuyBalance"] ? value["TotalRevolvingOpenToBuyBalance"] : null) : null;
            privateState.UtilizationPercentOfRevolvingTrades = value ? (value["UtilizationPercentOfRevolvingTrades"] ? value["UtilizationPercentOfRevolvingTrades"] : null) : null;
            privateState.SinceRecentDelinquency_M = value ? (value["SinceRecentDelinquency_M"] ? value["SinceRecentDelinquency_M"] : null) : null;
            privateState.TotalNumberOfDerogatory = value ? (value["TotalNumberOfDerogatory"] ? value["TotalNumberOfDerogatory"] : null) : null;
            privateState.SinceRecentlyFiledCollection_M = value ? (value["SinceRecentlyFiledCollection_M"] ? value["SinceRecentlyFiledCollection_M"] : null) : null;
            privateState.TotalNumberOfTrades = value ? (value["TotalNumberOfTrades"] ? value["TotalNumberOfTrades"] : null) : null;
            privateState.TotalNumberOfActiveTrades = value ? (value["TotalNumberOfActiveTrades"] ? value["TotalNumberOfActiveTrades"] : null) : null;
            privateState.NumberOfTradesOpened_24M = value ? (value["NumberOfTradesOpened_24M"] ? value["NumberOfTradesOpened_24M"] : null) : null;
            privateState.NumberOfTradeswithUtilization = value ? (value["NumberOfTradeswithUtilization"] ? value["NumberOfTradeswithUtilization"] : null) : null;
            privateState.OldestOpenPersonalFinanceTrade_M = value ? (value["OldestOpenPersonalFinanceTrade_M"] ? value["OldestOpenPersonalFinanceTrade_M"] : null) : null;
            privateState.LoanToIncomeRatio = value ? (value["LoanToIncomeRatio"] ? value["LoanToIncomeRatio"] : null) : null;
            privateState.NumberOfLoanAapplications_24M = value ? (value["NumberOfLoanAapplications_24M"] ? value["NumberOfLoanAapplications_24M"] : null) : null;
            privateState.DebtToIncomeRatio = value ? (value["DebtToIncomeRatio"] ? value["DebtToIncomeRatio"] : null) : null;
            privateState.PrequalifyScore = value ? (value["PrequalifyScore"] ? value["PrequalifyScore"] : null) : null;
            privateState.YearsOfMembership = value ? (value["YearsOfMembership"] ? value["YearsOfMembership"] : null) : null;
            privateState.AccountsBalance = value ? (value["AccountsBalance"] ? value["AccountsBalance"] : null) : null;
            privateState.Age = value ? (value["Age"] ? value["Age"] : null) : null;
            privateState.City = value ? (value["City"] ? value["City"] : null) : null;
            privateState.State = value ? (value["State"] ? value["State"] : null) : null;
            privateState.ZipCode = value ? (value["ZipCode"] ? value["ZipCode"] : null) : null;
            privateState.DurationOfStay = value ? (value["DurationOfStay"] ? value["DurationOfStay"] : null) : null;
            privateState.HomeOwnership = value ? (value["HomeOwnership"] ? value["HomeOwnership"] : null) : null;
            privateState.GrossMonthlyIncome = value ? (value["GrossMonthlyIncome"] ? value["GrossMonthlyIncome"] : null) : null;
            privateState.AnnualIncome = value ? (value["AnnualIncome"] ? value["AnnualIncome"] : null) : null;
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.modifiedby = value ? (value["modifiedby"] ? value["modifiedby"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.lastmodifiedts = value ? (value["lastmodifiedts"] ? value["lastmodifiedts"] : null) : null;
            privateState.synctimestamp = value ? (value["synctimestamp"] ? value["synctimestamp"] : null) : null;
            privateState.softdeleteflag = value ? (value["softdeleteflag"] ? value["softdeleteflag"] : null) : null;
            privateState.UserName = value ? (value["UserName"] ? value["UserName"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.errorCode = value ? (value["errorCode"] ? value["errorCode"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DigitalProfile);

    //Create new class level validator object
    BaseModel.Validator.call(DigitalProfile);

    var registerValidatorBackup = DigitalProfile.registerValidator;

    DigitalProfile.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DigitalProfile.isValid(this, propName, val)) {
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
    var relations = [];

    DigitalProfile.relations = relations;

    DigitalProfile.prototype.isValid = function() {
        return DigitalProfile.isValid(this);
    };

    DigitalProfile.prototype.objModelName = "DigitalProfile";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DigitalProfile.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ExternalUserManagement", "DigitalProfile", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DigitalProfile.clone = function(objectToClone) {
        var clonedObj = new DigitalProfile();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DigitalProfile;
});