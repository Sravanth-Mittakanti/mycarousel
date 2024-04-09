import { MediaItem } from "../components/Carousel";

export const UPDATE_MEDIA_TITLE = 'UPDATE_MEDIA_TITLE';
export const ADD_MEDIA_ITEM = 'ADD_MEDIA_ITEM';
export const REMOVE_MEDIA_ITEM = 'REMOVE_MEDIA_ITEM';

export interface UpdateMediaTitleAction {
  type: typeof UPDATE_MEDIA_TITLE;
  payload: { id: number; title: string };
}

export interface AddMediaItemAction {
  type: typeof ADD_MEDIA_ITEM;
  payload: MediaItem;
}

export interface RemoveMediaItemAction {
  type: typeof REMOVE_MEDIA_ITEM;
  payload: number;
}

export type MediaActionTypes = UpdateMediaTitleAction | AddMediaItemAction | RemoveMediaItemAction;

export const updateMediaTitle = (payload: { id: number; title: string }): UpdateMediaTitleAction => ({
  type: UPDATE_MEDIA_TITLE,
  payload,
});

export const addMediaItem = (payload: MediaItem): AddMediaItemAction => ({
  type: ADD_MEDIA_ITEM,
  payload,
});

export const removeMediaItem = (id: number): RemoveMediaItemAction => ({
  type: REMOVE_MEDIA_ITEM,
  payload: id,
});
