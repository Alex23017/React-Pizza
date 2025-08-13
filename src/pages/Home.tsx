import React, { useRef } from "react";
import qs from "qs";
import { list } from "../components/Sort";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { fetchPizzas, SearchPizzaParams } from "../redux/slices/pizzaSlice";
import { selectFilter, selectPizza } from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/slices/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const isSearch = React.useRef(false);
  const isMounted = useRef(false);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.startsWith("-") ? "asc" : "desc";
    const categoryParam = categoryId > 0 && categoryId <= 4 ? `category=${categoryId}&` : "";
    const search = searchValue ? `search=${searchValue}&` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        categoryParam,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy) || list[0];

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.categoryParam),
          currentPage: Number(params.currentPage),
          sort: sort ? sort : list[0],
        }),
      );

      isSearch.current = true;
      if (!window.location.search) {
        dispatch(fetchPizzas({} as SearchPizzaParams));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    } else {
      getPizzas();
      isSearch.current = false;
    }
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  const pizzas = items
    .filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка, попробуйте перезагрузить страницу </h2>
        </div>
      ) : (
        <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage - 1} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
