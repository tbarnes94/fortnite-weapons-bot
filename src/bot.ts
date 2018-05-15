const discord = require('discord.js');
const client = new discord.Client();

/* Config import */
let config: any;
console.log(__dirname);
try {
	config = require(`${__dirname}/config.json`);
} catch {
	throw new Error('Please create a config.json file!');
}

const colorMap: any = {
	'Common': 0x7E7E7E,
	'Uncommon': 0x00AA4C,
	'Rare': 0x008EC1,
	'Epic': 0xAC00E6,
	'Legendary': 0xDB9E1C,
};

let d = new Date().toLocaleDateString();

// import { PingCommand } from './commands/ping';
// import { Site } from './commands/site';
// import { Channel } from './commands/channel';
// import { Toggler } from './lib/toggler';

// let site = new Site();
// let channel = new Channel();

let typeAnnoy = false;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('typingStart', (channel: any, user: any) => {
	if (typeAnnoy) {
		user.sendMessage('Typing Annoyer');
	}
});

client.on('typingStop', (channel: any, user: any) => {
	if (typeAnnoy) {
		user.send('Typing Annoyer');
	}
});

function embedAddField(embed: any, key: string | any, val: string | any, statType: string): any {
	// if (statType === 'lootProbability') {
	// 	embed.addField(key, key.title.text);
	// 	embed.addField('url', key.title.url);
	// } else {
		return embed.addField(key, val);
	// }
}

client.on('message', (msg: any) => {
	let args: any = msg.content.split(' ');
	switch (args[0]) {
		case '/help':
			const embed1 = new discord.RichEmbed()
				.setTitle('Commands Help')
				.setAuthor('MyMICDS BOT', 'https://mymicds.net/assets/logo/logo.svg')
				/*
				* Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
				*/
				.setColor(0x42F4C2)
				.setDescription('Hopefully this will help you navigate the bot')
				.setFooter('This bot was created by Alex Migala using the discord.js library | Powered by MyMICDS.net backend',
				// tslint:disable-next-line:max-line-length
				'https://camo.githubusercontent.com/40129aa4640399b5e65cc3c101361a6a0b5d6467/68747470733a2f2f646973636f72642e6a732e6f72672f7374617469632f6c6f676f2e737667')
				/*
				* Takes a Date object, defaults to current date.
				*/
				.setTimestamp()
				// .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
				.addField('Help',
					'!help display help')

				.addField('!checksite', 'Checks to see if the MyMICDS.net site is online')

				.addField('!quote', 'Gets a random quote from our database')

				.addField('!lunch', 'Gets the lunch for today')

				.addField('!break', 'Gets the next long weekend')

				.addField('!stats', 'Gets the amount of people registered with the site')

				.addField('!sports', 'Gets the sports scores')

				.addField('!channel', 'Get stats on the channel')

				// .addField('!note', 'Gets the curent notification')
				.addField('!weather', 'Gets the current weather at MICDS')
			/*
			* Inline fields may not display as inline if the thumbnail and/or image is too big.
			*/
			// .addField('Inline Field', 'They can also be inline.', true)
			/*
			* Blank field, useful to create some space.
			*/
			// .addBlankField(true)
			// .addField('Inline Field 3', 'You can have a maximum of 25 fields.', true);
			msg.channel.send({ embed1 });
			break;
		case '!weapon':
			try {
				if (args[1] === 'help') {
					msg.channel.send('Type ***!weapon <weapon> <rarity> <statType>*** to display data for a specific weapon.\n\n\
					**weapon:** assault-rifle-m4, assault-rifle-scar, assault-rifle-burst, etc.\n\n\
					**rarity**: common, uncommon, rare, epic, legendary\n\n\
					**statType**: quick, spread, firingRate, range, damage, envDamage, impactDamage, recoil, lootProbability.');
				}
				let weapon = require(`../database/weapons/one/${args[1]}-${args[2]}_${d}.json`);
				let embed: any = new discord.RichEmbed()
					.setTitle(`${weapon.name.rarity}`)
					.setAuthor(`${weapon.name.text}`, null, `${weapon.name.url}`)
					.setThumbnail(`${weapon.image}`)
					/*
					* Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
					*/
					.setColor(colorMap[weapon.name.rarity])
					.setDescription('<Description>')
					.setFooter('Brought to you by Sarthak, Destroyer of Worlds.')
					/*
					* Takes a Date object, defaults to current date.
					*/
					.setTimestamp();
				for (let key in weapon[args[3]]) {
					let val = weapon[args[3]][key];
					key = key[0].toUpperCase() + key.slice(1, key.length);
					key = key.split(/(?=[A-Z])/).join(' ');
					// console.log(key);
					embed = embedAddField(embed, key, val, args[3]);
				}

				msg.channel.send({ embed });
				break;
			} catch (err) {
				msg.channel.send(`**Incorrect Syntax**: try ***!weapon help*** for the full description.`);
				break;
			}
	}
});

client.login(config.clientSecret);
