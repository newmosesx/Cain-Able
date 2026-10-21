import type { ReactNode } from 'react';
import { theme, panelStyle, screenStyle, titleStyle } from '../styles/theme.ts';

export interface RulesBriefingProps {
  inScope?: string[];
  outOfBounds?: string[];
  roundLength?: string;
  proofOfCapture?: string;
  disputes?: string;
}

function RuleBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ ...panelStyle, marginBottom: '16px' }}>
      <div style={{ fontSize: '13px', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '12px', color: theme.color.textDim, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

export default function RulesBriefing({
  inScope = [
    "Only each other's running instance of Cain and Able",
    'Phishing limited to in-game accounts, never real email or logins',
  ],
  outOfBounds = ['Real devices, personal accounts, home networks'],
  roundLength = '48 hours per round',
  proofOfCapture = 'Screenshot of success screen',
  disputes = 'Settled by re-running the exploit together on a call',
}: RulesBriefingProps) {
  return (
    <div style={screenStyle}>
      <h1 style={titleStyle}>Rules of engagement</h1>

      <RuleBlock label="In scope">
        {inScope.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </RuleBlock>

      <RuleBlock label="Out of bounds">
        {outOfBounds.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </RuleBlock>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={panelStyle}>
          <div style={{ fontSize: '13px', marginBottom: '8px' }}>Round length</div>
          <div style={{ fontSize: '12px', color: theme.color.textDim }}>{roundLength}</div>
        </div>
        <div style={panelStyle}>
          <div style={{ fontSize: '13px', marginBottom: '8px' }}>Proof of capture</div>
          <div style={{ fontSize: '12px', color: theme.color.textDim }}>{proofOfCapture}</div>
        </div>
      </div>

      <RuleBlock label="Disputes">{disputes}</RuleBlock>
    </div>
  );
}
