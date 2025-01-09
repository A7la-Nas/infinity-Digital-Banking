define({

    //Type your controller code here 
    toogleExpandRow: function() {
        var index = this.view.segContract.selectedRowIndex[1];
        var rowData = this.view.segContract.data[0][1][index];
        if (rowData.lblDropdown.text === "O") {
            rowData.flxCustomer.isVisible = true;
            rowData.lblDropdown.text = "P";
            rowData.imgDropdown.src = "arrow_up.png";
        } else {
            rowData.flxCustomer.isVisible = false;
            rowData.lblDropdown.text = "O";
            rowData.imgDropdown.src = "arrow_down_1.png";
        }
        this.view.segContract.setDataAt(rowData, index, 0);
    },
    toogleRowCheckBox: function() {
        // toolge check box
        var index = this.view.segContract.selectedRowIndex[1];
        var rowData = this.view.segContract.data[0][1][index];
        if (rowData.lblCheckBoxSelect.text === "D") {
            rowData.lblCheckBoxSelect.text = "C";
            rowData.imgRowCheckBox.src = "activecheckbox.png";
        } else {
            rowData.lblCheckBoxSelect.text = "D";
            rowData.imgRowCheckBox.src = "inactivecheckbox.png";
        }
        this.view.segContract.setDataAt(rowData, index, 0);
    }

});