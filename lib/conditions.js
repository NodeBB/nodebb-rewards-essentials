'use strict';

const conditions = module.exports;

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
		{
			name: 'Join Date',
			condition: 'essentials/user.joindate',
		},
		{
			name: 'Days Registered',
			condition: 'essentials/user.daysregistered',
		},
	]);

	callback(null, conditions);
};
