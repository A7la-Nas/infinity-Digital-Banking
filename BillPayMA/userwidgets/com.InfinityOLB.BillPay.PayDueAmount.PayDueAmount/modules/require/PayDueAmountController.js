define(function() {

	return {
     renderCalendar: function()
      {
        var context1={"widget":this.view.CalendarSendDate,"anchor":"bottom"};       
        this.view.CalendarSendDate.setContext(context1);
        //var context2={"widget":this.view.flxDeliverByCalRender,"anchor":"bottom"};       
        //this.view.CalDeliverBy.setContext(context2);
      }

	};
});