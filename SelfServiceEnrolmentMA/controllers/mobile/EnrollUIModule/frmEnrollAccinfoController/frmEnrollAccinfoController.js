define({
  imgCheckOnClick:function()
  {
    if(this.view.imgCheck.src=== "remembermetick.png") {
            this.view.imgCheck.src = "remeberme.png";
    }
    else
      {
        this.view.imgCheck.src="remembermetick.png";
      }
    this.view.flxTermsAndConditions.forceLayout();
  }
});