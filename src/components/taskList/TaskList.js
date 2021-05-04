import PropTypes from 'prop-types';
import {useState, useMemo, useRef} from "react";

import {TaskItem} from "../taskItem/TaskItem";
import "./TaskList.sass"

export const TaskList = ({tasksType, tasks, dublicateTypeCreate, resetDublicateType, addNewTask}) => {

    const [taskName, setTaskName] = useState('');

    const inputEl = useRef(null);

    const handleInputChange = (event) => {

        //Убрать ошибки если они были
        if(dublicateTypeCreate) {
        
          resetDublicateType(tasksType);
        
        }

        setTaskName(event.target.value);

    }

    const handleKeyDown = (event) => {

        if(event.key === 'Enter' && event.target.value !== "") {

            inputEl.current.blur();

            if(addNewTask(taskName, tasksType)) {

              setTaskName("");
            
            }

        }

    };

    const taskNameValue = useMemo(() => taskName, [taskName]);

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
               value={taskNameValue} 
               onChange={handleInputChange}
               onKeyDown={handleKeyDown} />
        
        { 
          dublicateTypeCreate
            &&
          <span className='task-list-error'>Задача с таким уже существует</span>
        }
  
      </div>
    );
  }

TaskList.propTypes = {
  tasksType: PropTypes.string,
  dublicateTypeCreate: PropTypes.bool,
  tasks: PropTypes.array,
  addNewTask: PropTypes.func
};
