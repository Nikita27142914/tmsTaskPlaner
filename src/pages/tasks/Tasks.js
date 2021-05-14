import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import Context from '../../context/Context';
import {TaskList} from '../../components';
import {
    addTasks,
    createTask, 
    checkTask, 
    removeTask, 
    editTask, 
} from '../../redux/actions/taskActions';
import './Tasks.scss';


export const TasksPage = () => {

    const dispatch = useDispatch();

    const tasksState = useSelector(state => state.taskReducer);

    useEffect(() => {

        axios.get('http://localhost:8080/tasks')
            .then(res => {

                const {data} = res;

                const notImportantTasks = filterTasks(data, "unImportant");
                const importantTasks = filterTasks(data, "important");
                const veryImportantTasks = filterTasks(data, "veryImportant");

                dispatch(addTasks({tasks: notImportantTasks, type: 'UNIMPORTANT'}));
                dispatch(addTasks({tasks: importantTasks, type: 'IMPORTANT'}));
                dispatch(addTasks({tasks: veryImportantTasks, type: 'VERYIMPORTANT'}));


            })
            .catch(err => {
                console.error(err);
            })

    }, []);
    

    const filterTasks = (tasks, type) => {

        return tasks.filter(task => task.type === type);

    } 

    //Создание задачи
    const addNewTask = (name, type) => {

        const tasksCopy = {...tasksState.tasks};
        const {unImportant, important, veryImportant} = tasksCopy;

        const allTasks = unImportant.concat(important, veryImportant);

        //Задача будет создана если дубликатов нет
        if(checkDublicates(allTasks, name)) {

            axios.post('http://localhost:8080/tasks', { 
                checked: false,
                name,
                type
            })
            .then(res => {

                dispatch(createTask({type: type.toUpperCase(), payload: {name, type}}));

            })
            .catch(err => {
                console.error(err);
            })

            return true;
        
        } else {

            return false;

        }
    
    }

    const handleCheckTask = (type, name, checked) => {
        
        dispatch(checkTask({type: type.toUpperCase(), payload: {name, type, checked}}));
    }

    const handleRemoveTask = (id, name, type) => {

        axios.delete(`http://localhost:8080/tasks/${id}`)
        .then(res => {

            dispatch(removeTask({type: type.toUpperCase(), payload: {name, type}}));

        })
        .catch(err => {
            console.error(err);
        })

    }

    const handleEditTask = (type, name, editName) => {

        const tasksCopy = {...tasksState.tasks};
        const {unImportant, important, veryImportant} = tasksCopy;

        const allTasks = unImportant.concat(important, veryImportant);
        const taskIndex = allTasks.findIndex(task => task.name === name);

        allTasks.splice(taskIndex, 1);

        //Задача будет отредактировать если дубликатов нет
        if(checkDublicates(allTasks, editName)) {
            
        
            dispatch(editTask({type: type.toUpperCase(), payload: {name, type, editName}}));

            return true;
        
        } else {
            
            return false;

        }

    }

    //Проверка на дубликаты при создании/редактировании
    const checkDublicates = (tasks, name) => { 

        const index = tasks.findIndex(task => task.name === name);

        return index === -1;

    }

    const contextValue = {handleCheckTask, handleRemoveTask, handleEditTask}

    return (

        <Context.Provider value={contextValue}>
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
                                tasks={tasksState.tasks.unImportant}
                                addNewTask={addNewTask} />
                    </div>

                    <div className='tasks-main-col'>
                        <div className='tasks-main-col-important'>
                            Важные задачи
                        </div>

                        <TaskList tasksType='important'
                                tasks={tasksState.tasks.important} 
                                addNewTask={addNewTask} />
                    </div>

                    <div className='tasks-main-col'>
                        <div className='tasks-main-col-veryImportant'>
                            Очень важные задачи
                        </div>

                        <TaskList tasksType='veryImportant'
                                tasks={tasksState.tasks.veryImportant}
                                addNewTask={addNewTask} />
                    </div>
                </div>

            </div>
        </Context.Provider>
    );
}
