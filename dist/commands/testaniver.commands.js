import { verificarEEnviarAniversariosDoDia } from "../utils/aniversario.util.js";
import { showCommandConsole } from "../utils/general.util.js";
import chalk from "chalk";

export default {
  name: "testaniver",
  guide: "Testa o disparo de aniversários (opcional: !testaniver DD/MM para simular uma data).",
  handler: async (client, message) => {
    const msg = message.messages[0];
    const groupId = msg?.key?.remoteJid;
    const sender = msg?.key?.fromMe ? "Você mesmo" : msg?.pushName || msg?.key?.participant;

    // texto digitado e argumento opcional DD/MM
    const body = msg?.message?.extendedTextMessage?.text || msg?.message?.conversation || "";
    const parts = body.trim().split(/\s+/);
    const dataSimulada = parts[1]; // pode ser undefined

    // log no terminal
    console.log(
      chalk.cyanBright("[COMANDO]") +
      ` ${chalk.yellow(sender)} digitou: ${chalk.green(`"${body || "!testaniver"}"`)} no grupo ${chalk.magenta(groupId)}`
    );

    if (!groupId?.endsWith("@g.us")) {
      await client.sendMessage(groupId, { text: "Este comando só pode ser usado em grupos." }, { quoted: msg });
      return;
    }

    try {
      showCommandConsole(true, "ANIVERSÁRIOS", "!testaniver", "#00b894", msg?.messageTimestamp, sender, groupId);

      // chama apenas para o grupo atual
      await verificarEEnviarAniversariosDoDia(client, dataSimulada, groupId);

      await client.sendMessage(groupId, { text: `✅ Teste executado${dataSimulada ? ` para ${dataSimulada}` : ""}.` }, { quoted: msg });
    } catch (err) {
      console.error(chalk.red("Erro ao executar !testaniver:"), err);
      await client.sendMessage(groupId, { text: "❌ Erro ao testar aniversários." }, { quoted: msg });
    }
  },
};
