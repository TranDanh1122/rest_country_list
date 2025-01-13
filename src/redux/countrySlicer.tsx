import { countryAPI } from "../api/countryAPI"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

export const getCountry = createAsyncThunk('country/fetchData', async () => {
    try {
        const response = await countryAPI.fetchCountry()
        return response.data
    } catch (error) {
        throw new Error(`error ${error}`)
    }
})
interface CountryState {
    countries: Country[],
    filteredCountries: Country[],
    loading: boolean,
    filter: Filter,
    pagination: {
        items: Country[]
        current: number,
        totalPages: number,
    },
    error: unknown
}

const filterData = (data: Country[], { search, sortBy, order, region }: Filter): Country[] => {
    let filterData = data
    if (search) {
        const searchString = search.toLowerCase()
        filterData = data.filter(country => country.name.toLowerCase().includes(searchString))
    }
    if (sortBy) {
        filterData.sort((a, b) => {
            if (order.toLowerCase() == "asc") {
                return a[sortBy] > b[sortBy] ? 1 : -1
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1
            }
        })
    }
    if (region) {
        filterData = filterData.filter(country => country.region.toLowerCase() == region.toLowerCase())
    }
    return filterData
}
const pagination = (data: CountryState, page: number, limit: number): CountryState => {

    const startCursor = (page - 1) * limit
    const endCursor = startCursor + limit
    const paginationData = data.filteredCountries.slice(startCursor, endCursor)
    data.pagination.current = page
    data.pagination.totalPages = Math.ceil(data.filteredCountries.length / limit)
    data.pagination.items.push(...paginationData)
    return data
}
const countrySlicer = createSlice({
    "name": "countries",
    initialState: {
        countries: [],
        filteredCountries: [],
        loading: false,
        filter: {
            search: "",
            sortBy: "",
            order: "asc",
            region: "",
            page: 1,
            limit: 10
        },
        pagination: {
            items: [],
            current: 1,
            totalPages: 1,
        },
        error: null
    } as CountryState,
    reducers: {
        setFilter: (state: CountryState, action: PayloadAction<Filter>) => {
            state.filter = { ...state.filter, ...action.payload }
            const filteredCountries = filterData(state.countries, state.filter)
            state.filteredCountries = filteredCountries
            const paginationData = pagination(state, 1, 10)
            state = paginationData
        },
        loadMore: (state: CountryState) => {
            const nextPage = state.filter.page + 1
            state.filter.page = nextPage
            if (nextPage == state.pagination.totalPages) return
            const paginationData = pagination(state, nextPage, 10)
            state = paginationData
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCountry.pending, (state) => {
                state.loading = true
            }).addCase(getCountry.fulfilled, (state: CountryState, action: PayloadAction<Country[]>) => {
                state.loading = false
                state.countries = action.payload
                const filteredCountries = filterData(state.countries, state.filter)
                state.filteredCountries = filteredCountries
                const paginationData = pagination(state, 1, 10)
                state.pagination = paginationData.pagination
                state.filteredCountries = paginationData.filteredCountries
            })
            .addCase(getCountry.rejected, (state: CountryState, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})
export const { setFilter, loadMore } = countrySlicer.actions
export default countrySlicer.reducer 