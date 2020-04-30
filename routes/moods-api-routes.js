// Require models
const db = require("../models");

module.exports = (app) => {
	// POST route for adding mood entry
	app.post("/api/moods-entry", (req, res) => {
		db.MoodEntry.create(req.body).then((dbEntry) => {
			res.json(dbEntry);
		});
	});
	// GET route for getting entries
	app.get("/api/moods-view", (req, res) => {
		let query = {};
		// set user ID (if any)
		if (req.query.user_id) {
			query.UserId = req.query.user_id;
		}
		// find all mood entries - limited to user if specified above
		db.MoodEntry.findAll({
			where: query,
			include: [db.User],
		}).then((dbEntries) => {
			res.json(dbEntries);
		});
	});
};
