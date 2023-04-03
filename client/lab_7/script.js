
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  
  function injectHTML(list) {
    console.log('fiered injectHTML');
    const target = document.querySelector('#restaurant_list');
    target.innerHTML = '';
    list.forEach((item) => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str;
    })
  }
  
  function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    });
  }
  
  function cutRestaurantList(list) {
    console.log('fired cut list');
    const range = [...Array(15).keys()];
    return newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, list.length - 1);
      return list[index];
    })
  }
  
  async function mainEvent() {
    // the async keyword means we can make API requests
    const mainForm = document.querySelector(".main_form"); // This class name needs to be set on your form before you can listen for an event on it
    const filterButton = document.querySelector("#filter_button");
    const loadDataButton = document.querySelector("#date_load");
    const generateListButton = document.querySelector("#generate");
  
    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';
  
    let currentList = [];
  
    loadDataButton.addEventListener('click', async (submitEvent) => {// async has to be declared on every function that needs to "await" something
      console.log("Loading data"); // this is substituting for a "breakpoint"
      loadAnimation.style.display = 'inline-block';
  
      const results = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json");
  
      currentList = await results.json();
      loadAnimation.style.display = 'none';
      console.table(currentList);
    });
  
    filterButton.addEventListener('click', (event) => {
      console.log("clicked filterButton");
  
      // this is the preferred way to handle form data in JS in 2022
      const formData = new FormData(mainForm); // get the data from the listener target
      const formProps = Object.fromEntries(formData); // Turn it into an object
  
      // You can also access all forms in a document by using the document.forms collection
      // But this will retrieve ALL forms, not just the one that "heard" a submit event - less good
  
      console.log(formProps);
      const newList = filterList(currentList, formProps.resto);
  
      console.log(newList);
      injectHTML(newList)
    });
  
    generateListButton.addEventListener('click', (event) => {
      console.log('generate new list');
      const resaurantsList = cutRestaurantList(currentList);
      injectHTML(resaurantsList);
    })
  }
  
  
  document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
  