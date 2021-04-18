import {useState} from "react";

import {TaskList} from "../../components";
import "./Tasks.scss";


export const TasksPage = () => {

    const [tasks, setTasks] = useState({unImportant: [], important: [], veryImportant: []});

    const onAddNewTask = (name, type) => {

        const tasksCopy = {...tasks};

        tasksCopy[type].push({checked: false, name});

        setTasks(tasksCopy);
    
    }

    return (
      <div className="tasks">
          
        <div className="tasks-header">
            Планировщик задач
        </div>


        <div className="tasks-main">
            <div className="tasks-main-col">
                <div className="tasks-main-col-unImportant">
                    Не важные задачи
                </div>

                <TaskList tasks={tasks.unImportant} 
                          tasksType="unImportant"
                          addNewTask={onAddNewTask} />
            </div>

            <div className="tasks-main-col">
                <div className="tasks-main-col-important">
                    Важные задачи
                </div>

                <TaskList tasks={tasks.important} 
                          tasksType="important"
                          addNewTask={onAddNewTask} />
            </div>

            <div className="tasks-main-col">
                <div className="tasks-main-col-veryImportant">
                    Очень важные задачи
                </div>

                <TaskList tasks={tasks.veryImportant} 
                          tasksType="veryImportant"
                          addNewTask={onAddNewTask} />
            </div>
        </div>

      </div>
    );
}
