define({ 

 //Type your controller code here 

 frmULTTestContactPreShow: function () {
    
    
    this.view.btnContacts.onClick = this.onContact;
     this.view.segContacts.onRowClick = this.segContactsonRowClick;
                
            
  
 },


  onContact: function () {
    
    
    var data = kony.contact.find("*", true);
    this.contactsList = data;
    this.contactsListBackup = data;
    this.setChooseFromContactsActions("phone");
    this.setChooseFromContactsSegmentData(data, "phone");
  
 },

  setChooseFromContactsSegmentData : function(data,flow)
    {
      try{
        
        var alphabetsArray = [] , contactsArray = [];
        var id = (flow === "phone") ? "number" : "id";
        if(!this.isEmptyNullUndefined(data) && data.length>0)
        {
          for(var i=0;i<data.length;i++)
          {
            if(!this.isEmptyNullUndefined(data[i][[flow]]) && data[i][[flow]].length>0)
            {
              data[i].contactName = data[i].displayname[0].toUpperCase()+data[i].displayname.slice(1).toLowerCase() + "  ( " + data[i][[flow]][0][[id]] + " )";
              data[i].id = data[i][[flow]][0][[id]];
              if(!JSON.stringify(alphabetsArray).includes(data[i].contactName[0]))
              {
                alphabetsArray.push({"alphabet" : data[i].contactName[0]});
              }
              contactsArray.push(data[i]);
            }
          }
          var contactsMapping = {
            "contact" : "id",
            "lblContactsName" : "contactName"
          };
          var alphabetsMapping = {
            "lblCountryCodeNo" : "alphabet"
          };
          this.view.segContacts.widgetDataMap = contactsMapping;
          this.view.segContacts.setData(contactsArray);
          //this.view.segCfcAlphabetsList.widgetDataMap = alphabetsMapping;
          //this.view.segCfcAlphabetsList.setData(alphabetsArray);
          this.contactsList = contactsArray;
          //this.view.flxCfcContactsSegList.setVisibility(true);
        }
        else
        {
          //this.view.flxCfcContactsSegList.setVisibility(false);
          //this.view.flxCfcNoResults.setVisibility(true);
        }

       
        //this.view.forceLayout(); 
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setChooseFromContactsSegmentData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
            
        };
        alert("errrrr");
        //this.onError(errObj);
      } 
    },

    segContactsonRowClick :function(){
        var selectedContact = this.view.segContacts.selectedRowItems;
        //this.view.txtContacts.text  = selectedContact[0].id.replace(/\s/g, "");
        this.view.txtContacts.text = selectedContact[0].id.replace(/\s/g, "").slice(-9);
      },

     /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined: function (data) {
      if (data === null || data === undefined || data === "") 
        return true;

      return false;
    },


    getSearchResults: function(segData, searchValue) {
      try {
       
        var searchData = [];
        searchValue = searchValue.toLocaleLowerCase();
        if(!this.isEmptyNullUndefined(segData) && !this.isEmptyNullUndefined(searchValue))
        {
          for (var i = 0; i < segData.length; i++) 
          {
            if(Object.values(segData[i]).toString().toLocaleLowerCase().includes(searchValue))
            {
              searchData.push(segData[i]);
            }
          }
        }
        else
        {
          return ""; 
        }
        return searchData; 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getSearchResults method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },



    setChooseFromContactsActions : function(flow)
    {
      try{
        var scope = this;
        
        scope.view.txtsearchContacts.onTextChange = function(){
          var searchedKey = scope.view.txtsearchContacts.text;
          if(searchedKey.length > 0)
          {
            scope.setChooseFromContactsSegmentData(scope.getSearchResults(scope.contactsListBackup, searchedKey),flow);
          }
          else
          {
            scope.setChooseFromContactsSegmentData(scope.contactsListBackup,flow);
          }
        };
        
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setChooseFromContactsActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      } 
    },

 });