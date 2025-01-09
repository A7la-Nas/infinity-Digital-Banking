define(function () {
  const fontIconConstants = {
    'radioSelected': 'M',
    'radioUnselected': 'L',
    'checkboxSelected': 'C',
    'checkboxUnselected': 'D',
    'chevronUp': 'P',
    'chevronDown': 'O',
  };
  const skinConstants = {
    'radioSelected': 'ICSknLblRadioBtnSelectedFontIcon003e7520px',
    'radioUnselected': 'ICSknLblRadioBtnUnelectedFontIcona0a0a020px'
  };
  var flowType = "";
  return {
    preShow: function () {
      const specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      this.view.tbxAddressField3.restrictCharactersSet = specialCharactersSet;
      this.view.tbxAddressField4.restrictCharactersSet = specialCharactersSet;
      this.view.tbxAddressField5.restrictCharactersSet = specialCharactersSet;
      this.view.tbxAddressField6.restrictCharactersSet = specialCharactersSet;
      this.view.lblPreferableBeneficiaryOptionIcon1.onTouchEnd = this.toggleRadioButton.bind(this, 1);
      this.view.lblPreferableBeneficiaryOptionIcon2.onTouchEnd = this.toggleRadioButton.bind(this, 2);
      this.view.flxBeneficiaryDropdown.onClick = this.toggleDropdown.bind(this, this.view.flxBeneficiaryList, this.view.lblBeneficiaryDropdownIcon);
      this.view.segBeneficiaryList.onRowClick = this.selectBeneficiary;
      this.view.lblSaveBeneficiaryCheckboxIcon.onTouchEnd = this.toggleCheckbox.bind(this, this.view.lblSaveBeneficiaryCheckboxIcon);
      this.view.tbxBeneficiaryName.onEndEditing = this.checkExistingBeneficiary;
    },
    toggleRadioButton: function (idx) {
      for (let i = 1; i <= 2; i++) {
        if (i === idx) {
          this.view['lblPreferableBeneficiaryOptionIcon' + i].text = fontIconConstants.radioSelected;
          this.view['lblPreferableBeneficiaryOptionIcon' + i].skin = skinConstants.radioSelected;
        } else {
          this.view['lblPreferableBeneficiaryOptionIcon' + i].text = fontIconConstants.radioUnselected;
          this.view['lblPreferableBeneficiaryOptionIcon' + i].skin = skinConstants.radioUnselected;
        }
      }
      if (idx === 1) {
        this.view.flxExistingBeneficiaryDetails.setVisibility(true);
        this.view.flxEnterBeneficiaryDetails.setVisibility(false);
      } else {
        this.view.flxExistingBeneficiaryDetails.setVisibility(false);
        this.view.flxEnterBeneficiaryDetails.setVisibility(true);
        this.view.segBeneficiaryList.selectedRowIndex = null;
        this.view.lblSelectedBeneficiary.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
        this.view.lblSelectedBeneficiary.skin = "sknLblSSP72727215px";
        this.view.flxSelectedBeneficiaryDetails.setVisibility(false);
      }
      applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true).enableOrDisableSubmitButton(flowType);
    },
    toggleDropdown: function (flxDropdownList, lblDropdownIcon) {
      if (flxDropdownList.isVisible) {
        flxDropdownList.setVisibility(false);
        lblDropdownIcon.text = fontIconConstants.chevronDown;
      } else {
        flxDropdownList.setVisibility(true);
        lblDropdownIcon.text = fontIconConstants.chevronUp;
      }
    },
    toggleCheckbox: function (lblCheckboxIcon) {
      if (lblCheckboxIcon.text === fontIconConstants.checkboxUnselected) {
        lblCheckboxIcon.text = fontIconConstants.checkboxSelected;
      } else {
        lblCheckboxIcon.text = fontIconConstants.checkboxUnselected;
      }
    },
    selectBeneficiary: function () {
      const data = this.view.segBeneficiaryList.selectedRowItems[0];
      if (data['flxBeneficiaryList']['skin'] === 'slFboxBGf8f7f8B0') {
        this.view.segBeneficiaryList.selectedRowIndex = null;
        return;
      }
      this.view.lblSelectedBeneficiary.text = data.lblBeneficiary.text;
      this.view.lblSelectedBeneficiary.skin = "sknLblSSP42424215px";
      this.view.flxBeneficiaryList.setVisibility(false);
      this.view.lblBeneficiaryDropdownIcon.text = fontIconConstants.chevronDown;
      this.view.flxSelectedBeneficiaryDetails.setVisibility(true);
      if (data.payeeType === 'sameBank' || data.payeeType === 'trade') {
        this.view.flxBankDetails.setVisibility(false);
        this.view.flxMarkAdvisingBankCheckbox.setVisibility(false);
      } else {
        this.view.flxBankDetails.setVisibility(true);
        this.view.flxMarkAdvisingBankCheckbox.setVisibility(true);
        this.view.lblBankDetailsFieldValue1.text = data.bankName || '-';
        this.view.lblBankDetailsFieldValue2.text = data.swiftCode || '-';
        this.view.lblBankDetailsFieldValue3.text = data.IBAN || '-';
        this.view.lblBankDetailsFieldValue4.text = data.bankAddress || '-';
      }
      this.view.lblBeneficiaryDetailsFieldValue1.text = data.beneficiaryName || '-';
      const address1 = data.addressLine1 || data.address1;
      const address2 = data.addressLine2 || data.address2;
      const address3 = [data.city, data.state, data.country, data.zipcode].join(',').replace(/^,+|,+$/g, '').replace(/,+/g, ', ');
      if (!address1 && !address2 && !address3) {
        this.view.lblBeneficiaryAddress1.setVisibility(true);
        this.view.lblBeneficiaryAddress1.text = '-';
        this.view.lblBeneficiaryAddress2.setVisibility(false);
        this.view.lblBeneficiaryAddress3.setVisibility(false);
      } else {
        this.view.lblBeneficiaryAddress1.setVisibility(!!address1);
        this.view.lblBeneficiaryAddress1.text = address1;
        this.view.lblBeneficiaryAddress1.setVisibility(!!address2);
        this.view.lblBeneficiaryAddress2.text = address2;
        this.view.lblBeneficiaryAddress1.setVisibility(!!address3);
        this.view.lblBeneficiaryAddress3.text = address3;
      }
      applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true).enableOrDisableSubmitButton(flowType);
      this.view.forceLayout();
    },
    setData: function (segData) {
      if (!segData) return;
      const widgetDataMap = {
        'lblHeading': 'lblHeading',
        'lblBeneficiary': 'lblBeneficiary',
        'flxBankName': 'flxBankName',
        'flxBeneficiaryList': 'flxBeneficiaryList',
        'imgBank': 'imgBank',
        'lblBankName': 'lblBankName'
      };
      this.view.segBeneficiaryList.widgetDataMap = widgetDataMap;
      this.view.segBeneficiaryList.setData(segData);
      let segHeight = segData.reduce((height, section) => height + (section[1].length * 60) + 40, 0);
      if (segHeight > 500) segHeight = 500;
      this.view.flxBeneficiaryList.height = segHeight + 'dp';
    },
    getData: function () {
      let data;
      if (this.view.flxExistingBeneficiaryDetails.isVisible) {
        if (this.view.segBeneficiaryList.selectedRowIndex) {
          const selectedData = this.view.segBeneficiaryList.selectedRowItems[0];
          data = {
            'beneficiaryName': selectedData.beneficiaryName || selectedData.name || '',
            'address1': selectedData.addressLine1 || selectedData.address1 || '',
            'address2': selectedData.addressLine2 || selectedData.address2 || '',
            'city': selectedData.city || '',
            'state': selectedData.state || '',
            'country': selectedData.country || '',
            'zipcode': selectedData.zipcode || '',
            'isCorporate': selectedData.payeeType === 'trade' ? 'true' : 'false'
          };
          if (data.isCorporate === 'false') {
            data['payeeId'] = selectedData.Id;
          }
          data["payeeType"] = selectedData.payeeType || '';
        }
      } else {
        if (this.view.tbxBeneficiaryName.text !== '') {
          data = {
            'beneficiaryName': this.view.tbxBeneficiaryName.text,
            'address1': this.view.tbxAddressField1.text,
            'address2': this.view.tbxAddressField2.text,
            'city': this.view.tbxAddressField3.text,
            'state': this.view.tbxAddressField4.text,
            'country': this.view.tbxAddressField5.text,
            'zipcode': this.view.tbxAddressField6.text,
            'saveBeneficiary': this.view.lblSaveBeneficiaryCheckboxIcon.text === fontIconConstants.checkboxSelected
          };
          if (data.saveBeneficiary) {
            data['isCorporate'] = 'true';
            data['payeeType'] = "trade";
          }
        }
      }
      return data;
    },
    showOrHideSwiftTags: function (flag) {
      if (flag) {
        const guaranteeSwiftTags = applicationManager.getConfigurationManager().guaranteeSwiftTags;
        this.view.lblBeneficiaryAddress.left = "40dp";
        this.view.flxBeneficiaryNameSwiftTag.setVisibility(true);
        this.view.flxBeneficiaryNameContainer.left = "40dp";
        for (let i = 1; i <= 6; i++) {
          this.view['flxAddressField' + i + 'SwiftTag'].setVisibility(true);
          this.view['flxAddressField' + i + 'Container'].left = "40dp";
        }
        this.view.lblBeneficiaryNameSwiftTag.text = guaranteeSwiftTags.beneficiaryName || 'NA';
        this.view.lblAddressField1SwiftTag.text = guaranteeSwiftTags.beneficiaryAddress || 'NA';
        this.view.lblAddressField2SwiftTag.text = guaranteeSwiftTags.beneficiaryAddress || 'NA';
        this.view.lblAddressField3SwiftTag.text = guaranteeSwiftTags.beneficiaryCity || 'NA';
        this.view.lblAddressField4SwiftTag.text = guaranteeSwiftTags.beneficiaryState || 'NA';
        this.view.lblAddressField5SwiftTag.text = guaranteeSwiftTags.beneficiaryCountry || 'NA';
        this.view.lblAddressField6SwiftTag.text = guaranteeSwiftTags.beneficiaryZipCode || 'NA';
      } else {
        this.view.lblBeneficiaryAddress.left = "0dp";
        this.view.flxBeneficiaryNameSwiftTag.setVisibility(false);
        this.view.flxBeneficiaryNameContainer.left = "0dp";
        for (let i = 1; i <= 6; i++) {
          this.view['flxAddressField' + i + 'SwiftTag'].setVisibility(false);
          this.view['flxAddressField' + i + 'Container'].left = "0dp";
        }
      }
      this.view.forceLayout();
    },
    checkExistingBeneficiary: function () {
      const segData = this.view.segBeneficiaryList.data;
      const text = this.view.tbxBeneficiaryName.text;
      let isExistingBeneficiary = false;
      for (const data of segData) {
        isExistingBeneficiary = data[1].filter(({ beneficiaryName, payeeType }) => payeeType === 'trade' && beneficiaryName.toLowerCase() === text.toLowerCase()).length > 0;
        if (isExistingBeneficiary) break;
      }
      if (isExistingBeneficiary) {
        this.view.lblExistingBeneficiaryWarning.setVisibility(true);
      } else {
        this.view.lblExistingBeneficiaryWarning.setVisibility(false);
      }
      applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true).enableOrDisableSubmitButton(flowType);
    },
    clearFields: function () {
      this.view.tbxBeneficiaryName.text = "";
      this.view.tbxAddressField1.text = "";
      this.view.tbxAddressField2.text = "";
      this.view.tbxAddressField3.text = "";
      this.view.tbxAddressField4.text = "";
      this.view.tbxAddressField5.text = "";
      this.view.tbxAddressField6.text = "";
      this.view.flxSelectedBeneficiaryDetails.setVisibility(false);
      this.view.lblBeneficiaryDetailsFieldValue1.text = "";
      this.view.lblBeneficiaryAddress1.text = "";
      this.view.lblBeneficiaryAddress2.text = "";
      this.view.lblBeneficiaryAddress3.text = "";
      this.view.lblSaveBeneficiaryCheckboxIcon = fontIconConstants.checkboxUnselected;
      this.view.lblSelectedBeneficiaryDetails.text = kony.i18n.getLocalizedString("i18n.common.selecthere");
    },
    setFlowType: function (param) {
      flowType = param;
    },
    getFlowType: function () {
      return flowType;
    },
    preFillData: function (data) {
      try {
        const segData = this.view.segBeneficiaryList.data;
        let isBeneficiaryAvailable = false;
        if (data.isCorporate) {
          for (let i = 0; i < segData.length; i++) {
            for (let j = 0; j < segData[i][1].length; j++) {
              if ((data.isCorporate === 'false' && data.payeeId === segData[i][1][j].Id) || (data.isCorporate === 'true' && data.beneficiaryName === segData[i][1][j].beneficiaryName)) {
                this.view.segBeneficiaryList.selectedRowIndex = [i, j];
                isBeneficiaryAvailable = true;
                break;
              }
            }
            if (isBeneficiaryAvailable) break;
          }
          if (isBeneficiaryAvailable) {
            this.selectBeneficiary();
          }
          this.toggleRadioButton(1);
          if ((data.isCorporate === 'true' && isBeneficiaryAvailable) || data.isCorporate === 'false') return;
        }
        this.view.tbxBeneficiaryName.text = data.beneficiaryName;
        this.view.tbxAddressField1.text = data.address1;
        this.view.tbxAddressField2.text = data.address2;
        this.view.tbxAddressField3.text = data.city;
        this.view.tbxAddressField4.text = data.state;
        this.view.tbxAddressField5.text = data.country;
        this.view.tbxAddressField6.text = data.zipcode;
        this.view.lblSaveBeneficiaryCheckboxIcon.text = data.isCorporate ? fontIconConstants.checkboxSelected : fontIconConstants.checkboxUnselected
        this.toggleRadioButton(2);
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "preFillData",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    preFillDataForEdit: function (data) {
      try {
        this.view.tbxBeneficiaryName.text = data.beneficiaryName;
        this.view.tbxAddressField1.text = data.address1;
        this.view.tbxAddressField2.text = data.address2;
        this.view.tbxAddressField3.text = data.city;
        this.view.tbxAddressField4.text = data.state;
        this.view.tbxAddressField5.text = data.country;
        this.view.tbxAddressField6.text = data.zipcode;
        this.toggleRadioButton(2);
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "preFillDataForEdit",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    onError: function (err) {
      console.log(err);
    }
  };
});