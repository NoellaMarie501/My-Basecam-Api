module.exports = (sequelize, DataTypes) => {
    const messages = sequelize.define("Messages", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    });
    return messages;
  };
  