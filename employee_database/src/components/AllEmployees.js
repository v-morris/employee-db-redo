import React from 'react';
import Employee from './Employee';

const AllEmployees = (props) => {
    let search = props.search;
    let employees;

    if (!search) {
        employees = props.employees.map((employee, index) => {
            return (
                <table key={index}>
                    <tbody>
                        <Employee employee={employee} handleEdit={props.handleEdit} handleDelete={props.handleDelete} search={props.search}  />
                    </tbody>
                </table>
            )
        })
    }
    else {
        employees = props.filtered.map((filter, index) => {
            return (
                <table key={index}>
                    <tbody>
                        <Employee filter={filter} handleEdit={props.handleEdit} handleDelete={props.handleDelete} search={props.search} />
                    </tbody>
                </table>
            )
        })
    }

    return (
        <div>
            {employees}
        </div>
    )
}

export default AllEmployees;