import { TOKEN } from '@/app.constants';
import { IIsAuth } from '@/types/provider.types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

export const AuthContext = createContext<IIsAuth>({} as IIsAuth)

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
  const [isAuth, setIsAuth] = useState(!!Cookies.get(TOKEN));
  const router = useRouter()
  useEffect(()=> {
    if(isAuth) router.push('/')
  },[Cookies.get(TOKEN)])

  return <AuthContext.Provider value={{isAuth, setIsAuth}}>{children}</AuthContext.Provider>
}

export default AuthProvider