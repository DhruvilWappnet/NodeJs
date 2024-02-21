module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Invalid email format'
                }
            }
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Phone must be numeric'
                }
            }
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
        }
    }, {
        timestamps: true,
        tableName: 'Users'
    });
    return User;
}

// When you want to perform a soft delete, you update the status field of the record to 'Deleted' instead of physically deleting the record from     the database.
// When you want to perform a hard delete, you can use Sequelize's destroy method, which will physically delete the record from the database.