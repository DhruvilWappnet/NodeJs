module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        isNumeric: {
          msg: "Invalid PostId"
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active', 'Deleted'),
      defaultValue: 'Active',
      allowNull: false,
      validate: {
        isIn: {
          args: [['Active', 'Deleted']],
          msg: "Must be Active or Deleted"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Invalid userId"
        }
      }
    },
    filepath:{
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'Posts'
  });

  return Post;
}