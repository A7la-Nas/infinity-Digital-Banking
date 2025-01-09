define(function () {
	const fontIcons = {
		'chevronUp': 'P',
		'chevronDown': 'O',
	};
	return {
		preShow: function () {
			this.view.flxDropdown.cursorType = 'pointer';
			this.view.flxDropdown.onClick = this.toggleDropdown;
			this.view.segList.onRowClick = this.segRowClick;
			this.view.onHover = (widget, context) => (context.eventType === constants.ONHOVER_MOUSE_LEAVE) && this.closeDropdown();
		},
		toggleDropdown: function () {
			if (this.view.flxList.isVisible) {
				this.view.flxList.setVisibility(false);
				this.view.lblDropdownIcon.text = fontIcons.chevronDown;
			} else {
				this.view.flxList.setVisibility(true);
				this.view.lblDropdownIcon.text = fontIcons.chevronUp;
			}
		},
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
		setContext: function (listValues) {
			if (!listValues) return;
			let segData = [];
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
					},
					'template': 'flxListDropdown'
				});
			}
			this.view.segList.setData(segData);
			this.view.flxList.height = (segData.length * 41 > 205) ? "205dp" : `${segData.length * 41}dp`;
		},
		getSelectedKey: function () {
			const selectedData = this.view.segList.selectedRowItems[0];
			return (selectedData || {}).key;
		},
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
		removeSelection: function () {
			this.view.segList.selectedRowIndex = null;
			this.view.lblValue.text = '';
			this.view.lblValue.toolTip = '';
		},
		setDefaultText: function (text) {
			const label = this.view.lblValue;
			label.skin = 'sknLblSSP72727215px';
			label.text = text || kony.i18n.getLocalizedString('i18n.wealth.select');
			label.toolTip = '';
		},
		closeDropdown: function () {
			this.view.flxList.setVisibility(false);
			this.view.lblDropdownIcon.text = fontIcons.chevronDown;
		},
        disableDrodown: function () {
            this.view.flxDropdown.onClick = null;
            this.view.flxDropdown.skin = "ICSknbgFBFBFBtopbottombte3e3e3";
        }
	};
});