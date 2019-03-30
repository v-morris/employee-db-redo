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
        let search = this.props.search;
        let empId;
        let empFirstName;
        let empLastName;
        let empTitle;
        let empManagerId;
        if (!search) {
            empId = this.props.employee.id;
            empFirstName = this.props.employee.first_name;
            empLastName = this.props.employee.last_name;
            empTitle = this.props.employee.title;
            empManagerId = this.props.employee.manager_id;
        }
        else {
            empId = this.props.filter.id;
            empFirstName = this.props.filter.first_name;
            empLastName = this.props.filter.last_name;
            empTitle = this.props.filter.title;
            empManagerId = this.props.filter.manager_id;

        }

        let id = <td className="empBoxes empId">{empId}</td>
        let firstName =
            this.state.editable ?
                <td className="empBoxes">  <input type='text' ref={input => this.firstName = input} defaultValue={empFirstName} /> </td> : <td className="empBoxes">{empFirstName}</td>
        let lastName = this.state.editable ?
            <td className="empBoxes"><input type='text' ref={input => this.lastName = input} defaultValue={empLastName} /> </td> : <td className="empBoxes"> {empLastName}</td>
        let title = this.state.editable ?
            <td className="empBoxes"><input type='text' ref={input => this.title = input} defaultValue={empTitle} /> </td> : <td className="empBoxes">{empTitle}</td>
        let managerId =
            this.state.editable ?
                empTitle !== 'CEO' ?
                    <td><input type='text' ref={input => this.managerId = input} defaultValue={empManagerId} /> </td> : <td className="empBoxes">{empManagerId}</td> :
                <td className="empBoxes">{empManagerId}</td>
        let deleteButton = empTitle === 'CEO' ?
            <td><button className="empBoxes deleteBtn ceoDelete"><h4>Delete</h4></button></td> :
            <td><button className="empBoxes deleteBtn" onClick={() => this.props.handleDelete(empId)}><h4>Delete</h4></button></td>
        console.log("employee search Bool", search)

        let employees = (
            <tr className="employee">
                {id}
                {firstName}
                {lastName}
                {title}
                {managerId}
                <td><button className="empBoxes editBtn" onClick={() => this.handleEdit()}>{this.state.editable ? <h4>Submit</h4> : <h4>Edit </h4>}</button></td>
                {deleteButton}
            </tr>
        )

        return (
            employees
        )

    }
}

export default Employee;