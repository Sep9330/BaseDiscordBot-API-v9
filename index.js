require('dotenv').config()
const path = require('node:path');
const fs = require('node:fs');
const {Client, Collection, GatewayIntentBits} = require('discord.js');

//Choose intents the bot will need visit https://discord.com/developers/docs/topics/gateway#list-of-intents to see all of them.
const client = new Client({intents: [GatewayIntentBits.Guilds]});


//creates a collection for commands
client.commands = new Collection();

//Finds all commands in ./commands folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//Requires and sets all commands
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//Logs in console when the bot is ready
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
})

//command handler
client.on('interactionCreate', async interaction => {
	
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	
	    if(interaction.member.permissions.has("ADMINISTRATOR")){
			try {
				await command.execute(interaction, gld);
			} catch (error) {
				console.error(error);
				await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}else{
			interaction.reply({content: `${interaction.member.user.username} you need to have administrator role to use that command`})
		}
})

//bot logs in with the token in the .env file
client.login(process.env.DISCORDJS_BOT_TOKEN);
