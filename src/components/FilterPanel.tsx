import { TASK_SORT, TASK_STATUS, type TaskSort } from '@/shared/constants/task';
import '@/styles/FilterPanel.css';
import type { FilterStatus } from '@/types/entities';

interface FilterPanelProps {
  searchQuery: string;
  onSearchQueryChange: (text: string) => void;
  selectedStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  selectedSort: TaskSort;
  onSortChange: (sort: TaskSort) => void;
}

interface FilterOption {
  value: FilterStatus;
  label: string;
}
interface SortOption {
  value: TaskSort;
  label: string;
}

const filterOptions: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: TASK_STATUS.BACKLOG, label: 'Backlog' },
  { value: TASK_STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: TASK_STATUS.DONE, label: 'Done' },
];
const sortOptions: SortOption[] = [
  { value: TASK_SORT.DEFAULT, label: 'Default' },
  { value: TASK_SORT.TITLE_ASC, label: 'Title A-Z' },
  { value: TASK_SORT.TITLE_DESC, label: 'Title Z-A' },
];

export function FilterPanel({
  searchQuery,
  onSearchQueryChange,
  selectedStatus,
  onStatusChange,
  selectedSort,
  onSortChange,
}: FilterPanelProps) {
  return (
    <section className="filter-panel">
      <h2 className="filter-panel__title">Filters</h2>
      <label htmlFor="status" className="filter-panel__label">
        Status
      </label>
      <select
        name="status"
        id="status"
        className="filter-panel__select"
        value={selectedStatus}
        onChange={(event) => onStatusChange(event.target.value as FilterStatus)}
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="search" className="filter-panel__label">
        Search
      </label>
      <input
        type="text"
        name="search"
        id="search"
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        placeholder="Enter text..."
        className="filter-panel__search"
      />

      <label htmlFor="sort" className="filter-panel__label">
        Sort
      </label>
      <select
        name="sort"
        id="sort"
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value as TaskSort)}
        className="filter-panel__select"
      >
        {sortOptions.map((sort) => (
          <option key={sort.value} value={sort.value}>
            {sort.label}
          </option>
        ))}
      </select>
    </section>
  );
}
