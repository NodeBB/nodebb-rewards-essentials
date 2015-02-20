"use strict";

var rewards = {};


rewards.get = function(rewards, callback) {
	rewards = rewards.concat([
		{
			"rid": "essentials/add-to-group",
			"name": "Add to Group",
			"inputs": [
				{
					"type": "select",
					"name": "groupname",
					"label": "Group Name:",
					"values": [
						{
							"name": "Group 1",
							"value": "group1"
						},
						{
							"name": "Group 2",
							"value": "group2"
						},
						{
							"name": "Group 3",
							"value": "group3"
						}
					],
				}
			]
		},
		{
			"rid": "essentials/alert-user",
			"name": "Send alert message",
			"inputs": [
				{
					"type": "text",
					"name": "title",
					"label": "Title:"
				},
				{
					"type": "text",
					"name": "message",
					"label": "Message:"
				}
			]
		}
	]);

	callback(false, rewards);
};

rewards.addToGroup = function(data) {
	console.log('Added to group!', data);
};


rewards.alertUser = function(data) {
	console.log('Alerted User!', data);
};


module.exports = rewards;