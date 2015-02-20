"use strict";

var conditionals = {};

conditionals.get = function(conditionals, callback) {
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


conditionals.greaterthan = function(data, callback) {
	callback(false, parseInt(data.left) > parseInt(data.right));
};

conditionals.greaterorequalthan = function(data, callback) {
	callback(false, parseInt(data.left) >= parseInt(data.right));
};

conditionals.lesserthan = function(data, callback) {
	callback(false, parseInt(data.left) < parseInt(data.right));
};

conditionals.lesserorequalthan = function(data, callback) {
	callback(false, parseInt(data.left) <= parseInt(data.right));
};

conditionals.string = function(data, callback) {
	callback(false, data.left === data.right);
};


module.exports = conditionals;