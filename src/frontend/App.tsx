import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryEntryView } from './components/DiaryEntryView';
import { NewEntryForm } from './components/NewEntryForm';
interface DatabaseStatus {
  status: string;
  message: string;
}

interface MemoryInfo {
  limit: string;
  usage: string;
}

interface StatusResponse {
  timestamp: string;
  php_version: string;
  server: string;
  database: DatabaseStatus;
  memory: MemoryInfo;
}

interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  mood: string;
  created_at: string;
  updated_at: string;
}

function App() {
  const [dbStatus, setDbStatus] = useState<string>('');
  const [phpVersion, setPhpVersion] = useState<string>('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  useEffect(() => {
    // Fetch status
    axios.get<StatusResponse>('/api/diary.php')
      .then(response => {
        setDbStatus(response.data.database.message);
        setPhpVersion(response.data.php_version);
      })
      .catch(error => console.error('Error:', error));

    // Fetch diary entries
    axios.get<DiaryEntry[]>('/api/diary.php?action=entries')
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => console.error('Error fetching entries:', error));
  }, []);

  const refreshEntries = () => {
    axios.get<DiaryEntry[]>('backend/api/diary.php?action=entries')
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => console.error('Error fetching entries:', error));
  };

  return (
    <div className="app-container">
      <header>
        <h1>My Diary App</h1>
        <div className="system-info">
          <p>Database Status: {dbStatus}</p>
          <p>PHP Version: {phpVersion}</p>
        </div>
      </header>

      <main>
        <NewEntryForm onEntryCreated={refreshEntries} />
        
        {selectedEntry ? (
          <DiaryEntryView 
            entry={selectedEntry} 
            onClose={() => setSelectedEntry(null)} 
          />
        ) : (
          <div className="entries-list">
            {entries.map(entry => (
              <div 
                key={entry.id} 
                className="entry-card"
                onClick={() => setSelectedEntry(entry)}
              >
                <h3>{entry.title}</h3>
                <div className="entry-preview">
                  <p>{entry.content.substring(0, 100)}...</p>
                  <span className="entry-date">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 