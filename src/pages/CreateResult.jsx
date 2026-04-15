import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Save, Image as ImageIcon } from 'lucide-react';
import LivePreview from '../components/preview/LivePreview';
import { fileToBase64 } from '../utils/imageHandler';
import { exportToPDF } from '../utils/pdfExport';

export default function CreateResult() {
    // --- Form State ---
    const [schoolInfo, setSchoolInfo] = useState({
        name: 'Excellence Academy',
        address: '123 Education St, Knowledge City',
        logo: '' // base64 string
    });

    const [studentInfo, setStudentInfo] = useState({
        name: '',
        rollNo: '',
        class: '',
        photo: '' // base64 string
    });

    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Mathematics', totalMarks: 100, obtainedMarks: '' },
        { id: 2, name: 'Science', totalMarks: 100, obtainedMarks: '' },
        { id: 3, name: 'English', totalMarks: 100, obtainedMarks: '' }
    ]);

    // --- Customization State ---
    const [config, setConfig] = useState({
        theme: 'ProfessionalBlue', // 'ProfessionalBlue', 'ElegantGold', 'ModernMinimalist'
        fontFamily: 'Inter', // 'Inter', 'Playfair Display', 'Montserrat'
        layout: 'portrait', // 'portrait' | 'landscape'
        format: 'a4', // 'a4' | 'a5' | 'letter'
        primaryColor: '#2563EB'
    });

    // Derived calculations
    const totalMaxMarks = subjects.reduce((sum, sub) => sum + (Number(sub.totalMarks) || 0), 0);
    const totalObtainedMarks = subjects.reduce((sum, sub) => sum + (Number(sub.obtainedMarks) || 0), 0);
    const percentage = totalMaxMarks > 0 ? ((totalObtainedMarks / totalMaxMarks) * 100).toFixed(2) : 0;

    const getGrade = (perc) => {
        if (perc >= 90) return 'A+';
        if (perc >= 80) return 'A';
        if (perc >= 70) return 'B';
        if (perc >= 60) return 'C';
        if (perc >= 50) return 'D';
        return 'F';
    };
    const grade = getGrade(percentage);

    // Handlers
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) setSchoolInfo({ ...schoolInfo, logo: await fileToBase64(file) });
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) setStudentInfo({ ...studentInfo, photo: await fileToBase64(file) });
    };

    const addSubject = () => {
        setSubjects([...subjects, { id: Date.now(), name: '', totalMarks: 100, obtainedMarks: '' }]);
    };

    const removeSubject = (id) => {
        setSubjects(subjects.filter(s => s.id !== id));
    };

    const handleSubjectChange = (id, field, value) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleExport = async () => {
        try {
            await exportToPDF('live-preview-container', { layout: config.layout, format: config.format });
        } catch (error) {
            alert("Failed to export PDF: " + error.message);
        }
    };

    const handleSaveRecord = () => {
        // Quick mock save
        if (!studentInfo.name) {
            alert("Please enter student name.");
            return;
        }
        const record = {
            studentName: studentInfo.name,
            rollNo: studentInfo.rollNo,
            percentage,
            date: new Date().toISOString()
        };
        const stored = JSON.parse(localStorage.getItem('savedRecords') || '[]');
        localStorage.setItem('savedRecords', JSON.stringify([record, ...stored]));
        alert("Record Saved Successfully!");
    };

    return (
        <div className="flex h-full font-sans">
            {/* LEFT COLUMN: Data Entry & Configuration */}
            <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto p-6 space-y-8 flex-shrink-0">

                {/* Customization Panel */}
                <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Appearance & Customization</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Theme</label>
                            <select
                                title="Theme"
                                className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm text-gray-700 outline-none focus:border-blue-500"
                                value={config.theme} onChange={(e) => setConfig({ ...config, theme: e.target.value })}
                            >
                                <option value="ProfessionalBlue">Professional Blue</option>
                                <option value="ElegantGold">Elegant Gold</option>
                                <option value="ModernMinimalist">Modern Minimalist</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Font Family</label>
                                <select
                                    title="Font Family"
                                    className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm text-gray-700 outline-none focus:border-blue-500"
                                    value={config.fontFamily} onChange={(e) => setConfig({ ...config, fontFamily: e.target.value })}
                                >
                                    <option value="Inter">Inter (Sans)</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Playfair Display">Playfair (Serif)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Layout</label>
                                <select
                                    title="Layout"
                                    className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm text-gray-700 outline-none focus:border-blue-500"
                                    value={config.layout} onChange={(e) => setConfig({ ...config, layout: e.target.value })}
                                >
                                    <option value="portrait">Portrait</option>
                                    <option value="landscape">Landscape</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Forms */}
                <section className="space-y-6">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 pb-2">Report Data</h3>

                    {/* School Info */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-gray-600">School Information</h4>
                        <input type="text" placeholder="School Name" className="w-full text-sm border-b border-gray-300 py-1 px-2 focus:border-blue-500 outline-none bg-transparent" value={schoolInfo.name} onChange={e => setSchoolInfo({ ...schoolInfo, name: e.target.value })} />
                        <input type="text" placeholder="Address" className="w-full text-sm border-b border-gray-300 py-1 px-2 focus:border-blue-500 outline-none bg-transparent" value={schoolInfo.address} onChange={e => setSchoolInfo({ ...schoolInfo, address: e.target.value })} />

                        <div className="pt-2">
                            <label className="flex items-center space-x-2 cursor-pointer text-sm text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 rounded-lg p-2 px-3 w-fit">
                                <ImageIcon size={16} />
                                <span>Upload School Logo</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                            </label>
                        </div>
                    </div>

                    {/* Student Info */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-600">Student Information</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="Student Name" className="w-full text-sm border border-gray-200 rounded-lg py-1.5 px-3 focus:border-blue-500 outline-none" value={studentInfo.name} onChange={e => setStudentInfo({ ...studentInfo, name: e.target.value })} />
                            <input type="text" placeholder="Roll No" className="w-full text-sm border border-gray-200 rounded-lg py-1.5 px-3 focus:border-blue-500 outline-none" value={studentInfo.rollNo} onChange={e => setStudentInfo({ ...studentInfo, rollNo: e.target.value })} />
                            <input type="text" placeholder="Class / Section" className="w-full text-sm border border-gray-200 rounded-lg py-1.5 px-3 focus:border-blue-500 outline-none" value={studentInfo.class} onChange={e => setStudentInfo({ ...studentInfo, class: e.target.value })} />
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center space-x-2 cursor-pointer text-sm text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 rounded-lg p-2 px-3 w-fit">
                                <ImageIcon size={16} />
                                <span>Upload Student Photo</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                            </label>
                        </div>
                    </div>

                    {/* Subjects Component */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-semibold text-gray-600">Academic Scores</h4>
                            <button onClick={addSubject} className="text-xs flex flex-row items-center space-x-1 text-blue-600 font-medium hover:text-blue-800"><Plus size={14} /> <span>Add</span></button>
                        </div>

                        <div className="space-y-2">
                            {subjects.map((sub, index) => (
                                <div key={sub.id} className="flex space-x-2 items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                                    <input type="text" placeholder="Subject" className="w-full text-xs border border-gray-200 rounded py-1 px-2 focus:border-blue-500 outline-none" value={sub.name} onChange={e => handleSubjectChange(sub.id, 'name', e.target.value)} />
                                    <input type="number" placeholder="Max" className="w-16 text-xs border border-gray-200 rounded py-1 px-2 focus:border-blue-500 outline-none" value={sub.totalMarks} onChange={e => handleSubjectChange(sub.id, 'totalMarks', e.target.value)} />
                                    <input type="number" placeholder="Obtained" className="w-20 text-xs border border-gray-200 rounded py-1 px-2 focus:border-blue-500 outline-none font-semibold text-blue-700 bg-blue-50/50" value={sub.obtainedMarks} onChange={e => handleSubjectChange(sub.id, 'obtainedMarks', e.target.value)} />
                                    <button onClick={() => removeSubject(sub.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>

                        {/* Auto Calc Status */}
                        <div className="flex items-center justify-between bg-blue-600 text-white p-3 rounded-lg mt-4 shadow-sm">
                            <div className="text-sm">Total: <span className="font-bold">{totalObtainedMarks}/{totalMaxMarks}</span></div>
                            <div className="text-sm">Perc: <span className="font-bold">{percentage}%</span></div>
                            <div className="text-sm">Grade: <span className="font-bold text-yellow-300">{grade}</span></div>
                        </div>
                    </div>

                </section>
            </div>

            {/* RIGHT COLUMN: Live Preview */}
            <div className="flex-1 bg-gray-200 overflow-y-auto p-8 relative flex flex-col items-center">
                {/* Actions bar superimposed */}
                <div className="absolute top-4 right-4 flex space-x-3 z-10 sticky-top">
                    <button onClick={handleSaveRecord} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl text-sm font-medium text-gray-700 shadow border border-gray-100 hover:bg-gray-50 transition-colors">
                        <Save size={16} className="text-green-600" />
                        <span>Save Record</span>
                    </button>
                    <button onClick={handleExport} className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-xl text-sm font-medium text-white shadow-md shadow-blue-500/30 hover:bg-blue-700 transition-colors">
                        <Download size={16} />
                        <span>Export PDF</span>
                    </button>
                </div>

                <div className="mt-6 w-full flex justify-center">
                    <LivePreview
                        school={schoolInfo}
                        student={studentInfo}
                        subjects={subjects}
                        metrics={{ totalMaxMarks, totalObtainedMarks, percentage, grade }}
                        config={config}
                    />
                </div>
            </div>
        </div>
    );
}
