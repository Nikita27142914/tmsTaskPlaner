import {useContext} from 'react';
import PropTypes from 'prop-types';

import Context from '../../context/Context';
import removeIcon from '../../images/removeIcon.png';
import editIcon from '../../images/editIcon.png';
import './TaskItem.scss';

export const TaskItem = ({type, task, number}) => {

  const {handleCheckTask, handleRemoveTask, handleEditTask} = useContext(Context);

  return (
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
             onClick={() => handleRemoveTask(type, task.name)}
             alt='removeIcon' />
          :
        <img className='edit-icon' 
             src={editIcon} 
             onClick={() => handleEditTask(type, task.name)}
             alt='editIcon' />
      }
    </div>
  );
}

TaskItem.propTypes = {
  type: PropTypes.string,
  task: PropTypes.object,
  number: PropTypes.number
};
