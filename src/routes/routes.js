const express = require('express')
const router = express.Router()
const controller = require('../controller')


/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Retrieve a list of countries and values .
 *     description: Retrieve a list of countries and values according to start and end year passed in query.
 *     parameters : 
 *     - in : query
 *       name : startYear
 *       description : year after which data was recorded 
 *     - in : query
 *       name : endYear
 *       description : year before which data was recorded
 *     - in : query
 *       name : limit
 *       description : no. of results required
 *     - in : query
 *       name : page 
 *       description : which page data is required 
 *     responses:
 *       200:
 *         description: A list of countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status : 
 *                   type : integer
 *                   description : tells whether succeded
 *                   example : 1 
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                          type: string
 *                          description: The document _id.
 *                          example: 6200b60f0294e11cbdd57242
 *                       country_or_area:
 *                          type: string
 *                          description: The counrty's name.
 *                          example: Australia
 *                       year : 
 *                          type : integer
 *                          description : year in which value was recorded
 *                          example : 2012
 *                       value : 
 *                          type : number ,
 *                          description : emission value recorded
 *                          example : 406462.8477036
 */
router.get('/countries', controller.apiController.getCountries)
/**
 * @swagger
 * /api/countries/id:
 *   get:
 *     summary: Retrieve a list of countries , values and category .
 *     description: Retrieve a list of countries and values according to start and end year and parmeter passed in query.
 *     parameters : 
 *      - in : query
 *        name : startYear
 *        description : year after which data was recorded 
 *      - in : query
 *        name : endYear
 *        description : year before which data was recorded
 *      - in : query
 *        name : limit
 *        description : no. of results required
 *      - in : query
 *        name : page 
 *        description : which page data is required 
 *      - in : query
 *        name : parameter 
 *        description : whether co2 or no2 emission  
 *     responses:
 *       200:
 *         description: A list of countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status : 
 *                   type : integer
 *                   description : tells whether succeded
 *                   example : 1 
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                          type: string
 *                          description: The document _id.
 *                          example: 6200b60f0294e11cbdd57242
 *                       country_or_area:
 *                          type: string
 *                          description: The counrty's name.
 *                          example: Australia
 *                       year : 
 *                          type : integer
 *                          description : year in which value was recorded
 *                          example : 2012
 *                       value : 
 *                          type : number ,
 *                          description : emission value recorded
 *                          example : 406462.8477036
 *                       category : 
 *                          type : string
 *                          description : kind of emission
 *                          example : any emission
 *                       co2 : 
 *                          type : boolean
 *                          description : represnts if co2 was emitted
 *                          example : true
 *                       no2 : 
 *                           type : boolean
 *                           description : repersents if no2 was emitted
 *                           example : true   
 */
router.get('/countries/id', controller.apiController.getCountriesValues)



module.exports = router