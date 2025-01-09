define(function() {
    return {
        getFormatedDate: function(dateString) {
            var testDateUtc;
            if (dateString) {
                if (dateString.includes("EDT")) testDateUtc = moment.utc(dateString.replace('EDT', '')).add(4, 'hours');
                else if (dateString.includes("EST")) testDateUtc = moment.utc(dateString.replace('EST', '')).add(5, 'hours');
                else if (dateString.includes("UTC")) testDateUtc = moment.utc(dateString.replace('UTC', ''));
                else if (dateString.includes("IST")) testDateUtc = moment.utc(dateString.replace('IST', '')).subtract(330, 'minutes');
                else if (dateString.includes("SRT")) testDateUtc = moment.utc(dateString.replace('SRT', '')).add(3, 'hours');
                var localDate = moment(testDateUtc).local();
                var s = localDate.format("DD/MM/YYYY HH:mm:ss");
                return s;
            }
            return "";
        }
    };
});