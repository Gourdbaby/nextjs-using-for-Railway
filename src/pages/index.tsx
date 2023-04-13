import { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { createTodo, deleteTodo, toggleTodo, useTodos } from "../api";
import styles from "../styles/Home.module.css";
import { Todo } from "../types";

export const TodoList: React.FC = () => {
  const { data: todos, error } = useTodos();

  if (error != null) return <div>Error loading todos...</div>;
  if (todos == null) return <div>Loading...</div>;

  if (todos.length === 0) {
    return <div className={styles.emptyState}>Try adding a todo ☝️️</div>;
  }

  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <TodoItem todo={todo} />
      ))}
    </ul>
  );
};

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => (
  <li className={styles.todo}>
    <label
      className={`${styles.label} ${todo.completed ? styles.checked : ""}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        className={`${styles.checkbox}`}
        onChange={() => toggleTodo(todo)}
      />
      {todo.text}
    </label>

    <button className={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>
      ✕
    </button>
  </li>
);

const AddTodoInput = () => {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        createTodo(text);
        setText("");
      }}
      className={styles.addTodo}
    >
      <input
        className={styles.input}
        placeholder="what do you want to know?"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className={styles.addButton}>Ask Chatgpt</button>
    </form>
  );
};

const ContentArea = () => {
  return (
    <div className={styles.contentarea}>
      123
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chatgpt from Gourdbaby</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContentArea></ContentArea>

      <main className={styles.main}>
        <AddTodoInput />
        {/* <TodoList /> */}
      </main>
    </div>
  );
};

export default Home;
