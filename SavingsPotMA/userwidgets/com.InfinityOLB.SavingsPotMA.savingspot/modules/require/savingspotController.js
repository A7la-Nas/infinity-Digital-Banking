define(function() {

  return {
    //Data: 
    //     [{
    //      title:string,
    //      data:{chart, title, data, actions, alert}
    //  }]
    setData: function(data){
      var scope = this;
      this.view.flxMain.removeAll();
      this.view.flxMainMobile.removeAll();
      data.forEach(function(dat, i){
        var title = scope.view.lblComponentTitle.clone("compTitle"+i);
        title.text = dat.title;
        title.isVisible = true;
        var titleMobile = scope.view.lblComponentTitle.clone("compTitleMobile"+i);
        titleMobile.text = dat.title;
        titleMobile.isVisible = true;

        scope.view.flxMain.add(title);
        scope.view.flxMainMobile.add(titleMobile);
        var ind = i;
        dat.data.forEach(function(el,index) {
          var idCount = index+""+(ind+1);
          var row = scope.view.flxRow.clone("row" + idCount);
          row.top = "15dp";
          row.isVisible = true;

          var rowMobile = scope.view.flxRowMobile.clone("rowMobile" + idCount);
          rowMobile.top="15dp";
          rowMobile.isVisible = true;

          //Chart:
          if(el.chart.type==='full'){
            row.widgets()[2].add(scope.getChart("id"+idCount, el.chart.percentage));
            rowMobile.widgets()[2].add(scope.getChart("idMobile"+idCount, el.chart.percentage));
          }else{
            row.widgets()[2].add(scope.getHalfChart("id"+idCount, el.chart.percentage));
            rowMobile.widgets()[2].add(scope.getHalfChart("idMobile"+idCount, el.chart.percentage));
          }

          //Title:
          row.widgets()[1].text=el.title.title[0].toUpperCase() + el.title.title.substring(1);
          row.widgets()[3].widgets()[0].src=el.title.statusIcon;
          row.widgets()[3].widgets()[1].text=el.title.status;
          rowMobile.widgets()[1].text=el.title.title;
          rowMobile.widgets()[3].widgets()[0].text=el.title.status;
          rowMobile.widgets()[3].widgets()[1].src=el.title.statusIcon;


          //Text data:
          var textFields = [];
          var textFieldsMobile = [];

          var left = row.widgets()[4].widgets()[0].widgets();//left
          var leftMobile = rowMobile.widgets()[4].widgets()[0].widgets()[0].widgets();
          var right = row.widgets()[4].widgets()[1].widgets();//right
          var rightMobile = rowMobile.widgets()[4].widgets()[0].widgets()[1].widgets();
          var len = left.length+right.length;
          var l = 0,r=0;
          for(var i=0; i<len; i++){
            if(i%2==0){
              textFields.push(left[l]);
              textFieldsMobile.push(leftMobile[l]);
              l++;
            }else{
              textFields.push(right[r]);
              textFieldsMobile.push(rightMobile[r])
              r++;
            }
          }

          for(var i=0; i<el.data.keys.length; i++){
            textFields[i].widgets()[0].text = el.data.keys[i];
            textFields[i].widgets()[1].text = el.data.values[i];

            textFieldsMobile[i].widgets()[0].text = el.data.keys[i];
            textFieldsMobile[i].widgets()[1].text = el.data.values[i];
          }
          if(el.data.keys.length<5){
            row.widgets()[0].setVisibility(false);
            rowMobile.widgets()[0].setVisibility(false);
          }
          for(var i = el.data.keys.length; i<len; i++){
            textFields[i].widgets()[0].text = "";
            textFields[i].widgets()[1].text = "";
            textFieldsMobile[i].widgets()[0].text = "";
            textFieldsMobile[i].widgets()[1].text = "";
          }

          //Actions:
          var actionsIndex = 0;
          for(actionsIndex=0 ;actionsIndex<el.actions.length; actionsIndex++){
            var i = actionsIndex;
            row.widgets()[6].widgets()[0].widgets()[i].text = el.actions[i].text;
            row.widgets()[6].widgets()[0].widgets()[i].onClick = el.actions[i].onClick;
            
            rowMobile.widgets()[6].widgets()[i].text = el.actions[i].text;
            rowMobile.widgets()[6].widgets()[i].onClick = el.actions[i].onClick;

            if(el.actions[i].skin){
              row.widgets()[6].widgets()[0].widgets()[i].skin = el.actions[i].skin;
              rowMobile.widgets()[6].widgets()[i].skin = el.actions[i].skin;
            }
          }
          for(var i=actionsIndex; i<4; i++){
            row.widgets()[6].widgets()[0].widgets()[i].setVisibility(false);
            rowMobile.widgets()[6].widgets()[i].setVisibility(false);
          }

          if(el.actions.length===0 || el.actions==undefined){
            row.widgets()[5].setVisibility(false);
            row.widgets()[6].widgets()[0].setVisibility(false);
            rowMobile.widgets()[6].setVisibility(false);
          }

          //Alert:
          if(el.alert){
            row.widgets()[6].widgets()[1].widgets()[0].widgets()[0].src=el.alert.icon;
            row.widgets()[6].widgets()[1].widgets()[0].widgets()[1].text=el.alert.text;
            rowMobile.widgets()[7].widgets()[0].src=el.alert.icon;
            rowMobile.widgets()[7].widgets()[1].text=el.alert.text;
          }else{
            row.widgets()[6].widgets()[1].widgets()[0].widgets()[1].text="";
            rowMobile.widgets()[7].widgets()[1].text="";
          }

          row.widgets()[0].onClick = function(){scope.expandRow("row"+idCount+"flxRow")};
          rowMobile.widgets()[0].onClick = function(){scope.expandRow("rowMobile"+idCount+"flxRowMobile")};

          scope.view.flxMain.add(row)
          scope.view.flxMainMobile.add(rowMobile)
        })
      })

      this.view.flxMain.top="2dp";
      this.view.flxMainMobile.top="2dp";
      this.view.lblComponentTitle.setVisibility(false);
      this.view.flxRow.setVisibility(false);
      this.view.flxRowMobile.setVisibility(false);
      this.view.forceLayout();
    },

    getHalfChart: function(id, percentage){
      return new kony.ui.CustomWidget({"id": id, "isVisible": true, height:"100%", width:"100%",left:"0dp", top: "0dp"},{},{"widgetName": "cust3", "percentage": percentage})
    },

    getChart: function(id, percentage){
      return new kony.ui.CustomWidget({"id": id, "isVisible": true, height:"100%", width:"100%",left:"0dp", top: "0dp"},{},{"widgetName": "cust1", "percentage": percentage})
    },

    expandRow: function(widgetId){
      if(this.view.flxMainMobile.isVisible){
        var expandFlag = false;
        if(this.view[widgetId].widgets()[0].widgets()[0].text == "O"){
          expandFlag = true;
        }
        var flxMainWidgets = this.view.flxMainMobile.widgets();
        for(var i=0; i<flxMainWidgets.length; i++){
          //           if(flxMainWidgets[i].wType=="Label")continue;
          if (flxMainWidgets[i]._kwebfw_.name == "Label") continue;
          var left = flxMainWidgets[i].widgets()[4].widgets()[0].widgets()[0].widgets();
          var right = flxMainWidgets[i].widgets()[4].widgets()[0].widgets()[1].widgets();
          for(var j=2; j<left.length; j++){
            left[j].setVisibility(false);
            right[j].setVisibility(false);
          }
          flxMainWidgets[i].widgets()[7].setVisibility(false);
          flxMainWidgets[i].widgets()[0].widgets()[0].text="O";
          flxMainWidgets[i].height="355dp";
        }
        this.view[widgetId].widgets()[7].setVisibility(false);
        this.view[widgetId].widgets()[2].top = "64dp";
        this.view[widgetId].widgets()[4].top = "225dp";
        this.view[widgetId].widgets()[5].top = "215dp";
		
        if (expandFlag) {
          var height = 340;

          var textFields = [];
          var left = this.view[widgetId].widgets()[4].widgets()[0].widgets()[0].widgets();//left
          var right = this.view[widgetId].widgets()[4].widgets()[0].widgets()[1].widgets();//right
          var len = left.length+right.length;
          var l=0, r=0;
          for(var i=0; i<len; i++){
            if(i%2==0){
              textFields.push(left[l]);
              l++;
            }else{
              textFields.push(right[r]);
              r++;
            }
          }
          for(var i=4; i<textFields.length; i++){
            if(textFields[i].widgets()[0].text!==""){
              textFields[i].setVisibility(true);
              if(i%2==0)
                height+=63;
            }
          }
          height+=15;

          //for alert widget:
          if(this.view[widgetId].widgets()[7].widgets()[1].text!=="" && this.view[widgetId].widgets()[7].widgets()[1].text!=="undefined"){
            this.view[widgetId].widgets()[7].setVisibility(true);
            height+=50;
            this.view[widgetId].widgets()[2].top = "100dp";
            this.view[widgetId].widgets()[4].top = "260dp";
            this.view[widgetId].widgets()[5].top = "250dp";
          }else{
            this.view[widgetId].widgets()[7].setVisibility(false);
            this.view[widgetId].widgets()[2].top = "64dp";
            this.view[widgetId].widgets()[4].top = "225dp";
            this.view[widgetId].widgets()[5].top = "215dp";
          }

          this.view[widgetId].widgets()[0].widgets()[0].text="P";
          this.view[widgetId].height=height+"dp";
        }}

      if(this.view.flxMain.isVisible){
        var expandFlag = false;
        if(this.view[widgetId].widgets()[0].widgets()[0].text == "O"){
          expandFlag = true;
        }
        var flxMainWidgets = this.view.flxMain.widgets();
        for(var i=0; i<flxMainWidgets.length; i++){
          //           if(flxMainWidgets[i].wType=="Label")continue;
          if (flxMainWidgets[i]._kwebfw_.name == "Label") continue;
          var left = flxMainWidgets[i].widgets()[4].widgets()[0].widgets();
          var right = flxMainWidgets[i].widgets()[4].widgets()[1].widgets();
          for(var j=2; j<left.length; j++){
            left[j].setVisibility(false);
            right[j].setVisibility(false);
          }
          flxMainWidgets[i].widgets()[6].widgets()[1].setVisibility(false);
          flxMainWidgets[i].widgets()[0].widgets()[0].text="O";
          flxMainWidgets[i].height="214dp";
        }

        this.view[widgetId].widgets()[6].widgets()[1].setVisibility(false);
        if (expandFlag) {
          var height = 190;

          var textFields = [];
          var left = this.view[widgetId].widgets()[4].widgets()[0].widgets();//left
          var right = this.view[widgetId].widgets()[4].widgets()[1].widgets();//right
          var len = left.length+right.length;
          var l=0, r=0;
          for(var i=0; i<len; i++){
            if(i%2==0){
              textFields.push(left[l]);
              l++;
            }else{
              textFields.push(right[r]);
              r++;
            }
          }

          for(var i=4; i<textFields.length; i++){
            if(textFields[i].widgets()[0].text!==""){
              textFields[i].setVisibility(true);
              if(i%2==0)
                height+=64;
            }
          }
          height+=15;
          //For Alert Widget
          if(this.view[widgetId].widgets()[6].widgets()[1].widgets()[0].widgets()[1].text!=="" && this.view[widgetId].widgets()[6].widgets()[1].widgets()[0].widgets()[1].text!==undefined){
            this.view[widgetId].widgets()[6].widgets()[1].setVisibility(true);
            if(height<340)
              height+=20;
          }else{
            this.view[widgetId].widgets()[6].widgets()[1].setVisibility(false);
          }

          this.view[widgetId].widgets()[0].widgets()[0].text="P";
          this.view[widgetId].height=height+"dp";
        }
      }
      this.view.forceLayout();
    },

    onBreakpointChange: function(event, width){
      if(width==640){
        this.view.flxMain.setVisibility(false);
        this.view.flxMainMobile.setVisibility(true);
      }else{
        this.view.flxMain.setVisibility(true);
        this.view.flxMainMobile.setVisibility(false);
      }
    }

  };
});