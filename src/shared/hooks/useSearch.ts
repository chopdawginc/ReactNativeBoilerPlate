import { useState, useMemo, useEffect } from 'react'
import { debounce } from 'lodash'
import { UseSearchHandlers } from '@types'

function useSearch(initialData = [], keyPath: string): [any[], UseSearchHandlers] {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState(initialData)

    const getNestedProperty = (object: any, keyPath: string) => {
        const keys = keyPath.split('.')
        let result = object
        for (const key of keys) {
            result = result?.[key]
        }
        return result
    }

    useEffect(() => {
        setSearchResult(initialData)
    }, [initialData])

    const handleSearch = debounce((text: string) => {
        if (text) {
            setSearch(text)
            const newArray = initialData.filter((item) =>
                getNestedProperty(item, keyPath)?.toString().toLowerCase().includes(text.toLowerCase())
            )
            setSearchResult(newArray)
        } else {
            setSearch('')
            setSearchResult(initialData)
        }
    }, 5)

    const memorizedResult = useMemo(() => searchResult, [searchResult])

    return [memorizedResult, { search, handleSearch }]
}

export default useSearch
