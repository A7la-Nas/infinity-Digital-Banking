define({
    onViewCreated: function () {
        this.view.flxMain.flxDropdown.onClick = function () {
            this.executeOnParent("toggleDropdown", {
                sectionIndex: arguments[1].sectionIndex,
                rowIndex: arguments[1].rowIndex
            })
        }.bind(this);
    }
});