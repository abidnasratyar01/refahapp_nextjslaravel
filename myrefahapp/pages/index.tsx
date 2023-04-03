import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Employees from './employees/employees'
import EmployeesList from './employees/employees'

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Employees />
    </>
  )
}
