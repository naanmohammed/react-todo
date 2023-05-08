// import logo from './logo.svg';
// eslint-disable-next-line
import { Outlet } from 'react-router';
import './App.css';
import TodoApp from './components/todo-app';

export default function App() {
  return (
    <>
      <TodoApp />
      <Outlet />
    </>
  );
}
