import { useState, type CSSProperties, type FormEvent } from 'react';
import { theme, panelStyle, screenStyle, titleStyle } from '../styles/theme.ts';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginScreenProps {
  onSubmit?: (credentials: LoginCredentials) => void;
  onForgotPassword?: () => void;
}

const inputStyle: CSSProperties = {
  ...panelStyle,
  width: '100%',
  boxSizing: 'border-box',
  fontSize: '14px',
  outline: 'none',
};

const buttonStyle: CSSProperties = {
  width: '100%',
  padding: '12px',
  background: theme.color.buttonBg,
  color: theme.color.buttonText,
  border: 'none',
  borderRadius: theme.radius,
  fontSize: '14px',
  cursor: 'pointer',
  boxSizing: 'border-box',
};

export default function LoginScreen({ onSubmit = () => {}, onForgotPassword = () => {} }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Enter a username and password.');
      return;
    }
    setError('');
    onSubmit({ username, password });
  }

  return (
    <div style={{ ...screenStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '320px' }}>
        <h1 style={titleStyle}>Cain &amp; Able</h1>

        <div style={{ marginBottom: '12px' }}>
          <input
            style={inputStyle}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div style={{ fontSize: '12px', color: theme.color.accentWarn, marginBottom: '12px' }}>
            {error}
          </div>
        )}

        <button type="submit" style={buttonStyle}>
          Sign in
        </button>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            type="button"
            onClick={onForgotPassword}
            style={{
              background: 'none',
              border: 'none',
              color: theme.color.textDim,
              fontSize: '12px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Forgot password
          </button>
        </div>
      </form>
    </div>
  );
}
