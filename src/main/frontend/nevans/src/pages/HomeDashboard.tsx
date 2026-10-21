import type { CSSProperties } from 'react';
import { theme, panelStyle, screenStyle, titleStyle } from '../styles/theme.ts';

export interface ActivityItem {
  time: string;
  text: string;
}

export interface HomeDashboardProps {
  honour?: number;
  currency?: number;
  alertActive?: boolean;
  activity?: ActivityItem[];
  onNavigate?: (destination: string) => void;
}

const statPanel: CSSProperties = { ...panelStyle, textAlign: 'center' };
const navPanel: CSSProperties = {
  ...panelStyle,
  textAlign: 'center',
  cursor: 'pointer',
};

function StatCard({ label, value, warn }: { label: string; value: string | number; warn?: boolean }) {
  return (
    <div
      style={{
        ...statPanel,
        borderColor: warn ? theme.color.accentWarnBorder : theme.color.border,
        color: warn ? theme.color.accentWarn : theme.color.text,
      }}
    >
      <div style={{ fontSize: '13px', color: warn ? theme.color.accentWarn : theme.color.text }}>
        {label}
      </div>
      <div style={{ fontSize: '20px', marginTop: '8px' }}>{value}</div>
    </div>
  );
}

function NavCard({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' ? onClick?.() : null)}
      style={navPanel}
    >
      {label}
    </div>
  );
}

export default function HomeDashboard({
  honour = 0,
  currency = 0,
  alertActive = false,
  activity = [],
  onNavigate = () => {},
}: HomeDashboardProps) {
  return (
    <div style={screenStyle}>
      <h1 style={titleStyle}>Home</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <StatCard label="Honour" value={honour} />
        <StatCard label="Currency" value={currency} />
        <StatCard label="Alert status" value={alertActive ? 'Active' : 'Clear'} warn={alertActive} />
      </div>

      <div style={{ ...panelStyle, marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', marginBottom: '12px' }}>Recent activity</div>
        {activity.length === 0 ? (
          <div style={{ fontSize: '12px', color: theme.color.textFaint }}>Nothing yet.</div>
        ) : (
          activity.map((item, i) => (
            <div key={i} style={{ fontSize: '12px', color: theme.color.textDim, padding: '4px 0' }}>
              {item.time}  {item.text}
            </div>
          ))
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <NavCard label="Analysis screen" onClick={() => onNavigate('analysis')} />
        <NavCard label="Scoreboard" onClick={() => onNavigate('scoreboard')} />
        <NavCard label="Vulnerabilities" onClick={() => onNavigate('vulnerabilities')} />
      </div>

      <NavCard label="Submit code" onClick={() => onNavigate('submit-code')} />
    </div>
  );
}
