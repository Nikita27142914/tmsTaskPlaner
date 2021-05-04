import {useDispatch, useSelector} from 'react-redux';

import {TaskList} from '../../components';
import {createTask, checkDublicateTask} from '../../redux/actions/taskActions';
import './Tasks.scss';


export const TasksPage = () => {

    const dispatch = useDispatch();

    const tasksState = useSelector(state => state.taskReducer);

    //Создание задачи
    const addNewTask = (name, type) => {

        console.log('addNewTask');

        const tasksCopy = {...tasksState.tasks};
        const {unImportant, important, veryImportant} = tasksCopy;

        //Задача будет создана если дубликатов нет
        if(!checkDublicates(unImportant.concat(important, veryImportant), name)) {
        
            dispatch(createTask({type: type.toUpperCase(), payload: {name, type}}));

            return true;
        
        } else {

            //Подсветить что дубликат есть
            dispatch(checkDublicateTask({type: type.toUpperCase(), payload: true}));

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
    
        dispatch(checkDublicateTask({type: type.toUpperCase(), payload: false}));

    }

    return (
      <div className='tasks'>
          
        <div className='tasks-header'>
            Планировщик задач
        </div>


        <div className='tasks-main'>
            <div className='tasks-main-col'>
                <div className='tasks-main-col-unImportant'>
                    Не важные задачи
                </div>

                <TaskList tasksType='unImportant'
                          dublicateTypeCreate={tasksState.dublicateTypeCreate.unImportant} 
                          tasks={tasksState.tasks.unImportant}
                          resetDublicateType={resetDublicateType}
                          addNewTask={addNewTask} />
            </div>

            <div className='tasks-main-col'>
                <div className='tasks-main-col-important'>
                    Важные задачи
                </div>

                <TaskList tasksType='important'
                          dublicateTypeCreate={tasksState.dublicateTypeCreate.important}
                          tasks={tasksState.tasks.important} 
                          resetDublicateType={resetDublicateType}
                          addNewTask={addNewTask} />
            </div>

            <div className='tasks-main-col'>
                <div className='tasks-main-col-veryImportant'>
                    Очень важные задачи
                </div>

                <TaskList tasksType='veryImportant'
                          dublicateTypeCreate={tasksState.dublicateTypeCreate.veryImportant} 
                          tasks={tasksState.tasks.veryImportant}
                          resetDublicateType={resetDublicateType}
                          addNewTask={addNewTask} />
            </div>
        </div>

      </div>
    );
}
