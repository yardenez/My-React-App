
import React, {useState } from 'react';
import {SimpleGallery,SimpleCanvas2} from "./stateless"
/*Assignment 1-counter*/

function Counter(){
    //learning note: react will remember the current state variables valus between re-renders
    const [counter, setCounter]= useState(0);

    return (<div>
            <span>{counter}</span>
            <div className="display-items-inline">
                <button className="add-button" onClick={()=>setCounter(counter+1)}>+ </button>
                <button className="substract-button" onClick={()=>setCounter(counter-1)}> - </button>
            </div>
        </div>
    )
}

/*Assignment 2- Gallery*/

function Gallery(){
    const initImages= ["https://i.ytimg.com/vi/MCn9lL94sxQ/maxresdefault.jpg",
    "http://i.imgur.com/iJoG4Ks.jpg"]
    const [images,setImages]= useState(initImages);

    const addNewImage=()=>{
        const src= window.prompt("What is your new image src?");
        if(src){
            const newImages = images.splice(0);
            newImages.push(src);
            /* learinig note: when giving a refernce, we must send a new refernce 
            in order the component to be re-render */
            setImages(newImages);
        }
    }

    return (<>
        <SimpleGallery images={images}></SimpleGallery>
        <button onClick={addNewImage}>add</button>
        </>
    )
}

/*Assignment 3- Canvasv2*/

function Canvasv2(){
    /*note: we will normally use multiple useState */
    const initialGridColors=[["red","yellow","blue","orange"],
    ["red","yellow","blue","orange"],
    ["red","yellow","blue","orange"],
    ["red","yellow","blue","orange"]];

    const [gridColors, setGridColors]= useState(initialGridColors);

    const toggleColor=(row,column,currColor)=>{
        const colors_array= ["red","yellow","blue","orange"];
        const currColorIndex = colors_array.indexOf(currColor);
        const newColor = colors_array[(currColorIndex+1) % colors_array.length];
        gridColors[row][column]=newColor;
        setGridColors([...gridColors])
    }

    return <SimpleCanvas2 data={gridColors} onCellClick={toggleColor} ></SimpleCanvas2>

}

/*Assignment 4- Todoapp*/

function TodoItemV2(props){
    const [isItemDone,setIsItemDone]=useState(props.done);
    const title = props.title;
    
    return <p className={ isItemDone ? "task-done" : null} 
            onClick={()=>setIsItemDone(!isItemDone)}>
           {title}
           </p>
}


function TodoAppV2(){
    const initialItems = [
        {title:"Reach 1M",done:true},
        {title:"Reach 5M",done:false}];

    const [items,setItems]=useState(initialItems);

    const handleAddItem=(e)=>{
        e.preventDefault();
        const inputElem= e.target.elements[0];
        const newItemTitle= inputElem.value;
        const newItem={title:newItemTitle, done:false};
        items.push(newItem);
        setItems([...items]);
    }

    const handleRemoveItem =(itemIdx)=>{
        items.splice(itemIdx,1)
        setItems([...items]);
    }

    const todoItems = items.map((item,index) =>{
        return (<div key={item.title} className="display-items-inline">
            <TodoItemV2 done={item.done} title={item.title}></TodoItemV2>
            <button onClick={()=>handleRemoveItem(index)}>🗑</button>
    </div>)
    });

    return(<div>
        {todoItems}
        <form onSubmit={handleAddItem}>
            <input type="text"></input>
            <button type="submit">Add Item</button>
        </form>
    </div>)

}