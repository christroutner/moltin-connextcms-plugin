var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api') 
};

module.exports = function(app) {

  // Keystone Views
  app.get('/test', routes.views.test);
  app.get('/product', routes.views.product);
  app.get('/checkout', routes.views.checkout);
  app.get('/thankyou', routes.views.thankyou);
  
  // Plugin API Route
  //app.get('/api/exampleplugin/list', keystone.middleware.api, routes.api.exampleplugin.list);
  //app.all('/api/exampleplugin/create', keystone.middleware.api, routes.api.exampleplugin.create);
  //app.all('/api/exampleplugin/:id/update', keystone.middleware.api, routes.api.exampleplugin.update);
	//app.get('/api/exampleplugin/:id/remove', keystone.middleware.api, routes.api.exampleplugin.remove);
  
  // Moltin API Route
  app.get('/api/moltinplugin/list', keystone.middleware.api, routes.api.moltinplugin.list);
  app.all('/api/moltinplugin/create', keystone.middleware.api, routes.api.moltinplugin.create);
  app.all('/api/moltinplugin/:id/update', keystone.middleware.api, routes.api.moltinplugin.update);
	app.get('/api/moltinplugin/:id/remove', keystone.middleware.api, routes.api.moltinplugin.remove);
  
  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
  app.get('/loggedinuser', middleware.requireUser, routes.views.loggedinuser);
}