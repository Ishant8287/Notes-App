import React, { useState, useRef } from "react";

const NoteCard = ({ note, theme, onDelete, onEdit }) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  const minSwipeDistance = 50;
  const deleteButtonWidth = 80;

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - touchStartX;
    
    if (isOpen) {
      const newTranslateX = deleteButtonWidth + diff;
      if (newTranslateX > 0 && newTranslateX <= deleteButtonWidth) {
        setCurrentTranslateX(newTranslateX);
      } else if (newTranslateX <= 0) {
        setCurrentTranslateX(0);
        setIsOpen(false);
      }
    } else {
      if (diff > 0 && diff <= deleteButtonWidth) {
        setCurrentTranslateX(diff);
      }
    }
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX;
    
    if (isOpen) {
      if (diff < -minSwipeDistance) {
        setCurrentTranslateX(0);
        setIsOpen(false);
      } else {
        setCurrentTranslateX(deleteButtonWidth);
        setIsOpen(true);
      }
    } else {
      if (diff > minSwipeDistance) {
        setCurrentTranslateX(deleteButtonWidth);
        setIsOpen(true);
      } else {
        setCurrentTranslateX(0);
        setIsOpen(false);
      }
    }
  };

  const handleMouseDown = (e) => {
    setTouchStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    
    const currentX = e.clientX;
    const diff = currentX - touchStartX;
    
    if (isOpen) {
      const newTranslateX = deleteButtonWidth + diff;
      if (newTranslateX > 0 && newTranslateX <= deleteButtonWidth) {
        setCurrentTranslateX(newTranslateX);
      } else if (newTranslateX <= 0) {
        setCurrentTranslateX(0);
        setIsOpen(false);
      }
    } else {
      if (diff > 0 && diff <= deleteButtonWidth) {
        setCurrentTranslateX(diff);
      }
    }
  };

  const handleMouseUp = (e) => {
    const endX = e.clientX;
    const diff = endX - touchStartX;
    
    if (isOpen) {
      if (diff < -minSwipeDistance) {
        setCurrentTranslateX(0);
        setIsOpen(false);
      } else {
        setCurrentTranslateX(deleteButtonWidth);
        setIsOpen(true);
      }
    } else {
      if (diff > minSwipeDistance) {
        setCurrentTranslateX(deleteButtonWidth);
        setIsOpen(true);
      } else {
        setCurrentTranslateX(0);
        setIsOpen(false);
      }
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

  const handleCardClick = () => {
    if (isOpen) {
      setCurrentTranslateX(0);
      setIsOpen(false);
    }
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
        if (!isOpen && currentTranslateX !== 0) {
          setCurrentTranslateX(0);
        }
      }}
    >
      <div
        className="absolute inset-y-0 left-0 flex items-center bg-red-500 z-10"
        style={{ width: deleteButtonWidth }}
      >
        <button
          onClick={handleDeleteClick}
          className="w-full h-full flex items-center justify-center text-white font-bold transition-colors hover:bg-red-600 active:bg-red-700"
        >
          删除
        </button>
      </div>

      <div
        onClick={handleCardClick}
        className={`relative border p-6 rounded-2xl transition-transform duration-200 ease-out cursor-pointer z-0
        ${theme === "dark" ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700 shadow-none" : "bg-white border-zinc-200 shadow-sm hover:shadow-md"}`}
        style={{ 
          transform: `translateX(${currentTranslateX}px)`,
          userSelect: "none"
        }}
      >
        <div className="absolute top-4 right-4 flex gap-3">
          <button
            onClick={handleEditClick}
            className="text-zinc-500 hover:text-indigo-500 transition-colors text-[10px] font-mono uppercase tracking-widest"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="text-zinc-500 hover:text-red-500 transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <h3
          className={`font-bold text-xl mb-3 pr-20 truncate transition-colors 
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

        {!isOpen && currentTranslateX === 0 && (
          <div className="absolute bottom-2 left-4 text-zinc-400 text-[8px] font-mono opacity-50 pointer-events-none">
            右滑删除
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
