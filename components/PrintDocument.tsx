'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { siteData } from '@/lib/data'

/**
 * Versi cetak / PDF (tombol "PDF" di header). Hanya tampil saat mencetak (@media print di globals.css);
 * di layar disembunyikan sehingga tampilan situs tidak berubah.
 * 9 halaman A4 lanskap dengan irama visual: halaman gelap, hijau penuh, foto, motif gelombang dari situs,
 * dan huruf Oswald raksasa. Isi dari kamus yang sama dengan situs.
 */
const INK = '#0a0a0a'
const PAPER = '#f0f0f0'
const EM = '#10b981'
const EMB = '#34d399'
const EMD = '#047857'
const EMX = '#022c22'
const G = '#059669'
const MUTED = '#5c5c5c'
const OSW = 'var(--font-oswald), Impact, sans-serif'

const TOTAL = 9
const PH = '209.6mm' // tinggi halaman
const HAS_PHOTO = new Set([1, 2, 3, 4, 5, 6, 7, 8])

function Waves({ c, o }: { c: string; o: number }) {
  return (
    <svg viewBox="0 0 1440 800" preserveAspectRatio="none" style={{ position: 'absolute', left: '-14mm', top: '-13mm', width: '297mm', height: PH, opacity: o }} fill="none" stroke={c} role="presentation">
      <path d="M0 200C300 100 400 300 720 200C1040 100 1140 300 1440 200" strokeWidth="2.4" />
      <path d="M0 400C300 300 400 500 720 400C1040 300 1140 500 1440 400" strokeWidth="2.4" />
      <path d="M0 600C300 500 400 700 720 600C1040 500 1140 700 1440 600" strokeWidth="2.4" />
    </svg>
  )
}

function Page({ n, bg, color = INK, waves, footer = MUTED, children }: { n: number; bg: string; color?: string; waves?: { c: string; o: number }; footer?: string; children: ReactNode }) {
  return (
    <section className="pd-page" style={{ background: bg, color }}>
      <div className="pd-body">
        {waves ? <Waves c={waves.c} o={waves.o} /> : null}
        {children}
      </div>
      <footer className="pd-foot" style={{ color: footer, borderColor: footer, zIndex: 5 }}>
        <span>APT. MARIA SIXSPRI MAGDALENA, S.FARM</span>
        <span>{String(n).padStart(2, '0')} / {TOTAL}</span>
      </footer>
    </section>
  )
}

const Bleed = ({ x, w, children, style }: { x: string; w: string; children?: ReactNode; style?: CSSProperties }) => (
  <div style={{ position: 'absolute', left: x, top: '-13mm', width: w, height: PH, overflow: 'hidden', ...style }}>{children}</div>
)

// judul raksasa ala hero situs: SVG supaya gradien memudar tercetak bersih dan lebarnya pas
function Giant({ text, id, em, fade = 0.92, c1 = '#0cae7b' }: { text: string; id: string; em: number; fade?: number; c1?: string }) {
  const W = 1000
  const cap = em * 0.76
  const H = Math.round(cap + em * 0.1)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }} role="presentation">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="0.38" stopColor={c1} />
          <stop offset={fade} stopColor={c1} stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x="0" y={cap + em * 0.04} textLength={W} lengthAdjust="spacingAndGlyphs" fill={`url(#${id})`} style={{ fontFamily: OSW, fontWeight: 700, fontSize: em }}>{text}</text>
    </svg>
  )
}

const Outline = ({ children, size, color = '#fff', style }: { children: ReactNode; size: string; color?: string; style?: CSSProperties }) => (
  <span style={{ fontFamily: OSW, fontWeight: 700, fontSize: size, lineHeight: 1, color: 'transparent', WebkitTextStroke: `0.35mm ${color}`, ...style }}>{children}</span>
)

const Photo = ({ src, h, w, pos = 'center', fit = 'cover', style }: { src: string; h: string | number; w?: string | number; pos?: string; fit?: 'cover' | 'contain'; style?: CSSProperties }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt="" style={{ width: w ?? '100%', height: h, objectFit: fit, objectPosition: pos, display: 'block', ...style }} />
)

const Label = ({ children, c = G }: { children: ReactNode; c?: string }) => (
  <p style={{ fontSize: 7.5, letterSpacing: '0.26em', fontWeight: 700, color: c, textTransform: 'uppercase' }}>{children}</p>
)

export default function PrintDocument() {
  const { t } = useLanguage()
  const dash = (s: string) => s.replace(/\s—\s/g, ' – ')

  const WorkCard = ({ i, dark }: { i: number; dark: boolean }) => (
    <div>
      <div style={{ position: 'relative', marginBottom: '5mm' }}>
        <div style={{ position: 'absolute', left: '2.5mm', top: '2.5mm', right: '-2.5mm', bottom: '-2.5mm', background: EM, borderRadius: '4mm', opacity: dark ? 0.9 : 1 }} />
        {HAS_PHOTO.has(i) ? (
          <Photo src={`/galeri/work-${i}-1.jpg`} h="64mm" style={{ position: 'relative', borderRadius: '4mm' }} />
        ) : (
          <div style={{ position: 'relative', height: '64mm', borderRadius: '4mm', background: `linear-gradient(140deg, ${EM} 0%, ${EMD} 100%)`, overflow: 'hidden' }}>
            <Outline size="70pt" color="rgba(255,255,255,.7)" style={{ position: 'absolute', right: '3mm', bottom: '-2mm' }}>{String(i).padStart(2, '0')}</Outline>
          </div>
        )}
        <span style={{ position: 'absolute', left: '3mm', top: '3mm', background: INK, color: '#fff', fontFamily: OSW, fontWeight: 600, fontSize: '12pt', padding: '0.8mm 3.4mm', borderRadius: 99 }}>{String(i).padStart(2, '0')}</span>
      </div>
      <p style={{ fontFamily: OSW, fontSize: '15pt', fontWeight: 600, color: dark ? EMB : G, lineHeight: 1 }}>{dash(t(`work.${i}.period`))}</p>
      <h3 style={{ fontSize: '11.5pt', fontWeight: 800, marginTop: 4, lineHeight: 1.15 }}>{t(`work.${i}.inst`)}</h3>
      <p style={{ fontSize: '9pt', fontWeight: 700, color: dark ? '#a7f3d0' : MUTED, marginTop: 2, lineHeight: 1.3 }}>{t(`work.${i}.role`)} · {t(`work.${i}.loc`)}</p>
      <ul style={{ marginTop: 5, paddingLeft: 11, fontSize: '8.2pt', lineHeight: 1.42, listStyle: 'square', color: dark ? '#ecfdf5' : '#222' }}>
        {t(`work.${i}.desc`).split('|').map((b) => <li key={b} style={{ marginBottom: 2 }}>{b}</li>)}
      </ul>
      <p style={{ fontSize: '7.6pt', fontWeight: 700, lineHeight: 1.45, marginTop: 5, color: dark ? EMB : G }}>{t(`work.${i}.tags`).split('|').join('  ·  ')}</p>
    </div>
  )

  const WorkHead = ({ dark, range }: { dark: boolean; range: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <Label c={dark ? EMB : G}>{t('work.label')}</Label>
        <h2 style={{ fontFamily: OSW, fontSize: '28pt', fontWeight: 700, lineHeight: 1.02, textTransform: 'uppercase', marginTop: 3 }}>{t('work.title')}</h2>
      </div>
      <p style={{ fontSize: '8.4pt', lineHeight: 1.5, maxWidth: '86mm', color: dark ? '#d1fae5' : '#444', marginBottom: 2 }}>{t('work.subtitle')}</p>
      <Outline size="42pt" color={dark ? EMB : EM}>{range}</Outline>
    </div>
  )

  return (
    <div className="print-doc" aria-hidden="true">
      {/* 1. Sampul */}
      <Page n={1} bg={INK} color="#fff" waves={{ c: EM, o: 0.18 }} footer="#8a8a8a">
        <div style={{ position: 'absolute', left: '50%', bottom: '-30mm', width: '170mm', height: '170mm', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,.62) 0%, rgba(16,185,129,.18) 48%, rgba(16,185,129,0) 70%)' }} />
        <div style={{ position: 'relative', height: '100%' }}>
          <p style={{ position: 'absolute', top: 0, left: 0, fontSize: 8, letterSpacing: '0.3em', fontWeight: 700, color: EMB }}>{t('hero.based1')} · {t('hero.based2')}</p>
          <p style={{ position: 'absolute', top: 0, right: 0, fontSize: 8, letterSpacing: '0.3em', fontWeight: 700, color: '#bdbdbd' }}>2026</p>
          <div style={{ position: 'absolute', top: '9mm', left: 0, right: 0 }}><Giant text="PORTFOLIO" id="gpf" em={222} c1={EMB} /></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/profile.png" alt="" style={{ position: 'absolute', left: '50%', bottom: '3mm', transform: 'translateX(-50%)', height: '128mm', width: 'auto' }} />
          <div style={{ position: 'absolute', left: 0, bottom: '9mm', width: '88mm' }}>
            <p style={{ fontSize: '11pt', color: '#bdbdbd' }}>{t('hero.hey')}</p>
            <p style={{ fontFamily: OSW, fontSize: '23pt', fontWeight: 700, lineHeight: 1.05, textTransform: 'uppercase', marginTop: 2 }}>apt. Maria Sixspri<br />Magdalena, S.Farm</p>
            <p style={{ fontSize: '9.4pt', lineHeight: 1.5, marginTop: 8, maxWidth: '82mm', color: '#e5e5e5' }}>{t('hero.tagline')}</p>
          </div>
          <div style={{ position: 'absolute', right: 0, bottom: '9mm', width: '80mm', textAlign: 'right' }}>
            <p style={{ fontFamily: OSW, fontSize: '22pt', fontWeight: 600, lineHeight: 1.05, textTransform: 'uppercase', color: EMB }}>{t('hero.role1')}</p>
            <p style={{ fontSize: '9.4pt', color: '#e5e5e5', marginTop: 5 }}>{t('hero.role2')}</p>
            <p style={{ fontSize: '8.6pt', color: '#a3a3a3', marginTop: 9, lineHeight: 1.6 }}>{t('hero.badge.major')}<br />{t('hero.badge.medal')}<br />{t('hero.badge.event')}</p>
          </div>
        </div>
      </Page>

      {/* 2. Tentang */}
      <Page n={2} bg={PAPER} waves={{ c: '#0a0a0a', o: 0.05 }} footer="#3a3a3a">
        <Bleed x="-14mm" w="126mm" style={{ background: `linear-gradient(165deg, ${EM} 0%, ${EMD} 100%)` }}>
          <svg viewBox="0 0 400 700" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} fill="none" stroke="#fff"><path d="M-20 120C120 60 180 220 420 150" strokeWidth="2" /><path d="M-20 300C120 240 180 400 420 330" strokeWidth="2" /><path d="M-20 480C120 420 180 580 420 510" strokeWidth="2" /></svg>
        </Bleed>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '98mm 1fr', gap: '22mm', height: '100%' }}>
          <div style={{ color: '#fff' }}>
            <Label c={INK}>{t('about.label')}</Label>
            <h2 style={{ fontFamily: OSW, fontSize: '31pt', fontWeight: 700, lineHeight: 1.02, textTransform: 'uppercase', marginTop: 4 }}>{t('about.title')}</h2>
            <p style={{ fontSize: '9.4pt', lineHeight: 1.6, marginTop: 14, textAlign: 'justify', color: '#f0fdf4' }}>{t('about.bio1')}</p>
            <p style={{ fontSize: '11pt', fontStyle: 'italic', lineHeight: 1.45, marginTop: 14, padding: '3mm 0 0', borderTop: '1px solid rgba(255,255,255,.55)', color: '#fff' }}>{t('about.quote')}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5mm' }}>
              {[['ipk', '3,33'], ['medal', '3,50'], ['org', '8'], ['toefl', '6']].map(([k, v]) => (
                <div key={k} style={{ background: INK, color: '#fff', borderRadius: '5mm', padding: '5mm 6mm' }}>
                  <p style={{ fontFamily: OSW, fontSize: '40pt', fontWeight: 700, lineHeight: 1, color: EMB }}>{v}</p>
                  <p style={{ fontSize: 7.4, letterSpacing: '0.12em', fontWeight: 800, marginTop: 6 }}>{t(`metric.${k}`)}</p>
                  <p style={{ fontSize: '8pt', color: '#a3a3a3', marginTop: 2, lineHeight: 1.35 }}>{t(`metric.${k}.sub`)}</p>
                </div>
              ))}
            </div>
            <div>
              <Label>{t('trait.card.label')}</Label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '7mm', rowGap: '4mm', marginTop: 6 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '8mm 1fr', gap: '2mm' }}>
                    <span style={{ width: '8mm', height: '8mm', borderRadius: '50%', background: EM, color: INK, fontFamily: OSW, fontWeight: 700, fontSize: '11pt', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i}</span>
                    <div>
                      <p style={{ fontSize: '11pt', fontWeight: 800, lineHeight: 1.1 }}>{t(`trait.${i}.title`)}</p>
                      <p style={{ fontSize: '8.4pt', lineHeight: 1.45, color: '#333', marginTop: 2 }}>{t(`trait.${i}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: INK, color: '#fff', borderRadius: 99, padding: '3mm 6mm', display: 'flex', gap: '6mm', alignItems: 'center' }}>
              <p style={{ fontSize: 7, letterSpacing: '0.2em', fontWeight: 800, color: EMB, width: '22mm' }}>{t('about.current.label')}</p>
              {[1, 2, 3].map((i) => <p key={i} style={{ fontSize: '8.4pt', lineHeight: 1.3, flex: 1 }}><b>{t(`about.current.${i}.title`)}</b></p>)}
            </div>
          </div>
        </div>
      </Page>

      {/* 3. Pendidikan: dua foto penuh */}
      <Page n={3} bg={INK} color="#fff" footer="#d4d4d4">
        {[1, 2].map((i) => (
          <Bleed key={i} x={i === 1 ? '-14mm' : '134.5mm'} w="148.5mm">
            <Photo src={`/galeri/edu-${i}-1.jpg`} h="100%" pos={i === 1 ? 'center 18%' : 'center 22%'} style={{ position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.1) 28%, rgba(0,0,0,.8) 56%, rgba(0,0,0,.95) 100%)' }} />
            <div style={{ position: 'absolute', left: '14mm', top: '30mm', right: '10mm' }}>
              <Outline size="62pt">{dash(t(`education.${i}.period`))}</Outline>
            </div>
            <div style={{ position: 'absolute', left: '14mm', right: '12mm', bottom: '17mm' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5mm' }}>
                <div style={{ width: '25mm', height: '25mm', borderRadius: '50%', background: EM, color: INK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 'none', transform: 'rotate(-8deg)' }}>
                  <span style={{ fontFamily: OSW, fontWeight: 700, fontSize: '16pt', lineHeight: 1 }}>{t(`education.${i}.gpa`).split(' / ')[0]}</span>
                  <span style={{ fontSize: 5.6, letterSpacing: '0.12em', fontWeight: 800, marginTop: 2 }}>{t('education.gpa.label')}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: OSW, fontSize: '19pt', fontWeight: 700, lineHeight: 1.02, textTransform: 'uppercase' }}>{t(`education.${i}.institution`)}</h3>
                  <p style={{ fontSize: '11pt', fontWeight: 700, color: EMB, marginTop: 3 }}>{t(`education.${i}.program`)} · {t(`education.${i}.degree`)}</p>
                </div>
              </div>
              <p style={{ fontSize: '8.8pt', lineHeight: 1.52, marginTop: 8, color: '#f0f0f0', textAlign: 'justify' }}>{t(`education.${i}.desc`)}</p>
              <ul style={{ marginTop: 6, paddingLeft: 12, fontSize: '8.4pt', lineHeight: 1.42, listStyle: 'square', color: '#d4d4d4' }}>
                {[1, 2, 3, 4].map((h) => (t(`education.${i}.h${h}`) ? <li key={h} style={{ marginBottom: 1 }}>{t(`education.${i}.h${h}`)}</li> : null))}
              </ul>
            </div>
          </Bleed>
        ))}
        <div style={{ position: 'absolute', left: '50%', top: '4mm', transform: 'translateX(-50%) rotate(-2deg)', background: EM, color: INK, borderRadius: 99, padding: '2mm 9mm', fontFamily: OSW, fontWeight: 700, fontSize: '16pt', letterSpacing: '0.1em', textTransform: 'uppercase', zIndex: 3, whiteSpace: 'nowrap' }}>{t('education.title')}</div>
      </Page>

      {/* 4–6. PKPA dan magang */}
      <Page n={4} bg={PAPER} waves={{ c: '#0a0a0a', o: 0.07 }}>
        <WorkHead dark={false} range="01–03" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8mm', marginTop: '7mm', zoom: 1.12 } as CSSProperties}>
          {[1, 2, 3].map((k) => <WorkCard key={k} i={k} dark={false} />)}
        </div>
      </Page>
      <Page n={5} bg={`linear-gradient(160deg, ${EMD} 0%, ${EMX} 100%)`} color="#fff" waves={{ c: '#6ee7b7', o: 0.14 }} footer="#6ee7b7">
        <WorkHead dark range="04–06" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8mm', marginTop: '7mm', zoom: 1.12 } as CSSProperties}>
          {[4, 5, 6].map((k) => <WorkCard key={k} i={k} dark />)}
        </div>
      </Page>
      <Page n={6} bg={PAPER} waves={{ c: '#0a0a0a', o: 0.07 }}>
        <WorkHead dark={false} range="07–08" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8mm', marginTop: '7mm', zoom: 1.12 } as CSSProperties}>
          {[7, 8].map((k) => <WorkCard key={k} i={k} dark={false} />)}
          <div style={{ position: 'relative', borderRadius: '4mm', overflow: 'hidden', background: `linear-gradient(160deg, ${EM} 0%, ${EMD} 100%)`, height: '140mm' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/profile.png" alt="" style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', height: '124mm', width: 'auto' }} />
            <p style={{ position: 'absolute', left: '5mm', top: '5mm', right: '5mm', fontFamily: OSW, fontSize: '15pt', fontWeight: 700, color: '#fff', lineHeight: 1.1, textTransform: 'uppercase' }}>apt. Maria Sixspri Magdalena</p>
          </div>
        </div>
      </Page>

      {/* 7. Sertifikasi */}
      <Page n={7} bg={`linear-gradient(160deg, ${EMD} 0%, ${EMX} 100%)`} color="#fff" waves={{ c: '#6ee7b7', o: 0.14 }} footer="#6ee7b7">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <Label c={EMB}>{t('awards.label')}</Label>
            <h2 style={{ fontFamily: OSW, fontSize: '27pt', fontWeight: 700, lineHeight: 1.02, textTransform: 'uppercase', marginTop: 3 }}>{t('awards.title')}</h2>
          </div>
          <p style={{ fontSize: '8.6pt', color: '#d1fae5', maxWidth: '96mm', lineHeight: 1.5, textAlign: 'right' }}>{t('awards.sub')}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '7mm 9mm', marginTop: '6mm' }}>
          {[4, 5, 6, 1, 2, 3].map((i) => (
            <div key={i}>
              {i !== 2 ? (
                <div style={{ background: '#fff', padding: '2mm', transform: `rotate(${[0.8, 0, -0.9, -1.2, 1, -0.8][i - 1]}deg)`, boxShadow: '0 3mm 6mm rgba(0,0,0,.32)' }}>
                  <Photo src={`/galeri/cert-${i}.jpg`} h="38mm" fit="contain" style={{ background: '#fff' }} />
                </div>
              ) : (
                <div style={{ height: 'calc(38mm + 4mm)', border: `1px solid ${EMB}`, borderRadius: '3mm', background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4mm' }}>
                  <p style={{ fontFamily: OSW, fontSize: '15pt', fontWeight: 700, lineHeight: 1.1, textTransform: 'uppercase', color: EMB }}>{t(`award.${i}.cat`)}</p>
                </div>
              )}
              <p style={{ fontSize: 6.6, letterSpacing: '0.14em', fontWeight: 800, color: EMB, marginTop: 8 }}>{t(`award.${i}.cat`)} · {t(`award.${i}.year`)}</p>
              <h3 style={{ fontSize: '9.8pt', fontWeight: 800, lineHeight: 1.25, marginTop: 2 }}>{t(`award.${i}.title`)}</h3>
              <p style={{ fontSize: '8pt', fontWeight: 700, color: '#a7f3d0', marginTop: 2, lineHeight: 1.3 }}>{t(`award.${i}.issuer`)}</p>
              <p style={{ fontSize: '8pt', lineHeight: 1.38, color: '#ecfdf5', marginTop: 2 }}>{t(`award.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </Page>

      {/* 8. Kemampuan */}
      <Page n={8} bg={PAPER} waves={{ c: '#0a0a0a', o: 0.05 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '124mm 1fr', gap: '12mm', height: '100%', zoom: 1.04 } as CSSProperties}>
          <div style={{ background: INK, color: '#fff', borderRadius: '6mm', padding: '9mm', alignSelf: 'start' }}>
            <Label c={EMB}>{t('skills.label')}</Label>
            <h2 style={{ fontFamily: OSW, fontSize: '27pt', fontWeight: 700, lineHeight: 1.02, textTransform: 'uppercase', marginTop: 3 }}>{t('skills.title')}</h2>
            <p style={{ fontSize: '10pt', lineHeight: 1.5, marginTop: 8, color: '#f0f0f0', fontWeight: 600 }}>{t('skills.desc')}</p>
            {[1, 2].map((i) => (
              <div key={i} style={{ marginTop: '7mm' }}>
                <p style={{ fontSize: 7.6, letterSpacing: '0.18em', fontWeight: 800, color: EMB }}>{t(`skills.card${i}.tag`)}</p>
                <p style={{ fontSize: '9pt', lineHeight: 1.55, marginTop: 4, color: '#d4d4d4' }}>{t(`skills.card${i}.desc`)}</p>
                <p style={{ fontSize: '8.6pt', lineHeight: 1.7, marginTop: 5, color: '#fff', fontWeight: 600 }}>
                  {t(`skills.card${i}.tags`).split('|').map((x, k, a) => <span key={x}>{x}{k < a.length - 1 ? <span style={{ color: EM }}> / </span> : null}</span>)}
                </p>
              </div>
            ))}
          </div>
          <div>
            <Label>{t('personal.label')}</Label>
            <h2 style={{ fontFamily: OSW, fontSize: '25pt', fontWeight: 700, lineHeight: 1.02, textTransform: 'uppercase', marginTop: 3 }}>{t('personal.title')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3mm 6mm', marginTop: '5mm' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i}>
                  <Outline size="15pt" color={EM} style={{ display: 'block', marginBottom: 2 }}>{String(i).padStart(2, '0')}</Outline>
                  <p style={{ fontSize: '10pt', fontWeight: 800, lineHeight: 1.2 }}>{t(`personal.soft.${i}.t`)}</p>
                  <div style={{ borderTop: `2px solid ${EM}`, marginTop: 3 }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '6mm' }}>
              <Label>{t('personal.hard.label')}</Label>
              <div style={{ borderTop: '1px solid rgba(0,0,0,.22)', padding: '2.4mm 0', marginTop: 5 }}>
                <p style={{ fontSize: '10pt', fontWeight: 800 }}>{t('personal.sw.1.n')}</p>
                <p style={{ fontSize: '8.6pt', color: '#333', marginTop: 1 }}>{t('personal.sw.1.d')}</p>
              </div>
            </div>
          </div>
        </div>
      </Page>

      {/* 9. Kontak */}
      <Page n={9} bg={INK} color="#fff" waves={{ c: EM, o: 0.18 }} footer="#8a8a8a">
        <div style={{ position: 'absolute', right: '-10mm', bottom: '-34mm', width: '150mm', height: '150mm', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,.6) 0%, rgba(16,185,129,.16) 50%, rgba(16,185,129,0) 70%)' }} />
        <div style={{ position: 'relative', height: '100%' }}>
          <Label c={EMB}>{t('contact.label')}</Label>
          <div style={{ width: '236mm', marginTop: 6 }}><Giant text={t('contact.title').toUpperCase()} id="gct" em={165} fade={1} c1={EMB} /></div>
          <p style={{ fontSize: '11.5pt', lineHeight: 1.5, marginTop: 10, maxWidth: '125mm', fontWeight: 700 }}>{t('contact.tagline')}</p>
          <p style={{ fontSize: '9.4pt', lineHeight: 1.55, marginTop: 6, maxWidth: '125mm', color: '#cfcfcf' }}>{t('contact.subtitle')}</p>
          <div style={{ marginTop: '9mm', width: '128mm', display: 'grid', gap: '3mm' }}>
            {[
              ['EMAIL', siteData.email],
              ['WHATSAPP', siteData.phone],
              [t('contact.location'), siteData.location],
            ].map(([k, v], idx) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '28mm 1fr', alignItems: 'center', border: `1px solid ${EM}`, borderRadius: 99, padding: '2.8mm 6mm', background: idx === 0 ? EM : 'rgba(255,255,255,.04)', color: idx === 0 ? INK : '#fff' }}>
                <p style={{ fontSize: 7, letterSpacing: '0.2em', fontWeight: 800, color: idx === 0 ? INK : EMB }}>{k}</p>
                <p style={{ fontSize: '11pt', fontWeight: 700 }}>{v}</p>
              </div>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/profile.png" alt="" style={{ position: 'absolute', right: '10mm', bottom: 0, height: '128mm', width: 'auto' }} />
        </div>
      </Page>
    </div>
  )
}
