// Minimal Socket.io configuration for PingMe
// No chat events yet — only connection lifecycle hooks

/**
 * Initialize Socket.io bindings.
 * @param {import('socket.io').Server} io
 */
module.exports = function initSocket(io) {
	io.on("connection", (socket) => {
		// Connection established; add chat event handlers later
		// Keep minimal logging to aid development
		console.log(`🔌 Socket connected: ${socket.id}`);

		socket.on("disconnect", (reason) => {
			console.log(`🔌 Socket disconnected: ${socket.id} (${reason})`);
		});
	});
};
