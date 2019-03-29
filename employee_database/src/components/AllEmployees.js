import React from 'react';
import Employee from './Employee';

const AllEmployees = (props) => {

    let employees = props.employees.map(employee => {
        return (
            <table key={employee.id}>
                <tbody>
                    <Employee employee={employee}  handleEdit= {props.handleEdit} handleDelete = {props.handleDelete}/>
                </tbody>
            </table>
        )
    })
    return(
        <div>
            {employees}
        </div>
    )
}

export default AllEmployees;