import React from 'react';

export default function ElegantGold({ school, student, subjects, metrics }) {
    return (
        <div className="w-full h-full flex flex-col border-[12px] border-[#D4AF37] p-[8px] bg-[#fbfbf9]">
            <div className="flex-1 border-[3px] border-[#D4AF37] p-8 flex flex-col relative overflow-hidden">

                {/* Subtle background watermark */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-5 pointer-events-none">
                    {school.logo ? (
                        <img src={school.logo} alt="Watermark" className="w-[500px] h-[500px] object-contain grayscale" />
                    ) : (
                        <div className="text-[150px] font-playfair font-bold rotate-[-30deg] uppercase text-gray-900">{school.name || "ACADEMY"}</div>
                    )}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="text-center mb-10 pb-8 border-b-2 border-double border-[#D4AF37]">
                        <div className="flex justify-center mb-6">
                            {school.logo ? (
                                <img src={school.logo} alt="School Logo" className="h-28 object-contain" />
                            ) : (
                                <div className="w-28 h-28 border border-[#D4AF37] text-[#D4AF37] rounded-full flex items-center justify-center font-bold text-sm">Logo</div>
                            )}
                        </div>
                        <h1 className="text-5xl font-playfair font-black tracking-widest text-gray-900 uppercase mb-3">{school.name}</h1>
                        <p className="text-sm text-gray-500 uppercase tracking-[0.3em] font-medium">{school.address}</p>
                        <div className="mt-8 flex justify-center">
                            <span className="px-6 py-2 border-y border-[#D4AF37] text-[#C5A017] uppercase tracking-[0.2em] font-bold text-sm bg-[#D4AF37]/10">Certificate of Result</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col px-4">
                        {/* Student Info */}
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <p className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-1">Student</p>
                                <p className="text-3xl font-playfair font-bold text-gray-800">{student.name || '_________________'}</p>
                                <div className="mt-4 flex space-x-8">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Class</p>
                                        <p className="font-semibold text-gray-800">{student.class || '___'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Roll No</p>
                                        <p className="font-semibold text-gray-800">{student.rollNo || '___'}</p>
                                    </div>
                                </div>
                            </div>
                            {student.photo && (
                                <img src={student.photo} alt="Student" className="w-28 h-36 object-cover border-2 border-[#D4AF37] rounded-sm p-1 bg-white" />
                            )}
                        </div>

                        {/* Grades */}
                        <div className="flex-1 mb-8">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[#D4AF37]">
                                        <th className="py-3 px-2 font-bold text-[#D4AF37] uppercase tracking-wider text-xs">Subject</th>
                                        <th className="py-3 px-2 font-bold text-[#D4AF37] uppercase tracking-wider text-xs text-center">Max Marks</th>
                                        <th className="py-3 px-2 font-bold text-[#D4AF37] uppercase tracking-wider text-xs text-right">Obtained Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjects.map((sub, index) => (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="py-4 px-2 font-medium text-gray-800">{sub.name || '-'}</td>
                                            <td className="py-4 px-2 text-gray-500 text-center">{sub.totalMarks || '-'}</td>
                                            <td className="py-4 px-2 font-bold text-gray-900 text-right text-lg">{sub.obtainedMarks || '-'}</td>
                                        </tr>
                                    ))}
                                    <tr className="border-y-2 border-[#D4AF37] bg-gray-50/50">
                                        <td className="py-4 px-2 font-bold text-gray-900 uppercase">Total Score</td>
                                        <td className="py-4 px-2 font-bold text-gray-900 text-center">{metrics.totalMaxMarks}</td>
                                        <td className="py-4 px-2 font-black text-[#D4AF37] text-xl text-right">{metrics.totalObtainedMarks}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Summary */}
                        <div className="flex justify-between items-end border-t border-gray-200 pt-6 mt-auto">
                            <div className="flex space-x-12 items-center">
                                <div className="text-center">
                                    <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Percentage</p>
                                    <p className="text-3xl font-playfair font-black text-gray-900">{metrics.percentage}%</p>
                                </div>
                                <div className="h-12 w-[1px] bg-gray-300"></div>
                                <div className="text-center">
                                    <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Final Grade</p>
                                    <p className="text-4xl font-playfair font-black text-[#D4AF37]">{metrics.grade}</p>
                                </div>
                            </div>

                            <div className="flex space-x-16">
                                <div className="text-center w-40">
                                    <p className="border-b border-gray-400 h-10 mb-2"></p>
                                    <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Teacher</p>
                                </div>
                                <div className="text-center w-40">
                                    <p className="border-b border-gray-400 h-10 mb-2"></p>
                                    <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Principal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
