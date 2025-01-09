define({
    //Type your controller code here
    segTravelNotificationToggle: function() {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.myCards.segMyCards.selectedIndex[1];
        var data = currForm.myCards.segMyCards.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                data[i].imgDropdown = "arrow_up.png";
                data[i].template = "flxTravelNotificationsExpanded";
            } else {
                data[i].imgDropdown = "arrow_down.png";
                data[i].template = "flxTravelNotificationsCollapsed";
            }
        }
        currForm.myCards.segMyCards.setData(data);
    }
});