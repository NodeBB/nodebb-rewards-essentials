'use strict';

var conditions = {};

conditions.get = function (conditions, callback) {
	conditions = conditions.concat([
		{
			name: 'Reputation',
			condition: 'essentials/user.reputation',
		},
		{
			name: 'Post Count',
			condition: 'essentials/user.postcount',
		},
		{
			name: 'Last Logged in Time',
			condition: 'essentials/user.lastonline',
		},
	]);

	callback(false, conditions);
};

module.exports = conditions;
