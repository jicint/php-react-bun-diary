import React from 'react';
import { DiaryEntry } from '../../types';  // You may need to move interfaces to a types file

interface DiaryEntryViewProps {
  entry: DiaryEntry;
  onClose: () => void;
}

export const DiaryEntryView: React.FC<DiaryEntryViewProps> = ({ entry, onClose }) => {
  return (
    <div className="entry-view">
      <button onClick={onClose}>Close</button>
      <h2>{entry.title}</h2>
      <p>{entry.content}</p>
      <div className="entry-metadata">
        <span>Mood: {entry.mood}</span>
        <span>Created: {new Date(entry.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}; 