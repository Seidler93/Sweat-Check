import MyProgressCard from "./MyProgressCard";

export default function MyProgress () {
  const progress = [1,1,1,1,1,1]
  return (
    <div className='bg-light progress-container'>
      {progress.map((prog) => <MyProgressCard progress={prog}/>)} 
    </div>
  );
}