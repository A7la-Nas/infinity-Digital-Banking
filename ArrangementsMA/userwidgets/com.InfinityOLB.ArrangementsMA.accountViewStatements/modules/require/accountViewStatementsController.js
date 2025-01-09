define(function() {

	return {
		toggleCheckbox: function(){
          if(this.view.imgChecbox.src == "checked_box.png"){
            this.view.imgChecbox.src = "unchecked_box.png";
          }else{
            this.view.imgChecbox.src= "checked_box.png";
          }
        }
	};
});