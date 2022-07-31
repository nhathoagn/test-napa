import {CREATE_POST,RETRIEVE_POST,UPDATE_POST,DELETE_POST

} from "../actions/types";
const initialState = [];

const postReducer = (tutorials = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_POST:
            return [...tutorials, payload];

        case RETRIEVE_POST:
            return payload;

        case UPDATE_POST:
            return tutorials.map((tutorial) => {
                if (tutorial.id === payload.id) {
                    return {
                        ...tutorial,
                        ...payload,
                    };
                } else {
                    return tutorial;
                }
            });

        case DELETE_POST:
            return tutorials.filter(({ id }) => id !== payload.id);

        default:
            return tutorials;
    }
};

export default postReducer;