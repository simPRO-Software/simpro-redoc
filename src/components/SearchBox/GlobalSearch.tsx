import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { OperationBadge } from '../SideMenu';
import { SearchIcon, CopyIcon, ClearIcon } from './styled.elements';
import Alert from '../../common-elements/Alert';

const SearchWrap = styled.div`
  position: relative;
`;

const GlobalSearchInput = styled.input`
  padding: 8px 24px 8px 32px; /* Make room for icon */
  min-width: 300px;
  width: 100%;
  box-sizing: border-box;
`;

const CopyIconBox = styled.div`
  padding: 4px;
  border-radius: 100%;
  border: 0.5px solid #fff;

  &:hover {
    border: 0.5px solid #333333;
  }
  &:active .copy-icon {
    fill: black;
  }
  display: flex;
  align-items: center;
`;

const PathBox = styled.div`
  pointer-events: none;
  border-radius: 5px;
  background-color: #33333338;
  padding: 2px 0px;
  text-size: 10px;
`;

const BadgeCopyBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchResultsBox = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  position: absolute;
  top: 100%;
  left: 0px;
  right: 0;
  min-width: 300px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const SearchResultItem = styled.div`
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid #333333;

  :hover:not(:has(.copy-icon:hover)) {
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

interface SearchIndexItem {
  title: string;
  path: string;
  method: string;
  desc: string;
  deprecated: boolean;
  page_file: string;
  anchor: string;
}

export const GlobalSearch = () => {
  const [term, setTerm] = useState('');
  const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
  const [results, setResults] = useState<SearchIndexItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch('./search-index.json')
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

    const newResults = searchIndex
      .filter(
        item =>
          item.title.toLowerCase().includes(newTerm.toLowerCase()) ||
          (item.desc && item.desc.toLowerCase().includes(newTerm.toLowerCase())) ||
          item.path.toLowerCase().includes(newTerm.toLowerCase()),
      )
      .sort((itemA, itemB) => {
        const numA = +itemA.deprecated;
        const numB = +itemB.deprecated;
        return numA - numB;
      });
    setResults(newResults);
  };

  const handleClick = (result: SearchIndexItem) => {
    window.location.href = `?page=${result.page_file}#${result.anchor}`;
  };

  const onFocus = () => setIsFocused(true);

  const onClear = () => {
    setIsFocused(false);
    setResults([]);
    setTerm('');
  };

  async function copyToClipboard(e: any, text: string) {
    setShowAlert(false);
    setShowAlert(true);
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 20,
        top: '7px',
        right: '10%',
        maxWidth: '20%',
        minWidth: '225px',
      }}
    >
      <Alert showAlert={showAlert} setShowAlert={setShowAlert} message={'Copied to clipboard'} />
      <SearchWrap role="search">
        <SearchIcon />
        <GlobalSearchInput
          value={term}
          placeholder="Search endpoints..."
          type="text"
          onChange={handleSearch}
          onFocus={onFocus}
        />
        <div
          style={{
            marginLeft: '20px',
          }}
        ></div>
        {term.length > 0 && <ClearIcon onClick={onClear}>X</ClearIcon>}

        {isFocused && results.length > 0 && (
          <SearchResultsBox>
            {results.slice(0, 10).map((res, idx) => (
              <SearchResultItem key={idx} onMouseDown={() => handleClick(res)}>
                <BadgeCopyBox>
                  <OperationBadge type={res.method}>{res.method}</OperationBadge>
                  <CopyIconBox
                    className=""
                    onMouseDown={e => {
                      copyToClipboard(e, res.path);
                    }}
                  >
                    <CopyIcon />
                  </CopyIconBox>
                </BadgeCopyBox>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  {res.deprecated && (
                    <strong
                      style={{
                        color: 'grey',
                        textDecoration: 'none !important',
                        marginRight: '4px',
                      }}
                    >
                      @Deprecated
                    </strong>
                  )}
                  <strong
                    style={{
                      color: res.deprecated ? 'grey' : 'inherit',
                      textDecoration: res.deprecated ? 'line-through' : 'inherit',
                    }}
                  >
                    {' '}
                    {res.title}
                  </strong>
                </div>
                <PathBox>
                  <div
                    style={{
                      wordBreak: 'break-all',
                      padding: '0 1rem',
                      fontSize: '10px',
                      fontFamily: 'courier',
                    }}
                  >
                    <strong>{res.path}</strong>
                  </div>
                </PathBox>
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
