import React, { useState, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  error?: string;
}

export default function TagsInput({ value, onChange, placeholder = 'Tags', error }: TagsInputProps) {
  const [input, setInput] = useState('');

  const addTag = (tag: string) => {
    const t = tag.trim();
    if (!t) return;
    if (value.includes(t)) return;
    onChange([...value, t]);
    setInput('');
  };

  const removeTag = (t: string) => onChange(value.filter((x) => x !== t));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div>
      <div
        className={cn(
          'flex flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-background-light px-3 py-2 focus-within:ring-2 focus-within:ring-primary',
          error && 'border-error-500 focus-within:ring-error-500'
        )}
      >
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-white/60 border border-gray-300 px-2 py-1 text-xs text-gray-700">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-gray-600">×</button>
          </span>
        ))}
        <input
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
    </div>
  );
}


