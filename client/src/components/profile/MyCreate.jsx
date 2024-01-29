import { Link } from "react-router-dom";

export default function MyCreate() {
  const createLinks = [
    {name:'Create Post', to:'/createPost', },
    {name:'Create Goal', to:'/createGoal', },
    {name:'Add Friend', to:'/searchPage', },
    {name:'Create Workout', to:'/createWorkout', },
    {name:'Create Program', to:'/createProgram', },
  ]
  return (
    <div className="d-flex flex-column">
      {createLinks.map((link) => (
        <Link className="btn btn-primary mb-2 p-3" to={link.to}>{link.name}</Link>
      ))}
    </div>
  )
}