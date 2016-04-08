(function (module) {
  function populateFilter() {
    var found = [];
    $('article').each(function () {
      var tag = $(this).data('type');
      if (tag && found.indexOf(tag) == -1) {
        found.push(tag);
        var optionTag = '<option value="' + tag + '">' + tag + '</option>';
        $('#type-filter').append(optionTag);
      }
    });
    setFilterListener();
  }

  function filterProjects(type) {
    $('article').hide();
    var articles = $('article');
    if (type) {
      $('article').each(function () {
        if (type == $(this).data('type')) {
          $(this).fadeIn();
        }
      });
    } else {
      articles.fadeIn();
    }
  }

  function setFilterListener() {
    $('#type-filter').on('change', function () {
      filterProjects($(this).val());
    });
  }

  module.populateFilter = populateFilter;
  module.filterProjects = filterProjects;
})(window);

(function () {
  function showContent(id) {
    $('body > section').hide();
    var content = $(id);
    content.fadeIn();
  }

  function loadProjects(projects) {
    projects.forEach(function (p) {
      $('#projects').append((new Project(p)).toHtml());
    });
  }

  function showProjects(context, next) {
    showContent('#projects');
    if (next) {
      next();
    }
  }

  function retrieve(context, next) {
    if ($('article').length > 0) {
      getProjects(function (data) {
        loadProjects(data);
        populateFilter();
        next();
      });
    } else {
      next();
    }
  }

  $(document).ready(function () {
    setupRoutes();
  });
})();
