import { useRef, useState } from "react";
import styles from "./TaskForm.module.scss";
import { useEffect } from "react";
import { validateForm } from "./validation";

const TaskForm = ({ onSubmit }) => {
  const [errors, setErrors] = useState(null);
  const [taskList, setTaskList] = useState([]);

  const formRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    const form = formRef.current;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    const { isValid, errors } = validateForm(formValues);
    if (isValid) {
      console.log(formValues);
      const arr = [...taskList, formValues];
      setTaskList(arr);
      onSubmit(formValues);
      form.reset();
      return;
    }
    setErrors(errors);
  };

  const handleEndDateUponStartDate = (event) => {
    endDateRef.current.min = event.target.value;
  };

  //   const formatDate = (date) => {
  //     const d = new Date(date);
  //     const day = d.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if needed
  //     const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Get month (zero-indexed) and pad with leading zero if needed
  //     const year = d.getFullYear();
  //     return `${day}/${month}/${year}`;
  //   };
  const setDatesFromToday = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as yyyy-MM-dd

    startDateRef.current.value = formattedDate; // Set initial value to today's date
    startDateRef.current.min = formattedDate; // Set minimum date to today's date

    endDateRef.current.value = formattedDate; // Set initial value to today's date
    endDateRef.current.min = formattedDate; // Set minimum date to today's date
  };

  useEffect(setDatesFromToday, []);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
        <div>
          <h1>To-Do List</h1>
        </div>
        {/* Field 1 : Input the task */}
        <div className={styles.field}>
          <label htmlFor="taskNameInput">Task Name</label>
          <input id="taskNameInput" type="text" name="taskName"></input>
          <small className={styles.error_text}>{errors?.taskName ?? ""}</small>
        </div>

        {/* Field2: Enter the start date of the task: */}
        <div className={styles.field}>
          <label htmlFor="taskStartDateInput">Start Date</label>
          <input
            id="taskStartDateInput"
            type="date"
            name="taskStartDate"
            onChange={handleEndDateUponStartDate}
            ref={startDateRef}
            required
          ></input>
          <small className={styles.error_text}>
            {errors?.taskStartDate ?? ""}
          </small>
        </div>

        {/* Field 3 :End Date */}
        <div className={styles.field}>
          <label htmlFor="taskEndDateInput">End Date</label>
          <input
            id="taskEndDateInput"
            type="date"
            name="taskEndDate"
            ref={endDateRef}
            required
          ></input>
          <small className={styles.error_text}>
            {errors?.taskEndDate ?? ""}
          </small>
        </div>

        <div className={styles.field}>
          <button>Add Task</button>
        </div>
      </form>

      <section className={styles.taskListStyle}>
        <h2>Items Added</h2>
        {taskList.map((task, index) => (
          <p key={index}>{task.taskName}</p>
        ))}
      </section>
    </>
  );
};

export default TaskForm;
