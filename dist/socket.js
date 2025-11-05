import { makeWASocket, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import NodeCache from 'node-cache';
import configSocket from './config.js';
import { BotController } from './controllers/bot.controller.js';
import { connectionClose, connectionOpen, connectionPairingCode, connectionQr } from './events/connection.event.js';
import { messageReceived } from './events/message-received.event.js';
import { addedOnGroup } from './events/group-added.event.js';
import { groupParticipantsUpdated } from './events/group-participants-updated.event.js';
import { partialGroupUpdate } from './events/group-partial-update.event.js';
import { syncGroupsOnStart } from './helpers/groups.sync.helper.js';
import { executeEventQueue, queueEvent } from './helpers/events.queue.helper.js';
import botTexts from './helpers/bot.texts.helper.js';
import { askQuestion, colorText } from './utils/general.util.js';
import { useNeDBAuthState } from './helpers/session.auth.helper.js';

// Importa o cron e a função de aniversários
import cron from 'node-cron';
import { verificarEEnviarAniversariosDoDia } from './utils/aniversario.util.js';

// Importa todos os comandos
import { commands } from './commands/index.js';

// Cache
const retryCache = new NodeCache();
const eventsCache = new NodeCache();
const messagesCache = new NodeCache({ stdTTL: 5 * 60, useClones: false });

export default async function connect() {
  const { state, saveCreds } = await useNeDBAuthState();
  const { version } = await fetchLatestBaileysVersion();
  const client = makeWASocket(configSocket(state, retryCache, version, messagesCache));

  let connectionType = null;
  let isBotReady = false;
  eventsCache.set("events", []);

  // Função para rodar aniversários de forma segura
  async function rodarAniversarios() {
    console.log('🔔 Verificando aniversariantes do dia...');
    try {
      await verificarEEnviarAniversariosDoDia(client);
    } catch (err) {
      console.error('Erro ao verificar e enviar aniversários:', err);
    }
  }

  client.ev.process(async (events) => {
    const botInfo = new BotController().getBot();

    // Status da conexão
    if (events['connection.update']) {
      const connectionState = events['connection.update'];
      const { connection, qr, receivedPendingNotifications } = connectionState;
      let needReconnect = false;

      if (!receivedPendingNotifications) {
        if (qr) {
          if (!connectionType) {
            console.log(colorText(botTexts.not_connected, '#e0e031'));
            connectionType = await askQuestion(botTexts.input_connection_method);
            if (connectionType == '2') {
              connectionPairingCode(client);
            } else {
              connectionQr(qr);
            }
          } else if (connectionType != '2') {
            connectionQr(qr);
          }
        } else if (connection == 'connecting') {
          console.log(colorText(botTexts.connecting));
        } else if (connection === 'close') {
          needReconnect = await connectionClose(connectionState);
        }
      } else {
        await client.waitForSocketOpen();
        connectionOpen(client);
        await syncGroupsOnStart(client);
        isBotReady = true;
        await executeEventQueue(client, eventsCache);
        console.log(colorText(botTexts.server_started));

        // 1️⃣ Executa aniversários imediatamente ao iniciar
        await rodarAniversarios();

        // 2️⃣ Agenda verificação diária às 08:00
        cron.schedule('0 8 * * *', async () => {
          console.log('Executando a verificação de aniversários programada...');
          await rodarAniversarios();
        }, {
          scheduled: true,
          timezone: "America/Sao_Paulo"
        });
      }

      if (needReconnect) connect();
    }

    // Atualiza credenciais
    if (events['creds.update']) {
      await saveCreds();
    }

    // Mensagens recebidas
    if (events['messages.upsert']) {
      const message = events['messages.upsert'];
      if (isBotReady) {
        const body =
          message.messages[0]?.message?.extendedTextMessage?.text ||
          message.messages[0]?.message?.conversation;

        if (!body) return;

        if (body.startsWith('!')) {
          const commandName = body.split(' ')[0].substring(1).toLowerCase();

          if (commands[commandName]) {
            try {
              await commands[commandName].handler(client, message);
            } catch (err) {
              console.error(`Erro ao executar comando ${commandName}:`, err);
            }
            return;
          }
        }

        // Se não for comando, processa normalmente
        await messageReceived(client, message, botInfo, messagesCache);
      }
    }

    // Atualização de participantes no grupo
    if (events['group-participants.update']) {
      const participantsUpdate = events['group-participants.update'];
      if (isBotReady)
        await groupParticipantsUpdated(client, participantsUpdate, botInfo);
      else
        queueEvent(eventsCache, "group-participants.update", participantsUpdate);
    }

    // Novo grupo
    if (events['groups.upsert']) {
      const groups = events['groups.upsert'];
      if (isBotReady)
        await addedOnGroup(client, groups, botInfo);
      else
        queueEvent(eventsCache, "groups.upsert", groups);
    }

    // Atualização parcial do grupo
    if (events['groups.update']) {
      const groups = events['groups.update'];
      if (groups.length == 1 && groups[0].participants == undefined) {
        if (isBotReady)
          await partialGroupUpdate(groups[0]);
        else
          queueEvent(eventsCache, "groups.update", groups);
      }
    }
  });
}
