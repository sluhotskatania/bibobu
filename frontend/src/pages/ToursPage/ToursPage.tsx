import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchTours } from "../../redux/tours/operations";
import { selectTours, selectIsLoadingTours } from "../../redux/tours/selectors";
import TourFilters from "../../components/TourFilters/TourFilters";
import TourList from "../../components/TourList/TourList";
import { AppDispatch } from "../../redux/store";
import { Tour } from "../../types";

export default function ToursPage() {
  const dispatch: AppDispatch = useDispatch();
  const tours = useSelector(selectTours) as Tour[];
  const isLoading = useSelector(selectIsLoadingTours);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(tours)) {
      setFilteredTours(tours);
    }
  }, [tours]);

  const handleSearch = (query: string) => {
    const filtered = tours.filter((tour) =>
      tour.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTours(filtered);
    searchParams.set("search", query);
    setSearchParams(searchParams);
  };

  const handleFilter = (category: string) => {
    const filtered = category
      ? tours.filter((tour) => tour.category === category)
      : tours;
    setFilteredTours(filtered);
    searchParams.set("category", category);
    setSearchParams(searchParams);
  };

  const handleSort = (sortBy: string) => {
    const sorted = [...filteredTours].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.title.localeCompare(b.title);
      if (sortBy === "name-desc") return b.title.localeCompare(a.title);
      return 0;
    });
    setFilteredTours(sorted);
    searchParams.set("sort", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Наші тури</h1>
      <TourFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
      />
      {isLoading ? (
        <p>Завантаження...</p>
      ) : filteredTours.length > 0 ? (
        <TourList tours={filteredTours} />
      ) : (
        <p>Немає доступних турів.</p>
      )}
    </div>
  );
}
