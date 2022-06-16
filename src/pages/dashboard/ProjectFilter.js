const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];
export default function ProjectFilter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter By:</p>
        {filterList.map((btn) => (
          <button
            key={btn}
            className={currentFilter === btn ? "active" : ""}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </nav>
    </div>
  );
}
