import '@/styles/Sidebar.css';

export function Sidebar() {
  return (
    <nav className="sidebar">
      <ul className="sidebar__list">
        <li className="sidebar__item">Dashboard</li>
        <li className="sidebar__item">My Tasks</li>
        <li className="sidebar__item">Projects</li>
      </ul>
    </nav>
  );
}
