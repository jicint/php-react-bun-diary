import React, { useState } from 'react';
import axios from 'axios';

interface NewEntryFormProps {
  onEntryCreated: () => void;
}

export const NewEntryForm: React.FC<NewEntryFormProps> = ({ onEntryCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('backend/api/diary.php?action=create', {
        title,
        content,
        mood
      });
      setTitle('');
      setContent('');
      setMood('');
      onEntryCreated(); // Refresh the entries list
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-entry-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        required
      >
        <option value="">Select mood</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="neutral">Neutral</option>
      </select>
      <button type="submit">Create Entry</button>
    </form>
  );
}; 