import React from 'react'
import { Button } from 'antd'
import {deleteAllData} from '../utils'

type AddTeamProps = {
    setLatestUpdated: (latestUpdated: any) => void
}

const DeleteButton = ({ setLatestUpdated }: AddTeamProps) => {
    const handleDeleteAllData = async () => {
        await deleteAllData(setLatestUpdated);
    }
    return (
        <Button danger onClick={handleDeleteAllData}>
            Delete all data
        </Button>
    )
}

export default DeleteButton