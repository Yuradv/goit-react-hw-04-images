import React, { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery'
import { ToastContainer } from "react-toastify"; 
import API from '../services/pixabay-api'
import Modal from './Modal'
import Button from "./Button";
import Loader from "./Loader";
import Error from "./Error";


export default class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    status: 'idle',
    page: 1,
    showModal: false,
    bigImg: '',
    error: null,
  }
  
  
  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.searchQuery;
    const nextImages = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImages !== nextImages) {
      this.setState({
        status: 'pending',
        page: 1,
        pictures: [],
      });
      this.fetchPictures(nextImages, nextPage);
    }
    
    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchPictures(nextImages, nextPage);
    }
    
  }

  fetchPictures(nextImages, nextPage) {
    API.fetchPictures(nextImages, nextPage)
      .then(data => {
        this.setState(prevState => {
          return {
            prevState,
            pictures: [...prevState.pictures, ...data.hits],
            status: 'resolved',
            searchQuery: nextImages,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected'}));
  }
  
  
  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery, page: 1, status: 'pending'});
  };

  
  toggleModal = largeImageURL  => {
    this.setState(({showModal, bigImg }) => ({
      showModal: !showModal,
      bigImg: largeImageURL,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  

  render() {
    const { status, pictures, bigImg, error } = this.state;
    
    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer />
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '32px', color: '#3f51b5' }}>
            Enter your request</div>
        </div>
      )
    }

    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer />
          <Loader />
        </div>
        )
    }

    if (status === 'rejected') {
      return <Error message={error.message}/>
    }
  
    if (status === 'resolved') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer />
          <ImageGallery
            pictures={pictures}
            toggleModal={largeImageURL => this.toggleModal(largeImageURL)} />
          {this.state.showModal && (
            <Modal onClose={this.toggleModal} picture={bigImg} />
          )}
          {this.state.pictures.length !== 0 && (
            <Button loadMore={this.loadMore}/>
          )}
        </div>
      );
    }
  }
}

 