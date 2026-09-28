import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Edit3, Check, X } from 'lucide-react';

interface InlineEditableProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  multiline?: boolean;
}

export const InlineEditable: React.FC<InlineEditableProps> = ({
  value,
  onSave,
  className = '',
  tag: Tag = 'span',
  multiline = false,
}) => {
  const { isEditMode, isAdminLoggedIn } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(value);

  if (!isEditMode || !isAdminLoggedIn) {
    return <Tag className={className}>{value}</Tag>;
  }

  const handleSave = () => {
    onSave(currentText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentText(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <span className="inline-flex items-center gap-1.5 p-1 rounded-lg bg-[#1a0a06] border border-[#F45AA8] shadow-xl z-20">
        {multiline ? (
          <textarea
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            autoFocus
            className="px-2 py-1 text-sm bg-black/80 text-[#FFF4DE] border border-[#F4C95D]/40 rounded focus:outline-none min-w-[280px]"
          />
        ) : (
          <input
            type="text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="px-2 py-0.5 text-sm bg-black/80 text-[#FFF4DE] border border-[#F4C95D]/40 rounded focus:outline-none min-w-[180px]"
          />
        )}
        <button
          type="button"
          onClick={handleSave}
          className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
          title="Save (Enter)"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="p-1 rounded bg-[#24130D] hover:bg-red-800 text-white/70"
          title="Cancel (Esc)"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </span>
    );
  }

  return (
    <Tag
      onClick={() => setIsEditing(true)}
      title="Click to edit text"
      className={`group/editable relative cursor-pointer outline-dashed outline-1 outline-transparent hover:outline-[#F45AA8]/60 hover:bg-[#F45AA8]/10 rounded px-1 -mx-1 transition-all ${className}`}
    >
      {value}
      <span className="opacity-0 group-hover/editable:opacity-100 transition-opacity ml-1.5 inline-flex items-center text-[10px] text-[#F45AA8] align-middle">
        <Edit3 className="w-3 h-3" />
      </span>
    </Tag>
  );
};
