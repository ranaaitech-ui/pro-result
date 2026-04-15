import React from 'react';

export default function Records() {
    const records = JSON.parse(localStorage.getItem('savedRecords') || '[]');

    return (
        <div className="p-8 pb-20">
            <h2 className="text-2xl font-bold text-gray-800 font-playfair mb-6">Saved Records</h2>
            {records.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm text-center p-12 py-20">
                    <p className="text-gray-500">No result cards have been saved yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Saved</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {records.map((record, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.studentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.rollNo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.percentage}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
