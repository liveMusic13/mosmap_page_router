import useWindowDimensions from '@/hooks/useWindowDimensions';
import { actions as dataObjectInfoAction } from '@/store/data-object-info/dataObjectInfo.slice';
import { RootState } from '@/store/store';
import { debounceCustom } from '@/utils/debounce';
import { transformFieldForSelect } from '@/utils/transformFieldForSelect';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './AddAndEditObject.module.scss';

const AddAndEditObject: FC = () => {
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)
  const dataFilters = useSelector((state:RootState)=> state.dataFilters)
  const viewSettings = useSelector((state:RootState)=> state.viewSettings)
  const [formState, setFormState] = useState<any>({});
  const dispatch = useDispatch()
  const { width } = useWindowDimensions();
  
  const debouncedDispatch = debounceCustom((name, value) => {
    dispatch(dataObjectInfoAction.updateField({ name, value }));
  }, 500);

const handleChange = (selectedOption:any, name:string, type:string) => {
  setFormState((prevState:any) => ({...prevState, [name]: selectedOption}));
  if (type === 'input') {
    debouncedDispatch(name, selectedOption);
  } else {
    debouncedDispatch(name, selectedOption.label);
  }
};

useEffect(() => {
  if (viewSettings.editingObjects.isActiveEditButton) {
    const initialFormState:any = {};
    dataObjectInfo?.values?.forEach((field:any) => {
      if (field.el === 'input') {
        initialFormState[field.name] = field.value;
      } else {
        const filter = dataFilters.find((filter:any) => filter.name === field.name);
        if (filter) {
          const optionsAgent = transformFieldForSelect(filter.items);
          const value = optionsAgent.find((option) => option.label === field.value);
          initialFormState[field.name] = [value] || null;
        }
      }
    });
    setFormState(initialFormState);
  }
}, [viewSettings.editingObjects.isActiveEditButton, dataObjectInfo?.values]);

// useEffect(() => {
//   if (viewSettings.editingObjects.isActiveEditButton) {
//     const initialFormState = {};
//     dataObjectInfo?.values?.forEach((field:any) => {
//       if (field.el === 'input') {
//         initialFormState[field.name] = field.value;
//       } else {
//         const filter = dataFilters.find((filter) => filter.name === field.name);
//         console.log(filter)
//         if (filter) {
//           const optionsAgent = transformFieldForSelect(filter.items);
//           const value = optionsAgent.find((option) => option.label === field.value);
//           console.log(optionsAgent, field.value, filter, field, value)
//           initialFormState[field.name] = value || null;
//         }
//       }
//     });
//     setFormState(initialFormState);
//   }
// }, [viewSettings.editingObjects.isActiveEditButton, dataObjectInfo?.values]);

  const customStyles = {
		option: (provided: any, state: any) => ({
      ...provided,
			'&:hover': {
        cursor: 'pointer',
      },
		}),
		control: (provided: any, state: any) => ({
			...provided,
			maxHeight: 'calc(40 / 1440 * 100vw)',
			overflow: 'auto',
			border: state.isFocused ? '1px solid #26a69a' : 'none',
			boxShadow: state.isFocused ? '0px 0px 3px #26a69a' : 'none',
			borderBottom: state.isFocused ? '1px solid #26a69a' : '1px solid #121212',
			borderRadius: '0px',
			'&:hover': {
				borderColor: '#26a69a',
				boxShadow: '0px 0px 3px #26a69a',
				cursor: 'pointer',
			},
		}),
	};

  return (
    <div className={styles.block__filters} style={width && width <= 767.98 ? {marginTop:'calc(142 / 1440 * 100vw)'}:{}}>
      <div className={styles.block__title}>
				<h2 className={styles.title}>Добавление объекта</h2>
				<button
					className={styles.button__close}
				>
					<span></span>
				</button>
			</div>
      { viewSettings.editingObjects.isActiveEditButton ?
        <div className={styles.wrapper_block__filters}>
        {
          dataObjectInfo?.values?.map((field:any) => {
            if (field.el === 'input') {
              return (
                <div className={`${styles.block__input} ${formState[field.name] && styles.has_content}`} key={field.name}>
                  <label htmlFor={field.name} className={styles.input__label}>{field.label}</label>
                  <input type="text" className={styles.input__login} id={field.name} value={formState[field.name] || field.value} onChange={(e) => handleChange(e.target.value, field.name, field.el)}/>
                </div>
              )
            } else {
              return (
                <>
                {
                  dataFilters.map((filter:any) => {
                    if (field.name === filter.name) {
                      const optionsAgent = transformFieldForSelect(filter.items);

                      return (
                        <div className={styles.block__select}>
                          <h3 className={styles.title}>{filter.caption}</h3>
                          <Select key={field.name} styles={customStyles} options={optionsAgent} value={formState[field.name]} onChange={(value) => handleChange(value, field.name, 'select')}/>
                        </div>
                      )
                    } else {
                      return null
                    }
                  })
                }
                </>
              ) 
            }
          })
        }
      </div> : <div className={styles.wrapper_block__filters}>
      {
          dataObjectInfo?.values?.map((field:any) => {
            if (field.el === 'input') {
              return (
                <div className={`${styles.block__input} ${formState[field.name] && styles.has_content}`} key={field.name}>
                {/* <div className={styles.has_content} key={field.name}> */}
                  <label htmlFor={field.name} className={styles.input__label}>{field.label}</label>
                  <input type="text" className={styles.input__login} id={field.name} value={formState[field.name] || ''} onChange={(e) => handleChange(e.target.value, field.name, field.el)}/>
                </div>
              )
            } else {
              return (
                <>
                {
                  dataFilters.map((filter:any) => {
                    if (field.name === filter.name) {
                      const optionsAgent = transformFieldForSelect(filter.items);
                      return (
                        <div className={styles.block__select}>
                          <h3 className={styles.title}>{filter.caption}</h3>
                          <Select key={field.name} styles={customStyles} options={optionsAgent} value={formState[field.name]} onChange={(value) => handleChange(value, field.name, 'select')}/>
                        </div>
                      )
                    } else {
                      return null
                    }
                  })
                }
                </>
              ) 
            }
          })
        }
      </div>
      }
    </div>
  )
}

export default AddAndEditObject

// {/*<div className={styles.wrapper_block__filters}>
//         {
//           dataObjectInfo?.values?.map((field:any) => {
//             if (field.el === 'input') {
//               return (
//                 <div className={`${styles.block__input} ${formState[field.name] && styles.has_content}`} key={field.name}>
//                   <label htmlFor={field.name} className={styles.input__label}>{field.label}</label>
//                   <input type="text" className={styles.input__login} id={field.name} value={formState[field.name] || ''} onChange={(e) => handleChange(e.target.value, field.name)}/>
//                 </div>
//               )
//             } else {
//               return (
//                 <>
//                 {
//                   dataFilters.map((filter:any) => {
//                     if (field.name === filter.name) {
//                       const optionsAgent = transformFieldForSelect(filter.items);
//                       return (
//                         <div className={styles.block__select}>
//                           <h3 className={styles.title}>{filter.caption}</h3>
//                           <Select key={field.name} styles={customStyles} options={optionsAgent} value={formState[field.name]} onChange={(value) => handleChange(value, field.name)}/>
//                         </div>
//                       )
//                     } else {
//                       return null
//                     }
//                   })
//                 }
//                 </>
//               ) 
//             }
//           })
//         }
//       </div>*/}