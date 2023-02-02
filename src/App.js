import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from "react";
import React from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem'

function App() {
      const API_URL = 'http://localhost:3500/items';

      const [search, setSearch] = useState('');
      const [items, setItems] = useState([]);
      const [fetchError, setFetchError] = useState('');
      // For adding of item 
      const [newItem, setNewItem] = useState('');
      const [isLoading, setIsLoading] = useState(true)

      useEffect(()=>{
        const fetchItems = async () =>{
          try {
            const response = await fetch(API_URL);
            if (!response.ok) throw Error('Did not receive data madak-');
            const listItems = await response.json();
            setItems(listItems)
            setFetchError(null);
          } catch (err) {
            setFetchError(err.message);
          } finally {
            setIsLoading(false);
          }
        }
        setTimeout(()=> {
          (async () => await fetchItems())();
        }, 2000 )
      }, [])

      const addItem = (item) => {
         const id = items.length ? items[items.length - 1].id + 1 : 1;
         const myNewItem = { id, checked: false, item};
         const listItems = [...items, myNewItem];
         setItems(listItems);
      }

    const handleDelete = (id) => {
      const listItems = items.filter((item) => item.id !== id );
      setItems(listItems);
    }
    const handleCheck = (id) => {
      const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
      setItems(listItems);
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
        <main>
          {isLoading && <p>Loading Item...</p>}
          {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
          {!fetchError  && !isLoading && <Content
            items = {items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase())))}
            handleCheck = {handleCheck}
            handleDelete = {handleDelete}
          />}
        </main>
        <Footer length= {items.length} />
      </div>
    </div>
  );
}

export default App;