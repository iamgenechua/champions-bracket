import React from 'react';
import { Input, message } from 'antd';
import { sendPostRequest } from '../utils';
import { ADD_MATCH_ENDPOINT } from '../routes';

const { Search } = Input;

type AddMatchProps = {
    setLatestUpdated: (latestUpdated: any) => void
}

const AddMatch = ({ setLatestUpdated }: AddMatchProps) => {

    const addMatchInstructions = '<Team A name> <Team B name> <Team A goals scored> <Team B goals scored></Team>';

    const validateInput = (input: string) => {
        const inputArray = input.split(' ');

        if (inputArray.length !== 4) {
            message.error(`Input not in format: ${addMatchInstructions}`)
            return { validInput: false };
        }

        if (inputArray[0] === inputArray[1]) {
            message.error(`The teams cannot play themselves`)
            return { validInput: false };
        }

        const teamAGoals = parseInt(inputArray[2]);
        const teamBGoals = parseInt(inputArray[3]);
        if (isNaN(teamAGoals) || isNaN(teamBGoals) || teamAGoals < 0 || teamBGoals < 0) {
            message.error(`Goals scored must be a number and not be negative`)
            return { validInput: false };
        }

        return { validInput: true, teamAName: inputArray[0], teamBName: inputArray[1], teamAGoals, teamBGoals };

    }

    const handleSubmitMatch = async (value: string) => {
        const { validInput, teamAName, teamBName, teamAGoals, teamBGoals } = validateInput(value);

        if (!validInput || !teamAName || !teamBName || teamAGoals == null || teamBGoals == null) {
            return;
        }

        // make the teams and goals in alphabetical order to prevent duplicate matches
        const team1Name = teamAName < teamBName ? teamAName : teamBName;
        const team2Name = teamAName < teamBName ? teamBName : teamAName;
        const goalsTeam1 = teamAName < teamBName ? teamAGoals : teamBGoals;
        const goalsTeam2 = teamAName < teamBName ? teamBGoals : teamAGoals;

        const body = {
            team1Name,
            team2Name,
            goalsTeam1,
            goalsTeam2
        };

        try {
            // get result of sendPostRequest from utils.ts
            const result = await sendPostRequest(ADD_MATCH_ENDPOINT, body);
            setLatestUpdated(result);
            message.success(`Match between ${teamAName} and ${teamBName} added successfully`);
        } catch (error) {
            message.error(`Error adding Match. Either the teams have played each other before or one of the teams does not exist.`);
        }

    }

    return (
        <Search
            placeholder={addMatchInstructions}
            enterButton='Add match' onSearch={handleSubmitMatch} />
    )
}

export default AddMatch