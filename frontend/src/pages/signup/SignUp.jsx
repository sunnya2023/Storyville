import { Link } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ username, email, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "회원가입에 실패하였습니다.");

        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다.");
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="signup">
      <div className="card">
        <form className="left" onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="username"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            name="email"
            type="email"
            placeholder="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />

          <p>영문,숫자,특수기호 조합 6자이상</p>
          {isError && <p className="err">{error.message}</p>}
          <button type="submit" className="btn">
            {isPending ? "로딩중" : "회원가입"}
          </button>
        </form>
        <div className="right">
          <h2>
            -<br /> Storyville Signup
            <br />-
          </h2>
          <p>
            Storyville에 오신 것을 환영합니다! <br />
            멋진 이야기를 함께 만들어가요.
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
