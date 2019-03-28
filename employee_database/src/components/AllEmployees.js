import React from 'react';

const AllEmployees = (props) => {

    let employees = props.employees.map(employee => {
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
    })
    return(
        <div>
            {employees}
        </div>
    )
}

export default AllEmployees;