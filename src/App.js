// ! Parent class
import './App.scss';
import TaskManager from './components/taskManager/TaskManager';
import TaskManagerReducer from './components/taskManager/TaskManagerReducer';

function App() {
  return (
    <div className="App">
      <TaskManagerReducer />
    </div>
  );
}

export default App;
