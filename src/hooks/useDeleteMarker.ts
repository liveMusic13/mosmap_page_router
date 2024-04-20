import { editObjectService } from "@/services/editObject.servece"
import { actions as dataObjectInfoAction } from "@/store/data-object-info/dataObjectInfo.slice"
import { actions as dataObjectsInMapAction } from "@/store/data-objects-in-map/dataObjectsInMap.slice"
import { RootState } from "@/store/store"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

export const useDeleteMarker = () => {
  const dispatch = useDispatch()
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)
  const {query} = useRouter()

  // const deleteMarker = async () => {
  //   await dispatch(dataObjectInfoAction.deleteCrd(''))

    
  //   const timeoutId = setTimeout(()=> {
  //     const request = async () => {

  //       console.log(dataObjectInfo.crd)
  //       if (typeof query.map === 'string' && dataObjectInfo.crd === null) {
  
  //         console.log(dataObjectInfo.crd)
  //         const data = await editObjectService.saveFieldForAddObject(query.map, dataObjectInfo)
  //         await dispatch(dataObjectsInMapAction.replacementNewObject(data))
  //       }
  //     }
  //     request()
  //   }, 1500)

  //   return () => clearTimeout(timeoutId)
  // }

  const deleteMarker = async () => {
    await dispatch(dataObjectInfoAction.deleteCrd(''))

      if (typeof query.map === 'string') {
  
        console.log(dataObjectInfo.crd)
        const data = await editObjectService.saveFieldForAddObject(query.map, {...dataObjectInfo, crd: null})
        // const data = await editObjectService.saveFieldForAddObject(query.map, {id: dataObjectInfo.id, crd: [0,0], values:[]})
        // const data = await editObjectService.saveFieldForAddObject(query.map, {id: dataObjectInfo.id, crd: [0,0], values:dataObjectInfo.values})
        await dispatch(dataObjectsInMapAction.replacementNewObject(data))
      }
    }

  return {deleteMarker}
}