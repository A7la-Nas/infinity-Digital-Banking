define({
    toggleSurveyQuestionTransfersCheckBox: function() {
        var index = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                if (data[i].lblcheckbox1 === "D") {
                    data[i].lblcheckbox1 = "C";
                    data[i].flxcheckbox1.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-labelledby": "lblTranfers",
                            "aria-checked": true
                        }
                    }
                } else {
                    data[i].lblcheckbox1 = "D";
                    data[i].flxcheckbox1.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-labelledby": "lblTransfers",
                            "aria-checked": false
                        }
                    }
                }
            }
            kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setDataAt(data[index], index);
          	kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.rowTemplate="flxSurveyQuestion2";
			kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setActive(index,0, "flxSurveyQuestion2.flxSurveyQuestion2Wrapper.flxTransfers.flxcheckbox1");
        }
    },
    toggleSurveyQuestionBillPayCheckBox: function() {
        var index = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                if (data[i].lblcheckbox2 === "D") {
                    data[i].lblcheckbox2 = "C";
                    data[i].flxcheckbox2.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-labelledby": "lblBillpay",
                            "aria-checked": true
                        }
                    }
                } else {
                    data[i].lblcheckbox2 = "D";
                    data[i].flxcheckbox2.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-labelledby": "lblBillpay",
                            "aria-checked": false
                        }
                    }
                }
            }
            kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setDataAt(data[index], index);
          	kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.rowTemplate="flxSurveyQuestion2";
			kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setActive(index,0, "flxSurveyQuestion2.flxSurveyQuestion2Wrapper.flxbillpay.flxcheckbox2");
        }
    },
    toggleSurveyQuestionSecuritySettingCheckBox: function() {
        var index = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                if (data[i].lblcheckbox3 === "D") {
                    data[i].lblcheckbox3 = "C";
                    data[i].flxcheckbox3.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-labelledby": "lblSecurityQuestionSettings",
                            "aria-checked": true
                        }
                    }
                } else {
                    data[i].lblcheckbox3 = "D";
                    data[i].flxcheckbox3.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-labelledby": "lblSecurityQuestionSettings",
                            "aria-checked": false
                        }
                    }
                }
            }
            kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setDataAt(data[index], index);
          	kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.rowTemplate="flxSurveyQuestion2";
			kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setActive(index,0, "flxSurveyQuestion2.flxSurveyQuestion2Wrapper.flxSecurityQuestionSetting.flxcheckbox3");
        }
    },
    toggleSurveyQuestionNotificationMsgsCheckBox: function() {
        var index = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                if (data[i].lblcheckbox4 === "D") {
                    data[i].lblcheckbox4 = "C";
                    data[i].flxcheckbox4.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-labelledby": "lblnotificationsmsgs",
                            "aria-checked": true
                        }
                    }
                } else {
                    data[i].lblcheckbox4 = "D";
                    data[i].flxcheckbox4.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-labelledby": "lblnotificationsmsgs",
                            "aria-checked": false
                        }
                    }
                }
            }
            kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setDataAt(data[index], index);
          	kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.rowTemplate="flxSurveyQuestion2";
			kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setActive(index,0, "flxSurveyQuestion2.flxSurveyQuestion2Wrapper.flxNotificationsmsgs.flxcheckbox4");
        }
    },
});