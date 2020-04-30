$(document).ready(function() {
	// When page opens
	// get info on user that is logged in and add to page
	$.get("/api/user_data").then(function(data) {
		$(".member-name").text(data.email);
		$("#author").val(data.id);
	});

	//calender
	$("#example2").calendar({
		type: "date",
	});

	//slider nightmare
	$(".ui.modal").modal("show");

	$(".range").range({
		min: 0,
		max: 9,
		start: 0,
		labelType: "letter",
		onChange: function(value) {
			let labelArray = $(this).find(".label");
			if (value > 0 && value < 9) {
				let activeLabel = labelArray[value - 1].innerText;
				let thisRange = $(this)[0].id;
				$("#" + thisRange).attr("title", activeLabel);
			}
		},
	});

	// Event listener for submitting moods entry
	$("#mood-form").on("submit", handleFormSubmit);

	// When mood entry form is submitted
	function handleFormSubmit(event) {
		event.preventDefault();
		// Validate fields ???

		// create mood string
		let moodString = "";
		// for each emotion
		$(".emotion").each(function() {
			// if checkbox is checked
			if (
				$(this)
					.find('input[type="checkbox"]')
					.is(":checked")
			) {
				// set describer word based on position of slider
				const thisRange = $(this).find(".range")[0].id;
				const describer = $("#" + thisRange).attr("title");
				// add describer value to mood string
				moodString += describer;
				// add comma and space between describer words
				moodString += ", ";
			}
		});

		// create new moodEntry object
		const newMoodEntry = {
			// this is logged in user
			UserId: $("#author").val(),
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
