define(['CommonUtilities'], function (CommonUtilities) {
  const fontIconConstants = {
    'checkboxSelected': 'C',
    'checkboxUnselected': 'D',
    'chevronUp': 'P',
    'chevronDown': 'O',
  };
  let accountsData = [];
  return {
    preShow: function () {
      this.view.flxDropdownCurrency.onClick = this.toggleDropdown.bind(this, this.view.flxCurrencyList, this.view.lblSelectedValueCurrencyDropdown);
      this.view.segCurrencyList.onRowClick = this.segRowClick.bind(this, this.view.segCurrencyList, this.view.lblSelectedValueCurrency, this.view.flxCurrencyList, this.view.lblSelectedValueCurrencyDropdown);
      for (let i = 1; i <= 3; i++) {
        this.view['flxAccountType' + i + 'Dropdown'].onClick = this.toggleDropdown.bind(this, this.view['flxAccountType' + i + 'List'], this.view['lblAccountType' + i + 'DropdownIcon']);
        this.view['lblAccountTypeOptionIcon' + i].onTouchEnd = this.toggleCheckbox.bind(this, i);
        this.view['segAccountType' + i].onRowClick = this.segRowClick.bind(this, this.view['segAccountType' + i], this.view['lblSelectedAccountType' + i], this.view['flxAccountType' + i + 'List'], this.view['lblAccountType' + i + 'DropdownIcon']);
      }
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
    toggleCheckbox: function (idx) {
      if (this.view['lblAccountTypeOptionIcon' + idx].text === fontIconConstants.checkboxUnselected) {
        this.view['lblAccountTypeOptionIcon' + idx].text = fontIconConstants.checkboxSelected;
        this.view['flxAccountType' + idx].setVisibility(true);
      } else {
        this.view['lblAccountTypeOptionIcon' + idx].text = fontIconConstants.checkboxUnselected;
        this.view['flxAccountType' + idx].setVisibility(false);
        this.view['segAccountType' + idx].selectedRowIndex = null;
        this.view['lblSelectedAccountType' + idx].text = kony.i18n.getLocalizedString('i18n.common.selecthere');
        this.view['lblSelectedAccountType' + idx].skin = "sknLblSSP72727215px";
      }
    },
    segRowClick: function (segDropdown, lblSelectedValue, flxSegDropdown, lblDropdownIcon) {
      const data = segDropdown.selectedRowItems[0];
      lblSelectedValue.text = data.value;
      lblSelectedValue.skin = "sknLblSSP42424215px";
      flxSegDropdown.setVisibility(false);
      lblDropdownIcon.text = fontIconConstants.chevronDown;
      if (segDropdown.id === 'segCurrencyList') {
        this.setSelectedCurrencyAccounts(data.key);
      }
    },
    setData: function (currencies, accounts) {
      if (!currencies || !accounts) return;
      accountsData = accounts;
      let segCurrencyData = [];
      const widgetDataMap = {
        lblListValue: 'value'
      };
      this.view.segCurrencyList.widgetDataMap = widgetDataMap;
      this.view.segAccountType1.widgetDataMap = widgetDataMap;
      this.view.segAccountType2.widgetDataMap = widgetDataMap;
      this.view.segAccountType3.widgetDataMap = widgetDataMap;
      for (const currency of currencies) {
        if (!currency) continue;
        segCurrencyData.push({
          key: currency,
          value: currency + ' - ' + applicationManager.getConfigurationManager().getCurrency(currency),
          template: 'flxListDropdown'
        });
      }
      this.view.flxCurrencyList.height = (segCurrencyData.length * 41 > 205) ? "205dp" : `${segCurrencyData.length * 41}dp`;
      this.view.segCurrencyList.setData(segCurrencyData);
    },
    setSelectedCurrencyAccounts: function (currency) {
      let segAccountData = [];
      for (const account of accountsData) {
        if (account.currencyCode !== currency) continue;
        segAccountData.push({
          key: account.accountID,
          value: CommonUtilities.getAccountDisplayName(account),
          template: 'flxListDropdown'
        });
      }
      for (let i = 1; i <= 3; i++) {
        this.view['segAccountType' + i].selectedRowIndex = null;
        this.view['lblSelectedAccountType' + i].text = kony.i18n.getLocalizedString('i18n.common.selecthere');
        this.view['segAccountType' + i].setData(segAccountData);
      }
      const segAccountsHeight = (segAccountData.length * 41 > 205) ? "205dp" : `${segAccountData.length * 41}dp`;
      this.view.flxAccountType1List.height = segAccountsHeight;
      this.view.flxAccountType2List.height = segAccountsHeight;
      this.view.flxAccountType3List.height = segAccountsHeight;
    },
    getData: function () {
      let data = [];
      for (let i = 1; i <= 3; i++) {
        if ((this.view['lblAccountTypeOptionIcon' + i].text === fontIconConstants.checkboxSelected) && this.view['segAccountType' + i].selectedRowIndex) {
          data.push({
            'accountCurrency': this.view.segCurrencyList.selectedRowItems[0].key,
            'account': this.view['segAccountType' + i].selectedRowItems[0].key,
            'accountType': i === 1 ? 'Charge' : i === 2 ? 'Commission' : 'Cash Margin'
          });
        }
      }
      return data;
    },
    preFillData: function (data) {
      if (!data || data.length === 0) return;
      const currencyData = this.view.segCurrencyList.data;
      for (let i = 0; i < currencyData.length; i++) {
        if (currencyData[i].key === data[0].accountCurrency) {
          this.view.segCurrencyList.selectedRowIndex = [0, i];
          break;
        }
      }
      this.segRowClick(this.view.segCurrencyList, this.view.lblSelectedValueCurrency, this.view.flxCurrencyList, this.view.lblSelectedValueCurrencyDropdown);
      const accountsData = this.view.segAccountType1.data;
      for (const accData of data) {
        for (let i = 0; i < accountsData.length; i++) {
          if (accountsData[i].key === accData.account) {
            let idx = accData.accountType === 'Charge' ? 1 : accData.accountType === 'Commission' ? 2 : 3;
            this.view['segAccountType' + idx].selectedRowIndex = [0, i];
            this.toggleCheckbox(idx);
            this.segRowClick(this.view['segAccountType' + idx], this.view['lblSelectedAccountType' + idx], this.view['flxAccountType' + idx + 'List'], this.view['lblAccountType' + idx + 'DropdownIcon']);
            break;
          }
        }
      }
    }
  };
});