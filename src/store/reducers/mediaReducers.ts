// store/reducers/mediaReducer.ts
import { MediaItem } from '../../components/Carousel';
import { MediaActionTypes, UPDATE_MEDIA_TITLE, ADD_MEDIA_ITEM, REMOVE_MEDIA_ITEM } from '../actions';

export interface MediaState {
  media: MediaItem[];
}

const initialState: MediaState = { 
  media: [
  { id: 1, type: 'image', url: 'https://source.unsplash.com/random/1', title: 'Card Title 1' },
  { id: 2, type: 'image', url: 'https://source.unsplash.com/random/2', title: '' },
  { id: 3, type: 'image', url: 'https://source.unsplash.com/random/3', title: '' },
  { id: 4, type: 'image', url: 'https://source.unsplash.com/random/4', title: '' },
  { id: 5, type: 'image', url: 'https://source.unsplash.com/random/5', title: '' },
  { id: 6, type: 'image', url: 'https://source.unsplash.com/random/7', title: '' },
  { id: 7, type: 'video', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', title: '' },
  { id: 8, type: 'image', url: 'https://source.unsplash.com/random/8', title: '' },
  { id: 9, type: 'image', url: 'https://source.unsplash.com/random/9', title: '' },
  { id: 10, type: 'video', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', title: '' },
  // Add more image and video URLs as needed
]};

const mediaReducer = (state = initialState, action: MediaActionTypes): MediaState => {
  switch (action.type) {
    case UPDATE_MEDIA_TITLE:
      return {
        ...state,
        media: state.media.map((mediaItem) =>
          mediaItem.id === action.payload.id ? { ...mediaItem, title: action.payload.title } : mediaItem
        ),
      };
    case ADD_MEDIA_ITEM:
      return {
        ...state,
        media: [...state.media, action.payload],
      };
    case REMOVE_MEDIA_ITEM:
      return {
        ...state,
        media: state.media.filter((mediaItem) => mediaItem.id !== action.payload),
      };
    default:
      return state;
  }
};

export default mediaReducer;
