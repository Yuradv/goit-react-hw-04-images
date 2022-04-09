import s from './Button.module.css';

export default function Button({ loadMore }) {
  return (
    <button className={s.button} type="button" onClick={loadMore}>
      Load More
    </button>
  );
}
