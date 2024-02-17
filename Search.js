import React, { useState } from 'react';
import axios from 'axios';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/search?q=${query}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': 'YOUR_API_KEY_HERE'
                }
            });
            setResults(response.data.webPages.value);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <a href={result.url}>{result.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
