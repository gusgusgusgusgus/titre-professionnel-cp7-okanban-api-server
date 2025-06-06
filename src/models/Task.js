import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelizeClient.js";

export class Task extends Model {}

Task.init({
  id_task: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  color: {
    // Je vais utiliser des codes hexadecimaux pour les couleurs, donc 7 caractères max
    // Je vais dire à Sequelize de typer le champs en string avec une limite de 7 caractères:
    type: DataTypes.STRING(7),
  },
  id_list: { // clé étrangère vers List
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "list",
      key: "id_list"
    }
  }
}, {
  sequelize,
  modelName: "Task",
  tableName: "task"
});
