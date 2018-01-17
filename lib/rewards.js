'use strict';

var rewards = {};
var groups = require.main.require('./src/groups');
var user = require.main.require('./src/user');
var db = require.main.require('./src/database');
var winston = require.main.require('winston');


rewards.get = function (rewards, callback) {
	getGroupList(function (err, groups) {
		if (err) {
			return err;
		}

		rewards = rewards.concat([
			{
				rid: 'essentials/add-to-group',
				name: 'Add to Group',
				inputs: [
					{
						type: 'select',
						name: 'groupname',
						label: 'Group Name:',
						values: groups,
					},
				],
			},
			{
				rid: 'essentials/remove-from-group',
				name: 'Remove from Group',
				inputs: [
					{
						type: 'select',
						name: 'groupname',
						label: 'Group Name:',
						values: groups,
					},
				],
			},
			{
				rid: 'essentials/alert-user',
				name: 'Send alert message',
				inputs: [
					{
						type: 'text',
						name: 'title',
						label: 'Title:',
					},
					{
						type: 'text',
						name: 'message',
						label: 'Message:',
					},
				],
			},
			{
				rid: 'essentials/award-reputation',
				name: 'Award Reputation',
				inputs: [
					{
						type: 'text',
						name: 'reputation',
						label: 'Amount of reputation:',
					},
				],
			},
		]);

		callback(false, rewards);
	});
};

rewards.addToGroup = function (data) {
	groups.join(data.reward.groupname, data.uid);
};

rewards.removeFromGroup = function (data) {
	groups.leave(data.reward.groupname, data.uid);
};

rewards.alertUser = function (data) {
	var websockets = require.main.require('./src/socket.io');
	websockets.in('uid_' + data.uid).emit('event:alert', data.reward);
};

rewards.awardReputation = function (data) {
	user.incrementUserFieldBy(data.uid, 'reputation', data.reward.reputation, function (err, newreputation) {
		if (err) {
			return winston.error(err.stack);
		}

		db.sortedSetAdd('users:reputation', newreputation, data.uid);
	});
};

function getGroupList(callback) {
	var list = [];

	groups.getGroups('groups:createtime', 0, -1, function (err, groups) {
		groups.forEach(function (group) {
			var name = group;
			var matchesCatPrivsGroup = group.match(/cid:([0-9]*):privileges:groups:([\s\S]*)/);

			if (matchesCatPrivsGroup !== null) {
				name = 'Category ' + matchesCatPrivsGroup[1] + ' group with privilege ' + matchesCatPrivsGroup[2];
			}

			list.push({
				name: name || group,
				value: group,
			});
		});

		callback(err, list);
	});
}

module.exports = rewards;
