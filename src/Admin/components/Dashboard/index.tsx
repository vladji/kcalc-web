import { ChangeEvent, useState } from 'react';
import { useSearch } from '../../requests/search/useSearch';
import { useDebounce } from '../../../hooks/useDebounce';
import { SearchRequest } from '../../requests/search/types';
import { ClipboardIcon } from '../../icons/ClipboardIcon';
import { BLACK_COLOR } from '../../constants/common';
import cn from 'classnames';
import styles from './styles.module.scss';

export const Dashboard = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { search, data } = useSearch();
  const debouncedSearch = useDebounce(search, 500);
  // console.log('meta', data?.meta);
  // console.log('result', data?.results);

  const searchRequest = ({ query, page }: SearchRequest) => {
    debouncedSearch({ query, page });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    searchRequest({ query: value, page: 1 });
  };

  const onBufferCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const canNextPage = data && data?.meta.page.total_pages > page;
  const canPrevPage = data && page > 1;

  const onNextPage = () => {
    if (canNextPage) {
      setPage((prev) => prev + 1);
      searchRequest({ query, page: page + 1 });
    }
  };

  const onPrevPage = () => {
    if (canPrevPage) {
      setPage((prev) => prev - 1);
      searchRequest({ query, page: page - 1 });
    }
  };

  return (
    <section className={cn('section-wrapper', 'layout-padding-inline', styles.section)}>
      <div className={styles.inputWrapper}>
        <input type="text" value={query} onChange={onChange} />
      </div>
      <ul className={styles.listWrapper}>
        {!!data?.results &&
          data.results.map((item) => (
            <li key={item.id.raw} className={styles.item}>
              <span>{item.category.raw}</span>
              <div className={styles.cellId}>
                <span>{item.id.raw}</span>
                <button className={styles.copyButton} onClick={() => onBufferCopy(item.id.raw)}>
                  <ClipboardIcon color={BLACK_COLOR} />
                </button>
              </div>
              <span
                className={styles.cellName}
                dangerouslySetInnerHTML={{ __html: item.name.snippet }}
              />
            </li>
          ))}
      </ul>
      <div className={styles.paginationBlock}>
        <button onClick={onPrevPage} disabled={!canPrevPage}>
          {'<<< prev'}
        </button>
        <span>
          {data?.meta.page.current} ({data?.meta.page.total_pages})
        </span>
        <button onClick={onNextPage} disabled={!canNextPage}>
          {'next >>>'}
        </button>
      </div>
    </section>
  );
};
