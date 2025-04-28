import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categories/operations";
import {
  selectCategories,
  selectIsLoadingCategories,
} from "../../redux/categories/selectors";
import css from "./TourFilters.module.css";
import { AppDispatch } from "../../redux/store";

type Props = {
  onSearch: (query: string) => void;
  onFilter: (categoryId: string) => void;
  onSort: (sortBy: string) => void;
};

export default function TourFilters({ onSearch, onFilter, onSort }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoadingCategories = useSelector(selectIsLoadingCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSort(e.target.value);
  };

  return (
    <div className={`mb-4 ${css.filtersContainer}`}>
      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="text"
            className={`form-control ${css.searchInput}`}
            placeholder="Пошук за назвою"
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-4">
          <select
            className={`form-select ${css.selectInput}`}
            onChange={handleFilter}
          >
            <option value="">Всі категорії</option>
            {isLoadingCategories ? (
              <option>Завантаження...</option>
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className={`form-select ${css.selectInput}`}
            onChange={handleSort}
          >
            <option value="price-asc">Ціна: за зростанням</option>
            <option value="price-desc">Ціна: за спаданням</option>
            <option value="name-asc">Назва: А-Я</option>
            <option value="name-desc">Назва: Я-А</option>
          </select>
        </div>
      </div>
    </div>
  );
}
