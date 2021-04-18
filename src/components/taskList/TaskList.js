import PropTypes from 'prop-types';
import {useState, useRef} from "react";

import {TaskItem} from "../taskItem/TaskItem";
import "./TaskList.sass"

export const TaskList = ({tasks, tasksType, addNewTask}) => {

    const [taskName, setTaskName] = useState('');

    const inputEl = useRef(null);

    const handleInputChange = (event) => {

        setTaskName(event.target.value);

    }

    const hangleKeyDown = (event) => {

        if(event.key === 'Enter') {

            inputEl.current.blur();

            addNewTask(taskName, tasksType);

            setTaskName("");

        }

    }

    // console.log("TaskList ", tasks);
 
    return (
      <div className="task-list">

        {tasks && tasks.length > 0 && tasks.map((task, index) => {
            return (
                <TaskItem key={index} task={task} number={index} />
            )
        })}

        <input type="text" 
               ref={inputEl}
               placeholder="Введите название задачи..."
               name={tasksType} 
               value={taskName} 
               onChange={handleInputChange}
               onKeyDown={hangleKeyDown} />
  
      </div>
    );
  }

TaskList.propTypes = {
  tasks: PropTypes.object,
  tasksType: PropTypes.string,
  addNewTask: PropTypes.func
};
