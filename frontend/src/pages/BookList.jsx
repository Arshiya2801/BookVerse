
import React, { useEffect, useState, useCallback } from 'react';
import API from '../api/axios'; 
import SearchSortBar from '../components/SearchSortBar';
import BookCard from '../components/BookCard';

export default function BookListPage() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [booksPage, setBooksPage] = useState([]);     
  const [allBooksCache, setAllBooksCache] = useState(null); 
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

 
  const fetchPage = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/books?page=${p}`);
      
      setBooksPage(data.books || []);
      setPages(data.pages || 1);
      setPage(data.page || p);
      
      if (!searchTerm) setFiltered(data.books || []);
    } catch (err) {
      console.error('fetchPage error', err);
      setBooksPage([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  
  const fetchAllBooks = useCallback(async () => {
    if (allBooksCache) return allBooksCache;
    setLoading(true);
    try {
      const first = await API.get('/books?page=1');
      const totalPages = first.data.pages || 1;
      let all = first.data.books || [];
      if (totalPages > 1) {
        const requests = [];
        for (let i = 2; i <= totalPages; i++) requests.push(API.get(`/books?page=${i}`));
        const results = await Promise.all(requests);
        results.forEach(r => { all = all.concat(r.data.books || []); });
      }
      setAllBooksCache(all);
      return all;
    } catch (err) {
      console.error('fetchAllBooks error', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [allBooksCache]);

  
  useEffect(() => {
    if (!searchTerm) fetchPage(page);
  }, [page, fetchPage, searchTerm]);

  useEffect(() => {
    let active = true;
    const apply = async () => {
      if (!searchTerm) {
        
        let arr = [...booksPage];
        if (sortOption === 'rating') arr.sort((a,b) => (b.averageRating||0) - (a.averageRating||0));
        if (sortOption === 'year') arr.sort((a,b) => (b.year||0) - (a.year||0));
        if (active) setFiltered(arr);
        return;
      }

      
      const all = await fetchAllBooks();
      const term = searchTerm.trim().toLowerCase();
      let results = all.filter(b =>
        (b.title || '').toLowerCase().includes(term) ||
        (b.author || '').toLowerCase().includes(term)
      );

      if (sortOption === 'rating') results.sort((a,b) => (b.averageRating||0) - (a.averageRating||0));
      if (sortOption === 'year') results.sort((a,b) => (b.year||0) - (a.year||0));

      if (active) {
        setFiltered(results);
        
      }
    };

    apply();
    return () => { active = false; };
  }, [searchTerm, sortOption, booksPage, fetchAllBooks]);

 
  const handleClear = () => {
    setSearchTerm('');
    setSortOption('');
    setAllBooksCache(null);
    fetchPage(page);
  };

 
  useEffect(() => { fetchPage(1); }, [fetchPage]);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <SearchSortBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onClear={handleClear}
      />

      {loading && <div className="mb-4">Loading...</div>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="text-gray-500">No books found.</div>
        ) : (
          filtered.map(book => <BookCard key={book._id} book={book} />)
        )}
      </div>

      
      {!searchTerm && (
        <div className="flex justify-center items-center mt-8 space-x-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            className={`px-3 py-2 rounded ${page <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
          >
            Prev
          </button>

          <span className="px-3">Page {page} of {pages}</span>

          <button
            disabled={page >= pages}
            onClick={() => setPage(prev => Math.min(pages, prev + 1))}
            className={`px-3 py-2 rounded ${page >= pages ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
