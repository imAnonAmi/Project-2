$(document).ready(function() {
	// Variables for HTML locations
	const loginForm = $("form.login");
	const emailInput = $("input#email-input");
	const passwordInput = $("input#password-input");

	// Listener for submit
	loginForm.on("submit", function(event) {
		event.preventDefault();
		const userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
		};
		// Verify that email and password have been entered
		if (!userData.email || !userData.password) {
			return;
		}
		// Call to login function
		loginUser(userData.email, userData.password);
		emailInput.val("");
		passwordInput.val("");
	});

	// Function to login user
	function loginUser(email, password) {
		// POST call to login route
		$.post("/api/login", {
			email: email,
			password: password,
		})
			// Redirect to entry page
			.then(function() {
				window.location.replace("/moods-entry");
			})
			// Handle errors
			.catch(function(err) {
				throw err;
			});
	}
});
