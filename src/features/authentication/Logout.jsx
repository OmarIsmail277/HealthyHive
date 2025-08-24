import ButtonIcon from "../../components/ButtonIcon";
import { CiLogout } from "react-icons/ci";
import { useLogout } from "../../hooks/useUser";
import SpinnerMini from "../../components/Spinner/SpinnerMini";

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon disabled={isPending} onClick={logout}>
      {isPending ? <SpinnerMini /> : <CiLogout />}
    </ButtonIcon>
  );
}

export default Logout;
