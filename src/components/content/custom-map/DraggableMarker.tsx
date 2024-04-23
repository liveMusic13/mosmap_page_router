import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';

const DraggableMarker: FC = () => {
  const dispatch = useDispatch()

	useMapEvents({
    dragend() {
        console.log('ok1'); // Здесь вы получаете координаты клика
        // dispatch(dataObjectInfoAction.addCrd([parseFloat((e.latlng.lat).toString().substring(0, 7)), parseFloat((e.latlng.lng).toString().substring(0, 7))]))
        // dispatch(dataObjectInfoAction.addCrd([e.latlng.lat, e.latlng.lng]))
    },
    drag() {
      console.log('ok')
    }
});

  return null
}

export default DraggableMarker