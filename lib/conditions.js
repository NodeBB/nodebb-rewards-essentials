"use strict";

var conditions = {};

conditions.get = function(conditions, callback) {
	conditions = conditions.concat([
		{
			"name": "Reputation",
			"condition": "core:user.reputation"
		},
		{
			"name": "Post Count",
			"condition": "core:user.postcount"
		},
		{
			"name": "Last Logged in Time",
			"condition": "core:user.lastonline"
		}
	]);

	callback(false, conditions);
};

module.exports = conditions;