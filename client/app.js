const { createStore } = require('redux');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded');

  const listReducer = (state = [], action) => {
    switch(action.type) {
      case 'ADD_ITEM':
        return [ ...state, action.value ];
      case 'REMOVE_ITEM':
        const currentState = [ ...state ];
        const filteredState = filterList(currentState, action.value);
        return filteredState;
      default:
        return state;
    }
  }

  const filterList = (state, item) => {
    return state.filter(listItem => listItem !== item );
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
    discardInput.value = '';
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
