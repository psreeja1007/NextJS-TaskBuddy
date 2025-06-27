import EditForm from "@/app/components/EditForm";

const EditPage = async ({ params }) => {
  const { id } = params;

  return (
    <div className="container mt-4">
      <h2>Edit Task</h2>
      <EditForm taskId={id}/>
    </div>
  );
};

export default EditPage;
