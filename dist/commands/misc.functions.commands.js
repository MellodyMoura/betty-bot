import { funnyRandomPhrases } from '../utils/misc.util.js';
import * as waUtil from '../utils/whatsapp.util.js';
import { buildText, messageErrorCommandUsage, uppercaseFirst } from "../utils/general.util.js";
import botTexts from "../helpers/bot.texts.helper.js";
import miscCommands from "./misc.list.commands.js";
import { GroupController } from "../controllers/group.controller.js";
import path from 'path';
export async function sorteioCommand(client, botInfo, message, group) {
    if (!message.args.length) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }
    const chosenNumber = Number(message.text_command);
    if (!chosenNumber || chosenNumber <= 1) {
        throw new Error(miscCommands.sorteio.msgs.error_invalid_value);
    }
    const randomNumber = Math.floor(Math.random() * chosenNumber) + 1;
    const replyText = buildText(miscCommands.sorteio.msgs.reply, randomNumber);
    await waUtil.replyText(client, message.chat_id, replyText, message.wa_message, { expiration: message.expiration });
}
export async function sorteiomembroCommand(client, botInfo, message, group) {
    const groupController = new GroupController();
    if (!message.isGroupMsg || !group) {
        throw new Error(botTexts.permission.group);
    }
    const currentParticipantsIds = await groupController.getParticipantsIds(group.id);
    const randomParticipant = currentParticipantsIds[Math.floor(Math.random() * currentParticipantsIds.length)];
    const replyText = buildText(miscCommands.sorteiomembro.msgs.reply, waUtil.removeWhatsappSuffix(randomParticipant));
    await waUtil.replyWithMentions(client, message.chat_id, replyText, [randomParticipant], message.wa_message, { expiration: message.expiration });
}
export async function mascoteCommand(client, botInfo, message, group) {
    const imagePath = path.resolve('dist/media/mascote.png');
    await waUtil.replyFile(client, message.chat_id, 'imageMessage', imagePath, 'WhatsApp Jr.', message.wa_message, { expiration: message.expiration });
}
/*
export async function simiCommand(client: WASocket, botInfo: Bot, message: Message, group? : Group){
    const miscCommands = commandsMisc(botInfo)

    if (!message.args.length) throw new Error(messageErrorCommandUsage(botInfo.prefix, message))

    const simiResult = await miscLib.simSimi(message.text_command)
    const replyText = buildText(miscCommands.simi.msgs.reply, timestampToDate(Date.now()), simiResult)
    await waUtil.replyText(client, message.chat_id, replyText, message.wa_message, {expiration: message.expiration})
}*/
export async function sapatometroCommand(client, botInfo, message, group) {
    if (!message.isGroupMsg) {
        throw new Error(botTexts.permission.group);
    } else if (!message.isQuoted && !message.mentioned.length) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    } else if (message.mentioned.length > 1) {
        throw new Error(miscCommands.sapatometro.msgs.error_mention);
    }

    const frasesEngracadas = [
  "Camisa xadrez equipada e emocional instável 😵‍💫👕🪓",
  "Já se apaixonou por uma geminiana em 2 stories ♊📱💘",
  "Sapa que chora ouvindo Ana Carolina no banho 🚿😭🎶",
  "Mudou de cidade pra morar com a crush que conheceu semana passada 🚛💨💍",
  "Já terminou 3 vezes e voltou 4 com a mesma ex 🔁💔🔂",
  "Tem três gatas e chama de filhas 🐈🐈🐈❤️",
  "Pediu o mapa astral no primeiro match 🔮🌌📲",
  "Trator sem freio e com playlist romântica 🛻🎧💖",
  "Vai casar depois do segundo encontro 👰‍♀️📅💍",
  "Sapatão raiz: usa crocs e flanela com orgulho 🧼👢🧣",
  "Gêmeos? Tá ferrada. Mas vai assim mesmo 💫♊🔥",
  "Seu tipo ideal: ex-namorada ♻️💘😬",
  "Perfil no Tinder: ‘só amizade’ (mentira) 🔥📱🙄",
  "Tem crush em pelo menos 2 amigas 😏👭💕",
  "Mística, intensa e emocionalmente caótica 🌙💫💥",
  "É romântica, mas diz que não quer nada sério 💌😅🫣",
  "Drama? Só se for com voz de MPB ao fundo 🎭🎙️🎶",
  "Seu U-Haul já tá com o motor ligado 🚚💨🔑",
  "Já pediu namoro com PowerPoint 😅💻💍",
  "Se depender dela, a ex volta sim 🫦🔁💔",
  "Tem kit churrasco e terno no porta-malas 🧢🥩👔",
  "Bebe litrão falando mal da ex mas chora ouvindo Ana Carolina 🍻😭🎶",
  "Trator sem freio na descida 💅",
  "Mais sapatão que reunião do fãClube da Cássia Eller 🎤🌈",
  "Corta cabelo na lua cheia e ainda leva a crush 🌕✂️💘"
];


    const nivel = Math.floor(Math.random() * 101); // número entre 0 e 100
    const fraseAleatoria = frasesEngracadas[Math.floor(Math.random() * frasesEngracadas.length)];
    const messageToReply = (message.quotedMessage && message.mentioned.length != 1)
        ? message.quotedMessage?.wa_message
        : message.wa_message;

    const resposta = `👩‍❤️‍👩 *Sapatômetro Ativado!*\n\n` +
                     `Detectamos seu nível de sapatonisse em *${nivel}%* 🌈\n\n` +
                     `_${fraseAleatoria}_`;

    await waUtil.replyText(client, message.chat_id, resposta, messageToReply, { expiration: message.expiration });
}

export async function detectorCommand(client, botInfo, message, group) {
    if (!message.isGroupMsg) {
        throw new Error(botTexts.permission.group);
    }
    else if (!message.isQuoted) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }
    const quotedMessage = message.quotedMessage?.wa_message;
    if (!quotedMessage) {
        throw new Error(miscCommands.detector.msgs.error_message);
    }
    const imagePathCalibration = path.resolve('dist/media/calibrando.png');
    const imagePathsResult = [
        path.resolve('dist/media/estressealto.png'),
        path.resolve('dist/media/incerteza.png'),
        path.resolve('dist/media/kao.png'),
        path.resolve('dist/media/meengana.png'),
        path.resolve('dist/media/mentiroso.png'),
        path.resolve('dist/media/vaipra.png'),
        path.resolve('dist/media/verdade.png')
    ];
    const randomIndex = Math.floor(Math.random() * imagePathsResult.length);
    const waitReply = miscCommands.detector.msgs.wait;
    await waUtil.replyFile(client, message.chat_id, 'imageMessage', imagePathCalibration, waitReply, quotedMessage, { expiration: message.expiration });
    await waUtil.replyFile(client, message.chat_id, 'imageMessage', imagePathsResult[randomIndex], '', quotedMessage, { expiration: message.expiration });
}
export async function roletarussaCommand(client, botInfo, message, group) {
    const bulletPosition = Math.floor(Math.random() * 6) + 1;
    const currentPosition = Math.floor(Math.random() * 6) + 1;
    const hasShooted = (bulletPosition == currentPosition);
    let replyText;
    if (hasShooted) {
        replyText = miscCommands.roletarussa.msgs.reply_dead;
    }
    else {
        replyText = miscCommands.roletarussa.msgs.reply_alive;
    }
    await waUtil.replyText(client, message.chat_id, replyText, message.wa_message, { expiration: message.expiration });
}
export async function casalCommand(client, botInfo, message, group) {
    const groupController = new GroupController();
    if (!message.isGroupMsg || !group) {
        throw new Error(botTexts.permission.group);
    }
    let currentParticipantsIds = await groupController.getParticipantsIds(group.id);
    if (currentParticipantsIds && currentParticipantsIds.length < 2) {
        throw new Error(miscCommands.casal.msgs.error);
    }
    let randomIndex = Math.floor(Math.random() * currentParticipantsIds.length);
    let chosenParticipant1 = currentParticipantsIds[randomIndex];
    currentParticipantsIds.splice(randomIndex, 1);
    randomIndex = Math.floor(Math.random() * currentParticipantsIds.length);
    let chosenParticipant2 = currentParticipantsIds[randomIndex];
    let replyText = buildText(miscCommands.casal.msgs.reply, waUtil.removeWhatsappSuffix(chosenParticipant1), waUtil.removeWhatsappSuffix(chosenParticipant2));
    await waUtil.sendTextWithMentions(client, message.chat_id, replyText, [chosenParticipant1, chosenParticipant2], { expiration: message.expiration });
}
export async function caracoroaCommand(client, botInfo, message, group) {
    const coinSides = ['cara', 'coroa'];
    const userChoice = message.text_command.toLowerCase();
    if (!message.args.length || !coinSides.includes(userChoice)) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }
    const chosenSide = coinSides[Math.floor(Math.random() * coinSides.length)];
    const imagePath = chosenSide === 'cara' ? path.resolve('dist/media/cara.png') : path.resolve('dist/media/coroa.png');
    const waitText = miscCommands.caracoroa.msgs.wait;
    await waUtil.replyText(client, message.chat_id, waitText, message.wa_message, { expiration: message.expiration });
    const isUserVictory = chosenSide == userChoice;
    let replyText;
    if (isUserVictory) {
        replyText = buildText(miscCommands.caracoroa.msgs.reply_victory, uppercaseFirst(chosenSide));
    }
    else {
        replyText = buildText(miscCommands.caracoroa.msgs.reply_defeat, uppercaseFirst(chosenSide));
    }
    await waUtil.replyFile(client, message.chat_id, 'imageMessage', imagePath, replyText, message.wa_message, { expiration: message.expiration });
}
export async function pptCommand(client, botInfo, message, group) {
    const validChoices = ["pedra", "papel", "tesoura"];
    const userChoice = message.text_command.toLocaleLowerCase();
    const randomIndex = Math.floor(Math.random() * validChoices.length);
    if (!message.args.length || !validChoices.includes(userChoice)) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }
    let botChoice = validChoices[randomIndex];
    let botIconChoice;
    let userIconChoice;
    let isUserVictory;
    if (botChoice == "pedra") {
        botIconChoice = "✊";
        if (userChoice == "pedra")
            userIconChoice = "✊";
        else if (userChoice == "tesoura")
            isUserVictory = false, userIconChoice = "✌️";
        else
            isUserVictory = true, userIconChoice = "✋";
    }
    else if (botChoice == "papel") {
        botIconChoice = "✋";
        if (userChoice == "pedra")
            isUserVictory = false, userIconChoice = "✊";
        else if (userChoice == "tesoura")
            isUserVictory = true, userIconChoice = "✌️";
        else
            userIconChoice = "✋";
    }
    else {
        botIconChoice = "✌️";
        if (userChoice == "pedra")
            isUserVictory = true, userIconChoice = "✊";
        else if (userChoice == "tesoura")
            userIconChoice = "✌️";
        else
            isUserVictory = false, userIconChoice = "✋";
    }
    let replyText;
    if (isUserVictory === true) {
        replyText = buildText(miscCommands.ppt.msgs.reply_victory, userIconChoice, botIconChoice);
    }
    else if (isUserVictory === false) {
        replyText = buildText(miscCommands.ppt.msgs.reply_defeat, userIconChoice, botIconChoice);
    }
    else {
        replyText = buildText(miscCommands.ppt.msgs.reply_draw, userIconChoice, botIconChoice);
    }
    await waUtil.replyText(client, message.chat_id, replyText, message.wa_message, { expiration: message.expiration });
}
export async function gadometroCommand(client, botInfo, message, group) {
    if (!message.isGroupMsg || !group) {
        throw new Error(botTexts.permission.group);
    }
    else if (!message.isQuoted && !message.mentioned.length) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }
    else if (message.mentioned.length > 1) {
        throw new Error(miscCommands.gadometro.msgs.error_mention);
    }
    const randomNumber = Math.floor(Math.random() * 100);
    const messageToReply = (message.quotedMessage && message.mentioned.length != 1) ? message.quotedMessage?.wa_message : message.wa_message;
    const replyText = buildText(miscCommands.gadometro.msgs.reply, randomNumber);
    await waUtil.replyText(client, message.chat_id, replyText, messageToReply, { expiration: message.expiration });
}
export async function bafometroCommand(client, botInfo, message, group) {
    if (!message.isGroupMsg || !group) {
        throw new Error(botTexts.permission.group);
    }
    else if (!message.isQuoted && !message.mentioned.length) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }
    else if (message.mentioned.length > 1) {
        throw new Error(miscCommands.bafometro.msgs.error_mention);
    }
    const randomNumber = Math.floor(Math.random() * 100);
    const messageToReply = (message.quotedMessage && message.mentioned.length != 1) ? message.quotedMessage?.wa_message : message.wa_message;
    const replyText = buildText(miscCommands.bafometro.msgs.reply, randomNumber);
    await waUtil.replyText(client, message.chat_id, replyText, messageToReply, { expiration: message.expiration });
}
export async function top5Command(client, botInfo, message, group) {
    const groupController = new GroupController();
    if (!message.isGroupMsg || !group) {
        throw new Error(botTexts.permission.group);
    }
    else if (!message.args.length) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }
    let rankingTheme = message.text_command;
    let currentParticipantsIds = await groupController.getParticipantsIds(group.id);
    if (currentParticipantsIds.length < 5) {
        throw new Error(miscCommands.top5.msgs.error_members);
    }
    let replyText = buildText(miscCommands.top5.msgs.reply_title, rankingTheme);
    let mentionList = [];
    for (let i = 1; i <= 5; i++) {
        let icon;
        switch (i) {
            case 1:
                icon = '🥇';
                break;
            case 2:
                icon = '🥈';
                break;
            case 3:
                icon = '🥉';
                break;
            default:
                icon = '';
        }
        let randomIndex = Math.floor(Math.random() * currentParticipantsIds.length);
        let chosenParticipant = currentParticipantsIds[randomIndex];
        replyText += buildText(miscCommands.top5.msgs.reply_item, icon, i, waUtil.removeWhatsappSuffix(chosenParticipant));
        mentionList.push(chosenParticipant);
        currentParticipantsIds.splice(currentParticipantsIds.indexOf(chosenParticipant), 1);
    }
    await waUtil.sendTextWithMentions(client, message.chat_id, replyText, mentionList, { expiration: message.expiration });
}
export async function parCommand(client, botInfo, message, group) {
    if (!message.isGroupMsg || !group) {
        throw new Error(botTexts.permission.group);
    }
    else if (message.mentioned.length !== 2) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }
    const randomNumber = Math.floor(Math.random() * 100);
    let replyText = buildText(miscCommands.par.msgs.reply, waUtil.removeWhatsappSuffix(message.mentioned[0]), waUtil.removeWhatsappSuffix(message.mentioned[1]), randomNumber);
    await waUtil.sendTextWithMentions(client, message.chat_id, replyText, message.mentioned, { expiration: message.expiration });
}
export async function chanceCommand(client, botInfo, message, group) {
    if (!message.args.length) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }
    const randomNumber = Math.floor(Math.random() * 100);
    const replyText = buildText(miscCommands.chance.msgs.reply, randomNumber, message.text_command);
    const messageToReply = (message.isQuoted && message.quotedMessage) ? message.quotedMessage?.wa_message : message.wa_message;
    await waUtil.replyText(client, message.chat_id, replyText, messageToReply, { expiration: message.expiration });
}
export async function fraseCommand(client, botInfo, message, group) {
    const phraseResult = await funnyRandomPhrases();
    const replyText = buildText(miscCommands.frase.msgs.reply, phraseResult);
    const imagePath = path.resolve('dist/media/frasewhatsappjr.png');
    await waUtil.replyFile(client, message.chat_id, 'imageMessage', imagePath, replyText, message.wa_message, { expiration: message.expiration });
}
export async function marmitaCommand(client, botInfo, message, group) {
    const groupController = new GroupController();

    if (!message.isGroupMsg || !group) {
        throw new Error(botTexts.permission.group);
    }

    const mentioned = message.mentioned;
    if (mentioned.length !== 2) {
        throw new Error(messageErrorCommandUsage(botInfo.prefix, message));
    }

    const participantes = await groupController.getParticipantsIds(group.id);
    const membrosElegiveis = participantes.filter(
        id => !mentioned.includes(id)
    );

    if (membrosElegiveis.length === 0) {
        throw new Error("Não há marmitas disponíveis no grupo!");
    }

    const marmita = membrosElegiveis[Math.floor(Math.random() * membrosElegiveis.length)];

    const frases = [
        "Divirtam-se, e cuidado pra não quebrar o dedo. 😏💅",
        "Trisal não monogâmico ativado com sucesso. Boa sorte Marmitex🔥!",
        "Cuidado que essa marmita tem emoções demais pra dois só 😘",
        "Parabéns! Agora você é patrimônio compartilhado do casal. 🫶",
        "Sejam gentis com a marmita… ou não. 👀🔥",
        "Avisa que é o trisal do ano! 💖💖💖",
        "Vai dar bom… ou pelo menos vai dar. 🌶️👀",
        "Lésbicas não monogâmicas, uni-vos! ✨",
        "Sorte de vocês, azar da monogamia. 💔👉🏼🚪",
        "Nada como uma marmita pra apimentar o casal. 🔥",
        "Lembre-se: quem divide, multiplica. 📈",
        "Agora sim temos um trisal digno de fanfic. 📚💋",
        "Marmita liberada! Só não vale se apaixonar (muito). 🫣",
        "O dedo pode quebrar, mas o vínculo emocional é pra sempre. 🥲💅",
        "Essa é a energia sáfica que o grupo merece! 🌈👩‍❤️‍💋‍👩",
        "Lembrem-se: Quem divide, multiplica. Mas cuidado pra não quebrar o dedo!☝️",
        "Agora são amor livre, unhas curta e língua afiada!👅",
        "Monogamia? A gente come com farofa por aqui!🔥",
        "Trisal? Não, é só um ensaio pro quarteto.💖💖💖💖",
        "É oficial: Essa novela virou série sáfica com várias temporadas.🌈",
        "Sejam gentis com a marmita… ou não. 👀🔥",
        "Avisa que é o trisal do ano! 💖💖💖"
    ];

    const fraseFinal = frases[Math.floor(Math.random() * frases.length)].replace("@marmita", waUtil.removeWhatsappSuffix(marmita));

    const replyText = `👀🔥 *Marmita do Casal Ativada!*\n\n` +
        `O casal @${waUtil.removeWhatsappSuffix(mentioned[0])} e @${waUtil.removeWhatsappSuffix(mentioned[1])} escolheu sua marmita...\n\n` +
        `🥵 A marmita da vez é @${waUtil.removeWhatsappSuffix(marmita)}!\n\n` +
        `${fraseFinal}`;

    const mentions = [mentioned[0], mentioned[1], marmita];
    await waUtil.sendTextWithMentions(client, message.chat_id, replyText, mentions, { expiration: message.expiration });
}
