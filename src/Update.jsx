import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const loadedData = useLoaderData();

  const handleList = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const newTodo = { title, description };

    console.log(newTodo);

    fetch(`https://todo-app-server-self.vercel.app/todo/${loadedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Todo updated successfully.");
          navigate("/");
        }
        console.log(data);
      });
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3x lg:text-4xl text-center font-bold py-10">
        Updating Todo App
      </h1>
      <form onSubmit={handleList} className="md:w-3/4 lg:w-[60%] mx-auto space-y-5">
        <input
          className="px-5 py-3 w-full rounded-lg"
          defaultValue={loadedData.title}
          type="text"
          name="title"
          placeholder="Title"
          id=""
        />{" "}
        <br />
        <input
          className="px-5 py-3 w-full rounded-lg"
          defaultValue={loadedData?.description}
          type="text"
          name="description"
          placeholder="Description"
          id=""
        />{" "}
        <br />
        <input
          className="btn btn-block btn-neutral"
          type="submit"
          value="Update List"
        />
      </form>
      <Toaster />
    </div>
  );
};

export default Update;
