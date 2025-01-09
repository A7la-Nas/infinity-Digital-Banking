define(['CommonUtilities'],function(CommonUtilities) {

	return {
      
          constructor: function(baseConfig, layoutConfig, pspConfig) {
              this._tabExapandHeight = "202dp";
              this._SectionData = [];
              this._RowDataMap = [];
              this._DefaultValues = [];
              this._EmptyRowData = [];
              this._Rows = [];
              this._SectionHeaders = [];
              this._ExpandedSection = -1;
              this._ProceedWidget = null;
              this._segWidget = this.view.segTemplates;
              this.onSegmentReload = function () {};
              this.updateTotalEvent = function () {};
          },
      	
      	  resetCollapseSection: function(){
            this._ExpandedSection = -1;
          },
      	
      	  setSegmentReloadAction: function (functionCall) {
            this.onSegmentReload = functionCall;
          },
      
          setSegmentWidget: function(wid) {
			this._segWidget = wid;
          },

      	  setProceedWidget :function(widgetRef) {
			this._ProceedWidget = widgetRef;
          },

      	  getProceedWidget :function() {
			return this._ProceedWidget;
          },

      	  setUpdateTotalEvent: function(fundef) {
            this.updateTotalEvent = fundef;
          },
      
      	  showOrHideDetails: function(context) {
            var row = context.row;
            var section = context.section;
            var break_point = kony.application.getCurrentBreakpoint();
            var orientationHandler = new OrientationHandler();
            var curr_form = kony.application.getCurrentForm().id;
            var imgValue = this._segWidget.data[section][1][row].imgDropDown;
            var flxMainValue = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxMain));
            var dropDownImgObject;
            var collapsedHeight = "51dp";
            if (break_point === 640 || orientationHandler.isMobile) {
                if (curr_form === "frmBBUsersDashboard") {
                    collapsedHeight = "60dp";
                } else if (curr_form === "frmACHDashboard") {
                    collapsedHeight = "62dp";
                } else {
                    collapsedHeight = "70dp";
                }
            }
            if (curr_form === "frmBBApprovalsDashboard") {
				collapsedHeight = "60dp";			 
				var sknObject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxHeader));
                if (sknObject.skin === "bbSKnFlxffffff") {
                    sknObject.skin = "bbSknFlxf9fafb";
				} else {
                    sknObject.skin = "bbSKnFlxffffff";
				}
				var dropdown = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].imgDropDown.text));
				if(dropdown ==='O'){
					sknObject.left = "-3.5dp";
				}	
				else {
					sknObject.left = "0dp";
				}																					  
                this.updateKeyAt("flxHeader", sknObject, row, section);
                var sknObjectLine = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxDetilsHighlighterMain));
				if (sknObjectLine.isVisible === true) {
                    sknObjectLine.isVisible = false;
                } else {
                    sknObjectLine.isVisible = true;
					sknObjectLine.height = "185dp";  								
                }
                var flxVisible = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxTemplateDetails));
                if (flxVisible.isVisible === true) {
                    flxVisible.isVisible = false;
                } else {
                    flxVisible.isVisible = true;
					flxVisible.height = "125px";																   
                }
                var featureActionId = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].featureActionId));
				if(featureActionId === "BULK_PAYMENT_SINGLE_SUBMIT" || featureActionId === "BULK_PAYMENT_MULTIPLE_SUBMIT" ){
					 flxVisible.height = "170px";
					sknObjectLine.height = "230dp";
					
					 var flxBulkPayment = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBulkPaymentsDetails));
                    if (flxBulkPayment.isVisible === true) {
                        flxBulkPayment.isVisible = false;
                    } else {
                        flxBulkPayment.isVisible = true;
                    }
                    this.updateKeyAt("flxBulkPaymentsDetails", flxBulkPayment, row, section);
				}else if (featureActionId === "ACH_PAYMENT_CREATE" || featureActionId === "ACH_COLLECTION_CREATE"){
					var flxACHPayments = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxAChPayments));
                    if (flxACHPayments.isVisible === true) {
                        flxACHPayments.isVisible = false;
                    } else {
                        flxACHPayments.isVisible = true;
                    }
                    this.updateKeyAt("flxAChPayments", flxACHPayments, row, section);
				} else if (featureActionId === "ACH_FILE_UPLOAD"){
					 var flxACH = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxACHFile));
                    if (flxACH.isVisible === true) {
                        flxACH.isVisible = false;
                    } else {
                        flxACH.isVisible = true;
                    }
                    this.updateKeyAt("flxACHFile", flxACH, row, section);
				} else if (featureActionId === "CHEQUE_BOOK_REQUEST_CREATE" || featureActionId === "CHEQUE_BOOK_REQUEST_VIEW"){
					var flxCheckbook = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxCheckBookRequest));
                    if (flxCheckbook.isVisible === true) {
                        flxCheckbook.isVisible = false;
                    } else {
                        flxCheckbook.isVisible = true;
                    }
                    this.updateKeyAt("flxCheckBookRequest", flxCheckbook, row, section);
                
				} else if (['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(featureActionId)){
					var flxBeneficiaryType = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBeneficiaryType));
                    if (flxBeneficiaryType.isVisible === true) {
                        flxBeneficiaryType.isVisible = false;
                    } else {
                        flxBeneficiaryType.isVisible = true;
                    }
                    this.updateKeyAt("flxBeneficiaryType", flxBeneficiaryType, row, section);
                
				}else {
					var flxTransactionTypes = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxTransactionTypes));
                    if (flxTransactionTypes.isVisible === true) {
                        flxTransactionTypes.isVisible = false;
                    } else {
                        flxTransactionTypes.isVisible = true;
                    }
                    this.updateKeyAt("flxTransactionTypes", flxTransactionTypes, row, section);
				}
				this.updateKeyAt("flxTemplateDetails", flxVisible, row, section);
				this.updateKeyAt("flxDetilsHighlighterMain", sknObjectLine, row, section);
			}
            if (curr_form === "frmACHDashboard") {
                var sknObject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxACHViewHeader));
                if (sknObject.skin === "bbSKnFlxffffff") {
                    sknObject.skin = "sknFlxfbfbfb";
                } else {
                    sknObject.skin = "bbSKnFlxffffff";
                }
                this.updateKeyAt("flxACHViewHeader", sknObject, row, section);
            }
              if (curr_form === "frmBulkPaymentsReview") {
                var sknObject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBulkPayementRowHeader));
                if (sknObject.skin === "bbSKnFlxffffff") {
                    sknObject.skin = "bbSknFlxf9fafb";
                } else {
                    sknObject.skin = "bbSKnFlxffffff";
                }
                this.updateKeyAt("flxBulkPayementRowHeader", sknObject, row, section);
            }
            if (curr_form === "frmBulkPaymentsTemplate" ) {
                var sknObject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBulkPayementRowHeader));
                if (sknObject.skin === "bbSKnFlxffffff") {
                    sknObject.skin = "ICSknFlxfbfbfb";
                } else {
                    sknObject.skin = "bbSKnFlxffffff";
                }
                this.updateKeyAt("flxBulkPayementRowHeader", sknObject, row, section);
            }
            if (curr_form === "frmBBMyApprovals" || curr_form === "frmBBMyRequests") {
                if (kony.sdk.isNullOrUndefined(this._segWidget.data[section][1][row].flxMyApprovalsRowHeader) === true) {
                    var sknObject1 = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBPViewHeader));
                } else {
                    var sknObject1 = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxMyApprovalsRowHeader));
                }
                if (sknObject1.skin === "bbSKnFlxffffff") {
                    sknObject1.skin = "bbSknFlxf9fafb";
                } else {
                    sknObject1.skin = "bbSKnFlxffffff";
                }
                if (kony.sdk.isNullOrUndefined(this._segWidget.data[section][1][row].flxMyApprovalsRowHeader) === true) {
                    this.updateKeyAt("flxBPViewHeader", sknObject1, row, section);
                } else {
                    this.updateKeyAt("flxMyApprovalsRowHeader", sknObject1, row, section);
                }
                if (row === this._segWidget.data[0][1].length - 1) {
                    var sknObjectht = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxTopSeperator));
                    if (sknObjectht.isVisible === true) {
                        sknObjectht.isVisible = false;
                    } else {
                        sknObjectht.isVisible = true;
                    }
                    this.updateKeyAt("flxTopSeperator", sknObjectht, row, section);
                }
            }
            if (curr_form === "frmBulkPaymentsDashboard") {
                var sknObject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBPViewHeader));
                if (sknObject.skin === "bbSKnFlxffffff") {
                    sknObject.skin = "bbSknFlxf9fafb";
                } else {
                    sknObject.skin = "bbSKnFlxffffff";
                }
                this.updateKeyAt("flxBPViewHeader", sknObject, row, section);
                var sknObjectLine = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxDetilsHighlighterMain));
                if (sknObjectLine.isVisible === true) {
                    sknObjectLine.isVisible = false;
                } else {
					if (kony.sdk.isNullOrUndefined(this._segWidget.data[section][1][row].flxOngoingPaymentsHeader) === false) {
                    if (this._segWidget.data[section][1][row].flxOngoingPaymentsHeader.isVisible === true) {
                        sknObjectLine.height = "276dp";
                    }
                }
                    sknObjectLine.isVisible = true;
                }
                this.updateKeyAt("flxDetilsHighlighterMain", sknObjectLine, row, section);
            }
            if (curr_form === "frmBBApprovalHistory" || curr_form === "frmBBRequestHistory") {
                var sknObject1 = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxHeader));
                if (sknObject1.skin === "bbSKnFlxffffff") {
                    sknObject1.skin = "bbSknFlxf9fafb";
                } else {
                    sknObject1.skin = "bbSKnFlxffffff";
                }
                this.updateKeyAt("flxHeader", sknObject1, row, section);
            }
            if (imgValue.text === "O") {
                dropDownImgObject = {
                    text: "P",
                    skin: "sknLblFontTypeIcon1a98ff12pxOther",
                  accessibilityConfig: {
                    "a11yLabel": "Collapse"
                  }
                };
                flxMainValue.height = this._tabExapandHeight;
                if (kony.sdk.isNullOrUndefined(this._segWidget.data[section][1][row].flxUploadingFilesDetails) === false) {
                    if (this._segWidget.data[section][1][row].flxUploadingFilesDetails.isVisible === true) {
                        flxMainValue.height = "202dp";
						var sknObjectht = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBottomSeperator));
                        sknObjectht.isVisible = true;
                        sknObjectht.top = "150px";
                        this.updateKeyAt("flxBottomSeperator", sknObjectht, row, section);
                    }
                }
                if (kony.sdk.isNullOrUndefined(this._segWidget.data[section][1][row].flxOngoingPaymentsDetails) === false) {
                    if (this._segWidget.data[section][1][row].flxOngoingPaymentsDetails.isVisible === true) {
                        flxMainValue.height = "277dp";
                    }
                }
				if (kony.sdk.isNullOrUndefined(this._segWidget.data[section][1][row].flxBPOngoingPaymentsDetails) === false) {
                    if (this._segWidget.data[section][1][row].flxBPOngoingPaymentsDetails.isVisible === true) {
					 if(featureActionId === "BULK_PAYMENT_SINGLE_SUBMIT" || featureActionId === "BULK_PAYMENT_MULTIPLE_SUBMIT"){
                        flxMainValue.height = "230dp";
				    }		
				    else{ 	
					    flxMainValue.height = "185dp";
				    }															
                    }
                }
			    if (kony.sdk.isNullOrUndefined(this._segWidget.data[section][1][row].flxPaymentHistoryDetails) === false) {
                  if (this._segWidget.data[section][1][row].flxPaymentHistoryDetails.isVisible === true) {
                    var sknObjectht = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBottomSeperator));
                    sknObjectht.isVisible = true;
                    sknObjectht.top = "150px";
                    this.updateKeyAt("flxBottomSeperator", sknObjectht, row, section);
                  }
                }
                if (curr_form === "frmBulkPaymentsDashboard") {
                    var sknObjectht = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxTopSeperator));
                    sknObjectht.left = "20px";
                    sknObjectht.width = "95%";
                    sknObjectht.isVisible = true;
                    this.updateKeyAt("flxTopSeperator", sknObjectht, row, section);
                if (row === this._segWidget.data[0][1].length - 1) {
                    var sknObjectht = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBottomSeperator));
                     sknObjectht.isVisible = false;
                     this.updateKeyAt("flxBottomSeperator", sknObjectht, row, section);
                }}
            } else {
                dropDownImgObject = {
                    text: "O",
                    skin: "sknLblFontTypeIcon1a98ff12pxOther",
                    accessibilityConfig: {
                    "a11yLabel": "Expand"
                  }
                };
                flxMainValue.height = collapsedHeight;
				if (curr_form === "frmBulkPaymentsDashboard") {
                var sknObjectht = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxTopSeperator));
                sknObjectht.left = "0px";
                sknObjectht.width = "100%";
                sknObjectht.isVisible = true;
                this.updateKeyAt("flxTopSeperator", sknObjectht, row, section);
                if (row === this._segWidget.data[0][1].length - 1) {
                  sknObjectht.isVisible = false;
                  this.updateKeyAt("flxTopSeperator", sknObjectht, row, section);
                }}
            }
            this.updateKeyAt("imgDropDown", dropDownImgObject, row, section);
            this.updateKeyAt("flxMain", flxMainValue, row, section);
            var segData = this._segWidget.data;
            for (var i = 0; i < segData.length; i++) {
                for (var j = 0; j < segData[i][1].length; j++) {
                    if ((!(i === section && j === row)) && segData[i][1][j].imgDropDown) {
                        if (segData[i][1][j].imgDropDown.text === "P") {
                            dropDownImgObject = {
                                text: "O",
                                skin: "sknLblFontTypeIcon1a98ff12pxOther"
                            };
                            var flxMainOld = JSON.parse(JSON.stringify(segData[i][1][j].flxMain));
                            flxMainOld["height"] = collapsedHeight;
                            this.updateKeyAt("imgDropDown", dropDownImgObject, j, i);
                            this.updateKeyAt("flxMain", flxMainOld, j, i);
                        }
                        if (curr_form === "frmACHDashboard") {
                            var sknObjectOld = JSON.parse(JSON.stringify(segData[i][1][j].flxACHViewHeader));
                            sknObjectOld.skin = "bbSKnFlxffffff";
                            this.updateKeyAt("flxACHViewHeader", sknObjectOld, j, i);
                        }
                        if (curr_form === "frmBulkPaymentsReview") {
                            var sknObjectOld = JSON.parse(JSON.stringify(segData[i][1][j].flxBulkPayementRowHeader));
                            sknObjectOld.skin = "bbSKnFlxffffff";
                            this.updateKeyAt("flxBulkPayementRowHeader", sknObjectOld, j, i);
                        }
                        if (curr_form === "frmBBMyApprovals" || curr_form === "frmBBMyRequests") {
                            var sknObjectOld1 = "";
                            if (kony.sdk.isNullOrUndefined(this._segWidget.data[section][1][row].flxMyApprovalsRowHeader)) {
                                sknObjectOld1 = JSON.parse(JSON.stringify(segData[i][1][j].flxBPViewHeader));
                                sknObjectOld1.skin = "bbSKnFlxffffff";
                                this.updateKeyAt("flxBPViewHeader", sknObjectOld1, j, i);
                            } else {
                                sknObjectOld1 = JSON.parse(JSON.stringify(segData[i][1][j].flxMyApprovalsRowHeader));
                                sknObjectOld1.skin = "bbSKnFlxffffff";
                                this.updateKeyAt("flxMyApprovalsRowHeader", sknObjectOld1, j, i);
                            }
                        }
                        if (curr_form === "frmBBApprovalHistory" || curr_form === "frmBBRequestHistory") {
                            var sknObjectOld1 = JSON.parse(JSON.stringify(segData[i][1][j].flxHeader));
                            sknObjectOld1.skin = "bbSKnFlxffffff";
                            this.updateKeyAt("flxHeader", sknObjectOld1, j, i);
                        }
                        if (curr_form === "frmBulkPaymentsDashboard") {
                            var sknObjectOldLine = JSON.parse(JSON.stringify(segData[i][1][j].flxDetilsHighlighterMain));
                            sknObjectOldLine.isVisible = false;
                            this.updateKeyAt("flxDetilsHighlighterMain", sknObjectOldLine, j, i);
                        }
                        if (curr_form === "frmBBApprovalsDashboard") {
							var sknObjectOld = JSON.parse(JSON.stringify(segData[i][1][j].flxHeader));
                            sknObjectOld.skin = "bbSKnFlxffffff";
                            this.updateKeyAt("flxHeader", sknObjectOld, j, i);
                            var sknObjectOldLine = JSON.parse(JSON.stringify(segData[i][1][j].flxDetilsHighlighterMain));
                            sknObjectOldLine.isVisible = false;
                            this.updateKeyAt("flxDetilsHighlighterMain", sknObjectOldLine, j, i);
							 segData[i][1][j].flxTemplateDetails.isVisible = false;
							  segData[i][1][j].imgDropDown.text = "O";
                              segData[i][1][j].imgDropDown.skin = "sknLblFontTypeIcon1a98ff12pxOther";
                              segData[i][1][j].flxAChPayments.isVisible = false;
                              segData[i][1][j].flxBulkPaymentsDetails.isVisible = false;
                               segData[i][1][j].flxACHFile.isVisible = false;
                            segData[i][1][j].flxCheckBookRequest.isVisible = false;
                            segData[i][1][j].flxDetilsHighlighterMain.isVisible = false;
                           segData[i][1][j].flxTransactionTypes.isVisible = false;
                           this._segWidget.setDataAt(segData[i][1][j], j, i);
							
						}
                    }
                }
            }
            if (this.onSegmentReload !== null || this.onSegmentReload !== undefined) {
                this.view.forceLayout();
                this.onSegmentReload();
            }
        },
         showOrHideDetailsHeader: function(context) {
            var row = context.row;
            var section = context.section;
            var break_point = kony.application.getCurrentBreakpoint();
            var orientationHandler = new OrientationHandler();
            var curr_form = kony.application.getCurrentForm().id;
            var imgValue = this._segWidget.data[section][1][row].imgDropDown;
            var flxMainValue = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxMainContent));
            var dropDownImgObject;
            var collapsedHeight = "51dp";
            if (break_point === 640 || orientationHandler.isMobile) {
                if (curr_form === "frmBBUsersDashboard") {
                    collapsedHeight = "60dp";
                } else if (curr_form === "frmACHDashboard") {
                    collapsedHeight = "62dp";
                } else {
                    collapsedHeight = "70dp";
                }
            }
            if (curr_form === "frmBBApprovalsDashboard" || curr_form === "frmBBRequestsDashboard") {
                collapsedHeight = "60dp";
                var sknObject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxMyApprovalsRowHeader));
                if (sknObject.skin === "bbSKnFlxffffff") {
                    sknObject.skin = "bbSknFlxf9fafb";
                } else {
                    sknObject.skin = "bbSKnFlxffffff";
                }
				var dropdown = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].imgDropDown.text));
				if(dropdown ==='O'){
					sknObject.left = "-3.5dp";
				}	
				else {
					sknObject.left = "0dp";
				}		
                this.updateKeyAt("flxMyApprovalsRowHeader", sknObject, row, section);
                var flxVisible = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxTemplateDetails));
                if (flxVisible.isVisible === true) {
                    flxVisible.isVisible = false;
                } else {
                    flxVisible.isVisible = true;
					flxVisible.height = "130dp";										
                }
                var valuetxt = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].featureActionId));
                if (valuetxt === "BULK_PAYMENT_SINGLE_SUBMIT" || valuetxt === "BULK_PAYMENT_MULTIPLE_SUBMIT") {
					flxVisible.height = "183dp"; 
                    var flxBulkPayment = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBulkPaymentsDetails));
                    if (flxBulkPayment.isVisible === true) {
                        flxBulkPayment.isVisible = false;
                    } else {
                        flxBulkPayment.isVisible = true;
                    }
                    this.updateKeyAt("flxBulkPaymentsDetails", flxBulkPayment, row, section);
                    var sknLineobject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxDetilsHighlighterMain));
                    sknLineobject.height = "243dp";
					var bottomseparator = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBottomSeparatorTemplateDeatails));
				   bottomseparator.bottom = "0dp" ;
				    this.updateKeyAt("flxBottomSeparatorTemplateDeatails", bottomseparator, row, section); 
                    if (sknLineobject.isVisible === true) {
                        sknLineobject.isVisible = false;
                    } else {
                        sknLineobject.isVisible = true;
                    }
                    this.updateKeyAt("flxDetilsHighlighterMain", sknLineobject, row, section);
                    if ((valuetxt === "BULK_PAYMENT_SINGLE_SUBMIT" || valuetxt === "BULK_PAYMENT_MULTIPLE_SUBMIT") && curr_form === "frmBBRequestsDashboard") {
                        var sknWithDraw = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].lblReject));
                        sknWithDraw.isVisible = false;
                        this.updateKeyAt("lblReject", sknWithDraw, row, section);
                    }
                } else if (valuetxt === "ACH_PAYMENT_CREATE" || valuetxt === "ACH_COLLECTION_CREATE") {
                    var flxACHPayments = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxAChPayments));
                    if (flxACHPayments.isVisible === true) {
                        flxACHPayments.isVisible = false;
                    } else {
                        flxACHPayments.isVisible = true;
                    }
                    this.updateKeyAt("flxAChPayments", flxACHPayments, row, section);
					
                    var sknLineobject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxDetilsHighlighterMain));
					
                    sknLineobject.height = "190dp";
                    if (sknLineobject.isVisible === true) {
                        sknLineobject.isVisible = false;
                    } else {
                        sknLineobject.isVisible = true;
                    }
                    this.updateKeyAt("flxDetilsHighlighterMain", sknLineobject, row, section);
					var bottomseparator = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBottomSeparatorTemplateDeatails));
				   bottomseparator.bottom = "0dp" ;
				    this.updateKeyAt("flxBottomSeparatorTemplateDeatails", bottomseparator, row, section); 
                } else if (valuetxt === "ACH_FILE_UPLOAD") {
                    var flxACH = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxACHFile));
                    if (flxACH.isVisible === true) {
                        flxACH.isVisible = false;
                    } else {
                        flxACH.isVisible = true;
                    }
                    this.updateKeyAt("flxACHFile", flxACH, row, section);
                    var sknLineobject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxDetilsHighlighterMain));
                    sknLineobject.height = "190dp";
                    if (sknLineobject.isVisible === true) {
                        sknLineobject.isVisible = false;
                    } else {
                        sknLineobject.isVisible = true;
                    }
                    this.updateKeyAt("flxDetilsHighlighterMain", sknLineobject, row, section);
					var bottomseparator = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBottomSeparatorTemplateDeatails));
				   bottomseparator.bottom = "0dp" ;
				   this.updateKeyAt("flxBottomSeparatorTemplateDeatails", bottomseparator, row, section); 
                } else if (valuetxt === "CHEQUE_BOOK_REQUEST_CREATE" || valuetxt === "CHEQUE_BOOK_REQUEST_VIEW") {
                    var flxCheckbook = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxCheckBookRequest));
                    if (flxCheckbook.isVisible === true) {
                        flxCheckbook.isVisible = false;
                    } else {
                        flxCheckbook.isVisible = true;
                    }
                    this.updateKeyAt("flxCheckBookRequest", flxCheckbook, row, section);
                    var sknLineobject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxDetilsHighlighterMain));
                      sknLineobject.height = "260dp";
                    if (sknLineobject.isVisible === true) {
                        sknLineobject.isVisible = false;
                    } else {
                        sknLineobject.isVisible = true;
                    }
                    this.updateKeyAt("flxDetilsHighlighterMain", sknLineobject, row, section);
					var bottomseparator = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBottomSeparatorTemplateDeatails));
				   bottomseparator.bottom = "0dp" ;
				   this.updateKeyAt("flxBottomSeparatorTemplateDeatails", bottomseparator, row, section); 
                } else if (['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(valuetxt)){
					var flxBeneficiaryType = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBeneficiaryType));
                    if (flxBeneficiaryType.isVisible === true) {
                        flxBeneficiaryType.isVisible = false;
                    } else {
                        flxBeneficiaryType.isVisible = true;
                    }
                    this.updateKeyAt("flxBeneficiaryType", flxBeneficiaryType, row, section);
                
                } else {
                    var flxTransactionTypes = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxTransactionTypes));
                    if (flxTransactionTypes.isVisible === true) {
                        flxTransactionTypes.isVisible = false;
                    } else {
                        flxTransactionTypes.isVisible = true;
                    }
                    this.updateKeyAt("flxTransactionTypes", flxTransactionTypes, row, section);
                    var sknLineobject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxDetilsHighlighterMain));
                    if (curr_form === "frmBBApprovalsDashboard" || curr_form === "frmBBRequestsDashboard"){
					sknLineobject.height = "190dp";
					}
					else{
                    sknLineobject.height = "300dp";
                    }
                    if(break_point == 1024){
                      sknLineobject.height = "200dp";
                    }
                    if (sknLineobject.isVisible === true) {
                        sknLineobject.isVisible = false;
                    } else {
                        sknLineobject.isVisible = true;
                    }
                    this.updateKeyAt("flxDetilsHighlighterMain", sknLineobject, row, section);
                    if (valuetxt === "P2P_CREATE") {
                        var lblTransactionReferenceNumber = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].lblTransactionReferenceNumber));
                        lblTransactionReferenceNumber.text = "Transaction ID";
                        this.updateKeyAt("lblTransactionReferenceNumber", lblTransactionReferenceNumber, row, section);
                    } else if (valuetxt === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE" || valuetxt === "INTRA_BANK_FUND_TRANSFER_CREATE" || valuetxt === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") {
                        var lblTransactionAmount = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].lblTransactionAmount));
                        lblTransactionAmount.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Amount");
                        this.updateKeyAt("lblTransactionAmount", lblTransactionAmount, row, section);
                    } else if (valuetxt === "INTERNATIONAL_WIRE_TRANSFER_CREATE" || valuetxt === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") {
                        var lblTransactionAmount = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].lblTransactionAmount));
                        lblTransactionAmount.text = kony.i18n.getLocalizedString("i18n.konybb.Common.AmountWithCharges");
                        this.updateKeyAt("lblTransactionAmount", lblTransactionAmount, row, section);
                    } else if (valuetxt === "BILL_PAY_CREATE") {
                        var lblTransactionReference = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].lblTransactionReference));
                        lblTransactionReference.isVisible = false;
                        this.updateKeyAt("lblTransactionReference", lblTransactionReference, row, section);
                        try{
                          var lblTransactionReferenceVal = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].lblTransactionReferenceVal));
                          lblTransactionReferenceVal.isVisible = false;
                          this.updateKeyAt("lblTransactionReferenceVal", lblTransactionReferenceVal, row, section);
                        } catch(err){
                          kony.print("lblTransactionReferenceVal does not exist! : " + err);
                        }
                        var lblTransactionReferenceNumber = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].lblTransactionReferenceNumber));
                        lblTransactionReferenceNumber.text = "Transaction ID";
                        this.updateKeyAt("lblTransactionReferenceNumber", lblTransactionReferenceNumber, row, section);
                    }
					var bottomseparator = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBottomSeparatorTemplateDeatails));
				   bottomseparator.bottom = "0dp" ;
				   this.updateKeyAt("flxBottomSeparatorTemplateDeatails", bottomseparator, row, section); 
                }
				this.updateKeyAt("flxTemplateDetails", flxVisible, row, section);							
            }
            if (imgValue.text === "O") {
                dropDownImgObject = {
                    text: "P",
                    skin: "sknLblFontTypeIcon1a98ff12pxOther",
                    "accessibilityConfig": {
                        "a11yLabel": "Collapse"
                    }
                };

                flxMainValue.height = kony.flex.USE_PREFERED_SIZE;

              
                if(break_point == 1024){
                  sknLineobject.height = "200dp";
                }

                if (kony.sdk.isNullOrUndefined(this._segWidget.data[section][1][row].flxCheckBookRequest) === false) {
                    if (this._segWidget.data[section][1][row].flxCheckBookRequest.isVisible === true) {
                        flxMainValue.height = kony.flex.USE_PREFERED_SIZE;
                    }
                }
            } else {
                dropDownImgObject = {
                    text: "O",
                    skin: "sknLblFontTypeIcon1a98ff12pxOther",
                    "accessibilityConfig": {
                        "a11yLabel": "Expand"
                    }
                };
                flxMainValue.height = collapsedHeight;
            }
            this.updateKeyAt("imgDropDown", dropDownImgObject, row, section);
            this.updateKeyAt("flxMainContent", flxMainValue, row, section);
            var segData = this._segWidget.data;
            for (var i = 0; i < segData.length; i++) {
                for (var j = 0; j < segData[i][1].length; j++) {
                    if (j === row) {} else {
                        segData[i][1][j].flxTemplateDetails.isVisible = false;
                        segData[i][1][j].flxMainContent.height = collapsedHeight;
                        segData[i][1][j].flxMyApprovalsRowHeader.skin = "bbSKnFlxffffff";
                        segData[i][1][j].imgDropDown.text = "O";
                        segData[i][1][j].imgDropDown.skin = "sknLblFontTypeIcon1a98ff12pxOther";
                        segData[i][1][j].flxAChPayments.isVisible = false;
                        segData[i][1][j].flxBulkPaymentsDetails.isVisible = false;
                        segData[i][1][j].flxACHFile.isVisible = false;
                        segData[i][1][j].flxCheckBookRequest.isVisible = false;
                        segData[i][1][j].flxDetilsHighlighterMain.isVisible = false;
                        segData[i][1][j].flxTransactionTypes.isVisible = false;
                        this._segWidget.setDataAt(segData[i][1][j], j, i);
                    }
                }
            }
        },
    showOrHideMobile: function (context, isPermissionEnabled) {
      var row = context.row;
      var section = context.section;
      var break_point = kony.application.getCurrentBreakpoint();
      var orientationHandler = new OrientationHandler();
      var curr_form = kony.application.getCurrentForm().id;
      var imgValue = this._segWidget.data[section][1][row].imgDropDown;
      var flxMainValue = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxMainContent));
      var dropDownImgObject;
      var flxActions = this._segWidget.data[section][1][row].flxActions;
      var flxActionsApprove = this._segWidget.data[section][1][row].flxActionsApprove;
      var collapsedHeight = "60dp";
      if (break_point === 640 || orientationHandler.isMobile) {
        if (curr_form === "frmBBUsersDashboard") {
          collapsedHeight = "60dp";
        } else if (curr_form === "frmACHDashboard") {
          collapsedHeight = "62dp";
        } else {
          collapsedHeight = "60dp";
        }
      }
      if (curr_form === "frmBBApprovalsDashboard" || curr_form === "frmBBRequestsDashboard") {
        var sknObject = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxMyApprovalsRowHeader));
        if (sknObject.skin === "bbSKnFlxffffff") {
          sknObject.skin = "bbSknFlxf9fafb";
        } else {
          sknObject.skin = "bbSKnFlxffffff";
        }
        this.updateKeyAt("flxMyApprovalsRowHeader", sknObject, row, section);
        var flxVisible = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxTemplateDetails));
        if (flxVisible.isVisible === true) {
          flxVisible.isVisible = false;
        } else {
          flxVisible.isVisible = true;
        }
        this.updateKeyAt("flxTemplateDetails", flxVisible, row, section);
        var valuetxt = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].featureActionId));
        if (valuetxt === "BULK_PAYMENT_SINGLE_SUBMIT" || valuetxt === "BULK_PAYMENT_MULTIPLE_SUBMIT") {
          var flxBulkPaymentsDetails = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxBulkPaymentsDetails));
          if (flxBulkPaymentsDetails.isVisible === true) {
            flxBulkPaymentsDetails.isVisible = false;
          } else {
            flxBulkPaymentsDetails.isVisible = true;
            flxMainValue.height = "840dp";
          }
          this.updateKeyAt("flxBulkPaymentsDetails", flxBulkPaymentsDetails, row, section);
        } else if (valuetxt === "ACH_PAYMENT_CREATE" || valuetxt === "ACH_COLLECTION_CREATE") {
          var flxACHPayments = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxAChPayments));
          if (flxACHPayments.isVisible === true) {
            flxACHPayments.isVisible = false;
          } else {
            flxACHPayments.isVisible = true;
            flxMainValue.height = "500dp";
          }
          this.updateKeyAt("flxAChPayments", flxACHPayments, row, section);
        } else if (valuetxt === "ACH_FILE_UPLOAD") {
          var flxACH = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxACHFile));
          if (flxACH.isVisible === true) {
            flxACH.isVisible = false;
          } else {
            flxACH.isVisible = true;
            flxMainValue.height = "640dp";
          }
          this.updateKeyAt("flxACHFile", flxACH, row, section);
        } else if (valuetxt === "CHEQUE_BOOK_REQUEST_CREATE" || valuetxt === "CHEQUE_BOOK_REQUEST_VIEW") {
          var flxCheckbook = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxCheckBookRequest));
          if (flxCheckbook.isVisible === true) {
            flxCheckbook.isVisible = false;
          } else {
            flxCheckbook.isVisible = true;
            flxMainValue.height = "430dp";
          }
          this.updateKeyAt("flxCheckBookRequest", flxCheckbook, row, section);
        } else {
          var flxTransactionTypes = JSON.parse(JSON.stringify(this._segWidget.data[section][1][row].flxTransactionTypes));
          if (flxTransactionTypes.isVisible === true) {
            flxTransactionTypes.isVisible = false;
          } else {
            flxTransactionTypes.isVisible = true;
            flxMainValue.height = "657dp";
          }
          this.updateKeyAt("flxTransactionTypes", flxTransactionTypes, row, section);
        }
      }
      if (imgValue.text === "O") {
        dropDownImgObject = {
          text: "P",
          skin: "sknLblFontTypeIcon1a98ff12pxOther",
          "accessibilityConfig": {
            "a11yLabel": "Collapse"
          }
        };
        if (!kony.sdk.isNullOrUndefined(isPermissionEnabled)) {
          if (isPermissionEnabled === true) {
            flxActions.isVisible = false;
            flxActionsApprove.isVisible = true;
          }
          else {
            flxActions.isVisible = true;
            flxActionsApprove.isVisible = false;
          }
        }
        else {
          flxActions.isVisible = true;
        }
      } else {
        dropDownImgObject = {
          text: "O",
          skin: "sknLblFontTypeIcon1a98ff12pxOther",
          "accessibilityConfig": {
            "a11yLabel": "Expand"
          }
        };
        flxMainValue.height = collapsedHeight;
        flxActions.isVisible = false;
        flxActionsApprove.isVisible = false;
      }
      this.updateKeyAt("imgDropDown", dropDownImgObject, row, section);
      this.updateKeyAt("flxMainContent", flxMainValue, row, section);
      this.updateKeyAt("flxActions", flxActions, row, section);
      this.updateKeyAt("flxActionsApprove", flxActionsApprove, row, section);
      var segData = this._segWidget.data;
      for (var i = 0; i < segData.length; i++) {
        for (var j = 0; j < segData[i][1].length; j++) {
          if (j === row) { } else {
            segData[i][1][j].flxTemplateDetails.isVisible = false;
            segData[i][1][j].flxMainContent.height = collapsedHeight;
            segData[i][1][j].flxMyApprovalsRowHeader.skin = "bbSKnFlxffffff";
            segData[i][1][j].imgDropDown.text = "O";
            segData[i][1][j].imgDropDown.skin = "sknLblFontTypeIcon1a98ff12pxOther";
            segData[i][1][j].flxAChPayments.isVisible = false;
            segData[i][1][j].flxBulkPaymentsDetails.isVisible = false;
            segData[i][1][j].flxACHFile.isVisible = false;
            segData[i][1][j].flxCheckBookRequest.isVisible = false;
            segData[i][1][j].flxDetilsHighlighterMain.isVisible = false;
            segData[i][1][j].flxTransactionTypes.isVisible = false;
            segData[i][1][j].flxActions.isVisible = false;
            this._segWidget.setDataAt(segData[i][1][j], j, i);
          }
        }
      }
    },
      
          setData: function(data) {
              var newData = CommonUtilities.cloneJSON(data);
              this._segWidget.setData(newData);
              this.view.forceLayout();
              if(this.onSegmentReload !== undefined && this.onSegmentReload !== null) {
                this.onSegmentReload();
              }
          },
      
          getData: function() {
              return this._segWidget.data;
          },
      
          setExpandableRowHeight: function(rowHeight) {
              this._tabExapandHeight = rowHeight + "dp";
          },
      	        
          setSectionData: function(sectionData) {
            var newSectionData = CommonUtilities.cloneJSON(sectionData);
            this._SectionData = newSectionData;
            
          },
      
          getSectionData: function() {
            return this._SectionData;
          },
      
          setRowDataMap: function(rowdataMap) {
            var newRowDataMap = CommonUtilities.cloneJSON(rowdataMap);
            this._RowDataMap = newRowDataMap;
          },
      
          getRowDataMap: function() {
            return this._RowDataMap;
          },
      
          setDefaultValues: function(defaultValues) {
            var newDefaultValues = CommonUtilities.cloneJSON(defaultValues);
            this._DefaultValues = newDefaultValues;
          },
      
          getDefaultValues: function() {
            return this._DefaultValues;
          },

      	  setEmptyRowData: function(emptyRowData) {
            var newEmptyRowData = CommonUtilities.cloneJSON(emptyRowData);
            this._EmptyRowData = newEmptyRowData;
          },
      
          getEmptyRowData: function() {
            return this._EmptyRowData;
          },     
      
          addDataForSections: function(rows) {
            this._Rows = rows;
            this.addRowsData(rows);
          },
      
     	  getDataForSections: function() {
            return this._Rows;
          },
      
      	  addRowsData: function(rows,showHeader) {
            this.setWidgetDataMap();
            var segData = this.createSegmentData(JSON.parse(JSON.stringify(rows)));
            if (typeof showHeader !== 'undefined' && showHeader === false) {
            this.setData(segData[0][1]);// No header should show in case of no records
            }
            else{
                this.setData(segData);
            }
          },
      
    sortData: function (sectionNo, mainSortImg, allSortImgs, sortWidget, sortWidetType, sortOrder) {
      var data = this.getData();
      var widgetPath = "";
      for (var i in allSortImgs) {
        this._SectionData[sectionNo][allSortImgs[i]] = "bbsortingdefault.png";
      }
      if (sortOrder !== undefined && sortOrder !== null) {
        if (sortOrder == "Desc") {
          data[sectionNo][0][mainSortImg] = "bbsortingasc.png";
        } else if (sortOrder == "Asc") {
          data[sectionNo][0][mainSortImg] = "bbsortingdesc.png";
        }
      }
      if (data[sectionNo][0][mainSortImg] == "bbsortingasc.png" || data[sectionNo][0][mainSortImg] == "bbsortingdefault.png") {
        this._SectionData[sectionNo][mainSortImg] = "bbsortingdesc.png";
        sortOrder = "Desc";
      } else if (data[sectionNo][0][mainSortImg] == "bbsortingdesc.png") {
        this._SectionData[sectionNo][mainSortImg] = "bbsortingasc.png";
        sortOrder = "Asc";
      }
      var newSegData = this.sortSegmentData(data, sectionNo, sortWidget, sortWidetType, sortOrder);
      newSegData = this.mapDefaultValues(newSegData);
      if (kony.application.getCurrentForm().id === "frmEnrollBusiness") {
        if (newSegData[sectionNo][0][mainSortImg] == "bbsortingdesc.png") {
          if (sortWidget === "lblAccountNameValue") {
            widgetPath = "flxAccountName";
            newSegData[sectionNo][0]["flxAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, Sorted in Descending order, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, No sort applied , click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountType"].accessibilityConfig = {
              "a11yLabel": "Account Type Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountName") {
            widgetPath = "btnAccountName";
            newSegData[sectionNo][0]["btnAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, Sorted in Descending order, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, No sort applied , click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountNumberValue") {
            widgetPath = "flxAccountNumber";
            newSegData[sectionNo][0]["flxAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, Sorted in Descending order, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountNumber") {
            widgetPath = "btnAccountNumber";
            newSegData[sectionNo][0]["btnAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, Sorted in Descending order, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountTypeValue") {
            widgetPath = "flxAccountType";
            newSegData[sectionNo][0]["flxAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type Coloumn, Sorted in Descending order, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountType") {
            widgetPath = "btnAccountType";
            newSegData[sectionNo][0]["btnAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type Coloumn, Sorted in Descending order, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
        } else {
          if (sortWidget === "lblAccountNameValue") {
            widgetPath = "flxAccountName";
            newSegData[sectionNo][0]["flxAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name coloumn, Sorted in Ascending order, click here to sort in descending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, No sort applied , click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountName") {
            widgetPath = "btnAccountName";
            newSegData[sectionNo][0]["btnAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, Sorted in Ascending order, click here to sort in Descending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, No sort applied , click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountNumber") {
            widgetPath = "btnAccountNumber";
            newSegData[sectionNo][0]["btnAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, Sorted in ascending order, click here to sort in descending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountNumberValue") {
            widgetPath = "flxAccountNumber";
            newSegData[sectionNo][0]["flxAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, Sorted in Ascending order, click here to sort in descending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountTypeValue") {
            widgetPath = "flxAccountType";
            newSegData[sectionNo][0]["flxAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type coloumn, Sorted in Ascending order, click here to sort in descending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["flxAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
          if (sortWidget === "lblAccountType") {
            widgetPath = "btnAccountType";
            newSegData[sectionNo][0]["btnAccountType"].accessibilityConfig = {
              "a11yLabel": "Account type Coloumn, Sorted in Ascending order, click here to sort in descending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountName"].accessibilityConfig = {
              "a11yLabel": "Account Name Coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
            newSegData[sectionNo][0]["btnAccountNumber"].accessibilityConfig = {
              "a11yLabel": "Account Number coloumn, No sort applied, click here to sort in ascending order",
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            }
          }
        }
      }
      if (sortOrder === 'Asc') {
        if (sortWidget === 'lblAccountNameValue') {
          newSegData[sectionNo][0].imgAccountName.src = "sorting_previous.png";
          newSegData[sectionNo][0].imgAccountNumber.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountType.src = "sorting.png";
        } else if (sortWidget === 'lblAccountNumberValue') {
          newSegData[sectionNo][0].imgAccountNumber.src = "sorting_previous.png";
          newSegData[sectionNo][0].imgAccountName.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountType.src = "sorting.png";
        } else if (sortWidget === 'lblAccountTypeValue') {
          newSegData[sectionNo][0].imgAccountType.src = "sorting_previous.png";
          newSegData[sectionNo][0].imgAccountName.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountNumber.src = "sorting.png";
        }
        else if (sortWidget === 'lblAccountName') {
          newSegData[sectionNo][0].imgSortTempName.src = "sorting_previous.png";
          newSegData[sectionNo][0].imgRequestType.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountType.src = "sorting.png";
        } else if (sortWidget === 'lblAccountNumber') {
          newSegData[sectionNo][0].imgRequestType.src = "sorting_previous.png";
          newSegData[sectionNo][0].imgSortTempName.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountType.src = "sorting.png";
        } else if (sortWidget === 'lblAccountType') {
          newSegData[sectionNo][0].imgAccountType.src = "sorting_previous.png";
          newSegData[sectionNo][0].imgSortTempName.src = "sorting.png";
          newSegData[sectionNo][0].imgRequestType.src = "sorting.png";
        }
      } else if (sortOrder === 'Desc') {
        if (sortWidget === 'lblAccountNameValue') {
          newSegData[sectionNo][0].imgAccountName.src = "sorting_next.png";
          newSegData[sectionNo][0].imgAccountNumber.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountType.src = "sorting.png";
        } else if (sortWidget === 'lblAccountNumberValue') {
          newSegData[sectionNo][0].imgAccountNumber.src = "sorting_next.png";
          newSegData[sectionNo][0].imgAccountName.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountType.src = "sorting.png";
        } else if (sortWidget === 'lblAccountTypeValue') {
          newSegData[sectionNo][0].imgAccountType.src = "sorting_next.png";
          newSegData[sectionNo][0].imgAccountName.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountNumber.src = "sorting.png";
        }
        else if (sortWidget === 'lblAccountName') {
          newSegData[sectionNo][0].imgSortTempName.src = "sorting_next.png";
          newSegData[sectionNo][0].imgRequestType.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountType.src = "sorting.png";
        } else if (sortWidget === 'lblAccountNumber') {
          newSegData[sectionNo][0].imgRequestType.src = "sorting_next.png";
          newSegData[sectionNo][0].imgSortTempName.src = "sorting.png";
          newSegData[sectionNo][0].imgAccountType.src = "sorting.png";
        } else if (sortWidget === 'lblAccountType') {
          newSegData[sectionNo][0].imgAccountType.src = "sorting_next.png";
          newSegData[sectionNo][0].imgSortTempName.src = "sorting.png";
          newSegData[sectionNo][0].imgRequestType.src = "sorting.png";
        }
      }
      this.setData(newSegData);
      this.view.forceLayout();
      var frm = kony.application.getCurrentForm();
      if (frm.id === "frmEnrollBusiness") {
        var path = "";
        if (widgetPath.startsWith("btn")) {
          if(widgetPath==="btnAccountName")
          path = "flxEnrollBusinessCompanyDetailsHeader.flxCompanySelectionSubHeader.flxBussinessAccountHeader.flxTemplates.flxAccountName.";
          if(widgetPath==="btnAccountNumber")
          path = "flxEnrollBusinessCompanyDetailsHeader.flxCompanySelectionSubHeader.flxBussinessAccountHeader.flxTemplates.flxAccountNumber.";
          if(widgetPath==="btnAccountType")
          path = "flxEnrollBusinessCompanyDetailsHeader.flxCompanySelectionSubHeader.flxBussinessAccountHeader.flxTemplates.flxAccountType.";
          path = path + widgetPath;
          frm.TabBodyCompanyDetails.segTemplates.setActive(-1, sectionNo, path);
        }
        else {
          path = "flxAuthBusinessAccountsHeader." + widgetPath;
          frm.TabBodyAccountsDetails.segTemplates.setActive(-1, sectionNo, path);
        }

      }
    },
      
      	  filterData: function(sectionNo, filterWidget, filterRegex) {
              this.setWidgetDataMap();
              var data = this.createSegmentData(JSON.parse(JSON.stringify(this._Rows)));
              var filteredData = this.filterSegmentData(data, sectionNo, filterWidget, filterRegex);
              filteredData = this.mapDefaultValues(filteredData);
              this.setData(filteredData);
              this.view.forceLayout();
          },
      
          getSegmentContext: function(){
              var context = this._segWidget.getLastVisibleRow();
              if(kony.sdk.isNullOrUndefined(context.rowIndex)) {
                context.rowIndex = -1;
              }
              return context;
          },
      
          addEmptyRow: function ()
          {
              var context = this.getSegmentContext();
			  var emptyRow = this.getMappedRows(this._RowDataMap[context.sectionIndex], [JSON.parse(JSON.stringify(this._EmptyRowData[context.sectionIndex]))], this._DefaultValues[context.sectionIndex]);
              var newRow = CommonUtilities.cloneJSON(emptyRow[0]);
              this._segWidget.addDataAt(newRow, context.rowIndex + 1, context.sectionIndex);
              this.view.forceLayout();
			  if (this.onSegmentReload !== undefined && this.onSegmentReload !== null) {
                this.onSegmentReload();
			  }
          },
      
          filterSelectedSection : function(sectionNo) {
              this.setWidgetDataMap();
              if(sectionNo === - 1) {
                var segData = this.createSegmentData(JSON.parse(JSON.stringify(this._Rows)));
              	this.setData(segData);
              }
              else {
                var segData = this.createSegmentDataForSingleSection(sectionNo, JSON.parse(JSON.stringify(this._Rows[sectionNo])));
                this.setData(segData);
              }
          },
      
          /**
            Common Utility to Add an extra row to the segment 
            map - widgetDataMap of teh segment
            segmentData - segmentObject
          **/
          addRowForSegment : function(data, map) {
                var segmentData = JSON.parse(JSON.stringify(data));
                var emptyData = JSON.parse(JSON.stringify(map));
                var keys = Object.keys(emptyData);
                for(var i in keys) {
                  emptyData[keys[i]] = "  ";
                }
                for(var i=0; i < segmentData.length; i++) {
                  segmentData[i][1].push(emptyData);
                }
                return segmentData;
            },
      
          /** 
              Common Utility method to filter the Segment Data
              completeData - Data to be sorted
              sectionNo - section number to be filtered
              widgetName - KeyName on whoose value, data needs to be filtered
              filterRegex - Filter Regular expression to match widgetValue
          **/
          filterSegmentData : function(completeData, sectionNo, widgetName, filterRegex) {
              var segmentData = completeData;
              var rows = [];
              for(var j = 0; j < segmentData[sectionNo][1].length; j++) {
                if(filterRegex.test(segmentData[sectionNo][1][j][widgetName])){
                  rows.push(segmentData[sectionNo][1][j]);
                }
              }
              segmentData[sectionNo].pop();
              segmentData[sectionNo].push(rows);
              return segmentData;
          },
      
          /** 
              Common Utility method to sort the Segment Data
              widgetName - KeyName on which data needs to be sorted
              widgetDataType - Datatype  of the widget possible values are (Number, Date, Amount, String)
              sortingOrder - Sorting Order possible values are (DESC, ASC)
          **/
          sortSegmentData : function(completeData, sectionNo, widgetName, widgetDataType, sortingOrder) {
              var segmentData = JSON.parse(JSON.stringify(completeData));

              var SortingFunction  = {
                      sortbyNumberDesc : function(x, y) { 
                        return (y[widgetName] - x[widgetName]);
                      },

                      sortbyNumberAsc : function(x, y) { 
                        return (x[widgetName] - y[widgetName]);
                      },    

                      sortbyAmountDesc : function(x, y) { 
                        var a = CommonUtilities.getFloatValueOfCurrency(x[widgetName]);
                        var b = CommonUtilities.getFloatValueOfCurrency(y[widgetName]);
                        return (b - a);
                      },

                      sortbyAmountAsc : function(x, y) { 
                        var a = CommonUtilities.getFloatValueOfCurrency(x[widgetName]);
                        var b = CommonUtilities.getFloatValueOfCurrency(y[widgetName]);
                        return (a - b);
                      },

                      sortbyStringAsc : function(x, y) { 
                        return ((x[widgetName] == y[widgetName]) ? 0 : ((x[widgetName] > y[widgetName]) ? 1 : -1 ));
                      },

                      sortbyStringDesc : function(x, y) { 
                        return ((x[widgetName] == y[widgetName]) ? 0 : ((y[widgetName] > x[widgetName]) ? 1 : -1 ));
                      },

                      sortbyDateAsc : function(x, y) { 
                        return (new Date(x[widgetName]).getTime() - new Date(y[widgetName]).getTime());
                      },

                      sortbyDateDesc : function(x, y) { 
                        return (new Date(y[widgetName]).getTime() - new Date(x[widgetName]).getTime());
                      },
                      sortbyObjectTextAsc : function(x, y) { 
                        return ((x[widgetName].text.toLowerCase() == y[widgetName].text.toLowerCase()) ? 0 : ((x[widgetName].text.toLowerCase() > y[widgetName].text.toLowerCase()) ? 1 : -1 ));
                      },
                      sortbyObjectTextDesc : function(x, y) { 
                        return ((x[widgetName].text.toLowerCase() == y[widgetName].text.toLowerCase()) ? 0 : ((y[widgetName].text.toLowerCase() > x[widgetName].text.toLowerCase()) ? 1 : -1 ));
                      },
                	  sortbyObjectNumberAsc: function(x, y) {
                   	    return (x[widgetName].text - y[widgetName].text);
                      },
                      sortbyObjectNumberDesc: function(x, y) {
                        return (y[widgetName].text - x[widgetName].text);
                      },	
                	  sortbyObjectTooltipAsc : function(x, y) { 
                        if(!kony.sdk.isNullOrUndefined(x[widgetName].toolTip) && !kony.sdk.isNullOrUndefined(y[widgetName].toolTip)) {
                          return (( x[widgetName].toolTip.toLowerCase() === y[widgetName].toolTip.toLowerCase() ) ? 0 : (( x[widgetName].toolTip.toLowerCase() > y[widgetName].toolTip.toLowerCase() ) ? 1 : - 1 ));
                        }
                        return (( x[widgetName] == y[widgetName] ) ? 0 : (( x[widgetName] > y[widgetName] ) ? 1 : - 1 ));
                      },
                      sortbyObjectTooltipDesc : function(x, y) { 
                        if(!kony.sdk.isNullOrUndefined(x[widgetName].toolTip) && !kony.sdk.isNullOrUndefined(y[widgetName].toolTip)) {
                          return (( x[widgetName].toolTip.toLowerCase() === y[widgetName].toolTip.toLowerCase() ) ? 0 : (( y[widgetName].toolTip.toLowerCase() > x[widgetName].toolTip.toLowerCase() ) ? 1 : - 1 ));
                        }
                        return (( x[widgetName] == y[widgetName] ) ? 0 : (( y[widgetName] > x[widgetName] ) ? 1 : - 1 ));
                      }
              };

              var funcName = "sortby"+widgetDataType+sortingOrder;
              segmentData[sectionNo][1].sort(SortingFunction[funcName]);

              return segmentData;
          },
      
      
          /**
            Common Utility to Map the segment data for the segment with sections
            segmentData - actual data to be Updated
            defaultValues - Which are common across all the rows
            sectionHeaderData - Section Header values to be updated
          **/
          mapDefaultValues : function(segmentData) {
              var segData = [];
              for(var i=0; i < segmentData.length; i++) {
                var sectionData = this.createSegmentSection(this._SectionData[i], {}, segmentData[i][1], this._DefaultValues[i]);
                segData.push(sectionData);
              }
              return segData;
           },
      
      	  /**
            Common Utility to create the segment data for the segment with sections
            segmentData - actual data to be Updated
            defaultValues - Which are common across all the rows
            sectionHeaderData - Section Header values to be updated
          **/
          createSegmentData : function(rows) {
              var segData = [];
              for(var i=0; i < this._SectionData.length; i++) {
                var sectionData = this.createSegmentSection(this._SectionData[i], this._RowDataMap[i], rows[i], this._DefaultValues[i]);
                segData.push(sectionData);
              }
              return segData;
           },
      
      	   setWidgetDataMap: function() {
             var dataMap = {};
             
             for(var j=0; j < this._SectionData.length; j++) {
               var sectionDataKeys = Object.keys(this._SectionData[j]);
               for(var i=0; i<sectionDataKeys.length; i++)
                 dataMap[sectionDataKeys[i]] = sectionDataKeys[i];
             }
             
             for(var j=0; j < this._RowDataMap.length; j++) {
               var rowDataMapKeys = Object.keys(this._RowDataMap[j]);
               for(var i=0; i<rowDataMapKeys.length; i++)
                 dataMap[rowDataMapKeys[i]] = rowDataMapKeys[i];
             }
             
             for(var j=0; j < this._DefaultValues.length; j++) {
               var defaultkeys = Object.keys(this._DefaultValues[j]);
               for(var i=0; i<defaultkeys.length; i++)
                 dataMap[defaultkeys[i]] = defaultkeys[i];
             }
             
             var newWidgetDataMap = CommonUtilities.cloneJSON(dataMap);
             this._segWidget.widgetDataMap = newWidgetDataMap;
           },
      
      	  /**
            Common Utility to create the segment data for the segment with sections
            segmentData - actual data to be Updated
            defaultValues - Which are common across all the rows
            sectionHeaderData - Section Header values to be updated
          **/
          createSegmentDataForSingleSection : function(sectionNo, rows) {
              var segData = [];
              var sectionData = this.createSegmentSection(this._SectionData[sectionNo], this._RowDataMap[sectionNo], rows, this._DefaultValues[sectionNo]);
              var newSectionData = CommonUtilities.cloneJSON(sectionData);
              segData.push(newSectionData);
              return segData;
           },
      
           /**
                    Common Utility to create the segment section data. Later this can be passed to setData method of segment
                    sectionData - Section Hedaer Data to be set
                    rowDataMap - RowDataMap
                    rows - actual data to be shown
                    defaultValues - Which are common across all the rows
            **/
            createSegmentSection : function (sectionData, rowDataMap, rows, defaultValues) {
                  var newSectionData = CommonUtilities.cloneJSON(sectionData);
                  var newRowDataMap = CommonUtilities.cloneJSON(rowDataMap);
                  var newRows = CommonUtilities.cloneJSON(rows);
                  var newDefaultValues = CommonUtilities.cloneJSON(defaultValues);
                  return [
                    newSectionData,
                    this.getMappedRows(newRowDataMap, newRows, newDefaultValues)
                  ];
                  
            },

          /**
            Common Utility to Map the segment data for the segment with sections
            rowDataMap - RowDataMap
            rows - actual data to be shown
            defaultValues - Which are common across all the rows
          **/
          getMappedRows : function(rowDataMap, rowsData, defaultValues) {
                var dataMapValues = Object.values(rowDataMap);
                var dataMapKeys = Object.keys(rowDataMap);
                var rows = JSON.parse(JSON.stringify(rowsData));

                for(var i=0; i < rows.length; i++) {
                  for(var j =0; j < dataMapKeys.length; j++) {
                    if(rows[i].hasOwnProperty(dataMapValues[j]) && dataMapKeys[j] !== dataMapValues[j]) {
                      rows[i][dataMapKeys[j]] = rows[i][dataMapValues[j]];
                      //delete rows[i][dataMapValues[j]];
                    }
                  }
                  for(var val in defaultValues) {
                    rows[i][val] = defaultValues[val];
                  }
                }
                return rows;
          },
      
          updateKeyAt: function(widgetName, value, row, section){
            var data = this.getData();
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this._segWidget.setDataAt(rowDataTobeUpdated, row, section);
          },
      
      	  updateSectionAt: function(widgetName, value, section){
            var data = this.getData();
            var sectionDataTobeUpdated = data[section];
            sectionDataTobeUpdated[0][widgetName] = value;
            this._segWidget.setSectionAt(sectionDataTobeUpdated, section);
          },
      
          callUpdateKeyAt : function( view ) {
            this.updateKeyAt( view.widgetId, view.widget, view.rowIndex, view.sectionIndex );
          },          
      
         updateTotal: function(eventobject) {
           var sum = this.CalculateTotal(eventobject);
           if (kony.application.getCurrentForm().id === "frmACHDashboard") {
             var formController = applicationManager.getPresentationUtility().getController('frmACHDashboard', true);
             if (sum === 0) {
               formController.displayErrorWhileExecutingTemplate(kony.i18n.getLocalizedString("i18n.konybb.ach.TotalShouldNotBeZero"), true);
             }
             else {
               formController.displayErrorWhileExecutingTemplate("", false);
             }
           }
           if(this.updateTotalEvent !== undefined && this.updateTotalEvent !== null)
              this.updateTotalEvent(CommonUtilities.formatCurrencyWithCommas(sum,true));
          },
      
          CalculateTotal: function(eventobject) {
            var data = this.getData();
            var sum = 0;
            for(var i =0; i < data.length; i++) {
              for (var j=0; j < data[i][1].length; j++) {
                var temp;
                if(kony.sdk.isNullOrUndefined(data[i][1][j][eventobject.id])){
                  temp = 0;
                }
                else if(kony.sdk.isNullOrUndefined(data[i][1][j][eventobject.id].text)) {
                  temp = CommonUtilities.getFloatValueOfCurrency(data[i][1][j][eventobject.id]);
                }
                else {
                 temp = CommonUtilities.getFloatValueOfCurrency(data[i][1][j][eventobject.id].text);
                }
                if(isNaN(temp))
                  temp = 0;
                sum = sum + temp;
              }
            }
            return sum;
          },
      	/**
        	Validating textbox values with respect to their content type
        **/
      	validateTextBoxWidgets : function(widgetRef, textValue){
          switch(widgetRef){
            case "tbxCrName" : return textValue.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z 0-9]*)*$/);
            case "tbxCrAccountNumber" : return textValue.match(/^[0-9]+$/);
            case "tbxCrTRCNumber" : return textValue.match(/^[0-9]+$/);
            case "tbxCrDetailID" : return textValue.match(/^[0-9]+$/);
            case "tbxCrAmount" : return (CommonUtilities.getFloatValueOfCurrency(textValue) !== 0 && textValue.match(/^[0-9]*[\.]?[0-9]+$/) !== null);
            case "tbxAdditionalInfo" : return textValue.match(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\ ]+$/);
            case "tbxEmpIDNum" : return textValue.match(/^[0-9]+$/);
            case "tbxAccNum" : return textValue.match(/^[0-9]+$/);
            case "tbxTrcNum": return textValue.match(/^[0-9]+/);
            case "tbxTaxSubAmount" : return (CommonUtilities.getFloatValueOfCurrency(textValue) !== 0 && textValue.match(/^[0-9]*[\.]?[0-9]+$/) !== null);
            case "tbxLowerLimit": return (applicationManager.getFormatUtilManager().deFormatAmount(textValue, ",").match(/^[0-9]*[\.]?[0-9]+$/) !== null &&
                                          CommonUtilities.getFloatValueOfCurrency(textValue) >= 0);
            case "tbxUpperLimit": return (applicationManager.getFormatUtilManager().deFormatAmount(textValue, ",").match(/^[0-9]*[\.]?[0-9]+$/) !== null && 
                                          CommonUtilities.getFloatValueOfCurrency(textValue) > 0);
            case "tbxAmount": return (CommonUtilities.getFloatValueOfCurrency(textValue) !== 0 && textValue.match(/^[0-9]*[\.]?[0-9]+$/) !== null);
          }
        },
      /**
       	This method is used for validating the template records in UserManagement
       **/
      areAllFieldsValid: function() {
        var segData = this.getData();
        var flag = true;
        if (segData === null) return false;
        else{
          segData.forEach(function(accounts) {
            accounts.forEach(function(accountrows) {
              if (accountrows instanceof Array)
                if (accountrows.length) {
                  accountrows.forEach(function(element, id) {
                    for (var widget in element) {
                      if (widget.startsWith("tbx")) {
                        if(element[widget].hasOwnProperty("text")) {
                          var validity = testForValidity(widget, element[widget]["text"]);
                          if(validity === 1 ){
                            var flxName = "flx" + widget.substring(3, widget.length -6) + "Limit";
                      		element[flxName]["skin"] = "bbSknFlxBordere3e3e3Radius3Px";
                          }
                          else if (validity === 0) {
                            var flxname = "flx" + widget.substring(3, widget.length -6) + "Limit";
                            element[flxname]["skin"] = "bbSknFlxBorderFF0000Radius3Px";
                            flag = false;
                          }
                        }
                      }
                    }
                  });
                };
            });
          });
        }
        
        
        
        function testForValidity(widgetName , textValue) {
          switch(widgetName){
            case "tbxPerTransApproveAmount" : return ((/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(textValue))?1:0);
            case "tbxPerTransDenialAmount" : return ((/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(textValue))?1:0);
            case "tbxDailyTransApproveAmount" : return ((/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(textValue))?1:0);
            case "tbxDailyTransDenialAmount" : return ((/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(textValue))?1:0);
            case "lblWeeklyTransApproveSymbol" : return ((/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(textValue))?1:0);
            case "tbxWeeklyTransDenialAmount" : return ((/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(textValue))?1:0);
          }
          return 3;
        }
        
        if(!flag) this.setData(segData);
        return flag;
      },
      	/**
       	This method is used for validating the template records
       **/
      isAllFieldsAreValid: function() {
        var segData = this.getData();
        if (segData === null) return false;
        else{
          for (var sectionIndex = 0; sectionIndex < this._SectionData.length; sectionIndex++) {
            var rows = segData[sectionIndex][1];
            for(var rowIndex = 0; rowIndex < rows.length;rowIndex++){
              var rowWidgets = rows[rowIndex];
              for(var widget in rowWidgets){
                var widgetData = rows[rowIndex][widget];
                if(widgetData.isVisible === false){
                    continue;
                } 
                else if(widget.startsWith("tbx")){
                  if(kony.sdk.isNullOrUndefined(widgetData.text)){
                     continue;
				  }
                  else if (this.validateTextBoxWidgets(widget, widgetData.text)) {
                    var widgetName = widget;
                    if(widgetData.skin === "skntxtSSP424242BorderFF0000Op100Radius2px"){
                      if( widget.includes("Amount") || widget.includes("Limit") ){
                        widgetData.skin = "skntbxffffffBordere3e3e3SSP15px424242";
                      }
                      else{
                        widgetData.skin = "sknTextBoxSSP42424215Px";
                      }
                      this.updateKeyAt(widget,widgetData,rowIndex,sectionIndex);
                      this.onSegmentReload();
                    }
                    else{
                     //no need to update and reload the segment
                    }
                  }
                  else{
                    widgetData.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
                    this.updateKeyAt(widget,widgetData,rowIndex,sectionIndex);
                    this.onSegmentReload();
                    return false; 
                  }
                }
                else if(widget.startsWith("lstbx") || widget.startsWith("lstBx")){
                  if(widgetData.selectedKey !== undefined){
                    var selectedValue = widgetData.selectedKey;
                    if (selectedValue === "-1" || selectedValue === null || selectedValue === undefined) {
                      widgetData.skin = "sknlstff0000disable";
                      this.updateKeyAt(widget, widgetData, rowIndex, sectionIndex);
                      this.onSegmentReload();
                      return false;
                    } else {
                      if(widgetData.skin === "sknlstff0000disable"){
                        widgetData.skin = "sknLbxSSP42424215PxBorder727272";
                        this.updateKeyAt(widget, widgetData, rowIndex, sectionIndex);
                        this.onSegmentReload();
                      }
                      else{
                        //no need to update and reload the segment
                      }
                    }
                  }
                  else{
                    widgetData.skin = "sknlstff0000disable";
                    this.updateKeyAt(widget, widgetData, rowIndex, sectionIndex);
                    this.onSegmentReload();
                    return false;
                  }
                }
              }
            }
          }
          return true;
        }
      },
      searchAndSetCustomFilter : function(filterKeySet,searchValue){
        
        if(searchValue === "") {
          	this.addDataForSections(this._Rows);
        }
        else {
            var filteredData = [];
            for(var section = 0; section < filterKeySet.length; section++) {

                var filterKeys = filterKeySet[section];
                this.setWidgetDataMap();
                var segData = this.createSegmentData(JSON.parse(JSON.stringify(this._Rows)))[section][1];

                var internalSet = [];
                internalSet.push(this._SectionData[section]);
                var dataset = [];

                for (var index = 0; index < segData.length; index++) {
                    for (var keys = 0; keys < filterKeys.length; keys++) {

                        var found = segData[index][filterKeys[keys]];
                        if (!kony.sdk.isNullOrUndefined(found)) {
                            var dataToBeSearched = found;
                            if (typeof found === "object") {
                                dataToBeSearched = found.text;
                            }
                            if (dataToBeSearched.toUpperCase().indexOf(searchValue.toUpperCase()) != -1) {
                                dataset.push(segData[index]);
                                break;
                            }
                        }
                    }
                }
                internalSet.push(dataset);
                filteredData.push(internalSet);
            }

            this._segWidget.setData([]);
            this._segWidget.setData(filteredData);
        }
        if(this.onSegmentReload != null || this.onSegmentReload !== undefined) {
                  	this.view.forceLayout();
                	this.onSegmentReload();
        }
      },


      /** when a row is removed from the tabBody
      *@params rowIndex - integer selected index value
      *@params sectionIndex - integer selected section index value
      **/
      removeRowAt: function(rowIndex, sectionIndex){
        this._segWidget.removeAt(rowIndex, sectionIndex);
      },
    	
      /**
      	This method is used to add the empty section headers to the segement without any rows
      **/
      addOnlySectionHeaders : function(sectionData) {
        this._SectionHeaders = sectionData;
        var segData = [];
        for (var i=0; i < sectionData.length; i++) {
          segData.push([
            sectionData[i],
            []
		  ]);
        }
        this.setData(segData);
      },
      
      /**
      	This method is used to add the rows that are specific section header
      **/
      addRowsAndUpdateSection : function(rowData, sectionIndex, updateParams, updateCollapseParams) {
      	var segData = this._segWidget.data;
        for(var param in updateParams){
          segData[sectionIndex][0][param] = updateParams[param];
        }
        segData[sectionIndex].pop();
        segData[sectionIndex].push(rowData);
        for (var k = 0; k < this._segWidget.data.length; k++) {
          if(k != sectionIndex){
            for(var param in updateCollapseParams){
              segData[k][0][param] = updateCollapseParams[param];
              segData[k].pop();
              segData[k].push([]);
            }
          }
        }
        try{
          this.setData(segData);
        }catch(err){
          kony.print("do nothing");
        }
        if(updateCollapseParams!==null && updateCollapseParams!==undefined){
        if(segData.length !== 1){
          this.collapseSection(updateCollapseParams);
        }
        this._ExpandedSection = sectionIndex;
        }
      },
      
	  /**
      	This method is used to collapse the section that is opened earlier
      **/      
      collapseSection: function(updateParams,index) {
			if(index!== null && index!==undefined){
				this._ExpandedSection=index;
			}
       	if(this._ExpandedSection !== -1) {
          var segData = this._segWidget.data;
          for(var param in updateParams){
           segData[this._ExpandedSection][0][param] = updateParams[param];
          }
          segData[this._ExpandedSection].pop();
          segData[this._ExpandedSection].push([]);
          this._ExpandedSection =-1;
          this.setData(segData);
        }
      },
      /**
      	This method is used to reset the data in the current section when reset button is clicked 
      **/ 
      reset: function(rowData, sectionIndex) {
        var segData = this._segWidget.data;			
        segData[sectionIndex].pop();
        segData[sectionIndex].push(rowData);
        this.setData(segData);			        
      },
     
      resetPopup: function(eventobject, context) {
        var formScope = this.formScopeObj;
        formScope.showResetPopUp(context);
      },
     
      //eventContextParam contains eventobject and context of the listbox widget selected
      updateSegmentOnListBoxSelection : function(eventContextParam){
       	var template = this._segWidget.rowTemplate;
        if(template === "flxEditApprovalLimit") {
          this.hideContentBasedOnLimitType(eventContextParam);
        }
      },
      
      /**
      	This method is used to hide the contents based on limit type in edit approval matrix flow
      **/
      hideContentBasedOnLimitType : function(eventContextParam) {
            var eventobject = eventContextParam.eventobject;
            var context = eventContextParam.context;
            var limitType = eventobject.selectedKeyValue[1];
            this.updateKeyAt("flxUpperLimitContainer", 
                             {
                                  "isVisible" : (limitType === "Range")
                             }, context.rowIndex, context.sectionIndex);
    
            this.updateKeyAt("tbxUpperLimit", 
                             {
              					  "placeholder" : kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
                                  "text" : (limitType === "Range" ? "" : "1")
                             }, context.rowIndex, context.sectionIndex);            
            this.setMasterDataOfListBox();
            this.enableOrDisableProceedWidget();
        },
      
        setMasterDataOfListBox : function( ) {
             var data = this._segWidget.data[0][1];
            
            var uptoCount = 0;
            var aboveCount = 0;
            //read current state and check if one upto and one range selected
            for( var i = 0; i < data.length; i++ ) {
              let type = this.getSelectedKeyValue(data[i]["lstType"].masterData,data[i]["lstType"].selectedKey);
              if( type == "UpTo" ) {
                uptoCount += 1;
              }
              if( type == "Above" ) {
                aboveCount += 1;
              }
            }
            
            var masterData = [["key1","Range"]];
            if( uptoCount === 0 ) {
              masterData.push( ["key2","UpTo"] );
            }
            if( aboveCount === 0 ) {
              masterData.push( ["key3","Above"] );
            }
            
            //update master data accordingly
            for( var j = 0; j < data.length; j++ ) {
              var masterDataNew = [];
              masterDataNew = masterData.slice();
              let type = this.getSelectedKeyValue(data[j]["lstType"].masterData, data[j]["lstType"].selectedKey);
              var selectedKey = data[j]["lstType"].selectedKey;
              if( uptoCount > 0 && type == "UpTo" ) {
                masterDataNew.push( ["key2","UpTo"] );
              }
              if( aboveCount > 0 && type == "Above" ) {
                masterDataNew.push( ["key3","Above"] );
              }  
              data[j].lstType = {
                "masterData": masterDataNew,
                "selectedKey": selectedKey          
              };          
            }       
            var finalData = this._segWidget.data;
            finalData[0][1] = data;
            this._segWidget.setData( finalData );          
        },
      
        getSelectedKeyValue : function(masterData, selectedKey){
          var value = null;
          masterData.forEach(function (data) {
            if(data[0] == selectedKey)
              value = data[1];
          });
          return value;
        },
      /**
      	This method is used to check the content os textbox widgets and enable the proceed button
      **/
      enableOrDisableProceedWidget : function(){
        var segData = this.getData();
        if (segData === null){
          	return;
        } else if ( !kony.sdk.isNullOrUndefined(segData[0][1]) && segData[0][1].length===0 ) {
          	CommonUtilities.disableButton(this._ProceedWidget);
          	return;
        }
        
        else{
          for (var sectionIndex = 0; sectionIndex < this._SectionData.length; sectionIndex++) {
            var rows = segData[sectionIndex][1];
            for(var rowIndex = 0; rowIndex < rows.length;rowIndex++){
              var rowWidgets = rows[rowIndex];
              for(var widget in rowWidgets){
                var widgetData = rows[rowIndex][widget];
                if(widget.startsWith("tbx") && !(widget.includes("Additional") || widget.includes("additional"))){                
                  if(widgetData.constructor === Object && (kony.sdk.isNullOrUndefined(widgetData.text) || widgetData.text === "")){
                    if( !kony.sdk.isNullOrUndefined(widgetData.isVisible) && widgetData.isVisible === false ){
                      continue;
                    }                    
                    CommonUtilities.disableButton(this._ProceedWidget);
                    return;
                  }
                  if(widgetData.constructor === String && (kony.sdk.isNullOrUndefined(widgetData) || widgetData === "")){
                    CommonUtilities.disableButton(this._ProceedWidget);
                    return;
                  }
                }
                else if (widget.startsWith("lbl")) {
                  if ((widgetData.constructor === Object && !this.isEmptyObject( widgetData ) ) && (kony.sdk.isNullOrUndefined(widgetData.text) || widgetData.text === "")) {
                    if (!kony.sdk.isNullOrUndefined(widgetData.isVisible) && widgetData.isVisible === false) {
                      continue;
                    }
                    CommonUtilities.disableButton(this._ProceedWidget);
                    return;
                  }
                  if (widgetData.constructor === String && (kony.sdk.isNullOrUndefined(widgetData) || widgetData === "")) {
                    CommonUtilities.disableButton(this._ProceedWidget);
                    return;
                  }
                }                
                else if(widget.startsWith("lstbx") || widget.startsWith("lstBx")) {
                  if(widgetData.selectedKeyValue !== undefined || widgetData.selectedKey !== undefined){
                    var selectedValue = widgetData.selectedKeyValue ? widgetData.selectedKeyValue["0"] : widgetData.selectedKey;
                    if (selectedValue === "-1" || selectedValue === null || selectedValue === undefined) {
                      CommonUtilities.disableButton(this._ProceedWidget);
                      return;
                    }
                  }
                  else {
                    CommonUtilities.disableButton(this._ProceedWidget);
                    return;
                  }
                }
              }
            }
          }
        }
        CommonUtilities.enableButton(this._ProceedWidget);
      },

      /**
      	Method to check if a json object is empty
      **/      
      isEmptyObject : function( obj ) {
        for(var key in obj) {
          if(obj.hasOwnProperty(key))
            return false;
        }
        return true;
      },      
      /**
      	This method is used to handle the parent checkbox in case of feature permission checking
      **/
      selectOrUnselectEntireFeature : function(contextEventObject){
        var context = contextEventObject.context;
        var eventobject = contextEventObject.eventobject;
      	var segData = this.getData();
        var oobj =  segData[context.sectionIndex]; 
        var rowData ;
        var formScope = this.formScopeObj;
        formScope.checkForDataChangeInAccountAndOtherFeaturePermissions();
        if(oobj instanceof Array){
          rowData = segData[context.sectionIndex][1][context.rowIndex];
        }else{
          rowData = segData[context.rowIndex];
        }
        
        var permissionCheck = kony.sdk.isNullOrUndefined(rowData.lblimgPermissions.text)? rowData.lblimgPermissions : (rowData.lblimgPermissions.text);
        permissionCheck = (permissionCheck === "C") ? "D" : "C";
        var widgetName = "lblTickBox";
        for(var lblWidget in rowData){
          if(lblWidget.startsWith(widgetName)){
            if(rowData[lblWidget].text){
          	  rowData[lblWidget].text = permissionCheck;
            }
            else{
              rowData[lblWidget] = permissionCheck;
            }
          }
        }
        if(oobj instanceof Array){
        segData[context.sectionIndex][1][context.rowIndex]["lblimgPermissions"] = permissionCheck;
        segData[context.sectionIndex][1][context.rowIndex] = rowData;
        }else{
          segData[context.rowIndex]["lblimgPermissions"] =permissionCheck;
          segData[context.rowIndex] = rowData;
        }
        this.setData(segData);
      },
      
      /**
      	This method is used to handle the children checkboxes feature permission checking
      **/
      selectOrUnselectParentFeature : function(contextEventObject) {
        var context = contextEventObject.context;
        var eventobject = contextEventObject.eventobject;
        //var data = this.segData();
        var segData = this.view.segTemplates.data;
        
        var oobj =  segData[context.sectionIndex]; 
        var rowData ;
        var formScope = this.formScopeObj;
        formScope.checkForDataChangeInAccountAndOtherFeaturePermissions();        
        if(oobj instanceof Array){
          rowData = segData[context.sectionIndex][1][context.rowIndex];
        }else{
          rowData = segData[context.rowIndex];
        }
        var permissionCheck = rowData[eventobject.widgets()[0].id].text;
        var updateCheck = permissionCheck ? permissionCheck : rowData[eventobject.widgets()[0].id];
        updateCheck = (updateCheck === "D")?"C":"D";
        if(permissionCheck){
          rowData[eventobject.widgets()[0].id].text = updateCheck;
        }
        else{
          rowData[eventobject.widgets()[0].id] = updateCheck; 
        }
        var counter = 1;
        rowData["lblimgPermissions"] = "D";
        while(counter<=20) {
          var tickbox = "lblTickBox" + (counter++);
          if(kony.sdk.isNullOrUndefined(rowData[tickbox])) break;
          else if(typeof rowData[tickbox] === 'string' || rowData[tickbox] instanceof String) {
            if(rowData[tickbox] === "C") {
              rowData["lblimgPermissions"] = "C";
              break;
            }
          }
          else if(!kony.sdk.isNullOrUndefined(rowData[tickbox]["text"])){
            if(rowData[tickbox]["text"] === "C"){
              rowData["lblimgPermissions"] = "C";
              break;
            }
          }
        }

        //Getting the current state of the feature to handle actions containing (view) in the name
        var viewTransferFlag=-1;        
        var isSelected=0;
        var anyOtherActionSelected=0;

        var counter = 1;
        while(counter<=20) {
          var iterator=counter++;
          var actionName = "lblAction" + (iterator);
          var tickbox = "lblTickBox" + (iterator);
          
          if(!kony.sdk.isNullOrUndefined(rowData[actionName]) ){            
              if(kony.sdk.isNullOrUndefined(rowData[tickbox])) break;
              else if(typeof rowData[tickbox] === 'string' || rowData[tickbox] instanceof String) {
                if(rowData[actionName]["toolTip"].toLowerCase().includes("view")  && iterator===parseInt((eventobject.widgets()[0].id).substring(10))) {   
                  viewTransferFlag=iterator;
                  if(rowData[tickbox] === "C"){               
                    isSelected=1;                    
                  }
                 } 
                else{
                  if(rowData[tickbox] === "C" &&!(rowData[actionName]["toolTip"].toLowerCase().includes("view")) ){
                    anyOtherActionSelected=1;
                  }
                }                
              }
              else if(!kony.sdk.isNullOrUndefined(rowData[tickbox]["text"])){
                if(rowData[actionName]["toolTip"].toLowerCase().includes("view")  && iterator===parseInt((eventobject.widgets()[0].id).substring(10))) {   
                  viewTransferFlag=iterator;
                  if(rowData[tickbox]["text"] === "C"){                
                    isSelected=1;
                  }
                }
                else{
                  if(rowData[tickbox]["text"] === "C" &&!(rowData[actionName]["toolTip"].toLowerCase().includes("view")) ){
                  anyOtherActionSelected=1;
                  }
                }                
              }              
          }          
        }
        //selecting actions containing (view) if any other action is selected.
        if(anyOtherActionSelected===1){
          var counter = 1;
          while(counter<=20) {
            var iterator=counter++;
            var actionName = "lblAction" + (iterator);
            var tickbox = "lblTickBox" + (iterator);
            
            if(kony.sdk.isNullOrUndefined(rowData[tickbox])) break;
            else if(typeof rowData[tickbox] === 'string' || rowData[tickbox] instanceof String) {
              if(rowData[actionName]["toolTip"].toLowerCase().includes("view")){
                rowData[tickbox] =  "C";
              }
              
            }
            else if(!kony.sdk.isNullOrUndefined(rowData[tickbox]["text"])){
              if(rowData[actionName]["toolTip"].toLowerCase().includes("view")){
                rowData[tickbox]["text"] = "C"; 
              }
            }
          }
        }       

        //enabling or disabling all other actions based on actions containing (view) 
        if(viewTransferFlag!==-1){                   
          if(viewTransferFlag===parseInt((eventobject.widgets()[0].id).substring(10))){ 
            var counter = 1;
            while(counter<=20) {
              var tickbox = "lblTickBox" + (counter++);
              if(kony.sdk.isNullOrUndefined(rowData[tickbox])) break;
              else if(typeof rowData[tickbox] === 'string' || rowData[tickbox] instanceof String) {
                rowData[tickbox] =  (isSelected===1)?"C":"D";
              }
              else if(!kony.sdk.isNullOrUndefined(rowData[tickbox]["text"])){
                rowData[tickbox]["text"] = (isSelected===1)?"C":"D";
              }         
            }
            rowData["lblimgPermissions"] = (isSelected===1)?"C":"D";
          }
        }

        if(oobj instanceof Array){
         segData[context.sectionIndex][1][context.rowIndex] = rowData;
        }else{
          segData[context.rowIndex] = rowData;
          
        }
        
        this.setData(segData);
      },
      
      /**
      This method is used to check whether all permissions are unselected or not
      **/
      isAllFeaturesUnSelected : function(rowData){
        var widgetName = "lblTickBox";
        for(var lblWidget in rowData){
          if(lblWidget.startsWith(widgetName)){
          	if(rowData[lblWidget].text === "C" || rowData[lblWidget] === "C") return false;
          }
        }
        return true;
      },
      
      /**
      	This method is used to store the form view in tab body new
      **/
      setFormView : function(formScopeObject) {
        this.formScopeObj = formScopeObject;
      },
      
      /**
      	This method is used to check whether all permissions are unselected or not
      	      	flx normal skin - bbSknFlxBordere3e3e3Radius3Px
      	      	flx red skin	 - bbSknFlxBorderFF0000Radius3Px
      	      	preapproval =< denial =< transactionlimit
      **/
      validateTransactionLimits : function(tbxself, eventobject, context){
        var formScope = this.formScopeObj;
        var selectedSectionIndex = tbxself["context"]["sectionIndex"];//tbxself["eventobject"]["rowContext"]["sectionIndex"];
        var selectedRowIndex = tbxself["context"]["rowIndex"]; //tbxself["eventobject"]["rowContext"]["rowIndex"];
        var segData = this.view.segTemplates.data;
        var rowData = segData[selectedSectionIndex][1][selectedRowIndex];
        var normalFlxScreen = "skntbxffffffBordere3e3e3SSP15px424242";
        var redFlxScreen = "skntbxSSPFF000015pxnoborder";
        var flag = true;
        var isChange = false;
        var id = tbxself["eventobject"]["id"];
        rowData[id].text = tbxself["eventobject"]["text"];
        var dataObj = {
                "PRE_APPROVED_TRANSACTION_LIMIT" : this.convertCommaSeperatedCurrency(rowData["tbxPerTransApproveAmount"]["text"] + ""),
                "AUTO_DENIED_TRANSACTION_LIMIT" : this.convertCommaSeperatedCurrency(rowData["tbxPerTransDenialAmount"]["text"] + ""),
                "PRE_APPROVED_DAILY_LIMIT" : this.convertCommaSeperatedCurrency(rowData["tbxDailyTransApproveAmount"]["text"] + ""),
                "AUTO_DENIED_DAILY_LIMIT" : this.convertCommaSeperatedCurrency(rowData["tbxDailyTransDenialAmount"]["text"] + ""),
                "PRE_APPROVED_WEEKLY_LIMIT" : this.convertCommaSeperatedCurrency(rowData["tbxWeeklyTransApproveAmount"]["text"] + ""),
                "AUTO_DENIED_WEEKLY_LIMIT" : this.convertCommaSeperatedCurrency(rowData["tbxWeeklyTransDenialAmount"]["text"] + ""),
                "MAX_TRANSACTION_LIMIT": !isNaN(parseFloat(this.convertCommaSeperatedCurrency(rowData["lblPerTransLimit"]["text"].slice(2)))) ? parseFloat(this.convertCommaSeperatedCurrency(rowData["lblPerTransLimit"]["text"].slice(2))) : 0,
                "DAILY_LIMIT" : !isNaN(parseFloat(this.convertCommaSeperatedCurrency(rowData["lblDailyTransLimit"]["text"].slice(2)))) ? parseFloat(this.convertCommaSeperatedCurrency(rowData["lblDailyTransLimit"]["text"].slice(2))) : 0 ,
                "WEEKLY_LIMIT" : !isNaN(parseFloat(this.convertCommaSeperatedCurrency(rowData["lblWeeklyTransLimit"]["text"].slice(2)))) ?  parseFloat(this.convertCommaSeperatedCurrency(rowData["lblWeeklyTransLimit"]["text"].slice(2))) : 0,
            };
        
        formScope.checkForDataChange(dataObj,selectedSectionIndex,selectedRowIndex);        
        var perTransaction = this.testDataForTransactionLimits(dataObj["MAX_TRANSACTION_LIMIT"],dataObj["PRE_APPROVED_TRANSACTION_LIMIT"],dataObj["AUTO_DENIED_TRANSACTION_LIMIT"],rowData["tbxPerTransApproveAmount"]["skin"],rowData["tbxPerTransDenialAmount"]["skin"]);
        if(perTransaction["hasChanged"]){
          isChange = true;
          flag = ((perTransaction["approveflx"] === normalFlxScreen) && (perTransaction["denialflx"] === normalFlxScreen) && flag);
          rowData["tbxPerTransApproveAmount"]["skin"] = perTransaction["approveflx"];
          rowData["tbxPerTransDenialAmount"]["skin"] = perTransaction["denialflx"];
        }
        
        var daily = this.testDataForTransactionLimits(dataObj["DAILY_LIMIT"],dataObj["PRE_APPROVED_DAILY_LIMIT"],dataObj["AUTO_DENIED_DAILY_LIMIT"],rowData["tbxDailyTransApproveAmount"]["skin"],rowData["tbxDailyTransDenialAmount"]["skin"]);
        if(daily["hasChanged"]){
          isChange = true;
          flag = ((daily["approveflx"] === normalFlxScreen) && (daily["denialflx"] === normalFlxScreen) && flag);
          rowData["tbxDailyTransApproveAmount"]["skin"] = daily["approveflx"];
          rowData["tbxDailyTransDenialAmount"]["skin"] = daily["denialflx"];
        }
        
        var weekly = this.testDataForTransactionLimits(dataObj["WEEKLY_LIMIT"],dataObj["PRE_APPROVED_WEEKLY_LIMIT"],dataObj["AUTO_DENIED_WEEKLY_LIMIT"],rowData["tbxWeeklyTransApproveAmount"]["skin"],rowData["tbxWeeklyTransDenialAmount"]["skin"]);
        if(weekly["hasChanged"]){
          isChange = true;
          flag = ((weekly["approveflx"] === normalFlxScreen) && (weekly["denialflx"] === normalFlxScreen) && flag);
          rowData["tbxWeeklyTransApproveAmount"]["skin"] = weekly["approveflx"];
          rowData["tbxWeeklyTransDenialAmount"]["skin"] = weekly["denialflx"];
        }
        
        if(isChange) {
          this.view.segTemplates.setDataAt(rowData, selectedRowIndex, selectedSectionIndex);
          formScope.disableOrEnableProceedBtnOnTransactionDetails(flag);
        }
      },
      
      convertCommaSeperatedCurrency : function (value){
        if(typeof (value) == "string"){
        while(value.includes(",")){
          value = value.replace(',',"")
          }
        }
        return value;
      },
      
      testDataForTransactionLimits : function(limit, approve, denial, approveflx, denialflx){
        var flag = false;
        var changeflag = false;
        var normalFlxScreen = "skntbxffffffBordere3e3e3SSP15px424242";
        var redFlxScreen = "skntbxSSPFF000015pxnoborder";
        
        approve = approve.trim();
        denial = denial.trim();
        
        if(!(/^\d+(\.\d{1,2})?$/.test(approve)) || approve === "") {
          if(approveflx !== redFlxScreen) {changeflag = true; approveflx = redFlxScreen}
          flag = true;
        }
        else {
          if(approveflx !== normalFlxScreen) {changeflag = true; approveflx = normalFlxScreen}
        }
        
        if(!(/^\d+(\.\d{1,2})?$/.test(denial))  || denial === "") {
          if(denialflx !== redFlxScreen) {changeflag = true; denialflx = redFlxScreen}
          flag = true;
        }
        else {
          if(denialflx !== normalFlxScreen) {changeflag = true; denialflx = normalFlxScreen}
        }
        
        
        if(!flag){
          approve = parseFloat(approve);
          denial = parseFloat(denial);
          
          if(approve>denial){
            if(approveflx !== redFlxScreen) {changeflag = true; approveflx = redFlxScreen}
          }
          else{
            if(approveflx !== normalFlxScreen) {changeflag = true; approveflx = normalFlxScreen}
          }
            
          if(denial<=limit){
            if(denialflx !== normalFlxScreen) {changeflag = true; approveflx = normalFlxScreen}
          }
          else{
            if(denialflx !== redFlxScreen) {changeflag = true; denialflx = redFlxScreen}
          }
        }
        
        return {
          "approveflx" : approveflx,
          "denialflx" : denialflx,
          "hasChanged" : changeflag
        }
      }
    };
});
