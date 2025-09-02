import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface User {
    name: string;
    email: string;
}

interface Employee {
    id: number;
    employee_code: string;
    grade: string;
    department: string;
    user: User;
}

interface Quota {
    id: number;
    monthly_quota: number;
    remaining_quota: number;
    month: string;
}



interface Props {
    employee: Employee;
    quota: Quota;
    [key: string]: unknown;
}

export default function CreateRequest({ employee, quota }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        quantity: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/requests');
    };

    const handleCancel = () => {
        router.visit('/dashboard');
    };

    return (
        <AppShell>
            <Head title="Buat Permintaan Galon" />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">📝 Buat Permintaan Galon</h1>
                    <p className="text-gray-600">Ajukan permintaan pengambilan galon</p>
                </div>

                {/* Employee Info Card */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">{employee.user.name}</h2>
                            <p className="text-blue-100">{employee.employee_code} • {employee.grade} • {employee.department}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{quota.remaining_quota}</div>
                            <div className="text-blue-100 text-sm">Sisa Kuota</div>
                        </div>
                    </div>
                    
                    <div className="mt-4 bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-sm">
                            <span>Kuota Bulanan:</span>
                            <span className="font-semibold">{quota.monthly_quota} galon</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Sudah Digunakan:</span>
                            <span className="font-semibold">{quota.monthly_quota - quota.remaining_quota} galon</span>
                        </div>
                        <div className="mt-2">
                            <div className="w-full bg-white/20 rounded-full h-2">
                                <div 
                                    className="bg-white h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((quota.monthly_quota - quota.remaining_quota) / quota.monthly_quota) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Request Form */}
                <div className="bg-white rounded-lg border p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                Jumlah Galon yang Diminta
                            </label>
                            <div className="relative">
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max={Math.min(quota.remaining_quota, 10)}
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', parseInt(e.target.value) || 1)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">galon</span>
                                </div>
                            </div>
                            {errors.quantity && (
                                <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Maksimal {Math.min(quota.remaining_quota, 10)} galon per permintaan
                            </p>
                        </div>

                        {/* Validation Info */}
                        {data.quantity > quota.remaining_quota && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                                <div className="flex">
                                    <div className="text-red-400">⚠️</div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Jumlah melebihi sisa kuota
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            Anda hanya memiliki sisa kuota {quota.remaining_quota} galon untuk bulan ini.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Select Buttons */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pilih Cepat
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {[1, 2, 3, 5, 10].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => setData('quantity', num)}
                                        disabled={num > quota.remaining_quota}
                                        className={`px-3 py-2 text-sm font-medium rounded-md border ${
                                            data.quantity === num
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : num <= quota.remaining_quota
                                                ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-md">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Ringkasan Permintaan</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Jumlah yang diminta:</span>
                                    <span className="font-medium">{data.quantity} galon</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sisa kuota setelah permintaan:</span>
                                    <span className="font-medium">
                                        {quota.remaining_quota - data.quantity} galon
                                    </span>
                                </div>
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
                                disabled={processing || data.quantity > quota.remaining_quota || data.quantity < 1}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Permintaan'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Info Panel */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">ℹ️ Informasi Penting</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Permintaan akan diverifikasi oleh admin gudang</li>
                        <li>• Anda akan mendapat notifikasi jika permintaan disetujui</li>
                        <li>• Galon dapat diambil setelah status berubah menjadi "Disetujui"</li>
                        <li>• Kuota akan berkurang setelah galon diambil dari gudang</li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}