import React from 'react';
/* Assignment 1 */

/*Recommendation:
const Comp: React.FC<TitleProps> = (props) => {
    const [count, setCount] = React.useState<number>(0);
    return <h1>{props.text}</h1>;
}
*/
interface ITitle {
    text: string;
}

function Title(props: ITitle) {
    return <h1>{props.text}</h1>;
}

/* Assignment 2 */

interface IHeading{
    title:string;
    subtitle:string;
}

function Heading(props : IHeading){
    return (
        <>
            <Title text={props.title}></Title> 
            <h2>{props.subtitle}</h2>
        </>
    );
}

/* Assignment 3 */

interface IImageView{
    src:string;
    caption?:string;
}

function ImageView(props : IImageView){
    return(
        <>
            <img src={props.src} alt=""></img> 
            <p>{props.caption}</p>
        </>
    )
}

/* Assignment 4 */
interface ISimpleGallery{
    images:string[];
}

export function SimpleGallery(props:ISimpleGallery){
    const images = props.images;
    const imagesGallery =images.map( (imgSrc,index) => <ImageView key={index} src={imgSrc}></ImageView>);
    return <div>{imagesGallery}</div>
}

/* Assignment 5 */

export interface ITodoItem{
    done:boolean;
    title:string;
}

function TodoItem(props: ITodoItem){
    const isItemDone = props.done;
    const title = props.title;
    
    return <p className={ isItemDone ? "task-done" : undefined}>
           {title}
           </p>}

/* Assignment 6 */

interface IFramer{
    color:string;
    caption:string;
}

function Framer(props: IFramer){
    return (
        <div style={{background: "black", color:props.color}}>
            props.caption
        </div>
    )
}

/* Assignment 7 */
interface IGridRow{
    gridCellsColorList:string[];
    gridRowIndex:number;
}

function GridRow(props:IGridRow){
    const colorList = props.gridCellsColorList;
    const rowIdx = props.gridRowIndex;
    const gridRowCells= colorList.map((color,colIdx) => 
        <div key={`${rowIdx},${colIdx}`} className="gridCell" style={{background:color}}></div>);
   return <>{gridRowCells}</>
}

interface ISimpleCanvas{
    data:string[][];
}

function SimpleCanvas(props:ISimpleCanvas){
    const gridRows = props.data;
    return gridRows.map((gridRow, gridRowIdx) => {
        return <div key={gridRowIdx} className="display-items-inline">
            <GridRow gridRowIndex={gridRowIdx} gridCellsColorList={gridRow}></GridRow>
        </div>
    });
}

/* Assignment 8 */

interface ISpecialButton{
    onSpecialClick: ()=>void;
    onClick:()=>void;
    children:string;
}

function SpecialButton(props:ISpecialButton){

    function handleClick(e:any){
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

interface ITodoItem2{
    completed:boolean;
    title:string;
    onRemove:()=>void;
} 

function TodoItem2(props : ITodoItem2){
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

interface IGridRow2{
    gridCellsColorList:string[];
    gridRowIdx:number;
    onCellClick: (rowIdx:number,ColIdx:number,color:string)=>void;
}

/* Assignment 10*/
function GridRow2(props:IGridRow2){
    const {onCellClick, gridCellsColorList,gridRowIdx} = props;
    const gridRowCells=gridCellsColorList.map((color,colIdx) => 
        <div onClick={()=>onCellClick(gridRowIdx,colIdx,color)} key={`${gridRowIdx},${colIdx}`} className="gridCell" style={{background:color}}></div>);
    return <div>
        {gridRowCells}
    </div>
}

interface ISimpleCanvas2{
    data:string[][];
    onCellClick: (rowIdx:number,ColIdx:number,color:string)=>void;
}

export function SimpleCanvas2(props :ISimpleCanvas2){
    const gridRows = props.data;
    const onCellClick = props.onCellClick;
    const canvas=gridRows.map((gridRow, gridRowIdx) => {
        return <div key={gridRowIdx} className="display-items-inline">
            <GridRow2 onCellClick={onCellClick} gridRowIdx={gridRowIdx} gridCellsColorList={gridRow}></GridRow2>
        </div>
    });
    return <div>{canvas}</div>
}

/* Assignment 11*/

interface ITodoApp{
    items:ITodoItem[];
    onRemove:(itemIdx:number)=>void;
    onAddItem:(title:string)=>void;
}

function TodoApp(props :ITodoApp){
    const {items,onRemove,onAddItem} = props;
    const handleAddItem=()=>{
        const itemTitle =window.prompt("Please write your new item's title");
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
