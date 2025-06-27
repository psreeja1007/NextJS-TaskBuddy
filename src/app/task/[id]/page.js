import TaskDetails from "@/app/components/TaskDetails";

const TaskPage = async ({ params }) => {
  const { id } = await params; // ✅ required in latest Next.js

  return (
    <div className="container mt-4">
      <TaskDetails taskId={id} />
    </div>
  );
};

export default TaskPage;
