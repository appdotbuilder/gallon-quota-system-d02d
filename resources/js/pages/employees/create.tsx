import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
}



interface Props {
    users: User[];
    [key: string]: unknown;
}

export default function CreateEmployee({ users }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: 0,
        employee_code: '',
        grade: '',
        department: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/employees');
    };

    const handleCancel = () => {
        router.visit('/employees');
    };

    const grades = ['G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13'];
    const departments = ['IT', 'HR', 'Finance', 'Operations', 'Marketing', 'Sales', 'Production', 'Quality Control'];
    
    const getQuotaForGrade = (grade: string) => {
        const quotas = {
            'G7': 24, 'G8': 24, 'G9': 12, 'G10': 10,
            'G11': 7, 'G12': 7, 'G13': 7
        };
        return quotas[grade as keyof typeof quotas] || 0;
    };

    return (
        <AppShell>
            <Head title="Tambah Karyawan" />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">👤 Tambah Karyawan Baru</h1>
                    <p className="text-gray-600">Buat profil karyawan dan atur kuota galon</p>
                </div>

                <div className="bg-white rounded-lg border p-6">
                    <form onSubmit={handleSubmit}>
                        {/* User Selection */}
                        <div className="mb-6">
                            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-2">
                                Pilih User *
                            </label>
                            <select
                                id="user_id"
                                value={data.user_id}
                                onChange={(e) => setData('user_id', parseInt(e.target.value))}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value={0}>-- Pilih User --</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                            {errors.user_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>
                            )}
                        </div>

                        {/* Employee Code */}
                        <div className="mb-6">
                            <label htmlFor="employee_code" className="block text-sm font-medium text-gray-700 mb-2">
                                Kode Karyawan *
                            </label>
                            <input
                                id="employee_code"
                                type="text"
                                value={data.employee_code}
                                onChange={(e) => setData('employee_code', e.target.value)}
                                placeholder="Contoh: EMP001, KRY2024001"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.employee_code && (
                                <p className="mt-1 text-sm text-red-600">{errors.employee_code}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Kode unik untuk mengidentifikasi karyawan
                            </p>
                        </div>

                        {/* Grade */}
                        <div className="mb-6">
                            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                                Grade *
                            </label>
                            <select
                                id="grade"
                                value={data.grade}
                                onChange={(e) => setData('grade', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">-- Pilih Grade --</option>
                                {grades.map((grade) => (
                                    <option key={grade} value={grade}>
                                        {grade} - {getQuotaForGrade(grade)} galon/bulan
                                    </option>
                                ))}
                            </select>
                            {errors.grade && (
                                <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
                            )}
                            {data.grade && (
                                <p className="mt-1 text-sm text-green-600">
                                    💧 Kuota bulanan: {getQuotaForGrade(data.grade)} galon
                                </p>
                            )}
                        </div>

                        {/* Department */}
                        <div className="mb-6">
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                                Departemen *
                            </label>
                            <select
                                id="department"
                                value={data.department}
                                onChange={(e) => setData('department', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">-- Pilih Departemen --</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                            {errors.department && (
                                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                            )}
                        </div>

                        {/* Grade Info Panel */}
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                            <h4 className="text-sm font-medium text-blue-800 mb-2">📋 Kuota Berdasarkan Grade</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                                {Object.entries({
                                    'G7': 24, 'G8': 24, 'G9': 12, 'G10': 10,
                                    'G11': 7, 'G12': 7, 'G13': 7
                                }).map(([grade, quota]) => (
                                    <div 
                                        key={grade} 
                                        className={`rounded p-2 text-center ${
                                            data.grade === grade ? 'bg-blue-600 text-white' : 'bg-white'
                                        }`}
                                    >
                                        <div className="font-bold">{grade}</div>
                                        <div className={data.grade === grade ? 'text-blue-100' : 'text-blue-600'}>
                                            {quota} galon
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-600 text-white"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Karyawan'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Info Panel */}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                    <h4 className="text-sm font-medium text-green-800 mb-2">ℹ️ Informasi</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                        <li>• Karyawan baru akan mendapat kuota sesuai grade yang dipilih</li>
                        <li>• Kuota akan direset setiap awal bulan</li>
                        <li>• User yang dipilih akan memiliki akses ke sistem dengan role employee</li>
                        <li>• Kode karyawan harus unik dan tidak boleh sama dengan karyawan lain</li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}