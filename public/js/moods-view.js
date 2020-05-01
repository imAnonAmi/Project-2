$(document).ready(function() {
	// When page opens
	// Get user ID from previous page
	let userId;
	$.get("/api/user_data")
		.then(function(data) {
			userId = data.id;
		})
		// Get all user entries
		.then(() => {
			getEntries(userId);
		});

	// Function to get entries from database and display on page
	function getEntries(user) {
		userId = user || "";
		// if a user is specified only get entries from that user
		if (userId) {
			userId = "/?user_id=" + userId;
		}
		// GET call to view route
		$.get("/api/moods-view" + userId, (entries) => {
			moodJournal(entries);
			moodCloud(entries);
		});
	}

	// Function to display user journal
	function moodJournal(entries) {
		// Display message if there are no entries
		if (!entries || !entries.length) {
			let noEntries = '<div class="item">No entries!</div>';
			$("#entryList").append(noEntries);
		}
		// Create a card for each entry
		else {
			entries.forEach((entry) => {
				// let entryUserId = entry.UserId;
				let entryDate = entry.date;
				let entryId = entry.id;
				let entryJournal = entry.journal;
				let entryMoods = entry.moods;

				let newEntryCard =
					'<div class="item" id="' +
					entryId +
					'"><div class="content"><div class="header" id="entryDate"><b>Date: </b>' +
					entryDate +
					'</div><div class="item" id="entryMoods"><b>Moods: </b>' +
					entryMoods +
					'</div><div class="item" id="entryJournal"><b>Journal: </b>' +
					entryJournal +
					"</div></div></div><br>";
				$("#entryList").append(newEntryCard);
				$("#entryList")
					.parent()
					.show();
			});
		}
	}

	// Function to display moods as word cloud
	function moodCloud(entries) {
		// Create string from all moods in entries
		let moodString = "";
		entries.forEach((entry) => {
			moodString += entry.moods;
			moodString += " ";
		});
		// Send moods to WordCloud API and get back mood cloud
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
				colors: ["#453c6a", "#84ACCE", "#EA847E", "#a63e79", "#54C6AE"],
				font: "Comfortaa",
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
				throw err;
			});
	}
});
