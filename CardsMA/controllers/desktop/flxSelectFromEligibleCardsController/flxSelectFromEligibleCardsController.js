define({
    toggleCheckBox: function() {
        var index = kony.application.getCurrentForm().myCards.segMyCards.selectedIndex[1];
        var data = kony.application.getCurrentForm().myCards.segMyCards.data;
        for (var i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                if (data[i].lblCheckBox.text === "C") {
                    data[i].lblCheckBox.text = "D";
                } else {
                    data[i].lblCheckBox.text = "C";
                }
            }
            kony.application.getCurrentForm().myCards.segMyCards.setData(data);
        }
    }
});