const { sync, async, registerListener } = require('.');

async function test(f){
    const start = new Date;
    const result = await f();
    const end = new Date;
    console.log(`
*****************************
function ${f.name | 'anonymous'}:
execution took ${end - start}ms
with result`, result, `
*****************************`);
}

function testCallback(f){
    let lastTime = new Date;
    f((...args) => {
        const now = new Date;
        console.log(`
*****************************
callback for ${f.name | 'anonymous'}:
last time executed ${now - lastTime}ms ago
executed with args:`, ...args, `
*****************************`);
        lastTime = now;
    })
}

(async () => {
    await test(sync);
    await test(async);
    testCallback(registerListener);
})()
