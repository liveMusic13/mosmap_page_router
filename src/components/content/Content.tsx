import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import { IMarker } from '@/types/slice.types';
import styles from './Content.module.scss';
import { AllObjects } from './all-objects/AllObjects';
import Filters from './filters/Filters';
import AddAndEditObject from './filters/add-and-edit-object/AddAndEditObject';
import ObjectInfo from './object-info/ObjectInfo';

const DynamicMapCustom = dynamic(
	() => import('./custom-map/CustomMap').then(mod => mod.CustomMap),
	{ ssr: false },
);

export function Content({data}:any) {

	const viewSettings = useSelector((state: RootState) => state.viewSettings);
	const dataObjectsInMap = useSelector(
		(state: RootState) => state.dataObjectsInMap,
	);
	const { width } = useWindowDimensions();
	const [isDisplay, setIsDisplay] = useState<boolean>(true);
	const dispatch = useDispatch();

	useEffect(() => {
		if (width && width <= 768) {
			setIsDisplay(false);
			dispatch(viewSettingsAction.defaultDisplay(''));
		} else if (width && width > 768) {
			setIsDisplay(true);
			dispatch(viewSettingsAction.activeDisplay(''));
		}
	}, [width]);

	return (
		<div className={styles.wrapper}>
			{viewSettings.editingObjects.isActiveAddButton && <AddAndEditObject/>}
			{viewSettings.isViewFilters && <Filters />}
			{viewSettings.isObjectInfo && <ObjectInfo isDisplay={isDisplay} />}
			{viewSettings.isViewObjects &&
				dataObjectsInMap.points['all-points'] <= 6000 && (
					<AllObjects />
				)}
				<div style={{opacity:'0', position: 'absolute', zIndex: '-1'}}>
				{data.points.map((elem: IMarker) => {
						return (
							<div
								key={elem.id}
								className={styles.object}
							>
								<p>{elem.name}</p>
							</div>
						);
					})}</div>
			<div className={styles.block__map}>
				<DynamicMapCustom />
				<div className={styles.logo__image}>
					<a href='https://mosmap.ru'></a>
				</div>
			</div>
		</div>
	);
}
