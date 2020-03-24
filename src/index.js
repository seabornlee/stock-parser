import parser from './parser'
function App() {
  const element = document.createElement('div');
  parser()
  return element;
}

document.body.appendChild(App());
