define(["FormControllerUtility", "ViewConstants", "SCFUtils"], function (FormControllerUtility, ViewConstants, SCFUtils) {
	const fontIcons = {
		'chevronUp': 'P',
		'chevronDown': 'O',
	};
	return {
		/**
		 * Performs the actions required before rendering component.
		 */
		preShow: function () {
			const scope = this;
			['flxDropdown', 'flxAddDocument'].forEach(w => scope.view[w].cursorType = 'pointer');
			this.view.flxDropdown.onClick = this.toggleDropdown;
			this.view.tbxField1.onTextChange = this.restrictField;
			this.view.calField5.onSelection = this.enableStartDate;
			this.view.tbxField8.onTextChange = this.restrictField;
			this.view.flxAddDocument.onClick = this.browseDocument;
			this.view.btnEdit.onClick = this.editInvoice;
			this.view.btnDelete.onClick = () => scope.currFormController.togglePopup({
				'context': 'deleteInvoice',
				'widgetId': scope.view.id
			});
			this.view.btnClear.onClick = this.resetFields;
			this.view.btnSave.onClick = () => scope.currFormController.saveInvoice(scope.view.id);
			this.renderCalendars();
		},
		/**
		 * Sets the context.
		 * @param {object} context - Specifies the context info.
		 */
		setContext: function (context) {
			this.context = context;
			this.currFormController = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
			this.customerIdDropdown = Object.fromEntries(Object.keys(context.customerId).map(key => [key, `${context.customerId[key]} - ${key.replace(/^_/, '')}`]));
			this.view.DropdownField2.setContext(context.billType);
			this.view.DropdownField3.setContext(this.customerIdDropdown);
			this.view.DropdownField4.setContext(this.customerIdDropdown);
			this.view.DropdownField7.setContext(context.currency);
			const formats = context.documentFormat.map(e => `.${e}`);
			this.view.lblDocumentInfo.text = `Following file types can be Uploaded - ${formats.slice(0, -1).join(', ')} & ${formats.slice(-1)} & Maximum file size ${context.documentMaxSize}.`;
			this.resetFields();
		},
		/**
		 * Toggles the dropdown.
		 */
		toggleDropdown: function (collapse) {
			if (!this.dataSaved || !this.currFormController.areWidgetsEnabled()) {
				return;
			}
			if (this.view.flxContainer.isVisible || (collapse && typeof collapse === 'boolean')) {
				this.view.lblDropdownIcon.text = fontIcons.chevronDown;
				this.view.flxContainer.setVisibility(false);
				this.view.flxActions.setVisibility(false);
				this.view.btnEdit.setVisibility(!!this.invoiceReference);
			} else {
				this.view.lblDropdownIcon.text = fontIcons.chevronUp;
				this.view.flxContainer.setVisibility(true);
				if (this.invoiceReference && this.dataSaved) {
					this.view.flxFields.setVisibility(false);
					this.view.flxDetails.setVisibility(true);
					this.view.flxActions.setVisibility(false);
				} else {
					this.view.flxFields.setVisibility(true);
					this.view.flxDetails.setVisibility(false);
					this.view.flxActions.setVisibility(true);
				}
				this.currFormController.collapseWidgets(this.view.id);
			}
		},
		/**
		* Sets the position of calendars.
		*/
		renderCalendars: function () {
			const calendars = [this.view.calField5, this.view.calField6];
			for (const calWidget of calendars) {
				calWidget.dateEditable = false;
				calWidget.setContext({
					'widget': calWidget,
					'anchor': "bottom"
				});
			}
		},
		/**
		 * Resets the fields.
		 */
		resetFields: function () {
			this.documentsList = [];
			this.selectedDocument = '';
			this.deletedDocumentIndex;
			this.data = {};
			this.dataSaved = false;
			this.view.tbxField1.text = '';
			this.view.DropdownField2.removeSelection();
			this.view.DropdownField2.setDefaultText();
			this.view.DropdownField3.removeSelection();
			this.view.DropdownField3.setDefaultText();
			this.view.DropdownField4.removeSelection();
			this.view.DropdownField4.setDefaultText();
			this.view.calField5.clear();
			this.view.calField6.clear();
			this.view.DropdownField7.removeSelection();
			this.view.DropdownField7.setDefaultText();
			this.view.tbxField8.text = '';
			const docWidget = this.view.flxDocument.clone();
			this.view.flxDocumentList.removeAll();
			this.view.flxDocumentList.add(docWidget);
			FormControllerUtility.disableButton(this.view.btnSave);
			this.currFormController.toggleSubmitButton();
		},
		/**
		 * Restricts the characters in fields.
		 */
		restrictField: function () {
			const tbxWidgetId = arguments[0].id;
			switch (tbxWidgetId) {
				case 'tbxField1':
					this.view[tbxWidgetId].text = this.view[tbxWidgetId].text.replace(/[^a-zA-Z0-9]/g, '');
					break;
				case 'tbxField8':
					this.view[tbxWidgetId].text = this.view[tbxWidgetId].text.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1').replace(/^(\d+\.\d{2}).*$/, '$1');
					break;
			}
			this.enableOrDisableSave();
		},
		/**
		 * Enables the start date for maturity date calendar.
		 */
		enableStartDate: function () {
			const calIssue = this.view.calField5,
				calMaturity = this.view.calField6;
			let issueDate = new Date(calIssue.formattedDate);
			issueDate.setDate(issueDate.getDate() + 1);
			if (calMaturity.formattedDate) {
				const maturityDate = new Date(calMaturity.formattedDate);
				if (maturityDate <= issueDate) {
					calMaturity.clear();
				}
			}
			calMaturity.validStartDate = [issueDate.getDate(), issueDate.getMonth() + 1, issueDate.getFullYear()];
			this.enableOrDisableSave();
		},
		/**
		 * Sets the heading text.
		 * @param {number} idx - Specifies the index of widget instance.
		 */
		setHeading: function (idx) {
			if (this.invoiceReference) {
				this.view.lblHeading.text = `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceN')} - ${this.invoiceReference}`;
			} else {
				this.view.lblHeading.text = `${kony.i18n.getLocalizedString('i18n.SBAdvisory.invoice')} - ${idx}`;
				this.view.btnDelete.setVisibility(idx !== 1);
			}
		},
		/**
		 * Handles the dropdown selection.
		 * @param {string} widgetId - Specifies widget id.
		 * @param {string} selectedKey - Specifies selected key.
		 */
		handleDropdownSelection: function (widgetId, selectedKey) {
			switch (widgetId) {
				case 'DropdownField2':
				case 'DropdownField7':
					break;
				case 'DropdownField3':
				case 'DropdownField4':
					this.handleCustomerIdDropdown(widgetId, selectedKey);
					break;
			}
			this.enableOrDisableSave();
		},
		/**
		 * Browses the documents to upload.
		 */
		browseDocument: function () {
			if (this.documentsList.length >= this.context.documentLimit) {
				this.currFormController.togglePopup({
					'context': 'uploadDocument',
					'message': `${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedDocumentsLimitMessage")} ${this.context.documentLimit}.`,
					'widgetId': this.view.id
				});
				return;
			}
			const config = {
				'selectMultipleFiles': false,
				'filter': SCFUtils.getMimeTypes(this.context.documentFormat)
			};
			kony.io.FileSystem.browse(config, this.selectedDocumentCallback);
		},
		/**
		 * Retrieves the base64 string of a file.
		 * @param {object} file - Specifies the file object.
		 * @param {Function} callback - Specifies the callback.
		 */
		getBase64: function (file, callback) {
			let reader = new FileReader();
			reader.onloadend = function () {
				callback(reader.result);
			};
			reader.readAsDataURL(file);
		},
		/**
		 * Callback for document selection.
		 * @param {object} events - Specifies the event object.
		 * @param {object} files - Specifies the files object.
		 * @returns {void} - Returns nothing if validation fails.
		 */
		selectedDocumentCallback: function (events, files) {
			const scope = this;
			const { documentFormat, documentMaxSize } = this.context;
			const maxBytes = parseInt(documentMaxSize) * (2 ** 20);
			try {
				if (files.length > 0) {
					const { name, type, size } = files[0].file;
					if (this.documentsList.some(d => d.documentName.toLowerCase() === name.toLowerCase())) {
						throw new Error('Document with same name was already uploaded, please try uploading document with different name or extension.');
					}
					const extension = (name.split('.').pop() || '').toLowerCase();
					if (extension && !documentFormat.includes(extension)) {
						throw new Error(`${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${name} ${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedFileExtensionsMessage")} ${documentFormat.map(e => `.${e}`).join(', ')}.`);
					}
					if (size > maxBytes) {
						throw new Error(`${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${name} ${kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentSizeErrorMsg")} ${documentMaxSize}.`);
					}
					this.selectedDocument = { 'documentName': name };
					this.getBase64(files[0].file, function (base64String) {
						const fileContents = base64String.split(';base64,')[1];
						const fileDataItemParsed = [name, type, fileContents].join('~');
						scope.currFormController.uploadDocument(fileDataItemParsed, scope.view.id);
					});
				}
			} catch (err) {
				this.currFormController.togglePopup({
					'context': 'uploadDocument',
					'message': err.message,
					'widgetId': this.view.id
				});
			}
		},
		/**
		 * Adds the document.
		 * @param {string} docReference - Specifies the document reference.
		 */
		addDocument: function (docReference) {
			this.selectedDocument['documentReference'] = docReference;
			this.documentsList.push(this.selectedDocument);
			this.view.flxDocumentList.add(this.view.flxDocument.clone(docReference));
			this.view[`${docReference}flxDocument`].setVisibility(true);
			this.view[`${docReference}imgType`].src = SCFUtils.getDocumentImages(this.selectedDocument['documentName'].split('.').pop()) || 'aa_password_error.png';
			this.view[`${docReference}lblName`].text = this.selectedDocument['documentName'];
			this.view[`${docReference}lblName`].cursorType = 'pointer';
			this.view[`${docReference}lblName`].onTouchEnd = function () {
				this.currFormController.downloadDocument(docReference, this.view.id);
			}.bind(this);
			this.view[`${docReference}flxCross`].cursorType = 'pointer';
			this.view[`${docReference}flxCross`].onClick = function () {
				this.deleteDocRef = docReference;
				this.currFormController.togglePopup({
					'context': 'deleteDocument',
					'message': `${kony.i18n.getLocalizedString("i18n.TradeFinance.deleteDocumentMessage")} "${this.view[`${docReference}lblName`].text}"?`,
					'widgetId': this.view.id,
					docReference
				});
			}.bind(this);
			this.dataSaved = false;
			this.currFormController.toggleSubmitButton();
		},
		/**
		 * Removed the document.
		 */
		removeDocument: function () {
			const docRef = this.deleteDocRef;
			const idx = this.documentsList.findIndex(obj => obj.documentReference === docRef);
			(idx !== -1) && this.documentsList.splice(idx, 1);
			this.view.flxDocumentList.remove(this.view[`${docRef}flxDocument`]);
			this.dataSaved = false;
			this.currFormController.toggleSubmitButton();
		},
		/**
		 * Returns the data.
		 * @returns {object} - Specifies the data.
		 */
		getData: function () {
			this.data = {
				'billReference': this.view.tbxField1.text,
				'billType': this.view.DropdownField2.getSelectedKey() || '',
				'supplierId': (this.view.DropdownField3.getSelectedKey() || '').replace(/^_/, ''),
				'buyerId': (this.view.DropdownField4.getSelectedKey() || '').replace(/^_/, ''),
				'issueDate': this.view.calField5.formattedDate || '',
				'maturityDate': this.view.calField6.formattedDate || '',
				'invoiceCurrency': this.view.DropdownField7.getSelectedKey() || '',
				'invoiceAmount': this.view.tbxField8.text,
				'invoiceDocuments': this.documentsList
			};
			this.data['supplierName'] = this.context.customerId[`_${this.data.supplierId}`];
			this.data['buyerName'] = this.context.customerId[`_${this.data.buyerId}`];
			this.invoiceReference && (this.data['invoiceReference'] = this.invoiceReference);
			return this.data;
		},
		/**
		 * Enable or disable the save button.
		 */
		enableOrDisableSave: function () {
			this.dataSaved = false;
			const data = this.getData();
			const mandatoryFilled = Object.values(data).every(value => !!value);
			if (mandatoryFilled) {
				FormControllerUtility.enableButton(this.view.btnSave);
			} else {
				FormControllerUtility.disableButton(this.view.btnSave);
			}
			this.currFormController.toggleSubmitButton();
		},
		/**
		 * Shows the details of selected data.
		 */
		showDetails: function (reference) {
			this.invoiceReference = reference;
			this.dataSaved = true;
			this.setHeading();
			const configurationManager = applicationManager.getConfigurationManager(),
				formatUtilManager = applicationManager.getFormatUtilManager();
			this.view.btnEdit.setVisibility(true);
			this.view.btnDelete.setVisibility(true);
			this.view.flxFields.setVisibility(false);
			this.view.flxActions.setVisibility(false);
			this.view.flxDetails.setVisibility(true);
			let segData = [
				{
					'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.billReferenceWithColon'),
					'lblValue': this.data.billReference
				},
				{
					'lblKey': kony.i18n.getLocalizedString('i18n.TradeFinance.billTypeWithColon'),
					'lblValue': this.data.billType
				},
				{
					'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierIDWithColon'),
					'lblValue': `${this.data.supplierName} - ${this.data.supplierId}`
				},
				{
					'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerIDWithColon'),
					'lblValue': `${this.data.buyerName} - ${this.data.buyerId}`
				},
				{
					'lblKey': kony.i18n.getLocalizedString('i18n.TradeFinance.issueDateWithColon'),
					'lblValue': this.data.issueDate
				},
				{
					'lblKey': kony.i18n.getLocalizedString('i18n.Wealth.maturityDate'),
					'lblValue': this.data.maturityDate
				},
				{
					'lblKey': kony.i18n.getLocalizedString('i18n.wealth.currencyColon'),
					'lblValue': this.data.invoiceCurrency
				},
				{
					'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.invoiceAmountWithColon'),
					'lblValue': `${configurationManager.getCurrency(this.data.invoiceCurrency)}${formatUtilManager.formatAmount(this.data.invoiceAmount)}`
				}
			];
			let i = 0;
			for (const document of this.data.invoiceDocuments) {
				segData.push({
					'lblKey': i++ === 0 ? kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon') : '',
					'lblValue': {
						'isVisible': false
					},
					'flxDocument': {
						'isVisible': true
					},
					'imgDownload': {
						'src': SCFUtils.getDocumentImages(document.documentName.split('.').pop()) || 'aa_password_error.png'
					},
					'lblDocumentName': document.documentName
				});
			}
			this.view.segDetails.setData(segData);
			this.view.forceLayout();
		},
		/**
		 * Edits the invoice.
		 */
		editInvoice: function () {
			if (!this.currFormController.areWidgetsEnabled()) {
				return;
			}
			this.currFormController.setCurrentInvoiceId(this.view.id);
			this.view.lblDropdownIcon.text = fontIcons.chevronUp;
			this.view.btnEdit.setVisibility(false);
			this.view.flxContainer.setVisibility(true);
			this.view.flxFields.setVisibility(true);
			this.view.flxActions.setVisibility(true);
			this.view.flxDetails.setVisibility(false);
			this.currFormController.collapseWidgets(this.view.id);
		},
		/**
		 * Handles the supplier and buyer id dropdown.
		 * @param {string} widgetId - Specifies the widget id.
		 * @param {string} selectedKey - Specifies the selected key.
		 */
		handleCustomerIdDropdown: function (widgetId, selectedKey) {
			const primaryCustomerId = Object.keys(this.context.customerId)[0];
			const secondary = widgetId === 'DropdownField3' ? 'DropdownField4' : 'DropdownField3';
			if (selectedKey === primaryCustomerId) {
				const filtered = JSON.parse(JSON.stringify(this.customerIdDropdown));
				delete filtered[selectedKey];
				const selectedId = this.view.DropdownField4.getSelectedKey();
				this.view[secondary].setContext(filtered);
				this.selectCustomerId(secondary, selectedId);
			} else {
				const filteredPrimary = JSON.parse(JSON.stringify(this.customerIdDropdown));
				delete filteredPrimary[primaryCustomerId];
				this.view[widgetId].setContext(filteredPrimary);
				this.selectCustomerId(widgetId, selectedKey);
				const filtered = JSON.parse(JSON.stringify(this.customerIdDropdown));
				delete filtered[selectedKey];
				this.view[secondary].setContext(filtered);
				this.selectCustomerId(secondary, primaryCustomerId);
			}
			this.enableOrDisableSave();
		},
		/**
		 * Selects the customer id.
		 * @param {string} widgetId - Specifies the widget id.
		 * @param {string} id - Specifies the id to select.
		 * @returns {void} - Returns nothing if id is invalid.
		 */
		selectCustomerId: function (widgetId, id) {
			if (!id) {
				return;
			}
			const idx = this.view[widgetId].segList.data.findIndex(r => r.key === id);
			this.view[widgetId].segList.selectedRowIndex = [0, idx];
			this.view[widgetId].lblValue.skin = 'sknLblSSP15pxtrucation';
			this.view[widgetId].lblValue.text = this.customerIdDropdown[id];
			this.view[widgetId].lblValue.toolTip = this.customerIdDropdown[id];
		},
		/**
		 * Indicates whether the data has been saved.
		 * @returns {boolean} - True if the data is saved, otherwise false.
		 */
		isDataSaved: function () {
			return this.dataSaved;
		},
		/**
		 * Return the invoice reference.
		 * @returns {string} - Invoice Reference.
		 */
		getInvoiceReference: function () {
			return this.invoiceReference;
		}
	};
});