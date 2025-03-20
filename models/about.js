const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./users")

class About extends Model {}

About.init(
  {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate:{
            isUUID: 4,  
        }
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true,
      }
     
    },
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: 'About',  
    updatedAt: 'updateTimestamp',  
     
  });

//one to one-> user -- About
User.hasOne(About);
About.belongsTo(User);
module.exports = About;
  