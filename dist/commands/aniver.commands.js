import * as waUtil from "../utils/aniversario.util.js";
import * as fs from "fs/promises";
import { showCommandConsole } from "../utils/general.util.js"; // Import para log no CMD

const ANNIVERSARY_DATA_PATH = "./storage/aniversarios_grupos.json";

async function readAnniversaryData() {
  try {
    const data = await fs.readFile(ANNIVERSARY_DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

async function writeAnniversaryData(data) {
  await fs.writeFile(ANNIVERSARY_DATA_PATH, JSON.stringify(data, null, 2));
}

export default {
  name: "aniver",
  guide: "Registra sua data de aniversário. Ex: !aniver 26/03",
  handler: async (client, message) => {
    const msg = message.messages[0];

    // Captura o texto digitado pelo usuário
    const body = msg?.message?.extendedTextMessage?.text || msg?.message?.conversation;
    const comandoDigitado = body || "";

    const parts = body?.split(" ") || [];
    const args = parts.slice(1);

    const userJid = msg?.key?.participant || msg?.key?.remoteJid;
    const groupId = msg?.key?.remoteJid;
    const senderName = msg?.pushName || userJid.split("@")[0];

    // Tenta pegar o nome do grupo via client (se possível)
    let groupName = "DESCONHECIDO";
    try {
      const groupMetadata = await client.groupMetadata(groupId);
      groupName = groupMetadata?.subject || "DESCONHECIDO";
    } catch {
      // fallback caso não consiga buscar
    }

    // Pega timestamp da mensagem em segundos
    const messageTimestamp = Math.floor(msg.messageTimestamp / 1000);

    // Log no CMD no padrão dos outros comandos (ajustado para data e nome)
    showCommandConsole(
      true,              // isGroup
      "aniver",          // categoria
      comandoDigitado,   // comando completo
      "#ff5c5c",         // cor (vermelho claro)
      messageTimestamp,  // timestamp em segundos
      senderName,        // nome do usuário
      groupName          // nome do grupo
    );

    if (!groupId.endsWith("@g.us")) {
      await waUtil.replyText(client, groupId, "Este comando só pode ser usado em grupos.", msg);
      return;
    }

    if (args.length < 1 || !args[0].match(/^\d{2}\/\d{2}$/)) {
      await waUtil.replyText(client, groupId, "Formato incorreto. Use: !aniver DD/MM", msg);
      return;
    }

    const dataAniversario = args[0];

    try {
      const allAnniversaries = await readAnniversaryData();
      const groupAnniversaries = allAnniversaries[groupId] || {};

      groupAnniversaries[userJid] = {
        name: senderName,
        birthday: dataAniversario,
      };
      allAnniversaries[groupId] = groupAnniversaries;

      await writeAnniversaryData(allAnniversaries);

      await waUtil.replyText(
        client,
        groupId,
        `🎉 ${senderName}, seu aniversário em ${dataAniversario} foi registrado com sucesso para este grupo!`,
        msg
      );
    } catch (error) {
      console.error("Erro ao registrar aniversário:", error);
      await waUtil.replyText(client, groupId, "Ocorreu um erro ao registrar seu aniversário.", msg);
    }
  },
};
