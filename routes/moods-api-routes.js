// Require models
var db = require("../models");

module.exports = function(app) {
	// POST route for adding mood entry
	app.post("/api/moods-entry", function(req, res) {
		db.MoodEntry.create(req.body).then((dbEntry) => {
			res.json(dbEntry);
		});
	});

	// GET route for getting all entries
	app.get("/api/posts", function(req, res) {
		let query = {};
		// set user ID (if any)
		if (req.query.user_id) {
			query.UserId = req.query.user_id;
		}
		// find all mood entries associated with user
		db.MoodEntry.findAll({
			where: query,
			include: [db.User],
		}).then((dbEntries) => {
			res.json(dbEntries);
		});
	});
};
