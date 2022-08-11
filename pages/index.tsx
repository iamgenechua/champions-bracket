import type { NextPage } from 'next'
import LandingPage from '../components/LandingPage'
import { fetchRankings } from '../utils'
import { prisma } from '../db';

const Home: NextPage = () => {

  return (
    <>
      <LandingPage/>
    </>
  )
}

export default Home
