define(function () {
	return {
		dateFormat: "MM/DD/YYYY",
		separator: "/",
		dateEntered: "",
		formatPos: {
			mPos: 0,
			dPos: 1,
			yPos: 2
		},
		maxTextLength: 10,
		textChangeCallback: null,
		onPostShow: function (newDateFormat) {
			this.setDateFormat(newDateFormat);
		},
		compPreShow: function (newDateFormat) {
			this.view.tbxDateInputKA.onKeyUp = this.onDateTextChange;
			this.view.tbxDateInputKA.onBeginEditing = this.setFocusSkin;
			this.view.tbxDateInputKA.onEndEditing = this.setNormalSkin;
			this.setNormalSkin();
			this.setDateFormat(newDateFormat);
		},
		setDateFormat: function (newDateFormat) {
			if (newDateFormat === undefined || newDateFormat === null) {
				newDateFormat = "MM/DD/YYYY";
			}
			this.dateFormat = newDateFormat;
			this.view.tbxDateInputKA.maxTextLength = this.dateFormat.length;
			this.separator = this.dateFormat.replace(/[A-Z]|[a-z]/g, "")[0];
			this.view.lblDatePlaceholderKA.text = this.dateFormat;
			this.view.forceLayout();
			this.formatPos.mPos = this.dateFormat.indexOf("M");
			this.formatPos.dPos = this.dateFormat.indexOf("D");
			this.formatPos.yPos = this.dateFormat.indexOf("Y");
			if (this.formatPos.mPos === 0) {
				if (this.formatPos.dPos > this.formatPos.yPos) {
					//myd
					this.formatPos.dPos = 2;
					this.formatPos.yPos = 1;
				} else {
					//mdy
					this.formatPos.dPos = 1;
					this.formatPos.yPos = 2;
				}
			} else if (this.formatPos.dPos === 0) {
				if (this.formatPos.mPos > this.formatPos.yPos) {
					//dym
					this.formatPos.mPos = 2;
					this.formatPos.yPos = 1;
				} else {
					//dmy
					this.formatPos.mPos = 1;
					this.formatPos.yPos = 2;
				}
			} else {
				if (this.formatPos.dPos > this.formatPos.mPos) {
					//ymd
					this.formatPos.dPos = 2;
					this.formatPos.mPos = 1;
				} else {
					//ydm
					this.formatPos.dPos = 1;
					this.formatPos.mPos = 2;
				}
			}
		},
		setFocusSkin: function () {
			this.view.skin = "sknSSP42424215Opacity0";
		},
		setNormalSkin: function () {
			this.view.skin = "sknSSP42424215Opacity0";
		},
		onDateTextChange: function () {
			var dateText = this.view.tbxDateInputKA.text;
			var cursor = this.view.tbxDateInputKA.getSelection().startIndex;
			var prevCursor = cursor;
			var changePos = true;
			if (cursor !== dateText.length) {
				changePos = false;
			}
			var j;
			if (this.dateEntered === dateText) {
				return;
			} else if (this.dateEntered.length < dateText.length) {
				if (!/^\d+$/.test(dateText.slice(dateText.length - 1))) {
					dateText = dateText.slice(0, dateText.length - 1);
				}
				dateNumbers = dateText.replace(new RegExp(this.separator, "g"), "");
				this.dateEntered = "";
				j = 1;
				for (let i = 0; i < dateNumbers.length && j <= this.maxTextLength; i++, j++) {
					this.dateEntered = this.dateEntered + dateNumbers[i];
					if (this.dateFormat[j] === this.separator) {
						this.dateEntered = this.dateEntered + this.separator;
						j++;
					}
				}
				if (this.dateEntered[prevCursor - 1] == this.separator) {
					prevCursor = prevCursor + 1;
				}
				cursor = j;
			} else {
				changePos = false;
				dateNumbers = dateText.replace(new RegExp(this.separator, "g"), "");
				this.dateEntered = "";
				j = 0;
				for (let i = 0; i < dateNumbers.length && j <= this.maxTextLength; i++, j++) {
					if (this.dateFormat[j] === this.separator) {
						this.dateEntered = this.dateEntered + this.separator;
						j++;
					}
					this.dateEntered = this.dateEntered + dateNumbers[i];
				}
			}
			this.view.tbxDateInputKA.text = this.dateEntered;
			this.view.lblEnteredDateKA.text = this.dateEntered;
			this.view.lblDatePlaceholderKA.text = this.dateFormat.slice(this.dateEntered.length);
			this.view.forceLayout();
			if (changePos === true) {
				this.view.tbxDateInputKA.setSelection(cursor, cursor);
			} else {
				this.view.tbxDateInputKA.setSelection(prevCursor, prevCursor);
			}
			if (this.textChangeCallback !== null) {
				this.textChangeCallback();
			}
		},
		getText: function () {
			return this.view.tbxDateInputKA.text;
		},
		setText: function(dateToSet) {
            this.view.tbxDateInputKA.text = dateToSet;
            if(dateToSet == ""){
                this.view.lblEnteredDateKA.text = dateToSet;
                this.view.lblDatePlaceholderKA.text = this.dateFormat;
                return;
            }
            this.onDateTextChange();
        },
		getDateObject: function () {
			var dateArr = this.view.tbxDateInputKA.text.split(this.separator);
			var month = parseInt(dateArr[this.formatPos.mPos]);
			if (month > 12) {
				return "month is greater than 12";
			}
			var date = parseInt(dateArr[this.formatPos.dPos]);
			if (date > new Date(year, month, 0).getDate()) {
				return "date is greater than the no of days in month";
			}
			var year = parseInt(dateArr[this.formatPos.yPos]);
			return (new Date(month + "/" + date + "/" + year));
		},
	};
});