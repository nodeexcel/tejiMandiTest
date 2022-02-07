const db = require('../model')
const nodeCache = require('node-cache')
const myCache = new nodeCache({ stdTTL: 100, checkperiod: 120 })


const getCountries =  async (req,res) => {
    try {
        let {startYear,endYear,limit,page} = req.query
        limit ? limit : limit = 100
        page ? page : page = 1
        let cachedValue = myCache.get(`startYear = ${startYear} endYear = ${endYear}`)
        if (cachedValue) {
            return res.json({
                status : 1,
                data : cachedValue,
                cached : true
            })
        }
        let countries = await db.emission.getCountries(startYear,endYear,limit,page)
        if (countries && countries.length) {
            myCache.set(`startYear = ${startYear} endYear = ${endYear}`, countries)
        }
        res.json({
            status : 1,
            data : countries
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 0,
            message : error.message ? error.message :error
        })
    }
}

const getCountriesValues =  async (req,res) => {
    try {
        let {startYear,endYear,parameter,limit,page} = req.query
        limit ? limit : limit = 100
        page ? page : page = 1
        let cachedValue = myCache.get(`startYear = ${startYear} endYear = ${endYear} parameter = ${parameter}`)
        if (cachedValue) {
            return res.json({
                status : 1,
                data : cachedValue,
                cached : true
            })
        }
        let countries = await db.emission.getCountriesValues(startYear,endYear,parameter,limit,page)
        if (countries && countries.length) {
            myCache.set(`startYear = ${startYear} endYear = ${endYear} parameter = ${parameter}`, countries)
        }
        res.json({
            status : 1, 
            data : countries
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 0,
            message : error.message ? error.message :error
        })
    }
}

module.exports = {
    getCountries,getCountriesValues
}