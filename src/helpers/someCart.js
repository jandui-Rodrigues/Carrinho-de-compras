import { fetchProduct } from './fetchFunctions';

const someTotalCart = async (paran, idremove) => {
  // Em desenvolvimento
  const idsProducts = JSON.parse(localStorage.getItem('cartProducts'));
  const displayTotalPrice = document.querySelector('.total-price');
  if (paran) {
    const array = [];
    idsProducts.forEach(async (id) => {
      const { price } = await fetchProduct(id);
      array.push(price);

      const SomeTotal = array
        .reduce((acc, priceSome) => {
          acc += priceSome;
          return acc;
        }).toFixed(2);

      localStorage.setItem('price', JSON.stringify(SomeTotal));
      const cartValue = JSON.parse(localStorage.getItem('price'));
      displayTotalPrice.innerHTML = cartValue;
    });
  } else {
    const { price } = await fetchProduct(idremove);
    const cartValue = JSON.parse(localStorage.getItem('price'));
    const SomeTotal = Number(cartValue) - price;
    localStorage.setItem('price', JSON.stringify(SomeTotal));
    displayTotalPrice.innerHTML = SomeTotal.toFixed(2);
  }
};

export default someTotalCart;
