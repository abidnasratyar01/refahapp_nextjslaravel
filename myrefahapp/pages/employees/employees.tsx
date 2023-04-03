import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Header from './head';
import axios from '../lib/axios';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Employees() {
  const [employees, setEmployess] = useState([]);

  useEffect(() => {
    fetchEmployess();
  }, []);

  const fetchEmployess = () => {
    axios.get('api/employees').then((response:any) => {
      setEmployess(response.data);
    })
  }

  return (
    <>
      <Header title='Employees' />
      <main className={styles.main}>
        <div className="container">  
          <div><h1>Register Employee:</h1></div> 
        </div>
        <div className="container">
          <form className='form-horizontal' action="" method="post" >
            <div className="d-flex align-self-stretch">
              <div className="mb-3">
                <label>Name</label>
                <input type="text" name="name" className="form-control" />
              </div>
              <div className="mb-3">
                  <label>Father Name</label>
                  <input type="text" name="father_name" className="form-control" />
              </div>
              <div className="mb-3">
                  <label>Email</label>
                  <input type="text" name="email" className="form-control" />
              </div>
           </div>
           <div className="d-flex justify-content-between">
              <div className="mb-3">
                <label>Email</label>
                <input type="text" name="email" className="form-control" />
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="active" value="" id="flexCheckDefault" />
                <label className="form-check-label" >
                  Active
                </label>
              </div>
           </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
          </form>
        </div>
        <div className="container">  
          <div><h1>Employees Registered:</h1></div> 
        </div>
        <div className="container">
          <table className="table table-hover table-dark">
            <thead>
                <tr>
                    <th scope='col'>EmpID</th>
                    <th scope='col'>Profile DP</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Father Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Status</th>
                    <th scope='col' className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
              {employees && employees.map((item:any,i) => (
                <tr key={i}>
                    <td>{i + 1}</td>   
                    <td>{item.profile_dp}</td>
                    <td>{item.name}</td>
                    <td>{item.father_name}</td>
                    <td>{item.email}</td>
                    <td>{item.active}</td>
                    <td>
                        <div className="d-flex justify-content-evenly">
                            <form method="post" action="/controller=course&action=delete">
                                <input type="hidden" name="id" className="form-control" value="" />
                                <button type="submit" className="btn btn-danger">Delete</button>          
                            </form>
                            <form method="post" action="/controller=course&action=update">
                                <input type="hidden" name="id" className="form-control" value="" />
                                <input type="hidden" name="name" className="form-control" value="" />
                                <input type="hidden" name="dept" className="form-control" value="" />
                                <button type="submit" className="btn btn-primary">Update</button> 
                            </form>
                        </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
