import React from "react";

const NoteCard = ({ note, theme, onDelete, onEdit }) => (
  <div
    className={`group relative border p-6 rounded-2xl transition-all duration-300 
    ${theme === "dark" ? "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 shadow-none" : "bg-white border-zinc-200 shadow-sm hover:shadow-md"}`}
  >
    <div className="absolute top-4 right-4 flex gap-3">
      <button
        onClick={() => onEdit(note)}
        className="text-zinc-500 hover:text-indigo-500 transition-colors text-[10px] font-mono uppercase tracking-widest"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(note.id)}
        className="text-zinc-500 hover:text-red-500 transition-colors text-2xl leading-none"
      >
        ×
      </button>
    </div>

    <h3
      className={`font-bold text-xl mb-3 pr-12 truncate transition-colors 
      ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
    >
      {note.title}
    </h3>
    <p
      className={`text-sm leading-relaxed line-clamp-4 
      ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
    >
      {note.content}
    </p>
    <div
      className={`mt-6 pt-4 border-t text-[10px] font-mono 
      ${theme === "dark" ? "border-zinc-800/50 text-zinc-600" : "border-zinc-100 text-zinc-400"}`}
    >
      {note.date}
    </div>
  </div>
);

export default NoteCard;
