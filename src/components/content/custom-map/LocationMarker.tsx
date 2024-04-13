import { actions as dataObjectInfoAction } from '@/store/data-object-info/dataObjectInfo.slice';
import { RootState } from '@/store/store';
import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

const LocationMarker: FC = () => {
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)
  const dispatch = useDispatch()

	const map = useMapEvents({
    click(e) {
        console.log(e.latlng); // Здесь вы получаете координаты клика
        // dispatch(dataObjectInfoAction.addCrd([parseFloat((e.latlng.lat).toString().substring(0, 7)), parseFloat((e.latlng.lng).toString().substring(0, 7))]))
        dispatch(dataObjectInfoAction.addCrd([e.latlng.lat, e.latlng.lng]))
    },
});

  return null
}

export default LocationMarker