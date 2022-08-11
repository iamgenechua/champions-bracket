import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const AddMatch = () => {

    

    return (
        <Search
            placeholder= '<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>'
        enterButton = 'Add match' />
    )
}

export default AddMatch