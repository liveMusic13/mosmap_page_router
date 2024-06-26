import { useEffect, useState } from 'react';
import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { IDataObjectsInMap } from '@/types/slice.types';

import { RootState } from '@/store/store';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import MarkerClusterGroup from 'react-leaflet-cluster';
import { EditControl } from 'react-leaflet-draw';
import CanvasMarkersLayer from './CanvasMarkersLayer';
import FlyToLocation from './FlyToLocation';
import RenderMarkers from './RenderMarkers';
import ZoomTracker from './ZoomTracker';

import { actions as mapLayersAction } from '@/store/map-layers/mapLayers.slice';
import 'leaflet-draw/dist/leaflet.draw.css';
import ClosePopup from './ClosePopup';
import LocationMarker from './LocationMarker';

export function CustomMap() {
	const dataObjectsInMap: IDataObjectsInMap = useSelector(
		(state: RootState) => state.dataObjectsInMap,
	);
	const viewSettings = useSelector(
		(state: RootState) => state.viewSettings,
	);
	const { width } = useWindowDimensions();
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isInitialized, setIsInitialized] = useState<boolean>(false); //HELP: ДЛЯ ОТСЛЕЖИВАНИЯ ИНИЦИАЛИЗАЦИИ, ЧТОБЫ ПРИ ПЕРВОМ ЗАПУСКЕ ЗУМ НА 17 НЕ СТАВИЛСЯ
	const [center, setCenter] = useState<[number, number]>([55.7522, 37.6156]); // Значения по умолчанию
	
	useEffect(() => {
		if (width) {
			if (width <= 767.98) {
				setIsMobile(true);
			}
		}
	}, [width]);

	const [zoomLevel, setZoomLevel] = useState<number>(13);

	useEffect(() => {
		if (
			Array.isArray(dataObjectsInMap.centerMapObject) &&
			dataObjectsInMap.centerMapObject.length === 2
		) {
			setCenter(dataObjectsInMap.centerMapObject as [number, number]);
		}
	}, [dataObjectsInMap.centerMapObject]); //HELP: ПРОВЕРКА, ЧТОБЫ НЕ РУГАЛСЯ TYPESCRIPT

	// const _onCreated = (e: any) => {
	// 	console.log(e)

	// 	const {layerType, layer} = e
	// 	if (layerType === 'polygon') {
	// 		const {_leaflet_id} = layer
	// 		setMapLayers((layers:any) => [...layers, {id: _leaflet_id, latLngs: layer.getLatLngs()[0]}])
	// 	}

	// 	console.log(mapLayers)
	// }
	// const _onEdited = (e: any) => {
	// 	console.log(e)

	// 	const {layers:{_layers}} = e;

	// 	Object.values(_layers).map(({_leaflet_id, editing}:any) => {
	// 		setMapLayers((layers:any) => layers.map((l:any) => l.id === _leaflet_id ? {...l, latLngs: {...editing.latLngs[0]}}: l))
	// 	})
	// }
	// const _onDeleted = (e: any) => {
	// 	console.log(e)

	// 	const {layers:{_layers}} = e;
	// 	Object.values(_layers).map(({_leaflet_id}:any) => {
	// 		setMapLayers((layers:any) => layers.filter((l:any)=> l.id !== _leaflet_id))
	// 	})
	// }
	const dispatch = useDispatch();
	const _onCreated = (e: any) => {
		console.log(e)
	
		const {layerType, layer} = e
		if (layerType === 'polygon') {
			const {_leaflet_id} = layer

			layer.on('click', () => dispatch(mapLayersAction.setTargetPolygonIndex(_leaflet_id)))

			dispatch(mapLayersAction.addPolygon({id: _leaflet_id, latLngs: layer.getLatLngs()[0]}));
		}
	}
	const _onDeleted = (e: any) => {
		console.log(e)
	
		const {layers:{_layers}} = e;
		Object.values(_layers).map(({_leaflet_id}:any) => {
			dispatch(mapLayersAction.deletePolygon(_leaflet_id));
		})
	}
// const _onEdited = (e: any) => {
	// 	console.log(e)
	
	// 	const {layers:{_layers}} = e;
	
	// 	Object.values(_layers).map(({_leaflet_id, editing}:any) => {
	// 		dispatch(mapLayersAction.editPolygon({id: _leaflet_id, latLngs: editing.latLngs[0]}));
	// 	})
	// }

	return (
	
		<MapContainer
			center={center}
			zoom={13}
			minZoom={10}
			maxZoom={17}
			style={{ width: '100%', height: '98%' }}
			maxBounds={[
				[56.934709, 35.189603], //HELP: Северо-западные координаты
				[54.294416, 40.128181], //HELP: Юго-восточные координаты
			]}
		>
			<TileLayer url='https://www.moscowmap.ru/leaflet/tiles/{z}/{x}/{y}.png' />
			<ZoomTracker setZoomLevel={setZoomLevel} />
			{dataObjectsInMap.points.canvas_map === 0 ? (
				dataObjectsInMap.points.clastering === 0 ? (
					<RenderMarkers isMobile={isMobile} zoomLevel={zoomLevel} />
				) : (
					<MarkerClusterGroup chunkedLoading={true}>
						<RenderMarkers isMobile={isMobile} zoomLevel={zoomLevel} />
					</MarkerClusterGroup>
				)
			) : (
				<CanvasMarkersLayer
					isMobile={isMobile}
					markersData={dataObjectsInMap.points.points}
				/>
			)}
			<FlyToLocation
				centerMapObject={dataObjectsInMap.centerMapObject}
				isInitialized={isInitialized} //HELP: ДЛЯ ОТСЛЕЖИВАНИЯ ИНИЦИАЛИЗАЦИИ, ЧТОБЫ ПРИ ПЕРВОМ ЗАПУСКЕ ЗУМ НА 17 НЕ СТАВИЛСЯ
				setIsInitialized={setIsInitialized}
			/>
			{(viewSettings.editingObjects.isActiveAddButton || viewSettings.editingObjects.isActiveEditButton) && <LocationMarker/>}
			{
				viewSettings.isSelectArea && <FeatureGroup>
				<EditControl position='topright' onCreated={_onCreated} onDeleted={_onDeleted} draw={{
					rectangle: false,
					polyline: false,
					circlemarker: false,
					marker: false,
					circle:false
				}}/>
			</FeatureGroup>
			}
			<ClosePopup/>
		</MapContainer>
	
	);
}
