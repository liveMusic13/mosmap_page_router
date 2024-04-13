import { useSelector } from 'react-redux';

import Button from '@/components/ui/button/Button';

import { RootState } from '@/store/store';

import ButtonEditing from '../ui/button-editing/ButtonEditing';
import styles from './Header.module.scss';
import { arrayEditingObjects, arrayNumIcons, arrayNumSettingIcons } from './icons.data';

export function Header({data}:any) {
	const dataObjectsInMap = useSelector(
		(state: RootState) => state.dataObjectsInMap,
	);
	
	return (
		<header className={styles.header}>
			<div className={styles.map__buttons}>
				{
					arrayEditingObjects.map(icon => {
						return <ButtonEditing key={icon.id} icon={icon} />;
					})
				}
				{arrayNumIcons.map(icon => {
					return <Button key={icon.id} icon={icon} />;
				})}
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
