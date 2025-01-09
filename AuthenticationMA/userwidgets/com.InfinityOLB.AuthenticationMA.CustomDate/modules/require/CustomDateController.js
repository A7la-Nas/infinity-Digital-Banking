define(function() {

    return {
        isFormatSet: false,
        isGerman: 0,
        isddmmyyyy: 0,
        preShow: function() {
            var scope = this;
            var widgets = this.view.flxWrapper.widgets();
            for (var i = 0; i < widgets.length; i++) {
                widgets[i].onKeyUp = scope.onKeyUp;
            }
            // this.setDateFormat();
        },
        onTextChange: function(callback){
            this.view.txt1.onTextChange = callback;
            this.view.txt2.onTextChange = callback;
            this.view.txt3.onTextChange = callback;
            this.view.txt4.onTextChange = callback;
            this.view.txt5.onTextChange = callback;
            this.view.txt6.onTextChange = callback;
            this.view.txt7.onTextChange = callback;
            this.view.txt8.onTextChange = callback;
        },
        onKeyUp: function(eventobject) {
            var widgets = this.view.flxWrapper.widgets();
            var index = 0;
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i].id === eventobject.id) {
                    index = i;
                    break;
                }
            }
            var text = widgets[index].text;
            if (text === "") {
                if (index !== 0) {
                    widgets[index - 1].setFocus(true);
                    widgets[index - 1].setSelection(3);
                }
            } else if (kony.string.isNumeric(text)) {
                if (index !== 7) {
                    widgets[index + 1].setFocus(true);
                    widgets[index + 1].setSelection(3);
                }
            } else {
                widgets[index].text = "";
                widgets[index].setFocus(true);
                widgets[index].setSelection(3);
            }
          	if(eventobject.id === "txt8"){
				this.view.txt8.onTextChange();
			}
        },
        getDate: function() {
            var date, formatnew,valid;
            var view = this.view;
            if (view["txt1"].text && view["txt2"].text && view["txt3"].text && view["txt4"].text && view["txt5"].text && view["txt6"].text && view["txt7"].text && view["txt8"].text) {
                if (this.isGerman === 0) date = view["txt1"].text.trim() + view["txt2"].text.trim() + view["lbl1"].text.trim() + view["txt3"].text.trim() + view["txt4"].text.trim() + view["lbl2"].text.trim() + view["txt5"].text.trim() + view["txt6"].text.trim() + view["txt7"].text.trim() + view["txt8"].text.trim();
                else date = view["txt1"].text.trim() + view["txt2"].text.trim() + view["txt3"].text.trim() + view["txt4"].text.trim() + view["lbl1"].text.trim() + view["txt5"].text.trim() + view["txt6"].text.trim() + view["lbl2"].text.trim() + view["txt7"].text.trim() + view["txt8"].text.trim();
                if (this.isddmmyyyy === 1) {
                    valid = this.isValidDate(date.substr(0, 2),date.substr(3, 2),date.substr(6,4));
                } else if (this.isddmmyyyy === 0) {
                    valid = this.isValidDate(date.substr(5, 2),date.substr(8, 2),date.substr(0,4));
                } else if(this.isddmmyyyy === 2){
                    valid = this.isValidDate(date.substr(3, 2),date.substr(0, 2),date.substr(6,4));
                }
                else
                   valid = this.isValidDate(date.substr(8, 2),date.substr(5, 2),date.substr(0,4));
                if (valid === false) return "";
                else return date;
            } else console.log("Invalid date");
            return "";
        },
        setDateFormat: function(format) {
            if (this.isFormatSet) return;
            if (format === "MM/DD/YYYY" || format === "DD/MM/YYYY" || format === "MM.DD.YYYY" || format === "DD.MM.YYYY" || format === "MM-DD-YYYY" || format === "DD-MM-YYYY") {
                this.isGerman = 0;
                if (format === "DD/MM/YYYY" || format === "DD.MM.YYYY" || format === "DD-MM-YYYY") this.isddmmyyyy = 1;
                else this.isddmmyyyy = 2;
                var data = [5, 0, 10, 1, 10, 0, 0, 0, 30, 68];
                this.CalendarUI(data);
                this.setDateFormatValue(2, 5, format);
            } else if (format === "YYYY/MM/DD" || format === "YYYY/DD/MM" || format === "YYYY.MM.DD" || format === "YYYY.DD.MM" || format === "YYYY-MM-DD" || format === "YYYY-DD-MM") {
                console.log("German date format");
                if (format === "YYYY/DD/MM" || format === "YYYY.DD.MM" || format === "YYYY-DD-MM") this.isddmmyyyy = 0;
                else
                this.isddmmyyyy = 3;
                this.isGerman = 1;
                var data = [5, 0, 0, 1, 10, 0, 10, 0, 58, 93];
                this.CalendarUI(data);
                this.setDateFormatValue(4, 7, format);
            }
        },
        daysInMonth: function (m, y) {
            switch (m) {
                case 1 :
                    return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
                case 8 : case 3 : case 5 : case 10 :
                    return 30;
                default :
                    return 31
            }
        },
        isValidDate: function (d, m, y) {
            m = parseInt(m, 10) - 1;
            return m >= 0 && m < 12 && d > 0 && d <= this.daysInMonth(m, y);
        },
        CalendarUI: function(data) {
            var j = 0;
            var widgets = this.view.flxWrapper.widgets();
            for (var i = 0; i < widgets.length; i++) {
                widgets[i].left = data[j] + "dp";
                j++;
            }
            this.view.lbl1.left = data[8] + "dp";
            this.view.lbl2.left = data[9] + "dp";
            this.view.forceLayout();
        },
        setDate: function(format) {
            if (format) {
                var valid;
                if(this.isddmmyyyy === 1){
                    var formatnew = format.substr(3,2) +format[2]+format.substr(1,2) +format.substr(5,5);
                    //console.log("updated date"+formatnew);
                }
                else if(this.isddmmyyyy === 0){
                    var formatnew = format.substr(0,5) + format.substr(8,2) +format[7]+ format.substr(5,2);
                   // console.log("updated date"+formatnew);
                }
                else
                    var formatnew = format;
                var t = new Date(formatnew);
                valid = !isNaN(t.valueOf());
                if (valid === true) {
                    if (this.isGerman === 0) {
                        this.setDateValue(2, 5, format);
                    } else if (this.isGerman === 1) {
                        this.setDateValue(4, 7, format);
                    }
                } else {
                    console.log("Invalid date");
                   // this.ClearDate();
                }
            } else {
               // this.ClearDate();
            }
        },
        setDateValue: function(lblpos1, lblpos2, format) {
            var j = 0;
            var widgets = this.view.flxWrapper.widgets();
            for (var i = 0; i < widgets.length; i++) {
                if (j === lblpos1 || j === lblpos2) {
                    j++;
                    widgets[i].text = format[j];
                    if (i === lblpos1 || i === (lblpos2 - 1)) {
                        j++;
                    }
                } else {
                    widgets[i].text = format[j];
                    j++;
                }
            }
        },
       ClearDate: function() {
            var widgets = this.view.flxWrapper.widgets();
            for (var k = 0; k < widgets.length; k++) widgets[k].text = "";
       },
       setDateFormatValue: function(val1,val2,format){
            var l = 0;
            var widgets = this.view.flxWrapper.widgets();
            for (var i = 0; i < widgets.length; i++) {
               if (l === val1 || l === val2) {
                 l++;
                 widgets[i].placeholder = format[l];
                 widgets[i].text = "";
                 if (i === val1 || i === val2) {
                   l++;
                 }
               } else {
                 widgets[i].placeholder = format[l];
                 widgets[i].text = "";
                 l++;
               }
             }
             this.view.lbl1.text = format[val1];
             this.view.lbl2.text = format[val2];
       }
    };
});