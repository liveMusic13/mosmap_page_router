import { actions as dataObjectInfoAction } from '@/store/data-object-info/dataObjectInfo.slice';
import { RootState } from '@/store/store';
import { debounceCustom } from '@/utils/debounce';
import { transformFieldForSelect } from '@/utils/transformFieldForSelect';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './AddAndEditObject.module.scss';

const AddAndEditObject: FC = () => {
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)
  const dataFilters = useSelector((state:RootState)=> state.dataFilters)
  const [formState, setFormState] = useState<any>({});
  const dispatch = useDispatch()
  
  const debouncedDispatch = debounceCustom((name, value) => {
    dispatch(dataObjectInfoAction.updateField({ name, value }));
  }, 500);

  // useEffect(()=> {
  //   dataObjectInfo.values.forEach((field:any)=> {

  //   })
  //   console.log(formState)
  // },[formState])

  const handleChange = (value:any, name:string) => {
    setFormState((prevState:any) => ({...prevState, [name]: value}));
    debouncedDispatch(name, value);
  };

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
    <div className={styles.block__filters}>
      <div className={styles.block__title}>
				<h2 className={styles.title}>Добавление объекта</h2>
				<button
					className={styles.button__close}
				>
					<span></span>
				</button>
			</div>
      <div className={styles.wrapper_block__filters}>
        {
          dataObjectInfo?.values?.map((field:any) => {
            if (field.el === 'input') {
              return (
                <div className={`${styles.block__input} ${formState[field.name] && styles.has_content}`} key={field.name}>
                {/* <div className={styles.has_content} key={field.name}> */}
                  <label htmlFor={field.name} className={styles.input__label}>{field.label}</label>
                  <input type="text" className={styles.input__login} id={field.name} value={formState[field.name] || ''} onChange={(e) => handleChange(e.target.value, field.name)}/>
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
                          <Select key={field.name} styles={customStyles} options={optionsAgent} value={formState[field.name]} onChange={(value) => handleChange(value, field.name)}/>
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
    </div>
  )

  // return (
  //   <div className={styles.block__filters}>
  //     <div className={styles.block__title}>
	// 			<h2 className={styles.title}>Добавление объекта</h2>
	// 			<button
	// 				className={styles.button__close}
	// 			>
	// 				<span></span>
	// 			</button>
	// 		</div>
  //     <div className={styles.wrapper_block__filters}>
  //       {
  //         dataObjectInfo?.values?.map((field:any) => {
  //           if (field.el === 'input') {
  //             return (
  //               <div className={`${styles.block__input} ${inputValue && styles.has_content}`} key={Math.random()}>
  //                 <label htmlFor={field.name} className={styles.input__label}>{field.label}</label>
  //                 <input type="text" className={styles.input__login} id={field.name} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
  //               </div>
  //             )
  //           } else {
  //             return (
  //               <>
  //               {
  //                 dataFilters.map((filter:any) => {

  //                   if (field.name === filter.name) {
  //                     const optionsAgent = transformFieldForSelect(filter.items);
  //                     console.log(optionsAgent)
  //                     return (
  //                       <Select key={Math.random()} styles={customStyles} options={optionsAgent} value={selectedOption} onChange={handleChange}/>
  //                     )
  //                   } else {
  //                     return null
  //                   }
  //                 })
  //               }
  //               </>
  //             ) 
  //           }
  //         })
  //       }
  //     </div>
  //   </div>
  // )
}

export default AddAndEditObject