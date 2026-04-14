import { users } from '@/data/mockData';
import { useState } from 'react';

const UsersPanel = () => {
  const [selectedFirstName, setSelectedFirstName] = useState<string>('All');
  const [searchUser, setSearchUser] = useState('');
  const firstNameOptions = [
    'All',
    ...new Set(users.map((user) => user.name.trim().split(/\s+/)[0])),
  ];

  const visibleUsers = users.filter((user) => {
    const firstName = user.name.trim().split(/\s+/)[0];
    const matchesFilterName =
      selectedFirstName === 'All' || firstName === selectedFirstName;
    const matchesSearch =
      !searchUser ||
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase());

    return matchesFilterName && matchesSearch;
  });

  return (
    <>
      <form className="filter-panel">
        <section>
          <label htmlFor="filter" className="filter-panel__label">
            Filter
          </label>
          <select
            className="filter-panel__select"
            name="filter"
            id="filter"
            value={selectedFirstName}
            onChange={(e) => setSelectedFirstName(e.target.value)}
          >
            {firstNameOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="search" className="filter-panel__label">
            Search
          </label>
          <input
            type="input"
            id="search"
            className="filter-panel__search"
            placeholder="Search text..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </section>
      </form>
      {visibleUsers.length === 0 ? (
        <p>Users not found</p>
      ) : (
        <div>
          {visibleUsers.map((user) => (
            <article className="task-card" key={user.id}>
              <h3 className="task-card__title">{user.name}</h3>
              <span className="status-badge status-badge--done">
                {user.email}
              </span>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default UsersPanel;
