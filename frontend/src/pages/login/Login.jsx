import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const {
    mutate: loginMutate,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "이메일과 비밀번호를 확인하세요");
        }

        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutate(formData);
  };

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
            <button className="btn btn-primary">회원가입</button>
          </Link>
        </div>

        <form className="right" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            required
            name="email"
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="password"
            required
            name="password"
            onChange={handleInputChange}
          />
          {isError && <p className="err">{error.message}</p>}
          <button type="submit" className="btn">
            {isPending ? "로딩중" : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
