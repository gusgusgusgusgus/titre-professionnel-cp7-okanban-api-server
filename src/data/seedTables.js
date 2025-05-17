import { Task, List, Label } from "../models/associations.js";
import { sequelize } from "../sequelizeClient.js";

seedTables();

async function seedTables() {
  console.log("🔄 Okanban seeding started…");

  // Créer les étiquettes
  const urgentLabel = await Label.create({ name: 'Urgent', color: '#bb0000' });
  const lateLabel = await Label.create({ name: 'Retard', color: '#ff00ff' });
  const ideaLabel = await Label.create({ name: 'Idée', color: '#ffbb00' });

  // Créer les listes et les tâches (en un batch !)
  await List.bulkCreate([
    { title: 'Backlog', position: 1, tasks: [
      { name: 'Créer les routes', color: '#aabbff', position: 1 },
      { name: 'Sécuriser notre API', color: '#bb00bb', position: 2 },
    ] },

    { title: 'To do', position: 2, tasks: [
      { name: 'Faire le DDS', color: '#ffaabb', position: 1},
      { name: 'Mettre en place API', color: '#aabbff', position: 2},
      { name: 'Créer les models', color: '#aabbff', position: 3},
    ] },

    { title: 'WIP', position: 3, tasks: [
      { name: 'Créer un script pour le seeding', color: '#bbffaa', position: 1},
    ] },

    { title: 'To test', position: 4, tasks: [
      { name: 'Créer la BDD', color: '#bbffaa', position: 1},
      { name: 'Créer un script pour les tables', color: '#bbffaa', position: 2},
    ] },

    { title: 'Done', position: 5, tasks: [
      { name: 'Faire les User Stories', color: '#ffaabb', position: 1 },
      { name: 'Faire le MCD', color: '#ffaabb', position: 2 },
    ] },
  ], { include: 'tasks' });

  // Ajouter les étiquettes à quelques tâches
  await addLabelToTask('Créer la BDD', urgentLabel);
  await addLabelToTask('Créer un script pour les tables', urgentLabel);
  await addLabelToTask('Créer un script pour le seeding', urgentLabel);
  await addLabelToTask('Faire le DDS', lateLabel);
  await addLabelToTask('Sécuriser notre API', ideaLabel);

  console.log("✅ Okanban seed done with success!");

  console.log("🧹 Clean up by closing database connection");
  await sequelize.close();
}

async function addLabelToTask(taskName, labelEntity) {
  const task = await Task.findOne({ where: { name: taskName }});
  await task.addLabel(labelEntity);
}
