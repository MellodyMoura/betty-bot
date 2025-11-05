import { aniversarioCommands } from "../commands/index.js";
import { messageErrorCommand, showCommandConsole } from "../utils/general.util.js";
import { autoSticker } from "../commands/sticker.functions.commands.js";
import * as waUtil from "../utils/whatsapp.util.js";
import botTexts from "../helpers/bot.texts.helper.js";
import infoCommands from "../commands/info.list.commands.js";
import utilityCommands from "../commands/utility.list.commands.js";
import stickerCommands from "../commands/sticker.list.commands.js";
import downloadCommands from "../commands/download.list.commands.js";
import miscCommands from "../commands/misc.list.commands.js";
import groupCommands from "../commands/group.list.commands.js";
import adminCommands from "../commands/admin.list.commands.js";
import { getCommandCategory, getCommandGuide } from "../utils/commands.util.js";

export async function commandInvoker(client, botInfo, message, group) {
    const isGuide = (!message.args.length) ? false : message.args[0] === 'guia';
    const categoryCommand = getCommandCategory(botInfo.prefix, message.command);
    const commandName = waUtil.removePrefix(botInfo.prefix, message.command);
    try {
        if (isGuide) {
            return sendCommandGuide(client, botInfo.prefix, message);
        }
        switch (categoryCommand) {
            case 'info':
                if (Object.keys(infoCommands).includes(commandName)) {
                    const commands = infoCommands;
                    const cmdFunc = commands[commandName].handler || commands[commandName].function;
                    if (typeof cmdFunc === 'function') {
                        await cmdFunc(client, botInfo, message, group || undefined);
                        showCommandConsole(message.isGroupMsg, "INFO", message.command, "#8ac46e", message.t, message.pushname, group?.name);
                    } else {
                        throw new Error(`O comando "${commandName}" não possui uma função válida para executar.`);
                    }
                }
                break;
            case 'utility':
                if (Object.keys(utilityCommands).includes(commandName)) {
                    const commands = utilityCommands;
                    const cmdFunc = commands[commandName].handler || commands[commandName].function;
                    if (typeof cmdFunc === 'function') {
                        await cmdFunc(client, botInfo, message, group || undefined);
                        showCommandConsole(message.isGroupMsg, "UTILIDADE", message.command, "#de9a07", message.t, message.pushname, group?.name);
                    } else {
                        throw new Error(`O comando "${commandName}" não possui uma função válida para executar.`);
                    }
                }
                break;
            case 'sticker':
                if (Object.keys(stickerCommands).includes(commandName)) {
                    const commands = stickerCommands;
                    const cmdFunc = commands[commandName].handler || commands[commandName].function;
                    if (typeof cmdFunc === 'function') {
                        await cmdFunc(client, botInfo, message, group || undefined);
                        showCommandConsole(message.isGroupMsg, "STICKER", message.command, "#ae45d1", message.t, message.pushname, group?.name);
                    } else {
                        throw new Error(`O comando "${commandName}" não possui uma função válida para executar.`);
                    }
                }
                break;
            case 'download':
                if (Object.keys(downloadCommands).includes(commandName)) {
                    const commands = downloadCommands;
                    const cmdFunc = commands[commandName].handler || commands[commandName].function;
                    if (typeof cmdFunc === 'function') {
                        await cmdFunc(client, botInfo, message, group || undefined);
                        showCommandConsole(message.isGroupMsg, "DOWNLOAD", message.command, "#2195cf", message.t, message.pushname, group?.name);
                    } else {
                        throw new Error(`O comando "${commandName}" não possui uma função válida para executar.`);
                    }
                }
                break;
            case 'misc':
                if (Object.keys(miscCommands).includes(commandName)) {
                    const commands = miscCommands;
                    const cmdFunc = commands[commandName].handler || commands[commandName].function;
                    if (typeof cmdFunc === 'function') {
                        await cmdFunc(client, botInfo, message, group || undefined);
                        showCommandConsole(message.isGroupMsg, "VARIADO", message.command, "#22e3dd", message.t, message.pushname, group?.name);
                    } else {
                        throw new Error(`O comando "${commandName}" não possui uma função válida para executar.`);
                    }
                }
                break;
            case 'aniversario':
                if (Object.keys(aniversarioCommands).includes(commandName)) {
                    const commands = aniversarioCommands;
                    const cmdFunc = commands[commandName].handler || commands[commandName].function;
                    if (typeof cmdFunc === 'function') {
                        await cmdFunc(client, botInfo, message, group);
                        showCommandConsole(message.isGroupMsg, "ANIVERSÁRIO", message.command, "#f0f8ff", message.t, message.pushname, group?.name);
                    } else {
                        throw new Error(`O comando "${commandName}" não possui uma função válida para executar.`);
                    }
                }
                break;
            case 'group':
                if (!message.isGroupMsg || !group) {
                    throw new Error(botTexts.permission.group);
                }
                else if (Object.keys(groupCommands).includes(commandName)) {
                    const commands = groupCommands;
                    const cmdFunc = commands[commandName].handler || commands[commandName].function;
                    if (typeof cmdFunc === 'function') {
                        await cmdFunc(client, botInfo, message, group);
                        showCommandConsole(message.isGroupMsg, "GRUPO", message.command, "#e0e031", message.t, message.pushname, group?.name);
                    } else {
                        throw new Error(`O comando "${commandName}" não possui uma função válida para executar.`);
                    }
                }
                break;
            case 'admin':
                if (!message.isBotAdmin) {
                    throw new Error(botTexts.permission.admin_bot_only);
                }
                else if (Object.keys(adminCommands).includes(commandName)) {
                    const commands = adminCommands;
                    const cmdFunc = commands[commandName].handler || commands[commandName].function;
                    if (typeof cmdFunc === 'function') {
                        await cmdFunc(client, botInfo, message, group || undefined);
                        showCommandConsole(message.isGroupMsg, "ADMINISTRAÇÃO", message.command, "#d1d1d1", message.t, message.pushname, group?.name);
                    } else {
                        throw new Error(`O comando "${commandName}" não possui uma função válida para executar.`);
                    }
                }
                break;
            default:
                if ((message.isGroupMsg && group?.autosticker) || (!message.isGroupMsg && botInfo.autosticker)) {
                    await autoSticker(client, botInfo, message, group || undefined);
                    showCommandConsole(message.isGroupMsg, "STICKER", "AUTO-STICKER", "#ae45d1", message.t, message.pushname, group?.name);
                }
                break;
        }
    }
    catch (err) {
        await waUtil.replyText(client, message.chat_id, messageErrorCommand(message.command, err.message), message.wa_message, { expiration: message.expiration });
    }
}

async function sendCommandGuide(client, prefix, message) {
    await waUtil.replyText(client, message.chat_id, getCommandGuide(prefix, message.command), message.wa_message, { expiration: message.expiration });
}
