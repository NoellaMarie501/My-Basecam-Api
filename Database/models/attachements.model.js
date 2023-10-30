module.exports = (sequelize, DataTypes) => {
    const attachments = sequelize.define("Attachments", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    return attachments;
  };
  