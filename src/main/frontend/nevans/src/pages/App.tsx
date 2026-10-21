import { useState } from 'react';
import HomeDashboard from './HomeDashboard.tsx';
import LoginScreen from './LoginScreen.tsx';
import Scoreboard from './Scoreboard.tsx';
import VulnerabilityStatus from './VulnerabilityStatus.tsx';
import PatchAction from './PatchAction.tsx';
import RulesBriefing from './RulesBriefing.tsx';

// Temporary screen switcher. No routing library yet — just a bit of
// state tracking which screen is showing. Swap this for react-router-dom
// once you want real URLs (e.g. /scoreboard) instead of in-memory state.

type Screen =
  | 'home'
  | 'login'
  | 'scoreboard'
  | 'vulnerabilities'
  | 'patch'
  | 'rules';

const screens: { key: Screen; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'login', label: 'Login' },
  { key: 'scoreboard', label: 'Scoreboard' },
  { key: 'vulnerabilities', label: 'Vulnerabilities' },
  { key: 'patch', label: 'Patch action' },
  { key: 'rules', label: 'Rules' },
];

// Placeholder data so Scoreboard / VulnerabilityStatus / PatchAction
// have something to show. Replace with real API data once your
// backend endpoints exist.
const sampleActivity = [
  { time: '14:22', text: 'Failed login x4 on /api/auth' },
  { time: '13:05', text: 'Flag captured by brother' },
];

const sampleHistory = [
  { round: 3, who: 'You', flag: 'Java', honour: 20, currency: 10 },
  { round: 2, who: 'Brother', flag: 'React', honour: 15, currency: 5 },
];

const sampleVulns = [
  { name: 'SQL injection on /api/users', layer: 'Java', activatedAt: '09:40 today', patched: false },
  { name: 'Client-side authorisation on admin panel', layer: 'React', activatedAt: 'yesterday', patched: true },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <div>
      <nav
        style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 16px',
          background: '#111',
          borderBottom: '1px solid #333',
        }}
      >
        {screens.map((s) => (
          <button
            key={s.key}
            onClick={() => setScreen(s.key)}
            style={{
              background: screen === s.key ? '#e8e8e8' : 'transparent',
              color: screen === s.key ? '#0a0a0a' : '#e8e8e8',
              border: '1px solid #444',
              borderRadius: '2px',
              padding: '6px 12px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {screen === 'home' && (
        <HomeDashboard
          honour={120}
          currency={45}
          alertActive
          activity={sampleActivity}
          onNavigate={(dest: string) => setScreen(dest as Screen)}
        />
      )}

      {screen === 'login' && (
        <LoginScreen
          onSubmit={(creds: { username: string; password: string }) => {
            console.log('login submitted', creds);
            setScreen('home');
          }}
          onForgotPassword={() => console.log('forgot password clicked')}
        />
      )}

      {screen === 'scoreboard' && (
        <Scoreboard
          you={{ honour: 120, currency: 45, captures: 3 }}
          opponent={{ name: 'Brother', honour: 95, currency: 30, captures: 2 }}
          history={sampleHistory}
        />
      )}

      {screen === 'vulnerabilities' && (
        <VulnerabilityStatus
          vulnerabilities={sampleVulns}
          nextRotation="in 2 days"
          onOpenVuln={() => setScreen('patch')}
        />
      )}

      {screen === 'patch' && (
        <PatchAction
          name="SQL injection on /api/users"
          before={'query = "SELECT * FROM\nusers WHERE id=" + input'}
          after={'query = "SELECT * FROM\nusers WHERE id=?"\nbind(input)'}
          onPatched={() => console.log('marked patched')}
        />
      )}

      {screen === 'rules' && <RulesBriefing />}
    </div>
  );
}
