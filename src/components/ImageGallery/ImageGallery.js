import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

function Gallery({ pictures, toggleModal }) {
  return (
    <ul className={s.ImageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          tags={picture.tags}
          webformatURL={picture.webformatURL}
          largeImageURL={picture.largeImageURL}
          onClickItem={() => {
            toggleModal(picture.largeImageURL);
          }}
        />
      ))}
    </ul>
  );
}

ImageGalleryItem.propTypes = {
  pictures: PropTypes.array,
  toggleModal: PropTypes.func,
};

export default Gallery;
