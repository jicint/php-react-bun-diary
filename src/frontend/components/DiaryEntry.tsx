import React from 'react';
interface DiaryEntry {
    id: number;
    title: string;
    content: string;
    mood: string;
    created_at: string;
    updated_at: string;
}

interface DiaryEntryProps {
    entry: DiaryEntry;
}

export const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry }) => {
    return (
        <div className="diary-entry">
            <h3>{entry.title}</h3>
            <div className="entry-meta">
                <span className="mood">Mood: {entry.mood}</span>
                <span className="date">{new Date(entry.created_at).toLocaleDateString()}</span>
            </div>
            <p>{entry.content}</p>
        </div>
    );
}; 