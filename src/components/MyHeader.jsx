import { Link } from "react-router"

export const MyHeader = ()=>{
  return <div className="top-nav">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>

  </div>
}
