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
            안녕하세요!
            <br /> Storyville에서 당신의 멋진 이야기를 <br />
            이어가세요.
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
