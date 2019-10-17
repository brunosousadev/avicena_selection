const {Model, DataTypes} = require('sequelize');

class User extends Model{
    static init(sequelize){
        super.init({
            first: DataTypes.STRING,
            last: DataTypes.STRING,
        },{
            sequelize
        })
    }
}

module.exports = User;