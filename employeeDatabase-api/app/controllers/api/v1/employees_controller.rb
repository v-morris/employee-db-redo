class Api::V1::EmployeesController < ApplicationController

    def index
        render json: Employee.all
    end

    def create
        employee = Employee.create(employee_params)
        render json:employee
    end

    def destroy
        Employee.destroy(params[:id])
    end

    def update
        employee = Employee.find(params[:id])
        employee.update_attributes (employee_params)
        render json: employee
    end

    def show
        employee = Employee.find(params[:id])
        render json: employee
    end

    private 
    
    def employee_params
        params.require(:employee).permit(:id, :first_name, :last_name, :title, :manager_id)
    end
    
end


