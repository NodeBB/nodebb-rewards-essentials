'use strict';

const validator = require.main.require('validator');

const groups = require.main.require('./src/groups');
const user = require.main.require('./src/user');

const rewards = module.exports;

rewards.get = async function (rewards) {
	const groupsData = await getGroupList();

	rewards = rewards.concat([
		{
			rid: 'essentials/add-to-group',
			name: 'Add to Group',
			inputs: [
				{
					type: 'select',
					name: 'groupname',
					label: 'Group Name:',
					values: groupsData,
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
					values: groupsData,
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
	return rewards;
};

rewards.addToGroup = async function (data) {
	await groups.join(data.reward.groupname, data.uid);
};

rewards.removeFromGroup = async function (data) {
	await groups.leave(data.reward.groupname, data.uid);
};

rewards.alertUser = function (data) {
	const websockets = require.main.require('./src/socket.io');
	websockets.in(`uid_${data.uid}`).emit('event:alert', data.reward);
};

rewards.awardReputation = async function (data) {
	await user.incrementUserReputationBy(data.uid, data.reward.reputation);
};

async function getGroupList() {
	const groupNames = await groups.getGroups('groups:createtime', 0, -1);

	groupNames.sort((a, b) => {
		const isAPrivGroup = groups.isPrivilegeGroup(a);
		const isBPrivGroup = groups.isPrivilegeGroup(b);
		if (isAPrivGroup && !isBPrivGroup) {
			return 1;
		} else if (!isAPrivGroup && isBPrivGroup) {
			return -1;
		}
		if (a > b) {
			return 1;
		} else if (b > a) {
			return -1;
		}
		return 0;
	});

	const groupData = groupNames.map((group) => {
		let name = group;
		const matchesCatPrivsGroup = group.match(/cid:([0-9]*):privileges:groups:([\s\S]*)/);

		if (matchesCatPrivsGroup !== null) {
			if (matchesCatPrivsGroup[1] === '0') {
				return null;
			}
			name = `Category ${matchesCatPrivsGroup[1]} group with privilege ${matchesCatPrivsGroup[2]}`;
		} else if (groups.isPrivilegeGroup(group)) {
			return null;
		}

		return {
			name: validator.escape(String(name || group)),
			value: validator.escape(String(group)),
		};
	});
	return groupData.filter(Boolean);
}
