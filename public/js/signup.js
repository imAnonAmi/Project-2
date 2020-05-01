$(document).ready(function() {
	// Variables for HTML locations
	const signUpForm = $("form.signup");
	const emailInput = $("input#email-input");
	const passwordInput = $("input#password-input");

	// Listener for submit
	signUpForm.on("submit", function(event) {
		event.preventDefault();
		const userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
		};
		// Verify that email and password have been entered
		if (!userData.email || !userData.password) {
			return;
		}
		// Call to signup function
		signUpUser(userData.email, userData.password);
		// Clear form
		emailInput.val("");
		passwordInput.val("");
	});

	// Function to signup user
	function signUpUser(email, password) {
		// POST call to signup route
		$.post("/api/signup", {
			email: email,
			password: password,
		})
			// Redirect to entry page
			.then(() => {
				window.location.replace("/moods-entry");
			})
			// Handle errors
			.catch(handleLoginErr);
	}

	// Function to display error message
	function handleLoginErr(err) {
		let error = JSON.parse(err.responseText);
		$("#alert").text(error.errors[0].message);
		$("#alert").fadeIn(500);
	}
});
