import { DateFormatOptions, Timestamp } from '@types'

export const useDateFormat = () => {

    // Function to convert milliseconds to date string (YYYY-MM-DD format)
    const millisecondsToDate = (milliseconds: number): string => {
        const date = new Date(milliseconds)
        return date.toISOString().split('T')[0]  // Format: YYYY-MM-DD
    }

    // Function to convert Firestore-like timestamp to date string (YYYY-MM-DD format)
    const timestampToDate = (timestamp: Timestamp): string => {
        if (!timestamp?.seconds) return ''
        const date = new Date(timestamp.seconds * 1000)  // Convert seconds to milliseconds
        return date.toISOString().split('T')[0]  // Format: YYYY-MM-DD
    }

    // Function to calculate age from birth timestamp to current date
    const getAgeFromTimestamp = (timestamp: Timestamp): number => {
        if (!timestamp?.seconds) return 0
        const birthDate = new Date(timestamp.seconds * 1000)  // Convert seconds to milliseconds
        const now = new Date()
        let age = now.getFullYear() - birthDate.getFullYear()
        const monthDiff = now.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    // Function to convert date (YYYY-MM-DD) to milliseconds
    const dateToMilliseconds = (dateString: string | Date): number => {
        const date = new Date(dateString)
        return date.getTime()
    }

    // Function to format date using Intl.DateTimeFormat
    const formatCustomDate = (date: Date, format: DateFormatOptions): string => {
        const formatter = new Intl.DateTimeFormat('en-US', format)
        return formatter.format(date)
    }

    const formatDate = (date: Date, formatType?: string): string => {
        switch (formatType) {
            case 'full':
                return formatCustomDate(date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            // Friday, July 12, 2024
            case 'short':
                return formatCustomDate(date, { year: 'numeric', month: 'short', day: 'numeric' })
            // Jul 12, 2024
            case 'fullTime':
                return formatCustomDate(date, { hour: 'numeric', minute: 'numeric', second: 'numeric' })
            // 5:54:30 PM
            case 'time':
                return formatCustomDate(date, { hour: 'numeric', minute: 'numeric' })
            // 5:54 PM
            case 'year':
                return formatCustomDate(date, { year: 'numeric' })
            // 2024
            case 'month':
                return formatCustomDate(date, { month: 'long' })
            // July
            case 'day':
                return formatCustomDate(date, { day: 'numeric' })
            // 24
            default:
                return formatCustomDate(date, { month: 'long', day: 'numeric', year: 'numeric' })
            // July 12, 2024
        }
    }

    return {
        millisecondsToDate,
        timestampToDate,
        getAgeFromTimestamp,
        dateToMilliseconds,
        formatDate,
        formatCustomDate,
    }
}
