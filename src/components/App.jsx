import  { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery'
import { ToastContainer } from "react-toastify"; 
import API from '../services/pixabay-api'
import Modal from './Modal'
import Button from "./Button";
import Loader from "./Loader";
import Error from "./Error";

const Status = {
  IDLE: "idle",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState('1');
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState('');
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false);
 
  
  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setLoader(true);

    API
      .fetchPictures(searchQuery, page)
      .then((data) => {
        setPictures(pictures => [...pictures, ...data.hits])
        setStatus(Status.RESOLVED)
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED)
      })
      .finally(() => setLoader(false));
  
  }, [searchQuery, page])
  
  
  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPictures([])
    setPage(1);
  };

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setBigImg(largeImageURL);
  };

  const loadMore = () => {
    setPage(page => page + 1)
  };


    if (status === Status.IDLE) {
      return (
        <div>
          <Searchbar onSubmit={handleFormSubmit} />
          <ToastContainer />
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '32px', color: '#3f51b5' }}>
            Enter your request</div>
              {loader && (<Loader />)}
        </div>
      )
  }

    if (status === Status.REJECTED) {
      return <Error message={error.message}/>
    }
  
    if (status === Status.RESOLVED) {
      return (
        <div>
          <Searchbar onSubmit={handleFormSubmit} />
          <ToastContainer />
          {loader && (<Loader />)}
          <ImageGallery
            pictures={pictures}
            toggleModal={largeImageURL => toggleModal(largeImageURL)} />
          {showModal && (
            <Modal onClose={toggleModal} picture={bigImg} />
          )}
          {pictures.length !== 0 && (
            <Button loadMore={loadMore}/>
          )}
        </div>
      );
  }
  
}

 