const queryUtils = require('../../utils/queryUtils');
const log = require('../../utils/log');

const { Job } = require('../../models');

const jobService = require('../services/jobService');

const filterController = {};

async function count(fieldName, sort = -1, sort_count = true){
    let result = {};
    if(sort_count){
        result = await jobService.aggregate([
            {
                $group: {
                    _id: fieldName,
                    count: {$sum: 1}
                },
            },
            {
                $sort: {count: sort}
            }
        ]);
    } else {
        result = await jobService.aggregate([
            {
                $group: {
                    _id: fieldName,
                    count: {$sum: 1}
                },
            },
            {
                $sort: {_id: sort}
            }
        ]);
    }
    return result;

}

filterController.country = async (req, res, next) => {
    try {
        let results = await count('$Job - Country:', );
        res.json(results);
    } catch (e) {
        next(e);
    }
};

filterController.city = async (req, res, next) => {
    try {
        let results = await count('$Job - City:', 1, false);
        res.json(results);
    } catch (e) {
        next(e);
    }

};

filterController.search = async (req, res, next) => {
    const { pageSize, page } = req.context.pagination;
    var query = {};
    if(req.query.q === "") {
        var match_all = {};
        query = {
            size: pageSize,
            from: pageSize * page,
            query: { match_all }
        };
    } else {
        const multi_match = {};
        if (req.query.q) {
            multi_match.query = req.query.q;
            multi_match.fields=['Job Title:', 'Job - Province / State:', 'Targeted Degrees and Disciplines:'];
        }
        query = {
            size: pageSize,
            from: pageSize * page,
            query: { multi_match }
        };
    }

    try {
        const results = await jobService.search(query);
        const docs = results.hits.hits;

        res.json({"pages": Math.ceil(results.hits.total/pageSize), "ids": ids});
    } catch (e) {
        next(e);
    }
};

module.exports = filterController;
