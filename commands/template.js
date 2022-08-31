//This is a template, you should includde this for every command you want to create.
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('command_name') //the command typed in discord (only lowercase otherwise an error is thrown).
		.setDescription('your description') // the description shown in discord when using the command.
        .addStringOption(option => option.setName('option_name').setDescription('description here'))// add .setRequired(true) if you want to force the user to fill this option
        //ALL OPTIONS in https://discordjs.guide/interactions/slash-commands.html#option-types
    
    ,
	async execute(interaction, gld) {

        //YOUR CODE HERE
        
        //To get the user responses to the options:
        const stringOption = interaction.options.getString('option_name');

    },
};
