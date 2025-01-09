define(["ViewConstants", "SCFUtils"], function (ViewConstants, SCFUtils) {
	const fontIcons = {
		'chevronUp': 'P',
		'chevronDown': 'O',
	};
	return {
		preShow: function () {
			['flxDropdown', 'flxAddDocument'].forEach(w => this.view[w].cursorType = 'pointer');
			this.view.flxDropdown.onClick = this.toggleDropdown;
			this.view.flxAddDocument.onClick = this.browseSupportingDocument;
		},
		toggleDropdown: function () {
			this.view.lblCount.setVisibility(false);
			if (this.view.flxContainer.isVisible) {
				this.view.flxContainer.setVisibility(false);
				this.view.lblDropdownIcon.text = fontIcons.chevronDown;
				if (this.documentsList.length) {
					this.view.lblCount.setVisibility(true);
					this.view.lblCount.text = `${this.documentsList.length} ${kony.i18n.getLocalizedString('i18n.common.Attachments')}`;
				}
			} else {
				this.view.flxContainer.setVisibility(true);
				this.view.lblDropdownIcon.text = fontIcons.chevronUp;
			}
		},
		setContext: function (context) {
			this.documentsList = [];
			this.selectedDocument = '';
			this.deletedDocumentIndex;
			this.context = context;
			const docWidget = this.view.flxDocument.clone();
			this.view.flxDocuments.removeAll();
			this.view.flxDocuments.add(docWidget);
		},
		browseSupportingDocument: function () {
			const scope = this;
			const config = {
				'selectMultipleFiles': false,
				'filter': SCFUtils.getMimeTypes(this.context.format)
			};
			kony.io.FileSystem.browse(config, scope.selectedDocumentCallback);
		},
		getBase64: function (file, successCallback) {
			let reader = new FileReader();
			reader.onloadend = function () {
				successCallback(reader.result);
			};
			reader.readAsDataURL(file);
		},
		selectedDocumentCallback: function (events, files) {
			const scope = this;
			const { format, maxSize } = this.context;
			const maxBytes = parseInt(maxSize) * (2 ** 20);
			const currFormController = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
			let uploadDocumentMessage = '';
			if (files.length > 0) {
				const { name, type, size } = files[0].file;
				if (this.documentsList.some(d => d.documentName.toLowerCase() === name.toLowerCase())) {
					uploadDocumentMessage = 'Document with same name was already uploaded, please try uploading document with different name or extension.'
					currFormController.togglePopup('uploadDocument', uploadDocumentMessage, this.view.id);
					return;
				}
				const extension = (name.split('.').pop() || '').toLowerCase();
				if (extension && !format.includes(extension)) {
					uploadDocumentMessage = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${name} ${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedFileExtensionsMessage")} ${format.map(e => `.${e}`).join(', ')}.`;
					currFormController.togglePopup('uploadDocument', uploadDocumentMessage, this.view.id);
					return;
				}
				if (size > maxBytes) {
					uploadDocumentMessage = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${name} ${kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentSizeErrorMsg")} ${maxSize}.`;
					currFormController.togglePopup('uploadDocument', uploadDocumentMessage, this.view.id);
					return;
				}
				this.selectedDocument = { 'documentName': name };
				this.getBase64(files[0].file, function (base64String) {
					const fileContents = base64String.split(';base64,')[1];
					const fileDataItemParsed = [name, type, fileContents].join('~');
					currFormController.uploadDocument(fileDataItemParsed, scope.view.id);
				});
			}
		},
		addDocument: function (docReference) {
			const currFormController = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
			this.selectedDocument['documentReference'] = docReference;
			this.documentsList.push(this.selectedDocument);
			this.view.flxDocuments.add(this.view.flxDocument.clone(docReference));
			this.view[`${docReference}flxDocument`].setVisibility(true);
			this.view[`${docReference}imgType`].src = SCFUtils.getDocumentImages(this.selectedDocument['documentName'].split('.').pop()) || 'aa_password_error.png';
			this.view[`${docReference}lblName`].text = this.selectedDocument['documentName'];
			this.view[`${docReference}lblName`].cursorType = 'pointer';
			this.view[`${docReference}lblName`].onTouchEnd = function () {
				currFormController.downloadDocument(docReference, this.view.id);
			}.bind(this);
			this.view[`${docReference}flxCross`].cursorType = 'pointer';
			this.view[`${docReference}flxCross`].onClick = function () {
				this.deleteDocRef = docReference;
				const document = {
					'documentName': this.view[`${docReference}lblName`].text,
					'documentReference': docReference
				};
				currFormController.deleteDocument(document, this.view.id);
			}.bind(this);
		},
		removeDocument: function () {
			const docRef = this.deleteDocRef;
			const idx = this.documentsList.findIndex(obj => obj.documentReference === docRef);
			(idx !== -1) && this.documentsList.splice(idx, 1);
			this.view.flxDocuments.remove(this.view[`${docRef}flxDocument`]);
		},
		getData: function () {
			return this.documentsList;
		},

		setDocumentData: function (documentName, docReference) {
			this.selectedDocument = { 'documentName': documentName };
			this.addDocument(docReference);
		}
	};
});