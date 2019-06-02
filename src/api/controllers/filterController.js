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
        let results = await count('$Job - City:', -1, true);
        res.json(results);
    } catch (e) {
        next(e);
    }

};

filterController.filter = async (req, res, next) => {
    try {
        let results = await count('$Job - City:', -1, true);
        res.json(results);
    } catch (e) {
        next(e);
    }
};

filterController.cover = async (req, res, next) => {
    try {
        let results = await count('$cover_letter', -1, true);
        res.json(results);
    } catch (e) {
        next(e);
    }
};

module.exports = filterController;
