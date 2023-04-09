import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [widgets, setWidgets] = useState<string[]>([]);
  const [undoStack, setUndoStack] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') {
        undo();
      } else if (event.ctrlKey && event.key === 'y') {
        redo();
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [widgets, undoStack]);

  const undo = () => {
    if (widgets.length === 0) return;
    const popped = widgets.pop();
    setWidgets([...widgets]);
    if (popped) setUndoStack([...undoStack, popped]);
  }

  const redo = () => {
    debugger;
    if (undoStack.length === 0) return;
    const popped = undoStack.pop();
    setUndoStack([...undoStack]);
    if (popped) setWidgets([...widgets, popped]);
  }
  
  const handleOnDrag = (e: React.DragEvent, widget: string) => {
    e.dataTransfer.setData("widget", widget);
  }

  const handleOnDrop = (e: React.DragEvent) => {
    const widget = e.dataTransfer.getData("widget") as string;
    setWidgets([...widgets, widget]);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  return (
    <div className="App">
      <div className='Widgets'>
        <button onClick={undo}>undo</button>
        <button onClick={redo}>redo</button>
        <div className='Widget' draggable onDragStart={(e) => handleOnDrag(e, 'Widget A')} >
          Widget A
        </div>
        <div className='Widget' draggable onDragStart={(e) => handleOnDrag(e, 'Widget B')} >
          Widget B
        </div>
        <div className='Widget' draggable onDragStart={(e) => handleOnDrag(e, 'Widget C')} >
          Widget C
        </div>
        <div className='Widget' draggable onDragStart={(e) => handleOnDrag(e, 'Widget D')} >
          Widget D
        </div>
      </div>
      <div className='DropArea' onDrop={handleOnDrop} onDragOver={handleDragOver}>
        {widgets.map((widget, idx) => (
          <div key={idx}>{widget}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
