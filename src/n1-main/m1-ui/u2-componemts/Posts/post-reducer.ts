import {postsAPI, usersAPI} from "../../../m3-dal/posts-api";
import {Dispatch} from "redux";

const initialState = {
    posts: [] as Array<PostsType>,
    users: [] as Array<UsersType>
}

export type UsersType = {
    id: number
    name: string
    username: string
    email: string
    address: AddressType
    phone: string
    website: string
    company: CompanyType
}
type AddressType = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
        lat: string
        lng: string
    }
}
type CompanyType = {
    name: string
    catchPhrase: string
    bs: string
}
type InitStateType = typeof initialState

export const postReducer = (state = initialState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "SET-POSTS": {
            return {
                ...state,
                posts: action.posts
            }
        }
        case "SET-USERS": {
            return {
                ...state,
                users: action.users
            }
        }
        default:
            return state
    }
}

// Actions
export const setPostsAC = (posts: Array<PostsType>) => ({type: 'SET-POSTS', posts} as const)
export const setUsersAC = (users: Array<UsersType>) => ({type: 'SET-USERS', users} as const)

// Thunks
export const fetchPostsTC = (userId?: string | number) => {
    return (dispatch: Dispatch) => {
        postsAPI.getPosts(userId)
            .then((res) => {
                dispatch(setPostsAC(res.data))
            })
    }
}
export const fetchUsersTC = () => {
    return (dispatch: Dispatch) => {
        usersAPI.getUsers()
            .then((res) => {
                dispatch(setUsersAC(res.data))
            })
    }
}

// Types
export type PostsType = {
    userId: number
    id: number
    title: string
    body: string
}

export type ActionTypes =
    | ReturnType<typeof setPostsAC>
    | ReturnType<typeof setUsersAC>
