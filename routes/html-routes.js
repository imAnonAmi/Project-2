// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
	app.get("/", function(req, res) {
		// If the user already has an account send them to the members page
		if (req.user) {
			res.redirect("/moods-entry");
		}
		res.sendFile(path.join(__dirname, "../public/signup.html"));
	});

	app.get("/login", function(req, res) {
		// If the user already has an account send them to the members page
		if (req.user) {
			res.redirect("/moods-entry");
		}
		res.sendFile(path.join(__dirname, "../public/login.html"));
	});

	// Routes that access pages only available to regustered users are protected with isAuthenticated middleware
	// If a user who is not logged in tries to access these routes they will be redirected to the signup page
	app.get("/moods-entry", isAuthenticated, function(req, res) {
		res.sendFile(path.join(__dirname, "../public/moods-entry.html"));
	});
	// disable requirement to be logged in for testing
	app.get("/moods-view", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/moods-view.html"));
	});
	// app.get("/moods-view", isAuthenticated, function(req, res) {
	// 	res.sendFile(path.join(__dirname, "../public/moods-view.html"));
	// });
};
