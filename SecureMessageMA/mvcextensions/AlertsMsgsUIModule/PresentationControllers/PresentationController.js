/**
 * Messages and Notifications Presenation to handle all auth related functionalities like communicate between bussiness layer and view layer
 * @module AlertsMsgsPresentationController
 */
define([], function() {
    /**
     * Messages and Notifications Presenation to handle all auth related functionalities. intialize members.
     * @class
     * @alias module:AlertsMsgsPresentationController
     */
    this.messageId = "";
    this.requestId = "";
    this.mediaIdArray = [];

    function AlertsMsgsPresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.initializePresentationController();
    }
    inheritsFrom(AlertsMsgsPresentationController, kony.mvc.Presentation.BasePresenter);
    /**
     * Method to intialize Alert and Messages presentation scope data.
     */
    AlertsMsgsPresentationController.prototype.initializePresentationController = function() {
        this.frmNotificationsAndMessages = "frmNotificationsAndMessages";
        this.navManager = applicationManager.getNavigationManager();
        this.alertsManager = applicationManager.getAlertsManager();
        this.clearMessageAndRequestId();
    };

    AlertsMsgsPresentationController.prototype.clearMessageAndRequestId = function() {
        this.messageId = "";
        this.requestId = "";
        this.mediaIdArray = [];
    };
    /**
     * Entry method which is used to show the Alerts Page depending on the data context - show create message view, show Messages view etc.
     * @param {object} sender - //TODO: Need to remove sender as it's not required but not removed due to dependency.
     * @param {object} context - data context which is used to show Alerts Page in different views
     */
    AlertsMsgsPresentationController.prototype.showAlertsPage = function(sender, context) {
        this.navManager.navigateTo({"appName": "SecureMessageMA","friendlyName": "frmNotificationsAndMessages"});
        this.messagesManager = applicationManager.getMessagesManager();
        if (context) {
            if (context.show === "CreateNewMessage") {
                this.showRequests({
                    createNewMessage: true,
                    cancelCallback: context.cancelCallback,
                    data : context
                });
            } else if (context.show === "ShowSelectedMessage") {
                this.showRequests({
                    selectedRequestId: context.selectedRequestId
                }); //select the request and get the messages related to that request.
            } else if (context.show === "Messages") {
                this.showRequests();
            }
        } else {
            this.showAlerts();
        }
    };
    /**
     * This is the function which is used update the Notifications And Messages Page with given data
     * @param {object} data - data object to update view
     */
    AlertsMsgsPresentationController.prototype.presentAlerts = function(data) {
        this.navManager.updateForm(data, this.frmNotificationsAndMessages);
    };
    /**
     * Method to show progress bar
     */
    AlertsMsgsPresentationController.prototype.showProgressBar = function() {
        this.presentAlerts({
            "showProgressBar": true
        });
    };
    /**
     * Method to hide progress bar
     */
    AlertsMsgsPresentationController.prototype.hideProgressBar = function() {
        this.presentAlerts({
            "hideProgressBar": true
        });
    };
    /**
     * This is the function which is used to show all the requests of a logged in user based on context.
     * Ex:  show requests with selected request or show requests with new message view.
     * @param {object} context - view context object for show requests
     * @param {string} [context.selectedRequestId] - selced request id if it's coming from other pages.
     * @param {boolean} [context.createNewMessage] - whether to show requests with create new message view.
     */
    AlertsMsgsPresentationController.prototype.showRequests = function(context) {
        var scopeObj = this;
        var asyncManager = applicationManager.getAsyncManager();
        scopeObj.showProgressBar();
        if (context && context.createNewMessage) {
            scopeObj.showNewRequestOrMessagesView(context);
        } else {
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(scopeObj.messagesManager, 'fetchAllRequestsForInbox'),
                    asyncManager.asyncItem(scopeObj.messagesManager, 'fetchNumberOfUnreadMessages'),
                    asyncManager.asyncItem(scopeObj.alertsManager, 'getUnreadNotificationCount')
                ],
                scopeObj.onFetchAllRequestAndUnreadMessagesCountComplete.bind(scopeObj, context)
            );
        }
    };
    /**
     * Method to handle fetch requests and unread messages service responses in show Request.
     * @param {object} context - view context object for show requests
     * @param {string} [context.selectedRequestId] - selced request id if it's coming from other pages.
     * @param {boolean} [context.createNewMessage] - whether to show requests with create new message view.
     * @param {object} syncResponseObject - responses object.
     */
    AlertsMsgsPresentationController.prototype.onFetchAllRequestAndUnreadMessagesCountComplete = function(context, syncResponseObject) {
        var scopeObj = this;
        var dataMapObj = {
            data: [],
            unReadMessagesCount: 0
        };
        if (syncResponseObject.isAllSuccess() && syncResponseObject.responses[0].data && syncResponseObject.responses[0].data.customerrequests_view && syncResponseObject.responses[1] && syncResponseObject.responses[1].data) { //Checking response data bcz even Kony Fabric service is success,  admin console service may failed
            dataMapObj = {
                requests: syncResponseObject.responses[0].data.customerrequests_view,
                unReadMessagesCount: syncResponseObject.responses[1].data.unreadMessageCount
            };
            if (context && context.selectedRequestId) {
                dataMapObj.selectedRequestId = context.selectedRequestId;
            }
            if (context && context.createNewMessage) {
                dataMapObj.createNewMessage = "createNewMessage";
            }
        } else {
            dataMapObj.errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.fetchMessagesErrorMsg");
        }
        scopeObj.presentAlerts({
            "showRequestsView": dataMapObj
        });
        scopeObj.presentAlerts({
            "unreadNotificationCountViewModel": {
                count: syncResponseObject.responses[2].data[0].unreadNotificationCount
            }
        });
    };
    /**
     *  This is the function used to show new request or message UI after fetching the list of different categories for creating a new message
     */
    AlertsMsgsPresentationController.prototype.showNewRequestOrMessagesView = function(context) {
        var scopeObj = this;
        var asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(scopeObj.messagesManager, 'fetchAllRequestsForInbox'),
                asyncManager.asyncItem(scopeObj.messagesManager, 'fetchNumberOfUnreadMessages'),
                asyncManager.asyncItem(scopeObj.alertsManager, 'getUnreadNotificationCount'),
                asyncManager.asyncItem(scopeObj.messagesManager, 'fetchCategoriesForMessages')
            ],
            scopeObj.showNewRequestOrMessagesViewSuccessComplete.bind(scopeObj, context)
        );
        //this.messagesManager.fetchCategoriesForMessages(this.onMessageCategoriesSuccess.bind(this), this.onMessageCategoriesFail.bind(this));
    };
    /**
     * Method to handle fetch requests and unread messages service responses in show Request.
     * @param {string} [context.selectedRequestId] - selced request id if it's coming from other pages.
     * @param {boolean} [context.createNewMessage] - whether to show requests with create new message view.
     * @param {object} syncResponseObject - responses object.
     */
    AlertsMsgsPresentationController.prototype.showNewRequestOrMessagesViewSuccessComplete = function(context, syncResponseObject) {
        var scopeObj = this;
        var dataMapObj = {
            data: [],
            unReadMessagesCount: 0
        };
        if (syncResponseObject.isAllSuccess() && syncResponseObject.responses[0].data && syncResponseObject.responses[0].data.customerrequests_view && syncResponseObject.responses[1] && syncResponseObject.responses[1].data) { //Checking response data bcz even Kony Fabric service is success,  admin console service may failed
        } else {
            dataMapObj.errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.fetchMessagesErrorMsg");
        }
        scopeObj.presentAlerts({
            "createNewRequestOrMessagesView": {
                data: syncResponseObject.responses[3].data.requestcategory,
                requests: syncResponseObject.responses[0].data.customerrequests_view,
                cancelCallback: context ? context.cancelCallback : false
            }
        });
        scopeObj.presentAlerts({
            unreadMessagesCountView: {
                unReadMessagesCount: syncResponseObject.responses[1].data.unreadMessageCount
            },
            unreadNotificationCountViewModel: {
                count: syncResponseObject.responses[2].data[0].unreadNotificationCount
            }
        });
        if(context.data && context.data.record && context.data.record.tradeModule){
            scopeObj.presentAlerts({
                    "tradeView" : context.data.record,
            })
        };
        scopeObj.hideProgressBar();
    };
    /**
     *  Method handle fetch Categories For Messages success reponse
     * @param {object[]} response - list of message categories
     */
    AlertsMsgsPresentationController.prototype.onMessageCategoriesSuccess = function(response) {
        this.presentAlerts({
            "createNewRequestOrMessagesView": {
                data: response.requestcategory
            }
        });
    };
    /**
     * Method to handle fetch Categories For Messages failure reponse
     * @param {object} responseError - failure response object
     */
    AlertsMsgsPresentationController.prototype.onMessageCategoriesFail = function(responseError) {
        //TODO :: Not handled server Error here?
        this.presentAlerts({
            "createNewRequestOrMessagesView": {
                data: [],
                serverError: responseError
            }
        });
    };
    /**
     * This function is to get all the details like subject,Description,unreadMsgs count etc of a particular request
     * @param {string}  requestId - request id which is generated when the new request is created
     * @param {boolean}  isDeleted - is deleted request or not
     * @returns {object} - JSON of all the details of the request
     */
    AlertsMsgsPresentationController.prototype.getRequestsDetails = function(requestId, isDeleted) {
        var requestsData;
        if (isDeleted) {
            requestsData = this.messagesManager.getDeletedRequests();
        } else {
            requestsData = this.messagesManager.getRequests();
        }
        for (var key in requestsData) {
            if (requestsData.hasOwnProperty(key)) {
                var val = requestsData[key];
                if (val.id === requestId) {
                    return val;
                }
            }
        }
        return null;
    };
    /**
     * This is the function which is used to show all the messages for a particular request
     * @param {string} requestId which is the unique id generated when the request is created
     */
    AlertsMsgsPresentationController.prototype.showMessages = function(requestId) {
        var scopeObj = this;
        if (requestId !== undefined & requestId !== null) {
            var record = {
                "request_id": requestId
            };
            scopeObj.clearMessageAndRequestId();
            scopeObj.showProgressBar();
            scopeObj.messagesManager.fetchMessagesForARequest(record,
                scopeObj.onMessagesForARequestSuccess.bind(scopeObj),
                scopeObj.onMessagesForARequestFails.bind(scopeObj)
            );
        } else {
            applicationManager.getLoggerManager().log(" showMessages : invalid request id - " + requestId);
        }
    };
    /**
     * Method to handle success response of fetch Messages of a request
     * @param {object} response - success response object of fetch Messages of a request.
     */
    AlertsMsgsPresentationController.prototype.onMessagesForARequestSuccess = function(response) {
        this.hideProgressBar();
        if (response !== undefined && response.messages !== undefined) {
            this.presentAlerts({
                "showMessagesView": {
                    messages: response.messages
                }
            });
        } else {
            this.onMessagesForARequestFails("Server Error");
        }
    };
    /**
     * Method to handle failure response of fetch Messages of a request
     * @param {object} responseError - failure response object
     */
    AlertsMsgsPresentationController.prototype.onMessagesForARequestFails = function(responseError) {
        //TODO :: Not handled server Error here?
        this.hideProgressBar();
        this.presentAlerts({
            "showMessagesView": {
                messages: [],
                ServerError: responseError
            }
        });
    };
    /**
     * The function is used to softdelete the request and the request is moved to DeletedMessages Tab
     * @param {string}  requestId - the unqiue of the request which is generated when the new request is created
     */
    AlertsMsgsPresentationController.prototype.softDeleteRequest = function(requestId) {
        var scopeObj = this;
        if (requestId !== undefined & requestId !== null) {
            var record = {
                "requestid": requestId
            };
            scopeObj.showProgressBar();
            scopeObj.messagesManager.softDeleteAllMessagesOfARequest(record,
                scopeObj.onSoftDeleteRequestSuccess.bind(scopeObj),
                scopeObj.onSoftDeleteRequestFails.bind(scopeObj)
            );
        } else {
            applicationManager.getLoggerManager().log(" softDeleteRequest : invalid request id - " + requestId);
        }
    };
    /**
     * Method to handle success response of soft delete request
     * @param {object} response - success response object of soft delete request
     */
    AlertsMsgsPresentationController.prototype.onSoftDeleteRequestSuccess = function(response) {
        this.showRequests();
    };
    /**
     * Method to handle failure response of soft delete request
     * @param {object} responseError - failure response object soft delete request
     */
    AlertsMsgsPresentationController.prototype.onSoftDeleteRequestFails = function(responseError) {
        //TODO :: Not handled server Error here?
        this.hideProgressBar();
    };
    /**
     * This function is to hardDeleteRequest the request and the request deleted permanently from the DeletedMessages tab
     * @param {string}  requestId the unqiue of the request which is generated when the new request is created
     */
    AlertsMsgsPresentationController.prototype.hardDeleteRequest = function(requestId) {
        var scopeObj = this;
        if (requestId !== undefined & requestId !== null) {
            var record = {
                "requestid": requestId
            };
            scopeObj.showProgressBar();
            scopeObj.messagesManager.hardDeleteAllMessagesOfARequest(
                record,
                scopeObj.onHardDeleteRequestSuccess.bind(scopeObj),
                scopeObj.onHardDeleteRequestFails.bind(scopeObj)
            );
        } else {
            applicationManager.getLoggerManager().log(" hardDeleteRequest : invalid request id - " + requestId);
        }
    };
    /**
     * Method to handle success response of hard delete request
     * @param {object} response - success response object of soft delete request
     */
    AlertsMsgsPresentationController.prototype.onHardDeleteRequestSuccess = function(response) {
        this.showDeletedRequests();
    };
    /**
     * Method to handle failure response of hard delete request
     * @param {object} responseError - failure response object soft delete request
     */
    AlertsMsgsPresentationController.prototype.onHardDeleteRequestFails = function(responseError) {
        //TODO :: Not handled server Error here?
        this.hideProgressBar();
    };
    /**
     * This function is to restore the request after it is deleted
     * @param {string}  requestId the unqiue of the request which is generated when the new request is created
     */
    AlertsMsgsPresentationController.prototype.restoreRequest = function(requestId) {
        var scopeObj = this;
        if (requestId !== undefined & requestId !== null) {
            var record = {
                "requestid": requestId
            };
            scopeObj.showProgressBar();
            scopeObj.messagesManager.restoreDeletedMessagesOfARequest(
                record,
                scopeObj.onRestoreRequestSuccess.bind(scopeObj),
                scopeObj.onRestoreRequestFails.bind(scopeObj)
            );
        } else {
            applicationManager.getLoggerManager().log(" restoreRequest : invalid request id - " + requestId);
        }
    };
    /**
     * Method to handle success response of restore request
     * @param {object} response - success response object of restore request
     */
    AlertsMsgsPresentationController.prototype.onRestoreRequestSuccess = function(response) {
        this.showUnreadMessagesCount();
        this.showDeletedRequests();
    };
    /**
     * Method to handle failure response of restore request
     * @param {object} responseError - failure response object restore request
     */
    AlertsMsgsPresentationController.prototype.onRestoreRequestFails = function(responseError) {
        //TODO :: Not handled server Error here?
        this.hideProgressBar();
    };
    /**
     * This is the function which is used to show the messages which are deleted
     */
    AlertsMsgsPresentationController.prototype.showDeletedRequests = function() {
        var scopeObj = this;
        scopeObj.showProgressBar();
        scopeObj.messagesManager.fetchAllRequestsForDeleted(
            scopeObj.onFetchAllDeletedRequestsSuccess.bind(scopeObj),
            scopeObj.onFetchAllDeletedRequestsFails.bind(scopeObj)
        );
    };
    /**
     * Method to handle success response of fetch deleted requests
     * @param {object} response - success response object of fetch deleted requests
     */
    AlertsMsgsPresentationController.prototype.onFetchAllDeletedRequestsSuccess = function(response) {
        var scopeObj = this;
        if (response !== undefined && response.customerrequests_view !== undefined) {
            scopeObj.presentAlerts({
                "showDeletedRequestsView": {
                    deletedRequests: response.customerrequests_view
                }
            });
        } else {
            scopeObj.onFetchAllDeletedRequestsFails("Server Error");
        }
    };
    /**
     * Method to handle failure response of fetch deleted requests
     * @param {object} responseError - failure response object of fetch deleted requests
     */
    AlertsMsgsPresentationController.prototype.onFetchAllDeletedRequestsFails = function(responseError) {
        
        this.hideProgressBar();
        this.presentAlerts({
            "showDeletedRequestsView": {
                deletedRequests: [],
                errorMsg: kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.fetchDeletedMessagesErrorMsg")
            }
        });
    };
    /**
     * This function is to update all the messages in the particular request as read
     * @param {string} requestId - the unqiue of the request which is generated when the new request is created
     */
    AlertsMsgsPresentationController.prototype.updateMessageAsRead = function(requestId) {
        var scopeObj = this;
        if (requestId !== undefined & requestId !== null) {
            var record = {
                "requestid": requestId
            };
            scopeObj.showProgressBar();
            scopeObj.messagesManager.updateRequestAsRead(
                record,
                scopeObj.onUpdateRequestAsReadSuccess.bind(scopeObj, requestId),
                scopeObj.onUpdateRequestAsReadFails.bind(scopeObj)
            );
        } else {
            applicationManager.getLoggerManager().log(" updateMessageAsRead : invalid request id - " + requestId);
        }
    };
    /**
     * Method to handle success response of fetch deleted requests
     * @param {string} requestId - the unqiue of the request which is generated when the new request is created
     * @param {object} response - success response object of fetch deleted requests
     */
    AlertsMsgsPresentationController.prototype.onUpdateRequestAsReadSuccess = function(requestId, response) {
        var scopeObj = this;
        var selectedRequest = scopeObj.messagesManager.getRequests().filter(function(data) {
            if (data.id === requestId) {
                return true;
            }
            return false;
        })[0];
        scopeObj.presentAlerts({
            "updateMessageAsReadSuccessView": {
                "readCount": selectedRequest.unreadmsgs
            }
        });
        selectedRequest.unreadmsgs = 0;
    };
    /**
     * Method to handle failure response of fetch deleted requests
     * @param {object} responseError - failure response object of fetch deleted requests
     */
    AlertsMsgsPresentationController.prototype.onUpdateRequestAsReadFails = function(responseError) {
        //TODO :: Not handled server Error here?
        this.hideProgressBar();
    };
    /**
     * This is the function which is used to show the unread messages count which is used to update it in the tab
     */
    AlertsMsgsPresentationController.prototype.showUnreadMessagesCount = function() {
        var scopeObj = this;
        scopeObj.messagesManager.fetchNumberOfUnreadMessages(
            scopeObj.onUnReadMessagesCountSucces.bind(scopeObj),
            scopeObj.onUnReadMessagesCountFails.bind(scopeObj)
        );
    };
    /**
     * Method to handle success response of fetch Number Of Un read Messages
     * @param {object} response - success response object of fetch Number Of Un read Messages
     */
    AlertsMsgsPresentationController.prototype.onUnReadMessagesCountSucces = function(response) {
        var scopeObj = this;
        if (response && response.data && response.data.unreadMessageCount !== undefined) {
            scopeObj.presentAlerts({
                "unreadMessagesCountView": response.data.unreadMessageCount
            });
        } else {
            scopeObj.onUnReadMessagesCountFails("Server Error");
        }
    };
    /**
     * Method to handle failure response of fetch Number Of Un read Messages
     * @param {object} responseError - failure response object of fetch Number Of Un read Messages
     */
    AlertsMsgsPresentationController.prototype.onUnReadMessagesCountFails = function(responseError) {
        //TODO :: Not handled server Error here?
        
        this.hideProgressBar();
        this.presentAlerts({
            "unreadMessagesCountView": 0,
            "ServerError": responseError
        });
    };
    /**
     * Downloading the attachment of the message
     * @param {string} mediaId media id of the attachment
     * @param {string} fileName fileName of the attachment
     */
    AlertsMsgsPresentationController.prototype.downloadAttachment = function(mediaId, fileName) {
        var scopeObj = this;
        var params = {
            mediaId: mediaId,
            fileName: fileName
        };
        scopeObj.messagesManager.downloadMessageAttachement(params);
    };
    /**
     * This is the function which is used to create a new request or message with Attachments
     * @param {object} requestParams - which consists of requred parameter for the service.
     * @param {string} requestParams.requestid - json consisting of following data of the request to be created
     * @param {string} requestParams.subject - subject of the request
     * @param {string} requestParams.description - actual message to be added to the request
     * @param {string} requestParams.categoryid - category of the request
     * @param {object[]} requestParams.files - array of attachements.
     */
    AlertsMsgsPresentationController.prototype.createNewRequestOrMessage = function(requestParams) {
        var scopeObj = this;
        var requestId;
        if (requestParams.requestid != null && requestParams.requestid != undefined) {
            requestId = requestParams.requestid;
        } else {
            requestId = this.requestId;
        }
        var requestMessageInputs = {
            "requestid": requestId,
            "requestsubject": requestParams.subject,
            "messagedescription": requestParams.description,
            "requestcategory_id": requestParams.categoryid,
            "requeststatus": "SID_OPEN",
            "messageid": scopeObj.messageId,
            "messagestatus": "",
			"isTradeModule": requestParams.isTradeModule
        }

        requestMessageInputs["mediaIds"] = scopeObj.mediaIdArray;
        scopeObj.messagesManager.createNewRequestWithAttachments(
            requestMessageInputs,
            scopeObj.onNewRequestWithAttachmentsSuccess.bind(scopeObj, requestParams),
            scopeObj.onNewRequestWithAttachmentsFails.bind(scopeObj, requestParams)
        );
    };
    /*
    Upload Media and save media Ids 
    */

    AlertsMsgsPresentationController.prototype.uploadMedia = function(files, requestId, callback) {
        var scopeObj = this;
        var fileObject = {};
        fileObject.file = files;
        var status = "SID_DRAFT";
        var subject = "Draft Subject"
        if (requestId != null && requestId != undefined) {
            status = "SID_OPEN";
            subject = "";
        }

        function individualCallback(response) {
            if (scopeObj.mediaIdArray == null || scopeObj.mediaIdArray == undefined) {
                scopeObj.mediaIdArray = [];
            }
            scopeObj.mediaIdArray.push(response.data.id);
            callback(response.data.id);
        };
        this.convertToBase64(fileObject.file.file, function(base64String) {
            fileObject["base64"] = base64String;
        });
        var requestMessageInputs = {
            "requestid": requestId,
            "requestsubject": subject,
            "messagedescription": "Draft Description",
            "requestcategory_id": "RCID_CREDITCARD",
            "requeststatus": status,
            "messagestatus": "DRAFT"
        }

        function onCreateNewRequestSuccess(fileObject, response) {
            var userName = applicationManager.getUserPreferencesManager().getUserObj().userName;
            var maskedUserName = userName ? (userName.substr(0,2)+"****" + userName.substr(userName.length -2, userName.length)): "";
            if (response.hasOwnProperty("rawResponse")) {
                var obj = JSON.parse(response.rawResponse);
                var messageId = maskedUserName ? obj[maskedUserName].requestMessage.messageId : "";
                var requestId = maskedUserName ? obj[maskedUserName].customerRequest.requestId : "";
            } else {
                var messageId = maskedUserName ? response[maskedUserName].requestMessage.messageId : "";
                var requestId = maskedUserName ? response[maskedUserName].customerRequest.requestId : "";
            }
            scopeObj.messageId = messageId;
            scopeObj.requestId = requestId;
            scopeObj.messagesManager.createMedia(fileObject, scopeObj.messageId, individualCallback.bind(this), this.onNewRequestWithAttachmentsFails.bind(this));
        }

        function onCreateNewRequestFailure(response) {
            kony.print("Error while creating Drafted message");
        }
        if (scopeObj.messageId != null && scopeObj.messageId != undefined && scopeObj.messageId.trim() != "") {
            this.messagesManager.createMedia(fileObject, scopeObj.messageId, individualCallback.bind(this), this.onNewRequestWithAttachmentsFails.bind(this));
        } else {
            scopeObj.messagesManager.createNewRequestWithAttachments(requestMessageInputs, onCreateNewRequestSuccess.bind(scopeObj, fileObject), onCreateNewRequestFailure.bind(scopeObj));
        }
    };

    /**
     * Method to handle success response of create New Request Or Message
     * @param {object} requestParams - which consists of requred parameter for the service.
     * @param {string} requestParams.requestid - json consisting of following data of the request to be created
     * @param {string} requestParams.subject - subject of the request
     * @param {string} requestParams.description - actual message to be added to the request
     * @param {string} requestParams.categoryid - category of the request
     * @param {object[]} requestParams.files - array of attachements.
     * @param {object} response - success response object of create New Request Or Message response
     */
    AlertsMsgsPresentationController.prototype.onNewRequestWithAttachmentsSuccess = function(requestParams, response) {
        var scopeObj = this;
        if (requestParams.requestid) {
            scopeObj.showRequests(requestParams.requestid);
        } else {
            scopeObj.showRequests();
        }
        this.messageId = "";
        this.requestId = "";
        this.mediaIdArray = [];
    };



    /**
     * Method to handle failure response of create New Request Or Message
     * @param {object} responseError - failure response object of create New Request Or Message response
     */
    AlertsMsgsPresentationController.prototype.onNewRequestWithAttachmentsFails = function(requestParams, responseError) {
        var scopeObj = this;
        var viewModel = {};
        if (requestParams.requestid) {
            viewModel = {
                "createNewMessageError": responseError.errorMessage
            };
        } else {
            viewModel = {
                "createNewRequestError": responseError.errorMessage
            };
        }
        scopeObj.presentAlerts(viewModel);
        scopeObj.hideProgressBar();
    };
    /**
     * Search the requests in Messages Tab in client side
     * @param {string} searchString -  String to be searched in the data
     */
    AlertsMsgsPresentationController.prototype.searchRequest = function(searchString) {
        var scopeObj = this;
        var searchData = [];
        var requestsData = scopeObj.messagesManager.getRequests();
        if (requestsData) {
            for (var i = 0; i < requestsData.length; i++) {
                if (requestsData[i].requestsubject.toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
                    searchData.push(requestsData[i]);
                }
            }
        }
        var unreadSearchMessagesCount = scopeObj.countUnreadMessages(searchData);
        scopeObj.presentAlerts({
            "searchRequestsView": {
                "requests": searchData,
                "unreadSearchMessagesCount": unreadSearchMessagesCount
            }
        });
    };
    /**
     * Search the requests in Deleted Messages Tab in client side
     * @param {String} searchString -  String to be searched in the data
     */
    AlertsMsgsPresentationController.prototype.searchDeletedRequests = function(searchString) {
        var scopeObj = this;
        var searchData = [];
        var deletedRequests = scopeObj.messagesManager.getDeletedRequests();
        if (deletedRequests) {
            for (var i = 0; i < deletedRequests.length; i++) {
                if (deletedRequests[i].requestsubject.toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
                    searchData.push(deletedRequests[i]);
                }
            }
        }
        var unreadSearchMessagesCount = scopeObj.countUnreadMessages(searchData);
        scopeObj.presentAlerts({
            "showSearchDeletedRequests": {
                "deletedRequests": searchData,
                "unreadSearchMessagesCount": unreadSearchMessagesCount
            }
        });
    };
    /**
     * This is the function which is count all the unread messages of given data
     * @returns {number} count  is the number of unread messages
     */
    AlertsMsgsPresentationController.prototype.countUnreadMessages = function() {
        var self = this;
        return self.messagesManager.getUnreadMessagesCount();
    };

    AlertsMsgsPresentationController.prototype.discardMessageAttachment = function(mediaId, enableSendButton) {
        var requestParams = {};
        var scopeObj = this;
        requestParams.mediaId = mediaId;
        scopeObj.messagesManager.discardMessageAttachment(
            requestParams,
            scopeObj.discardSuccessCallback.bind(scopeObj, mediaId, enableSendButton),
            scopeObj.discardErrorCallback.bind(scopeObj)
        );
    };

    AlertsMsgsPresentationController.prototype.discardSuccessCallback = function(mediaId, enableSendButton) {
        var index = this.mediaIdArray.indexOf(mediaId);
        if (index > -1) {
            this.mediaIdArray.splice(index, 1);
        }
        enableSendButton();
        kony.print("Sucessfully deleted attachment")
    };

    AlertsMsgsPresentationController.prototype.discardErrorCallback = function() {
        kony.print("Error deleting attachment")
    };

    /*********** *************/
    /**
     * showAlerts :This is the function which is used to display the Alerts of the user
     */
    AlertsMsgsPresentationController.prototype.showAlerts = function() {
        var scopeObj = this;
        var asyncManager = applicationManager.getAsyncManager();
        scopeObj.showProgressBar();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(scopeObj.alertsManager, 'getUserNotifications'),
                asyncManager.asyncItem(scopeObj.alertsManager, 'getUnreadNotificationCount'),
                asyncManager.asyncItem(scopeObj.messagesManager, 'fetchNumberOfUnreadMessages')
            ],
            scopeObj.onFetchAllNotificationsAndUnreadNotificationCountComplete.bind(scopeObj)
        );
    };
    /**
     * Method to handle fetch requests and unread messages service responses in show Request.
     * @param {object} syncResponseObject - responses object.
     */
    AlertsMsgsPresentationController.prototype.onFetchAllNotificationsAndUnreadNotificationCountComplete = function(syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.isAllSuccess()) {
            scopeObj.getUserNotificationsSuccess(syncResponseObject.responses[0].data);
            scopeObj.getUnreadNotificationCountSuccess(syncResponseObject.responses[1].data[0]);
            scopeObj.presentAlerts({
                "unreadMessagesCountView": {
                    unReadMessagesCount: syncResponseObject.responses[2].data.unreadMessageCount
                }
            });
        } else {
            scopeObj.getUserNotificationsFailure();
            scopeObj.getUnreadNotificationCountFails();
            scopeObj.presentAlerts({
                "unreadMessagesCountView": {
                    unReadMessagesCount: 0
                }
            });
        }
        scopeObj.hideProgressBar();
    };
    /**
     * handels the alerts success schenario
     * @param {object} response response
     */
    AlertsMsgsPresentationController.prototype.getUserNotificationsSuccess = function(response) {
        var self = this;
        var Model = {};
        Model.data = response;
        self.presentAlerts({
            "showAlertsViewModel": Model
        });
    };
    /**
     * handels the alerts success schenario
     * @param {object} response response
     */
    AlertsMsgsPresentationController.prototype.getUserNotificationsFailure = function(response) {
        var self = this;
        var Model = {};
        Model.data = [];
        Model.errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.fetchAlertsErrorMsg");
        self.presentAlerts({
            "showAlertsViewModel": Model
        });
    };
    /**
     * showUnreadNotificationCount :This is the function which is used to show the unread notification count in the tab
     */
    AlertsMsgsPresentationController.prototype.showUnreadNotificationCount = function() {
        var self = this;
        self.getUnreadNotificationCount();
    };
    /**
     * getAlertsDetails :This is the function which is used all the details for the particular notification
     * @param {String} userNotificationId -- The unique notification Id for the notification
     * @returns {JSON} the details of the notification like subject,Description ,Date etc.
     */
    AlertsMsgsPresentationController.prototype.getAlertsDetails = function(userNotificationId) {
        var alertsData = this.alertsManager.getAlerts();
        for (var key in alertsData) {
            if (alertsData.hasOwnProperty(key)) {
                var val = alertsData[key];
                if (val.userNotificationId == userNotificationId) {
                    return val;
                }
            }
        }
        return null;
    };
    /**
     * updateNotificationAsRead :This is the function which is used update the notification As read
     * @param {String} notificationId -- The unique notification Id for the notification
     */
    AlertsMsgsPresentationController.prototype.updateNotificationAsRead = function(notificationId) {
        var self = this;
        var param = {
            "userNotificationId": notificationId
        };
        self.alertsManager.updateNotificationAsRead(param, self.updateNotificationAsReadSuccess.bind(self, notificationId), self.updateNotificationAsReadFailure.bind(self));
    };
    /**
     * handels the updateNotificationAsRead success schenario
     * @param {string} notificationId notification id
     * @param {object} repsonse response
     */
    AlertsMsgsPresentationController.prototype.updateNotificationAsReadSuccess = function(notificationId, repsonse) {
        var self = this;
        var alertsData = self.alertsManager.getAlerts();
        var model = {};
        var val = alertsData.filter(function(data) {
            if (data.userNotificationId == notificationId) {
                return data;
            }
        })[0];
        val.isRead = 1;
        model.status = "success";
        self.presentAlerts({
            "updateNotificationAsReadViewModel": model
        });
    };
    /**
     * handels the updateNotificationAsRead Failure schenario
     * @param {object} repsonse response
     */
    AlertsMsgsPresentationController.prototype.updateNotificationAsReadFailure = function(repsonse) {
        var self = this;
        var model = {};
        model.status = "failure";
        model.errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.updateNotificationErrorMsg");
        self.presentAlerts({
            "updateNotificationAsReadViewModel": model
        });
    };
    /**
     * dismissNotification :This is the function which is used to dismiss the Alert
     * @param {String} selectedUserNotificationId -- The notification Id which is to be deleted
     */
    AlertsMsgsPresentationController.prototype.dismissNotification = function(selectedUserNotificationId) {
        var self = this;
        var params = {
            "notificationId": selectedUserNotificationId
        };
        self.alertsManager.deleteNotification(params, self.deleteNotificationSuccess.bind(self, selectedUserNotificationId), self.deleteNotificationFailure.bind(self));
    };
    /**
     * handels the deleteNotification success schenario
     * @param {string} notificationId notification id
     * @param {object} repsonse response
     */
    AlertsMsgsPresentationController.prototype.deleteNotificationSuccess = function(notificationId, repsonse) {
        var self = this;
        var model = {};
        model.status = "success";
        self.presentAlerts({
            "dismissAlertsViewModel": model
        });
    };

    AlertsMsgsPresentationController.prototype.onNewRequestWithAttachmentsSuccessforRequestId = function(requestParams, requestMessageInputs, response) {
        var userName = applicationManager.getUserPreferencesManager().getUserObj().userName;
        requestMessageInputs.messageid = response[userName].requestMessage.messageId;
        requestMessageInputs.requestid = response[userName].customerRequest.requestId;
        requestMessageInputs.files = requestParams.files;
        requestMessageInputs.requeststatus = "SID_OPEN";
        var scopeObj = this;
        var mediaID = [];
        if (requestParams.files && requestParams.files.length) {
            this.convertAlltoBase64(requestParams.files, function(base64Array) {
                base64Array.forEach(function(base64String, i) {
                    requestMessageInputs["files"][i]["base64"] = base64String;
                });
                this.getAllMediaID(requestMessageInputs.files, requestMessageInputs.messageid, function(mediaIDArray) {
                    mediaIDArray.forEach(function(mediaIdString, i) {
                        mediaID[i] = mediaIdString;
                    });
                    requestMessageInputs["mediaIds"] = mediaID;
                    scopeObj.messagesManager.createNewRequestWithAttachments(
                        requestMessageInputs,
                        scopeObj.onNewRequestWithAttachmentsSuccess.bind(scopeObj, requestParams),
                        scopeObj.onNewRequestWithAttachmentsFails.bind(scopeObj, requestParams)
                    );
                }.bind(this));
            }.bind(this));
        } else {
            scopeObj.messagesManager.createNewRequestWithAttachments(
                requestMessageInputs,
                scopeObj.onNewRequestWithAttachmentsSuccess.bind(scopeObj, requestParams),
                scopeObj.onNewRequestWithAttachmentsFails.bind(scopeObj, requestParams)
            );
        }
    };

    AlertsMsgsPresentationController.prototype.onNewRequestWithAttachmentsFailsforRequestId = function(requestParams, response) {
        kony.print("Error while First create message");
    };
    /**
     * handels the updateNotificationAsRead Failure schenario
     * @param {object} repsonse response
     */
    AlertsMsgsPresentationController.prototype.deleteNotificationFailure = function(repsonse) {
        var self = this;
        var model = {};
        model.status = "error";
        model.errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.dismissNotificationErrorMsg");
        self.presentAlerts({
            "dismissAlertsViewModel": model
        });
    };
    /**
     * searchAlerts :This is the function which is used to search for the alert based on the search String entered
     * @param {String} searchString  the string to be searched across all the alerts
     */
    AlertsMsgsPresentationController.prototype.searchAlerts = function(searchString) {
        var self = this;
        var criteria = kony.mvc.Expression.eq("searchString", searchString);
        self.alertsManager.getNotificationsBySearch(criteria, self.searchAlertsSuccess.bind(self), self.searchAlertsFailure.bind(self));
    };
    /**
     * handels the deleteNotification success schenario
     * @param {object} response response
     */
    AlertsMsgsPresentationController.prototype.searchAlertsSuccess = function(response) {
        var self = this;
        var model = {};
        model.data = response;
        self.presentAlerts({
            "searchAlertsViewModel": model
        });
    };
    /**
     * handels the updateNotificationAsRead Failure schenario
     * @param {object} response response
     */
    AlertsMsgsPresentationController.prototype.searchAlertsFailure = function(response) {
        var self = this;
        var model = {};
        model.data = [];
        model.errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.searchAlertsErrorMsg");
        self.presentAlerts({
            "searchAlertsViewModel": model
        });
    };
    /**
     * getUnreadMessagesOrNotificationsCount :This is the function which is used to get unread notifications count and unread messages count to show the red dot on the Alerts ICON
     * @param {function}  unreadMsgsOrNotificationsCountCompletionCallback method executed once the count of the notifications and the count of the messages is received
     * return {}
     */
    AlertsMsgsPresentationController.prototype.getUnreadMessagesOrNotificationsCount = function(unreadMsgsOrNotificationsCountCompletionCallback) {
        var scopeObj = this;
        var asyncManager = applicationManager.getAsyncManager();
        scopeObj.showProgressBar();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(scopeObj.messagesManager, 'fetchNumberOfUnreadMessages'),
                asyncManager.asyncItem(scopeObj.alertsManager, 'getUnreadNotificationCount')
            ],
            scopeObj.onTotalUnreadCountComplete.bind(scopeObj, unreadMsgsOrNotificationsCountCompletionCallback)
        );
    };
    /**
     * total count success schenario
     */
    AlertsMsgsPresentationController.prototype.onTotalUnreadCountComplete = function(unreadMsgsOrNotificationsCountCompletionCallback, syncResponseObject) {
        var totalUnreadCount = 0;
        var priorityMessageCount=0;
        if (syncResponseObject.isAllSuccess()) {
            var unreadMessageCount = syncResponseObject.responses[0].data.unreadMessageCount;
          	 priorityMessageCount = syncResponseObject.responses[0].data.priorityMessageCount
            var unreadNotificationsCount = syncResponseObject.responses[1].data[0].unreadNotificationCount;
            totalUnreadCount = Number(unreadMessageCount) + Number(unreadNotificationsCount);
        }
        var viewModel = {
            "totalUnreadCount": totalUnreadCount,
          	"priorityMessageCount":priorityMessageCount
        };
        unreadMsgsOrNotificationsCountCompletionCallback(viewModel);
    };
    /**
     * getUnreadNotificationCount :This is the function which is used to get unread notifications count
     */
    AlertsMsgsPresentationController.prototype.getUnreadNotificationCount = function() {
        var scopeObj = this;
        scopeObj.alertsManager.getUnreadNotificationCount(
            scopeObj.getUnreadNotificationCountSuccess.bind(scopeObj),
            scopeObj.getUnreadNotificationCountFails.bind(scopeObj)
        );
    };
    /**
     * used to handels the getUnreadNotificationCount success schenario
     * @param {object} response response
     */
    AlertsMsgsPresentationController.prototype.getUnreadNotificationCountSuccess = function(response) {
        var self = this;
        var countModel = {};
        countModel.count = response.unreadNotificationCount;
        self.presentAlerts({
            "unreadNotificationCountViewModel": countModel
        });
    }
    /**
     * used to handels the getUnreadNotificationCount error schenario
     * @param {object} response response
     */
    AlertsMsgsPresentationController.prototype.getUnreadNotificationCountFails = function(response) {
        var self = this;
        var countModel = {};
        countModel.count = 0;
        self.presentAlerts({
            "unreadNotificationCountViewModel": countModel
        });
    }
    /**
     * used to navigate the billPay screen
     */
    AlertsMsgsPresentationController.prototype.navigateToBillPay = function() {
        var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
        billPayModule.presentationController.showBillPayData();
    }
    /**
     * used to navigate the send Money screen
     */
    AlertsMsgsPresentationController.prototype.navigateToSendMoney = function() {
        var p2pModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
        p2pModule.presentationController.loadPayAPersonflx();
    }
    /**
     * used to navigate the view my account screen
     */
    AlertsMsgsPresentationController.prototype.navigateToViewMyAccount = function() {
        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
        accountsModule.presentationController.showAccountsDashboard();
    }
    /**
     * used to navigate the transfer page
     */
    AlertsMsgsPresentationController.prototype.navigateToTransferPage = function() {
        applicationManager.getModulesPresentationController("TransferModule").showTransferScreen();
    }
    /**
     * used to get the userName
     * @returns {string} userName
     */
    AlertsMsgsPresentationController.prototype.getCurrentUserName = function() {
        return applicationManager.getUserPreferencesManager().getCurrentUserName();
    };
    /**
     * Method to convert all attached files to Base64 String
     * @param {Object} fileArray contains array of all attached file objects
     * @param {function} callback to send base64 string of attached files to backend
     */
    AlertsMsgsPresentationController.prototype.convertAlltoBase64 = function(fileArray, callback) {
        var count = 0;
        var base64Array = [];

        function individualCallback(index, base64string) {
            count++;
            base64Array.splice(index, 0, base64string);
            if (count === fileArray.length) {
                callback(base64Array);
            }
        }
        fileArray.forEach(function(fileObject, index) {
            this.convertToBase64(fileObject.file, individualCallback.bind(null, index));
        }.bind(this));
    };
    /**
     * Method to convert a file to Base64 String
     * @param {Object} file contains an attached file object
     * @param {function} callback to send base64 string to backend
     */
    AlertsMsgsPresentationController.prototype.convertToBase64 = function(file, callback) {
        // var reader = new FileReader();
        // reader.onloadend = function () {
        //   var content = reader.result.substring(reader.result.indexOf(",") + 1);
        //   content = btoa(content);
        //   callback(content);
        // };
        // reader.readAsDataURL(file);
        var content;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            content = reader.result;
            content = content.split(",")[1];
            callback(content);
        }
    };
    /**
     * Method to get media ID of all attached files
     * @param {Object} fileArray contains array of all attached file objects
     * @param {function} callback to get media ID & send to backend to complete request
     */
    AlertsMsgsPresentationController.prototype.getAllMediaID = function(fileArray, messageId, callback) {
        var count = 0;
        var mediaIDArray = [];

        function individualCallback(index, response) {
            var mediaIDString = response.data.id;
            count++;
            mediaIDArray.splice(index, 0, mediaIDString);
            if (count === fileArray.length) {
                callback(mediaIDArray);
            }
        }
        fileArray.forEach(function(fileObject, index) {
            this.messagesManager.createMedia(fileObject, messageId, individualCallback.bind(null, index), this.onNewRequestWithAttachmentsFails.bind(this));
        }.bind(this));
    };
    return AlertsMsgsPresentationController;
});