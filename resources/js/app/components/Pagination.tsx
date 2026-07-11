import React from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '../services/functions'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

/**
 * builds the list of page numbers to display,
 * inserting "..." when there are too many pages
 */
const getPages = (current: number, total: number): (number | "...")[] => {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages: (number | "...")[] = [1]

    if (current > 3) {
        pages.push("...")
    }

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (current < total - 2) {
        pages.push("...")
    }

    pages.push(total)
    return pages
}

const Pagination = (props: PaginationProps) => {
    const { t } = useTranslation()
    const { currentPage, totalPages, onPageChange } = props

    if (totalPages <= 1) {
        return null
    }

    const baseClass = "inline-flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-xl px-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"

    return (
        <nav aria-label={t("pagination.label")} className="flex flex-wrap items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={classNames(baseClass, "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10")}
                aria-label={t("pagination.previous")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {
                getPages(currentPage, totalPages).map((page, index) => {
                    if (page === "...") {
                        return (
                            <span key={`dots-${index}`} className="px-1 text-sm font-semibold text-muted">
                                &hellip;
                            </span>
                        )
                    }
                    return (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            aria-current={page === currentPage ? "page" : undefined}
                            className={classNames(
                                baseClass,
                                page === currentPage
                                    ? "bg-brand-600 text-white shadow-sm shadow-brand-600/25"
                                    : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                            )}
                        >
                            {page}
                        </button>
                    )
                })
            }

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={classNames(baseClass, "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10")}
                aria-label={t("pagination.next")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </nav>
    )
}

export default Pagination
