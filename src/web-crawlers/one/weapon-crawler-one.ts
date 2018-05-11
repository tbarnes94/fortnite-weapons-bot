const crawler: any = require('crawler');
import * as fs from 'fs';
import { IWeaponAll } from '../../models/iweapon.all';
import { IWeaponOne } from '../../models/iweaponone.one';
const d = new Date().toLocaleDateString();
const weapons: IWeaponAll[] = require(`../../../database/weapons/all/statistics_${d}.json`);
// let imgSet: Set<string> = new Set<string>();
// weapons.forEach((e) => { imgSet.add(e.image); });

let cellTypes = [
    ['quick', 'damage'],
    ['quick', 'criticalHitChance'],
    ['quick', 'criticalHitDamage'],
    ['quick', 'fireRate'],
    ['quick', 'magazineSize'],
    ['quick', 'range'],
    ['quick', 'durability'],
    ['quick', 'reloadTime'],
    ['quick', 'ammoCost'],
    ['quick', 'impact'],
    ['spread', 'base'],
    ['spread', 'downsights'],
    ['spread', 'sprinting'],
    ['spread', 'jumpFall'],
    ['spread', 'standingStill'],
    ['spread', 'crouching'],
    ['firingRate', 'normal'],
    ['firingRate', 'burst'],
    ['range', 'pb'],
    ['range', 'mid'],
    ['range', 'long'],
    ['range', 'max'],
    ['damage', 'pbRange'],
    ['damage', 'midRange'],
    ['damage', 'longRange'],
    ['damage', 'maxRange'],
    ['envDamage', 'pbRange'],
    ['envDamage', 'midRange'],
    ['envDamage', 'longRange'],
    ['envDamage', 'maxRange'],
    ['impactDamage', 'pbRange'],
    ['impactDamage', 'midRange'],
    ['impactDamage', 'longRange'],
    ['impactDamage', 'maxRange'],
    ['recoil', 'horizontal'],
    ['recoil', 'horizontalGamepad'],
    ['recoil', 'vertical'],
    ['recoil', 'verticalGamepad'],
    ['recoil', 'angleMax'],
    ['recoil', 'angleMin'],
    ['recoil', 'downsights'],
    ['recoil', 'interpSpeed'],
    ['recoil', 'interpSpeedRecovery'],
    ['lootProbability', 'floorLootWarmup', 'title'],
    ['lootProbability', 'floorLootWarmup', 'weaponName'],
    ['lootProbability', 'floorLootWarmup', 'chance'],
    ['lootProbability', 'floorLootWarmup', 'realChance'],
    ['lootProbability', 'floorLoot', 'title'],
    ['lootProbability', 'floorLoot', 'weaponName'],
    ['lootProbability', 'floorLoot', 'chance'],
    ['lootProbability', 'floorLoot', 'realChance'],
    ['lootProbability', 'chest', 'title'],
    ['lootProbability', 'chest', 'weaponName'],
    ['lootProbability', 'chest', 'chance'],
    ['lootProbability', 'chest', 'realChance'],
    ['lootProbability', 'supplyDrop', 'title'],
    ['lootProbability', 'supplyDrop', 'weaponName'],
    ['lootProbability', 'supplyDrop', 'chance'],
    ['lootProbability', 'supplyDrop', 'realChance'],
];

let supplyDropBool = false;

let weaponData: any;
resetData();

function resetData() {
    weaponData = {
        image: '',
        name: {
            text: '',
            url: '',
            rarity: '',
        },
        quick: {
            damage: '',
            criticalHitChance: '',
            criticalHitDamage: '',
            fireRate: '',
            magazineSize: '',
            range: '',
            durability: '',
            reloadTime: '',
            ammoCost: '',
            impact: '',
        },
        spread: {
            base: '',
            downsights: '',
            sprinting: '',
            jumpFall: '',
            standingStill: '',
            crouching: '',
        },
        firingRate: {
            normal: '',
            burst: '',
        },
        range: {
            pb: '',
            mid: '',
            long: '',
            max: '',
        },
        damage: {
            pbRange: '',
            midRange: '',
            longRange: '',
            maxRange: '',
        },
        envDamage: {
            pbRange: '',
            midRange: '',
            longRange: '',
            maxRange: '',
        },
        impactDamage: {
            pbRange: '',
            midRange: '',
            longRange: '',
            maxRange: '',
        },
        recoil: {
            horizontal: '',
            horizontalGamepad: '',
            vertical: '',
            verticalGamepad: '',
            angleMax: '',
            angleMin: '',
            downsights: '',
            interpSpeed: '',
            interpSpeedRecovery: '',
        },
        lootProbability: {
            floorLootWarmup: {
                title: {
                    text: '',
                    url: '',
                },
                weaponName: '',
                chance: '',
                realChance: '',
            },
            floorLoot: {
                title: {
                    text: '',
                    url: '',
                },
                weaponName: '',
                chance: '',
                realChance: '',
            },
            chest: {
                title: {
                    text: '',
                    url: '',
                },
                weaponName: '',
                chance: '',
                realChance: '',
            },
            supplyDrop: {
                title: {
                    text: '',
                    url: '',
                },
                weaponName: '',
                chance: '',
                realChance: '',
            },
        }
    };
}

let dbUrl = 'https://db.fortnitetracker.com';
// let testWeaponUrl = '/weapons/assault-rifle-burst-common';
// let fullUrl = dbUrl + testWeaponUrl;
let weaponCtr = 0;

let c: any = new crawler({
    // rateLimit: 5,
    maxConnections: 1,
    // this will be called for each crawled page.
    // jQuery: true,
    callback: (err: any, res: any, done: any) => {
        if (err) {
            // console.log('THERE WAS AN ERROR!!!');
            console.log(err);
        } else {
            // console.log(JSON.stringify(weapons[weaponCtr], null, 2));
            weaponData.image = weapons[weaponCtr].image;
            weaponData.name.text = weapons[weaponCtr].name.text;
            weaponData.name.url = weapons[weaponCtr].name.url;
            weaponData.name.rarity = weapons[weaponCtr].rarity;
            // console.log(weaponCtr, weaponData.name.text, weaponData.name.rarity);
            console.log(`QUEUEING UP ${weaponData.name.url}. . . `);
            let $: any = res.$;
            // $ is Cheerio by default
            // a lean implementation of core jQuery designed specifically for the
            // server
            let ctr = 0;
            $('td')
                .each((i: number, elem: any) => {
                    let cellData = elem.children[0].data;
                    if (cellData === '\n') {
                        cellData = {
                            'text': '',
                            'url': ''
                        };
                        cellData.text = elem.children[1].children[0].data;
                        cellData.url = dbUrl + elem.children[1].attribs.href;
                    }
                    // QUICK INFO
                    if (i < 20 && i % 2 === 1) {
                        if (i === 1) {
                            // console.log('--QUICK INFORMATION--');
                        }
                        // console.log(cellData);
                        weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]] = cellData;
                        ctr++;
                    } else
                    // SPREAD
                    if ( i >= 26 && i < 38 && i % 2 === 1) {
                        if (i === 27) {
                            // console.log('--SPREAD--');
                        }
                        // console.log(cellData);
                        weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]] = cellData;
                        ctr++;
                    } else
                    // FIRING RATE
                    if ( i >= 38 && i < 40) {
                        if (i === 38) {
                            // console.log('--FIRING RATE--');
                        }
                        // console.log(cellData);
                        weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]] = cellData;
                        ctr++;
                    } else
                    // RANGE
                    if ( i >= 40 && i < 44) {
                        if (i === 40) {
                            // console.log('--RANGE--');
                        }
                        // console.log(cellData);
                        weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]] = cellData;
                        ctr++;
                    } else
                    // DAMAGE
                    if ( i >= 44 && i < 48) {
                        if (i === 44) {
                            // console.log('--DAMAGE--');
                        }
                        // console.log(cellData);
                        weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]] = cellData;
                        ctr++;
                    } else
                    // ENVIRONMENTAL DAMAGE
                    if ( i >= 48 && i < 52) {
                        if (i === 48) {
                            // console.log('--ENVIRONMENTAL DAMAGE--');
                        }
                        // console.log(cellData);
                        weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]] = cellData;
                        ctr++;
                    } else
                    // IMPACT DAMAGE
                    if ( i >= 52 && i < 56) {
                        if (i === 52) {
                            // console.log('--IMPACT DAMAGE--');
                        }
                        // console.log(cellData);
                        weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]] = cellData;
                        ctr++;
                    } else
                    // RECOIL
                    if ( i >= 65 && i < 83 && i % 2 === 0) {
                        if (i === 65) {
                            // console.log('--RECOIL--');
                        }
                        // console.log(cellData);
                        weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]] = cellData;
                        ctr++;
                    } else
                    // LOOT PROBABILITY
                    if ( i >= 83 && i < 99) {
                        if (i === 83) {
                            // console.log('--LOOT PROBABILITY--');
                        }
                        // console.log(cellData);
                        weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]][cellTypes[ctr][2]] = cellData;
                        ctr++;
                    } else
                    // LOOT PROBABILITY { SUPPLY DROP }
                    if (i >= 99 && i < 103) {
                        if (i === 99 && cellData.text === 'Supply drop') {
                            supplyDropBool = true;
                            // console.log('--SUPPLY DROP--');
                        }
                        // console.log(cellData);
                        if (supplyDropBool) {
                            weaponData[cellTypes[ctr][0]][cellTypes[ctr][1]][cellTypes[ctr][2]] = cellData;
                            ctr++;
                        }
                    }
            });
            // console.log(weaponData);
            // console.log(JSON.stringify(weaponData, null, 2));
            let weaponUrlArr = weaponData.name.url.split('/');
            let weaponFN = weaponUrlArr[weaponUrlArr.length - 1];
            // console.log(weaponFN);
            let d = new Date().toLocaleDateString();
            console.log(`* WRITING * TO * /weapons/one/${weaponFN}_${d}.json *`);
            fs.writeFileSync(
                `${__dirname}/../../../database/weapons/one/${weaponFN}_${d}.json`,
                JSON.stringify(weaponData, null, 2)
            );
            console.log('---> WRITING COMPLETE!!\n');
            resetData();
            weaponCtr++;
        }
        done();
    }
});

let weaponsUrlArr: string[] = new Array<string>();

weapons.forEach((e) => {
    weaponsUrlArr.push(e.name.url);
});

c.queue(weaponsUrlArr);
