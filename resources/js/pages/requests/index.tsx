import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
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

interface Request {
    id: number;
    quantity: number;
    status: 'pending' | 'approved' | 'rejected' | 'taken';
    requested_at: string;
    approved_at?: string;
    taken_at?: string;
    employee: Employee;
}

interface Props {
    requests: {
        data: Request[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
    };
    [key: string]: unknown;
}

export default function RequestsIndex({ requests }: Props) {
    const handleApprove = (requestId: number) => {
        router.patch(`/requests/${requestId}/status`, { action: 'approve' }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReject = (requestId: number) => {
        router.patch(`/requests/${requestId}/status`, { action: 'reject' }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleTake = (requestId: number) => {
        router.patch(`/requests/${requestId}/status`, { action: 'take' }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            taken: 'bg-blue-100 text-blue-800',
        };

        const labels = {
            pending: 'Menunggu',
            approved: 'Disetujui',
            rejected: 'Ditolak',
            taken: 'Diambil',
        };

        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${badges[status as keyof typeof badges]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    return (
        <AppShell>
            <Head title="Permintaan Galon" />
            <div className="p-6">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📋 Permintaan Galon</h1>
                        <p className="text-gray-600">Kelola permintaan pengambilan galon</p>
                    </div>
                    <Link href="/requests/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            + Buat Permintaan Baru
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
                                        Jumlah
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal Permintaan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {requests.data.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {request.employee.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {request.employee.employee_code} • {request.employee.grade} • {request.employee.department}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-blue-600">
                                                {request.quantity} galon
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(request.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(request.requested_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link 
                                                    href={`/requests/${request.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Lihat
                                                </Link>
                                                
                                                {request.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(request.id)}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            Setujui
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(request.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Tolak
                                                        </button>
                                                    </>
                                                )}
                                                
                                                {request.status === 'approved' && (
                                                    <button
                                                        onClick={() => handleTake(request.id)}
                                                        className="text-purple-600 hover:text-purple-900"
                                                    >
                                                        Ambil
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {requests.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada permintaan</h3>
                            <p className="text-gray-500">Permintaan galon akan muncul di sini</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {requests.links.length > 3 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            {requests.links.map((link, index) => (
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
            </div>
        </AppShell>
    );
}