"use strict";

var plugin = {},
	rewards = module.parent.require('./rewards'),
	user = module.parent.require('./user');


plugin.conditions = require('./lib/conditions');
plugin.conditionals = require('./lib/conditionals');
plugin.rewards = require('./lib/rewards');




plugin.onUpvote = function(data) {
	var uid = data.uid;


	rewards.checkConditionAndRewardUser(uid, 'core:user.reputation', function(callback) {
		user.getUserField(uid, 'reputation', callback);
	});
};

module.exports = plugin;