import React, { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery'
import { ToastContainer } from "react-toastify"; 
import API from '../services/pixabay-api'
import Modal from './Modal'
import Button from "./Button";
import Loader from "./Loader";


export default class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    status: 'idle',
    page: 1,
    showModal: false,
    bigImg: '',
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
      .catch(error => this.setState({ error, status: 'rejected' }));
  }
  
  
  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
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
    const { status, pictures, bigImg, searchQuery } = this.state;
    
    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer />
        </div>
      )
    }

    if (status === 'pending') {
      return <Loader/>
    }

    if (status === 'rejected') {
      return <div><h3>We could not find anything on request - {searchQuery} </h3></div>
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

 