
define([], function () {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function ServiceRequests_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(ServiceRequests_PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  ServiceRequests_PresentationController.prototype.initializePresentationController = function() {};
   
  ServiceRequests_PresentationController.prototype.initServiceRequests = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    navManager.updateForm({
      isLoading: true
    });
   
    new kony.mvc.Navigation({"appName" : "ArrangementsMA", "friendlyName" : "ServiceRequestsUIModule/frmServiceRequests"}).navigate();

  };
  
  ServiceRequests_PresentationController.prototype.downloadDocument = function (documentId) {
    applicationManager.getAccountServicesModule().fetchDocumentDownload(documentId, this.downloadDocumentSC.bind(this), this.downloadDocumentEC.bind(this));
  };

  ServiceRequests_PresentationController.prototype.downloadDocumentSC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var getUrl = {
      documentDownloadFile: applicationManager.getAccountServicesModule().getDownloadDocumentURL(response)
    };
    navManager.updateForm(getUrl);
    //applicationManager.getAccountServicesModule().autoDownload(response.fileId,this.autoDownloadSC.bind(this),this.autoDownloadEC.bind(this));
  };

  ServiceRequests_PresentationController.prototype.downloadDocumentEC = function (response) {
    var navManager = applicationManager.getNavigationManager();
    var data = {
      showOnServerError: response
    };
    navManager.updateForm(data);
  };
  
  return ServiceRequests_PresentationController;
});