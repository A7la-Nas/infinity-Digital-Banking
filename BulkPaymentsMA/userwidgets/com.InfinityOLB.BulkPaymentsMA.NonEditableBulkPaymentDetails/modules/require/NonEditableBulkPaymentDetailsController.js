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
              segData.push(temp);
            }
          	
          	this.view.segNonEditableDetails.setData(segData);
    	},
      
      	getData: function() {
            var data = {};
          	var segData = this.view.segNonEditableDetails.data;
          
      		for(var i = 0; i < segData.length; i++) {
              var temp = segData[i];
              data[temp.lblKey] = temp.lblValue;
            }
          return data;
    	}
	};
});