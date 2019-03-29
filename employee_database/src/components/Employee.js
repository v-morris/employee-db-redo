import React from 'react'

class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit() {
        if (this.state.editable) {
            let id = this.props.employee.id
            let firstName = this.firstName.value
            let lastName = this.lastName.value
            let title = this.title.value
            let managerId
            if (this.props.employee.title !== 'CEO') {
                managerId = this.managerId.value
            }
            else {
                managerId = null
            }
            let employee = { id: id, first_name: firstName, last_name: lastName, title: title, manager_id: managerId }
            this.props.handleEdit(employee)
        }
        this.setState({
            editable: !this.state.editable
        })
    }



    render() {
        let id = <td className="empBoxes empId">{this.props.employee.id}</td>
        let firstName = this.state.editable ?
            <td className="empBoxes">  <input type='text' ref={input => this.firstName = input} defaultValue={this.props.employee.first_name} /> </td> : <td className="empBoxes">{this.props.employee.first_name}</td>
        let lastName = this.state.editable ?
            <td className="empBoxes"><input type='text' ref={input => this.lastName = input} defaultValue={this.props.employee.last_name} /> </td> : <td className="empBoxes"> {this.props.employee.last_name}</td>
        let title = this.state.editable ?
            <td className="empBoxes"><input type='text' ref={input => this.title = input} defaultValue={this.props.employee.title} /> </td> : <td className="empBoxes">{this.props.employee.title}</td>
        let managerId =
            this.state.editable ?
                this.props.employee.title !== 'CEO' ?
                    <td><input type='text' ref={input => this.managerId = input} defaultValue={this.props.employee.manager_id} /> </td> : <td className="empBoxes">{this.props.employee.manager_id}</td> :
                <td className="empBoxes">{this.props.employee.manager_id}</td>
        let deleteButton = this.props.employee.title === 'CEO' ?
            <td><button className="empBoxes deleteBtn ceoDelete"><h4>Delete</h4></button></td> :
            <td><button className="empBoxes deleteBtn" onClick={() => this.props.handleDelete(this.props.employee.id)}><h4>Delete</h4></button></td>
        return (
            <tr className="employee">
                {id}
                {firstName}
                {lastName}
                {title}
                {managerId}
                <td><button className="empBoxes editBtn" onClick={() => this.handleEdit()}>{this.state.editable ? <h4>Submit</h4> : <h4>Edit </h4>}</button></td>
                {/* <td><button className="empBoxes deleteBtn" onClick={() => this.props.handleDelete(this.props.employee.id)}><h4>Delete</h4></button></td> */}
                {deleteButton}
            </tr>
        )

    }
}

export default Employee;