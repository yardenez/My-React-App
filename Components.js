import React, {useState } from 'react';

/*-------------------------------------------------------------------------------*/

                             /*Stateless Part*/

/*-------------------------------------------------------------------------------*/



/* Assignment 1 */

function Title(props){
    return <h1>{props.text}</h1>;
}

/* Assignment 2 */

function Heading(props){
    return (
        <>
            <Title text={props.title}></Title> 
            <h2>{props.subtitle}</h2>
        </>
        );
}

/* Assignment 3 */

function ImageView(props){
    return(
        <>
            {/* learning-note: adding alt tag to image component is a good practice */}
            <img src={props.src} alt=""></img> 
            <p>{props.caption}</p>
        </>
    )
}

/* Assignment 4 */

function SimpleGallery(props){
    const images = props.images;
    /* lerarning-note: a key should be static and unique.
             as for the array is static, it is not dangeorus to use the index as key.  */
    return images.map( (imgSrc,index) => <ImageView key={index} src={imgSrc}></ImageView>)
}

/* Assignment 5 */

function TodoItem(props){
    const isItemDone = props.done;
    const title = props.title;
    
    return isItemDone ? <strike><p>{title}</p></strike> : <p>{title}</p>;
}

/* Assignment 6 */

function Framer(props){
    return (
        <div style={{background: "black", color:props.color}}>
            props.caption
        </div>
    )
}

/* Assignment 7 */

function GridRow(props){
    const colorList = props.gridCellsColorList;
    const rowIdx = props.gridRowIndex;
    return colorList.map((color,colIdx) => 
            <div key={`${rowIdx},${colIdx}`} className="gridCell" style={{background:color}}></div>
        );
}

function SimpleCanvas(props){
    const gridRows = props.data;
    return gridRows.map((gridRow, gridRowIdx) => {
        return <div key={gridRowIdx} className="display-items-inline">
            <GridRow gridRowIndex={gridRowIdx} gridCellsColorList={gridRow}></GridRow>
        </div>
    });
}

/* Assignment 8 */

function SpecialButton(props){

    function handleClick(e){
        if (e.ctrlKey || e.metaKey) {  
            props.onSpecialClick();
        }
        else{
            props.onClick();
        }
    }
    
    return <button onClick={handleClick}>{props.children}</button>
}

/* Assignment 9*/

function TodoItem2(props){
    const {title,completed} = props;
    function safeRemove(){
        const confirmation = window.confirm("Are you sure you wish to remove this task?");
        if(confirmation) props.onRemove();
    }
    return (<div className="display-items-inline">
        <TodoItem done={completed} title={title}></TodoItem>
        <SpecialButton onClick={props.onRemove} onSpecialClick={safeRemove} children="🗑"></SpecialButton>
    </div>)
}

/* Assignment 10*/
function GridRow2(props){
    const {onCellClick, gridCellsColorList,gridRowIdx} = props;
    return gridCellsColorList.map((color,colIdx) => 
            <div onClick={()=>onCellClick(gridRowIdx,colIdx,color)} key={`${gridRowIdx},${colIdx}`} className="gridCell" style={{background:color}}></div>
        );
}

function SimpleCanvas2(props){
    const gridRows = props.data;
    const onCellClick = props.onCellClick;
    return gridRows.map((gridRow, gridRowIdx) => {
        return <div key={gridRowIdx} className="display-items-inline">
            <GridRow2 onCellClick={onCellClick} gridRowIdx={gridRowIdx} gridCellsColorList={gridRow}></GridRow2>
        </div>
    });
}

/* Assignment 11*/

function TodoApp(props){
    const {items,onRemove,onAddItem} = props;
    const handleAddItem=()=>{
        const itemTitle =window.prompt("Please write your new item");
        if(itemTitle){
            onAddItem(itemTitle);
        }
    };
    const todoItems = items.map((item, index) =>{
        return (<div key={index} className="display-items-inline">
            <TodoItem done={item.done} title={item.title}></TodoItem>
            <button onClick={()=>onRemove(index)}>🗑</button>
    </div>)
    })
    return (<>
        {todoItems}
        <button onClick={handleAddItem}>Add Item</button>
        </>
    )
}

/*-------------------------------------------------------------------------------*/

        /*Statefull part- uses some components from the previuos part*/

/*-------------------------------------------------------------------------------*/

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

export {Title, Heading, ImageView, SimpleGallery, TodoItem, Framer, SimpleCanvas, SpecialButton, TodoItem2,SimpleCanvas2, TodoApp,Counter,
    Gallery,Canvasv2,TodoAppV2}
