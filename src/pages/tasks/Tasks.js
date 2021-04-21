import {useState} from "react";

import {TaskList} from "../../components";
import "./Tasks.scss";


export const TasksPage = () => {

    const [tasks, setTasks] = useState({unImportant: [], important: [], veryImportant: []});
    
    const [dublicateTypeCreate, setDublicateTypeCreate] = useState({unImportant: false}, {important: false}, {veryImportant: false});

    //Создание задачи
    const addNewTask = (name, type) => {

        const tasksCopy = {...tasks};
        const {unImportant, important, veryImportant} = tasksCopy;

        //Задача будет создана если дубликатов нет
        if(!checkDublicates(unImportant.concat(important, veryImportant), name)) {
        
            tasksCopy[type].push({checked: false, name});

            setTasks(tasksCopy);

            return true;
        
        } else {

            //Подсветить что дубликат есть
            const dublicateTypeCreateCopy = {...dublicateTypeCreate};
            dublicateTypeCreateCopy[type] = true;

            setDublicateTypeCreate(dublicateTypeCreateCopy);

            return false;

        }
    
    }

    //Проверка на дубликаты при создании/редактировании
    const checkDublicates = (tasks, name) => {   

        const index = tasks.findIndex(task => task.name === name);

        return index !== -1;

    }

    //Скинуть ошибку дубликата при фокусе
    const resetDublicateType = (type) => {
        
        const dublicateTypeCreateCopy = {...dublicateTypeCreate};
        dublicateTypeCreateCopy[type] = false;

        setDublicateTypeCreate(dublicateTypeCreateCopy);

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

                <TaskList tasksType="unImportant"
                          dublicateTypeCreate={dublicateTypeCreate.unImportant} 
                          tasks={tasks.unImportant}
                          resetDublicateType={resetDublicateType}
                          addNewTask={addNewTask} />
            </div>

            <div className="tasks-main-col">
                <div className="tasks-main-col-important">
                    Важные задачи
                </div>

                <TaskList tasksType="important"
                          dublicateTypeCreate={dublicateTypeCreate.important}
                          tasks={tasks.important} 
                          resetDublicateType={resetDublicateType}
                          addNewTask={addNewTask} />
            </div>

            <div className="tasks-main-col">
                <div className="tasks-main-col-veryImportant">
                    Очень важные задачи
                </div>

                <TaskList tasksType="veryImportant"
                          dublicateTypeCreate={dublicateTypeCreate.veryImportant} 
                          tasks={tasks.veryImportant}
                          resetDublicateType={resetDublicateType}
                          addNewTask={addNewTask} />
            </div>
        </div>

      </div>
    );
}
