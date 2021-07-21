import axios from "axios";

const instance = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com/',
    withCredentials: true
})

//api
export const postsAPI = {
    getPosts(userId?: string | number) {
        return instance.get('posts' + (userId ? '?userId=' + userId : ''))
    }
}
export const usersAPI = {
    getUsers() {
        return instance.get('users')
    }
}