define(function() {

  return {
    _constants : {"headerImgUp" : "arrowupblue.png", "headerImgDown" : "arrowdownblue.png"},
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
    headerSelectionDetected : function (widgetInfo,data){
      try{
        kony.print("Entered headerSelectionDetected" +data);
        var sectionIndex = data.section;
        var segData = this._segWidget.data;
        var isExpand = segData[sectionIndex][1].length > 0 ? true : false;

        if(isExpand) {  // Make it collapse
          kony.print("collapseing");
          var sectionParams = {
            "template" : "flxApprovalReqExpColHeader",
            "lblHeader": {"text": segData[sectionIndex][0].lblHeader.text},
            "imgUpArrow" : {"src" : this._constants.headerImgDown},
          };
          this.collapseSection(sectionIndex,sectionParams);
        }else{
          kony.print("Expanding");
          var sectionParams = {
            "template" : "flxApprovalReqExpColHeader",
            "lblHeader": {"text": segData[sectionIndex][0].lblHeader.text},
            "imgUpArrow" : {"src" : this._constants.headerImgUp},
          };
          this.expandSection(sectionIndex,sectionParams);
        }

      }catch(e){
        kony.print("Exception in headerSelectionDetected expandCollapse"+e);}
    },

    /*
    *collapseSection - is for collapsing the segment rows and changes made in header section 
   *
    */
    collapseSection : function(sectionIndex,sectionParams){
      try{
        kony.print("Enterted collapseSection");
        var segData = this._segWidget.data;
        for(var param in sectionParams){
          segData[sectionIndex][0][param] = sectionParams[param];
        }
        segData[sectionIndex].pop();
        segData[sectionIndex].push([]);
        this._segWidget.setData(segData);
      }catch(e){
        kony.print("Exception in collapseSection expandCollapse"+e);}
    },

    /*
    *expandSection - is for expanding the segment rows and changes made in header section 
   *
    */
    expandSection : function(sectionIndex,sectionParams){
      try{
        kony.print("Entered expandSection");

        var segData = this._segWidget.data;
        for(var param in sectionParams){
          segData[sectionIndex][0][param] = sectionParams[param];
        }

        segData[sectionIndex].pop();
        segData[sectionIndex].push(this.originalSegData[sectionIndex][1]);  //Pusing the original rows

        this._segWidget.setData(segData);
      }catch(e){
        kony.print("Exception in collapseSection expandCollapse"+e);}
    },

    withdrawBtnOnClick : function(widgetInfo){
      try {
        kony.print("Entered  view controller withdrawBtnOnClick"+ widgetInfo);

      } catch (error) {
        kony.print("Exception in  withdrawBtnOnClick-->" + error);
      }
    },

    /*
     *rejectBtnOnClick - This function is called when user swipe and clics on reject button
     *
     */
    rejectBtnOnClick: function(widgetInfo) {
      try {
        kony.print("Entered rejectBtnOnClick"+JSON.stringify(widgetInfo));

        this.view.flxRejectMenu.isVisible = true;
      } catch (error) {
        kony.print("Exception in  rejectBtnOnClick-->" + error);
      }
    },


  };
});