export const initialState = {
    tasks: {
        unImportant: [], 
        important: [], 
        veryImportant: []
    },

    dublicateTypeCreate: {
        unImportant: false,
        important: false, 
        veryImportant: false
    }
};

export const taskReducer = (state = initialState, action) => {

    console.log('taskReducer ', action);

    const {type} = action; 

    switch(type) {

        case "ADD_NEW_TASK_UNIMPORTANT":
            const newUnImportantTask = {name: action.payload.name, checked: false};
            const newUnImportantTaskList = state.tasks.unImportant.concat(newUnImportantTask);

            return {...state, tasks: {...state.tasks, unImportant: newUnImportantTaskList}};
        
        case "ADD_NEW_TASK_IMPORTANT":
            const newImportantTask = {name: action.payload.name, checked: false};
            const newImportantTaskList = state.tasks.important.concat(newImportantTask);
    
            return {...state, tasks: {...state.tasks, important: newImportantTaskList}};    
        
        case "ADD_NEW_TASK_VERYIMPORTANT":
            const newVeryImportantTask = {name: action.payload.name, checked: false};
            const newVeryImportantTaskList = state.tasks.veryImportant.concat(newVeryImportantTask);
    
            return {...state, tasks: {...state.tasks, veryImportant: newVeryImportantTaskList}};
        
        case "CHECK_DUBLICATE_UNIMPORTANT":

            return {...state, dublicateTypeCreate: {...state.dublicateTypeCreate, unImportant: action.payload}};
            
        case "CHECK_DUBLICATE_IMPORTANT":
        
            return {...state, dublicateTypeCreate: {...state.dublicateTypeCreate, important: action.payload}};    
            
        case "CHECK_DUBLICATE_VERYIMPORTANT":
        
            return {...state, dublicateTypeCreate: {...state.dublicateTypeCreate, veryImportant: action.payload}};
            
        default: 
            return {...state};

    }

}