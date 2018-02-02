var nodeLib = require('/lib/xp/node');

exports.handleDownload = function (req) {
    var id = req.params.id;
    var repo = nodeLib.connect({
        repoId: "cms-repo",
        branch: "draft"
    });

    var result = repo.query({
        start: 0,
        count: 1,
        filters: {
            exists: {
                field: "video"
            }
        },
        sort: "_timestamp DESC"
    });

    if (result.count > 0) {
        id = result.hits[0].id;
    } else {
        return {
            status: 404
        }
    }

    var videoNode = repo.get(id);
    var videoStream = repo.getBinary({
        key: id, binaryReference: 'video'
    });

    return {
        body: videoStream,
        contentType: videoNode.contentType
    };
};