import PropTypes from 'prop-types';

import "./TaskItem.sass";

export const TaskItem = ({task, number}) => {
  
    return (
      <div className="task-item">
        
        {task.name}
  
      </div>
    );
  }

TaskItem.propTypes = {
  task: PropTypes.object,
  number: PropTypes.number
};
