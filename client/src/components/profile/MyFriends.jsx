import MyFriendCard from "./MyFriendCard";

export default function MyFriends() {
  const friends = [
    { id: 1, username: 'sallyIsStrongerThanYou', status: 'Away' },
    { id: 2, username: 'johnDoe', status: 'Working out' },
    { id: 3, username: 'fitGirl123', status: 'Rest day' },
    { id: 4, username: 'muscleMaster', status: 'Training hard' },
    { id: 5, username: 'tommyBiceps22', status: 'At the gym' },
    { id: 6, username: 'powerLifter87', status: 'At a competition' },
    { id: 7, username: 'flexyFlex', status: 'Flexing muscles' },
    { id: 8, username: 'liftAndRun', status: 'Running on the treadmill' },
    { id: 9, username: 'gymAddict', status: 'Lifting heavy' },
    { id: 10, username: 'activeLife', status: 'Out for a jog' },
    { id: 11, username: 'ironPump', status: 'Pumping iron' },
    { id: 12, username: 'fitnessFreak', status: 'Doing yoga' },
    { id: 13, username: 'gymExplorer', status: 'Trying new exercises' },
    { id: 14, username: 'cardioKing', status: 'Cardio session' },
    { id: 15, username: 'strongAndHealthy', status: 'Maintaining health' }
  ];
  

  //console.log(friends);

  return (
    <div className='bg-light friends-container'>
      {friends.map((friend, index) => (
        <MyFriendCard key={index} friend={friend} />
      ))}
    </div>
  );
}