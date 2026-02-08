import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ notes, theme, onDelete, onEdit }) => (
  <section
    className={`lg:w-[60%] p-8 md:p-12 lg:p-16 ${theme === "dark" ? "bg-[#0f0f0f]" : "bg-zinc-100/50"}`}
  >
    <div className="flex items-center justify-between mb-10">
      <h2
        className={`text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
      >
        Your Collection
      </h2>
      <span
        className={`px-3 py-1 border rounded-full text-[10px] font-mono uppercase tracking-widest ${theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-white border-zinc-200 text-zinc-600"}`}
      >
        {notes.length} {notes.length === 1 ? "Note" : "Notes"}
      </span>
    </div>

    {notes.length === 0 ? (
      <div
        className={`h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl ${theme === "dark" ? "border-zinc-800 text-zinc-600" : "border-zinc-300 text-zinc-400"}`}
      >
        <p className="font-medium italic text-lg">
          Empty space. Fill it with ideas.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            theme={theme}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    )}
  </section>
);

export default NoteList;
