import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account Successfully created! Please verify your email address"
      );
      queryClient.invalidateQueries({ queryKey: ["user"] }); // refresh user
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isPending };
}
