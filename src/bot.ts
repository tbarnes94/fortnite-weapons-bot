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

let helpText: string = 
	`Type **!armory <weapon: *string*> <rarity: *number*>** to display data for a specific weapon.\n
	----------------------------------------------------------------------------
	**weapon:**\n
	        *Assault Rifles:* \`ar, scar, burst, famas, scoped-ar, thermal\`\n
	        *Sniper Rifles:* \`hunting, bolt, sas\`\n
	        *Shotguns:* \`tac, pump, heavy\`\n
	        *Submachine Guns:* \`smg, s-smg, p90\`\n
	        *Pistols:* \`pistol, s-pistol, revolver, deagle, akimbo\`\n
	        *Explosive Weapons*: \`gl, rl, guided\`\n
			*Big Guns*: \`tommy, mini, lmg\`
	----------------------------------------------------------------------------
	**rarity**:\n
	        **1** \`for Common\`\n
	        **2** \`for Uncommon\`\n
	        **3** \`for Rare\`\n
	        **4** \`for Epic\`\n
			**5** \`for Legendary\`
	----------------------------------------------------------------------------`;
	//**statType**: quick, spread, firingRate, range, damage, envDamage, impactDamage, recoil, lootProbability.`;

client.on('message', (msg: any) => {
	let args: any = msg.content.split(' ');
	switch (args[0]) {
		case '!armory':
			try {
				if (args[1] === 'help') {
					msg.channel.send(helpText);
				} else {
					// -- Weapon Shorthand Parser --
					switch (args[1]) {
						case 'ar':
							args[1] = 'assault-rifle-m4';
							break;
						case 'scar':
							args[1] = 'assault-rifle-scar';
							break;
						case 'burst':
							args[1] = 'assault-rifle-burst';
							break;
						case 'famas':
							args[1] = 'assault-rifle-bullpup-burst';
							break;
						case 'scoped-ar':
							args[1] = 'assault-rifle-scoped';
							break;
						case 'bolt':
							args[1] = 'bolt-action-sniper-rifle';
							break;
						case 'p90':
							args[1] = 'compact-gun';
							break;
						case 'tommy':
							args[1] = 'drum-gun';
							break;
						case 'drum':
							args[1] = 'drum-gun';
							break;
						case 'akimbo':
							args[1] = 'dual-pistol';
							break;
						case 'gl':
							args[1] = 'grenade-launcher';
							break;
						case 'guided':
							args[1] = 'guided-missile';
							break;
						case 'missile':
							args[1] = 'guided-missile';
							break;
						case 'deagle':
							args[1] = 'hand-cannon';
							break;
						case 'hunting':
							args[1] = 'hunting-rifle';
							break;
						case 'lmg':
							args[1] = 'light-machine-gun';
							break;
						case 'mini':
							args[1] = 'minigun';
							break;
						case 'rl':
							args[1] = 'rocket-launcher';
							break;
						case 'rocket':
							args[1] = 'rocket-launcher';
							break;
						case 'semi-auto':
							args[1] = 'semi-auto-sniper-rifle';
							break;
						case 'sas':
							args[1] = 'semi-auto-sniper-rifle';
							break;
						case 'smg':
							args[1] = 'submachine-gun';
							break;
						case 's-pistol':
							args[1] = 'suppressed-pistol';
							break;
						case 's-smg':
							args[1] = 'suppressed-smg';
							break;
						case 'pump':
							args[1] = 'pump-shotgun';
							break;
						case 'heavy':
							args[1] = 'heavy-shotgun';
							break;
						case 'tac':
							args[1] = 'tactical-shotgun';
							break;
						case 'thermal':
							args[1] = 'thermal-scoped-assault-rifle';
							break;
						default:
							break;
					}

					// -- Rarity Shorthand Parser --
					switch (args[2]) {
						case '1':
							args[2] = 'Common';
							break;
						case '2':
							args[2] = 'Uncommon';
							break;
						case '3':
							args[2] = 'Rare';
							break;
						case '4':
							args[2] = 'Epic';
							break;
						case '5':
							args[2] = 'Legendary';
							break;
						default:
							break;
					}

					let weapon = require(`../database/weapons/one/${args[1]}-${args[2]}_${d}.json`);
					let keys: string[] = ['quick', 'spread', 'firingRate', 'range', 'damage', 'recoil'];
					for (let k of keys) {
						let embed: any = new discord.RichEmbed()
							.setTitle(`${weapon.name.rarity}`)
							.setAuthor(`${weapon.name.text}`, null, `${weapon.name.url}`)
							.setThumbnail(`${weapon.image}`)
							/*
							* Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
							*/
							.setColor(colorMap[weapon.name.rarity])
							.setFooter('Brought to you by Sarthak, Destroyer of Worlds.')
							/*
							* Takes a Date object, defaults to current date.
							*/
							.setTimestamp();
						// console.log(k);
						for (let key in weapon[k]) { //weapon[args[3]]) {
							let val = weapon[k][key]; //let val = weapon[args[3]][key];
							key = key[0].toUpperCase() + key.slice(1, key.length);
							key = key.split(/(?=[A-Z])/).join(' ');
							// console.log(key);
							// console.log(key);
							embed.setDescription(k);
							embed = embedAddField(embed, key, val, k); //embed = embedAddField(embed, key, val, args[3]);
						}
						msg.channel.send({ embed });
					}
				}
				break;
			} catch (err) {
				msg.channel.send(`**Incorrect Syntax**: try ***!armory help*** for the full description.`);
				break;
			}
	}
});

client.login(config.clientSecret);
