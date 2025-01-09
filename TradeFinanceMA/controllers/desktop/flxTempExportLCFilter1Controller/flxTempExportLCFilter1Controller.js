define({
    onViewCreated: function () {
        this.view.lblIcon.onTouchEnd = function () {
            const data = {
                segWidget: arguments[3].widgetInfo.id,
                sectionIndex: arguments[3].sectionIndex,
                rowIndex: arguments[3].rowIndex
            };
            try {
                this.executeOnParent("onFilterSelection", data);
            } catch (e) {
                const frmController = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
                if ("onFilterSelection" in frmController) frmController.onFilterSelection(data);
            }
        }.bind(this);
    }
});