const {Client, IntentsBitField, VoiceChannel} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.username} is online`);
})

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    var slashResponse = slashCommandResponses(interaction);
    interaction.reply(slashResponse) 

})


client.on('messageCreate', (message) => {
    if (message.author.bot){
        return;
    }
    
    var botResponse =  responses(message);
    
    if(botResponse != null){
        console.log('')
        console.log(message.author.tag+ ' ran command "' + message.content.toLowerCase() + '"');
        message.channel.send(botResponse);
        console.log('Bot responded "' + botResponse + '"');
    }
    
});

function slashCommandResponses(slashCommand){
    var hogImages = ['https://cdn.discordapp.com/attachments/693513623787536384/1095904363177844806/RedRiverHog_0084.webp', 'https://media.discordapp.net/attachments/693513623787536384/1095904426432139315/image33.jpeg?width=824&height=676', 'https://cdn.discordapp.com/attachments/693513623787536384/1095904490319794227/Hog-Red-River-Piglet-JP.jpg', 'https://media.discordapp.net/attachments/693513623787536384/1095905233231683704/redriverhog-1-gallery.jpg', 'https://media.discordapp.net/attachments/693513623787536384/1095908781013074100/RedRiverHog02-1.jpg', 'https://cdn.discordapp.com/attachments/693513623787536384/1095908852156866602/red-river-hog-dsc_7903.jpg', 'https://cdn.discordapp.com/attachments/693513623787536384/1095908899418292265/RedRiverHog.jpg', 'https://cdn.discordapp.com/attachments/693513623787536384/1095908937867468840/red-river-hog.jpg']
    if(slashCommand.commandName == 'hog'){
        var hogChoice = randNumFromInt(0,hogImages.length+1);
        return hogImages[hogChoice];
    }
}

// ALL BOT TEXT RESPONSES
function responses(message){
    var prefix = 'bb';

    var hogImages = ['https://cdn.discordapp.com/attachments/693513623787536384/1095904363177844806/RedRiverHog_0084.webp', 'https://media.discordapp.net/attachments/693513623787536384/1095904426432139315/image33.jpeg?width=824&height=676', 'https://cdn.discordapp.com/attachments/693513623787536384/1095904490319794227/Hog-Red-River-Piglet-JP.jpg', 'https://media.discordapp.net/attachments/693513623787536384/1095905233231683704/redriverhog-1-gallery.jpg', 'https://media.discordapp.net/attachments/693513623787536384/1095908781013074100/RedRiverHog02-1.jpg', 'https://cdn.discordapp.com/attachments/693513623787536384/1095908852156866602/red-river-hog-dsc_7903.jpg', 'https://cdn.discordapp.com/attachments/693513623787536384/1095908899418292265/RedRiverHog.jpg', 'https://cdn.discordapp.com/attachments/693513623787536384/1095908937867468840/red-river-hog.jpg']
    
    var caracalImages = ['https://cdn.discordapp.com/attachments/693513623787536384/1095910458248134737/FGDIzfAVcAIpqNu.jpg','https://cdn.discordapp.com/attachments/693513623787536384/1095910491324420146/FF8RDr3VUAIkxMo.jpg','https://cdn.discordapp.com/attachments/693513623787536384/1095910518071513199/FF5PaAXUcAA0TqN.jpg','https://cdn.discordapp.com/attachments/693513623787536384/1095910540271943701/FF3YQvLVEAID4D2.jpg','https://cdn.discordapp.com/attachments/693513623787536384/1095910564116566057/E-JctIOVUAEXiPD.jpg','https://cdn.discordapp.com/attachments/693513623787536384/1095910595712274432/E8KNchdUcAMdnWo.jpg','https://cdn.discordapp.com/attachments/693513623787536384/1095910625022050316/EwTxfOWUYAA_Rb2.jpg','https://cdn.discordapp.com/attachments/693513623787536384/1095910663144087663/Caracal.webp','https://cdn.discordapp.com/attachments/693513623787536384/1095910692848156773/231020361_2008629132623508_5218159801632802484_n.jpg','https://cdn.discordapp.com/attachments/693513623787536384/1095910724330586182/52535667411_2ae4b1c2e9_c.jpg','https://cdn.discordapp.com/attachments/693513623787536384/1095910755540402237/Sassy-Caracal-2016.webp','https://cdn.discordapp.com/attachments/693513623787536384/1095910815883853905/81297d55-d18a-457e-9b88-bf603f7605d0-cats-6-1.webp']
        
    var hyenaImages = ['https://cdn.discordapp.com/attachments/1095022465199120466/1196656309618086069/Z.png?ex=65b86c09&is=65a5f709&hm=c4df240c113b145985ed91fcd2e06fac7422ee107630e77c9a195121aef811b3&','https://cdn.discordapp.com/attachments/1095022465199120466/1196656365570109450/ZVMPI4WGMYI6TCHRIBWI6S7HAY.png?ex=65b86c16&is=65a5f716&hm=0e95e029cc1e3b8094a2a6bcc596f789772425adb282a6b010cc5afb849703a8&','https://cdn.discordapp.com/attachments/1095022465199120466/1196656398998700083/tiny-baby-spotted-hyena-cub-600nw-1744105886.png?ex=65b86c1e&is=65a5f71e&hm=058396aa2ac19f0ce4e452955416b3e97d554e8e71fad46334b79b7f26d99a43&','https://cdn.discordapp.com/attachments/1095022465199120466/1196656453965062205/hgzkyg7g4yf21.png?ex=65b86c2b&is=65a5f72b&hm=da4b10a6c60d7e7f65cc968b5879c73221999d992b29d6837ae5d39b0c9bb137&','https://cdn.discordapp.com/attachments/1095022465199120466/1196656453965062205/hgzkyg7g4yf21.png?ex=65b86c2b&is=65a5f72b&hm=da4b10a6c60d7e7f65cc968b5879c73221999d992b29d6837ae5d39b0c9bb137&','https://cdn.discordapp.com/attachments/1095022465199120466/1196656512739856395/baby-hyena.png?ex=65b86c39&is=65a5f739&hm=b7f64ba58daa464b49938883bb6ea258bf10bef1da8048e34f4790ad372b51f3&']

    var jerboaImages = ['https://cdn.discordapp.com/attachments/693513623787536384/1196658905833553970/20211123_on_jerboa.jpg?ex=65b86e73&is=65a5f973&hm=f927aed97d94dc6b06a50ce92d1381d75488e44a74646122022a5740b0a7a120&','https://cdn.discordapp.com/attachments/693513623787536384/1196659037870235668/image.png?ex=65b86e93&is=65a5f993&hm=0081f9d931199932531dba4273a3179a0536a98adb56d627112b25ba510a7954&','https://cdn.discordapp.com/attachments/693513623787536384/1196659070606782565/jerboa_mos_022416051802.jpg?ex=65b86e9b&is=65a5f99b&hm=57f3bdb7731fdac4c5cc0361e7ec0a37461961f6d6ce23e05a436e00108da0ce&','https://cdn.discordapp.com/attachments/693513623787536384/1196659135786254396/0c7a1d094b5bcee8a8caf1c570dcf9f0.png?ex=65b86eaa&is=65a5f9aa&hm=9e89f2b706207fa381cf7376cccefc9f07358fec28e8a2c604328512b3f15d15&','https://cdn.discordapp.com/attachments/693513623787536384/1196659180212334675/01603493.webp?ex=65b86eb5&is=65a5f9b5&hm=24fda42c332317ef33cfe84d3f9c9469f42b2c15cfadb759eef9d60e14d812a0&','https://cdn.discordapp.com/attachments/693513623787536384/1196659232297189477/wired_absurd-creatures-this-tiny-adorable-critter-is-half-kangaroo-half-velociraptor.jpg?ex=65b86ec1&is=65a5f9c1&hm=da219084a1fffea3c76f9a841146acff5000efed6e0b56bfda6398f8879341c2&','https://cdn.discordapp.com/attachments/693513623787536384/1196659272206000150/digests_50645_digest-50645.png.jpg?ex=65b86ecb&is=65a5f9cb&hm=192d799e3267d8329254198d59fae1262aeda0fc66b302afcbca3ea5d59b5505&']
    if (message.content.toLowerCase() == prefix + ' hi' || message.content.toLowerCase() == prefix + ' hello'){
        return 'gnorp gnarp';
    }

    if (message.content.toLowerCase() == prefix + ' diceroll'){
        var diceVal = randNumFromInt(1,6);
        return diceVal.toString();
    }

    if (message.content.toLowerCase() == prefix + ' hog'){
        var hogChoice = randNumFromInt(0,hogImages.length+1);
        return hogImages[hogChoice];
    }

    if (message.content.toLowerCase() ==  prefix + ' caracal'){
        var caracalChoice = randNumFromInt(0,caracalImages.length+1);
        return caracalImages[caracalChoice];
    }

    if (message.content.toLowerCase() ==  prefix + ' baby hyena' ){
        var hyenaChoice = randNumFromInt(0,hyenaImages.length+1);
        return hyenaImages[hyenaChoice];
    }

    if (message.content.toLowerCase() ==  prefix + ' jerboa' ){
        var jerboaChoice = randNumFromInt(0,jerboaImages.length+1);
        return jerboaImages[jerboaChoice];
    }

    if (message.content.toLowerCase() == prefix + ' show me play dough kenny'){
        var showKenny = randNumFromInt(1,1000);
        if(showKenny == 999){
            return 'https://cdn.discordapp.com/attachments/1095022465199120466/1095087905594163231/IMG_4705.jpg';
        }else{
            return 'no 🖕';
        }
    }


    if (message.content.toLowerCase() ==  prefix + ' help'){
        return prefix + ' hi, ' + prefix + ' diceroll, ' + prefix + ' hog, ' + prefix + ' caracal, ' + prefix + ' baby hyena, ' + prefix + ' jerboa '
    }
    
    if (message.content.toLowerCase() ==  prefix + ' do the thug shaker' || message.content.toLowerCase() ==  prefix + ' thug shake'){
        return 'https://tenor.com/view/thug-shake-thug-shaker-black-ass-shake-gif-25873456'
    }

    if (message.content.toLowerCase() ==  'neal bulla'){
        return 'https://media.discordapp.net/attachments/843313803391402028/1081792032185524356/caption.gif'
    }

    if (message.content.toLowerCase() ==  '<@&1124527413280387092>' || message.content.toLowerCase() ==  '<@579143676677062676>'){
        return '<@&1124527413280387092>'
    }

    if (message.content.toLowerCase() ==  'bed'){
        if(message.author.id == '569736680878374912'){
            message.delete()
            //for(var i = 0; i > 2; i++){
                message.channel.send('hell no')
            //}
        }
    }

    if (message.content.toLowerCase() ==  prefix + ' permtest' || message.content.toLowerCase() ==  prefix + 'you seeing this shit bro'){
        if(message.author.id == '569736680878374912'){
            return 'mad fucked up'
        }else{
            return 'no fuck you'
        }
    }

    /*
    if (message.author.id == '682000873735716877'){
        return "buy golf";
    }
    */


    // random message and error failsafe
    else{
        randMessageChance = randNumFromInt(1,100);
        if(randMessageChance == 100){
            var chooseResponse = randNumFromInt(1,7)
            if (chooseResponse == 1){
                return 'i\'ve just pissed myself'
            }
            if(chooseResponse == 2){
                return 'my ass burns'
            }
            if(chooseResponse == 3){
                return 'kill john lennon'
            }
            if(chooseResponse == 4){
                return 'the irs is after me i have to get out of here'
            }
            if(chooseResponse == 5){
                return 'carbonated poop water'
            }
            if(chooseResponse == 6){
                return '<:BefficaRizz:1095088123765063771>' 
            }
            if(chooseResponse == 7){
                return 'https://tenor.com/view/scared-cat-meme-you-have-gif-26575351' 
            }
        }

        return;
    }
    
}

// RAND NUM FUNCTION
function randNumFromInt(min, max){ 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

client.login('dcBotToken');
