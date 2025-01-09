define(function () {

  return {
    getState: function(prevState, action) {
      if(typeof prevState === "undefined") {
        return {
         "Collection" : {}
        };
      }
      var state = JSON.parse(JSON.stringify(prevState));
      switch(action.type) {
        case "UPDATE_COLLECTION":
           state.Collection = action.data;
        return state;
          default: 
          return state;
      }
    },
  };
});