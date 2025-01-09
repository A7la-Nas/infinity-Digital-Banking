define({
    //Type your controller code here
    segTravelNotificationToggle1: function() {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.myCards.segMyCards.selectedIndex[1];
        var data = currForm.myCards.segMyCards.data;
        data[index].imgDropdown = "arrow_down.png";
        data[index].template = "flxTravelNotificationsCollapsed";
        currForm.myCards.segMyCards.setDataAt(data[index], index);
    }
});