import type { CSSProperties } from 'react';

// Shared style tokens for the Cain & Able screens, now explicitly typed
// so spreading these into a style={{ ... }} prop doesn't hit TypeScript's
// string-literal widening (e.g. textAlign: 'center' widening to `string`
// instead of the literal CSSProperties union).

export const theme = {
  color: {
    bg: '#0a0a0a',
    panel: '#0a0a0a',
    border: '#cfcfcf',
    borderMuted: '#6a6a6a',
    text: '#f2f2f2',
    textDim: '#a8a8a8',
    textFaint: '#6a6a6a',
    accentWarn: '#e0a06a',
    accentWarnBorder: '#7a5a3a',
    accentOk: '#8ac08a',
    accentOkBorder: '#4a6a4a',
    buttonBg: '#e8e8e8',
    buttonText: '#0a0a0a',
  },
  font: {
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radius: '2px',
};

export const panelStyle: CSSProperties = {
  border: `1.2px solid ${theme.color.border}`,
  background: 'transparent',
  color: theme.color.text,
  fontFamily: theme.font.body,
  borderRadius: theme.radius,
  padding: '16px',
};

export const screenStyle: CSSProperties = {
  minHeight: '100vh',
  background: theme.color.bg,
  color: theme.color.text,
  fontFamily: theme.font.body,
  padding: '32px 40px',
  boxSizing: 'border-box',
};

export const titleStyle: CSSProperties = {
  fontSize: '22px',
  fontWeight: 500,
  margin: '0 0 24px',
  textAlign: 'center',
};
