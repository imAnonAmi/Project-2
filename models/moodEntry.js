module.exports = function(sequelize, DataTypes) {
	// Create database model
	const MoodEntry = sequelize.define("MoodEntry", {
		date: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1],
			},
		},
		moods: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1],
		},
		journal: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1],
		},
	});
	// All entries must belong to a user
	MoodEntry.associate = function(models) {
		MoodEntry.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
			},
		});
	};

	return MoodEntry;
};
