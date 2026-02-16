import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

/**
 * VscodePage — Visual Studio Code UI replica
 * 
 * Route: /vscode
 */
export default function VscodePage() {
  const { isAuthenticated } = useAuth();
  const [activePanel, setActivePanel] = useState('explorer');
  const [activeFile, setActiveFile] = useState('App.jsx');
  const [openTabs, setOpenTabs] = useState(['App.jsx', 'index.js']);
  const [bottomPanel, setBottomPanel] = useState('terminal');

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const sampleCode = `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;`;

  const fileTree = [
    { name: 'pingme', type: 'folder', expanded: true, children: [
      { name: 'src', type: 'folder', expanded: true, children: [
        { name: 'App.jsx', type: 'file' },
        { name: 'index.js', type: 'file' },
        { name: 'App.css', type: 'file' }
      ]},
      { name: 'public', type: 'folder', expanded: false, children: [
        { name: 'index.html', type: 'file' },
        { name: 'favicon.ico', type: 'file' }
      ]},
      { name: 'package.json', type: 'file' },
      { name: 'README.md', type: 'file' }
    ]}
  ];

  const renderFileTree = (items, level = 0) => {
    return items.map((item, index) => (
      <div key={index} className="vscode-file-item">
        <div 
          className={`vscode-file-row ${activeFile === item.name ? 'active' : ''}`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => item.type === 'file' && setActiveFile(item.name)}
        >
          {item.type === 'folder' && (
            <span className="vscode-file-icon">
              {item.expanded ? '▼' : '▶'}
            </span>
          )}
          {item.type === 'file' && (
            <span className="vscode-file-icon">📄</span>
          )}
          <span className="vscode-file-name">{item.name}</span>
        </div>
        {item.children && item.expanded && (
          <div className="vscode-file-children">
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="vscode-page">
      {/* Title Bar */}
      <div className="vscode-titlebar">
        <div className="vscode-titlebar-left">
          <div className="vscode-titlebar-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
            </svg>
          </div>
          <span className="vscode-titlebar-title">PingMe - Visual Studio Code</span>
        </div>
        <div className="vscode-titlebar-right">
          <button className="vscode-titlebar-btn">−</button>
          <button className="vscode-titlebar-btn">□</button>
          <button className="vscode-titlebar-btn vscode-titlebar-btn--close">×</button>
        </div>
      </div>

      <div className="vscode-main">
        {/* Activity Bar */}
        <div className="vscode-activity-bar">
          <div className="vscode-activity-icons">
            <button 
              className={`vscode-activity-icon ${activePanel === 'explorer' ? 'active' : ''}`}
              onClick={() => setActivePanel('explorer')}
              title="Explorer"
            >
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M14.5 3H7.71l-.85-.85L6.51 2h-4a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.49-.5zM6.49 3l.35.15.86.85h6.8v9.5h-11V3h2.99z"/>
              </svg>
            </button>
            <button 
              className={`vscode-activity-icon ${activePanel === 'search' ? 'active' : ''}`}
              onClick={() => setActivePanel('search')}
              title="Search"
            >
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.4zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"/>
              </svg>
            </button>
            <button 
              className={`vscode-activity-icon ${activePanel === 'git' ? 'active' : ''}`}
              onClick={() => setActivePanel('git')}
              title="Source Control"
            >
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
                <path d="M8 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>
              </svg>
            </button>
            <button 
              className={`vscode-activity-icon ${activePanel === 'debug' ? 'active' : ''}`}
              onClick={() => setActivePanel('debug')}
              title="Run and Debug"
            >
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="m8 3 1.53 1.53 1.27-.27.27 1.27L13 6.99V9.01l-1.93-1.46-.27 1.27-1.27-.27L8 10 6.47 8.55l-1.27.27-.27-1.27L3 8.99V6.97l1.93 1.46.27-1.27 1.27.27L8 3z"/>
              </svg>
            </button>
            <button 
              className={`vscode-activity-icon ${activePanel === 'extensions' ? 'active' : ''}`}
              onClick={() => setActivePanel('extensions')}
              title="Extensions"
            >
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 2v12h16V2H0zm1 1h14v10H1V3z"/>
                <path d="M2 4h12v1H2V4zM2 6h4v1H2V6zM2 8h7v1H2V8z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="vscode-sidebar">
          <div className="vscode-sidebar-header">
            <span className="vscode-sidebar-title">EXPLORER</span>
            <div className="vscode-sidebar-actions">
              <button className="vscode-sidebar-action" title="New File">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M9.5 1.1l3.4 3.5.1.4v2h-1V6H8V2H3v11h4v1H2.5l-.5-.5v-12l.5-.5h6.7l.3.1zM9 2v3h2.9L9 2z"/>
                </svg>
              </button>
              <button className="vscode-sidebar-action" title="New Folder">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M7.71 3l.85.85.86.85h4.79l.79.79v7.71l-.79.79H2.79l-.79-.79V2.79l.79-.79h4.18l.85-.85L7.67 1l.04.04zM2 3h4.5l1 1H14v8H2V3z"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="vscode-file-tree">
            {renderFileTree(fileTree)}
          </div>
        </div>

        {/* Editor Area */}
        <div className="vscode-editor-area">
          {/* Tabs */}
          <div className="vscode-tab-bar">
            {openTabs.map((tab) => (
              <div 
                key={tab}
                className={`vscode-tab ${activeFile === tab ? 'active' : ''}`}
                onClick={() => setActiveFile(tab)}
              >
                <span className="vscode-tab-name">{tab}</span>
                <button className="vscode-tab-close">×</button>
              </div>
            ))}
          </div>

          {/* Editor */}
          <div className="vscode-editor">
            <div className="vscode-editor-gutter">
              {sampleCode.split('\n').map((_, index) => (
                <div key={index} className="vscode-line-number">{index + 1}</div>
              ))}
            </div>
            <div className="vscode-editor-content">
              <pre className="vscode-code">
                <code>{sampleCode}</code>
              </pre>
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="vscode-bottom-panel">
            <div className="vscode-bottom-tabs">
              <button 
                className={`vscode-bottom-tab ${bottomPanel === 'terminal' ? 'active' : ''}`}
                onClick={() => setBottomPanel('terminal')}
              >
                TERMINAL
              </button>
              <button 
                className={`vscode-bottom-tab ${bottomPanel === 'problems' ? 'active' : ''}`}
                onClick={() => setBottomPanel('problems')}
              >
                PROBLEMS
              </button>
              <button 
                className={`vscode-bottom-tab ${bottomPanel === 'output' ? 'active' : ''}`}
                onClick={() => setBottomPanel('output')}
              >
                OUTPUT
              </button>
            </div>
            <div className="vscode-bottom-content">
              {bottomPanel === 'terminal' && (
                <div className="vscode-terminal">
                  <div className="vscode-terminal-line">
                    <span className="vscode-terminal-prompt">PS C:\Users\ahmed\OneDrive\Desktop\PingMe&gt;</span>
                    <span className="vscode-terminal-command">npm run dev</span>
                  </div>
                  <div className="vscode-terminal-line">
                    <span className="vscode-terminal-output">&gt; pingme@1.0.0 dev</span>
                  </div>
                  <div className="vscode-terminal-line">
                    <span className="vscode-terminal-output">&gt; vite</span>
                  </div>
                  <div className="vscode-terminal-line">
                    <span className="vscode-terminal-output">  VITE v5.4.21  ready in 1248 ms</span>
                  </div>
                  <div className="vscode-terminal-line">
                    <span className="vscode-terminal-output">  ➜  Local:   http://localhost:5173/</span>
                  </div>
                  <div className="vscode-terminal-line">
                    <span className="vscode-terminal-cursor">█</span>
                  </div>
                </div>
              )}
              {bottomPanel === 'problems' && (
                <div className="vscode-problems">
                  <div className="vscode-problems-empty">No problems have been detected in the workspace.</div>
                </div>
              )}
              {bottomPanel === 'output' && (
                <div className="vscode-output">
                  <div className="vscode-output-line">[Extension Host] Info Python extension loading</div>
                  <div className="vscode-output-line">[Extension Host] Info TypeScript extension activated</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="vscode-status-bar">
        <div className="vscode-status-left">
          <span className="vscode-status-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{marginRight: '4px'}}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            main
          </span>
          <span className="vscode-status-item">0 ↓ 0 ↑</span>
          <span className="vscode-status-item">0 ⚠ 0 ✗</span>
        </div>
        <div className="vscode-status-right">
          <span className="vscode-status-item">UTF-8</span>
          <span className="vscode-status-item">LF</span>
          <span className="vscode-status-item">JavaScript React</span>
          <span className="vscode-status-item">Ln 10, Col 5</span>
        </div>
      </div>
    </div>
  );
}