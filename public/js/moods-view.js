$(document).ready(function() {
	// When page opens
	// get user from previous page
	let url = window.location.search;
	let userId;

	userId = url.split("=")[1];
	getEntries(userId);

	// This function grabs posts from the database and updates the view
	function getEntries(user) {
		userId = user || "";
		if (userId) {
			userId = "/?user_id=" + userId;
		}
		$.get("/api/posts" + userId, (data) => {
			let entries = data;
			if (!entries || !entries.length) {
				alert("No entries!");
			} else {
				alert("Here are your entries.");
			}
		});
	}
});
