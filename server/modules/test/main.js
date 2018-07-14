let core_exec;

module.exports = {
    name: 'TEST',
    load: (execute) => {
        return new Promise((resolve) => {
            core_exec = execute;
            console.log('[TEST] Loaded');
            resolve();
        });
    },
    registerSocket: (socket) => {
        socket.on('module.test.ping', (ack) => {
            ack('Pong');
        });
    }
}