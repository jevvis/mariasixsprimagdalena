'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const palette = ['bg-emerald-600', 'bg-blue-600', 'bg-teal-600', 'bg-indigo-600', 'bg-cyan-700', 'bg-purple-600', 'bg-amber-600', 'bg-teal-700']
const colorFor = (tech: string) => palette[tech.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length]

const projects = [
  {
    number: '01',
    title: { id: "PKPA RSUD Koja", en: "PKPA at RSUD Koja" },
    description: { id: "Pelayanan resep, compounding, dispensing, PIO, dan konseling di rumah sakit, April — Mei 2026.", en: "Prescription service, compounding, dispensing, PIO, and counseling in a hospital, April — May 2026." },
    framework: "RSUD KOJA, JAKARTA UTARA",
    techStack: ["Rumah Sakit", "PIO"],
  },
  {
    number: '02',
    title: { id: "PKPA Industri Farmasi", en: "Pharmaceutical Industry PKPA" },
    description: { id: "CPOB, QC, dan QA (dokumentasi, validasi, deviasi, CAPA), Maret 2026.", en: "CPOB (GMP), QC, and QA (documentation, validation, deviations, CAPA), March 2026." },
    framework: "LAFI AD, BANDUNG",
    techStack: ["CPOB", "QC / QA"],
  },
  {
    number: '03',
    title: { id: "PKPA PBF", en: "PKPA at a Pharmaceutical Distributor" },
    description: { id: "Penerapan CDOB, penerimaan, penyimpanan, penyaluran, dan pengendalian stok, Februari 2026.", en: "CDOB (GDP) application, receiving, storage, distribution, and stock control, February 2026." },
    framework: "PBF NARITA KEI PHARMA, BOGOR",
    techStack: ["CDOB", "Distribusi"],
  },
  {
    number: '04',
    title: { id: "PKPA Puskesmas", en: "PKPA at a Health Center" },
    description: { id: "Pengkajian resep, compounding, dispensing, PIO, konseling, dan pengelolaan sediaan, Desember 2025 — Januari 2026.", en: "Prescription review, compounding, dispensing, PIO, counseling, and supply management, December 2025 — January 2026." },
    framework: "PUSKESMAS MEKAR WANGI, BOGOR",
    techStack: ["Puskesmas", "Konseling"],
  },
  {
    number: '05',
    title: { id: "PKPA Apotek", en: "PKPA at a Community Pharmacy" },
    description: { id: "Pelayanan resep, swamedikasi, konseling, PIO, dan pengelolaan perbekalan farmasi, November — Desember 2025.", en: "Prescription service, self-medication, counseling, PIO, and pharmaceutical supply management, November — December 2025." },
    framework: "APOTEK PUNYA KITA, BOGOR",
    techStack: ["Apotek", "Swamedikasi"],
  },
  {
    number: '06',
    title: { id: "Magang S1 di RS Anutapura Palu", en: "Bachelor Internship at RS Anutapura Palu" },
    description: { id: "Magang S1 Farmasi di rumah sakit, April — Mei 2024.", en: "Bachelor of Pharmacy internship at a hospital, April — May 2024." },
    framework: "RS ANUTAPURA PALU",
    techStack: ["Magang S1"],
  },
  {
    number: '07',
    title: { id: "Magang S1 di Puskesmas Mamboro", en: "Bachelor Internship at Puskesmas Mamboro" },
    description: { id: "PKL Farmakologi Klinik I, 4 — 30 Desember 2023.", en: "Field practice, Clinical Pharmacology I, 4 — 30 December 2023." },
    framework: "UPTD PUSKESMAS MAMBORO, PALU",
    techStack: ["Magang S1", "Puskesmas"],
  },
  {
    number: '08',
    title: { id: "Magang S1 di LAFI AD", en: "Bachelor Internship at LAFI AD" },
    description: { id: "PKL di bidang industri farmasi, Agustus — September 2023.", en: "Field practice in the pharmaceutical industry, August — September 2023." },
    framework: "LAFI AD, BANDUNG",
    techStack: ["Magang S1", "Industri"],
  },
]

export default function ProjectList() {
  const { lang } = useLanguage()
  const en = lang === 'en'

  return (
    <section id="technical" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] mb-3">{en ? 'PKPA & INTERNSHIP PORTFOLIO' : 'PORTOFOLIO PKPA & MAGANG'}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">{en ? 'Professional Practice & Internships' : 'Praktik Kerja Profesi & Magang'}</h2>
          <p className="text-[var(--muted)] text-sm max-w-lg">
            {en
              ? 'A record of pharmacist professional practice (PKPA) and bachelor-level internships across pharmacy, health center, hospital, industry, and distribution settings.'
              : 'Rekam jejak praktik kerja profesi apoteker (PKPA) dan magang S1 di apotek, puskesmas, rumah sakit, industri, dan distributor farmasi.'}
          </p>
        </div>

        <div className="divide-y divide-[var(--card-border)]">
          {projects.map((project) => (
            <div
              key={project.number}
              className="group flex items-start gap-4 md:gap-8 py-6 hover:bg-[var(--card-bg)] hover:px-4 rounded-lg transition-all duration-300"
            >
              <span className="text-[var(--muted)] text-sm font-semibold mt-1 shrink-0 w-8 font-sans">{project.number}</span>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-1">{project.title[lang]}</h3>
                <p className="text-[var(--muted)] text-sm mb-2 leading-relaxed">{project.description[lang]}</p>
                <p className="text-[var(--muted)] text-xs tracking-wider uppercase mb-3 font-semibold">{project.framework}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className={`px-2.5 py-1 rounded-md text-white text-[10px] font-semibold tracking-wide ${colorFor(tech)}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors mt-1 shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
