(function (module) {
  function Project(o) {
    for(k in o) {
      this[k] = o[k]; // ok
    }
  }

  Project.prototype.toHtml = function () {
    var template = Handlebars.compile($('#article-template').html());
    return template(this);
  };

  module.Project = Project;
})(window);

(function (module) {
  function getProjectsJSON(handleJSON) {
    $.getJSON('/data/projects-data.json', handleJSON);
  }

  function finishProjectsJSONRequest(handleJSON, newETag) {
    if (newETag == localStorage.projectsETag) {
      handleJSON(JSON.parse(localStorage.projectsData));
    } else {
      localStorage.projectsETag = newETag;
      getProjectsJSON(function (data) {
        localStorage.projectsData = JSON.stringify(data);
        handleJSON(data);
      });
    }
  }

  function getProjectsCached(handleJSON) {
    $.ajax('/data/projects-data.json', {
      method: 'HEAD',
    }).done(function (data, status, request) {
      finishProjectsJSONRequest(handleJSON, request.getResponseHeader('eTag'));
    });
  }

  module.getProjects = getProjectsCached;
})(window);

(function (module) {
  function populateFilter() {
    var found = [];
    $('article').each(function () {
      var tag = $(this).data('type');
      if (found.indexOf(tag) == -1) {
        found.push(tag);
        var optionTag = '<option value="' + tag + '">' + tag + '</option>';
        $('#type-filter').append(optionTag);
      }
    });
    setFilterListener();
  }

  function filterProjects(type) {
    $('article').hide();
    var articles = $('article').not('article.template');
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
})(window);

(function () {
  function showContent(id, fadeIn) {
    $('body > section').hide();
    var content = $(id);
    if (fadeIn) {
      content.fadeIn();
    } else {
      content.show();
    }
  }

  function setTabListener () {
    $('nav').on('click', 'a', function () {
      var content = $(this).data('content');
      if(content) {
        showContent('#' + content, true);
      }
    });
    showContent('#projects', false);
  }

  function loadProjects(projects) {
    projects.forEach(function (p) {
      $('#projects').append((new Project(p)).toHtml());
    });
  }

  $(document).ready(function () {
    getProjects(function (data) {
      loadProjects(data);
      populateFilter();
    });
    setTabListener();
  });
})();
