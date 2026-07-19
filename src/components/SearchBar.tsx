interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    search,
    setSearch,
    placeholder = "Buscar...",
} : SearchBarProps) {

    return(
        <input 
        className = "search-bar"
        placeholder = {placeholder}
        value = {search}
        onChange={(e) => setSearch(e.target.value)} />
    )
}