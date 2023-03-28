'use strict';


const rewards = require.main.require('./src/rewards');
const user = require.main.require('./src/user');

const plugin = module.exports;

plugin.conditions = require('./lib/conditions');
plugin.conditionals = require('./lib/conditionals');
plugin.rewards = require('./lib/rewards');

plugin.onUpvote = function (data) {
	const uid = data.owner;
	rewards.checkConditionAndRewardUser({
		uid: uid,
		condition: 'essentials/user.reputation',
		method: function (callback) {
			user.getUserField(uid, 'reputation', callback);
		},
	});
};

plugin.onOnline = function (data) {
	const { uid } = data;
	const lastOnline = data.timestamp;

	rewards.checkConditionAndRewardUser({
		uid: uid,
		condition: 'essentials/user.lastonline',
		method: function (callback) {
			callback(null, lastOnline);
		},
	});

	checkDaysRegistered(uid);
	checkJoindate(uid);
};

plugin.onUserCreate = function (data) {
	checkDaysRegistered(data.user.uid);
	checkJoindate(data.user.uid);
};

function checkJoindate(uid) {
	rewards.checkConditionAndRewardUser({
		uid: uid,
		condition: 'essentials/user.joindate',
		method: function (callback) {
			user.getUserField(uid, 'joindate', callback);
		},
	});
}

function checkDaysRegistered(uid) {
	rewards.checkConditionAndRewardUser({
		uid: uid,
		condition: 'essentials/user.daysregistered',
		method: async function () {
			const joindate = await user.getUserField(uid, 'joindate');
			return (Date.now() - joindate) / (1000 * 60 * 60 * 24);
		},
	});
}

plugin.onPost = function (data) {
	const { uid } = data.post;

	rewards.checkConditionAndRewardUser({
		uid: uid,
		condition: 'essentials/user.postcount',
		method: function (callback) {
			user.getUserField(uid, 'postcount', callback);
		},
	});
};

