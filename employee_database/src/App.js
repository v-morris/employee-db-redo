import React, { Component } from 'react';
import './App.css';
import AllEmployees from './components/AllEmployees';
import NewEmployee from './components/NewEmployee';
import SearchEmployees from './components/SearchEmployees';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      filtered: [],
      search: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewEmployee = this.addNewEmployee.bind(this)
    this.updateEmployee = this.updateEmployee.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.onSearchTextChange = this.onSearchTextChange.bind(this)
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

  onSearchTextChange = event => {
    let search = event.target.value.toLowerCase();
    let matches = this.state.employees.filter(emp => emp.last_name.toLowerCase().includes(search));
    let searchPresent = false;
    if (event.target.value !== "") {
      this.setState({
        filtered: matches,
        search: !searchPresent
      })
    }
    else {
      this.setState({
        filtered: [],
        search: searchPresent
      })
    }
    console.log("search", search)
    console.log("matches", matches)
    console.log("filter", this.state.filtered)
    console.log("search", this.state.search)
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
    let employeeIndex;
    let newEmployees;
    let filterIndex;
    let newFilter;
    employeeIndex = this.state.employees.findIndex(emp => { return emp.id === employee.id }) // Find Employee Index in array so .splice can be used to render in same location
    newEmployees = this.state.employees.filter(emp => emp.id !== employee.id)
    newEmployees.splice(employeeIndex, 0, employee) //places employee after update back at the original employee index
    this.setState({
      employees: newEmployees
    })

    if (this.state.search) {
      filterIndex = this.state.filtered.findIndex(emp => { return emp.id === employee.id }) // Find Employee Index in array so .splice can be used to render in same location
      newFilter = this.state.filtered.filter(emp => emp.id !== employee.id)
      newFilter.splice(filterIndex, 0, employee) //places employee after update back at the original employee index
      this.setState({
        filtered: newFilter
      })
    }

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

   if(this.state.search) {
      let newFilter = this.state.filtered.filter((employee) => employee.id !== id)
      this.setState({
        filtered: newFilter
      })
    }
  }

  // deleteEmployee(id) {
  //   if (!this.state.search) {
  //     let newEmployees = this.state.employees.filter((employee) => employee.id !== id)
  //     this.setState({
  //       employees: newEmployees
  //     })
  //   }
  //   else {
  //     let newFilter = this.state.filtered.filter((employee) => employee.id !== id)
  //     this.setState({
  //       filtered: newFilter
  //     })
  //     let newEmployees = this.state.employees.filter((employee) => employee.id !== id)
  //     this.setState({
  //       employees: newEmployees
  //     })
  //   }
  // }

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
        <SearchEmployees employees={this.state.employees} onSearchTextChange={this.onSearchTextChange} />
        <NewEmployee handleFormSubmit={this.handleFormSubmit} />
        <table className="table-head">
          <tbody>
            <tr className="employee" id="employee-head">
              <td className="empBoxes empId">ID</td>
              <td className="empBoxes">First Name</td>
              <td className="empBoxes">Last Name</td>
              <td className="empBoxes">Title</td>
              <td className="empBoxes">Manager ID</td>
              <td ><button className="empBoxes hideBtn" >Delete</button></td>
              <td><button className="empBoxes hideBtn" >Delete</button></td>
            </tr>
          </tbody>
        </table>
        <AllEmployees employees={this.state.employees} handleEdit={this.handleEdit} handleDelete={this.handleDelete} search={this.state.search} filtered={this.state.filtered} />
      </div>
    )
  }
}

export default App;
