import { Link } from "react-router-dom";
import "./signup.css";

function SignUp() {
  return (
    <div className="signup">
      <div className="card">
        <form className="left">
          <input type="text" placeholder="username" required />
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <button type="submit" className="btn">
            회원가입
          </button>
        </form>
        <div className="right">
          <h2>
            -<br /> Storyville Signup
            <br />-
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            aliquam excepturi molestiae consequatur, nostrum dicta animi
            provident possimus quas qui.
          </p>
          <span>이미 계정이 있으신가요? </span>
          <Link to="/login">
            <button className="btn btn-primary">로그인</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
