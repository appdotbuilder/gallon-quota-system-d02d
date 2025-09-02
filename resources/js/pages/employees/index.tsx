import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Employee {
    id: number;
    employee_code: string;
    grade: string;
    department: string;
    user: User;
    created_at: string;
}

interface Props {
    employees: {
        data: Employee[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
    };
    [key: string]: unknown;
}

export default function EmployeesIndex({ employees }: Props) {
    const handleDelete = (employeeId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
            router.delete(`/employees/${employeeId}`, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const getGradeColor = (grade: string) => {
        const colors = {
            'G7': 'bg-purple-100 text-purple-800',
            'G8': 'bg-blue-100 text-blue-800',
            'G9': 'bg-green-100 text-green-800',
            'G10': 'bg-yellow-100 text-yellow-800',
            'G11': 'bg-orange-100 text-orange-800',
            'G12': 'bg-red-100 text-red-800',
            'G13': 'bg-gray-100 text-gray-800',
        };
        
        return colors[grade as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getQuotaForGrade = (grade: string) => {
        const quotas = {
            'G7': 24, 'G8': 24, 'G9': 12, 'G10': 10,
            'G11': 7, 'G12': 7, 'G13': 7
        };
        return quotas[grade as keyof typeof quotas] || 0;
    };

    return (
        <AppShell>
            <Head title="Kelola Karyawan" />
            <div className="p-6">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">👥 Kelola Karyawan</h1>
                        <p className="text-gray-600">Manajemen data karyawan dan kuota galon</p>
                    </div>
                    <Link href="/employees/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            + Tambah Karyawan
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Karyawan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kode Karyawan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Grade
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Departemen
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kuota Bulanan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {employees.data.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {employee.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {employee.user.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-mono font-bold text-blue-600">
                                                {employee.employee_code}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(employee.grade)}`}>
                                                {employee.grade}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {employee.department}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-green-600">
                                                {getQuotaForGrade(employee.grade)} galon
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link 
                                                    href={`/employees/${employee.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Lihat
                                                </Link>
                                                <Link 
                                                    href={`/employees/${employee.id}/edit`}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(employee.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {employees.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada karyawan</h3>
                            <p className="text-gray-500 mb-4">Tambahkan karyawan untuk memulai</p>
                            <Link href="/employees/create">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    + Tambah Karyawan Pertama
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {employees.links.length > 3 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            {employees.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}

                {/* Grade Info Panel */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">📋 Kuota Berdasarkan Grade</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                        {Object.entries({
                            'G7': 24, 'G8': 24, 'G9': 12, 'G10': 10,
                            'G11': 7, 'G12': 7, 'G13': 7
                        }).map(([grade, quota]) => (
                            <div key={grade} className="bg-white rounded p-2 text-center">
                                <div className="font-bold text-gray-900">{grade}</div>
                                <div className="text-blue-600">{quota} galon</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}