import MyPostCard from "./MyPostCard";
import image from '../../assets/placeholderPortrait.jpg'

export default function MyPosts () {
  const posts = [
    {
      username: 'mrdietcola',
      userId: '659b54997e17c5601f72c458',
      workoutId: '1',
      workoutName: 'Get Yoked',
      mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Ee3T5ehPEUWk-xKP33HzWejXijqZ5LW426jGYxLB-TrXnRztTRMnT_TbvcTspwVzYaM&usqp=CAU',
      postText: 'just hit this new pr!!',
      createdAt: 'May 7th, 2023',
      visibility: true,
      comments: [
        { commentText: 'nice!', commentAuthor: 'tommyJJ', createdAt: '10:25am'}
      ]
    },
    {
      username: 'fitExplorer',
      userId: '7c90bf89036a9e2bf5d43123',
      workoutId: '2',
      workoutName: 'Endurance Challenge',
      mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQciKxqCzCww0m0zs-1niBhFNSmlQCW7ADU_3gPhujMK_JALQb7kJU4O-_B3sqDa1ikMO8&usqp=CAU',
      postText: 'completed a 10-mile run today!',
      createdAt: 'May 8th, 2023',
      visibility: true,
      comments: [
        { commentText: 'amazing!', commentAuthor: 'runFanatic', createdAt: '12:45pm'}
      ]
    },
    {
      username: 'liftingBeast',
      userId: '3e6d218b2cbce74eb428a124',
      workoutId: '3',
      workoutName: 'Powerlifting Session',
      mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBpjpFm3dc7Nm5w_A9i1xn2TcP7yaJbo4fWYPBfJ-QlZlhd51JLz8VGRwMGWekZXwEUKo&usqp=CAU',
      postText: 'hit new personal records in squat and deadlift!',
      createdAt: 'May 9th, 2023',
      visibility: true,
      comments: [
        { commentText: 'strong work!', commentAuthor: 'strengthGuru', createdAt: '3:20pm'}
      ]
    },
    {
      username: 'yogaLover',
      userId: 'a4f8b7c1c98d6e9f4c52e89d',
      workoutId: '4',
      workoutName: 'Yoga and Meditation',
      mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJnxKXaNhfOfkwlGaP3IXlmvVEUKJj2D9O1TU1TFaAO8bYTZWHIG6q7P8-qy8v5M9XYo&usqp=CAU',
      postText: 'found peace and balance in today\'s yoga session.',
      createdAt: 'May 10th, 2023',
      visibility: true,
      comments: [
        { commentText: 'adventurous!', commentAuthor: 'trailBlazer', createdAt: '8:30am'},
        { commentText: 'so serene!', commentAuthor: 'mindfulSoul', createdAt: '6:10pm'},
        { commentText: 'so serene!', commentAuthor: 'mindfulSoul', createdAt: '6:10pm'},
        { commentText: 'so serene!', commentAuthor: 'mindfulSoul', createdAt: '6:10pm'},
        { commentText: 'so serene!', commentAuthor: 'mindfulSoul', createdAt: '6:10pm'},
      ]
    },
    {
      username: 'cyclingEnthusiast',
      userId: 'b2e5c31d827f48a6c91d73a2',
      workoutId: '5',
      workoutName: 'Mountain Biking Adventure',
      mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2BpD538ze9nGQzTb6d3yFnkbCfanGoFNVWJZMOrNeXtxz8HBmoubN9k7FJS_O-3HvazA&usqp=CAU',
      postText: 'explored new trails on my mountain bike!',
      createdAt: 'May 11th, 2023',
      visibility: true,
      comments: [
        { commentText: 'adventurous!', commentAuthor: 'trailBlazer', createdAt: '8:30am'}
      ]
    }
  ];


  return (
    <div className='bg-tr d-flex flex-wrap'>
      {posts.map((post, index) => <MyPostCard post={post} key={index}/>)}
    </div>
  );
}