import { Task, List, Label } from "../models/associations.js";
import { sequelize } from "../sequelizeClient.js";

createTables();

async function createTables() {
  console.log("🔄 Okanban tables creation started…");

  console.log("\t- Dropping existing tables first");
  // Attention à l'ordre des suppressions pour les contraintes de clés étrangères
  await sequelize.getQueryInterface().dropTable('categorise', { cascade: true });
  await sequelize.getQueryInterface().dropTable('task_has_label', { cascade: true });
  await Task.drop({ cascade: true });
  await Label.drop({ cascade: true });
  await List.drop({ cascade: true });

  console.log("\t- Creating new tables");
  await List.sync();
  await Label.sync();
  await Task.sync();
  // Crée la table de jointure pour la relation Many-to-Many
  await sequelize.getQueryInterface().createTable('categorise', {
    id_task: {
      type: 'INTEGER',
      allowNull: false,
      references: {
        model: 'task',
        key: 'id_task'
      },
      onDelete: 'CASCADE'
    },
    id_label: {
      type: 'INTEGER',
      allowNull: false,
      references: {
        model: 'label',
        key: 'id_label'
      },
      onDelete: 'CASCADE'
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  console.log("✅ Okanban tables created with success !");

  console.log("🧹 Clean up by closing database connexion\n");
  await sequelize.close();
}