import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";

function App() {
  const onSubmit = (data) => {
    console.log("Form Submitted with", data);
  };

  return (
    <>
      <TaskForm onSubmit={onSubmit}></TaskForm>
    </>
  );
}

export default App;
