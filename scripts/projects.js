(function (module) {
  function Project(o) {
    for(k in o) {
      this[k] = o[k];
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
