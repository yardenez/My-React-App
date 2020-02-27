
import React from 'react';
// import './App.scss';
import './App.css';

import * as Comps from './Components';

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
    <h3>Example props</h3>
    <pre><code>{JSON.stringify(copiedProps, null, 4)}</code></pre>
    <h3>Rendered component:</h3>
    <div className={'content'}>
      {children}
    </div>
  </div>);
};

const sandboxData = [
  {
    name: 'Title',
    description: 'Title component. Displays the text prop in a h1 tag',
    props: {
      text: 'Bob'
    }
  },
  {
    name: 'Heading',
    description: 'Heading component. Like <Title>, but supports a sub-title too using <h2>',
    mandatory: true,
    props: {
      title: 'Bob',
      subtitle: 'Bobette222'
    }
  },
  {
    name: 'ImageView',
    description: 'Image viewer - displays an image with a caption text',
    props: {
      src: 'https://i.ytimg.com/vi/MCn9lL94sxQ/maxresdefault.jpg',
      caption: 'WAT'
    }
  },
  {
    name: 'SimpleGallery',
    description: 'Simple gallery - receives a list of image sources and displays all images in a row. No pagination, sliding or any other logic needed. Just display the images',
    props: {
      images: [
        'https://i.ytimg.com/vi/MCn9lL94sxQ/maxresdefault.jpg',
        'http://i.imgur.com/iJoG4Ks.jpg'
      ]
    }
  },
  {
    name: 'TodoItem',
    description: 'Todo item - to be used inside a To-do app. Displays the title, and if the item is done, it displays the title with a strikethrough. (Using inline styling).',
    mandatory: true,
    props: {
      done: true,
      title: 'Buy todo apps'
    }
  },
  {
    name: 'Framer',
    description: 'Framer - receives a caption and will render it\'s children inside a colored frame, black background, and the caption passed. The frame will be as passed in props.color',
    mandatory: true,
    props: {
      color: 'red',
      caption: 'Hi there',
      children: <div>Content here</div>
    }
  },
  {
    name: 'SimpleCanvas',
    description: 'Simple canvas receives a matrix of N*M valid CSS colors, and displays them in a grid. You should not use the <canvas/> element, but simply divs with proper styling to make it look like a grid.',
    props: {
      data: [
        ['red', 'white', 'gray', 'orange'],
        ['green', 'yellow', 'gray', 'purple'],
        ['red', 'white', 'yellow', 'green'],
        ['red', 'green', 'gray', 'purple']
      ]
    }
  },
  {
    name: 'SpecialButton',
    mandatory: true,
    description: 'Special button - aside from receive a classic "onClick" method and calling it when the button is clicked, our special button receives another callback, "onSpecialClick", and uses it only if the button is clicked with a modifier key (CMD/ctrl in Windows). When special click is called, onClick should not be called.',
    props: {
      onClick: () => alert('clicked!'),
      onSpecialClick: () => alert('specially clicked!'),
      children: 'Special Button!'
    }
  },
  {
    name: 'TodoItem2',
    mandatory: true,
    description: 'Todo item v2! Enhances <TodoItem> from before so that now it has a small trash (🗑) button, and when clicking on the button, the "onRemove" callback will be called. Bonus: add a confirm validation before removing. Switch the button to use SpecialButton, and when special click is triggered, it will skip confirm.',
    props: {
      completed: false,
      title: 'Buy todo apps',
      onRemove: () => alert('Noooo000ooOOOO!')
    }
  },
  {
    name: 'SimpleCanvas2',
    description: 'Simple canvas v2! Add an event handler that will be called when a cell is clicked in the grid. The callback will be called with the row index, column index and color clicked.',
    props: {
      data: [['red', 'white'], ['yellow', 'green']],
      width: 500,
      onCellClick: (i, j, c) => alert(`you clicked on [${i}, ${j}], color: ${c}`)
    }
  },
  {
    name: 'TodoApp',
    description: 'A static view only Todo app! <TodoApp/> will receive a list of items, each consisting of a title, and whether it was done or not. It will simply display a list of items and call the onRemove callback with the right index when removing is called. \n Add an "Add" button in the end of the list, and when it is clicked, it will prompt the user (window.prompt) and call the "onAddItem" callback with the value.',
    mandatory: true,
    props: {
      items: [
        {title: 'Reach 1M', done: true},
        {title: 'Reach 5M', done: false}
      ],
      onRemove: idx => console.log(`You clicked on the remove button of item no. ${idx}`),
      onAddItem: title => console.log(`You wish to add an item - ${title}`)
    }
  }
];

const App = () => {
  return (
    <div id='app'>
      <h1>React Basics Exercises!</h1>
      <p>Each one of the items is an exercise. You should write a component in the <em>Components.js</em> file with the right name (see the initial <em>Title</em> one).</p>
      <p>Note that only the components file needs to be changed!</p>
      <marquee><em>Good luck!</em></marquee>
      {sandboxData.map((exercise, i) => {
        const Comp = Comps[exercise.name];
        return (<Container title={`${i + 1}. ${exercise.name}`} description={exercise.description} exampleProps={exercise.props} key={i}>
          {Comp ? <Comp {...exercise.props}>{exercise.props.children}</Comp> : <p style={{color: 'red'}}>Nothing written yet. Make sure to expose a a component called <strong>{exercise.name}</strong> from <em>Components.js</em></p>}
        </Container>);
      })}
      <h5>Do not forget to commit and push to your fork!</h5>
    </div>
  );
};

export default App;



/*
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/