'use strict';

const conditionals = module.exports;

conditionals.get = function (conditionals, callback) {
	conditionals = conditionals.concat([
		{
			name: '>',
			conditional: 'greaterthan',
		},
		{
			name: '>=',
			conditional: 'greaterorequalthan',
		},
		{
			name: '<',
			conditional: 'lesserthan',
		},
		{
			name: '<=',
			conditional: 'lesserorequalthan',
		},
		{
			name: 'string:',
			conditional: 'string',
		},
	]);

	callback(null, conditionals);
};


conditionals.greaterthan = function (data, callback) {
	callback(null, parseInt(data.left, 10) > parseInt(data.right, 10));
};

conditionals.greaterorequalthan = function (data, callback) {
	callback(null, parseInt(data.left, 10) >= parseInt(data.right, 10));
};

conditionals.lesserthan = function (data, callback) {
	callback(null, parseInt(data.left, 10) < parseInt(data.right, 10));
};

conditionals.lesserorequalthan = function (data, callback) {
	callback(null, parseInt(data.left, 10) <= parseInt(data.right, 10));
};

conditionals.string = function (data, callback) {
	callback(null, data.left === data.right);
};
