// Importa os comandos de cada arquivo
import { aniversarioCommands as aniverCommands } from './aniver.commands.js';
import { listaniverCommands } from './listaniver.commands.js';  // Ajuste se o nome da exportação for diferente

// Junta todos os comandos num único objeto
export const commands = {
  ...aniverCommands,
  ...listaniverCommands,
};
