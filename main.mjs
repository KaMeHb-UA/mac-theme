import { spawn, spawnSync } from 'child_process'
import { darkDockOnly, theme, accent, themeColors, accentMap, themeColorsMap } from './constants.mjs'

const EMPTYOBJ = Object.create(null);

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
    let i;
    for(i in obj0){
        if(!(i in obj1) || obj0[i][0] !== obj1[i][0] || obj0[i][1] !== obj1[i][1]){
            return true
        }
    }
    return false
}

function buildTheme(theme, accent){
    return Object.assign({ accent }, themeColorsMap[theme], (accent[themeColors] || EMPTYOBJ)[theme] || EMPTYOBJ)
}

export function sync(){
    return buildTheme(getThemeSync(), getAccentSync())
}

export default async function async(){
    const [ accent, theme ] = await Promise.all([getAccentAsync(), getThemeAsync()]);
    return buildTheme(theme, accent)
}

export function registerListener(listener, timeout = 1000){
    let a = true,
        last = {0:0};
    (async () => {
        while(a){
            const curr = await async();
            if(diff(last, curr)) await listener(curr);
            last = curr;
            await wait(timeout)
        }
    })();
    return () => { a = false }
}
