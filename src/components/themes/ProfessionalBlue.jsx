import React from 'react';

export default function ProfessionalBlue({ school, student, subjects, metrics }) {
    return (
        <div className="w-full h-full flex flex-col border-[16px] border-blue-900 bg-white">
            {/* Header */}
            <div className="flex bg-blue-50 border-b-4 border-blue-900 p-8">
                {school.logo ? (
                    <img src={school.logo} alt="School Logo" className="w-32 h-32 object-contain mr-6" />
                ) : (
                    <div className="w-32 h-32 bg-blue-200 flex items-center justify-center mr-6 text-blue-800 text-xs text-center border border-blue-300">No Logo</div>
                )}
                <div className="flex-1 flex flex-col justify-center text-center pr-32">
                    <h1 className="text-4xl font-bold tracking-wider text-blue-900 mb-2 uppercase">{school.name}</h1>
                    <p className="text-gray-600 border-t border-blue-200 inline-block px-4 pt-2 mx-auto">{school.address}</p>
                    <h2 className="text-xl font-bold bg-blue-900 text-white rounded-full px-6 py-1 mx-auto mt-4 uppercase tracking-[0.2em] shadow-sm">Academic Report Card</h2>
                </div>
            </div>

            <div className="flex-1 p-8 pb-12 flex flex-col">
                {/* Student Data */}
                <div className="flex justify-between items-end border-b-2 border-gray-200 pb-6 mb-8">
                    <div className="space-y-3 flex-1 text-lg">
                        <p><span className="font-semibold text-gray-500 uppercase tracking-wide text-sm mr-2 w-24 inline-block">Student Name:</span> <span className="font-bold text-gray-900">{student.name || '___________'}</span></p>
                        <p><span className="font-semibold text-gray-500 uppercase tracking-wide text-sm mr-2 w-24 inline-block">Roll Number:</span> <span className="font-medium text-gray-800">{student.rollNo || '___________'}</span></p>
                        <p><span className="font-semibold text-gray-500 uppercase tracking-wide text-sm mr-2 w-24 inline-block">Class / Sec:</span> <span className="font-medium text-gray-800">{student.class || '___________'}</span></p>
                    </div>
                    {student.photo ? (
                        <img src={student.photo} alt="Student" className="w-32 h-40 object-cover border-4 border-blue-100 shadow-md" />
                    ) : (
                        <div className="w-32 h-40 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center">Student<br />Photo</div>
                    )}
                </div>

                {/* Grades Table */}
                <div className="flex-1">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-blue-900 bg-blue-900 text-white p-3 text-left w-1/2 uppercase tracking-wider text-sm">Subject</th>
                                <th className="border border-blue-900 bg-blue-900 text-white p-3 text-center uppercase tracking-wider text-sm">Max Marks</th>
                                <th className="border border-blue-900 bg-blue-900 text-white p-3 text-center uppercase tracking-wider text-sm">Obtained</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((sub, index) => (
                                <tr key={index} className="even:bg-blue-50/50">
                                    <td className="border border-gray-300 p-3 font-semibold text-gray-800">{sub.name || '-'}</td>
                                    <td className="border border-gray-300 p-3 text-center text-gray-600">{sub.totalMarks || '-'}</td>
                                    <td className="border border-gray-300 p-3 text-center font-bold text-gray-900">{sub.obtainedMarks || '-'}</td>
                                </tr>
                            ))}
                            <tr className="bg-blue-50 border-t-2 border-blue-900">
                                <td className="border border-gray-300 p-4 font-bold text-blue-900 text-right uppercase tracking-wider text-sm">Total</td>
                                <td className="border border-gray-300 p-4 text-center font-bold text-blue-900 text-lg">{metrics.totalMaxMarks}</td>
                                <td className="border border-gray-300 p-4 text-center font-black text-blue-900 text-lg">{metrics.totalObtainedMarks}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer Metrics */}
                <div className="mt-8 flex justify-between items-center bg-gray-50 border-l-4 border-blue-900 p-6 shadow-inner">
                    <div className="flex space-x-12">
                        <div>
                            <p className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-1">Percentage</p>
                            <p className="text-3xl font-black text-blue-900">{metrics.percentage}%</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-1">Grade</p>
                            <p className="text-3xl font-black text-blue-900">{metrics.grade}</p>
                        </div>
                    </div>

                    <div className="text-center pt-8 border-t border-gray-400 w-48 mr-4 mt-6">
                        <p className="text-sm font-bold text-gray-600 uppercase">Principal's Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
