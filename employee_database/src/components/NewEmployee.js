import React from 'react'; 

const NewEmployee = (props) =>{
    let formFields = {}
    console.log("form fields",formFields)
    return(
        <form onSubmit={(e) => {props.handleFormSubmit(
            formFields.first_name.value,
            formFields.last_name.value,
            formFields.title.value,
            formFields.manager_id.value);}}>
            <input ref = {input => formFields.first_name = input} placeholder ='First Name'/>
            <input ref = {input => formFields.last_name = input} placeholder = 'Last Name' />
            <input ref = {input => formFields.title = input} placeholder='Title' />
            <input ref = {input => formFields.manager_id = input} placeholder='Manager ID' />
            <button type="submit">Submit</button>
        </form>
        
    )
    
}

export default NewEmployee;