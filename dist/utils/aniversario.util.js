import fs from 'fs';
import { getZodiacSign, getZodiacEmoji } from "./general.util.js";

const FRASES_ANIVERSARIO = [
  "Que o seu dia seja repleto de sorrisos, abraços apertados e muita alegria. Você merece o mundo! 🎉",
  "Hoje é o seu dia de brilhar ainda mais! Que o novo ano de vida seja cheio de paz, saúde e realizações. Feliz aniversário! 🎂",
  "Celebrar a sua vida é um presente para todos nós. Que a felicidade te acompanhe hoje e sempre. Parabéns! ✨",
  "Feliz aniversário! Que a vida continue te presenteando com momentos inesquecíveis e pessoas maravilhosas. 🥳",
  "Neste dia especial, celebramos a pessoa incrível que você é. Desejamos um novo ciclo cheio de amor e sucesso. 🎁",
  "Feliz aniversário! Que a vida te presenteie com muita saúde, paz e prosperidade! 💖",
  "Parabéns! Que este novo ano traga muitas novas aventuras e momentos inesquecíveis. Aproveite o seu dia! 🚀",
  "Desejo que a felicidade transborde na sua vida hoje e sempre. Que seu aniversário seja tão especial quanto você! 🎊",
  "Mais um ano, mais um capítulo na sua vida. Que ele seja o melhor de todos! Feliz aniversário! 📖",
  "Que o seu aniversário seja o início de um novo ciclo de grandes conquistas e realizações. Parabéns! 🌟",
  "Feliz aniversário! Que a sua jornada seja repleta de luz, amor e muitas bênçãos. 🕯️",
  "Hoje é dia de festejar e comemorar a sua existência. Que a alegria te contagie neste dia especial! 🎈",
  "Parabéns por mais um ano de vida! Que cada novo dia seja um presente e uma oportunidade para ser feliz. 🍀",
  "Que seu aniversário seja cheio de carinho, rodeado de quem te ama e de muita positividade. Felicidades! 🤗",
  "Feliz aniversário! Que a cada ano que passa, você se torne uma pessoa ainda mais incrível. 🥂",
  "Um brinde à sua vida e a todas as coisas maravilhosas que ainda estão por vir. Parabéns! 🍾",
  "Neste dia, celebre a sua vida e tudo o que você já conquistou. Que a felicidade seja sua constante. 😊",
  "Que a sua vida seja um jardim florido, cheio de cores e perfumes. Feliz aniversário e muitas primaveras! 🌸",
  "Parabéns! Que a alegria do seu aniversário se estenda por todos os dias do novo ano. 🌈",
  "Feliz aniversário! Que você tenha um dia mágico, cheio de surpresas e momentos felizes. ✨",
  "Desejo um ano novo repleto de realizações, superações e sonhos concretizados. Parabéns! 🎯",
  "Hoje é o seu dia! Que a vida te sorria e que você receba todo o amor que merece. Feliz aniversário! ❤️",
  "Que você celebre mais um ano de vida com a alma leve e o coração cheio de esperança. Parabéns! 🙏",
  "Feliz aniversário! Que Deus te ilumine e te abençoe em cada passo do seu novo caminho. ✨",
  "Parabéns por mais um ano de sabedoria, aprendizado e crescimento. Que venham muitos anos de vida! 🥳"
];

// Função para enviar resposta simples citando a mensagem original
export async function replyText(client, jid, text, message) {
  await client.sendMessage(jid, { text }, { quoted: message });
}

// Verifica aniversariantes do dia e envia mensagem no grupo
// Aceita "dataSimulada" e "grupoEspecifico"
export async function verificarEEnviarAniversariosDoDia(client, dataSimulada, grupoEspecifico) {
  try {
    const aniversarios = JSON.parse(fs.readFileSync('./storage/aniversarios_grupos.json', 'utf8'));

    // define data: se dataSimulada válida, usa ela; senão, usa data de hoje
    let todayDay, todayMonth;
    if (dataSimulada && /^\d{2}\/\d{2}$/.test(dataSimulada)) {
      [todayDay, todayMonth] = dataSimulada.split('/');
    } else {
      const today = new Date();
      todayDay = String(today.getDate()).padStart(2, '0');
      todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    }
    const todayDate = `${todayDay}/${todayMonth}`;

    // escolher grupos a verificar: ou todos ou apenas o específico
    const grupos = grupoEspecifico ? [grupoEspecifico] : Object.keys(aniversarios);

    for (const groupId of grupos) {
      if (!aniversarios[groupId]) continue;

      const aniversariantesHoje = [];
      for (const userId in aniversarios[groupId]) {
        const userData = aniversarios[groupId][userId];
        if (userData?.birthday === todayDate) {
          aniversariantesHoje.push({ userId, name: userData.name });
        }
      }

      if (aniversariantesHoje.length > 0) {
        let mensagem = `🎉 *Ei, Sapatonas! Hoje o grupo virou festa,temos aniversariante! Vamos comemorar em grande estilo!* 🎉\n\n`;
        const mentions = [];
        const [dia, mes] = todayDate.split('/');
        const signo = getZodiacSign(`${dia}/${mes}`);
        const emoji = getZodiacEmoji(signo);

        aniversariantesHoje.forEach(({ userId }) => {
          mentions.push(userId);
          mensagem += `🎂 Parabéns, @${userId.split('@')[0]}! ${emoji} *(${signo})*\n`;
        });

        const frase = FRASES_ANIVERSARIO[Math.floor(Math.random() * FRASES_ANIVERSARIO.length)];
        mensagem += `\n${frase}`;

        // usando sendMessage padrão do Baileys
        await client.sendMessage(groupId, { text: mensagem, mentions });
      }
    }
  } catch (err) {
    console.error('Erro ao verificar e enviar aniversários:', err);
  }
}

// =====================
// TESTE RÁPIDO SEM BOT
// =====================
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("Testando aniversários do dia...");
  const fakeClient = {
    sendMessage: async (jid, msg) => {
      console.log("Grupo:", jid);
      console.log("Mensagem:\n", msg.text);
      console.log("Mencionados:", msg.mentions);
    }
  };

  // Teste para um grupo fictício
  verificarEEnviarAniversariosDoDia(fakeClient);
}
