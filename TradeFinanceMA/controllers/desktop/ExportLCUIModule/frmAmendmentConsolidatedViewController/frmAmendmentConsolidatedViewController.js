define(["FormControllerUtility", "CommonUtilities", "OLBConstants"], function (FormControllerUtility, CommonUtilities, OLBConstants) {
    const NA = kony.i18n.getLocalizedString('i18n.common.NA');
    let presenter, LCData = {}, amendData = {},
        contentScope, contentPopupScope, titleActionScope;
    return {
        /**
         * Sets the initial actions for form
         */
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.formTemplate12.onError = this.onError;
            this.initFormActions();
        },
        onBreakpointChange: function (form, width) {
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            breakpoint = kony.application.getCurrentBreakpoint();
        },
        /**
         * Performs the actions required before rendering form
         */
        preShow: function () {
            LCData = JSON.parse(JSON.stringify(presenter.LCData));
            amendData = JSON.parse(JSON.stringify(presenter.amendmentsData));
            contentPopupScope.setVisibility(false);
        },
        /**
         * Performs the actions required after rendering form
         */
        postShow: function () {
            this.setLCSummaryData();
            this.setSegmentData();
            this.view.formTemplate12.pageTitle =  kony.i18n.getLocalizedString('i18n.TradeFinance.exportLcAmendmentConsolidatedView')
            contentPopupScope.flxLCDetailsContainer.doLayout = CommonUtilities.centerPopupFlex;
        },
        /**
         * Method to initialise form actions
         */
        initFormActions: function () {
            const scope = this;
            presenter = applicationManager.getModulesPresentationController({
                appName: 'TradeFinanceMA',
                moduleName: 'ExportLCUIModule'
            });
            contentScope = this.view.formTemplate12.flxContentTCCenter;
            contentPopupScope = this.view.formTemplate12.flxContentPopup;
            titleActionScope = this.view.formTemplate12.flxTCButtons;
            contentPopupScope.flxLCDetailsCross.onClick = () => {
                contentPopupScope.setVisibility(false)
                contentPopupScope.flxLCDetailsPopup.setVisibility(false)
            }
            contentScope.flxLCViewDetails.onClick = () => {
                contentPopupScope.setVisibility(true)
                contentPopupScope.flxLCDetailsPopup.setVisibility(true)
                contentPopupScope.ExportLCDetailsPopup.setContext(LCData)
            }
            contentScope.btnViewAllAmendments.onClick = () => applicationManager.getNavigationManager().navigateTo({
                appName: "TradeFinanceMA",
                friendlyName: "ExportLCUIModule/frmExportLCDashboard"
            }, false, {
                flowType: 'GetAllExportAmendments'
            })
            contentScope.btnBack.onClick = () => presenter.showExportLCScreen({
                context: 'viewExportLoC',
                data: {
                    exportLCId: amendData[0].exportlcSRMSRequestId
                },
                form: scope.view.id
            })
        },
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.serverError) {
                this.view.formTemplate12.showBannerError({
                    dbpErrMsg: viewModel.serverError
                });
            }
        },
        setLCSummaryData: function () {
            const userObj = applicationManager.getUserPreferencesManager().getUserObj(); // LC details Value
            contentScope.lblBeneficiaryValue.text = LCData.beneficiaryName || NA;
            contentScope.lblLCRefNoValue.text = LCData.lcReferenceNo || NA;
            contentScope.lblLCTypeValue.text = LCData.lcType || NA;
            contentScope.lblLCAmountValue.text = (LCData.amount && LCData.currency) ? `${LCData.currency} ${presenter.formatUtilManager.formatAmount(LCData.amount)}` : NA;
            contentScope.lblIssueDateValue.text = LCData.issueDate || NA;
            contentScope.lblExpiryDateValue.text = LCData.expiryDate || NA;
            contentScope.lblPaymentTermsValue.text = LCData.paymentTerms || NA;
            contentScope.lblCustomerNameValue.text = [userObj.userfirstname, userObj.userlastname].join(' ').trim();
            contentScope.lblCustomerIDValue.text = (userObj.CoreCustomers && userObj.CoreCustomers[0].coreCustomerID) ? userObj.CoreCustomers[0].coreCustomerID : NA;
        },
        setSegmentData: function () {
            const scope = this;
            let segData = [];
            let leftValue = breakpoint > 1024 ? '20%' : '38%';
            contentScope.segAmendments.rowTemplate = 'flxRowAmendmentDetails';
            contentScope.segAmendments.widgetDataMap = {
                'imgDropdown': 'imgDropdown',
                'lblAmendedOnLeft': 'lblAmendedOnLeft',
                'lblAmendedOnRight': 'lblAmendedOnRight',
                'lblAmendmentChargesHeading': 'lblAmendmentChargesHeading',
                'lblAmendmentDateLeft': 'lblAmendmentDateLeft',
                'lblAmendmentDateRight': 'lblAmendmentDateRight',
                'lblAmendmentHeading': 'lblAmendmentHeading',
                'lblAmendmentReferenceLeft': 'lblAmendmentReferenceLeft',
                'lblAmendmentReferenceRight': 'lblAmendmentReferenceRight',
                'lblAmendmentStatusLeft': 'lblAmendmentStatusLeft',
                'lblAmendmentStatusRight': 'lblAmendmentStatusRight',
                'lblChargesDebitAccountLeft': 'lblChargesDebitAccountLeft',
                'lblChargesDebitAccountRight': 'lblChargesDebitAccountRight',
                'lblChargesPaidByLeft': 'lblChargesPaidByLeft',
                'lblChargesPaidByRight': 'lblChargesPaidByRight',
                'lblExpiryDateLeft': 'lblExpiryDateLeft',
                'lblExpiryDateRight': 'lblExpiryDateRight',
                'lblLatestShipmentDateLeft': 'lblLatestShipmentDateLeft',
                'lblLatestShipmentDateRight': 'lblLatestShipmentDateRight',
                'lblLcAmountLeft': 'lblLcAmountLeft',
                'lblLcAmountRight': 'lblLcAmountRight',
                'lblLcAmountStatus': 'lblLcAmountStatus',
                'lblOtherAmendmentsLeft': 'lblOtherAmendmentsLeft',
                'lblOtherAmendmentsRight': 'lblOtherAmendmentsRight',
                'lblPeriodOfPresentationLeft': 'lblPeriodOfPresentationLeft',
                'lblPeriodOfPresentationRight': 'lblPeriodOfPresentationRight',
                'lblReqAmendmentsHeading': 'lblReqAmendmentsHeading',
                'flxDropdown': 'flxDropdown',
                'flxAmendmentContent': 'flxAmendmentContent',
                'flxExpiryDate': 'flxExpiryDate',
                'flxLatestShipmentDate': 'flxLatestShipmentDate',
                'flxPeriodOfPresentation': 'flxPeriodOfPresentation',
                'flxLcAmount': 'flxLcAmount',
                'flxOtherAmendments': 'flxOtherAmendments',
                'flxChargesDebitAccount': 'flxChargesDebitAccount',
                'flxViewAndRespond': 'flxViewAndRespond',
                'btnViewAndRespond': 'btnViewAndRespond',
                'flxRequestedAmendments': 'flxRequestedAmendments',
                'flxSpace': 'flxSpace',
                'flxAcceptanceDate': 'flxAcceptanceDate',
                'flxRADropdown': 'flxRADropdown',
                'flxACDropdown': 'flxACDropdown',
                'lblRADropdown': 'lblRADropdown',
                'lblACDropdown': 'lblACDropdown',
                'flxRAContent': 'flxRAContent',
                'flxACContent': 'flxACContent',
                'flxHeaderDropdown': 'flxHeaderDropdown',
                'flxLcAmountRight': 'flxLcAmountRight'
            };
            for (const record of amendData) {
                segData.push({
                    'flxHeaderDropdown': {
                        isVisible: false
                    },
                    'flxAmendmentContent': {
                        isVisible: true
                    },
                    'lblAmendmentHeading': `${kony.i18n.getLocalizedString('i18n.ImportLC.Amendments')} ${record.amendmentNo}`,
                    'lblAmendmentReferenceLeft': kony.i18n.getLocalizedString('i18n.TradeFinance.AmendmentReference') + ':',
                    'lblAmendmentReferenceRight': {
                        text: record.amendmentSRMSRequestId || NA,
                        left: leftValue
                    }, 
                    'lblAmendedOnLeft': kony.i18n.getLocalizedString('i18n.TradeFinance.AmendedOn') + ':',
                    'lblAmendedOnRight': {
                        text: presenter.formatUtilManager.getFormattedCalendarDate(record.amendmentReceivedDate) || NA,
                        left: leftValue
                    }, 
                    'lblAmendmentStatusLeft': kony.i18n.getLocalizedString('i18n.TradeFinance.AmendmentStatus') + ':',
                    'lblAmendmentStatusRight': {
                        text: record.amendmentStatus || NA,
                        left: leftValue,
                        skin: 'ICSknlbl424242SSP15pxSemibold'
                    }, 
                    'flxAcceptanceDate': {
                        isVisible: record.amendmentStatus !== 'New'
                    },
                    'lblAmendmentDateLeft': kony.i18n.getLocalizedString('i18n.ImportLC.Acceptance') + '/' + kony.i18n.getLocalizedString('i18n.TradeFinance.RejectionDate') + ':',
                    'lblAmendmentDateRight': {
                        text: record.selfAcceptanceDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.selfAcceptanceDate) : record.selfRejectedDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.selfRejectedDate) : NA,
                        left: leftValue
                    }, 
                    'lblReqAmendmentsHeading': kony.i18n.getLocalizedString('i18n.TradeFinance.AmendmentsRequested'),
                    'flxExpiryDate': {
                        isVisible: record.lcExpiryDate
                    },
                    'lblExpiryDateLeft': kony.i18n.getLocalizedString('i18n.Wealth.expiryDate'),
                    'lblExpiryDateRight': {
                        text: record.lcExpiryDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcExpiryDate) : NA,
                        left: leftValue
                    }, 
                    'flxLatestShipmentDate': {
                        isVisible: record.latestShipmentDate
                    },
                    'lblLatestShipmentDateLeft': kony.i18n.getLocalizedString('i18n.TradeFinance.AmendLatestShipmentDate') + ':',
                    'lblLatestShipmentDateRight': {
                        text: record.latestShipmentDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.latestShipmentDate) : NA,
                        left: leftValue
                    }, 
                    'flxPeriodOfPresentation': {
                        isVisible: record.periodOfPresentation
                    },
                    'lblPeriodOfPresentationLeft': kony.i18n.getLocalizedString('i18n.TradeFinance.PeriodOfPresentation') + ':',
                    'lblPeriodOfPresentationRight': {
                        text: record.periodOfPresentation ? `${record.periodOfPresentation} ${kony.i18n.getLocalizedString('i18n.TradeFinance.days')}` : NA,
                        left: leftValue
                    }, 
                    'flxLcAmount': {
                        isVisible: record.newLcAmount
                    },
                    'flxLcAmountRight': {
                        left: leftValue
                    },
                    'lblLcAmountLeft': kony.i18n.getLocalizedString('i18n.TradeFinance.lcAmountWithColon'),
                    'lblLcAmountRight': (record.newLcAmount && record.lcCurrency) ? `${record.lcCurrency} ${presenter.formatUtilManager.formatAmount(record.newLcAmount)}` : NA,
                    'lblLcAmountStatus': {
                        text: record.lcAmountStatus ? `(${record.lcAmountStatus})` : NA,
                        isVisible: false
                    },
                    'flxOtherAmendments': {
                        isVisible: record.otherAmendments
                    },
                    'lblOtherAmendmentsLeft': kony.i18n.getLocalizedString('i18n.TradeFinance.OtherAmendments') + ':',
                    'lblOtherAmendmentsRight': {
                        text: record.otherAmendments || NA,
                        left: leftValue
                    }, 
                    'lblAmendmentChargesHeading': kony.i18n.getLocalizedString('i18n.TradeFinance.AmendmentCharges'),
                    'lblChargesPaidByLeft': kony.i18n.getLocalizedString('i18n.TradeFinance.ChargesWillBePaidBy') + ':',
                    'lblChargesPaidByRight': {
                        text: record.amendmentChargesPayer === 'Applicant' ? record.amendmentChargesPayer : `${record.amendmentChargesPayer} (${kony.i18n.getLocalizedString('i18n.TransfersEur.Me')})` || NA,
                        left: leftValue
                    }, 
                    'flxChargesDebitAccount': {
                        isVisible: record.amendmentChargesPayer !== 'Applicant' && record.chargesDebitAccount
                    },
                    'lblChargesDebitAccountLeft': kony.i18n.getLocalizedString('i18n.TradeFinance.chargesDebitAccountWithColon'),
                    'flxViewAndRespond': {
                        isVisible: record.amendmentStatus === OLBConstants.EXPORT_AMENDMENT_STATUS.NEW,
                    },
                    'flxRADropdown': {
                        onClick: scope.toggleDropdown.bind(this, 'RA')
                    },
                    'flxACDropdown': {
                        onClick: scope.toggleDropdown.bind(this, 'AC')
                    },
                    'flxRAContent': {
                        isVisible: true
                    },
                    'flxACContent': {
                        isVisible: true
                    },
                    'lblRADropdown': 'O',
                    'lblACDropdown': 'O',
                    'btnViewAndRespond': {
                        onClick: function() {
                            presenter.showExportLCScreen({
                                context: 'viewAmendment',
                                data: {
                                    exportlcSRMSRequestId: record.exportlcSRMSRequestId,
                                    transactionReference: record.amendmentSRMSRequestId
                                },
                                form: 'frmAmendmentConsolidatedView'
                            })
                        }
                        },
                    'lblChargesDebitAccountRight': {
                        text: record.chargesDebitAccount ? CommonUtilities.getMaskedAccName(record.chargesDebitAccount)[0] : NA,
                        left: leftValue
                    }, 
                })
            }
            contentScope.segAmendments.setData(segData);
        },
        toggleDropdown: function (ref) {
            const rowIndex = contentScope.segAmendments.selectedRowIndex[1];
            let data = contentScope.segAmendments.data[rowIndex];
            if (data['lbl' + ref + 'Dropdown'] === 'O') {
                data['lbl' + ref + 'Dropdown'] = 'P'
                data['flx' + ref + 'Content'].isVisible = false;
            } else {
                data['lbl' + ref + 'Dropdown'] = 'O'
                data['flx' + ref + 'Content'].isVisible = true;
            }
            contentScope.segAmendments.setDataAt(data, rowIndex);
        }
    }
});