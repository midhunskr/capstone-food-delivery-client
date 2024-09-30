import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignUp } from "../../services/userApi";
import { AdminAuth } from "../../routes/protectedRoutes/AdminAuth";
import { useSelector } from "react-redux";

export const AdminLoginPage = () => {

  const isAdminExist = useSelector((state) => state.admin.isAdminExist); // Accessing admin existence state

  // Redirect if admin already exists
  if (isAdminExist) {
    navigate("/admin/profile");
    return null; // Prevent rendering anything while navigating
  }

  // Separate form instance for login
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  // Separate form instance for signup
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmitLogin = async (data) => {
    try {
      const response = await userLogin(data);
      console.log(response);

      if (response.success && response.role === 'admin') {
        toast.success('Welcome back!');
        navigate('/admin/profile');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('Login failed. Something went wrong.');
      console.log(error);
    }
  };

  const onSubmitRegister = async (data) => {
    try {
      const response = await userSignUp(data);
      console.log(response);

      if (response.success) {
        toast.success(response.message);
        navigate('/admin');
      } else {
        toast.error('Registration failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('Registration failed. Something went wrong.');
      console.log(error);
    }
  }

  return (
    <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] overflow-hidden bg-bg-white text-dark pb-[2rem]">
      <div className="h-full w-[70.5rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0rem] box-border gap-[2.012rem] max-w-full mq450:h-auto mq750:gap-[1rem] mq750:pb-[11.688rem] mq750:box-border">
        <b className="pt-[2rem]">Admin Login</b>
        <div className="sm:flex sm:flex-row flex flex-col pl-[0.5rem] pr-[0rem] box-border shrink-0 max-w-full gap-[1.25rem]">
          <div className="Form  border-2 border-solid border-selection-tint py-[1rem] px-[2rem] rounded-2xl">
           
            <form action="#" onSubmit={handleLoginSubmit(onSubmitLogin)}>
              <div className="input-box">
                <label htmlFor="#">Email</label>
                <i className="bx bxs-envelope"></i>
                <input
                  type="email"
                  {...loginRegister("email")}
                  placeholder="Enter Your Email*"
                />
              </div>
              <div className="input-box">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  {...loginRegister("password")}
                  placeholder="Enter Your Password*"
                />
                <label htmlFor="#">Password</label>
              </div>
              <div className="forgot-section">
                <span>
                  <input type="checkbox" id="checked" /> Remember Me
                </span>
                <span>
                  <a href="#">Forgot Password?</a>
                </span>
              </div>
              <div className="flex items-center justify-center py-[2rem]">
                <button type="submit" className="bg-bg-white text-tradewind py-[.5rem] font-bold rounded-md text-xl border-[.14rem] border-solid border-tradewind w-full hover:bg-tradewind hover:text-bg-white hover:cursor-pointer">
                  Login
                </button>
              </div>
            </form>
          </div>

          <div className="border-2 border-solid border-selection-tint py-[1rem] px-[2rem] rounded-2xl">
            
            <form action="#" onSubmit={handleSignupSubmit(onSubmitRegister)}>
              <div className="input-box">
                <i className="bx bxs-envelope"></i>
                <label htmlFor="#">Name</label>
                <input
                  type="text"
                  {...signupRegister("name")}
                  placeholder="Enter Your Name*"
                />
              </div>
              <div className="input-box">
                <i className="bx bxs-envelope"></i>
                <label htmlFor="#">Email</label>
                <input
                  type="email"
                  {...signupRegister("email")}
                  placeholder="Enter Your Email*"
                />
              </div>
              <div className="input-box">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  {...signupRegister("password")}
                  placeholder="Enter Your Password*"
                />
                <label htmlFor="#">Password</label>
              </div>
              <div className="input-box">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="role"
                  {...signupRegister("role")}
                  placeholder="Enter your Role*"
                />
                <label htmlFor="#">Role</label>
              </div>
              <div className="flex items-center justify-center pb-[1rem]">
                <button className="bg-bg-white text-tradewind py-[.5rem] font-bold rounded-md text-xl border-[.14rem] border-solid border-tradewind w-full hover:bg-tradewind hover:text-bg-white hover:cursor-pointer">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

AdminLoginPage.propTypes = {
  className: PropTypes.string,
};