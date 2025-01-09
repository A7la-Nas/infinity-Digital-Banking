define(function () {

  return {
    getState : function(prevState, action) {
      if(typeof prevState === "undefined") {
        return {
          "CNTX" : {}
        };
      }
      var state = JSON.parse(JSON.stringify(prevState));
      if(action.type==="UPDATE_CNTX"){
        state.CNTX = action.data;
        return state;
      }else{
        return state;
      }
    },
  };
});