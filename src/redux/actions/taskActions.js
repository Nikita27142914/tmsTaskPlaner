export const createTask = (data) => {

    const {name, type} = data.payload;

    return {
        type: `ADD_NEW_TASK_${data.type}`,
        payload: {name, type}
    }

} 

export const checkTask = (data) => {
    const {name, type, checked} = data.payload;

    return {
        type: `CHECK_TASK_${data.type}`,
        payload: {name, type, checked}
    }

}

export const removeTask = (data) => {

    const {name, type} = data.payload;

    return {
        type: `REMOVE_TASK_${data.type}`,
        payload: {name, type}
    }

} 

export const checkDublicateTask = (data) => {

    const {payload} = data;

    return {
        type: `CHECK_DUBLICATE_${data.type}`,
        payload
    }
} 
