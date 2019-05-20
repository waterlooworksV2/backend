const queryUtils = require('../../utils/queryUtils');
const { extraLogger } = require('../../utils/log');

const jobService = require('../services/jobService');

const customList = {};

const customListIndexToKey = {
  0: 'United States',
  1: 'Canada',
  2: 'Toronto',
  3: 'Kitchener/Waterloo',
  4: 'Apple'
}

const customListToQuery = {
  'United States': {"Job - Country:" : "United States"},
  'Canada': {"Job - Country:" : "Canada"},
  'Toronto': {"Job - City:" : "Toronto"},
  'Kitchener/Waterloo': { $or: [{"Job - City:" : "Waterloo"}, {"Job - City:" : "Kitchener"}] },
  'Apple': {"Organization:" : "Apple Inc"}
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
        res.send({"pages": index.totalPages-1, "ids": ids, "listName": customListIndexToKey[id]});
    } catch (e) {
        next(e);
    }
};

module.exports = customList;
