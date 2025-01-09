/**
  *@module CacheUtils
  */
define([], function() {

  //on default load params to be passed for initial setting
  /*
  defaultParams - sortBy       - sortBy param
                  order        - order asc,desc
                  pageSize     - limit of the page
                  filterParam  - filterparam like transactionType,status
                  filterValue  - value of the filter
                  onUpdate     - callback that gets invoked after processing the result set with set of events
  */
  function CacheUtils(defaultParams)
  {
    this.sortBy = defaultParams.sortBy;
    this.pageSize = defaultParams.pageSize;
    this.onUpdate = defaultParams.onUpdate;
    this.filterParam = defaultParams.filterParam;
    this.filterValue = defaultParams.filterValue;
    this.sortOrder = defaultParams.order;
    this.defaultSortOrder = this.sortOrder;
    this.segregationTypes = defaultParams.segregationTypes;
    this.segregationField = defaultParams.segregationField;

    this.offset = 0;
    this.constants = {
      "SORTORDER_ASC":"asc",
      "SORTORDER_DESC":"desc"
    };
    this.transactionList = [];
    this.blockedFundsList = [];
    this.data = [];
    this._sortedData = [];
    this._searchedData = [];
    this._filteredData = [];
    this.searchField = "";
    this.searchText = "";
  }

  // helper method.
  CacheUtils.prototype._updateListData = function (state) {

    if (this.onUpdate && this.data) {
      var data = [];
      if(state === "search"){
        data = this._getSearchedData();
      }
      else if(state === "pagination"){
        data = this._getPaginatedData();
      }
      else if(state === "sort"){
        data = this._getSortedData();
      }
      else{
        data = this._getFilteredData();
      }
      var additional_params = {
        pagination: {
          pageStart: this.offset,
          pageSize: this.pageSize,
          totalSize: this._filteredData.length
        },
        sorting: {
          sortBy: this.sortBy,
          order: this.sortOrder
        },
        state: state
      };
      this.onUpdate(data,additional_params);
    }
  };

  // helper method.
  CacheUtils.prototype._getSearchedData = function(){
    var scope = this;
    var data = this.data.filter(scope.filterPredicate).filter(scope.searchPredicate);
    this._sortedData = [];
    this._searchedData = data;
    return data;
  };

  // helper method.
  CacheUtils.prototype._getPaginatedData = function(){
    var data = [];
    var scope = this;
    if(this._sortedData.length === 0)
    {
      data = this.data.filter(this.filterPredicate);
      data = this._getSegregatedData(data);
      data = data.slice(parseInt(scope.offset), parseInt(scope.offset)  + scope.pageSize).concat();
    }
   else
    {
      data = this._sortedData.filter(this.filterPredicate);
      data = this._getSegregatedData(data);
      data = data.slice(parseInt(scope.offset) , parseInt(scope.offset) + scope.pageSize).concat();
    }

    return data;
  };

  // helper method.
  CacheUtils.prototype._AscSort = function(data) {
    var scope = this;
    var i = 0, j; 
    while (i < data.length) { 
      j = i + 1; 
      while (j < data.length) { 
        if (data[j][scope.sortBy] && data[i][scope.sortBy] && data[j][scope.sortBy].toLowerCase() < data[i][scope.sortBy].toLowerCase()) { 
          var temp = data[i]; 
          data[i] = data[j]; 
          data[j] = temp; 
        } 
        j++; 
      } 
      i++; 
    } 
    return data;	
  };

  // helper method.
  CacheUtils.prototype._DescSort = function(data) { 
    var scope = this;
    var i = 0, j; 
    while (i < data.length) { 
      j = i + 1; 
      while (j < data.length) { 
        if (data[j][scope.sortBy] && data[i][scope.sortBy] && data[j][scope.sortBy].toLowerCase() > data[i][scope.sortBy].toLowerCase()) { 
          var temp = data[i]; 
          data[i] = data[j]; 
          data[j] = temp; 
        } 
        j++; 
      } 
      i++; 
    }
    return data;	
  };

  // helper method.
  CacheUtils.prototype._getSortedData = function(){
    var data = [];
    var scope = this;
    if(this._searchedData.length === 0){
      data = this.data.filter(this.filterPredicate).concat();
      data = this._sortWrapper(data);
      this._sortedData = data;
      data = this._getSegregatedData(data);
      data = data.slice(parseInt(scope.offset), parseInt(scope.offset) + scope.pageSize);
    }
    else{
      data = this._searchedData.filter(this.filterPredicate).concat();
      data = this._sortWrapper(data);
      this._sortedData = data; 
    }

    return data;
  };

  // helper method.
  CacheUtils.prototype._getFilteredData = function(){
    var scope = this;
    var data = this.data.filter(this.filterPredicate);
    data = this._getSegregatedData(data);
    this._filteredData = data;
    data = data.slice((parseInt(scope.offset)), parseInt(scope.offset)  + scope.pageSize).concat();
    data = this._sortWrapper(data);
    return data;
  };

  // helper method.
  CacheUtils.prototype._sortWrapper = function(data){
    var scope = this;
    if(data.length>0){
      if(isNaN(parseInt(data[0][scope.sortBy]))){
        if(scope.sortOrder === scope.constants["SORTORDER_ASC"]){
          data = this._AscSort(data);
        }
        else{
          data = this._DescSort(data);
        }
      }
     else if(Number.isInteger(Date.parse(data[0][scope.sortBy]))&&isNaN(data[0][scope.sortBy])){
          data = data.sort(function(obj1,obj2){
          if(scope.sortOrder === scope.constants["SORTORDER_ASC"]){
            return new Date(obj1[scope.sortBy]) - new Date(obj2[scope.sortBy]);
          }
          else{
            return new Date(obj2[scope.sortBy]) - new Date(obj1[scope.sortBy]);
          }
        });
     }
      else{
        data = data.sort(function(obj1,obj2){
          if(scope.sortOrder === scope.constants["SORTORDER_ASC"]){
            return obj1[scope.sortBy]-obj2[scope.sortBy];
          }
          else{
            return obj2[scope.sortBy]-obj1[scope.sortBy];
          }
        });
      }
    }
    return data;
  };
  
  //helper method
  CacheUtils.prototype._getSegregatedData = function(data){
    var scope = this;
    var segregatedData = [];
    for(var prop in this.segregationTypes)
    {
       scope.value = this.segregationTypes[prop].value;
       segregatedData = segregatedData.concat(data.filter(function (record){
          if(record[scope.segregationField]!== null && record[scope.segregationField]!== undefined)
          {
              return record[scope.segregationField].toUpperCase() === scope.value.toUpperCase();
          }
          else
          {
               return false;
          }
       }));          
    }
    if(segregatedData.length === 0)
    {
       return data;
    }
    return segregatedData;
  };

  CacheUtils.prototype.setFilterValue = function(filterValue){
    this.filterValue = filterValue;
  };

  CacheUtils.prototype.getFilterValue = function(){
    return this.filterValue;
  };

  CacheUtils.prototype.setTransactionListForSearch = function(data){
      if(data)
      this.transactionList = data;
  };

  CacheUtils.prototype.getTransactionList = function(){
    return this.transactionList;
  };

  CacheUtils.prototype.setBlockedFundsListForSearch = function(data){
      if(data)
      this.blockedFundsList = data;
  };

  CacheUtils.prototype.getBlockedFundsList = function(){
    return this.blockedFundsList;
  };

  //api to store data which has to be cached. Need to be invoked post service call response.
  /*
   data - Array of records
  */
  CacheUtils.prototype.setData = function (data) {
    var scope = this;
    this.data = this._getSegregatedData(data);
    this._sortedData = [];
    if(scope.filterValue === "All"){
      this.filterPredicate = function(){
        return true;
      };
    }
    else{
      this.filterPredicate = function(record){
        return record[scope.filterParam] === scope.filterValue;
      };
    }
    this._updateListData();
  };

  //api to be invoked on any of the pagination element selection  
  /*
   offset -  starting index of the page
   pageSize - size of the page
  */
  CacheUtils.prototype.applyPagination = function (offset, pageSize) {
    this.offset = parseInt(offset);
    this.pageSize = pageSize;
    this._updateListData("pagination");
  };

  //api to search for entered text
  /*
   searchFields -  Array of fileds in case of multiple search parameters
   searchText - String user entered searchtext
  */

  CacheUtils.prototype.applySearch = function (searchFields, searchText) {

    var scope = this;
    this.searchField = "";
    if(Array.isArray(searchFields)){
      this.searchText = searchText;
      this.searchPredicate = function(record){
        var result = false;
        searchFields.forEach(function(field){
          result = result || record[field] && record[field].indexOf(scope.searchText).toLowerCase() > -1;
        });
        return result;
      };
    }
    if(searchText === ""){
      this.offset = 0;
      this.sortOrder = this.defaultSortOrder;
      this._updateListData();
    }
    else{
      this._updateListData("search");  
    }

  };

  //api to change filter and get the resultant data. Resets the pagination value always. Also has to reset in pagination component
  /*
   filterParam -  String filterParam on which data has to be compared
   filterValue - String user selected filterValue
  */

  CacheUtils.prototype.applyFilter = function(filterParam, filterValue){
    this.filterParam = filterParam;
    this.filterValue = filterValue;
    this.offset = 0;
    this.sortOrder = this.defaultSortOrder;
    var scope = this;
    if(filterValue === "All"){
      this.filterPredicate = function(){
        return true;
      };
    }
    else{
      if(Array.isArray(scope.filterValue))   
      {
        this.filterPredicate = function(record){
          var result = false;

          scope.filterValue.forEach(function(data){
            result = result || (record[scope.filterParam] === data);
          });
          return result;
        };
      }
        else
        {
          this.filterPredicate = function(record){
            return record[scope.filterParam] === scope.filterValue;
          };
        }
      }
    this._updateListData();
  };

  //api to sort based on params. Resets the pagination value always. Also has to reset in pagination component
  /*
   sortParam -  String sortParam on which data has to be sorted
   order - String specifies the order of sorting.
  */
  CacheUtils.prototype.applySorting = function (sortParam, order) {
    this.offset = 0;
    this.sortOrder = order;
    this.sortBy = sortParam;
    this._updateListData("sort");
  };

  return CacheUtils;
});