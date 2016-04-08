(function (module) {
  function aboutController() {
    showContent('#about');
  }

  function filterController(context) {
    filterProjects(context.filter);
  }

  module.controller = {
    about: aboutController,
    filter: filterController
  };
})(window);
