const path = require('path');
module.exports = {
    paths: function (paths, env) {
        // Changing public to static
        paths.appPublic = path.resolve(__dirname, 'react-client/public');
        paths.appHtml = path.resolve(__dirname, 'react-client/public/index.html');
        paths.appIndexJs = path.resolve(__dirname, 'react-client/src/index.js');
        paths.appSrc = path.resolve(__dirname, 'react-client/src');
        return paths;
    }
}