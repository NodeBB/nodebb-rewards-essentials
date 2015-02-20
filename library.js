"use strict";

var plugin = {},
	rewards = module.parent.require('./rewards'),
	user = module.parent.require('./user');


plugin.conditions = require('./lib/conditions');
plugin.conditionals = require('./lib/conditionals');
plugin.rewards = require('./lib/rewards');




plugin.onUpvote = function(data) {
	var uid = data.owner;

	rewards.checkConditionAndRewardUser(uid, 'essentials/user.reputation', function(callback) {
		user.getUserField(uid, 'reputation', callback);
	});
};

plugin.onOnline = function(data) {
	var uid = data.uid,
		lastOnline = data.timestamp;

	rewards.checkConditionAndRewardUser(uid, 'essentials/user.lastonline', function(callback) {
		callback(false, lastOnline);
	});
};

plugin.onPost = function(data) {
	var uid = data.uid;

	rewards.checkConditionAndRewardUser(uid, 'essentials/user.postcount', function(callback) {
		user.getUserField(uid, 'postcount', callback);
	});
};

module.exports = plugin;