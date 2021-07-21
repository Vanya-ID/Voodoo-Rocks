import React from 'react';
import 'antd/dist/antd.css';
import {Select} from 'antd';
import style from "./MySelect.module.css"

const {Option} = Select;

type MySelectType = {
    setValue: (o: string) => void
    options: string[]
}

export const MySelect = (props: MySelectType) => {

    const onChange = (o: string) => {
        props.setValue(o)
    }

    return <Select
        dropdownClassName={style.select}
        onChange={onChange}
        showSearch
        style={{width: 200}}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
    >
        <Option value={''}> </Option>
        {
            props.options.map((o: string, i: number) => <Option
                key={i}
                value={o}
                className={style.option}
            >
                {o}</Option>)
        }
    </Select>
}