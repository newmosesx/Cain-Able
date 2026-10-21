import { theme, panelStyle, screenStyle, titleStyle } from '../styles/theme.ts';

export interface PlayerStats {
  name?: string;
  honour?: number;
  currency?: number;
  captures?: number;
}

export interface CaptureEntry {
  round: number;
  who: string;
  flag: string;
  honour: number;
  currency: number;
}

export interface ScoreboardProps {
  you?: PlayerStats;
  opponent?: PlayerStats;
  history?: CaptureEntry[];
}

function PlayerCard({ name, honour, currency, captures }: Required<PlayerStats>) {
  return (
    <div style={{ ...panelStyle, textAlign: 'center' }}>
      <div style={{ fontSize: '14px', marginBottom: '12px' }}>{name}</div>
      <div style={{ fontSize: '12px', color: theme.color.textDim, padding: '2px 0' }}>
        Honour: {honour}
      </div>
      <div style={{ fontSize: '12px', color: theme.color.textDim, padding: '2px 0' }}>
        Currency: {currency}
      </div>
      <div style={{ fontSize: '12px', color: theme.color.textDim, padding: '2px 0' }}>
        Captures: {captures}
      </div>
    </div>
  );
}

export default function Scoreboard({ you = {}, opponent = {}, history = [] }: ScoreboardProps) {
  return (
    <div style={screenStyle}>
      <h1 style={titleStyle}>Scoreboard</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <PlayerCard
          name="You"
          honour={you.honour ?? 0}
          currency={you.currency ?? 0}
          captures={you.captures ?? 0}
        />
        <PlayerCard
          name={opponent.name || 'Opponent'}
          honour={opponent.honour ?? 0}
          currency={opponent.currency ?? 0}
          captures={opponent.captures ?? 0}
        />
      </div>

      <div style={panelStyle}>
        <div style={{ fontSize: '13px', marginBottom: '12px' }}>Capture history</div>
        {history.length === 0 ? (
          <div style={{ fontSize: '12px', color: theme.color.textFaint }}>No captures yet.</div>
        ) : (
          history.map((entry, i) => (
            <div key={i} style={{ fontSize: '12px', color: theme.color.textDim, padding: '6px 0' }}>
              Round {entry.round}   {entry.who} captured the {entry.flag} flag   +{entry.honour}{' '}
              honour, +{entry.currency} currency
            </div>
          ))
        )}
      </div>
    </div>
  );
}
