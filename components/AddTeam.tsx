import React from 'react'
import { Input } from 'antd'

const { Search } = Input;

const AddTeam = () => {
  return (
      <Search
          placeholder='<Team name> <Team registration date in DD/MM> <Team group number (either 1 or 2)>'
          enterButton='Add team' />
  )
}

export default AddTeam