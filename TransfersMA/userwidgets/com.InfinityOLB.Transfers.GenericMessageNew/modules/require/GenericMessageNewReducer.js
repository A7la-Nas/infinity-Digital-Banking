define(function () {

  return {
    getState: function(prevState, action) {
      if(typeof prevState === "undefined") {
        return {
          "Master" : {},
          "Slave" : {}
        };
      }
      var state = JSON.parse(JSON.stringify(prevState));
      switch(action.type){
        case "UPDATE_MASTER":
          state.Master[action.key] = action.data;
          return state;
        case "UPDATE_SLAVE":
          state.Slave[action.key] = action.data;
          return state;
        case "UPDATE_MASTER_SLAVE":
          state.Master[action.key] = action.masterData;
          state.Slave[action.key] = action.slaveData;
          return state;
        default: 
          return state;
      }
    },
  };
});