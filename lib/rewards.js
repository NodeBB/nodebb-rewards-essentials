'use strict';

const groups = require.main.require('./src/groups');
const user = require.main.require('./src/user');
const db = require.main.require('./src/database');

const winston = require.main.require('winston');
const validator = require.main.require('validator');

const rewards = module.exports;

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

		callback(null, rewards);
	});
};

rewards.addToGroup = async function (data) {
	await groups.join(data.reward.groupname, data.uid);
};

rewards.removeFromGroup = async function (data) {
	await groups.leave(data.reward.groupname, data.uid);
};

rewards.alertUser = function (data) {
	var websockets = require.main.require('./src/socket.io');
	websockets.in('uid_' + data.uid).emit('event:alert', data.reward);
};

rewards.awardReputation = function (data) {
	user.incrementUserReputationBy(data.uid, data.reward.reputation, function (err) {
		if (err) {
			return winston.error(err.stack);
		}
	});
};

function getGroupList(callback) {
	var list = [];

	groups.getGroups('groups:createtime', 0, -1, function (err, groups) {
		if (err) {
			return callback(err);
		}
		groups.forEach(function (group) {
			var name = group;
			var matchesCatPrivsGroup = group.match(/cid:([0-9]*):privileges:groups:([\s\S]*)/);

			if (matchesCatPrivsGroup !== null) {
				name = 'Category ' + matchesCatPrivsGroup[1] + ' group with privilege ' + matchesCatPrivsGroup[2];
			}

			list.push({
				name: validator.escape(String(name || group)),
				value: validator.escape(String(group)),
			});
		});
		callback(null, list);
	});
}
