export const fetchProduct = async (ID) => {
  if (!ID) throw new Error('ID não informado');
  const URL = `https://api.mercadolibre.com/items/${ID}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export async function fetchProductsList(QUERY) {
  if (!QUERY) throw new Error('Termo de busca não informado');

  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
}
