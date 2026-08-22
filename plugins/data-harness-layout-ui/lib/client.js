window.__ModuleLoader__.load({
	id: "data-harness-layout-ui",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		const React = require("react");
		let { BrandWordmark } = require("@deepseek-ai/dsh-client-ui-primitives");
		/**
		 * Data Harness database brand glyph. Stroke reads `currentColor`, so the host
		 * surface's color and (in the conversation hero) hover motion still apply.
		 * @param {{ size?: number, className?: string }} props - host-supplied mark presentation.
		 * @returns the database mark.
		 */
		function DatabaseMark({ size, className }) {
			return react_jsx_runtime.jsxs("svg", {
				width: size,
				height: size,
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				className: className,
				children: [
					react_jsx_runtime.jsx("ellipse", { cx: "12", cy: "5", rx: "8", ry: "3" }),
					react_jsx_runtime.jsx("path", { d: "M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" }),
					react_jsx_runtime.jsx("path", { d: "M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" })
				]
			});
		}
		/**
		 * DeepSeek Harness badge plate: the trailing "HARNESS" chip from the
		 * official wordmark, cropped out of a full BrandWordmark render. The
		 * plate fill rides currentColor and its letterforms are knocked out in
		 * the inverted label color, so it stays legible in both themes.
		 * @param {{ height?: number }} props - badge height in px (width follows 52:14).
		 * @returns the HARNESS badge.
		 */
		function HarnessBadge({ height = 16 }) {
			const scale = height / 14;
			return react_jsx_runtime.jsx("span", {
				"aria-hidden": "true",
				style: {
					position: "relative",
					display: "inline-flex",
					width: 52 * scale,
					height: height,
					overflow: "hidden",
					flex: "none"
				},
				children: react_jsx_runtime.jsx("span", {
					style: { position: "absolute", left: -129.348 * scale, top: -5.5 * scale, lineHeight: 0 },
					children: react_jsx_runtime.jsx(BrandWordmark, { size: 24 * scale })
				})
			});
		}
		/**
		 * Data Harness brand name. The shell's brand-name span is an inline-flex row
		 * (gap 6px, centered), so this occupant supplies the wordmark text plus a
		 * trailing HARNESS badge. Text aligns to the official wordmark's heavier
		 * baseline (20px/600, tighter tracking) rather than the shell's 18px/0.04em
		 * fallback.
		 * @returns the "Data Agent" name with a trailing HARNESS badge.
		 */
		function DataAgentName() {
			return react_jsx_runtime.jsxs(react_jsx_runtime.Fragment, {
				children: [
					react_jsx_runtime.jsx("span", {
						style: { fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: "24px" },
						children: "Data Agent"
					}),
					react_jsx_runtime.jsx(HarnessBadge, { height: 16 })
				]
			});
		}
		/**
		 * Empty placeholder page for a not-yet-shipped settings section. Shows
		 * the section's Chinese title plus a beta note; real pages replace this
		 * occupant later.
		 * @param {string} title - the section's display name.
		 * @returns a component that renders the placeholder copy.
		 */
		function makePlaceholderSection(title) {
			return function PlaceholderSection() {
				return react_jsx_runtime.jsx("div", {
					style: { padding: "32px 24px", color: "var(--dsw-alias-label-secondary)", fontSize: 14, lineHeight: 1.6 },
					children: title + " 功能正在开发中（Beta）"
				});
			};
		}

		// ── MCP connector / data-source surface (ported from the wsdemo prototype) ──

		/** GET the MCP server list plus enabled set from the host bridge route. */
		function mcpList() {
			return fetch("/api/dsh-layout/mcp").then(function (r) {
				if (!r.ok) throw new Error("HTTP " + r.status);
				return r.json();
			});
		}

		/**
		 * POST a new enabled-server set; resolves with the apply result echo.
		 * @param {string[]} enabledServers - server names left enabled.
		 */
		function mcpSet(enabledServers) {
			return fetch("/api/dsh-layout/mcp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ enabledServers: enabledServers })
			}).then(function (r) {
				if (!r.ok) throw new Error("HTTP " + r.status);
				return r.json();
			});
		}

		const ICON_FOLDER = "M5.05582 0.518756L4.50669 0.86654L5.05582 0.518756ZM13 9.4837L13.65 9.4837L13.65 3.53962L13 3.53962L12.35 3.53962L12.35 9.4837L13 9.4837ZM11.3264 1.86603L11.3264 1.21603L6.52313 1.21603L6.52313 1.86603L6.52313 2.51603L11.3264 2.51603L11.3264 1.86603ZM5.58054 1.34727L6.12968 0.999489L5.60495 0.170972L5.05582 0.518756L4.50669 0.86654L5.03141 1.69506L5.58054 1.34727ZM4.11323 1.23058e-13L4.11323 -0.65L1.67359 -0.65L1.67359 5.00699e-14L1.67359 0.65L4.11323 0.65L4.11323 1.23058e-13ZM0 1.67359L-0.65 1.67359L-0.65 9.4837L0 9.4837L0.65 9.4837L0.65 1.67359L0 1.67359ZM11.3264 11.1573L11.3264 10.5073L1.67359 10.5073L1.67359 11.1573L1.67359 11.8073L11.3264 11.8073L11.3264 11.1573ZM0 9.4837L-0.65 9.4837C-0.65 10.767 0.390308 11.8073 1.67359 11.8073L1.67359 11.1573L1.67359 10.5073C1.10828 10.5073 0.65 10.049 0.65 9.4837L0 9.4837ZM1.67359 5.00699e-14L1.67359 -0.65C0.390307 -0.65 -0.65 0.390309 -0.65 1.67359L0 1.67359L0.65 1.67359C0.65 1.10828 1.10828 0.65 1.67359 0.65L1.67359 5.00699e-14ZM5.05582 0.518756L5.60495 0.170972C5.28121 -0.340193 4.71829 -0.65 4.11323 -0.65L4.11323 1.23058e-13L4.11323 0.65C4.27282 0.65 4.4213 0.731715 4.50669 0.86654L5.05582 0.518756ZM6.52313 1.86603L6.52313 1.21603C6.36354 1.21603 6.21507 1.13431 6.12968 0.999489L5.58054 1.34727L5.03141 1.69506C5.35515 2.20622 5.91808 2.51603 6.52313 2.51603L6.52313 1.86603ZM13 3.53962L13.65 3.53962C13.65 2.25634 12.6097 1.21603 11.3264 1.21603L11.3264 1.86603L11.3264 2.51603C11.8917 2.51603 12.35 2.97431 12.35 3.53962L13 3.53962ZM13 9.4837L12.35 9.4837C12.35 10.049 11.8917 10.5073 11.3264 10.5073L11.3264 11.1573L11.3264 11.8073C12.6097 11.8073 13.65 10.767 13.65 9.4837L13 9.4837Z";
		const ICON_CHECK = "M15.0498 3.92579L8.49512 12.3818C8.25774 12.6881 8.04517 12.9645 7.84668 13.1689C7.63957 13.3823 7.38732 13.5841 7.04492 13.6719C6.86373 13.7183 6.6757 13.7346 6.48926 13.7197C6.13666 13.6915 5.8528 13.5355 5.6123 13.3604C5.38201 13.1926 5.12573 12.9567 4.83984 12.6953L1.03125 9.21289L1.96875 8.1875L5.77734 11.6699C6.08684 11.9529 6.27773 12.1249 6.43066 12.2363C6.50183 12.2882 6.54699 12.3135 6.57324 12.3252C6.58525 12.3305 6.59269 12.3322 6.5957 12.333C6.59802 12.3336 6.59961 12.334 6.59961 12.334C6.63317 12.3367 6.66758 12.3335 6.7002 12.3252C6.7002 12.3252 6.70211 12.3251 6.7041 12.3242C6.70698 12.3229 6.71348 12.319 6.72461 12.3115C6.74849 12.2956 6.78843 12.2642 6.84961 12.2012C6.98138 12.0654 7.13957 11.8628 7.39648 11.5313L13.9502 3.07422L15.0498 3.92579Z";
		const ICON_PLUS = "M8.64453 1.5V7.34961H14.5V8.65039H8.64453V14.5H7.34473V8.65039H1.5V7.34961H7.34473V1.5H8.64453Z";
		const ICON_BASE = { display: "inline-flex", flex: "none", width: 16, height: 16, alignItems: "center", justifyContent: "center" };

		/**
		 * 16px filled-path icon wrapped in a fixed inline-flex seat.
		 * @param {string} d - path data.
		 * @param {string | undefined} transform - optional svg transform.
		 * @param {string} color - css color for the glyph.
		 */
		function svgIcon(d, transform, color) {
			const pathProps = { d: d, fill: "currentColor" };
			if (transform !== undefined) pathProps.transform = transform;
			return React.createElement("span", { style: Object.assign({}, ICON_BASE, { color: color }) },
				React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" },
					React.createElement("path", pathProps)));
		}

		/**
		 * Plug glyph for MCP connectors (stroke, currentColor).
		 * @param {string} color - css color for the glyph.
		 * @param {number} size - glyph size in px (default 16).
		 */
		function plugIcon(color, size) {
			const s = size || 16;
			return React.createElement("span", { style: { display: "inline-flex", flex: "0 0 auto", width: s, height: s, color: color } },
				React.createElement("svg", { width: s, height: s, viewBox: "0 0 16 16", fill: "none" },
					React.createElement("path", { d: "M6.5 6V2", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" }),
					React.createElement("path", { d: "M9.5 6V2", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" }),
					React.createElement("path", { d: "M5 6h6v3a3 3 0 0 1-6 0Z", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" }),
					React.createElement("path", { d: "M8 12v2.5", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" })));
		}

		/**
		 * Database glyph for data sources (stroke, currentColor).
		 * @param {string} color - css color for the glyph.
		 */
		function databaseIcon(color) {
			return React.createElement("span", { style: Object.assign({}, ICON_BASE, { color: color }) },
				React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" },
					React.createElement("ellipse", { cx: 8, cy: 4, rx: 5, ry: 2, stroke: "currentColor", strokeWidth: 1.3 }),
					React.createElement("path", { d: "M3 4v8c0 1.1 2.24 2 5 2s5-.9 5-2V4", stroke: "currentColor", strokeWidth: 1.3 }),
					React.createElement("path", { d: "M3 8c0 1.1 2.24 2 5 2s5-.9 5-2", stroke: "currentColor", strokeWidth: 1.3 })));
		}

		/** Menu-card chrome mirroring the shared Menu primitive (radius 12, shadow lv3). */
		const MENU_CARD = {
			boxSizing: "border-box", padding: "4px", display: "flex", flexDirection: "column", gap: 0,
			border: "1px solid var(--dsw-alias-border-inverted)", borderRadius: "12px",
			background: "var(--dsw-specific-menu)", boxShadow: "var(--dsw-shadow-lv3)",
			position: "fixed", zIndex: 1100, minWidth: "218px", maxWidth: "360px"
		};
		const ITEM_STYLE = {
			display: "flex", alignItems: "center", gap: "8px", width: "100%", minHeight: "40px",
			padding: "8px 10px", border: "none", borderRadius: "10px", background: "transparent",
			cursor: "pointer", fontSize: "14px", lineHeight: "22px",
			color: "var(--dsw-alias-label-primary)", textAlign: "left"
		};
		const LABEL_STYLE = { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };
		const FOOTER_STYLE = {
			flex: "none", display: "flex", flexDirection: "column", marginTop: "4px", paddingTop: "4px",
			borderTop: "1px solid var(--dsw-alias-border-l2)"
		};
		const LABEL_HEADING = { padding: "8px 10px", fontSize: 12, lineHeight: "16px", color: "var(--dsw-alias-label-tertiary)" };
		const MUTED_ITEM = { padding: "8px 10px", fontSize: 12, lineHeight: "16px", color: "var(--dsw-alias-label-secondary)" };
		/**
		 * Layout half of the PermissionSelect trigger chrome; the background/outline
		 * half lives in the .dshp-conn-trigger CSS class so :hover/:focus-visible
		 * can win (an inline background would override them).
		 */
		const TRIGGER_STYLE = {
			display: "inline-flex", alignItems: "center", gap: 4, minWidth: 0, maxWidth: 220,
			height: 28, padding: "0 4px 0 8px", border: "none", borderRadius: 24,
			color: "var(--dsw-alias-label-secondary)", fontSize: 13, lineHeight: "20px",
			fontWeight: 500, cursor: "pointer"
		};
		const TRIGGER_LABEL = { minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

		/**
		 * Menu-card panel placed at a measured viewport rect.
		 * @param {{ top: number, left: number }} rect - viewport placement.
		 * @param {number} width - minimum width in px.
		 */
		function panelStyle(rect, width) {
			return Object.assign({}, MENU_CARD, { top: rect.top, left: rect.left, minWidth: width });
		}

		/**
		 * 开/关 pill toggle.
		 * @param {boolean} on - enabled state.
		 */
		function toggleStyle(on) {
			return {
				minWidth: 36, padding: "2px 8px", borderRadius: 999,
				border: "1px solid " + (on ? "transparent" : "var(--dsw-alias-border-l1)"),
				background: on ? "var(--dsw-alias-brand-primary)" : "transparent",
				color: on ? "#fff" : "var(--dsw-alias-label-secondary)",
				fontSize: 12, cursor: "pointer"
			};
		}

		/** Rightward offset for the floating anchor caption, relative to the chip's left edge. */
		const CAPTION_DX = 24;

		/**
		 * The 问数模式 preset (id ask-data, name 问数模式) anchors on data sources
		 * instead of workspaces. Match by display name first, then the known id.
		 * @param {{ current?: string, options?: Array<{ id: string, name?: string }> } | undefined} state - preset seat snapshot.
		 * @returns {boolean} whether the ask-data preset is current.
		 */
		function isAskMode(state) {
			const current = state && state.current;
			if (!current) return false;
			const options = (state && state.options) || [];
			for (let i = 0; i < options.length; i++) {
				const o = options[i];
				if (o && o.id === current && o.name && o.name.indexOf("问数") >= 0) return true;
			}
			return String(current).toLowerCase() === "ask-data";
		}

		/**
		 * Hero workspace-anchor dropdown: a Menu-card listing workspaces, or data
		 * sources when the ask-data preset is current, plus the floating
		 * 选择工作区/选择数据源 caption above the anchor chip.
		 */
		function ToolArea(props) {
			const open = props.open;
			const anchorRef = props.anchorRef;
			const selectedId = props.selectedId;
			const onPick = props.onPick;
			const onClose = props.onClose;
			const useWorkspaces = props.useWorkspaces;
			const getPresetStore = props.getPresetStore;

			const ws = useWorkspaces(function (s) { return s; });
			const items = ws.items;
			const phase = ws.phase;

			const mcpState = React.useState({ servers: [], enabled: [], loading: false, loaded: false, status: null });
			const mcp = mcpState[0];
			const setMcp = mcpState[1];

			const wsRectState = React.useState(null);
			const wsRect = wsRectState[0];
			const setWsRect = wsRectState[1];

			const dsSelState = React.useState(null);
			const dsSel = dsSelState[0];
			const setDsSel = dsSelState[1];

			const chipRectState = React.useState(null);
			const chipRect = chipRectState[0];
			const setChipRect = chipRectState[1];

			const anchorModeState = React.useState(function () {
				const store = (typeof getPresetStore === "function") ? getPresetStore() : undefined;
				return (store && typeof store.getSnapshot === "function" && isAskMode(store.getSnapshot())) ? "datasource" : "workspace";
			});
			const anchorMode = anchorModeState[0];
			const setAnchorMode = anchorModeState[1];

			React.useEffect(function () {
				const store = (typeof getPresetStore === "function") ? getPresetStore() : undefined;
				if (!store || typeof store.getSnapshot !== "function") { setAnchorMode("workspace"); return; }
				function recompute() { setAnchorMode(isAskMode(store.getSnapshot()) ? "datasource" : "workspace"); }
				recompute();
				if (typeof store.subscribe === "function") return store.subscribe(recompute);
			}, [getPresetStore]);

			React.useEffect(function () {
				function measure() {
					const el = anchorRef && anchorRef.current;
					setChipRect(el ? el.getBoundingClientRect() : null);
				}
				measure();
				window.addEventListener("resize", measure);
				window.addEventListener("scroll", measure);
				return function () {
					window.removeEventListener("resize", measure);
					window.removeEventListener("scroll", measure);
				};
			}, [anchorRef, anchorMode, selectedId, open]);

			React.useEffect(function () {
				if (!open) { setWsRect(null); return; }
				const el = anchorRef && anchorRef.current;
				if (!el) return;
				const r = el.getBoundingClientRect();
				setWsRect({ top: r.bottom + 4, left: r.left });
			}, [open, anchorRef]);

			React.useEffect(function () {
				const need = open && anchorMode === "datasource";
				if (!need || mcp.loaded || mcp.loading) return;
				setMcp({ servers: [], enabled: [], loading: true, loaded: false, status: null });
				mcpList().then(function (res) {
					setMcp({ servers: (res && res.servers) || [], enabled: (res && res.enabled) || [], loading: false, loaded: true, status: null });
				}).catch(function (err) {
					setMcp({ servers: [], enabled: [], loading: false, loaded: true, status: "加载失败：" + String((err && err.message) || err) });
				});
			}, [open, anchorMode, mcp.loaded, mcp.loading]);

			let wsDropdown = null;
			if (open && wsRect) {
				const cardStyle = Object.assign({}, MENU_CARD, { top: wsRect.top, left: wsRect.left });
				if (anchorMode === "datasource") {
					let body;
					if (!mcp.loaded) {
						body = React.createElement("div", { style: MUTED_ITEM }, "加载中…");
					} else if (mcp.servers.length === 0) {
						body = React.createElement("div", { style: MUTED_ITEM }, "暂无数据源（接入 MCP 后自动列出）");
					} else {
						body = mcp.servers.map(function (srv) {
							const active = srv.server === dsSel;
							return React.createElement("button", {
								key: srv.server, className: "dshp-ws-item", style: ITEM_STYLE,
								onClick: function () { setDsSel(srv.server); onClose(); }
							},
								databaseIcon("var(--dsw-alias-label-tertiary)"),
								React.createElement("span", { style: LABEL_STYLE }, srv.server),
								active ? svgIcon(ICON_CHECK, undefined, "var(--dsw-alias-label-primary)") : null);
						});
					}
					wsDropdown = React.createElement("div", { key: "ws", style: cardStyle },
						React.createElement("div", { style: LABEL_HEADING }, "数据源"),
						body);
				} else {
					if (phase === "pending" && items.length === 0) {
						wsDropdown = React.createElement("div", { key: "ws", style: cardStyle },
							React.createElement("div", { style: MUTED_ITEM }, "正在加载工作区…"));
					} else {
						const list = items.map(function (w) {
							const active = w.workspaceId === selectedId;
							return React.createElement("button", {
								key: w.workspaceId, className: "dshp-ws-item", style: ITEM_STYLE,
								onClick: function () { onPick(w.workspaceId); }
							},
								svgIcon(ICON_FOLDER, "translate(1.5 2.429)", "var(--dsw-alias-label-tertiary)"),
								React.createElement("span", { style: LABEL_STYLE }, w.title),
								active ? svgIcon(ICON_CHECK, undefined, "var(--dsw-alias-label-primary)") : null);
						});
						const footer = React.createElement("div", { style: FOOTER_STYLE },
							React.createElement("button", { className: "dshp-ws-item", style: ITEM_STYLE, onClick: function () {} },
								svgIcon(ICON_PLUS, undefined, "var(--dsw-alias-label-tertiary)"),
								React.createElement("span", { style: LABEL_STYLE }, "添加工作区…")));
						wsDropdown = React.createElement("div", { key: "ws", style: cardStyle },
							React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, list),
							footer);
					}
				}
			}

			const anchorCaption = chipRect
				? React.createElement("span", {
					key: "anchor-caption",
					style: {
						position: "fixed", top: chipRect.top - 22, left: chipRect.left + CAPTION_DX,
						fontSize: 12, lineHeight: "16px", color: "var(--dsw-alias-label-secondary)",
						pointerEvents: "none", whiteSpace: "nowrap"
					}
				}, anchorMode === "datasource" ? "选择数据源" : "选择工作区")
				: null;

			return [wsDropdown, anchorCaption];
		}

		/**
		 * 连接器 trigger in the input bar's tools row, same chrome as the sibling
		 * PermissionSelect (workspace write) trigger. The panel prefers opening
		 * BELOW the trigger (hero input sits mid-page, so upward would fly to the
		 * header); it only flips up when the viewport bottom is close.
		 */
		function ConnectorsSeat(props) {
			const openState = React.useState(false);
			const open = openState[0];
			const setOpen = openState[1];

			const rectState = React.useState(null);
			const rect = rectState[0];
			const setRect = rectState[1];

			const mcpState = React.useState({ servers: [], enabled: [], loading: false, loaded: false, status: null });
			const mcp = mcpState[0];
			const setMcp = mcpState[1];

			React.useEffect(function () {
				if (mcp.loaded || mcp.loading) return;
				setMcp({ servers: [], enabled: [], loading: true, loaded: false, status: null });
				mcpList().then(function (res) {
					setMcp({ servers: (res && res.servers) || [], enabled: (res && res.enabled) || [], loading: false, loaded: true, status: null });
				}).catch(function (err) {
					setMcp({ servers: [], enabled: [], loading: false, loaded: true, status: "加载失败：" + String((err && err.message) || err) });
				});
			}, [mcp.loaded, mcp.loading]);

			function toggleServer(server) {
				const wasOn = mcp.enabled.indexOf(server) >= 0;
				const next = wasOn ? mcp.enabled.filter(function (s) { return s !== server; }) : mcp.enabled.concat([server]);
				const base = { servers: mcp.servers, enabled: next, loading: true, loaded: mcp.loaded, status: null };
				setMcp(base);
				mcpSet(next).then(function (res) {
					setMcp(Object.assign({}, base, { loading: false, status: res }));
				}).catch(function (err) {
					setMcp(Object.assign({}, base, { enabled: mcp.enabled, loading: false, status: "设置失败：" + String((err && err.message) || err) }));
				});
			}

			function toggle(e) {
				if (open) { setOpen(false); setRect(null); return; }
				const r = e.currentTarget.getBoundingClientRect();
				let top;
				if ((window.innerHeight - r.bottom) < 340 && r.top > 340) {
					top = r.top - 300;
				} else {
					top = r.bottom + 4;
				}
				setRect({ top: top, left: r.left });
				setOpen(true);
			}

			let panel = null;
			if (open && rect) {
				let body;
				if (!mcp.loaded) {
					body = React.createElement("div", { style: MUTED_ITEM }, "加载中…");
				} else if (mcp.servers.length === 0) {
					body = React.createElement("div", null,
						React.createElement("div", { style: MUTED_ITEM }, "未检测到已连接的 MCP 服务器"),
						React.createElement("div", { style: Object.assign({}, MUTED_ITEM, { opacity: 0.65 }) }, "在 cordis.yml 配置 mcp-client 后，这里会列出真实服务器"));
				} else {
					body = mcp.servers.map(function (srv) {
						const on = mcp.enabled.indexOf(srv.server) >= 0;
						return React.createElement("div", {
							key: srv.server, className: "dshp-conn-row",
							style: { display: "flex", alignItems: "center", gap: 8, width: "100%", minHeight: 40, padding: "8px 10px", borderRadius: 10 }
						},
							plugIcon("var(--dsw-alias-label-tertiary)"),
							React.createElement("span", { style: LABEL_STYLE }, srv.server),
							React.createElement("span", { style: { flex: "none", fontSize: 12, color: "var(--dsw-alias-label-secondary)" } }, srv.toolCount + " 个工具"),
							React.createElement("button", {
								onClick: function () { toggleServer(srv.server); },
								style: toggleStyle(on), disabled: mcp.loading
							}, on ? "开" : "关"));
					});
				}

				let statusLine = null;
				if (mcp.status) {
					const st = mcp.status;
					if (typeof st === "string") {
						statusLine = React.createElement("div", { style: Object.assign({}, MUTED_ITEM, { color: "var(--dsw-alias-state-warn-primary)" }) }, st);
					} else if (st && st.ok === true) {
						statusLine = React.createElement("div", { style: Object.assign({}, MUTED_ITEM, { opacity: 0.7 }) },
							"已应用：deny " + st.denyCount + " 个工具 · 作用于 " + st.appliedTo + " 个 agent");
					} else if (st && st.error) {
						statusLine = React.createElement("div", { style: Object.assign({}, MUTED_ITEM, { color: "var(--dsw-alias-state-error-primary)" }) }, "错误：" + st.error);
					}
				}

				panel = React.createElement("div", { key: "conn-panel", style: panelStyle(rect, 300) },
					React.createElement("div", { style: LABEL_HEADING }, "连接器（MCP）"),
					body,
					statusLine);
			}

			const enabledCount = mcp.enabled.length;

			const chip = React.createElement("button", {
				key: "conn-chip", className: "dshp-conn-trigger", onClick: toggle, style: TRIGGER_STYLE
			},
				plugIcon("currentColor", 14),
				React.createElement("span", { style: TRIGGER_LABEL }, "连接器"),
				enabledCount > 0
					? React.createElement("span", {
						style: {
							display: "inline-flex", flex: "0 0 auto", minWidth: 15, padding: "0 5px", borderRadius: 999,
							background: "var(--dsw-alias-brand-primary)", color: "#fff", fontSize: 10,
							lineHeight: "15px", textAlign: "center", fontWeight: 400
						}
					}, String(enabledCount))
					: null,
				React.createElement("span", { className: open ? "dshp-conn-chevron dshp-conn-chevron-open" : "dshp-conn-chevron", "aria-hidden": true },
					React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 14 14", fill: "none" },
						React.createElement("path", { d: "M3.5 5.25L7 8.75L10.5 5.25", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" }))));

			return [chip, panel];
		}

		/** Settings section: 数据源配置 rows with per-server toggles over the same bridge. */
		function DataSourceSection(props) {
			const mcpState = React.useState({ servers: [], enabled: [], loading: false, loaded: false, status: null });
			const mcp = mcpState[0];
			const setMcp = mcpState[1];

			React.useEffect(function () {
				if (mcp.loaded || mcp.loading) return;
				setMcp({ servers: [], enabled: [], loading: true, loaded: false, status: null });
				mcpList().then(function (res) {
					setMcp({ servers: (res && res.servers) || [], enabled: (res && res.enabled) || [], loading: false, loaded: true, status: null });
				}).catch(function (err) {
					setMcp({ servers: [], enabled: [], loading: false, loaded: true, status: "加载失败：" + String((err && err.message) || err) });
				});
			}, [mcp.loaded, mcp.loading]);

			function toggle(server) {
				const wasOn = mcp.enabled.indexOf(server) >= 0;
				const next = wasOn ? mcp.enabled.filter(function (s) { return s !== server; }) : mcp.enabled.concat([server]);
				const base = { servers: mcp.servers, enabled: next, loading: true, loaded: mcp.loaded, status: null };
				setMcp(base);
				mcpSet(next).then(function (res) {
					setMcp(Object.assign({}, base, { loading: false, status: res }));
				}).catch(function (err) {
					setMcp(Object.assign({}, base, { enabled: mcp.enabled, loading: false, status: "设置失败：" + String((err && err.message) || err) }));
				});
			}

			let list;
			if (!mcp.loaded) {
				list = React.createElement("div", { style: { fontSize: 13, color: "var(--dsw-alias-label-secondary)" } }, "加载中…");
			} else if (mcp.servers.length === 0) {
				list = React.createElement("div", { style: { fontSize: 13, color: "var(--dsw-alias-label-secondary)" } }, "暂无数据源（在 cordis.yml 接入 MCP 后自动列出）");
			} else {
				list = mcp.servers.map(function (srv) {
					const on = mcp.enabled.indexOf(srv.server) >= 0;
					return React.createElement("div", {
						key: srv.server,
						style: {
							display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8,
							border: "1px solid var(--dsw-alias-border-l1)", background: "var(--dsw-alias-bg-layer-1)"
						}
					},
						databaseIcon("var(--dsw-alias-label-secondary)"),
						React.createElement("span", { style: LABEL_STYLE }, srv.server),
						React.createElement("span", { style: { flex: "none", fontSize: 12, color: "var(--dsw-alias-label-secondary)" } }, srv.toolCount + " 个工具"),
						React.createElement("button", {
							onClick: function () { toggle(srv.server); },
							style: toggleStyle(on), disabled: mcp.loading
						}, on ? "开" : "关"));
				});
			}

			let statusLine = null;
			if (mcp.status) {
				const st = mcp.status;
				if (typeof st === "string") {
					statusLine = React.createElement("div", { style: { fontSize: 12, color: "var(--dsw-alias-state-warn-primary)" } }, st);
				} else if (st && st.ok === true) {
					statusLine = React.createElement("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-secondary)" } },
						"已应用：deny " + st.denyCount + " 个工具 · 作用于 " + st.appliedTo + " 个 agent");
				} else if (st && st.error) {
					statusLine = React.createElement("div", { style: { fontSize: 12, color: "var(--dsw-alias-state-error-primary)" } }, "错误：" + st.error);
				}
			}

			return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, maxWidth: 560 } },
				React.createElement("div", { style: { fontSize: 13, lineHeight: "20px", color: "var(--dsw-alias-label-secondary)" } },
					"数据源由已连接的 MCP 服务器提供。启用后，其工具可作为问数等预设的查询目标。"),
				list,
				statusLine);
		}

		/** Required service: the UI slot registry. */
		const inject = ["slots"];
		/**
		 * Fill the three shipped brand slots as one declaration-aware
		 * registration set (so occupants install or withdraw together), register
		 * the beta settings sections (技能 / 连接器 / 模板库 plus 数据源配置), the
		 * preset-aware hero workspace anchor, and the connectors seat in the input
		 * bar's tools row.
		 * @param ctx - Client root context.
		 */
		function apply(ctx) {
			ctx.effect(() => {
				const style = document.createElement("style");
				style.textContent = [
					'[class*="headlineText"] { font-size: 0; }',
					'[class*="headlineText"]::before { content: "Data Agent"; font-size: 26px; line-height: 32px; font-weight: 500; }',
					'[class*="previewBadge"] { font-size: 0; }',
					'[class*="previewBadge"]::before { content: "Harness"; font-size: 12px; line-height: 18px; font-weight: 700; font-family: var(--ds-font-family-code); position: relative; top: 1px; }',
					'[class$="_headline"] svg { width: 26px; height: 26px; }',
					'[class$="_fishHitbox"] { transform: translateY(-2px); }',
					'[class$="_headline"]::after { content: "问数、图表、分析，一句话的事"; grid-column: 1 / -1; font-size: 16px; line-height: 22px; font-weight: 400; color: var(--dsw-alias-label-secondary); text-align: center; margin-top: 6px; }',
					'.dshp-ws-item:hover { background: var(--dsw-alias-interactive-bg-hover); }',
					'.dshp-conn-trigger { background: transparent; outline: none; }',
					'.dshp-conn-trigger:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); }',
					'.dshp-conn-trigger:focus-visible { box-shadow: 0 0 0 2px var(--dsw-alias-border-l3); }',
					'.dshp-conn-trigger:disabled { color: var(--dsw-alias-label-dimmed); cursor: default; }',
					'.dshp-conn-chevron { display: inline-flex; flex: 0 0 auto; color: var(--dsw-alias-label-caption); transition: transform 120ms ease; }',
					'.dshp-conn-chevron-open { transform: rotate(180deg); }',
					'.dshp-conn-row:hover { background: var(--dsw-alias-interactive-bg-hover); }'
				].join("\n");
				document.head.appendChild(style);
				return () => style.remove();
			}, "data-harness-layout-ui: hero copy");
			ctx.slots.inject("sidebar.brand.mark", () => ctx.slots.inject("sidebar.brand.name", () => ctx.slots.inject("conversation.hero.brand.mark", function* () {
				yield ctx.slots.register({ name: "sidebar.brand.mark" }, DatabaseMark);
				yield ctx.slots.register({ name: "sidebar.brand.name" }, DataAgentName);
				yield ctx.slots.register({ name: "conversation.hero.brand.mark" }, DatabaseMark);
			})));
			/**
			 * Read the agent-preset seat store from the hero preset slot's inject
			 * face (the fragile seam of this surface: the preset UI owns the store).
			 */
			function getPresetStore() {
				try {
					const entries = ctx.slots.entries("conversation.hero.agentPreset");
					const entry = entries && entries[0];
					if (!entry) return undefined;
					const injectFace = entry.inject;
					const face = typeof injectFace === "function" ? injectFace() : injectFace;
					const store = face && face.hooks && face.hooks.agentPresetSeat;
					if (store && typeof store.getSnapshot === "function") return store;
				} catch (e) { /* preset seat not mounted yet */ }
				return undefined;
			}
			ctx.slots.inject("conversation.hero.workspace", () => ctx.slots.register({
				name: "conversation.hero.workspace",
				priority: -1,
				inject: function () { return { getPresetStore: getPresetStore }; }
			}, ToolArea));
			ctx.slots.inject("conversation.input.left", () => ctx.slots.register({ name: "conversation.input.left", id: "connectors" }, ConnectorsSeat));
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "datasources",
				order: 30,
				label: "数据源配置"
			}, DataSourceSection));
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "skills",
				order: 40,
				label: "技能",
				beta: true
			}, makePlaceholderSection("技能")));
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "connectors",
				order: 50,
				label: "连接器",
				beta: true
			}, makePlaceholderSection("连接器")));
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "templates",
				order: 60,
				label: "模板库",
				beta: true
			}, makePlaceholderSection("模板库")));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
