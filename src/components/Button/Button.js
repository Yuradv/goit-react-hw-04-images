import PropTypes from 'prop-types';
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

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
