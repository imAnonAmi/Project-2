$(document).ready(function() {
	// When page opens
	// get user from previous page
	let url = window.location.search;
	let userId;

	userId = url.split("=")[1];
	getEntries(userId);

	// Function to get entries from database and display on page
	function getEntries(user) {
		userId = user || "";
		if (userId) {
			userId = "/?user_id=" + userId;
		}
		$.get("/api/moods" + userId, (data) => {
			if (!data || !data.length) {
				alert("No entries!");
			} else {
				// create string from all data.moods entries
				let moodString = "";
				// send to moodCloud function
				moodCloud(moodString);
			}
		});
	}

	// Function to display moods as word cloud
	function moodCloud(moodString) {
		fetch("https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud", {
			method: "POST",
			headers: {
				"x-rapidapi-host": "textvis-word-cloud-v1.p.rapidapi.com",
				"x-rapidapi-key": "442fbf0644mshed26ef444ee0de1p1dbed6jsn2dec5654b644",
				"content-type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({
				text: moodString,
				scale: 1,
				width: 800,
				height: 800,
				colors: ["#375E97", "#FB6542", "#FFBB00", "#3F681C"],
				font: "Tahoma",
				use_stopwords: true,
				language: "en",
				uppercase: false,
			}),
		})
			.then((response) => {
				return response.text();
			})
			.then((wordCloud) => {
				var img = document.getElementById("wordCloud");
				img.src = wordCloud;
				img.height = 800;
				img.width = 800;
			})
			.catch((err) => {
				console.log(err);
			});
	}
});
