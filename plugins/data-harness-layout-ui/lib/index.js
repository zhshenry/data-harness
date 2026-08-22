//#region lib/types/index.js
/**
 * Host half of the Data Harness layout plugin: the MCP connector/data-source
 * HTTP bridge. Serves `/api/dsh-layout/mcp` (GET lists discovered MCP servers
 * and the enabled set; POST applies a new enabled set by denying the disabled
 * servers' tools on every live agent). Presentation lives in ./client.js.
 */
/**
 * Group `mcp__<server>__<tool>` tool names by server.
 * @param {{ schemas?: () => Array<{ name?: string }> } | undefined} tools - host tools registry.
 * @returns {Array<{ server: string, toolCount: number, tools: string[] }>} sorted server rows.
 */
function discoverMcp(tools) {
	const schemas = (tools && typeof tools.schemas === 'function') ? tools.schemas() : []
	const byServer = {}
	schemas.forEach(function (s) {
		const name = s && s.name
		if (typeof name !== 'string' || name.indexOf('mcp__') !== 0) return
		const rest = name.slice(5)
		const sep = rest.indexOf('__')
		if (sep <= 0) return
		const server = rest.slice(0, sep)
		if (byServer[server] === undefined) byServer[server] = []
		byServer[server].push(name)
	})
	return Object.keys(byServer).sort().map(function (server) {
		return { server: server, toolCount: byServer[server].length, tools: byServer[server] }
	})
}

/**
 * Collect one request body as UTF-8 text.
 * @param {import('node:http').IncomingMessage} req - the incoming request.
 * @returns {Promise<string>} the full body.
 */
function readBody(req) {
	return new Promise(function (resolve, reject) {
		const chunks = []
		req.on('data', function (c) { chunks.push(c) })
		req.on('end', function () { resolve(Buffer.concat(chunks).toString('utf8')) })
		req.on('error', reject)
	})
}

/** Required service: the web route registry (the plugin row is web-profile-only). */
const inject = ['webServer']

/**
 * Register the MCP bridge route and hold the enabled-set state plus the live
 * restrict disposers.
 * @param {import('@deepseek-ai/cordis').Context} ctx - host root context.
 */
function apply(ctx) {
	const tools = ctx.get('tools')
	const agents = ctx.get('agents')
	const state = { enabled: [], disposers: [] }

	/**
	 * Apply an enabled-server set: deny every disabled server's tools on each
	 * live agent that exposes the tools registry.
	 * @param {string[]} enabled - server names left enabled.
	 * @returns {{ ok: boolean, enabled: string[], denyCount: number, appliedTo: number, error: string | null }} result echo.
	 */
	function applySet(enabled) {
		state.enabled = enabled
		const servers = tools ? discoverMcp(tools) : []
		const deny = []
		servers.forEach(function (srv) {
			if (enabled.indexOf(srv.server) >= 0) return
			srv.tools.forEach(function (t) { deny.push(t) })
		})
		state.disposers.forEach(function (d) { try { d() } catch (e) { /* disposed restrict handle */ } })
		state.disposers = []
		let appliedTo = 0
		let error = null
		if (agents !== undefined && deny.length > 0) {
			agents.list().forEach(function (agent) {
				const toolsvc = agent && agent.ctx && (typeof agent.ctx.get === 'function' ? agent.ctx.get('tools') : agent.ctx.tools)
				if (!toolsvc || typeof toolsvc.restrict !== 'function') return
				try {
					state.disposers.push(toolsvc.restrict({ deny: deny }))
					appliedTo += 1
				} catch (err) {
					error = String((err && err.message) || err)
				}
			})
		}
		return { ok: error === null, enabled: enabled, denyCount: deny.length, appliedTo: appliedTo, error: error }
	}

	ctx.effect(function () {
		return ctx.webServer.register({
			kind: 'exact',
			path: '/api/dsh-layout/mcp',
			handler: async function (req, res) {
				if (req.method === 'GET') {
					res.writeHead(200, { 'Content-Type': 'application/json' })
					res.end(JSON.stringify({ servers: tools ? discoverMcp(tools) : [], enabled: state.enabled }))
					return
				}
				if (req.method === 'POST') {
					let parsed
					try {
						parsed = JSON.parse(await readBody(req))
					} catch (e) {
						res.writeHead(400, { 'Content-Type': 'application/json' })
						res.end(JSON.stringify({ ok: false, error: 'invalid JSON body' }))
						return
					}
					const enabled = (parsed && Array.isArray(parsed.enabledServers))
						? parsed.enabledServers.filter(function (s) { return typeof s === 'string' })
						: []
					const result = applySet(enabled)
					res.writeHead(200, { 'Content-Type': 'application/json' })
					res.end(JSON.stringify(result))
					return
				}
				res.writeHead(405)
				res.end()
			},
		})
	}, 'data-harness-layout-ui: /api/dsh-layout/mcp')
}
//#endregion
export { apply, inject };
