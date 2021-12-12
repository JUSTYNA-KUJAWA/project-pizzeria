import {select} from '../settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct{
  constructor(menuProduct, element){
    const thisCartProduct = this;
  
    thisCartProduct.id = menuProduct.id;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.params = menuProduct.params;
  
    thisCartProduct.getElements(element);
    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();
    //console.log(thisCartProduct);
  }
  getElements(element){
    const thisCartProduct = this;
  
    thisCartProduct.dom={};
    thisCartProduct.dom.wrapper = element;
    thisCartProduct.dom.amountWidget = element.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.price = element.querySelector(select.cartProduct.price);
    thisCartProduct.dom.edit = element.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.remove = element.querySelector(select.cartProduct.remove);
  }
  initAmountWidget(){
    const thisCartProduct = this;
  
    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    thisCartProduct.dom.amountWidget.addEventListener('updated', function(){
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      thisCartProduct.priceSingle = thisCartProduct.amount * thisCartProduct.price;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.priceSingle;
    });
  }
  remove(){
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });
    thisCartProduct.dom.wrapper.dispatchEvent(event);
    //console.log('it works');
  }
  initActions(){
    const thisCartProduct = this;

    thisCartProduct.dom.edit.addEventListener('click', function(event){
      event.preventDefault();
    });

    thisCartProduct.dom.remove.addEventListener('click', function(event){
      event.preventDefault();
      thisCartProduct.remove();
    });
  }
  getData(){
    const thisCartProduct = this;
    let productData = {};
    productData.id = thisCartProduct.id;
    productData.amount = thisCartProduct.amount;
    productData.name = thisCartProduct.name;
    productData.priceSingle = thisCartProduct.priceSingle;
    productData.price = thisCartProduct.price;
    productData.params = thisCartProduct.params;
      
    return productData;
  }
}
export default CartProduct;