define(function () {

  return {
    getState : function(prevState, action) {
      if(typeof prevState === "undefined") {
        return {
          "Cache" : {},
          "Collection" : {}
        };
      }
      var state = JSON.parse(JSON.stringify(prevState));
      switch(action.type){
        case "UPDATE_Cache" :
          state.Cache[action.key] = action.data
          return state;
        case "UPDATE_Collection" :
          state.Collection[action.key] = action.data
          return state;
        case "UPDATE_Collection_Cache" :
          state.Cache[action.key] = action.Cache;
          state.Collection[action.key] = action.Collection;
          return state;
        default : 
          return state
      }
    },
  };
});