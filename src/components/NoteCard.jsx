import React, { useState, useRef } from "react";

const NoteCard = ({ note, theme, onDelete, onEdit }) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const cardRef = useRef(null);

  const minSwipeDistance = 50;
  const maxSwipeDistance = 100;

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    
    if (diff > 0) {
      const constrainedDiff = Math.min(diff, maxSwipeDistance);
      setTranslateX(constrainedDiff);
    }
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchEnd - touchStart;
    
    if (diff > minSwipeDistance) {
      setIsSwiped(true);
      setTranslateX(maxSwipeDistance);
    } else if (diff < -minSwipeDistance) {
      setIsSwiped(false);
      setTranslateX(0);
    } else {
      setTranslateX(0);
      setIsSwiped(false);
    }
  };

  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    const currentX = e.clientX;
    const diff = currentX - touchStart;
    
    if (diff > 0) {
      const constrainedDiff = Math.min(diff, maxSwipeDistance);
      setTranslateX(constrainedDiff);
    }
  };

  const handleMouseUp = (e) => {
    const diff = e.clientX - touchStart;
    
    if (diff > minSwipeDistance) {
      setIsSwiped(true);
      setTranslateX(maxSwipeDistance);
    } else if (diff < -minSwipeDistance) {
      setIsSwiped(false);
      setTranslateX(0);
    } else {
      setTranslateX(0);
      setIsSwiped(false);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        if (!isSwiped) {
          setTranslateX(0);
        }
      }}
    >
      <div
        className={`absolute inset-y-0 left-0 flex items-center bg-red-500 transition-opacity duration-200 ${isSwiped ? "opacity-100" : "opacity-0"}`}
        style={{ width: maxSwipeDistance }}
      >
        <button
          onClick={handleDeleteClick}
          className="w-full h-full flex items-center justify-center text-white font-bold transition-colors hover:bg-red-600"
        >
          删除
        </button>
      </div>

      <div
        className={`relative border p-6 rounded-2xl transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing
        ${theme === "dark" ? "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 shadow-none" : "bg-white border-zinc-200 shadow-sm hover:shadow-md"}`}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <div className="absolute top-4 right-4 flex gap-3">
          <button
            onClick={handleEditClick}
            className="text-zinc-500 hover:text-indigo-500 transition-colors text-[10px] font-mono uppercase tracking-widest"
          >
            Edit
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
    </div>
  );
};

export default NoteCard;
