define(['./ViewController'], function(ViewController) {
    var constantMap = {
        "201": "Approve Card Action",
        "202": "Approve Payment",
        "203": "Approve Device Action",
        "204": "Approve Profile Update",
        "205": "Approve Cheque Book Action",
        "206": "Approve SignIn",
        "207": "Approve Reset Password",
        "208": "Skip/Cancel Transaction"
    };
    var ControllerImplementation = function(componentInstance) {
        this.componentInstance = componentInstance;
        this.componentName = 'uniken/sdk';
        this.viewController = new ViewController(componentInstance, this);
        
    };
    /**
     * @api : doDeviceProvisioning
     * @description : API to create a service/container.
     * @param : activationObj - The activation object is required.It should contain following keys- pushId,userId,serverURL, inviteCode.
     * @return : true/false - Returns true in case of successful service creation,otherwise false
     */
   
        
    return ControllerImplementation;
});