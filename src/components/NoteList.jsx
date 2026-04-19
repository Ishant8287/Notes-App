import React, { useState } from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ notes, theme, onDelete, onEdit }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const showLess = () => {
    setVisibleCount(6);
  };

  const hasMoreNotes = notes.length > visibleCount;

  return (
    <section
      className={`lg:w-[60%] p-8 md:p-12 lg:p-16 ${theme === "dark" ? "bg-[#0f0f0f]" : "bg-zinc-100/50"}`}
    >
      <div
        className={`flex items-center justify-between mb-10 cursor-pointer select-none group`}
        onClick={toggleCollapse}
      >
        <div className="flex items-center gap-3">
          <h2
            className={`text-2xl font-bold tracking-tight transition-colors ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
          >
            Your Collection
          </h2>
          <span
            className={`text-lg transition-transform duration-300 ${isCollapsed ? "rotate-0" : "rotate-90"} ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}
          >
            ▶
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 border rounded-full text-[10px] font-mono uppercase tracking-widest ${theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-white border-zinc-200 text-zinc-600"}`}
          >
            {notes.length} {notes.length === 1 ? "Note" : "Notes"}
          </span>
          <span
            className={`text-xs font-mono transition-colors duration-200 ${theme === "dark" ? "text-zinc-600" : "text-zinc-400"}`}
          >
            {isCollapsed ? "点击展开" : "点击收起"}
          </span>
        </div>
      </div>

      {notes.length === 0 ? (
        <div
          className={`h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl transition-opacity duration-300 ${isCollapsed ? "opacity-0 h-0 overflow-hidden" : ""} ${theme === "dark" ? "border-zinc-800 text-zinc-600" : "border-zinc-300 text-zinc-400"}`}
        >
          <p className="font-medium italic text-lg">
            Empty space. Fill it with ideas.
          </p>
        </div>
      ) : (
        <div
          className={`transition-all duration-500 ease-in-out ${isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {notes.slice(0, visibleCount).map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                theme={theme}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>

          {(hasMoreNotes || visibleCount > 6) && (
            <div className="flex justify-center gap-4 mt-8">
              {hasMoreNotes && (
                <button
                  onClick={showMore}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 text-sm ${theme === "dark" ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-white text-zinc-600 hover:bg-zinc-50 border border-zinc-200"}`}
                >
                  加载更多 ({notes.length - visibleCount} 个)
                </button>
              )}
              {visibleCount > 6 && (
                <button
                  onClick={showLess}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 text-sm ${theme === "dark" ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`}
                >
                  收起
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {isCollapsed && notes.length > 0 && (
        <div
          className={`text-center py-8 border-2 border-dashed rounded-3xl transition-all duration-500 ${theme === "dark" ? "border-zinc-800 text-zinc-600" : "border-zinc-300 text-zinc-400"}`}
        >
          <p className="font-medium text-lg mb-2">
            已收起 {notes.length} 条笔记
          </p>
          <p className="text-sm">点击上方标题展开查看</p>
        </div>
      )}
    </section>
  );
};

export default NoteList;
