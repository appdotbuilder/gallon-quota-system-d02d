import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

export default function Welcome() {
    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-white">
                    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                            <div className="sm:max-w-lg">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    💧 Sistem Ambil Jatah Galon
                                </h1>
                                <p className="mt-4 text-xl text-gray-500">
                                    Sistem manajemen distribusi galon air modern untuk karyawan. 
                                    Kelola kuota, permintaan, dan stok dengan mudah dan efisien.
                                </p>
                            </div>
                            <div>
                                <div className="mt-10">
                                    {/* Features Grid */}
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3">
                                        <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                                                    👤
                                                </div>
                                                <h3 className="ml-3 text-lg font-medium text-gray-900">Karyawan</h3>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Cek kuota bulanan, ajukan permintaan galon, dan scan barcode untuk pengambilan.
                                            </p>
                                            <ul className="mt-3 space-y-1 text-xs text-gray-600">
                                                <li>• Kuota berdasarkan grade (G7-G13)</li>
                                                <li>• Permintaan online real-time</li>
                                                <li>• Riwayat lengkap input/output</li>
                                            </ul>
                                        </div>

                                        <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white">
                                                    👥
                                                </div>
                                                <h3 className="ml-3 text-lg font-medium text-gray-900">Admin HR</h3>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Kelola data pegawai dan atur kuota berdasarkan grade karyawan.
                                            </p>
                                            <ul className="mt-3 space-y-1 text-xs text-gray-600">
                                                <li>• CRUD data karyawan</li>
                                                <li>• Pengaturan kuota otomatis</li>
                                                <li>• Monitoring penggunaan</li>
                                            </ul>
                                        </div>

                                        <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500 text-white">
                                                    📦
                                                </div>
                                                <h3 className="ml-3 text-lg font-medium text-gray-900">Admin Gudang</h3>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Dashboard harian, verifikasi stok, dan update status permintaan galon.
                                            </p>
                                            <ul className="mt-3 space-y-1 text-xs text-gray-600">
                                                <li>• Dashboard stok real-time</li>
                                                <li>• Verifikasi permintaan</li>
                                                <li>• Update status pengambilan</li>
                                            </ul>
                                        </div>

                                        <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500 text-white">
                                                    📊
                                                </div>
                                                <h3 className="ml-3 text-lg font-medium text-gray-900">Admin Administrasi</h3>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Laporan harian lengkap dengan export Excel dan PDF untuk analisis.
                                            </p>
                                            <ul className="mt-3 space-y-1 text-xs text-gray-600">
                                                <li>• Laporan harian otomatis</li>
                                                <li>• Export Excel & PDF</li>
                                                <li>• Analisis penggunaan</li>
                                            </ul>
                                        </div>

                                        <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500 text-white">
                                                    📱
                                                </div>
                                                <h3 className="ml-3 text-lg font-medium text-gray-900">Scan Barcode</h3>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Konfirmasi pengambilan galon dengan scan barcode untuk tracking akurat.
                                            </p>
                                            <ul className="mt-3 space-y-1 text-xs text-gray-600">
                                                <li>• QR Code verification</li>
                                                <li>• Mobile-friendly scanner</li>
                                                <li>• Real-time confirmation</li>
                                            </ul>
                                        </div>

                                        <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-white">
                                                    ⚙️
                                                </div>
                                                <h3 className="ml-3 text-lg font-medium text-gray-900">Sistem Otomatis</h3>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Reset harian dan bulanan otomatis, pencatatan real-time semua aktivitas.
                                            </p>
                                            <ul className="mt-3 space-y-1 text-xs text-gray-600">
                                                <li>• Reset kuota otomatis</li>
                                                <li>• Logging semua aktivitas</li>
                                                <li>• Notifikasi sistem</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Section */}
                                <div className="mt-12 text-center">
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            href="/login"
                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                        >
                                            🔑 Masuk ke Sistem
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                        >
                                            📝 Daftar Akun Baru
                                        </Link>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-500">
                                        Demo login: <strong>employee@galon.test</strong> | 
                                        <strong>hr@galon.test</strong> | 
                                        <strong>gudang@galon.test</strong> | 
                                        <strong>admin@galon.test</strong> (password: password)
                                    </p>
                                </div>

                                {/* Quote/Process Section */}
                                <div className="mt-16">
                                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-center">
                                        <h2 className="text-2xl font-bold text-white mb-4">
                                            🎯 Kuota Berdasarkan Grade
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                                                <div className="text-white font-bold">G7</div>
                                                <div className="text-blue-100 text-sm">24 galon</div>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                                                <div className="text-white font-bold">G8</div>
                                                <div className="text-blue-100 text-sm">24 galon</div>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                                                <div className="text-white font-bold">G9</div>
                                                <div className="text-blue-100 text-sm">12 galon</div>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                                                <div className="text-white font-bold">G10</div>
                                                <div className="text-blue-100 text-sm">10 galon</div>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                                                <div className="text-white font-bold">G11</div>
                                                <div className="text-blue-100 text-sm">7 galon</div>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                                                <div className="text-white font-bold">G12</div>
                                                <div className="text-blue-100 text-sm">7 galon</div>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                                                <div className="text-white font-bold">G13</div>
                                                <div className="text-blue-100 text-sm">7 galon</div>
                                            </div>
                                        </div>
                                        <p className="text-blue-100 mt-4">
                                            Sistem otomatis mengatur kuota bulanan berdasarkan grade karyawan
                                        </p>
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