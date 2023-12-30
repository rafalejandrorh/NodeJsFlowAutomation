module.exports = [
    {
        script: 'src/API/index.js',
        name: 'API-WorkflowAutomation',
        exec_mode: 'cluster',
        instances: 2
    }, 
    {
        script: 'src/bot/index.js',
        name: 'BOT-WorkflowAutomation'
    }
]