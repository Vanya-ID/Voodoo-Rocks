import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {postReducer} from "../../m1-ui/u2-componemts/Posts/post-reducer";

const rootReducer = combineReducers({
    posts: postReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
//@ts-ignore
window.store = store