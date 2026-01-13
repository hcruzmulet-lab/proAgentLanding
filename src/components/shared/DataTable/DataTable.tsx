import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '../EmptyState';
import './DataTable.scss';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  emptyMessage,
  onRowClick,
}: DataTableProps<T>) {
  const t = useTranslations('common');

  if (isLoading) {
    return (
      <div className="data-table__loading">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="data-table__skeleton" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState message={emptyMessage || t('noResults')} />;
  }

  return (
    <div className="data-table">
      <table className="data-table__table">
        <thead className="data-table__header">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.className}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="data-table__body">
          {data.map((row) => (
            <tr
              key={row.id}
              className={`data-table__row ${onRowClick ? 'data-table__row--clickable' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={column.className}>
                  {typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
