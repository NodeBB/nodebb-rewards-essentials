"use strict";

var plugin = {};

plugin.getConditions = function(conditions, callback) {
	conditions = conditions.concat([
		{
			"name": "Reputation",
			"condition": "core:user.reputation"
		},
		{
			"name": "Post Count",
			"condition": "core:user.postcount"
		},
		{
			"name": "Last Logged in Time",
			"condition": "core:user.lastonline"
		}
	]);

	callback(false, conditions);
};

plugin.getConditionals = function(conditionals, callback) {
	conditionals = conditionals.concat([
		{
			"name": ">",
			"conditional": "greaterthan"
		},
		{
			"name": ">=",
			"conditional": "greaterorequalthan"
		},
		{
			"name": "<",
			"conditional": "lesserthan"
		},
		{
			"name": "<=",
			"conditional": "lesserorequalthan"
		},
		{
			"name": "string:",
			"conditional": "string"
		}
	]);

	callback(false, conditionals);
};

plugin.getRewards = function(rewards, callback) {
	rewards = rewards.concat([
		{
			"rid": "core:add-to-group",
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
			"rid": "core:alert-user",
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


module.exports = plugin;