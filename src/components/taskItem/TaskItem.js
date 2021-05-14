import {useState, useEffect, useContext, useRef} from 'react';
import PropTypes from 'prop-types';

import Context from '../../context/Context';
import removeIcon from '../../images/removeIcon.png';
import editIcon from '../../images/editIcon.png';
import './TaskItem.scss';

export const TaskItem = ({type, task}) => {

  const [editValue, setEditValue] = useState(task.name);
  const [dublicatEdit, setDublicateEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {handleCheckTask, handleRemoveTask, handleEditTask} = useContext(Context);
  
  const editInputEl = useRef(null);

  useEffect(() => {

    if(editMode) {

      editInputEl.current.focus();
    
    }

  }, [editMode]);

  const handleEditKeyDown = (event) => {

    if(event.key === 'Enter' && event.target.value.trim() !== '' && event.target.value.length < 20) {

      if(handleEditTask(type, task.name, editValue))

        setEditMode(false);
      
      } else {

        setDublicateEdit(true);

      }

    }

  const handleEditInputChange = (event) => {
    
      //Убрать ошибки если они были
      if(dublicatEdit) {
          
        setDublicateEdit(false);

      }
    
    setEditValue(event.target.value);

  }

  return (
    <>
      {
        !editMode
          ?
        <div className='task-item'>
          <input type='checkbox' 
                checked={task.checked}
                onChange={(event) => handleCheckTask(type, task.name, event.target.checked)}  />

          <span className='task-item-name'>{task.name}</span> 

          {
            task.checked 
              ?
            <img className='remove-icon' 
                src={removeIcon} 
                onClick={() => handleRemoveTask(task._id, task.name, type)}
                alt='removeIcon' />
              :
            <img className='edit-icon' 
              src={editIcon} 
              onClick={() => setEditMode(true)}
              alt='editIcon' />
          }
        </div>
          :
          <div style={{marginBottom: '30px'}}>
            <input type='text' 
                  ref={editInputEl}
                  className='input-edit'
                  value={editValue}
                  placeholder='Введите новое название задачи...'
                  onChange={handleEditInputChange}
                  onKeyDown={handleEditKeyDown} />
            
            { 
              dublicatEdit
                &&
              <span className='task-item-error'>Задача с таким уже существует</span>
            }

            { 
              editValue.length >= 20
                &&
              <span className='task-item-error'>Длина не может превышать 20 символов</span>
            }
          </div>
      }
    </>
  );
}

TaskItem.propTypes = {
  type: PropTypes.string,
  task: PropTypes.object,
};
