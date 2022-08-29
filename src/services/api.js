export const foodAPI = async (placeholder) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${placeholder}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const drinkAPI = async (placeholder) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${placeholder}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchFoodsId = async (type, id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};

export const fetchDrinksId = async (type, id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};
