import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, fetchAllCountries, fetchByCategory, fetchByCountry, searchReset } from "../../Redux/slice/search.slice";
import { DropdownList, FilterWrapper, ResetButton, Select } from "./styles";
import { useLocation, useNavigate } from "react-router";

const SearchFilters = ({type='both'}) =>{
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate(); 
    const {categories, countries, recipes} = useSelector((state) => state.search);
    const [selectedValue, setSelectedValue] = useState('');
   
   useEffect(() => {
   
    if(type === 'category' || type === 'both') dispatch(fetchAllCategories());
    if(type === 'country' || type === 'both') dispatch(fetchAllCountries());

    const externalFilter = location.state?.filterValue;

    if (externalFilter) {
        setSelectedValue(externalFilter);
        if (type === 'category') dispatch(fetchByCategory(externalFilter));
        if (type === 'country') dispatch(fetchByCountry(externalFilter));
    } else {
        setSelectedValue('');
    }
}, [dispatch, type, location.state]);

    const handleReset = () => {
        setSelectedValue('');
        dispatch(searchReset());
        navigate(location.pathname, { replace: true, state: {} });
    };

    const handleSelectChange = (e) =>{
        const val = e.target.value;
        setSelectedValue(val);

        if(!val)return;

        if(type === 'category') dispatch(fetchByCategory(val));
        if(type === 'country') dispatch(fetchByCountry(val));
    }

    return(
        <FilterWrapper>
            {(type === 'category' || type === 'both') && (
                <DropdownList>
                    <label htmlFor="categorySelect">Filtrar por Categoría</label>
                    <Select
                        id="categorySelect"
                        value={selectedValue}  
                        onChange={handleSelectChange}
                    >
                        <option value="">Selecciona Categoría...</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </Select>
                </DropdownList>
            )}

            {(type === 'country' || type === 'both') && (
                <DropdownList>
                    <label htmlFor="countrySelect">Filtrar por País</label>
                    <Select 
                        id="countrySelect"
                        value={selectedValue}  
                        onChange={handleSelectChange}
                    >
                        <option value="">Selecciona País...</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </Select>
                </DropdownList>
            )}

            {(recipes.length > 0 ||selectedValue) && (
                <ResetButton onClick={handleReset} aria-label="Limpiar filtros de búsqueda">
                    Limpiar Filtros
                </ResetButton>
            )}

        </FilterWrapper>
    )
};

export default SearchFilters;
