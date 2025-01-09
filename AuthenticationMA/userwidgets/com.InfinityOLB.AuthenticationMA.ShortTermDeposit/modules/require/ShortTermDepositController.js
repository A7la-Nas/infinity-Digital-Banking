define(function() {

	return {
     RenderCal: function()
      {
        var context1={"widget":this.view.CalendarPyOn,"anchor":"bottom"};       
        this.view.CalendarPyOn.setContext(context1);
//         var context2={"widget":this.view.flxDeliverByCalRender,"anchor":"bottom"};       
//         this.view.CalDeliverBy.setContext(context2);
      }

	};
});

