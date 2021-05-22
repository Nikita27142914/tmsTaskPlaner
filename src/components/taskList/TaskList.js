import PropTypes from 'prop-types';
import {useState, useMemo, useRef} from 'react';

import {TaskItem} from '../taskItem/TaskItem';
import './TaskList.scss';

export const TaskList = ({tasksType, tasks, addNewTask}) => {

    const [taskName, setTaskName] = useState('');
    const [dublicateAdd, setDublicateAdd] = useState(false);

    const addInputEl = useRef(null);

    const handleAddInputChange = (event) => {

        //Убрать ошибки если они были
        if(dublicateAdd) {
          
          setDublicateAdd(false);

        }

        setTaskName(event.target.value);

    }

    const handleAddKeyDown = (event) => {

        if(event.key === 'Enter' && event.target.value.trim() !== '' && event.target.value.length < 20) {

          addInputEl.current.blur();

            if(addNewTask(taskName, tasksType)) {

              setTaskName('');
            
            } else {

              setDublicateAdd(true);
            
            }

        }

    };

    const taskNameValue = useMemo(() => taskName, [taskName]);

    return (
      <div className='task-list'>

        {tasks && tasks.length > 0 && tasks.map((task, index) => {
            return (
                <TaskItem 
                  key={index} 
                  type={tasksType}
                  task={task}  />
            )
        })}

        <div style={{marginBottom: '30px'}}>
          <input type='text' 
                className='input-add'
                ref={addInputEl}
                placeholder='Введите название задачи...'
                disabled={!JSON.parse(localStorage.getItem('isAdmin'))}
                value={taskNameValue} 
                onChange={handleAddInputChange}
                onKeyDown={handleAddKeyDown} />
          
          { 
            dublicateAdd
              &&
            <span className='task-list-error'>Задача с таким уже существует</span>
          }

          
          { 
            taskName.length >= 20
              &&
            <span className='task-list-error'>Длина не может превыщать 20 символов</span>
          }
        </div>
  
      </div>
    );
  }

TaskList.propTypes = {
  tasksType: PropTypes.string,
  tasks: PropTypes.array,
  addNewTask: PropTypes.func
};
