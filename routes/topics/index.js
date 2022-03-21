var express = require("express");
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Topic = require("../../model/topic");

var router = express.Router();

// get one topic from database
router.get('/topic/:title', async (req, res) => {
    try {
        const { title } = req.params;
        // Validate user input
        if (!title) {
            res.status(400).send("Please, provide the title of the topic");
        }
        const event = await Topic.findOne({ title: title });
        return res.status(200).json(event);
    } catch(err) {
        console.log(err);
    }
})

// get all topics from myFirstDatabase
router.get('/topics', async (req, res) => {
    try {
        const events = await Topic.find();
        return res.status(200).json(events);
    } catch(err) {
        console.log(err);
    }
})

// add new topic to the myFirstDatabase
router.post('/topic/new', async (req, res) => {
    try {
        const token = req.header('x-access-token');
        const decodedToken = jwt.decode(token);
        //get user input from
        const { title } = req.body;

        if (!title) {
            res.status(400).send("title is required");
        }

        const oldTopic = await Topic.findOne({ title });

        if (oldTopic) {
            return res.status(409).send("Duplicate topic's title found.");
        }

        const newTopic = await Topic.create({
            title: req.body.title,
            user: decodedToken.email
        });
        res.status(201).json(newTopic);
    } catch(err) {
        console.log(err);
    }
})

// update an event info in the databset
router.put('/topic/:title', async (req, res) => {
    try {
		const topic = await Topic.findOne({ title: req.params.title })

		if (req.body.title) {
			topic.title = req.body.title
		}

		await topic.save()
		res.status(200).json(topic)
	} catch {
		res.status(404)
		res.send({ error: "topic doesn't exist!" })
	}
})

// delete an event in the databse
router.delete('/topic/:id', async (req, res) => {
    try {
		await Topic.deleteOne({ title: req.params.id })
		res.status(204).json([])
	} catch {
		res.status(404)
		res.send({ error: "topic doesn't exist!" })
	}
})

module.exports = router;