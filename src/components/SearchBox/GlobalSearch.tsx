import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const SearchWrap = styled.div`
  position: relative;
`;

const SearchIcon = styled.svg`
  /* ... original styles ... */
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  fill: #aaa;
`;

const GlobalSearchInput = styled.input`
  /* ... original styles ... */
  padding: 8px 8px 8px 32px; /* Make room for icon */
  width: 100%;
  box-sizing: border-box;
`;

interface SearchIndexItem {
  title: string;
  desc: string;
  page_file: string;
  anchor: string;
}

export const GlobalSearch = () => {
  const [term, setTerm] = useState('');
  const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
  const [results, setResults] = useState<SearchIndexItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    fetch('./assets/json/search-index.json')
      .then(res => res.json())
      .then((data: SearchIndexItem[]) => {
        setSearchIndex(data);
      })
      .catch(err => {
        console.error('Failed to load search-index.json', err);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setTerm(newTerm);

    if (!newTerm) {
      setResults([]);
      return;
    }

    const newResults = searchIndex.filter(
      item =>
        item.title.toLowerCase().includes(newTerm.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(newTerm.toLowerCase())),
    );
    setResults(newResults);
  };

  const handleClick = (result: SearchIndexItem) => {
    window.location.href = `?page=${result.page_file}#${result.anchor}`;
  };

  const onFocus = () => setIsFocused(true);
  const onBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 99999,
        top: '-45px',
        right: '10%',
        maxWidth: '20%',
        minWidth: '225px',
      }}
    >
      <SearchWrap role="search">
        <SearchIcon />
        <GlobalSearchInput
          value={term}
          placeholder="Search endpoints..."
          type="text"
          onChange={handleSearch}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {isFocused && results.length > 0 && (
          <SearchResultsBox>
            {results.slice(0, 10).map((res, idx) => (
              <SearchResultItem key={idx} onMouseDown={() => handleClick(res)}>
                <strong>{res.title}</strong>
              </SearchResultItem>
            ))}
          </SearchResultsBox>
        )}

        {isFocused && term && results.length === 0 && (
          <SearchResultsBox>
            <SearchResultItem>No results found</SearchResultItem>
          </SearchResultsBox>
        )}
      </SearchWrap>
    </div>
  );
};

const SearchResultsBox = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const SearchResultItem = styled.div`
  padding: 10px 14px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }

  & > strong {
    display: block;
    font-size: 13px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
