import { createSlice } from '@reduxjs/toolkit';

import { IViewSettings } from '@/types/slice.types';

const initialState: IViewSettings = {
	isViewFilters: true,
	isViewObjects: true,
	isSettingsMap: false,
	isObjectInfo: false,
	isLoading: false,
	isLoadingObject: false,
	isDisplay: true,
	isSelectArea: false,
	editingObjects: {
		isAddObject: true,
		isEditObjects: false,
		isDeleteObject: false,
		isDeleteMarker: false,
		isActiveAddButton: false,
		isActiveEditButton: false
	}
};

export const viewSettings = createSlice({
	name: 'viewSettings',
	initialState,
	reducers: {
		toggleIsActiveEditButton: (state, { payload }) => {
			return { ...state,  editingObjects: {...state.editingObjects, isActiveEditButton: !state.editingObjects.isActiveEditButton }};
		},
		toggleIsActiveAddButton: (state, { payload }) => {
			return { ...state,  editingObjects: {...state.editingObjects, isActiveAddButton: !state.editingObjects.isActiveAddButton }};
		},
		activeDeleteMarker: (state, { payload }) => {
			return { ...state,  editingObjects: {...state.editingObjects, isDeleteMarker: true }};
		},
		defaultDeleteMarker: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isDeleteMarker: false }};
		},
		activeDeleteObject: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isDeleteObject: true }};
		},
		defaultDeleteObject: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isDeleteObject: false }};
		},
		activeEditObjects: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isEditObjects: true }};
		},
		defaultEditObjects: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isEditObjects: false }};
		},
		toggleFilters: (state, { payload }) => {
			return { ...state, isViewFilters: !state.isViewFilters };
		},
		toggleObjects: (state, { payload }) => {
			return { ...state, isViewObjects: !state.isViewObjects };
		},
		toggleObjectInfo: (state, { payload }) => {
			return { ...state, isObjectInfo: true };
		},
		toggleSettingsMap: (state, { payload }) => {
			return { ...state, isSettingsMap: !state.isSettingsMap };
		},
		activeSettingsMap: (state, { payload }) => {
			return { ...state, isSettingsMap: true };
		},
		activeLoading: (state, { payload }) => {
			return { ...state, isLoading: true };
		},
		activeLoadingObject: (state, { payload }) => {
			return { ...state, isLoadingObject: true };
		},
		activeDisplay: (state, { payload }) => {
			return { ...state, isDisplay: true };
		},
		defaultDisplay: (state, { payload }) => {
			return { ...state, isDisplay: false };
		},
		defaultLoadingObject: (state, { payload }) => {
			return { ...state, isLoadingObject: false };
		},
		defaultLoading: (state, { payload }) => {
			return { ...state, isLoading: false };
		},
		defaultFilters: (state, { payload }) => {
			return { ...state, isViewFilters: false };
		},
		defaultObjects: (state, { payload }) => {
			return { ...state, isViewObjects: false };
		},
		defaultObjectInfo: (state, { payload }) => {
			return { ...state, isObjectInfo: false };
		},
		toogleIsSelectArea: (state, {payload}) => {
			return {...state, isSelectArea: !state.isSelectArea}
		}
	},
});

export const { actions, reducer } = viewSettings;
