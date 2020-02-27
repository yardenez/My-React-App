import React from 'react';

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

export function SimpleGallery(props){
    const images = props.images;
    /* lerarning-note: a key should be static and unique.
             as for the array is static, it is not dangeorus to use the index as key.  */
    return images.map( (imgSrc,index) => <ImageView key={index} src={imgSrc}></ImageView>)
}

/* Assignment 5 */

function TodoItem(props){
    const isItemDone = props.done;
    const title = props.title;
    
    return <p className={ isItemDone ? "task-done" : null}>
           {title}
           </p>}

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

export function SimpleCanvas2(props){
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
