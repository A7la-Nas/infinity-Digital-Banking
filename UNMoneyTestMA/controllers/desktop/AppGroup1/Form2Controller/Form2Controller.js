define({ 

 //Type your controller code here 
 frmPreShow: function () {
        // Bind the onClick events for the buttons
        
        this.view.btnTest.onClick = this.generateCode;
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
        this.qrcodegenerator.generate();
    } else {
         alert("Input data to generate code.");
    }
    },

 });