import { Outlet } from 'react-router-dom';

export default function PrivateOutlet() {
  // const isAuth = useAppSelector((store) => store.auth.status);
  // const isLoading = useAppSelector((store) => store.auth.isLoading);
  // const accountSubscribed = useAppSelector(
  //  (store) => store.auth.accountSubscribed
  // );

  return <Outlet />;
}
