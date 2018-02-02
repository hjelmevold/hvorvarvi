var portalLib = require('/lib/xp/portal');
var nodeLib = require('/lib/xp/node');
var valueLib = require('/lib/xp/value');

exports.handleUpload = function () {
    var form = portalLib.getMultipartForm();

    var result = portalLib.getMultipartItem('video');
    var stream = portalLib.getMultipartStream('video');

    var repo = nodeLib.connect({
        repoId: "cms-repo",
        branch: "draft"
    });

    var createRes = repo.create({
        _parentPath: "/",
        video: valueLib.binary('video', stream),
        contentType: result.contentType
    });

    return {
        body: {
            id: createRes._id
        },
        contentType: 'application/json'
    };
};