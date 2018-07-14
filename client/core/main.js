const fs = require('fs');
const socketIO = require('socket.io-client');

let modules = [];


function execute(moduleName, functionName, ...args) {
    let module = modules.filter(m => m.name === moduleName)[0];
    if (module === undefined || module === null) {
        console.error('[CORE] execute : module ' + moduleName + ' do not exist.');
    }
    else if (module[functionName] === undefined || module[functionName] === null) {
        console.error('[CORE] execute : function ' + functionName + ' of module ' + moduleName + ' do not exist.');
    } else {
        return module[functionName](...args);
    }
}

async function start() {

    // 1- first, we load each modules
    async function loading() {
        console.log('[CORE] Loading');
        fs.readdirSync('modules').filter((moduleDir) => {
            fs.readdirSync('modules/' + moduleDir).filter(
                (file) => {
                    let module = require('../modules/' + moduleDir + '/' + file);
                    modules.push(module);
                });
        });

        let loadingPromises = [];
        for (let module of modules) {
            loadingPromises.push(module.load(execute));
        }

        await Promise.all(loadingPromises);
        console.log('[CORE] Loading finished');
    }

    await loading();


    // 2- secondly, we connect to the server
    let socket = socketIO.connect("http://127.0.0.1:2000");
    socket.on('connect', () => {
        console.log('[CORE] Connected');
        for (let module of modules) {
            module.registerSocket(socket);
        }
        console.log('[CORE] Ready...');
        document.body.dispatchEvent(new Event('CORE.READY'));
    });
}

start();



