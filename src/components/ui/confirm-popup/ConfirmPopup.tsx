import { useDeleteMarker } from '@/hooks/useDeleteMarker'
import { useDeleteObject } from '@/hooks/useDeleteObject'
import { RootState } from '@/store/store'
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ConfirmPopup.module.scss'

const ConfirmPopup: FC = () => {
  const buttons:string[] = ['Подтвердить', 'Отмена']
  const {isViewPopup} = useSelector((state:RootState)=> state.viewSettings.editingObjects)
  const dispatch = useDispatch()
  const {deleteObject} = useDeleteObject()
  const {deleteMarker} = useDeleteMarker()

  const _onClick = async (buttonText: string) => {
    if (buttonText === 'Отмена') {
      console.log('fsdfsdfs')
      dispatch(viewSettingsAction.defaultIsViewPopupMarker(''));
      dispatch(viewSettingsAction.defaultIsViewPopupObject(''));
    } else {
      if (isViewPopup.isMarker) {
        await deleteMarker();
        dispatch(viewSettingsAction.defaultIsViewPopupMarker(''));
      } else if (isViewPopup.isObject) {
        await deleteObject();
        dispatch(viewSettingsAction.defaultIsViewPopupObject(''));
      }
    }
  };

  return (
      <div className={styles.wrapper_popup}>
        {isViewPopup.isMarker && <p className={styles.questions}>Удалить маркер ?</p> }
        {isViewPopup.isObject && <p className={styles.questions}>Удалить объект ?</p> }
        <div className={styles.block__button}>
          {
            buttons.map(button => ( <button key={button} onClick={() => _onClick(button)}>{button}</button> ))
          }
        </div>
      </div>
  )
}

export default ConfirmPopup