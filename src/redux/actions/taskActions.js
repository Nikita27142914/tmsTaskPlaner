export const createTask = (data) => {

    const {name, type} = data.payload;

    return {
        type: `ADD_NEW_TASK_${data.type}`,
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
