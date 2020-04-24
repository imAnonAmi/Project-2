$(document).ready(function() {
	// When page opens
	// get info on user that is logged in and add to page
	$.get("/api/user_data").then(function(data) {
		$(".member-name").text(data.email);
		$("#author").val(data.id);
	});

	// Event listener for submitting moods entry
	$("#mood-form").on("submit", handleFormSubmit());

	// When mood entry form is submitted
	function handleFormSubmit(event) {
		event.preventDefault();
		// Validate fields ???

		// create mood string
		let moodString = "";
		// for each emotion
		$("fieldset.emotion").each(() => {
			// if box is checked
			if (
				$(this)
					.children('input[type="checkbox"]')
					.is(":checked")
			) {
				// set describer word based on position of slider
				const describer = $(this).find("li.active").innerText;
				// add describer value to mood string
				moodString += describer;
				// add space between describer words
				moodString += " ";
			}
		});

		// create new moodEntry object
		const newMoodEntry = {
			// this is logged in user
			authorID: $("#author").val(),
			// date might not be a value ???
			date: $("#entry-date").val(),
			moods: moodString,
			journal: $("#journal")
				.val()
				.trim(),
		};

		// if (updating) {
		// 	newEntry.id = entryID;
		// 	updateEntry(newMoodEntry);
		// } else {
		submitEntry(newMoodEntry);
		// }
	}

	// Submit new moods-entry and redirect to moods-view page
	function submitEntry(moodEntry) {
		$.post("/api/moods-entry", moodEntry, function() {
			window.location.href = "/moods-view";
		});
	}

	// Update previous moods-entry and redirect??
	// function updateEntry(moodEntry) {}
});
