import s from './Button.module.css';

export default function Button({ loadMore }) {
  return (
    <div className={s.container}>
      <button className={s.button} type="button" onClick={loadMore}>
        Load More
      </button>
    </div>
  );
}
