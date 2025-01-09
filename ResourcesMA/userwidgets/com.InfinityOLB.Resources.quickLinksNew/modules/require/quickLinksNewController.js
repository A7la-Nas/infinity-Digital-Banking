define(function() {

	return {
        accountType: "ALL",
        accountEntitlements: [],
        entitlementClosure: false, //false - to check if any one of the permission from the list is present, true- to check all the permissions
        defaultIconSkin: "sknLblFontIconffffff13px",
        defaultIconText: "",
        defaultIconSegmentSkin: "sknLblFontIconffffff16px",
        totalLinks: 6,
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
        setContext:function(context){
            this.context = context;
            this.accountEntitlements = context["entitlements"];
            this.parentScope = context["parentScope"];
            this.accountType = context["accountType"] ? context["accountType"] : this.accountType;
        },
        preShow: function(){
           this.setLinks();
        },
        setLinks: function(){
            this.resetUI();
            var quickLinksList = JSON.parse(JSON.stringify(this.context.links));
            var accountSpecificEntitledLinks = this.getFilteredLinks(quickLinksList);
            this.bindLinkDataToWidgets(accountSpecificEntitledLinks);
        },
        getFilteredLinks: function(quickLinkList){
            var entitledLinks = [];
            // this.checkEntitlement(this.context["entitlement"]);
            for(i=0;i<quickLinkList.length;i++){
                var tempLink =  {
                    "fontIconText" : quickLinkList[i].fontIconText ?  quickLinkList[i].fontIconText : this.defaultIconText,
                    "fontIconSkin" : !kony.sdk.isNullOrUndefined(quickLinkList[i].fontIconSkin) && quickLinkList[i].fontIconSkin != ""  ?  quickLinkList[i].fontIconSkin : this.defaultIconSkin,
                    "linkText" : quickLinkList[i].linkText ?  quickLinkList[i].linkText : "",
                    "linkAction" : quickLinkList[i].linkAction ?  quickLinkList[i].linkAction :  function(){},
                    "visible" : quickLinkList[i].visible ? quickLinkList[i].visible :  false
                }
                if(!kony.sdk.isNullOrUndefined(quickLinkList[i]["accountTypes"])){
                    if(quickLinkList[i]["accountTypes"].includes(this.accountType)){
                        if(this.checkEntitlement(quickLinkList[i]["entitlement"])  && quickLinkList[i].visible){
                            entitledLinks.push(tempLink);
                        }
                    }
                }                
            }
            return entitledLinks;
        },
        checkEntitlement: function(entitlement){
            var count = 0;
            if(!kony.sdk.isNullOrUndefined(entitlement)){
                if(entitlement.includes("default")){
                    return true;
                }
                if(this.entitlementClosure){
                    for(var i=0;i<entitlement.length;i++){
                        if(this.accountEntitlements.includes(entitlement[i])){
                            count++;
                        }
                    }
                    if(count!=0 && count == entitlement.length){
                        return true;
                    }
                }else{
                    for(var i=0;i<entitlement.length;i++){
                        if(this.accountEntitlements.includes(entitlement[i])){
                            return true;
                        }
                    }
                }
                return false;
            }
            return false;
        },
        bindLinkDataToWidgets: function(quickLinkList){
            if(quickLinkList.length ==0){
                this.showNoLinks();
            }
            else{           
                if(this.showMore){
                    var visibleLinks = this.numberOfLinks;
                    if(quickLinkList.length > this.numberOfLinks){
                        visibleLinks = this.numberOfLinks-1;
                    }else {
                        this.showMore = false;
                    }
                    for(var i =1;i<= visibleLinks && i<= quickLinkList.length;i++){
                        this.view["links"+i].setVisibility(true);
                        this.view["links"+i].onClick =  this.parentScope[quickLinkList[i-1].linkAction];
                        this.view["links"+i]["lblIcon"].skin = quickLinkList[i-1].fontIconSkin;
                        this.view["links"+i]["lblIcon"].text = quickLinkList[i-1].fontIconText;
                        this.view["links"+i]["lblLink"].text = quickLinkList[i-1].linkText;
                    }
                    if(this.showMore){
                        this.view["links"+i].setVisibility(true);
                        this.view["links"+i].onClick =  this.showMoreActions;
                        this.view["links"+i]["lblIcon"].skin = this.defaultIconSkin;
                        this.view["links"+i]["lblIcon"].text = "\ue94e";
                        this.view["links"+i]["lblLink"].text = kony.i18n.getLocalizedString("kony.mb.common.more");
                        this.setUpMoreLinksData(quickLinkList, i-1);
                    }
                }else{
                    for(var i =1;i<= this.numberOfLinks && i<= quickLinkList.length;i++){
                        this.view["links"+i].setVisibility(true);
                        this.view["links"+i].onClick =  this.parentScope[quickLinkList[i-1].linkAction];
                        this.view["links"+i]["lblIcon"].skin = quickLinkList[i-1].fontIconSkin;
                        this.view["links"+i]["lblIcon"].text = quickLinkList[i-1].fontIconText;
                        this.view["links"+i]["lblLink"].text = quickLinkList[i-1].linkText;
                    }
                }
            }
        },
        setUpMoreLinksData : function(list, offset){
            var scope = this;
            var widgetdatamap = {
                "flxLinksItem": "flxLinksItem",
                "lblItemIcon": "lblItemIcon",
                "lblItemLink": "lblItemLink"
            }
            var data = [];
            for(var i = offset;i<list.length;i++){
                var temp = {
                    "flxLinksItem" : {
                        "onClick" : scope.parentScope[list[i].linkAction]
                    },
                    "lblItemIcon" : {
                        "skin" : this.defaultIconSegmentSkin,
                        "text" : list[i].fontIconText
                    },
                    "lblItemLink" : {
                        "text" : list[i].linkText
                    }
                }
                data.push(temp);
            }
            this.view.segMoreLinks.widgetDataMap = widgetdatamap;
            this.view.segMoreLinks.setData(data);
        },
        resetUI:function(){
            this.view.flxSegContainer.setVisibility(false);
            for(var i =1;i<= this.totalLinks;i++){
                this.view["links"+i].setVisibility(false);
            }
        },
        showMoreActions: function(){
            if(this.numberOfLinks === 6){
                this.view.flxSegContainer.top = "240dp"
            }else{
                this.view.flxSegContainer.top = "115dp"
            }
            if(this.view.flxSegContainer.isVisible){
                this.view.flxSegContainer.setVisibility(false);
            }else{
                this.view.flxSegContainer.setVisibility(true);
            }
        },
        showNoLinks:function(){
            if(this.parentScope.hideQuickLniks){
                this.parentScope.hideQuickLniks();
            }
        }
	};
});