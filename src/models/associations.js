import { List } from "./List.js";
import { Task } from "./Task.js";
import { Label } from "./Label.js";

// Association List- Task : One-to-Many
List.hasMany(Task, { as: "tasks", foreignKey: "id_list" });
Task.belongsTo(List, { as: "list", foreignKey: "id_list" });

// Association Task - Label : Many-to-Many
Task.belongsToMany(Label, {
  through: "categorise",
  as: "labels",
  foreignKey: "id_task",
  otherKey: "id_label"
});

Label.belongsToMany(Task, {
  through: "categorise",
  as: "tasks",
  foreignKey: "id_label",
  otherKey: "id_task"
});

export { List, Task, Label };
