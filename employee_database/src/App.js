import React, { Component } from 'react';
import './App.css';
import AllEmployees from './components/AllEmployees';
import NewEmployee from './components/NewEmployee';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      filtered: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewEmployee = this.addNewEmployee.bind(this)
    this.updateEmployee = this.updateEmployee.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleFormSubmit(firstName, lastName, title, managerId) {
    let body = JSON.stringify({ employee: { first_name: firstName, last_name: lastName, title: title, manager_id: managerId } })
    fetch('http://localhost:3001/api/v1/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then(response => response.json())
      .then((employee) => {
        this.addNewFruit(employee)
      })

  }

  addNewEmployee(employee) {
    this.setState({
      employees: this.state.employees.concat(employee)
    })
  }

  handleEdit(employee) {
    fetch(`http://localhost:3001/api/v1/employees/${employee.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ employee: employee }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.updateEmployee(employee)
      })
  }

  updateEmployee(employee) {
    let employeeIndex = this.state.employees.findIndex(emp=>{return emp.id === employee.id}) // Find Employee Index in array so .splice can be used to render in same location
    let newEmployees = this.state.employees.filter(emp => emp.id !== employee.id) 
    newEmployees.splice(employeeIndex, 0, employee) //places employee after update back at the original employee index
    this.setState({
      employees: newEmployees
    })
  }


  handleDelete(id) {  
    fetch(`http://localhost:3001/api/v1/employees/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.deleteEmployee(id)
        })
}

deleteEmployee(id) {
  let newEmployees = this.state.employees.filter((employee) => employee.id !== id)
  this.setState({
      employees: newEmployees
  })
}

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/employees.json')
      .then(response => { return response.json() })
      .then(data => {
        this.setState({ employees: data })
        console.log(data)
      })
  }
  render() {
  
    return (
      <div className="App">
        <h1>Employee Database</h1>
        <NewEmployee handleFormSubmit={this.handleFormSubmit} />
        <table className="table-head">
          <tbody>
            <tr className="employee" id="employee-head">
              <td className="empBoxes empId">ID</td>
              <td className="empBoxes">Name</td>
              <td className="empBoxes">Title</td>
              <td ><button className="empBoxes hideBtn" >Delete</button></td>
              <td><button className="empBoxes hideBtn" >Delete</button></td>
            </tr>
          </tbody>
        </table>
        <AllEmployees employees={this.state.employees} handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>

      </div>
    )
  }
}

export default App;
