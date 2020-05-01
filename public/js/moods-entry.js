$(document).ready(function() {
	// When page opens
	// Get user info and add email and ID to page
	$.get("/api/user_data").then(function(data) {
		$(".user-name").text(data.email);
		$("#user").val(data.id);
	});

	// Calender
	$("#calendar").calendar({
		type: "date",
	});

	// Mood Sliders
	// Slider position sets title of range
	$(".ui.modal").modal("show");
	$(".range").range({
		min: 0,
		max: 9,
		start: 0,
		labelType: "letter",
		onChange: function(value) {
			// Clear "active" class from all labels
			let labelArray = $(this).find(".label");
			labelArray.each((i, label) => {
				$(label).attr("class", "label hide");
			});
			if (value > 0 && value < 9) {
				// Set "active" class for new slider position
				let index = value - 1;
				let activeLabel = $(this).find(".label:eq( " + index + " )");
				activeLabel.attr("class", "label");
				// Set active mood describer to title of range
				let activeDescriber = labelArray[index].innerText;
				let thisRange = $(this)[0].id;
				$("#" + thisRange).attr("title", activeDescriber);
			}
		},
	});

	// Event listener for submitting moods entry
	$("#mood-form").on("submit", handleFormSubmit);

	// When mood entry form is submitted
	function handleFormSubmit(event) {
		event.preventDefault();

		// Create mood string
		let moodString = "";
		$(".emotion").each(function() {
			// If mood is selected
			if (
				$(this)
					.find('input[type="checkbox"]')
					.is(":checked")
			) {
				// Get mood from title of range
				const thisRange = $(this).find(".range")[0].id;
				const describer = $("#" + thisRange).attr("title");
				// Add mood to string
				moodString += describer;
				moodString += ", ";
			}
		});

		// Create new moodEntry object
		const newMoodEntry = {
			UserId: $("#user").val(),
			date: $("#entry-date").val(),
			moods: moodString,
			journal: $("#journal")
				.val()
				.trim(),
		};

		// Validate for mandatory entries
		if (!newMoodEntry.UserId || !newMoodEntry.date || !newMoodEntry.moods) {
			$("#alert").text("You must choose a mood. And don't forget the date!");
			$("#alert").fadeIn(500);
			return;
		}

		// Call function to submit entry to database
		submitEntry(newMoodEntry);
	}

	// Post call to entry route, redirect to view page
	function submitEntry(moodEntry) {
		$.post("/api/moods-entry", moodEntry, function() {
			window.location.href = "/moods-view";
		});
	}
});
