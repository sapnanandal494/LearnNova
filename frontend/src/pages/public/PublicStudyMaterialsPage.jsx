import React, { useState, useEffect } from 'react';
import { materialService } from '../../api/api';
import UploadMaterialModal from '../../components/dashboard/UploadMaterialModal';

export default function PublicStudyMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');

  const fetchMaterials = () => {
    materialService.getMaterials({ search, subject: selectedSubject !== 'All' ? selectedSubject : undefined })
      .then((res) => {
        if (res?.data) setMaterials(res.data);
      })
      .catch((err) => console.warn('Could not load materials:', err));
  };

  useEffect(() => {
    fetchMaterials();
  }, [search, selectedSubject]);

  const handleDownload = async (doc) => {
    try {
      await materialService.downloadMaterial(doc.id);
      setDownloadMsg(`Downloading ${doc.title}...`);
      setTimeout(() => setDownloadMsg(''), 2500);
      fetchMaterials();
    } catch {
      setDownloadMsg(`Downloading ${doc.title}...`);
      setTimeout(() => setDownloadMsg(''), 2500);
    }
  };

  return (
    <div className="w-full flex flex-col pt-[106px] min-h-screen bg-surface">
      
      {/* Toast Alert */}
      {downloadMsg && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[24px]">download_done</span>
          <span className="text-sm font-bold">{downloadMsg}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <section className="relative overflow-hidden bg-surface-container-low px-4 sm:px-6 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex items-center gap-2 text-outline font-label-md text-xs mb-3">
            <span className="hover:text-primary cursor-pointer">Academics</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Study Materials & Digital Repository</span>
            <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Sync Active • Fall 2024 Archive Index
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline-lg text-3xl font-extrabold text-on-surface tracking-tight">
                Study Materials & Academic Archive
              </h1>
              <p className="font-body-md text-sm text-secondary mt-1 max-w-2xl">
                Access curated lecture notes, computational notebooks, faculty exam keys, and automated AI study synthesis.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md hover:bg-primary-container transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                <span>+ Upload Document</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline block">Total Documents</span>
                <span className="font-headline-md text-xl font-bold text-on-surface mt-0.5">1,420</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">folder_copy</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline block">Course Modules</span>
                <span className="font-headline-md text-xl font-bold text-on-surface mt-0.5">84 Syllabus Packs</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline block">AI Synthesis Notes</span>
                <span className="font-headline-md text-xl font-bold text-tertiary mt-0.5">380 Flash Guides</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">neurology</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline block">Verified Faculty Keys</span>
                <span className="font-headline-md text-xl font-bold text-emerald-600 mt-0.5">100% Peer Vetted</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVE DOCUMENT LISTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
          <div className="relative w-full sm:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, syllabus code (e.g. CS-402)..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-slate-200 w-full sm:w-auto overflow-x-auto">
            {['All', 'AI & Data Science', 'Computer Science', 'Mathematics'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubject === s
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Table / Card List */}
        <div className="bg-surface-container-lowest rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {materials.map((doc) => (
              <div
                key={doc.id}
                className="p-5 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <span className="material-symbols-outlined text-[26px]">
                      {doc.isAiGenerated ? 'psychology' : 'description'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] font-bold">
                        {doc.courseCode}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{doc.subject}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">
                        {doc.fileType} • {doc.fileSize}
                      </span>
                      {doc.isAiGenerated && (
                        <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold">
                          ✨ AI Study Synthesis
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface mt-1">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Author: {doc.author}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <span className="text-xs text-slate-400 font-medium">
                    {doc.downloads} downloads
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container text-primary hover:bg-primary hover:text-white font-semibold text-xs transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      <UploadMaterialModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => fetchMaterials()}
      />
    </div>
  );
}
