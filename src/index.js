
require('dotenv').config();
const { Client, IntentsBitField, VoiceChannel } = require('discord.js');

const SmartApp = require('@smartthings/smartapp')
//smartthings api token
const accessToken = process.env.smartthingsToken;
const apiUrl = 'https://auth-global.api.smartthings.com';
const { MongoClient, ServerApiVersion } = require('mongodb');
const imageStorage = require('./images.js');
const { jerboaImages, caracalImages, hyenaImages, foxImages, hogImages, seaAngelImages, birdImages } = require('./images.js');
//const currency = require('./schemas/Currency');
var serverStatus = 'off';
var waitingForSave = false;
var controllingBot = false;
const axios = require('axios');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
    ]
});


//connect to user database
const mongoClient = new MongoClient(process.env.mongoPassword, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


(async () => {
    try{
        await mongoClient.db("admin").command({ ping: 1 });
        console.log("Connected to database")

    } catch(error){
        console.log(`Error:  ${error}`);
    }
    
})();


client.on('ready', (c) => {
    console.log(`${c.user.username} is online`);
    checkUserStatus('1167910738984190004', '1095022464557383690');
})




client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    var slashResponse = slashCommandResponses(interaction);
    interaction.reply(slashResponse)

})

client.on('presenceUpdate', (oldPresence, newPresence) => {
    // Check if the presence update is for the specific user you are monitoring
    if (newPresence.userId === '1167910738984190004') {
        // This checks if the user has changed status
        if (!oldPresence || newPresence.status !== oldPresence.status) {
            console.log(`${newPresence.user.tag} is now ${newPresence.status}`);
            if(serverStatus == 'on' && newPresence.status == 'offline'){
                client.channels.cache.get('1167909404910297098').send('Server crash detected')
                stopServer()
                setTimeout(startServer, 5000);
            }
        }
    }
});


client.on('messageCreate', (message) => {
    if (message.author.id != '1167910738984190004' && message.author.bot) {
        return;
    }

    var botResponse = responses(message);

    if (botResponse != null) {
        console.log('')
        console.log(message.author.tag + ' ran command "' + message.content.toLowerCase() + '"');
        message.channel.send(botResponse);
        console.log('Bot responded "' + botResponse + '"');
    }

})
client.on('messageUpdate', (oldMessage, newMessage) => {
    // Check if the updated message starts with the specified prefix and is not from a bot
    if (newMessage.content.toString().indexOf('Saved the game') != -1 && newMessage.author.id == '1167910738984190004' && newMessage.channelId == '1167915400261025913' && waitingForSave == true){
        waitingForSave = false;
        client.channels.cache.get('1167909404910297098').send('Stopping server...')
        newMessage.channel.send('stop')
        const url = `https://api.smartthings.com/v1/devices/c430e045-684d-4089-8598-54d58cb508d1/commands`;
            const commandBody = {
                commands: [
                    {
                        component: 'main',
                        capability: 'switch',
                        command: 'off',
                        arguments: [],
                    },
                ],
            };

            axios.post(url, commandBody, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    console.log('Device turned off:', response.data);
                    client.channels.cache.get('1167909404910297098').send('Server powered off successfully. Run "mc start" to start it back up.')
                    serverStatus = 'off'
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        
    }
    
  });
;


// slash commands
function slashCommandResponses(slashCommand) {
    if (slashCommand.commandName == 'hog') {
        var hogChoice = randNumFromInt(0, hogImages.length + 1);
        return hogImages[hogChoice];
    }
}










// ALL BOT TEXT RESPONSES
function responses(message) {

    var prefix = 'vv';




    // all image commands

    if (message.content.toLowerCase() == prefix + ' hi' || message.content.toLowerCase() == prefix + ' hello') {
        return 'gnorp gnarp';
    }

    if (message.content.toLowerCase() == prefix + ' diceroll') {
        var diceVal = randNumFromInt(1, 6);
        return diceVal.toString();
    }

    if (message.content.toLowerCase() == prefix + ' hog') {
        var hogChoice = randNumFromInt(0, hogImages.length + 1);
        return hogImages[hogChoice];
    }

    if (message.content.toLowerCase() == prefix + ' caracal') {
        var caracalChoice = randNumFromInt(0, caracalImages.length + 1);
        return caracalImages[caracalChoice];
    }

    if (message.content.toLowerCase() == prefix + ' baby hyena') {
        var hyenaChoice = randNumFromInt(0, hyenaImages.length + 1);
        return hyenaImages[hyenaChoice];
    }

    if (message.content.toLowerCase() == prefix + ' jerboa') {
        var jerboaChoice = randNumFromInt(0, jerboaImages.length + 1);
        return jerboaImages[jerboaChoice];
    }

    if (message.content.toLowerCase() == prefix + ' fox' || message.content.toLowerCase() == prefix + ' fucks') {
        var foxChoice = randNumFromInt(0, foxImages.length + 1);
        return foxImages[foxChoice];
    }

    if (message.content.toLowerCase() == prefix + ' bird') {
        var birdChoice = randNumFromInt(0, birdImages.length + 1);
        return birdImages[birdChoice];
    }

    if (message.content.toLowerCase() == prefix + ' sea angel') {
        var seaAngelChoice = randNumFromInt(0, seaAngelImages.length + 1);
        return seaAngelImages[seaAngelChoice];
    }






    //help command

    if (message.content.toLowerCase() == prefix + ' help') {
        return prefix + ' hi, ' + prefix + ' diceroll, ' + prefix + ' hog, ' + prefix + ' caracal, ' + prefix + ' baby hyena, ' + prefix + ' jerboa, ' + prefix + ' fox, ' + prefix + ' sea angel, ' + prefix + ' bird' 
    }





    // easter egg commands

    if (message.content.toLowerCase() == prefix + ' show me play dough kenny') {
        var showKenny = randNumFromInt(1, 1000);
        if (showKenny == 999) {
            return 'https://cdn.discordapp.com/attachments/1095022465199120466/1095087905594163231/IMG_4705.jpg';
        } else {
            return 'no 🖕';
        }
    }

    if (message.content.toLowerCase() == '<@&1124527413280387092>' || message.content.toLowerCase() == '<@579143676677062676>') {
        return '<@&1124527413280387092>'
    }

    if (message.content.toLowerCase() == prefix + ' do the thug shaker' || message.content.toLowerCase() == prefix + ' thug shake') {
        return 'https://tenor.com/view/thug-shake-thug-shaker-black-ass-shake-gif-25873456'
    }

    if (message.content.toLowerCase() == 'neal bulla') {
        return 'https://media.discordapp.net/attachments/843313803391402028/1081792032185524356/caption.gif'
    }

    if (message.content.toLowerCase() == prefix + ' swaggin') {
        return 'https://cdn.discordapp.com/attachments/1095022465199120466/1231450786551037962/halloween_blunt.png'
    }

    if (message.content.toLowerCase() == 'bed') {
        if (message.author.id == '569736680878374912') {
            message.delete()
            //for(var i = 0; i > 2; i++){
            message.channel.send('hell no')
            //}
        }
    }

    if (message.content.toLowerCase().slice(0, 6) == prefix + ' say') {
        if (message.author.id == '569736680878374912') {
            var channelToSend = message.content.toLowerCase().slice(7, 26);
            var messageToSend = message.content.slice(27)
            message.delete()
            try{
                client.channels.cache.get(channelToSend).send(messageToSend)
            }catch{
                message.channel.send('invalid channel')
            }
            
        }
    }

    //control cmd
    if (controllingBot && message.author.id == '569736680878374912'){
        if(message.content.toLowerCase() != prefix + ' control'){
            message.delete()
            message.channel.send(message.content)
        }
    }

    if (message.content.toLowerCase() == prefix + ' control') {
        if (message.author.id == '569736680878374912' && !controllingBot) {
            message.delete()
            controllingBot = true;
            console.log('controlling true')
        }else if(message.author.id == '569736680878374912' && controllingBot){
            message.delete()
            controllingBot = false;
            console.log('controlling FALSE')
        }
    }
    // also control cmd ^
    

    if (message.content.toLowerCase() == prefix + ' permtest' || message.content.toLowerCase() == prefix + 'you seeing this shit bro') {
        if (message.author.id == '569736680878374912') {
            return 'mad fucked up'
        } else {
            return 'no fuck you'
        }
    }

    


    //minecraft commands

    if (message.content.toLowerCase() == prefix + ' help mc' || message.content.toLowerCase() == 'mc help') {
        message.channel.send(`Public Commands: \nmc start - starts the minecraft server\nmc status - returns the status of the minecraft server \n\nRequires Perms: \nmc stop - stops the minecraft server (DOES NOT WORK ON SERVER CRASH)\nmc stop crash - force stops the minecraft server (ONLY USE THIS ON CRASHES)\n\nnote: all commands only work in the "minecraft" channel`);
    }


    if (message.content.toLowerCase() == 'mc start') {
        
        if (message.guild.members.cache.get(message.author.id).roles.cache.has('1199195759824867380') && message.channelId == '1167909404910297098' && serverStatus == 'off') {
            message.channel.send('Starting...')
            const url = `https://api.smartthings.com/v1/devices/c430e045-684d-4089-8598-54d58cb508d1/commands`;
            const commandBody = {
                commands: [
                    {
                        component: 'main',
                        capability: 'switch',
                        command: 'on',
                        arguments: [],
                    },
                ],
            };

            axios.post(url, commandBody, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    console.log('Device turned on:', response.data);
                    message.channel.send('Server successfully turned on, please wait a few minutes while the server launches')
                    serverStatus = 'starting'
                })
                .catch(error => {
                    console.error('Error:', error);
                });


        }else if(message.channelId != '1167909404910297098'){
            message.channel.send('You cannot use that command in this channel')
        }else if(message.guild.members.cache.get(message.author.id).roles.cache.has('1199195759824867380') && message.channelId == '1167909404910297098' && serverStatus == 'starting'){
            message.channel.send('Server is already starting, please wait a few minutes')
        }else if(message.guild.members.cache.get(message.author.id).roles.cache.has('1199195759824867380') && message.channelId == '1167909404910297098' && serverStatus == 'on'){
            message.channel.send('Server is already running')
        }else if(message.guild.members.cache.get(message.author.id).roles.cache.has('1199195759824867380') && message.channelId == '1167909404910297098' && serverStatus == 'stopping'){
            message.channel.send('Server is currently stopping, please wait')
        }else if(message.channelId == '1167909404910297098'){
            message.channel.send('You do not have permission to use that commmand')
        }

    }


    if (message.content.toLowerCase() == 'mc stop') {
        
        if (message.guild.members.cache.get(message.author.id).roles.cache.has('1199195759824867380') && message.channelId == '1167909404910297098' && serverStatus == 'on') {
            client.channels.cache.get('1167909404910297098').send('Saving game...')
            client.channels.cache.get('1167915400261025913').send('save-all')
            serverStatus = 'stopping';
            waitingForSave = true;
        }else if(message.channelId != '1167909404910297098'){
            message.channel.send('You cannot use that command in this channel')
        }else if(message.guild.members.cache.get(message.author.id).roles.cache.has('1199195759824867380') && message.channelId == '1167909404910297098' && serverStatus == 'stopping'){
            message.channel.send('Server is already stopping.')
        }else if(message.guild.members.cache.get(message.author.id).roles.cache.has('1199195759824867380') && message.channelId == '1167909404910297098' && serverStatus == 'off'){
            message.channel.send('Server is not running')
        }else if(message.guild.members.cache.get(message.author.id).roles.cache.has('1199195759824867380') && message.channelId == '1167909404910297098' && serverStatus == 'starting'){
            message.channel.send('Server is starting, please wait for it to finish before stopping it')
        }else if(message.channelId == '1167909404910297098'){
            message.channel.send('You do not have permission to use that commmand')
        }

    }

    if (message.content.toLowerCase() == 'mc stop crash') {
        
        if (message.guild.members.cache.get(message.author.id).roles.cache.has('1199195759824867380') && message.channelId == '1167909404910297098') {
            message.channel.send('Stopping...')
            const url = `https://api.smartthings.com/v1/devices/c430e045-684d-4089-8598-54d58cb508d1/commands`;
            const commandBody = {
                commands: [
                    {
                        component: 'main',
                        capability: 'switch',
                        command: 'off',
                        arguments: [],
                    },
                ],
            };

            axios.post(url, commandBody, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    console.log('Device turned off:', response.data);
                    message.channel.send('Server stopped. Run "mc start" to start it back up.')
                    serverStatus = 'off'
                })
                .catch(error => {
                    console.error('Error:', error);
                });


        }
    }

    if (message.content.toLowerCase() == 'mc status' && message.channelId == '1167909404910297098') {
        message.channel.send('The server is currently: ' + serverStatus)
    }

    if (message.content.toLowerCase().slice(0, 13) == 'mc set status' && message.author.id == '569736680878374912') {
        serverStatus = message.content.slice(14);
        console.log('set server status to ' + serverStatus);
    }



    //respond to server statuses
    if (message.content.toString().indexOf('Server has started') != -1 && message.author.id == '1167910738984190004') {
        message.channel.send('Server started successfully')
        serverStatus = 'on'
    }
    if (message.content.toString().indexOf('Server has stopped') != -1 && message.author.id == '1167910738984190004') {
        message.channel.send('Server stopped successfully')
        serverStatus = 'off'
    }
    if (message.content.toString().indexOf('Saved the game') != -1 && message.author.id == '1167910738984190004' && message.channelId == '1167915400261025913' && waitingForSave == true) {
        waitingForSave = false;
        client.channels.cache.get('1167909404910297098').send('Stopping server...')
        message.channel.send('stop')
        const url = `https://api.smartthings.com/v1/devices/c430e045-684d-4089-8598-54d58cb508d1/commands`;
            const commandBody = {
                commands: [
                    {
                        component: 'main',
                        capability: 'switch',
                        command: 'off',
                        arguments: [],
                    },
                ],
            };

            axios.post(url, commandBody, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    console.log('Device turned off:', response.data);
                    client.channels.cache.get('1167909404910297098').send('Server powered off successfully. Run "mc start" to start it back up.')
                    serverStatus = 'off'
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        
    }



    // random message and error failsafe
    else {
        randMessageChance = randNumFromInt(1, 1000);
        if (randMessageChance == 100) {
            var chooseResponse = randNumFromInt(1, 7)
            if (chooseResponse == 1) {
                return 'i\'ve just pissed myself'
            }
            if (chooseResponse == 2) {
                return 'my ass burns'
            }
            if (chooseResponse == 3) {
                return 'kill john lennon'
            }
            if (chooseResponse == 4) {
                return 'the irs is after me i have to get out of here'
            }
            if (chooseResponse == 5) {
                return 'carbonated poop water'
            }
            if (chooseResponse == 6) {
                return '<:BefficaRizz:1095088123765063771>'
            }
            if (chooseResponse == 7) {
                return 'https://tenor.com/view/scared-cat-meme-you-have-gif-26575351'
            }if (chooseResponse == 8) {
                return 'you built like shit from a butt'
            }
        }

        return;
    }

}

// check for minecraft bot online status
async function checkUserStatus(userId, guildId) {
    const guild = client.guilds.cache.get(guildId);
    if (!guild) return console.log('Guild not found!');

    try {
        const member = await guild.members.fetch(userId);
        console.log(`${member.user.tag} is currently ${member.presence ? member.presence.status : 'offline'}`);
    } catch (error) {
        console.error('Failed to fetch member:', error);
    }
}

function stopServer(){
    const url = `https://api.smartthings.com/v1/devices/c430e045-684d-4089-8598-54d58cb508d1/commands`;
            const commandBody = {
                commands: [
                    {
                        component: 'main',
                        capability: 'switch',
                        command: 'off',
                        arguments: [],
                    },
                ],
            };

            axios.post(url, commandBody, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    console.log('Device turned off:', response.data);
                    client.channels.cache.get('1167909404910297098').send('Server powered off successfully. Run "mc start" to start it back up.')
                    serverStatus = 'off'
                })
                .catch(error => {
                    console.error('Error:', error);
                });
}

function startServer(){
    client.channels.cache.get('1167909404910297098').send('Starting...')
            const url = `https://api.smartthings.com/v1/devices/c430e045-684d-4089-8598-54d58cb508d1/commands`;
            const commandBody = {
                commands: [
                    {
                        component: 'main',
                        capability: 'switch',
                        command: 'on',
                        arguments: [],
                    },
                ],
            };

            axios.post(url, commandBody, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    console.log('Device turned on:', response.data);
                    message.channel.send('Server successfully turned on, please wait a few minutes while the server launches')
                    client.channels.cache.get('1167909404910297098').send('Server successfully turned on, please wait a few minutes while the server launches')
                    serverStatus = 'starting'
                })
                .catch(error => {
                    console.error('Error:', error);
                });
}


// RAND NUM FUNCTION
function randNumFromInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

client.login(process.env.dcBotToken);
