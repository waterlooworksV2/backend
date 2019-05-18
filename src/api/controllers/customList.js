const queryUtils = require('../../utils/queryUtils');
const { extraLogger } = require('../../utils/log');

const jobService = require('../services/jobService');

const customList = {};

const customListIndexToKey = {
  0: 'US'
}

const customListToQuery = {
  'US': {"Job - Country:" : "United States"}
}

customList.customListIDs = async (req, res, next) => {
    try {
        const { pageSize, page } = req.context.pagination;
        const id = Number(req.params.id);
        if (Number.isNaN(id) || id < 0 || id > customList.length) {
          return res.status(404).send({ message: `${req.params.sampleid} is not a valid list id` });
        }
        const query = customListToQuery[customListIndexToKey[id]]
        var index = await jobService.paginate({q: query,
                                               page:page+1,
                                               limit:pageSize,
                                               select: 'id'
                                             });
        var ids = [];
        for(i in index['docs']){
          ids.push(index["docs"][i]["_id"])
        }
        res.send({"pages": index.totalPages-1, "ids": ids});
    } catch (e) {
        next(e);
    }
};

module.exports = customList;
