// src/pages/jd-extractor/components/JdResultCardView.tsx
import type { FC } from 'react'
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Tag,
  Layers,
  UserCheck,
  Flame,
} from 'lucide-react'
import type { JdExtractionResult } from '@/types/jd.types'

interface JdResultCardViewProps {
  data: JdExtractionResult
}

export const JdResultCardView: FC<JdResultCardViewProps> = ({ data }) => {
  const {
    job_title,
    company_name,
    location,
    employment_type,
    department,
    experience,
    skills,
    education,
    key_responsibilities = [],
    ats_keywords = [],
  } = data

  const mustHave = skills?.must_have_tech_skills || []
  const niceToHave = skills?.nice_to_have_tech_skills || []
  const softSkills = skills?.soft_skills || []
  const preferredFields = education?.preferred_fields || []

  return (
    <div className="space-y-6">
      {/* 1. Header Overview Card */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-6 dark:border-emerald-500/30 dark:from-emerald-950/40 dark:via-slate-900">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Extracted Job Role</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {job_title || 'Untitled Role'}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-600 dark:text-slate-300">
              {company_name && company_name !== 'Not Specified' && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {company_name}
                </span>
              )}
              {location && location !== 'Not Specified' && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {location}
                </span>
              )}
              {department && department !== 'Not Specified' && (
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {department}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur shadow-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
              <Briefcase className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              {employment_type || 'Not Specified'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Grid: Experience & Education */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Experience Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-sm">
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
            <span>Experience Requirements</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">Required Experience</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {experience?.min_years !== undefined
                  ? experience.max_years
                    ? `${experience.min_years} - ${experience.max_years} yrs`
                    : `${experience.min_years}+ yrs`
                  : 'Not specified'}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">Freshers Eligible?</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  experience?.is_fresher_allowed
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                <UserCheck className="h-3 w-3" />
                {experience?.is_fresher_allowed ? 'Yes, Freshers Welcome' : 'No / Not Mentioned'}
              </span>
            </div>
          </div>
        </div>

        {/* Education Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-sm">
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span>Education</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">Minimum Degree</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {education?.minimum_degree || 'Not Specified'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1.5">
                Preferred Fields
              </span>
              {preferredFields.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {preferredFields.map((field, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-slate-400 dark:text-slate-500 italic">None specified</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Skills Matrix Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 space-y-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <Flame className="h-4 w-4" />
          </div>
          <span>Skills Breakdown</span>
        </h3>

        {/* Must-have skills */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Must-Have Technical Skills ({mustHave.length})
            </span>
          </div>
          {mustHave.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {mustHave.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">No specific must-have skills identified</p>
          )}
        </div>

        {/* Nice-to-have skills */}
        {niceToHave.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-2">
              Nice-To-Have Skills ({niceToHave.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {niceToHave.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-lg bg-cyan-50 border border-cyan-200 px-2.5 py-1 text-xs font-medium text-cyan-800 dark:bg-cyan-950/40 dark:border-cyan-800/60 dark:text-cyan-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Soft skills */}
        {softSkills.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Soft Skills & Traits ({softSkills.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Key Responsibilities */}
      {key_responsibilities.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
            <div className="rounded-lg bg-teal-500/10 p-2 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <span>Key Responsibilities ({key_responsibilities.length})</span>
          </h3>
          <ul className="space-y-2.5">
            {key_responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. ATS Keywords Cloud */}
      {ats_keywords.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <div className="rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                <Tag className="h-4 w-4" />
              </div>
              <span>ATS Target Keywords ({ats_keywords.length})</span>
            </h3>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Critical for resume matching
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ats_keywords.map((kw, idx) => (
              <span
                key={idx}
                className="rounded-md border border-purple-200 bg-purple-50/60 px-2.5 py-1 text-xs font-medium text-purple-800 dark:border-purple-800/40 dark:bg-purple-950/30 dark:text-purple-300"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
