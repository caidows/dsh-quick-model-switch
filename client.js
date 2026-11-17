window.__ModuleLoader__.load({id:'dsh-codex-model-picker',factory(require){
const React = require('react');
const {createPortal} = require('react-dom');
const CSS = "/* Codex-style composer model picker: trigger + floating card with a\r\n   draggable reasoning-effort slider. All colors come from DSH theme tokens so\r\n   light/dark and custom themes follow automatically. */\r\n\r\n.cmp-trigger {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n  min-width: 0;\r\n  max-width: 240px;\r\n  height: 28px;\r\n  padding: 0 4px 0 8px;\r\n  border: 0;\r\n  border-radius: var(--dsw-radius-sm);\r\n  background: none;\r\n  color: var(--dsw-alias-label-secondary);\r\n  font: inherit;\r\n  font-size: 13px;\r\n  font-weight: 400;\r\n  line-height: 20px;\r\n  cursor: pointer;\r\n}\r\n\r\n@media (hover: hover) {\r\n  .cmp-trigger:hover:not(:disabled) {\r\n    background: var(--dsw-alias-interactive-bg-hover);\r\n  }\r\n}\r\n\r\n.cmp-trigger:focus-visible {\r\n  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));\r\n  outline-offset: 1px;\r\n}\r\n\r\n.cmp-trigger:disabled {\r\n  color: var(--dsw-alias-label-dimmed);\r\n  cursor: default;\r\n}\r\n\r\n.cmp-trigger-icon {\r\n  flex: none;\r\n  display: var(--dsh-composer-model-icon-display, none);\r\n}\r\n\r\n.cmp-trigger-label {\r\n  display: var(--dsh-composer-model-text-display, block);\r\n  min-width: 0;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n\r\n.cmp-trigger-sep {\r\n  flex: none;\r\n  display: var(--dsh-composer-model-text-display, inline);\r\n  color: var(--dsw-alias-label-caption);\r\n}\r\n\r\n/* The effort name is the one thing worth keeping when the composer row goes\r\n   compact: without it the trigger degrades to a bolt plus a chevron, which\r\n   says nothing. It is short enough to survive the compact row on its own. */\r\n.cmp-trigger-effort {\r\n  display: block;\r\n  flex: 0 1 auto;\r\n  flex-shrink: 1000;\r\n  min-width: 0;\r\n  max-width: 76px;\r\n  overflow: hidden;\r\n  color: var(--dsw-alias-label-caption);\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n\r\n.cmp-trigger-chevron {\r\n  flex: none;\r\n  color: var(--dsw-alias-label-caption);\r\n  transition: transform 0.12s ease;\r\n}\r\n\r\n.cmp-trigger-chevron[data-open='true'] {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n/* ---------------------------------------------------------------- card --- */\r\n\r\n.cmp-card {\r\n  position: fixed;\r\n  z-index: 1000;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 10px;\r\n  padding: 14px 14px 16px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  border-radius: 18px;\r\n  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-1));\r\n  box-shadow:\r\n    0 1px 2px rgba(15, 23, 42, 0.06),\r\n    0 12px 30px rgba(15, 23, 42, 0.14),\r\n    var(--dsw-elevation-prominent);\r\n  backdrop-filter: var(--dsw-menu-backdrop-filter, none);\r\n  color: var(--dsw-alias-label-primary);\r\n  font-size: 13px;\r\n  line-height: 20px;\r\n  outline: none;\r\n  transform-origin: bottom center;\r\n  animation: cmp-card-in 200ms cubic-bezier(0.16, 1, 0.3, 1) both;\r\n}\r\n\r\n.cmp-card[data-placement='below'] {\r\n  transform-origin: top center;\r\n  animation-name: cmp-card-in-below;\r\n}\r\n\r\n@keyframes cmp-card-in {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(10px) scale(0.96);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0) scale(1);\r\n  }\r\n}\r\n\r\n@keyframes cmp-card-in-below {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px) scale(0.96);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0) scale(1);\r\n  }\r\n}\r\n\r\n@keyframes cmp-effort-in {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(3px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n@media (prefers-reduced-motion: reduce) {\r\n  .cmp-card,\r\n  .cmp-card[data-placement='below'] {\r\n    animation: none;\r\n  }\r\n  .cmp-effort {\r\n    animation: none;\r\n  }\r\n  .cmp-thumb,\r\n  .cmp-fill,\r\n  .cmp-dot {\r\n    transition: none;\r\n  }\r\n}\r\n\r\n.cmp-head {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-height: 26px;\r\n}\r\n\r\n.cmp-effort {\r\n  max-width: 100%;\r\n  overflow: hidden;\r\n  color: var(--dsw-alias-state-business-primary);\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  line-height: 24px;\r\n  text-align: center;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  animation: cmp-effort-in 180ms cubic-bezier(0.16, 1, 0.3, 1);\r\n}\r\n\r\n.cmp-model {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 2px;\r\n  width: 100%;\r\n  height: 26px;\r\n  padding: 0 6px;\r\n  border: 0;\r\n  border-radius: 8px;\r\n  background: none;\r\n  color: var(--dsw-alias-label-secondary);\r\n  font: inherit;\r\n  font-size: 13px;\r\n  cursor: pointer;\r\n}\r\n\r\n@media (hover: hover) {\r\n  .cmp-model:hover:not(:disabled) {\r\n    background: var(--dsw-alias-interactive-bg-hover);\r\n  }\r\n}\r\n\r\n.cmp-model:focus-visible {\r\n  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));\r\n  outline-offset: 0;\r\n}\r\n\r\n.cmp-model:disabled {\r\n  color: var(--dsw-alias-label-dimmed);\r\n  cursor: default;\r\n}\r\n\r\n.cmp-model-name {\r\n  min-width: 0;\r\n  overflow: hidden;\r\n  color: var(--dsw-alias-label-primary);\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n\r\n.cmp-model-name-muted {\r\n  color: var(--dsw-alias-label-tertiary);\r\n}\r\n\r\n.cmp-model-chevron {\r\n  flex: none;\r\n  color: var(--dsw-alias-label-caption);\r\n  transition: transform 0.12s ease;\r\n}\r\n\r\n.cmp-model-chevron[data-open='true'] {\r\n  transform: rotate(90deg);\r\n}\r\n\r\n/* ------------------------------------------------------------ model list --- */\r\n\r\n.cmp-list {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1px;\r\n  max-height: 228px;\r\n  margin: 0 -4px -4px;\r\n  padding: 4px;\r\n  overflow-y: auto;\r\n  overscroll-behavior: contain;\r\n  border-top: 1px solid var(--dsw-alias-border-l1);\r\n  border-radius: 10px;\r\n  scrollbar-width: thin;\r\n  scrollbar-color: var(--dsw-alias-scrollbar-bg-l2) transparent;\r\n}\r\n\r\n.cmp-group-head {\r\n  padding: 6px 8px 2px;\r\n  color: var(--dsw-alias-label-tertiary);\r\n  font-size: 11px;\r\n  line-height: 16px;\r\n  user-select: none;\r\n}\r\n\r\n.cmp-option {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  width: 100%;\r\n  min-height: 30px;\r\n  padding: 0 8px;\r\n  border: 0;\r\n  border-radius: 8px;\r\n  background: none;\r\n  color: inherit;\r\n  font: inherit;\r\n  font-size: 13px;\r\n  text-align: left;\r\n  cursor: pointer;\r\n}\r\n\r\n@media (hover: hover) {\r\n  .cmp-option:hover {\r\n    background: var(--dsw-alias-interactive-bg-hover);\r\n  }\r\n}\r\n\r\n.cmp-option:focus-visible {\r\n  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));\r\n  outline-offset: -2px;\r\n}\r\n\r\n.cmp-option[data-selected='true'] {\r\n  font-weight: 600;\r\n}\r\n\r\n.cmp-option-name {\r\n  flex: 1;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n\r\n.cmp-option-check {\r\n  flex: none;\r\n  color: var(--dsw-alias-state-business-primary);\r\n}\r\n\r\n.cmp-badge {\r\n  flex: none;\r\n  padding: 0 5px;\r\n  border-radius: 4px;\r\n  background: var(--dsw-alias-bg-module-platform);\r\n  color: var(--dsw-alias-label-caption);\r\n  font-size: 10px;\r\n  font-weight: 400;\r\n  line-height: 16px;\r\n}\r\n\r\n.cmp-note {\r\n  padding: 8px;\r\n  color: var(--dsw-alias-label-tertiary);\r\n  font-size: 12px;\r\n  line-height: 18px;\r\n}\r\n\r\n.cmp-error {\r\n  margin: -2px 0 0;\r\n  padding: 6px 8px;\r\n  border-radius: var(--dsw-radius-md);\r\n  background: var(--dsw-alias-interactive-bg-hover-danger);\r\n  color: var(--dsw-alias-state-error-primary);\r\n  font-size: 12px;\r\n  line-height: 16px;\r\n}\r\n\r\n/* --------------------------------------------------------------- slider --- */\r\n\r\n.cmp-slider {\r\n  position: relative;\r\n  height: 34px;\r\n  margin-top: 2px;\r\n  border-radius: 999px;\r\n  background: color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);\r\n  cursor: pointer;\r\n  touch-action: none;\r\n  outline: none;\r\n  --cmp-pad: 18px;\r\n}\r\n\r\n.cmp-slider:focus-visible {\r\n  box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));\r\n}\r\n\r\n.cmp-slider[aria-disabled='true'] {\r\n  cursor: default;\r\n  opacity: 0.55;\r\n}\r\n\r\n.cmp-fill {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  width: calc(var(--cmp-pad) + (100% - 2 * var(--cmp-pad)) * var(--cmp-ratio, 0));\r\n  border-radius: 999px;\r\n  background: var(--dsw-alias-state-business-primary);\r\n  transition: width 0.16s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.16s ease;\r\n}\r\n\r\n.cmp-slider[data-dragging='true'] .cmp-fill {\r\n  transition: width 130ms cubic-bezier(0.22, 0.61, 0.36, 1), filter 0.16s ease;\r\n  filter: brightness(1.05) saturate(1.1);\r\n}\r\n\r\n.cmp-dot {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: calc(var(--cmp-pad) + (100% - 2 * var(--cmp-pad)) * var(--cmp-pos, 0));\r\n  width: 6px;\r\n  height: 6px;\r\n  margin: -3px 0 0 -3px;\r\n  border-radius: 50%;\r\n  background: color-mix(in srgb, var(--dsw-alias-label-primary) 34%, transparent);\r\n  transition: transform 0.16s ease, background-color 0.16s ease;\r\n}\r\n\r\n.cmp-dot[data-covered='true'] {\r\n  background: rgba(255, 255, 255, 0.6);\r\n}\r\n\r\n.cmp-dot[data-current='true'] {\r\n  transform: scale(1.45);\r\n}\r\n\r\n.cmp-thumb {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: calc(var(--cmp-pad) + (100% - 2 * var(--cmp-pad)) * var(--cmp-ratio, 0));\r\n  width: 30px;\r\n  height: 30px;\r\n  margin: -15px 0 0 -15px;\r\n  border-radius: 50%;\r\n  background: #fff;\r\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.28), 0 0 0 0.5px rgba(0, 0, 0, 0.04);\r\n  transition: left 0.16s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.16s ease, box-shadow 0.16s ease;\r\n  pointer-events: none;\r\n}\r\n\r\n.cmp-slider[data-dragging='true'] .cmp-thumb {\r\n  transition: left 130ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.16s ease, box-shadow 0.16s ease;\r\n  transform: scale(1.14);\r\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.32), 0 0 0 0.5px rgba(0, 0, 0, 0.04);\r\n}\r\n\r\n/* Quick-switch strip: saved model + effort pairs next to the model trigger. */\r\n.cmp-quicks {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n  min-width: 0;\r\n  max-width: 100%;\r\n  overflow: hidden;\r\n}\r\n\r\n.cmp-chip {\r\n  display: var(--dsh-composer-model-text-display, inline-flex);\r\n  align-items: center;\r\n  gap: 4px;\r\n  height: 26px;\r\n  max-width: 240px;\r\n  margin: 0;\r\n  padding: 0 8px;\r\n  border: 1px solid var(--dsw-alias-border-l2, rgba(15, 23, 42, 0.1));\r\n  border-radius: var(--dsw-radius-sm, 6px);\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-secondary, #52525b);\r\n  font: inherit;\r\n  font-size: 12px;\r\n  line-height: 1;\r\n  white-space: nowrap;\r\n  cursor: pointer;\r\n  transition: background-color 0.12s ease, border-color 0.12s ease, color 0.12s ease;\r\n}\r\n\r\n.cmp-chip:hover:not(:disabled) {\r\n  border-color: var(--dsw-alias-border-l3, rgba(15, 23, 42, 0.18));\r\n  background: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.06));\r\n  color: var(--dsw-alias-label-primary, #18181b);\r\n}\r\n\r\n.cmp-chip:focus-visible {\r\n  outline: none;\r\n  box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary, #2f6bf6));\r\n}\r\n\r\n.cmp-chip:disabled {\r\n  opacity: 0.55;\r\n  cursor: default;\r\n}\r\n\r\n.cmp-chip-name {\r\n  flex: 0 1 auto;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.cmp-chip-effort {\r\n  flex: none;\r\n}\r\n\r\n.cmp-chip[data-current='true'] {\r\n  border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary, #2f6bf6) 45%, transparent);\r\n  background: color-mix(in srgb, var(--dsw-alias-state-business-primary, #2f6bf6) 8%, transparent);\r\n  color: var(--dsw-alias-state-business-primary, #2f6bf6);\r\n}\r\n\r\n.cmp-chip[data-current='true'] .cmp-chip-effort {\r\n  color: color-mix(in srgb, var(--dsw-alias-state-business-primary, #2f6bf6) 75%, transparent);\r\n}\r\n\r\n.cmp-chip-effort {\r\n  color: var(--dsw-alias-label-tertiary, #71717a);\r\n}\r\n\r\n.cmp-chip-effort::before {\r\n  content: '·';\r\n  margin-right: 3px;\r\n  color: var(--dsw-alias-label-caption, #a1a1aa);\r\n}\r\n\r\n.cmp-chip-settings {\r\n  padding: 0 6px;\r\n  color: var(--dsw-alias-label-tertiary, #71717a);\r\n}\r\n\r\n/* Settings popover for the three quick-switch slots. */\r\n.cmp-settings {\r\n  flex-direction: column;\r\n  gap: 8px;\r\n  padding: 14px;\r\n  max-height: min(70vh, 460px);\r\n  overflow: auto;\r\n}\r\n\r\n.cmp-settings-head {\r\n  display: flex;\r\n  align-items: baseline;\r\n  justify-content: space-between;\r\n  gap: 8px;\r\n}\r\n\r\n.cmp-settings-title {\r\n  font-size: 13px;\r\n  font-weight: 600;\r\n  color: var(--dsw-alias-label-primary, #18181b);\r\n}\r\n\r\n.cmp-settings-count {\r\n  font-size: 11px;\r\n  color: var(--dsw-alias-label-caption, #a1a1aa);\r\n}\r\n\r\n.cmp-settings-hint {\r\n  font-size: 11.5px;\r\n  line-height: 1.5;\r\n  color: var(--dsw-alias-label-tertiary, #71717a);\r\n}\r\n\r\n.cmp-settings-row {\r\n  display: grid;\r\n  grid-template-columns: 16px minmax(0, 1fr) minmax(0, 92px) 20px;\r\n  align-items: center;\r\n  gap: 6px;\r\n}\r\n\r\n.cmp-settings-index {\r\n  font-size: 11px;\r\n  font-variant-numeric: tabular-nums;\r\n  color: var(--dsw-alias-label-caption, #a1a1aa);\r\n  text-align: center;\r\n}\r\n\r\n.cmp-select {\r\n  min-width: 0;\r\n  width: 100%;\r\n  height: 28px;\r\n  padding: 0 6px;\r\n  border: 1px solid var(--dsw-alias-border-l2, rgba(15, 23, 42, 0.12));\r\n  border-radius: var(--dsw-radius-sm, 6px);\r\n  background: var(--dsw-alias-bg-layer-1, rgba(255, 255, 255, 0.9));\r\n  color: var(--dsw-alias-label-primary, #18181b);\r\n  font: inherit;\r\n  font-size: 12px;\r\n}\r\n\r\n.cmp-select:focus-visible {\r\n  outline: none;\r\n  border-color: var(--dsw-alias-state-business-primary, #2f6bf6);\r\n  box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, rgba(47, 107, 246, 0.35));\r\n}\r\n\r\n.cmp-select:disabled {\r\n  opacity: 0.5;\r\n}\r\n\r\n.cmp-settings-clear {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 20px;\r\n  height: 20px;\r\n  padding: 0;\r\n  border: 0;\r\n  border-radius: 6px;\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-tertiary, #71717a);\r\n  font-size: 15px;\r\n  line-height: 1;\r\n  cursor: pointer;\r\n}\r\n\r\n.cmp-settings-clear:hover:not(:disabled) {\r\n  background: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.07));\r\n  color: var(--dsw-alias-label-primary, #18181b);\r\n}\r\n\r\n.cmp-settings-clear:disabled {\r\n  opacity: 0.3;\r\n  cursor: default;\r\n}\r\n\r\n.cmp-settings-done {\r\n  align-self: flex-end;\r\n  height: 26px;\r\n  padding: 0 12px;\r\n  border: 1px solid var(--dsw-alias-border-l2, rgba(15, 23, 42, 0.12));\r\n  border-radius: var(--dsw-radius-sm, 6px);\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-secondary, #52525b);\r\n  font: inherit;\r\n  font-size: 12px;\r\n  cursor: pointer;\r\n}\r\n\r\n.cmp-settings-done:hover {\r\n  background: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.06));\r\n  color: var(--dsw-alias-label-primary, #18181b);\r\n}\r\n";
const h = React.createElement;
const NS = 'local-codex-picker';
const dictionaries = {
  zh: {
    label: '模型与推理强度',
    models: '选择模型',
    selectModel: '选择模型',
    off: 'Off',
    effortLabel: '推理强度',
    loading: '正在加载模型…',
    empty: '没有可用的模型',
    unavailable: '子智能体会话不能切换模型',
    sessionInUse: '会话正在被占用，稍后再试',
    failed: '切换失败：{message}',
    quickSwitch: '快捷切换',
    quickHint: '给三个常用组合各配一个模型与推理强度，点一下输入框上方的按钮就能切过去。',
    quickAdd: '设置快捷切换',
    quickUnset: '未设置',
    quickClear: '清除',
    quickDone: '完成',
    quickMissing: '这个模型现在不可用'
  },
  en: {
    label: 'Model and reasoning effort',
    models: 'Choose model',
    selectModel: 'Choose model',
    off: 'Off',
    effortLabel: 'Reasoning effort',
    loading: 'Loading models…',
    empty: 'No models available',
    unavailable: 'Subagent sessions cannot switch models',
    sessionInUse: 'The session is in use — try again in a moment',
    failed: 'Could not switch: {message}',
    quickSwitch: 'Quick switch',
    quickHint: 'Give each of the three slots a model and reasoning effort; one click in the composer switches to it.',
    quickAdd: 'Set up quick switch',
    quickUnset: 'Not set',
    quickClear: 'Clear',
    quickDone: 'Done',
    quickMissing: 'That model is unavailable right now'
  }
};

function IconBolt(props) {
  return h('svg', {viewBox: '0 0 20 20', width: 16, height: 16, fill: 'none', 'aria-hidden': true, ...props},
    h('path', {d: 'M11.4 2.4 4.8 11h4.1l-.9 6.6L15.2 9h-4.2l.4-6.6Z', stroke: 'currentColor', strokeWidth: 1.5, strokeLinejoin: 'round', strokeLinecap: 'round'}));
}

function IconChevronDown(props) {
  return h('svg', {viewBox: '0 0 18 18', width: 14, height: 14, fill: 'none', 'aria-hidden': true, ...props},
    h('path', {d: 'M4.5 7 9 11.5 13.5 7', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round'}));
}

function IconChevronRight(props) {
  return h('svg', {viewBox: '0 0 18 18', width: 14, height: 14, fill: 'none', 'aria-hidden': true, ...props},
    h('path', {d: 'M7 4.5 11.5 9 7 13.5', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round'}));
}

function IconCheck(props) {
  return h('svg', {viewBox: '0 0 18 18', width: 14, height: 14, fill: 'none', 'aria-hidden': true, ...props},
    h('path', {d: 'M3.8 9.6 7.2 13 14.4 5.4', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round'}));
}

function IconSliders(props) {
  return h('svg', {viewBox: '0 0 18 18', width: 14, height: 14, fill: 'none', 'aria-hidden': true, ...props},
    h('path', {d: 'M3 5.5h12M3 12.5h12', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round'}),
    h('circle', {cx: 7, cy: 5.5, r: 1.8, fill: 'var(--cmp-quick-surface, #fff)', stroke: 'currentColor', strokeWidth: 1.4}),
    h('circle', {cx: 11.5, cy: 12.5, r: 1.8, fill: 'var(--cmp-quick-surface, #fff)', stroke: 'currentColor', strokeWidth: 1.4}));
}

const QUICK_KEY = 'codex-model-picker:quick-picks:v1';
const QUICK_LIMIT = 3;

function readQuickPicks() {
  const slots = [null, null, null];
  try {
    const raw = window.localStorage?.getItem(QUICK_KEY);
    if (!raw) return slots;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return slots;
    parsed
      .filter((pick) => pick && typeof pick.provider === 'string' && typeof pick.model === 'string')
      .slice(0, QUICK_LIMIT)
      .forEach((pick, index) => {
        slots[index] = {
          provider: pick.provider,
          model: pick.model,
          effort: typeof pick.effort === 'string' ? pick.effort : undefined,
          label: typeof pick.label === 'string' ? pick.label : pick.model,
          effortLabel: typeof pick.effortLabel === 'string' ? pick.effortLabel : pick.effort
        };
      });
    return slots;
  } catch {
    return slots;
  }
}

function writeQuickPicks(picks) {
  try {
    window.localStorage?.setItem(QUICK_KEY, JSON.stringify(picks));
  } catch {}
}

function makePick(group, model, effortId, t) {
  const levels = effortLevels(model.reasoning, t);
  const valid = levels.some((level) => level.id === effortId) ? effortId : preferredEffortId(levels, model.reasoning);
  const level = levels.find((candidate) => candidate.id === valid);
  return {
    provider: group.id,
    model: model.id,
    effort: valid,
    label: model.name ?? model.id,
    effortLabel: level?.name
  };
}

function findModel(groups, selection) {
  if (!selection) return undefined;
  for (const group of groups || []) {
    if (group.id !== selection.provider) continue;
    for (const model of group.models || []) {
      if (model.id === selection.model) return {group, model};
    }
  }
  return undefined;
}

function effortLevels(reasoning, t) {
  if (!reasoning) return [];
  const efforts = Array.isArray(reasoning.efforts) ? reasoning.efforts : [];
  return efforts.map((effort) => ({
    id: effort.id,
    name: effort.id === 'off' ? t('off') : (effort.name ?? effort.id)
  }));
}

/**
 * The stop a selection with nothing stored lands on: `medium` when the model
 * advertises it, otherwise the middle thinking level (never `off`).
 */
function preferredEffortId(levels, reasoning) {
  const ids = levels.map((level) => level.id);
  if (!ids.length) return undefined;
  const declared = reasoning?.defaultEffort;
  if (declared !== undefined && ids.includes(declared)) return declared;
  if (ids.includes('medium')) return 'medium';
  const thinking = levels.filter((level) => level.id !== 'off');
  const pool = thinking.length ? thinking : levels;
  return pool[Math.floor((pool.length - 1) / 2)].id;
}

function badgeText(badge) {
  if (!badge) return undefined;
  if (typeof badge === 'string') return badge;
  if (typeof badge.text === 'string') return badge.text;
  if (typeof badge.label === 'string') return badge.label;
  return undefined;
}

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

/** Mounts the stylesheet once alongside the control that owns it. */
function withStyle(Component) {
  return (props) => h(React.Fragment, null, h('style', null, CSS), h(Component, props));
}

/**
 * A horizontal detent slider: one stop per advertised reasoning effort. The
 * thumb always rests on a stop — it snaps to the nearest one while dragging
 * and an eased transition carries it between stops — so it never freezes
 * between levels. The stop being crossed is previewed live (the label updates
 * mid-drag) and a release commits it. Keyboard arrows move one stop at a time.
 */
function EffortSlider({levels, index, preview, busy, onCommit, onPreview, t}) {
  const trackRef = React.useRef(null);
  const rectRef = React.useRef(null);
  const draggingRef = React.useRef(false);
  const [dragIndex, setDragIndex] = React.useState(null);
  const count = levels.length;
  // The thumb only ever rests on a detent: idle it follows the committed (or
  // previewed) level, dragging it snaps to the nearest level and the CSS
  // transition carries it from one stop to the next.
  const idleIndex = preview !== null && preview !== undefined && preview >= 0 && preview < count ? preview : index;
  const shownIndex = dragIndex === null ? idleIndex : Math.max(0, Math.min(count - 1, dragIndex));
  const ratio = count > 1 ? shownIndex / (count - 1) : 0;

  React.useEffect(() => {
    if (dragIndex === null) return;
    onPreview?.(dragIndex);
  }, [dragIndex, onPreview]);

  const ratioAt = (clientX) => {
    // Cache the track rect for the whole gesture: reading layout on every
    // pointermove is what made the drag feel choppy.
    const rect = rectRef.current ?? trackRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const pad = 18;
    const usable = Math.max(1, rect.width - pad * 2);
    return Math.min(1, Math.max(0, (clientX - rect.left - pad) / usable));
  };
  const indexAt = (clientX) => {
    if (count <= 1) return 0;
    return Math.round(ratioAt(clientX) * (count - 1));
  };

  const onPointerDown = (event) => {
    if (busy) return;
    event.preventDefault();
    event.currentTarget.focus?.({preventScroll: true});
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } catch {}
    draggingRef.current = true;
    rectRef.current = trackRef.current?.getBoundingClientRect() ?? null;
    setDragIndex(indexAt(event.clientX));
  };
  const onPointerMove = (event) => {
    if (!draggingRef.current) return;
    const next = indexAt(event.clientX);
    setDragIndex((previous) => previous === next ? previous : next);
  };
  const finish = (event, commit) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const target = indexAt(event.clientX);
    rectRef.current = null;
    setDragIndex(null);
    if (commit) {
      onPreview?.(target);
      if (target !== index) onCommit(target);
    } else {
      onPreview?.(null);
    }
  };
  const onPointerUp = (event) => finish(event, true);
  const onPointerCancel = (event) => finish(event, false);
  const onKeyDown = (event) => {
    if (busy) return;
    let next;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = index - 1;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = index + 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else return;
    event.preventDefault();
    next = Math.max(0, Math.min(count - 1, next));
    if (next !== index) onCommit(next);
  };

  return h('div', {
    ref: trackRef,
    className: 'cmp-slider',
    role: 'slider',
    tabIndex: busy ? -1 : 0,
    'aria-label': t('effortLabel'),
    'aria-valuemin': 0,
    'aria-valuemax': Math.max(0, count - 1),
    'aria-valuenow': shownIndex,
    'aria-valuetext': levels[shownIndex]?.name ?? '',
    'aria-disabled': busy || undefined,
    'data-dragging': dragIndex !== null ? 'true' : undefined,
    style: {'--cmp-ratio': String(ratio)},
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onKeyDown
  },
  h('div', {className: 'cmp-fill', 'aria-hidden': true}),
  levels.map((level, levelIndex) => h('div', {
    key: `dot-${levelIndex}`,
    className: 'cmp-dot',
    'data-covered': levelIndex <= shownIndex ? 'true' : undefined,
    'data-current': levelIndex === shownIndex ? 'true' : undefined,
    style: {'--cmp-pos': String(count > 1 ? levelIndex / (count - 1) : 0)},
    'aria-hidden': true
  })),
  h('div', {className: 'cmp-thumb', 'aria-hidden': true}));
}

function CodexPicker({locked, available, directory, load, select, t, renderSlot}) {
  const subscribe = React.useCallback((notify) => directory.subscribe(notify), [directory]);
  const getSnapshot = React.useCallback(() => directory.getSnapshot(), [directory]);
  const state = React.useSyncExternalStore(subscribe, getSnapshot);

  const [open, setOpen] = React.useState(false);
  const [listOpen, setListOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [position, setPosition] = React.useState(null);
  const [previewIndex, setPreviewIndex] = React.useState(null);
  const handlePreview = React.useCallback((next) => setPreviewIndex(next), []);
  const [picks, setPicks] = React.useState(readQuickPicks);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [settingsPos, setSettingsPos] = React.useState(null);
  const stripRef = React.useRef(null);
  const settingsRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const cardRef = React.useRef(null);
  const loadRef = React.useRef(load);
  loadRef.current = load;

  React.useEffect(() => {
    loadRef.current?.();
  }, []);

  const current = state.current;
  const pending = state.pending;
  const matchingPending = Boolean(pending && current && pending.provider === current.provider && pending.model === current.model);
  const shownSelection = matchingPending ? pending : current;
  const found = findModel(state.groups, shownSelection);
  const reasoning = found?.model?.reasoning;
  const levels = effortLevels(reasoning, t);
  const effortId = (matchingPending ? pending.reasoningEffort : current?.reasoningEffort)
    ?? preferredEffortId(levels, reasoning);
  const foundIndex = levels.findIndex((level) => level.id === effortId);
  const index = foundIndex >= 0 ? foundIndex : 0;
  const displayIndex = previewIndex !== null && previewIndex >= 0 && previewIndex < levels.length ? previewIndex : index;

  // Drop a live drag preview once it matches the committed state (or the card
  // closes); while a drag is in flight it intentionally wins over `index`.
  React.useEffect(() => {
    if (!open) setPreviewIndex(null);
  }, [open]);

  React.useEffect(() => {
    if (previewIndex !== null && previewIndex === index) setPreviewIndex(null);
  }, [previewIndex, index]);

  const modelName = found?.model?.name ?? shownSelection?.model ?? t('selectModel');
  const badge = badgeText(found?.model?.badge);

  const place = React.useCallback(() => {
    const anchor = triggerRef.current?.getBoundingClientRect();
    if (!anchor) return;
    const margin = 8;
    const gap = 8;
    const width = Math.min(324, window.innerWidth - margin * 2);
    const height = cardRef.current?.offsetHeight ?? 0;
    const left = Math.max(margin, Math.min(anchor.right - width, window.innerWidth - width - margin));
    let above = true;
    let top = anchor.top - gap - height;
    if (top < margin) {
      above = false;
      top = Math.min(anchor.bottom + gap, window.innerHeight - height - margin);
    }
    setPosition({left, top, width, above});
  }, []);

  React.useLayoutEffect(() => {
    if (open) place();
  }, [open, listOpen, levels.length, place]);

  React.useEffect(() => {
    if (!open) return;
    loadRef.current?.();
  }, [open]);

  const placeSettings = React.useCallback(() => {
    const anchor = stripRef.current?.getBoundingClientRect();
    if (!anchor) return;
    const margin = 8;
    const gap = 8;
    const width = Math.min(404, window.innerWidth - margin * 2);
    const height = settingsRef.current?.offsetHeight ?? 0;
    const left = Math.max(margin, Math.min(anchor.left, window.innerWidth - width - margin));
    let above = true;
    let top = anchor.top - gap - height;
    if (top < margin) {
      above = false;
      top = Math.min(anchor.bottom + gap, window.innerHeight - height - margin);
    }
    setSettingsPos({left, top, width, above});
  }, []);

  React.useLayoutEffect(() => {
    if (settingsOpen) placeSettings();
  }, [settingsOpen, picks, placeSettings]);

  React.useEffect(() => {
    if (!settingsOpen) return;
    const onMove = () => placeSettings();
    window.addEventListener('resize', onMove);
    document.addEventListener('scroll', onMove, true);
    return () => {
      window.removeEventListener('resize', onMove);
      document.removeEventListener('scroll', onMove, true);
    };
  }, [settingsOpen, placeSettings]);

  React.useEffect(() => {
    if (!open) return;
    const onMove = () => place();
    window.addEventListener('resize', onMove);
    document.addEventListener('scroll', onMove, true);
    return () => {
      window.removeEventListener('resize', onMove);
      document.removeEventListener('scroll', onMove, true);
    };
  }, [open, place]);

  React.useEffect(() => {
    if (!open && !settingsOpen) return;
    const onDown = (event) => {
      const target = event.target;
      if (triggerRef.current?.contains(target)) return;
      if (cardRef.current?.contains(target)) return;
      if (settingsRef.current?.contains(target)) return;
      if (stripRef.current?.contains(target)) return;
      setOpen(false);
      setListOpen(false);
      setSettingsOpen(false);
    };
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      setOpen(false);
      setListOpen(false);
      setSettingsOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [open, settingsOpen]);

  React.useEffect(() => {
    if (!open) return;
    const node = cardRef.current;
    if (!node) return;
    const target = node.querySelector('[role="slider"]') ?? node;
    target.focus?.({preventScroll: true});
  }, [open, levels.length]);

  const commit = (selection) => {
    if (!available || busy) return;
    setBusy(true);
    setToast(null);
    Promise.resolve(select(selection))
      .then((result) => {
        if (result && result.ok === false) {
          const code = result.error?.code ?? '';
          setToast(code === 'session/writer-held' ? t('sessionInUse') : t('failed', {message: `${code}: ${result.error?.message ?? ''}`}));
        }
      })
      .catch((error) => {
        setToast(t('failed', {message: String(error?.message ?? error)}));
      })
      .finally(() => {
        setBusy(false);
        setPreviewIndex(null);
      });
  };

  const commitEffortAt = (nextIndex) => {
    const level = levels[nextIndex];
    if (!current || level === undefined) return;
    if (level.id === effortId) return;
    commit({
      provider: current.provider,
      model: current.model,
      reasoningEffort: level.id
    });
  };

  const chooseModel = (group, model) => {
    setListOpen(false);
    if (!current) {
      commit({provider: group.id, model: model.id});
      return;
    }
    if (group.id === current.provider && model.id === current.model) return;
    const nextLevels = effortLevels(model.reasoning, t);
    const kept = nextLevels.some((level) => level.id === effortId)
      ? effortId
      : preferredEffortId(nextLevels, model.reasoning);
    commit({
      provider: group.id,
      model: model.id,
      ...(kept === undefined ? {} : {reasoningEffort: kept})
    });
  };

  const onListKeyDown = (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    const options = Array.from(event.currentTarget.querySelectorAll('[role="option"]'));
    if (!options.length) return;
    const active = options.indexOf(document.activeElement);
    const next = event.key === 'ArrowDown' ? Math.min(options.length - 1, active + 1) : Math.max(0, active - 1);
    event.preventDefault();
    options[next]?.focus();
  };

  const assignSlot = (slot, pick) => {
    const next = picks.slice();
    next[slot] = pick;
    setPicks(next);
    writeQuickPicks(next);
  };

  const quickModelChange = (slot, value) => {
    if (!value) {
      assignSlot(slot, null);
      return;
    }
    const [providerId, modelId] = value.split('\u001f');
    const group = (state.groups || []).find((candidate) => candidate.id === providerId);
    const model = group?.models?.find((candidate) => candidate.id === modelId);
    if (!group || !model) return;
    assignSlot(slot, makePick(group, model, picks[slot]?.effort, t));
  };

  const quickEffortChange = (slot, value) => {
    const pick = picks[slot];
    if (!pick) return;
    const model = findModel(state.groups, pick)?.model;
    const level = effortLevels(model?.reasoning, t).find((candidate) => candidate.id === value);
    if (!level) return;
    assignSlot(slot, {...pick, effort: level.id, effortLabel: level.name});
  };

  const applyPick = (pick) => {
    if (!pick || busy || !available) return;
    const model = findModel(state.groups, pick)?.model;
    if (!model) {
      setToast(t('quickMissing'));
      return;
    }
    const nextLevels = effortLevels(model.reasoning, t);
    const keep = pick.effort && nextLevels.some((level) => level.id === pick.effort)
      ? pick.effort
      : preferredEffortId(nextLevels, model.reasoning);
    commit({
      provider: pick.provider,
      model: pick.model,
      ...(keep === undefined ? {} : {reasoningEffort: keep})
    });
  };

  const toggleSettings = () => {
    setSettingsOpen((value) => {
      if (!value) setOpen(false);
      return !value;
    });
  };

  const fallbackLabel = h('span', {className: 'cmp-trigger-label'}, modelName);
  let labelNode = fallbackLabel;
  if (typeof renderSlot === 'function') {
    try {
      const contributed = renderSlot('conversation.input.model.label', {
        provider: {id: shownSelection?.provider ?? '', name: found?.group?.name ?? ''},
        model: found?.model ?? {id: shownSelection?.model ?? '', name: modelName},
        placement: 'trigger',
        selected: true
      }, {fallback: fallbackLabel});
      if (contributed !== undefined && contributed !== null && contributed !== false) labelNode = contributed;
    } catch {
      labelNode = fallbackLabel;
    }
  }

  const rows = [];
  for (const group of state.groups || []) {
    if (!group.models?.length) continue;
    rows.push(h('div', {key: `group-${group.id}`, className: 'cmp-group-head'}, group.name ?? group.id));
    for (const model of group.models) {
      const selected = shownSelection?.provider === group.id && shownSelection?.model === model.id;
      const optionBadge = badgeText(model.badge);
      rows.push(h('button', {
        key: `model-${group.id}/${model.id}`,
        type: 'button',
        className: 'cmp-option',
        role: 'option',
        'aria-selected': selected,
        'data-selected': selected ? 'true' : undefined,
        title: model.name ?? model.id,
        onClick: () => chooseModel(group, model)
      },
      h('span', {className: 'cmp-option-name'}, model.name ?? model.id),
      optionBadge ? h('span', {className: 'cmp-badge'}, optionBadge) : null,
      selected ? h(IconCheck, {className: 'cmp-option-check'}) : null));
    }
  }

  const card = open ? createPortal(h('div', {
    ref: cardRef,
    className: 'cmp-card',
    role: 'dialog',
    tabIndex: -1,
    'aria-label': t('label'),
    'aria-busy': busy || undefined,
    'data-placement': position?.above === false ? 'below' : 'above',
    style: position
      ? {left: position.left, top: position.top, width: position.width}
      : {left: 0, top: 0, visibility: 'hidden'}
  },
  levels.length ? h('div', {className: 'cmp-head'},
    h('span', {
      key: `effort-${displayIndex}`,
      className: 'cmp-effort',
      title: levels[displayIndex]?.name ?? ''
    }, levels[displayIndex]?.name ?? '')) : null,
  h('button', {
    type: 'button',
    className: 'cmp-model',
    disabled: !available,
    'aria-haspopup': 'listbox',
    'aria-expanded': listOpen,
    onClick: () => setListOpen((value) => !value)
  },
  h('span', {className: classNames('cmp-model-name', !current && 'cmp-model-name-muted')}, modelName),
  badge ? h('span', {className: 'cmp-badge'}, badge) : null,
  h(IconChevronRight, {className: 'cmp-model-chevron', 'data-open': listOpen ? 'true' : undefined})),
  listOpen && h('div', {
    className: 'cmp-list',
    role: 'listbox',
    'aria-label': t('models'),
    onKeyDown: onListKeyDown
  },
  (state.status === 'loading' || state.status === 'idle') && rows.length === 0 ? h('div', {className: 'cmp-note'}, t('loading')) : null,
  state.status === 'ready' && rows.length === 0 ? h('div', {className: 'cmp-note'}, t('empty')) : null,
  ...rows),
  levels.length >= 2 ? h(EffortSlider, {levels, index, preview: previewIndex, busy, onCommit: commitEffortAt, onPreview: handlePreview, t}) : null,
  toast ? h('div', {className: 'cmp-error', role: 'alert'}, toast) : null), document.body) : null;

  const settingsPanel = settingsOpen ? createPortal(h('div', {
    ref: settingsRef,
    className: 'cmp-card cmp-settings',
    role: 'dialog',
    'aria-label': t('quickSwitch'),
    'data-placement': settingsPos?.above === false ? 'below' : 'above',
    style: settingsPos
      ? {left: settingsPos.left, top: settingsPos.top, width: settingsPos.width}
      : {left: 0, top: 0, visibility: 'hidden'}
  },
  h('div', {className: 'cmp-settings-head'},
    h('span', {className: 'cmp-settings-title'}, t('quickSwitch')),
    h('span', {className: 'cmp-settings-count'}, `${picks.filter(Boolean).length}/${QUICK_LIMIT}`)),
  h('div', {className: 'cmp-settings-hint'}, t('quickHint')),
  picks.map((pick, slot) => {
    const slotModel = pick ? findModel(state.groups, pick)?.model : undefined;
    const slotLevels = effortLevels(slotModel?.reasoning, t);
    return h('div', {key: `slot-${slot}`, className: 'cmp-settings-row'},
      h('span', {className: 'cmp-settings-index', 'aria-hidden': true}, String(slot + 1)),
      h('select', {
        className: 'cmp-select cmp-select-model',
        value: pick ? `${pick.provider}\u001f${pick.model}` : '',
        disabled: !available,
        'aria-label': `${t('quickSwitch')} ${slot + 1}`,
        onChange: (event) => quickModelChange(slot, event.target.value)
      },
      h('option', {value: ''}, t('quickUnset')),
      (state.groups || []).map((group) => h('optgroup', {key: `sg-${slot}-${group.id}`, label: group.name ?? group.id},
        (group.models || []).map((candidate) => h('option', {
          key: `sm-${slot}-${group.id}-${candidate.id}`,
          value: `${group.id}\u001f${candidate.id}`
        }, candidate.name ?? candidate.id))))),
      h('select', {
        className: 'cmp-select cmp-select-effort',
        value: pick?.effort ?? '',
        disabled: !pick || slotLevels.length === 0,
        'aria-label': `${t('effortLabel')} ${slot + 1}`,
        onChange: (event) => quickEffortChange(slot, event.target.value)
      },
      slotLevels.map((level) => h('option', {key: `se-${slot}-${level.id}`, value: level.id}, level.name))),
      h('button', {
        type: 'button',
        className: 'cmp-settings-clear',
        title: t('quickClear'),
        'aria-label': t('quickClear'),
        disabled: !pick,
        onClick: () => assignSlot(slot, null)
      }, '×'));
  }),
  h('button', {type: 'button', className: 'cmp-settings-done', onClick: () => setSettingsOpen(false)}, t('quickDone'))), document.body) : null;

  const trigger = h('button', {
    ref: triggerRef,
    type: 'button',
    className: 'cmp-trigger',
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
    'aria-label': t('label'),
    title: available ? t('label') : t('unavailable'),
    disabled: locked || !available,
    onClick: () => setOpen((value) => !value),
    onKeyDown: (event) => {
      if (event.key !== 'ArrowDown' || open) return;
      event.preventDefault();
      setOpen(true);
    }
  },
  h(IconBolt, {className: 'cmp-trigger-icon'}),
  labelNode,
  levels.length ? h('span', {className: 'cmp-trigger-sep'}, '·') : null,
  levels.length ? h('span', {className: 'cmp-trigger-effort'}, levels[displayIndex]?.name ?? '') : null,
  h(IconChevronDown, {className: 'cmp-trigger-chevron', 'data-open': open ? 'true' : undefined}));

  const chips = picks.map((pick, slot) => {
    if (!pick) return null;
    const isCurrent = Boolean(current
      && current.provider === pick.provider
      && current.model === pick.model
      && (pick.effort === undefined || pick.effort === effortId));
    return h('button', {
      key: `chip-${slot}-${pick.provider}-${pick.model}`,
      type: 'button',
      className: 'cmp-chip',
      'data-current': isCurrent ? 'true' : undefined,
      'aria-current': isCurrent ? 'true' : undefined,
      disabled: locked || !available || busy,
      title: pick.effortLabel ? `${pick.label} · ${pick.effortLabel}` : pick.label,
      'aria-label': pick.effortLabel ? `${pick.label} · ${pick.effortLabel}` : pick.label,
      onClick: () => applyPick(pick)
    },
    h('span', {className: 'cmp-chip-name'}, pick.label),
    pick.effortLabel ? h('span', {className: 'cmp-chip-effort'}, pick.effortLabel) : null);
  });

  return h(React.Fragment, null,
    h('div', {ref: stripRef, className: 'cmp-quicks'},
      ...chips,
      h('button', {
        type: 'button',
        className: 'cmp-chip cmp-chip-settings',
        'aria-haspopup': 'dialog',
        'aria-expanded': settingsOpen,
        'aria-label': t('quickAdd'),
        title: t('quickAdd'),
        disabled: locked || !available,
        onClick: toggleSettings
      }, h(IconSliders)),
      trigger),
    card,
    settingsPanel);
}

return {
  inject: ['slots', 'locale'],
  apply(ctx) {
    ctx.effect(() => ctx.locale.register(NS, dictionaries));
    // Replaces the shipped model seat: the single-slot registry renders the
    // lowest-priority registration, so -1 shadows the shipped occupant (0).
    ctx.inject(['slots', 'modelDirectories', 'sessions'], (scope) => {
      const models = scope.modelDirectories;
      const sessions = scope.sessions;
      scope.slots.inject('conversation.input.model', () => scope.slots.register({
        name: 'conversation.input.model',
        locale: NS,
        priority: -1,
        inject: (sessionId) => {
          const directory = models.directoryFor(sessionId);
          const available = sessions.subagentAddress(sessionId) === undefined;
          return {
            available,
            directory: directory.store,
            load: () => {
              if (available) directory.load().catch(() => {});
            },
            select: (selection) => available ? directory.select(selection) : Promise.resolve(undefined)
          };
        }
      }, withStyle(CodexPicker)));
    });
  }
};

}});
