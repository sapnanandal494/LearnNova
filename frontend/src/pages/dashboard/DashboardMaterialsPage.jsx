import React, { useState, useEffect } from 'react';
import { materialService } from '../../api/api';
import UploadMaterialModal from '../../components/dashboard/UploadMaterialModal';

export default function DashboardMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');

  const fetchMaterials = () => {
    materialService.getMaterials({ search })
      .then((res) => {
        if (res?.data) setMaterials(res.data);
      })
      .catch((err) => console.warn('Could not load student materials:', err));
  };

  useEffect(() => {
    fetchMaterials();
  }, [search]);

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
    <div className="flex flex-col w-full gap-6 pb-16">
      
      {/* Toast Alert */}
      {downloadMsg && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[24px]">download_done</span>
          <span className="text-sm font-bold">{downloadMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-outline font-label-sm text-xs uppercase tracking-wider mb-1">
            <span>Academics</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Digital Archive & Notes</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Curriculum Documents & Research Archive
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-secondary mt-0.5">
            Access, download, and bookmark high-yield lecture summaries and notebook exercises.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md hover:bg-primary-container transition-all self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
          <span>+ Upload Student Note</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter notes by code or topic..."
          className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        />
      </div>

      {/* Document List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                  {doc.courseCode}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">
                  {doc.fileType} • {doc.fileSize}
                </span>
              </div>
              <h4 className="font-headline-sm text-sm font-bold text-on-surface line-clamp-1">{doc.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{doc.author}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">{doc.downloads} downloads</span>
              <button
                type="button"
                onClick={() => handleDownload(doc)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-white text-xs font-semibold transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <UploadMaterialModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => fetchMaterials()}
      />
    </div>
  );
}
