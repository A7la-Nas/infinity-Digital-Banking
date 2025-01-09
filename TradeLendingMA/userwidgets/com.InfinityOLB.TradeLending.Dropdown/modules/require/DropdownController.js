define(["TradeLendingUtils"], function (TLUtils) {
  const fontIcons = {
    'chevronUp': 'P',
    'chevronDown': 'O',
  };
  return {
    /**
     * Performs the actions required before component.
     */
    preShow: function () {
      this.view.flxDropdown.cursorType = 'pointer';
      this.view.flxDropdown.onClick = this.toggleDropdown;
      this.view.segList.onRowClick = this.segRowClick;
    },
    /**
     * Toggles the dropdown.
     */
    toggleDropdown: function () {
      if (this.view.flxList.isVisible) {
        this.view.flxList.setVisibility(false);
        this.view.lblDropdownIcon.text = fontIcons.chevronDown;
        TLUtils.updateTouchEndSubscriber(this.view.id, false);
      } else {
        this.view.flxList.setVisibility(true);
        this.view.lblDropdownIcon.text = fontIcons.chevronUp;
        TLUtils.updateTouchEndSubscriber(this.view.id, true);
      }
    },
    /**
     * Handles segment row click.
     */
    segRowClick: function () {
      const selectedData = this.view.segList.selectedRowItems[0],
        label = this.view.lblValue;
      label.skin = 'sknLblSSP15pxtrucation';
      label.text = selectedData.value.text;
      label.toolTip = selectedData.value.toolTip;
      this.view.flxList.setVisibility(false);
      this.view.lblDropdownIcon.text = fontIcons.chevronDown;
      applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true).handleDropdownSelection(this.view.id, selectedData.key);
    },
    /**
     * Sets the context.
     * @param {object|Array|Set} listValues - Specifies the droopdown values.
     * @returns {void} - Returns nothing if values is empty.
     */
    setContext: function (listValues) {
      if (!listValues) return;
      let segData = [];
      if (listValues instanceof Set) {
        listValues = Array.from(listValues);
      }
      const isArray = Array.isArray(listValues);
      this.view.segList.widgetDataMap = {
        'lblListValue': 'value'
      };
      for (const [key, value] of Object.entries(listValues)) {
        segData.push({
          'key': isArray ? value : key,
          'value': {
            'text': value,
            'toolTip': value,
            'cursorType': 'pointer'
          }
        });
      }
      this.view.segList.setData(segData);
      this.view.flxList.height = (segData.length * 41 > 205) ? "205dp" : `${segData.length * 41}dp`;
    },
    /**
     * Returns the selected dropdown key.
     * @returns {string} - Returns selected dropdown key.
     */
    getSelectedKey: function () {
      const selectedData = this.view.segList.selectedRowItems[0];
      return (selectedData || {}).key;
    },
    /**
     * Selects a key.
     * @param {string} keyToSelect - Specifies the key to select.
     */
    selectKey: function (keyToSelect) {
      const data = this.view.segList.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === keyToSelect) {
          this.view.segList.selectedRowIndex = [0, i];
          this.segRowClick();
          break;
        }
      }
    },
    /**
     * Removes the selection.
     */
    removeSelection: function () {
      this.view.segList.selectedRowIndex = null;
      this.view.lblValue.text = '';
      this.view.lblValue.toolTip = '';
    },
    /**
     * Sets the default text.
     * @param {string} text - Specifies the text.
     */
    setDefaultText: function (text) {
      const label = this.view.lblValue;
      label.skin = 'sknLblSSP72727215px';
      label.text = text || kony.i18n.getLocalizedString('i18n.wealth.select');
      label.toolTip = '';
    },
    /**
     * Closes the dropdown.
     */
    closeDropdown: function () {
      this.view.flxList.setVisibility(false);
      this.view.lblDropdownIcon.text = fontIcons.chevronDown;
    },
    /**
     * Disables the dropdown.
     */
    disableDrodown: function () {
      this.view.flxDropdown.onClick = null;
      this.view.flxDropdown.skin = "ICSknbgFBFBFBtopbottombte3e3e3";
    }
  };
});