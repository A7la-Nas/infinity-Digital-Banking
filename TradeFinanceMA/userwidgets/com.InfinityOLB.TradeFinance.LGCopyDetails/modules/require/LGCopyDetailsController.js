define(['FormControllerUtility'], function (FormControllerUtility) {
  const fontIconConstants = {
    'radioSelected': 'M',
    'radioUnselected': 'L'
  },
    skinConstants = {
      'radioSelected': 'ICSknLblRadioBtnSelectedFontIcon003e7520px',
      'radioUnselected': 'ICSknLblRadioBtnUnelectedFontIcona0a0a020px'
    }, NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let prevIdx;
  let data;
  const fields = {
    'issuedGuarantee': ['beneficiaryName', ['relatedTransactionReference', 'guaranteesSRMSId'], 'productType', 'issueDate'],
    'issuedGuaranteeAmedment': ['beneficiaryName', 'guaranteesSRMSId', 'productType', 'issueDate'],
    'issuedClaim': ['applicantName', 'guaranteeSrmsId', 'productType', 'expectedIssueDate'],
    'outwardCollectionAmendment': ['draweeName', 'collectionReference', 'tenorType', 'createdOn'],
    'outwardCollection': ['draweeName', 'documentNo', 'createdOn', 'formattedAmount'],
    'exportDrawing': ['applicant', 'lcReferenceNo', 'lcType', 'lcUpdatedOn'],
    'importLCAmendment': ['beneficiaryName', 'lcReferenceNo', 'paymentTerms', 'lcCreatedOn'],
    'importLC': ['beneficiaryName', 'lcReferenceNo', 'paymentTerms', 'issueDate']
  };
  const getFieldValue = (record, key) => {
    if (Array.isArray(key)) {
      for (const k of key) {
        if (record[k]) {
          return record[k];
        }
      }
      return NA;
    }
    return record[key] || NA;
  };
  return {
    preShow: function () {
      const scope = this;
      this.view.txtSearchBox.text = "";
      this.view.lblCrossIcon.setVisibility(false);
      ['flxClose', 'lblCrossIcon'].forEach(w => scope.view[w].cursorType = 'pointer');
      FormControllerUtility.disableButton(this.view.btnCopyDetails);
      this.view.txtSearchBox.onTextChange = function () {
        scope.view.lblCrossIcon.setVisibility(scope.view.txtSearchBox.text !== '');
      };
      this.view.txtSearchBox.onDone = function () {
        FormControllerUtility.disableButton(scope.view.btnCopyDetails);
        applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true).getSearchedRecords();
      };
      this.view.lblCrossIcon.onTouchEnd = function () {
        scope.view.txtSearchBox.text = '';
        scope.view.lblCrossIcon.setVisibility(false);
        FormControllerUtility.disableButton(scope.view.btnCopyDetails);
        applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true).getSearchedRecords();
      };
    },
    setData: function (records, context) {
      if (!records || records.length === 0) {
        this.view.flxSegDetails.setVisibility(false);
        this.view.flxNoTransactions.setVisibility(true);
        this.view.flxButton.setVisibility(false);
        return;
      }
      this.view.flxSegDetails.setVisibility(true);
      this.view.flxNoTransactions.setVisibility(false);
      this.view.flxButton.setVisibility(true);
      const scope = this;
      const formatUtilManager = applicationManager.getFormatUtilManager();
      let segData = [];
      prevIdx = undefined;
      data = records;
      this.view.segLGCopyDetails.widgetDataMap = {
        lblField1Icon: 'lblField1Icon',
        lblField2: 'lblField2',
        lblField2: 'lblField2',
        lblField3: 'lblField3',
        lblField4: 'lblField4',
        lblField5: 'lblField5',
      };
      const fieldRef = fields[context];
      data.forEach((record, idx) => {
        segData.push({
          'lblField1Icon': {
            text: fontIconConstants.radioUnselected,
            skin: skinConstants.radioUnselected,
            cursorType: 'pointer',
            onTouchEnd: scope.toggleRadioButton.bind(scope, idx)
          },
          'lblField2': {
            text: getFieldValue(record, fieldRef[0])
          },
          'lblField3': {
            text: getFieldValue(record, fieldRef[1])
          },
          'lblField4': {
            text: getFieldValue(record, fieldRef[2])
          },
          'lblField5': {
            text: record[fieldRef[3]] ? (context !== 'outwardCollection' ? formatUtilManager.getFormattedCalendarDate(record[fieldRef[3]]) : record[fieldRef[3]]) : NA
          }
        });
      });
      this.view.segLGCopyDetails.setData(segData);
    },
    toggleRadioButton: function (idx) {
      let segData = this.view.segLGCopyDetails.data;
      if (!kony.sdk.isNullOrUndefined(prevIdx)) {
        let prevIdxData = segData[prevIdx];
        prevIdxData['lblField1Icon'].text = fontIconConstants.radioUnselected;
        prevIdxData['lblField1Icon'].skin = skinConstants.radioUnselected;
        this.view.segLGCopyDetails.setDataAt(prevIdxData, prevIdx);
      }
      let currIdxData = segData[idx];
      currIdxData['lblField1Icon'].text = fontIconConstants.radioSelected;
      currIdxData['lblField1Icon'].skin = skinConstants.radioSelected;
      this.view.segLGCopyDetails.setDataAt(currIdxData, idx);
      prevIdx = idx;
      FormControllerUtility.enableButton(this.view.btnCopyDetails);
    },
    getData: function () {
      return data[prevIdx];
    }
  };
});