define(function() {

  return {
    _constants : {"headerImgUp" : "arrowupblue.png", "headerImgDown" : "arrowdownblue.png"},
    frmControllerSelf:{},
    /*
    *constructor is to initialize only once when the form loads this component
   *
    */
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._segWidget = this.view.segList;
      this.originalSegData = [];
      this.clonedSegData = [];
      this.bindEvents();
      this.resetState();

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    /*
    *bindEvents is to bind the action events of the widgets
   *
    */
    bindEvents : function(){
      try{
        this.searchSelecetedArray=[];
        kony.print("Entered bindEvents of expand collapse");

        this.view.segList.onRowClick = this.segOnRowClick;


      }catch(e){
        kony.print("Exception in bindEvents expandCollapse"+e);}
    },

    /*
    *resetState is to reset the state of the widgets to normal
   *
    */
    resetState : function(){
      try{
        kony.print("Entered resetState in expandCollapse");

        this.view.flxListBar1.isVisible = true;

      }catch(e){
        kony.print("Exception in expandCollapse"+e);}
    },

    btnContinueOnclickEnable: function(self){
      try{     
        var frmController = self;
        this.frmControllerSelf =self;
        var data=this.view.segList.data;
        var btnContiueEnable = false;
        for(var i=0;i<data.length;i++)
        {          
          for(var j=0;j<data[i][1].length;j++)
          {     
            if(data[i][1][j].imgSelectAccounts.src==="activebox.png"){
              btnContiueEnable =true;
            }
          }
        }
        if(frmController.view.tbxSearch.text.length>0){
          frmController.view.btnContinue.enable = false;
          frmController.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        }else{
          if(btnContiueEnable===true){
            frmController.view.btnContinue.enable = true;
            frmController.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
          }else{
            frmController.view.btnContinue.enable = false;
            frmController.view.btnContinue.skin = "sknBtnOnBoardingInactive";
          }
        }

      }catch(e){
        kony.print("Exception in btnContinueOnclickEnable"+e);}
    },

    /*
    *setDataInList - Setting the data in seg, send the number of expand header we want to have 
   *
    */
    setDataInList : function (widgetDataMapObj, segData){
      try{
        kony.print("Entered setDataInList");

        if(Array.isArray(segData)){
          this._segWidget.widgetDataMap = widgetDataMapObj;
          this._segWidget.setData(segData);
          this.originalSegData = segData;
        }

      }catch(e){
        kony.print("Exception in setDataInList expandCollapse"+e);}
    },

    /*
    *headerSelectionDetected - Header is clicked and called from template controller 
   *
    */
    headerSelectionDetected : function (data){
      try{
        var sectionIndex = data.section;
        var segData = this._segWidget.data;

        for(var i=0;i<segData[sectionIndex][1].length;i++)
        {

          if(segData[sectionIndex][1][i].flxMain.isVisible===false)
          {
            segData[sectionIndex][1][i].flxMain.isVisible=true;
          }
          else
          {
            segData[sectionIndex][1][i].flxMain.isVisible=false;            
          }
        }

        if(segData[sectionIndex][0].imgUpArrow.src==="arrowup.png")
        {
          segData[sectionIndex][0].imgUpArrow.src="arrowdown.png";
        }
        else
        {
          segData[sectionIndex][0].imgUpArrow.src="arrowup.png";
        }
        this.view.segList.setSectionAt(segData[sectionIndex],sectionIndex);

      }catch(e){
       kony.print("Exceptionheaderrr in headerSelectionDetected expandCollapse"+e);}
    },


    /*
    *onclickSelectedAllDetected - Header is clicked and called from template controller 
   *
    */
    onclickSelectedAllDetected : function (data){
      try{       
        var segdata=this.view.segList.data;
        if(segdata[data.section][0].imgSelectall.src!=="activebox.png")
        {
          for(var i=0;i<segdata[data.section][1].length;i++)
          {
            segdata[data.section][1][i].imgSelectAccounts.src="activebox.png";  
            this.searchSelecetedArray.push(segdata[data.section][1][i]);//used in search
          }       
          segdata[data.section][0].lblSelectall.skin="sknlbl949494px26mb";
          segdata[data.section][0].imgSelectall.src="activebox.png";
          this.view.segList.setSectionAt(segdata[data.section],data.section);
          this.btnContinueOnclickEnable(this.frmControllerSelf);
        }else{
          for(var j=0;j<segdata[data.section][1].length;j++)
          {
            segdata[data.section][1][j].imgSelectAccounts.src="inactivebox.png";  
            ///**this loop is used to searchfunctinality**///
            for(var k=0;k<this.searchSelecetedArray.length;k++)
            {
              if(this.searchSelecetedArray[k].accountID=== segdata[data.section][1][j].accountID)
              {
                this.searchSelecetedArray.splice(k,1);
                k--;
              }
            }
            ///***end the loop*////

          }       
          segdata[data.section][0].lblSelectall.skin="sknLbl4176A4SSPReg26px";
          segdata[data.section][0].imgSelectall.src="inactivebox.png";
          this.view.segList.setSectionAt(segdata[data.section],data.section);
          this.btnContinueOnclickEnable(this.frmControllerSelf);
        }
      }catch(e){
         kony.print("Exception in headerSelectionDetected expandCollapse"+e);}
    },
    searchSelecetedArray:[],
    segOnRowClick : function (widgetInfo){
      try{

        var sectionindex=this.view.segList.selectedIndex[0];
        var rowindex=this.view.segList.selectedIndex[1];
        var segdata=this.view.segList.data;
        if(segdata[sectionindex][1][rowindex].imgSelectAccounts.src==="activebox.png"){
          /*** loop is used to search*////
          for(var i=0;i<this.searchSelecetedArray.length;i++)
          {
            if(this.searchSelecetedArray[i].accountID===segdata[sectionindex][1][rowindex].accountID)
            {
              this.searchSelecetedArray.splice(i,1);
              i--;
            }
          }//**end the loop***//
          segdata[sectionindex][1][rowindex].imgSelectAccounts.src="inactivebox.png"; 
        }else{
          segdata[sectionindex][1][rowindex].imgSelectAccounts.src="activebox.png"; 
          this.searchSelecetedArray.push(segdata[sectionindex][1][rowindex]);//used in search
        }
        ///***this loop is used for header select checkbox***////
        var isallselected=true;
        for(var i=0;i<segdata[sectionindex][1].length;i++){
          if(segdata[sectionindex][1][i].imgSelectAccounts.src==="inactivebox.png")
          {
            isallselected=false;               
          }      
        }
        if(isallselected===false)
        {
          segdata[sectionindex][0].imgSelectall.src="inactivebox.png";

        }else{
          segdata[sectionindex][0].imgSelectall.src="activebox.png";       
        }  
        ///***end the loop***///
        this.view.segList.setSectionAt(segdata[sectionindex],sectionindex);  
        this.btnContinueOnclickEnable(this.frmControllerSelf);
      }catch(e){
        kony.print("Exception segOnRowClicke"+e);}
    },

    invokeToSercheddata:function()
    {      
      return this.searchSelecetedArray;
    }

  };
});