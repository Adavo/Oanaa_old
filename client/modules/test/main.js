let core_exec;
let core_events;

module.exports = {
    name: 'TEST',
    load: (execute, events) => {
        return new Promise((resolve) => {
            core_exec = execute;
            core_events = events;

            // register the events
            document.body.addEventListener('CORE.READY', () => {
                core_socket.emit('module.test.ping', (answer) => { console.log('[TEST] ' + answer); });
            });


            console.log('[TEST] Loaded');
            resolve();
        });
    },
    registerSocket: (socket) => {
        core_socket = socket;
    }
}