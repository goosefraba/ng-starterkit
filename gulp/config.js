var nconf = require('nconf');

nconf
    .env()
    .argv()
    .defaults({
        "build": {
            "context": "app"
        }
    })
    .file(nconf.get("build").context, {file: './gulp/' + nconf.get("build").context + '.json'})
    .file({file: './gulp/default.json'});
var cfg = nconf.get('build');

console.log("Build config loaded: " + JSON.stringify(cfg));

module.exports = cfg;