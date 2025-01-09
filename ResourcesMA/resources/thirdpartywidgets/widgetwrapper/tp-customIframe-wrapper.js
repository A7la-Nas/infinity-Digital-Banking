var customIframe = {

    initializeWidget: function(parentNode, widgetModel, config) {
        parentNode.innerHTML = '<iframe id="embed_origination" src=" '+ widgetModel.webURL +'" height="100%" width="100%" title="Origination"></iframe>';

        
    },

    modelChange: function(widgetModel, propertyChanged, propertyValue) {
        //Handle widget property changes to update widget's view and
        //trigger custom events based on widget state.

    }
};