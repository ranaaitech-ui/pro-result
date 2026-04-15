import React from 'react';

export default function ModernMinimalist({ school, student, subjects, metrics }) {
    return (
        <div className="w-full h-full flex flex-col bg-white border border-gray-100 shadow-sm p-12 text-gray-900">

            {/* Header Container */}
            <div className="flex justify-between items-start mb-16">
                <div className="flex items-center space-x-6">
                    {school.logo ? (
                        <img src={school.logo} alt="Logo" className="w-16 h-16 object-contain rounded" />
                    ) : (
                        <div className="w-16 h-16 bg-gray-900 rounded text-white flex items-center justify-center font-bold text-xs uppercase tracking-widest">Logo</div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{school.name}</h1>
                        <p className="text-sm text-gray-500">{school.address}</p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Document</p>
                    <p className="text-xl font-light text-gray-800">Academic Report</p>
                    <p className="text-sm text-gray-400 mt-1">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">

                <div className="grid grid-cols-3 gap-8 mb-16">
                    <div className="col-span-2 bg-gray-50 rounded-2xl p-6">
                        <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">Student Profile</p>
                        <h2 className="text-3xl font-medium tracking-tight text-gray-900 mb-6">{student.name || 'Student Name'}</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Roll Number</p>
                                <p className="font-medium text-gray-900">{student.rollNo || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Class / Section</p>
                                <p className="font-medium text-gray-900">{student.class || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50">
                        {student.photo ? (
                            <img src={student.photo} alt="Student" className="w-full h-full object-cover grayscale" />
                        ) : (
                            <p className="text-gray-400 text-sm">No Photo</p>
                        )}
                    </div>
                </div>

                {/* Grades Table */}
                <div className="flex-1">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="py-4 text-left font-medium text-gray-400 text-sm border-b border-gray-200 w-1/2">Subject</th>
                                <th className="py-4 text-right font-medium text-gray-400 text-sm border-b border-gray-200">Total</th>
                                <th className="py-4 text-right font-medium text-gray-400 text-sm border-b border-gray-200">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((sub, index) => (
                                <tr key={index}>
                                    <td className="py-4 text-gray-800 border-b border-gray-100 font-medium">{sub.name || '-'}</td>
                                    <td className="py-4 text-right text-gray-500 border-b border-gray-100">{sub.totalMarks || '-'}</td>
                                    <td className="py-4 text-right text-gray-900 font-semibold border-b border-gray-100">{sub.obtainedMarks || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="py-6 text-gray-500 font-medium pt-8">Overall Totals</td>
                                <td className="py-6 text-right text-gray-600 pt-8">{metrics.totalMaxMarks}</td>
                                <td className="py-6 text-right text-gray-900 font-bold text-xl pt-8">{metrics.totalObtainedMarks}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Footer Metrics */}
                <div className="mt-16 flex justify-between items-end border-t border-gray-900 pt-8">
                    <div className="flex space-x-16">
                        <div>
                            <p className="text-sm text-gray-500 mb-2 font-medium">Final Percentage</p>
                            <p className="text-4xl font-light text-gray-900 tracking-tight">{metrics.percentage}<span className="text-2xl text-gray-400">%</span></p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-2 font-medium">Earned Grade</p>
                            <p className="text-4xl font-semibold text-gray-900 tracking-tight">{metrics.grade}</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="border-b border-gray-300 w-48 mb-2 pb-6"></p>
                        <p className="text-sm text-gray-500 font-medium">Authorized Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
