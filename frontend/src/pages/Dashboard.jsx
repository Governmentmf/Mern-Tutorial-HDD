import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../componets/GoalForm'
import GoalItem from '../componets/GoalItem'
import Spinner from '../componets/Spinner'
import {getGoals, reset} from '../features/goals/goalSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError){
      console.log(message);
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getGoals())
    
    return () => {
      dispatch(reset())
    }

  },[user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner/>
  }

  return(
  <>
    <section className="heading">
      Welcome {user && user.name}
      <p>Goals Dashboard</p>
    </section>

    <GoalForm/>

    <section className="content">
         {goals.length > 0 ? (<div className="goals">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal}/>
          ))}
         </div>
         ) : (
         <h3>Why havent you set any goals you BUM!</h3>)}
    </section> 
  </>
  )
}

export default Dashboard