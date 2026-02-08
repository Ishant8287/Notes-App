import React from "react";

const NoteForm = ({
  theme,
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
  editId,
}) => (
  <section
    className={`lg:w-[40%] p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"}`}
  >
    <div className="max-w-md w-full mx-auto space-y-8">
      <h1
        className={`text-5xl font-black tracking-tighter ${theme === "dark" ? "bg-linear-to-r from-white to-zinc-500 bg-clip-text text-transparent" : "text-zinc-900"}`}
      >
        {editId ? "UPDATE." : "CREATE."}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className={`w-full border rounded-xl px-6 py-4 outline-none transition-all text-lg 
            ${
              theme === "dark"
                ? "bg-zinc-900/50 border-zinc-800 focus:border-indigo-500 text-white placeholder:text-zinc-700"
                : "bg-white border-zinc-200 focus:border-indigo-500 text-zinc-900 placeholder:text-zinc-400"
            }`}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className={`w-full h-40 border rounded-xl px-6 py-4 outline-none resize-none transition-all 
            ${
              theme === "dark"
                ? "bg-zinc-900/50 border-zinc-800 focus:border-indigo-500 text-white placeholder:text-zinc-700"
                : "bg-white border-zinc-200 focus:border-indigo-500 text-zinc-900 placeholder:text-zinc-400"
            }`}
        />
        <button
          type="submit"
          className={`w-full font-bold py-4 rounded-xl active:scale-[0.98] transition-all 
            ${theme === "dark" ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"}`}
        >
          {editId ? "SAVE CHANGES" : "ADD NOTE"}
        </button>
      </form>
    </div>
  </section>
);

export default NoteForm;
