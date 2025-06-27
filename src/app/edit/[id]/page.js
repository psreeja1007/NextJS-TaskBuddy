import EditForm from "@/app/components/EditForm";

const EditPage = async ({ params }) => {
  const { id } = await params;

  return (
    <div className="container mt-4">
      <EditForm taskId={id}/>
    </div>
  );
};

export default EditPage;
