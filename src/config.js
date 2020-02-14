const config = {
    EDITOR_API_URL: process.env.EDITOR_API_URL || "http://localhost:4001",
    SERVER_API_URL: process.env.SERVER_API_URL || "http://localhost:3030",
    EDITOR_SOCKET_URL: process.env.EDITOR_SOCKET_URL || "ws://localhost:4001",
}
console.log('config', config)
export default config
