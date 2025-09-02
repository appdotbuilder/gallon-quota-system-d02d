import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Employee {
    id: number;
    user_id: number;
    employee_code: string;
    grade: string;
    department: string;
    user: {
        name: string;
        email: string;
    };
}

interface Quota {
    id: number;
    monthly_quota: number;
    remaining_quota: number;
    month: string;
}

interface Request {
    id: number;
    quantity: number;
    status: 'pending' | 'approved' | 'rejected' | 'taken';
    requested_at: string;
    approved_at?: string;
    taken_at?: string;
}

interface Props {
    role?: string;
    employee?: Employee;
    quota?: Quota;
    recentRequests?: Request[];
    stats?: Record<string, number>;
    error?: string;
    [key: string]: unknown;
}

export default function Dashboard({ role, employee, quota, recentRequests, stats, error }: Props) {
    const handleNewRequest = () => {
        router.visit('/requests/create');
    };

    const handleViewRequests = () => {
        router.visit('/requests');
    };

    const handleViewEmployees = () => {
        router.visit('/employees');
    };

    if (error) {
        return (
            <AppShell>
                <Head title="Dashboard" />
                <div className="p-6">
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex">
                            <div className="text-red-400">⚠️</div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error</h3>
                                <div className="mt-2 text-sm text-red-700">{error}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppShell>
        );
    }

    // User/Employee Dashboard
    if (!role || role === 'user') {
        return (
            <AppShell>
                <Head title="Dashboard Karyawan" />
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">🏠 Dashboard Karyawan</h1>
                        <p className="text-gray-600">Selamat datang di sistem galon</p>
                    </div>

                    {employee && quota && (
                        <>
                            {/* User Info Card */}
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold">{employee.user.name}</h2>
                                        <p className="text-blue-100">{employee.employee_code} • {employee.grade} • {employee.department}</p>
                                        <p className="text-blue-100 text-sm">{employee.user.email}</p>
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

                            {/* Stats Cards */}
                            {stats && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="bg-white rounded-lg border p-6">
                                        <div className="flex items-center">
                                            <div className="text-2xl">📝</div>
                                            <div className="ml-4">
                                                <div className="text-2xl font-bold text-gray-900">{stats.totalRequests}</div>
                                                <div className="text-sm text-gray-600">Total Permintaan</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white rounded-lg border p-6">
                                        <div className="flex items-center">
                                            <div className="text-2xl">✅</div>
                                            <div className="ml-4">
                                                <div className="text-2xl font-bold text-green-600">{stats.approvedRequests}</div>
                                                <div className="text-sm text-gray-600">Disetujui</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white rounded-lg border p-6">
                                        <div className="flex items-center">
                                            <div className="text-2xl">💧</div>
                                            <div className="ml-4">
                                                <div className="text-2xl font-bold text-blue-600">{stats.takenGallons}</div>
                                                <div className="text-sm text-gray-600">Galon Diambil</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <Button 
                                    onClick={handleNewRequest}
                                    className="h-24 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center"
                                >
                                    <div className="text-2xl mb-2">📝</div>
                                    <div className="text-sm">Buat Permintaan</div>
                                </Button>
                                
                                <Button 
                                    onClick={handleViewRequests}
                                    className="h-24 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center"
                                >
                                    <div className="text-2xl mb-2">📋</div>
                                    <div className="text-sm">Lihat Riwayat</div>
                                </Button>
                                
                                <Button 
                                    className="h-24 bg-yellow-600 hover:bg-yellow-700 text-white flex flex-col items-center justify-center"
                                >
                                    <div className="text-2xl mb-2">📱</div>
                                    <div className="text-sm">Scan Barcode</div>
                                </Button>
                                
                                <Button 
                                    className="h-24 bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center justify-center"
                                >
                                    <div className="text-2xl mb-2">📊</div>
                                    <div className="text-sm">Cek Kuota</div>
                                </Button>
                            </div>

                            {/* Recent Requests */}
                            {recentRequests && recentRequests.length > 0 && (
                                <div className="bg-white rounded-lg border">
                                    <div className="p-4 border-b">
                                        <h3 className="text-lg font-semibold text-gray-900">📋 Permintaan Terbaru</h3>
                                    </div>
                                    <div className="divide-y">
                                        {recentRequests.map((request) => (
                                            <div key={request.id} className="p-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium">{request.quantity} galon</div>
                                                        <div className="text-sm text-gray-600">
                                                            {new Date(request.requested_at).toLocaleDateString('id-ID')}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            request.status === 'taken' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                            {request.status === 'pending' ? 'Menunggu' :
                                                             request.status === 'approved' ? 'Disetujui' :
                                                             request.status === 'taken' ? 'Diambil' : 'Ditolak'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </AppShell>
        );
    }

    // HR Dashboard
    if (role === 'hr') {
        return (
            <AppShell>
                <Head title="Dashboard HR" />
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">👥 Dashboard HR</h1>
                        <p className="text-gray-600">Kelola data karyawan dan kuota</p>
                    </div>

                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">👤</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</div>
                                        <div className="text-sm text-gray-600">Total Karyawan</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">📊</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-blue-600">{stats.totalQuotas}</div>
                                        <div className="text-sm text-gray-600">Total Kuota</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">💧</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-green-600">{stats.remainingQuotas}</div>
                                        <div className="text-sm text-gray-600">Sisa Kuota</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">✅</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-purple-600">{stats.usedQuotas}</div>
                                        <div className="text-sm text-gray-600">Kuota Terpakai</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Button 
                            onClick={handleViewEmployees}
                            className="h-24 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center"
                        >
                            <div className="text-2xl mb-2">👥</div>
                            <div className="text-sm">Kelola Karyawan</div>
                        </Button>
                        
                        <Button 
                            className="h-24 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center"
                        >
                            <div className="text-2xl mb-2">📊</div>
                            <div className="text-sm">Kelola Kuota</div>
                        </Button>
                    </div>
                </div>
            </AppShell>
        );
    }

    // Gudang Dashboard
    if (role === 'gudang') {
        return (
            <AppShell>
                <Head title="Dashboard Gudang" />
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">📦 Dashboard Gudang</h1>
                        <p className="text-gray-600">Kelola stok dan verifikasi permintaan</p>
                    </div>

                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">📦</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-gray-900">{stats.currentStock}</div>
                                        <div className="text-sm text-gray-600">Stok Tersedia</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">⏳</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</div>
                                        <div className="text-sm text-gray-600">Menunggu Persetujuan</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">✅</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-green-600">{stats.approvedRequests}</div>
                                        <div className="text-sm text-gray-600">Disetujui</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">💧</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-blue-600">{stats.todayTaken}</div>
                                        <div className="text-sm text-gray-600">Diambil Hari Ini</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Button 
                            onClick={handleViewRequests}
                            className="h-24 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center"
                        >
                            <div className="text-2xl mb-2">📋</div>
                            <div className="text-sm">Verifikasi Permintaan</div>
                        </Button>
                        
                        <Button 
                            className="h-24 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center"
                        >
                            <div className="text-2xl mb-2">📦</div>
                            <div className="text-sm">Kelola Stok</div>
                        </Button>
                    </div>
                </div>
            </AppShell>
        );
    }

    // Admin Dashboard
    if (role === 'admin') {
        return (
            <AppShell>
                <Head title="Dashboard Admin" />
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">📊 Dashboard Admin</h1>
                        <p className="text-gray-600">Laporan dan analisis sistem</p>
                    </div>

                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">📝</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-gray-900">{stats.todayRequests}</div>
                                        <div className="text-sm text-gray-600">Permintaan Hari Ini</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">✅</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-green-600">{stats.todayApproved}</div>
                                        <div className="text-sm text-gray-600">Disetujui Hari Ini</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">💧</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-blue-600">{stats.todayTaken}</div>
                                        <div className="text-sm text-gray-600">Diambil Hari Ini</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">👤</div>
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-purple-600">{stats.totalEmployees}</div>
                                        <div className="text-sm text-gray-600">Total Karyawan</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Button 
                            className="h-24 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center"
                        >
                            <div className="text-2xl mb-2">📊</div>
                            <div className="text-sm">Laporan Harian</div>
                        </Button>
                        
                        <Button 
                            className="h-24 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center"
                        >
                            <div className="text-2xl mb-2">📋</div>
                            <div className="text-sm">Download Excel/PDF</div>
                        </Button>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <Head title="Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome to the Gallon Quota System</p>
            </div>
        </AppShell>
    );
}