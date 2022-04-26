const { DataTypes } = require('sequelize');
const { mapWhereFieldNames } = require('sequelize/types/utils');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    ID:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    usuario:{
     type:DataTypes.STRING,
      allowNull:false
    },
    pass:{
      type:DataTypes.STRING,
      allowNull:false 
    },
    /*subscription:{
      type: datatypes.UUID
      allowNull:true
    },*/
    favorite:{
      type:DataTypes.ARRAY(DataTypes.UUID)
    }


  });
};


