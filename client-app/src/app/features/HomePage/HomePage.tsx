import LoginForm from "../Users/LoginForm";
import "./HomePage.css"

export default function HomePage() {
  return (
    <div className="background">
      <div className="overlay"></div>
      <div className="form-container">
        <LoginForm />
      </div>
    </div>
  );
}
