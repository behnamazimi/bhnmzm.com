// UTC keeps server and client output identical, avoiding hydration mismatches.
const dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC'})

export function formatDate(date: string | Date) {
    const [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(new Date(date))

    return `${day} ${month} ${year}`
}
