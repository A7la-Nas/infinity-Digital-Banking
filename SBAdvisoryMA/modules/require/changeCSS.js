define(function () {
  function changeCSS(customCSS) {
    var styleSheet;
    var cssRules = customCSS.split(",");

    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].CustomCSS) {
        styleSheet = document.styleSheets[i];
        break;
      }
    }

    if (!styleSheet) {
      const style = document.createElement("style");
      document.head.appendChild(style);
      styleSheet = style.sheet;
      styleSheet.CustomCSS = true;
    }

    cssRules.forEach(rule => {
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    });
  }

  return changeCSS;
});