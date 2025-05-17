import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelizeClient.js";

export class List extends Model {}

List.init(
	{
		id_list: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		position: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
	},
	{
		sequelize,
		modelName: "List",
		tableName: "list",
	},
);
