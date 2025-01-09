define({
    toggleCheckBox: function() {
        var index;
        var data;
        var index1;
        var data1;
        var i;
        if (kony.application.getCurrentForm().settings.flxEditPhoneNumbersWrapper.isVisible === "true") {
            index = kony.application.getCurrentForm().settings.segEditPhoneNumberOption1.selectedRowIndex[1];
            data = kony.application.getCurrentForm().settings.segEditPhoneNumberOption1.data;
            for (i = 0; i < data.length; i++) {
                if (i === index) {
                    if (data[i].imgCheckBox === "unchecked_box.png") {
                        data[i].imgCheckBox = "checked_box.png";
                    } else {
                        data[i].imgCheckBox = "unchecked_box.png";
                    }
                }
                kony.application.getCurrentForm().settings.segEditPhoneNumberOption1.setData(data);
            }
            index1 = kony.application.getCurrentForm().settings.segEditPhoneNumberOption2.selectedRowIndex[1];
            data1 = kony.application.getCurrentForm().settings.segEditPhoneNumberOption2.data;
            for (i = 0; i < data1.length; i++) {
                if (i === index1) {
                    if (data1[i].imgCheckBox === "unchecked_box.png") {
                        data1[i].imgCheckBox = "checked_box.png";
                    } else {
                        data1[i].imgCheckBox = "unchecked_box.png";
                    }
                }
                kony.application.getCurrentForm().settings.segEditPhoneNumberOption2.setData(data1);
            }
        }
        if (kony.application.getCurrentForm().settings.flxAddPhoneNumbersWrapper.isVisible === "true") {
            index = kony.application.getCurrentForm().settings.segAddPhoneNumbersOption1.selectedRowIndex[1];
            data = kony.application.getCurrentForm().settings.segAddPhoneNumbersOption1.data;
            for (i = 0; i < data.length; i++) {
                if (i === index) {
                    if (data[i].imgCheckBox === "unchecked_box.png") {
                        data[i].imgCheckBox = "checked_box.png";
                    } else {
                        data[i].imgCheckBox = "unchecked_box.png";
                    }
                }
                kony.application.getCurrentForm().settings.segAddPhoneNumbersOption1.setData(data);
            }
            index1 = kony.application.getCurrentForm().settings.segAddPhoneNumbersOption2.selectedRowIndex[1];
            data1 = kony.application.getCurrentForm().settings.segAddPhoneNumbersOption2.data;
            for (i = 0; i < data1.length; i++) {
                if (i === index1) {
                    if (data1[i].imgCheckBox === "unchecked_box.png") {
                        data1[i].imgCheckBox = "checked_box.png";
                    } else {
                        data1[i].imgCheckBox = "unchecked_box.png";
                    }
                }
                kony.application.getCurrentForm().settings.segAddPhoneNumbersOption2.setData(data1);
            }
        }
    }
});