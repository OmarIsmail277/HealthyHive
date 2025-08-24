import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userRepository } from "../repositories/userRepository.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth.js";
import { signup as signupApi } from "../services/apiAuth.js";
import { logout as logoutApi } from "../services/apiAuth.js";

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: [userRepository.queryKey],
    queryFn: userRepository.fetchCurrentUser,
  });

  return { isPending, user, isAuthenticated: user?.role === "authenticated" };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userRepository.saveUserMetadata,
    onSuccess: (updatedUser) => {
      // invalidate and update user Cache
      queryClient.setQueryData([userRepository.queryKey], updatedUser);
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      // queryClient.setQueryData(["user"], user.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/", { replace: true });
    },

    onError: (err) => {
      console.log("ERROR ", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account Successfully created! Please verify your email address"
      );
      queryClient.invalidateQueries({ queryKey: userRepository.queryKey }); // refresh user
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isPending };
}

export function useCheckoutLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      // Invalidate user query so data stays up-to-date
      queryClient.invalidateQueries({ queryKey: userRepository.queryKey }); // refresh user
      // Do NOT navigate; component will handle next step
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect ", err);
    },
  });

  return { login, isPending };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // queryClient.removeQueries();
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}
