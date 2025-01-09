define(function() {

	return {
      
      showTransactionType : function(){
        var selectedType = this.view.lstbxTransactionType.selectedKey;
        this.view.lstbxTransactionType.showTransactionType(selectedType);
      }

	};
});