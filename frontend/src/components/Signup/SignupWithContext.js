import Signup from "./Signup";
import { SignupProvider } from "./Signup.context";

// Allow every component in Signup to have access to the email,password and username const
const SignupWithContext = () => {
  return (
    <SignupProvider>
        <Signup />
    </SignupProvider>
  )
}

export default SignupWithContext