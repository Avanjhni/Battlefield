import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface ServerStats {
  players: string
  ping: string
  tickRate: string
}

interface ServerSettings {
  basic: Record<string, string>
  advanced: Record<string, string>
  rules: Record<string, string>
}

interface ServerResponse {
  stats: ServerStats
  settings: ServerSettings
}

interface SettingProps {
  label: string
  value: string | number | "ON" | "OFF"
}

function Setting({ label, value }: SettingProps) {
  return (
    <div className="setting-row">
      <span className="setting-label">{label}</span>
      <span className="setting-value">{value}</span>
    </div>
  )
}

function App() {
  const [serverInfo, setServerInfo] = useState<ServerResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isStarred, setIsStarred] = useState(false)

  useEffect(() => {
    const fetchServerInfo = async () => {
      try {
        const response = await axios.get<ServerResponse>('https://battlefield-1-khl1.onrender.com/api/server-info')
        setServerInfo(response.data)
        console.log("Response :", response)
      } catch (err) {
        setError("Failed to fetch server information")
      }
    }

    fetchServerInfo()
  }, [])

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!serverInfo) {
    return <div className="loading">Loading server information...</div>
  }

  return (
    <div className="server-info">
      <div className="header">
        <div className="breadcrumb">
          <span>MULTIPLAYER</span>
          <span>/</span>
          <span>SERVER BROWSER</span>
          <span>/</span>
        </div>
        <h1>SERVER INFO</h1>
      </div>

      <div className="server-name">
        <h2>! RC3-BASEMAPS</h2>
        <div className="server-details">
          <span>CONQUEST LARGE</span>
          <span>•</span>
          <span>LANCANG DAM</span>
          <span>•</span>
          <span>CUSTOM</span>
          <span>•</span>
          <span>{serverInfo.stats.tickRate}</span>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn">JOIN</button>
        <button className="btn">SPECTATE</button>
        <button className="btn">JOIN AS COMMANDER</button>
        <button 
          className={`btn ${isStarred ? 'starred' : ''}`}
          onClick={() => setIsStarred(!isStarred)}
        >
          ★ 12/12
        </button>
      </div>

      <div className="server-stats">
        <div className="stat-item">
          <span>PLAYERS</span>
          <span>{serverInfo.stats.players}</span>
        </div>
        <div className="stat-item">
          <span>PING</span>
          <span>{serverInfo.stats.ping}</span>
        </div>
        <div className="stat-item">
          <span>TICKRATE</span>
          <span>{serverInfo.stats.tickRate}</span>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-column">
          <h3>SETTINGS</h3>
          {Object.entries(serverInfo.settings.basic).map(([label, value]) => (
            <Setting key={label} label={label} value={value} />
          ))}
        </div>

        <div className="settings-column">
          <h3>ADVANCED</h3>
          {Object.entries(serverInfo.settings.advanced).map(([label, value]) => (
            <Setting key={label} label={label} value={value} />
          ))}
        </div>

        <div className="settings-column">
          <h3>RULES</h3>
          {Object.entries(serverInfo.settings.rules).map(([label, value]) => (
            <Setting key={label} label={label} value={value} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
