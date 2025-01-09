define([],function () {
  	function Settings_BusinessController(){
      	kony.mvc.Business.Controller.call(this);
    }
  	inheritsFrom(Settings_BusinessController,kony.mvc.Business.Controller);
	Settings_BusinessController.prototype.initializeBusinessController = function(){
    };
    Settings_BusinessController.prototype.execute = function(command)
    {
      kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };
    return Settings_BusinessController;
});
