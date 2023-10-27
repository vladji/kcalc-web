import React, { ChangeEvent, useState } from 'react';
import { Spinner } from '../../../components/shared/Spinner';
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

  const { search, data, loading } = useSearch();
  const debouncedSearch = useDebounce(search, 500);

  const searchRequest = ({ query, page }: SearchRequest) => {
    debouncedSearch({ query, page });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    searchRequest({ query: value, page: 1 });
  };

  const onBufferCopy = (event: any, value: string) => {
    navigator.clipboard.writeText(value);
    const target = event.target.closest('.cell-id').querySelector('.item-id');
    target.style.color = '#5b8fd3';
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
    <section className={cn('layout-padding-inline', styles.section)}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputHolder}>
          <input type="text" value={query} onChange={onChange} />
          {loading && (
            <div className={styles.spinner}>
              <Spinner color="grayColor" size="small" />
            </div>
          )}
        </div>
      </div>
      <ul className={styles.tableHeader}>
        <li>category</li>
        <li>ID</li>
        <li>name</li>
        <li>prot</li>
        <li>fat</li>
        <li>carb</li>
        <li>kcal</li>
      </ul>
      <ul className={styles.listWrapper}>
        {!!data?.results &&
          data.results.map((item) => (
            <li key={item.id.raw} className={styles.item}>
              <span>{item.category.raw}</span>
              <div className={cn(styles.cellId, 'cell-id')}>
                <span className="item-id">{item.id.raw}</span>
                <button
                  className={styles.copyButton}
                  onClick={(event) => onBufferCopy(event, item.id.raw)}
                >
                  <ClipboardIcon color={BLACK_COLOR} />
                </button>
              </div>
              <span
                className={styles.cellName}
                dangerouslySetInnerHTML={{ __html: item.name.snippet }}
              />
              <span>{item.proteins.raw}</span>
              <span>{item.fat.raw}</span>
              <span>{item.carbohydrates.raw}</span>
              <span>{item.kcal.raw}</span>
            </li>
          ))}
      </ul>
      <div className={styles.paginationBlock}>
        <button onClick={onPrevPage} disabled={!canPrevPage}>
          {'<<< prev'}
        </button>
        <div>
          <span>
            <b>{data?.meta.page.current}</b>
          </span>
          <span>({data?.meta.page.total_pages})</span>
        </div>
        <button onClick={onNextPage} disabled={!canNextPage}>
          {'next >>>'}
        </button>
      </div>
    </section>
  );
};
