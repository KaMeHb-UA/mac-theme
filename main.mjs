import { spawn, spawnSync } from 'child_process'

const darkDockOnly = 'NSRequiresAquaSystemAppearance',
    theme = 'AppleInterfaceStyle',
    accent = 'AppleAccentColor',
    themeColors = Symbol(),
    accentMap = {
        [-1]: {
            0: '999999',
            1: '999999',
            [themeColors]: {
                0: {
                    closeBtn: [ '8e8e93', '8d8d92' ],
                    minimizeBtn: [ '8e8e93', '8d8d92' ],
                    maximizeBtn: [ '8e8e93', '8d8d92' ],
                },
                1: {
                    closeBtn: [ '9f9fa4', '9a9a9f' ],
                    minimizeBtn: [ '9f9fa4', '9a9a9f' ],
                    maximizeBtn: [ '9f9fa4', '9a9a9f' ],
                }
            }
        },
        0: [ 'dc382f', 'f64035' ],
        1: [ 'fd8000', 'ff9000' ],
        2: [ 'e0aa00', 'fabe00' ],
        3: [ '35ad21', '3cc025' ],
        4: [ '145fce', '1769e7' ],
        5: [ '933992', 'a441a3' ],
        6: [ 'c63572', 'de3c7f' ],
    },
    themeColorsMap = {
        0: {
            heading: [ '353535', '414141' ],
            headingButtons: [ '656565', '6c6c6c'],
            selectButtons: [ '656565', '656565' ],
            radioCheckButtons: [ '6c6c6c', '515151' ],
            appBg: [ '2e2e2e', '323232' ],
            closeBtn: [ 'fc4f51', 'fc4b4e' ],
            minimizeBtn: [ 'fec532', 'febe30' ],
            maximizeBtn: [ '38d544', '36cd40' ],
            borders: [ 'afafaf', 'cfcfcf', 'd5d5d5', 'aaa' ],
        },
        1: {
            heading: [ 'd0d0d0', 'e5e5e5' ],
            headingButtons: [ 'f1f1f1', 'fff'],
            selectButtons: [ 'fff', 'fff' ],
            radioCheckButtons: [ 'fff', 'fff' ],
            appBg: [ 'ececec', 'ececec' ],
            closeBtn: [ 'fd5857', 'fd5858' ],
            minimizeBtn: [ 'fec12e', 'febe30' ],
            maximizeBtn: [ '34d13e', '36cd40' ],
            borders: [ 'fff0', 'ffffff0f', '464646', '000' ],
        },
    };

function getOpt(spawn, option){
    return spawn('defaults', [ 'read', '-g', option ], { encoding: 'utf-8' })
}

function getOptSync(option){
    return getOpt(spawnSync, option).stdout.split('\n')[0]
}

function getOptAsync(option){
    return new Promise((resolve, reject) => {
        let a = '';
        const cp = getOpt(spawn, option);
        cp.on('error', reject);
        cp.stdout.on('data', c => a += c);
        cp.stdout.on('close', () => resolve(a.split('\n')[0]))
    })
}

function getThemeSync(){
    try{
        return getOptSync(darkDockOnly) == 1 ? 1 : getOptSync(theme) === 'Dark' ? 0 : 1
    } catch(e){
        return 1
    }
}

async function getThemeAsync(){
    const isDockOnlyDark = getOptAsync(darkDockOnly),
        appliedTheme = getOptAsync(theme);
    try{
        return (await isDockOnlyDark) == 1 ? 1 : (await appliedTheme) === 'Dark' ? 0 : 1
    } catch(e){
        return 1
    }
}

function getAccentSync(){
    try{
        return accentMap[getOptSync(accent) || 4]
    } catch(e){
        return accentMap[4]
    }
}

async function getAccentAsync(){
    try{
        return accentMap[(await getOptAsync(accent)) || 4]
    } catch(e){
        return accentMap[4]
    }
}

function wait(ms){
    return new Promise(r => setTimeout(r, ms))
}

function diff(obj0, obj1){
    const diff = { length: 0, 0: {}, 1: {} };
    let i;
    for(i in obj0){
        if(obj0[i][0] !== obj1[i][0] || obj0[i][1] !== obj1[i][1]){
            diff.length++;
            diff[0][i] = obj0[i];
            diff[1][i] = obj1[i];
        }
    }
    return diff
}

export function sync(){
    const accent = getAccentSync();
    return Object.assign({ accent }, themeColorsMap[getThemeSync()], accent[themeColors] || {})
}

export default async function async(){
    const [ accent, theme ] = await Promise.all([getAccentAsync(), getThemeAsync()]);
    return Object.assign({ accent }, themeColorsMap[theme], accent[themeColors] || {})
}

export function registerListener(listener, timeout = 1000){
    let a = true,
        last = {};
    (async () => {
        while(a){
            const curr = await async();
            if(diff(last, curr).length) await listener(curr);
            last = curr;
            await wait(timeout)
        }
    })();
    return () => { a = false }
}
