define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
      
		initGettersSetters: function() {

		},

      	setData: function(data, needColon) {
            var Colon = "";
          	var segData = [];
          
            if(needColon) {
              Colon = ":";
            }
          	
          	var keys = Object.keys(data);
      		for(var i = 0; i < keys.length; i++) {
              var key = keys[i];
              var temp = {};
              temp.lblKey = key;
              temp.lblValue = data[key];
              temp.lblColon = Colon;
              if(temp.lblKey === 'Template Name'){
                temp.lblKey = kony.i18n.getLocalizedString("i18n.konybb.common.templateName");
                }
                else if(temp.lblKey === 'Transaction Type'){
                temp.lblKey = kony.i18n.getLocalizedString("i18n.konybb.Common.TransactionType");
                }
                else if(temp.lblKey === 'Request Type'){
                temp.lblKey = kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType");
                }
                else if(temp.lblKey === 'Debit Account'){
                temp.lblKey = kony.i18n.getLocalizedString("i18n.konybb.Common.DebitAccount");
                }
                else if(temp.lblKey === 'Created On'){
                temp.lblKey = kony.i18n.getLocalizedString( "i18n.konybb.Template.CreatedOn");
                }
                else if(temp.lblKey === 'Created By'){
                temp.lblKey = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedBy");
                }
                else if(temp.lblKey === 'Effective Date'){
                temp.lblKey = kony.i18n.getLocalizedString("i18n.konybb.common.EffectiveDate");
                }
                else if(temp.lblKey === 'Maximum transfer Amount'){
                temp.lblKey = kony.i18n.getLocalizedString("i18n.konybb.common.MaximumTransferAmount");
                }
                else if(temp.lblKey === 'Status'){
                temp.lblKey = kony.i18n.getLocalizedString("i18n.common.status");
                }
                else if(temp.lblKey === 'Reference Id'){
                temp.lblKey = kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceId");
                }
              if(key === "Debit Account"){
			temp.lblIcon = {
              "isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
              "text": "r"
            };
              }
              segData.push(temp);
            }
          	
          	this.view.segDetails.setData(segData);
    	},
      
      	getData: function() {
            var data = {};
          	var segData = this.view.segDetails.data;
          
      		for(var i = 0; i < segData.length; i++) {
              var temp = segData[i];
              data[temp.lblKey] = temp.lblValue;
            }
          return data;
    	}
	};
});