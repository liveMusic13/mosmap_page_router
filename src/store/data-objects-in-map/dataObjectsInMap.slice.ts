import { createSlice } from '@reduxjs/toolkit';

import { IDataObjectsInMap } from '@/types/slice.types';

const initialState: IDataObjectsInMap = {
	points: {
		points: [],
	},
	centerMapObject: [55.7522, 37.6156],
};

export const dataObjectsInMap = createSlice({
	name: 'dataObjectsInMap',
	initialState,
	reducers: {
		addDataObjectsInMap: (state, { payload }) => {
			state.points = payload;
		},
		addNewCenter: (state, { payload }) => {
			state.centerMapObject = payload;
		},
		addNewObject: (state, {payload}) => {
			state.points.points.unshift(payload)
		},
		deleteNewObject: (state, {payload}) => {
			state.points.points.shift()
		},
		deleteObjectById: (state, {payload}) => {
			state.points.points = state.points.points.filter((marker:any) => marker.id !== payload)
		}
	},
});

export const { actions, reducer } = dataObjectsInMap;
