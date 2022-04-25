const express = require('express');
const router = express.Router();

// Item Model
const Score = require('../../models/score');

// @route GET api/scores
// @desc Get top 5 Scores
// @access Public
router.get('/', (req, res) => {
    Score.find()
        .sort({points: -1})
        .limit(5)
        .then(scores => res.json(scores))
        .catch(err => {
            res.status(500).json(err);
        });
});

// @route POST api/scores
// @desc Add a Score
// @access Public
router.post('/', (req, res) => {
    const newScore = new Score({
        name: req.body.name,
        points: req.body.points
    });
    newScore.save()
        .then(score => res.json(score))
        .catch(err => {
            res.status(500).json(err);
        });
});

// FOR TESTING PURPOSES
// @route DELETE api/scores
// @desc Delete a Score
// @access Public
// router.delete('/:id', (req, res) => {
//     Score.findById(req.params.id)
//         .then(score => score.remove().then(() => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

// FOR TESTING PURPOSES
// @route DELETE api/scores
// @desc Delete all Scores
// @access Public
// router.delete('/', (req, res) => {
//     Score.deleteMany()
//         .then(() => res.json({ success: true }))
//         .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;