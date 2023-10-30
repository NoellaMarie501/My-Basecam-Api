module.exports = (sequelize, DataTypes) => {
    const threads = sequelize.define("Threads", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  
    return threads;
  };
  