define({ 

// Type your controller code here
    frmULTUNSendMoneyPreShow: function () {
        // Bind the onClick events for the buttons
        
        this.view.btnSend.onClick = this.generateCode;
    },

    initQRcodeGeneratorComponent: function() {
    var qrCodeGenerator = new kony.ui.CustomWidget({
        id: "qrcodegenerator",
        isVisible: true,
        clipBounds: true,
        skin: "slFbox",
        top: "50dp",
        width: "300dp",
        height: "300dp",
        centerX: "50%",
        zIndex: 1,
        layoutType: kony.flex.FREE_FORM
    }, {}, {
        widgetName: "qrcodegenerator"
    });

    qrCodeGenerator.dataToEncode = "voltmx";
    qrCodeGenerator.colorLight = "#ffffff";
    qrCodeGenerator.colorDark = "#000000";
    qrCodeGenerator.correctLevel = "Level Q";

    this.view.flxContainer.add(qrCodeGenerator);
},

    generateCode: function() {
        //this.initQRcodeGeneratorComponent();
       // this.view.txtContent.text ? (this.view.qrcodegenerator.dataToEncode = this.view.txtContent.text,
        //this.view.qrcodegenerator.generate()) : alert("Input data to generate code.")

        if (this.view.txtContent.text) {
        // Set the text to the QR code generator's dataToEncode property
        var qrcodegenerator = new com.voltmxmp.qrcodegenerator({
            id: "qrcodegenerator",
            isVisible: true,
            layoutType: kony.flex.FREE_FORM
        }, {}, {});

        // Configure properties
        qrcodegenerator.dataToEncode = "Hello, Kony!";
        qrcodegenerator.colorDark = "#000000";
        qrcodegenerator.colorLight = "#ffffff";
        qrcodegenerator.correctLevel = "Level Q";

        // Add the component to a flex container
        this.view.flxContainer.add(qrcodegenerator);

        // Generate the QR code
         this.view.qrcodegenerator.dataToEncode = this.view.txtContent.text;
        this.view.flxContainer.qrcodegenerator.generate();
        /*
                    var qrCodeComponent = new com.voltmxmp.qrcodegenerator({
                id: "qrcodegenerator",
                isVisible: true,
                layoutType: kony.flex.FREE_FORM
            }, {}, {});

            // Configure properties
            qrCodeComponent.dataToEncode = "Hello, Kony!";
            qrCodeComponent.colorDark = "#000000";
            qrCodeComponent.colorLight = "#ffffff";
            qrCodeComponent.correctLevel = "Level Q";

            // Add the component to a flex container
            this.view.flxContainer.add(qrCodeComponent);
            //this.view.qrCodeComponent.generate();
            this.view.componentID.generate();*/
    } else {
         alert("Input data to generate code.");
    }
    },
   
 });