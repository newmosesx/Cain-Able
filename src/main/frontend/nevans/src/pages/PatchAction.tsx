import { useState, type CSSProperties } from 'react';
import { theme, panelStyle, screenStyle, titleStyle } from '../styles/theme.ts';

export interface PatchActionProps {
  name?: string;
  before?: string;
  after?: string;
  patched?: boolean;
  onPatched?: (payload: { notes: string }) => void;
}

const codeBoxStyle: CSSProperties = {
  ...panelStyle,
  fontFamily: theme.font.mono,
  fontSize: '11px',
  whiteSpace: 'pre-wrap',
  minHeight: '110px',
};

const buttonStyle: CSSProperties = {
  display: 'block',
  margin: '24px auto 0',
  padding: '12px 32px',
  background: theme.color.buttonBg,
  color: theme.color.buttonText,
  border: 'none',
  borderRadius: theme.radius,
  fontSize: '13px',
  cursor: 'pointer',
};

export default function PatchAction({
  name = '',
  before = '',
  after = '',
  patched: patchedProp = false,
  onPatched = () => {},
}: PatchActionProps) {
  const [patched, setPatched] = useState(patchedProp);
  const [notes, setNotes] = useState('');

  function handleMarkPatched() {
    setPatched(true);
    onPatched({ notes });
  }

  return (
    <div style={screenStyle}>
      <h1 style={{ ...titleStyle, marginBottom: '4px' }}>Patch action</h1>
      <div
        style={{
          textAlign: 'center',
          fontSize: '13px',
          color: theme.color.accentWarn,
          marginBottom: '24px',
        }}
      >
        {name}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '13px', marginBottom: '8px', textAlign: 'center' }}>Before</div>
          <div style={codeBoxStyle}>{before}</div>
        </div>
        <div>
          <div style={{ fontSize: '13px', marginBottom: '8px', textAlign: 'center' }}>After</div>
          <div style={codeBoxStyle}>{after}</div>
        </div>
      </div>

      <div style={{ ...panelStyle, marginTop: '24px' }}>
        <div style={{ fontSize: '12px', marginBottom: '8px' }}>Notes for this fix</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="optional free text field"
          rows={2}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: 'transparent',
            color: theme.color.text,
            border: `1px solid ${theme.color.borderMuted}`,
            borderRadius: theme.radius,
            fontFamily: theme.font.body,
            fontSize: '12px',
            padding: '8px',
            resize: 'vertical',
          }}
        />
      </div>

      <button
        type="button"
        onClick={handleMarkPatched}
        disabled={patched}
        style={{ ...buttonStyle, opacity: patched ? 0.5 : 1, cursor: patched ? 'default' : 'pointer' }}
      >
        {patched ? 'Patched' : 'Mark as patched'}
      </button>
    </div>
  );
}
