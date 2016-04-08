(function (module) {
  function loadProjects(projects) {
    projects.forEach(function (p) {
      $('#projects').append((new Project(p)).toHtml());
    });
  }

  function showContent(id) {
    $('body > section').hide();
    var content = $(id);
    content.fadeIn();
  }

  function showProjects(context, next) {
    showContent('#projects');
    if (next) {
      next();
    }
  }

  function aboutController() {
    showContent('#about');
  }

  function filterController(context) {
    filterProjects(context.filter);
  }

  function retrieve(context, next) {
    if ($('article').length == 0) {
      getProjects(function (data) {
        loadProjects(data);
        populateFilter();
        next();
      });
    } else {
      next();
    }
  }

  module.controller = {
    about: aboutController,
    filter: filterController,
    retrieve: retrieve,
    show: showProjects
  };
})(window);
