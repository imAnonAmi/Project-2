module.exports = function(sequelize, DataTypes) {
  
	const MoodEntry = sequelize.define("MoodEntry", {
		// create database model
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          moods: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
          },
          journal: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
          },

	});

	MoodEntry.associate = function(models) {
	// 	// We're saying that a Post should belong to an Author
	// 	// A Post can't be created without an Author due to the foreign key constraint
		MoodEntry.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
			},
		});
	};

	return MoodEntry;
};
