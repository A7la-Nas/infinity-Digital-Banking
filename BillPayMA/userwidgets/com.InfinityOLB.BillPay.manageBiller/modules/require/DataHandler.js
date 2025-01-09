define(function () {
  
  /**
   * Constructor
   */
  function DataHandler(){
    this.data = [];
  }
  
  DataHandler.prototype.getData = function(){
    return this.data;
  };
  
  DataHandler.prototype.setData = function(list){
    this.data = list;
  };
  
  DataHandler.prototype.sortData = function(offset, limit, order, sortBy, sortByType){
    var data = this.data;
    var sortedData = data.sort(this.sortDataByType(sortBy, sortByType));
    if(order === "asc"){
      return (sortedData).slice(offset, offset+limit);
    }else if(order === "desc"){
      return (sortedData.reverse()).slice(offset, offset+limit);
    }
  };
  
  DataHandler.prototype.sortDataByType = function(property, type){
    switch(type){
      case "number": 
        return function(a, b) {    
          return (parseInt(a[property]) - parseInt(b[property]));
        };    
      case "date":
        return function(a, b) {    
          return (new Date(a[property]) - new Date(b[property]));
        };
      default:
        return function(a, b) {
          return (a[property].toLowerCase() - b[property].toLowerCase());
        };
    }
  };
  
  DataHandler.prototype.searchData = function(propertyList, searchString){
    var data = this.data;
    var finalList = [];
    if(!(JSON.stringify(data).toLowerCase()).includes(searchString.toLowerCase())){
      return finalList;
    }
    for(var i = 0; i < data.length; i++) {
      for(var j = 0; j < propertyList.length; j++){
        if(data[i][propertyList[j]] && (data[i][propertyList[j]].toLowerCase()).includes(searchString.toLowerCase())) {
          finalList.push(data[i]);
          break;
        }
      }
    }
    return finalList;
  };
  return DataHandler;
});