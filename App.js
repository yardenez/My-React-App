import React from 'react';
import './App.css';

import * as Comps from './Components.js';

const Container = ({title, description, exampleProps, children}) => {

  const copiedProps = {...exampleProps};
  Object.keys(copiedProps).forEach(key => {
    if (typeof copiedProps[key] === 'function') {
      copiedProps[key] = copiedProps[key].toString();
    }
  });
  return (<div className={'container'}>
    <h2>{title}</h2>
    <h3>Description</h3>
    <p>{description}</p>
    <h3>Rendered component:</h3>
    <div className={'content'}>
      {children}
    </div>
  </div>);
};

const sandboxData = [
  {
    name: 'Counter',
    description: 'Counter component. Shows a number, has a + and - button to control the numer.'
  },
  {
    name: 'Gallery',
    description: 'Wrap <SimpleGallery/> from part-1 with a statefull component that has an "add" button, that using "window.prompt" will ask for a new src for a new image ',
    mandatory: true
  },
  {
    name: 'Canvasv2',
    description: `Change the canvas from #6 so that clicking on each cell will toggle the color (cycling between some colors, i.e. 'red', 'yellow', 'blue', 'orange')`
  },
  {
    name: 'TodoAppV2',
    description: `Change <TodoApp> from #10 so the items are now stateful.
    You will need to support adding, removing and toggling items (done or undone). Add an input and "add" button to your todo app from , and also make sure that removing items works. Bonus: add a navigation bar that allows users to filter between tasks; "only completed", "only incomplete" and "all". Bonus: add a textual search bar.`,
    mandatory: true
  }
];

const App = () => {
  return (
    <div id='app'>
      <h1>React Stateful Components Exercises!</h1>
      <p>Each one of the items is an exercise. You should write a component in the <em>Components.js</em> file with the right name (see the initial <em>Title</em> one).</p>
      <p>Note that only the components file needs to be changed!</p>
      <marquee><em>Good luck!</em></marquee>
      {sandboxData.map((exercise, i) => {
        const Comp = Comps[exercise.name];
        return (<Container title={`${i + 1}. ${exercise.name}`} description={exercise.description} key={i}>
          {Comp ? <Comp/> : <p style={{color: 'red'}}>Nothing written yet. Make sure to expose a a component called <strong>{exercise.name}</strong> from <em>Components.js</em></p>}
        </Container>);
      })}
      <h5>Do not forget to commit and push to your fork!</h5>
    </div>
  );
};

export default App;
