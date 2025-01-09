define({ 

 //Type your controller code here 
    
  preShow: function(){
    const navManager = applicationManager.getNavigationManager();
    const userListObj = navManager.getCustomInfo("frmSelectUserIdUniken");
    this.populateUserIdData(userListObj.usersList);
    this.setFlowActions();
  },
  
  populateUserIdData: function(users){
    const navManager = applicationManager.getNavigationManager();
    const userListObj = navManager.getCustomInfo("frmSelectUserIdUniken");
    let selectedUser = null;
    if(userListObj && userListObj.selectedUser){
      selectedUser = userListObj.selectedUser;
    }
    let mappedUsersData = users.map((userDetails, index) => {
      return this.mappingUserIdData(userDetails, index, selectedUser);
    });
    this.view.segUserIds.widgetDataMap = this.getUserIdDataMap();
    this.view.segUserIds.setData(mappedUsersData);    
  },
  
  mappingUserIdData: function(userDetails, index, selectedUser){    
    const parsedData = JSON.parse(userDetails);
    const { userId, id, name, creationDate, expiryDate, renewalDate } = parsedData;
    let selectedIcon = null;
    let isUserSelected = null;
    if (selectedUser) {
      selectedIcon =
        selectedUser === userId ? "radiobtn.png" : "radiobuttoninactive.png";
      isUserSelected = selectedUser === userId ? true : false;
    } else {
      selectedIcon = index === 0 ? "radiobtn.png" : "radiobuttoninactive.png";
      isUserSelected = index === 0 ? true : false;
    }
    
    return {
      flxSelectUserIdUniken: "flxSelectUserIdUniken",
      lblUserId: {
        text: userId,
      },
      imgIsUserSelected: {
        src: selectedIcon,
      },
      isUserSelected: isUserSelected,
      userId: userId,
      id: id,
      name: name,
      creationDate: creationDate,
      expiryDate: expiryDate,
      renewalDate: renewalDate,
    };
  },
  
  getUserIdDataMap: function() {
    return {
      flxSelectUserIdUniken: "flxSelectUserIdUniken",
      lblUserId: "lblUserId",
      imgIsUserSelected: "imgIsUserSelected"
    };
  },
  
  setFlowActions: function() {
    const scopeObj = this;
    this.view.segUserIds.onRowClick = function(seguiWidget, sectionNumber, rowNumber, selectedState){
      const segUsersData = scopeObj.view.segUserIds.data;
      const updatedSegData = segUsersData.map((user, index)=>{
        if(rowNumber===index){
          user.isUserSelected = true;
          user.imgIsUserSelected.src = "radiobtn.png";
        } else {
          user.isUserSelected = false;
          user.imgIsUserSelected.src = "radiobuttoninactive.png";
        }
        return {...user};
      });
      scopeObj.view.segUserIds.setData(updatedSegData);
    };
    this.view.btnDone.onClick = function(){
      const segUsersData = scopeObj.view.segUserIds.data;
      const selectedUser = segUsersData.filter(user=>user.isUserSelected===true)[0].userId;
      const navManager = applicationManager.getNavigationManager();
      const userListObj = navManager.getCustomInfo("frmSelectUserIdUniken");
      navManager.setCustomInfo("frmSelectUserIdUniken", {...userListObj, selectedUser:selectedUser});
      navManager.navigateTo("frmLoginUniken");
    };
    this.view.flxBack.onTouchEnd = this.navigateToPreviousForm;
  },
  
  navigateToPreviousForm: function() {
    const naviagteObj = new kony.mvc.Navigation(
      kony.application.getPreviousForm().id
    );
    naviagteObj.navigate();
  },

 });