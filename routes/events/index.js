var express = require("express");
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Event = require("../../model/event");

var router = express.Router();

// get one event from database
router.get('/event/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Validate user input
        if (!id) {
            res.status(400).send("Please, provide the identification number of the event");
        }
        const event = await Event.findOne({ _id: id });
        return res.status(200).json(event);
    } catch(err) {
        console.log(err);
    }
})

// get all events from myFirstDatabase
router.get('/events', async (req, res) => {
    try {
        const {topics} = req.query;
        let event = null;
        if (topics) {
            const regex = new RegExp(topics, 'i') 
            events = await Event.find({topics: { $regex: regex } });
        } else {
            events = await Event.find();
        }
        return res.status(200).json(events);
    } catch(err) {
        console.log(err);
    }
})

// add new event to the myFirstDatabase
router.post('/event/new', async (req, res) => {
    try {
        const token = req.header('x-access-token');
        const decodedToken = jwt.decode(token);
        //get user input from
        const { title, description, topics } = req.body;

        if (!(title && description && topics)) {
            console.log({title, description, topics, token, decodedToken});
            res.status(400).send("All input is required");
        }

        const oldEvent = await Event.findOne({ title });

        if (oldEvent) {
            return res.status(409).send("Duplicate event title found.");
        }

        const newEvent = await Event.create({
            title: req.body.title,
            description: req.body.description,
            topics: req.body.topics,
            user: decodedToken.email
        });
        res.status(201).json(newEvent);
    } catch(err) {
        console.log(err);
    }
})

// update an event info in the databset
router.put('/event/:id', async (req, res) => {
    try {
		const event = await Event.findOne({ _id: req.params.id })

		if (req.body.title) {
			event.title = req.body.title
		}

		if (req.body.description) {
			event.description = req.body.description
		}

        if (req.body.topics) {
            event.topics = req.body.topics
        }

		await event.save()
		res.status(200).json(event)
	} catch {
		res.status(404)
		res.send({ error: "Evvent doesn't exist!" })
	}
})

// delete an event in the databse
router.delete('/event/:id', async (req, res) => {
    try {
		await Event.deleteOne({ _id: req.params.id })
		res.status(204).json([])
	} catch {
		res.status(404)
		res.send({ error: "Event doesn't exist!" })
	}
})

module.exports = router;