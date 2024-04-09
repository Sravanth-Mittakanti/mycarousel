import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateMediaTitle, addMediaItem, removeMediaItem } from '../store/actions';

export interface MediaItem {
  id: number;
  type: string;
  url: string;
  title?: string;
}

interface MyCarouselProps {
  mediaPerPage: number;
}

interface CarouselStyles {
  container: React.CSSProperties;
  mediaContainer: React.CSSProperties;
  mediaItem: React.CSSProperties;
  inputText: React.CSSProperties;
  prevButton: React.CSSProperties;
  nextButton: React.CSSProperties;
  addButton: React.CSSProperties;
  removeButton: React.CSSProperties;
  buttonIcon: React.CSSProperties;
}

// styles definition
const carouselStyles: CarouselStyles = {
  container: {
    textAlign: 'center',
    width: '100%',
    position: 'relative',
    minHeight: 300,
  },
  mediaContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  mediaItem: {
    position: 'relative',
    width: '100%',
    height: 300,
    borderRadius: '30px',
    marginRight: 20
  },
  inputText: {
    position: 'absolute',
    bottom: -35,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '5px',
    width: '80%',
    boxSizing: 'border-box',
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: 0,
    marginLeft: '-25px',
    transform: 'translateY(-50%)',
    borderRadius: '50%',
    padding: 5,
    backgroundColor: 'black',
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: 0,
    marginRight: '-25px',
    transform: 'translateY(-50%)',
    borderRadius: '50%',
    padding: 5,
    backgroundColor: 'black',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderRadius: '5px',
    padding: '5px 10px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  removeButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    zIndex: 1,
    borderRadius: '5px',
    padding: '5px 10px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  buttonIcon: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    fontSize: 'larger',
  },
};

// Functional component
const MyCarousel: React.FC<MyCarouselProps> = ({ mediaPerPage }) => {
  const mediaItems = useSelector((state: RootState) => state.media);
  const dispatch = useDispatch();

  // component state
  const [activePage, setActivePage] = useState(0);

  // previous page event handler
  const handlePrevPage = () => {
    setActivePage((prevPage) => Math.max(0, prevPage - 1));
  };

  // next page event handler
  const handleNextPage = () => {
    const lastPage = Math.ceil(mediaItems.media.length / mediaPerPage) - 1;
    setActivePage((prevPage) => Math.min(lastPage, prevPage + 1));
  };

  // calculating index to display media items based on "mediaPerPage" prop
  const startIndex = activePage * mediaPerPage;
  const endIndex = startIndex + mediaPerPage;
  const visibleMedia = mediaItems.media.slice(startIndex, endIndex);

  // title change event handler
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = event.target;
    dispatch(updateMediaTitle({ id, title: value })); // dispatches update title to store 
  };

  const handleRemoveCard = (id: number) => {
    if (mediaItems.media.length > 0) {
      dispatch(removeMediaItem(id)); // dispatches remove card action to store
    }
  };

  return (
    <div style={carouselStyles.container}>
      <div style={carouselStyles.mediaContainer}>
        {visibleMedia.map((media: MediaItem, index: number) => (
          <div key={media.id} style={carouselStyles.mediaItem}>
            <button
              style={carouselStyles.removeButton}
              onClick={() => handleRemoveCard(media.id)}
            >
              X
            </button>
            {media.type === 'image' ? (
              <img
                src={media.url}
                style={{ ...carouselStyles.mediaItem, objectFit: 'cover' }}
                alt={media.title}
              />
            ) : (
              <video
                src={media.url}
                style={{ ...carouselStyles.mediaItem, objectFit: 'cover' }}
                controls
              />
            )}
            <input
              type="text"
              value={media.title || ''}
              onChange={(e) => handleInputChange(e, media.id)}
              style={carouselStyles.inputText}
            />
          </div>
        ))}
      </div>
      <div style={carouselStyles.prevButton}>
        <button style={{ ...carouselStyles.buttonIcon }} onClick={handlePrevPage}>&lt;</button>
      </div>
      <div style={carouselStyles.nextButton}>
        <button style={{ ...carouselStyles.buttonIcon }} onClick={handleNextPage}>&gt;</button>
      </div>
      
    </div>
  );
};

export default MyCarousel;
