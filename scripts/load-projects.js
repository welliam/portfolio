function Project(o) {
  this.title = o.title;
  this.link = o.link;
  this.description = o.description;
  this.type = o.type;
}

Project.prototype.toHtml = function () {
  var $project = $('article.template').clone();
  $project.find('.project-title').text(this.title);
  $project.find('.project-type').text(this.type);
  $project.find('.project-description').text(this.description);
  $project.find('.project-link').attr('href', this.link);
  $project.removeClass('template');
  $project.data('type', this.type);
  return $project;
};

(function () {
  function setTabListener () {
    $('nav').on('click', 'a', function () {
      if($(this).data('content')) {
        $('body > section').hide();
        $('#' + $(this).data('content')).show();
      }
    });
    $('nav a').first().click();
  }

  function populateFilter() {
    var found = [];
    $('article').not('article.template').each(function () {
      val = $(this).data('type');
      if (found.indexOf(val) == -1) {
        optionTag = '<option value="' + val + '">' + val + '</option>';
        $('#type-filter').append(optionTag);
        found.push(val);
      }
    });
  };

  function filterProjects(type) {
    $('article').hide();
    var articles = $('article').not('article.template');
    if (type) {
      $('article').not('article.template').each(function () {
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

  function loadProjects() {
    projects.forEach(function (p) {
      $('#projects').append((new Project(p)).toHtml());
    });
  }

  $(document).ready(function () {
    loadProjects();
    populateFilter();
    setFilterListener();
    setTabListener();
  });
})();
