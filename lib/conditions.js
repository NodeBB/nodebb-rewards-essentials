"use strict";

var conditions = {};

conditions.get = function(conditions, callback) {
	conditions = conditions.concat([
		{
			"name": "Reputation",
			"condition": "essentials/user.reputation"
		},
		{
			"name": "Post Count",
			"condition": "essentials/user.postcount"
		},
		{
			"name": "Last Logged in Time",
			"condition": "essentials/user.lastonline"
		}
	]);

	callback(false, conditions);
};


/*
[
  'profileviews',
  'lastonline',
  'password',
  'lastposttime',
  'topiccount',
  'status',
  'banned',
  'reputation',
  'picture',
  'postcount',
  'joindate',
  'gravatarpicture',
  'uploadedpicture' ]

  filter:user.updateProfile', {uid: uid, settings: data} ['username', 'email', 'fullname', 'website', 'location', 'birthday', 'signature']
  */
module.exports = conditions;