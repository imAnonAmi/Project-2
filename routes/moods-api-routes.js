// Require models
var db = require("../models");

module.exports = function(app) {
	// POST route for adding mood entry
	app.post("/api/moods-entry", function(req, res) {
		db.MoodEntry.create(req.body).then(function(dbEntry) {
			res.json(dbEntry);
		});
	});
};
