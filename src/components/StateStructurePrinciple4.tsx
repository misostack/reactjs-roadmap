import React, { useState } from 'react';

export default function StateStructurePrinciple4() {
  const [books, setBooks] = useState([
    {
      id: 1,
      name: 'Clean Code'
    },
    {
      id: 2,
      name: 'ReactJS the right way'
    },
    { id: 3, name: 'Angular the right way' }
  ]);
  const [favoriteBookId, setFavoriteBookId] = useState<number>(0);
  const favoriteBook = books.find(book => book.id === favoriteBookId);
  return (
    <div className="container">
      <h1>StateStructurePrinciple4</h1>
      <div className="bg-green-600 text-white p-4">
        {favoriteBook?.name || 'Please select your favorite book'}
      </div>
      <div>
        {books.map(book => (
          <div key={book.id} className="flex items-center my-4">
            <input
              type="text"
              className="bg-gray-50 text-gray-900 text-sm rounded-lg border leading-6 py-3 px-4 mr-2 w-1/2"
              value={book.name}
              onChange={e => {
                setBooks(
                  books.map(b => {
                    if (b.id === book.id) {
                      return {
                        ...book,
                        name: e.target.value
                      };
                    }
                    return b;
                  })
                );
              }}
            />
            <button
              className="bg-green-400 rounded-md p-4 disabled:opacity-50"
              disabled={book.id === favoriteBookId}
              onClick={() => {
                setFavoriteBookId(book.id);
              }}
            >
              Select as favorite book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
