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
  function getProjectsJSON(method, handleResponse) {
    $.ajax({
      method: method,
      url: 'https://api.github.com/users/welliam/repos?per_page=5&sort=updated',
      headers: {
        'Authorization': 'token ' + githubToken
      },
      success: handleResponse
    });
  }

  function finishProjectsJSONRequest(handleJSON, newETag) {
    if (newETag == localStorage.projectsETag) {
      handleJSON(JSON.parse(localStorage.projectsData));
    } else {
      localStorage.projectsETag = newETag;
      getProjectsJSON('GET', function (data) {
        localStorage.projectsData = JSON.stringify(data);
        handleJSON(data);
      });
    }
  }

  function getProjectsCached(handleJSON) {
    getProjectsJSON('HEAD', function (data, status, request) {
      finishProjectsJSONRequest(handleJSON, request.getResponseHeader('eTag'));
    });
  }

  module.getProjects = getProjectsCached;
})(window);
