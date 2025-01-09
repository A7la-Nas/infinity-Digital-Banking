/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Copyright © Temenos Headquarters SA 2021. All rights reserved.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
define(['redux','./DrawingsDetailsReducer'],function (redux, DrawingsDetailsReducer) {  
  return redux.createStore(DrawingsDetailsReducer.getState);
});