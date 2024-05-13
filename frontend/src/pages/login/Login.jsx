import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>
            -<br /> Storyville <br />-
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            aliquam excepturi molestiae consequatur, nostrum dicta animi
            provident possimus quas qui.
          </p>
          <span>계정이 없으신가요? </span>
          <Link to="/signup">
            {" "}
            <button className="btn btn-primary">회원가입</button>
          </Link>
        </div>
        <form className="right">
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <button type="submit" className="btn">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
