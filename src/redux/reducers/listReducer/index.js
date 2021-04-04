import { ACTION_LIST_GET_LIST } from "../actions";

const initState = { data: [] }

const listReducer = (state = initState, action) => {

    const newState = state;

    // 判断 action 类型
    switch (action.type) {
        case ACTION_LIST_GET_LIST:

            return {
                ...newState,
                data: newState.data.concat(action.preload)
            }

        default:
            return state;
    }
};

export default listReducer;
