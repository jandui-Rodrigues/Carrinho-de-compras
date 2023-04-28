export const getAddress = async (CEP) => {
  const URL1 = `https://cep.awesomeapi.com.br/json/${CEP}`;
  const URL2 = `https://brasilapi.com.br/api/cep/v2/${CEP}`;

  const response = await Promise.any([
    fetch(URL1),
    fetch(URL2),
  ]);
  const data = await response.json();
  if (data.code === 'invalid') throw new Error('CEP não encontrado');
  return data;
};

export const searchCep = async () => {
  // seu código aqui
  const cepInput = document.querySelector('.cep-input');
  const cartAddress = document.querySelector('.cart__address');
  try {
    await getAddress(cepInput.value)
      .then(({ street, address, city, neighborhoo, district, state }) => {
        cartAddress.innerHTML = `${street || address} - ${
          neighborhoo || district
        } - ${city} - ${state}`;
      });
  } catch (error) {
    cartAddress.innerHTML = 'CEP não encontrado';
  }
};
