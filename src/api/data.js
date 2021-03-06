const { Router } = require('express');
const CronJob = require('cron').CronJob;

const DataEntry = require('../models/DataEntry');
const getInfo = require('./getInfo');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        // get new cases and date data
        const entries = await DataEntry.find().sort({date:-1});
        res.json(entries);
    } catch (error) {
        next(error);
    }
});


// scheduing to get data and save to database at 5pm everyday
var job = new CronJob('0 17 * * *', async (req, res) => {
    try {
        const dataEntry = new DataEntry(await getInfo.getCovidData());
        const createdEntry = await dataEntry.save();
    } catch (err) {
        console.log(err);
    }

}, null, true, 'America/Los_Angeles');

job.start();

module.exports = router;