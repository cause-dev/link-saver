import AddLinkForm from "../../_components/add-link-form";

const AddLinkPage = () => {
  return (
    <div className="flex w-full max-w-100 flex-col items-center justify-center gap-10 rounded-3xl bg-[#3d3846] px-10 py-20">
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="mb-2 text-lg font-bold">Add Link</h2>
        <p>Save Link for later.</p>
      </div>
      <AddLinkForm />
    </div>
  );
};

export default AddLinkPage;
