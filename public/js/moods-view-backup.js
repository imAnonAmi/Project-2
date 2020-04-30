$(document).ready(function() {
	// When page opens
	// get user from previous page
	// let url = window.location.search;
	let userId;

	// get info on user that is logged in and set as userId
	$.get("/api/user_data").then(function(data) {
		userId = data.id;
	});

	// Inital view of page shows all entries from logged in user
	getEntries(userId);

	// Event listener to show all entries from all users
	$("#all-users").on("click", getEntries);

	// Function to get entries from database and display on page
	function getEntries(user) {
		userId = user || "";
		// if a user is specified only get entries from that user
		if (userId) {
			userId = "/?user_id=" + userId;
		}
		$.get("/api/moods-view" + userId, (entries) => {
			if (!entries || !entries.length) {
				// displayEmpty();
			} else {
        moodJournal(entries);
				moodCloud(entries);
			}
		});
	}

	// Function to display user journal
	function moodJournal(entries) {
		entries.forEach((entry) => {
			// Create row or card for each entry

		console.log(entry);

		let entryUserId = entry.UserId;
		let entryDate = entry.date;
		let entryId = entry.id;
		let entryJournal = entry.journal;
		let entryMoods = entry.moods;
		
		let newEntryBtn =
			'<div class="entryBtn panel-block" style=" id="' +
			entryId +
			'"><p id="entryDate">Date: ' +
			entryDate +
			'</p><p id="entryJournal">Journal: ' +
			entryJournal +
			'</p><p id="entryMoods">Moods: ' +
			entryMoods +
			"</p><br></div>";
		$("#entryList").append(newEntryBtn);
		$("#entryList")
			.parent()
			.show();	
		});
	}

	// Function to display moods as word cloud
	function moodCloud(entries) {
		// create string from all moods in entries
		let moodString = "";
		entries.forEach((entry) => {
			moodString += entry.moods;
			moodString += " ";
		});
		// send moods to WordCloud API and get back mood cloud
		console.log("API string: " + moodString);
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
					throw err;
				});
	}
});
