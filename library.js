"use strict";

var plugin = {};

plugin.init = function(params, callback) {
	var app = params.router,
		middleware = params.middleware,
		controllers = params.controllers;
	
	app.get('/admin/plugins/essentials', middleware.admin.buildHeader, renderAdmin);
	app.get('/api/admin/plugins/essentials', renderAdmin);

	callback();
};

module.exports = plugin;