import { FaDeleteLeft } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { Link, useLoaderData } from "react-router-dom";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const preData = useLoaderData();
  const [loadedData, setLoadedData] = useState(preData);

  const handleList = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const newTodo = { title, description };

    console.log(newTodo);

    fetch("https://todo-app-server-self.vercel.app/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Add to list successfully..");
          fetch("https://todo-app-server-self.vercel.app/todo")
            .then((result) => result.json())
            .then((updatedData) => {
              setLoadedData(updatedData);
            });
          form.reset();
        }
        console.log(data);
      });
  };

  const handleDelete = (id) => {
    fetch(`https://todo-app-server-self.vercel.app/todo/${id}`, {
      method: "DELETE",
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          const remaining = loadedData?.filter((item) => item._id !== id);
          setLoadedData(remaining);
          toast.success("Delete from list successfully");
        }
        console.log(data);
      });
    console.log(id);
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold py-10">
        Todo App
      </h1>

      <div>
        <form
          onSubmit={handleList}
          className="md:w-3/4 lg:w-[60%] mx-auto space-y-5"
        >
          <input
            className="px-5 py-3 w-full rounded-lg border bg-base-300 font-medium"
            type="text"
            required
            name="title"
            placeholder="Title"
            id=""
          />{" "}
          <br />
          <input
            className="px-5 py-3 w-full rounded-lg border bg-base-300 font-medium"
            required
            type="text"
            name="description"
            placeholder="Description"
            id=""
          />{" "}
          <br />
          <input
            className="btn btn-block  btn-neutral"
            type="submit"
            value="Add List"
          />
        </form>
        <div className="py-10">
          {loadedData?.map((item) => (
            <div
              className="md:w-3/4 lg:w-[60%] mx-auto  bg-base-200 shadow-lg rounded-lg  p-3"
              key={item._id}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold italic">{item.title}</h1>
                  <p className="font-semibold">{item.description}</p>
                </div>
                <div className="flex gap-6 items-center px-4">
                  <Link to={`/todo/${item._id}`}>
                    <button>
                      <BiEdit />
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(item._id)}>
                    <FaDeleteLeft />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
