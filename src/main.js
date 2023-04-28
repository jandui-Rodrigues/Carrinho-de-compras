import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
import someTotalCart from './helpers/someCart';

const conteinerProducts = document.querySelector('.products');
const cartProduct = document.getElementsByClassName('cart__products')[0];
const searchInput = document.getElementById('search');
const searchBnt = document.getElementById('search-bnt');

document.querySelector('.cep-button').addEventListener('click', searchCep);

function createElementeLoading() {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'c-loader';
  conteinerProducts.appendChild(loadingDiv);
}
function createElementeError() {
  const createElementeH1 = document.createElement('h1');
  const textMessage = 'Algum erro ocorreu, recarregue a página e tente novamente';
  createElementeH1.innerHTML = textMessage;
  createElementeH1.className = 'error';
  conteinerProducts.appendChild(createElementeH1);
}

const fetchProdutcIdAndExibi = async (produtcID) => {
  if (typeof produtcID === 'object') {
    return produtcID.forEach(async (id) => {
      const product = await fetchProduct(id);
      cartProduct.appendChild(createCartProductElement(product));
    });
  }
  const dataProduct = await fetchProduct(produtcID);
  cartProduct.appendChild(createCartProductElement(dataProduct));
};

const getIdProduct = (colection) => {
  const productsIds = document.getElementsByClassName('product__id');
  for (let index = 0; index < colection.length; index += 1) {
    const buttonProduct = colection[index];
    const produtcID = productsIds[index].innerHTML;
    buttonProduct.addEventListener('click', async () => {
      saveCartID(produtcID);
      await fetchProdutcIdAndExibi(produtcID);
      someTotalCart(true);
    });
  }
};

const exibiProducts = async (search) => {
  conteinerProducts.innerHTML = '';
  createElementeLoading();
  const loading = document.querySelector('.c-loader');
  try {
    const data = await fetchProductsList(search)
      .catch(() => {});

    data.forEach((product) => conteinerProducts
      .appendChild(createProductElement(product)));

    const productAdd = document.getElementsByClassName('product__add');
    getIdProduct(productAdd);
    conteinerProducts.removeChild(loading);
  } catch (error) {
    if (error) {
      conteinerProducts.removeChild(loading);
      createElementeError();
    }
  }
};

exibiProducts('computador');
searchBnt.addEventListener('click', (event) => {
  event.preventDefault();
  const seachProducts = searchInput.value;
  exibiProducts(seachProducts);
  console.log(seachProducts);
});

window.onload = () => {
  if (localStorage.getItem('cartProducts')) {
    const idsProducts = JSON.parse(localStorage.getItem('cartProducts'));
    fetchProdutcIdAndExibi(idsProducts);
    someTotalCart(true); // Em desenvolvimento
  }
};
