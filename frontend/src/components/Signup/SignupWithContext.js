import Signup from "./Signup";
import { SignupProvider } from "./Signup.context";

const SignupWithContext = () => {
  return (
    <SignupProvider>
        <Signup />
    </SignupProvider>
  )
}

export default SignupWithContext