import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {fetchPostsTC, fetchUsersTC, PostsType, UsersType} from "./post-reducer";
import {useEffect, useState} from "react";
import style from './Posts.module.css'
import {MySelect} from "../../u3-common/SuperSelect";
import {SearchOutlined} from "@ant-design/icons";
import {Button} from "antd";

export const Posts = () => {
    let posts = useSelector<AppRootStateType, Array<PostsType>>(state => state.posts.posts)
    const users = useSelector<AppRootStateType, Array<UsersType>>(state => state.posts.users)

    const dispatch = useDispatch()

    const [value, setValue] = useState('')

    useEffect(() => {
        dispatch(fetchPostsTC())
        dispatch(fetchUsersTC())
    }, [])

    const fetchFiltered = () => {
        let found = users.filter(u => u.name.toLowerCase().indexOf(value?.toLowerCase().trim()) >= 0)
        if (value && found[0]?.id) {
            dispatch(fetchPostsTC(found[0]?.id))
        } else {
            dispatch(fetchPostsTC())
        }
        setValue('')
    }

    const options = users.map(u => u.name)
    return (
        <div className={style.postsBox}>
            <div className={style.search}>
                <MySelect setValue={setValue} options={options}/>
                <Button className={style.button} onClick={fetchFiltered} icon={<SearchOutlined/>}>Search</Button>
            </div>
            <div className={style.main}>
                {
                    posts?.map((p) => {
                        const author = users.find(el => el.id === p.userId)
                        const authorName = author ?
                            (author.name.split('').map( (l, i) => <span key={i}>{l}</span>))
                            : 'Mr. Anonymous'
                        return (
                            <div key={p.id} className={style.postItem}>
                                <div className={style.post_container}>
                                    <h3>{p.title}</h3>
                                    <p>{p.body}</p>
                                    <div className={style.author}>©  {authorName}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}