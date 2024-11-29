import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

function App() {
  const [dbStatus, setDbStatus] = useState<string>('');
  const [phpVersion, setPhpVersion] = useState<string>('');

  useEffect(() => {
    axios.get<StatusResponse>('/api/status.php')
      .then(response => {
        console.log(response.data);
        setDbStatus(response.data.database.message);
        setPhpVersion(response.data.php_version);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>PHP React App</h1>
      <p>Database Status: {dbStatus}</p>
      <p>PHP Version: {phpVersion}</p>
    </div>
  );
}

export default App; 