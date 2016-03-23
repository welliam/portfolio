var express = require('express'),
    requestProxy = require('express-request-proxy'),
    port = process.env.PORT || 3000,
    app = express();

function proxyGitHub(request, response) {
  requestProxy({
    url: 'https://api.github.com/users/welliam/repos',
    headers: {
      Authorization: 'token ' + process.env.GITHUB_TOKEN
    }
  })(request, response);
}

app.get('/github', proxyGitHub);
app.head('/github', proxyGitHub);

app.use(express.static('./'));

app.get('/', function (request, response) {
  response.sendFile('index.html', { root: '.' });
});

app.listen(port);
