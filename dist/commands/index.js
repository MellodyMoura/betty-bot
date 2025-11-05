import aniver from "./aniver.commands.js";
import listaniver from "./listaniver.commands.js";

export const commands = {
  [aniver.name]: aniver,
  [listaniver.name]: listaniver,
};

// 👇 Esta constante agrupa os comandos de "aniversário"
export const aniversarioCommands = {
  [aniver.name]: aniver,
  [listaniver.name]: listaniver,
};
