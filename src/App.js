import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from "react";
import React from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem'

function App() {


      const [search, setSearch] = useState('');


      const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
      const setAndSaveItems = (newItems) => {
        setItems(newItems);
        localStorage.setItem('shoppinglist', JSON.stringify(newItems));
      }

      // For adding of item 
      const [newItem, setNewItem] = useState('')

      const addItem = (item) => {
         const id = items.length ? items[items.length - 1].id + 1 : 1;
         const myNewItem = { id, checked: false, item};
         const listItems = [...items, myNewItem];
         setAndSaveItems(listItems);
      }

    const handleDelete = (id) => {
      const listItems = items.filter((item) => item.id !== id );
      setAndSaveItems(listItems);
    }
    const handleCheck = (id) => {
      const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
      setAndSaveItems(listItems);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!newItem) return;
      addItem(newItem);
      setNewItem('');
    }

  return (
    <div className="mySection">
      <div className="App">
        <Header tittle="Grocery List - DRUG" />
        <AddItem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
        />
        <SearchItem
        search = {search}
        setSearch = {setSearch}
        />
        <Content
        items = {items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase())))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
        />
        <Footer length= {items.length} />
      </div>
    </div>
  );
}

export default App;





                  //the origal code
    // const [items, setItems] = useState ([
    //     {
    //       id: 1,
    //       checked: false,
    //       item: "Pound of bag of Good Items"
    //     },
    //     {
    //       id: 2,
    //       checked: false,
    //       item: "Pound of bag of Weeds"
    //     },
    //     {
    //       id: 3,
    //       checked: false,
    //       item: "Pound of bag of Shabu"
    //     }
    //   ]);
