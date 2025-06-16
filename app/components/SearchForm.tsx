"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-2 py-1 rounded text-green-500 border border-green-500 outline-none focus:outline-none w-[100px] md:w-full"
        placeholder="Search some genre or tag"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
