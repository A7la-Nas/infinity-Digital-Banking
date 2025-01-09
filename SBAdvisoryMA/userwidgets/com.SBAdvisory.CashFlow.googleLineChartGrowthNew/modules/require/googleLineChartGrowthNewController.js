define([], function() {
  var skins = {
    "#FFF": "sknFlxffffff",
    "#F6F6F6": "sknFlxffffff"
  }

  return {
    onPreShow: function() {
      this.view.flxBottom.skin = skins[this.customBackgroundColor];
    }
  };
});