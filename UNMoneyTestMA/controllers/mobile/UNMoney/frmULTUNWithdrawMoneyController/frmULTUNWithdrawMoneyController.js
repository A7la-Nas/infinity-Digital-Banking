define({ 

// Type your controller code here
    frmULTUNSendMoneyPreShow: function () {
        // Bind the onClick events for the buttons
        this.view.btnSend.onClick = this.UNSendData.bind(this);
    },

    UNSendData: function () {
    try {
        var filePath;

        // Determine the platform and set the file path accordingly
        if (kony.os.deviceInfo().name === "android") {
            filePath =  "/Internal storage/Download/osama.pdf";
            //filePath = kony.io.FileSystem.internalStorageDirectoryPath + "/osama.pdf";
        } else if (kony.os.deviceInfo().name === "iPhone" || kony.os.deviceInfo().name === "iPad") {
            filePath = kony.io.FileSystem.getDataDirectoryPath() + "/osama.pdf"; // Adjust if the path differs
        } else {
            alert("Unsupported platform for sharing files.");
            return;
        }

        // Get the file reference
        var file = new kony.io.File(filePath);

        // Check if the file exists
       // if (file.exists()) {
            // Share the file
            var shareConfig = {
                "mimeType": "application/pdf", // MIME type for PDF
                "filePath": filePath,
                "message": "Please check this document."
            };

            kony.share.send(
                shareConfig,
                this.onShareSuccess.bind(this),
                this.onShareFailure.bind(this)
            );
        // } else {
        //     alert("File not found at path: " + filePath);
        // }
    } catch (e) {
        alert("Error: " + e.message);
    }
},

    // Success callback
    onShareSuccess: function (response) {
        alert("File shared successfully!");
    },

    // Failure callback
    onShareFailure: function (error) {
        alert("Failed to share the file: " + JSON.stringify(error));
    },
 });