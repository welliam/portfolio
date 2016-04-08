page('/', controller.retrieve, controller.show);
page('/about', controller.about)
page('/type/:type', controller.retrieve, function(context, next) {
  context.filter = context.params.type;
  next();
}, controller.show, controller.filter);
page();
