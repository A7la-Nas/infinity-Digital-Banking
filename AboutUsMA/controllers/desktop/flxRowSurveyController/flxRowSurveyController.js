define({
    showRatingActionCircle: function(val) {
        var imgdata = [5];
        var index = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                imgdata[1] = data[i].imgRating1;
                imgdata[2] = data[i].imgRating2;
                imgdata[3] = data[i].imgRating3;
                imgdata[4] = data[i].imgRating4;
                imgdata[5] = data[i].imgRating5;
            }
        }
        for (var i = 1; i <= val; i++) {
            imgdata[i] = "circle_blue_filled.png";
        }
        for (i = (val + 1); i <= 5; i++) {
            imgdata[i] = "circle_unfilled.png";
        }
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                data[i].selectedRating = val;
                data[i].imgRating1 = imgdata[1];
                data[i].imgRating2 = imgdata[2];
                data[i].imgRating3 = imgdata[3];
                data[i].imgRating4 = imgdata[4];
                data[i].imgRating5 = imgdata[5];
            }
        }
        var text1 = this.view.lblVeryHard.text;
        var text2 = this.view.lblVeryHard.text.slice(5);
        var text3 = "Neutral";
        var text4 = this.view.lblVeryEasy.text.slice(5);
        var text5 = this.view.lblVeryEasy.text;
        this.setAccessibilityFalse(1, text1, index);
        this.setAccessibilityFalse(2, text2, index);
        this.setAccessibilityFalse(3, text3, index);
        this.setAccessibilityFalse(4, text4, index);
        this.setAccessibilityFalse(5, text5, index);
        if (val === 1) {
            this.setAccessibilityTrue(1, text1, index);
        }
        else if (val === 2) {
            this.setAccessibilityTrue(2, text2, index);
        }
        else if (val === 3) {
            this.setAccessibilityTrue(3, text3, index);
        }
        else if (val === 4) {
            this.setAccessibilityTrue(4, text4, index);
        }
        else {
            this.setAccessibilityTrue(5, text5, index);
        }
        kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setDataAt(data[index], index);
        kony.application.getCurrentForm().forceLayout();
        kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.accessibilityConfig = {
            "a11yARIA": {
                "aria-live": "off",
                tabindex: -1
            }
        }
      let focusWidget="flxRating"+val;
      kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.rowTemplate="flxRowSurvey";
      kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setActive(index,-1, `flxRowSurvey.flxSurveyQuestion1Wrapper.flxaddress.flxRatingimg.${focusWidget}`);
    },
    setAccessibilityFalse: function (val2, text, index) {
        var data = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                var str1 = "flxRating" + val2;
                data[i][str1].accessibilityConfig = {
                    "a11yLabel": text,
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": false
                    }
                }
            }
        }
        kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setDataAt(data[val2], val2);
    },
    setAccessibilityTrue: function (val2, text, index) {
        var data = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                var str1 = "flxRating" + val2;
                data[i][str1].accessibilityConfig = {
                    "a11yLabel": text,
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": true
                    }
                }
            }
        }
        kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.setDataAt(data[val2], val2);
    }
});