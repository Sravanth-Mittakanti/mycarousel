import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import MyCarousel from './Carousel';
import { addMediaItem } from '../store/actions';

interface CarouselContainerProps {}

const CarouselContainer: React.FC<CarouselContainerProps> = () => {
  const [visibleCards, setVisibleCards] = useState<number>(4);
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibleCards(Number(event.target.value));
  };

  const styles = {
    addButton: {
      position: 'absolute',
      borderRadius: '5px',
      padding: '5px 10px',
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      marginLeft: 30
    },
  };

  // selector hook
  const mediaItems = useSelector((state: RootState) => state.media);

  // redux dispach hook
  const dispatch = useDispatch();


  // add card event to add new card to add calls dispatch "addMediaItem" action
  const handleAddCard = () => {
    const id = mediaItems.length + 1;
    dispatch(addMediaItem({ id, type: 'image', url: 'https://source.unsplash.com/random/' + id, title: '' }));
  };

  return (
    <>
      <div style={{ margin: 50 }}>
        <label htmlFor="visibleCards">Number of Visible Cards:</label>
        <input style={{ width: 100 }} min={1} max={4} type='number' id="visibleCards" value={visibleCards} onChange={handleSelectChange} />
      
      <button style={styles.addButton} onClick={handleAddCard}>Add Card</button>
      </div>
      
      <MyCarousel mediaPerPage={visibleCards} />
    </>
  );
};

export default CarouselContainer;
