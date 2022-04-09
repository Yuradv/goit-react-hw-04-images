import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onClickItem,
}) {
  return (
    <li key={id} className={s.ImageGalleryItem}>
      <img
        className={s.image}
        alt={tags}
        src={webformatURL}
        data-source={largeImageURL}
        onClick={() => {
          onClickItem(largeImageURL);
        }}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickItem: PropTypes.func.isRequired,
};
