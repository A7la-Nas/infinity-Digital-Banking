define({
    onViewCreated: function () {
        this.view.flxMain.flxDropdown.onClick = function () {
            const data = {
                sectionIndex: arguments[1].sectionIndex,
                rowIndex: arguments[1].rowIndex,
                segmentId: arguments[1].widgetInfo.id
            };
            try {
                this.executeOnParent("toggleSectionHeader", data);
            } catch (e) {
                const frmController = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
                if ("toggleSectionHeader" in frmController) frmController.toggleSectionHeader(data);
            }
        }.bind(this);
    }
});