const crawler = require('crawler');
const path = require('path');
import * as fs from 'fs';

let headers: any = [];
let weaponData: any = [];

let dbUrl = 'https://db.fortnitetracker.com';

let cellTypes = {
    IMAGE: 0,
    NAME: 1,
    RARITY: 2,
    DPS: 3,
    DAMAGE: 4,
    ENV_DAMAGE: 5,
    FIRE_RATE: 6,
    MAGAZINE: 7,
    RELOAD_TIME: 8,
};

let innerTagTypes = {
    IMG: 'img',
    LINK: 'a',
};

function sanitizeHeaderName(headerName: string): string {
    let h: any = headerName.split(' ');
    let newHeaderName = '';
    h.forEach((current: string, i: number) => {
        let word: string;
        if (i === 0) {
            word = current.toLowerCase();
        } else {
            word = current[0].toUpperCase() + current.slice(1, current.length);
        }
        newHeaderName += word;
    });
    return newHeaderName;
}

let c: any = new crawler({
    maxConnections: 10,
    // this will be called for each crawled page.
    // jQuery: true,
    callback: (err: any, res: any, done: any) => {
        if (err) {
            console.log(err);
        } else {
            let $: any = res.$;
            // $ is Cheerio by default
            // a lean implementation of core jQuery designed specifically for the
            // server

            $('th').each((i: number, elem: any) => {
                // if (i > 0) {
                let headerName = elem.children[0].data;
                if (headerName === 'Weapon') {
                    headers.push('image');
                    headers.push('name');
                } else {
                    headers.push(sanitizeHeaderName(headerName));
                }
                // console.log(headerName);
                // } else {
                //     console.log(elem.children[0].data);
                //     let headerName = 'image';
                //     headers.push(headerName);
                //     console.log(headerName);
                // }
            });
            // console.log(headers);
            let weapon: any = {};
            $('td').each((i: number, elem: any) => {
                const cell: any = elem.children[0];
                let cellData: any = cell.data;
                let cellType: string = cell.type;
                let columnIndex: number = i % 9;

                if (cellData == '\n') {
                    let innerTag = cell.next;
                    let innerTagType = innerTag.name;
                    switch (innerTagType) {
                        case innerTagTypes.IMG:
                           let weaponImgUrl = innerTag.attribs.src;
                           let fullImgUrl = dbUrl + weaponImgUrl;
                           cellData = fullImgUrl;
                        //    console.log(fullImgUrl);
                           break;
                        case innerTagTypes.LINK:
                            let weaponName = innerTag.children[0].data;
                            let weaponUrl = innerTag.children[0].parent.attribs.href;
                            cellData = {
                                'text': '',
                                'url': ''
                            };
                            cellData.text = weaponName;
                            cellData.url = dbUrl + weaponUrl;
                            // console.log(weaponName);
                            break;
                        default:
                            console.log('ERROR: Unidentified Inner Tag Type.');
                    }
                }
                // console.log(cellData);
                switch (columnIndex) {
                    case cellTypes.IMAGE:
                        // console.log(columnIndex, headers[columnIndex])
                        weapon[headers[columnIndex]] = cellData;
                        break;
                    case cellTypes.NAME:
                        // console.log("In Name");
                        // console.log(columnIndex, headers[columnIndex])
                        weapon[headers[columnIndex]] = cellData;
                        break;
                    case cellTypes.RELOAD_TIME:
                        // console.log(columnIndex, headers[columnIndex])
                        weapon[headers[columnIndex]] = cellData;
                        weaponData.push(weapon);
                        weapon = {};
                        break;
                    default:
                        // console.log(columnIndex, headers[columnIndex])
                        weapon[headers[columnIndex]] = cellData;
                }
                // console.log(headers);
                // console.log(weapon);
            });
            // console.log(JSON.stringify(weaponData, null, 2));
            console.log('* WRITING * TO * LOCAL * DB *');
            let d = new Date().toLocaleDateString();
            let fileName = path.join(__dirname, `../../../database/weapons/all/statistics_${d}.json`);
            // console.log(fileName);
            fs.writeFile(
                fileName,
                JSON.stringify(weaponData, null, 2),
                (error: any) => {
                    if (err) {
                        console.log(error);
                    }
                    console.log('---> WRITING COMPLETE!!');
                }
            );
        }
    }
});

c.queue('https://db.fortnitetracker.com/weapons');
