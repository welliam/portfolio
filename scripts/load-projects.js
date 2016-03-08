function Project(o) {
  this.title = o.title;
  this.type = o.type;
  this.link = o.link;
  this.description = o.description;
}

Project.prototype.toHtml = function () {
  var $project = $('article.template').clone();
  $project.find('.project-title').text(this.title);
  $project.find('.project-type').text(this.type);
  $project.find('.project-description').text(this.description);
  $project.find('.project-link').attr('href', this.link);
  $project.removeClass('template');
  return $project;
};

$(document).ready(function () {
  projects.forEach(function (p) {
    $('.projects').append((new Project(p)).toHtml());
  });
});
