const mongoose = require('mongoose')
const emission = mongoose.Schema({
    country_or_area : {
        type : String
    },
    year : {
        type : Number
    },
    value : {
        type : Number
    },
    category : {
        type : String
    },
    co2 : {
        type :Boolean
    },
    no2 : {
        type : Boolean
    }
}, {
    timestamps : true
})
const Emission = mongoose.model('emission',emission,'emission');

Emission['getCountries'] = async (startYear,endYear,limit,page) => {
    try {
        let countries
        if (startYear || endYear) {
            if(startYear && endYear) {
                countries = await Emission.find({year : {$gte : startYear, $lt : endYear}},{category : 0 , co2 : 0 , no2 : 0}).limit(100).skip((page -1)* limit )
            } else if (startYear) {
                countries = await Emission.find({year : {$gte : startYear}},{category : 0 , co2 : 0 , no2 : 0}).limit(100).skip((page -1)* limit )
            } else if (endYear) {
                countries = await Emission.find({year : {$lt : endYear}},{category : 0 , co2 : 0 , no2 : 0}).limit(100).skip((page -1)* limit )
            }
        } else {
            countries = await Emission.find({},{category : 0 , co2 : 0 , no2 : 0}).limit(100).skip((page -1)* limit )            
        }
        return countries
    } catch (error) {
        throw error
    }
}


Emission['getCountryValues'] = async (startYear,endYear,parameter,limit,page) => {
    try {
        let filter = {}
        if (startYear || endYear ) {
            filter.year = {}
            startYear ?  (filter.year.$gte = startYear) :  null
            endYear ? (filter.year.$lt = endYear) : null
        }
        if (parameter) {
            if (parameter == "co2") {
                filter.co2 = true
            }
            if(parameter == 'co2 and no2') {
                filter.co2 = true,
                filter.no2 =  true
            }
        }
        let countries = await db.emission.find(filter).limit(100).skip((page -1)* limit )
        return countries
    } catch (error) {
        throw error
    }
}
module.exports = Emission