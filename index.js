const express = require('express');
const favicon = require('serve-favicon');
const helmet = require("helmet");
const path = require('path')
const app = express();
const port = 3300;

app.use(helmet.contentSecurityPolicy({
  useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      objectSrc: ["'none'", "localhost:3300", "andywilko.com"],
      upgradeInsecureRequests: [],
    },
}));


app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(favicon(path.join(__dirname,'assets','images','favicon.ico')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})