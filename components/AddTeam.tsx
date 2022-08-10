import React from 'react'
import { Button, Input } from 'antd'
import { sendPostRequest } from '../utils';
import { ADD_TEAM_ENDPOINT } from '../routes';

const { Search } = Input;

const AddTeam = () => {
    const validateInput = (input: string) => {
        const inputArray = input.split(' ');

        if (inputArray.length !== 3) {
            return false;
        }
    }

    const handleSubmitTeam = async (value: string) => {

        // split value into array
        const inputArray = value.split(' ');
        
        const data = {
            teamName: value
        }

        try {
            await sendPostRequest(ADD_TEAM_ENDPOINT, data);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Search
                placeholder='<Team name> <Team registration date in DD/MM> <Team group number (either 1 or 2)>'
                enterButton='Add team' onSearch={handleSubmitTeam} />
            <Input.Group><Input /><Button></Button></Input.Group>
        </>
    )
}

export default AddTeam