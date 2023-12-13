import MyFriendCard from "./MyFriendCard";

export default function MyFriends() {
  const friends = [
    { username: 'tommyBiceps22', status: 'At the gym' },
    { username: 'sallyIsStrongerThanYou', status: 'Away' },
    { username: 'johnDoe', status: 'Working out' },
    { username: 'fitGirl123', status: 'Rest day' },
    { username: 'muscleMaster', status: 'Training hard' },
    { username: 'powerLifter87', status: 'At a competition' },
    { username: 'flexyFlex', status: 'Flexing muscles' },
    { username: 'liftAndRun', status: 'Running on the treadmill' },
    { username: 'gymAddict', status: 'Lifting heavy' },
    { username: 'activeLife', status: 'Out for a jog' },
    { username: 'ironPump', status: 'Pumping iron' },
    { username: 'fitnessFreak', status: 'Doing yoga' },
    { username: 'gymExplorer', status: 'Trying new exercises' },
    { username: 'cardioKing', status: 'Cardio session' },
    { username: 'strongAndHealthy', status: 'Maintaining health' },
  ]

  console.log(friends);

  return (
    <div className='bg-light friends-container'>
      {friends.map((friend, index) => (
        <MyFriendCard key={index} friend={{ ...friend, _id: index + 1 }} />
      ))}
    </div>
  );
}