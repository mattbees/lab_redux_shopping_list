const { createStore } = require('redux');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded');

  const listReducer = (state = [], item) => {
    switch(item.type) {
      case 'ADD_ITEM':
        return [ ...state, item.value ];
      case 'REMOVE_ITEM':
        const currentState = [ ...state ];
        const filteredState = filterList(currentState, item.value);
        return filteredState;
      default:
        return state;
    }
  }

  const filterList = (state, item) => {
    const filteredState = state.filter(listItem => {
      return listItem !== item;
    });
    return filteredState;
  }

  const store = createStore(listReducer);

  store.subscribe(() => {
    render();
  })

  const form = document.querySelector('form#shopping-list-form');
  const input = document.querySelector('input#item');  // IS THIS NECESSARY?
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    store.dispatch({ type: 'ADD_ITEM', value: input.value })
    input.value = '';
  });

  const discardForm = document.querySelector('form#remove-item-form');
  const discardInput = document.querySelector('input#remove');  // IS THIS NECESSARY?
  discardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    store.dispatch({ type: 'REMOVE_ITEM', value: discardInput.value })
    input.value = '';
  });

  const render = () => {
    const list = document.querySelector('ul#shopping-list');
    list.innerHTML = '';
    loopItems(list);
  }

  const loopItems = (list) => {
    const items = store.getState();
    items.forEach(item => {
      list.innerHTML += `<li>${item}</li>`;
    })
  }

  render();

})
