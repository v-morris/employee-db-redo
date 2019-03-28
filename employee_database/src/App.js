import React, { Component } from 'react';
import './App.css';
import AllEmployees from './components/AllEmployees';
import NewEmployee from './components/NewEmployee';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewEmployee = this.addNewEmployee.bind(this)
  }

  handleFormSubmit(first_name, last_name, title, manager_id){
    let body = JSON.stringify({employee: {first_name: first_name, last_name: last_name, title: title, manager_id:manager_id} })
  fetch('http://localhost:3001/api/v1/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then(response => response.json())
    .then((employee)=>{
      this.addNewFruit(employee)
    })
    
  }

  addNewEmployee(employee){
    this.setState({
      employees: this.state.employees.concat(employee)
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
        <NewEmployee handleFormSubmit = {this.handleFormSubmit}/>
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
      <AllEmployees employees={this.state.employees}/>

      </div>
    )
  }
}

export default App;
