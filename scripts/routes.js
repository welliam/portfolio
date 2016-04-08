page('/', retrieve, showProjects);
page('/about', controller.about)
page('/type/:type', retrieve, function(context, next) {
  context.filter = context.params.type;
  next();
}, showProjects, controller.filter);
page();
