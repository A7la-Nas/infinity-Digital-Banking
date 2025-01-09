define(['CommonUtilities'], function(CommonUtilities) {

	return {
     RenderCal: function()
      {
        var context1={"widget":this.view.CalendarPyOn,"anchor":"bottom"};       
        this.view.CalendarPyOn.setContext(context1);
         CommonUtilities.setA11yFoucsHandlers(this.view.txtTransferTo, this.view.flxTo, this)
//         var context2={"widget":this.view.flxDeliverByCalRender,"anchor":"bottom"};       
//         this.view.CalDeliverBy.setContext(context2);
      }

	};
});

