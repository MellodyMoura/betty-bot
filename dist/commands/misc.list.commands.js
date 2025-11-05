import * as miscFunctions from './misc.functions.commands.js';
import * as aniversarioFunctions from './index.js'; // agora importa o arquivo novo

const miscCommands = {
    sorteio: {
        guide: `Ex: *{$p}sorteio* 100 - Sorteia um número aleatório de 1 a 100.\n`,
        msgs: {
            reply: `🎲 *Sorteio (Número)*: \n\n` +
                `O número sorteado foi *{$1}*`,
            error_invalid_value: 'O valor do número inserido é inválido, escolha um número maior que 1.'
        },
        function: miscFunctions.sorteioCommand
    },
    sorteiomembro: {
        guide: `Ex: *{$p}sorteiomembro* - Sorteia um membro aleatório do grupo.\n`,
        msgs: {
            reply: `🎲 *Sorteio (Membro)*: \n\n` +
                `O membro sorteado foi @{$1}`,
        },
        function: miscFunctions.sorteiomembroCommand
    },
    mascote: {
        guide: `Ex: *{$p}mascote* - Exibe o inigualável e onipotente WhatsApp Jr.\n`,
        msgs: {
            reply: 'WhatsApp Jr.'
        },
        function: miscFunctions.mascoteCommand
    },
    sapatometro: {
        guide: `Ex: *{$p}sapatometro* @membro - Mede o nível de sapatonice com base em pura ciência(e um pouco de caos emocional).\n\n` +
            `Ex: Responder com *{$p}sapatometro* - Mede o nível de sapatonice com base em pura ciência(e um pouco de caos emocional) da membra respondida.\n`,
        msgs: {
            error_mention: "Apenas um membro deve ser marcado por vez.",
            error_message: "Houve um erro ao obter os dados da mensagem.",
            reply: "👩‍❤️‍👩 *Sapatômetro Ativado!*\n\n" +
                   "Detectamos seu nível de sapatonisse em *{$1}%* 🌈\n\n" +
                   "*{$2}*"
        },
        function: miscFunctions.sapatometroCommand
    },
    marmita: {
        guide: `Ex: *{$p}marmita* @membra1 @membra2 - Sorteia uma marmita para o casal.\n\n` +
               `Obs: Apenas dois membros devem ser mencionados.`,
        msgs: {
            error_mention: "Você precisa mencionar exatamente duas pessoas pra formar o casal!",
            error_message: "Houve um erro ao tentar sortear a marmita. Tente novamente.",
            reply: "👀🔥 *Marmita do Casal Ativada!*\n\n" +
                   "O casal @{$1} e @{$2} escolheu sua marmita...\n\n" +
                   "🥵 A marmita da vez é @{$3}!\n\n" +
                   "*{$4}*"
        },
        function: miscFunctions.marmitaCommand
    },    
    detector: {
        guide: `Ex: Responder com *{$p}detector* - Exibe o resultado da máquina da verdade.\n`,
        msgs: {
            wait: "⏳ Calibrando a máquina da verdade",
            error_message: "Houve um erro ao obter os dados da mensagem."
        },
        function: miscFunctions.detectorCommand
    },
    roletarussa: {
        guide: `Ex: *{$p}roletarussa* - Teste sua sorte na roleta russa.\n\n`,
        msgs: {
            reply_alive: '🔫 *Roleta russa*\n\n' +
                "😁 A arma não disparou, você sobreviveu a roleta russa.",
            reply_dead: '🔫 *Roleta russa*\n\n' +
                "💀 A arma disparou, você morreu.",
        },
        function: miscFunctions.roletarussaCommand
    },
    casal: {
        guide: `Ex: *{$p}casal* - Escolhe 2 pessoas aleatórias do grupo para formar um casal.\n`,
        msgs: {
            error: "Este comando precisa de no mínimo 2 membros no grupo.",
            reply: '👩‍❤️‍👨 *Casal*\n\n' +
                "💕 Está rolando um clima entre @{$1} e @{$2}"
        },
        function: miscFunctions.casalCommand
    },
    caracoroa: {
        guide: `Ex: *{$p}caracoroa* cara - Escolhe cara e joga a moeda.\n\n` +
            `Ex: *{$p}caracoroa* coroa - Escolhe coroa e joga a moeda.\n`,
        msgs: {
            wait: "🪙 Lançando a moeda ",
            reply_victory: "😁 *Vitória!*\n\n" +
                "O resultado caiu *{$1}*\n",
            reply_defeat: "😭 *Derrota!*\n\n" +
                "O resultado caiu *{$1}*\n"
        },
        function: miscFunctions.caracoroaCommand
    },
    ppt: {
        guide: `Ex: *{$p}ppt* pedra - Escolhe pedra, para jogar pedra, papel ou tesoura.\n\n` +
            `Ex: *{$p}ppt* papel - Escolhe papel, para jogar pedra, papel ou tesoura.\n\n` +
            `Ex: *{$p}ppt* tesoura - Escolhe tesoura, para jogar pedra, papel ou tesoura.\n`,
        msgs: {
            error: "[❗] Você deve escolher entre *pedra*, *papel*  ou *tesoura*",
            reply_victory: "😁 *Vitória!*\n\n" +
                "Você escolheu {$1} e o bot escolheu {$2}\n",
            reply_defeat: "😭 *Derrota!*\n\n" +
                "Você escolheu {$1} e o bot escolheu {$2}\n",
            reply_draw: "😐 *Empate!*\n\n" +
                "Você escolheu {$1} e o bot escolheu {$2}\n"
        },
        function: miscFunctions.pptCommand
    },
    gadometro: {
        guide: `Ex: *{$p}gadometro* @membro - Mede o nível de gadisse do membro mencionado.\n\n` +
            `Ex: Responder com *{$p}gadometro* - Mede o nível de gadisse do membro respondido.\n`,
        msgs: {
            error_mention: "Apenas um membro deve ser marcado por vez.",
            error_message: "Houve um erro ao obter os dados da mensagem.",
            reply: "🐃 *Gadômetro*\n\n" +
                'Foi detectado um nível de gado de *{$1}%*'
        },
        function: miscFunctions.gadometroCommand
    },
    bafometro: {
        guide: `Ex: *{$p}bafometro* @membro - Mede o nível de alcool do membro mencionado.\n\n` +
            `Ex: Responder com *{$p}bafometro* - Mede o nível de alcool do membro respondido.\n`,
        msgs: {
            reply: "🍺 *Bafômetro*\n\n" +
                'Foi detectado um nível de álcool de *{$1}%*',
            error_mention: "Apenas um membro deve ser marcado por vez.",
            error_message: "Houve um erro ao obter os dados da mensagem.",
        },
        function: miscFunctions.bafometroCommand
    },
    top5: {
        guide: `Ex: *{$p}top5* tema - Exibe uma ranking de 5 membros aleatórios com o tema que você escolher.\n`,
        msgs: {
            error_members: "O grupo deve ter no mínimo 5 membros para usar este comando.",
            reply_title: "🏆 *TOP 5 {$1}*\n\n",
            reply_item: "{$1} {$2}° Lugar - @{$3}\n"
        },
        function: miscFunctions.top5Command
    },
    par: {
        guide: `Ex: *{$p}par* @membro1 @membro2 - Mede o nível de compatibilidade dos 2 membros mencionados.\n`,
        msgs: {
            reply: "👩‍❤️‍👨 *Par*\n\n" +
                'A chance de compatibilidade entre @{$1} e @{$2} é de *{$3}%*'
        },
        function: miscFunctions.parCommand
    },
    chance: {
        guide: `Ex: *{$p}chance ficar rico* - Calcula sua chance de um tema aleatório a sua escolha.\n`,
        msgs: {
            reply: "📊 *Chance*\n\n" +
                'Você tem *{$1}%* de chance de *{$2}*',
        },
        function: miscFunctions.chanceCommand
    },
    frase: {
        guide: `Ex: *{$p}fch* - Exibe uma frase aleatória montada com as cartas do jogo Cartas contra a Humanidade.\n`,
        msgs: {
            reply: "🙊 *Frases do WhatsApp Jr.*\n\n" +
                '{$1}'
        },
        function: miscFunctions.fraseCommand
    },

    // NOVO COMANDO ANIVER
    aniver: {
        guide: `Ex: *{$p}aniver* - Mostra informações de aniversários.\n`,
        msgs: {
            reply: "🎉 *Aniversários* - {$1}",
            error_message: "Não foi possível obter a lista de aniversários."
        },
        function: aniversarioFunctions.aniverCommand
    }
};

export default miscCommands;
