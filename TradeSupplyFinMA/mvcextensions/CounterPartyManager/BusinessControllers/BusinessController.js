define([], function () {

    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function CounterPartyBusinessManager() {
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(CounterPartyBusinessManager, kony.mvc.Business.Delegator);

    return CounterPartyBusinessManager;
});