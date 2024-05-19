import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/ui/button/Button';

import { RootState } from '@/store/store';

import { ACCESSIBLYMAP } from '@/app.constants';
import { useAuth } from '@/hooks/useAuth';
import { useSaveObject } from '@/hooks/useSaveObject';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';
import Cookies from 'js-cookie';
import ButtonEditing from '../ui/button-editing/ButtonEditing';
import styles from './Header.module.scss';
import { arrayEditingObjects, arrayNumIcons, arrayNumSettingIcons } from './icons.data';

export function Header({data}:any) {
	const dispatch = useDispatch()
	const dataObjectsInMap = useSelector(
		(state: RootState) => state.dataObjectsInMap,
	);
	const viewSettings = useSelector(
		(state: RootState) => state.viewSettings,
	);
	const {map, accessiblyMap} = useSelector(
		(state: RootState) => state.userMap,
	);
	const {saveObjectMobile} = useSaveObject()
	const { width } = useWindowDimensions();
	const {isAuth} = useAuth()
	const searchParams = new URLSearchParams(window.location.search);
	
	const isEdit = accessiblyMap.some(elem => elem === map)

	const isEdit1 = Cookies.get(ACCESSIBLYMAP) === searchParams.get('map')
	console.log('isEdit', isEdit1)

	return (
		<header className={styles.header}>
			<div className={styles.map__buttons}>
				{/* {	(isAuth) &&
					arrayEditingObjects.map(icon => {
						return <ButtonEditing key={icon.id} icon={icon} />;
					})
				} */}
					{	(isAuth && isEdit1) && 
					arrayEditingObjects.map(icon => {
						return <ButtonEditing key={icon.id} icon={icon} />;
					})
				}
				{/* {
					arrayEditingObjects.map(icon => {
						return <ButtonEditing key={icon.id} icon={icon} />;
					})
				} */}
				{ arrayNumIcons.map(icon => {
					return <Button key={icon.id} icon={icon} />;
				})}
				
				{((isAuth && isEdit1) && (width && width <= 767.98)) && <button className={styles.crd__button} onClick={()=> {
						if (viewSettings.editingObjects.isMobileEditCrd) {
							dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
							dispatch(viewSettingsAction.toggleIsMobileEditCrd(''))

							const timeoutId = setTimeout(()=> {
								// saveObject()
								saveObjectMobile()
							}, 1000)
							return () => clearTimeout(timeoutId)
						} else {
							dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
							dispatch(viewSettingsAction.toggleIsMobileEditCrd(''))
						}
							}}><svg className={styles.crd__marker} style={viewSettings.editingObjects.isMobileEditCrd ? {color: 'red'} : {color: '#26a69a'}}>
									<use
										xlinkHref={'/images/svg/sprite.svg#target'}
									></use>
								</svg></button> }

				<div className={styles.block__title}>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
					<h1 className={styles.title}>т
							{data.title
							? data.title
							: 'Тестовая карта'}
					</h1>
				</div>
			</div>
			<div className={styles.settings__buttons}>
				{arrayNumSettingIcons.map(icon => {
					if (dataObjectsInMap.points['all-points'] >= 6000 && icon.id === 7) {
						return null;
					} else {
						return <Button key={icon.id} icon={icon} />;
					}
				})}
			</div>
		</header>
	);
}
