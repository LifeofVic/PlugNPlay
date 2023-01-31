const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')

const key = process.env.RAWG_API_KEY;
const keyUrl = ("key=" + key);

// ==========================================================================================
// GET BY NAME

router.get('/byName/:name', async (req, res) => {

  const { name } = req.params;

  try {
    const { data: games } = await axios.get(`https://api.rawg.io/api/games?${keyUrl}&search=${name}&page_size=40`)
    res.send(games)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }

})

// ==========================================================================================
// GET BY ID

router.get('/byID/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const { data: game } = await axios.get(`https://api.rawg.io/api/games/${id}?${keyUrl}&page_size=40`)
    res.send(game)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }

});

// ==========================================================================================
// GET BY GENRE

router.get('/byGenre/:genre', async (req, res) => {

  const { genre } = req.params;

  console.log('searching for genre', genre, '...');
  try {
    const { data: games } = await axios.get(`https://api.rawg.io/api/games?genres=${genre}&${keyUrl}&page_size=40`)
    res.send(games)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// ==========================================================================================
// GET BY RELEVANT TAGS

router.get('/byTags', async (req, res) => {

  const { userTags } = req.body;
  const searchQueries = []

  // HELPER FUNCTIONS
  //* function to filter out duplicate results
  const dupeFilter = (obj, idx, arr) => {
    return idx === arr.findIndex((game) => {
      return game.name === obj.name && game.id === obj.id
    })
  }

  //* filters out non-english tags, isolates the tag name, and sorts alphabetically
  const tagFilter = (game) => {
    const gameTags =
      game.tags
        .filter(tag => tag.language === "eng")
        .map(tag => tag.name)
        .sort()

    //* returns game object, with tags filtered
    return {
      ...game,
      tags: gameTags.map(tag => tag.toLowerCase())
    }
  }

  //* sorts games in order of most matched tags to fewest
  const sortByTagRelevance = (a, b) => {
    return b.tags.filter(tag => userTags.includes(tag.toLowerCase())).length -
      a.tags.filter(tag => userTags.includes(tag.toLowerCase())).length
  }

  // QUERY
  try {

    for (let tag of userTags) {
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?${keyUrl}&tags=${tag.toLowerCase()}&page_size=40`,
        { validateStatus: (status) => status < 500 } )) // prevents request from throwing error if it returns a 404
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?${keyUrl}&tags=${tag.toLowerCase()}&page_size=40&page=2`,
        { validateStatus: (status) => status < 500 } ))
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?${keyUrl}&tags=${tag.toLowerCase()}&page_size=40&page=3`,
        { validateStatus: (status) => status < 500 } ))
    }

    const taggedGameObjects = await Promise.all(searchQueries)

    const taggedGames =
      taggedGameObjects
        .filter(obj => obj.status < 300) // filters out any queries that returned a 404
        .map(obj => obj.data.results) // isolates the actual API results
        .flat() // flattens the results into a single one-dimensional array
        .filter(dupeFilter)
        .map(tagFilter)
        .sort(sortByTagRelevance);
    
    res.send(taggedGames)

  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }

})

module.exports = router;
