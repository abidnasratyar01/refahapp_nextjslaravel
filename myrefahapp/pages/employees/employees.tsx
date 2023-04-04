import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Header from './head';
import axios from '../lib/axios';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Employees() {
  const [employees, setEmployess] = useState([]);
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState('0');
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    fetchEmployess();
  }, []);

  const fetchEmployess = () => {
    axios.get('api/employees').then((response:any) => {
      setEmployess(response.data);
    })
  }

  const updateEmployee = (id:any) => {
    setEmployeeId(id);
    employees.map((item:any) => {
      if (item.id == id) {
        setName(item.name);
        setFatherName(item.father_name);
        setEmail(item.email);
        setIsActive(item.is_active);
      }
    })
  }

  const deleteEmployee = (id:any) => {
    let param = {'_method': 'delete'};
    axios.post('api/employees/'+id, param).then((response:any) => {
      fetchEmployess();
    })
  }

  const submitForm = (e:any) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name',name);
    formData.append('father_name', fatherName);
    formData.append('email', email);
    formData.append('is_active', isActive);

    let url = 'api/employees';
    if(employeeId != '') {
      url = 'api/employees/'+employeeId;
      formData.append('_method', 'PUT');
    }

    axios.post(url, formData).then((response:any) => {
      document.forms[0].reset();
      setName('');
      setEmail('');
      setIsActive('');
      setFatherName('');
      setEmployeeId('');
      fetchEmployess();
    })
  }

  return (
    <>
      <Header title='Employees' />
      <main className={styles.main}>

        <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <h3>Register Employee</h3>
                                <p>Fill in the data below.</p>
                                <form className="requires-validation" method='POST' onSubmit={submitForm} id='employeeRegister'>
                                    <div className="col-md-12">
                                      <input className="form-control" type="text" name="name" placeholder="Full Name" value={name} required onChange={(e) => setName(e.target.value)} />
                                      <div className="valid-feedback">Username field is valid!</div>
                                      <div className="invalid-feedback">Username field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-12">
                                      <input className="form-control" type="text" name="father_name" placeholder="Father Name" value={fatherName} required onChange={(e) => setFatherName(e.target.value)}/>
                                      <div className="valid-feedback">Username field is valid!</div>
                                      <div className="invalid-feedback">Username field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-12">
                                        <input className="form-control" type="email" name="email" placeholder="E-mail Address" value={email} required onChange={(e) => setEmail(e.target.value)} />
                                        <div className="valid-feedback">Email field is valid!</div>
                                        <div className="invalid-feedback">Email field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label">Profile DP</label>
                                        <input type="file" className="form-control" id="customFile" />
                                    </div>

                                    <div className="form-check">
                                      <input className="form-check-input" type="checkbox" name='is_active' value={isActive} id="invalidCheck" onChange={(e) => e.target.checked ? setIsActive('1') : setIsActive('0')}/>
                                      <label className="form-check-label">Active</label>
                                      <div className="invalid-feedback">Please confirm that the entered data are all correct!</div>
                                    </div>
                          
                                    <div className="form-button mt-3">
                                        <button id="submit" type="submit" className="btn btn-primary" >Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        <div className="container">  
          <div><h1>Employees Registered:</h1></div> 
        </div>
        <div className="container">
          <table className="table table-hover table-dark">
            <thead>
                <tr>
                    <th scope='col'>#</th>
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
                    <td>{item.is_active}</td>
                    <td>
                        <div className="d-flex justify-content-evenly">
                          <button type="submit" className="btn btn-danger" onClick={() => deleteEmployee(item.id)}>Delete</button>          
                          <button type="submit" className="btn btn-primary" onClick={() => updateEmployee(item.id)}>Update</button> 
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
