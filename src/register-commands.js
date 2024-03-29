
var GUILD_ID = '1095022464557383690';
var CLIENT_ID = '1095752613544349816';

const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'hog',
        description: 'shows you a picture of a hog',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.dcBotToken);

(async () =>{
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        )
        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`);

    }
})();
