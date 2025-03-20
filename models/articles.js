const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./users")
 
class Article extends Model {}

Article.init(
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
   
  },
  {
    // Other model options go here
    sequelize, 
    modelName: 'Article',  
    updatedAt: 'updateTimestamp',   
  });


module.exports = Article;

//one to many -> user -- articles
User.hasMany(Article,{
  foreignKey:{
    type:DataTypes.UUID,
    allowNull:false
  }
});

Article.belongsTo(User);

  