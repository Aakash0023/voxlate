export default function TasksCard() {
  const tasks = [
    {
      owner: "Rahul",
      task: "Complete Backend API",
      deadline: "Tomorrow",
    },
    {
      owner: "Aakash",
      task: "Prepare Demo",
      deadline: "Friday",
    },
  ];

  return (
    <div className="ai-card">
      <div className="card-header">
        <h3>✅ Tasks</h3>
        <span>{tasks.length}</span>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div className="task-item" key={index}>
            <h4>{task.task}</h4>

            <div className="task-meta">
              <span>{task.owner}</span>
              <span>{task.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
