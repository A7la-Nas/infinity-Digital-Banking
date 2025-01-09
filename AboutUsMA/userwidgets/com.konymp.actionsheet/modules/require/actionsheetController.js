/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/

define(function() {
	var konymp = konymp || {};
  	var KonyLoggerModule = require("com/konymp/actionsheet/KonyLogger");
  	konymp.logger = (new KonyLoggerModule("Action Sheet")) || function(){};
	return {
      	/**
		 * @constructor constructor
		 * @param basicConfig
		 * @param layoutConfig
		 * @param pspConfig
		*/
		constructor: function(baseConfig, layoutConfig, pspConfig) { 
          	try{
          		konymp.logger.info("Entered constructor of component", konymp.logger.FUNCTION_ENTRY);
              	this.lastOption = 1;
              	this.screenHeight = kony.os.deviceInfo().screenHeight;
              	this.screenWidth = kony.os.deviceInfo().screenWidth;
              	konymp.logger.info("Exiting constructor of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
		
      	/**
		 * @initGettersSetters Logic for getters/setters of custom properties
		*/
		initGettersSetters: function() {
			try{
          		konymp.logger.info("Entered initGettersSetters of component", konymp.logger.FUNCTION_ENTRY);
              	konymp.logger.info("Exiting initGettersSetters of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
		},
      	
      	/**
		 * @function actionSheetPreshow
		 * @scope private
		 * @description this function is invoked each time the action sheet gets loaded.
		*/
      	actionSheetPreshow : function(){
      		try{
              	konymp.logger.info("Entered preshow function of component", konymp.logger.FUNCTION_ENTRY);
              	this.view.isVisible = false;
              	this.view.forceLayout();
              	konymp.logger.info("Exiting preshow function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
            	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
    	},
      
      	/**
		 * @function show
		 * @scope private
		 * @description this function is invoked to change the visibility of action sheet to true.
		*/
      	show : function(){
          	try{
              	konymp.logger.info("Entered show function of component", konymp.logger.FUNCTION_ENTRY);
              	this.lastOption = 1;
              	if(this.headerMainText === null || this.headerMainText === ""){
                  	this.view.lblTitleText.isVisible = false;
                  	this.view.lblDescriptionText.isVisible = false;
                  	this.view.flxHeaderUnderline.isVisible = false;
                }
              	else{
                  	this.view.lblTitleText.isVisible = true;
                  	this.view.flxHeaderUnderline.isVisible = true;
                  	if(this.headerSubText === null || this.headerSubText === ""){
                  		this.view.lblDescriptionText.isVisible = false;
                	}
              		else{
                  		this.view.lblDescriptionText.isVisible = true;
                	}
                }
              	if(this.option1Text === null || this.option1Text === ""){
                  	this.view.btnOption1.isVisible = false;
                  	this.view.flxOption1Underline.isVisible = false;
                }
              	else{
                  	this.view.btnOption1.isVisible = true;
                  	this.view.flxOption1Underline.isVisible = true;
                }
              	if(this.option2Text === null || this.option2Text === ""){
                  	this.view.btnOption2.isVisible = false;
                  	this.view.flxOption2Underline.isVisible = false;
                }
              	else{
                  	this.view.btnOption2.isVisible = true;
                  	this.view.flxOption2Underline.isVisible = true;
                  	this.lastOption = 2;
                }
              	if(this.option3Text === null || this.option3Text === ""){
                  	this.view.btnOption3.isVisible = false;
                  	this.view.flxOption3Underline.isVisible = false;
                }
              	else{
                  	this.view.btnOption3.isVisible = true;
                  	this.view.flxOption3Underline.isVisible = true;
                  	this.lastOption = 3;
                }
              	if(this.option4Text === null || this.option4Text === ""){
                  	this.view.btnOption4.isVisible = false;
                  	this.view.flxOption4Underline.isVisible = false;
                }
              	else{
                  	this.view.btnOption4.isVisible = true;
                  	this.view.flxOption4Underline.isVisible = true;
                  	this.lastOption = 4;
                }
              	if(this.option5Text === null || this.option5Text === ""){
                  	this.view.btnOption5.isVisible = false;
                  	this.view.flxOption5Underline.isVisible = false;
                }
              	else{
                  	this.view.btnOption5.isVisible = true;
                  	this.view.flxOption5Underline.isVisible = true;
                	this.lastOption = 5;
                }
              	if(this.option6Text === null || this.option6Text === ""){
                  	this.view.btnOption6.isVisible = false;
                  	this.view.flxOption6Underline.isVisible = false;
                }
              	else{
                  	this.view.btnOption6.isVisible = true;
                  	this.view.flxOption6Underline.isVisible = true;
                	this.lastOption = 6;
                }
              	if(this.option7Text === null || this.option7Text === ""){
                  	this.view.btnOption7.isVisible = false;
                  	this.view.flxOption7Underline.isVisible = false;
                }
              	else{
                  	this.view.btnOption7.isVisible = true;
                  	this.view.flxOption7Underline.isVisible = true;
                	this.lastOption = 7;
                }
              	if(this.option8Text === null || this.option8Text === ""){
                  	this.view.btnOption8.isVisible = false;
                }
              	else{
                  	this.view.btnOption8.isVisible = true;
                  	this.lastOption = 8;
                }
              	if(this.lastOption !== 8){
              		this.view["flxOption"+this.lastOption+"Underline"].isVisible = false;
                }
				this.view.centerX = "50%";
				this.view.centerY = "50%";
              	this.view.height = "100%";
              	this.view.width = "100%";
              	this.view.flxActionSheetContent.bottom = "-100%";
              	this.view.isVisible = true;
              	var bottomToSet = (this.screenWidth/this.screenHeight) * 5;
              	this.view.flxActionSheetContent.animate(
					kony.ui.createAnimation({
						"100": {
                          	"bottom": bottomToSet+"%",
							"stepConfig": {
								"timingFunction": kony.anim.EASE
							}
						}
					}), {
						"delay": 0,
						"iterationCount": 1,
						"fillMode": kony.anim.FILL_MODE_FORWARDS,
						"duration": 0.5
					}, { }
				);
              	this.view.forceLayout();
              	konymp.logger.info("Exiting show function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
            	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function dismiss
		 * @scope private
		 * @description this function is invoked to change the visibility of action sheet to false.
		*/
      	dismiss : function(){
          	try{
              	konymp.logger.info("Entered dismiss function of component", konymp.logger.FUNCTION_ENTRY);
          		this.view.flxActionSheetContent.animate(
					kony.ui.createAnimation({
						"100": {
							"bottom":"-100%",
							"stepConfig": {
								"timingFunction": kony.anim.EASE
							}
						}
					}), {
						"delay": 0,
						"iterationCount": 1,
						"fillMode": kony.anim.FILL_MODE_FORWARDS,
						"duration": 0.4
					}, {
                    	animationEnd : function(){
                          	this.view.isVisible = false;
                        }.bind(this)
                    }
				);
            	this.view.forceLayout();
              	konymp.logger.info("Exiting dismiss function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function option1Clicked
		 * @scope private
		 * @description this function is invoked when the first option of action sheeet is clicked.
		*/
      	option1Clicked : function(){
          	try{
              	konymp.logger.info("Entered option1Clicked function of component", konymp.logger.FUNCTION_ENTRY);
              	this.dismiss();
              	if(this.onClickOption1 !== undefined && this.onClickOption1 !== null){
          			this.onClickOption1();
        		}
              	konymp.logger.info("Exiting option1Clicked of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function option2Clicked
		 * @scope private
		 * @description this function is invoked when the second option of action sheeet is clicked.
		*/
      	option2Clicked : function(){
          	try{
              	konymp.logger.info("Entered option2Clicked function of component", konymp.logger.FUNCTION_ENTRY);
              	this.dismiss();
              	if(this.onClickOption2 !== undefined && this.onClickOption2 !== null){
          			this.onClickOption2();
        		}
              	konymp.logger.info("Exiting option2Clicked function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function option3Clicked
		 * @scope private
		 * @description this function is invoked when the third option of action sheeet is clicked.
		*/
      	option3Clicked : function(){
          	try{
              	konymp.logger.info("Entered option3Clicked function of component", konymp.logger.FUNCTION_ENTRY);
              	this.dismiss();
              	if(this.onClickOption3 !== undefined && this.onClickOption3 !== null){
          			this.onClickOption3();
        		}
              	konymp.logger.info("Exiting option3Clicked function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function option4Clicked
		 * @scope private
		 * @description this function is invoked when the fourth option of action sheeet is clicked.
		*/
      	option4Clicked : function(){
          	try{
              	konymp.logger.info("Entered option4Clicked function of component", konymp.logger.FUNCTION_ENTRY);
              	this.dismiss();
              	if(this.onClickOption4 !== undefined && this.onClickOption4 !== null){
          			this.onClickOption4();
        		}
              	konymp.logger.info("Exiting option4Clicked function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function option5Clicked
		 * @scope private
		 * @description this function is invoked when the fifth option of action sheeet is clicked.
		*/
		option5Clicked : function(){
          	try{
              	konymp.logger.info("Entered option5Clicked function of component", konymp.logger.FUNCTION_ENTRY);
              	this.dismiss();
              	if(this.onClickOption5 !== undefined && this.onClickOption5 !== null){
          			this.onClickOption5();
        		}
              	konymp.logger.info("Exiting option5Clicked function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function option6Clicked
		 * @scope private
		 * @description this function is invoked when the sixth option of action sheeet is clicked.
		*/
      	option6Clicked : function(){
          	try{
              	konymp.logger.info("Entered option6Clicked function of component", konymp.logger.FUNCTION_ENTRY);
              	this.dismiss();
              	if(this.onClickOption6 !== undefined && this.onClickOption6 !== null){
          			this.onClickOption6();
        		}
              	konymp.logger.info("Exiting option6Clicked function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function option7Clicked
		 * @scope private
		 * @description this function is invoked when the seventh option of action sheeet is clicked.
		*/
      	option7Clicked : function(){
          	try{
              	konymp.logger.info("Entered option7Clicked function of component", konymp.logger.FUNCTION_ENTRY);
              	this.dismiss();
              	if(this.onClickOption7 !== undefined && this.onClickOption7 !== null){
          			this.onClickOption7();
        		}
              	konymp.logger.info("Exiting option7Clicked function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function option8Clicked
		 * @scope private
		 * @description this function is invoked when the eighth option of action sheeet is clicked.
		*/
      	option8Clicked : function(){
          	try{
              	konymp.logger.info("Entered option8Clicked function of component", konymp.logger.FUNCTION_ENTRY);
              	this.dismiss();
              	if(this.onClickOption8 !== undefined && this.onClickOption8 !== null){
          			this.onClickOption8();
        		}
              	konymp.logger.info("Exiting option8Clicked function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        },
      
      	/**
		 * @function onCloseClick
		 * @scope private
		 * @description this function is invoked when the close of action sheeet is clicked.
		*/
      	onCloseClick : function(){
          	try{
              	konymp.logger.info("Entered onCloseClick function of component", konymp.logger.FUNCTION_ENTRY);
              	this.dismiss();
              	if(this.onClose !== undefined && this.onClose !== null){
          			this.onClose();
        		}
              	konymp.logger.info("Exiting onCloseClick function of component", konymp.logger.FUNCTION_EXIT);
            }
          	catch(e){
              	konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
              	throw e;
            }
        }
    };
});