'use strict';

var plugin = {};
var rewards = require.main.require('./src/rewards');
var user = require.main.require('./src/user');


plugin.conditions = require('./lib/conditions');
plugin.conditionals = require('./lib/conditionals');
plugin.rewards = require('./lib/rewards');

plugin.onUpvote = function (data) {
	var uid = data.owner;
	rewards.checkConditionAndRewardUser({
		uid: uid,
		condition: 'essentials/user.reputation',
		method: function (callback) {
			user.getUserField(uid, 'reputation', callback);
		},
	});
};

plugin.onOnline = function (data) {
	var uid = data.uid;
	var lastOnline = data.timestamp;

	rewards.checkConditionAndRewardUser({
		uid: uid,
		condition: 'essentials/user.lastonline',
		method: function (callback) {
			callback(null, lastOnline);
		},
	});
};

plugin.onPost = function (data) {
	var uid = data.post.uid;

	rewards.checkConditionAndRewardUser({
		uid: uid,
		condition: 'essentials/user.postcount',
		method: function (callback) {
			user.getUserField(uid, 'postcount', callback);
		},
	});
};

module.exports = plugin;
