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
    request: Request;
    [key: string]: unknown;
}

export default function ShowRequest({ request }: Props) {
    const handleApprove = () => {
        router.patch(`/requests/${request.id}/status`, { action: 'approve' }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReject = () => {
        router.patch(`/requests/${request.id}/status`, { action: 'reject' }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleTake = () => {
        router.patch(`/requests/${request.id}/status`, { action: 'take' }, {
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
            pending: 'Menunggu Persetujuan',
            approved: 'Disetujui',
            rejected: 'Ditolak',
            taken: 'Sudah Diambil',
        };

        return (
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${badges[status as keyof typeof badges]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    const getStatusIcon = (status: string) => {
        const icons = {
            pending: '⏳',
            approved: '✅',
            rejected: '❌',
            taken: '📦',
        };
        return icons[status as keyof typeof icons];
    };

    return (
        <AppShell>
            <Head title={`Permintaan #${request.id}`} />
            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            📋 Detail Permintaan #{request.id}
                        </h1>
                        <p className="text-gray-600">Informasi lengkap permintaan galon</p>
                    </div>
                    <Link href="/requests">
                        <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                            ← Kembali
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg border p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="text-3xl mr-3">
                                        {getStatusIcon(request.status)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Permintaan {request.quantity} Galon
                                        </h2>
                                        <p className="text-gray-600">
                                            Diajukan pada {new Date(request.requested_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {getStatusBadge(request.status)}
                                </div>
                            </div>

                            {/* Employee Info */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Informasi Karyawan</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-600">Nama</div>
                                            <div className="font-medium">{request.employee.user.name}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Email</div>
                                            <div className="font-medium">{request.employee.user.email}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Kode Karyawan</div>
                                            <div className="font-mono font-bold text-blue-600">
                                                {request.employee.employee_code}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Grade</div>
                                            <div className="font-medium">{request.employee.grade}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Departemen</div>
                                            <div className="font-medium">{request.employee.department}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="border-t pt-6 mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Timeline</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <div className="text-blue-600 text-sm">📝</div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="font-medium text-gray-900">Permintaan Diajukan</div>
                                            <div className="text-sm text-gray-600">
                                                {new Date(request.requested_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {request.approved_at && (
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <div className="text-green-600 text-sm">✅</div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">Permintaan Disetujui</div>
                                                <div className="text-sm text-gray-600">
                                                    {new Date(request.approved_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {request.taken_at && (
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <div className="text-purple-600 text-sm">📦</div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">Galon Diambil</div>
                                                <div className="text-sm text-gray-600">
                                                    {new Date(request.taken_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {request.status === 'rejected' && (
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                <div className="text-red-600 text-sm">❌</div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">Permintaan Ditolak</div>
                                                <div className="text-sm text-gray-600">
                                                    Permintaan tidak dapat diproses
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Sidebar */}
                    <div>
                        <div className="bg-white rounded-lg border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Aksi</h3>
                            
                            <div className="space-y-3">
                                {request.status === 'pending' && (
                                    <>
                                        <Button
                                            onClick={handleApprove}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            ✅ Setujui Permintaan
                                        </Button>
                                        <Button
                                            onClick={handleReject}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            ❌ Tolak Permintaan
                                        </Button>
                                    </>
                                )}

                                {request.status === 'approved' && (
                                    <Button
                                        onClick={handleTake}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        📦 Tandai Sudah Diambil
                                    </Button>
                                )}

                                {request.status === 'taken' && (
                                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="text-green-600 text-2xl mb-2">🎉</div>
                                        <div className="text-sm text-green-800 font-medium">
                                            Permintaan sudah selesai!
                                        </div>
                                        <div className="text-xs text-green-700 mt-1">
                                            Galon telah diambil oleh karyawan
                                        </div>
                                    </div>
                                )}

                                {request.status === 'rejected' && (
                                    <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="text-red-600 text-2xl mb-2">🚫</div>
                                        <div className="text-sm text-red-800 font-medium">
                                            Permintaan ditolak
                                        </div>
                                        <div className="text-xs text-red-700 mt-1">
                                            Permintaan tidak dapat diproses
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-6 pt-6 border-t">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">📊 Info Tambahan</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">ID Permintaan:</span>
                                        <span className="font-mono text-blue-600">#{request.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Jumlah:</span>
                                        <span className="font-bold text-blue-600">{request.quantity} galon</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Grade:</span>
                                        <span className="font-medium">{request.employee.grade}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}