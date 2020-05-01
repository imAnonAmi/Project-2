// Require node modules
const path = require("path");

// Require middleware
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes for HTML pages
module.exports = (app) => {
	// Signup
	app.get("/", (req, res) => {
		// If the user is signed in, direct to entry page
		if (req.user) {
			res.redirect("/moods-entry");
		}
		// If the user is not signed in, direct to signup page
		res.sendFile(path.join(__dirname, "../public/signup.html"));
	});

	// Login
	app.get("/login", (req, res) => {
		// If the user is signed in, direct to entry page
		if (req.user) {
			res.redirect("/moods-entry");
		}
		// If the user is not signed in, direct to login page
		res.sendFile(path.join(__dirname, "../public/login.html"));
	});

	// Entry page
	// If user is not logged in, isAuthenticated middleware redirects to signup page
	app.get("/moods-entry", isAuthenticated, (req, res) => {
		res.sendFile(path.join(__dirname, "../public/moods-entry.html"));
	});

	// View page
	// If user is not logged in, isAuthenticated middleware redirects to signup page
	app.get("/moods-view", isAuthenticated, (req, res) => {
		res.sendFile(path.join(__dirname, "../public/moods-view.html"));
	});
};
