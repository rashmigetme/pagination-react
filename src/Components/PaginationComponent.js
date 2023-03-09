import React from 'react';
import './stylePagination.css';
import { useState, useEffect } from 'react';

const renderData = data=>{
    return(
        <ul>
            {data.map((element, index)=>{
                return<li key={index}>{element.title}</li>;
            })
            }
        </ul>
    );
};
export default function PaginationComponent() {

    const [data, setData]= useState([]);
    const [currentPage, setCurrentPage]= useState(1);
    const [itemsPerPage, setItemsPerPage]= useState(5);
    const [pageNumberLimit, setPageNumberLimit]= useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit]= useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit]= useState(0);

    const pages =[];
    for(let i=1; i<=Math.ceil(data.length/itemsPerPage) ;i++){
        pages.push(i);
    }
    
    const handleClick=(event)=>{
        // e.PreventDefault();
        setCurrentPage(Number(event.target.id));
    }
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem- itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers= pages.map((number)=>{
        if(number < maxPageNumberLimit+1 && number> minPageNumberLimit ){
      return (
        <li key={number} id={number} onClick={handleClick}
        className={currentPage== number? "active":null}>{number}</li>
      );
        }else{
            return null;
        }
    });
    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/todos')
         .then(response => response.json())
         .then(json => setData(json))
    },[]);
    
    const handlePrevBtn=()=>{
        setCurrentPage(currentPage-1);
        if((currentPage-1)%pageNumberLimit ==0){
            setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit);
        }
    }
   const handleLoadMore =()=>{
     setItemsPerPage(itemsPerPage+5);
   }
    const handleNextBtn=()=>{
      setCurrentPage(currentPage+1);
      if(currentPage+1>maxPageNumberLimit){
        setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit);
      }
    }

     let pageIncrementBtn = null;
     if(pages.length > maxPageNumberLimit){
        pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>
        //&hellip; is for 3 dots
     }

     
     let pageDecrementBtn = null;
     if(minPageNumberLimit>=1){
        pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>
        //&hellip; is for 3 dots
     }
   
     
  return (
    <>
    {/* using jsonplaceholderapi for this */}
    <h1>To Do List</h1><br/>
    {renderData(currentItems)}
    <ul class="pageNumbers">
        <li><button onClick={handlePrevBtn} disabled={currentPage == pages[0]? true: false}>Prev</button></li>
        {pageDecrementBtn}
    {renderPageNumbers}
    {pageIncrementBtn}
    <li><button onClick={handleNextBtn} disabled={currentPage == pages[pages.length-1]? true: false}>Next</button></li>
    </ul>
    <button className='loadmore' onClick={handleLoadMore}>LoadMore</button>
    </>
  );
}
