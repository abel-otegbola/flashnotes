import { useEffect, useMemo, useState } from "react";
import { searchTasks, SearchTask } from "../../services/search";
import { useUser } from "../../context/authContext";
import LoadingIcon from "../../assets/icons/loading";
import { Magnifer } from "@solar-icons/react";

interface Props {
  onResults?: (results: SearchTask[], query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onResults, placeholder = "Search tasks..." }: Props) {
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchTask[]>([]);

  // Simple debounce
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const run = async () => {
      console.log(user?.email)
      if (!user?.email) return;
      if (!debouncedQuery || debouncedQuery.trim().length < 2) {
        setResults([]);
        onResults?.([], debouncedQuery);
        return;
      }
      setLoading(true);
      const r = await searchTasks(debouncedQuery, user.email, 10);
      setResults(r);
      onResults?.(r, debouncedQuery);
      setLoading(false);
    };
    run();
  }, [debouncedQuery, user?.email]);

  return (
    <div className="flex items-center relative w-full border border-gray-300 dark:border-gray-700 rounded-lg pl-2">
      <Magnifer size={16} color="currentColor" />
      <input
        className="w-full p-2 bg-transparent rounded-lg outline-none"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {setQuery(e.target.value); console.log("Input changed:", e.target.value); }}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"><LoadingIcon className="animate-spin" /></div>
      )}

      {results.length > 0 && query && (
        <div className="absolute mt-2 w-full max-h-72 overflow-auto z-20 bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          {results.map((t) => (
            <div key={t.$id} className="p-3 border-b last:border-0 border-gray-100 dark:border-gray-800">
              <div className="text-sm font-medium">{t.title}</div>
              {t.description && (
                <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{t.description}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
