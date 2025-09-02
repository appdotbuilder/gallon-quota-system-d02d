<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->role === 'hr';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $employee = $this->route('employee');

        return [
            'user_id' => 'required|exists:users,id|unique:employees,user_id,' . $employee->id,
            'employee_code' => 'required|string|max:255|unique:employees,employee_code,' . $employee->id,
            'grade' => 'required|in:G7,G8,G9,G10,G11,G12,G13',
            'department' => 'required|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'User is required.',
            'user_id.exists' => 'Selected user does not exist.',
            'user_id.unique' => 'This user already has an employee profile.',
            'employee_code.required' => 'Employee code is required.',
            'employee_code.unique' => 'Employee code must be unique.',
            'grade.required' => 'Grade is required.',
            'grade.in' => 'Grade must be one of: G7, G8, G9, G10, G11, G12, G13.',
            'department.required' => 'Department is required.',
        ];
    }
}