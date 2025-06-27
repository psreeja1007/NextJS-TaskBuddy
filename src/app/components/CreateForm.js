"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import '../styles/CreateFormStyles.css';

// STEP 1: Define validation rules
const schema = Yup.object().shape({
  title: Yup.string().required("Please provide a title"),
  description: Yup.string(),
  dueDate: Yup.date()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Please select a due date"),
  priority: Yup.string().oneOf(["Low", "Medium", "High"]),
  tags: Yup.string(),
  status: Yup.string().oneOf(["Todo", "In Progress", "Done"]),
});

// STEP 2: Create form component
const CreateForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: "Todo",
      priority: "Low",
    },
  });

  // STEP 3: Function to run when you click "Submit"
  const onSubmit = (data) => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // 🔍 Check for duplicate title (case-insensitive)
    const duplicate = existingTasks.find(
      (task) => task.title.toLowerCase() === data.title.toLowerCase()
    );

    if (duplicate) {
      alert("A task with this title already exists!");
      return; // ❌ Prevent submission
    }

    const tagsArray = data.tags
      ? data.tags.split(",").map((tag) => tag.trim())
      : [];

    const newTask = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      tags: tagsArray,
      status: data.status,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // (Optional) show toast or redirect
    router.push("/");
  };

  // STEP 6: Render the form
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-heading mb-4 text-center">Create New Task</h2>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" {...register("title")} />
          <p className="text-danger">{errors.title?.message}</p>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" {...register("description")} />
        </div>

        {/* Due Date */}
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            {...register("dueDate")}
          />
          <p className="text-danger">{errors.dueDate?.message}</p>
        </div>

        {/* Priority */}
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select className="form-select" {...register("priority")}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <label className="form-label">Tags (comma-separated)</label>
          <input className="form-control" {...register("tags")} />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-select" {...register("status")}>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
