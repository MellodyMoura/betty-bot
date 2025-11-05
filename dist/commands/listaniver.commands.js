import * as waUtil from "../utils/aniversario.util.js";
import { getZodiacSign, getZodiacPeriod, getZodiacEmoji } from "../utils/general.util.js";
import * as fs from "fs/promises";
import chalk from "chalk";

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

export default {
  name: "listaniver",
  guide: "Exibe a lista de aniversários registrados neste grupo, organizada por signo.",
  handler: async (client, message) => {
    const msg = message.messages[0];
    const groupId = msg?.key?.remoteJid;
    const sender = msg?.key?.fromMe ? "Você mesmo" : msg?.pushName || msg?.key?.participant;

    const comandoDigitado = msg?.message?.conversation || "";

    console.log(
      chalk.cyanBright("[COMANDO]") +
      ` ${chalk.green(sender)} digitou: ${chalk.green(`"${comandoDigitado}"`)} no grupo ${chalk.green(groupId)}`
    );

    if (!groupId.endsWith("@g.us")) {
      await waUtil.replyText(client, groupId, "Este comando só pode ser usado em grupos.", msg);
      return;
    }

    try {
      // Pegando nome real do grupo
      const groupMetadata = await client.groupMetadata(groupId);
      const groupName = groupMetadata?.subject || "Grupo sem nome";

      const allAnniversaries = await readAnniversaryData();
      const aniversariosRaw = allAnniversaries[groupId] || {};
      const aniversarios = Object.values(aniversariosRaw);

      if (aniversarios.length === 0) {
        await waUtil.replyText(client, groupId, "Nenhum aniversário registrado neste grupo ainda.", msg);
        return;
      }

      let response = `🎉 *Signos e Aniversários - ${groupName}* \n\n`;
      const aniversariosPorSigno = {};

      for (const pessoa of aniversarios) {
        const [dia, mes] = pessoa.birthday.split("/").map(Number);
        const signo = getZodiacSign(`${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}`);
        if (!aniversariosPorSigno[signo]) {
          aniversariosPorSigno[signo] = [];
        }
        aniversariosPorSigno[signo].push(pessoa);
      }

      const signos = [
        "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
        "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
      ];

      for (const signo of signos) {
        if (aniversariosPorSigno[signo]) {
          aniversariosPorSigno[signo].sort((a, b) => {
            const [diaA, mesA] = a.birthday.split("/").map(Number);
            const [diaB, mesB] = b.birthday.split("/").map(Number);
            if (mesA !== mesB) return mesA - mesB;
            return diaA - diaB;
          });

          const emoji = getZodiacEmoji(signo);
          const periodo = getZodiacPeriod(signo);
          response += `*${emoji} ${signo}* - Período de ${periodo}\n`;

          aniversariosPorSigno[signo].forEach((p) => {
            response += `* ${p.birthday} - ${p.name}\n`;
          });

          response += `\n`;
        }
      }

      await waUtil.replyText(client, groupId, response, msg);
    } catch (error) {
      console.error(chalk.red("Erro ao listar aniversários:"), error);
      await waUtil.replyText(client, groupId, "Ocorreu um erro ao listar os aniversários.", msg);
    }
  },
};
