import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    }
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
        <table className="table-head">
          <tbody>
            <tr className="employee" id= "employee-head">
              <td className="empBoxes empId">ID</td>
              <td className="empBoxes">Name</td>
              <td className="empBoxes">Title</td>
              <td ><button className="empBoxes hideBtn" >Delete</button></td>
              <td><button className="empBoxes hideBtn" >Delete</button></td>
            </tr>
          </tbody>
        </table>

        {this.state.employees.map(employee => {
          return (
            <table key={employee.id}>
              <tbody>
                <tr className="employee">
                  <td className="empBoxes empId">{employee.id}</td>
                  <td className="empBoxes">{employee.first_name} {employee.last_name}</td>
                  <td className="empBoxes">{employee.title}</td>
                  <td><button className="empBoxes editBtn"><h4>Edit</h4></button></td>
                  <td><button className="empBoxes deleteBtn"><h4>Delete</h4></button></td>
                </tr>
              </tbody>
            </table>
          )
        })}
      </div>
    )
  }
}

export default App;
