"use strict";

var plugin = {},
	definitions = require('./lib/definitions'),
	rewards = module.parent.require('./rewards'),
	user = module.parent.require('./user');

plugin.getConditions = definitions.getConditions;
plugin.getConditionals = definitions.getConditionals;
plugin.getRewards = definitions.getRewards;




plugin.onUpvote = function(data) {
	var uid = data.uid;


	rewards.checkConditionAndRewardUser(uid, 'core:user.reputation', function(callback) {
		user.getUserField(uid, 'reputation', callback);
	});
};

module.exports = plugin;