define({
  /**
   * Triggers when the view is created.
   */
  onViewCreated: function () {
    this.view.flxIcon.cursorType = 'pointer';
    this.view.flxIcon.onClick = function () {
      const data = {
        'segWidget': arguments[1].widgetInfo.id,
        'sectionIndex': arguments[1].sectionIndex,
        'rowIndex': arguments[1].rowIndex
      };
      try {
        this.executeOnParent("onFilterSelection", data);
      } catch (e) {
        const frmController = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
        if ("onFilterSelection" in frmController) {
          frmController.onFilterSelection(data);
        }
      }
    }.bind(this);
  }
});