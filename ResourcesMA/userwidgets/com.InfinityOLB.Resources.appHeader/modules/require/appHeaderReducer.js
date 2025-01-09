define(function () {
	return {
		getState: function (prevState, action) {
			if (typeof prevState === "undefined") {
				return {
					Cache: {},
					Collection: {},
				};
			}
			var state = JSON.parse(JSON.stringify(prevState));
			switch (action.type) {
				case "UPDATE_CACHE":
					state.Cache[action.key] = action.data;
					return state;
				case "UPDATE_COLLECTION":
					state.Collection[action.key] = action.data;
					return state;
				case "UPDATE_COLLECTION_CACHE":
					state.Cache[action.key] = action.cache;
					state.Collection[action.key] = action.collection;
					return state;
				default:
					return state;
			}
		},
	};
});
