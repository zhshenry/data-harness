window.__ModuleLoader__.load({
	id: "askdata-layout-ui",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let { BrandWordmark } = require("@deepseek-ai/dsh-client-ui-primitives");
		/**
		 * AskData database brand glyph. Stroke reads `currentColor`, so the host
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
		 * AskData brand name. The shell's brand-name span is an inline-flex row
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
		/** Required service: the UI slot registry. */
		const inject = ["slots"];
		/**
		 * Fill the three shipped brand slots as one declaration-aware
		 * registration set (so occupants install or withdraw together), and
		 * register three beta settings sections (技能 / 连接器 / 模板库).
		 * @param ctx - Client root context.
		 */
		function apply(ctx) {
			ctx.slots.inject("sidebar.brand.mark", () => ctx.slots.inject("sidebar.brand.name", () => ctx.slots.inject("conversation.hero.brand.mark", function* () {
				yield ctx.slots.register({ name: "sidebar.brand.mark" }, DatabaseMark);
				yield ctx.slots.register({ name: "sidebar.brand.name" }, DataAgentName);
				yield ctx.slots.register({ name: "conversation.hero.brand.mark" }, DatabaseMark);
			})));
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
