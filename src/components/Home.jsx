import React from "react";
import TaskList from "./TaskList";

const Home = ({ tasks, updateStatus }) => {
  return <TaskList tasks={tasks} updateStatus={updateStatus} />;
};

export default Home;
