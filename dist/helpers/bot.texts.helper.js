const botTexts = {
    starting: `
💜💫━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━💫💜

 #####    ######   ######   ######   ##  ##            #####     ####    ######
 ##  ##   ##         ##       ##     ##  ##            ##  ##   ##  ##     ##
 ##  ##   ##         ##       ##     ##  ##            ##  ##   ##  ##     ##
 #####    ####       ##       ##      ####             #####    ##  ##     ##
 ##  ##   ##         ##       ##       ##              ##  ##   ##  ##     ##
 ##  ##   ##         ##       ##       ##              ##  ##   ##  ##     ##
 #####    ######     ##       ##       ##              #####     ####      ##

💖  B E T T Y   B O T  💖
⚙️  Versão: {$1}
🌈  Online desde 2023 — servindo carisma, caos e conexão!
💬  Preparando o sistema sáfico de fofocas automáticas...

💜💫━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━💫💜
`,

    connecting: "⏱ Conectando... Betty tá se ajeitando no salto e sincronizando as conversas, segura aí que é rapidinho 💅",
    bot_data: "✨ Dados do Betty Bot carregados com sucesso, bebê!",
    no_update_available: "💖 Tudo certo! A Betty já tá na versão mais atual e plena.",
    update_available: "🚨 Tem atualização nova chegando! A Betty tá se produzindo pra ficar ainda mais linda...",
    error_check_update: "⚠️ Não consegui checar atualizações agora, mas nada derruba a Betty!",
    bot_updated: "✅ Atualização concluída, a Betty vai dar um close e reiniciar — segura que ela volta mais gostosa!",
    not_connected: "📴 Parece que a Betty ainda não tá conectada a nenhum número. Bora parear, gata?",
    
    input_connection_method:
        "Como você quer conectar a Betty hoje?\n\n" +
        "1️⃣ - QR Code (o clássico)\n" +
        "2️⃣ - Código de Pareamento (pra quem gosta de mistério)\n\n",
    
    input_phone_number:
        "📱 Digita o número que vai ser da Betty (com DDI e DDD, ex: 5521912345678): ",
    
    show_pairing_code: "💅 Seu código de pareamento é: {$1}",

    server_started: "✅ Servidor da Betty tá ON e pronta pra rodar o show 💃",
    groups_loaded: "👭 Todos os grupos foram atualizados e prontos pra fofocar!",
    admin_registered: "💻 Seu número foi registrado como DONA SUPREMA da Betty 👑",
    
    new_user:
        "💜 Oiii {$2}, bem-vinda ao universo da *Betty Bot*! ✨\n\n" +
        "Pra ver o menu de comandos e começar a diversão, digita *{$p}menu* 🌈",
    
    new_group:
        "🎉 Eita, grupo novo detectado: *{$1}*!\nSe quiser ajuda, digita *{$p}menu* que a Betty explica tudo 💬",
    
    guide_header_text: "📘 COMO USAR O COMANDO 📘\n\n",
    no_guide_found: "🤷‍♀️ A Betty não achou nenhum guia pra esse comando, tenta outro amor.",
    
    error_command_usage:
        "❗ Acho que você usou o comando *{$1}* errado, amore.\n\n" +
        "{$2}",
    
    error_command:
        "🚨 Ocorreu um erro no comando *{$1}*.\n\n" +
        "*Motivo*: {$2}\n" +
        "Mas calma, a Betty resolve isso rapidinho 💅",
    
    library_error:
        "💥 Erro interno! Até as divas travam às vezes. Tenta de novo daqui a pouco 💜",
    
    command_rate_limited_message:
        "😤 Pega leve, amor! Espera *{$1}* segundos antes de tentar outro comando, a Betty precisa respirar.",
    
    group_blocked_command:
        "🚫 O comando *{$1}* foi bloqueado nesse grupo por decisão da chefia 😬",
    
    globally_blocked_command:
        "🚷 O comando *{$1}* tá temporariamente desativado pra todo mundo, culpa da administração 😅",
    
    detected_link:
        "🔗 Ei @{$1}! O ANTI-LINK da Betty tá ligado e sua mensagem foi deletada. Segurança em primeiro lugar 💪",
    
     group_welcome_message: "👋 Oiii! @{$1}, Seja bem-vinda ao Bailão das Sapatão! 🐸💜🌈\n\n" +
        "A gente quer te conhecer melhor 😏😏\n" +
        "Por favor se apresente mandando:\n\n" +
        "📸 Uma foto sua:\n" +
        "📝 Nome:\n" +
        "🎂 Idade:\n" +
        "♈ Signo:\n" +
        "📍 Região onde mora:\n" +
        "🌈 Orientação sexual:\n" +
        "📲 Alguma rede social (se quiser):\n" +
        "🗣️ Fale o que quiser sobre você:\n\n" +
        "_Por favor veja as regrinhas e informes na descrição do grupo!_\n\n" +
        "E a gente te espera no Bailão, hein? 😅💃✨",
            
    ban_message:
        "🚨 +{$1} foi banido com sucesso.\n\n" +
        "*Tipo*: BAN MANUAL\n" +
        "*Autora do feitiço*: {$2}",
    
    blacklist_ban_message:
        "🧹 +{$1} foi removido automaticamente.\n\n" +
        "*Motivo*: LISTA NEGRA\n" +
        "*Quem baniu*: {$2}",
    
    antifake_ban_message:
        "🤖 +{$1} foi banido por número suspeito (ANTI-FAKE ativo).\n" +
        "*Quem baniu*: {$2}",
    
    antiflood_ban_message:
        "💥 +{$1} foi banido por floodar demais.\n" +
        "*Motivo*: ANTI-FLOOD\n" +
        "*Quem baniu*: {$2}",
    
    sync_blacklist: "✅ A Betty limpou a LISTA NEGRA: {$1} almas removidas 😈",
    sync_antifake: "✅ {$1} fakes eliminadas. Nada escapa da Betty 🔍",
    
    owner_registered: "💅 Doninha da Betty cadastrada com sucesso!",
    owner_not_found: "⚠️ Nenhum dono configurado ainda. Digita *!admin* pra assumir o trono 👑",
    
    migrating_database: "💾 Atualizando o banco de dados... segura o salto que a Betty tá migrando tudo!",
    
    user_types: {
        owner: '👑 Dona',
        admin: '⭐ Admin',
        user: '👤 Usuária',
    },
    
    disconnected: {
        command: "❌ Conexão encerrada por comando da administradora.",
        fatal_error: "💥 A conexão caiu por erro grave — a Betty vai dar um reboot básico.",
        logout: "📴 Você foi deslogada do WhatsApp. Reconecte-se pra continuar a fofoca!",
        restart: "🔄 Reconectando… a Betty tá voltando toda renovada!",
        bad_connection: "📶 Conexão encerrada. Motivo: {$1} - {$2}. Tentando recuperar o salto 👠",
    },
    
    permission: {
        group: "👭 Esse comando só pode ser usado em *grupos*, linda.",
        bot_group_admin: "👑 A Betty precisa ser *admin do grupo* pra fazer isso!",
        ban_admin: "🚫 A Betty não pode banir outra administradora (sororidade, né?).",
        admin_group_only: "⭐ Só *administradoras do grupo* podem usar esse comando.",
        admin_bot_only: "💻 Apenas *administradoras da Betty* podem usar esse comando.",
        owner_bot_only: "👑 Só a *Dona Suprema da Betty* tem esse poder.",
        owner_group_only: "👑 Esse comando é exclusivo da *dona do grupo*.",
    }
};

export default botTexts;
