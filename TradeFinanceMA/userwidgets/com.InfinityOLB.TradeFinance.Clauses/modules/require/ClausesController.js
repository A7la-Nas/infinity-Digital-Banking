define(function () {
	return {
		preShow: function () {
			this.view.flxValueClauseType.onClick = this.toggleDropdown;
			this.view.segClause.onRowClick = this.segRowClick;
			this.initSwiftTags();
			this.view.tbxTitle.onEndEditing = this.validateData;
			this.view.txtDescription.onEndEditing = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true).enableDisableSubmitButton;
		},
		validateData: function () {
			let clauseAvailable = false;
			clauseAvailable = this.view.segClause.data.find(x => (x.clauseTitle || '').toLowerCase() === this.view.tbxTitle.text.toLowerCase());
			if (clauseAvailable) {
				this.view.lblError.isVisible = true;
				this.view.lblError.text = "Title already exists";
			} else {
				this.view.lblError.isVisible = false;
			}
			applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true).enableDisableSubmitButton();
		},
		segRowClick: function () {
			const selectedData = this.view.segClause.selectedRowItems[0];
			if (selectedData['flxListDropdown']['skin'] === 'slFboxBGf8f7f8B0') {
				this.view.segClause.selectedRowIndex = null;
				return;
			}
			if (selectedData.clauseId) {
				this.view.flxTitle.setVisibility(false);
				this.view.txtDescription.text = selectedData.clauseDescription;
			} else {
				this.view.flxTitle.setVisibility(true);
				this.view.txtDescription.text = '';
			}
			this.view.lblValueClauseType.text = selectedData.lblListValue.text;
			this.view.lblValueClauseType.toolTip = selectedData.lblListValue.toolTip;
			this.view.lblValueClauseType.skin = "sknLblSSP15pxtrucation";
			this.view.flxDescription.setVisibility(true);
			this.view.flxSegClause.setVisibility(false);
			this.view.lblClauseDropdown.text = 'O';
			applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true).enableDisableSubmitButton();
		},
		toggleDropdown: function () {
			if (this.view.flxSegClause.isVisible) {
				this.view.flxSegClause.setVisibility(false);
				this.view.lblClauseDropdown.text = "O";
			} else {
				this.view.flxSegClause.setVisibility(true);
				this.view.lblClauseDropdown.text = "P";
			}
		},
		setData: function (segData) {
			if (!segData) return;
			this.view.segClause.widgetDataMap = {
				flxListDropdown: 'flxListDropdown',
				lblListValue: "lblListValue"
			};
			this.view.segClause.setData(segData);
			this.view.flxSegClause.height = segData.length * 40 > 180 ? "180dp" : segData.length * 40 + "dp";
		},
		getData: function () {
			let clauseData = {};
			if (!this.view.segClause.selectedRowIndex || (this.view.flxTitle.isVisible && this.view.tbxTitle.text === "") || this.view.txtDescription.text === "") return;
			clauseData = JSON.parse(JSON.stringify(this.view.segClause.selectedRowItems[0]));
			delete clauseData.flxListDropdown;
			delete clauseData.lblListValue;
			clauseData["clauseDescription"] = this.view.txtDescription.text;
			if (this.view.flxTitle.isVisible) clauseData["clauseTitle"] = this.view.tbxTitle.text;
			return clauseData;
		},
		initSwiftTags: function () {
			const guaranteeSwiftTags = applicationManager.getConfigurationManager().guaranteeSwiftTags;
			if (scope_configManager.swiftEnabled === 'True') {
				this.view.flxClauseTypeSwiftTag.setVisibility(true);
				this.view.flxClauseTypeContent.left = "40dp";
				this.view.flxTitleSwiftTag.setVisibility(true);
				this.view.flxTitleContent.left = "40dp";
				this.view.flxDescriptionSwiftTag.setVisibility(true);
				this.view.flxDescriptionContent.left = "40dp";
				this.view.lblClauseTypeSwiftTag.text = guaranteeSwiftTags.clauseAndConditionType || 'NA';
				this.view.lblTitleSwiftTag.text = guaranteeSwiftTags.clauseAndConditionTitle || 'NA';
				this.view.lblDescriptionSwiftTag.text = guaranteeSwiftTags.clauseAndConditionDescription || 'NA';
			} else {
				this.view.flxClauseTypeSwiftTag.setVisibility(false);
				this.view.flxClauseTypeContent.left = "0dp";
				this.view.flxTitleSwiftTag.setVisibility(false);
				this.view.flxTitleContent.left = "0dp";
				this.view.flxDescriptionSwiftTag.setVisibility(false);
				this.view.flxDescriptionContent.left = "0dp";
				this.view.lblHeading.left = "0dp";
			}
			this.view.forceLayout();
		},
		preFillData: function (clauses) {
			let clauseIdAvailable = false;
			const clauseData = this.view.segClause.data;
			if (clauses.clauseId) {
				for (let i = 0; i < clauseData.length; i++) {
					if (clauseData[i].clauseId === clauses.clauseId) {
						this.view.segClause.selectedRowIndex = [0, i];
						clauseIdAvailable = true;
						break;
					}
				};
				if (clauseIdAvailable) {
					this.segRowClick();
				};
			} else {
				this.view.segClause.selectedRowIndex = [0, clauseData.length - 1];
				this.view.tbxTitle.text = clauses.clauseTitle;
				this.view.lblValueClauseType.text = "Custom Clause & Condition";
				this.view.txtDescription.text = clauses.clauseDescription;
			}
		}
	};
});