import React from 'react'
import { Button, Input, message } from 'antd'
import { sendPostRequest } from '../utils';
import { ADD_TEAM_ENDPOINT } from '../routes';

const { Search } = Input;

const AddTeam = () => {

    const addTeamInstructions = '<Team name> <Team registration date in DD/MM> <Team group number (either 1 or 2)>';

    const validateDate = (dateInput: string) => {
        const date = dateInput.split('/');
        if (date.length !== 2) {
            message.error(`Input not in format: DD/MM`);
            return {validDate: false};
        }

        const day = parseInt(date[0]);
        const month = parseInt(date[1]);
        const currentYear = new Date().getFullYear();

        const parsedDate = new Date(`${currentYear}/${month}/${day}`);
        if (isNaN(parsedDate.getTime())) {
            message.error(`Invalid date: ${dateInput}`);
            return {validDate: false};
        }

        return {validDate: true, parsedDate};
    }

    const validateGroupNumber = (groupNumberInput: string) => {
        if (groupNumberInput !== '1' && groupNumberInput !== '2') {
            message.error(`Invalid group number: ${groupNumberInput}`)
            return {validGroupNumber: false};
        }

        return { validGroupNumber: true, groupNumber: parseInt(groupNumberInput) };
    }

    const validateInput = (input: string) => {
        const inputArray = input.split(' ');

        if (inputArray.length !== 3) {
            message.error(`Input not in format: ${addTeamInstructions}`)
            return {validInput: false};
        }

        // destructuring assignment from validateDate and validateGroupNumber
        const {validDate, parsedDate} = validateDate(inputArray[1]);
        const {validGroupNumber, groupNumber} = validateGroupNumber(inputArray[2]);
        if (!validDate || !validGroupNumber) {
            return {validInput: false};
        }

        return {validInput: true, teamName: inputArray[0], registrationDate: parsedDate, groupNumber};
    }

    const handleSubmitTeam = async (value: string) => {

        const {validInput, teamName, registrationDate, groupNumber} = validateInput(value);

        if (!validInput) {
            return;
        }
        
        const data = {
            teamName,
            registrationDate,
            groupNumber
        };

        try {
            await sendPostRequest(ADD_TEAM_ENDPOINT, data);
            message.success(`Team ${teamName} added successfully`);
        } catch (error) {
            message.error(`Error adding team: ${error}`);
        }
    }

    return (
        <>
            <Search
                placeholder= {addTeamInstructions}
                enterButton='Add team' onSearch={handleSubmitTeam} />
        </>
    )
}

export default AddTeam